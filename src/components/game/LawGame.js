import React, {Component} from 'react';
import LoadingScreen from "react-loading-screen";
import {connect} from "react-redux";
import {mapStateToProps} from "../../storage/reduxGet";
import {change_game, change_buffs, change_laws} from "../../storage/actions";
import Tutorial from "../../elements/Tutorial";
import lawBuffs from '../../step_system/lawBuffs';
import EmptyActions from "../../elements/EmptyActions";
import Header from "../../elements/Header";
import ValueBar from "../../elements/ValueBar";

class LawGame extends Component {

    constructor() {
        super();
        this.state = {
            load: true,
            tutorial: false,
            description: 'Во вкладке "Юстиция" можно мониторить и регулировать правовую сферу государства.' +
                         'Любая корректировка законов приведет к изменениям поддержки и политической стабильности, ' +
                         'а также может повлиять на экономику.;;' +
                         'Страны со схожими законами имеют хорошие дипломатические отношения и наоборот.',
            changer: false,
            emptyActions: false,
        }

        this.getLawList = this.getLawList.bind(this)
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

    getLawList() {
        let list = {
            law_equal_rights : {
                has: 'Классы общества равноправны',
                no: 'Классы общества неравноправны',

            },
            law_torture : {
                has: 'Пытки разрешены',
                no: 'Пытки запрещены',

            },
            law_speech : {
                has: 'Свобода слова',
                no: 'Запрет свободы слова',

            },
            law_demonstration : {
                has: 'Свобода демонстраций',
                no: 'Запрет свободы демонстраций',

            },
            law_property : {
                has: 'Всеобщее право собственности',
                no: 'Ограниченное право собственности',

            },
            law_creation : {
                has: 'Свобода творчества',
                no: 'Запрет свободы творчества',

            },
            law_rasism : {
                has: 'Расизм разрешен',
                no: 'Расизм запрещен',

            },
            law_heritage : {
                has: 'Всеобщее право наследования',
                no: 'Ограниченное право наследования',

            },
            law_slavery : {
                has: 'Рабство разрешено',
                no: 'Рабство запрещено',

            },
            law_court : {
                has: 'Всеобщее право на суд',
                no: 'Ограниченное право на суд',

            },
            law_child_labour : {
                has: 'Детский труд разрешен',
                no: 'Детский труд запрещен',

            },
            law_monopoly : {
                has: 'Монополии разрешены',
                no: 'Монополии запрещены',

            },
            law_free_enterspire : {
                has: 'Свобода предпринимательства',
                no: 'Запрет свободы предпринимательства',

            },
            law_work_day_limit : {
                has: 'Ограниченный рабочий день',
                no: 'Неограниченный рабочий день',

            },
            law_death_penalty : {
                has: 'Смертная казнь разрешена',
                no: 'Смертная казнь запрещена',

            },
        }

        return Object.keys(list).map((e) =>
            <li key={e} className='law-game__list__item'>
                {this.props.store.createGame.country[e]
                    ? <span>{list[e].has}</span>
                    : <span>{list[e].no}</span>}
                <button data-type={e} onClick={(ev) => {
                    let buff = this.props.store.createGame.buffs
                    if (this.props.store.changeGame.indexOf('laws') === -1 && buff.actions - 2 >= 0) {
                        this.props.change_game('laws')
                        this.props.change_buffs({
                            actions: buff.actions - 2,
                        })
                        this.props.change_buffs(lawBuffs(buff, this.props.store.createGame.country[e])[e])
                        this.props.change_laws(e)
                        this.setState({
                            changer: !this.state.changer
                        })
                    } else if (this.props.store.changeGame.indexOf('laws') !== -1) {
                        this.props.change_buffs(lawBuffs(buff, this.props.store.createGame.country[e])[e])
                        this.props.change_laws(e)
                        this.setState({
                            changer: !this.state.changer
                        })
                    } else {
                        ev.preventDefault()
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
                }}>Изменить</button>
            </li>
            )
        }

    getIdeology() {
        let list = {
            law_equal_rights : true,
            law_torture : false,
            law_speech : true,
            law_demonstration : true,
            law_property : true,
            law_creation : true,
            law_rasism : false,
            law_heritage : true,
            law_slavery : false,
            law_court : true,
            law_child_labour : false,
            law_monopoly : false,
            law_free_enterspire : true,
            law_work_day_limit : true,
            law_death_penalty : false,
        }

        let sum = 0

        for (let e of Object.keys(list)) {
            if (list[e] === this.props.store.createGame.country[e]) {
                sum = sum + 6.33
            }
        }

        return sum
    }

    render() {
        if (!this.state.load) {
            return (
                <div className='game__view'>
                    <Header name={'Юстиция'} tutorial={() => {
                        this.setState({tutorial: !this.state.tutorial})
                    }} />
                    <div className='law-game__grid'>
                        <div className='law-game__block'>
                            <h3 className='law-game__heading'>
                                <img className='icons' src={'images/icons/laws.svg'} alt=""/>
                                Законы:
                                <span style={{marginLeft: '0.5em', fontSize: '0.9em', color: '#fff'}}><img className='icons' src={'images/icons/action.svg'} alt=""/>2</span>
                            </h3>
                            <ul className='law-game__list overflowing'>
                                {this.getLawList()}
                            </ul>
                        </div>
                        <div className='law-game__block'>
                            <div className="law-game__ideology__label law-game__heading">
                                <img className='icons' src={`images/icons/ideology.svg`} alt=""/>
                                Идеология:
                            </div>
                            <span className='law-game__ideology__span'>Лево</span>
                            <ValueBar value={this.getIdeology()} color={'var(--progress)'} />
                            <span className='law-game__ideology__span'>Право</span>
                        </div>
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

export default connect(mapStateToProps, { change_game, change_buffs, change_laws })(LawGame);