import React from 'react';
import MenuHeader from '../../elements/MenuHeader';
import UserService from "../../RequestService";
import {change_user, auth} from "../../storage/actions";
import {setCookie, offBoard, onBoard} from "../../otherFunctions";
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
			code: null,
			tryCode: '',
			btnForget: false
		}

		this.login = React.createRef()
		this.password = React.createRef()
		this.submit = React.createRef()
		this.back = React.createRef()
		this.forget = React.createRef()

		this.tryLogin = this.tryLogin.bind(this)
		this.getLogger = this.getLogger.bind(this)
		this.getForm = this.getForm.bind(this)
		this.sendCode = this.sendCode.bind(this)
		this.changePassword = this.changePassword.bind(this)
	}

	tryLogin() {
		let user = {
			"login": this.state.login,
			"password": this.state.password,
		};
		userService.login(user)
			.then((result) => {
				let par = JSON.parse(result.data);
				if (par.status === 'success') {
					this.props.change_user()
					this.props.auth({ login: user.login, password: user.password })
					const date = new Date(Date.now() + 120*86400e3);
					setCookie('login', user.login, { expires: date, samesite: 'strict'})
					setCookie('password', user.password, {expires: date, samesite: 'strict'})
					this.setState({
						logger: 'success'
					})
				} else if (par.status === 'wrong') {
					this.setState({
						logger: 'wrong'
					})
				}
			})
			.catch((result) => {
				console.log('There was an error! Please re-check your form.');
			});
	}

	sendCode(mail) {
		this.setState({
			form: 'loading'
		})
		userService.recoveryPasswordCode({ mail: mail})
			.then((result) => {
				let par = JSON.parse(result.data);
				if (par.status === 'success') {
					this.setState({
						logger: '',
						code: par.code,
						form: 'code',
						password: ''
					})
				} else {
					this.setState({
						logger: 'email',
						form: 'forget'
					})
				}
			})
			.catch((result) => {
				console.log('There was an error! Please re-check your form.');
			});
	}

	changePassword(password) {
		this.setState({
			form: 'loading'
		})
		userService.recoveryPassword({ mail: this.state.email, password: password})
			.then((result) => {
				let par = JSON.parse(result.data);
				if (par.status === 'success') {
					this.setState({
						logger: '',
						form: '',
						password: this.state.password,
						btnForget: 'inline-block'
					})
					this.password.current.disabled = false
					this.submit.current.disabled = false
				}
			})
			.catch((result) => {
				console.log('There was an error! Please re-check your form.');
			});
	}

	getLogger() {
		let form = document.querySelector('.login__form-block')
		if (this.state.logger === '') {
			return <div style={{marginTop: '15vh'}}> </div>
		} else if (this.state.logger === 'wrong') {
			form.classList.add('login__form-block_with-logger')
			return <div className='login__form-block__logger'>Неверный логин и(или) пароль</div>
		} else if (this.state.logger === 'success') {
			form.classList.add('login__form-block_with-logger')
			setTimeout(() => {
				if (this.back.current) {
					this.back.current.click()
				}
			}, 2000)
			this.login.current.disabled = true
			this.password.current.disabled = true
			this.submit.current.disabled = true
			this.forget.current.disabled = true
			return <div style={{color: 'limegreen',}} className='login__form-block__logger'>Авторизация прошла успешно</div>
		} else if (this.state.logger === 'email') {
			return <div className='login__form-block__logger'>Пользователя с таким email не найдено</div>
		}
	}

	getForm() {
		if (this.state.code === this.state.tryCode && this.state.form === 'code') {
			return <div className='login__form-block'>
					<form onSubmit={(event) => {
						event.preventDefault()
						this.changePassword(this.state.password)
					}}>
						<input className='login__form-block__input' onBlur={offBoard} onFocus={onBoard} autoComplete="off" onChange={(e) => { this.setState({password: e.target.value}) }}
							   placeholder='Новый пароль' value={this.state.password} type="password" name='password' ref={this.password} />
						<button className='login__form-block__submit' type='submit' ref={this.submit} >СМЕНИТЬ ПАРОЛЬ</button>
					</form>
				   </div>
		}
		if (this.state.form === '') {
			return <div className='login__form-block'>
						<form onSubmit={(event) => {
							event.preventDefault()
							this.tryLogin()
						}}>
							<input className='login__form-block__input' onBlur={offBoard} onFocus={onBoard} autoComplete="off" onChange={(e) => { this.setState({login: e.target.value}) }}
								   placeholder='Логин' value={this.state.login} type="text" name='login' ref={this.login} />
							<input className='login__form-block__input' onBlur={offBoard} onFocus={onBoard} autoComplete="off" onChange={(e) => { this.setState({password: e.target.value}) }}
								   placeholder='Пароль' value={this.state.password} type="password" name='password' ref={this.password} />
							<button className='login__form-block__submit' type='submit' ref={this.submit} >ВОЙТИ</button>
						</form>
					</div>
		} else if (this.state.form === 'forget') {
			return <div className='login__form-block'>
						<form onSubmit={(event) => {
							event.preventDefault()
							this.sendCode(this.state.email)
						}}>
							<input id='email' className='login__form-block__input' onBlur={offBoard} onFocus={onBoard} autoComplete="off" onChange={(e) => { this.setState({email: e.target.value}) }}
								   placeholder='Почта' value={this.state.email} type="email" name='email' />
							<button className='login__form-block__submit' type='submit' ref={this.submit} >ОТПРАВИТЬ КОД</button>
						</form>
					</div>
		} else if (this.state.form === 'loading') {
			return <div style={{ marginLeft: '15vw', textAlign: 'left', color: '#FFF', fontSize: '3vw'}}>Loading...</div>
		} else if (this.state.form === 'code') {
			return <div className='login__form-block'>
					<form>
						<input className='login__form-block__input' onBlur={offBoard} onFocus={onBoard} autoComplete="off" onChange={(e) => {
							this.setState({tryCode: e.target.value})
						}}
							   placeholder='Введите код' maxLength='4' type="text" value={this.state.tryCode} name='code'/>
					</form>
				   </div>
		}
	}

	render() {
		const form = this.getForm()
		const logger = this.getLogger()
		return (
			<div className='view'>
				<div className='login__relative-div'>
				<MenuHeader header='Загрузить игру' ref={this.back} />
				{logger}
				{form}
				<button style={{display: this.state.btnForget}} className='login__forget-btn' onClick={() => {
					this.setState({
						form: 'forget',
						logger: '',
						password: '',
						btnForget: 'none'
					})
				}} ref={this.forget}>Восстановить пароль</button>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, { change_user, auth })(Login)