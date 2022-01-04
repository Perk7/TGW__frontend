import axios from 'axios';
import sha256 from 'js-sha256';

require('dotenv').config();

const API_URL = 'http://127.0.0.1:8000';

function getPublicCode() {
    const chars = 'qwertyuiop[]asdfghjkl;zxcvbnm,./1234567890-=!@#$%^&*()'
    let key = ''
    for (let i=0;i<=20;i++) {
        let index = Math.trunc(Math.random() * (chars.length - 0));
        key += chars[index]
    }

    return key
}

function makeApiKey(data) {
    let secret = process.env.REACT_APP_SECRET_KEY
    let publicKey = getPublicCode()

    let ready_key = secret + ':' + data.login.split('').reverse().join('') + ':' + publicKey
    return Object.assign({
        key: sha256(ready_key),
        code: publicKey,
    }, data)
}

export default class UserService {

    /* Main Menu */

    allCountries() {
        const url = `${API_URL}/api/country/`;
        return axios.get(url);
    }

    savedGames(user) {
        let data = makeApiKey(user) 
        const url = `${API_URL}/api/saved_games/`;
        return axios.post(url, data);
    }

    deleteSave(user) {
        let data = makeApiKey(user) 
        const url = `${API_URL}/api/delete_save/`;
        return axios.post(url, data);
    }

    /* Auth and Login */

    registration(user) {
        const url = `${API_URL}/auth/registration/`;
        return axios.post(url, user);
    }

    check_mail(mail) {
        const url = `${API_URL}/auth/check_mail/`;
        return axios.post(url, mail);
    }

    login(user) {
        const url = `${API_URL}/auth/login/`;
        return axios.post(url, user);
    }

    logout() {
        const url = `${API_URL}/auth/logout/`;
        return axios.get(url);
    }

    recoveryPasswordCode(mail) {
        const url = `${API_URL}/auth/recovery_password_code/`;
        return axios.post(url, mail);
    }

    recoveryPassword(password) {
        const url = `${API_URL}/auth/password_change/`;
        return axios.post(url, password);
    }

    /* Start Game */

    createGame(user) {
        let data = makeApiKey(user) 
        const url = `${API_URL}/game/start_game/`;
        return axios.post(url, data);
    }

    loadGame(user) {
        let data = makeApiKey(user) 
        const url = `${API_URL}/game/load_game/`;
        return axios.post(url, data);
    }

    saveGame(user) {
        let data = makeApiKey(user) 
        const url = `${API_URL}/game/save_game/`;
        return axios.post(url, data)
    }
}