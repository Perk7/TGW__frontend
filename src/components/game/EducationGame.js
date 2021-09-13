import React, {Component} from 'react';
import LoadingScreen from "react-loading-screen";
import {connect} from "react-redux";
import {mapStateToProps} from "../../storage/reduxGet";
import {create_game, change_buffs, change_game} from "../../storage/actions";
import Tutorial from "../../elements/Tutorial";
import {getPopulation, getSchools, getUniversities} from "../../otherFunctions";
import EmptyActions from "../../elements/EmptyActions";
import Header from "../../elements/Header";
import ValueBar from "../../elements/ValueBar";

class EducationGame extends Component {

    constructor() {
        super();
        this.state = {
            load: true,
            tutorial: false,
            description: 'Образование первостепенно влияет на производство ресурсов сферы услуг, а также на рост промышленности,' +
                         ' поскольку эти отрасли зависят от качества кадров.;;Высокий уровень образования, безусловно, повысит социальный уровень' +
                         'населения, но стоит быть с этим осторожным, поскольку образованный народ гораздо труднее обмануть и контролировать, ' +
                         'что может привести к государственному перевороту при низкой политической стабильности.',
            redactor: false,

            changer: false,
            emptyActions: false,
            emptyHeader: ''
        }

        this.increaseQuan = this.increaseQuan.bind(this)
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

    increaseQuan(ev) {
        if (ev.target.nodeName !== 'BUTTON') {
            return
        }
        const prices = {
            schools: 1000000,
            universtites: 25000000,
        }
        const price = prices[ev.target.dataset.target]
        let buff = this.props.store.createGame.buffs
        if (parseInt(price) <= buff.kazna) {
            if (this.props.store.changeGame.indexOf(ev.target.dataset.target) === -1 && buff.actions - 1 >= 0) {
                this.props.change_game(ev.target.dataset.target)
                this.props.change_buffs({
                    actions: buff.actions - 1,
                })
                this.props.change_buffs({
                    [ev.target.dataset.target]: buff[ev.target.dataset.target] + 1,

                    kazna: buff.kazna - parseInt(price)
                })
                this.setState({
                    changer: !this.state.changer
                })
                ev.target.style = 'border: 2px solid var(--selected-light)'
                setTimeout(() => { ev.target.style = '' }, 2000)
            } else if (this.props.store.changeGame.indexOf(ev.target.dataset.target) !== -1) {
                this.props.change_buffs({
                    [ev.target.dataset.target]: buff[ev.target.dataset.target] + 1,

                    kazna: buff.kazna - parseInt(price)
                })
                this.setState({
                    changer: !this.state.changer
                })
                ev.target.style = 'border: 2px solid var(--selected-light)'
                setTimeout(() => { ev.target.style = '' }, 2000)
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
    }

    checkUnivDisable() {
        return parseInt(getPopulation(this.props.store.createGame.country, false) * 0.05 / 2000) - getUniversities(this.props.store.createGame.country) > 0
    }
    checkSchoolDisable() {
        return parseInt(getPopulation(this.props.store.createGame.country, false) * 0.2 / 700) - getSchools(this.props.store.createGame.country) > 0
    }

    render() {
        if (!this.state.load) {
            return (
                <div className='game__view'>
                    <Header name={'Образование'} tutorial={() => {
                        this.setState({tutorial: !this.state.tutorial})
                    }} />
                    <div className='politic-game__scroll-block overflowing'>
                        <div className='education-game__heading'>
                            <div className='education-game__heading__block'>
                                 <span>
                                     <img className='icons' src={`images/icons/education_quality.svg`} alt=""/>
                                     Качество образования:
                                 </span>
                                <ValueBar
                                    style={{width: '40%', fontSize: '0.8em'}}
                                    value={(this.props.store.createGame.country.education_quality*98).toFixed(1)}
                                    color={'var(--progress)'}
                                />
                            </div>
                            <div className='education-game__heading__block'>
                                 <span>
                                     <img className='icons' src={`images/icons/education_acces.svg`} alt=""/>
                                     Доступность образования:
                                 </span>
                                <ValueBar
                                    style={{width: '40%', fontSize: '0.8em'}}
                                    value={(this.props.store.createGame.country.education_avail*98).toFixed(1)}
                                    color={'var(--progress)'}
                                />
                            </div>
                        </div>
                        <div onClick={ev => this.increaseQuan(ev)} className='education-game__heading'>
                            <div className='education-game__redact__block'>
                                <span>
                                    <img className='icons' src={`images/icons/school.svg`} alt=""/>
                                    Школы:
                                </span>
                                <div className='education-game__redact__value'>
                                    <span>{getSchools(this.props.store.createGame.country)} шт.</span>
                                    <button disabled={!this.checkSchoolDisable()} className='redact__controls' data-target='schools'>+</button>
                                    <span>
                                        <span className='education-game__redact__increase'>{this.props.store.createGame.buffs.schools
                                            ? `+${this.props.store.createGame.buffs.schools}` 
                                            : ''}
                                        </span>
                                        <span style={{fontSize: '2vw', color: '#fff', marginRight: '2vw'}}><img className='icons' src={'images/icons/action.svg'} alt=""/>1</span>
                                        (1 Школа = 1 000 000 <img className='icons_mini' src={`images/icons/coin.svg`} alt=""/>)
                                    </span>
                                </div>
                            </div>
                            <div className='education-game__redact__block'>
                                <span>
                                    <img className='icons' src={`images/icons/university.svg`} alt=""/>
                                    Вузы:
                                </span>
                                <div className='education-game__redact__value'>
                                    <span>{getUniversities(this.props.store.createGame.country)} шт.</span>
                                    <button disabled={!this.checkUnivDisable()} className='redact__controls' data-target='universtites'>+</button>
                                    <span>
                                        <span className='education-game__redact__increase'>{this.props.store.createGame.buffs.universtites
                                            ? `+${this.props.store.createGame.buffs.universtites}` 
                                            : ''}
                                        </span>
                                        <span style={{fontSize: '2vw', color: '#fff', marginRight: '2vw'}}><img className='icons' src={'images/icons/action.svg'} alt=""/>1</span>
                                        (1 Вуз = 25 000 000 <img className='icons_mini' src={`images/icons/coin.svg`} alt=""/>)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Tutorial text={this.state.description} hide={!this.state.tutorial} quit={() => {
                        this.setState({tutorial: !this.state.tutorial})
                    }} />
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

export default connect(mapStateToProps, { create_game, change_buffs, change_game })(EducationGame);