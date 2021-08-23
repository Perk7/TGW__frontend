import React from 'react';
import { Link } from "react-router-dom";

import Country from '../../elements/Country.js';
import UserService from '../../CustomersService';
import LoadingScreen from 'react-loading-screen'

const userService = new UserService();

export default class NewGame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			coun: [],
			countries: [],
			load: true,
		}

		this.changeCountry = this.changeCountry.bind(this)
		this.selectCountries = this.selectCountries.bind(this)
	}

	selectCountries() {
		userService.allCountries()
		.then(res => res.data)
        .then(
	        (result) => {
	        	let par = JSON.parse(result);

		        this.setState({
		          countries: par,
		          coun: par[0].fields,
		          load: false
		        });
	        },
		)}

	componentDidMount() {
		this.selectCountries()
	}

	changeCountry(coun, e) {
		this.setState({
			coun: coun,
			selected: e.currentTarget
		})
	}

	render() {
		return (
			<LoadingScreen
			    loading={this.state.load}
			    bgColor='#000'
			    spinnerColor='#FFF'
			    textColor='#FFF'

			    text='Loading...' >
				<div className='dark-view'>  
				  <div className='new-navbar'> 
			        <header className='side-header'>
			          <Link to={'/home'} className='header__btn_back'>←</Link>
			          <h1 className='side-heading'>Кампания</h1>
			        </header>
			        <nav className='new-scroll-view'>
			          {this.state.countries.map(e =>
						  <button key={e.pk} onClick={(ad) =>
							  this.changeCountry(e.fields, ad)}
							  className={e.fields.identify === this.state.coun.identify
								  ?'main-scroll-view__btn main-scroll-view__btn_new main-scroll-view__btn_new_active'
								  :'main-scroll-view__btn main-scroll-view__btn_new'}>
							  {e.fields.name}
						  </button> )}
			        </nav>	
			      </div> 
			      <div className='new-countryblock'>
					  <Country field={this.state.coun} />  
			      </div>
			    </div>
		    </LoadingScreen>
		)
	}
}