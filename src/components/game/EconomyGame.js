import React, {Component} from 'react';
import LoadingScreen from "react-loading-screen";
import {connect} from "react-redux";
import {mapStateToProps} from "../../storage/reduxGet";
import {create_game, set_jur_taxes, set_phy_taxes, change_buffs, change_game } from "../../storage/actions";
import {Link} from "react-router-dom";
import Tutorial from "../../elements/Tutorial";
import {
    getEconomy,
    getUnemployment,
    getPoverty,
    getPhysTaxes,
    getJuridTaxes,
    getSpendBudget, getSalaryPension, getMaintain, getEquip, getSpends, getBalance, getIncomes,
    getBalanceRes
} from "../../otherFunctions";
import Budget from "../../elements/Budget";
import Resources from "../../elements/Resources";
import EmptyActions from "../../elements/EmptyActions";
import Header from "../../elements/Header";

class EconomyGame extends Component {
    constructor() {
        super();
        this.state = {
            load: true,
            description: 'Вкладка "Экономика" позволяет вам контролировать экономическую ситуацию в стране. ' +
                         'Можно с легкостью стать сильнейшим государством без большой армии, но имея ' +
                         'сильную экономику.;;' +
                         '- ВВП: является главным показателем мощности вашей экономики, чем больше производство, тем больше ВВП.;;' +
                         '- Инфляция: важный показатель здоровья вашей системы. Высокая инфляция нежелательна, но способствует ' +
                         'росту экономики, низкая инфляция приемлема, но приводит к стогнации. Контролировать инфляцию довольно' +
                         ' тяжело.;;' +
                         '- Безработица: влияет на вашу поддержку и политическую стабильность.;;' +
                         '- Бедность: искоренение бедности сделает вас величайшим правителем, но может привести и к обратному ' +
                         'эффекту.;;' +
                         'Налоги существуют для физических и юридических лиц. Давление на одну из сторон, путем увеличения ставки' +
                         ' приведет к соответсвующим негативным последствиям.;;' +
                         'Бюджет пополняется доходами, которые составяют налоги и различные дипломатические выплаты.;' +
                         'Расходы на каждую сферу можно изменить во вкладке "Подробнее". Малое финансирование приведет ' +
                         'к стогнации или регрессии.;' +
                         'Баланс является разностью между доходами и расходами. Данная сумма прибавляется или же отнимается ' +
                         'из вашей казны каждый месяц (ход).;;' +
                         '- Казна: доступные на данный момент деньги, которые можно тратить по собственному желанию.;;' +
                         'Баланс ресурсов показывает соотношение производимых и потребляемых товаров в государстве. ' +
                         'Значение менее 100% говорит о преобладании импорта, более 100% о преобладании экспорта.;' +
                         'Отрицательный баланс оказывает негативный эффект, но может стать стимулом роста отечественного производства. ' +
                         'Чрезмерный избыток ресурсов также нежелателен.;;' +
                         'Во вкладке "Подробнее" при нажатии на одну из отраслей можно увидеть значимость этой отрасли во ' +
                         'внутренней и мировой экономике, а также увеличить производство путем моментального финансирования ' +
                         'из казны. Это поможет сбалансировать данную отрасль.',
            tutorial: false,
            redactPhysic: false,
            redactJurid: false,
            redactBudget: false,
            redactResources: false,
            emptyActions: false,
            changer: false
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

    getRedactTaxes(type) {
        let properties = {
            physic: [],
            jurid: []
        }
        let physic = this.props.store.createGame.country.tax_physic.split(' ').map((e) => +e.replace(/,/,'.'))
        let jurid = this.props.store.createGame.country.tax_jurid.split(' ').map((e) => +e.replace(/,/,'.'))

        properties.physic = physic
        properties.jurid = jurid

        let repeater = {
            physic: [{id: 0, name: 'Подоходный налог', min: 0.05, max: 0.50},
                     {id: 1, name: 'Налог на землю', min: 0.05, max: 0.30}],

            jurid: [{id: 0, name: 'Налог на прибыль', min: 0.05, max: 0.50},
                    {id: 1,name: 'Налог на добычу полезных ископаемых', min: 0.05, max: 0.40},
                    {id: 2,name: 'Госпошлина', min: 0.00, max: 0.15},
                    {id: 3,name: 'Налог на экспорт', min: 0.00, max: 0.25}]
        }
        return (repeater[type].map((e) =>
                    <li className='politic-game__redact__item' key={`${e.id}-${type}`} onClick={(e) => {
                        if (e.target.nodeName !== 'BUTTON') {
                            return
                        }
                        let tax = e.target.dataset.target
                        let ident = e.target.dataset.ident
                        let buff = this.props.store.createGame.buffs

                        let base = {
                            old: this.props.store.createGame.country[`tax_${tax}`].split(' ').map((e) => +e.replace(/,/,'.'))[ident],
                            new: +properties[tax][ident]
                        }
                        if (this.props.store.createGame.buffs.actions - 1 >= 0) {
                            if (this.props.store.changeGame.indexOf(`tax${tax.replace(/\b\w/g, l => l.toUpperCase())}`) === -1) {
                                this.props.change_buffs({
                                    actions: buff.actions - 1,
                                })
                                this.props.change_game(`tax${tax.replace(/\b\w/g, l => l.toUpperCase())}`)
                            }
                            let store = properties[tax].join(' ')
                            this.props.change_buffs({
                                support: buff.support + ((base.old - base.new)*0.6),
                                stability: buff.stability + ((base.old - base.new)*0.5),
                            })
                            if (tax === 'physic') {
                                this.props.set_phy_taxes(store)
                            } else {
                                this.props.set_jur_taxes(store)
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
                    }}>
                        <span>{e.name}</span>
                        <button onClick={() => {
                            if (properties[type][e.id] > e.min) {
                                properties[type][e.id] = (+properties[type][e.id] - 0.05).toFixed(2)
                                document.getElementById(e.name).value = `${properties[type][e.id] * 100}%`
                            }
                        }} data-target={type} data-ident={e.id} className='redact__controls'>-
                        </button>
                        <input id={e.name} type={'text'} className='redact__number' disabled={true}
                               value={`${properties[type][e.id] * 100}%`}/>
                        <button onClick={() => {
                            if (properties[type][e.id] < e.max) {
                                properties[type][e.id] = (+properties[type][e.id] + 0.05).toFixed(2)
                                document.getElementById(e.name).value = `${properties[type][e.id] * 100}%`
                            }
                        }} data-target={type} data-ident={e.id} className='redact__controls'>+
                        </button>
                    </li>
                )
            )
    }

    render() {
        if (!this.state.load) {
            return (
                <div className='game__view'>
                    <Header name={'Экономика'} tutorial={() => {
                        this.setState({tutorial: !this.state.tutorial})
                    }} />
                    <div className='army-game__scroll-block overflowing'>
                        <section className='economy-game__values'>
                            <ul className='economy-game__values__list'>
                                <li className='economy-game__values__list__item'>
                                    <img className='icons_mini' src={'images/icons/economy.svg'} alt=""/>
                                    ВВП: <span>{getEconomy(this.props.store.createGame.country, true)} <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/></span>
                                </li>
                                <li className='economy-game__values__list__item'>
                                    <img className='icons_mini' src={'images/icons/inflation.svg'} alt=""/>
                                    Инфляция: <span>{(this.props.store.createGame.country.inflation*100).toFixed(2)} %</span>
                                </li>
                                <li className='economy-game__values__list__item'>
                                    <img className='icons_mini' src={'images/icons/unemployment.svg'} alt=""/>
                                    Безработица: <span>{getUnemployment(this.props.store.createGame.country, true)} %</span>
                                </li>
                                <li className='economy-game__values__list__item'>
                                    <img className='icons_mini' src={'images/icons/poverty.svg'} alt=""/>
                                    Бедность: <span>{getPoverty(this.props.store.createGame.country, true)} %</span>
                                </li>
                            </ul>
                        </section>
                        <section className='economy-game__taxes'>
                            <div className='economy-game__taxes__heading'>
                                <img className='icons_mini' src={'images/icons/taxes.svg'} alt=""/>
                                Налоги:
                            </div>
                            <div className='economy-game__taxes__table-block'>
                                    <div className='economy-game__taxes__table_row'>
                                         <span className='economy-game__taxes__table_row__heading'>Физлица:</span>
                                         <span className='economy-game__taxes__table_row__value'>
                                             {getPhysTaxes(this.props.store.createGame.country).toLocaleString() + ' '}
                                             <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/>
                                         </span>
                                        <div>
                                             <button className='game__button' onClick={() => {
                                                 this.setState({redactPhysic: !this.state.redactPhysic,})
                                             }}>Изменить</button>
                                             <span style={{marginLeft: '0.5em'}}><img className='icons_mini' src={'images/icons/action.svg'} alt=""/>1</span>
                                        </div>
                                    </div>
                                    <div className='economy-game__taxes__table_row'>
                                        <span className='economy-game__taxes__table_row__heading'>Юрлица:</span>
                                        <span className='economy-game__taxes__table_row__value'>
                                            {getJuridTaxes(this.props.store.createGame.country).toLocaleString() + ' '}
                                            <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/>
                                         </span>
                                        <div>
                                            <button className='game__button' onClick={() => {
                                                this.setState({redactJurid: !this.state.redactJurid,})
                                            }}>Изменить</button>
                                            <span style={{marginLeft: '0.5em'}}><img className='icons_mini' src={'images/icons/action.svg'} alt=""/>1</span>
                                        </div>
                                    </div>
                            </div>
                        </section>
                        <section className='economy-game__taxes'>
                            <div className='economy-game__taxes__heading'>
                                <img className='icons_mini' src={'images/icons/budget.svg'} alt=""/>
                                Бюджет:
                            </div>
                            <div className='economy-game__taxes__table-block'>
                                <div className='economy-game__taxes__table_row'>
                                    <span className='economy-game__taxes__table_row__heading'>Доходы:</span>
                                    <span className='economy-game__taxes__table_row__value'>
                                        {getIncomes(this.props.store.createGame).toLocaleString() + ' '}
                                        <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/></span>
                                </div>
                                <div className='economy-game__taxes__table_row'>
                                    <span className='economy-game__taxes__table_row__heading'>Расходы:</span>
                                    <span className='economy-game__taxes__table_row__value'>
                                        {getSpends(this.props.store.createGame).toLocaleString() + ' '}
                                        <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/>
                                    </span>
                                </div>
                                <div className='economy-game__taxes__table_row'>
                                    <span className='economy-game__taxes__table_row__heading'>Баланс:</span>
                                    <span style={{color: getBalance(this.props.store.createGame) > 0 ? 'var(--more-light)' : 'var(--less-light)'}} className='economy-game__taxes__table_row__value'>
                                        {getBalance(this.props.store.createGame).toLocaleString() + ' '}
                                        <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/>
                                    </span>
                                    <div>
                                        <button className='game__button' onClick={() => {
                                            this.setState({redactBudget: !this.state.redactBudget,})
                                        }}>Подробнее</button>
                                        <span style={{marginLeft: '0.5em'}}><img className='icons_mini' src={'images/icons/action.svg'} alt=""/>3</span>
                                    </div>
                                </div>
                                <div className='economy-game__taxes__table_row'>
                                    <span className='economy-game__taxes__table_row__heading'>Казна:</span>
                                    <span className='economy-game__taxes__table_row__value'>{this.props.store.createGame.buffs.kazna.toLocaleString()} <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/></span>
                                </div>
                            </div>
                        </section>
                        <section className='economy-game__taxes'>
                            <div className='economy-game__taxes__heading'>
                                <img className='icons_mini' src={'images/icons/resources.svg'} alt=""/>
                                Ресурсы:
                            </div>
                            <div className='economy-game__taxes__table-block'>
                                <div className='economy-game__resources__table_row'>
                                    <div className="economy-game__resources-value">
                                        <div style={{
                                            backgroundColor: '#058e00',
                                            width: `${(getBalanceRes(this.props.store.createGame.country, true) <= 1.25
                                                       ? getBalanceRes(this.props.store.createGame.country, true)
                                                       : 1.25)*100/1.25}%`,}}> </div>
                                        <div style={{
                                            width: '80%',
                                            borderRight: '1px solid #FFF',
                                        }}> </div>
                                        <span>{parseInt(getBalanceRes(this.props.store.createGame.country, true)*100)} %</span>
                                    </div>
                                    <button className='game__button' onClick={() => {
                                        this.setState({redactResources: !this.state.redactResources,})
                                    }}>Подробнее</button>
                                </div>
                            </div>
                        </section>
                    </div>
                    <Tutorial text={this.state.description} hide={!this.state.tutorial} quit={() => {
                        this.setState({tutorial: !this.state.tutorial})
                    }} />
                    <div className='politic-game__redact-list modal-blur' hidden={!this.state.redactPhysic}>
                        <ul>
                            {this.getRedactTaxes('physic')}
                        </ul>
                        <button onClick={(e) => {
                            this.setState({redactPhysic: !this.state.redactPhysic})
                        }} className='politic-game__redact-quit modal-quit' hidden={!this.state.redactPhysic}>&#215;</button>
                    </div>
                    <div className='politic-game__redact-list modal-blur' hidden={!this.state.redactJurid}>
                        <ul>
                            {this.getRedactTaxes('jurid')}
                        </ul>
                        <button onClick={(e) => {
                            this.setState({redactJurid: !this.state.redactJurid})
                        }} className='politic-game__redact-quit modal-quit' hidden={!this.state.redactJurid}>&#215;</button>
                    </div>
                    <div className='economy-game__budget-list modal-blur' hidden={!this.state.redactBudget}>
                        <Budget />
                        <button onClick={(e) => {
                            this.setState({redactBudget: !this.state.redactBudget})
                        }} className='economy-game__budget-quit modal-quit' hidden={!this.state.redactBudget}>&#215;</button>
                    </div>
                    <div className='economy-game__budget-list modal-blur' hidden={!this.state.redactResources}>
                        <Resources />
                        <button onClick={(e) => {
                            this.setState({redactResources: !this.state.redactResources})
                        }} className='economy-game__resources-quit modal-quit' hidden={!this.state.redactResources}>&#215;</button>
                    </div>
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

export default connect(mapStateToProps, { create_game, set_jur_taxes, set_phy_taxes, change_buffs, change_game })(EconomyGame);