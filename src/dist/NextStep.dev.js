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
  var newStore, newCountry, newBuff, easyBuff, easyRegionBuff, countRegionBuff, hardRegionBuff, countryBuffs, regionBuffs, buffer, outBufferClass, outBuffer, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, reg, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, _reg3, hashGovernmentBuffs, hashAreaFormatBuffs, currentGovernment, currentGovernmentOpts, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _loop, _iterator8, _step8, currentAreaFormat, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _loop2, _iterator9, _step9, hashArmyBuffs, currentArmySalaryOpts, armySalaryKoef, diffArmy, koef, _i7, _Object$keys6, _i75, typer, _i76, _Object$keys52, f, _i8, _Object$keys7, _i77, _typer, _i78, _Object$keys53, _f, _i9, _Object$keys8, _i79, _typer2, _i80, _Object$keys54, _f2, currentArmyMaintainOpts, armyMaintainKoef, _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, param, ind, _i81, _Object$keys55, _type17, _i82, _Object$keys56, buff, currentArmyEquipOpts, armyEquipKoef, _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step11, _param, _ind, _i83, _Object$keys57, _type18, _i84, _Object$keys58, _buff, unemploy, unemployHasher, _i10, _Object$keys9, i, _i11, _Object$keys10, type, _i12, _Object$keys11, _i13, _i14, _Object$keys12, _type, _i15, _Object$keys13, _i16, _i17, _Object$keys14, _type2, _i18, _Object$keys15, _i19, _i20, _Object$keys16, _type3, _i21, _Object$keys17, _i22, _i23, _Object$keys18, _type4, poverty, povertyHasher, _i24, _Object$keys19, _i25, _i26, _Object$keys20, _type5, _i27, _Object$keys21, _i28, _i29, _Object$keys22, _type6, _i30, _Object$keys23, _i31, _i32, _Object$keys24, _type7, _i33, _Object$keys25, _i34, _i35, _Object$keys26, _type8, _i36, _Object$keys27, _i37, _i38, _Object$keys28, _type9, _i39, _Object$keys29, _i40, _i41, _Object$keys30, _type10, inflation, inflationHasher, _i42, _Object$keys31, _i43, _i44, _Object$keys32, _type11, _i45, _Object$keys33, _i46, _i47, _Object$keys34, _type12, _i48, _Object$keys35, _i49, _i50, _Object$keys36, _type13, _i51, _Object$keys37, _i52, _i53, _Object$keys38, _type14, _i54, _Object$keys39, _i55, _i56, _Object$keys40, _type15, _i57, _Object$keys41, _i58, _i59, _Object$keys42, _type16, physTax, jurTax, taxHasher, _i60, _Object$keys43, _type19, _i85, _Object$keys59, ch, _i61, _Object$keys44, _type20, _i86, _Object$keys60, _ch, _i62, _Object$keys45, _i87, budget, budgetHasher, _i63, _Object$keys46, item, _i88, _Object$keys61, _type21, _i89, _Object$keys62, _i90, _i64, _Object$keys47, _i91, _iteratorNormalCompletion12, _didIteratorError12, _iteratorError12, _iterator12, _step12, _i92, _i93, _Object$keys63, prop, balance, percent, _koef2, relations, _iteratorNormalCompletion13, _didIteratorError13, _iteratorError13, _iterator13, _step13, _i94, setRelation, _i66, _relations, _i95, country, _i96, _Object$keys64, law, contracts, livedContracts, _iteratorNormalCompletion15, _didIteratorError15, _iteratorError15, _iterator15, _step15, _i97, newsArr, newsObj, priorityContracts, deadlineContracts, abbrContracts, relationContracts, _iteratorNormalCompletion16, _didIteratorError16, _iteratorError16, _iterator16, _step16, _i98, conCountry, conContract, typeChange, relation, approv, newspaper, redactStatus, conBuff, randomKoef, economyProp, output, war, _iteratorNormalCompletion22, _didIteratorError22, _iteratorError22, _iterator22, _step22, _i99, peace, _iteratorNormalCompletion23, _didIteratorError23, _iteratorError23, _iterator23, _step23, _i100, ownRegs, newOwnRegs, enemyRegs, newEnemyRegs, _iteratorNormalCompletion24, _didIteratorError24, _iteratorError24, _iterator24, _step24, _i101, whose, _iteratorNormalCompletion25, _didIteratorError25, _iteratorError25, _iterator25, _step25, _i102, _iteratorNormalCompletion26, _didIteratorError26, _iteratorError26, _iterator26, _step26, _i103, changerCont, _iteratorNormalCompletion27, _didIteratorError27, _iteratorError27, _iterator27, _step27, _i104, cont, _iteratorNormalCompletion28, _didIteratorError28, _iteratorError28, _iterator28, _step28, _i105, _peace, _iteratorNormalCompletion29, _didIteratorError29, _iteratorError29, _iterator29, _step29, _i106, _war, newContracts, _iteratorNormalCompletion30, _didIteratorError30, _iteratorError30, _iterator30, _step30, _i107, regs, _iteratorNormalCompletion31, _didIteratorError31, _iteratorError31, _iterator31, _step31, _i108, _iteratorNormalCompletion33, _didIteratorError33, _iteratorError33, _iterator33, _step33, c, _iteratorNormalCompletion32, _didIteratorError32, _iteratorError32, _iterator32, _step32, _c, _iteratorNormalCompletion34, _didIteratorError34, _iteratorError34, _iterator34, _step34, _i109, lawBuffer, _i67, _Object$keys48, _law, inverseBuff, _i110, _Object$keys65, _type22, _i111, _Object$keys66, bf, social_koef, avg_salary, transport_koef, science_koef, education_koef, _i68, _relations2, _i112, _iteratorNormalCompletion35, _didIteratorError35, _iteratorError35, _iterator35, _step35, t, newCountryAI, _iteratorNormalCompletion17, _didIteratorError17, _iteratorError17, _loop3, _iterator17, _step17, mapper_correct, _iteratorNormalCompletion21, _didIteratorError21, _iteratorError21, _iterator21, _step21, _i113;

  return regeneratorRuntime.async(function nextStep$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
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
              industry: 0.008,
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
                  industry: 0.008,
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
                  console.log(dir);

                  for (var _i5 = 0, _Object$keys5 = Object.keys(hash[dir]); _i5 < _Object$keys5.length; _i5++) {
                    var type = _Object$keys5[_i5];
                    console.log(type, hash[dir][type]);
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
          _context.prev = 20;

          for (_iterator4 = newCountry.regions[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            reg = _step4.value;
            reg["cargo_ship"] = reg["cargo_ship"] + newBuff["delivery_box"] * reg["cargo_ship"] * (reg.name === newCountry.capital.name ? 1.1 : 1);
          }

          _context.next = 28;
          break;

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](20);
          _didIteratorError4 = true;
          _iteratorError4 = _context.t0;

        case 28:
          _context.prev = 28;
          _context.prev = 29;

          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }

        case 31:
          _context.prev = 31;

          if (!_didIteratorError4) {
            _context.next = 34;
            break;
          }

          throw _iteratorError4;

        case 34:
          return _context.finish(31);

        case 35:
          return _context.finish(28);

        case 36:
          _iteratorNormalCompletion5 = true;
          _didIteratorError5 = false;
          _iteratorError5 = undefined;
          _context.prev = 39;

          for (_iterator5 = newCountry.regions[Symbol.iterator](); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            _reg3 = _step5.value;
            _reg3["people_ship"] = _reg3["people_ship"] + newBuff["delivery_people"] * _reg3["people_ship"] * (_reg3.name === newCountry.capital.name ? 1.1 : 1);
          }

          _context.next = 47;
          break;

        case 43:
          _context.prev = 43;
          _context.t1 = _context["catch"](39);
          _didIteratorError5 = true;
          _iteratorError5 = _context.t1;

        case 47:
          _context.prev = 47;
          _context.prev = 48;

          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }

        case 50:
          _context.prev = 50;

          if (!_didIteratorError5) {
            _context.next = 53;
            break;
          }

          throw _iteratorError5;

        case 53:
          return _context.finish(50);

        case 54:
          return _context.finish(47);

        case 55:
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
          _context.prev = 67;

          _loop = function _loop() {
            var i = _step8.value;
            var hash = currentGovernment.additional[currentGovernmentOpts.indexOf(i)];

            if (+i === 1) {
              ["country", "regions"].map(function (e) {
                for (var _i73 = 0, _Object$keys50 = Object.keys(hash[e]); _i73 < _Object$keys50.length; _i73++) {
                  var sec = _Object$keys50[_i73];
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

          _context.next = 76;
          break;

        case 72:
          _context.prev = 72;
          _context.t2 = _context["catch"](67);
          _didIteratorError8 = true;
          _iteratorError8 = _context.t2;

        case 76:
          _context.prev = 76;
          _context.prev = 77;

          if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
            _iterator8["return"]();
          }

        case 79:
          _context.prev = 79;

          if (!_didIteratorError8) {
            _context.next = 82;
            break;
          }

          throw _iteratorError8;

        case 82:
          return _context.finish(79);

        case 83:
          return _context.finish(76);

        case 84:
          currentAreaFormat = newCountry.area_format.split(",");
          _iteratorNormalCompletion9 = true;
          _didIteratorError9 = false;
          _iteratorError9 = undefined;
          _context.prev = 88;

          _loop2 = function _loop2() {
            var i = _step9.value;
            var hash = hashAreaFormatBuffs[Object.keys(hashAreaFormatBuffs)[currentAreaFormat.indexOf(i)]];

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

          for (_iterator9 = currentAreaFormat[Symbol.iterator](); !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            _loop2();
          } // Баффы "Армия"


          _context.next = 97;
          break;

        case 93:
          _context.prev = 93;
          _context.t3 = _context["catch"](88);
          _didIteratorError9 = true;
          _iteratorError9 = _context.t3;

        case 97:
          _context.prev = 97;
          _context.prev = 98;

          if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
            _iterator9["return"]();
          }

        case 100:
          _context.prev = 100;

          if (!_didIteratorError9) {
            _context.next = 103;
            break;
          }

          throw _iteratorError9;

        case 103:
          return _context.finish(100);

        case 104:
          return _context.finish(97);

        case 105:
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
            _i75 = _Object$keys6[_i7];
            typer = hashArmyBuffs.army_salary[0][_i75];

            for (_i76 = 0, _Object$keys52 = Object.keys(typer); _i76 < _Object$keys52.length; _i76++) {
              f = _Object$keys52[_i76];
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
            _i77 = _Object$keys7[_i8];
            _typer = hashArmyBuffs.army_salary[1][_i77];

            for (_i78 = 0, _Object$keys53 = Object.keys(_typer); _i78 < _Object$keys53.length; _i78++) {
              _f = _Object$keys53[_i78];
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
            _i79 = _Object$keys8[_i9];
            _typer2 = hashArmyBuffs.army_salary[0][_i79];

            for (_i80 = 0, _Object$keys54 = Object.keys(_typer2); _i80 < _Object$keys54.length; _i80++) {
              _f2 = _Object$keys54[_i80];
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
          _context.prev = 127;

          for (_iterator10 = hashArmyBuffs.army_maintain[Symbol.iterator](); !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            param = _step10.value;
            ind = hashArmyBuffs.army_maintain.indexOf(param);

            for (_i81 = 0, _Object$keys55 = Object.keys(param); _i81 < _Object$keys55.length; _i81++) {
              _type17 = _Object$keys55[_i81];

              for (_i82 = 0, _Object$keys56 = Object.keys(param[_type17]); _i82 < _Object$keys56.length; _i82++) {
                buff = _Object$keys56[_i82];
                param[_type17][buff] = param[_type17][buff] * armyMaintainKoef[ind][currentArmyMaintainOpts[ind]];
              }
            }

            outBuffer.add(param);
          }

          _context.next = 135;
          break;

        case 131:
          _context.prev = 131;
          _context.t4 = _context["catch"](127);
          _didIteratorError10 = true;
          _iteratorError10 = _context.t4;

        case 135:
          _context.prev = 135;
          _context.prev = 136;

          if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
            _iterator10["return"]();
          }

        case 138:
          _context.prev = 138;

          if (!_didIteratorError10) {
            _context.next = 141;
            break;
          }

          throw _iteratorError10;

        case 141:
          return _context.finish(138);

        case 142:
          return _context.finish(135);

        case 143:
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
          _context.prev = 148;

          for (_iterator11 = hashArmyBuffs.army_equip[Symbol.iterator](); !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
            _param = _step11.value;
            _ind = hashArmyBuffs.army_equip.indexOf(_param);

            for (_i83 = 0, _Object$keys57 = Object.keys(_param); _i83 < _Object$keys57.length; _i83++) {
              _type18 = _Object$keys57[_i83];

              for (_i84 = 0, _Object$keys58 = Object.keys(_param[_type18]); _i84 < _Object$keys58.length; _i84++) {
                _buff = _Object$keys58[_i84];
                _param[_type18][_buff] = _param[_type18][_buff] * armyEquipKoef[_ind][currentArmyEquipOpts[_ind]];
              }
            }

            outBuffer.add(_param);
          } // Баффы "Экономика"


          _context.next = 156;
          break;

        case 152:
          _context.prev = 152;
          _context.t5 = _context["catch"](148);
          _didIteratorError11 = true;
          _iteratorError11 = _context.t5;

        case 156:
          _context.prev = 156;
          _context.prev = 157;

          if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
            _iterator11["return"]();
          }

        case 159:
          _context.prev = 159;

          if (!_didIteratorError11) {
            _context.next = 162;
            break;
          }

          throw _iteratorError11;

        case 162:
          return _context.finish(159);

        case 163:
          return _context.finish(156);

        case 164:
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

            for (_i85 = 0, _Object$keys59 = Object.keys(taxHasher.phys[_type19]); _i85 < _Object$keys59.length; _i85++) {
              ch = _Object$keys59[_i85];

              if (ch === "population") {
                taxHasher.phys[_type19][ch] = taxHasher.phys[_type19][ch] * (1 - (+physTax[0] + +physTax[1]));
              } else {
                taxHasher.phys[_type19][ch] = taxHasher.phys[_type19][ch] * (+physTax[0] + +physTax[1]);
              }
            }
          }

          for (_i61 = 0, _Object$keys44 = Object.keys(taxHasher.jur); _i61 < _Object$keys44.length; _i61++) {
            _type20 = _Object$keys44[_i61];

            for (_i86 = 0, _Object$keys60 = Object.keys(taxHasher.jur[_type20]); _i86 < _Object$keys60.length; _i86++) {
              _ch = _Object$keys60[_i86];
              taxHasher.jur[_type20][_ch] = taxHasher.jur[_type20][_ch] * (+jurTax[0] + +jurTax[1] + +jurTax[2] + +jurTax[3]);
            }
          }

          for (_i62 = 0, _Object$keys45 = Object.keys(taxHasher); _i62 < _Object$keys45.length; _i62++) {
            _i87 = _Object$keys45[_i62];
            outBuffer.add(taxHasher[_i87]);
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

            for (_i88 = 0, _Object$keys61 = Object.keys(budgetHasher[item]); _i88 < _Object$keys61.length; _i88++) {
              _type21 = _Object$keys61[_i88];

              for (_i89 = 0, _Object$keys62 = Object.keys(budgetHasher[item][_type21]); _i89 < _Object$keys62.length; _i89++) {
                _i90 = _Object$keys62[_i89];

                if (countRegionBuff.includes(_i90)) {
                  budgetHasher[item][_type21][_i90] = Math.round(budgetHasher[item][_type21][_i90] * (budget[item] - 0.4));
                } else {
                  budgetHasher[item][_type21][_i90] = budgetHasher[item][_type21][_i90] * (budget[item] - 0.5);
                }
              }
            }
          }

          for (_i64 = 0, _Object$keys47 = Object.keys(budgetHasher); _i64 < _Object$keys47.length; _i64++) {
            _i91 = _Object$keys47[_i64];
            outBuffer.add(budgetHasher[_i91]);
          }

          newBuff.kazna = newBuff.kazna + (0, _otherFunctions.getBalance)(newStore);
          _iteratorNormalCompletion12 = true;
          _didIteratorError12 = false;
          _iteratorError12 = undefined;
          _context.prev = 190;

          for (_iterator12 = newCountry.regions[Symbol.iterator](); !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
            _i92 = _step12.value;

            for (_i93 = 0, _Object$keys63 = Object.keys(_i92); _i93 < _Object$keys63.length; _i93++) {
              prop = _Object$keys63[_i93];

              if (prop.startsWith("industry")) {
                balance = _i92[prop] - _i92["needs_".concat(prop.split("_")[1])];
                percent = _i92[prop] / _i92["needs_".concat(prop.split("_")[1])];
                _i92[prop] = _i92[prop] + _i92[prop] * (balance > 0 ? 0.002 : 0.005) * (_i92.name === newCountry.capital.name ? 1.1 : 1);
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


          _context.next = 198;
          break;

        case 194:
          _context.prev = 194;
          _context.t6 = _context["catch"](190);
          _didIteratorError12 = true;
          _iteratorError12 = _context.t6;

        case 198:
          _context.prev = 198;
          _context.prev = 199;

          if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
            _iterator12["return"]();
          }

        case 201:
          _context.prev = 201;

          if (!_didIteratorError12) {
            _context.next = 204;
            break;
          }

          throw _iteratorError12;

        case 204:
          return _context.finish(201);

        case 205:
          return _context.finish(198);

        case 206:
          relations = [];
          _iteratorNormalCompletion13 = true;
          _didIteratorError13 = false;
          _iteratorError13 = undefined;
          _context.prev = 210;

          for (_iterator13 = newStore.relations[Symbol.iterator](); !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
            _i94 = _step13.value;

            if (_i94.pair.length === 1) {
              relations.push({
                value: _i94.value,
                ident: _i94.pair[0],
                id: _i94.id
              });
            }
          }

          _context.next = 218;
          break;

        case 214:
          _context.prev = 214;
          _context.t7 = _context["catch"](210);
          _didIteratorError13 = true;
          _iteratorError13 = _context.t7;

        case 218:
          _context.prev = 218;
          _context.prev = 219;

          if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
            _iterator13["return"]();
          }

        case 221:
          _context.prev = 221;

          if (!_didIteratorError13) {
            _context.next = 224;
            break;
          }

          throw _iteratorError13;

        case 224:
          return _context.finish(221);

        case 225:
          return _context.finish(218);

        case 226:
          for (_i66 = 0, _relations = relations; _i66 < _relations.length; _i66++) {
            _i95 = _relations[_i66];
            country = (0, _otherFunctions.getCountry)(newStore, _i95.ident);
            _i95.value = _i95.value + ((0, _otherFunctions.getRandomRange)(10) === 1 ? 1 : 0) * (country.government[0] === newCountry.government[0] ? 1 : -1);

            for (_i96 = 0, _Object$keys64 = Object.keys(country); _i96 < _Object$keys64.length; _i96++) {
              law = _Object$keys64[_i96];

              if (law.startsWith("law_")) {
                _i95.value = _i95.value + ((0, _otherFunctions.getRandomRange)(75) === 1 ? 1 : 0) * (newCountry[law] === country[law] ? 1 : -1);
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
          _context.prev = 232;
          _iterator15 = contracts[Symbol.iterator]();

        case 234:
          if (_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done) {
            _context.next = 273;
            break;
          }

          _i97 = _step15.value;
          _context.t8 = _i97.con_type;
          _context.next = _context.t8 === "AL" ? 239 : _context.t8 === "CM" ? 241 : _context.t8 === "CT" ? 243 : _context.t8 === "SH" ? 246 : _context.t8 === "EH" ? 249 : _context.t8 === "PA" ? 252 : _context.t8 === "ES" ? 254 : _context.t8 === "DW" ? 257 : _context.t8 === "CP" ? 259 : _context.t8 === "FW" ? 262 : _context.t8 === "VC" ? 265 : 268;
          break;

        case 239:
          outBuffer.add({
            country: {
              army_quality: 0.1,
              stability: 0.05
            },
            regions: {}
          });
          return _context.abrupt("break", 269);

        case 241:
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
          return _context.abrupt("break", 269);

        case 243:
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
          setRelation(_i97.pair[0], (0, _otherFunctions.getRandomRange)(6) === 1 ? 1 : 0);
          return _context.abrupt("break", 269);

        case 246:
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
          setRelation(_i97.pair[0], (0, _otherFunctions.getRandomRange)(10) === 1 ? 1 : 0);
          return _context.abrupt("break", 269);

        case 249:
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
          setRelation(_i97.pair[0], (0, _otherFunctions.getRandomRange)(7) === 1 ? 1 : 0);
          return _context.abrupt("break", 269);

        case 252:
          outBuffer.add(_i97.priority !== newCountry.name ? {
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
          return _context.abrupt("break", 269);

        case 254:
          outBuffer.add(_i97.priority !== newCountry.name ? {
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
          setRelation(_i97.pair[0], (0, _otherFunctions.getRandomRange)(6) === 1 ? -1 : 0);
          return _context.abrupt("break", 269);

        case 257:
          outBuffer.add(_i97.priority !== newCountry.name ? {
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
          return _context.abrupt("break", 269);

        case 259:
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
          setRelation(_i97.pair[0], (0, _otherFunctions.getRandomRange)(10) === 1 ? 1 : 0);
          return _context.abrupt("break", 269);

        case 262:
          outBuffer.add(_i97.priority !== newCountry.name ? {
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
          newBuff.kazna = newBuff.kazna + (0, _otherFunctions.getReparation)(newStore.country) * (_i97.priority !== newCountry.name ? -1 : 1);
          return _context.abrupt("break", 269);

        case 265:
          outBuffer.add(_i97.priority !== newCountry.name ? {
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
          setRelation(_i97.pair[0], (0, _otherFunctions.getRandomRange)(15) === 1 ? -1 : 0);
          return _context.abrupt("break", 269);

        case 268:
          return _context.abrupt("break", 269);

        case 269:
          if (_i97.deadline !== newBuff.step) {
            livedContracts.push(_i97);
          }

        case 270:
          _iteratorNormalCompletion15 = true;
          _context.next = 234;
          break;

        case 273:
          _context.next = 279;
          break;

        case 275:
          _context.prev = 275;
          _context.t9 = _context["catch"](232);
          _didIteratorError15 = true;
          _iteratorError15 = _context.t9;

        case 279:
          _context.prev = 279;
          _context.prev = 280;

          if (!_iteratorNormalCompletion15 && _iterator15["return"] != null) {
            _iterator15["return"]();
          }

        case 282:
          _context.prev = 282;

          if (!_didIteratorError15) {
            _context.next = 285;
            break;
          }

          throw _iteratorError15;

        case 285:
          return _context.finish(282);

        case 286:
          return _context.finish(279);

        case 287:
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
          _context.prev = 297;
          _iterator16 = store.changeGame[Symbol.iterator]();

        case 299:
          if (_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done) {
            _context.next = 652;
            break;
          }

          _i98 = _step16.value;

          if (!_i98.startsWith("contract_")) {
            _context.next = 649;
            break;
          }

          conCountry = _i98.split("_")[1];
          conContract = _i98.split("_")[2];
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
          _context.next = _context.t10 === "VC" ? 315 : _context.t10 === "FW" ? 318 : _context.t10 === "AL" ? 431 : _context.t10 === "CM" ? 431 : _context.t10 === "PA" ? 431 : _context.t10 === "CT" ? 431 : _context.t10 === "SH" ? 431 : _context.t10 === "EH" ? 431 : _context.t10 === "CP" ? 431 : _context.t10 === "ES" ? 431 : _context.t10 === "DW" ? 431 : 433;
          break;

        case 315:
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

          return _context.abrupt("break", 434);

        case 318:
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
          _iteratorNormalCompletion22 = true;
          _didIteratorError22 = false;
          _iteratorError22 = undefined;
          _context.prev = 323;

          for (_iterator22 = newStore.contracts[Symbol.iterator](); !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
            _i99 = _step22.value;

            if (_i99.con_type === "DW" && _i99.pair.length === 1 && _i99.pair[0] === conCountry) {
              war = _i99.occuped.split(",");
            }
          }

          _context.next = 331;
          break;

        case 327:
          _context.prev = 327;
          _context.t11 = _context["catch"](323);
          _didIteratorError22 = true;
          _iteratorError22 = _context.t11;

        case 331:
          _context.prev = 331;
          _context.prev = 332;

          if (!_iteratorNormalCompletion22 && _iterator22["return"] != null) {
            _iterator22["return"]();
          }

        case 334:
          _context.prev = 334;

          if (!_didIteratorError22) {
            _context.next = 337;
            break;
          }

          throw _iteratorError22;

        case 337:
          return _context.finish(334);

        case 338:
          return _context.finish(331);

        case 339:
          peace = void 0;
          _iteratorNormalCompletion23 = true;
          _didIteratorError23 = false;
          _iteratorError23 = undefined;
          _context.prev = 343;

          for (_iterator23 = store.peaceList[Symbol.iterator](); !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
            _i100 = _step23.value;

            if (_i100.country === conCountry) {
              peace = _i100;
            }
          }

          _context.next = 351;
          break;

        case 347:
          _context.prev = 347;
          _context.t12 = _context["catch"](343);
          _didIteratorError23 = true;
          _iteratorError23 = _context.t12;

        case 351:
          _context.prev = 351;
          _context.prev = 352;

          if (!_iteratorNormalCompletion23 && _iterator23["return"] != null) {
            _iterator23["return"]();
          }

        case 354:
          _context.prev = 354;

          if (!_didIteratorError23) {
            _context.next = 357;
            break;
          }

          throw _iteratorError23;

        case 357:
          return _context.finish(354);

        case 358:
          return _context.finish(351);

        case 359:
          ownRegs = newCountry.regions.length;
          newOwnRegs = ownRegs;
          enemyRegs = (0, _otherFunctions.getCountry)(newStore, conCountry).regions.length;
          newEnemyRegs = enemyRegs;
          _iteratorNormalCompletion24 = true;
          _didIteratorError24 = false;
          _iteratorError24 = undefined;
          _context.prev = 366;

          for (_iterator24 = war[Symbol.iterator](); !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
            _i101 = _step24.value;
            whose = (0, _otherFunctions.whoseReg)(newStore, _i101);

            if (whose === newCountry.identify) {
              newOwnRegs--;
              newEnemyRegs++;
            } else {
              newOwnRegs++;
              newEnemyRegs--;
            }
          }

          _context.next = 374;
          break;

        case 370:
          _context.prev = 370;
          _context.t13 = _context["catch"](366);
          _didIteratorError24 = true;
          _iteratorError24 = _context.t13;

        case 374:
          _context.prev = 374;
          _context.prev = 375;

          if (!_iteratorNormalCompletion24 && _iterator24["return"] != null) {
            _iterator24["return"]();
          }

        case 377:
          _context.prev = 377;

          if (!_didIteratorError24) {
            _context.next = 380;
            break;
          }

          throw _iteratorError24;

        case 380:
          return _context.finish(377);

        case 381:
          return _context.finish(374);

        case 382:
          output.war.own = newOwnRegs / ownRegs;
          output.war.enemy = newEnemyRegs / enemyRegs;
          newOwnRegs = newEnemyRegs = 0;
          _iteratorNormalCompletion25 = true;
          _didIteratorError25 = false;
          _iteratorError25 = undefined;
          _context.prev = 388;

          for (_iterator25 = newCountry.regions[Symbol.iterator](); !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
            _i102 = _step25.value;

            if (peace.own.includes(_i102.name) || !(peace.own.includes(_i102.name) || peace.enemy.includes(_i102.name))) {
              newOwnRegs++;
            } else {
              newEnemyRegs++;
            }
          }

          _context.next = 396;
          break;

        case 392:
          _context.prev = 392;
          _context.t14 = _context["catch"](388);
          _didIteratorError25 = true;
          _iteratorError25 = _context.t14;

        case 396:
          _context.prev = 396;
          _context.prev = 397;

          if (!_iteratorNormalCompletion25 && _iterator25["return"] != null) {
            _iterator25["return"]();
          }

        case 399:
          _context.prev = 399;

          if (!_didIteratorError25) {
            _context.next = 402;
            break;
          }

          throw _iteratorError25;

        case 402:
          return _context.finish(399);

        case 403:
          return _context.finish(396);

        case 404:
          _iteratorNormalCompletion26 = true;
          _didIteratorError26 = false;
          _iteratorError26 = undefined;
          _context.prev = 407;

          for (_iterator26 = (0, _otherFunctions.getCountry)(newStore, conCountry).regions[Symbol.iterator](); !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
            _i103 = _step26.value;

            if (peace.enemy.includes(_i103.name) || !(peace.own.includes(_i103.name) || peace.enemy.includes(_i103.name))) {
              newEnemyRegs++;
            } else {
              newOwnRegs++;
            }
          }

          _context.next = 415;
          break;

        case 411:
          _context.prev = 411;
          _context.t15 = _context["catch"](407);
          _didIteratorError26 = true;
          _iteratorError26 = _context.t15;

        case 415:
          _context.prev = 415;
          _context.prev = 416;

          if (!_iteratorNormalCompletion26 && _iterator26["return"] != null) {
            _iterator26["return"]();
          }

        case 418:
          _context.prev = 418;

          if (!_didIteratorError26) {
            _context.next = 421;
            break;
          }

          throw _iteratorError26;

        case 421:
          return _context.finish(418);

        case 422:
          return _context.finish(415);

        case 423:
          output.peace.own = newOwnRegs / ownRegs;
          output.peace.enemy = newEnemyRegs / enemyRegs;
          output.army.own = (0, _otherFunctions.getArmy)(newStore.squad, false);
          output.army.enemy = (0, _otherFunctions.getAIArmy)(newStore.squad_ai, conCountry, false);
          randomKoef = (0, _neuroFunctions.getAnswerPeace)(output);
          newspaper.push(new newsObj("\u0421 \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u043E\u043C ".concat(_identCountries["default"][conCountry], " \u0437\u0430\u043A\u043B\u044E\u0447\u0435\u043D \u043C\u0438\u0440"), conCountry, true), new newsObj("".concat(_identCountries["default"][conCountry], " \u043E\u0442\u0432\u0435\u0440\u0433\u043B\u0438 \u0432\u0430\u0448\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043E \u043C\u0438\u0440\u0435"), conCountry, false));
          redactStatus = true;
          return _context.abrupt("break", 434);

        case 431:
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
            } else if (_i98.split("_")[2] === "ES") {
              randomKoef = 9;
              newspaper.push(new newsObj("\u042D\u043A\u043E\u043D\u043E\u043C\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0441\u0430\u043D\u043A\u0446\u0438\u0438 \u0441 \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0430 ".concat(_identCountries["default"][conCountry], " \u0431\u044B\u043B\u0438 \u0441\u043D\u044F\u0442\u044B"), conCountry, true), new newsObj());
            }

            redactStatus = false;
          }

          return _context.abrupt("break", 434);

        case 433:
          return _context.abrupt("break", 434);

        case 434:
          approv = (0, _otherFunctions.getRandomRange)(10 - randomKoef) === 0;
          newsArr.push(approv ? newspaper[0].getObj() : newspaper[1].getObj());

          if (!approv) {
            _context.next = 648;
            break;
          }

          if (!(conContract === "DW")) {
            _context.next = 460;
            break;
          }

          changerCont = [];
          _iteratorNormalCompletion27 = true;
          _didIteratorError27 = false;
          _iteratorError27 = undefined;
          _context.prev = 442;

          for (_iterator27 = newStore.contracts[Symbol.iterator](); !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
            _i104 = _step27.value;

            if (!(_i104.pair.length === 1 && _i104.pair[0] === conCountry)) {
              changerCont.push(_i104);
            }
          }

          _context.next = 450;
          break;

        case 446:
          _context.prev = 446;
          _context.t16 = _context["catch"](442);
          _didIteratorError27 = true;
          _iteratorError27 = _context.t16;

        case 450:
          _context.prev = 450;
          _context.prev = 451;

          if (!_iteratorNormalCompletion27 && _iterator27["return"] != null) {
            _iterator27["return"]();
          }

        case 453:
          _context.prev = 453;

          if (!_didIteratorError27) {
            _context.next = 456;
            break;
          }

          throw _iteratorError27;

        case 456:
          return _context.finish(453);

        case 457:
          return _context.finish(450);

        case 458:
          newStore.contracts = changerCont;
          conBuff = {
            country: {
              army_quality: 0.25,
              stability: -2,
              support: -2.5
            },
            regions: {}
          };

        case 460:
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
            _context.next = 466;
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

          _context.next = 495;
          break;

        case 466:
          cont = {};
          _iteratorNormalCompletion28 = true;
          _didIteratorError28 = false;
          _iteratorError28 = undefined;
          _context.prev = 470;
          _iterator28 = newStore.contracts[Symbol.iterator]();

        case 472:
          if (_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done) {
            _context.next = 480;
            break;
          }

          _i105 = _step28.value;

          if (!(_i105.con_type === conContract && _i105.pair.length === 1 && _i105.pair[0] === conCountry)) {
            _context.next = 477;
            break;
          }

          cont = _i105;
          return _context.abrupt("break", 480);

        case 477:
          _iteratorNormalCompletion28 = true;
          _context.next = 472;
          break;

        case 480:
          _context.next = 486;
          break;

        case 482:
          _context.prev = 482;
          _context.t17 = _context["catch"](470);
          _didIteratorError28 = true;
          _iteratorError28 = _context.t17;

        case 486:
          _context.prev = 486;
          _context.prev = 487;

          if (!_iteratorNormalCompletion28 && _iterator28["return"] != null) {
            _iterator28["return"]();
          }

        case 489:
          _context.prev = 489;

          if (!_didIteratorError28) {
            _context.next = 492;
            break;
          }

          throw _iteratorError28;

        case 492:
          return _context.finish(489);

        case 493:
          return _context.finish(486);

        case 494:
          newStore.contracts.splice(newStore.contracts.indexOf(cont), 1);

        case 495:
          if (!(conContract === "FW")) {
            _context.next = 648;
            break;
          }

          _peace = {};
          _iteratorNormalCompletion29 = true;
          _didIteratorError29 = false;
          _iteratorError29 = undefined;
          _context.prev = 500;
          _iterator29 = store.peaceList[Symbol.iterator]();

        case 502:
          if (_iteratorNormalCompletion29 = (_step29 = _iterator29.next()).done) {
            _context.next = 510;
            break;
          }

          _i106 = _step29.value;

          if (!(_i106.country === conCountry)) {
            _context.next = 507;
            break;
          }

          _peace = _i106;
          return _context.abrupt("break", 510);

        case 507:
          _iteratorNormalCompletion29 = true;
          _context.next = 502;
          break;

        case 510:
          _context.next = 516;
          break;

        case 512:
          _context.prev = 512;
          _context.t18 = _context["catch"](500);
          _didIteratorError29 = true;
          _iteratorError29 = _context.t18;

        case 516:
          _context.prev = 516;
          _context.prev = 517;

          if (!_iteratorNormalCompletion29 && _iterator29["return"] != null) {
            _iterator29["return"]();
          }

        case 519:
          _context.prev = 519;

          if (!_didIteratorError29) {
            _context.next = 522;
            break;
          }

          throw _iteratorError29;

        case 522:
          return _context.finish(519);

        case 523:
          return _context.finish(516);

        case 524:
          _war = {};
          newContracts = [];
          _iteratorNormalCompletion30 = true;
          _didIteratorError30 = false;
          _iteratorError30 = undefined;
          _context.prev = 529;

          for (_iterator30 = newStore.contracts[Symbol.iterator](); !(_iteratorNormalCompletion30 = (_step30 = _iterator30.next()).done); _iteratorNormalCompletion30 = true) {
            _i107 = _step30.value;

            if (_i107.con_type === "DW" && _i107.pair.length === 1 && _i107.pair[0] === conCountry) {
              _war = _i107;
            } else {
              newContracts.push(_i107);
            }
          }

          _context.next = 537;
          break;

        case 533:
          _context.prev = 533;
          _context.t19 = _context["catch"](529);
          _didIteratorError30 = true;
          _iteratorError30 = _context.t19;

        case 537:
          _context.prev = 537;
          _context.prev = 538;

          if (!_iteratorNormalCompletion30 && _iterator30["return"] != null) {
            _iterator30["return"]();
          }

        case 540:
          _context.prev = 540;

          if (!_didIteratorError30) {
            _context.next = 543;
            break;
          }

          throw _iteratorError30;

        case 543:
          return _context.finish(540);

        case 544:
          return _context.finish(537);

        case 545:
          newStore.contracts = [];
          newStore.contracts = newContracts;
          regs = newCountry.regions.slice(0);
          _iteratorNormalCompletion31 = true;
          _didIteratorError31 = false;
          _iteratorError31 = undefined;
          _context.prev = 551;
          _iterator31 = newCountry.regions[Symbol.iterator]();

        case 553:
          if (_iteratorNormalCompletion31 = (_step31 = _iterator31.next()).done) {
            _context.next = 588;
            break;
          }

          _i108 = _step31.value;

          if (!(_war.occuped.includes(_i108.name) && _peace.enemy.includes(_i108.name))) {
            _context.next = 585;
            break;
          }

          _iteratorNormalCompletion33 = true;
          _didIteratorError33 = false;
          _iteratorError33 = undefined;
          _context.prev = 559;
          _iterator33 = newStore.country_ai[Symbol.iterator]();

        case 561:
          if (_iteratorNormalCompletion33 = (_step33 = _iterator33.next()).done) {
            _context.next = 569;
            break;
          }

          c = _step33.value;

          if (!(c.identify === conCountry)) {
            _context.next = 566;
            break;
          }

          c.regions.push(_i108);
          return _context.abrupt("break", 569);

        case 566:
          _iteratorNormalCompletion33 = true;
          _context.next = 561;
          break;

        case 569:
          _context.next = 575;
          break;

        case 571:
          _context.prev = 571;
          _context.t20 = _context["catch"](559);
          _didIteratorError33 = true;
          _iteratorError33 = _context.t20;

        case 575:
          _context.prev = 575;
          _context.prev = 576;

          if (!_iteratorNormalCompletion33 && _iterator33["return"] != null) {
            _iterator33["return"]();
          }

        case 578:
          _context.prev = 578;

          if (!_didIteratorError33) {
            _context.next = 581;
            break;
          }

          throw _iteratorError33;

        case 581:
          return _context.finish(578);

        case 582:
          return _context.finish(575);

        case 583:
          newCountry.regions.splice(newCountry.regions.indexOf(_i108), 1);
          return _context.abrupt("break", 588);

        case 585:
          _iteratorNormalCompletion31 = true;
          _context.next = 553;
          break;

        case 588:
          _context.next = 594;
          break;

        case 590:
          _context.prev = 590;
          _context.t21 = _context["catch"](551);
          _didIteratorError31 = true;
          _iteratorError31 = _context.t21;

        case 594:
          _context.prev = 594;
          _context.prev = 595;

          if (!_iteratorNormalCompletion31 && _iterator31["return"] != null) {
            _iterator31["return"]();
          }

        case 597:
          _context.prev = 597;

          if (!_didIteratorError31) {
            _context.next = 600;
            break;
          }

          throw _iteratorError31;

        case 600:
          return _context.finish(597);

        case 601:
          return _context.finish(594);

        case 602:
          _iteratorNormalCompletion32 = true;
          _didIteratorError32 = false;
          _iteratorError32 = undefined;
          _context.prev = 605;
          _iterator32 = newStore.country_ai[Symbol.iterator]();

        case 607:
          if (_iteratorNormalCompletion32 = (_step32 = _iterator32.next()).done) {
            _context.next = 634;
            break;
          }

          _c = _step32.value;

          if (!(_c.identify === conCountry)) {
            _context.next = 631;
            break;
          }

          regs = _c.regions.slice(0);
          _iteratorNormalCompletion34 = true;
          _didIteratorError34 = false;
          _iteratorError34 = undefined;
          _context.prev = 614;

          for (_iterator34 = regs[Symbol.iterator](); !(_iteratorNormalCompletion34 = (_step34 = _iterator34.next()).done); _iteratorNormalCompletion34 = true) {
            _i109 = _step34.value;

            if (_war.occuped.includes(_i109.name) && _peace.own.includes(_i109.name)) {
              newCountry.regions.push(_i109);

              _c.regions.splice(_c.regions.indexOf(_i109), 1);
            }
          }

          _context.next = 622;
          break;

        case 618:
          _context.prev = 618;
          _context.t22 = _context["catch"](614);
          _didIteratorError34 = true;
          _iteratorError34 = _context.t22;

        case 622:
          _context.prev = 622;
          _context.prev = 623;

          if (!_iteratorNormalCompletion34 && _iterator34["return"] != null) {
            _iterator34["return"]();
          }

        case 625:
          _context.prev = 625;

          if (!_didIteratorError34) {
            _context.next = 628;
            break;
          }

          throw _iteratorError34;

        case 628:
          return _context.finish(625);

        case 629:
          return _context.finish(622);

        case 630:
          return _context.abrupt("break", 634);

        case 631:
          _iteratorNormalCompletion32 = true;
          _context.next = 607;
          break;

        case 634:
          _context.next = 640;
          break;

        case 636:
          _context.prev = 636;
          _context.t23 = _context["catch"](605);
          _didIteratorError32 = true;
          _iteratorError32 = _context.t23;

        case 640:
          _context.prev = 640;
          _context.prev = 641;

          if (!_iteratorNormalCompletion32 && _iterator32["return"] != null) {
            _iterator32["return"]();
          }

        case 643:
          _context.prev = 643;

          if (!_didIteratorError32) {
            _context.next = 646;
            break;
          }

          throw _iteratorError32;

        case 646:
          return _context.finish(643);

        case 647:
          return _context.finish(640);

        case 648:
          outBuffer.add(conBuff);

        case 649:
          _iteratorNormalCompletion16 = true;
          _context.next = 299;
          break;

        case 652:
          _context.next = 658;
          break;

        case 654:
          _context.prev = 654;
          _context.t24 = _context["catch"](297);
          _didIteratorError16 = true;
          _iteratorError16 = _context.t24;

        case 658:
          _context.prev = 658;
          _context.prev = 659;

          if (!_iteratorNormalCompletion16 && _iterator16["return"] != null) {
            _iterator16["return"]();
          }

        case 661:
          _context.prev = 661;

          if (!_didIteratorError16) {
            _context.next = 664;
            break;
          }

          throw _iteratorError16;

        case 664:
          return _context.finish(661);

        case 665:
          return _context.finish(658);

        case 666:
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

                for (_i110 = 0, _Object$keys65 = Object.keys(lawBuffer[_law]); _i110 < _Object$keys65.length; _i110++) {
                  _type22 = _Object$keys65[_i110];

                  for (_i111 = 0, _Object$keys66 = Object.keys(lawBuffer[_law][_type22]); _i111 < _Object$keys66.length; _i111++) {
                    bf = _Object$keys66[_i111];
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

          _i68 = 0, _relations2 = relations;

        case 712:
          if (!(_i68 < _relations2.length)) {
            _context.next = 736;
            break;
          }

          _i112 = _relations2[_i68];
          _iteratorNormalCompletion35 = true;
          _didIteratorError35 = false;
          _iteratorError35 = undefined;
          _context.prev = 717;

          for (_iterator35 = newStore.relations[Symbol.iterator](); !(_iteratorNormalCompletion35 = (_step35 = _iterator35.next()).done); _iteratorNormalCompletion35 = true) {
            t = _step35.value;

            if (t.pair.length === 1 && t.pair[0] === _i112.ident) {
              t.value = _i112.value > 10 ? 10 : _i112.value < -10 ? -10 : _i112.value;
            }
          }

          _context.next = 725;
          break;

        case 721:
          _context.prev = 721;
          _context.t25 = _context["catch"](717);
          _didIteratorError35 = true;
          _iteratorError35 = _context.t25;

        case 725:
          _context.prev = 725;
          _context.prev = 726;

          if (!_iteratorNormalCompletion35 && _iterator35["return"] != null) {
            _iterator35["return"]();
          }

        case 728:
          _context.prev = 728;

          if (!_didIteratorError35) {
            _context.next = 731;
            break;
          }

          throw _iteratorError35;

        case 731:
          return _context.finish(728);

        case 732:
          return _context.finish(725);

        case 733:
          _i68++;
          _context.next = 712;
          break;

        case 736:
          newCountryAI = [];
          _iteratorNormalCompletion17 = true;
          _didIteratorError17 = false;
          _iteratorError17 = undefined;
          _context.prev = 740;

          _loop3 = function _loop3() {
            var i = _step17.value;

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

          for (_iterator17 = newStore.country_ai[Symbol.iterator](); !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
            _loop3();
          }

          _context.next = 749;
          break;

        case 745:
          _context.prev = 745;
          _context.t26 = _context["catch"](740);
          _didIteratorError17 = true;
          _iteratorError17 = _context.t26;

        case 749:
          _context.prev = 749;
          _context.prev = 750;

          if (!_iteratorNormalCompletion17 && _iterator17["return"] != null) {
            _iterator17["return"]();
          }

        case 752:
          _context.prev = 752;

          if (!_didIteratorError17) {
            _context.next = 755;
            break;
          }

          throw _iteratorError17;

        case 755:
          return _context.finish(752);

        case 756:
          return _context.finish(749);

        case 757:
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
            var _iteratorNormalCompletion18 = true;
            var _didIteratorError18 = false;
            var _iteratorError18 = undefined;

            try {
              for (var _iterator18 = newCountry.regions[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
                var _i69 = _step18.value;
                _i69[e] = +_i69[e].toFixed(4);
              }
            } catch (err) {
              _didIteratorError18 = true;
              _iteratorError18 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion18 && _iterator18["return"] != null) {
                  _iterator18["return"]();
                }
              } finally {
                if (_didIteratorError18) {
                  throw _iteratorError18;
                }
              }
            }

            return null;
          });
          mapper_correct = ['universities', 'schools', 'population', 'avg_salary', 'aqueducs', 'industry'];
          mapper_correct.map(function (e) {
            if (e === 'industry') {
              var _iteratorNormalCompletion19 = true;
              var _didIteratorError19 = false;
              var _iteratorError19 = undefined;

              try {
                for (var _iterator19 = newCountry.regions[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                  var _i70 = _step19.value;

                  for (var _i71 = 0, _Object$keys49 = Object.keys(_i70); _i71 < _Object$keys49.length; _i71++) {
                    var t = _Object$keys49[_i71];

                    if (t.startsWith('industry')) {
                      _i70[t] = parseInt(_i70[t]);
                    }
                  }
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
            } else {
              var _iteratorNormalCompletion20 = true;
              var _didIteratorError20 = false;
              var _iteratorError20 = undefined;

              try {
                for (var _iterator20 = newCountry.regions[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
                  var _i72 = _step20.value;
                  _i72[e] = parseInt(_i72[e]);
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
            }

            return null;
          });
          _iteratorNormalCompletion21 = true;
          _didIteratorError21 = false;
          _iteratorError21 = undefined;
          _context.prev = 776;

          for (_iterator21 = newCountry.regions[Symbol.iterator](); !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
            _i113 = _step21.value;

            if (_i113.id === newCountry.capital.id) {
              newCountry.capital = _i113;
            }
          }

          _context.next = 784;
          break;

        case 780:
          _context.prev = 780;
          _context.t27 = _context["catch"](776);
          _didIteratorError21 = true;
          _iteratorError21 = _context.t27;

        case 784:
          _context.prev = 784;
          _context.prev = 785;

          if (!_iteratorNormalCompletion21 && _iterator21["return"] != null) {
            _iterator21["return"]();
          }

        case 787:
          _context.prev = 787;

          if (!_didIteratorError21) {
            _context.next = 790;
            break;
          }

          throw _iteratorError21;

        case 790:
          return _context.finish(787);

        case 791:
          return _context.finish(784);

        case 792:
          newStore.country = newCountry;
          newStore.buffs = newBuff;
          store.changeGame = [];
          store.peaceList = [];
          func.create_game(newStore);

        case 797:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[20, 24, 28, 36], [29,, 31, 35], [39, 43, 47, 55], [48,, 50, 54], [67, 72, 76, 84], [77,, 79, 83], [88, 93, 97, 105], [98,, 100, 104], [127, 131, 135, 143], [136,, 138, 142], [148, 152, 156, 164], [157,, 159, 163], [190, 194, 198, 206], [199,, 201, 205], [210, 214, 218, 226], [219,, 221, 225], [232, 275, 279, 287], [280,, 282, 286], [297, 654, 658, 666], [323, 327, 331, 339], [332,, 334, 338], [343, 347, 351, 359], [352,, 354, 358], [366, 370, 374, 382], [375,, 377, 381], [388, 392, 396, 404], [397,, 399, 403], [407, 411, 415, 423], [416,, 418, 422], [442, 446, 450, 458], [451,, 453, 457], [470, 482, 486, 494], [487,, 489, 493], [500, 512, 516, 524], [517,, 519, 523], [529, 533, 537, 545], [538,, 540, 544], [551, 590, 594, 602], [559, 571, 575, 583], [576,, 578, 582], [595,, 597, 601], [605, 636, 640, 648], [614, 618, 622, 630], [623,, 625, 629], [641,, 643, 647], [659,, 661, 665], [717, 721, 725, 733], [726,, 728, 732], [740, 745, 749, 757], [750,, 752, 756], [776, 780, 784, 792], [785,, 787, 791]]);
}