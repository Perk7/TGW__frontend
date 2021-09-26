import React, { Component } from "react";
import LoadingScreen from "react-loading-screen";
import { connect } from "react-redux";
import { mapStateToProps } from "../../storage/reduxGet";
import { create_game } from "../../storage/actions";
import Tutorial from "../../elements/Tutorial";
import PeaceContract from "../../elements/PeaceContract";
import coordsRegions from "../../coordsMap";
import identCountries from "../../identCountries";
import {
  getBalanceRegion,
  getCountry,
  getRelation,
  getReparation,
  getWarDetails,
  isVassal,
  whoseReg,
  getAlliance,
  getVassals,
  getWars,
  getPeacingCountries,
  getSouseren
} from "../../otherFunctions";
import Relations from "../../elements/Relations";
import EmptyActions from "../../elements/EmptyActions";
import Header from "../../elements/Header";
import Flags from "../../Flags";
import MapRegion from "../../elements/maps/MapRegion";

class DiplomacyGame extends Component {
  constructor() {
    super();
    this.state = {
      load: true,
      tutorial: false,
      description:
        'Здесь находится вся информация о ваших отношениях с другими странами, а также ' +
        "все текущие войны мира и военные альянсы других государств.;;" +
        "Если у вас имеются вассальные государства, то вы будете получать от них свою долю, а также " +
        "сможете размещать войска на их территории и принуждать их к вступлению в войны.;" +
        "Если же ваша страна сама является вассалом, то она обязуется платить дань своему сюзерену.;;" +
        "В случае заключения мирного договора вы можете получать репарации от побежденных стран, либо " +
        "выплачивать репарации победителю, если сами являетесь побежденными.;;" +
        "При нажатии на одну из стран списка слева, можно заключить различные договора с этим государством. " +
        "Числа в списке являются показателями ваших взаимотношений. Варьироваться они могут от -10 до 10.",
      redactContracts: false,
      currentRelation: "",
      peace: false,
      peaceCondit: false,
      peaceMenu: "",

      emptyActions: false,
      emptyHeader: "",
      currentContracts: false,

      regions: [],
      mapSet: false,
      ownRegions: []
    };

    this.getContract = this.getContract.bind(this);
    this.getOwnContract = this.getOwnContract.bind(this);
    this.getVassals = this.getVassals.bind(this);
    this.changeLoader = this.changeLoader.bind(this);
    this.getCurrentContracts = this.getCurrentContracts.bind(this);
  }
  
  componentDidMount() {
      if (document.readyState === 'complete') {
          if (!this.state.regions.length) {
              this.makeMap()
          }
          this.setState({
              load: false
          })
      } else {
          document.addEventListener('readystatechange', () => {
              if (!this.state.regions.length) {
                  this.makeMap()
              }
              if (document.readyState === 'complete') {
                  this.setState({
                      load: false
                  })
              }
          })
      }
  }

  changeLoader() {
    this.setState({
      load: false,
    });
  }

  getRelationColor(value) {
    if (value === 10) {
      return "#10a009";
    }
    if (value > 7) {
      return "#23c11c";
    }
    if (value > 4) {
      return "#39ec31";
    }
    if (value > 2) {
      return "#bdf442";
    }
    if (value > 0) {
      return "#fff551";
    }
    if (value > -2) {
      return "#eccd4d";
    }
    if (value > -4) {
      return "#fdb23a";
    }
    if (value > -7) {
      return "#dc4f06";
    }
    if (value > -10) {
      return "#ff0000";
    }
    return "#bf0000";
  }

  makeMap(country = [], bool=this.state.mapSet) {
      let relations = {};
      for (let i of this.props.store.createGame.relations) {
        if (i.pair.length === 1) {
          relations[i.pair[0]] = i.value
        }
      }
      let arr = []
      for (let i of this.props.store.createGame.country.regions) {
        let coords = coordsRegions[i.name]
        arr.push({
            coords: coords,
            color: '#5599ec',
            name: i.name
        })
      }

      if (!bool) {
        for (let i of this.props.store.createGame.country_ai) {
            let hash = relations[i.identify]
            let color = this.getRelationColor(hash)
            for (let t of i.regions) {
                let coords = coordsRegions[t.name]
                arr.push({
                    coords: coords,
                    color: country.includes(t.name) ? `${color}88` : color,
                    name: t.name
                })
            }
        }
      } else {
        let wars = getWars(this.props.store.createGame, this.props.store.createGame.country.name).map(e => e.ident)
        let vassals =  getVassals(this.props.store.createGame, this.props.store.createGame.country.name).map(e => e.ident)
        let alliances = getAlliance(this.props.store.createGame, this.props.store.createGame.country.name).map(e => e.ident)
        let souseren = getSouseren(this.props.store.createGame)
        let peaces = getPeacingCountries(this.props.store.createGame)

        for (let i of this.props.store.createGame.country_ai) {
            let color = '#8a9d93'
            if (peaces.indexOf(i.identify) !== -1) {
              color = '#f6f039'
            } else if (i.identify === souseren) {
                color = '#dca60e'
            } else if (wars.indexOf(i.identify) !== -1) {
                color = '#a30101'
            } else if (vassals.indexOf(i.identify) !== -1) {
                color = '#18b46e'
            } else if (alliances.indexOf(i.identify) !== -1) {
                color = '#8615bd'
            }

            for (let t of i.regions) {
                let coords = coordsRegions[t.name]
                arr.push({
                    coords: coords,
                    color: country.includes(t.name) ? `${color}88` : color,
                    name: t.name
                })
            }
        }
      }

      this.setState({
          regions: arr
      })
  }

  getContract(type, priority = null) {
    let list = [];
    for (let i of this.props.store.createGame.contracts) {
      if (i.con_type === type) {
        if (i.pair.length === 2) {
          list.push({
            pair: [identCountries[i.pair[0]], identCountries[i.pair[1]]],
            ident: i.pair,
            own: false,
            priority: i.priority,
          });
        } else {
          list.push({
            pair: [identCountries[i.uniq], identCountries[i.pair[0]]],
            ident: [i.uniq, i.pair[0]],
            own: true,
            priority: i.priority,
          });
        }
      }
    }
    list.sort((a, b) => {
      if (a.own) {
        return -1;
      }
      if (b.own) {
        return 1;
      }
      return 0;
    });

    return list.map((e) => (
      <li
        key={list.indexOf(e)}
        style={{
          backgroundColor: e.own ? "#616161" : "#2b2b2b",
        }}
        className="diplomacy-game__contracts__alliance__list__item"
      >
        <span
          style={{
            fontWeight: e.priority === e.pair[0] ? 600 : 400,
            color: e.priority === e.pair[0] ? "var(--less-light)" : null,
          }}
        >
          <div style={Flags[e.ident[0]]} className="flag" />
          {e.pair[0]}
        </span>
        <span
          style={{
            fontWeight: e.priority === e.pair[1] ? 600 : 400,
            color: e.priority === e.pair[1] ? "var(--less-light)" : null,
          }}
        >
          <div style={Flags[e.ident[1]]} className="flag" />
          {e.pair[1]}
        </span>
      </li>
    ));
  }

  getOwnContract(type, priority = null, selector) {
    let list = [];
    for (let i of this.props.store.createGame.contracts) {
      if (i.con_type === type) {
        if (i.pair.length === 1) {
          list.push({
            pair: [identCountries[i.uniq], identCountries[i.pair[0]]],
            ident: [i.uniq, i.pair[0]],
            priority: i.priority,
          });
        }
      }
    }
    list = list.filter((e) => {
      if (selector === "own") {
        return e.priority === this.props.store.createGame.country.name;
      }
      if (selector === "ai") {
        return e.priority !== this.props.store.createGame.country.name;
      }
      return true;
    });

    if (list.length) {
      return list.map((e) => (
        <li
          key={list.indexOf(e)}
          style={{
            backgroundColor: "#616161",
          }}
          className="diplomacy-game__contracts__reparat__list__item"
        >
          <span
            style={{
              color: e.priority === e.pair[1] ? priority : null,
            }}
          >
            <div
              style={Flags[e.ident[1]]}
              className="flag diplomacy-game__reparations__flag"
            />
            {e.pair[1]}
          </span>
          <span>
            {getReparation(
              this.props.store.createGame.country
            ).toLocaleString()}{" "}
            <img
              className="icons_mini_super"
              src={"images/icons/coin.svg"}
              alt=""
            />
          </span>
        </li>
      ));
    }
    return (
      <li
        key={0}
        style={{
          backgroundColor: "#2b2b2b",
        }}
        className="diplomacy-game__contracts__reparat__list__item_empty"
      >
        <span>Нет текущих репараций</span>
      </li>
    );
  }

  getVassals() {
    let list = [];
    for (let i of this.props.store.createGame.contracts) {
      if (
        i.con_type === "VC" &&
        i.priority === this.props.store.createGame.country.name
      ) {
        list.push({
          name: identCountries[i.pair[0]],
          ident: i.pair[0],
        });
      }
    }
    if (list.length) {
      return list.map((e) => (
        <li
          style={{ backgroundColor: "#616161", gridTemplateColumns: "100% 0%" }}
          key={list.indexOf(e)}
          className="diplomacy-game__contracts__reparat__list__item"
        >
          <span style={{ textAlign: "center" }}>
            <div style={Flags[e.ident]} className="flag" />
            {e.name}
          </span>
        </li>
      ));
    }

    return (
      <li
        key={0}
        style={{
          backgroundColor: "#2b2b2b",
        }}
        className="diplomacy-game__contracts__reparat__list__item_empty"
      >
        <span>У вас нет вассалов</span>
      </li>
    );
  }

  getSouseren() {
    for (let i of this.props.store.createGame.contracts) {
      if (
        i.con_type === "VC" &&
        i.pair.length === 1 &&
        i.priority !== this.props.store.createGame.country.name
      ) {
        return (
          <li
            style={{
              backgroundColor: "#616161",
              gridTemplateColumns: "100% 0%",
            }}
            key={0}
            className="diplomacy-game__contracts__reparat__list__item_empty"
          >
            <span style={{ textAlign: "center" }}>
              <div
                style={
                  Flags[
                    Object.keys(identCountries).find(
                      (key) => identCountries[key] === i.priority
                    )
                  ]
                }
                className="flag"
              />
              {i.priority}
            </span>
          </li>
        );
      }
    }
  }

  getPeace(country) {
    let con = getWarDetails(this.props.store.createGame, country);
    return (
      <ul>
        <li key={0} className="diplomacy-game__peace__heading">
          Мирные переговоры
        </li>
        <li key={1} className="diplomacy-game__peace__block">
          <div className="diplomacy-game__peace__info">
            <div className="diplomacy-game__peace__side">
              {this.props.store.createGame.country.name}
            </div>
            <div className="diplomacy-game__peace__side_headers">
              <div
                style={Flags[this.props.store.createGame.country.identify]}
                className="flag"
              />
              VS
              <div style={Flags[country]} className="flag" />
            </div>
            <div className="diplomacy-game__peace__side">
              {identCountries[country]}
            </div>
          </div>
          <div className="diplomacy-game__peace__info">
            <div className="diplomacy-game__peace__side">
              {con.spends[this.props.store.createGame.country.identify]}{" "}
              <img
                className="army-game__icons_mini"
                src={"images/icons/people.svg"}
                alt=""
              />
            </div>
            <div className="diplomacy-game__peace__side_headers">Потери</div>
            <div className="diplomacy-game__peace__side">
              {con.spends[country]}{" "}
              <img
                className="army-game__icons_mini"
                src={"images/icons/people.svg"}
                alt=""
              />
            </div>
          </div>
          <div className="diplomacy-game__peace__info">
            <div className="diplomacy-game__peace__side">
              {getBalanceRegion(this.props.store.createGame, con)}{" "}
              <img
                className="army-game__icons_mini"
                src={"images/icons/region.svg"}
                alt=""
              />
            </div>
            <div className="diplomacy-game__peace__side_headers">
              Баланс регионов
            </div>
            <div className="diplomacy-game__peace__side">
              {-getBalanceRegion(this.props.store.createGame, con)}{" "}
              <img
                className="army-game__icons_mini"
                src={"images/icons/region.svg"}
                alt=""
              />
            </div>
          </div>
        </li>
        <li key={2}>
          <div className="diplomacy-game__peace__form">
            <button
              onClick={(e) => {
                let name = this.state.currentRelation;
                if (
                  this.props.store.changeGame.indexOf(`contract_${name}_FW`) !==
                  -1
                ) {
                  e.preventDefault();
                  this.setState({
                    emptyActions: true,
                    emptyHeader: "Вы уже отправили свое предложение",
                  });
                  let promise = new Promise((resolve) => {
                    setTimeout(() => {
                      resolve("ee");
                    }, 2000);
                  });
                  promise.then((result) =>
                    this.setState({
                      emptyActions: false,
                      emptyHeader: "",
                    })
                  );
                } else {
                  this.setState({
                    peaceCondit: !this.state.peaceCondit,
                    peaceMenu: (
                      <PeaceContract country={this.state.currentRelation} />
                    ),
                  });
                }
              }}
              className="diplomacy-game__peace__btn redact__submit"
            >
              Условия договора
            </button>
          </div>
        </li>
      </ul>
    );
  }

  getCurrentContracts() {
    let hash = {
      AL: 'Альянс',
      CM: 'Общий рынок',
      PA: 'Проход войск',

      CT: 'Культурный обмен',
      SH: 'Соц. взаимопомощь',
      EH: 'Экон. взаимопомощь',
      CP: 'Дог. о ненападении',

      ES: 'Экон. санкции',
      DW: 'Война',
      FW: 'Перемирие',

      VC: 'Вассальный договор',
    }
    let arr = []
    for (let i of this.props.store.createGame.contracts) {
      if (i.pair.length == 1 && i.pair[0] == this.state.currentRelation) {
        arr.push({
          type: hash[i.con_type],
          priority: i.priority !== '0' ? i.priority : 'Нет',
          deadline: i.deadline === 9999 ? 'Бессрочно' : `до ${i.deadline} хода`
        })
      }
    }

    if (arr.length === 0) {
      return false
    }

    return arr.map(e => (
      <li className='diplomacy-game__current-contracts__item'><span>{e.type}</span> <span>{e.deadline}</span> <span>{e.priority}</span></li>
    ))
  }

  render() {
    if (!this.state.load) {
      return (
        <div className="game__view">
          <Header
            name={"Дипломатия"}
            tutorial={() => {
              this.setState({ tutorial: !this.state.tutorial });
            }}
          />
          <div>
            <button onClick={() => {
              this.setState({ mapSet: !this.state.mapSet })
              this.makeMap([], !this.state.mapSet)
            }} className='diplomacy-game__change-map-btn game__button'>Режим карты</button>
            <div className="diplomacy-game__main-block">
              <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="70vw" height="80vh"
                        viewBox={`0 0 200 200`}
                        version="1.1"
                        id="1svg8"
                    >
                        <g
                            id="Море"
                            style={{userSelect: 'none',strokeWidth:'0.188976',strokeMiterlimit:'4',strokeDasharray:'none'}}
                        >
                            {this.state.regions.map((reg) => <MapRegion coord={reg.coords} identy={reg.name} 
                            color={reg.color} 
                            key={reg.name} 
                            onClick={(e) => {
                              let reg = e.target.id.split('_').join(' ')
                              let country = whoseReg(this.props.store.createGame, reg)
                              let newRegs = country !== this.props.store.createGame.country.identify 
                                ? getCountry(this.props.store.createGame, country).regions.map(e => e.name) 
                                : []
                              this.setState({
                                ownRegions: newRegs
                              })
                              this.setState({ currentRelation: country });
                              
                              this.makeMap(newRegs)
                            }} />)}
                            <MapRegion coord={coordsRegions['Ввандерфелл']} identy="Ввандерфелл" color='#bbb' />
                        </g>
              </svg>
              <section className="diplomacy-game__info-block">
                <div className='diplomacy-game__info-selected'>
                  {this.state.currentRelation && this.state.currentRelation !== this.props.store.createGame.country.identify 
                  ? <>
                    <div className="diplomacy-game__info-selected__heading">
                      <div
                        style={Flags[this.state.currentRelation]}
                        className="flag diplomacy-game__info-selected__flag"
                      />
                      <span className='diplomacy-game__info-selected__country'>{identCountries[this.state.currentRelation]}</span>
                    </div>
                    <div className="diplomacy-game__info-selected__body">
                      <span style={{color: this.getRelationColor(getRelation(this.props.store.createGame, this.state.currentRelation))}} 
                            className="diplomacy-game__info-selected__index">
                              {getRelation(this.props.store.createGame, this.state.currentRelation)}
                      </span>
                      <button 
                        onClick={() => this.setState({ currentContracts: !this.state.currentContracts })} 
                        className='diplomacy-game__current-contracts__btn'
                        disabled={!this.getCurrentContracts() ? true : false}
                        >f</button>
                      <button onClick={() => this.setState({ redactContracts: !this.state.redactContracts })} className="diplomacy-game__info-selected__btn">Заключить договор</button>
                    </div>
                  </>
                  : <div className="diplomacy-game__info-selected__nothing">
                      <span className='diplomacy-game__info-selected__country'>Выберите государство на карте</span>
                    </div>}
                </div>
                <section className="diplomacy-game__contracts-block overflowing">
                  <div className="diplomacy-game__contracts__alliance">
                    <span>Альянсы:</span>
                    <div>
                      <ul className="diplomacy-game__contracts__alliance__list overflowing">
                        {this.getContract("AL")}
                      </ul>
                    </div>
                  </div>
                  <div className="diplomacy-game__contracts__alliance">
                    <span>Войны:</span>
                    <div>
                      <ul className="diplomacy-game__contracts__alliance__list overflowing">
                        {this.getContract("DW", "#860000")}
                      </ul>
                    </div>
                  </div>
                  <div className="diplomacy-game__contracts__alliance">
                    {isVassal(this.props.store.createGame) ? (
                      <>
                        <span>Сюзерен:</span>
                        <div>
                          <ul className="diplomacy-game__contracts__alliance__list overflowing">
                            {this.getSouseren()}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <>
                        <span>Вассалы:</span>
                        <div>
                          <ul className="diplomacy-game__contracts__alliance__list overflowing">
                            {this.getVassals()}
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="diplomacy-game__contracts__alliance">
                    <span>Получаемые репарации:</span>
                    <div>
                      <ul className="diplomacy-game__contracts__alliance__list overflowing">
                        {this.getOwnContract("FW", null, "own")}
                      </ul>
                    </div>
                  </div>
                  <div className="diplomacy-game__contracts__alliance">
                    <span>Выплачиваемые репарации:</span>
                    <div>
                      <ul className="diplomacy-game__contracts__alliance__list overflowing">
                        {this.getOwnContract("FW", null, "ai")}
                      </ul>
                    </div>
                  </div>
                </section>
              </section>
            </div>
          </div>
          <Tutorial
            text={this.state.description}
            hide={!this.state.tutorial}
            quit={() => {
              this.setState({ tutorial: !this.state.tutorial });
            }}
          />
          <div
            onClick={(e) => {
              if (e.target.dataset.con) {
                if (e.target.dataset.con.indexOf('FW') !== -1) {
                  this.setState({ peace: !this.state.peace });
                }
              }
              if (e.target.parentElement.dataset.con) {
                if (e.target.parentElement.dataset.con.indexOf('FW') !== -1) {
                  this.setState({ peace: !this.state.peace });
                }  
              }
            }}
            className="diplomacy-game__redact-relations_list modal-blur"
            hidden={!this.state.redactContracts}
          >
            <Relations country={this.state.currentRelation} />
            <button
              onClick={(e) => {
                this.setState({ redactContracts: !this.state.redactContracts });
              }}
              className="economy-game__budget-quit modal-quit"
              hidden={!this.state.redactContracts}
            >
              &#215;
            </button>
          </div>
          <div className="diplomacy-game__redact-relations_list modal-blur"
               hidden={!this.state.currentContracts} 
          >
            <ul>
            <li className='diplomacy-game__current-contracts__item'><span>Договор</span> <span>Срок</span> <span>Инициатор</span></li>
              {this.state.currentContracts &&
                this.getCurrentContracts()}
            </ul>
            <button
              onClick={(e) => {
                this.setState({ currentContracts: !this.state.currentContracts });
              }}
              className="economy-game__budget-quit modal-quit"
              hidden={!this.state.currentContracts}
            >
              &#215;
            </button>
          </div>
          <div
            className="diplomacy-game__redact-relations_list modal-blur"
            hidden={!this.state.peace}
          >
            {this.state.currentRelation &&
              this.getPeace(this.state.currentRelation)}
            <button
              onClick={(e) => {
                this.setState({ peace: !this.state.peace });
              }}
              className="economy-game__budget-quit modal-quit"
              hidden={!this.state.peace}
            >
              &#215;
            </button>
          </div>
          <div
            onClick={(e) => {
              if (e.target.id === "peace__btn_quit") {
                this.setState({
                  peaceCondit: !this.state.peaceCondit,
                });
              }
              if (e.target.id === "peace__btn_ok") {
                this.setState({
                  peaceCondit: !this.state.peaceCondit,
                  peace: !this.state.peace,
                });
              }
            }}
            className="diplomacy-game__popup-map"
            hidden={!this.state.peaceCondit}
          >
            {this.state.peaceMenu}
          </div>
          <div hidden={!this.state.emptyActions}>
            <EmptyActions text={this.state.emptyHeader} />
          </div>
        </div>
      );
    } else {
      return (
        <LoadingScreen
          loading={this.state.load}
          bgColor="#000"
          spinnerColor="#FFF"
          textColor="#FFF"
          text="Загрузка игровых данных"
        >
          children
        </LoadingScreen>
      );
    }
  }
}

export default connect(mapStateToProps, { create_game })(DiplomacyGame);
