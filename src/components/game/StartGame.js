import React, { Component } from "react";
import Map from "../../elements/Map";
import LoadingScreen from "react-loading-screen";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { mapStateToProps } from "../../storage/reduxGet";
import {
  create_game,
  set_capitals,
  set_colormap,
  change_game,
  transition_clear,
  clear_peace,
  change_buffs,
} from "../../storage/actions";
import UserService from "../../CustomersService";
import nextStep from "../../NextStep";
import { getDate } from "../../otherFunctions";

const userService = new UserService();

class StartGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      load: true,
      saver: false,
      saverRes: "",
      quiter: false,

      changer: false,

      nextStepText: "",
    };

    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    let arr = document.querySelectorAll("img");
    let inc = 0;
    arr.forEach((img) => img.onload((e) => inc++));

    if (arr.length === inc && this.props.store) {
      this.setState({
        load: false,
      });
    }
  }

  render() {
    if (this.state.load) {
      return (
        <LoadingScreen
          loading={this.state.load}
          bgColor="#000"
          spinnerColor="#FFF"
          textColor="#FFF"
          text={this.state.nextStepText || "Загрузка игровых данных"}
        >
          children
        </LoadingScreen>
      );
    }
    const store = this.props.store.createGame;
    return (
      <LoadingScreen
        loading={this.state.load}
        bgClior="#000"
        spinnerClior="#FFF"
        textClior="#FFF"
        text="Loading..."
      >
        <div className="start-game__view">
          <section className="start-game_map-block">
            <Map
              rend={() => {
                this.setState({
                  changer: !this.state.changer,
                });
              }}
            />
          </section>
          <nav className="start-game__navbar">
            <div className="start-game__navbar__country">
              <h3 className="start-game__navbar__country__header">
                <span>
                  {store.buffs.actions}{" "}
                  <img
                    className="icons_mini"
                    src={"images/icons/action.svg"}
                    alt=""
                  />
                </span>
                <span>ХОД {store.buffs.step}</span>
              </h3>
              <div>
                <Link
                  to={"/country"}
                  className="start-game__navbar__country__link"
                >
                  <img
                    src={`flags/${store.country.identify}.svg`}
                    alt={""}
                    className="start-game__navbar__country__link__flag"
                  />
                </Link>
                <button
                  onClick={(e) => {
                    this.setState({ load: true });
                    userService
                      .saveGame({
                        store: this.props.store.createGame,
                        auth: this.props.store.auth.login,
                      })
                      .then((res) => res.data)
                      .then((data) => {
                        let game = JSON.parse(data);
                        this.props.create_game(game);
                        this.setState({
                          load: false,
                          saver: !this.state.saver,
                          saverRes: "Игра сохранена",
                        });
                      })
                      .catch((result) => {
                        this.setState({
                          load: false,
                          saver: !this.state.saver,
                          saverRes: "Произошла ошибка",
                        });
                      });
                  }}
                  className="start-game__navbar__country__save"
                >
                  <img
                    className="start-game__navbar__country__save__img"
                    src={`images/save-btn.svg`}
                    alt=" "
                  />
                </button>
                <button
                  onClick={(e) => {
                    this.setState({ quiter: !this.state.quiter });
                  }}
                  className="start-game__navbar__country__save"
                >
                  <img
                    className="start-game__navbar__country__save__img"
                    src={`images/quit-btn.svg`}
                    alt=" "
                  />
                </button>
              </div>
            </div>
            <ul className="start-game__navbar__list overflowing">
              <li>
                <Link to={"/politic"} className="start-game__navbar__link">
                  Политика
                </Link>
              </li>
              <li>
                <Link to={"/army"} className="start-game__navbar__link">
                  Армия
                </Link>
              </li>
              <li>
                <Link to={"/economy"} className="start-game__navbar__link">
                  Экономика
                </Link>
              </li>
              <li>
                <Link to={"/diplomacy"} className="start-game__navbar__link">
                  Дипломатия
                </Link>
              </li>
              <li>
                <Link to={"/law"} className="start-game__navbar__link">
                  Юстиция
                </Link>
              </li>
              <li>
                <Link to={"/social"} className="start-game__navbar__link">
                  Соц. развитие
                </Link>
              </li>
              <li>
                <Link to={"/transport"} className="start-game__navbar__link">
                  Инфраструктура
                </Link>
              </li>
              <li>
                <Link to={"/science"} className="start-game__navbar__link">
                  Наука
                </Link>
              </li>
              <li>
                <Link to={"/education"} className="start-game__navbar__link">
                  Образование
                </Link>
              </li>
            </ul>
            <button
              onClick={() => {
                this.setState({
                  load: true,
                  nextStepText: getDate({
                    buffs: { step: this.props.store.createGame.buffs.step + 1 },
                  }),
                });
                setTimeout(() => {
                  nextStep(this.props.store, {
                    change_buffs: this.props.change_buffs,
                    create_game: this.props.create_game,
                    change_game: this.props.change_game,
                    clear_peace: this.props.clear_peace,
                  }).then((val) => {
                    this.setState({ load: false, nextStepText: `` });
                  });
                }, 2000);
              }}
              className="start-game__navbar__next-btn"
            >
              Следующий ход →
            </button>
          </nav>
        </div>
        <div
          style={{
            zIndex: 2000,
          }}
          className="modal-blur"
          hidden={!this.state.saver}
        >
          <div className="start-game__redact-list">
            <h3 className="start-game__redact-list__heading">
              {this.state.saverRes}
            </h3>
            <button
              onClick={(e) => {
                this.setState({ saver: !this.state.saver });
              }}
              className="start-game__redact-quit"
              hidden={!this.state.saver}
            >
              ОК
            </button>
          </div>
        </div>
        <div
          style={{
            zIndex: 2000,
          }}
          className="modal-blur"
          hidden={!this.state.quiter}
        >
          <div className="start-game__redact-list">
            <h3 className="start-game__redact-list__heading">
              Вы действительно хотите выйти?
            </h3>
            <h3 className="start-game__redact-list__heading">
              Все несохраненные данные будут утеряны
            </h3>
            <div className="start-game__redact-list__flex">
              <Link
                onClick={() => {
                  this.props.set_capitals([]);
                  this.props.set_colormap([]);
                  for (let i of this.props.store.changeGame) {
                    this.props.change_game(i);
                  }
                  this.props.transition_clear();
                  this.props.clear_peace();
                }}
                to={"/home"}
                className="start-game__redact-quit"
                hidden={!this.state.quiter}
              >
                ДА
              </Link>
              <button
                onClick={(e) => {
                  this.setState({ quiter: !this.state.quiter });
                }}
                className="start-game__redact-quit"
                hidden={!this.state.quiter}
              >
                НЕТ
              </button>
            </div>
          </div>
        </div>
      </LoadingScreen>
    );
  }
}

export default connect(mapStateToProps, {
  create_game,
  set_capitals,
  set_colormap,
  change_buffs,
  change_game,
  transition_clear,
  clear_peace,
})(StartGame);
