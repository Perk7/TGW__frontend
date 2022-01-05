import './App.css';
import React, { Component } from 'react';

import LoadGame from './components/menu/LoadGame.js';
import MainMenu from './components/menu/MainMenu.js';
import NewGame from './components/menu/NewGame.js';
import Login from './components/menu/Login.js';
import Logout from './components/menu/Logout.js';
import Registration from "./components/menu/Registration";

import {
    Route,
    Switch,
    Redirect,
  } from "react-router-dom"

import StartGame from "./components/game/StartGame";

import CountryGame from './components/game/CountryGame';
import PoliticGame from "./components/game/PoliticGame";
import ArmyGame from "./components/game/ArmyGame";
import EconomyGame from "./components/game/EconomyGame";
import DiplomacyGame from "./components/game/DiplomacyGame";
import LawGame from "./components/game/LawGame";
import SocialGame from "./components/game/SocialGame";
import TransportGame from "./components/game/TransportGame";
import ScienceGame from "./components/game/ScienceGame";
import EducationGame from "./components/game/EducationGame";

class App extends Component {
    render() {
      const { history } = this.props

      return (
        <div className="App">
            <Switch>
              <Route history={history} path='/home' component={MainMenu} />
              <Route history={history} path='/load' component={LoadGame} />
              <Route history={history} path='/new_game' component={NewGame} />
              <Route history={history} path='/login' component={Login} />
              <Route history={history} path='/logout' component={Logout} />
              <Route history={history} path='/registration' component={Registration} />

              <Route history={history} path='/start_game' component={StartGame} />
              
              <Route history={history} path='/country' component={CountryGame} />
              <Route history={history} path='/politic' component={PoliticGame} />
              <Route history={history} path='/army' component={ArmyGame} />
              <Route history={history} path='/economy' component={EconomyGame} />
              <Route history={history} path='/diplomacy' component={DiplomacyGame} />
              <Route history={history} path='/law' component={LawGame} />
              <Route history={history} path='/social' component={SocialGame} />
              <Route history={history} path='/transport' component={TransportGame} />
              <Route history={history} path='/science' component={ScienceGame} />
              <Route history={history} path='/education' component={EducationGame} />

              <Redirect from='/' to='/home' />
            </Switch>
        </div>
      );
    }
  }

export default App;