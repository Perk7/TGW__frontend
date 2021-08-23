"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootReducer = void 0;

var _types = require("./types");

var _redux = require("redux");

function userReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _types.CHANGE_USER:
      var newState = state ? false : true;
      return newState;

    default:
      return state;
  }
}

function authReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _types.AUTH:
      var newState = {
        login: action.payload.login,
        password: action.payload.password
      };
      return newState;

    default:
      return state;
  }
}

function createGame() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var newState = null;
  var squad = null;

  switch (action.type) {
    case _types.CREATE_GAME:
      newState = action.payload;
      return newState;

    case _types.CHANGE_BUFFS:
      newState = state;

      for (var _i = 0, _Object$keys = Object.keys(action.payload); _i < _Object$keys.length; _i++) {
        var i = _Object$keys[_i];
        newState['buffs'][i] = action.payload[i];
      }

      return newState;

    case _types.CHANGE_CAPITAL:
      newState = state;
      newState['country']['capital'] = action.payload;
      return newState;

    case _types.CHANGE_GOVERNMENT:
      newState = state;
      newState['country']['government'] = action.payload;
      return newState;

    case _types.CHANGE_AREA_FORMAT:
      newState = state;
      newState['country']['area_format'] = action.payload;
      return newState;

    case _types.CHANGE_ARMY_SALARY:
      newState = state;
      newState['country']['army_salary'] = action.payload;
      return newState;

    case _types.CHANGE_ARMY_EQUIP:
      newState = state;
      newState['country']['army_equip'] = action.payload;
      return newState;

    case _types.CHANGE_ARMY_MAINTAIN:
      newState = state;
      newState['country']['army_maintain'] = action.payload;
      return newState;

    case _types.CHANGE_SQUAD:
      newState = state;
      squad = action.payload;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = newState.squad[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _i2 = _step.value;

          if (_i2.place === squad.place) {
            squad.id = _i2.id;
            newState.squad[newState.squad.indexOf(_i2)] = squad;
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

      return newState;

    case _types.NEW_SQUAD:
      newState = state;
      squad = action.payload;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = newState.squad[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _i3 = _step2.value;

          if (_i3.place == squad.place) {
            _i3.pechot_quan = _i3.pechot_quan + squad.pechot_quan;
            _i3.archer_quan = _i3.archer_quan + squad.archer_quan;
            _i3.cavallery_quan = _i3.cavallery_quan + squad.cavallery_quan;
            _i3.catapult_quan = _i3.catapult_quan + squad.catapult_quan;
            return newState;
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

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = newState.squad[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _i4 = _step3.value;

          if (_i4.id >= squad.id) {
            squad.id = _i4.id + 1;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      newState.squad.push(squad);
      return newState;

    case _types.DELETE_SQUAD:
      newState = state;
      var newSquads = [];
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = newState.squad[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _i5 = _step4.value;

          if (_i5.place !== action.payload.place) {
            newSquads.push(_i5);
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      newState.squad = newSquads;
      return newState;

    case _types.SET_PHY_TAXES:
      newState = state;
      newState['country']['tax_physic'] = action.payload;
      return newState;

    case _types.SET_JUR_TAXES:
      newState = state;
      newState['country']['tax_jurid'] = action.payload;
      return newState;

    case _types.CHANGE_BUDGET:
      newState = state;
      newState['buffs']["budget_".concat(action.payload.target)] = action.payload.value;
      return newState;

    case _types.CHANGE_RESOURCE:
      newState = state;
      var len = newState.country.regions.length;
      var value = action.payload.value / len;
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = newState.country.regions[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _i6 = _step5.value;
          _i6["industry_".concat(action.payload.target)] = _i6["industry_".concat(action.payload.target)] + value;
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return newState;

    case _types.CHANGE_KAZNA:
      newState = state;
      newState['buffs']['kazna'] = newState['buffs']['kazna'] + action.payload;
      return newState;

    case _types.CHANGE_LAWS:
      newState = state;
      newState['country'][action.payload] = !newState['country'][action.payload];
      return newState;

    case _types.SET_SOCIAL:
      newState = state;
      newState['country'][action.payload.target] = action.payload.value;
      return newState;

    default:
      return state;
  }
}

function colormapReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _types.SET_COLORMAP:
      var newState = action.payload;
      return newState;

    default:
      return state;
  }
}

function capitalsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _types.SET_CAPITALS:
      var newState = action.payload;
      return newState;

    default:
      return state;
  }
}

function changerReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _types.CHANGE_GAME:
      var newState = state;

      if (newState.indexOf(action.payload) !== -1) {
        var changer = [];
        newState.map(function (el) {
          if (el !== action.payload) {
            changer.push(el);
          }

          return null;
        });
        newState = changer;
      } else {
        newState.push(action.payload);
      }

      return newState;

    default:
      return state;
  }
}

function peaceReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _types.SET_PEACE:
      var newState = state.length ? state : [];
      newState.push(action.payload);
      return newState;

    case _types.CLEAR_PEACE:
      return {};

    default:
      return state;
  }
}

function squadReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _types.TRANSITION_SQUAD:
      var newState = state;
      newState[action.payload.key] = action.payload.data;
      return newState;

    case _types.TRANSITION_CLEAR:
      return {};

    default:
      return state;
  }
}

var rootReducer = (0, _redux.combineReducers)({
  user: userReducer,
  auth: authReducer,
  createGame: createGame,
  colorMap: colormapReducer,
  capitals: capitalsReducer,
  changeGame: changerReducer,
  peaceList: peaceReducer,
  squadTrans: squadReducer
});
exports.rootReducer = rootReducer;