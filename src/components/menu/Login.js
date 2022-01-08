import React from 'react';
import MenuHeader from '../../elements/MenuHeader';
import UserService from "../../RequestService";
import {change_user, auth} from "../../storage/actions";
import {offBoard, onBoard} from "../../otherFunctions";
import { connect } from 'react-redux'
import {mapStateToProps} from "../../storage/reduxGet";

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

	getLoggerTemplate(text, style) {
		return ( <div style={style ?? {}} className='login__form-block__logger'>{text}</div> )
	}

	getLogger() {
		let form = document.querySelector('.login__form-block')
		const setStyleToForm = function() { 
			form.classList.add('login__form-block_with-logger') 
		}

		switch (this.state.logger) {
			case this.loggerStatus.wrongCode:
				setStyleToForm()
				return this.getLoggerTemplate('Произошла ошибка')

			case this.loggerStatus.fail:
				setStyleToForm()
				return this.getLoggerTemplate('Неверный код')

			case this.loggerStatus.wrong:
				setStyleToForm()
				return this.getLoggerTemplate('Неверный логин и(или) пароль')

			case this.loggerStatus.success:
				setStyleToForm()
				return this.getLoggerTemplate('Авторизация прошла успешно', {color: 'limegreen'})

			case this.loggerStatus.email:
				return this.getLoggerTemplate('Пользователя с таким email не найдено')

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

	getFormTemplate(fields, submitFunction, submitBtnText, submitBtnRef) {
		return (<div className='login__form-block'>
					<form onSubmit={event => {
						event.preventDefault()
						submitFunction()
					}}>
						{fields}
						<button className='login__form-block__submit' type='submit' ref={submitBtnRef ?? null} >{submitBtnText}</button>
					</form>
				</div>)
	}

	getForm() {
		let fields = (<div style={{ marginLeft: '15vw', textAlign: 'left', color: '#FFF', fontSize: '3vw'}}>Loading...</div>)

		switch (this.state.form) {
			case this.formStatus.change: 
				fields = (<input className='login__form-block__input' onBlur={offBoard} onFocus={onBoard} autoComplete="off" 
							onChange={e => { this.setState({password: e.target.value}) }}
							placeholder='Новый пароль' value={this.state.password} type="password" name='password' ref={this.password} />)

				return this.getFormTemplate(fields, this.changePassword.bind(this, this.state.password), 'СМЕНИТЬ ПАРОЛЬ')
							
			case this.formStatus.forget:
				fields = (<input id='email' className='login__form-block__input' onBlur={offBoard} onFocus={onBoard} autoComplete="off"
							onChange={e => { this.setState({email: e.target.value}) }}
							placeholder='Почта' value={this.state.email} type="email" name='email' />)

				return this.getFormTemplate(fields, this.sendCode.bind(this, this.state.email), 'ОТПРАВИТЬ КОД', this.submit)
								
			case this.formStatus.loading:
				return fields

			case this.formStatus.code:
				fields = (<input className='login__form-block__input' onBlur={offBoard} onFocus={onBoard} autoComplete="off" 
							onChange={e => { this.setState({tryCode: e.target.value}) }}
							placeholder='Введите код' maxLength='4' type="text" value={this.state.tryCode} name='code'/>)

				return this.getFormTemplate(fields, this.checkEqualCode, 'ПОДТВЕРДИТЬ')

			default:
				fields = (<>
							<input className='login__form-block__input' onBlur={offBoard} onFocus={onBoard} autoComplete="off" 
								onChange={e => { this.setState({login: e.target.value}) }}
								placeholder='Логин' value={this.state.login} type="text" name='login' ref={this.login} />
							<input className='login__form-block__input' onBlur={offBoard} onFocus={onBoard} autoComplete="off" 
								onChange={e => { this.setState({password: e.target.value}) }}
								placeholder='Пароль' value={this.state.password} type="password" name='password' ref={this.password} />
						 	</>)

				return this.getFormTemplate(fields, this.tryLogin, 'ВОЙТИ', this.submit)
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