import React from 'react'
import { Link } from "react-router-dom"
import {connect} from "react-redux";
import {mapStateToProps} from "../../storage/reduxGet";
import UserService from "../../RequestService";
import LoadingScreen from "react-loading-screen";
import {create_game} from "../../storage/actions";

const userService = new UserService()

class LoadGame extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        saves: [],
        load: true,
        modal: false,
        time: '',
        loadLogger: false,
    }

    this.loadSaves = this.loadSaves.bind(this)
    this.deleteSave = this.deleteSave.bind(this)
    this.startSave = this.startSave.bind(this)

    this.redir = React.createRef();
  }

  loadSaves() {
      const user = {
          login: this.props.store.auth.login,
          password: this.props.store.auth.password
      }
      userService.savedGames(user)
          .then(res => res.data)
          .then(
              (result) => {
                  let par = JSON.parse(result);
                  if (par.saves !== 'error') {
                      this.setState({
                          saves: par,
                          load: false
                      })
                  }
          })
          .catch((result) => {
              console.log('There was an error! Please re-check your form.');
          });
  }

  startSave(time) {
        const data = {
            user: this.props.store.auth.login,
            time: time,
        }
        this.setState({
            load: true,
            loadLogger: true
        })
        userService.loadGame(data)
            .then(res => res.data)
            .then(
                (result) => {
                    let par = JSON.parse(result);
                    this.props.create_game(par)
                    this.redir.current.click()
                })
            .catch((result) => {
                console.log('There was an error! Please re-check your form: ', result);
            });
  }

  deleteSave() {
      userService.deleteSave({
          time: this.state.time,
          user: this.props.store.auth.login,
      })
          .then(res => res.data)
          .then(
              (result) => {
                  let par = JSON.parse(result);
                  if (par.saves !== 'error') {
                      this.setState({
                          saves: par,
                          load: false,
                      })
                  }
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
    return (
        <LoadingScreen
            loading={this.state.load}
            bgColor='#000'
            spinnerColor='#FFF'
            textColor='#FFF'
            text={this.state.loadLogger?'Загрузка игровых данных':'Loading...'} >
            <div className='view'>
                <header className='side-header'>
                  <Link to={'/home'} className='header__btn_back'>←</Link>
                  <h1 className='side-heading'>Загрузить игру</h1>
                </header>
                <nav className='load-scroll-view'>
                    <ul>
                    {this.state.saves.length > 0
                        ? this.state.saves.map((item) => {
                            return <li key={item.fields.save_date}><div key={item.fields.save_date} className='load-scroll-view__btn' onClick={() => {
                                    this.startSave(item.fields.save_date)
                                 }}>{item.fields.save_name}<span
                            className='load-scroll-view__btn_time'>{item.fields.save_date.substr(0,10)} {item.fields.save_date.substr(11,8)}</span>
                            </div>
                            <div className='load-scroll-view__delete' onClick={() => {
                                    this.setState({
                                        modal: true,
                                        time: item.fields.save_date
                                    })
                            }}>а </div></li>
                        })
                        : <div style={{border: '2px solid #FFF', padding: '5vh 5vw', marginTop: '10vh', color: '#FFF', fontSize: '3vw'}}>У вас нет сохраненных игр</div>
                    }
                    </ul>
                </nav>
                <div style={{display: this.state.modal?'block':'none',}} className='load__modal-view'>
                    <div className='logout__popup-view__heading'>Вы уверены, что хотите удалить сохранение?</div>
                    <div className='logout__popup-view__btn-block'>
                        <button className='popup-view__btn-block__btn popup-view__btn-block__btn_left' onClick={(event) => {
                            this.deleteSave()
                            this.setState({
                                modal: false,
                            })
                        }}>
                            ДА
                        </button>
                        <button className='popup-view__btn-block__btn popup-view__btn-block__btn_right' onClick={() => {
                            this.setState({
                                modal: false,
                            })
                        }}>НЕТ</button>
                    </div>
                </div>
                <Link ref={this.redir} hidden to={'/start_game'}>НАЧАТЬ ИГРУ</Link>
            </div>
        </LoadingScreen>
    )
  }
}

export default connect(mapStateToProps, { create_game })(LoadGame);