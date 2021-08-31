"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.change_user = change_user;
exports.auth = auth;
exports.create_game = create_game;
exports.set_capitals = set_capitals;
exports.set_colormap = set_colormap;
exports.change_capital = change_capital;
exports.change_government = change_government;
exports.change_area_format = change_area_format;
exports.change_buffs = change_buffs;
exports.change_game = change_game;
exports.change_army_salary = change_army_salary;
exports.change_army_equip = change_army_equip;
exports.change_army_maintain = change_army_maintain;
exports.change_squad = change_squad;
exports.new_squad = new_squad;
exports.delete_squad = delete_squad;
exports.set_jur_taxes = set_jur_taxes;
exports.set_phy_taxes = set_phy_taxes;
exports.change_budget = change_budget;
exports.change_resource = change_resource;
exports.change_kazna = change_kazna;
exports.change_laws = change_laws;
exports.set_peace = set_peace;
exports.clear_peace = clear_peace;
exports.set_social = set_social;
exports.transition_squad = transition_squad;
exports.transition_clear = transition_clear;
exports.swap_region = swap_region;
exports.change_occuped = change_occuped;
exports.change_ai_squad = change_ai_squad;
exports.new_ai_squad = new_ai_squad;
exports.delete_ai_squad = delete_ai_squad;

var _types = require("./types");

function change_user() {
  return {
    type: _types.CHANGE_USER
  };
}

function auth(data) {
  return {
    type: _types.AUTH,
    payload: data
  };
}

function create_game(data) {
  return {
    type: _types.CREATE_GAME,
    payload: data
  };
}

function set_capitals(data) {
  return {
    type: _types.SET_CAPITALS,
    payload: data
  };
}

function set_colormap(data) {
  return {
    type: _types.SET_COLORMAP,
    payload: data
  };
}

function change_capital(data) {
  return {
    type: _types.CHANGE_CAPITAL,
    payload: data
  };
}

function change_government(data) {
  return {
    type: _types.CHANGE_GOVERNMENT,
    payload: data
  };
}

function change_area_format(data) {
  return {
    type: _types.CHANGE_AREA_FORMAT,
    payload: data
  };
}

function change_buffs(data) {
  return {
    type: _types.CHANGE_BUFFS,
    payload: data
  };
}

function change_game(data) {
  return {
    type: _types.CHANGE_GAME,
    payload: data
  };
}

function change_army_salary(data) {
  return {
    type: _types.CHANGE_ARMY_SALARY,
    payload: data
  };
}

function change_army_equip(data) {
  return {
    type: _types.CHANGE_ARMY_EQUIP,
    payload: data
  };
}

function change_army_maintain(data) {
  return {
    type: _types.CHANGE_ARMY_MAINTAIN,
    payload: data
  };
}

function change_squad(data) {
  return {
    type: _types.CHANGE_SQUAD,
    payload: data
  };
}

function new_squad(data) {
  return {
    type: _types.NEW_SQUAD,
    payload: data
  };
}

function delete_squad(data) {
  return {
    type: _types.DELETE_SQUAD,
    payload: data
  };
}

function set_jur_taxes(data) {
  return {
    type: _types.SET_JUR_TAXES,
    payload: data
  };
}

function set_phy_taxes(data) {
  return {
    type: _types.SET_PHY_TAXES,
    payload: data
  };
}

function change_budget(data) {
  return {
    type: _types.CHANGE_BUDGET,
    payload: data
  };
}

function change_resource(data) {
  return {
    type: _types.CHANGE_RESOURCE,
    payload: data
  };
}

function change_kazna(data) {
  return {
    type: _types.CHANGE_KAZNA,
    payload: data
  };
}

function change_laws(data) {
  return {
    type: _types.CHANGE_LAWS,
    payload: data
  };
}

function set_peace(data) {
  return {
    type: _types.SET_PEACE,
    payload: data
  };
}

function clear_peace(data) {
  return {
    type: _types.CLEAR_PEACE,
    payload: data
  };
}

function set_social(data) {
  return {
    type: _types.SET_SOCIAL,
    payload: data
  };
}

function transition_squad(data) {
  return {
    type: _types.TRANSITION_SQUAD,
    payload: data
  };
}

function transition_clear(data) {
  return {
    type: _types.TRANSITION_CLEAR,
    payload: data
  };
}

function swap_region(data) {
  return {
    type: _types.SWAP_REGION,
    payload: data
  };
}

function change_occuped(data) {
  return {
    type: _types.CHANGE_OCCUPED,
    payload: data
  };
}

function change_ai_squad(data) {
  return {
    type: _types.CHANGE_AI_SQUAD,
    payload: data
  };
}

function new_ai_squad(data) {
  return {
    type: _types.NEW_AI_SQUAD,
    payload: data
  };
}

function delete_ai_squad(data) {
  return {
    type: _types.DELETE_AI_SQUAD,
    payload: data
  };
}