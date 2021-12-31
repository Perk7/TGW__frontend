import React, {Component} from 'react';
import {connect} from "react-redux";
import {mapStateToProps} from "../../storage/reduxGet";
import {Link} from "react-router-dom";
import {deleteCookie} from "../../otherFunctions";
import {change_user, auth} from "../../storage/actions";
import UserService from "../../RequestService";

const userService = new UserService()

class Logout extends Component {

    constructor(props) {
        super(props);

        this.tryLogout = this.tryLogout.bind(this)
    }

    tryLogout() {
        userService.logout()
        this.props.change_user()
        this.props.auth({ login: '', password: '' })
        deleteCookie('login')
        deleteCookie('password')
    }

    render() {
        return (
            <div className='view'>
                <div className='logout__dark-view'>
                    <div className='logout__popup-view'>
                        <div className='logout__popup-view__heading'>Вы уверены, что хотите выйти из аккаунта?</div>
                        <div className='logout__popup-view__btn-block'>
                           <Link className='popup-view__btn-block__btn popup-view__btn-block__btn_left' to={'/home'} onClick={(event) => {
                               this.tryLogout()
                           }}>
                               ДА
                           </Link>
                           <Link className='popup-view__btn-block__btn popup-view__btn-block__btn_right' to={'/home'}>НЕТ</Link>
                        </div>
                    </div>
                </div>
            </div>
            );
    }
}

export default connect(mapStateToProps, { change_user, auth })(Logout);