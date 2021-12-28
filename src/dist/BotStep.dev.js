"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = botStep;

var _otherFunctions = require("./otherFunctions");

function botStep(store, func) {
  var newStore, buffArr, buffArrRegion, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, i, koef, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, k, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _k, _i, _Object$keys, z, conTypes, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _i2, changer, _i3, _Object$keys2, c;

  return regeneratorRuntime.async(function botStep$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          newStore = Object.assign({}, store);
          buffArr = ['army_quality', 'education_quality', 'stability', 'support'];
          buffArrRegion = {
            population: 0.05,
            universities: 0.05,
            schools: 0.05,
            aqueducs: 0.05,
            stone_road: 0.05,
            pave_road: 0.05,
            poverty: 0.05,
            unemployment: 0.05,
            avg_salary: 0.05,
            infrastructure: 0.05,
            port: 0.05,
            cargo_ship: 0.05,
            people_ship: 0.05,
            industry: 0.05,
            need: 0.05
          };
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 6;
          _iterator = newStore.createGame.country_ai[Symbol.iterator]();

        case 8:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 52;
            break;
          }

          i = _step.value;
          koef = 1;
          _iteratorNormalCompletion3 = true;
          _didIteratorError3 = false;
          _iteratorError3 = undefined;
          _context.prev = 14;

          for (_iterator3 = buffArr[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            k = _step3.value;
            i[k] = i[k] + i[k] * koef * (Math.random() / 2 + 0.75);
          }

          _context.next = 22;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](14);
          _didIteratorError3 = true;
          _iteratorError3 = _context.t0;

        case 22:
          _context.prev = 22;
          _context.prev = 23;

          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }

        case 25:
          _context.prev = 25;

          if (!_didIteratorError3) {
            _context.next = 28;
            break;
          }

          throw _iteratorError3;

        case 28:
          return _context.finish(25);

        case 29:
          return _context.finish(22);

        case 30:
          _iteratorNormalCompletion4 = true;
          _didIteratorError4 = false;
          _iteratorError4 = undefined;
          _context.prev = 33;

          for (_iterator4 = i.regions[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            _k = _step4.value;

            for (_i = 0, _Object$keys = Object.keys(_k); _i < _Object$keys.length; _i++) {
              z = _Object$keys[_i];

              if (z.startsWith('industry')) {
                _k[z] = _k[z] + _k[z] * buffArrRegion['industry'] * koef * (Math.random() / 2 + 0.75);
              } else if (z.startsWith('need')) {
                _k[z] = _k[z] + _k[z] * buffArrRegion['need'] * koef * (Math.random() / 2 + 0.75);
              } else {
                _k[z] = _k[z] + _k[z] * buffArrRegion[z] * koef * (Math.random() / 2 + 0.75);
              }
            }
          }

          _context.next = 41;
          break;

        case 37:
          _context.prev = 37;
          _context.t1 = _context["catch"](33);
          _didIteratorError4 = true;
          _iteratorError4 = _context.t1;

        case 41:
          _context.prev = 41;
          _context.prev = 42;

          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }

        case 44:
          _context.prev = 44;

          if (!_didIteratorError4) {
            _context.next = 47;
            break;
          }

          throw _iteratorError4;

        case 47:
          return _context.finish(44);

        case 48:
          return _context.finish(41);

        case 49:
          _iteratorNormalCompletion = true;
          _context.next = 8;
          break;

        case 52:
          _context.next = 58;
          break;

        case 54:
          _context.prev = 54;
          _context.t2 = _context["catch"](6);
          _didIteratorError = true;
          _iteratorError = _context.t2;

        case 58:
          _context.prev = 58;
          _context.prev = 59;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 61:
          _context.prev = 61;

          if (!_didIteratorError) {
            _context.next = 64;
            break;
          }

          throw _iteratorError;

        case 64:
          return _context.finish(61);

        case 65:
          return _context.finish(58);

        case 66:
          conTypes = {
            AL: 0.05,
            CM: 0.05,
            PA: 0.05,
            CT: 0.05,
            SH: 0.05,
            EH: 0.05,
            CP: 0.05,
            ES: 0.05,
            DW: 0.05,
            FW: 0.05,
            VC: 0.05
          };
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context.prev = 70;

          for (_iterator2 = newStore.createGame.relations[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            _i2 = _step2.value;

            if (_i2.pair.length == 2) {
              changer = -1;
              _i2.value = _i2.value + changer;

              for (_i3 = 0, _Object$keys2 = Object.keys(conTypes); _i3 < _Object$keys2.length; _i3++) {
                c = _Object$keys2[_i3];

                if (conTypes[c] * _i2.value) {
                  /* Создаем контракт */
                }
              }
            }
          }

          _context.next = 78;
          break;

        case 74:
          _context.prev = 74;
          _context.t3 = _context["catch"](70);
          _didIteratorError2 = true;
          _iteratorError2 = _context.t3;

        case 78:
          _context.prev = 78;
          _context.prev = 79;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 81:
          _context.prev = 81;

          if (!_didIteratorError2) {
            _context.next = 84;
            break;
          }

          throw _iteratorError2;

        case 84:
          return _context.finish(81);

        case 85:
          return _context.finish(78);

        case 86:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 54, 58, 66], [14, 18, 22, 30], [23,, 25, 29], [33, 37, 41, 49], [42,, 44, 48], [59,, 61, 65], [70, 74, 78, 86], [79,, 81, 85]]);
}