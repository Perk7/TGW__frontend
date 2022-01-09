import React from 'react';
import { Link } from "react-router-dom";

import UserService from "../../RequestService";

import {mapStateToProps} from "../../storage/reduxGet";
import { connect } from "react-redux";
import {change_user, auth} from "../../storage/actions";

import '../../static/css/styles.css';

const userService = new UserService()

class MainMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        registr: (<Link className='main-scroll-view__btn main-scroll-view__btn_last' key='registration' to={'/registration'}>РЕГИСТРАЦИЯ</Link>),
    }

    this.checklog = this.checklog.bind(this)
  }

  checklog() {
    if (!this.props.store.user) {
        return <Link className='main-scroll-view__btn' key='login' to={'/login'}>ВОЙТИ</Link>
    } else {
        return <Link className='main-scroll-view__btn' key='login' to={'/logout'}>ВЫЙТИ</Link>
    }
  }

  tryLogin(login, password) {
          const user = {
              login: login,
              password: password
          }
          userService.login(user)
              .then(() => {
                    this.props.change_user()
                    this.props.auth(user)
              });
   }

   componentDidMount() {
       const login = localStorage.getItem('login') ?? null
       const password = localStorage.getItem('password') ?? null

       if (!this.props.store.user & login & password) {
           this.tryLogin(login, password)
       }
   }

    render() {
      const classes = this.props.store.user
          ? 'main-scroll-view__btn main-scroll-view__btn_last'
          : 'main-scroll-view__btn main-scroll-view__btn_last main-scroll-view__btn_disabled'
      const links = [
        (<Link className={classes} key='new_game' to={'/new_game'}>КАМПАНИЯ</Link>),
        (<Link className={classes} key='load' to={'/load'}>ЗАГРУЗИТЬ ИГРУ</Link>)
      ]
      this.props.store.user
        ? links.push(this.state.registr)
        : links.unshift(this.state.registr)
      links.unshift(this.checklog())

      return (
        <div className='view'>    
              <h1 className='main-heading'>The Great War</h1>
              <nav className='main-scroll-view'>
                {links.map(el => el)}
              </nav>
        </div>
      )  
  }
}

export default connect(mapStateToProps, { change_user, auth })(MainMenu);