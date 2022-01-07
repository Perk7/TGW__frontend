import React from 'react';
import { Link } from "react-router-dom";

import {connect} from "react-redux";
import {mapStateToProps} from "../../storage/reduxGet";
import {create_game} from "../../storage/actions";

import UserService from "../../RequestService";

import LoadingWrap from '../../elements/build/LoadingWrap';
import MenuHeader from '../../elements/MenuHeader';

const userService = new UserService();

class LoadGame extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        saves: [],
        load: true,
        modal: false,
        time: '',
        loadHeader: 'Loading'
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
      const user = {
          login: this.props.store.auth.login,
          password: this.props.store.auth.password
      }
      userService.savedGames(user)
          .then(res => res.data)
          .then(
              result => {
                  let parsed = JSON.parse(result);
                  if (parsed.saves !== 'error') {
                      this.setState({
                          saves: parsed,
                          load: false
                      })
                  }
                }
          )
          .catch(this.handlerBadRequest);
  }

  startSave(time) {
        const data = {
            login: this.props.store.auth.login,
            time: time,
        }
        this.setState({
            load: true,
            loadHeader: 'Загрузка игровых данных'
        })
        userService.loadGame(data)
            .then(res => res.data)
            .then(
                result => {
                    let parsed = JSON.parse(result);
                    this.props.create_game(parsed)
                    this.redir.current.click()
                })
            .catch(this.handlerBadRequest);
  }

  deleteSave() {
      userService.deleteSave({
          time: this.state.time,
          login: this.props.store.auth.login,
      })
          .then(res => res.data)
          .then(
              result => {
                  let parsed = JSON.parse(result);
                  if (parsed.saves !== 'error') {
                      this.setState({
                          saves: parsed,
                          load: false,
                      })
                  }
          })
          .catch(this.handlerBadRequest);
  }

  handleDeleteSave() {
        this.deleteSave()
        this.setState({
            modal: false,
        })
  }

  changeModalVisible(time) {
    this.setState({
        modal: !this.state.modal,
        time: time === undefined ? this.state.time : time
    })
  }

  componentDidMount() {
        if (this.props.store.user) {
            this.loadSaves()
        } else {
            setTimeout(this.loadSaves, 2000)
        }
  }

  render() {
    let savesList = this.state.saves.length > 0
        ? (<ul>
            {this.state.saves.map(item => {
                return (<li key={item.fields.save_date}>
                            <div key={item.fields.save_date} className='load-scroll-view__btn' onClick={this.startSave.bind(this, item.fields.save_date)}>
                                {item.fields.save_name}
                                <span className='load-scroll-view__btn_time'>
                                    {item.fields.save_date.substr(0,10)} {item.fields.save_date.substr(11,8)}
                                </span>
                            </div>
                            <div className='load-scroll-view__delete' onClick={this.changeModalVisible.bind(this, item.fields.save_date)}>а</div>
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

                <nav className='load-scroll-view'>
                 {savesList}
                </nav>

                <div style={{display: this.state.modal?'block':'none',}} className='load__modal-view'>
                    <div className='logout__popup-view__heading'>Вы уверены, что хотите удалить сохранение?</div>
                    <div className='logout__popup-view__btn-block'>
                        <button className='popup-view__btn-block__btn popup-view__btn-block__btn_left' onClick={this.handleDeleteSave.bind(this)}>
                            ДА
                        </button>
                        <button className='popup-view__btn-block__btn popup-view__btn-block__btn_right' onClick={this.changeModalVisible.bind(this)}>
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