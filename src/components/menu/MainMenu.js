import React from 'react'
import { Link } from "react-router-dom"
import '../../static/css/styles.css'
import {getCookie} from "../../otherFunctions";
import { connect } from "react-redux";
import {mapStateToProps} from "../../storage/reduxGet";
import UserService from "../../RequestService";
import {change_user, auth} from "../../storage/actions";

const userService = new UserService()

class MainMenu extends React.Component {

  constructor(props) {
    super(props);

    this.checklog = this.checklog.bind(this)
  }

  checklog() {
    if (!this.props.store.user) {
        return <Link className='main-scroll-view__btn ' to={'/login'}>ВОЙТИ</Link>
    } else {
        return <Link className='main-scroll-view__btn ' to={'/logout'}>ВЫЙТИ</Link>
    }
  }

  tryLogin(login, password) {
          const user = {
              login: login,
              password: password
          }
          userService.login(user)
              .then((result) => {
                  let par = JSON.parse(result.data);
                  if (par.status === 'success') {
                      this.props.change_user()
                      this.props.auth(user)
                  }
              })
              .catch((result) => {
                  console.log('There was an error! Please re-check your form.');
              });
   }

   componentDidMount() {
       const login = setTimeout(getCookie,2000,'login')
       const password = getCookie('password')

       if (!this.props.store.user) {
           this.tryLogin(login, password)
       }
   }



    render() {
      const log = this.checklog()
      const classes = this.props.store.user
          ? 'main-scroll-view__btn main-scroll-view__btn_last'
          : 'main-scroll-view__btn main-scroll-view__btn_last main-scroll-view__btn_disabled'
      return (
        <div className='view'>    
              <h1 className='main-heading'>The Great War</h1>
              <nav className='main-scroll-view'>
                {log}
                { !this.props.store.user
                    ? <Link className='main-scroll-view__btn main-scroll-view__btn_last' to={'/registration'}>РЕГИСТРАЦИЯ</Link>
                    : null
                }
                <Link className={classes} to={'/new_game'}>КАМПАНИЯ</Link>
                <Link className={classes} to={'/load'}>ЗАГРУЗИТЬ ИГРУ</Link>
                { this.props.store.user
                    ? <Link className='main-scroll-view__btn main-scroll-view__btn_last' to={'/registration'}>РЕГИСТРАЦИЯ</Link>
                    : null
                }
              </nav>
        </div>
      )  
  }
}

export default connect(mapStateToProps, { change_user, auth })(MainMenu);