import React from 'react';

import MenuHeader from '../../elements/build/MenuHeader';
import LoggerTemplate from '../../elements/build/LoggerTemplate';
import FormTemplate from '../../elements/build/FormTemplate';
import FormField from '../../elements/build/FormField';

import UserService from "../../RequestService";

const userService = new UserService();

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            email: '',
            password: '',

            tryCode: '',
            code: '',

            logger: '',
            form: 'check_email'
        }

        this.formStatus = {
            check_email: 'check_email',
            loading: 'loading',
            success: 'success',
            check_code: 'check_code'
        }
        this.loggerStatus = {
            empty: '',
            email: 'email',
            success: 'success',
            error: 'error',
            code: 'code'
        }

        this.login = React.createRef();
        this.password = React.createRef();
        this.email = React.createRef();
        this.back = React.createRef();
        this.submit = React.createRef();

        this.getLogger = this.getLogger.bind(this)
        this.getForm = this.getForm.bind(this)

        this.registrate = this.registrate.bind(this)
        this.checkMail = this.checkMail.bind(this)
        this.setFormLogger = this.setFormLogger.bind(this)
        this.checkEqualCode = this.checkEqualCode.bind(this)
    }

    setFormLogger(newForm, newLogger) {
		this.setState({
			logger: newLogger ?? this.state.logger,
			form: newForm ?? this.state.form
		})
	}

    checkMail() {
        this.setFormLogger(this.formStatus.loading, this.loggerStatus.empty)
        userService.check_mail({ 'mail': this.state.email })
            .then(result => {
                let parsed = JSON.parse(result.data);
                this.setState({
                    code: parsed.code,
                })
                this.setFormLogger(this.formStatus.check_code)
            })
            .catch(this.setFormLogger.bind(this, this.formStatus.check_email, this.loggerStatus.email))
    }

    registrate() {
        const user = {
            "login": this.state.login,
            "password": this.state.password,
            "email": this.state.email,
        };
        userService.registration(user)
            .then(() => {
                this.setFormLogger(null, this.loggerStatus.success)
                setTimeout(() => {
                    if (this.back.current) {
                        this.back.current.click()
                    }
                }, 2000)
                this.login.current.disabled = true
                this.email.current.disabled = true
                this.password.current.disabled = true
                this.submit.current.disabled = true   
            })
            .catch(this.setFormLogger(null, this.loggerStatus.error));
    }

    getLogger() {
            let form = document.querySelector('.login__form-block')
            const setStyleToForm = function() { 
                form.classList.add('login__form-block_with-logger') 
            }

            switch (this.state.logger) {
                case this.loggerStatus.email:
                    return <LoggerTemplate text='Такой email уже используется' />

                case this.loggerStatus.error:
                    setStyleToForm()
                    return <LoggerTemplate text='Такой логин уже используется' />

                case this.loggerStatus.code:
                    return <LoggerTemplate text='Вы ввели неверный код' />

                case this.loggerStatus.success:
                    setStyleToForm()
                    return <LoggerTemplate style={{color: 'limegreen',}} text='Регистрация прошла успешно' />

                default:
                    return <div style={{height: '5vw'}}> </div>
            }
    }

    checkEqualCode() {
		if (this.state.tryCode === this.state.code) {
			this.setFormLogger(this.formStatus.success, this.loggerStatus.empty)
		} else {
			this.setFormLogger(this.formStatus.check_email, this.loggerStatus.code)
            this.setState({
                email: '',
                tryCode: '',
            })
		}
	}

    getForm() {
        let fields = (<div style={{ marginLeft: '15vw', textAlign: 'left', color: '#FFF', fontSize: '3vw'}}>Loading...</div>)

        switch (this.state.form) {
            case this.formStatus.check_email:
                fields = <FormField onChange={e => this.setState({email: e.target.value}) }
                            placeholder={'Почта'} type={"email"} value={this.state.email} name={'email'} />
                return <FormTemplate fields={fields} submitFunction={this.checkMail} submitBtnText={'ОТПРАВИТЬ КОД'} />

            case this.formStatus.success:
                fields = (<>
                        <FormField placeholder={'Почта'} type={"email"} value={this.state.email} name={'email'} ref={this.email} disabled />
                        <FormField onChange={e => this.setState({login: e.target.value}) }
                            placeholder={'Логин'} type={"text"} value={this.state.login} name={'login'} ref={this.login} />
                        <FormField onChange={e => this.setState({password: e.target.value}) }
                            placeholder={'Пароль'} type={"password"} value={this.state.password} name={'password'} ref={this.password} />
                    </>)
                return <FormTemplate fields={fields} submitFunction={this.registrate} submitBtnText={'ЗАРЕГИСТРИРОВАТЬСЯ'} ref={this.submit} />

            case this.formStatus.check_code:
                fields = <FormField onChange={e => this.setState({tryCode: e.target.value}) }
                            placeholder={'Введите код'} type={"text"} value={this.state.tryCode} name={'code'} maxLength='4' />
                 return <FormTemplate fields={fields} submitFunction={this.checkEqualCode} submitBtnText={'ПОДТВЕРДИТЬ'} />

            default:
                return fields
        }
    }

    render() {
        let logger = this.getLogger()
        let form = this.getForm()

        return (
            <div className='view'>
                <MenuHeader header='Регистрация' ref={this.back} />

                {logger}
                {form}
            </div>
        )
    }
}