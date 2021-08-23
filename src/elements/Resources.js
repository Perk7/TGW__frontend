import React, {useState} from 'react';
import {connect} from "react-redux";
import {mapStateToProps} from "../storage/reduxGet";
import {create_game, change_buffs, change_game, change_resource, change_kazna} from "../storage/actions";
import {getNeed, getResource, getPersOfGdp, getPersOfWorld} from "../otherFunctions";
import EmptyActions from "./EmptyActions";

function Resources(props) {

    const [redact, setRedact] = useState(false)
    const [ident, setIdent] = useState(['industry_alchemy', 'Алхимия'])
    const [changer, setChanger] = useState(false)
    const [emptyActions, setEmptyActions] = useState(false)
    const [emptyHeader, setEmptyHeader] = useState('')

    function redactResource() {
        let res = getResource(props.store.createGame.country, ident[0].split('_')[1], false)
        return (
            <div className='resources-game__redactor overflowing'>
                <div className='resources-game__redactor__heading'>
                    {ident[1]}
                    <span style={{float: 'right'}}><img className='icons_mini' src={'images/icons/action.svg'} alt=""/>1</span>
                </div>
                <div className='resources-game__redactor__info'>
                    <span>% от ВВП: {(getPersOfGdp(props.store.createGame, ident[0])*100).toFixed(2)}%</span>
                    <span>% от мирового рынка: {(getPersOfWorld(props.store.createGame, ident[0])*100).toFixed(2)}%</span>
                </div>
                <div onClick={e => {
                    if (e.target.nodeName !== 'BUTTON') {
                        return
                    }
                    let inc = +e.target.dataset.inc
                    let buff = props.store.createGame.buffs
                    if (res*inc*4 <= buff.kazna) {
                        if (props.store.changeGame.indexOf(`resources-${ident[0].split('_')[1]}`) === -1 && buff.actions - 1 >= 0) {
                            e.target.classList.add('resources-game__redactor__btn_anim')
                            setTimeout(() => e.target.classList.remove('resources-game__redactor__btn_anim'), 3000)
                            props.change_game(`resources-${ident[0].split('_')[1]}`)
                            props.change_buffs({
                                actions: buff.actions - 1,

                                inflation: buff.inflation + 0.03*inc,
                                unemployment: buff.unemployment - 0.05*inc,
                            })
                            props.change_resource({
                                target: ident[0].split('_')[1],
                                value: parseInt(res*inc)
                            })
                            props.change_kazna(parseInt(-res*inc*4))
                            setChanger(!changer)
                        } else if (props.store.changeGame.indexOf(`resources-${ident[0].split('_')[1]}`) !== -1) {
                            e.target.classList.add('resources-game__redactor__btn_anim')
                            setTimeout(() => e.target.classList.remove('resources-game__redactor__btn_anim'), 3000)
                            props.change_buffs({
                                inflation: buff.inflation + 0.03*inc,
                                unemployment: buff.unemployment - 0.05*inc,
                            })
                            props.change_resource({
                                target: ident[0].split('_')[1],
                                value: parseInt(res*inc)
                            })
                            props.change_kazna(parseInt(-res*inc*4))
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
                    } else {
                            e.preventDefault()
                            
                            setEmptyActions(true)
                            setEmptyHeader('В казне не хватает денег')
                            

                            let promise = new Promise((resolve) => {
                                setTimeout(() => { resolve('ee') }, 2000);
                            });
                            promise.then(
                                result => {
                                        setEmptyActions(false)
                                        setEmptyHeader('')
                                    }
                            )
                        }          
                }} className='resources-game__redactor__list'>
                    <span>Увеличить объемы производства</span>
                    <button data-inc={0.01} className='resources-game__redactor__btn'>
                        <span className='resources-game__redactor__btn__percent'>на 1%</span>
                        <span>{parseInt(res*0.04).toLocaleString()} <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/></span>
                    </button>
                    <button data-inc={0.03} className='resources-game__redactor__btn'>
                        <span className='resources-game__redactor__btn__percent'>на 3%</span>
                        <span>{parseInt(res*0.12).toLocaleString()}  <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/></span>
                    </button>
                    <button data-inc={0.05} className='resources-game__redactor__btn'>
                        <span className='resources-game__redactor__btn__percent'>на 5%</span>
                        <span>{parseInt(res*0.2).toLocaleString()} <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/></span>
                    </button>
                    <button data-inc={0.1} className='resources-game__redactor__btn'>
                        <span className='resources-game__redactor__btn__percent'>на 10%</span>
                        <span>{parseInt(res*0.4).toLocaleString()} <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/></span>
                    </button>
                    <button data-inc={0.25} className='resources-game__redactor__btn'>
                        <span className='resources-game__redactor__btn__percent'>на 25%</span>
                        <span>{parseInt(res).toLocaleString()} <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/></span>
                    </button>
                </div>
            </div>
        )
    }

    function getResources() {
        let data = [
            {ident: ['wheat', 'vegetable', 'animals'], name: 'Сельское хоз-во', group: true },
            {ident: 'wheat', name: 'Зерновое хоз-во', group: false },
            {ident: 'vegetable', name: 'Овощное хоз-во', group: false },
            {ident: 'animals', name: 'Животноводство', group: false },
            {ident: ['blackmetall', 'colormetall', 'coal'], name: 'Добыча ископаемых', group: true },
            {ident: 'blackmetall', name: 'Черные металлы', group: false },
            {ident: 'colormetall', name: 'Цветные металлы', group: false },
            {ident: 'coal', name: 'Добыча угля', group: false },
            {ident: ['hunting', 'fishing', 'forestry'], name: 'Природные отрасли', group: true },
            {ident: 'hunting', name: 'Охота', group: false },
            {ident: 'fishing', name: 'Рыболовство', group: false },
            {ident: 'forestry', name: 'Лесоводство', group: false },
            {ident: ['blacksmith', 'typography', 'light', 'alchemy'], name: 'Промышленность', group: true },
            {ident: 'blacksmith', name: 'Кузнечная  отрасль', group: false },
            {ident: 'typography', name: 'Полиграфия', group: false },
            {ident: 'light', name: 'Легкая отрасль', group: false },
            {ident: 'alchemy', name: 'Алхимия', group: false },
            {ident: ['jewelry', 'transport', 'hiring', 'culture', 'eating'], name: 'Общественная сфера', group: true },
            {ident: 'jewelry', name: 'Ювелирное дело', group: false },
            {ident: 'transport', name: 'Транспорт', group: false },
            {ident: 'hiring', name: 'Строительство', group: false },
            {ident: 'culture', name: 'Культура и религия', group: false },
            {ident: 'eating', name: 'Общепит', group: false },
            {ident: ['other'], name: 'Прочие ремесла', group: true },

        ]

        let list = []

        data.map((e) => {
            let prod = 0
            let needs = 0
            let sum
            let color

            if (e.group) {
                e.ident.map((id) => { prod = prod + getResource(props.store.createGame.country, id, false)})
                e.ident.map((id) => { needs = needs + getNeed(props.store.createGame.country, id, false)})
                sum = prod - needs
                color = 'var(--light-black)'

            } else {
                prod = getResource(props.store.createGame.country, e.ident, false)
                needs = getNeed(props.store.createGame.country, e.ident, false)
                sum = prod - needs
                color = 'var(--gray)'
            }
            list.push(
                <tr style={{backgroundColor: color}} className='resources-game__list__row' key={e.name}>
                    <td style={ e.name === 'Прочие ремесла'
                        ? { paddingLeft: '0.5em',
                            borderRadius: '0.7em',
                            background: 'linear-gradient(rgb(100 100 100), rgb(80 80 80)) rgb(255, 255, 255)' }
                        : { paddingLeft: e.group ? '0.5em' : '0',
                            borderRadius: e.group ? '0' : '0.5em',
                            background: e.group ? 'none' : 'linear-gradient(rgb(173 173 173), rgb(129 129 129)) rgb(255 255 255)' }}
                        className='resources-game__item_heading'
                        onClick={e.group && e.name !== 'Прочие ремесла' ? () => {} : (ev) => {
                            setIdent([`industry_${e.ident}`, e.name])
                            setRedact(!redact)
                        }}
                    >
                        {e.group ? e.name : <span>{e.name}</span>}
                    </td>
                    <td className='resources-game__item'>
                        {prod.toLocaleString()} <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/>
                    </td>
                    <td className='resources-game__item'>
                        {needs.toLocaleString()} <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/>
                    </td>
                    <td style={{fontWeight: 600,
                                color: e.group
                                    ? sum > 0 ? 'var(--more-light)' : 'var(--less-light)'
                                    : sum > 0 ? 'var(--more)' : 'var(--less)'}}
                        className='resources-game__item'>
                        {sum.toLocaleString()} <img className='icons_mini' src={'images/icons/coin.svg'} alt=""/>
                    </td>
                </tr>
            )
        })

        return list
    }

    return (
        <div className='resources-game__scroll overflowing'>
        <table className='resources-game__list'>
            <thead>
                <tr className='resources-game__list__row'>
                    <th className='resources-game__item_heading'>
                        Ресурсы:
                    </th>
                    <th className='resources-game__item_heading'>
                        Производство:
                    </th>
                    <th className='resources-game__item_heading'>
                        Потребление:
                    </th>
                    <th className='resources-game__item_heading'>
                        Баланс:
                    </th>
                </tr>
                <tr className='resources-game__list__row'>
                    <td className='resources-game__item_heading'>

                    </td>
                    <td className='resources-game__item_heading'>

                    </td>
                    <td className='resources-game__item_heading'>

                    </td>
                    <td className='resources-game__item_heading'>

                    </td>
                </tr>
            </thead>
            <tbody>
                {getResources()}
            </tbody>
        </table>
            <div className='resouces-game__redactor-list modal-blur' hidden={!redact}>
                {redactResource()}
                <button onClick={(e) => {
                    setRedact(!redact)
                }} className='resources-game__redactor__quit modal-quit' hidden={!redact}>&#215;</button>
            </div>
            <div hidden={!emptyActions}>
                <EmptyActions text={emptyHeader} />
            </div>
        </div>

    );
}

export default connect(mapStateToProps, { create_game, change_buffs, change_game, change_resource, change_kazna })(Resources);