import React from 'react';

import Country from '../../elements/Country.js';
import MenuHeader from '../../elements/build/MenuHeader';
import LoadingWrap from '../../elements/build/LoadingWrap.js';

import UserService from '../../RequestService';

const userService = new UserService();

export default class NewGame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			country: [],
			countries: [],
			load: true,
			loadHeader: 'Loading...'
		}

		this.changeCountry = this.changeCountry.bind(this)
		this.selectCountries = this.selectCountries.bind(this)
		this.handleServerError = this.handleServerError.bind(this)
	}

	handleServerError() {
		console.error('There was an error!');
		this.setState({ 
			loadHeader: 'Произошла ошибка',
			load: true,
		});
		setTimeout(() => {
			this.setState({ 
				loadHeader: 'Loading',
				load: false,
			});
		}, 2000)
	}

	selectCountries() {
		userService.allCountries()
			.then(result => {
					let par = JSON.parse(result.data);

					this.setState({
						countries: par,
						country: par[0].fields,
						load: false
					});
				})
			.catch(this.handleServerError)
	}

	componentDidMount() {
		this.selectCountries()
	}

	changeCountry(country, el) {
		this.setState({
			country: country,
			selected: el.currentTarget
		})
	}

	render() {
		return (
			<LoadingWrap loading={this.state.load} text={this.state.loadHeader} >
				<div className='dark-view'>  
				  <div className='new-navbar'> 
				  	<MenuHeader header='Кампания' />
			
			        <nav className='new-scroll-view overflowing'>
			          	{this.state.countries.map(e =>
						  <button key={e.pk} onClick={this.changeCountry.bind(this, e.fields)}
							  className={e.fields.identify === this.state.country.identify
								  ?'main-scroll-view__btn main-scroll-view__btn_new main-scroll-view__btn_new_active button'
								  :'main-scroll-view__btn main-scroll-view__btn_new button'}>
							  {e.fields.name}
						  </button> 
						)}
			        </nav>	
			      </div> 
			      <div className='new-countryblock'>
					  <Country field={this.state.country} />  
			      </div>
			    </div>
			</LoadingWrap>
		)
	}
}