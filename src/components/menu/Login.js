import React from 'react';

import { connect } from 'react-redux';
import {mapStateToProps} from "../../storage/reduxGet";
import {change_user, auth} from "../../storage/actions";

import MenuHeader from '../../elements/MenuHeader';
import LoggerTemplate from '../../elements/build/LoggerTemplate';
import FormTemplate from '../../elements/build/FormTemplate';
import FormField from '../../elements/build/FormField';

import UserService from "../../RequestService";
import {offBoard, onBoard} from "../../otherFunctions";

const userService = new UserService()

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			login: '',
			password: '',
			email: '',

			logger: '',
			form: '',

			code: '',
			tryCode: '',

			btnForget: false
		}

		this.formStatus = {
			empty: '',
			code: 'code',
			forget: 'forget',
			loading: 'loading',
			change: 'change'
		}

		this.loggerStatus = {
			empty: '',
			wrong: 'wrong', 
			success: 'success', 
			email: 'email',
			fail: 'fail',
			wrongCode: 'wrongCode'
		}

		this.login = React.createRef()
		this.password = React.createRef()
		this.submit = React.createRef()
		this.back = React.createRef()
		this.forget = React.createRef()

		this.tryLogin = this.tryLogin.bind(this)
		this.sendCode = this.sendCode.bind(this)
		this.changePassword = this.changePassword.bind(this)

		this.getLogger = this.getLogger.bind(this)
		this.getForm = this.getForm.bind(this)

		this.changePassword = this.changePassword.bind(this)
		this.setFormLogger = this.setFormLogger.bind(this)
		this.checkEqualCode = this.checkEqualCode.bind(this)
	}

	setFormLogger(newForm, newLogger) {
		this.setState({
			logger: newLogger ?? this.state.logger,
			form: newForm ?? this.state.form
		})
	}

	tryLogin() {
		let user = {
			"login": this.state.login,
			"password": this.state.password,
		};

		userService.login(user)
			.then(() => {
				this.props.change_user()
				this.props.auth({ login: user.login, password: user.password })

				localStorage.setItem('login', user.login)
				localStorage.setItem('password', user.password)
				
				this.setFormLogger(null, this.loggerStatus.success)
				setTimeout(() => {
					if (this.back.current) {
						this.back.current.click()
					} 
				}, 2000);
				this.login.current.disabled = true
				this.password.current.disabled = true
				this.submit.current.disabled = true
				this.forget.current.disabled = true
			})
			.catch(this.setFormLogger.bind(this, null, this.loggerStatus.wrong));
	}

	sendCode(mail) {
		this.setFormLogger(this.formStatus.loading)

		userService.recoveryPasswordCode({ mail: mail })
			.then(result => {
				let parsed = JSON.parse(result.data);

				this.setFormLogger(this.formStatus.code, this.loggerStatus.empty)
				this.setState({
					code: parsed.code,
					password: ''
				})
			})
			.catch(this.setFormLogger.bind(this, this.formStatus.forget, this.loggerStatus.email));
	}

	changePassword(password) {
		this.setFormLogger(this.formStatus.loading)

		userService.recoveryPassword({ mail: this.state.email, password: password })
			.then(() => {
					
				this.setFormLogger(this.formStatus.empty, this.loggerStatus.empty)
				this.setState({
					password: '',
					btnForget: 'inline-block'
				})

				this.password.current.disabled = false
				this.submit.current.disabled = false
			})
			.catch(this.setFormLogger.bind(this, this.formStatus.empty, this.loggerStatus.fail));
	}

	getLogger() {
		let form = document.querySelector('.login__form-block')
		const setStyleToForm = function() { 
			form.classList.add('login__form-block_with-logger') 
		}

		switch (this.state.logger) {
			case this.loggerStatus.wrongCode:
				setStyleToForm()
				return <LoggerTemplate text='Произошла ошибка' />

			case this.loggerStatus.fail:
				setStyleToForm()
				return <LoggerTemplate text='Неверный код' />

			case this.loggerStatus.wrong:
				setStyleToForm()
				return <LoggerTemplate text='Неверный логин и(или) пароль' />

			case this.loggerStatus.success:
				setStyleToForm()
				return <LoggerTemplate text='Авторизация прошла успешно' style={{color: 'limegreen'}} />

			case this.loggerStatus.email:
				return <LoggerTemplate text='Пользователя с таким email не найдено' />

			default:
				return <div style={{marginTop: '15vh'}}> </div>
		}
	}

	checkEqualCode() {
		if (this.state.tryCode === this.state.code) {
			this.setFormLogger(this.formStatus.change, this.loggerStatus.empty)
		} else {
			this.setFormLogger(this.formStatus.forget, this.loggerStatus.wrongCode)
		}
	}

	getForm() {
		let fields = (<div style={{ marginLeft: '15vw', textAlign: 'left', color: '#FFF', fontSize: '3vw'}}>Loading...</div>)

		switch (this.state.form) {
			case this.formStatus.change: 
				fields = <FormField onChange={e => this.setState({password: e.target.value}) }
							placeholder={'Новый пароль'} type="password" value={this.state.password} name='password' ref={this.password} />

				return <FormTemplate fields={fields} submitFunction={this.changePassword.bind(this, this.state.password)} submitBtnText={'СМЕНИТЬ ПАРОЛЬ'} />
							
			case this.formStatus.forget:
				fields = <FormField onChange={e => this.setState({email: e.target.value}) }
							placeholder='Почта' value={this.state.email} type="email" name='email' />

				return <FormTemplate fields={fields} submitFunction={this.sendCode.bind(this, this.state.email)} submitBtnText={'ОТПРАВИТЬ КОД'} ref={this.submit} />
								
			case this.formStatus.loading:
				return fields

			case this.formStatus.code:
				fields = <FormField onChange={e => this.setState({tryCode: e.target.value}) }
							placeholder='Введите код' maxLength='4' type="text" value={this.state.tryCode} name='code' /> 

				return <FormTemplate fields={fields} submitFunction={this.checkEqualCode} submitBtnText={'ПОДТВЕРДИТЬ'} />

			default:
				fields = (<>
							<FormField onChange={e => this.setState({login: e.target.value}) }
								placeholder='Логин' value={this.state.login} type="text" name='login' ref={this.login} />
							<FormField onChange={e => this.setState({password: e.target.value}) }
								placeholder='Пароль' value={this.state.password} type="password" name='password' ref={this.password} />
						</>)

				return <FormTemplate fields={fields} submitFunction={this.tryLogin} submitBtnText={'ВОЙТИ'} ref={this.submit} />
		}
	}

	handleRecoveryBtnClick() {
		this.setFormLogger(this.formStatus.forget, this.loggerStatus.empty)
		this.setState({
			password: '',
			btnForget: 'none'
		})
	}

	render() {
		const form = this.getForm()
		const logger = this.getLogger()

		return (
			<div className='view'>
				<div className='login__relative-div'>
					<MenuHeader header='Войти' ref={this.back} />

					{logger}
					{form}
					
					<button style={{display: this.state.btnForget}} className='login__forget-btn' onClick={this.handleRecoveryBtnClick.bind(this)} ref={this.forget}>
						Восстановить пароль
					</button>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, { change_user, auth })(Login)