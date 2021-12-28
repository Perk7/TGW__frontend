import axios from 'axios';
const API_URL = 'http://192.168.1.159:8000';

export default class UserService {

    constructor(){}

    /* Main Menu */

    allCountries() {
        const url = `${API_URL}/api/country/`;
        return axios.get(url);
    }

    savedGames(user) {
        const url = `${API_URL}/api/saved_games/`;
        return axios.post(url, user);
    }

    deleteSave(data) {
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

    createGame(data) {
        const url = `${API_URL}/game/start_game/`;
        return axios.post(url, data);
    }

    loadGame(data) {
        const url = `${API_URL}/game/load_game/`;
        return axios.post(url, data);
    }

    saveGame(data) {
        const url = `${API_URL}/game/save_game/`;
        return axios.post(url, data)
    }
}