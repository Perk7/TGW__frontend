import React, {Component} from 'react';
import LoadingScreen from "react-loading-screen";
import {connect} from "react-redux";
import {mapStateToProps} from "../../storage/reduxGet";
import {change_game, change_buffs, set_social} from "../../storage/actions";
import Tutorial from "../../elements/Tutorial";
import {getSocialSpends} from "../../otherFunctions";
import EmptyActions from "../../elements/EmptyActions";
import Header from "../../elements/Header";

class SocialGame extends Component {

    constructor() {
        super();
        this.state = {
            load: true,
            tutorial: false,
            description: 'Социальное развитие является одной из важнейших частей успешного развития государства. ' +
                         'Достойные выплаты укрепят ваш политический режим и помогут быстрее ассимилировать ' +
                         'захваченные территории.;;' +
                         'Большой материнский капитал даст стимул к росту населения. Но завышенное пособие по безработице ' +
                         'может, наоборот, лишить мотивации искать работу и повысить безработицу.;;' +
                         'Размер пенсии и пенсионный возраст могут сыграть весомую роль в судьбе вашей страны. ' +
                         'Cнижение пенсионного возраста понесет за собой экономические проблемы.',
            changer: false,
            emptyActions: false
        }

        this.getRedactSocial = this.getRedactSocial.bind(this)
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

    getRedactSocial() {
        let properties = {
            avg_pension: this.props.store.createGame.country.avg_pension,
            maternal_capital: this.props.store.createGame.country.maternal_capital,
            pension_m: this.props.store.createGame.country.pension_m,
            pension_w: this.props.store.createGame.country.pension_w,
            allowance_disability: this.props.store.createGame.country.allowance_disability,
            allowance_unemploy: this.props.store.createGame.country.allowance_unemploy
        }

        let valuesPension = {
            w: {
                '45': '1',
                '50': '2',
                '55': '3',
                '60': '4'
            },
            m: {
                '50': '1',
                '55': '2',
                '60': '3',
                '65': '4'
            }
        }

        return (<>
                <li className='social-game__list__item' key='1'>
                    <span className='social-game__list__item__label'>Материнский капитал</span>
                    <div className='social-game__list__item__redactor'>
                        <button data-type='dec' data-target='maternal_capital' className='social-game__list__controls redact__controls'>-</button>
                        <input id='maternal_capital__value' type="number" className='social-game__list__number redact__number' disabled={true} value={properties.maternal_capital} />
                        <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/>
                        <button data-type='inc' data-target='maternal_capital' className='social-game__list__controls redact__controls'>+</button>
                    </div>
                </li>
                <li className='social-game__list__item' key='2'>
                    <span className='social-game__list__item__label'>Средняя пенсия</span>
                    <div className='social-game__list__item__redactor'>
                        <button data-type='dec' data-target='avg_pension' className='social-game__list__controls redact__controls'>-</button>
                        <input id='avg_pension__value' type="number" className='social-game__list__number redact__number' disabled={true} value={properties.avg_pension} />
                        <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/>
                        <button data-type='inc' data-target='avg_pension' className='social-game__list__controls redact__controls'>+</button>
                    </div>
                </li>
                <li className='social-game__list__item' key='3'>
                    <span className='social-game__list__item__label'>Пособие по безработице</span>
                    <div className='social-game__list__item__redactor'>
                        <button data-type='dec' data-target='allowance_unemploy' className='social-game__list__controls redact__controls'>-</button>
                        <input id='allowance_unemploy__value' type="number" className='social-game__list__number redact__number' disabled={true} value={properties.allowance_unemploy} />
                        <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/>
                        <button data-type='inc' data-target='allowance_unemploy' className='social-game__list__controls redact__controls'>+</button>
                    </div>
                </li>
                <li className='social-game__list__item' key='4'>
                    <span className='social-game__list__item__label'>Пособие по инвалидности</span>
                    <div className='social-game__list__item__redactor'>
                        <button data-type='dec' data-target='allowance_disability' className='social-game__list__controls redact__controls'>-</button>
                        <input id='allowance_disability__value' type="number" className='social-game__list__number redact__number' disabled={true} value={properties.allowance_disability} />
                        <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/>
                        <button data-type='inc' data-target='allowance_disability' className='social-game__list__controls redact__controls'>+</button>
                    </div>
                </li>
                <li className='social-game__list__item' key='5'>
                    <span className='social-game__list__item__label_lg'>Возраст выхода на пенсию (М)</span>
                    <div id='pension_m' className='social-game__list__item__values-block'>{['50', '55', '60', '65'].map((ev) => {
                        return (
                            <span key={ev}>
                                <input type='radio' id={`Возраст выхода на пенсию-м-${ev}`}
                                       name={'Возраст выхода на пенсию (М)'}
                                       style={{display: 'none'}}
                                       data-num={0}
                                       value={valuesPension.m[ev]}
                                       defaultChecked={valuesPension.m[ev] === properties.pension_m}
                                       onClick={(e) => {
                                           let buff = this.props.store.createGame.buffs
                                           let raz = +this.props.store.createGame.country.pension_m - e.target.value

                                           if (this.props.store.changeGame.indexOf('social') === -1 && buff.actions - 2 >= 0) {
                                               this.props.change_game('social')
                                               this.props.change_buffs({
                                                   actions: buff.actions - 2,
                                               })
                                               this.props.change_buffs({
                                                   support: buff.support + 0.025*raz,
                                               })
                                               this.props.set_social({
                                                   target: 'pension_m',
                                                   value: e.target.value.toString()
                                               })
                                               this.setState({
                                                   changer: !this.state.changer
                                               })
                                           } else if (this.props.store.changeGame.indexOf('social') !== -1) {
                                               this.props.change_buffs({
                                                   support: buff.support + 0.025*raz,
                                               })
                                               this.props.set_social({
                                                   target: 'pension_m',
                                                   value: e.target.value.toString()
                                               })
                                               this.setState({
                                                   changer: !this.state.changer
                                               })
                                           } else {
                                               e.preventDefault()
                                               this.setState({
                                                   emptyActions: true
                                               })

                                               let promise = new Promise((resolve) => {
                                                   setTimeout(() => { resolve('ee') }, 2000);
                                               });
                                               promise.then(
                                                   result =>
                                                       this.setState({
                                                           emptyActions: false
                                                       })
                                               )
                                           }
                                        }
                                   }
                                />
                                <label className='social-game__list__item__values' htmlFor={`Возраст выхода на пенсию-м-${ev}`}>{ev}</label>
                            </span> )
                    })}</div>
                </li>
                <li className='social-game__list__item' key='6'>
                    <span className='social-game__list__item__label_lg'>Возраст выхода на пенсию (Ж)</span>
                    <div id='pension_w' className='social-game__list__item__values-block'>{['45', '50', '55', '60'].map((ev) => {
                        return (
                            <span key={ev}>
                                <input type='radio' id={`Возраст выхода на пенсию-ж-${ev}`}
                                       name={'Возраст выхода на пенсию (Ж)'}
                                       style={{display: 'none'}}
                                       data-num={0}
                                       value={valuesPension.w[ev]}
                                       defaultChecked={valuesPension.w[ev] === properties.pension_w}
                                       onClick={(e) => {
                                           let buff = this.props.store.createGame.buffs
                                           let raz = +this.props.store.createGame.country.pension_w - e.target.value

                                           if (this.props.store.changeGame.indexOf('social') === -1 && buff.actions - 2 >= 0) {
                                               this.props.change_game('social')
                                               this.props.change_buffs({
                                                   actions: buff.actions - 2,
                                               })
                                               this.props.change_buffs({
                                                   support: buff.support + 0.025*raz,
                                               })
                                               this.props.set_social({
                                                   target: 'pension_w',
                                                   value: e.target.value.toString()
                                               })
                                               this.setState({
                                                   changer: !this.state.changer
                                               })
                                           } else if (this.props.store.changeGame.indexOf('social') !== -1) {
                                               this.props.change_buffs({
                                                   support: buff.support + 0.025*raz,
                                               })
                                               this.props.set_social({
                                                   target: 'pension_w',
                                                   value: e.target.value.toString()
                                               })
                                               this.setState({
                                                   changer: !this.state.changer
                                               })
                                           } else {
                                               e.preventDefault()
                                               this.setState({
                                                   emptyActions: true
                                               })

                                               let promise = new Promise((resolve) => {
                                                   setTimeout(() => { resolve('ee') }, 2000);
                                               });
                                               promise.then(
                                                   result =>
                                                       this.setState({
                                                           emptyActions: false
                                                       })
                                               )
                                           }
                                        }
                                       }
                                />
                                <label className='social-game__list__item__values' htmlFor={`Возраст выхода на пенсию-ж-${ev}`}>{ev}</label>
                            </span> )
                    })}</div>
                </li>
            </>
        )
    }

    render() {
        if (!this.state.load) {
            return (
                <div className='game__view'>
                    <Header name={'Социальное развитие'} tutorial={() => {
                        this.setState({tutorial: !this.state.tutorial})
                    }} />
                    <div className='politic-game__scroll-block overflowing'>
                        <div className='social-game__heading'>
                            <img className='icons' src={"images/icons/spending.svg"} alt=""/>
                            Суммарные затраты:
                            <span> {getSocialSpends(this.props.store.createGame.country).toLocaleString()} <img className='icons' src={'images/icons/coin.svg'} alt=""/></span>
                            <span style={{marginLeft: '4vw'}}><img className='icons' src={'images/icons/action.svg'} alt=""/>2</span>
                        </div>
                        <ul onClick={e => {
                            if (e.target.nodeName !== 'BUTTON') {
                                return
                            }
                            let type = e.target.dataset.type === 'inc' ? 1 : -1
                            let target = e.target.dataset.target
                            target = this.props.store.createGame.country[target]
                            let buff = this.props.store.createGame.buffs

                            if (this.props.store.changeGame.indexOf('social') === -1 && buff.actions - 2 >= 0) {
                                this.props.change_game('social')
                                this.props.change_buffs({
                                    actions: buff.actions - 2,
                                })
                                this.props.change_buffs({
                                    support: buff.support + 0.001*type,
                                })
                                this.props.set_social({
                                    target: e.target.dataset.target,
                                    value: target + 50*type
                                })
                                this.setState({
                                    changer: !this.state.changer
                                })
                            } else if (this.props.store.changeGame.indexOf('social') !== -1) {
                                this.props.change_buffs({
                                    support: buff.support + 0.001*type,
                                })
                                this.props.set_social({
                                    target: e.target.dataset.target,
                                    value: target + 50*type
                                })
                                this.setState({
                                    changer: !this.state.changer
                                })
                            } else {
                                e.preventDefault()
                                this.setState({
                                    emptyActions: true
                                })

                                let promise = new Promise((resolve) => {
                                    setTimeout(() => { resolve('ee') }, 2000);
                                });
                                promise.then(
                                    result =>
                                        this.setState({
                                            emptyActions: false
                                        })
                                )
                            }
                        }} className='social-game__list'>
                            {this.getRedactSocial()}
                        </ul>
                    </div>
                    <Tutorial text={this.state.description} hide={!this.state.tutorial} quit={() => {
                        this.setState({tutorial: !this.state.tutorial})
                    }} />
                    <div hidden={!this.state.emptyActions}>
                        <EmptyActions />
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

export default connect(mapStateToProps, { change_game, change_buffs, set_social })(SocialGame);