import React from 'react';
import { Link } from "react-router-dom";
import UserService from "../../CustomersService";
import {offBoard, onBoard} from "../../otherFunctions";

const userService = new UserService();

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.login = React.createRef();
        this.password = React.createRef();
        this.email = React.createRef();
        this.back = React.createRef();
        this.submit = React.createRef();

        this.state = {
            login: '',
            email: '',
            password: '',
            tryCode: '',

            code: null,

            logger: '',
            form: 'check_mail'
        }

        this.registrate = this.registrate.bind(this)
        this.getLogger = this.getLogger.bind(this)
        this.check_mail = this.check_mail.bind(this)
    }

    check_mail() {
        this.setState({
            form: 'loading'
        })
        userService.check_mail({ "mail": this.state.email, })
            .then((result) => {
                let par = JSON.parse(result.data);
                if (!par.code) {
                    this.setState({
                        logger: 'email',
                        form: 'check_mail'
                    })
                } else {
                    this.setState({
                        code: par.code,
                        form: 'check_code',
                        logger: ''
                    })
                }
            })
    }

    registrate() {
        let user = {
            "login": this.state.login,
            "password": this.state.password,
            "email": this.state.email,
        };
        userService.registration(user)
            .then((result) => {
                let par = JSON.parse(result.data);
                if (par.login && par.email) {
                    this.setState({
                        logger: 'success'
                    })
                } else {
                    this.setState({
                        logger: 'error'
                    })
                }
            })
            .catch((result) => {
                console.log('There was an error! Please re-check your form.');
            });
    }

    getLogger() {
            let form = document.querySelector('.login__form-block')
            if (this.state.logger === 'email') {
                return <div className='login__form-block__logger'>Такой email уже используется</div>
            }
            if (this.state.tryCode !== '' && this.state.code !== this.state.tryCode && this.state.tryCode.length === 4) {
                return <div className='login__form-block__logger'>Вы ввели неверный код</div>
            }
            if (this.state.logger === '') {
                return <div style={{height: '5vw'}}> </div>
            }
            if (this.state.logger === 'success') {
                form.classList.add('login__form-block_with-logger')
                setTimeout(() => {
                    if (this.back.current) {
                        this.back.current.click()
                    }
                }, 2000)
                this.login.current.disabled = true
                this.email.current.disabled = true
                this.password.current.disabled = true
                this.submit.current.disabled = true
                return <div style={{color: 'limegreen',}} className='login__form-block__logger'>Регистрация прошла успешно</div>
            }
            if (this.state.logger === 'error') {
                form.classList.add('login__form-block_with-logger')
                return <div className='login__form-block__logger'>Такой логин уже используется</div>
            }
    }

    getForm() {
        if (this.state.form === 'check_mail') {
            return <form onSubmit={(event) => {
                        event.preventDefault()
                        this.check_mail()
                    }}>
                        <input className='login__form-block__input' onBlur={offBoard} onFocus={onBoard} autoComplete="off" onChange={(e) => { this.setState({email: e.target.value}) }}
                               placeholder='Почта' type="email" value={this.state.email} name='email' required />
                        <button className='login__form-block__submit' type='submit'>ОТПРАВИТЬ КОД</button>
                    </form>
        }
        if (this.state.form === 'loading') {
            return <div style={{color: '#FFF', fontSize: '3vw'}}>Loading...</div>
        }
        if (this.state.code === this.state.tryCode) {
            return <form onSubmit={(event) => {
                event.preventDefault()
                this.registrate()
            }}>
                <input className='login__form-block__input' onBlur={offBoard} onFocus={onBoard} autoComplete="off" placeholder='Почта' value={this.state.email} type="email" name='email' ref={this.email} />
                <input className='login__form-block__input' onBlur={offBoard} onFocus={onBoard} autoComplete="off" onChange={(e) => { this.setState({login: e.target.value}) }}
                       placeholder='Логин' value={this.state.login} type="text" name='login' ref={this.login} />
                <input className='login__form-block__input' onBlur={offBoard} onFocus={onBoard} autoComplete="off" onChange={(e) => { this.setState({password: e.target.value}) }}
                       placeholder='Пароль' value={this.state.password} type="password" name='password' ref={this.password} />
                <button className='login__form-block__submit' type='submit' ref={this.submit} >ЗАРЕГИСТРИРОВАТЬСЯ</button>
            </form>
        }
        if (this.state.form === 'check_code') {

            return <form>
                <input className='login__form-block__input' onBlur={offBoard} onFocus={onBoard} autoComplete="off" onChange={(e) => {
                    this.setState({tryCode: e.target.value})
                }}
                       placeholder='Введите код' maxLength='4' type="text" value={this.state.tryCode} name='code'/>
            </form>
        }
    }

    render() {
        let logger = this.getLogger()
        let form = this.getForm()

        return (
            <div className='view'>
                <header className='side-header'>
                    <Link ref={this.back} to={'/home'} className='header__btn_back'>←</Link>
                    <h1 className='side-heading'>Регистрация</h1>
                </header>
                {logger}
                <div className='login__form-block'>
                    {form}
                </div>
            </div>
        )
    }
}