import React from 'react';
import { Link } from "react-router-dom";

import {connect} from "react-redux";
import {mapStateToProps} from "../../storage/reduxGet";
import {create_game} from "../../storage/actions";

import LoadingWrap from '../../elements/build/LoadingWrap';
import MenuHeader from '../../elements/build/MenuHeader';

import { deleteGame, getAllSaves, loadGame } from '../../store/HandlerDB';

class LoadGame extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        saves: [],

        load: true,
        loadHeader: 'Loading',
        modal: false,

        currentSave: null,
    }

    this.redir = React.createRef();
    
    this.loadSaves = this.loadSaves.bind(this)
    this.deleteSave = this.deleteSave.bind(this)
    this.handlerBadRequest = this.handlerBadRequest.bind(this)
  }

  handlerBadRequest() {
    console.error('There was an error!');
    this.setState({ 
        loadHeader: 'Произошла ошибка',
        load: true,
    });
    setTimeout(() => {
        this.setState({ 
            loadHeader: 'Loading',
            load: false,
        });
    }, 2000)
  }

  loadSaves() {
      getAllSaves(true)
        .then(saves => {
            this.setState({
                saves: saves,
                load: false
            })
        })
        .catch(this.handlerBadRequest);
  }

  startSave(country, time) {
        this.setState({
            load: true,
            loadHeader: 'Загрузка игровых данных'
        })
        loadGame(country, time)
            .then(result => {
                    this.props.create_game(result)
                    this.redir.current.click()
                })
            .catch(this.handlerBadRequest);
  }

  deleteSave() {
        if (!this.state.currentSave) {
          return false
        }
        deleteGame(this.state.currentSave[0], this.state.currentSave[1])
          .then(this.loadSaves)
          .catch(this.handlerBadRequest);
  }

  handleDeleteSave() {
        this.deleteSave()
        this.setState({
            modal: false,
        })
  }

  changeModalVisible(save) {
    this.setState({
        modal: !this.state.modal,
        currentSave: save ?? this.state.currentSave ?? null
    })
  }

  componentDidMount() {
        this.loadSaves()
  }

  render() {
    let savesList = this.state.saves.length > 0
        ? (<ul>
            {this.state.saves.map(item => {
                let [country, time] = item.split('_')

                return (<li key={time}>
                            <div key={time} className='load-scroll-view__btn button' onClick={this.startSave.bind(this, country, time)}>
                                {country}
                                <span className='load-scroll-view__btn_time'>
                                    {time}
                                </span>
                            </div>
                            <div className='load-scroll-view__delete' onClick={this.changeModalVisible.bind(this, [country, time])}>а</div>
                        </li>)
            })}
          </ul>)
        : (<div style={{border: '2px solid #FFF', padding: '5vh 5vw', marginTop: '10vh', color: '#FFF', fontSize: '3vw'}}>У вас нет сохраненных игр</div>)
        
    return (
        <LoadingWrap
            loading={this.state.load}
            text={this.state.loadHeader} >
            <div className='view'>
                <MenuHeader header='Загрузить игру' />

                <nav className='load-scroll-view overflowing'>
                 {savesList}
                </nav>

                <div style={{display: this.state.modal?'block':'none',}} className='load__modal-view'>
                    <div className='logout__popup-view__heading'>Вы уверены, что хотите удалить сохранение?</div>
                    <div className='logout__popup-view__btn-block'>
                        <button className='popup-view__btn-block__btn popup-view__btn-block__btn_left' onClick={this.handleDeleteSave.bind(this)}>
                            ДА
                        </button>
                        <button className='popup-view__btn-block__btn popup-view__btn-block__btn_right' onClick={this.changeModalVisible.bind(this, null)}>
                            НЕТ
                        </button>
                    </div>
                </div>
                <Link ref={this.redir} hidden to={'/start_game'}>НАЧАТЬ ИГРУ</Link>
            </div>
        </LoadingWrap>
    )
  }
}

export default connect(mapStateToProps, { create_game })(LoadGame);