import React, {Component} from 'react';
import LoadingScreen from "react-loading-screen";
import {connect} from "react-redux";
import {mapStateToProps} from "../../storage/reduxGet";
import {change_game, change_buffs} from "../../storage/actions";
import {Link} from "react-router-dom";
import Tutorial from "../../elements/Tutorial";
import EmptyActions from "../../elements/EmptyActions";
import Header from "../../elements/Header";
import {getPeopleDelivery} from "../../otherFunctions";
import ValueBar from "../../elements/ValueBar";

class ScienceGame extends Component {

    constructor() {
        super();
        this.state = {
            load: true,
            tutorial: false,
            description: 'Здесь показан научно-технологический уровень государства в 4ех наиболее важных направлениях' +
                         ' Тамриэля: алхимия, наука, магия, технологии.;;' +
                         'Скорость развития или же деградации завсисит от того, как хорошо вы финансируете исследования из своего бюджета.' +
                         ' Также есть возможность выделить дополнительные средства на стимул к развитию направления, но для ' +
                         'этого придется вложить много денег из казны.;;' +
                         'Хороший уровень технологий даст явное преимущество в военных действиях, эффективности экономики и производства, ' +
                         'а также повысит уровень жизни граждан и, как следствие, вашу поддержку.',
            redactor: false,

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

    getRedactor() {
        const prices = {
          magic: 35,
          science: 40,
          technology: 35,
          alchemy: 30,
        }

        return [1, 2, 5, 10].map(e =>
            <li onClick={ev => {
                let buff = this.props.store.createGame.buffs
                if (parseInt(e*prices[this.state.current]*400000) <= buff.kazna) {
                    if (this.props.store.changeGame.indexOf('science') === -1 && buff.actions - 2 >= 0) {
                        this.props.change_game('science')
                        this.props.change_buffs({
                            actions: buff.actions - 2,
                        })
                        this.props.change_buffs({
                            [this.state.current]: buff[this.state.current] + e*0.01,
                            kazna: buff.kazna - parseInt(e*prices[this.state.current]*400000),

                            education_quality: buff.education_quality + e*0.0025,
                            education_access: buff.education_access + e*0.0025,
                            industry_typography: buff.industry_typography + e*0.0025,
                            industry_light: buff.industry_light + e*0.0025,
                            industry_alchemy: buff.industry_alchemy + e*0.0025,
                        })
                        this.setState({
                            changer: !this.state.changer
                        })
                    } else if (this.props.store.changeGame.indexOf('science') !== -1) {
                        this.props.change_buffs({
                            [this.state.current]: buff[this.state.current] + (this.state.current === 'aqueducs' ? e : e * 0.01),
                            kazna: buff.kazna - parseInt(e*prices[this.state.current]*400000),

                            education_quality: buff.education_quality + e*0.0025,
                            education_access: buff.education_access + e*0.0025,
                            industry_typography: buff.industry_typography + e*0.0025,
                            industry_light: buff.industry_light + e*0.0025,
                            industry_alchemy: buff.industry_alchemy + e*0.0025,
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
            }} className='transport-game__redact-list__item' key={e}>
                <span>{e} %</span>
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
                    <Header name={'Наука и исследования'} tutorial={() => {
                        this.setState({tutorial: !this.state.tutorial})
                    }} />
                    <div className='politic-game__scroll-block'>
                        <div className='science-game__block'>
                            <span>
                                <img className='icons' src={`images/icons/alchemy.svg`} alt=""/>
                                Алхимия:
                            </span>
                            <div className='science-game__block__value'>
                                <ValueBar
                                    style={{width: '85%', height: '1.5em'}}
                                    value={this.props.store.createGame.country.alchemy*98}
                                    color={'var(--progress)'}
                                />
                                <button onClick={() => {
                                    this.setState({
                                        redactor: !this.state.redactor,
                                        current: 'alchemy'
                                    })
                                }} className='redact__controls'>+</button>
                            </div>
                        </div>
                        <div className='science-game__block'>
                            <span>
                                <img className='icons' src={`images/icons/magic.svg`} alt=""/>
                                Магия:
                            </span>
                            <div className='science-game__block__value'>
                                <ValueBar
                                    style={{width: '85%', height: '1.5em'}}
                                    value={this.props.store.createGame.country.magic*98}
                                    color={'var(--progress)'}
                                />
                                <button onClick={() => {
                                    this.setState({
                                        redactor: !this.state.redactor,
                                        current: 'magic'
                                    })
                                }} className='redact__controls'>+</button>
                            </div>
                        </div>
                        <div className='science-game__block'>
                            <span>
                                <img className='icons' src={`images/icons/science.svg`} alt=""/>
                                Наука:
                            </span>
                            <div className='science-game__block__value'>
                                <ValueBar
                                    style={{width: '85%', height: '1.5em'}}
                                    value={this.props.store.createGame.country.science*98}
                                    color={'var(--progress)'}
                                />
                                <button onClick={() => {
                                    this.setState({
                                        redactor: !this.state.redactor,
                                        current: 'science'
                                    })
                                }} className='redact__controls'>+</button>
                            </div>
                        </div>
                        <div className='science-game__block'>
                            <span>
                                <img className='icons' src={`images/icons/technology.svg`} alt=""/>
                                Технологии:
                            </span>
                            <div className='science-game__block__value'>
                                <ValueBar
                                    style={{width: '85%', height: '1.5em'}}
                                    value={this.props.store.createGame.country.technology*98}
                                    color={'var(--progress)'}
                                />
                                <button onClick={() => {
                                    this.setState({
                                        redactor: !this.state.redactor,
                                        current: 'technology'
                                    })
                                }} className='redact__controls'>+</button>
                            </div>
                        </div>
                    </div>
                    <Tutorial text={this.state.description} hide={!this.state.tutorial} quit={() => {
                        this.setState({tutorial: !this.state.tutorial})
                    }} />
                    <div className='politic-game__redact-list modal-blur' hidden={!this.state.redactor}>
                        <ul className='transport-game__redact-list overflowing'>
                            <li className='transport-game__redact-list__heading'>Увеличить на:</li>
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

export default connect(mapStateToProps, { change_game, change_buffs })(ScienceGame);