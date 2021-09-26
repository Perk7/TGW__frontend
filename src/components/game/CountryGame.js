import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {mapStateToProps} from "../../storage/reduxGet";
import LoadingScreen from "react-loading-screen";
import MapRegion from "../../elements/maps/MapRegion";
import identCountries from '../../identCountries';
import coordsRegions from "../../coordsMap";
import Icons from '../../Icons';
import {
    getAlliance,
    getAllRegions,
    getArea,
    getArmy,
    getAvgSalary,
    getVassals,
    getEconomy,
    getPopulation,
    getPoverty, getUnemployment, getWars, getBalance, getDate, getPeacingCountries, getSouseren
} from "../../otherFunctions";
import Flags from "../../Flags";

class CountryGame extends Component {
    constructor() {
        super();
        this.state = {
            load: true,
            regions: [],
            raitings: [],
            slider: 1,
            sliderData: []
        }

        this.makeMap = this.makeMap.bind(this)
        this.makeRaitings = this.makeRaitings.bind(this)
    }

    componentDidMount() {
        if (document.readyState === 'complete') {
            if (!this.state.regions.length) {
                this.makeMap()
                this.makeRaitings()
            }
            this.setState({
                load: false
            })
        } else {
            document.addEventListener('readystatechange', () => {
                if (!this.state.regions.length) {
                    this.makeMap()
                    this.makeRaitings()
                }
                if (document.readyState === 'complete') {
                    this.setState({
                        load: false
                    })
                }
            })
        }
    }

    makeRaitings() {
        let arr = []
        for (let i of this.props.store.createGame.country_ai) {
            let popul = 0
            let area = 0
            let economy = 0
            for (let f of i.regions) {
                for (let z in f) {
                    if (~z.indexOf('industry')) {
                        economy = economy + f[z]
                    }
                }
                popul = popul + f.population
                area = area + f.area
            }
            arr.push({
                name: i.name,
                popul: popul,
                area: area,
                economy: economy,
                ident: i.identify
            })
        }

        let popul = 0
        let area = 0
        let economy = 0
        for (let f of this.props.store.createGame.country.regions) {
            for (let z in f) {
                if (~z.indexOf('industry')) {
                    economy = economy + f[z]
                }
            }
            popul = popul + f.population
            area = area + f.area
        }

        arr.push({
            name: this.props.store.createGame.country.name,
            popul: popul,
            area: area,
            economy: economy,
            ident: this.props.store.createGame.country.identify
        })

        this.setState({
            raitings: arr
        })
    }

    

    makeMap() {
        let arr = []
        for (let i of this.props.store.createGame.country.regions) {
            let coords = coordsRegions[i.name]
            arr.push({
                coords: coords,
                color: '#128450',
                name: i.name
            })
        }

        let wars = getWars(this.props.store.createGame, this.props.store.createGame.country.name).map(e => e.ident)
        let vassals =  getVassals(this.props.store.createGame, this.props.store.createGame.country.name).map(e => e.ident)
        let alliances = getAlliance(this.props.store.createGame, this.props.store.createGame.country.name).map(e => e.ident)
        let souseren = getSouseren(this.props.store.createGame)
        let peaces = getPeacingCountries(this.props.store.createGame)

        for (let i of this.props.store.createGame.country_ai) {
            let hash = i.identify
            let color = null
            if (peaces.indexOf(hash) !== -1) {
                color = '#f6f039'
            } else if (hash === souseren) {
                color = '#dca60e'
            } else if (wars.indexOf(hash) !== -1) {
                color = '#a30101'
            } else if (vassals.indexOf(hash) !== -1) {
                color = '#18b46e'
            } else if (alliances.indexOf(hash) !== -1) {
                color = '#8615bd'
            } else {
                color = '#ddd'
            }
            for (let t of i.regions) {
                let coords = coordsRegions[t.name]
                arr.push({
                    coords: coords,
                    color: color,
                    name: t.name
                })
            }
        }

        this.setState({
            regions: arr
        })
    }

    comparePopulation(a, b) {
        if (a.popul > b.popul) {
            return -1;
        }
        if (a.popul < b.popul) {
            return 1;
        }
        // a должно быть равным b
        return 0;
    }

    compareArea(a, b) {
        if (a.area > b.area) {
            return -1;
        }
        if (a.area < b.area) {
            return 1;
        }
        // a должно быть равным b
        return 0;
    }

    compareEconomy(a, b) {
        if (a.economy > b.economy) {
            return -1;
        }
        if (a.economy < b.economy) {
            return 1;
        }
        // a должно быть равным b
        return 0;
    }

    render() {
        let sliderData = [
            {heading: 'Территория', list: this.state.raitings.sort(this.compareArea).map((e) =>
                    <li key={e.name}>
                        <div style={Flags[e.ident]} className='flag country-game__map-block__raitings__flag' />
                        {e.name} <span>{e.area.toLocaleString()} км2</span>
                    </li> )},
            {heading: 'Население', list: this.state.raitings.sort(this.comparePopulation).map((e) =>
                    <li key={e.name}>
                        <div style={Flags[e.ident]} className='flag country-game__map-block__raitings__flag' />
                        {e.name} <span>{e.popul.toLocaleString()} чел</span>
                    </li> )},
            {heading: 'Экономика', list: this.state.raitings.sort(this.compareEconomy).map((e) =>
                    <li key={e.name}>
                        <div style={Flags[e.ident]} className='flag country-game__map-block__raitings__flag' />
                        {e.name} <span>{e.economy.toLocaleString()} спт</span>
                    </li> )},
            {heading: 'Карта', list: <div className='country-game__map-block__map'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32vw" height="20vw"
                        viewBox={`0 0 270 190`}
                        version="1.1"
                        id="1svg8"
                    >
                        <g
                            id="Море"
                            style={{userSelect: 'none',strokeWidth:'0.188976',strokeMiterlimit:'4',strokeDasharray:'none'}}
                        >
                            {this.state.regions.map((reg) => <MapRegion coord={reg.coords} identy={reg.name} color={reg.color} key={reg.name} />)}
                            <MapRegion coord={coordsRegions['Ввандерфелл']} identy="Ввандерфелл" color='#dddddd' />
                        </g>
                    </svg>
                    <ul className='country-game__map-block__legend'>
                        <li className='country-game__map-block__legend__item'>
                            <div style={{backgroundColor: '#128450', color: '#128450'}}>1</div> 
                            <span>Ваше государство</span>
                        </li>
                        <li className='country-game__map-block__legend__item'>
                            <div style={{backgroundColor: '#a30101', color: '#a30101'}}>1</div> 
                            <span>Противник</span>
                        </li>
                        <li className='country-game__map-block__legend__item'>
                            <div style={{backgroundColor: '#8615bd', color: '#8615bd'}}>1</div> 
                            <span>Союзник</span>
                        </li>
                        <li className='country-game__map-block__legend__item'>
                            <div style={{backgroundColor: '#18b46e', color: '#18b46e'}}>1</div> 
                            <span>Вассал</span>
                        </li>
                        <li className='country-game__map-block__legend__item'>
                            <div style={{backgroundColor: '#f6f039', color: '#f6f039'}}>1</div> 
                            <span>Ненападение</span>
                        </li>
                        <li className='country-game__map-block__legend__item'>
                            <div style={{backgroundColor: '#dca60e', color: '#dca60e'}}>1</div> 
                            <span>Сюзерен</span>
                        </li>
                    </ul>
                </div>},
        ]
        if (!this.state.load) {

            return (
                <div className='game__view'>
                    <header className='game__header'>
                        <div className='game__header__name'>{this.props.store.createGame.country.name}</div>
                        {/*<div>{this.props.store.createGame.time}</div>*/}
                        <div className='country-game__header__time game__header__info'>{getDate(this.props.store.createGame)}</div>
                        <Link to={'/start_game'} className='game__header__quit'>&#215;</Link>
                    </header>
                    <section className='country-game__info-block'>
                        <ul className='country-game__info-block__list overflowing'>
                            <li key='region'>
                                <div style={Icons['region']} className='icon country-game__info-block__list__icon'> </div>
                                Провинции:
                                    <span>{this.props.store.createGame.country.regions.length + ' '}
                                    из
                                    {' ' + getAllRegions(this.props.store.createGame).length}</span>
                            </li>
                            <li key='population'>
                                <div style={Icons['population']} className='icon country-game__info-block__list__icon'> </div>
                                Население:
                                    <span>
                                        {getPopulation(this.props.store.createGame.country, true) + ' '}
                                        <img className='country-game__info-block__icon' src={'images/icons/people.svg'} alt=""/>
                                    </span>
                            </li>
                            <li key='area'>
                                <div style={Icons['area']} className='icon country-game__info-block__list__icon'> </div>
                                Площадь:
                                    <span>{getArea(this.props.store.createGame.country, true)} км2</span>
                            </li>
                            <li key='economy'>
                                <div style={Icons['economy']} className='icon country-game__info-block__list__icon'> </div>
                                ВВП:
                                    <span>
                                        {getEconomy(this.props.store.createGame.country, true) + ' '}
                                        <img className='country-game__info-block__icon' src={'images/icons/coin.svg'} alt=""/>
                                    </span>
                            </li>
                            <li key='inflation'>
                                <div style={Icons['inflation']} className='icon country-game__info-block__list__icon'> </div>
                                Инфляция:
                                    <span>{(this.props.store.createGame.country.inflation*100).toFixed(2)} %</span>
                            </li>
                            <li key='army'>
                                <div style={Icons['army']} className='icon country-game__info-block__list__icon'> </div>
                                Армия:
                                    <span>
                                        {getArmy(this.props.store.createGame.squad, true) + ' '}
                                        <img className='country-game__info-block__icon' src={'images/icons/people.svg'} alt=""/>
                                    </span>
                            </li>
                            <li key='support'>
                                <div style={Icons['support']} className='icon country-game__info-block__list__icon'> </div>
                                Поддержка:
                                    <span>{(this.props.store.createGame.country.support*100).toFixed(2)} %</span>
                            </li>
                            <li><hr style={{border: '1px solid #FFF'}}/></li>
                            <li key='balance'>
                                <div style={Icons['balance']} className='icon country-game__info-block__list__icon'> </div>
                                Баланс:
                                    <span style={{fontWeight: 600, color: getBalance(this.props.store.createGame) > 0
                                            ? 'var(--more-light)' : 'var(--less-light)'}}>
                                        {getBalance(this.props.store.createGame).toLocaleString() + ' '}
                                        <img className='country-game__info-block__icon' src={'images/icons/coin.svg'} alt=""/>
                                    </span>
                            </li>
                            <li key='kazna'>
                                <div style={Icons['kazna']} className='icon country-game__info-block__list__icon'> </div>
                                Казна:
                                    <span>
                                        {this.props.store.createGame.buffs.kazna.toLocaleString() + ' '}
                                        <img className='country-game__info-block__icon' src={'images/icons/coin.svg'} alt=""/>
                                    </span>
                            </li>
                            <li><hr style={{border: '1px solid #FFF'}}/></li>
                            <li key='salary'>
                                <div style={Icons['salary']} className='icon country-game__info-block__list__icon'> </div>
                                Средняя З/П:
                                    <span>
                                        {getAvgSalary(this.props.store.createGame.country, true) + ' '}
                                        <img className='country-game__info-block__icon' src={'images/icons/coin.svg'} alt=""/>
                                    </span>
                            </li>
                            <li key='poverty'>
                                <div style={Icons['poverty']} className='icon country-game__info-block__list__icon'> </div>
                                Бедность:
                                    <span>{getPoverty(this.props.store.createGame.country, true)} %</span>
                            </li>
                            <li key='unemployment'>
                                <div style={Icons['unemployment']} className='icon country-game__info-block__list__icon'> </div>
                                Безработица:
                                    <span>{getUnemployment(this.props.store.createGame.country, true)} %</span>
                            </li>
                        </ul>
                    </section>
                    <section className='country-game__map-block'>
                        <div className='country-game__map-block__raitings'>
                            <button onClick={() => {
                                if (this.state.slider !== 0) {
                                    this.setState({slider: this.state.slider - 1})
                                } else {
                                    this.setState({slider: 3})
                                }
                            }} className='country-game__map-block__raitings__btn'>←</button>
                            <h3 className='country-game__map-block__raitings__heading'>{sliderData[this.state.slider].heading}</h3>
                            <button onClick={() => {
                                if (this.state.slider !== 3) {
                                    this.setState({slider: this.state.slider + 1})
                                } else {
                                    this.setState({slider: 0})
                                }
                            }} className='country-game__map-block__raitings__btn float-right'>→</button>
                            <ol className='country-game__map-block__raitings__list overflowing'>
                                {sliderData[this.state.slider].list}
                            </ol>
                        </div>
                    </section>
                </div>
            );
        } else {
            return (
                <LoadingScreen
                    loading={this.state.load}
                    bgColor='#000'
                    spinnerColor='#FFF'
                    textColor='#FFF'
                    text='Загрузка игровых данных' >
                    children
                </LoadingScreen>
            )
        }
    }
}

export default connect(mapStateToProps)(CountryGame);