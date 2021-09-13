import React, {Component} from 'react';
import Header from "../../elements/Header";
import ProgressBar from "../../elements/ProgressBar";
import Tutorial from "../../elements/Tutorial";
import {connect} from "react-redux";
import {mapStateToProps} from "../../storage/reduxGet";
import LoadingScreen from "react-loading-screen";
import {create_game, change_capital, change_buffs, change_game, change_government, change_area_format} from "../../storage/actions";
import {getColor, getGovernment, getAreaFormat, isVassal} from "../../otherFunctions";
import EmptyActions from "../../elements/EmptyActions";

class PoliticGame extends Component {
    constructor() {
        super();
        this.state = {
            description: 'Во вкладке "Политика" можно посмотреть уровень вашей поддержки среди населения, а также ' +
                         'показатель стабильности политической обстановки в стране.;; Если вы являетесь вассалом, ' +
                         'то у вас будут очень ограниченые дипломатические возможности, также вас могут принудить к вступлению в войны и ' +
                         'сюзерен будет облагать вас данью. Вы можете обрести независимость мирным путем, но, в случае отказа,' +
                         ' вы имеете вариант военного восстания против своего угнетателя. ;;Чем меньше уровень поддержки, ' +
                         'тем больше вероятность государственного переворота, который сместит вас с власти. Если в ' +
                         'вашем государстве установлена республика, то при поддержке менее 50%, вы проиграете ближайшие выборы.;;' +
                         'Показатель стабильности влияет на благосостояние граждан и экономики. При низкой стабильности ' +
                         'высок шанс гражданской войны.;;Столица государства имеет бонус к развитию ' +
                         'экономики и росту населения в размере 10%. Смена столицы приведет к снижению поддержки и стабильности.;;' +
                         'Форма правления напрямую влияет на развитие государства, каждая имеет собственные плюсы и минусы.;;' +
                         'Республика:;' +
                         '- Максимальный рост экономики;' +
                         '- Небольшая потеря боеспособности армии;' +
                         '- Население не одобряет ведение войн;' +
                         '- Риск потерять власть на выборах раз;' +
                         ';' +
                         'Однопартийная диктатура:;' +
                         '- Нельзя проиграть выборы;' +
                         '- Лояльное отношение населения к ведению войн;' +
                         '- Небольшой рост экономики;' +
                         '- Высокая боеготовность армии;' +
                         '- Отрицательная динамика поддержки населения;' +
                         ';' +
                         'Абсолютная монархия:;' +
                         '- Власть нельзя потерять;' +
                         '- Низкий рост экономики;' +
                         '- Лояльное отношение населения к войнам;' +
                         '- Высокая боеготовность армии;' +
                         ';' +
                         'Ограниченная монархия:;' +
                         '- Власть нельзя потерять;' +
                         '- Небольшой рост экономики;' +
                         '- Ведение войн нежелательно;' +
                         '- Нормальная боеготовность армии;;' +
                         'Вы можете отредактировать некоторые детали вашей формы правления.;;' +
                         'Изменение государственного устройства поможет вам выстроить нужную систему власти. ' +
                         'В зависимости от выбранных черт, устройство будет федеративным или унитарным. ' +
                         'Унитарное имеет большую стабильность, но карается меньшими темпами развития экономики.',
            tutorial: false,
            capital: false,
            government: false,
            redactGovernment: false,
            redactCountry: false,
            load: true,
            emptyActions: false,
        }

        this.cityList = this.cityList.bind(this)
        this.getRedactGovernment = this.getRedactGovernment.bind(this)
    }

    componentDidMount() {
        let arr = document.querySelectorAll('img')
        let inc = 0
        arr.forEach(img => img.onload(e => inc++))

        if (arr.length === inc && this.props.store) {
            this.setState({
                load: false
            })
        }
    }

    cityList() {
        let arr = []
        for (let i of this.props.store.createGame.country.regions) {
            if (i.capital !== this.props.store.createGame.country.capital.capital) {
                arr.push(i.capital)
            }
        }
        return arr
    }

    getRedactGovernment() {
        let arr
        let span
        let redactor = -1

        let properties = this.props.store.createGame.country.government.split(',')
        let govern = properties.shift()
        switch (this.props.store.createGame.country.government[0]) {
            case 'M':
                arr = [
                    {['Степень абсолютизма']: ['Полный', 'Частичный']},
                    {['Назначение госслужащих']: ['Монархом', 'Советом']},
                ]
                break;
            case 'O':
                arr = [
                    {['Формирование парламента']: ['Монархом', 'Народом']},
                    {['Назначение госслужащих']: ['Монархом', 'Парламентом']},
                ]
                break;
            case 'D':
                arr = [
                    {['Срок правления']: ['Пожизненный', 'Временный']},
                    {['Оппозиция во власти']: ['Нет', 'Фиктивная']},
                ]
                break;
            case 'R':
                arr = [
                    {['Избирательное право']: ['Общее', 'Только высшие классы']},
                    {['Назначение госслужащих']: ['Парламентом', 'Правителем']}
                ]
                break;
        }
        return arr.map((e) => {
            let value = -1
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
                                           defaultChecked={value == properties[redactor]}
                                           onClick={(e) => {
                                               if ((this.props.store.createGame.buffs.actions - 1 >= 0
                                                   ||
                                                   this.props.store.changeGame.indexOf('governmentChange') !== -1)) {
                                                   properties[e.target.dataset.num] = e.target.value.toString()
                                                   properties.unshift(govern)
                                                   let store = properties.join(',')
                                                   govern = properties.shift()
                                                   let buff = this.props.store.createGame.buffs
                                                   if (this.props.store.changeGame.indexOf('governmentChange') === -1) {
                                                       this.props.change_buffs({
                                                           actions: buff.actions - 1,
                                                           stability: buff.stability - 0.05,
                                                           support: buff.support - 0.05,
                                                       })
                                                       this.props.change_game('governmentChange')
                                                   }
                                                   this.props.change_government(store)
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
                                           className='politic-game__redact__item__values'>{ev}</label>
                                </div>
                            )
                        }
                    )}
                    </div>
                </li> )
        })
    }

    getRedactCountry() {
        let span
        let redactor = -1

        let properties = this.props.store.createGame.country.area_format.split(',')
        let arr = [
            {['Бюджет']: ['Централизованный', 'Децентрализованный']},
            {['Законодательное право субъектов']: ['Свободное', 'Ограниченное', 'Запрещено']},
            {['Силовые структуры в субъектах']: ['Местные', 'Федеральные']},
            {['Назначение власти в субъектах']: ['Правителем', 'Народом']},
        ]
        let arrValues = [
            ['C', 'D'],
            ['S', 'O', 'Z'],
            ['M', 'F'],
            ['N', 'I'],
        ]

        return arr.map((e) => {
            let value = -1
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
                                           value={arrValues[redactor][value]}
                                           defaultChecked={arrValues[redactor][value] === properties[redactor]}
                                           onClick={(e) => {
                                               properties[e.target.dataset.num] = e.target.value.toString()
                                               if (this.props.store.createGame.buffs.actions - 2 >= 0
                                                   ||
                                                   this.props.store.changeGame.indexOf('area_format') !== -1) {
                                                   let store = properties.join(',')
                                                   if (this.props.store.changeGame.indexOf('area_format') === -1) {
                                                       let buff = this.props.store.createGame.buffs
                                                       this.props.change_buffs({
                                                           actions: buff.actions - 2,
                                                           stability: buff.stability - 0.1,
                                                           support: buff.support - 0.05,
                                                       })
                                                       this.props.change_game('area_format')
                                                   }
                                                   this.props.change_area_format(store)
                                               } else {
                                                   e.preventDefault()
                                                   console.log('ee')
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
                                           className='politic-game__redact__item__values'>{ev}</label>
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
                    <Header name={'Политика'} tutorial={() => {
                        this.setState({tutorial: !this.state.tutorial})
                    }} />
                    <div className='politic-game__scroll-block overflowing'>
                        {isVassal(this.props.store.createGame) &&
                        <div className='politic-game__vassal-tittle'>
                            Вы являетесь вассальным государством
                        </div>}
                        <section className='politic-game__sas'>
                            <div className='politic-game__sas-block'>
                                <div className="politic-game__sas-label">
                                    <img className='politic-game__icon-fields' src={`images/icons/support.svg`} alt=""/>
                                    Поддержка:
                                </div>
                                <ProgressBar
                                    style={{marginTop: '0.8em'}}
                                    color={getColor((this.props.store.createGame.country.support * 100).toFixed(2))}
                                    value={(this.props.store.createGame.country.support * 100).toFixed(2)}
                                    text={`${(this.props.store.createGame.country.support * 100).toFixed(2)} %`}
                                />
                            </div>
                            <div className='politic-game__sas-block'>
                                <div className="politic-game__sas-label">
                                    <img className='politic-game__icon-fields' src={`images/icons/stability.svg`} alt=""/>
                                    Стабильность:
                                </div>
                                <ProgressBar
                                    style={{marginTop: '0.8em'}}
                                    color={getColor((this.props.store.createGame.country.stability * 100).toFixed(2))}
                                    value={(this.props.store.createGame.country.stability * 100).toFixed(2)}
                                    text={`${(this.props.store.createGame.country.stability * 100).toFixed(2)} %`}
                                />
                            </div>
                        </section>
                        <section className='politic-game__capital'>
                            <div className='politic-game__capital-block'>
                                <div className='politic-game__capital-label'>
                                    <img className='politic-game__icon-fields' src={`images/icons/capital.svg`} alt=""/>
                                    Столица: <span className='politic-game__capital-value'>{this.props.store.createGame.country.capital.capital}</span>
                                </div>
                                <button onClick={() => {
                                    this.setState({capital: !this.state.capital})
                                }} disabled={this.props.store.createGame.country.regions.length === 1} className='politic-game__capital-change game__button'>Изменить</button>
                                <span style={{marginLeft: '0.5em', color: '#fff'}}><img className='icons' src={'images/icons/action.svg'} alt=""/>2</span>
                            </div>
                        </section>
                        <section className='politic-game__gac'>
                            <div className='politic-game__gac-block'>
                                <div className="politic-game__sas-label">
                                    <img className='politic-game__icon-fields' src={`images/icons/government.svg`} alt=""/>
                                    Форма правления:
                                </div>
                                <div className="politic-game__gac-value">
                                    <span>{getGovernment(this.props.store.createGame.country.government[0])}</span>
                                    <button onClick={() => {
                                        this.setState({government: !this.state.government})
                                    }} className="politic-game__capital-change game__button">Изменить</button>
                                    <span style={{marginLeft: '0.5em', color: '#fff'}}><img className='icons' src={'images/icons/action.svg'} alt=""/>3</span>

                                    <button onClick={() => {
                                        this.setState({redactGovernment: !this.state.redactGovernment})
                                    }} className="politic-game__capital-change game__button">Редактировать</button>
                                    <span style={{marginLeft: '0.5em', color: '#fff'}}><img className='icons' src={'images/icons/action.svg'} alt=""/>1</span>
                                </div>
                            </div>
                            <div className='politic-game__gac-block'>
                                <div className="politic-game__sas-label">
                                    <img className='politic-game__icon-fields' src={`images/icons/country.svg`} alt=""/>
                                    Государственное устройство:
                                </div>
                                <div className="politic-game__gac-value">
                                    <span>{getAreaFormat(this.props.store.createGame.country.area_format)}</span>
                                    <button onClick={() => {
                                        this.setState({redactCountry: !this.state.redactCountry})
                                    }} className="politic-game__capital-change game__button">Редактировать</button>
                                    <span style={{marginLeft: '0.5em', color: '#fff'}}><img className='icons' src={'images/icons/action.svg'} alt=""/>2</span>
                                </div>
                            </div>
                        </section>
                    </div>
                    <Tutorial text={this.state.description} hide={!this.state.tutorial} quit={() => {
                        this.setState({tutorial: !this.state.tutorial})
                    }} />
                    <div className='modal-blur politic-game__capital-list' hidden={!this.state.capital}>
                        <ul className='overflowing'>
                            {this.cityList().map((e) => <li onClick={(ev) => {
                                if (this.props.store.createGame.buffs.actions - 2 >= 0) {
                                    let game = this.props.store.createGame
                                    let newCapital
                                    for (let i of game.country.regions) {
                                        if (i.capital === e) {
                                            newCapital = i
                                        }
                                    }
                                    if (this.props.store.changeGame.indexOf('capital') === -1) {
                                        let buff = this.props.store.createGame.buffs
                                        this.props.change_buffs({
                                            actions: buff.actions - 2,

                                            industry_culture: buff.industry_culture + 0.005,
                                            industry_eating: buff.industry_eating + 0.005,
                                            industry_hiring: buff.industry_hiring + 0.005,
                                            industry_transport: buff.industry_transport + 0.005,
                                            industry_typography: buff.industry_typography + 0.005,

                                            stability: buff.stability - 0.1,
                                            support: buff.support - 0.15,
                                        })
                                        this.props.change_game('capital')
                                    }
                                    this.props.change_capital(newCapital)
                                    this.setState({capital: !this.state.capital})
                                } else {
                                    ev.preventDefault()
                                    console.log('ee')
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
                            }} key={e}>{e}</li>)}
                        </ul>
                        <button onClick={() => {
                            this.setState({capital: !this.state.capital})
                        }} className='politic-game__capital-quit modal-quit' hidden={!this.state.capital}>&#215;</button>
                    </div>
                    <div className='modal-blur politic-game__capital-list' hidden={!this.state.government}>
                        <ul className='overflowing'>
                            {[  ['Абсолютная монархия', 'M'],
                                ['Ограниченная монархия', 'O'],
                                ['Республика', 'R'],
                                ['Однопартийная диктатура', 'D'] ].map((e) =>
                                <li onClick={() => {
                                    if (this.props.store.createGame.buffs.actions - 3 >= 0) {
                                        let game = this.props.store.createGame.country.government
                                        game = `${e[1]},0,0`
                                        if (this.props.store.changeGame.indexOf('government') === -1) {
                                            let buff = this.props.store.createGame.buffs
                                            this.props.change_buffs({
                                                actions: buff.actions - 3,
                                                stability: buff.stability - 0.15,
                                                support: buff.support - 0.1,
                                                unemployment: buff.unemployment - 0.01,
                                            })
                                            this.props.change_game('government')
                                        }
                                        this.props.change_government(game)
                                        this.setState({government: !this.state.government})
                                    } else {
                                        e.preventDefault()
                                        console.log('ee')
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
                                }} key={e[0]}>{e[0]}</li>)}
                        </ul>
                        <button onClick={() => {
                            this.setState({government: !this.state.government})
                        }} className='politic-game__capital-quit modal-quit' hidden={!this.state.government}>&#215;</button>
                    </div>

                    <div className='modal-blur politic-game__redact-list' hidden={!this.state.redactGovernment}>
                        <ul className='overflowing'>
                            {this.getRedactGovernment()}
                        </ul>
                        <button onClick={(e) => {
                            this.setState({redactGovernment: !this.state.redactGovernment})
                        }} className='politic-game__redact-quit modal-quit' hidden={!this.state.redactGovernment}>&#215;</button>
                    </div>
                    <div className='modal-blur politic-game__redact-list' hidden={!this.state.redactCountry}>
                        <ul className='overflowing'>
                            {this.getRedactCountry()}
                        </ul>
                        <button onClick={(e) => {
                            this.setState({redactCountry: !this.state.redactCountry})
                        }} className='politic-game__redact-quit modal-quit' hidden={!this.state.redactCountry}>&#215;</button>
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

export default connect(mapStateToProps, { create_game, change_buffs, change_capital, change_game, change_government, change_area_format })(PoliticGame);