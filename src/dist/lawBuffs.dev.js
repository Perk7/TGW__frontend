"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function getBuffs(buff, status) {
  var ch = !status ? 1 : -1;
  return {
    law_equal_rights: {
      support: buff.support + ch * 0.05,
      stability: buff.stability + ch * 0.07
    },
    law_torture: {
      support: buff.support - ch * 0.08,
      stability: buff.stability + ch * 0.1
    },
    law_speech: {
      support: buff.support - ch * 0.03,
      stability: buff.stability + ch * 0.03
    },
    law_demonstration: {
      support: buff.support - ch * 0.03,
      stability: buff.stability - ch * 0.03
    },
    law_property: {
      support: buff.support + ch * 0.02,
      stability: buff.stability - ch * 0.02
    },
    law_creation: {
      unemployment: buff.unemployment - ch * 0.01
    },
    law_rasism: {
      support: buff.support - ch * 0.1,
      stability: buff.stability + ch * 0.05,
      unemployment: buff.unemployment + ch * 0.015
    },
    law_heritage: {
      inflation: buff.inflation + ch * 0.005
    },
    law_slavery: {
      support: buff.support - ch * 0.1,
      stability: buff.stability + ch * 0.05
    },
    law_court: {
      support: buff.support + ch * 0.03,
      stability: buff.stability - ch * 0.02
    },
    law_child_labour: {
      support: buff.support - ch * 0.05,
      unemployment: buff.unemployment + ch * 0.015
    },
    law_monopoly: {
      support: buff.support - ch * 0.03,
      stability: buff.stability + ch * 0.05
    },
    law_free_enterspire: {
      support: buff.support + ch * 0.08,
      stability: buff.stability - ch * 0.07,
      poverty: buff.poverty - ch * 0.02
    },
    law_work_day_limit: {
      support: buff.support - ch * 0.04,
      poverty: buff.poverty + ch * 0.03,
      unemployment: buff.unemployment - ch * 0.025,
      avg_salary: buff.avg_salary - ch * 0.04
    },
    law_death_penalty: {
      support: buff.support - ch * 0.05,
      stability: buff.stability + ch * 0.1
    }
  };
}

var _default = getBuffs;
exports["default"] = _default;