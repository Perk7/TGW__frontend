import { useState } from 'react';
import {React} from 'react';
import MapRegion from './maps/MapRegion'
import MapCity from './maps/MapCity';
import MapVillage from './maps/MapVillage';
import {connect} from "react-redux";
import {useEffect, useRef} from 'react';
import {mapStateToProps} from "../storage/reduxGet";
import SquadList from "./maps/SquadList";
import Battle from "./Battle";
import movingSquad from '../movingSquad';
import seaSquad, {seaList} from '../seaSquad'
import identCountries from '../identCountries';
import { PanZoom } from 'react-easy-panzoom'
import colorsRegions from '../colorMap';
import coordsRegions from '../coordsMap';
import coordsCityMap from '../coordsCityMap';
import colorSquad from '../colorSquad';
import {set_colormap, set_capitals, change_game, change_buffs, transition_squad, change_squad, delete_squad, new_squad, change_occuped, 
change_ai_squad, new_ai_squad, delete_ai_squad} from "../storage/actions";
import {
    canBeRetreat,
    canBeTarget,
    canBeTargetAI,
    checkSeaside,
    checkWarRegion,
    getCountry,
    getOccupedRegions,
    getRegion,
    getSeaRegs,
    getSquads,
    getTransOfPlace,
    getWars,
    makeBattleEffects,
    whoseReg
} from "../otherFunctions";
import Flags from "../Flags";
import EmptyActions from "./EmptyActions";
import { getExodusBattle } from '../neuroFunctions';

function Map(props) {

    const [panX, setX] = useState(0)
    const [panY, setY] = useState(0)
    const [scale, setScale] = useState(1)
    const [regions, changeRegs] = useState([])
    const [current, setCurrent] = useState(false)
    const [setted, setSetted] = useState(false)
    const [curRegion, setCurRegion] = useState(false)
    const [curCountry, setCurCountry] = useState(false)
    const [changer, setChanger] = useState(true)
    const [radioSquad, setRadioSquad] = useState(true )
    const [squadWasTransited, setSquadWasTransited] = useState(false)
    const [battle, setBattle] = useState({})
    const [currentSquad, setCurrentSquad] = useState(false)
    const [targetsSquad, setTargetsSquad] = useState([])
    const [currentTarget, setCurTarget] = useState(false)
    const [emptyActions, setEmptyActions] = useState(false)
    const [emptyText, setEmptyText] = useState('')
    const [placeOfSquad, setPlaceOfSquad] = useState(false)
    const [squadListRender, setSquadListRender] = useState(false)

    const [transition, setTransition] = useState({
        pechot: 0,
        archer: 0,
        cavallery: 0,
        catapult: 0,
    })

    const [changerRend, setChangerRend] = useState(false)

    const [load, setLoad] = useState(true)

    const panZoomRef = useRef(null);
    const vector = useRef(null);

    function colorMap() {
            props.set_colormap([])
            let capitals = []
            let arr = []

            const arrs = getOccupedRegions(props.store.createGame, 'arr')
            const detail = getOccupedRegions(props.store.createGame, 'detail')

            for (let i of props.store.createGame.country.regions) {
                let coords = coordsRegions[i.name]
                arr.push({
                    coords: coords,
                    color: colorsRegions[props.store.createGame.country.identify],
                    name: i.name,
                    occuped: arrs.indexOf(i.name) !== -1
                        ? detail[i.name]
                        : null
                })
            }
            capitals.push(props.store.createGame.country.capital.capital)

            for (let i of props.store.createGame.country_ai) {
                capitals.push(i.capital.capital)
                for (let t of i.regions) {
                    let coords = coordsRegions[t.name]
                    arr.push({
                        coords: coords,
                        color: colorsRegions[i.identify],
                        name: t.name,
                        occuped: arrs.indexOf(t.name) !== -1
                            ? detail[t.name]
                            : null
                    })
                }
            }
            props.set_colormap(arr)
            props.set_capitals(capitals)
            changeRegs(arr)
    }

    function getRegionCountry(current) {
        for (let i of props.store.createGame.country.regions) {
            if (current.ident.split('_').join(' ') === i.name) {
                setCurRegion(i)
                return props.store.createGame.country
            }
        }
        for (let i of props.store.createGame.country_ai) {
            for (let r of i.regions) {
                if (current.ident.split('_').join(' ') === r.name) {
                    setCurRegion(r)
                    return i
                }
            }
        }
        setCurRegion(false)
        return {
            name: 'Необитаемые земли',
            identify: 'none',
        }
    }

    function getEconomy() {
        let summ = 0
        for (let i in curRegion) {
            if (~i.indexOf('industry')) {
                summ = summ + curRegion[i]
            }
        }
        return summ
    }

    function getSquad(reg) {
        if (reg.owner) {
            for (let i of props.store.createGame.squad) {
                if (i.id == reg.ident) {
                    return i
                }
            }
        } else {
            for (let i of props.store.createGame.squad_ai) {
                if (i.id == reg.ident) {
                    return i
                }
            }
        }
        return {}
    }

    useEffect(() => {
        if (props.store.createGame && !setted) {
            colorMap()
            setSetted(true)
        }
        if (regions) {
            setLoad(false)
        } else {
            setLoad(true)
        }
    });

    if (load) {
        return ( <div style={{display: 'none',}}>loading...</div> )
    }
    return (
        <div style={{position: 'relative', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}} onDoubleClick={() => { return false; }}>
            {current &&
                <div className='map__region_info'>
                    <div className='map__region_info__flag'>
                        <div style={Flags[curCountry.identify]} className='flag' />
                    </div>
                    <div className='map__region_info__name'>{current.ident.split('_').join(' ')} <span>{curCountry.name}</span></div>
                    {curRegion.area &&
                        <div className='map__region_info__content'>
                            <div>Город: <span>{curRegion.capital}</span></div>
                            <div>Население: <span>{curRegion.population.toLocaleString()} чел.</span></div>
                            <div>Экономика: <span>{getEconomy().toLocaleString()} cпт.</span></div>
                        </div>
                        }
                </div>
            }
            {currentSquad &&
                <div className='map__region_info'>
                    <div className='map__region_info__flag'>
                        <div style={Flags[curCountry.identify]} className='flag' />
                    </div>
                    <div className='map__region_info__name'>
                        {Object.keys(colorSquad).find(key => colorSquad[key] === currentSquad.color) === 'own'
                            ? 'Ваши войска'
                            : Object.keys(colorSquad).find(key => colorSquad[key] === currentSquad.color) === 'alliance'
                                ? 'Войска союзника/вассала'
                                : 'Войска врага' }
                        {seaList.indexOf(getSquad(currentSquad).place) !== -1 ? ' (Перемещение)' : ''}
                        <span>{curCountry.name}</span>
                    </div>
                    {currentSquad.quan &&
                    <div className='map__squad_info__content'>
                        <div className='map__squad_info__content__item'>
                            <img src={"images/icons/pehot.svg"} alt=""/>
                            <span>{getSquad(currentSquad).pechot_quan}</span>
                        </div>
                        <div className='map__squad_info__content__item'>
                            <img src={"images/icons/archer.svg"} alt=""/>
                            <span>{getSquad(currentSquad).archer_quan}</span>
                        </div>
                        <div className='map__squad_info__content__item'>
                            <img src={"images/icons/cavallery.svg"} alt=""/>
                            <span>{getSquad(currentSquad).cavallery_quan}</span>
                        </div>
                        <div className='map__squad_info__content__item'>
                            <img src={"images/icons/catapult.svg"} alt=""/>
                            <span>{getSquad(currentSquad).catapult_quan}</span>
                        </div>
                        <div className='map__squad_info__content__item'>
                            {(currentSquad.owner && seaList.indexOf(getSquad(currentSquad).place) === -1) &&
                                <>
                                <span>Статус:</span>
                                <span>{getSquad(currentSquad).status === 'R' ? 'Готов' : 'Расквартирован'}</span>
                                <button
                                    disabled={props.store.changeGame.indexOf(`squad_status_${getSquad(currentSquad).id}`) !== -1}
                                    onClick={e => {
                                        props.change_game(`squad_status_${getSquad(currentSquad).id}`)
                                        setChangerRend(!changerRend)
                                }
                                }>Изменить (1 ход)</button>
                                </>
                            }
                        </div>
                    </div>
                    }
                </div>
            }
            <PanZoom
                ref={panZoomRef}

                boundaryRatioVertical={panX}
                boundaryRatioHorizontal={panY}
                enableBoundingBox
                realPinch={true}
                noStateUpdate={false}

                disableDoubleClickZoom={true}

                onStateChange={(e) => {
                    if (scale !== panZoomRef.current.state.scale) {
                        let scaleIn = panZoomRef.current.state.scale
                        if (scaleIn < 1.5) {
                            setX(0.4)
                            setY(0.4)
                        } else if (scaleIn < 2.4) {
                            setX(0.6)
                            setY(0.6)
                        } else if (scaleIn < 3) {
                            setX(0.7)
                            setY(0.7)
                        } else if (scaleIn < 4) {
                            setX(0.8)
                            setY(0.8)
                        } else if (scaleIn < 5) {
                            setX(0.85)
                            setY(0.85)
                        }

                        setScale(scaleIn)
                    }
                }}

                minZoom={1}
                maxZoom={5}
                zoomSpeed={2}

                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="70vw" height="100vh"
                    viewBox={`0 0 270 190`}
                    version="1.1"
                    id="1svg8"
                    ref={vector}
                  >
                    <g
                        id="Море"
                        style={{strokeWidth:'0.188976',strokeMiterlimit:'4',strokeDasharray:'none'}}
                        onClick={(e) => {
                            let ident = e.target.getAttribute('id')
                            let fill = e.target.getAttribute('fill')
                            setChanger(false)
                            if (current) {
                                let cur = document.getElementById(current.ident)
                                cur.setAttribute('fill', current.color)
                                if (cur === e.target) {
                                    setCurrent(false)
                                    setCurCountry(false)
                                    setChanger(true)
                                    return
                                }
                            }

                            if (targetsSquad.indexOf(e.target.id.split('_').join(' ')) !== -1) {
                                if (getSquad(currentSquad).status === 'R'
                                    &&
                                    props.store.changeGame.indexOf(`squad_status_${getSquad(currentSquad).id}`) === -1) {
                                    setCurTarget(e.target.id.split('_').join(' '))
                                    setTargetsSquad([])
                                    setPlaceOfSquad(getSquad(currentSquad))
                                    setCurrentSquad(false)
                                    setCurCountry(false)
                                } else {
                                    setEmptyActions(true)
                                    setEmptyText(props.store.changeGame.indexOf(`squad_status_${getSquad(currentSquad).id}`) === -1
                                        ? 'Данный отряд расквартирован'
                                        : 'Данный отряд меняет статус')

                                    let promise = new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve('ee')
                                        }, 2000);
                                    });
                                    promise.then(
                                        result => {
                                            setEmptyActions(false)
                                            setEmptyText('')
                                        }
                                    )
                                }
                                return
                            }
                            if (currentSquad) {
                                setCurrentSquad(false)
                                setCurCountry(false)
                            }
                            setTargetsSquad([])
                            e.target.setAttribute('fill', `url(#${ident.split("'").join('')}__linear-gradient)`)
                            setCurrent({
                                ident: ident,
                                color: fill,
                            })
                            setCurCountry(getRegionCountry({
                                ident: ident,
                                color: fill,
                            }))
                        }}>
                        {regions.map((reg) => <MapRegion coord={reg.coords} identy={reg.name} color={
                            targetsSquad.indexOf(reg.name) !== -1 ? `url(#${reg.name.split(' ').join('_').split("'").join('')}__squad-gradient)` : reg.color} occuped={reg.occuped} key={reg.name} />)}
                        {coordsCityMap.map((city) => <MapCity name={city.name} position={city.coord} color={props.store.capitals.indexOf(city.name) !== -1 ? '#00117f' : '#000000'} key={city.name} />)}
    <MapRegion coord={coordsRegions['Ввандерфелл']} identy="Ввандерфелл" color='#333' />

    <MapVillage name='Драконий мост' position="translate(-8.7331997,4.7204047)" />
    <MapVillage name='Картвастен' position="translate(-14.718776,14.808928)" />
    <MapVillage name='Рорикстед' position="translate(-4.3999905,20.241595)" />
    <MapVillage name='Ривервуд' position='translate(16.643611,30.632167)'  />
    <MapVillage name='    Хелген' position='translate(16.136302,37.555905)'  />
    <MapVillage name='Айварстед' position='translate(28.317177,34.320357)'  />
    <MapVillage name='Камень Шора' position='translate(45.140699,33.470322)'  />

    <MapVillage name='Селезис' position='translate(57.032058,28.520609)'  />
    <MapVillage name='Старый Эбонхарт' position='translate(82.12647,62.335151)'  />
    <MapVillage name='Далмора' position='translate(102.40144,61.846757)'  />
    <MapVillage name='Селфора' position='translate(99.53596,77.53784)'  />
    <MapVillage name='Ризендис' position='translate(111.229,84.273033)'  />
    <MapVillage name='Хельним' position='translate(108.72876,30.122129)'  />
    <MapVillage name='Дралорис' position='translate(111.44287,38.576624)'  />
    <MapVillage name='Тель Митрин' position='translate(66.658545,6.4441459)'  />
    <MapVillage name='Деревня Скаалов' position='translate(65.825225,-4.3368393)'  />
    <MapVillage name='Крагенмур' position='translate(69.725402,68.099132)'  />
    <MapVillage name='Андрезис' position='translate(69.691053,73.712234)'  />
    <MapVillage name='Кормарис' position='translate(51.469152,16.505382)'  />

    <MapVillage name='Коримонт' position='translate(90.847662,103.08098)'  />
    <MapVillage name='Марквотэр' position='translate(82.235312,108.10806)'  />
    <MapVillage name='Хельстром' position='translate(32.380083,77.919792)'  />

    <MapVillage name='Блэкерсвэй' position='translate(29.241402,59.160151)'  />
    <MapVillage name='Эльсвелл' position='translate(25.396653,62.789463)'  />
    <MapVillage name='Вейе' position='translate(22.09795,72.431684)'  />
    <MapVillage name='Врата Пэлла' position='translate(27.287511,81.850173)'  />
    <MapVillage name='Фарегил' position='translate(29.32013,89.068156)'  />
    <MapVillage name='Дрэйклоу' position='translate(55.029986,73.207431)'  />
    <MapVillage name='Кропсфорд' position='translate(44.015387,82.930869)'  />
    <MapVillage name='Бланкенмарчу' position='translate(49.054063,117.97336)'  />
    <MapVillage name='Шардрок' position='translate(-6.9029418,84.937135)'  />
    <MapVillage name='Хакдирт' position='translate(5.8095253,72.323721)'  />
    <MapVillage name='Брина Кросс' position='translate(-23.282156,91.101768)'  />

    <MapVillage name='Паалат' position='translate(14.861327,98.0539)'  />
    <MapVillage name='Равлха' position='translate(9.0067959,106.48749)'  />
    <MapVillage name='Сренджа' position='translate(18.367656,111.08463)'  />
    <MapVillage name='Виловгров' position='translate(5.0533396,118.56633)'  />
    <MapVillage name='Мистрал' position='translate(21.867405,152.16119)'  />

    <MapVillage name='Вайндаск' position='translate(0.30984299,101.2289)'  />
    <MapVillage name='Вулквастен' position='translate(-15.809145,106.61108)'  />
    <MapVillage name='Вулайн' position='translate(-27.535322,118.75755)'  />
    <MapVillage name='Бладтойл' position='translate(-12.125779,110.38139)'  />
    <MapVillage name='Лонгхавен' position='translate(-30.277387,131.15118)'  />
    <MapVillage name='Марбурк' position='translate(-18.056866,124.90911)'  />
    <MapVillage name='Карздар' position='translate(3.7422022,125.98251)'  />
    <MapVillage name='Саузпойнт' position='translate(-5.66206,143.76067)'  />

    <MapVillage name='Торстад' position='translate(-53.072568,43.487698)'  />
    <MapVillage name='Розгард' position='translate(-33.36172,73.728973)'  />
    <MapVillage name='Стоунмур' position='translate(-13.863805,65.311711)'  />
    <MapVillage name='Картмонт' position='translate(-25.723094,61.418401)'  />
    <MapVillage name='Причал Абы' position='translate(-41.57083,75.498169)'  />
    <MapVillage name='Козансет' position='translate(-49.550336,47.599698)'  />
    <MapVillage name='Веркарз' position='translate(-41.99586,44.740357)'  />
    <MapVillage name='Белкарз' position='translate(-8.3022919,42.292961)'  />
    <MapVillage name='Сатакалаам' position='translate(-46.677815,39.830321)'  />
    <MapVillage name='Бергама' position='translate(-59.030232,56.98663)'  />
    <MapVillage name='Санкип' position='translate(-78.879141,63.128898)'  />
    <MapVillage name='Абибон-гора' position='translate(-82.949717,66.048608)'  />
    <MapVillage name='Частаун' position='translate(-76.697449,59.704386)'  />
    <MapVillage name='Лаинли' position='translate(-58.188754,40.110149)'  />

    <MapVillage name='Гленпойнт' position='translate(-94.492008,51.438968)'  />
    <MapVillage name='Альдкрофт' position='translate(-81.32863,41.547633)'  />
    <MapVillage name='Антиклер' position='translate(-75.710677,35.171547)'  />
    <MapVillage name='Камбрия' position='translate(-71.896542,28.567379)'  />
    <MapVillage name='Коэглин' position='translate(-66.210294,26.664791)'  />
    <MapVillage name='Фригиас' position='translate(-80.092332,28.473834)'  />
    <MapVillage name='Крестшэйд' position='translate(-70.651667,12.010032)'  />
    <MapVillage name='Олдгейт' position='translate(-65.232243,17.319651)'  />
    <MapVillage name='Ветровая крепость' position='translate(-48.087598,28.498199)'  />
    <MapVillage name='Вермеир' position='translate(-73.506751,31.108147)'  />
    <MapVillage name='Данлейн' position='translate(-23.764992,10.981045)'  />
    <MapVillage name='Фростбрейк' position='translate(-43.661362,21.061424)'  />
    <MapVillage name='Моркул' position='translate(-39.303727,10.560095)'  />
    <MapVillage name='Лощина Кербол' position='translate(-26.523472,22.69845)'  />
    <MapVillage name='Мурсиен' position='translate(-34.594108,21.098903)'  />

    <MapVillage name='Фелбаллин' position='translate(-93.533051,149.59079)'  />
    <MapVillage name='Искью' position='translate(-77.223289,147.67834)'  />
    <MapVillage name='Кроддлехарст' position='translate(-68.746409,142.63619)'  />
    <MapVillage name='Силдарим' position='translate(-60.836036,144.75285)'  />
    <MapVillage name='Риверфилд' position='translate(-75.861293,123.46318)'  />
    <MapVillage name='Росфельд' position='translate(-70.431926,124.45538)'  />
    <MapVillage name='Слаутер' position='translate(-82.516602,121.08193)'  />
    <MapVillage name='Кингсхавен' position='translate(-78.555588,107.12516)'  />
    <MapVillage name='Даунбрейк' position='translate(-55.979672,109.894)'  />

    {radioSquad &&
    <g onClick={(e) => {
        setTargetsSquad([])
        e.stopPropagation()
        let el
        if (e.target.id === 'span-squad') {
            el = e.target.parentElement.parentElement
        } else {
            el = e.target.parentElement
        }
        let ident = el.dataset.ident
        setChanger(false)
        if (current) {
            setCurrent(false)
            setCurCountry(false)
            let cur = document.getElementById(current.ident)
            cur.setAttribute('fill', current.color)
        }
        if (currentSquad) {
            if (ident === currentSquad.ident) {
                setCurrentSquad(false)
                setCurCountry(false)
                setChanger(true)
                return
            }
        }
        setCurrentSquad({
            ident: ident,
            color: el.dataset.type,
            owner: el.dataset.owner,
            quan: el.dataset.quan,
        })
        setCurCountry({
            identify: el.dataset.country,
            name: identCountries[el.dataset.country],
        })

        if (el.dataset.owner) {
            let targets = []
            if (seaList.indexOf(el.dataset.place) === -1) {
                let reg = getRegion(props.store.createGame, el.dataset.place)
                targets = movingSquad[el.dataset.place].filter(reg => canBeTarget(props.store.createGame, reg) || whoseReg(props.store.createGame, reg) === props.store.createGame.country.identify)
                if (reg.seaside) {
                    let seas = getSeaRegs(props.store.createGame)
                    for (let i of seas) {
                        if (i.name !== reg.name && targets.indexOf(i.name) === -1 && (canBeTarget(props.store.createGame, i.name) || whoseReg(props.store.createGame, i.name) === props.store.createGame.country.identify)) {
                            targets.push(i.name)
                        }
                    }
                }
            }
            let trans = getTransOfPlace(props.store.squadTrans, el.dataset.place)
            trans = trans ? (trans.pechot_quan + trans.archer_quan + trans.cavallery_quan + trans.catapult_quan) : 0
            let balance = el.dataset.quan - trans
            if (getSquad({
                ident: ident,
                owner: el.dataset.owner,
            }).status === "Q") {
                setTargetsSquad([])
            }
            else if (balance > 0) {
                setTargetsSquad(targets)
            } else {
                setTargetsSquad([])
            }
        }
    }}>
        <SquadList rend={squadListRender} />
    </g>}

    </g>
    </svg>
    </PanZoom>

    <div className='start-game_map-block__scale-bar' onClick={(e) => {
        let target = document.querySelector('.start-game_map-block__scale-bar').getBoundingClientRect();
        let x = e.clientX - target.left
        let res = x / target.width
        panZoomRef.current.autoCenter(res*5, true)
        setScale(scale)
    }}>
        <div style={{width: `${scale*3.5}vw`}} className='start-game_map-block__scale-bar_value'> </div>
    </div>
    <button onClick={() => {
        panZoomRef.current.reset()
    }} className='start-game_map-block__full-btn'><img src={'images/full-btn.svg'} alt=""/></button>
    <button hidden={!changer} onClick={() => {
        setRadioSquad(!radioSquad)
    }} className='start-game_map-block__radio-squad-map'>{radioSquad ? 'Убрать войска' : 'Показать войска'}</button>
   {currentTarget && (
   <div className='start-game_map-block__changer-view'>
       <ul onClick={ev => {
           if (ev.target.nodeName !== 'BUTTON') {
               return
           }
           const type = ev.target.dataset.type
           const target = ev.target.dataset.target

           const transit = getTransOfPlace(props.store.squadTrans, placeOfSquad.place)
           let value = 50 * (type.indexOf('dec') === -1 ? 1 : -1) * (type.indexOf('db') === -1 ? 1 : 10)
           let squad = Object.assign({}, transition)

           if (squad[target] + value < 0) {
               value = -squad[target]
           }
           let maximum = placeOfSquad[`${target}_quan`] - (transit ? transit[`${target}_quan`] : 0)
           if (squad[target] + value > maximum) {
               value = maximum - squad[target]
           }
           squad[target] = squad[target] + value
           setTransition(0)
           setTransition(squad)
       }} className='start-game_map-block__squad-target'>
           <li className='start-game__map-block__squad-target__header'>
               <span>→ {currentTarget}</span>
               <span><img className='icons_mini' src={'images/icons/action.svg'} alt=""/>1</span>
           </li>
           <li className='politic-game__redact__item'>
               <span>Пехотинцы</span>
               <button data-target={'pechot'} data-type={'db-dec'} className='redact__controls'>--</button>
               <button data-target={'pechot'} data-type={'dec'}    className='redact__controls'>-</button>
               <input  type='number' className='redact__number' value={transition['pechot']} disabled={true} />
               <button data-target={'pechot'} data-type={'inc'}    className='redact__controls'>+</button>
               <button data-target={'pechot'} data-type={'db-inc'} className='redact__controls'>++</button>
           </li>
           <li className='politic-game__redact__item'>
               <span>Лучники</span>
               <button data-target={'archer'} data-type={'db-dec'} className='redact__controls'>--</button>
               <button data-target={'archer'} data-type={'dec'}    className='redact__controls'>-</button>
               <input  type='number' className='redact__number' value={transition['archer']} disabled={true} />
               <button data-target={'archer'} data-type={'inc'}    className='redact__controls'>+</button>
               <button data-target={'archer'} data-type={'db-inc'} className='redact__controls'>++</button>
           </li>
           <li className='politic-game__redact__item'>
               <span>Кавалерия</span>
               <button data-target={'cavallery'} data-type={'db-dec'} className='redact__controls'>--</button>
               <button data-target={'cavallery'} data-type={'dec'}    className='redact__controls'>-</button>
               <input  type='number' className='redact__number' value={transition['cavallery']} disabled={true} />
               <button data-target={'cavallery'} data-type={'inc'}    className='redact__controls'>+</button>
               <button data-target={'cavallery'} data-type={'db-inc'} className='redact__controls'>++</button>
           </li>
           <li className='politic-game__redact__item'>
               <span>Катапульты</span>
               <button data-target={'catapult'} data-type={'db-dec'} className='redact__controls'>--</button>
               <button data-target={'catapult'} data-type={'dec'}    className='redact__controls'>-</button>
               <input  type='number' className='redact__number' value={transition['catapult']} disabled={true} />
               <button data-target={'catapult'} data-type={'inc'}    className='redact__controls'>+</button>
               <button data-target={'catapult'} data-type={'db-inc'} className='redact__controls'>++</button>
           </li>
           <li className='politic-game__redact__item'>
               <button onClick={ev => {
                       let buff = props.store.createGame.buffs
                       let maxId = 0
                       for (let i of props.store.createGame.squad) {
                            if (i.id >= maxId) {
                                maxId = i.id+1
                            }
                       }
                       const header = `${maxId}_${currentTarget}`

                       const status = (
                           checkSeaside(props.store.createGame, currentTarget)
                           &&
                           movingSquad[placeOfSquad.place].indexOf(currentTarget) === -1 ? 'Sea' : 'Ground')

                       let squad = Object.assign({}, placeOfSquad)
                       squad['pechot_quan'] = squad['pechot_quan'] - transition.pechot
                       squad['archer_quan'] = squad['archer_quan'] - transition.archer
                       squad['cavallery_quan'] = squad['cavallery_quan'] - transition.cavallery
                       squad['catapult_quan'] = squad['catapult_quan'] - transition.catapult

                       let newSquad = Object.assign({}, squad)
                       newSquad['pechot_quan'] = transition.pechot
                       newSquad['archer_quan'] = transition.archer
                       newSquad['cavallery_quan'] = transition.cavallery
                       newSquad['catapult_quan'] = transition.catapult

                       const transit = {
                           key: header, data: {
                               pechot_quan: newSquad.pechot_quan,
                               archer_quan: newSquad.archer_quan,
                               cavallery_quan: newSquad.cavallery_quan,
                               catapult_quan: newSquad.catapult_quan,
                               type: status,
                               place: status === 'Sea' ? seaSquad[newSquad.place] : currentTarget,
                               target: currentTarget,
                               step: status === 'Sea' ? 3 : 1,
                               new_id: 0
                           }
                       }

                       newSquad.place = status === 'Sea' ? seaSquad[newSquad.place] : currentTarget

                       let canCreate = true

                        if (Object.keys(props.store.squadTrans).indexOf(header) === -1 && buff.actions - 1 >= 0) {
                           props.change_buffs({
                               actions: buff.actions - 1,
                           })

                           if (squad['pechot_quan'] + squad['archer_quan'] + squad['cavallery_quan'] + squad['catapult_quan'] === 0) {
                               props.delete_squad(squad)
                           } else {
                               props.change_squad(squad)
                           }

                           if (checkWarRegion(props.store.createGame, newSquad.place)) {
                            let squadsAI = getSquads(props.store.createGame, whoseReg(props.store.createGame, newSquad.place))
                            let squadsRegs = squadsAI.map(e => e.place)
                            
                            if (squadsRegs.includes(newSquad.place)) {
                                canCreate = false
                                let enemySquad = squadsAI.find(e => e.place === newSquad.place)
                                const squads = {
                                                own: {
                                                    pechot: newSquad['pechot_quan'],
                                                    archer: newSquad['archer_quan'],
                                                    cavallery: newSquad['cavallery_quan'],
                                                    catapult: newSquad['catapult_quan'],
                
                                                    quality: props.store.createGame.buffs.army_quality,
                                                },
                                                enemy: {
                                                    pechot: enemySquad.pechot_quan,
                                                    archer: enemySquad.archer_quan,
                                                    cavallery: enemySquad.cavallery_quan,
                                                    catapult: enemySquad.catapult_quan,
                
                                                    quality: getCountry(props.store.createGame, enemySquad.country).army_quality,
                                                }
                                            }
    
                                            let exodus = getExodusBattle(squads.own, squads.enemy)
    
                                            let output = {
                                                region: getRegion(props.store.createGame, newSquad.place),
                                                enemy: getCountry(props.store.createGame, enemySquad.country).identify,
                
                                                ownSquad: newSquad,
                                                enemySquad: enemySquad,
                
                                                ownSpend: exodus.own,
                                                enemySpend: exodus.enemy,
                
                                                close: () => {
                                                    setBattle({})
                                                },
                
                                                result: exodus.exodus === 'own' ? 'win' : 'loose',
                                            }
                                            
                                            setBattle(output)
                                            makeBattleEffects(props.store, {
                                                change_occuped: props.change_occuped,
                                                new_squad: props.new_squad,
                                                new_ai_squad: props.new_ai_squad,
                                                change_squad: props.change_squad,
                                                change_ai_squad: props.change_ai_squad,
                                                delete_squad: props.delete_squad,
                                                delete_ai_squad: props.delete_ai_squad,
                                            }, {
                                                region: getRegion(props.store.createGame, newSquad.place),
                                                enemyCountry: getCountry(props.store.createGame, enemySquad.country),
                
                                                own: {
                                                    pechot: output.ownSquad.pechot_quan - output.ownSpend.pechot,
                                                    archer: output.ownSquad.archer_quan - output.ownSpend.archer,
                                                    cavallery: output.ownSquad.cavallery_quan - output.ownSpend.cavallery,
                                                    catapult: output.ownSquad.catapult_quan - output.ownSpend.catapult, 
                                                },
                                                enemy: {
                                                    pechot: output.enemySquad.pechot_quan - output.enemySpend.pechot,
                                                    archer: output.enemySquad.archer_quan - output.enemySpend.archer,
                                                    cavallery: output.enemySquad.cavallery_quan - output.enemySpend.cavallery,
                                                    catapult: output.enemySquad.catapult_quan - output.enemySpend.catapult, 
                                                },

                                                result: exodus.exodus
                                            })
                                } else {
                                props.change_occuped({
                                    own: props.store.createGame.country.identify,
                                    enemy: whoseReg(props.store.createGame, newSquad.place),
                                    region: newSquad.place
                                })
                                }
                            }

                           if (canCreate) {
                               props.new_squad(newSquad)
                           }

                           let id = 0
                           for (let i of props.store.createGame.squad) {
                               id = i.id > id ? i.id : id
                           }
                           transit.data.new_id = id
                           props.transition_squad(transit)
                           setSquadWasTransited(true)

                       } else if (Object.keys(props.store.squadTrans).indexOf(header) !== -1) {
                           if (squad['pechot_quan'] + squad['archer_quan'] + squad['cavallery_quan'] + squad['catapult_quan'] === 0) {
                               props.delete_squad(squad)
                           } else {
                               props.change_squad(squad)
                           }

                           if (checkWarRegion(props.store.createGame, newSquad.place)) {
                            let squadsAI = getSquads(props.store.createGame, whoseReg(props.store.createGame, newSquad.place))
                            let squadsRegs = squadsAI.map(e => e.place)
 
                            if (squadsRegs.includes(newSquad.place)) {
                                canCreate = false
                                let enemySquad = squadsAI.find(e => e.place === newSquad.place)
                                const squads = {
                                                own: {
                                                    pechot: newSquad['pechot_quan'],
                                                    archer: newSquad['archer_quan'],
                                                    cavallery: newSquad['cavallery_quan'],
                                                    catapult: newSquad['catapult_quan'],
                
                                                    quality: props.store.createGame.buffs.army_quality,
                                                },
                                                enemy: {
                                                    pechot: enemySquad.pechot_quan,
                                                    archer: enemySquad.archer_quan,
                                                    cavallery: enemySquad.cavallery_quan,
                                                    catapult: enemySquad.catapult_quan,
                
                                                    quality: getCountry(props.store.createGame, enemySquad.country).army_quality,
                                                }
                                            }
    
                                            let exodus = getExodusBattle(squads.own, squads.enemy)
    
                                            let output = {
                                                region: getRegion(props.store.createGame, newSquad.place),
                                                enemy: getCountry(props.store.createGame, enemySquad.country).identify,
                
                                                ownSquad: newSquad,
                                                enemySquad: enemySquad,
                
                                                ownSpend: exodus.own,
                                                enemySpend: exodus.enemy,
                
                                                close: () => {
                                                    setBattle({})
                                                },
                
                                                result: exodus.exodus === 'own' ? 'win' : 'loose',
                                            }
                                            
                                            setBattle(output)
                                            makeBattleEffects(props.store, {
                                                change_occuped: props.change_occuped,
                                                new_squad: props.new_squad,
                                                new_ai_squad: props.new_ai_squad,
                                                change_squad: props.change_squad,
                                                change_ai_squad: props.change_ai_squad,
                                                delete_squad: props.delete_squad,
                                                delete_ai_squad: props.delete_ai_squad,
                                            }, {
                                                region: getRegion(props.store.createGame, newSquad.place),
                                                enemyCountry: getCountry(props.store.createGame, enemySquad.country),
                
                                                own: {
                                                    pechot: output.ownSquad.pechot_quan - output.ownSpend.pechot,
                                                    archer: output.ownSquad.archer_quan - output.ownSpend.archer,
                                                    cavallery: output.ownSquad.cavallery_quan - output.ownSpend.cavallery,
                                                    catapult: output.ownSquad.catapult_quan - output.ownSpend.catapult, 
                                                },
                                                enemy: {
                                                    pechot: output.enemySquad.pechot_quan - output.enemySpend.pechot,
                                                    archer: output.enemySquad.archer_quan - output.enemySpend.archer,
                                                    cavallery: output.enemySquad.cavallery_quan - output.enemySpend.cavallery,
                                                    catapult: output.enemySquad.catapult_quan - output.enemySpend.catapult, 
                                                },

                                                result: exodus.exodus
                                            })
                                } else {
                                props.change_occuped({
                                    own: props.store.createGame.country.identify,
                                    enemy: whoseReg(props.store.createGame, newSquad.place),
                                    region: newSquad.place
                                })
                                }
                            }

                           if (canCreate) {
                            for (let i of props.store.createGame.squad) {
                                if (i.place === newSquad.place) {
                                    newSquad.pechot_quan = newSquad.pechot_quan + i.pechot_quan
                                    newSquad.archer_quan = newSquad.archer_quan + i.archer_quan
                                    newSquad.cavallery_quan = newSquad.cavallery_quan + i.cavallery_quan
                                    newSquad.catapult_quan = newSquad.catapult_quan + i.catapult_quan
                                }
                            }
                            props.change_squad(newSquad)
                           }

                           transit.data.pechot_quan = transit.data.pechot_quan + props.store.squadTrans[header].pechot_quan
                           transit.data.archer_quan = transit.data.archer_quan + props.store.squadTrans[header].archer_quan
                           transit.data.cavallery_quan = transit.data.cavallery_quan + props.store.squadTrans[header].cavallery_quan
                           transit.data.catapult_quan = transit.data.catapult_quan + props.store.squadTrans[header].catapult_quan
                           props.transition_squad(transit)
                           setSquadWasTransited(true)

                       } else {
                           ev.preventDefault()
                           setEmptyActions(true)

                           let promise = new Promise((resolve) => {
                               setTimeout(() => {
                                   resolve('ee')
                               }, 2000);
                           });
                           promise.then(
                               result =>
                                   setEmptyActions(false)
                           )
                       }
                       setTransition({
                           pechot: 0,
                           archer: 0,
                           cavallery: 0,
                           catapult: 0,
                       })
                       setCurTarget(false)
                       setChanger(!changer)
                       props.rend()
                       setSquadListRender(!squadListRender)
                       setSetted(false)
                       ev.stopPropagation()
               }} className='redact__submit'>
                   {checkWarRegion(props.store.createGame, currentTarget) ? 'Атаковать' : 'Перейти'}</button>
               <button className='redact__submit redact__select-all' onClick={(ev) => {
                   const transit = getTransOfPlace(props.store.squadTrans, placeOfSquad.place)
                   let squad = Object.assign({}, transition)

                   let maximum = placeOfSquad[`pechot_quan`] - (transit ? transit[`pechot_quan`] : 0)
                   squad['pechot'] = maximum

                   maximum = placeOfSquad[`archer_quan`] - (transit ? transit[`archer_quan`] : 0)
                   squad['archer'] = maximum

                   maximum = placeOfSquad[`cavallery_quan`] - (transit ? transit[`cavallery_quan`] : 0)
                   squad['cavallery'] = maximum

                   maximum = placeOfSquad[`catapult_quan`] - (transit ? transit[`catapult_quan`] : 0)
                   squad['catapult'] = maximum

                   setTransition(0)
                   setTransition(squad)
                   ev.stopPropagation()
               }}>Выбрать все</button>    
               { checkSeaside(props.store.createGame, currentTarget) && movingSquad[placeOfSquad.place].indexOf(currentTarget) === -1
               ? <span className='redact__price'>2-3 хода <img className='icons' src={'images/icons/port.svg'} alt=""/></span>
               : <span className='redact__price'>1 ход <img className='icons' src={'images/icons/region.svg'} alt=""/></span>}
           </li>
       </ul>
    <button onClick={() => {
                setCurTarget(false)
                setChanger(!changer)
                setTransition({
                    pechot: 0,
                    archer: 0,
                    cavallery: 0,
                    catapult: 0,
                })
            }} className='redact__quit start-game_map-block__squad-quit'>&#215;</button>
    </div>
   )}
    <div hidden={!emptyActions}>
    <EmptyActions text={emptyText} />
    </div>
    { battle.region && <Battle {...battle} /> } 
    </div>
);
}

export default connect(mapStateToProps, { set_colormap, set_capitals, change_game, change_buffs, change_squad, delete_squad, new_squad, transition_squad, change_occuped, change_ai_squad, new_ai_squad, delete_ai_squad })(Map);