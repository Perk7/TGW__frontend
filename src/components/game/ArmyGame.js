import React, {Component} from 'react';
import LoadingScreen from "react-loading-screen";
import {connect} from "react-redux";
import {mapStateToProps} from "../../storage/reduxGet";
import {create_game, change_kazna, new_squad, delete_squad, change_army_salary, change_buffs, change_game, change_army_equip, change_army_maintain, change_squad} from "../../storage/actions";
import {
    getArmy,
    getArmySalary, getEquip, getMaintain,
    getPopulation,
    getRegsOfCountry, getSalaryPension
} from "../../otherFunctions";
import Tutorial from "../../elements/Tutorial";
import EmptyActions from "../../elements/EmptyActions";
import Header from "../../elements/Header";
import {seaList} from "../../seaSquad";

class ArmyGame extends Component {
    constructor() {
        super();
        this.state = {
            load: true,
            description: 'Во вкладке "Армия" вы можете управлять вашими войсками. Здесь указана общая численность отрядов, ' +
                         'а также расходы на содержание и экипировку армии. Меньший возраст выхода на пенсию, а также ' +
                         'высокая пенсия и зарплата, будут благополучно встречены солдатами, это отразится на поддержке и на ' +
                         'общем моральном состоянии войск. Хорошее содержание и снаряжение требуют больших финансовых трат, ' +
                         'но позволят очень хорошо увеличить боеготовность вашей армии и нивелировать численное преимущество врага.;;' +
                         'Ваши отряды состоят из 4ех видов войск: пехотинцы, лучники, кавалерия и катапульты. Каждый имеет собственные ' +
                         'плюсы и минусы, поэтому лучше соблюдать баланс в их численности. Вы можете изменять численность сущестующих отрядов ' +
                         'и создавать новые. Все новые отряды по умолчанию будут находиться в столице.;;' +
                         'Все отряды имеют 2 статуса: "Готов" и "Расквартирован". Готовые отряды дороже в содержании, но в любой момент ' +
                         'способны менять свое местоположение и вступать в битвы. Расквартированные отряды более уязвимы, им требуется ' +
                         '1 ход на переход в режим готовности, но они потребляют вдвое меньше денег. Изменять статус можно на' +
                         ' игровой карте.;;' +
                         'Вы не можете иметь армию, численностью более 25% от общего населения страны.',
            tutorial: false,
            redactSalary: false,
            redactMaintain: false,
            redactEquip: false,
            newSquad: false,
            changeSquad: false,
            currentSquad: {},
            emptyActions: false,
            modalText: 'У вас закончились очки действий на этом ходу',
            squadPrice: 0,

            changer: false,
        }

        this.getRedactSalary = this.getRedactSalary.bind(this)

        this.getRedactSquad = this.getRedactSquad.bind(this)
        this.getNewSquad = this.getNewSquad.bind(this)
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

    getRedactSalary() {
        let value = 0
        let properties = this.props.store.createGame.country.army_salary.split(',')
        let valuesPension = {
            '40': '1',
            '45': '2',
            '50': '3',
            '60': '4'
        }
        let salaries = getArmySalary(this.props.store.createGame.country, false)

        return (<>
                <li className='politic-game__redact__item' key='0'>
                    <span>Возраст выхода на пенсию</span>
                    <div>{['40', '45', '50', '60'].map((ev) => {
                        value++
                        return (
                            <div key={ev}>
                                <input type='radio' id={`Возраст выхода на пенсию-${value}`}
                                       name={'Возраст выхода на пенсию'}
                                       style={{display: 'none'}}
                                       className='politic-game__redact__item__values_input'
                                       data-num={0}
                                       value={valuesPension[ev]}
                                       defaultChecked={valuesPension[ev] === properties[0]}
                                       onClick={(e) => {
                                           if (this.props.store.createGame.buffs.actions - 1 >= 0) {
                                               if (this.props.store.changeGame.indexOf('armyPension') === -1 && properties[0] !== e.target.value.toString()) {
                                                   properties[0] = e.target.value.toString()
                                                   let store = properties.join(',')
                                                   let buff = this.props.store.createGame.buffs
                                                   this.props.change_buffs({
                                                       actions: buff.actions - 1,
                                                       support: buff.support + 0.02*(+this.props.store.createGame.country.army_salary.split(',')[0] - +properties[0]),
                                                       stability: buff.stability + 0.02*(+this.props.store.createGame.country.army_salary.split(',')[0] - +properties[0]),
                                                       army_quality: buff.army_quality + 0.01*(+this.props.store.createGame.country.army_salary.split(',')[0] - +properties[0]),
                                                   })
                                                   this.props.change_game('armyPension')
                                                   this.props.change_army_salary(store)
                                                   this.setState({
                                                       changer: !this.state.changer
                                                   })
                                               } else {
                                                   e.preventDefault()
                                               }
                                           } else {
                                               e.preventDefault()
                                               this.setState({
                                                   emptyActions: true
                                               })

                                               let promise = new Promise((resolve) => {
                                                   setTimeout(() => { resolve('ee') }, 2000);
                                               });
                                               promise.then(
                                                   result => this.setState({emptyActions: false})
                                               )
                                           }
                                        }
                                       }
                                />
                                <label htmlFor={`Возраст выхода на пенсию-${value}`}
                                       className={this.props.store.changeGame.indexOf('armyPension') !== -1
                                                  ? 'politic-game__redact__item__values politic-game__redact__item__values_selected'
                                                  : 'politic-game__redact__item__values'}>{ev}</label>
                            </div> )
                    })}</div>
                </li>
                <li className='politic-game__redact__item' key='1' onClick={(e) => {
                    if (e.target.nodeName !== 'BUTTON') {
                        return
                    }
                    let salary = salaries.avgSalary + (e.target.dataset.type === 'inc' ? 50 : -50)
                    let buff = this.props.store.createGame.buffs

                    if (this.props.store.changeGame.indexOf('armySalary') === -1) {
                        if (this.props.store.createGame.buffs.actions - 1 >= 0) {
                            this.props.change_buffs({
                                actions: buff.actions - 1,

                                support: buff.support + 0.002*(e.target.dataset.type === 'inc' ? 1 : -1),
                                stability: buff.stability + 0.001*(e.target.dataset.type === 'inc' ? 1 : -1),
                                army_quality: buff.army_quality + 0.001*(e.target.dataset.type === 'inc' ? 1 : -1),
                            })
                            this.props.change_game('armySalary')
                            properties[1] = salary
                            let store = properties.join(',')
                            this.props.change_army_salary(store)
                        } else {
                            e.preventDefault()
                            this.setState({
                                emptyActions: true
                            })

                            let promise = new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve('ee')
                                }, 2000);
                            });
                            promise.then(
                                result => this.setState({emptyActions: false})
                            )
                        }
                    } else {
                        this.props.change_buffs({
                            support: buff.support + 0.002*(e.target.dataset.type === 'inc' ? 1 : -1),
                            stability: buff.stability + 0.001*(e.target.dataset.type === 'inc' ? 1 : -1),
                            army_quality: buff.army_quality + 0.001*(e.target.dataset.type === 'inc' ? 1 : -1),
                        })
                        properties[1] = salary
                        let store = properties.join(',')
                        this.props.change_army_salary(store)
                    }
                    this.setState({
                        emptyActions: false
                    })
                  }
                }>
                    <span>Средняя З/П</span>
                    <button className='redact__controls' data-type='dec'>-</button>
                    <input type="number" className='redact__number' readOnly={true} value={salaries.avgSalary} />
                    <button className='redact__controls' data-type='inc'>+</button>
                </li>
                <li className='politic-game__redact__item' key='2' onClick={(e) => {
                    if (e.target.nodeName !== 'BUTTON') {
                        return
                    }
                    let salary = salaries.avgPension + (e.target.dataset.type === 'inc' ? 50 : -50)
                    let buff = this.props.store.createGame.buffs

                    if (this.props.store.changeGame.indexOf('armySalary') === -1) {
                        if (this.props.store.createGame.buffs.actions - 1 >= 0) {
                            this.props.change_buffs({
                                actions: buff.actions - 1,

                                support: buff.support + 0.002*(e.target.dataset.type === 'inc' ? 1 : -1),
                                stability: buff.stability + 0.001*(e.target.dataset.type === 'inc' ? 1 : -1),
                                army_quality: buff.army_quality + 0.001*(e.target.dataset.type === 'inc' ? 1 : -1),
                            })
                            this.props.change_game('armySalary')
                            properties[2] = salary
                            let store = properties.join(',')
                            this.props.change_army_salary(store)
                        } else {
                            e.preventDefault()
                            this.setState({
                                emptyActions: true
                            })

                            let promise = new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve('ee')
                                }, 2000);
                            });
                            promise.then(
                                result => this.setState({emptyActions: false})
                            )
                        }
                    } else {
                        this.props.change_buffs({
                            support: buff.support + 0.002*(e.target.dataset.type === 'inc' ? 1 : -1),
                            stability: buff.stability + 0.001*(e.target.dataset.type === 'inc' ? 1 : -1),
                            army_quality: buff.army_quality + 0.001*(e.target.dataset.type === 'inc' ? 1 : -1),
                        })
                        properties[2] = salary
                        let store = properties.join(',')
                        this.props.change_army_salary(store)
                    }
                    this.setState({
                        emptyActions: false
                    })
                }
                }>
                    <span>Средняя пенсия</span>
                    <button className='redact__controls' data-type={'dec'}>-</button>
                    <input type="number" className='redact__number' readOnly={true} value={salaries.avgPension} />
                    <button className='redact__controls' data-type={'inc'}>+</button>
                </li>
            </>
        )
    }

    getRedactMaintain() {
        let span
        let redactor = -1

        let properties = this.props.store.createGame.country.army_maintain.split(',')
        let arr = [
            {['Питание']: ['Нет', 'Минимальное', 'Достаточное', 'Расширенное']},
            {['Инфраструктура']: ['Минимальная', 'Средняя', 'Отличная']},
            {['Бытовые условия']: ['Минимальные', 'Достаточные', 'Расширенные']},
        ]

        return arr.map((e) => {
            let value = 0
            redactor++
            span = Object.keys(e)[0]
            return (
                <li className='politic-game__redact__item' key={span}>
                    <span>{span}</span>
                    <div>{e[span].map((ev) => {
                            value++
                            return (
                                <div key={ev}>
                                    <input type='radio' id={`${span}-${e[span].indexOf(ev)}`}
                                           name={span}
                                           style={{display: 'none'}}
                                           className='politic-game__redact__item__values_input'
                                           data-num={redactor}
                                           value={value}
                                           defaultChecked={value === +properties[redactor]}
                                           onClick={(e) => {
                                               if (this.props.store.createGame.buffs.actions - 1 >= 0) {
                                                   if (this.props.store.changeGame.indexOf(`armyMaintain-${e.target.name}`) === -1 && properties[e.target.dataset.num] !== e.target.value.toString()) {
                                                       properties[e.target.dataset.num] = e.target.value.toString()
                                                       let store = properties.join(',')
                                                       let buff = this.props.store.createGame.buffs
                                                       this.props.change_buffs({
                                                           actions: buff.actions - 1,
                                                           support: buff.support + 0.02*(+e.target.value - +this.props.store.createGame.country.army_maintain.split(',')[e.target.dataset.num]),
                                                           stability: buff.stability + 0.01*(+e.target.value - +this.props.store.createGame.country.army_maintain.split(',')[e.target.dataset.num]),
                                                           army_quality: buff.army_quality + 0.005*(+e.target.value - +this.props.store.createGame.country.army_maintain.split(',')[e.target.dataset.num]),
                                                       })
                                                       this.props.change_game(`armyMaintain-${e.target.name}`)
                                                       this.props.change_army_maintain(store)
                                                       this.setState({
                                                           changer: !this.state.changer
                                                       })
                                                   } else {
                                                       e.preventDefault()
                                                   }
                                               } else {
                                                   e.preventDefault()
                                                   this.setState({
                                                       emptyActions: true
                                                   })

                                                   let promise = new Promise((resolve) => {
                                                       setTimeout(() => { resolve('ee') }, 2000);
                                                   });
                                                   promise.then(
                                                       result => this.setState({emptyActions: false})
                                                   )
                                               }
                                            }
                                           }
                                    />
                                    <label htmlFor={`${span}-${e[span].indexOf(ev)}`}
                                           className={this.props.store.changeGame.indexOf(`armyMaintain-${span}`) !== -1
                                               ? 'politic-game__redact__item__values politic-game__redact__item__values_selected'
                                               : 'politic-game__redact__item__values'}>{ev}</label>
                                </div>
                            )
                        }
                    )}
                    </div>
                </li> )
        })
    }

    getRedactSquad() {
        let priceList = {
            ['pechot']: 5000,
            ['archer']: 8000,
            ['cavallery']: 14000,
            ['catapult']: 1000000
        }
        let squad = this.state.currentSquad
        let buff = this.props.store.createGame.buffs
        return (
            <ul onClick={(e) => {
                    if (e.target.nodeName !== 'BUTTON') {
                        return
                    }
                    if (e.target.dataset.action === 'submit') {
                      if (buff.kazna >= this.state.squadPrice)
                        if (this.props.store.createGame.buffs.actions - 1 >= 0) {
                            let quantity = squad.archer_quan + squad.cavallery_quan + squad.catapult_quan*20 + squad.pechot_quan
                            if (getArmy(this.props.store.createGame.squad, false) + quantity < 0.3*getPopulation(this.props.store.createGame.country, false)) {
                                this.props.change_buffs({
                                    actions: buff.actions - 1,
                                })
                                if (squad.pechot_quan + squad.archer_quan + squad.catapult_quan + squad.cavallery_quan) {
                                    this.props.change_game(`changeSquad-${squad.id}`)
                                    this.props.change_squad(squad)
                                    this.props.change_kazna(-this.state.squadPrice)
                                } else {
                                    this.props.change_game(`deleteSquad-${squad.id}`)
                                    this.props.delete_squad(squad)
                                }

                                this.setState({currentSquad: {}, squadPrice: 0})
                            } else {
                                e.preventDefault()
                                this.setState({
                                    emptyActions: true,
                                    modalText: 'Численность армии не должна превышать 25% от населения'
                                })

                                let promise = new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve('ee')
                                    }, 2000);
                                });
                                promise.then(
                                    result => this.setState({emptyActions: false, modalText: 'У вас закончились очки действий на этом ходу'})
                                )
                            }
                        } else {
                            e.preventDefault()
                            this.setState({
                                emptyActions: true
                            })

                            let promise = new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve('ee')
                                }, 2000);
                            });
                            promise.then(
                                result => this.setState({emptyActions: false})
                            )
                      } else {
                        e.preventDefault()
                        this.setState({
                            emptyActions: true,
                            modalText: 'В казне не хватает денег'
                        })

                        let promise = new Promise((resolve) => {
                            setTimeout(() => {
                                resolve('ee')
                            }, 2000);
                        });
                        promise.then(
                            result => this.setState({emptyActions: false, modalText: 'У вас закончились очки действий на этом ходу'})
                        )
                      }    
                        return
                    }
                    let type = e.target.dataset.type
                    let target = e.target.dataset.target

                    if (this.props.store.createGame.buffs.actions - 1 >= 0) {
                        let price = 0
                        let defSquad = null
                        for (let i of this.props.store.createGame.squad) {
                            if (i.place === squad.place) {
                                defSquad = i
                            }
                        }
                        if (['inc', 'dec'].indexOf(type) !== -1) {
                            if (target !== 'catapult') {
                                squad[`${target}_quan`] = squad[`${target}_quan`] + (type === 'inc' ? 50 : - 50)
                            } else {
                                squad[`${target}_quan`] = squad[`${target}_quan`] + (type === 'inc' ? 1 : -1)
                            }

                            price = priceList[target] * (target === 'catapult' ? 1 : 50) * (type === 'inc' ? 1 : -1)
                        } else {
                            let quan = squad[`${target}_quan`]
                            if (target !== 'catapult') {
                                squad[`${target}_quan`] = squad[`${target}_quan`] + (type === 'inc-db' ? 500 : squad[`${target}_quan`] >= 500 ? -500 : -squad[`${target}_quan`])
                            } else {
                                squad[`${target}_quan`] = squad[`${target}_quan`] + (type === 'inc-db' ? 10 : squad[`${target}_quan`] >= 10 ? -10 : -squad[`${target}_quan`])
                            }
                            if (type === 'dec-db' && quan >= (target === 'catapult' ? 10 : 500)) {
                                price = priceList[target] * -(target === 'catapult' ? 10 : 500)
                            } else if (type === 'inc-db') {
                                price = priceList[target] * (target === 'catapult' ? 10 : 500)
                            } else {
                                price = priceList[target] * -quan
                            }
                        }
                        this.setState({
                            currentSquad: squad,
                            squadPrice: (squad[`${target}_quan`] > defSquad[`${target}_quan`]
                                                ? price + this.state.squadPrice
                                                : squad[`${target}_quan`] === defSquad[`${target}_quan`] && (type === 'dec' || type === 'dec-db')
                                                    ? price + this.state.squadPrice
                                                    : this.state.squadPrice)
                        })
                    } else {
                            e.preventDefault()
                            this.setState({
                                emptyActions: true
                            })

                            let promise = new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve('ee')
                                }, 2000);
                            });
                            promise.then(
                                result => this.setState({emptyActions: false})
                            )
                    }  
            }}>
                <li className='politic-game__redact__item'>
                    <span>Пехотинцы</span>
                    <button className='redact__controls' disabled={!squad.pechot_quan > 0} data-target='pechot' data-type='dec-db'>--</button>
                    <button className='redact__controls' disabled={!squad.pechot_quan > 0} data-target='pechot' data-type='dec'>-</button>
                    <input type="number" className='redact__number' value={squad.pechot_quan || 0} disabled={true} />
                    <button className='redact__controls' data-target='pechot' data-type='inc'>+</button>
                    <button className='redact__controls' data-target='pechot' data-type='inc-db'>++</button>
                </li>
                <li className='politic-game__redact__item'>
                    <span>Лучники</span>
                    <button className='redact__controls' disabled={!squad.archer_quan > 0} data-target='archer' data-type='dec-db'>--</button>
                    <button className='redact__controls' disabled={!squad.archer_quan > 0} data-target='archer' data-type='dec'>-</button>
                    <input type="number" className='redact__number' value={squad.archer_quan || 0} disabled={true} />
                    <button className='redact__controls' data-target='archer' data-type='inc'>+</button>
                    <button className='redact__controls' data-target='archer' data-type='inc-db'>++</button>
                </li>
                <li className='politic-game__redact__item'>
                    <span>Кавалерия</span>
                    <button className='redact__controls' disabled={!squad.cavallery_quan > 0} data-target='cavallery' data-type='dec-db'>--</button>
                    <button className='redact__controls' disabled={!squad.cavallery_quan > 0} data-target='cavallery' data-type='dec'>-</button>
                    <input type="number" className='redact__number' value={squad.cavallery_quan || 0} disabled={true} />
                    <button className='redact__controls' data-target='cavallery' data-type='inc'>+</button>
                    <button className='redact__controls' data-target='cavallery' data-type='inc-db'>++</button>
                </li>
                <li className='politic-game__redact__item'>
                    <span>Катапульты</span>
                    <button className='redact__controls' disabled={!squad.catapult_quan > 0} data-target='catapult' data-type='dec-db'>--</button>
                    <button className='redact__controls' disabled={!squad.catapult_quan > 0} data-target='catapult' data-type='dec'>-</button>
                    <input type="number" className='redact__number' value={squad.catapult_quan || 0} disabled={true} />
                    <button className='redact__controls' data-target='catapult' data-type='inc'>+</button>
                    <button className='redact__controls' data-target='catapult' data-type='inc-db'>++</button>
                </li>
                <li className='politic-game__redact__item'>
                    <button onClick={() => { this.setState({changeSquad: false}) }} data-action='submit' className='army-game__new-squad__submit redact__submit'>Изменить</button>
                    <span className='army-game__redact__price'>{this.state.squadPrice.toLocaleString()} <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/></span>
                </li>
            </ul>
        )
    }

    getNewSquad() {
        let priceList = {
            ['pechot']: 5000,
            ['archer']: 8000,
            ['cavallery']: 14000,
            ['catapult']: 1000000
        }
        let squad = this.state.currentSquad
        for (let i of this.props.store.createGame.squad) {
            if (i.id >= squad.id) {
                squad.id = i.id+1
            }
        }
        let buff = this.props.store.createGame.buffs

        return (
            <ul className='overflowing' onClick={(e) => {
                if (e.target.nodeName !== 'BUTTON') {
                    return
                }
                if (e.target.dataset.action === 'submit') {
                  if (buff.kazna >= this.state.squadPrice) {
                    if (this.props.store.createGame.buffs.actions - 1 >= 0) {
                        let quantity = squad.archer_quan + squad.cavallery_quan + squad.catapult_quan*20 + squad.pechot_quan
                        if (getArmy(this.props.store.createGame.squad, true) + quantity < 0.25*getPopulation(this.props.store.createGame.country, false)) {
                            this.props.change_buffs({
                                actions: buff.actions - 1,
                            })
                            this.props.change_game(`newSquad-${squad.id}`)
                            this.props.new_squad(squad)
                            this.props.change_kazna(-this.state.squadPrice)
                            this.setState({currentSquad: {}, squadPrice: 0})
                        } else {
                            e.preventDefault()
                            this.setState({
                                emptyActions: true,
                                modalText: 'Численность армии не должна превышать 25% от населения'
                            })

                            let promise = new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve('ee')
                                }, 2000);
                            });
                            promise.then(
                                result => this.setState({emptyActions: false, modalText: 'У вас закончились очки действий на этом ходу'})
                            )
                        }
                    } else {
                        e.preventDefault()
                        this.setState({
                            emptyActions: true
                        })

                        let promise = new Promise((resolve) => {
                            setTimeout(() => {
                                resolve('ee')
                            }, 2000);
                        });
                        promise.then(
                            result => this.setState({emptyActions: false})
                        )
                    }
                  } else {
                        e.preventDefault()
                        this.setState({
                            emptyActions: true,
                            modalText: 'В казне не хватает денег'
                        })

                        let promise = new Promise((resolve) => {
                            setTimeout(() => {
                                resolve('ee')
                            }, 2000);
                        });
                        promise.then(
                            result => this.setState({emptyActions: false, modalText: 'У вас закончились очки действий на этом ходу'})
                        )
                    }  
                    return
                }
                let type = e.target.dataset.type
                let target = e.target.dataset.target

                if (this.props.store.createGame.buffs.actions - 1 >= 0) {
                    let price = 0
                    if (['inc', 'dec'].indexOf(type) !== -1) {
                        if (target !== 'catapult') {
                            squad[`${target}_quan`] = squad[`${target}_quan`] + (type === 'inc' ? 50 : - 50)
                        } else {
                            squad[`${target}_quan`] = squad[`${target}_quan`] + (type === 'inc' ? 1 : -1)
                        }

                        price = priceList[target] * (target === 'catapult' ? 1 : 50) * (type === 'inc' ? 1 : -1)
                    } else {
                        let quan = squad[`${target}_quan`]
                        if (target !== 'catapult') {
                            squad[`${target}_quan`] = squad[`${target}_quan`] + (type === 'inc-db' ? 500 : squad[`${target}_quan`] >= 500 ? -500 : -squad[`${target}_quan`])
                        } else {
                            squad[`${target}_quan`] = squad[`${target}_quan`] + (type === 'inc-db' ? 10 : squad[`${target}_quan`] >= 10 ? -10 : -squad[`${target}_quan`])
                        }
                        if (type === 'dec-db' && quan >= (target === 'catapult' ? 10 : 500)) {
                            price = priceList[target] * -(target === 'catapult' ? 10 : 500)
                        } else if (type === 'inc-db') {
                            price = priceList[target] * (target === 'catapult' ? 10 : 500)
                        } else {
                            price = priceList[target] * -quan
                        }
                    }
                    this.setState({currentSquad: squad, squadPrice: price + this.state.squadPrice})
                } else {
                    e.preventDefault()
                    this.setState({
                        emptyActions: true
                    })

                    let promise = new Promise((resolve) => {
                        setTimeout(() => {
                            resolve('ee')
                        }, 2000);
                    });
                    promise.then(
                        result => this.setState({emptyActions: false})
                    )
                }
            }}>
                <li className='politic-game__redact__item'>
                    <span>Пехотинцы</span>
                    <button className='redact__controls' disabled={!squad.pechot_quan > 0} data-target='pechot' data-type='dec-db'>--</button>
                    <button className='redact__controls' disabled={!squad.pechot_quan > 0} data-target='pechot' data-type='dec'>-</button>
                    <input type="number" className='redact__number' value={squad.pechot_quan || 0} disabled={true} />
                    <button className='redact__controls' data-target='pechot' data-type='inc'>+</button>
                    <button className='redact__controls' data-target='pechot' data-type='inc-db'>++</button>
                </li>
                <li className='politic-game__redact__item'>
                    <span>Лучники</span>
                    <button className='redact__controls' disabled={!squad.archer_quan > 0} data-target='archer' data-type='dec-db'>--</button>
                    <button className='redact__controls' disabled={!squad.archer_quan > 0} data-target='archer' data-type='dec'>-</button>
                    <input type="number" className='redact__number' value={squad.archer_quan || 0} disabled={true} />
                    <button className='redact__controls' data-target='archer' data-type='inc'>+</button>
                    <button className='redact__controls' data-target='archer' data-type='inc-db'>++</button>
                </li>
                <li className='politic-game__redact__item'>
                    <span>Кавалерия</span>
                    <button className='redact__controls' disabled={!squad.cavallery_quan > 0} data-target='cavallery' data-type='dec-db'>--</button>
                    <button className='redact__controls' disabled={!squad.cavallery_quan > 0} data-target='cavallery' data-type='dec'>-</button>
                    <input type="number" className='redact__number' value={squad.cavallery_quan || 0} disabled={true} />
                    <button className='redact__controls' data-target='cavallery' data-type='inc'>+</button>
                    <button className='redact__controls' data-target='cavallery' data-type='inc-db'>++</button>
                </li>
                <li className='politic-game__redact__item'>
                    <span>Катапульты</span>
                    <button className='redact__controls' disabled={!squad.catapult_quan > 0} data-target='catapult' data-type='dec-db'>--</button>
                    <button className='redact__controls' disabled={!squad.catapult_quan > 0} data-target='catapult' data-type='dec'>-</button>
                    <input type="number" className='redact__number' value={squad.catapult_quan || 0} disabled={true} />
                    <button className='redact__controls' data-target='catapult' data-type='inc'>+</button>
                    <button className='redact__controls' data-target='catapult' data-type='inc-db'>++</button>
                </li>
                <li className='politic-game__redact__item'>
                    <button onClick={() => { this.setState({newSquad: false}) }} data-action='submit' className='army-game__new-squad__submit redact__submit'>Создать</button>
                    <span className='army-game__redact__price'>{this.state.squadPrice.toLocaleString()} <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/></span>
                </li>
            </ul>
        )
    }

    getRedactEquip() {
        let span
        let redactor = -1

        let properties = this.props.store.createGame.country.army_equip.split(',')
        let arr = [
            {['Экипировка']: ['Кожанная', 'Железная', 'Ламелярная', 'Орихалковая', 'Эбонитовая']},
            {['Комплекты']: ['1', '1.5', '2', '3']},
            {['Ресурсы']: ['Мало', 'Средне', 'Много']},
        ]

        return arr.map((e) => {
            let value = 0
            redactor++
            span = Object.keys(e)[0]
            return (
                <li className='politic-game__redact__item' key={span}>
                    <span>{span}</span>
                    <div>{e[span].map((ev) => {
                            value++
                            return (
                                <div key={ev}>
                                    <input type='radio' id={`${span}-${e[span].indexOf(ev)}`}
                                           name={span}
                                           style={{display: 'none'}}
                                           className='politic-game__redact__item__values_input'
                                           data-num={redactor}
                                           value={value}
                                           defaultChecked={value === +properties[redactor]}
                                           onClick={(e) => {
                                               if (this.props.store.createGame.buffs.actions - 1 >= 0) {
                                                   if (this.props.store.changeGame.indexOf(`armyEquip-${e.target.name}`) === -1 && properties[e.target.dataset.num] !== e.target.value.toString()) {
                                                       properties[e.target.dataset.num] = e.target.value.toString()
                                                       let store = properties.join(',')
                                                       let buff = this.props.store.createGame.buffs
                                                       this.props.change_buffs({
                                                           actions: buff.actions - 1,
                                                           support: buff.support + 0.02*(+e.target.value - +this.props.store.createGame.country.army_equip.split(',')[e.target.dataset.num]),
                                                           stability: buff.stability + 0.01*(+e.target.value - +this.props.store.createGame.country.army_equip.split(',')[e.target.dataset.num]),
                                                           army_quality: buff.army_quality + 0.005*(+e.target.value - +this.props.store.createGame.country.army_equip.split(',')[e.target.dataset.num]),
                                                       })
                                                       this.props.change_game(`armyEquip-${e.target.name}`)
                                                       this.props.change_army_equip(store)
                                                       this.setState({
                                                           changer: !this.state.changer
                                                       })
                                                   } else {
                                                       e.preventDefault()
                                                   }
                                               } else {
                                                   e.preventDefault()
                                                   this.setState({
                                                       emptyActions: true
                                                   })

                                                   let promise = new Promise((resolve) => {
                                                       setTimeout(() => { resolve('ee') }, 2000);
                                                   });
                                                   promise.then(
                                                       result => this.setState({emptyActions: false})
                                                   )
                                               }
                                           }
                                           }
                                    />
                                    <label htmlFor={`${span}-${e[span].indexOf(ev)}`}
                                           className={this.props.store.changeGame.indexOf(`armyEquip-${span}`) !== -1
                                               ? 'politic-game__redact__item__values politic-game__redact__item__values_selected'
                                               : 'politic-game__redact__item__values'}>{ev}</label>
                                </div>
                            )
                        }
                    )}
                    </div>
                </li> )
        })
    }


    render() {
        if (!this.state.load) {
            return (
            <div className='game__view'>
                <Header name={'Армия'} tutorial={() => {
                    this.setState({tutorial: !this.state.tutorial})
                }} />
                <div className='army-game__scroll-block overflowing'>
                    <div className='army-game__statistic'>
                        <div>
                            <img className='icons' src={"images/icons/army.svg"} alt=""/>
                            Численность: <span>{getArmy(this.props.store.createGame.squad, true)} <img className='icons' src={'images/icons/people.svg'} alt=""/></span>
                        </div>
                        <div>
                            <img className='icons' src={"images/icons/spending.svg"} alt=""/>
                            Расходы: <span>{(getSalaryPension(this.props.store.createGame) + getMaintain(this.props.store.createGame) + getEquip(this.props.store.createGame)).toLocaleString()} <img className='icons' src={'images/icons/coin.svg'} alt=""/></span>
                        </div>
                    </div>
                    <section>
                        <ul className='army-game__spendings__list'>
                            <li className='army-game__spendings__list__item'>
                                З/П и пенсии: <span>{getSalaryPension(this.props.store.createGame).toLocaleString()} <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/></span>
                                <div>
                                    <button className='game__button' onClick={() => {this.setState({redactSalary: !this.state.redactSalary})}}>Подробнее</button>
                                    <span style={{marginLeft: '0.5em'}}><img className='icons' src={'images/icons/action.svg'} alt=""/>1</span>
                                </div>
                            </li>
                            <li className='army-game__spendings__list__item'>
                                Содержание: <span>{getMaintain(this.props.store.createGame).toLocaleString()} <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/></span>
                                <div>
                                    <button className='game__button' onClick={() => {this.setState({redactMaintain: !this.state.redactMaintain})}}>Подробнее</button>
                                    <span style={{marginLeft: '0.5em'}}><img className='icons' src={'images/icons/action.svg'} alt=""/>1</span>
                                </div>
                            </li>
                            <li className='army-game__spendings__list__item'>
                                Снаряжение: <span>{getEquip(this.props.store.createGame).toLocaleString()} <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/></span>
                                <div>
                                    <button className='game__button' onClick={() => {this.setState({redactEquip: !this.state.redactEquip})}}>Подробнее</button>
                                    <span style={{marginLeft: '0.5em'}}><img className='icons' src={'images/icons/action.svg'} alt=""/>1</span>
                                </div>
                            </li>
                        </ul>
                    </section>
                    <section className='army-game__squads'>
                        <div className='army-game__squads__heading'>
                            <img className='icons' src={"images/icons/squads.svg"} alt=""/>
                            Отряды:
                            <span style={{marginLeft: '0.5em'}}><img className='icons' src={'images/icons/action.svg'} alt=""/>1</span>
                        </div>
                        <table cellSpacing='0' className='army-game__squads__list'>
                            <thead>
                                <tr className='army-game__squads__list__item'>
                                <th><button onClick={() => {
                                    this.setState({
                                        newSquad: !this.state.newSquad,
                                        currentSquad: {
                                            pechot_quan: 0,
                                            archer_quan: 0,
                                            cavallery_quan: 0,
                                            catapult_quan: 0,
                                            country: this.props.store.createGame.country.identify,
                                            country_id: this.props.store.createGame.country.id,
                                            id: 1,
                                            place: this.props.store.createGame.country.capital.name,
                                            place_type: 'G',
                                            status: 'Q',
                                        }
                                    })
                                }}><img className='army-game__squads__btn' src={"images/add-btn.svg"} alt=""/></button></th>
                                    <th><img className='army-game__squads__units'  src={"images/icons/pehot.svg"} alt=""/> Пехотинцы</th>
                                    <th><img className='army-game__squads__units' src={"images/icons/archer.svg"} alt=""/> Лучники</th>
                                    <th><img className='army-game__squads__units' src={"images/icons/cavallery.svg"} alt=""/> Кавалерия</th>
                                    <th><img className='army-game__squads__units' src={"images/icons/catapult.svg"} alt=""/> Катапульты</th>
                                    <th>Местонахождение</th>
                                    <th>Статус</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.store.createGame.squad.map((e) =>
                                <tr className='army-game__squads__list__item' id={e.id} key={e.id}>
                                    <td><button onClick={(el) => {
                                        let squad = {}
                                        const ident = el.target.parentElement.parentElement.parentElement.id || el.target.parentElement.parentElement.id
                                        for (let i of this.props.store.createGame.squad) {
                                            if (i.id == ident) {
                                                Object.assign(squad, i)
                                            }
                                        }
                                        this.setState({
                                            changeSquad: !this.state.changeSquad,
                                            currentSquad: squad,
                                        })
                                    }} disabled={getRegsOfCountry(this.props.store.createGame, this.props.store.createGame.country.identify).indexOf(e.place) === -1}><img className='army-game__squads__btn' src={"images/edit-btn.svg"} alt=""/></button></td>
                                    <td>{e.pechot_quan.toLocaleString()}</td>
                                    <td>{e.archer_quan.toLocaleString()}</td>
                                    <td>{e.cavallery_quan.toLocaleString()}</td>
                                    <td>{e.catapult_quan.toLocaleString()}</td>
                                    <td>{seaList.indexOf(e.place) === -1 ? e.place : 'Море'}</td>
                                    <td>{e.status !== 'R' ? 'Расквартирован' : 'Готов'}</td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </section>
                </div>
                <div className='politic-game__redact-list modal-blur ' hidden={!this.state.redactSalary}>
                    <ul className='overflowing'>
                        {this.getRedactSalary()}
                    </ul>
                    <button onClick={(e) => {
                        this.setState({redactSalary: !this.state.redactSalary})
                    }} className='politic-game__redact-quit modal-quit' hidden={!this.state.redactSalary}>&#215;</button>
                </div>
                <div className='politic-game__redact-list modal-blur' hidden={!this.state.redactMaintain}>
                    <ul className='overflowing'>
                        {this.getRedactMaintain()}
                    </ul>
                    <button onClick={(e) => {
                        this.setState({redactMaintain: !this.state.redactMaintain})
                    }} className='politic-game__redact-quit modal-quit' hidden={!this.state.redactMaintain}>&#215;</button>
                </div>
                <div className='politic-game__redact-list modal-blur' hidden={!this.state.redactEquip}>
                    <ul className='overflowing'>
                        {this.getRedactEquip()}
                    </ul>
                    <button onClick={(e) => {
                        this.setState({redactEquip: !this.state.redactEquip})
                    }} className='politic-game__redact-quit modal-quit' hidden={!this.state.redactEquip}>&#215;</button>
                </div>
                <div className='politic-game__redact-list modal-blur' hidden={!this.state.newSquad}>
                    {this.getNewSquad()}
                    <button onClick={(e) => {
                        this.setState({newSquad: !this.state.newSquad, currentSquad: {}, squadPrice: 0})
                    }} className='politic-game__redact-quit modal-quit' hidden={!this.state.newSquad}>&#215;</button>
                </div>
                <div className='politic-game__redact-list modal-blur' hidden={!this.state.changeSquad}>
                    {this.getRedactSquad()}
                    <button onClick={(e) => {
                        this.setState({changeSquad: !this.state.changeSquad, currentSquad: {}, squadPrice: 0})
                    }} className='politic-game__redact-quit modal-quit' hidden={!this.state.changeSquad}>&#215;</button>
                </div>
                <Tutorial className='politic-game__tutorial' quit={() => {
                    this.setState({tutorial: !this.state.tutorial})
                }} text={this.state.description} hide={!this.state.tutorial} />
                <div hidden={!this.state.emptyActions}>
                    <EmptyActions text={this.state.modalText} />
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

export default connect(mapStateToProps, { create_game, delete_squad, new_squad, change_squad, change_army_salary, change_buffs, change_game, change_army_equip, change_army_maintain, change_kazna })(ArmyGame);