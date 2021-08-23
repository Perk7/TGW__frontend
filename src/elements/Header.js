import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {mapStateToProps} from "../storage/reduxGet";

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className='game__header'>
                <div className='game__header__name'>{this.props.name}</div>
                <div className='game__header__info politic-game__header__time'>
                    {this.props.store.createGame.buffs.actions} <img className='icons' src={'images/icons/action.svg'} alt=""/>
                    {this.props.store.createGame.buffs.kazna.toLocaleString() + ' '} <img className='icons' src={'images/icons/coin.svg'} alt=""/>
                </div>
                <Link to={'/start_game'} className='game__header__quit'>&#215;</Link>
                <button onClick={this.props.tutorial} className='game__header__tutorial'>?</button>
            </header>
        );
    }
}

export default connect(mapStateToProps, {} )(Header);