import React from 'react'
import {Link} from "react-router-dom";
import UserService from "../RequestService";
import Flags from '../static_components/Flags';
import { create_game } from "../storage/actions";
import { connect } from 'react-redux';
import {mapStateToProps} from "../storage/reduxGet";
import LoadingScreen from "react-loading-screen";
import SmallMap from './SmallMap';

const userService = new UserService()

class Country extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			load: false
		}

		this.startGame = this.startGame.bind(this)
		this.redir = React.createRef()
	}

	startGame() {
		const data = {
			user: this.props.store.auth.login,
			country: this.props.field.identify
		}
		this.setState({
			load: true
		})
		userService.createGame(data)
			.then(res => res.data)
			.then(
				(result) => {
					let par = JSON.parse(result);
					this.props.create_game(par)
					this.redir.current.click()
				})
			.catch((result) => {
				console.log('There was an error! Please re-check your form.');
			});
	}

	render() {
		return (
			<LoadingScreen
				loading={this.state.load}
				bgColor='#000'
				spinnerColor='#FFF'
				textColor='#FFF'
				text='Загрузка игровых данных для новой кампании' >
			<div className='country-main-block'>
			  <div className='country-main-block__header'>
				<h2 className='country-main-block__heading'>{this.props.field.name || 'Империя Тамриэль'}</h2>
				<div style={Flags[this.props.field.identify]} className='flag country-main-block__header__flag' />
				<SmallMap regions={this.props.field.regions ? this.props.field.regions : []} className='country-main-block__header__map' />
		      </div>
		      <div className='country-main-block__body'>
		      	<div className='country-main-block__body__info'>Столица:		<span className='country-main-block__body__info__value'>{this.props.field.capital || 'Имперский город'}</span></div>
				<div className='country-main-block__body__info'>Население:		<span className='country-main-block__body__info__value'>{this.props.field.population ? this.props.field.population.toLocaleString() : 980.000} чел</span></div>
				<div className='country-main-block__body__info'>Площадь:		<span className='country-main-block__body__info__value'>{this.props.field.area ? this.props.field.area.toLocaleString() : 740.000} км2</span></div>
				<div className='country-main-block__body__info'>ВВП:			<span className='country-main-block__body__info__value'>{this.props.field.gdp ? this.props.field.gdp.toLocaleString() : 25000000} спт</span></div>
				<div className='country-main-block__body__info'>Армия:			<span className='country-main-block__body__info__value'>{this.props.field.army ? this.props.field.army.toLocaleString() : 45000} чел</span></div>
				<div className='country-main-block__body__info'>Правительство:	<span className='country-main-block__body__info__value'>{this.props.field.government || 'Парламентская монархия'}</span></div>
			  </div>
			  <div className='country-main-block__btn-block'>
					<button className='main-scroll-view__btn main-scroll-view__btn_sm' onClick={this.startGame} >НАЧАТЬ ИГРУ</button>
					<button onClick={() => {
						this.setState({
							achive: true
						})
					}
					}><img src="images/icons/target.svg" alt=""/></button>
			  </div>
			  <Link ref={this.redir} hidden to={'/start_game'}>НАЧАТЬ ИГРУ</Link>
			</div>
			<div className='country-main-block__modal' hidden={!this.state.achive}>
				<div className='country-main-block__modal__block'>
					<h3>Условия победы:</h3>
					<ul>
						<li className="country-main-block__modal__item">Увеличить ВВП на душу населения в 2 раза</li>
						<li className="country-main-block__modal__item">Завоевать все провинции</li>
					</ul>
				</div>
				<button onClick={() => {
					this.setState({
						achive: false
					})
				}} className='country-main-block__modal__quit'>&#215;</button>
			</div>
			</LoadingScreen>
		)
	}
}

export default connect(mapStateToProps, { create_game })(Country)