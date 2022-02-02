"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootReducer = void 0;

var _types = require("./types");

var _redux = require("redux");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

  var _ret = function () {
    switch (action.type) {
      case _types.CREATE_GAME:
        newState = action.payload;
        return {
          v: newState
        };

      case _types.CHANGE_BUFFS:
        newState = state;

        for (var _i = 0, _Object$keys = Object.keys(action.payload); _i < _Object$keys.length; _i++) {
          var i = _Object$keys[_i];
          newState['buffs'][i] = action.payload[i];
        }

        return {
          v: newState
        };

      case _types.CHANGE_CAPITAL:
        newState = state;
        newState['country']['capital'] = action.payload;
        return {
          v: newState
        };

      case _types.CHANGE_GOVERNMENT:
        newState = state;
        newState['country']['government'] = action.payload;
        return {
          v: newState
        };

      case _types.CHANGE_AREA_FORMAT:
        newState = state;
        newState['country']['area_format'] = action.payload;
        return {
          v: newState
        };

      case _types.CHANGE_ARMY_SALARY:
        newState = state;
        newState['country']['army_salary'] = action.payload;
        return {
          v: newState
        };

      case _types.CHANGE_ARMY_EQUIP:
        newState = state;
        newState['country']['army_equip'] = action.payload;
        return {
          v: newState
        };

      case _types.CHANGE_ARMY_MAINTAIN:
        newState = state;
        newState['country']['army_maintain'] = action.payload;
        return {
          v: newState
        };

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

        return {
          v: newState
        };

      case _types.NEW_SQUAD:
        newState = state;
        squad = action.payload;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = newState.squad[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _i3 = _step2.value;

            if (_i3.place === squad.place) {
              _i3.pechot_quan = _i3.pechot_quan + squad.pechot_quan;
              _i3.archer_quan = _i3.archer_quan + squad.archer_quan;
              _i3.cavallery_quan = _i3.cavallery_quan + squad.cavallery_quan;
              _i3.catapult_quan = _i3.catapult_quan + squad.catapult_quan;
              return {
                v: newState
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
        return {
          v: newState
        };

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
        return {
          v: newState
        };

      case _types.CHANGE_AI_SQUAD:
        newState = state;
        squad = action.payload;
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = newState.squad_ai[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var _i6 = _step5.value;

            if (_i6.place === squad.place && _i6.country === squad.country) {
              squad.id = _i6.id;
              newState.squad_ai[newState.squad_ai.indexOf(_i6)] = squad;
            }
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

        return {
          v: newState
        };

      case _types.NEW_AI_SQUAD:
        newState = state;
        squad = action.payload;
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = newState.squad_ai[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var _i7 = _step6.value;

            if (_i7.place === squad.place && _i7.country === squad.country) {
              _i7.pechot_quan = _i7.pechot_quan + squad.pechot_quan;
              _i7.archer_quan = _i7.archer_quan + squad.archer_quan;
              _i7.cavallery_quan = _i7.cavallery_quan + squad.cavallery_quan;
              _i7.catapult_quan = _i7.catapult_quan + squad.catapult_quan;
              return {
                v: newState
              };
            }
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
              _iterator6["return"]();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }

        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = newState.squad_ai[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var _i8 = _step7.value;

            if (_i8.id >= squad.id) {
              squad.id = _i8.id + 1;
            }
          }
        } catch (err) {
          _didIteratorError7 = true;
          _iteratorError7 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
              _iterator7["return"]();
            }
          } finally {
            if (_didIteratorError7) {
              throw _iteratorError7;
            }
          }
        }

        newState.squad_ai.push(squad);
        return {
          v: newState
        };

      case _types.DELETE_AI_SQUAD:
        newState = state;
        var newAISquads = [];
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          for (var _iterator8 = newState.squad_ai[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var _i9 = _step8.value;

            if (_i9.place !== action.payload.place) {
              newAISquads.push(_i9);
            }
          }
        } catch (err) {
          _didIteratorError8 = true;
          _iteratorError8 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
              _iterator8["return"]();
            }
          } finally {
            if (_didIteratorError8) {
              throw _iteratorError8;
            }
          }
        }

        newState.squad_ai = newAISquads;
        return {
          v: newState
        };

      case _types.SET_PHY_TAXES:
        newState = state;
        newState['country']['tax_physic'] = action.payload;
        return {
          v: newState
        };

      case _types.SET_JUR_TAXES:
        newState = state;
        newState['country']['tax_jurid'] = action.payload;
        return {
          v: newState
        };

      case _types.CHANGE_BUDGET:
        newState = state;
        newState['buffs']["budget_".concat(action.payload.target)] = action.payload.value;
        return {
          v: newState
        };

      case _types.CHANGE_RESOURCE:
        newState = state;
        var len = newState.country.regions.length;
        var value = action.payload.value / len;
        var _iteratorNormalCompletion9 = true;
        var _didIteratorError9 = false;
        var _iteratorError9 = undefined;

        try {
          for (var _iterator9 = newState.country.regions[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            var _i10 = _step9.value;
            _i10["industry_".concat(action.payload.target)] = _i10["industry_".concat(action.payload.target)] + value;
          }
        } catch (err) {
          _didIteratorError9 = true;
          _iteratorError9 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
              _iterator9["return"]();
            }
          } finally {
            if (_didIteratorError9) {
              throw _iteratorError9;
            }
          }
        }

        return {
          v: newState
        };

      case _types.CHANGE_KAZNA:
        newState = state;
        newState['buffs']['kazna'] = newState['buffs']['kazna'] + action.payload;
        return {
          v: newState
        };

      case _types.CHANGE_LAWS:
        newState = state;
        newState['country'][action.payload] = !newState['country'][action.payload];
        return {
          v: newState
        };

      case _types.SET_SOCIAL:
        newState = state;
        newState['country'][action.payload.target] = action.payload.value;
        return {
          v: newState
        };

      case _types.SWAP_REGION:
        newState = state;
        var obj = action.payload;
        var newDecRegions = [];
        var newIncRegions = [];
        var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
          for (var _iterator10 = obj.dec.regions[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var _i13 = _step10.value;

            if (_i13.name !== obj.region) {
              newDecRegions.push(_i13);
            } else {
              newIncRegions.push(_i13);
            }
          }
        } catch (err) {
          _didIteratorError10 = true;
          _iteratorError10 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
              _iterator10["return"]();
            }
          } finally {
            if (_didIteratorError10) {
              throw _iteratorError10;
            }
          }
        }

        var _iteratorNormalCompletion11 = true;
        var _didIteratorError11 = false;
        var _iteratorError11 = undefined;

        try {
          for (var _iterator11 = obj.inc.regions[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
            var _i14 = _step11.value;
            newIncRegions.push(_i14);
          }
        } catch (err) {
          _didIteratorError11 = true;
          _iteratorError11 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
              _iterator11["return"]();
            }
          } finally {
            if (_didIteratorError11) {
              throw _iteratorError11;
            }
          }
        }

        if (obj.inc.name === newState.country.name) {
          newState.country.region = newIncRegions;
        } else {
          var _iteratorNormalCompletion12 = true;
          var _didIteratorError12 = false;
          var _iteratorError12 = undefined;

          try {
            for (var _iterator12 = newState.country_ai[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
              var _i11 = _step12.value;

              if (_i11.name === obj.inc.name) {
                _i11.regions = newIncRegions;
              }
            }
          } catch (err) {
            _didIteratorError12 = true;
            _iteratorError12 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
                _iterator12["return"]();
              }
            } finally {
              if (_didIteratorError12) {
                throw _iteratorError12;
              }
            }
          }
        }

        if (obj.dec.name === newState.country.name) {
          newState.country.region = newDecRegions;
        } else {
          var _iteratorNormalCompletion13 = true;
          var _didIteratorError13 = false;
          var _iteratorError13 = undefined;

          try {
            for (var _iterator13 = newState.country_ai[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
              var _i12 = _step13.value;

              if (_i12.name === obj.dec.name) {
                _i12.regions = newDecRegions;
              }
            }
          } catch (err) {
            _didIteratorError13 = true;
            _iteratorError13 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
                _iterator13["return"]();
              }
            } finally {
              if (_didIteratorError13) {
                throw _iteratorError13;
              }
            }
          }
        }

        return {
          v: newState
        };

      case _types.CHANGE_OCCUPED:
        newState = state;
        var newObj = action.payload;
        var _iteratorNormalCompletion14 = true;
        var _didIteratorError14 = false;
        var _iteratorError14 = undefined;

        try {
          for (var _iterator14 = newState.contracts[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
            var _i15 = _step14.value;

            if (_i15.con_type === 'DW' && _i15.pair.includes(newObj.enemy) && (_i15.pair.length === 1 || _i15.pair.includes(newObj.own))) {
              var occuped = _i15.occuped.split(',');

              if (occuped[0] === '' && occuped.length === 1) {
                occuped = [];
              }

              if (!occuped.includes(newObj.region)) {
                occuped.push(newObj.region);
              } else {
                occuped = occuped.filter(function (e) {
                  return e !== newObj.region;
                });
              }

              _i15.occuped = occuped.join(',');
            }
          }
        } catch (err) {
          _didIteratorError14 = true;
          _iteratorError14 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion14 && _iterator14["return"] != null) {
              _iterator14["return"]();
            }
          } finally {
            if (_didIteratorError14) {
              throw _iteratorError14;
            }
          }
        }

        return {
          v: newState
        };

      default:
        return {
          v: state
        };
    }
  }();

  if (_typeof(_ret) === "object") return _ret.v;
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