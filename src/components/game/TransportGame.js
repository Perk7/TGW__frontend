import React, {Component} from 'react';
import LoadingScreen from "react-loading-screen";
import {connect} from "react-redux";
import {mapStateToProps} from "../../storage/reduxGet";
import { change_game, change_buffs } from "../../storage/actions";
import {Link} from "react-router-dom";
import Tutorial from "../../elements/Tutorial";
import {
    getAqueducs,
    getCargoDelivery, getColor,
    getPaveRoads,
    getPeopleDelivery,
    getPort,
    getStoneRoads
} from "../../otherFunctions";
import EmptyActions from "../../elements/EmptyActions";
import Header from "../../elements/Header";
import ProgressBar from "../../elements/ProgressBar";
import ValueBar from "../../elements/ValueBar";

class TransportGame extends Component {

    constructor() {
        super();
        this.state = {
            load: true,
            tutorial: false,
            description: 'Здесь вы видите всю текущую обстановку в стране, касаемо инфраструктуры.;;'+
                         'Существуют 3 типа дорог: земляные, гравийные и мощеные. Последние 2 типа являются ' +
                         'предпочтительными, т.к. их преобладание облегчит экономические взаимосвязи государства и, ' +
                         'как следствие, увеличит благополучие экономики. Население также не оставит такого благоприятного ' +
                         'изменения без бонуса в вашу копилку.;;' +
                         'Все показатели, в случае хорошего финансирования инфраструктуры во вкладке "экономика", будут по-тихоньку ' +
                         'расти, но вы можете разовыми вливаниями повысить качество той или иной сферы на определенное значение.;;' +
                         'Развитие инфраструктуры в долгосрочной перспективе может стать очень полезным для военных действий ' +
                         'и дать вам преимущество в сражениях.',
            redactor: false,
            redactorArr: [],
            redactorHeader: [],
            current: '',

            changer: false,
            emptyActions: false,
            emptyHeader: ''
        }

    }

    componentDidMount() {
        if (document.readyState === 'complete') {
            this.setState({
                load: false
            })
        } else {
            document.addEventListener('readystatechange', () => {
                if (document.readyState === 'complete') {
                    this.setState({
                        load: false
                    })
                }
            })
        }
    }

    getTransport() {
        let sum = getStoneRoads(this.props.store.createGame.country) +
                  getPaveRoads(this.props.store.createGame.country) +
                  this.props.store.createGame.country.export_trash +
                  getPort(this.props.store.createGame.country) +
                  getPort(this.props.store.createGame.country) +
                  getPort(this.props.store.createGame.country)
        sum = sum / 6 * 100
        return sum.toFixed(0)
    }

    getRedactor() {
        const prices = {
            stone_road: 3,
            pave_road: 7,
            export_trash: 20,
            port: 40,
            cargo_ship: 25,
            people_ship: 35,
            aqueducs: 20,
        }

        return this.state.redactorArr.map(e =>
            <li onClick={ev => {
                let buff = this.props.store.createGame.buffs
                if (parseInt(e*prices[this.state.current]*400000) <= buff.kazna) {
                    if (this.props.store.changeGame.indexOf('transport') === -1 && buff.actions - 2 >= 0) {
                        this.props.change_game('transport')
                        this.props.change_buffs({
                            actions: buff.actions - 2,
                        })
                        this.props.change_buffs({
                            [this.state.current]: buff[this.state.current] + (this.state.current === 'aqueducs' ? e : e * 0.01),

                            army_quality: buff.army_quality + (this.state.current === 'aqueducs' ? e * 0.001 : e * 0.005),

                            industry_blackmetall: buff.industry_blackmetall + (this.state.current === 'aqueducs' ? e * 0.0005 : e * 0.0025),
                            industry_colormetall: buff.industry_colormetall + (this.state.current === 'aqueducs' ? e * 0.0005 : e * 0.0025),
                            industry_coal: buff.industry_coal + (this.state.current === 'aqueducs' ? e * 0.0005 : e * 0.0025),

                            industry_forestry: buff.industry_forestry + (this.state.current === 'aqueducs' ? e * 0.0005 : e * 0.0025),

                            industry_animals: buff.industry_animals + (this.state.current === 'aqueducs' ? e * 0.0005 : e * 0.0025),
                            industry_vegetable: buff.industry_vegetable + (this.state.current === 'aqueducs' ? e * 0.0005 : e * 0.0025),
                            industry_wheat: buff.industry_wheat + (this.state.current === 'aqueducs' ? e * 0.0005 : e * 0.0025),

                            industry_transport: buff.industry_transport + (this.state.current === 'aqueducs' ? e * 0.0005 : e * 0.0025),

                            kazna: buff.kazna - parseInt(e*prices[this.state.current]*400000)
                        })
                        this.setState({
                            changer: !this.state.changer
                        })
                    } else if (this.props.store.changeGame.indexOf('transport') !== -1) {
                        this.props.change_buffs({
                            [this.state.current]: buff[this.state.current] + (this.state.current === 'aqueducs' ? e : e * 0.01),

                            army_quality: buff.army_quality + (this.state.current === 'aqueducs' ? e * 0.001 : e * 0.005),

                            industry_blackmetall: buff.industry_blackmetall + (this.state.current === 'aqueducs' ? e * 0.0005 : e * 0.0025),
                            industry_colormetall: buff.industry_colormetall + (this.state.current === 'aqueducs' ? e * 0.0005 : e * 0.0025),
                            industry_coal: buff.industry_coal + (this.state.current === 'aqueducs' ? e * 0.0005 : e * 0.0025),

                            industry_forestry: buff.industry_forestry + (this.state.current === 'aqueducs' ? e * 0.0005 : e * 0.0025),

                            industry_animals: buff.industry_animals + (this.state.current === 'aqueducs' ? e * 0.0005 : e * 0.0025),
                            industry_vegetable: buff.industry_vegetable + (this.state.current === 'aqueducs' ? e * 0.0005 : e * 0.0025),
                            industry_wheat: buff.industry_wheat + (this.state.current === 'aqueducs' ? e * 0.0005 : e * 0.0025),

                            industry_transport: buff.industry_transport + (this.state.current === 'aqueducs' ? e * 0.0005 : e * 0.0025),

                            kazna: buff.kazna - parseInt(e*prices[this.state.current]*400000)
                        })

                        this.setState({
                            changer: !this.state.changer
                        })
                    } else {
                        ev.preventDefault()
                        this.setState({
                            emptyActions: true
                        })

                        let promise = new Promise((resolve) => {
                            setTimeout(() => {
                                resolve('ee')
                            }, 2000);
                        });
                        promise.then(
                            result =>
                                this.setState({
                                    emptyActions: false
                                })
                        )
                    }
                } else {
                    ev.preventDefault()

                    this.setState({
                        emptyActions: true,
                        emptyHeader: 'В казне не хватает денег'
                    })

                    let promise = new Promise((resolve) => {
                        setTimeout(() => { resolve('ee') }, 2000);
                    });
                    promise.then(
                        result => {
                            this.setState({
                                emptyActions: false,
                                emptyHeader: ''
                            })
                        }
                    )
                }
            }} data-value={e} className='transport-game__redact-list__item' key={this.state.redactorArr.indexOf(e)}>
                <span>{e} {this.state.redactorHeader[1]}</span>
                <div>
                    {parseInt(e*prices[this.state.current]*400000).toLocaleString()
                    + ' '}
                    <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/>
                </div>
            </li>
        )
    }

    render() {
        if (!this.state.load) {
            return (
                <div className='game__view'>
                    <Header name={'Инфраструктура'} tutorial={() => {
                        this.setState({tutorial: !this.state.tutorial})
                    }} />
                    <div className='politic-game__scroll-block overflowing'>
                         <div className='transport-game__block transport-game__heading'>
                             <span>
                                 <img className='icons' src={`images/icons/infrastructure.svg`} alt=""/>
                                 Качество инфраструктуры:
                             </span>
                             <ProgressBar
                                 style={{height: '1.25em', width: '12.5em', fontSize: '0.8em', marginTop: '0.25em'}}
                                 color={'var(--progress)'}
                                 value={this.getTransport()}
                             />
                         </div>
                        <div className='transport-game__block transport-game__road-block'>
                            <span>
                                <img className='icons' src={`images/icons/road.svg`} alt=""/>
                                Дороги:
                            </span>
                            <ul className='transport-game__road-list'>
                                <li className='transport-game__road-list__item'>
                                    <span>Земляные:</span>
                                    <span>{(100 - getStoneRoads(this.props.store.createGame.country)*100
                                              - getPaveRoads(this.props.store.createGame.country)*100).toFixed(1)}%</span>
                                </li>
                                <li className='transport-game__road-list__item'>
                                    <span>Гравийные:</span>
                                    <span>{(getStoneRoads(this.props.store.createGame.country)*100).toFixed(1)}%</span>
                                    <button onClick={() => {
                                        this.setState({
                                            redactor: !this.state.redactor,
                                            redactorHeader: ['Увеличить на', '%'],
                                            redactorArr: [1,2,5,10],
                                            current: 'stone_road'
                                        })
                                    }} className='redact__controls'>+</button>
                                </li>
                                <li className='transport-game__road-list__item'>
                                    <span>Мощеные:</span>
                                    <span>{(getPaveRoads(this.props.store.createGame.country)*100).toFixed(1)}%</span>
                                    <button onClick={() => {
                                        this.setState({
                                            redactor: !this.state.redactor,
                                            redactorHeader: ['Увеличить на', '%'],
                                            redactorArr: [1,2,5,10],
                                            current: 'pave_road'
                                        })
                                    }} className='redact__controls'>+</button>
                                </li>
                            </ul>
                        </div>
                        <div className='transport-game__block transport-game__road-block'>
                            <span>
                                <img className='icons' src={`images/icons/trash.svg`} alt=""/>
                                Утилизация отходов:
                            </span>
                            <ValueBar
                                style={{width: '40%', height: '1.5em', marginRight: '8%'}}
                                value={(this.props.store.createGame.country.export_trash*98).toFixed(1)}
                                color={'var(--progress)'}
                            />
                            <button onClick={() => {
                                this.setState({
                                    redactor: !this.state.redactor,
                                    redactorHeader: ['Увеличить на', '%'],
                                    redactorArr: [1,2,5,10],
                                    current: 'export_trash'
                                })
                            }} className='redact__controls'>+</button>
                        </div>
                        <div className='transport-game__block transport-game__road-block'>
                            <span>
                                <img className='icons' src={`images/icons/port.svg`} alt=""/>
                                Качество портов:
                            </span>
                            <ValueBar
                                style={{width: '40%', height: '1.5em', marginRight: '8%'}}
                                value={(getPort(this.props.store.createGame.country)*98).toFixed(1)}
                                color={'var(--progress)'}
                            />
                            <button onClick={() => {
                                this.setState({
                                    redactor: !this.state.redactor,
                                    redactorHeader: ['Увеличить на', '%'],
                                    redactorArr: [1,2,5,10],
                                    current: 'port'
                                })
                            }} className='redact__controls'>+</button>
                        </div>
                        <div className='transport-game__block transport-game__road-block'>
                            <span>
                                <img className='icons' src={`images/icons/cargo.svg`} alt=""/>
                                Перевозка грузов:
                            </span>
                            <ValueBar
                                style={{width: '40%', height: '1.5em', marginRight: '8%'}}
                                value={(getCargoDelivery(this.props.store.createGame.country)*98).toFixed(1)}
                                color={'var(--progress)'}
                            />
                            <button onClick={() => {
                                this.setState({
                                    redactor: !this.state.redactor,
                                    redactorHeader: ['Увеличить на', '%'],
                                    redactorArr: [1,2,5,10],
                                    current: 'cargo_ship'

                                })
                            }} className='redact__controls'>+</button>
                        </div>
                        <div className='transport-game__block transport-game__road-block'>
                            <span>
                                <img className='icons' src={`images/icons/people-delivery.svg`} alt=""/>
                                Перевозка людей:
                            </span>
                            <ValueBar
                                style={{width: '40%', height: '1.5em', marginRight: '8%'}}
                                value={(getPeopleDelivery(this.props.store.createGame.country)*98).toFixed(1)}
                                color={'var(--progress)'}
                            />
                            <button onClick={() => {
                                this.setState({
                                    redactor: !this.state.redactor,
                                    redactorHeader: ['Увеличить на', '%'],
                                    redactorArr: [1,2,5,10],
                                    current: 'people_ship'
                                })
                            }} className='redact__controls'>+</button>
                        </div>
                        <div className='transport-game__block transport-game__road-block'>
                            <span>
                                <img className='icons' src={`images/icons/aqueduc.svg`} alt=""/>
                                Акведуки:
                            </span>
                            <div className='transport-game__aqua-value'>
                                <span>{getAqueducs(this.props.store.createGame.country)} шт.</span>
                                <button onClick={() => {
                                    this.setState({
                                        redactor: !this.state.redactor,
                                        redactorHeader: ['Построить', 'шт.'],
                                        redactorArr: [1,5,10,25],
                                        current: 'aqueducs'
                                    })
                                }} className='redact__controls'>+</button>
                            </div>
                        </div>
                    </div>
                    <Tutorial text={this.state.description} hide={!this.state.tutorial} quit={() => {
                        this.setState({tutorial: !this.state.tutorial})
                    }} />
                    <div className='politic-game__redact-list modal-blur' hidden={!this.state.redactor}>
                        <ul className='overflowing'>
                            <li className='transport-game__redact-list__heading'>
                                {this.state.redactorHeader[0]}:
                                <span style={{float: 'right', margin: '0 5vw 0 0', fontSize: '2vw', color: '#fff'}}><img style={{marginBottom: '1vw'}} className='icons' src={'images/icons/action.svg'} alt=""/>2</span>
                            </li>
                            {this.getRedactor()}
                        </ul>
                        <button onClick={(e) => {
                            this.setState({redactor: !this.state.redactor})
                        }} className='politic-game__redact-quit modal-quit' hidden={!this.state.redactor}>&#215;</button>
                    </div>
                    <div hidden={!this.state.emptyActions}>
                        <EmptyActions text={this.state.emptyHeader} />
                    </div>
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

export default connect(mapStateToProps, { change_game, change_buffs })(TransportGame);