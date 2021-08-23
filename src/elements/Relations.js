import React, { useState } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../storage/reduxGet";
import { change_game, change_buffs } from "../storage/actions";
import identCountries from "../identCountries";
import EmptyActions from "./EmptyActions";
import { checkContract, getWars, isVassal } from "../otherFunctions";

function Relations(props) {
  const [emptyActions, changeEmptyActions] = useState(false);
  const [changer, setChanger] = useState(false);

  function getContracts() {
    const cons = {
      DW: {
        status: !(
          checkContract(props.store.createGame, "AL", props.country) ||
          checkContract(props.store.createGame, "DW", props.country) ||
          checkContract(props.store.createGame, "CP", props.country) ||
          checkContract(props.store.createGame, "FW", props.country) ||
          checkContract(props.store.createGame, "VC", props.country)
        ),
        text: "Объявить войну",
      },
      FW: {
        status: checkContract(props.store.createGame, "DW", props.country),
        text: "Заключить мир",
      },
      AL: {
        status: !(
          checkContract(props.store.createGame, "DW", props.country) ||
          checkContract(props.store.createGame, "VC", props.country)
        ),
        text: checkContract(props.store.createGame, "AL", props.country)
          ? "Разорвать альянс"
          : "Сформировать альянс",
      },
      CM: {
        status: !(
          checkContract(props.store.createGame, "DW", props.country) ||
          checkContract(props.store.createGame, "ES", props.country)
        ),
        text: checkContract(props.store.createGame, "CM", props.country)
          ? "Расформировать общий рынок"
          : "Создать общий рынок",
      },
      VC: {
        status: !checkContract(props.store.createGame, "DW", props.country),
        text: isVassal(props.store.createGame)
          ? "Обьявить о независимости"
          : checkContract(props.store.createGame, "VC", props.country)
          ? "Освободить от зависимости"
          : "Предложить стать вассалом",
      },
      ES: {
        status: !(
          checkContract(props.store.createGame, "DW", props.country) ||
          checkContract(props.store.createGame, "VC", props.country) ||
          checkContract(props.store.createGame, "CM", props.country) ||
          checkContract(props.store.createGame, "AL", props.country) ||
          checkContract(props.store.createGame, "EH", props.country) ||
          checkContract(
            props.store.createGame,
            "ES",
            props.country,
            props.store.createGame.country.identify
          )
        ),
        text: "Наложить экономические санкции",
      },
      CP: {
        status: !(
          checkContract(props.store.createGame, "CP", props.country) ||
          checkContract(props.store.createGame, "DW", props.country) ||
          checkContract(props.store.createGame, "AL", props.country) ||
          checkContract(props.store.createGame, "VC", props.country)
        ),
        text: "Заключить договор о ненападении",
      },
      PA: {
        status: !(
          checkContract(
            props.store.createGame,
            "PA",
            props.country,
            props.store.createGame.country.identify
          ) ||
          checkContract(props.store.createGame, "DW", props.country) ||
          checkContract(props.store.createGame, "VC", props.country)
        ),
        text: "Попросить проход войск",
      },
      CT: {
        status: !(
          checkContract(props.store.createGame, "CT", props.country) ||
          checkContract(props.store.createGame, "DW", props.country)
        ),
        text: "Провести культурный обмен",
      },
      SH: {
        status: !(
          checkContract(props.store.createGame, "SH", props.country) ||
          checkContract(props.store.createGame, "DW", props.country)
        ),
        text: "Начать социальную взаимопомощь",
      },
      EH: {
        status: !(
          checkContract(props.store.createGame, "EH", props.country) ||
          checkContract(props.store.createGame, "DW", props.country)
        ),
        text: "Предложить экономическую помощь",
      },
    };

    let arr = [];
    for (let i of getWars(
      props.store.createGame,
      props.store.createGame.country.name
    )) {
      let has = true;
      for (let t of getWars(props.store.createGame, props.country)) {
        if (i.ident === t.ident) {
          has = false;
        }
      }
      if (
        has &&
        (checkContract(props.store.createGame, "AL", props.country) ||
          checkContract(
            props.store.createGame,
            "VC",
            props.country,
            props.store.createGame.country.identify
          ))
      ) {
        arr.push(
          <li
            key={`DW-invite-${i.ident}`}
            data-con={`DW-invite-${i.ident}`}
            style={
              props.store.changeGame.indexOf(`DW-invite-${i.ident}`) !== -1
                ? { backgroundColor: "#777" }
                : null
            }
            className="relations__contracts-list__item"
          >
            <span>Призвать в войну против "{i.name}"</span>
          </li>
        );
      }
    }

    for (let i of Object.keys(cons)) {
      let iden = `${props.country}_${i}`;
      let item = cons[i].status ? (
        <li
          key={i}
          data-con={iden}
          style={
            props.store.changeGame.indexOf(`contract_${iden}`) !== -1
              ? { backgroundColor: "#777" }
              : null
          }
          className="relations__contracts-list__item"
        >
          <span>{cons[i].text}</span>
        </li>
      ) : null;
      arr.push(item);
    }
    return arr;
  }

  return (
    <>
      <ul className="overflowing">
        <li key={0} className="relations__heading">
          <span>
            <img src={`flags/${props.country}.svg`} alt="" />{" "}
            {identCountries[props.country]}
          </span>
          <span>
            <img
              className="army-game__icons_mini"
              src={"images/icons/action.svg"}
              alt=""
            />
            1
          </span>
        </li>
        <li key={1} className="relations__contracts-block">
          <ul
            onClick={(ev) => {
              if (ev.target.nodeName === "UL") {
                return;
              }
              if (ev.target.dataset.con) {
                if (ev.target.dataset.con.indexOf('FW') !== -1) {
                  return
                }
              }
              if (ev.target.parentElement.dataset.con) {
                if (ev.target.parentElement.dataset.con.indexOf('FW') !== -1) {
                  return
                }  
              }
              let name =
                ev.target.dataset.con || ev.target.parentElement.dataset.con;
              let buff = props.store.createGame.buffs;
              if (
                props.store.changeGame.indexOf(`contract_${name}`) === -1 &&
                buff.actions - 1 >= 0
              ) {
                props.change_game(`contract_${name}`);
                props.change_buffs({
                  actions: buff.actions - 1,
                });
                setChanger(!changer);
              } else if (
                props.store.changeGame.indexOf(`contract_${name}`) !== -1
              ) {
                props.change_game(`contract_${name}`);
                props.change_buffs({
                  actions: buff.actions + 1,
                });
              } else {
                ev.preventDefault();
                changeEmptyActions(true);

                let promise = new Promise((resolve) => {
                  setTimeout(() => {
                    resolve("ee");
                  }, 2000);
                });
                promise.then((result) => changeEmptyActions(false));
              }
            }}
            className="relations__contracts-list"
          >
            {getContracts()}
          </ul>
        </li>
      </ul>
      <div hidden={!emptyActions}>
        <EmptyActions />
      </div>
    </>
  );
}

export default connect(mapStateToProps, { change_game, change_buffs })(
  Relations
);
