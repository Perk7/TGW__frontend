"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startGame = startGame;

var _Database = _interopRequireDefault(require("Database"));

var _idbKeyval = require("idb-keyval");

var _otherFunctions = require("../otherFunctions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function startGame(country) {
  var newSave = {};
  newSave.country = (0, _otherFunctions.deepCopy)(_Database["default"].countries[country]);
  newSave.relations = (0, _otherFunctions.deepCopy)(_Database["default"].relations);
  newSave.contracts = (0, _otherFunctions.deepCopy)(_Database["default"].contracts);
  newSave.vassals = (0, _otherFunctions.deepCopy)(_Database["default"].vassals);
  newSave.wars = (0, _otherFunctions.deepCopy)(_Database["default"].wars);
  var squads = [];
  var squadsAi = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _Database["default"].squads[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;

      if (i.country === country) {
        squads.push(i);
      } else {
        squadsAi.push(i);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  newSave.squads = (0, _otherFunctions.deepCopy)(squads);
  newSave.squadsAi = (0, _otherFunctions.deepCopy)(squadsAi);
  newSave.countryAi = {};
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = _Database["default"].countries[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _i = _step2.value;

      if (_i.name !== country) {
        _i = (0, _otherFunctions.deepCopy)(_i);
        newSave.countryAi[_i.name] = {
          name: _i.name,
          regions: _i.regions,
          capital: _i.capital,
          identify: _i.identify,
          education: _i.education,
          support: _i.support,
          stability: _i.stability,
          government: _i.government,
          area_format: _i.area_format,
          army_quality: 0.5,
          tax_income: _i.tax_income,
          tax_profit: _i.tax_profit,
          tax_minerals: _i.tax_minerals
        };
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return newSave;
}
/* buffs = self.buffs.as_json() */