import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../storage/reduxGet";
import {
  change_buffs,
  change_game,
  change_squad,
  delete_squad,
} from "../storage/actions";
import identCountries from "../identCountries";

class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      death: (
        <img className="icons_mini" src={"images/icons/death.svg"} alt="" />
      ),
      result:
        this.props.result === "win" ? (
          <div className="battle__result battle__result_win">
            <h3 className="battle__result__heading">Победа</h3>
          </div>
        ) : (
          <div className="battle__result battle__result_def">
            <h3 className="battle__result__heading">Поражение</h3>
          </div>
        ),
    };
  }

  getHeading(name) {
    const index = name.slice(-1);
    if (name === "Порт Телванни") {
      return "Порте Телванни";
    }
    if (name === "Имперский Город") {
      return "Имперском Городе";
    }
    if (name === "Воронья Скала") {
      return "Вороньей Скале";
    }
    if (index === "а" || index === "ь" || index === "й") {
      return name.substring(0, name.length - 1) + "е";
    }
    if (index === "я") {
      return name.substring(0, name.length - 1) + "и";
    }
    if (index === "и" || index === "е") {
      return name;
    }
    return name + "е";
  }

  render() {
    return (
      <div
        hidden={this.props.hide}
        style={{ zIndex: "9", overflowY: "hidden" }}
        className="modal-blur"
      >
        <div className="battle-view overflowing">
          <div className="battle__header">
            <h3 className="battle__heading">
              Битва при {this.getHeading(this.props.region.capital)}
            </h3>
          </div>
          <div className="battle__result-block">{this.state.result}</div>
          <div className="battle__detail">
            <div className="battle__detail__block battle__detail__header">
              <div className="battle__detail__block-item">
                {this.props.store.createGame.country.name}
              </div>
            </div>
            <div className="battle__detail__block battle__detail__header">
              <div className="battle__detail__block-item">VS</div>
            </div>
            <div className="battle__detail__block battle__detail__header">
              <div className="battle__detail__block-item">
                {identCountries[this.props.enemy]}
              </div>
            </div>

            <div className="battle__detail__block battle__detail__side">
              <div className="battle__detail__block-item">
                {this.props.ownSquad.pechot_quan.toLocaleString()} (
                {this.props.ownSpend.pechot} {this.state.death})
              </div>
            </div>
            <div className="battle__detail__block battle__detail__vs">
              <div className="battle__detail__block-item">
                <img
                  className="battle__detail__unit"
                  src={"images/icons/pehot.svg"}
                  alt=""
                />
              </div>
            </div>
            <div className="battle__detail__block battle__detail__side">
              <div className="battle__detail__block-item">
                {this.props.enemySquad.pechot_quan.toLocaleString()} (
                {this.props.enemySpend.pechot} {this.state.death})
              </div>
            </div>

            <div className="battle__detail__block battle__detail__side">
              <div className="battle__detail__block-item">
                {this.props.ownSquad.archer_quan.toLocaleString()} (
                {this.props.ownSpend.archer} {this.state.death})
              </div>
            </div>
            <div className="battle__detail__block battle__detail__vs">
              <div className="battle__detail__block-item">
                <img
                  className="battle__detail__unit"
                  src={"images/icons/archer.svg"}
                  alt=""
                />
              </div>
            </div>
            <div className="battle__detail__block battle__detail__side">
              <div className="battle__detail__block-item">
                {this.props.enemySquad.archer_quan.toLocaleString()} (
                {this.props.enemySpend.archer} {this.state.death})
              </div>
            </div>

            <div className="battle__detail__block battle__detail__side">
              <div className="battle__detail__block-item">
                {this.props.ownSquad.cavallery_quan.toLocaleString()} (
                {this.props.ownSpend.cavallery} {this.state.death})
              </div>
            </div>
            <div className="battle__detail__block battle__detail__vs">
              <div className="battle__detail__block-item">
                <img
                  className="battle__detail__unit"
                  src={"images/icons/cavallery.svg"}
                  alt=""
                />
              </div>
            </div>
            <div className="battle__detail__block battle__detail__side">
              <div className="battle__detail__block-item">
                {this.props.enemySquad.cavallery_quan.toLocaleString()} (
                {this.props.enemySpend.cavallery} {this.state.death})
              </div>
            </div>

            <div className="battle__detail__block battle__detail__side">
              <div className="battle__detail__block-item">
                {this.props.ownSquad.catapult_quan.toLocaleString()} (
                {this.props.ownSpend.catapult} {this.state.death})
              </div>
            </div>
            <div className="battle__detail__block battle__detail__vs">
              <div className="battle__detail__block-item">
                <img
                  className="battle__detail__unit"
                  src={"images/icons/catapult.svg"}
                  alt=""
                />
              </div>
            </div>
            <div className="battle__detail__block battle__detail__side">
              <div className="battle__detail__block-item">
                {this.props.enemySquad.catapult_quan.toLocaleString()} (
                {this.props.enemySpend.catapult} {this.state.death})
              </div>
            </div>
          </div>
        </div>
        <button onClick={this.props.close} className="battle-quit modal-quit">
          &#215;
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  change_buffs,
  change_game,
  change_squad,
  delete_squad,
})(Battle);
