"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = nextStep;

var _otherFunctions = require("./otherFunctions");

var _identCountries = _interopRequireDefault(require("./identCountries"));

var _neuroFunctions = require("./neuroFunctions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function nextStep(store, func) {
  var newStore, newCountry, newBuff, easyBuff, easyRegionBuff, countRegionBuff, hardRegionBuff, countryBuffs, regionBuffs, buffer, outBufferClass, outBuffer, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, reg, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, _reg3, hashGovernmentBuffs, hashAreaFormatBuffs, currentGovernment, currentGovernmentOpts, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _loop, _iterator8, _step8, currentAreaFormat, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _loop2, _iterator9, _step9, hashArmyBuffs, currentArmySalaryOpts, armySalaryKoef, diffArmy, koef, _i7, _Object$keys6, _i76, typer, _i77, _Object$keys53, f, _i8, _Object$keys7, _i78, _typer, _i79, _Object$keys54, _f, _i9, _Object$keys8, _i80, _typer2, _i81, _Object$keys55, _f2, currentArmyMaintainOpts, armyMaintainKoef, _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, param, ind, _i82, _Object$keys56, _type17, _i83, _Object$keys57, buff, currentArmyEquipOpts, armyEquipKoef, _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step11, _param, _ind, _i84, _Object$keys58, _type18, _i85, _Object$keys59, _buff, unemploy, unemployHasher, _i10, _Object$keys9, i, _i11, _Object$keys10, type, _i12, _Object$keys11, _i13, _i14, _Object$keys12, _type, _i15, _Object$keys13, _i16, _i17, _Object$keys14, _type2, _i18, _Object$keys15, _i19, _i20, _Object$keys16, _type3, _i21, _Object$keys17, _i22, _i23, _Object$keys18, _type4, poverty, povertyHasher, _i24, _Object$keys19, _i25, _i26, _Object$keys20, _type5, _i27, _Object$keys21, _i28, _i29, _Object$keys22, _type6, _i30, _Object$keys23, _i31, _i32, _Object$keys24, _type7, _i33, _Object$keys25, _i34, _i35, _Object$keys26, _type8, _i36, _Object$keys27, _i37, _i38, _Object$keys28, _type9, _i39, _Object$keys29, _i40, _i41, _Object$keys30, _type10, inflation, inflationHasher, _i42, _Object$keys31, _i43, _i44, _Object$keys32, _type11, _i45, _Object$keys33, _i46, _i47, _Object$keys34, _type12, _i48, _Object$keys35, _i49, _i50, _Object$keys36, _type13, _i51, _Object$keys37, _i52, _i53, _Object$keys38, _type14, _i54, _Object$keys39, _i55, _i56, _Object$keys40, _type15, _i57, _Object$keys41, _i58, _i59, _Object$keys42, _type16, physTax, jurTax, taxHasher, _i60, _Object$keys43, _type19, _i86, _Object$keys60, ch, _i61, _Object$keys44, _type20, _i87, _Object$keys61, _ch, _i62, _Object$keys45, _i88, budget, budgetHasher, _i63, _Object$keys46, item, _i89, _Object$keys62, _type21, _i90, _Object$keys63, _i91, _i64, _Object$keys47, _i92, _iteratorNormalCompletion12, _didIteratorError12, _iteratorError12, _iterator12, _step12, _i93, _i94, _Object$keys64, prop, balance, percent, _koef2, relations, _iteratorNormalCompletion13, _didIteratorError13, _iteratorError13, _iterator13, _step13, _i95, setRelation, _i66, _relations, _i96, country, _i97, _Object$keys65, law, contracts, livedContracts, _iteratorNormalCompletion15, _didIteratorError15, _iteratorError15, _iterator15, _step15, _i98, newsArr, newsObj, priorityContracts, deadlineContracts, abbrContracts, relationContracts, _iteratorNormalCompletion16, _didIteratorError16, _iteratorError16, _iterator16, _step16, _i99, conCountry, conContract, typeChange, relation, approv, newspaper, redactStatus, conBuff, randomKoef, economyProp, output, war, _iteratorNormalCompletion23, _didIteratorError23, _iteratorError23, _iterator23, _step23, _i100, peace, _iteratorNormalCompletion24, _didIteratorError24, _iteratorError24, _iterator24, _step24, _i101, ownRegs, newOwnRegs, enemyRegs, newEnemyRegs, _iteratorNormalCompletion25, _didIteratorError25, _iteratorError25, _iterator25, _step25, _i102, whose, _iteratorNormalCompletion26, _didIteratorError26, _iteratorError26, _iterator26, _step26, _i103, _iteratorNormalCompletion27, _didIteratorError27, _iteratorError27, _iterator27, _step27, _i104, changerCont, _iteratorNormalCompletion28, _didIteratorError28, _iteratorError28, _iterator28, _step28, _i105, cont, _iteratorNormalCompletion29, _didIteratorError29, _iteratorError29, _iterator29, _step29, _i106, _peace, _iteratorNormalCompletion30, _didIteratorError30, _iteratorError30, _iterator30, _step30, _i107, _war, newContracts, _iteratorNormalCompletion31, _didIteratorError31, _iteratorError31, _iterator31, _step31, _i108, regs, _iteratorNormalCompletion32, _didIteratorError32, _iteratorError32, _iterator32, _step32, _i109, _iteratorNormalCompletion34, _didIteratorError34, _iteratorError34, _iterator34, _step34, c, _iteratorNormalCompletion33, _didIteratorError33, _iteratorError33, _iterator33, _step33, _c, _iteratorNormalCompletion35, _didIteratorError35, _iteratorError35, _iterator35, _step35, _i110, lawBuffer, _i67, _Object$keys48, _law, inverseBuff, _i111, _Object$keys66, _type22, _i112, _Object$keys67, bf, social_koef, avg_salary, transport_koef, science_koef, education_koef, getEconomyRegSum, _iteratorNormalCompletion17, _didIteratorError17, _iteratorError17, _iterator17, _step17, _i113, loss, lossCauseStabil, lossCauseSupport, win, _i69, _relations2, _i114, _iteratorNormalCompletion36, _didIteratorError36, _iteratorError36, _iterator36, _step36, t, newCountryAI, _iteratorNormalCompletion18, _didIteratorError18, _iteratorError18, _loop3, _iterator18, _step18, mapper_correct, _iteratorNormalCompletion22, _didIteratorError22, _iteratorError22, _iterator22, _step22, _i115;

  return regeneratorRuntime.async(function nextStep$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          getEconomyRegSum = function _ref4(reg, ind) {
            var summ = 0;

            for (var _i68 = 0, _Object$keys49 = Object.keys(reg); _i68 < _Object$keys49.length; _i68++) {
              var t = _Object$keys49[_i68];

              if (t.startsWith('industry') && t !== ind) {
                summ = summ + parseInt(reg[t]);
              }
            }

            return summ;
          };

          setRelation = function _ref3(country, increment) {
            var _iteratorNormalCompletion14 = true;
            var _didIteratorError14 = false;
            var _iteratorError14 = undefined;

            try {
              for (var _iterator14 = relations[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                var _i65 = _step14.value;

                if (_i65.ident === country) {
                  _i65.value = _i65.value + increment;
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
          };

          regionBuffs = function _ref2(hash) {
            for (var _i2 = 0, _Object$keys2 = Object.keys(hash); _i2 < _Object$keys2.length; _i2++) {
              var i = _Object$keys2[_i2];

              if (i === "industry") {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                  for (var _iterator = newCountry.regions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var reg = _step.value;

                    for (var _i3 = 0, _Object$keys3 = Object.keys(reg); _i3 < _Object$keys3.length; _i3++) {
                      var ch = _Object$keys3[_i3];

                      if (ch.startsWith("industry")) {
                        reg[ch] = reg[ch] + hash[i] * reg[ch] * (reg.name === newCountry.capital.name ? 1.1 : 1);
                      }
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

                continue;
              }

              if (hardRegionBuff.includes(i)) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                  for (var _iterator2 = newCountry.regions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _reg = _step2.value;
                    _reg[i] = _reg[i] + hash[i] * _reg[i] * (_reg.name === newCountry.capital.name ? 1.1 : 1);
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

                continue;
              }

              if (countRegionBuff.includes(i)) {
                for (var ind = 0; ind < hash[i]; ind++) {
                  var _koef = Math.floor(Math.random() * newCountry.regions.length);

                  newCountry.regions[_koef][i] = newCountry.regions[_koef][i] + 1;
                }

                continue;
              }

              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;

              try {
                for (var _iterator3 = newCountry.regions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  var _reg2 = _step3.value;
                  _reg2[i] = _reg2[i] + hash[i];
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
            }
          };

          countryBuffs = function _ref(hash) {
            for (var _i = 0, _Object$keys = Object.keys(hash); _i < _Object$keys.length; _i++) {
              var i = _Object$keys[_i];

              if (i === "army_quality") {
                newBuff[i] = newBuff[i] + hash[i];
              } else {
                newCountry[i] = newCountry[i] + hash[i];
              }
            }
          };

          newStore = Object.assign({}, store.createGame);
          newCountry = Object.assign({}, store.createGame.country);
          newBuff = Object.assign({}, store.createGame.buffs);
          easyBuff = ["support", "stability", "inflation", "alchemy", "science", "magic", "technology", "education_quality"];
          easyRegionBuff = ["poverty", "unemployment", "infrastructure", "stone_road", "pave_road", "port"];
          countRegionBuff = ["aqueducs", "schools", "universities"];
          hardRegionBuff = ["population", "avg_salary", "industry_blackmetall", "industry_colormetall", "industry_coal", "industry_hunting", "industry_fishing", "industry_forestry", "industry_blacksmith", "industry_animals", "industry_vegetable", "industry_wheat", "industry_typography", "industry_light", "industry_eating", "industry_jewelry", "industry_transport", "industry_alchemy", "industry_hiring", "industry_culture", "industry_other"];
          buffer = {
            country: {
              army_quality: 0.01,
              alchemy: 0.005,
              education_avail: 0.006,
              education_quality: 0.005,
              export_trash: 0.005,
              inflation: 0.0025,
              magic: 0.005,
              science: 0.005,
              stability: 0.005,
              support: 0.005,
              technology: 0.005
            },
            regions: {
              aqueducs: 0,
              cargo_ship: 0.005,
              people_ship: 0.005,
              port: 0.005,
              industry: 0.004,
              infrastructure: 0.005,
              pave_road: 0.005,
              stone_road: 0.0025,
              avg_salary: 0.006,
              schools: 0,
              universities: 0,
              poverty: -0.0008,
              unemployment: -0.0008,
              population: 0.0005
            }
          };

          outBufferClass =
          /*#__PURE__*/
          function () {
            function outBufferClass() {
              _classCallCheck(this, outBufferClass);

              this.outBuffer = {
                country: {
                  army_quality: 0.01,
                  alchemy: 0.005,
                  education_avail: 0.006,
                  education_quality: 0.005,
                  export_trash: 0.005,
                  inflation: 0.0025,
                  magic: 0.005,
                  science: 0.005,
                  stability: 0.005,
                  support: 0.005,
                  technology: 0.005
                },
                regions: {
                  aqueducs: 0,
                  cargo_ship: 0.005,
                  people_ship: 0.005,
                  port: 0.005,
                  industry: 0.004,
                  infrastructure: 0.005,
                  pave_road: 0.005,
                  stone_road: 0.0025,
                  avg_salary: 0.006,
                  schools: 0,
                  universities: 0,
                  poverty: -0.0008,
                  unemployment: -0.0008,
                  population: 0.0005
                }
              };
            }

            _createClass(outBufferClass, [{
              key: "add",
              value: function add(hash) {
                for (var _i4 = 0, _Object$keys4 = Object.keys(hash); _i4 < _Object$keys4.length; _i4++) {
                  var dir = _Object$keys4[_i4];

                  for (var _i5 = 0, _Object$keys5 = Object.keys(hash[dir]); _i5 < _Object$keys5.length; _i5++) {
                    var type = _Object$keys5[_i5];
                    var val = hash[dir][type];
                    this.outBuffer[dir][type] = +this.outBuffer[dir][type].toFixed(5) + +(buffer[dir][type] * val).toFixed(5);
                  }
                }
              }
            }, {
              key: "show",
              value: function show() {
                return this.outBuffer;
              }
            }, {
              key: "commit",
              value: function commit() {
                countryBuffs(this.outBuffer.country);
                regionBuffs(this.outBuffer.regions);
              }
            }]);

            return outBufferClass;
          }();

          outBuffer = new outBufferClass(); // Применение основных баффов за данный ход

          newBuff.actions = 10;
          newBuff.step = newBuff.step + 1;
          newCountry["education_avail"] = newCountry["education_avail"] + newBuff["education_access"] * newCountry["education_avail"];
          newCountry["export_trash"] = newCountry["export_trash"] + newBuff["trash"] * newCountry["export_trash"];
          _iteratorNormalCompletion4 = true;
          _didIteratorError4 = false;
          _iteratorError4 = undefined;
          _context.prev = 21;

          for (_iterator4 = newCountry.regions[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            reg = _step4.value;
            reg["cargo_ship"] = reg["cargo_ship"] + newBuff["delivery_box"] * reg["cargo_ship"] * (reg.name === newCountry.capital.name ? 1.1 : 1);
          }

          _context.next = 29;
          break;

        case 25:
          _context.prev = 25;
          _context.t0 = _context["catch"](21);
          _didIteratorError4 = true;
          _iteratorError4 = _context.t0;

        case 29:
          _context.prev = 29;
          _context.prev = 30;

          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }

        case 32:
          _context.prev = 32;

          if (!_didIteratorError4) {
            _context.next = 35;
            break;
          }

          throw _iteratorError4;

        case 35:
          return _context.finish(32);

        case 36:
          return _context.finish(29);

        case 37:
          _iteratorNormalCompletion5 = true;
          _didIteratorError5 = false;
          _iteratorError5 = undefined;
          _context.prev = 40;

          for (_iterator5 = newCountry.regions[Symbol.iterator](); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            _reg3 = _step5.value;
            _reg3["people_ship"] = _reg3["people_ship"] + newBuff["delivery_people"] * _reg3["people_ship"] * (_reg3.name === newCountry.capital.name ? 1.1 : 1);
          }

          _context.next = 48;
          break;

        case 44:
          _context.prev = 44;
          _context.t1 = _context["catch"](40);
          _didIteratorError5 = true;
          _iteratorError5 = _context.t1;

        case 48:
          _context.prev = 48;
          _context.prev = 49;

          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }

        case 51:
          _context.prev = 51;

          if (!_didIteratorError5) {
            _context.next = 54;
            break;
          }

          throw _iteratorError5;

        case 54:
          return _context.finish(51);

        case 55:
          return _context.finish(48);

        case 56:
          easyBuff.map(function (e) {
            newCountry[e] = newCountry[e] + newBuff[e];
            newBuff[e] = 0;
            return null;
          });
          easyRegionBuff.map(function (e) {
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
              for (var _iterator6 = newCountry.regions[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                var i = _step6.value;
                i[e] = i[e] + newBuff[e];
                newBuff[e] = 0;
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

            return null;
          });
          hardRegionBuff.map(function (e) {
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
              for (var _iterator7 = newCountry.regions[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                var i = _step7.value;
                i[e] = i[e] + newBuff[e] * i[e] * (i.name === newCountry.capital.name ? 1.1 : 1);
                newBuff[e] = 0;
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

            return null;
          });
          countRegionBuff.map(function (e) {
            var fullCycle = parseInt(newBuff[e] / newCountry.regions.length);
            var shortCycle = newBuff[e] % newCountry.regions.length;

            while (fullCycle > 0) {
              for (var i = 0; i < newCountry.regions.length; i++) {
                newCountry.regions[i][e] = newCountry.regions[i][e] + 1;
              }

              fullCycle--;
            }

            for (var _i6 = 0; _i6 < shortCycle; _i6++) {
              newCountry.regions[_i6][e] = newCountry.regions[_i6][e] + 1;
            }

            newBuff[e] = 0;
            return null;
          }); // Баффы "Политика"

          hashGovernmentBuffs = {
            M: {
              initial: {
                country: {
                  army_quality: 0.4,
                  education_avail: -0.5,
                  inflation: 0.1,
                  magic: -0.3,
                  science: -0.3,
                  stability: 0.8,
                  support: -0.4,
                  technology: -0.3
                },
                regions: {
                  industry: -0.1,
                  infrastructure: -0.15,
                  avg_salary: -0.1,
                  poverty: -0.15,
                  unemployment: -0.15
                }
              },
              additional: [{
                country: {
                  stability: 0.2,
                  support: -0.3
                },
                regions: {
                  industry: -0.05,
                  infrastructure: -0.05,
                  unemployment: -0.15
                }
              }, {
                country: {
                  education_avail: -0.15,
                  education_quality: 0.15,
                  magic: -0.1,
                  science: 0.1,
                  stability: 0.2
                },
                regions: {
                  cargo_ship: -0.1,
                  people_ship: -0.1
                }
              }]
            },
            O: {
              initial: {
                country: {
                  army_quality: 0.2,
                  inflation: 0.15,
                  magic: -0.2,
                  science: 0.15,
                  stability: 0.4,
                  support: -0.25,
                  technology: -0.15
                },
                regions: {
                  industry: 0.1,
                  infrastructure: -0.1,
                  avg_salary: -0.1,
                  poverty: -0.15,
                  unemployment: -0.1
                }
              },
              additional: [{
                country: {
                  education_quality: 0.1,
                  magic: -0.1,
                  science: 0.1,
                  stability: 0.15,
                  support: -0.1,
                  technology: -0.05
                },
                regions: {
                  poverty: 0.05,
                  unemployment: -0.1
                }
              }, {
                country: {
                  education_avail: -0.15,
                  education_quality: 0.15,
                  magic: -0.15,
                  science: 0.15,
                  stability: 0.2
                },
                regions: {
                  cargo_ship: -0.05,
                  people_ship: -0.05
                }
              }]
            },
            R: {
              initial: {
                country: {
                  army_quality: -0.05,
                  alchemy: 0.25,
                  education_avail: -0.2,
                  education_quality: 0.2,
                  inflation: 0.2,
                  magic: 0.15,
                  science: -0.1,
                  stability: -0.4,
                  technology: 0.2
                },
                regions: {
                  industry: 0.3,
                  infrastructure: 0.1,
                  avg_salary: -0.1,
                  poverty: -0.2,
                  unemployment: 0.1
                }
              },
              additional: [{
                country: {
                  education_avail: 0.1,
                  export_trash: 0.1,
                  science: -0.05,
                  stability: -0.2,
                  support: 0.25
                },
                regions: {
                  industry: -0.05,
                  avg_salary: 0.05,
                  poverty: -0.1,
                  unemployment: 0.15
                }
              }, {
                country: {
                  education_quality: -0.15,
                  magic: 0.1,
                  stability: -0.2,
                  support: 0.15,
                  technology: -0.05
                },
                regions: {
                  poverty: -0.05,
                  unemployment: -0.05
                }
              }]
            },
            D: {
              initial: {
                country: {
                  army_quality: 0.4,
                  alchemy: -0.1,
                  education_avail: 0.2,
                  education_quality: -0.2,
                  inflation: 0.25,
                  magic: 0.25,
                  science: 0.2,
                  stability: 0.35,
                  support: -0.3,
                  technology: 0.2
                },
                regions: {
                  industry: 0.2,
                  infrastructure: 0.1,
                  avg_salary: -0.1,
                  poverty: 0.2,
                  unemployment: -0.2
                }
              },
              additional: [{
                country: {
                  education_quality: -0.15,
                  stability: 0.2,
                  support: -0.2
                },
                regions: {
                  industry: -0.05,
                  poverty: 0.05
                }
              }, {
                country: {
                  education_avail: -0.1,
                  science: -0.1,
                  stability: 0.15,
                  support: -0.15,
                  technology: -0.05
                },
                regions: {}
              }]
            }
          };
          hashAreaFormatBuffs = {
            budget: {
              country: {
                alchemy: -0.25,
                education_avail: -0.25,
                education_quality: 0.2,
                export_trash: -0.2,
                magic: -0.2,
                science: -0.2,
                support: 0.2,
                technology: 0.2
              },
              regions: {
                cargo_ship: -0.35,
                people_ship: -0.35,
                port: -0.35,
                infrastructure: -0.3,
                pave_road: -0.15,
                stone_road: -0.1,
                avg_salary: 0.1,
                poverty: -0.15,
                unemployment: 0.15
              }
            },
            laws: {
              country: {
                education_avail: 0.25,
                education_quality: -0.25,
                science: 0.25,
                stability: -0.3,
                technology: 0.25
              },
              regions: {
                industry: 0.15,
                avg_salary: 0.05,
                poverty: 0.1,
                unemployment: 0.1
              }
            },
            police: {
              country: {
                stability: -0.35,
                support: 0.15
              },
              regions: {
                cargo_ship: 0.15,
                people_ship: 0.15,
                port: -0.15,
                infrastructure: 0.15,
                pave_road: -0.05,
                stone_road: -0.03
              }
            },
            localGovernment: {
              country: {
                education_quality: 0.15,
                export_trash: -0.2,
                stability: 0.2,
                support: -0.35
              },
              regions: {
                port: 0.1
              }
            }
          };
          currentGovernment = Object.assign({}, hashGovernmentBuffs[newCountry.government.split(",")[0]]);
          currentGovernmentOpts = newCountry.government.split(",").slice(1);
          outBuffer.add(currentGovernment.initial);
          _iteratorNormalCompletion8 = true;
          _didIteratorError8 = false;
          _iteratorError8 = undefined;
          _context.prev = 68;

          _loop = function _loop() {
            var i = _step8.value;
            var hash = currentGovernment.additional[currentGovernmentOpts.indexOf(i)];

            if (+i === 1) {
              ["country", "regions"].map(function (e) {
                for (var _i74 = 0, _Object$keys51 = Object.keys(hash[e]); _i74 < _Object$keys51.length; _i74++) {
                  var sec = _Object$keys51[_i74];
                  hash[e][sec] = -hash[e][sec];
                }

                return null;
              });
            }

            outBuffer.add(hash);
          };

          for (_iterator8 = currentGovernmentOpts[Symbol.iterator](); !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            _loop();
          }

          _context.next = 77;
          break;

        case 73:
          _context.prev = 73;
          _context.t2 = _context["catch"](68);
          _didIteratorError8 = true;
          _iteratorError8 = _context.t2;

        case 77:
          _context.prev = 77;
          _context.prev = 78;

          if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
            _iterator8["return"]();
          }

        case 80:
          _context.prev = 80;

          if (!_didIteratorError8) {
            _context.next = 83;
            break;
          }

          throw _iteratorError8;

        case 83:
          return _context.finish(80);

        case 84:
          return _context.finish(77);

        case 85:
          currentAreaFormat = newCountry.area_format.split(",");
          _iteratorNormalCompletion9 = true;
          _didIteratorError9 = false;
          _iteratorError9 = undefined;
          _context.prev = 89;

          _loop2 = function _loop2() {
            var i = _step9.value;
            var hash = hashAreaFormatBuffs[Object.keys(hashAreaFormatBuffs)[currentAreaFormat.indexOf(i)]];

            if (+i === 1) {
              ["country", "regions"].map(function (e) {
                for (var _i75 = 0, _Object$keys52 = Object.keys(hash[e]); _i75 < _Object$keys52.length; _i75++) {
                  var sec = _Object$keys52[_i75];
                  hash[e][sec] = -hash[e][sec];
                }

                return null;
              });
            }

            outBuffer.add(hash);
          };

          for (_iterator9 = currentAreaFormat[Symbol.iterator](); !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            _loop2();
          } // Баффы "Армия"


          _context.next = 98;
          break;

        case 94:
          _context.prev = 94;
          _context.t3 = _context["catch"](89);
          _didIteratorError9 = true;
          _iteratorError9 = _context.t3;

        case 98:
          _context.prev = 98;
          _context.prev = 99;

          if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
            _iterator9["return"]();
          }

        case 101:
          _context.prev = 101;

          if (!_didIteratorError9) {
            _context.next = 104;
            break;
          }

          throw _iteratorError9;

        case 104:
          return _context.finish(101);

        case 105:
          return _context.finish(98);

        case 106:
          hashArmyBuffs = {
            army_salary: [{
              country: {
                army_quality: 0.25,
                support: 0.3
              },
              regions: {}
            }, {
              country: {
                army_quality: 0.25,
                stability: 0.3,
                support: 0.25
              },
              regions: {
                poverty: 0.2,
                unemployment: 0.2
              }
            }, {
              country: {
                army_quality: 0.2,
                support: 0.3
              },
              regions: {
                poverty: 0.2
              }
            }],
            army_maintain: [{
              country: {
                army_quality: 0.25,
                support: 0.1
              },
              regions: {}
            }, {
              country: {
                army_quality: 0.3,
                export_trash: 0.1,
                technology: 0.15
              },
              regions: {
                port: 0.2,
                infrastructure: 0.3,
                pave_road: 0.1,
                stone_road: 0.05
              }
            }, {
              country: {
                army_quality: 0.3,
                alchemy: 0.1,
                export_trash: 0.1,
                support: 0.15
              },
              regions: {}
            }],
            army_equip: [{
              country: {
                army_quality: 0.5
              },
              regions: {}
            }, {
              country: {
                army_quality: 0.2
              },
              regions: {}
            }, {
              country: {
                army_quality: 0.3,
                support: 0.15
              },
              regions: {}
            }]
          };
          currentArmySalaryOpts = newCountry.army_salary.split(",");
          armySalaryKoef = {
            0: {
              1: 2,
              2: 1,
              3: -1,
              4: -2
            },
            1: {
              0: -3,
              1: -2,
              2: 1,
              3: 2,
              4: 3
            },
            2: {
              0: -3,
              1: -2,
              2: 1,
              3: 2,
              4: 3
            }
          };
          diffArmy = 0;
          koef = "0";

          for (_i7 = 0, _Object$keys6 = Object.keys(hashArmyBuffs.army_salary[0]); _i7 < _Object$keys6.length; _i7++) {
            _i76 = _Object$keys6[_i7];
            typer = hashArmyBuffs.army_salary[0][_i76];

            for (_i77 = 0, _Object$keys53 = Object.keys(typer); _i77 < _Object$keys53.length; _i77++) {
              f = _Object$keys53[_i77];
              typer[f] = typer[f] * armySalaryKoef[0][currentArmySalaryOpts[0]];
            }
          }

          outBuffer.add(hashArmyBuffs.army_salary[0]);
          diffArmy = parseInt(currentArmySalaryOpts[1]) - (0, _otherFunctions.getAvgSalary)(newCountry, false);
          koef = "2";

          if (-350 < diffArmy < -150) {
            koef = "1";
          } else if (diffArmy < -350) {
            koef = "0";
          } else if (150 < diffArmy < 350) {
            koef = "3";
          } else if (350 < diffArmy) {
            koef = "4";
          }

          for (_i8 = 0, _Object$keys7 = Object.keys(hashArmyBuffs.army_salary[1]); _i8 < _Object$keys7.length; _i8++) {
            _i78 = _Object$keys7[_i8];
            _typer = hashArmyBuffs.army_salary[1][_i78];

            for (_i79 = 0, _Object$keys54 = Object.keys(_typer); _i79 < _Object$keys54.length; _i79++) {
              _f = _Object$keys54[_i79];
              _typer[_f] = _typer[_f] * armySalaryKoef[1][currentArmySalaryOpts[koef]];
            }
          }

          outBuffer.add(hashArmyBuffs.army_salary[1]);
          diffArmy = parseInt(currentArmySalaryOpts[2]) - newCountry.avg_pension;
          koef = "2";

          if (-350 < diffArmy < -150) {
            koef = "1";
          } else if (diffArmy < -350) {
            koef = "0";
          } else if (150 < diffArmy < 350) {
            koef = "3";
          } else if (350 < diffArmy) {
            koef = "4";
          }

          for (_i9 = 0, _Object$keys8 = Object.keys(hashArmyBuffs.army_salary[2]); _i9 < _Object$keys8.length; _i9++) {
            _i80 = _Object$keys8[_i9];
            _typer2 = hashArmyBuffs.army_salary[0][_i80];

            for (_i81 = 0, _Object$keys55 = Object.keys(_typer2); _i81 < _Object$keys55.length; _i81++) {
              _f2 = _Object$keys55[_i81];
              _typer2[_f2] = _typer2[_f2] * armySalaryKoef[2][currentArmySalaryOpts[koef]];
            }
          }

          outBuffer.add(hashArmyBuffs.army_salary[2]);
          currentArmyMaintainOpts = newCountry.army_maintain.split(",");
          armyMaintainKoef = {
            0: {
              1: -2,
              2: -1,
              3: 1,
              4: 2
            },
            1: {
              1: -1,
              2: 1,
              3: 2
            },
            2: {
              1: -1,
              2: 1,
              3: 2
            }
          };
          _iteratorNormalCompletion10 = true;
          _didIteratorError10 = false;
          _iteratorError10 = undefined;
          _context.prev = 128;

          for (_iterator10 = hashArmyBuffs.army_maintain[Symbol.iterator](); !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            param = _step10.value;
            ind = hashArmyBuffs.army_maintain.indexOf(param);

            for (_i82 = 0, _Object$keys56 = Object.keys(param); _i82 < _Object$keys56.length; _i82++) {
              _type17 = _Object$keys56[_i82];

              for (_i83 = 0, _Object$keys57 = Object.keys(param[_type17]); _i83 < _Object$keys57.length; _i83++) {
                buff = _Object$keys57[_i83];
                param[_type17][buff] = param[_type17][buff] * armyMaintainKoef[ind][currentArmyMaintainOpts[ind]];
              }
            }

            outBuffer.add(param);
          }

          _context.next = 136;
          break;

        case 132:
          _context.prev = 132;
          _context.t4 = _context["catch"](128);
          _didIteratorError10 = true;
          _iteratorError10 = _context.t4;

        case 136:
          _context.prev = 136;
          _context.prev = 137;

          if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
            _iterator10["return"]();
          }

        case 139:
          _context.prev = 139;

          if (!_didIteratorError10) {
            _context.next = 142;
            break;
          }

          throw _iteratorError10;

        case 142:
          return _context.finish(139);

        case 143:
          return _context.finish(136);

        case 144:
          currentArmyEquipOpts = newCountry.army_equip.split(",");
          armyEquipKoef = {
            0: {
              1: -2,
              2: -1,
              3: 1,
              4: 2,
              5: 3
            },
            1: {
              1: -1,
              2: 0,
              3: 1,
              4: 2
            },
            2: {
              1: -1,
              2: 1,
              3: 2
            }
          };
          _iteratorNormalCompletion11 = true;
          _didIteratorError11 = false;
          _iteratorError11 = undefined;
          _context.prev = 149;

          for (_iterator11 = hashArmyBuffs.army_equip[Symbol.iterator](); !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
            _param = _step11.value;
            _ind = hashArmyBuffs.army_equip.indexOf(_param);

            for (_i84 = 0, _Object$keys58 = Object.keys(_param); _i84 < _Object$keys58.length; _i84++) {
              _type18 = _Object$keys58[_i84];

              for (_i85 = 0, _Object$keys59 = Object.keys(_param[_type18]); _i85 < _Object$keys59.length; _i85++) {
                _buff = _Object$keys59[_i85];
                _param[_type18][_buff] = _param[_type18][_buff] * armyEquipKoef[_ind][currentArmyEquipOpts[_ind]];
              }
            }

            outBuffer.add(_param);
          } // Баффы "Экономика"


          _context.next = 157;
          break;

        case 153:
          _context.prev = 153;
          _context.t5 = _context["catch"](149);
          _didIteratorError11 = true;
          _iteratorError11 = _context.t5;

        case 157:
          _context.prev = 157;
          _context.prev = 158;

          if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
            _iterator11["return"]();
          }

        case 160:
          _context.prev = 160;

          if (!_didIteratorError11) {
            _context.next = 163;
            break;
          }

          throw _iteratorError11;

        case 163:
          return _context.finish(160);

        case 164:
          return _context.finish(157);

        case 165:
          unemploy = (0, _otherFunctions.getUnemployment)(newCountry, false);
          unemployHasher = {
            country: {
              alchemy: 0.15,
              magic: 0.15,
              science: 0.15,
              stability: 0.2,
              support: 0.2,
              technology: 0.15
            },
            regions: {
              industry: 0.2,
              avg_salary: 0.15,
              poverty: 0.15
            }
          };

          if (unemploy >= 0.2) {
            for (_i10 = 0, _Object$keys9 = Object.keys(unemployHasher); _i10 < _Object$keys9.length; _i10++) {
              i = _Object$keys9[_i10];

              for (_i11 = 0, _Object$keys10 = Object.keys(unemployHasher[i]); _i11 < _Object$keys10.length; _i11++) {
                type = _Object$keys10[_i11];
                unemployHasher[i][type] = unemployHasher[i][type] * unemploy * -10;
              }
            }
          } else if (unemploy >= 0.15) {
            for (_i12 = 0, _Object$keys11 = Object.keys(unemployHasher); _i12 < _Object$keys11.length; _i12++) {
              _i13 = _Object$keys11[_i12];

              for (_i14 = 0, _Object$keys12 = Object.keys(unemployHasher[_i13]); _i14 < _Object$keys12.length; _i14++) {
                _type = _Object$keys12[_i14];
                unemployHasher[_i13][_type] = unemployHasher[_i13][_type] * unemploy * -8;
              }
            }
          } else if (unemploy >= 0.1) {
            for (_i15 = 0, _Object$keys13 = Object.keys(unemployHasher); _i15 < _Object$keys13.length; _i15++) {
              _i16 = _Object$keys13[_i15];

              for (_i17 = 0, _Object$keys14 = Object.keys(unemployHasher[_i16]); _i17 < _Object$keys14.length; _i17++) {
                _type2 = _Object$keys14[_i17];
                unemployHasher[_i16][_type2] = unemployHasher[_i16][_type2] * (0.2 - unemploy) * 30;
              }
            }
          } else if (unemploy >= 0.05) {
            for (_i18 = 0, _Object$keys15 = Object.keys(unemployHasher); _i18 < _Object$keys15.length; _i18++) {
              _i19 = _Object$keys15[_i18];

              for (_i20 = 0, _Object$keys16 = Object.keys(unemployHasher[_i19]); _i20 < _Object$keys16.length; _i20++) {
                _type3 = _Object$keys16[_i20];
                unemployHasher[_i19][_type3] = unemployHasher[_i19][_type3] * (0.1 - unemploy) * 30;
              }
            }
          } else {
            for (_i21 = 0, _Object$keys17 = Object.keys(unemployHasher); _i21 < _Object$keys17.length; _i21++) {
              _i22 = _Object$keys17[_i21];

              for (_i23 = 0, _Object$keys18 = Object.keys(unemployHasher[_i22]); _i23 < _Object$keys18.length; _i23++) {
                _type4 = _Object$keys18[_i23];
                unemployHasher[_i22][_type4] = unemployHasher[_i22][_type4] * (0.1 - unemploy) * 50;
              }
            }
          }

          outBuffer.add(unemployHasher);
          poverty = (0, _otherFunctions.getPoverty)(newCountry, false);
          povertyHasher = {
            country: {
              education_avail: 0.3,
              stability: 0.2,
              support: 0.2
            },
            regions: {
              industry: 0.1,
              infrastructure: 0.2,
              pave_road: 0.1,
              stone_road: 0.05,
              population: 0.015
            }
          };

          if (poverty >= 0.5) {
            for (_i24 = 0, _Object$keys19 = Object.keys(povertyHasher); _i24 < _Object$keys19.length; _i24++) {
              _i25 = _Object$keys19[_i24];

              for (_i26 = 0, _Object$keys20 = Object.keys(povertyHasher[_i25]); _i26 < _Object$keys20.length; _i26++) {
                _type5 = _Object$keys20[_i26];
                povertyHasher[_i25][_type5] = povertyHasher[_i25][_type5] * poverty * -15;
              }
            }
          } else if (poverty >= 0.35) {
            for (_i27 = 0, _Object$keys21 = Object.keys(povertyHasher); _i27 < _Object$keys21.length; _i27++) {
              _i28 = _Object$keys21[_i27];

              for (_i29 = 0, _Object$keys22 = Object.keys(povertyHasher[_i28]); _i29 < _Object$keys22.length; _i29++) {
                _type6 = _Object$keys22[_i29];
                povertyHasher[_i28][_type6] = povertyHasher[_i28][_type6] * poverty * -10;
              }
            }
          } else if (poverty >= 0.2) {
            for (_i30 = 0, _Object$keys23 = Object.keys(povertyHasher); _i30 < _Object$keys23.length; _i30++) {
              _i31 = _Object$keys23[_i30];

              for (_i32 = 0, _Object$keys24 = Object.keys(povertyHasher[_i31]); _i32 < _Object$keys24.length; _i32++) {
                _type7 = _Object$keys24[_i32];
                povertyHasher[_i31][_type7] = povertyHasher[_i31][_type7] * poverty * -7;
              }
            }
          } else if (poverty >= 0.1) {
            for (_i33 = 0, _Object$keys25 = Object.keys(povertyHasher); _i33 < _Object$keys25.length; _i33++) {
              _i34 = _Object$keys25[_i33];

              for (_i35 = 0, _Object$keys26 = Object.keys(povertyHasher[_i34]); _i35 < _Object$keys26.length; _i35++) {
                _type8 = _Object$keys26[_i35];
                povertyHasher[_i34][_type8] = povertyHasher[_i34][_type8] * (0.1 - poverty) * 8;
              }
            }
          } else if (poverty >= 0.05) {
            for (_i36 = 0, _Object$keys27 = Object.keys(povertyHasher); _i36 < _Object$keys27.length; _i36++) {
              _i37 = _Object$keys27[_i36];

              for (_i38 = 0, _Object$keys28 = Object.keys(povertyHasher[_i37]); _i38 < _Object$keys28.length; _i38++) {
                _type9 = _Object$keys28[_i38];
                povertyHasher[_i37][_type9] = povertyHasher[_i37][_type9] * (0.1 - poverty) * 30;
              }
            }
          } else {
            for (_i39 = 0, _Object$keys29 = Object.keys(povertyHasher); _i39 < _Object$keys29.length; _i39++) {
              _i40 = _Object$keys29[_i39];

              for (_i41 = 0, _Object$keys30 = Object.keys(povertyHasher[_i40]); _i41 < _Object$keys30.length; _i41++) {
                _type10 = _Object$keys30[_i41];
                povertyHasher[_i40][_type10] = povertyHasher[_i40][_type10] * (0.1 - poverty) * 50;
              }
            }
          }

          outBuffer.add(povertyHasher);
          inflation = newCountry.inflation;
          inflationHasher = {
            country: {
              stability: 0.2
            },
            regions: {
              industry: 0.4,
              infrastructure: 0.15,
              avg_salary: 0.2,
              poverty: 0.5
            }
          };

          if (inflation >= 0.5) {
            for (_i42 = 0, _Object$keys31 = Object.keys(inflationHasher); _i42 < _Object$keys31.length; _i42++) {
              _i43 = _Object$keys31[_i42];

              for (_i44 = 0, _Object$keys32 = Object.keys(inflationHasher[_i43]); _i44 < _Object$keys32.length; _i44++) {
                _type11 = _Object$keys32[_i44];

                if (_type11 === "industry") {
                  inflationHasher[_i43][_type11] = inflationHasher[_i43][_type11] * inflation * -5;
                } else {
                  inflationHasher[_i43][_type11] = inflationHasher[_i43][_type11] * inflation * -15;
                }
              }
            }
          } else if (inflation >= 0.2) {
            for (_i45 = 0, _Object$keys33 = Object.keys(inflationHasher); _i45 < _Object$keys33.length; _i45++) {
              _i46 = _Object$keys33[_i45];

              for (_i47 = 0, _Object$keys34 = Object.keys(inflationHasher[_i46]); _i47 < _Object$keys34.length; _i47++) {
                _type12 = _Object$keys34[_i47];

                if (_type12 === "industry") {
                  inflationHasher[_i46][_type12] = inflationHasher[_i46][_type12] * inflation * 7;
                } else {
                  inflationHasher[_i46][_type12] = inflationHasher[_i46][_type12] * inflation * -8;
                }
              }
            }
          } else if (inflation >= 0.1) {
            for (_i48 = 0, _Object$keys35 = Object.keys(inflationHasher); _i48 < _Object$keys35.length; _i48++) {
              _i49 = _Object$keys35[_i48];

              for (_i50 = 0, _Object$keys36 = Object.keys(inflationHasher[_i49]); _i50 < _Object$keys36.length; _i50++) {
                _type13 = _Object$keys36[_i50];

                if (_type13 === "industry") {
                  inflationHasher[_i49][_type13] = inflationHasher[_i49][_type13] * inflation * 15;
                } else {
                  inflationHasher[_i49][_type13] = inflationHasher[_i49][_type13] * inflation * -3;
                }
              }
            }
          } else if (inflation >= 0.06) {
            for (_i51 = 0, _Object$keys37 = Object.keys(inflationHasher); _i51 < _Object$keys37.length; _i51++) {
              _i52 = _Object$keys37[_i51];

              for (_i53 = 0, _Object$keys38 = Object.keys(inflationHasher[_i52]); _i53 < _Object$keys38.length; _i53++) {
                _type14 = _Object$keys38[_i53];

                if (_type14 === "industry") {
                  inflationHasher[_i52][_type14] = inflationHasher[_i52][_type14] * inflation * 15;
                } else {
                  inflationHasher[_i52][_type14] = inflationHasher[_i52][_type14] * inflation * 8;
                }
              }
            }
          } else if (inflation >= 0.02) {
            for (_i54 = 0, _Object$keys39 = Object.keys(inflationHasher); _i54 < _Object$keys39.length; _i54++) {
              _i55 = _Object$keys39[_i54];

              for (_i56 = 0, _Object$keys40 = Object.keys(inflationHasher[_i55]); _i56 < _Object$keys40.length; _i56++) {
                _type15 = _Object$keys40[_i56];

                if (_type15 === "industry") {
                  inflationHasher[_i55][_type15] = inflationHasher[_i55][_type15] * inflation * 10;
                } else {
                  inflationHasher[_i55][_type15] = inflationHasher[_i55][_type15] * inflation * 30;
                }
              }
            }
          } else {
            for (_i57 = 0, _Object$keys41 = Object.keys(inflationHasher); _i57 < _Object$keys41.length; _i57++) {
              _i58 = _Object$keys41[_i57];

              for (_i59 = 0, _Object$keys42 = Object.keys(inflationHasher[_i58]); _i59 < _Object$keys42.length; _i59++) {
                _type16 = _Object$keys42[_i59];

                if (_type16 === "industry") {
                  inflationHasher[_i58][_type16] = inflationHasher[_i58][_type16] * (0.3 - inflation) * -50;
                } else {
                  inflationHasher[_i58][_type16] = inflationHasher[_i58][_type16] * inflation * -50;
                }
              }
            }
          }

          outBuffer.add(inflationHasher);
          physTax = newCountry.tax_physic.split(" ");
          jurTax = newCountry.tax_jurid.split(" ");
          taxHasher = {
            phys: {
              country: {
                stability: -0.1,
                support: -0.15
              },
              regions: {
                industry: -0.1,
                infrastructure: -0.1,
                avg_salary: -0.05,
                population: 0.15,
                poverty: 0.15
              }
            },
            jur: {
              country: {
                inflation: 0.15,
                stability: -0.1,
                support: -0.15
              },
              regions: {
                industry: -0.3,
                avg_salary: -0.15,
                unemployment: 0.2
              }
            }
          };

          for (_i60 = 0, _Object$keys43 = Object.keys(taxHasher.phys); _i60 < _Object$keys43.length; _i60++) {
            _type19 = _Object$keys43[_i60];

            for (_i86 = 0, _Object$keys60 = Object.keys(taxHasher.phys[_type19]); _i86 < _Object$keys60.length; _i86++) {
              ch = _Object$keys60[_i86];

              if (ch === "population") {
                taxHasher.phys[_type19][ch] = taxHasher.phys[_type19][ch] * (1 - (+physTax[0] + +physTax[1]));
              } else {
                taxHasher.phys[_type19][ch] = taxHasher.phys[_type19][ch] * (+physTax[0] + +physTax[1]);
              }
            }
          }

          for (_i61 = 0, _Object$keys44 = Object.keys(taxHasher.jur); _i61 < _Object$keys44.length; _i61++) {
            _type20 = _Object$keys44[_i61];

            for (_i87 = 0, _Object$keys61 = Object.keys(taxHasher.jur[_type20]); _i87 < _Object$keys61.length; _i87++) {
              _ch = _Object$keys61[_i87];
              taxHasher.jur[_type20][_ch] = taxHasher.jur[_type20][_ch] * (+jurTax[0] + +jurTax[1] + +jurTax[2] + +jurTax[3]);
            }
          }

          for (_i62 = 0, _Object$keys45 = Object.keys(taxHasher); _i62 < _Object$keys45.length; _i62++) {
            _i88 = _Object$keys45[_i62];
            outBuffer.add(taxHasher[_i88]);
          } // Баффы "Бюджет"


          budget = {
            infras: newBuff.budget_infrastructure,
            educat: newBuff.budget_education,
            resear: newBuff.budget_research,
            propag: newBuff.budget_propaganda,
            govern: newBuff.budget_government
          };
          budgetHasher = {
            infras: {
              country: {
                export_trash: 1.25,
                support: 0.5
              },
              regions: {
                aqueducs: 5,
                cargo_ship: 1.25,
                people_ship: 1.25,
                port: 1.25,
                infrastructure: 1.25,
                pave_road: 1,
                stone_road: 1,
                population: 0.01
              }
            },
            educat: {
              country: {
                education_avail: 1.5,
                education_quality: 1.5,
                support: 0.5
              },
              regions: {
                schools: 5,
                universities: 2
              }
            },
            resear: {
              country: {
                alchemy: 1.25,
                magic: 1.25,
                science: 1.5,
                support: 0.5,
                technology: 1.25
              },
              regions: {}
            },
            propag: {
              country: {
                army_quality: 0.8,
                education_quality: 0.5,
                stability: 1.25,
                support: 1.75
              },
              regions: {}
            },
            govern: {
              country: {
                education_avail: 0.6,
                education_quality: 0.6,
                export_trash: 0.5,
                science: 0.5,
                stability: 0.8,
                technology: 0.5
              },
              regions: {
                port: 0.4,
                infrastructure: 0.25
              }
            }
          };

          for (_i63 = 0, _Object$keys46 = Object.keys(budgetHasher); _i63 < _Object$keys46.length; _i63++) {
            item = _Object$keys46[_i63];

            for (_i89 = 0, _Object$keys62 = Object.keys(budgetHasher[item]); _i89 < _Object$keys62.length; _i89++) {
              _type21 = _Object$keys62[_i89];

              for (_i90 = 0, _Object$keys63 = Object.keys(budgetHasher[item][_type21]); _i90 < _Object$keys63.length; _i90++) {
                _i91 = _Object$keys63[_i90];

                if (countRegionBuff.includes(_i91)) {
                  budgetHasher[item][_type21][_i91] = Math.round(budgetHasher[item][_type21][_i91] * (budget[item] - 0.4));
                } else {
                  budgetHasher[item][_type21][_i91] = budgetHasher[item][_type21][_i91] * (budget[item] - 0.5);
                }
              }
            }
          }

          for (_i64 = 0, _Object$keys47 = Object.keys(budgetHasher); _i64 < _Object$keys47.length; _i64++) {
            _i92 = _Object$keys47[_i64];
            outBuffer.add(budgetHasher[_i92]);
          }

          newBuff.kazna = newBuff.kazna + (0, _otherFunctions.getBalance)(newStore);
          _iteratorNormalCompletion12 = true;
          _didIteratorError12 = false;
          _iteratorError12 = undefined;
          _context.prev = 191;

          for (_iterator12 = newCountry.regions[Symbol.iterator](); !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
            _i93 = _step12.value;

            for (_i94 = 0, _Object$keys64 = Object.keys(_i93); _i94 < _Object$keys64.length; _i94++) {
              prop = _Object$keys64[_i94];

              if (prop.startsWith("industry")) {
                balance = _i93[prop] - _i93["needs_".concat(prop.split("_")[1])];
                percent = _i93[prop] / _i93["needs_".concat(prop.split("_")[1])];
                _i93[prop] = _i93[prop] + _i93[prop] * (balance > 0 ? 0.002 : 0.005) * (_i93.name === newCountry.capital.name ? 1.1 : 1);
                _koef2 = percent > 1.1 || percent < 0.9 ? -percent * (percent > 1.15 ? 1.25 : 2.5) : percent * 1.25;
                outBuffer.add({
                  country: {
                    alchemy: 0.05 * _koef2,
                    education_avail: 0.05 * _koef2,
                    export_trash: 0.05 * _koef2,
                    inflation: 0.02 * _koef2,
                    magic: 0.05 * _koef2,
                    technology: 0.05 * _koef2
                  },
                  regions: {
                    cargo_ship: 0.05 * _koef2,
                    people_ship: 0.05 * _koef2,
                    port: 0.05 * _koef2,
                    infrastructure: 0.05 * _koef2,
                    avg_salary: -0.01 * _koef2,
                    poverty: -0.15 * _koef2,
                    unemployment: 0.15 * _koef2
                  }
                });
              }
            }
          } // Баффы "Дипломатия"


          _context.next = 199;
          break;

        case 195:
          _context.prev = 195;
          _context.t6 = _context["catch"](191);
          _didIteratorError12 = true;
          _iteratorError12 = _context.t6;

        case 199:
          _context.prev = 199;
          _context.prev = 200;

          if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
            _iterator12["return"]();
          }

        case 202:
          _context.prev = 202;

          if (!_didIteratorError12) {
            _context.next = 205;
            break;
          }

          throw _iteratorError12;

        case 205:
          return _context.finish(202);

        case 206:
          return _context.finish(199);

        case 207:
          relations = [];
          _iteratorNormalCompletion13 = true;
          _didIteratorError13 = false;
          _iteratorError13 = undefined;
          _context.prev = 211;

          for (_iterator13 = newStore.relations[Symbol.iterator](); !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
            _i95 = _step13.value;

            if (_i95.pair.length === 1) {
              relations.push({
                value: _i95.value,
                ident: _i95.pair[0],
                id: _i95.id
              });
            }
          }

          _context.next = 219;
          break;

        case 215:
          _context.prev = 215;
          _context.t7 = _context["catch"](211);
          _didIteratorError13 = true;
          _iteratorError13 = _context.t7;

        case 219:
          _context.prev = 219;
          _context.prev = 220;

          if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
            _iterator13["return"]();
          }

        case 222:
          _context.prev = 222;

          if (!_didIteratorError13) {
            _context.next = 225;
            break;
          }

          throw _iteratorError13;

        case 225:
          return _context.finish(222);

        case 226:
          return _context.finish(219);

        case 227:
          for (_i66 = 0, _relations = relations; _i66 < _relations.length; _i66++) {
            _i96 = _relations[_i66];
            country = (0, _otherFunctions.getCountry)(newStore, _i96.ident);
            _i96.value = _i96.value + ((0, _otherFunctions.getRandomRange)(10) === 1 ? 1 : 0) * (country.government[0] === newCountry.government[0] ? 1 : -1);

            for (_i97 = 0, _Object$keys65 = Object.keys(country); _i97 < _Object$keys65.length; _i97++) {
              law = _Object$keys65[_i97];

              if (law.startsWith("law_")) {
                _i96.value = _i96.value + ((0, _otherFunctions.getRandomRange)(75) === 1 ? 1 : 0) * (newCountry[law] === country[law] ? 1 : -1);
              }
            }
          }

          contracts = (0, _otherFunctions.getOwnContracts)(newStore);
          livedContracts = newStore.contracts.filter(function (e) {
            return e.pair.length === 2;
          });
          _iteratorNormalCompletion15 = true;
          _didIteratorError15 = false;
          _iteratorError15 = undefined;
          _context.prev = 233;
          _iterator15 = contracts[Symbol.iterator]();

        case 235:
          if (_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done) {
            _context.next = 274;
            break;
          }

          _i98 = _step15.value;
          _context.t8 = _i98.con_type;
          _context.next = _context.t8 === "AL" ? 240 : _context.t8 === "CM" ? 242 : _context.t8 === "CT" ? 244 : _context.t8 === "SH" ? 247 : _context.t8 === "EH" ? 250 : _context.t8 === "PA" ? 253 : _context.t8 === "ES" ? 255 : _context.t8 === "DW" ? 258 : _context.t8 === "CP" ? 260 : _context.t8 === "FW" ? 263 : _context.t8 === "VC" ? 266 : 269;
          break;

        case 240:
          outBuffer.add({
            country: {
              army_quality: 0.1,
              stability: 0.05
            },
            regions: {}
          });
          return _context.abrupt("break", 270);

        case 242:
          outBuffer.add({
            country: {
              alchemy: 0.05,
              technology: 0.05
            },
            regions: {
              cargo_ship: 0.15,
              people_ship: 0.05,
              port: 0.05,
              industry: 0.1
            }
          });
          return _context.abrupt("break", 270);

        case 244:
          outBuffer.add({
            country: {
              education_quality: 0.1,
              export_trash: 0.05,
              magic: 0.05,
              alchemy: 0.05
            },
            regions: {
              poverty: 0.05
            }
          });
          setRelation(_i98.pair[0], (0, _otherFunctions.getRandomRange)(6) === 1 ? 1 : 0);
          return _context.abrupt("break", 270);

        case 247:
          outBuffer.add({
            country: {
              education_avail: 0.05,
              education_quality: 0.05,
              stability: 0.05,
              support: 0.05
            },
            regions: {
              cargo_ship: 0.05,
              people_ship: 0.15,
              infrastructure: 0.05,
              avg_salary: 0.05,
              poverty: 0.05
            }
          });
          setRelation(_i98.pair[0], (0, _otherFunctions.getRandomRange)(10) === 1 ? 1 : 0);
          return _context.abrupt("break", 270);

        case 250:
          outBuffer.add({
            country: {
              inflation: 0.05,
              stability: 0.05
            },
            regions: {
              port: 0.05,
              infrastructure: 0.02,
              unemployment: -0.1
            }
          });
          setRelation(_i98.pair[0], (0, _otherFunctions.getRandomRange)(7) === 1 ? 1 : 0);
          return _context.abrupt("break", 270);

        case 253:
          outBuffer.add(_i98.priority !== newCountry.name ? {
            country: {
              army_quality: -0.1,
              export_trash: 0.05,
              stability: -0.2
            },
            regions: {
              people_ship: 0.15,
              port: 0.05,
              pave_road: 0.1,
              stone_road: 0.05
            }
          } : {
            country: {
              army_quality: 0.1,
              export_trash: 0.1,
              stability: 0.05,
              technology: 0.05
            },
            regions: {
              cargo_ship: 0.05
            }
          });
          return _context.abrupt("break", 270);

        case 255:
          outBuffer.add(_i98.priority !== newCountry.name ? {
            country: {
              education_quality: -0.05,
              export_trash: -0.05,
              inflation: 0.05,
              stability: -0.1
            },
            regions: {
              industry: -0.025,
              unemployment: 0.1
            }
          } : {
            country: {
              inflation: 0.05,
              stability: -0.05
            },
            regions: {
              unemployment: 0.05
            }
          });
          setRelation(_i98.pair[0], (0, _otherFunctions.getRandomRange)(6) === 1 ? -1 : 0);
          return _context.abrupt("break", 270);

        case 258:
          outBuffer.add(_i98.priority !== newCountry.name ? {
            country: {
              army_quality: 0.1,
              education_avail: -0.1,
              inflation: 0.15,
              science: -0.05,
              stability: -0.15,
              support: -0.05
            },
            regions: {
              industry: -0.15,
              infrastructure: -0.1,
              avg_salary: -0.1,
              poverty: 0.1
            }
          } : {
            country: {
              army_quality: 0.15,
              education_avail: -0.1,
              inflation: 0.15,
              science: -0.05,
              stability: -0.25,
              support: -0.1
            },
            regions: {
              industry: -0.2,
              infrastructure: -0.1,
              avg_salary: -0.1,
              poverty: 0.1
            }
          });
          return _context.abrupt("break", 270);

        case 260:
          outBuffer.add({
            country: {
              army_quality: -0.05,
              stability: 0.15,
              support: 0.05
            },
            regions: {
              infrastructure: 0.05
            }
          });
          setRelation(_i98.pair[0], (0, _otherFunctions.getRandomRange)(10) === 1 ? 1 : 0);
          return _context.abrupt("break", 270);

        case 263:
          outBuffer.add(_i98.priority !== newCountry.name ? {
            country: {
              army_quality: 0.05,
              alchemy: 0.05,
              magic: 0.05,
              science: 0.05,
              stability: 0.05,
              support: 0.15,
              technology: 0.05
            },
            regions: {
              industry: 0.05,
              infrastructure: 0.05,
              poverty: 0.05
            }
          } : {
            country: {
              army_quality: -0.05,
              stability: -0.05
            },
            regions: {
              poverty: 0.05
            }
          });
          newBuff.kazna = newBuff.kazna + (0, _otherFunctions.getReparation)(newStore.country) * (_i98.priority !== newCountry.name ? -1 : 1);
          return _context.abrupt("break", 270);

        case 266:
          outBuffer.add(_i98.priority !== newCountry.name ? {
            country: {
              army_quality: -0.1,
              alchemy: -0.05,
              magic: -0.05,
              science: -0.05,
              support: -0.05,
              technology: -0.05
            },
            regions: {
              cargo_ship: -0.05,
              people_ship: -0.05,
              avg_salary: 0.05,
              unemployment: -0.1
            }
          } : {
            country: {
              army_quality: 0.05,
              stability: -0.15,
              support: 0.05,
              technology: 0.05
            },
            regions: {
              industry: 0.05
            }
          });
          setRelation(_i98.pair[0], (0, _otherFunctions.getRandomRange)(15) === 1 ? -1 : 0);
          return _context.abrupt("break", 270);

        case 269:
          return _context.abrupt("break", 270);

        case 270:
          if (_i98.deadline !== newBuff.step) {
            livedContracts.push(_i98);
          }

        case 271:
          _iteratorNormalCompletion15 = true;
          _context.next = 235;
          break;

        case 274:
          _context.next = 280;
          break;

        case 276:
          _context.prev = 276;
          _context.t9 = _context["catch"](233);
          _didIteratorError15 = true;
          _iteratorError15 = _context.t9;

        case 280:
          _context.prev = 280;
          _context.prev = 281;

          if (!_iteratorNormalCompletion15 && _iterator15["return"] != null) {
            _iterator15["return"]();
          }

        case 283:
          _context.prev = 283;

          if (!_didIteratorError15) {
            _context.next = 286;
            break;
          }

          throw _iteratorError15;

        case 286:
          return _context.finish(283);

        case 287:
          return _context.finish(280);

        case 288:
          newStore.contracts = livedContracts; // Баффы "Договора"

          newsArr = [];

          newsObj =
          /*#__PURE__*/
          function () {
            function newsObj() {
              var label = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
              var country = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
              var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
              var action = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

              _classCallCheck(this, newsObj);

              this.obj = {
                label: label,
                country: country,
                status: status,
                action: action
              };
            }

            _createClass(newsObj, [{
              key: "getObj",
              value: function getObj() {
                return this.obj;
              }
            }]);

            return newsObj;
          }();

          priorityContracts = ["FW", "DW", "ES", "PA", "VC"];
          deadlineContracts = {
            AL: 9999,
            CM: 9999,
            CT: 12,
            SH: 12,
            EH: 12,
            PA: 20,
            FW: 36,
            CP: 60,
            ES: 9999,
            VC: 9999,
            DW: 9999
          };
          abbrContracts = {
            AL: "Альянс",
            CM: "Общий рынок",
            PA: "Проход войск",
            CT: "Культурный обмен",
            SH: "Социальная взаимопомощь",
            EH: "Экономическая помощь",
            CP: "Договор о ненападении"
          };
          relationContracts = {
            AL: 2,
            FW: 10,
            DW: -100
          };
          _iteratorNormalCompletion16 = true;
          _didIteratorError16 = false;
          _iteratorError16 = undefined;
          _context.prev = 298;
          _iterator16 = store.changeGame[Symbol.iterator]();

        case 300:
          if (_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done) {
            _context.next = 653;
            break;
          }

          _i99 = _step16.value;

          if (!_i99.startsWith("contract_")) {
            _context.next = 650;
            break;
          }

          conCountry = _i99.split("_")[1];
          conContract = _i99.split("_")[2];
          typeChange = (0, _otherFunctions.checkContract)(newStore, conContract, conCountry, newCountry.name);
          relation = (0, _otherFunctions.getRelation)(newStore, conCountry);
          approv = false;
          newspaper = [];
          redactStatus = true;
          conBuff = {};
          randomKoef = 1;

          if (conContract.startsWith("DW-invite")) {
            randomKoef = [10, 9, 8].includes(relation) ? 9 : [7, 6, 5].includes(relation) ? 8 : [4, 3, 2].includes(relation) ? 6 : [1, 0, -1].includes(relation) ? 4 : [-2, -3, -4].includes(relation) ? 0 : [-5, -6, -7].includes(relation) ? -10 : [-8, -9, -10].includes(relation) ? -25 : 10000;
            newspaper.push(new newsObj("".concat(_identCountries["default"][conCountry], " \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u043B\u0441\u044F \u0432\u0441\u0442\u0443\u043F\u0438\u0442\u044C \u0432 \u0432\u043E\u0439\u043D\u0443 \u043F\u0440\u043E\u0442\u0438\u0432 \"").concat(_identCountries["default"][conContract.split("-")[2]], "\""), conCountry, true), new newsObj("".concat(_identCountries["default"][conCountry], " \u043E\u0442\u043A\u0430\u0437\u0430\u043B\u0441\u044F \u0432\u0441\u0442\u0443\u043F\u0430\u0442\u044C \u0432 \u0432\u043E\u0439\u043D\u0443 \u043F\u0440\u043E\u0442\u0438\u0432 \"").concat(_identCountries["default"][conContract.split("-")[2]], "\""), conCountry, false, true));
            redactStatus = true;
          }

          _context.t10 = conContract;
          _context.next = _context.t10 === "VC" ? 316 : _context.t10 === "FW" ? 319 : _context.t10 === "AL" ? 432 : _context.t10 === "CM" ? 432 : _context.t10 === "PA" ? 432 : _context.t10 === "CT" ? 432 : _context.t10 === "SH" ? 432 : _context.t10 === "EH" ? 432 : _context.t10 === "CP" ? 432 : _context.t10 === "ES" ? 432 : _context.t10 === "DW" ? 432 : 434;
          break;

        case 316:
          economyProp = 1;

          if ((0, _otherFunctions.isVassal)(newStore)) {
            economyProp = (0, _otherFunctions.getEconomy)(newCountry) / (0, _otherFunctions.getEconomy)((0, _otherFunctions.getCountry)(newStore, conCountry));
            randomKoef = [10, 9, 8].includes(relation) && economyProp > 0.5 ? 6 : [7, 6, 5].includes(relation) && economyProp > 0.65 ? 3 : [4, 3, 2].includes(relation) && economyProp > 0.8 ? 0 : [1, 0, -1].includes(relation) && economyProp > 1 ? -10 : [-2, -3, -4].includes(relation) && economyProp > 1.25 ? -25 : [-5, -6, -7].includes(relation) ? -50 : [-8, -9, -10].includes(relation) ? -100 : 10000;
            newspaper.push(new newsObj("".concat(_identCountries["default"][conCountry], " \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u043B\u0441\u044F \u0432\u0430\u0441 \u043E\u0441\u0432\u043E\u0431\u043E\u0434\u0438\u0442\u044C"), conCountry, true), new newsObj("".concat(_identCountries["default"][conCountry], " \u043E\u0442\u043A\u0430\u0437\u0430\u043B\u0441\u044F \u0432\u0430\u0441 \u043E\u0441\u0432\u043E\u0431\u043E\u0436\u0434\u0430\u0442\u044C"), conCountry, false, true));
            redactStatus = false;
            conBuff = {
              country: {
                army_quality: 0.5,
                stability: 2,
                support: 2
              },
              regions: {}
            };
          } else if ((0, _otherFunctions.getVassals)(newCountry.name).map(function (e) {
            return e.ident;
          }).includes(conCountry)) {
            randomKoef = 9;
            newspaper.push(new newsObj("\u0412\u044B \u043E\u0441\u0432\u043E\u0431\u043E\u0434\u0438\u043B\u0438 \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u043E ".concat(_identCountries["default"][conCountry], " \u043E\u0442 \u0432\u0430\u0441\u0441\u0430\u043B\u044C\u043D\u043E\u0439 \u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0441\u0442\u0438"), conCountry, true), new newsObj());
            redactStatus = false;
          } else {
            economyProp = (0, _otherFunctions.getEconomy)(newCountry) / (0, _otherFunctions.getEconomy)((0, _otherFunctions.getCountry)(newStore, conCountry));
            randomKoef = [10, 9, 8].includes(relation) ? 4 : [7, 6, 5].includes(relation) ? 0 : [4, 3, 2].includes(relation) ? -5 : [1, 0, -1].includes(relation) ? -10 : [-2, -3, -4].includes(relation) ? -25 : [-5, -6, -7].includes(relation) ? -50 : [-8, -9, -10].includes(relation) ? -100 : 10000;
            newspaper.push(new newsObj("".concat(_identCountries["default"][conCountry], " \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u043B\u0441\u044F \u0431\u044B\u0442\u044C \u0432\u0430\u0448\u0438\u043C \u0432\u0430\u0441\u0441\u0430\u043B\u043E\u043C"), conCountry, true), new newsObj("".concat(_identCountries["default"][conCountry], " \u043E\u0442\u043A\u0430\u0437\u0430\u043B\u0441\u044F \u0431\u044B\u0442\u044C \u0432\u0430\u0448\u0438\u043C \u0432\u0430\u0441\u0441\u0430\u043B\u043E\u043C"), conCountry, false, true));
            redactStatus = true;
          }

          return _context.abrupt("break", 435);

        case 319:
          output = {
            peace: {
              own: 0,
              enemy: 0
            },
            war: {
              own: 0,
              enemy: 0
            },
            army: {
              own: 0,
              enemy: 0
            }
          };
          war = void 0;
          _iteratorNormalCompletion23 = true;
          _didIteratorError23 = false;
          _iteratorError23 = undefined;
          _context.prev = 324;

          for (_iterator23 = newStore.contracts[Symbol.iterator](); !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
            _i100 = _step23.value;

            if (_i100.con_type === "DW" && _i100.pair.length === 1 && _i100.pair[0] === conCountry) {
              war = _i100.occuped.split(",");
            }
          }

          _context.next = 332;
          break;

        case 328:
          _context.prev = 328;
          _context.t11 = _context["catch"](324);
          _didIteratorError23 = true;
          _iteratorError23 = _context.t11;

        case 332:
          _context.prev = 332;
          _context.prev = 333;

          if (!_iteratorNormalCompletion23 && _iterator23["return"] != null) {
            _iterator23["return"]();
          }

        case 335:
          _context.prev = 335;

          if (!_didIteratorError23) {
            _context.next = 338;
            break;
          }

          throw _iteratorError23;

        case 338:
          return _context.finish(335);

        case 339:
          return _context.finish(332);

        case 340:
          peace = void 0;
          _iteratorNormalCompletion24 = true;
          _didIteratorError24 = false;
          _iteratorError24 = undefined;
          _context.prev = 344;

          for (_iterator24 = store.peaceList[Symbol.iterator](); !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
            _i101 = _step24.value;

            if (_i101.country === conCountry) {
              peace = _i101;
            }
          }

          _context.next = 352;
          break;

        case 348:
          _context.prev = 348;
          _context.t12 = _context["catch"](344);
          _didIteratorError24 = true;
          _iteratorError24 = _context.t12;

        case 352:
          _context.prev = 352;
          _context.prev = 353;

          if (!_iteratorNormalCompletion24 && _iterator24["return"] != null) {
            _iterator24["return"]();
          }

        case 355:
          _context.prev = 355;

          if (!_didIteratorError24) {
            _context.next = 358;
            break;
          }

          throw _iteratorError24;

        case 358:
          return _context.finish(355);

        case 359:
          return _context.finish(352);

        case 360:
          ownRegs = newCountry.regions.length;
          newOwnRegs = ownRegs;
          enemyRegs = (0, _otherFunctions.getCountry)(newStore, conCountry).regions.length;
          newEnemyRegs = enemyRegs;
          _iteratorNormalCompletion25 = true;
          _didIteratorError25 = false;
          _iteratorError25 = undefined;
          _context.prev = 367;

          for (_iterator25 = war[Symbol.iterator](); !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
            _i102 = _step25.value;
            whose = (0, _otherFunctions.whoseReg)(newStore, _i102);

            if (whose === newCountry.identify) {
              newOwnRegs--;
              newEnemyRegs++;
            } else {
              newOwnRegs++;
              newEnemyRegs--;
            }
          }

          _context.next = 375;
          break;

        case 371:
          _context.prev = 371;
          _context.t13 = _context["catch"](367);
          _didIteratorError25 = true;
          _iteratorError25 = _context.t13;

        case 375:
          _context.prev = 375;
          _context.prev = 376;

          if (!_iteratorNormalCompletion25 && _iterator25["return"] != null) {
            _iterator25["return"]();
          }

        case 378:
          _context.prev = 378;

          if (!_didIteratorError25) {
            _context.next = 381;
            break;
          }

          throw _iteratorError25;

        case 381:
          return _context.finish(378);

        case 382:
          return _context.finish(375);

        case 383:
          output.war.own = newOwnRegs / ownRegs;
          output.war.enemy = newEnemyRegs / enemyRegs;
          newOwnRegs = newEnemyRegs = 0;
          _iteratorNormalCompletion26 = true;
          _didIteratorError26 = false;
          _iteratorError26 = undefined;
          _context.prev = 389;

          for (_iterator26 = newCountry.regions[Symbol.iterator](); !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
            _i103 = _step26.value;

            if (peace.own.includes(_i103.name) || !(peace.own.includes(_i103.name) || peace.enemy.includes(_i103.name))) {
              newOwnRegs++;
            } else {
              newEnemyRegs++;
            }
          }

          _context.next = 397;
          break;

        case 393:
          _context.prev = 393;
          _context.t14 = _context["catch"](389);
          _didIteratorError26 = true;
          _iteratorError26 = _context.t14;

        case 397:
          _context.prev = 397;
          _context.prev = 398;

          if (!_iteratorNormalCompletion26 && _iterator26["return"] != null) {
            _iterator26["return"]();
          }

        case 400:
          _context.prev = 400;

          if (!_didIteratorError26) {
            _context.next = 403;
            break;
          }

          throw _iteratorError26;

        case 403:
          return _context.finish(400);

        case 404:
          return _context.finish(397);

        case 405:
          _iteratorNormalCompletion27 = true;
          _didIteratorError27 = false;
          _iteratorError27 = undefined;
          _context.prev = 408;

          for (_iterator27 = (0, _otherFunctions.getCountry)(newStore, conCountry).regions[Symbol.iterator](); !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
            _i104 = _step27.value;

            if (peace.enemy.includes(_i104.name) || !(peace.own.includes(_i104.name) || peace.enemy.includes(_i104.name))) {
              newEnemyRegs++;
            } else {
              newOwnRegs++;
            }
          }

          _context.next = 416;
          break;

        case 412:
          _context.prev = 412;
          _context.t15 = _context["catch"](408);
          _didIteratorError27 = true;
          _iteratorError27 = _context.t15;

        case 416:
          _context.prev = 416;
          _context.prev = 417;

          if (!_iteratorNormalCompletion27 && _iterator27["return"] != null) {
            _iterator27["return"]();
          }

        case 419:
          _context.prev = 419;

          if (!_didIteratorError27) {
            _context.next = 422;
            break;
          }

          throw _iteratorError27;

        case 422:
          return _context.finish(419);

        case 423:
          return _context.finish(416);

        case 424:
          output.peace.own = newOwnRegs / ownRegs;
          output.peace.enemy = newEnemyRegs / enemyRegs;
          output.army.own = (0, _otherFunctions.getArmy)(newStore.squad, false);
          output.army.enemy = (0, _otherFunctions.getAIArmy)(newStore.squad_ai, conCountry, false);
          randomKoef = (0, _neuroFunctions.getAnswerPeace)(output);
          newspaper.push(new newsObj("\u0421 \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u043E\u043C ".concat(_identCountries["default"][conCountry], " \u0437\u0430\u043A\u043B\u044E\u0447\u0435\u043D \u043C\u0438\u0440"), conCountry, true), new newsObj("".concat(_identCountries["default"][conCountry], " \u043E\u0442\u0432\u0435\u0440\u0433\u043B\u0438 \u0432\u0430\u0448\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043E \u043C\u0438\u0440\u0435"), conCountry, false));
          redactStatus = true;
          return _context.abrupt("break", 435);

        case 432:
          if (!typeChange) {
            if (["AL", "CM", "PA"].includes(conContract)) {
              randomKoef = [10, 9, 8].includes(relation) ? 9 : [7, 6, 5].includes(relation) ? 7 : [4, 3, 2].includes(relation) ? 5 : [1, 0, -1].includes(relation) ? 0 : [-2, -3, -4].includes(relation) ? -10 : [-5, -6, -7].includes(relation) ? -25 : [-8, -9, -10].includes(relation) ? -100 : 10000;
            } else if (["CT", "SH", "EH", "CP"].includes(conContract)) {
              randomKoef = [10, 9, 8].includes(relation) ? 9 : [7, 6, 5].includes(relation) ? 8 : [4, 3, 2].includes(relation) ? 7 : [1, 0, -1].includes(relation) ? 2 : [-2, -3, -4].includes(relation) ? -5 : [-5, -6, -7].includes(relation) ? -15 : [-8, -9, -10].includes(relation) ? -100 : 10000;
            } else if (["ES", "DW"].includes(conContract)) {
              randomKoef = 9;
            }

            if (conContract === "ES") {
              newspaper.push(new newsObj("\u0412\u044B \u043D\u0430\u043B\u043E\u0436\u0438\u043B\u0438 \u044D\u043A\u043E\u043D\u043E\u043C\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0441\u0430\u043D\u043A\u0446\u0438\u0438 \u043D\u0430 \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u043E ".concat(_identCountries["default"][conCountry]), conCountry, true), new newsObj());
            } else if (conContract === "DW") {
              newspaper.push(new newsObj("\u0413\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0443 ".concat(_identCountries["default"][conCountry], " \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0430 \u0432\u043E\u0439\u043D\u0430"), conCountry, true), new newsObj());
            } else {
              newspaper.push(new newsObj("\u0413\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u043E ".concat(_identCountries["default"][conCountry], " \u043F\u0440\u0438\u043D\u044F\u043B\u043E \u0432\u0430\u0448\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043E \u0437\u0430\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0438 \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0430 \"").concat(abbrContracts[conContract], "\""), conCountry, true), new newsObj("\u0413\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u043E ".concat(_identCountries["default"][conCountry], " \u043E\u0442\u043A\u043B\u043E\u043D\u0438\u043B\u043E \u0432\u0430\u0448\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043E \u0437\u0430\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0438 \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0430 \"").concat(abbrContracts[conContract], "\""), conCountry, false));
            }

            redactStatus = true;
          } else {
            if (["AL", "CM", "CT", "SH", "EH"].includes(conContract)) {
              randomKoef = 9;
              newspaper.push(new newsObj("\u0414\u043E\u0433\u043E\u0432\u043E\u0440 \"".concat(abbrContracts[conContract], "\" \u0441 \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u043E\u043C ").concat(_identCountries["default"][conCountry], " \u0440\u0430\u0437\u043E\u0440\u0432\u0430\u043D"), conCountry, true), new newsObj());
            } else if (_i99.split("_")[2] === "ES") {
              randomKoef = 9;
              newspaper.push(new newsObj("\u042D\u043A\u043E\u043D\u043E\u043C\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0441\u0430\u043D\u043A\u0446\u0438\u0438 \u0441 \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0430 ".concat(_identCountries["default"][conCountry], " \u0431\u044B\u043B\u0438 \u0441\u043D\u044F\u0442\u044B"), conCountry, true), new newsObj());
            }

            redactStatus = false;
          }

          return _context.abrupt("break", 435);

        case 434:
          return _context.abrupt("break", 435);

        case 435:
          approv = (0, _otherFunctions.getRandomRange)(10 - randomKoef) === 0;
          newsArr.push(approv ? newspaper[0].getObj() : newspaper[1].getObj());

          if (!approv) {
            _context.next = 649;
            break;
          }

          if (!(conContract === "DW")) {
            _context.next = 461;
            break;
          }

          changerCont = [];
          _iteratorNormalCompletion28 = true;
          _didIteratorError28 = false;
          _iteratorError28 = undefined;
          _context.prev = 443;

          for (_iterator28 = newStore.contracts[Symbol.iterator](); !(_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done); _iteratorNormalCompletion28 = true) {
            _i105 = _step28.value;

            if (!(_i105.pair.length === 1 && _i105.pair[0] === conCountry)) {
              changerCont.push(_i105);
            }
          }

          _context.next = 451;
          break;

        case 447:
          _context.prev = 447;
          _context.t16 = _context["catch"](443);
          _didIteratorError28 = true;
          _iteratorError28 = _context.t16;

        case 451:
          _context.prev = 451;
          _context.prev = 452;

          if (!_iteratorNormalCompletion28 && _iterator28["return"] != null) {
            _iterator28["return"]();
          }

        case 454:
          _context.prev = 454;

          if (!_didIteratorError28) {
            _context.next = 457;
            break;
          }

          throw _iteratorError28;

        case 457:
          return _context.finish(454);

        case 458:
          return _context.finish(451);

        case 459:
          newStore.contracts = changerCont;
          conBuff = {
            country: {
              army_quality: 0.25,
              stability: -2,
              support: -2.5
            },
            regions: {}
          };

        case 461:
          if (conContract === "FW") {
            conBuff = {
              country: {
                army_quality: -0.25,
                stability: 3,
                support: 2
              },
              regions: {}
            };
          }

          if (!redactStatus) {
            _context.next = 467;
            break;
          }

          if (Object.keys(relationContracts).includes(conContract)) {
            setRelation(conCountry, relationContracts[conContract]);
          }

          if (conContract.startsWith("DW-invite")) {
            newStore.contracts.push({
              id: (0, _otherFunctions.getMaxId)(newStore.contracts),
              con_type: "DW",
              priority: _identCountries["default"][conCountry],
              occuped: "",
              spends: "0_0",
              deadline: newBuff.step + 9999,
              uniq_id: (0, _otherFunctions.getCountry)(newStore, conCountry).id,
              pair: [conCountry, conContract.split("-")[2]],
              uniq: conCountry
            });
          } else {
            newStore.contracts.push({
              id: (0, _otherFunctions.getMaxId)(newStore.contracts),
              con_type: conContract,
              priority: priorityContracts.includes(conContract) ? newCountry.name : "0",
              occuped: "",
              spends: "0_0",
              deadline: newBuff.step + deadlineContracts[conContract],
              uniq_id: newCountry.id,
              pair: [conCountry],
              uniq: newCountry.identify
            });
          }

          _context.next = 496;
          break;

        case 467:
          cont = {};
          _iteratorNormalCompletion29 = true;
          _didIteratorError29 = false;
          _iteratorError29 = undefined;
          _context.prev = 471;
          _iterator29 = newStore.contracts[Symbol.iterator]();

        case 473:
          if (_iteratorNormalCompletion29 = (_step29 = _iterator29.next()).done) {
            _context.next = 481;
            break;
          }

          _i106 = _step29.value;

          if (!(_i106.con_type === conContract && _i106.pair.length === 1 && _i106.pair[0] === conCountry)) {
            _context.next = 478;
            break;
          }

          cont = _i106;
          return _context.abrupt("break", 481);

        case 478:
          _iteratorNormalCompletion29 = true;
          _context.next = 473;
          break;

        case 481:
          _context.next = 487;
          break;

        case 483:
          _context.prev = 483;
          _context.t17 = _context["catch"](471);
          _didIteratorError29 = true;
          _iteratorError29 = _context.t17;

        case 487:
          _context.prev = 487;
          _context.prev = 488;

          if (!_iteratorNormalCompletion29 && _iterator29["return"] != null) {
            _iterator29["return"]();
          }

        case 490:
          _context.prev = 490;

          if (!_didIteratorError29) {
            _context.next = 493;
            break;
          }

          throw _iteratorError29;

        case 493:
          return _context.finish(490);

        case 494:
          return _context.finish(487);

        case 495:
          newStore.contracts.splice(newStore.contracts.indexOf(cont), 1);

        case 496:
          if (!(conContract === "FW")) {
            _context.next = 649;
            break;
          }

          _peace = {};
          _iteratorNormalCompletion30 = true;
          _didIteratorError30 = false;
          _iteratorError30 = undefined;
          _context.prev = 501;
          _iterator30 = store.peaceList[Symbol.iterator]();

        case 503:
          if (_iteratorNormalCompletion30 = (_step30 = _iterator30.next()).done) {
            _context.next = 511;
            break;
          }

          _i107 = _step30.value;

          if (!(_i107.country === conCountry)) {
            _context.next = 508;
            break;
          }

          _peace = _i107;
          return _context.abrupt("break", 511);

        case 508:
          _iteratorNormalCompletion30 = true;
          _context.next = 503;
          break;

        case 511:
          _context.next = 517;
          break;

        case 513:
          _context.prev = 513;
          _context.t18 = _context["catch"](501);
          _didIteratorError30 = true;
          _iteratorError30 = _context.t18;

        case 517:
          _context.prev = 517;
          _context.prev = 518;

          if (!_iteratorNormalCompletion30 && _iterator30["return"] != null) {
            _iterator30["return"]();
          }

        case 520:
          _context.prev = 520;

          if (!_didIteratorError30) {
            _context.next = 523;
            break;
          }

          throw _iteratorError30;

        case 523:
          return _context.finish(520);

        case 524:
          return _context.finish(517);

        case 525:
          _war = {};
          newContracts = [];
          _iteratorNormalCompletion31 = true;
          _didIteratorError31 = false;
          _iteratorError31 = undefined;
          _context.prev = 530;

          for (_iterator31 = newStore.contracts[Symbol.iterator](); !(_iteratorNormalCompletion31 = (_step31 = _iterator31.next()).done); _iteratorNormalCompletion31 = true) {
            _i108 = _step31.value;

            if (_i108.con_type === "DW" && _i108.pair.length === 1 && _i108.pair[0] === conCountry) {
              _war = _i108;
            } else {
              newContracts.push(_i108);
            }
          }

          _context.next = 538;
          break;

        case 534:
          _context.prev = 534;
          _context.t19 = _context["catch"](530);
          _didIteratorError31 = true;
          _iteratorError31 = _context.t19;

        case 538:
          _context.prev = 538;
          _context.prev = 539;

          if (!_iteratorNormalCompletion31 && _iterator31["return"] != null) {
            _iterator31["return"]();
          }

        case 541:
          _context.prev = 541;

          if (!_didIteratorError31) {
            _context.next = 544;
            break;
          }

          throw _iteratorError31;

        case 544:
          return _context.finish(541);

        case 545:
          return _context.finish(538);

        case 546:
          newStore.contracts = [];
          newStore.contracts = newContracts;
          regs = newCountry.regions.slice(0);
          _iteratorNormalCompletion32 = true;
          _didIteratorError32 = false;
          _iteratorError32 = undefined;
          _context.prev = 552;
          _iterator32 = newCountry.regions[Symbol.iterator]();

        case 554:
          if (_iteratorNormalCompletion32 = (_step32 = _iterator32.next()).done) {
            _context.next = 589;
            break;
          }

          _i109 = _step32.value;

          if (!(_war.occuped.includes(_i109.name) && _peace.enemy.includes(_i109.name))) {
            _context.next = 586;
            break;
          }

          _iteratorNormalCompletion34 = true;
          _didIteratorError34 = false;
          _iteratorError34 = undefined;
          _context.prev = 560;
          _iterator34 = newStore.country_ai[Symbol.iterator]();

        case 562:
          if (_iteratorNormalCompletion34 = (_step34 = _iterator34.next()).done) {
            _context.next = 570;
            break;
          }

          c = _step34.value;

          if (!(c.identify === conCountry)) {
            _context.next = 567;
            break;
          }

          c.regions.push(_i109);
          return _context.abrupt("break", 570);

        case 567:
          _iteratorNormalCompletion34 = true;
          _context.next = 562;
          break;

        case 570:
          _context.next = 576;
          break;

        case 572:
          _context.prev = 572;
          _context.t20 = _context["catch"](560);
          _didIteratorError34 = true;
          _iteratorError34 = _context.t20;

        case 576:
          _context.prev = 576;
          _context.prev = 577;

          if (!_iteratorNormalCompletion34 && _iterator34["return"] != null) {
            _iterator34["return"]();
          }

        case 579:
          _context.prev = 579;

          if (!_didIteratorError34) {
            _context.next = 582;
            break;
          }

          throw _iteratorError34;

        case 582:
          return _context.finish(579);

        case 583:
          return _context.finish(576);

        case 584:
          newCountry.regions.splice(newCountry.regions.indexOf(_i109), 1);
          return _context.abrupt("break", 589);

        case 586:
          _iteratorNormalCompletion32 = true;
          _context.next = 554;
          break;

        case 589:
          _context.next = 595;
          break;

        case 591:
          _context.prev = 591;
          _context.t21 = _context["catch"](552);
          _didIteratorError32 = true;
          _iteratorError32 = _context.t21;

        case 595:
          _context.prev = 595;
          _context.prev = 596;

          if (!_iteratorNormalCompletion32 && _iterator32["return"] != null) {
            _iterator32["return"]();
          }

        case 598:
          _context.prev = 598;

          if (!_didIteratorError32) {
            _context.next = 601;
            break;
          }

          throw _iteratorError32;

        case 601:
          return _context.finish(598);

        case 602:
          return _context.finish(595);

        case 603:
          _iteratorNormalCompletion33 = true;
          _didIteratorError33 = false;
          _iteratorError33 = undefined;
          _context.prev = 606;
          _iterator33 = newStore.country_ai[Symbol.iterator]();

        case 608:
          if (_iteratorNormalCompletion33 = (_step33 = _iterator33.next()).done) {
            _context.next = 635;
            break;
          }

          _c = _step33.value;

          if (!(_c.identify === conCountry)) {
            _context.next = 632;
            break;
          }

          regs = _c.regions.slice(0);
          _iteratorNormalCompletion35 = true;
          _didIteratorError35 = false;
          _iteratorError35 = undefined;
          _context.prev = 615;

          for (_iterator35 = regs[Symbol.iterator](); !(_iteratorNormalCompletion35 = (_step35 = _iterator35.next()).done); _iteratorNormalCompletion35 = true) {
            _i110 = _step35.value;

            if (_war.occuped.includes(_i110.name) && _peace.own.includes(_i110.name)) {
              newCountry.regions.push(_i110);

              _c.regions.splice(_c.regions.indexOf(_i110), 1);
            }
          }

          _context.next = 623;
          break;

        case 619:
          _context.prev = 619;
          _context.t22 = _context["catch"](615);
          _didIteratorError35 = true;
          _iteratorError35 = _context.t22;

        case 623:
          _context.prev = 623;
          _context.prev = 624;

          if (!_iteratorNormalCompletion35 && _iterator35["return"] != null) {
            _iterator35["return"]();
          }

        case 626:
          _context.prev = 626;

          if (!_didIteratorError35) {
            _context.next = 629;
            break;
          }

          throw _iteratorError35;

        case 629:
          return _context.finish(626);

        case 630:
          return _context.finish(623);

        case 631:
          return _context.abrupt("break", 635);

        case 632:
          _iteratorNormalCompletion33 = true;
          _context.next = 608;
          break;

        case 635:
          _context.next = 641;
          break;

        case 637:
          _context.prev = 637;
          _context.t23 = _context["catch"](606);
          _didIteratorError33 = true;
          _iteratorError33 = _context.t23;

        case 641:
          _context.prev = 641;
          _context.prev = 642;

          if (!_iteratorNormalCompletion33 && _iterator33["return"] != null) {
            _iterator33["return"]();
          }

        case 644:
          _context.prev = 644;

          if (!_didIteratorError33) {
            _context.next = 647;
            break;
          }

          throw _iteratorError33;

        case 647:
          return _context.finish(644);

        case 648:
          return _context.finish(641);

        case 649:
          outBuffer.add(conBuff);

        case 650:
          _iteratorNormalCompletion16 = true;
          _context.next = 300;
          break;

        case 653:
          _context.next = 659;
          break;

        case 655:
          _context.prev = 655;
          _context.t24 = _context["catch"](298);
          _didIteratorError16 = true;
          _iteratorError16 = _context.t24;

        case 659:
          _context.prev = 659;
          _context.prev = 660;

          if (!_iteratorNormalCompletion16 && _iterator16["return"] != null) {
            _iterator16["return"]();
          }

        case 662:
          _context.prev = 662;

          if (!_didIteratorError16) {
            _context.next = 665;
            break;
          }

          throw _iteratorError16;

        case 665:
          return _context.finish(662);

        case 666:
          return _context.finish(659);

        case 667:
          // Баффы "Юстиция"
          lawBuffer = {
            law_equal_rights: {
              country: {
                support: 0.05,
                stability: -0.07,
                inflation: 0.02,
                science: 0.04,
                technology: 0.03,
                education_quality: 0.03,
                education_avail: 0.04
              },
              regions: {
                poverty: -0.04,
                unemployment: 0.04,
                avg_salary: 0.05
              }
            },
            law_torture: {
              country: {
                support: -0.05,
                stability: 0.1,
                army_quality: 0.04
              },
              regions: {}
            },
            law_speech: {
              country: {
                support: -0.05,
                stability: -0.05,
                inflation: -0.03,
                alchemy: 0.03,
                magic: 0.03,
                science: 0.03,
                technology: 0.03
              },
              regions: {
                avg_salary: 0.05
              }
            },
            law_demonstration: {
              country: {
                support: -0.03,
                stability: -0.05
              },
              regions: {
                unemployment: -0.04,
                avg_salary: 0.05
              }
            },
            law_property: {
              country: {
                support: 0.03,
                stability: -0.05
              },
              regions: {
                poverty: 0.03,
                industry: 0.05
              }
            },
            law_creation: {
              country: {
                alchemy: 0.03,
                magic: 0.03,
                science: 0.03,
                technology: 0.03,
                education_quality: 0.03,
                education_avail: 0.03
              },
              regions: {
                unemployment: -0.06,
                industry: 0.05
              }
            },
            law_rasism: {
              country: {},
              regions: {
                poverty: 0.04,
                unemployment: 0.04
              }
            },
            law_heritage: {
              country: {
                inflation: -0.04
              },
              regions: {
                poverty: -0.05
              }
            },
            law_slavery: {
              country: {
                support: -0.05,
                stability: 0.06,
                technology: -0.05,
                inflation: 0.03
              },
              regions: {
                poverty: 0.1,
                avg_salary: -0.1,
                industry: 0.15
              }
            },
            law_court: {
              country: {
                support: 0.03,
                stability: -0.05
              },
              regions: {
                industry: 0.04
              }
            },
            law_child_labour: {
              country: {
                support: -0.05,
                inflation: 0.03
              },
              regions: {
                poverty: -0.05,
                unemployment: 0.04,
                industry: 0.04
              }
            },
            law_monopoly: {
              country: {
                support: 0.04,
                stability: 0.05,
                inflation: 0.03
              },
              regions: {
                poverty: 0.03,
                unemployment: 0.03,
                avg_salary: -0.04
              }
            },
            law_free_enterspire: {
              country: {
                support: 0.06,
                stability: -0.05,
                inflation: 0.02
              },
              regions: {
                poverty: -0.02,
                unemployment: -0.02,
                industry: 0.03
              }
            },
            law_work_day_limit: {
              country: {
                support: 0.04
              },
              regions: {
                poverty: -0.04,
                unemployment: -0.05,
                avg_salary: -0.04,
                industry: 0.03
              }
            },
            law_death_penalty: {
              country: {
                support: -0.07,
                stability: 0.1,
                army_quality: 0.06
              },
              regions: {}
            }
          };

          for (_i67 = 0, _Object$keys48 = Object.keys(newCountry); _i67 < _Object$keys48.length; _i67++) {
            _law = _Object$keys48[_i67];

            if (_law.startsWith("law_")) {
              if (newCountry[_law]) {
                console.log(_law);
                outBuffer.add(lawBuffer[_law]);
              } else {
                inverseBuff = Object.assign({}, lawBuffer[_law]);

                for (_i111 = 0, _Object$keys66 = Object.keys(lawBuffer[_law]); _i111 < _Object$keys66.length; _i111++) {
                  _type22 = _Object$keys66[_i111];

                  for (_i112 = 0, _Object$keys67 = Object.keys(lawBuffer[_law][_type22]); _i112 < _Object$keys67.length; _i112++) {
                    bf = _Object$keys67[_i112];
                    inverseBuff[_type22][bf] = -lawBuffer[_law][_type22][bf];
                  }
                }

                outBuffer.add(inverseBuff);
              }
            }
          } // Баффы "Социальное развитие"


          social_koef = (+newCountry.pension_m > 2 ? +newCountry.pension_m / 2 : -+newCountry.pension_m) + (+newCountry.pension_w > 2 ? +newCountry.pension_w / 2 : -+newCountry.pension_w);
          outBuffer.add({
            country: {
              support: -0.04 * social_koef
            },
            regions: {
              industry: -0.03 * social_koef,
              avg_salary: -0.035 * social_koef,
              poverty: 0.05 * social_koef,
              unemployment: 0.04 * social_koef,
              population: -0.03 * social_koef
            }
          });
          social_koef = newCountry.maternal_capital / 50;
          outBuffer.add({
            country: {
              education_avail: 0.0002 * social_koef,
              support: 0.0001 * social_koef
            },
            regions: {
              poverty: 0.0002 * social_koef,
              population: 0.000 * social_koef
            }
          });
          social_koef = newCountry.allowance_unemploy / 50;
          outBuffer.add({
            country: {
              stability: 0.002 * social_koef,
              support: 0.003 * social_koef
            },
            regions: {
              industry: 0.001 * social_koef,
              avg_salary: 0.002 * social_koef,
              population: 0.001 * social_koef,
              unemployment: -0.006 * social_koef
            }
          });
          social_koef = newCountry.allowance_disability / 50;
          outBuffer.add({
            country: {
              stability: 0.003 * social_koef,
              support: 0.004 * social_koef
            },
            regions: {
              avg_salary: 0.002 * social_koef,
              population: 0.001 * social_koef,
              poverty: -0.0025 * social_koef
            }
          });
          avg_salary = (0, _otherFunctions.getAvgSalary)(newCountry, false);
          social_koef = newCountry.avg_pension / avg_salary > 0.8 ? newCountry.avg_pension / avg_salary : -(2 - newCountry.avg_pension / avg_salary);
          outBuffer.add({
            country: {
              stability: 0.05 * social_koef,
              support: 0.08 * social_koef
            },
            regions: {
              industry: 0.04 * social_koef,
              avg_salary: 0.05 * social_koef,
              population: 0.07 * social_koef,
              poverty: -0.08 * social_koef,
              unemployment: -0.07 * social_koef
            }
          }); // Баффы "Инфраструктура"

          transport_koef = (0, _otherFunctions.getPaveRoads)(newCountry);
          outBuffer.add({
            country: {
              army_quality: 0.08 * transport_koef,
              education_avail: 0.12 * transport_koef,
              support: 0.08 * transport_koef,
              technology: 0.08 * transport_koef
            },
            regions: {
              industry: 0.05 * transport_koef,
              unemployment: 0.05 * transport_koef
            }
          });
          transport_koef = (0, _otherFunctions.getStoneRoads)(newCountry);
          outBuffer.add({
            country: {
              army_quality: 0.16 * transport_koef,
              education_avail: 0.2 * transport_koef,
              support: 0.13 * transport_koef,
              technology: 0.15 * transport_koef
            },
            regions: {
              industry: 0.1 * transport_koef,
              unemployment: -0.1 * transport_koef
            }
          });
          transport_koef = (0, _otherFunctions.getInfrastructure)(newCountry);
          outBuffer.add({
            country: {
              army_quality: 0.25 * transport_koef,
              stability: 0.12 * transport_koef,
              support: 0.18 * transport_koef
            },
            regions: {
              industry: 0.15 * transport_koef,
              poverty: -0.08 * transport_koef
            }
          });
          transport_koef = newCountry.export_trash;
          outBuffer.add({
            country: {
              magic: 0.05 * transport_koef,
              support: 0.08 * transport_koef
            },
            regions: {
              poverty: -0.05 * transport_koef
            }
          });
          transport_koef = (0, _otherFunctions.getPort)(newCountry);
          outBuffer.add({
            country: {
              alchemy: 0.01 * transport_koef,
              army_quality: 0.12 * transport_koef,
              magic: 0.1 * transport_koef,
              science: 0.1 * transport_koef,
              support: 0.1 * transport_koef,
              technology: 0.1 * transport_koef
            },
            regions: {
              industry: 0.1 * transport_koef,
              avg_salary: 0.05 * transport_koef,
              unemployment: -0.05 * transport_koef
            }
          });
          transport_koef = (0, _otherFunctions.getCargoDelivery)(newCountry);
          outBuffer.add({
            country: {
              education_avail: 0.05 * transport_koef
            },
            regions: {
              industry: 0.1 * transport_koef,
              unemployment: -0.05 * transport_koef
            }
          });
          transport_koef = (0, _otherFunctions.getPeopleDelivery)(newCountry);
          outBuffer.add({
            country: {
              education_avail: 0.12 * transport_koef
            },
            regions: {
              industry: 0.05 * transport_koef,
              unemployment: -0.1 * transport_koef
            }
          });
          transport_koef = (0, _otherFunctions.getAqueducs)(newCountry) * 10000 / (0, _otherFunctions.getPopulation)(newCountry, false);
          outBuffer.add({
            country: {
              alchemy: 0.08 * transport_koef,
              technology: 0.1 * transport_koef
            },
            regions: {
              industry: 0.07 * transport_koef,
              poverty: -0.05 * transport_koef
            }
          }); // Баффы "Наука"

          science_koef = newCountry.alchemy;
          outBuffer.add({
            country: {
              education_quality: 0.1 * science_koef
            },
            regions: {
              industry: 0.08 * science_koef
            }
          });
          science_koef = newCountry.magic;
          outBuffer.add({
            country: {
              army_quality: 0.1 * science_koef,
              education_quality: 0.2 * science_koef,
              export_trash: 0.1 * science_koef,
              support: 0.1 * science_koef
            },
            regions: {
              industry: 0.08 * science_koef,
              infrastructure: 0.12 * science_koef,
              poverty: -0.08 * science_koef,
              unemployment: -0.08 * science_koef
            }
          });
          science_koef = newCountry.science;
          outBuffer.add({
            country: {
              army_quality: 0.07 * science_koef,
              education_quality: 0.15 * science_koef
            },
            regions: {
              port: 0.1 * science_koef,
              industry: 0.05 * science_koef,
              infrastructure: 0.1 * science_koef
            }
          });
          science_koef = newCountry.technology;
          outBuffer.add({
            country: {
              army_quality: 0.15 * science_koef,
              education_avail: 0.1 * science_koef,
              export_trash: 0.2 * science_koef
            },
            regions: {
              cargo_ship: 0.15 * science_koef,
              people_ship: 0.15 * science_koef,
              port: 0.1 * science_koef,
              industry: 0.1 * science_koef,
              infrastructure: 0.2 * science_koef,
              pave_road: 0.2 * science_koef,
              stone_road: 0.2 * science_koef
            }
          }); // Баффы "Образование"

          education_koef = newCountry.education_avail;
          outBuffer.add({
            country: {
              alchemy: 0.15 * education_koef,
              magic: 0.15 * education_koef,
              science: 0.2 * education_koef,
              support: 0.2 * education_koef,
              technology: 0.15 * education_koef
            },
            regions: {
              population: 0.1 * education_koef,
              poverty: -0.2 * education_koef
            }
          });
          education_koef = newCountry.education_quality;
          outBuffer.add({
            country: {
              support: 0.3 * education_koef
            },
            regions: {
              industry: 0.28 * education_koef,
              infrastructure: 0.25 * education_koef,
              avg_salary: 0.28 * education_koef,
              poverty: -0.2 * education_koef,
              unemployment: -0.25 * education_koef
            }
          });
          education_koef = (0, _otherFunctions.getSchools)(newCountry) * 7000 / (0, _otherFunctions.getPopulation)(newCountry, false);
          outBuffer.add({
            country: {
              science: 0.1 * education_koef,
              stability: 0.1 * education_koef,
              support: 0.15 * education_koef
            },
            regions: {
              population: 0.1 * education_koef,
              poverty: -0.15 * education_koef
            }
          });
          education_koef = (0, _otherFunctions.getUniversities)(newCountry) * 1000 / (0, _otherFunctions.getPopulation)(newCountry, false);
          outBuffer.add({
            country: {
              alchemy: 0.15 * education_koef,
              magic: 0.15 * education_koef,
              support: 0.2 * education_koef,
              technology: 0.15 * education_koef
            },
            regions: {
              industry: 0.15 * education_koef,
              infrastructure: 0.15 * education_koef,
              avg_salary: 0.17 * education_koef,
              poverty: -0.15 * education_koef
            }
          });
          /*
              country: {
                  army_quality
                  alchemy
                  education_avail
                  education_quality
                  export_trash
                  inflation
                  magic
                  science
                  stability
                  support
                  technology
              },
              regions: {
                  aqueducs
                  cargo_ship
                  people_ship
                  port
                  industry
                  infrastructure
                  pave_road
                  stone_road
                  avg_salary
                  schools
                  universities
                  population
                  poverty
                  unemployment
              }
          */
          // Корректировка потребностей

          _iteratorNormalCompletion17 = true;
          _didIteratorError17 = false;
          _iteratorError17 = undefined;
          _context.prev = 715;

          for (_iterator17 = newCountry.regions[Symbol.iterator](); !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
            _i113 = _step17.value;
            _i113.needs_blackmetall = parseInt(10 * _i113.population + 0.2 * _i113.industry_blacksmith + 0.1 * _i113.industry_jewelry + 0.1 * _i113.industry_other);
            _i113.needs_colormetall = parseInt(5 * _i113.population + 0.1 * _i113.industry_blacksmith + 0.2 * _i113.industry_jewelry + 0.15 * _i113.industry_other);
            _i113.needs_coal = parseInt(5 * _i113.population + 0.05 * _i113.industry_blacksmith + 0.05 * (_i113.industry_light + _i113.industry_jewelry));
            _i113.needs_hunting = parseInt(200 * _i113.population);
            _i113.needs_fishing = parseInt(170 * _i113.population);
            _i113.needs_forestry = parseInt(100 * _i113.population + 0.3 * _i113.industry_typography + 0.3 * _i113.industry_jewelry + 0.15 * _i113.industry_other + 0.05 * _i113.industry_light);
            _i113.needs_blacksmith = parseInt(100 * _i113.population + (0.2 * (_i113.industry_blackmetall + _i113.industry_colormetall + _i113.industry_coal) + 0.25 * _i113.industry_jewelry + 0.1 * _i113.industry_other));
            _i113.needs_animals = parseInt((300 * _i113.population + 200 * _i113.area) * 0.3);
            _i113.needs_vegetables = parseInt((300 * _i113.population + 200 * _i113.area) * 0.6);
            _i113.needs_wheat = parseInt((300 * _i113.population + 200 * _i113.area) * 0.45);
            _i113.needs_typography = parseInt(60 * _i113.population + 0.4 * _i113.industry_culture);
            _i113.needs_light = parseInt(115 * _i113.population);
            _i113.needs_eating = parseInt(150 * _i113.population);
            _i113.needs_jewelry = parseInt(100 * _i113.population);
            _i113.needs_transport = parseInt(80 * _i113.population + 0.02 * getEconomyRegSum(_i113, 'industry_transport'));
            _i113.needs_alchemy = parseInt(70 * _i113.population + 200 * _i113.area);
            _i113.needs_hiring = parseInt(100 * _i113.population + getEconomyRegSum(_i113, 'industry_hiring') * 0.035);
            _i113.needs_culture = parseInt(100 * _i113.population + getEconomyRegSum(_i113, 'industry_culture') * 0.01);
            _i113.needs_other = parseInt(130 * _i113.population + getEconomyRegSum(_i113, 'industry_other') * 0.015);
          } // Проверка окончания игры


          _context.next = 723;
          break;

        case 719:
          _context.prev = 719;
          _context.t25 = _context["catch"](715);
          _didIteratorError17 = true;
          _iteratorError17 = _context.t25;

        case 723:
          _context.prev = 723;
          _context.prev = 724;

          if (!_iteratorNormalCompletion17 && _iterator17["return"] != null) {
            _iterator17["return"]();
          }

        case 726:
          _context.prev = 726;

          if (!_didIteratorError17) {
            _context.next = 729;
            break;
          }

          throw _iteratorError17;

        case 729:
          return _context.finish(726);

        case 730:
          return _context.finish(723);

        case 731:
          loss = {
            status: false,
            cause: ''
          };
          lossCauseStabil = 'Из-за низкой политической стабильности, в стране произошел госпереворот и вы были свергнуты.';

          if (newCountry.stability < 0.2) {
            if ((0, _otherFunctions.getRandomRange)(10) === 0) {
              loss.status = true;
              loss.cause = lossCauseStabil;
            }
          }

          if (newCountry.stability < 0.15) {
            if ((0, _otherFunctions.getRandomRange)(5) === 0) {
              loss.status = true;
              loss.cause = lossCauseStabil;
            }
          }

          if (newCountry.stability < 0.1) {
            if ((0, _otherFunctions.getRandomRange)(2) === 0) {
              loss.status = true;
              loss.cause = lossCauseStabil;
            }
          }

          if (newCountry.stability < 0.05) {
            loss.status = true;
            loss.cause = lossCauseStabil;
          }

          lossCauseSupport = 'Из-за низкой поддержки, в стране произошла революция и вы были свергнуты.';

          if (newCountry.support < 0.1) {
            if ((0, _otherFunctions.getRandomRange)(3) === 0) {
              loss.status = true;
              loss.cause = lossCauseSupport;
            }
          }

          if (newCountry.support < 0.05) {
            if ((0, _otherFunctions.getRandomRange)(2) === 0) {
              loss.status = true;
              loss.cause = lossCauseSupport;
            }
          }

          if (newCountry.government[0] === 'R' && newStore.buffs.step % 48 === 0) {
            if (newCountry.support < 0.5) {
              loss.status = true;
              loss.cause = "\u041D\u0430 \u043E\u0447\u0435\u0440\u0435\u0434\u043D\u044B\u0445 \u0432\u044B\u0431\u043E\u0440\u0430\u0445 \u0432\u044B \u043D\u0430\u0431\u0440\u0430\u043B\u0438 ".concat((newCountry.support * 100 - 2.5).toFixed(2), "% \u0433\u043E\u043B\u043E\u0441\u043E\u0432 \u0438 \u043F\u0440\u043E\u0438\u0433\u0440\u0430\u043B\u0438.");
            } else {
              newsArr.push(new newsObj("\u041D\u0430 \u043E\u0447\u0435\u0440\u0435\u0434\u043D\u044B\u0445 \u0432\u044B\u0431\u043E\u0440\u0430\u0445 \u0432\u044B \u043D\u0430\u0431\u0440\u0430\u043B\u0438 ".concat((newCountry.support * 100 + 2.5).toFixed(2), "% \u0433\u043E\u043B\u043E\u0441\u043E\u0432 \u0438 \u043F\u043E\u0431\u0435\u0434\u0438\u043B\u0438."), newCountry.identify, true));
            }
          }

          if (newCountry.regions.length === 0) {
            loss.status = true;
            loss.cause = "\u0412\u0430\u0448\u0435 \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u043E \u0431\u044B\u043B\u043E \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u0437\u0430\u0445\u0432\u0430\u0447\u0435\u043D\u043E.";
          }

          win = {
            status: false,
            cause: ''
          };

          if (newCountry.regions.length === 77) {
            win.status = true;
            win.cause = "\u0412\u044B \u0437\u0430\u0432\u043E\u0435\u0432\u0430\u043B\u0438 \u0432\u0441\u0435 \u0440\u0435\u0433\u0438\u043E\u043D\u044B \u0438 \u0441\u0442\u0430\u043B\u0438 \u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u0435\u043C \u0432\u0441\u0435\u0433\u043E \u0422\u0430\u043C\u0440\u0438\u044D\u043B\u044F. \u0414\u0430 \u0437\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0435\u0442 '".concat(newCountry.name, "'");
          }

          if ((0, _otherFunctions.getGdpPerPopulation)(newCountry) > 6000) {
            win.status = true;
            win.cause = "\u0412\u0412\u041F \u043D\u0430 \u0434\u0443\u0448\u0443 \u043D\u0430\u0441\u0435\u043B\u0435\u043D\u0438\u044F, \u0441 \u043C\u043E\u043C\u0435\u043D\u0442\u0430 \u0432\u0430\u0448\u0435\u0433\u043E \u043F\u0440\u0438\u0445\u043E\u0434\u0430 \u043A \u0432\u043B\u0430\u0441\u0442\u0438, \u0443\u0432\u0435\u043B\u0438\u0447\u0438\u043B\u0441\u044F \u0432\u0434\u0432\u043E\u0435. \u0412\u044B \u0441\u0442\u0430\u043B\u0438 \u0430\u0432\u0442\u043E\u0440\u043E\u043C \u044D\u043A\u043E\u043D\u043E\u043C\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u0447\u0443\u0434\u0430.";
          } // Корректировка значений и применение изменений


          _i69 = 0, _relations2 = relations;

        case 746:
          if (!(_i69 < _relations2.length)) {
            _context.next = 770;
            break;
          }

          _i114 = _relations2[_i69];
          _iteratorNormalCompletion36 = true;
          _didIteratorError36 = false;
          _iteratorError36 = undefined;
          _context.prev = 751;

          for (_iterator36 = newStore.relations[Symbol.iterator](); !(_iteratorNormalCompletion36 = (_step36 = _iterator36.next()).done); _iteratorNormalCompletion36 = true) {
            t = _step36.value;

            if (t.pair.length === 1 && t.pair[0] === _i114.ident) {
              t.value = _i114.value > 10 ? 10 : _i114.value < -10 ? -10 : _i114.value;
            }
          }

          _context.next = 759;
          break;

        case 755:
          _context.prev = 755;
          _context.t26 = _context["catch"](751);
          _didIteratorError36 = true;
          _iteratorError36 = _context.t26;

        case 759:
          _context.prev = 759;
          _context.prev = 760;

          if (!_iteratorNormalCompletion36 && _iterator36["return"] != null) {
            _iterator36["return"]();
          }

        case 762:
          _context.prev = 762;

          if (!_didIteratorError36) {
            _context.next = 765;
            break;
          }

          throw _iteratorError36;

        case 765:
          return _context.finish(762);

        case 766:
          return _context.finish(759);

        case 767:
          _i69++;
          _context.next = 746;
          break;

        case 770:
          newCountryAI = [];
          _iteratorNormalCompletion18 = true;
          _didIteratorError18 = false;
          _iteratorError18 = undefined;
          _context.prev = 774;

          _loop3 = function _loop3() {
            var i = _step18.value;

            if (i.regions.length) {
              newCountryAI.push(i);
            } else {
              newStore.relations = newStore.relations.filter(function (e) {
                return !e.pair.includes(i.identify);
              });
              newStore.contracts = newStore.contracts.filter(function (e) {
                return !e.pair.includes(i.identify);
              });
              newStore.squad_ai = newStore.squad_ai.filter(function (e) {
                return e.country !== i.identify;
              });
            }
          };

          for (_iterator18 = newStore.country_ai[Symbol.iterator](); !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
            _loop3();
          }

          _context.next = 783;
          break;

        case 779:
          _context.prev = 779;
          _context.t27 = _context["catch"](774);
          _didIteratorError18 = true;
          _iteratorError18 = _context.t27;

        case 783:
          _context.prev = 783;
          _context.prev = 784;

          if (!_iteratorNormalCompletion18 && _iterator18["return"] != null) {
            _iterator18["return"]();
          }

        case 786:
          _context.prev = 786;

          if (!_didIteratorError18) {
            _context.next = 789;
            break;
          }

          throw _iteratorError18;

        case 789:
          return _context.finish(786);

        case 790:
          return _context.finish(783);

        case 791:
          newStore.country_ai = newCountryAI;
          outBuffer.commit();
          newCountry.alchemy = +newCountry.alchemy.toFixed(4);
          newCountry.education_avail = +newCountry.education_avail.toFixed(4);
          newCountry.education_quality = +newCountry.education_quality.toFixed(4);
          newCountry.export_trash = +newCountry.export_trash.toFixed(4);
          newCountry.inflation = +newCountry.inflation.toFixed(4);
          newCountry.magic = +newCountry.magic.toFixed(4);
          newCountry.science = +newCountry.science.toFixed(4);
          newCountry.technology = +newCountry.technology.toFixed(4);
          newCountry.support = +newCountry.support.toFixed(4);
          newCountry.stability = +newCountry.stability.toFixed(4);
          mapper_correct = ['cargo_ship', 'people_ship', 'port', 'pave_road', 'stone_road', 'poverty', 'unemployment'];
          mapper_correct.map(function (e) {
            var _iteratorNormalCompletion19 = true;
            var _didIteratorError19 = false;
            var _iteratorError19 = undefined;

            try {
              for (var _iterator19 = newCountry.regions[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                var _i70 = _step19.value;
                _i70[e] = +_i70[e].toFixed(4);
              }
            } catch (err) {
              _didIteratorError19 = true;
              _iteratorError19 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion19 && _iterator19["return"] != null) {
                  _iterator19["return"]();
                }
              } finally {
                if (_didIteratorError19) {
                  throw _iteratorError19;
                }
              }
            }

            return null;
          });
          mapper_correct = ['universities', 'schools', 'population', 'avg_salary', 'aqueducs', 'industry'];
          mapper_correct.map(function (e) {
            if (e === 'industry') {
              var _iteratorNormalCompletion20 = true;
              var _didIteratorError20 = false;
              var _iteratorError20 = undefined;

              try {
                for (var _iterator20 = newCountry.regions[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
                  var _i71 = _step20.value;

                  for (var _i72 = 0, _Object$keys50 = Object.keys(_i71); _i72 < _Object$keys50.length; _i72++) {
                    var t = _Object$keys50[_i72];

                    if (t.startsWith('industry')) {
                      _i71[t] = parseInt(_i71[t]);
                    }
                  }
                }
              } catch (err) {
                _didIteratorError20 = true;
                _iteratorError20 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion20 && _iterator20["return"] != null) {
                    _iterator20["return"]();
                  }
                } finally {
                  if (_didIteratorError20) {
                    throw _iteratorError20;
                  }
                }
              }
            } else {
              var _iteratorNormalCompletion21 = true;
              var _didIteratorError21 = false;
              var _iteratorError21 = undefined;

              try {
                for (var _iterator21 = newCountry.regions[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
                  var _i73 = _step21.value;
                  _i73[e] = parseInt(_i73[e]);
                }
              } catch (err) {
                _didIteratorError21 = true;
                _iteratorError21 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion21 && _iterator21["return"] != null) {
                    _iterator21["return"]();
                  }
                } finally {
                  if (_didIteratorError21) {
                    throw _iteratorError21;
                  }
                }
              }
            }

            return null;
          });
          _iteratorNormalCompletion22 = true;
          _didIteratorError22 = false;
          _iteratorError22 = undefined;
          _context.prev = 810;

          for (_iterator22 = newCountry.regions[Symbol.iterator](); !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
            _i115 = _step22.value;

            if (_i115.id === newCountry.capital.id) {
              newCountry.capital = _i115;
            }
          }

          _context.next = 818;
          break;

        case 814:
          _context.prev = 814;
          _context.t28 = _context["catch"](810);
          _didIteratorError22 = true;
          _iteratorError22 = _context.t28;

        case 818:
          _context.prev = 818;
          _context.prev = 819;

          if (!_iteratorNormalCompletion22 && _iterator22["return"] != null) {
            _iterator22["return"]();
          }

        case 821:
          _context.prev = 821;

          if (!_didIteratorError22) {
            _context.next = 824;
            break;
          }

          throw _iteratorError22;

        case 824:
          return _context.finish(821);

        case 825:
          return _context.finish(818);

        case 826:
          newStore.country = newCountry;
          newStore.buffs = newBuff;
          store.changeGame = [];
          store.peaceList = [];
          func.create_game(newStore);
          return _context.abrupt("return", 0);

        case 832:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[21, 25, 29, 37], [30,, 32, 36], [40, 44, 48, 56], [49,, 51, 55], [68, 73, 77, 85], [78,, 80, 84], [89, 94, 98, 106], [99,, 101, 105], [128, 132, 136, 144], [137,, 139, 143], [149, 153, 157, 165], [158,, 160, 164], [191, 195, 199, 207], [200,, 202, 206], [211, 215, 219, 227], [220,, 222, 226], [233, 276, 280, 288], [281,, 283, 287], [298, 655, 659, 667], [324, 328, 332, 340], [333,, 335, 339], [344, 348, 352, 360], [353,, 355, 359], [367, 371, 375, 383], [376,, 378, 382], [389, 393, 397, 405], [398,, 400, 404], [408, 412, 416, 424], [417,, 419, 423], [443, 447, 451, 459], [452,, 454, 458], [471, 483, 487, 495], [488,, 490, 494], [501, 513, 517, 525], [518,, 520, 524], [530, 534, 538, 546], [539,, 541, 545], [552, 591, 595, 603], [560, 572, 576, 584], [577,, 579, 583], [596,, 598, 602], [606, 637, 641, 649], [615, 619, 623, 631], [624,, 626, 630], [642,, 644, 648], [660,, 662, 666], [715, 719, 723, 731], [724,, 726, 730], [751, 755, 759, 767], [760,, 762, 766], [774, 779, 783, 791], [784,, 786, 790], [810, 814, 818, 826], [819,, 821, 825]]);
}