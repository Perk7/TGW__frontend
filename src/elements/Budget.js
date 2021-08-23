import React, {useEffect, useState} from 'react';
import {
    getPhysTaxes,
    getJuridTaxes,
    getSalaryPension,
    getMaintain,
    getEquip,
    getSpendBudget, getIncomes, getSpends, getBalance, getSocialSpends, getDiplomatySpends, getColor
} from "../otherFunctions";
import {connect} from "react-redux";
import {mapStateToProps} from "../storage/reduxGet";
import {change_buffs, change_game, change_budget} from "../storage/actions";
import EmptyActions from "./EmptyActions";

function Budget(props) {
    const [emptyActions, setEmptyActions] = useState(false)
    const [changer, setChanger] = useState(false)

    return (
    <>
        <ul className='overflowing' onClick={(e) => {
            if (e.target.nodeName !== 'BUTTON') {
                return
            }
            let buff = props.store.createGame.buffs
            const type = e.target.dataset.type
            const target = e.target.dataset.target
            let value = buff[`budget_${target}`]
            if (type === 'dec') {
                value = (value >= 0.05 ? value - 0.05 : 0)
            } else {
                value = (value <= 0.95 ? value + 0.05 : 1)
            }
            if (props.store.changeGame.indexOf('budget') === -1 && buff.actions - 3 >= 0) {
                props.change_game('budget')
                props.change_buffs({
                    actions: buff.actions - 3,

                    stability: buff.stability + (value - buff[`budget_${target}`])/2,
                    support: buff.support + (value - buff[`budget_${target}`])/2,
                })
                props.change_budget({
                    target: target,
                    value: parseFloat(value.toFixed(2))
                })
                setChanger(!changer)
            } else if (props.store.changeGame.indexOf('budget') !== -1) {
                props.change_buffs({

                    stability: buff.stability + (value - buff[`budget_${target}`])/2,
                    support: buff.support + (value - buff[`budget_${target}`])/2,
                })
                props.change_budget({
                    target: target,
                    value: parseFloat(value.toFixed(2))
                })
                setChanger(!changer)
            } else {
                e.preventDefault()
                setEmptyActions(true)

                let promise = new Promise((resolve) => {
                    setTimeout(() => { resolve('ee') }, 2000);
                });
                promise.then(
                    result => setEmptyActions(false)
                )
            }
        }}>
            <li className='economy-game__budget-list__item'>
                <div className='budget-list__item__heading'>
                    Доходы:
                    <span>
                        {getIncomes(props.store.createGame).toLocaleString() + ' '}
                        <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/>
                    </span>
                </div>
                <div className='budget-list__item__content'>
                    <div className='budget-list__item__content__value-block'>
                        <span className='budget-list__value-block__title'>Налоги физлиц:</span>
                        <span className='budget-list__value-block__value'>
                            {getPhysTaxes(props.store.createGame.country).toLocaleString() + ' '}
                            <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/>
                        </span>
                    </div>
                    <div className='budget-list__item__content__value-block'>
                        <span className='budget-list__value-block__title'>Налоги юрлиц:</span>
                        <span className='budget-list__value-block__value'>
                            {getJuridTaxes(props.store.createGame.country).toLocaleString() + ' '}
                            <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/>
                        </span>
                    </div>
                    <div className='budget-list__item__content__value-block'>
                        <span className='budget-list__value-block__title'>Дипломатия:</span>
                        <span className='budget-list__value-block__value'>{getDiplomatySpends(props.store.createGame).income.toLocaleString()} <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/></span>
                    </div>
                </div>
            </li>
            <li className='economy-game__budget-list__item'>
                <div className='budget-list__item__heading'>
                    Расходы:
                    <span>
                        {getSpends(props.store.createGame).toLocaleString() + ' '}
                        <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/>
                    </span>
                </div>
                <div className='budget-list__item__content'>
                    <div className='budget-list__item__content__value-block'>
                        <span className='budget-list__value-block__title'>Дипломатия:</span>
                        <span className='budget-list__value-block__value'>{getDiplomatySpends(props.store.createGame).spend.toLocaleString()} <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/></span>
                    </div>
                    <div className='budget-list__item__content__value-block'>
                        <span className='budget-list__value-block__title'>Армия:</span>
                        <span className='budget-list__value-block__value'>{(getSalaryPension(props.store.createGame) + getMaintain(props.store.createGame) + getEquip(props.store.createGame)).toLocaleString()} <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/></span>
                    </div>
                    <div className='budget-list__item__content__value-block'>
                        <span className='budget-list__value-block__title'>Соц. выплаты:</span>
                        <span className='budget-list__value-block__value'>{getSocialSpends(props.store.createGame.country).toLocaleString()} <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/></span>
                    </div>
                    <div className='budget-list__item__content__value-block'>
                        <span className='budget-list__value-block__title'>Инфраструктура:</span>
                        <div className='budget-list__value-block__redactor'>
                            <button data-type='dec' data-target='infrastructure' className='economy-game__budget__controls redact__controls redact__controls'>-</button>
                            <div className="economy-game__budget__progress-bar">
                                <div style={{
                                    backgroundColor: getColor(props.store.createGame.buffs.budget_infrastructure*100),
                                    width: `${props.store.createGame.buffs.budget_infrastructure*100}%`,}}> </div>
                                <div style={{
                                    width: '50%',
                                    borderRight: '1px solid #FFF',
                                }}> </div>
                            </div>
                            <button data-type='inc' data-target='infrastructure' className='economy-game__budget__controls redact__controls'>+</button>
                            <span className='budget-list__value-block__value'>
                                {getSpendBudget(props.store.createGame).infrastructure.toLocaleString() + ' '}
                                <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/>
                            </span>
                        </div>
                    </div>
                    <div className='budget-list__item__content__value-block'>
                        <span className='budget-list__value-block__title'>Образование:</span>
                        <div className='budget-list__value-block__redactor'>
                            <button data-type='dec' data-target='education' className='economy-game__budget__controls redact__controls'>-</button>
                            <div className="economy-game__budget__progress-bar">
                                <div style={{
                                    backgroundColor: getColor(props.store.createGame.buffs.budget_education*100),
                                    width: `${props.store.createGame.buffs.budget_education*100}%`,}}> </div>
                                <div style={{
                                    width: '50%',
                                    borderRight: '1px solid #FFF',
                                }}> </div>
                            </div>
                            <button data-type='inc' data-target='education' className='economy-game__budget__controls redact__controls'>+</button>
                            <span className='budget-list__value-block__value'>
                                {getSpendBudget(props.store.createGame).education.toLocaleString() + ' '}
                                <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/>
                            </span>
                        </div>
                    </div>
                    <div className='budget-list__item__content__value-block'>
                        <span className='budget-list__value-block__title'>Исследования:</span>
                        <div className='budget-list__value-block__redactor'>
                            <button data-type='dec' data-target='research' className='economy-game__budget__controls redact__controls'>-</button>
                            <div className="economy-game__budget__progress-bar">
                                <div style={{
                                    backgroundColor: getColor(props.store.createGame.buffs.budget_research*100),
                                    width: `${props.store.createGame.buffs.budget_research*100}%`,}}> </div>
                                <div style={{
                                    width: '50%',
                                    borderRight: '1px solid #FFF',
                                }}> </div>
                            </div>
                            <button data-type='inc' data-target='research' className='economy-game__budget__controls redact__controls'>+</button>
                            <span className='budget-list__value-block__value'>
                                {getSpendBudget(props.store.createGame).research.toLocaleString() + ' '}
                                <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/>
                            </span>
                        </div>
                    </div>
                    <div className='budget-list__item__content__value-block'>
                        <span className='budget-list__value-block__title'>Пропаганда:</span>
                        <div className='budget-list__value-block__redactor'>
                            <button data-type='dec' data-target='propaganda' className='economy-game__budget__controls redact__controls'>-</button>
                            <div className="economy-game__budget__progress-bar">
                                <div style={{
                                    backgroundColor: getColor(props.store.createGame.buffs.budget_propaganda*100),
                                    width: `${props.store.createGame.buffs.budget_propaganda*100}%`,}}> </div>
                                <div style={{
                                    width: '50%',
                                    borderRight: '1px solid #FFF',
                                }}> </div>
                            </div>
                            <button data-type='inc' data-target='propaganda' className='economy-game__budget__controls redact__controls'>+</button>
                            <span className='budget-list__value-block__value'>
                                {getSpendBudget(props.store.createGame).propaganda.toLocaleString() + ' '}
                                <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/>
                            </span>
                        </div>
                    </div>
                    <div className='budget-list__item__content__value-block'>
                        <span className='budget-list__value-block__title'>Правительство:</span>
                        <div className='budget-list__value-block__redactor'>
                            <button data-type='dec' data-target='government' className='economy-game__budget__controls redact__controls'>-</button>
                            <div className="economy-game__budget__progress-bar">
                                <div style={{
                                    backgroundColor: getColor(props.store.createGame.buffs.budget_government*100),
                                    width: `${props.store.createGame.buffs.budget_government*100}%`,}}> </div>
                                <div style={{
                                    width: '50%',
                                    borderRight: '1px solid #FFF',
                                }}> </div>
                            </div>
                            <button data-type='inc' data-target='government' className='economy-game__budget__controls redact__controls'>+</button>
                            <span className='budget-list__value-block__value'>
                                {getSpendBudget(props.store.createGame).government.toLocaleString() + ' '}
                                <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/>
                            </span>
                        </div>
                    </div>
                </div>
            </li>
            <li className='economy-game__budget-list__item'>
                <div className='budget-list__item__heading'>
                    Баланс:
                    <span style={{color: getBalance(props.store.createGame) > 0 ? 'var(--more-light)' : 'var(--less-light)'}}>
                        {getBalance(props.store.createGame).toLocaleString() + ' '}
                        <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/>
                    </span>
                </div>
            </li>
            <li className='economy-game__budget-list__item'>
                <div className='budget-list__item__heading'>
                    Казна:
                    <span>{props.store.createGame.buffs.kazna.toLocaleString()} <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/></span>
                </div>
            </li>
        </ul>
        <div hidden={!emptyActions}>
            <EmptyActions />
        </div>
    </>
    );
}

export default connect(mapStateToProps, { change_buffs, change_game, change_budget })(Budget);