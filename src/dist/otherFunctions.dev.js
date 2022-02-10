"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onBoard = onBoard;
exports.offBoard = offBoard;
exports.deepCopy = deepCopy;
exports.getAllRegions = getAllRegions;
exports.getPopulation = getPopulation;
exports.getArea = getArea;
exports.getEconomy = getEconomy;
exports.getArmy = getArmy;
exports.getAIArmy = getAIArmy;
exports.getAvgSalary = getAvgSalary;
exports.getPoverty = getPoverty;
exports.getUnemployment = getUnemployment;
exports.getColor = getColor;
exports.getGovernment = getGovernment;
exports.getAreaFormat = getAreaFormat;
exports.getArmySalary = getArmySalary;
exports.getArmyMaintain = getArmyMaintain;
exports.getArmyEquip = getArmyEquip;
exports.getResource = getResource;
exports.getNeed = getNeed;
exports.isVassal = isVassal;
exports.getPaveRoads = getPaveRoads;
exports.getStoneRoads = getStoneRoads;
exports.getPort = getPort;
exports.getCargoDelivery = getCargoDelivery;
exports.getPeopleDelivery = getPeopleDelivery;
exports.getAqueducs = getAqueducs;
exports.getSchools = getSchools;
exports.getUniversities = getUniversities;
exports.getVassals = getVassals;
exports.getWars = getWars;
exports.getAlliance = getAlliance;
exports.getSquads = getSquads;
exports.getRegion = getRegion;
exports.getRegsOfCountry = getRegsOfCountry;
exports.getSeaRegs = getSeaRegs;
exports.whoseReg = whoseReg;
exports.canBeTarget = canBeTarget;
exports.canBeRetreat = canBeRetreat;
exports.canBeTargetAI = canBeTargetAI;
exports.checkSeaside = checkSeaside;
exports.getPhysTaxes = getPhysTaxes;
exports.getJuridTaxes = getJuridTaxes;
exports.getSalaryPension = getSalaryPension;
exports.getMaintain = getMaintain;
exports.getEquip = getEquip;
exports.getSpendBudget = getSpendBudget;
exports.getSpends = getSpends;
exports.getIncomes = getIncomes;
exports.getBalance = getBalance;
exports.getPersOfGdp = getPersOfGdp;
exports.getPersOfWorld = getPersOfWorld;
exports.getBalanceRes = getBalanceRes;
exports.getWarDetails = getWarDetails;
exports.getBalanceRegion = getBalanceRegion;
exports.getSocialSpends = getSocialSpends;
exports.getDiplomatySpends = getDiplomatySpends;
exports.getTransOfPlace = getTransOfPlace;
exports.getOccupedRegions = getOccupedRegions;
exports.checkWarRegion = checkWarRegion;
exports.getCountry = getCountry;
exports.getDate = getDate;
exports.getOwnContracts = getOwnContracts;
exports.getRandomRange = getRandomRange;
exports.getReparation = getReparation;
exports.getRelation = getRelation;
exports.checkContract = checkContract;
exports.getMaxId = getMaxId;
exports.getInfrastructure = getInfrastructure;
exports.getGdpPerPopulation = getGdpPerPopulation;
exports.haveSeaside = haveSeaside;
exports.getPeacingCountries = getPeacingCountries;
exports.makeBattleEffects = makeBattleEffects;
exports.getSouseren = getSouseren;
exports.parseDate = parseDate;

var _identCountries = _interopRequireDefault(require("./identCountries"));

var _colorMap = _interopRequireDefault(require("./map_data/colorMap"));

var _movingSquad = _interopRequireDefault(require("./map_data/movingSquad"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function onBoard() {
  var view = document.querySelector("html");
  view.classList.add("html-overflow");
}

function offBoard() {
  var view = document.querySelector("html");
  view.classList.remove("html-overflow");
  window.scrollTo(0, 0);
}

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function getAllRegions(store) {
  var ret = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = store.country.regions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;
      ret.push(i);
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

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = store.country_ai[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var f = _step2.value;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = f.regions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _i = _step3.value;
          ret.push(_i);
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

  return ret;
}

function getPopulation(country, separated) {
  var sum = 0;
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = country.regions[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var i = _step4.value;
      sum = sum + i.population;
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

  if (separated) {
    return sum.toLocaleString();
  }

  return sum;
}

function getArea(country, separated) {
  var sum = 0;
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = country.regions[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var i = _step5.value;
      sum = sum + i.area;
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

  if (separated) {
    return sum.toLocaleString();
  }

  return sum;
}

function getEconomy(country, separated) {
  var sum = 0;
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = country.regions[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var f = _step6.value;

      for (var z in f) {
        if (~z.indexOf("industry")) {
          sum = sum + f[z];
        }
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

  if (separated) {
    return sum.toLocaleString();
  }

  return sum;
}

function getArmy(squads, separated) {
  var sum = 0;
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = squads[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var i = _step7.value;
      sum = sum + i.archer_quan + i.cavallery_quan + i.catapult_quan * 20 + i.pechot_quan;
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

  if (separated) {
    return sum.toLocaleString();
  }

  return sum;
}

function getAIArmy(squads, country, separated) {
  var sum = 0;
  var _iteratorNormalCompletion8 = true;
  var _didIteratorError8 = false;
  var _iteratorError8 = undefined;

  try {
    for (var _iterator8 = squads[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
      var i = _step8.value;

      if (i.country === country) {
        sum = sum + i.archer_quan + i.cavallery_quan + i.catapult_quan * 20 + i.pechot_quan;
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

  if (separated) {
    return sum.toLocaleString();
  }

  return sum;
}

function getAvgSalary(country, separated) {
  var sum = 0;
  var coun = 0;
  var _iteratorNormalCompletion9 = true;
  var _didIteratorError9 = false;
  var _iteratorError9 = undefined;

  try {
    for (var _iterator9 = country.regions[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
      var i = _step9.value;
      sum = sum + i.avg_salary;
      coun++;
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

  sum = sum / coun;

  if (separated) {
    return sum.toFixed(0).toLocaleString();
  }

  return sum;
}

function getPoverty(country, separated) {
  var sum = 0;
  var coun = 0;
  var _iteratorNormalCompletion10 = true;
  var _didIteratorError10 = false;
  var _iteratorError10 = undefined;

  try {
    for (var _iterator10 = country.regions[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
      var i = _step10.value;
      sum = sum + i.poverty;
      coun++;
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

  sum = sum / coun;

  if (separated) {
    sum = sum * 100;
    return sum.toFixed(2);
  }

  return sum;
}

function getUnemployment(country, separated) {
  var sum = 0;
  var coun = 0;
  var _iteratorNormalCompletion11 = true;
  var _didIteratorError11 = false;
  var _iteratorError11 = undefined;

  try {
    for (var _iterator11 = country.regions[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
      var i = _step11.value;
      sum = sum + i.unemployment;
      coun++;
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

  sum = sum / coun;

  if (separated) {
    sum = sum * 100;
    return sum.toFixed(2);
  }

  return sum;
}

function getColor(value) {
  if (value > 90) {
    return "#03ca00";
  } else if (value >= 70) {
    return "#98ca00";
  } else if (value >= 50) {
    return "#cac400";
  } else if (value >= 25) {
    return "#ca8c00";
  } else if (value >= 10) {
    return "#ca4b00";
  } else {
    return "#ca0000";
  }
}

function getGovernment(value) {
  switch (value) {
    case "M":
      return "Абсолютная монархия";

    case "O":
      return "Ограниченная монархия";

    case "D":
      return "Однопартийная диктатура";

    case "R":
      return "Республика";

    default:
      return "None";
  }
}

function getAreaFormat(value) {
  value = value.split(",");
  var koef = 0;

  switch (value[0]) {
    case "C":
      koef = koef - 0.5;
      break;

    case "D":
      koef = koef + 0.5;
      break;

    default:
      break;
  }

  switch (value[1]) {
    case "S":
      koef = koef + 0.5;
      break;

    case "O":
      koef = koef + 0.2;
      break;

    case "Z":
      koef = koef - 0.5;
      break;

    default:
      break;
  }

  switch (value[2]) {
    case "M":
      koef = koef + 0.5;
      break;

    case "F":
      koef = koef - 0.5;
      break;

    default:
      break;
  }

  switch (value[3]) {
    case "I":
      koef = koef + 0.5;
      break;

    case "N":
      koef = koef - 0.5;
      break;

    default:
      break;
  }

  return koef > 0 ? "Федерация" : "Унитарное гос-во";
}

function getArmySalary(country, separated) {
  var salary = country.army_salary.split(",");

  if (separated) {
    var pension = {
      1: 40,
      2: 45,
      3: 50,
      4: 60
    };
    return {
      pensionAge: pension[salary[0]],
      avgSalary: +salary[1].toLocaleString(),
      avgPension: +salary[2].toLocaleString()
    };
  } else {
    return {
      pensionAge: salary[0],
      avgSalary: +salary[1],
      avgPension: +salary[2]
    };
  }
}

function getArmyMaintain(country, separated) {
  var maintain = country.army_maintain.split(",");

  if (separated) {
    var desc = {
      food: {
        1: "Нет",
        2: "Минимальное",
        3: "Достаточное",
        4: "Расширенное"
      },
      infrastructure: {
        1: "Минимальная",
        2: "Средняя",
        3: "Отличная"
      },
      household: {
        1: "Минимальные",
        2: "Достаточные",
        3: "Расширенные"
      }
    };
    return {
      food: desc.food[+maintain[0]],
      infrastructure: desc.infrastructure[+maintain[1]],
      household: desc.household[+maintain[2]]
    };
  } else {
    return {
      food: +maintain[0],
      infrastructure: +maintain[1],
      household: +maintain[2]
    };
  }
}

function getArmyEquip(country, separated) {
  var equip = country.army_equip.split(",");

  if (separated) {
    var desc = {
      equip: {
        1: "Кожанная",
        2: "Железная",
        3: "Ламелярная",
        4: "Орихалковая",
        5: "Эбонитовая"
      },
      complects: {
        1: 1,
        2: 1.5,
        3: 2,
        4: 3
      },
      resources: {
        1: "Мало",
        2: "Средне",
        3: "Много"
      }
    };
    return {
      equip: desc.equip[equip[0]],
      complects: desc.equip[equip[1]],
      resources: desc.equip[equip[2]]
    };
  } else {
    return {
      equip: +equip[0],
      complects: +equip[1],
      resources: +equip[2]
    };
  }
}

function getResource(country, type, separated) {
  var sum = 0;
  var _iteratorNormalCompletion12 = true;
  var _didIteratorError12 = false;
  var _iteratorError12 = undefined;

  try {
    for (var _iterator12 = country.regions[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
      var f = _step12.value;

      for (var z in f) {
        if (~z.indexOf("industry_".concat(type))) {
          sum = sum + f[z];
        }
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

  if (separated) {
    return sum.toLocaleString();
  }

  return sum;
}

function getNeed(country, type, separated) {
  var sum = 0;
  var _iteratorNormalCompletion13 = true;
  var _didIteratorError13 = false;
  var _iteratorError13 = undefined;

  try {
    for (var _iterator13 = country.regions[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
      var f = _step13.value;

      for (var z in f) {
        if (~z.indexOf("needs_".concat(type))) {
          sum = sum + f[z];
        }
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

  if (separated) {
    return sum.toLocaleString();
  }

  return sum;
}

function isVassal(store) {
  var _iteratorNormalCompletion14 = true;
  var _didIteratorError14 = false;
  var _iteratorError14 = undefined;

  try {
    for (var _iterator14 = store.contracts[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
      var i = _step14.value;

      if (i.con_type === "VC" && i.pair.length === 1 && i.priority !== store.country.name) {
        return true;
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

  return false;
}

function getPaveRoads(store) {
  var sum = 0;
  var _iteratorNormalCompletion15 = true;
  var _didIteratorError15 = false;
  var _iteratorError15 = undefined;

  try {
    for (var _iterator15 = store.regions[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
      var i = _step15.value;
      sum = sum + i.pave_road;
    }
  } catch (err) {
    _didIteratorError15 = true;
    _iteratorError15 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion15 && _iterator15["return"] != null) {
        _iterator15["return"]();
      }
    } finally {
      if (_didIteratorError15) {
        throw _iteratorError15;
      }
    }
  }

  sum = sum / store.regions.length;
  return sum;
}

function getStoneRoads(store) {
  var sum = 0;
  var _iteratorNormalCompletion16 = true;
  var _didIteratorError16 = false;
  var _iteratorError16 = undefined;

  try {
    for (var _iterator16 = store.regions[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
      var i = _step16.value;
      sum = sum + i.stone_road;
    }
  } catch (err) {
    _didIteratorError16 = true;
    _iteratorError16 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion16 && _iterator16["return"] != null) {
        _iterator16["return"]();
      }
    } finally {
      if (_didIteratorError16) {
        throw _iteratorError16;
      }
    }
  }

  sum = sum / store.regions.length;
  return sum;
}

function getPort(store) {
  var sum = 0;
  var _iteratorNormalCompletion17 = true;
  var _didIteratorError17 = false;
  var _iteratorError17 = undefined;

  try {
    for (var _iterator17 = store.regions[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
      var i = _step17.value;
      sum = sum + i.port;
    }
  } catch (err) {
    _didIteratorError17 = true;
    _iteratorError17 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion17 && _iterator17["return"] != null) {
        _iterator17["return"]();
      }
    } finally {
      if (_didIteratorError17) {
        throw _iteratorError17;
      }
    }
  }

  sum = sum / store.regions.length;
  return sum;
}

function getCargoDelivery(store) {
  var sum = 0;
  var _iteratorNormalCompletion18 = true;
  var _didIteratorError18 = false;
  var _iteratorError18 = undefined;

  try {
    for (var _iterator18 = store.regions[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
      var i = _step18.value;
      sum = sum + i.cargo_ship;
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

  sum = sum / store.regions.length;
  return sum;
}

function getPeopleDelivery(store) {
  var sum = 0;
  var _iteratorNormalCompletion19 = true;
  var _didIteratorError19 = false;
  var _iteratorError19 = undefined;

  try {
    for (var _iterator19 = store.regions[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
      var i = _step19.value;
      sum = sum + i.people_ship;
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

  sum = sum / store.regions.length;
  return sum;
}

function getAqueducs(store) {
  var sum = 0;
  var _iteratorNormalCompletion20 = true;
  var _didIteratorError20 = false;
  var _iteratorError20 = undefined;

  try {
    for (var _iterator20 = store.regions[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
      var i = _step20.value;
      sum = sum + i.aqueducs;
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

  return sum;
}

function getSchools(store) {
  var sum = 0;
  var _iteratorNormalCompletion21 = true;
  var _didIteratorError21 = false;
  var _iteratorError21 = undefined;

  try {
    for (var _iterator21 = store.regions[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
      var i = _step21.value;
      sum = sum + i.schools;
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

  return sum;
}

function getUniversities(store) {
  var sum = 0;
  var _iteratorNormalCompletion22 = true;
  var _didIteratorError22 = false;
  var _iteratorError22 = undefined;

  try {
    for (var _iterator22 = store.regions[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
      var i = _step22.value;
      sum = sum + i.universities;
    }
  } catch (err) {
    _didIteratorError22 = true;
    _iteratorError22 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion22 && _iterator22["return"] != null) {
        _iterator22["return"]();
      }
    } finally {
      if (_didIteratorError22) {
        throw _iteratorError22;
      }
    }
  }

  return sum;
}

function getVassals(store, country) {
  var list = [];
  var _iteratorNormalCompletion23 = true;
  var _didIteratorError23 = false;
  var _iteratorError23 = undefined;

  try {
    for (var _iterator23 = store.contracts[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
      var i = _step23.value;

      if (i.con_type === "VC" && i.pair.length === 1 && i.priority === country) {
        list.push({
          name: _identCountries["default"][i.pair[0]],
          ident: i.pair[0]
        });
      }
    }
  } catch (err) {
    _didIteratorError23 = true;
    _iteratorError23 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion23 && _iterator23["return"] != null) {
        _iterator23["return"]();
      }
    } finally {
      if (_didIteratorError23) {
        throw _iteratorError23;
      }
    }
  }

  return list;
}

function getWars(store, country) {
  var list = [];
  var _iteratorNormalCompletion24 = true;
  var _didIteratorError24 = false;
  var _iteratorError24 = undefined;

  try {
    for (var _iterator24 = store.contracts[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
      var i = _step24.value;

      if (i.con_type === "DW") {
        if (i.pair.length === 1 && _identCountries["default"][i.uniq] === country) {
          list.push({
            name: _identCountries["default"][i.pair[0]],
            ident: i.pair[0]
          });
        } else {
          if (i.pair.indexOf(country) !== -1) {
            list.push({
              name: _identCountries["default"][i.pair[1 - i.pair.indexOf(country)]],
              ident: i.pair[1 - i.pair.indexOf(country)]
            });
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError24 = true;
    _iteratorError24 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion24 && _iterator24["return"] != null) {
        _iterator24["return"]();
      }
    } finally {
      if (_didIteratorError24) {
        throw _iteratorError24;
      }
    }
  }

  return list;
}

function getAlliance(store, country) {
  var list = [];
  var _iteratorNormalCompletion25 = true;
  var _didIteratorError25 = false;
  var _iteratorError25 = undefined;

  try {
    for (var _iterator25 = store.contracts[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
      var i = _step25.value;

      if (i.con_type === "AL") {
        if (i.pair.length === 1 && _identCountries["default"][i.uniq] === country) {
          list.push({
            name: _identCountries["default"][i.pair[0]],
            ident: i.pair[0]
          });
        } else {
          if (i.pair.indexOf(Object.keys(_identCountries["default"]).find(function (key) {
            return _identCountries["default"][key] === country;
          })) !== -1) {
            list.push({
              name: _identCountries["default"][i.pair[1 - i.pair.indexOf(country)]],
              ident: i.pair[1 - i.pair.indexOf(country)]
            });
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError25 = true;
    _iteratorError25 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion25 && _iterator25["return"] != null) {
        _iterator25["return"]();
      }
    } finally {
      if (_didIteratorError25) {
        throw _iteratorError25;
      }
    }
  }

  return list;
}

function getSquads(store, country) {
  var list = [];
  var _iteratorNormalCompletion26 = true;
  var _didIteratorError26 = false;
  var _iteratorError26 = undefined;

  try {
    for (var _iterator26 = store.squad_ai[Symbol.iterator](), _step26; !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
      var i = _step26.value;

      if (i.country === country) {
        list.push(i);
      }
    }
  } catch (err) {
    _didIteratorError26 = true;
    _iteratorError26 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion26 && _iterator26["return"] != null) {
        _iterator26["return"]();
      }
    } finally {
      if (_didIteratorError26) {
        throw _iteratorError26;
      }
    }
  }

  return list;
}

function getRegion(store, ident) {
  var _iteratorNormalCompletion27 = true;
  var _didIteratorError27 = false;
  var _iteratorError27 = undefined;

  try {
    for (var _iterator27 = store.country.regions[Symbol.iterator](), _step27; !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
      var i = _step27.value;

      if (i.name === ident) {
        return i;
      }
    }
  } catch (err) {
    _didIteratorError27 = true;
    _iteratorError27 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion27 && _iterator27["return"] != null) {
        _iterator27["return"]();
      }
    } finally {
      if (_didIteratorError27) {
        throw _iteratorError27;
      }
    }
  }

  var _iteratorNormalCompletion28 = true;
  var _didIteratorError28 = false;
  var _iteratorError28 = undefined;

  try {
    for (var _iterator28 = store.country_ai[Symbol.iterator](), _step28; !(_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done); _iteratorNormalCompletion28 = true) {
      var f = _step28.value;
      var _iteratorNormalCompletion29 = true;
      var _didIteratorError29 = false;
      var _iteratorError29 = undefined;

      try {
        for (var _iterator29 = f.regions[Symbol.iterator](), _step29; !(_iteratorNormalCompletion29 = (_step29 = _iterator29.next()).done); _iteratorNormalCompletion29 = true) {
          var _i2 = _step29.value;

          if (_i2.name === ident) {
            return _i2;
          }
        }
      } catch (err) {
        _didIteratorError29 = true;
        _iteratorError29 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion29 && _iterator29["return"] != null) {
            _iterator29["return"]();
          }
        } finally {
          if (_didIteratorError29) {
            throw _iteratorError29;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError28 = true;
    _iteratorError28 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion28 && _iterator28["return"] != null) {
        _iterator28["return"]();
      }
    } finally {
      if (_didIteratorError28) {
        throw _iteratorError28;
      }
    }
  }
}

function getRegsOfCountry(store, country) {
  var regs = [];

  if (country === store.country.identify) {
    var _iteratorNormalCompletion30 = true;
    var _didIteratorError30 = false;
    var _iteratorError30 = undefined;

    try {
      for (var _iterator30 = store.country.regions[Symbol.iterator](), _step30; !(_iteratorNormalCompletion30 = (_step30 = _iterator30.next()).done); _iteratorNormalCompletion30 = true) {
        var i = _step30.value;
        regs.push(i.name);
      }
    } catch (err) {
      _didIteratorError30 = true;
      _iteratorError30 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion30 && _iterator30["return"] != null) {
          _iterator30["return"]();
        }
      } finally {
        if (_didIteratorError30) {
          throw _iteratorError30;
        }
      }
    }
  } else {
    var _iteratorNormalCompletion31 = true;
    var _didIteratorError31 = false;
    var _iteratorError31 = undefined;

    try {
      for (var _iterator31 = store.country_ai[Symbol.iterator](), _step31; !(_iteratorNormalCompletion31 = (_step31 = _iterator31.next()).done); _iteratorNormalCompletion31 = true) {
        var _i3 = _step31.value;

        if (country === _i3.identify) {
          var _iteratorNormalCompletion32 = true;
          var _didIteratorError32 = false;
          var _iteratorError32 = undefined;

          try {
            for (var _iterator32 = _i3.regions[Symbol.iterator](), _step32; !(_iteratorNormalCompletion32 = (_step32 = _iterator32.next()).done); _iteratorNormalCompletion32 = true) {
              var r = _step32.value;
              regs.push(r.name);
            }
          } catch (err) {
            _didIteratorError32 = true;
            _iteratorError32 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion32 && _iterator32["return"] != null) {
                _iterator32["return"]();
              }
            } finally {
              if (_didIteratorError32) {
                throw _iteratorError32;
              }
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError31 = true;
      _iteratorError31 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion31 && _iterator31["return"] != null) {
          _iterator31["return"]();
        }
      } finally {
        if (_didIteratorError31) {
          throw _iteratorError31;
        }
      }
    }
  }

  return regs;
}

function getSeaRegs(store) {
  var arr = [];
  var _iteratorNormalCompletion33 = true;
  var _didIteratorError33 = false;
  var _iteratorError33 = undefined;

  try {
    for (var _iterator33 = store.country.regions[Symbol.iterator](), _step33; !(_iteratorNormalCompletion33 = (_step33 = _iterator33.next()).done); _iteratorNormalCompletion33 = true) {
      var i = _step33.value;

      if (i.seaside) {
        arr.push(i);
      }
    }
  } catch (err) {
    _didIteratorError33 = true;
    _iteratorError33 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion33 && _iterator33["return"] != null) {
        _iterator33["return"]();
      }
    } finally {
      if (_didIteratorError33) {
        throw _iteratorError33;
      }
    }
  }

  var _iteratorNormalCompletion34 = true;
  var _didIteratorError34 = false;
  var _iteratorError34 = undefined;

  try {
    for (var _iterator34 = store.country_ai[Symbol.iterator](), _step34; !(_iteratorNormalCompletion34 = (_step34 = _iterator34.next()).done); _iteratorNormalCompletion34 = true) {
      var f = _step34.value;
      var _iteratorNormalCompletion35 = true;
      var _didIteratorError35 = false;
      var _iteratorError35 = undefined;

      try {
        for (var _iterator35 = f.regions[Symbol.iterator](), _step35; !(_iteratorNormalCompletion35 = (_step35 = _iterator35.next()).done); _iteratorNormalCompletion35 = true) {
          var _i4 = _step35.value;

          if (_i4.seaside) {
            arr.push(_i4);
          }
        }
      } catch (err) {
        _didIteratorError35 = true;
        _iteratorError35 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion35 && _iterator35["return"] != null) {
            _iterator35["return"]();
          }
        } finally {
          if (_didIteratorError35) {
            throw _iteratorError35;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError34 = true;
    _iteratorError34 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion34 && _iterator34["return"] != null) {
        _iterator34["return"]();
      }
    } finally {
      if (_didIteratorError34) {
        throw _iteratorError34;
      }
    }
  }

  return arr;
}

function whoseReg(store, reg) {
  if (store.country.regions.indexOf(getRegion(store, reg)) !== -1) {
    return store.country.identify;
  }

  var _iteratorNormalCompletion36 = true;
  var _didIteratorError36 = false;
  var _iteratorError36 = undefined;

  try {
    for (var _iterator36 = store.country_ai[Symbol.iterator](), _step36; !(_iteratorNormalCompletion36 = (_step36 = _iterator36.next()).done); _iteratorNormalCompletion36 = true) {
      var i = _step36.value;

      if (i.regions.indexOf(getRegion(store, reg)) !== -1) {
        return i.identify;
      }
    }
  } catch (err) {
    _didIteratorError36 = true;
    _iteratorError36 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion36 && _iterator36["return"] != null) {
        _iterator36["return"]();
      }
    } finally {
      if (_didIteratorError36) {
        throw _iteratorError36;
      }
    }
  }
}

function canBeTarget(store, reg) {
  var country = whoseReg(store, reg);
  var _iteratorNormalCompletion37 = true;
  var _didIteratorError37 = false;
  var _iteratorError37 = undefined;

  try {
    for (var _iterator37 = store.contracts[Symbol.iterator](), _step37; !(_iteratorNormalCompletion37 = (_step37 = _iterator37.next()).done); _iteratorNormalCompletion37 = true) {
      var i = _step37.value;

      if (i.con_type === "AL" || i.con_type === "DW" || i.con_type === "VC" || i.con_type === "PA") {
        if (i.pair.length === 1 && i.pair.indexOf(country) !== -1) {
          if (i.con_type === "PA") {
            if (i.priority === store.country.indentify) {
              return true;
            } else {
              return false;
            }
          }

          return true;
        }
      }
    }
  } catch (err) {
    _didIteratorError37 = true;
    _iteratorError37 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion37 && _iterator37["return"] != null) {
        _iterator37["return"]();
      }
    } finally {
      if (_didIteratorError37) {
        throw _iteratorError37;
      }
    }
  }

  return false;
}

function canBeRetreat(store, reg) {
  var country = whoseReg(store, reg);
  var occuped = [];
  var regs = store.country.regions.map(function (e) {
    return e.name;
  });
  var _iteratorNormalCompletion38 = true;
  var _didIteratorError38 = false;
  var _iteratorError38 = undefined;

  try {
    for (var _iterator38 = store.contracts[Symbol.iterator](), _step38; !(_iteratorNormalCompletion38 = (_step38 = _iterator38.next()).done); _iteratorNormalCompletion38 = true) {
      var i = _step38.value;

      if (i.con_type === 'DW') {
        if (i.pair.length === 1) {
          if (!regs.includes(reg) && !i.occuped.split(',').includes(reg)) {
            occuped.push(i.occuped.split(','));
          }
        } else {
          occuped.push(i.occuped.split(','));
        }
      }
    }
  } catch (err) {
    _didIteratorError38 = true;
    _iteratorError38 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion38 && _iterator38["return"] != null) {
        _iterator38["return"]();
      }
    } finally {
      if (_didIteratorError38) {
        throw _iteratorError38;
      }
    }
  }

  if (occuped.includes(reg)) {
    return false;
  }

  if (regs.includes(reg)) {
    return true;
  }

  var _iteratorNormalCompletion39 = true;
  var _didIteratorError39 = false;
  var _iteratorError39 = undefined;

  try {
    for (var _iterator39 = store.contracts[Symbol.iterator](), _step39; !(_iteratorNormalCompletion39 = (_step39 = _iterator39.next()).done); _iteratorNormalCompletion39 = true) {
      var _i5 = _step39.value;

      if (_i5.con_type === "AL" || _i5.con_type === "VC" || _i5.con_type === "PA") {
        if (_i5.pair.length === 1 && _i5.pair.indexOf(country) !== -1) {
          if (_i5.con_type === "PA") {
            if (_i5.priority === store.country.indentify) {
              return true;
            } else {
              return false;
            }
          }

          return true;
        }
      }
    }
  } catch (err) {
    _didIteratorError39 = true;
    _iteratorError39 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion39 && _iterator39["return"] != null) {
        _iterator39["return"]();
      }
    } finally {
      if (_didIteratorError39) {
        throw _iteratorError39;
      }
    }
  }

  return false;
}

function canBeTargetAI(store, reg, ai) {
  var regs = getCountry(store, ai).regions.map(function (e) {
    return e.name;
  });
  var _iteratorNormalCompletion40 = true;
  var _didIteratorError40 = false;
  var _iteratorError40 = undefined;

  try {
    for (var _iterator40 = store.contracts[Symbol.iterator](), _step40; !(_iteratorNormalCompletion40 = (_step40 = _iterator40.next()).done); _iteratorNormalCompletion40 = true) {
      var i = _step40.value;

      if (i.con_type === 'DW') {
        if (i.pair.includes(ai)) {
          if (!regs.includes(reg) && i.occuped.split(',').includes(reg)) {
            return true;
          }

          if (regs.includes(reg) && i.occuped.split(',').includes(reg)) {
            return false;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError40 = true;
    _iteratorError40 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion40 && _iterator40["return"] != null) {
        _iterator40["return"]();
      }
    } finally {
      if (_didIteratorError40) {
        throw _iteratorError40;
      }
    }
  }

  if (regs.includes(reg)) {
    return true;
  }
}

function checkSeaside(store, reg) {
  return getRegion(store, reg).seaside;
}

function getPhysTaxes(country) {
  var summ = 0;
  var str = country.tax_physic.split(" ").map(function (e) {
    return +e.replace(/,/, ".");
  });
  var taxes = {
    income: +str[0],
    land: +str[1]
  };
  summ = summ + getPopulation(country, false) * 0.5 * getAvgSalary(country, false) * taxes.income;
  summ = summ + getPopulation(country, false) * 0.2 * getAvgSalary(country, false) * taxes.land;
  return parseInt(summ.toFixed(0));
}

function getJuridTaxes(country) {
  var summ = 0;
  var str = country.tax_jurid.split(" ").map(function (e) {
    return +e.replace(/,/, ".");
  });
  var taxes = {
    income: +str[0],
    useful: +str[1],
    govern: +str[2],
    "export": +str[3]
  };
  summ = summ + getEconomy(country, false) * taxes.income * 0.5;
  summ = summ + (getResource(country, "blackmetall", false) + getResource(country, "colormetall", false) + getResource(country, "coal", false)) * taxes.useful * 2;
  summ = summ + (getResource(country, "alchemy", false) + getResource(country, "light", false) + getResource(country, "blacksmith", false) + getResource(country, "other", false) + getResource(country, "typography", false)) * taxes.govern;
  var indus = [];

  for (var _i6 = 0, _Object$keys = Object.keys(country.capital); _i6 < _Object$keys.length; _i6++) {
    var i = _Object$keys[_i6];

    if (i.indexOf("industry_") !== -1) {
      indus.push(i.split("_")[1]);
    }
  }

  for (var _i7 = 0, _indus = indus; _i7 < _indus.length; _i7++) {
    var _i8 = _indus[_i7];

    if (getResource(country, _i8, false) > getNeed(country, _i8, false)) {
      summ = summ + (getResource(country, _i8, false) - getNeed(country, _i8, false)) * taxes["export"] * 4;
    }
  }

  return parseInt(summ.toFixed(0));
}

function getSalaryPension(store) {
  var salar = getArmySalary(store.country, false);
  var summ = 0;
  var _iteratorNormalCompletion41 = true;
  var _didIteratorError41 = false;
  var _iteratorError41 = undefined;

  try {
    for (var _iterator41 = store.squad[Symbol.iterator](), _step41; !(_iteratorNormalCompletion41 = (_step41 = _iterator41.next()).done); _iteratorNormalCompletion41 = true) {
      var i = _step41.value;
      var quan = i.archer_quan + i.cavallery_quan + i.catapult_quan * 20 + i.pechot_quan;
      var incr = 0;
      incr = incr + quan * salar.avgSalary;
      incr = incr + salar.pensionAge * salar.avgPension * quan * 0.05;
      summ = summ + incr / (i.status === "r" ? 1 : 2);
    }
  } catch (err) {
    _didIteratorError41 = true;
    _iteratorError41 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion41 && _iterator41["return"] != null) {
        _iterator41["return"]();
      }
    } finally {
      if (_didIteratorError41) {
        throw _iteratorError41;
      }
    }
  }

  return summ;
}

function getMaintain(store) {
  var main = getArmyMaintain(store.country, false);
  var summ = 0;
  var _iteratorNormalCompletion42 = true;
  var _didIteratorError42 = false;
  var _iteratorError42 = undefined;

  try {
    for (var _iterator42 = store.squad[Symbol.iterator](), _step42; !(_iteratorNormalCompletion42 = (_step42 = _iterator42.next()).done); _iteratorNormalCompletion42 = true) {
      var i = _step42.value;
      var quan = i.archer_quan + i.cavallery_quan + i.catapult_quan * 20 + i.pechot_quan;
      var incr = 0;
      incr = incr + 300 * quan * main.food;
      incr = incr + 200 * quan * main.infrastructure;
      incr = incr + 100 * quan * main.household;
      summ = summ + incr / (i.status === "r" ? 1 : 2);
    }
  } catch (err) {
    _didIteratorError42 = true;
    _iteratorError42 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion42 && _iterator42["return"] != null) {
        _iterator42["return"]();
      }
    } finally {
      if (_didIteratorError42) {
        throw _iteratorError42;
      }
    }
  }

  return summ;
}

function getEquip(store) {
  var equ = getArmyEquip(store.country, false);
  var summ = 0;
  summ = summ + 100 * equ.equip * equ.resources * getArmy(store.squad) * equ.complects;
  return summ;
}

function getSpendBudget(store) {
  var spends = {
    infrastructure: parseInt(0.0004 * store.buffs.budget_infrastructure * getArea(store.country, false) * getPopulation(store.country, false)),
    education: parseInt(0.0006 * store.buffs.budget_education * getArea(store.country, false) * getPopulation(store.country, false)),
    research: parseInt(80 * store.buffs.budget_research * getPopulation(store.country, false)),
    propaganda: parseInt(0.00015 * store.buffs.budget_propaganda * getArea(store.country, false) * getPopulation(store.country, false)),
    government: parseInt(0.0002 * store.buffs.budget_government * getArea(store.country, false) * getPopulation(store.country, false))
  };
  return spends;
}

function getSpends(store) {
  return getDiplomatySpends(store).spend + getSocialSpends(store.country) + Object.values(getSpendBudget(store)).reduce(function (a, b) {
    return a + b;
  }) + getSalaryPension(store) + getMaintain(store) + getEquip(store);
}

function getIncomes(store) {
  return getJuridTaxes(store.country) + getPhysTaxes(store.country) + getDiplomatySpends(store).income;
}

function getBalance(store) {
  return getIncomes(store) - getSpends(store);
}

function getPersOfGdp(store, infrastructure) {
  var infras = 0;
  var gdp = getEconomy(store.country, false);
  var _iteratorNormalCompletion43 = true;
  var _didIteratorError43 = false;
  var _iteratorError43 = undefined;

  try {
    for (var _iterator43 = store.country.regions[Symbol.iterator](), _step43; !(_iteratorNormalCompletion43 = (_step43 = _iterator43.next()).done); _iteratorNormalCompletion43 = true) {
      var i = _step43.value;
      infras += i[infrastructure];
    }
  } catch (err) {
    _didIteratorError43 = true;
    _iteratorError43 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion43 && _iterator43["return"] != null) {
        _iterator43["return"]();
      }
    } finally {
      if (_didIteratorError43) {
        throw _iteratorError43;
      }
    }
  }

  return infras / gdp;
}

function getPersOfWorld(store, infrastructure) {
  var infras = 0;
  var _iteratorNormalCompletion44 = true;
  var _didIteratorError44 = false;
  var _iteratorError44 = undefined;

  try {
    for (var _iterator44 = store.country.regions[Symbol.iterator](), _step44; !(_iteratorNormalCompletion44 = (_step44 = _iterator44.next()).done); _iteratorNormalCompletion44 = true) {
      var i = _step44.value;
      infras += i[infrastructure];
    }
  } catch (err) {
    _didIteratorError44 = true;
    _iteratorError44 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion44 && _iterator44["return"] != null) {
        _iterator44["return"]();
      }
    } finally {
      if (_didIteratorError44) {
        throw _iteratorError44;
      }
    }
  }

  var gdp = infras;
  var _iteratorNormalCompletion45 = true;
  var _didIteratorError45 = false;
  var _iteratorError45 = undefined;

  try {
    for (var _iterator45 = store.country_ai[Symbol.iterator](), _step45; !(_iteratorNormalCompletion45 = (_step45 = _iterator45.next()).done); _iteratorNormalCompletion45 = true) {
      var f = _step45.value;
      var _iteratorNormalCompletion46 = true;
      var _didIteratorError46 = false;
      var _iteratorError46 = undefined;

      try {
        for (var _iterator46 = f.regions[Symbol.iterator](), _step46; !(_iteratorNormalCompletion46 = (_step46 = _iterator46.next()).done); _iteratorNormalCompletion46 = true) {
          var _i9 = _step46.value;
          gdp += _i9[infrastructure];
        }
      } catch (err) {
        _didIteratorError46 = true;
        _iteratorError46 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion46 && _iterator46["return"] != null) {
            _iterator46["return"]();
          }
        } finally {
          if (_didIteratorError46) {
            throw _iteratorError46;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError45 = true;
    _iteratorError45 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion45 && _iterator45["return"] != null) {
        _iterator45["return"]();
      }
    } finally {
      if (_didIteratorError45) {
        throw _iteratorError45;
      }
    }
  }

  return infras / gdp;
}

function getBalanceRes(country, persentage) {
  var res = 0;
  var needs = 0;

  for (var _i10 = 0, _Object$keys2 = Object.keys(country.regions[0]); _i10 < _Object$keys2.length; _i10++) {
    var i = _Object$keys2[_i10];

    if (~i.indexOf("industry_")) {
      res = res + getResource(country, i.split("_")[1], false);
      needs = needs + getNeed(country, i.split("_")[1], false);
    }
  }

  if (persentage) {
    needs = needs / 100;
    res = res / needs / 100;
    return res.toFixed(3);
  }

  return res - needs;
}

function getWarDetails(store, country) {
  var contract;
  var _iteratorNormalCompletion47 = true;
  var _didIteratorError47 = false;
  var _iteratorError47 = undefined;

  try {
    for (var _iterator47 = store.contracts[Symbol.iterator](), _step47; !(_iteratorNormalCompletion47 = (_step47 = _iterator47.next()).done); _iteratorNormalCompletion47 = true) {
      var i = _step47.value;

      if (i.con_type === "DW" && i.pair.length === 1 && i.pair.indexOf(country) !== -1) {
        contract = i;
      }
    }
  } catch (err) {
    _didIteratorError47 = true;
    _iteratorError47 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion47 && _iterator47["return"] != null) {
        _iterator47["return"]();
      }
    } finally {
      if (_didIteratorError47) {
        throw _iteratorError47;
      }
    }
  }

  var hash = {
    spends: {},
    regions: []
  };

  if (contract === undefined) {
    return hash;
  }

  if (_identCountries["default"][contract.priority] === store.country.identify) {
    var _hash$spends;

    hash.spends = (_hash$spends = {}, _defineProperty(_hash$spends, store.country.identify, contract.spends.split("_")[0]), _defineProperty(_hash$spends, country, contract.spends.split("_")[1]), _hash$spends);
  } else {
    var _hash$spends2;

    hash.spends = (_hash$spends2 = {}, _defineProperty(_hash$spends2, store.country.identify, contract.spends.split("_")[1]), _defineProperty(_hash$spends2, country, contract.spends.split("_")[0]), _hash$spends2);
  }

  if (contract.occuped) {
    contract.occuped.split(",").map(function (e) {
      return hash.regions.push(e);
    });
  }

  return hash;
}

function getBalanceRegion(store, con) {
  var incr = 0;
  var _iteratorNormalCompletion48 = true;
  var _didIteratorError48 = false;
  var _iteratorError48 = undefined;

  try {
    for (var _iterator48 = con.regions[Symbol.iterator](), _step48; !(_iteratorNormalCompletion48 = (_step48 = _iterator48.next()).done); _iteratorNormalCompletion48 = true) {
      var i = _step48.value;

      if (store.country.regions.indexOf(getRegion(store, i)) !== -1) {
        incr++;
      }
    }
  } catch (err) {
    _didIteratorError48 = true;
    _iteratorError48 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion48 && _iterator48["return"] != null) {
        _iterator48["return"]();
      }
    } finally {
      if (_didIteratorError48) {
        throw _iteratorError48;
      }
    }
  }

  return -2 * incr + con.regions.length;
}

function getSocialSpends(country) {
  var sum = 0;
  sum = sum + country.maternal_capital * getPopulation(country, false) * 0.0025;
  sum = sum + country.allowance_unemploy * getPopulation(country, false) * 0.6 * getUnemployment(country, false);
  sum = sum + country.allowance_disability * getPopulation(country, false) * 0.003;
  sum = sum + country.avg_pension * getPopulation(country, false) * 0.25 * (0.23 - +country.pension_w * 0.04);
  sum = sum + country.avg_pension * getPopulation(country, false) * 0.25 * (0.23 - +country.pension_m * 0.04);
  return parseInt(sum);
}

function getDiplomatySpends(store) {
  var list = [];
  var _iteratorNormalCompletion49 = true;
  var _didIteratorError49 = false;
  var _iteratorError49 = undefined;

  try {
    for (var _iterator49 = store.contracts[Symbol.iterator](), _step49; !(_iteratorNormalCompletion49 = (_step49 = _iterator49.next()).done); _iteratorNormalCompletion49 = true) {
      var i = _step49.value;

      if (i.con_type === "FW") {
        if (i.pair.length === 1) {
          list.push({
            pair: [_identCountries["default"][i.uniq], _identCountries["default"][i.pair[0]]],
            ident: [i.uniq, i.pair[0]],
            priority: i.priority
          });
        }
      }
    }
  } catch (err) {
    _didIteratorError49 = true;
    _iteratorError49 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion49 && _iterator49["return"] != null) {
        _iterator49["return"]();
      }
    } finally {
      if (_didIteratorError49) {
        throw _iteratorError49;
      }
    }
  }

  var spends = list.filter(function (e) {
    return e.priority !== store.country.name;
  });
  var incomes = list.filter(function (e) {
    return e.priority === store.country.name;
  });
  return {
    spend: spends.length * getReparation(store.country),
    income: incomes.length * getReparation(store.country)
  };
}

function getTransOfPlace(transition, place) {
  for (var _i11 = 0, _Object$keys3 = Object.keys(transition); _i11 < _Object$keys3.length; _i11++) {
    var i = _Object$keys3[_i11];

    if (transition[i].place === place) {
      return transition[i];
    }
  }

  return false;
}

function getOccupedRegions(store, type) {
  var arr = [];
  var detail = {};
  var _iteratorNormalCompletion50 = true;
  var _didIteratorError50 = false;
  var _iteratorError50 = undefined;

  try {
    var _loop = function _loop() {
      var i = _step50.value;

      if (i.con_type === "DW") {
        i.occuped.split(",").map(function (e) {
          arr.push(e);
          var reg = whoseReg(store, e);

          if (i.pair.length === 1) {
            if (i.uniq !== reg) {
              detail[e] = {
                agress: _colorMap["default"][i.uniq],
                looser: _colorMap["default"][i.pair[0]]
              };
            } else {
              detail[e] = {
                agress: _colorMap["default"][i.pair[0]],
                looser: _colorMap["default"][i.uniq]
              };
            }
          } else {
            if (i.pair[0] === reg) {
              detail[e] = {
                agress: _colorMap["default"][i.pair[1]],
                looser: _colorMap["default"][i.pair[0]]
              };
            } else {
              detail[e] = {
                agress: _colorMap["default"][i.pair[0]],
                looser: _colorMap["default"][i.pair[1]]
              };
            }
          }

          return null;
        });
      }
    };

    for (var _iterator50 = store.contracts[Symbol.iterator](), _step50; !(_iteratorNormalCompletion50 = (_step50 = _iterator50.next()).done); _iteratorNormalCompletion50 = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError50 = true;
    _iteratorError50 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion50 && _iterator50["return"] != null) {
        _iterator50["return"]();
      }
    } finally {
      if (_didIteratorError50) {
        throw _iteratorError50;
      }
    }
  }

  var ret = {
    arr: arr,
    detail: detail
  };
  return ret[type];
}

function checkWarRegion(store, reg) {
  var country = whoseReg(store, reg);
  var details = getOccupedRegions(store, "detail");
  var arr = getOccupedRegions(store, "arr");
  var obj = arr.filter(function (e) {
    return details[e].agress === _colorMap["default"][store.country.identify];
  });

  if (obj.includes(reg)) {
    return false;
  } else if (arr.includes(reg)) {
    return !details[reg].agress !== _colorMap["default"][store.country.identify];
  } else {
    var _iteratorNormalCompletion51 = true;
    var _didIteratorError51 = false;
    var _iteratorError51 = undefined;

    try {
      for (var _iterator51 = store.contracts[Symbol.iterator](), _step51; !(_iteratorNormalCompletion51 = (_step51 = _iterator51.next()).done); _iteratorNormalCompletion51 = true) {
        var i = _step51.value;

        if (i.con_type === "DW" && i.pair.includes(country) && i.pair.length === 1) {
          return true;
        }
      }
    } catch (err) {
      _didIteratorError51 = true;
      _iteratorError51 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion51 && _iterator51["return"] != null) {
          _iterator51["return"]();
        }
      } finally {
        if (_didIteratorError51) {
          throw _iteratorError51;
        }
      }
    }
  }

  return false;
}

function getCountry(store, ident) {
  var _iteratorNormalCompletion52 = true;
  var _didIteratorError52 = false;
  var _iteratorError52 = undefined;

  try {
    for (var _iterator52 = store.country_ai[Symbol.iterator](), _step52; !(_iteratorNormalCompletion52 = (_step52 = _iterator52.next()).done); _iteratorNormalCompletion52 = true) {
      var i = _step52.value;

      if (ident === i.identify) {
        return i;
      }
    }
  } catch (err) {
    _didIteratorError52 = true;
    _iteratorError52 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion52 && _iterator52["return"] != null) {
        _iterator52["return"]();
      }
    } finally {
      if (_didIteratorError52) {
        throw _iteratorError52;
      }
    }
  }
}

function getDate(store) {
  var months = {
    1: "Утренней звезды",
    2: "Восхода солнца",
    3: "Первого зерна",
    4: "Руки дождя",
    5: "Второго зерна",
    6: "Середины года",
    7: "Высокого солнца",
    8: "Последнего зерна",
    9: "Огня очага",
    10: "Начала морозов",
    11: "Заката солнца",
    12: "Вечерней звезды"
  };
  var step = store.buffs.step;
  var date = new Date(2201, 1, 28);
  date.setMonth(step - 1);
  var year = date.getFullYear() - 2000;
  var month = date.getMonth();
  return "4E ".concat(year, " ").concat(months[month + 1]);
}

function getOwnContracts(store) {
  var cont = [];
  var _iteratorNormalCompletion53 = true;
  var _didIteratorError53 = false;
  var _iteratorError53 = undefined;

  try {
    for (var _iterator53 = store.contracts[Symbol.iterator](), _step53; !(_iteratorNormalCompletion53 = (_step53 = _iterator53.next()).done); _iteratorNormalCompletion53 = true) {
      var i = _step53.value;

      if (i.pair.length === 1) {
        cont.push(i);
      }
    }
  } catch (err) {
    _didIteratorError53 = true;
    _iteratorError53 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion53 && _iterator53["return"] != null) {
        _iterator53["return"]();
      }
    } finally {
      if (_didIteratorError53) {
        throw _iteratorError53;
      }
    }
  }

  return cont;
}

function getRandomRange(num) {
  return Math.floor(Math.random() * num);
}

function getReparation(country) {
  return getPopulation(country, false) * 50;
}

function getRelation(store, country) {
  var _iteratorNormalCompletion54 = true;
  var _didIteratorError54 = false;
  var _iteratorError54 = undefined;

  try {
    for (var _iterator54 = store.relations[Symbol.iterator](), _step54; !(_iteratorNormalCompletion54 = (_step54 = _iterator54.next()).done); _iteratorNormalCompletion54 = true) {
      var i = _step54.value;

      if (i.pair.length === 1 && i.pair[0] === country) {
        return i.value;
      }
    }
  } catch (err) {
    _didIteratorError54 = true;
    _iteratorError54 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion54 && _iterator54["return"] != null) {
        _iterator54["return"]();
      }
    } finally {
      if (_didIteratorError54) {
        throw _iteratorError54;
      }
    }
  }
}

function checkContract(store, type, country) {
  var priority = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var _iteratorNormalCompletion55 = true;
  var _didIteratorError55 = false;
  var _iteratorError55 = undefined;

  try {
    for (var _iterator55 = store.contracts[Symbol.iterator](), _step55; !(_iteratorNormalCompletion55 = (_step55 = _iterator55.next()).done); _iteratorNormalCompletion55 = true) {
      var i = _step55.value;

      if (i.pair.includes(country) && i.pair.length === 1 && i.con_type === type && (priority ? i.priority === priority || i.priority === "0" : true)) {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError55 = true;
    _iteratorError55 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion55 && _iterator55["return"] != null) {
        _iterator55["return"]();
      }
    } finally {
      if (_didIteratorError55) {
        throw _iteratorError55;
      }
    }
  }

  return false;
}

function getMaxId(arr) {
  var idArr = 0;
  arr.map(function (e) {
    return idArr = idArr < e.id ? e.id : idArr;
  });
  return idArr;
}

function getInfrastructure(country) {
  var val = 0;
  var _iteratorNormalCompletion56 = true;
  var _didIteratorError56 = false;
  var _iteratorError56 = undefined;

  try {
    for (var _iterator56 = country.regions[Symbol.iterator](), _step56; !(_iteratorNormalCompletion56 = (_step56 = _iterator56.next()).done); _iteratorNormalCompletion56 = true) {
      var i = _step56.value;
      val = val + i.infrastructure;
    }
  } catch (err) {
    _didIteratorError56 = true;
    _iteratorError56 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion56 && _iterator56["return"] != null) {
        _iterator56["return"]();
      }
    } finally {
      if (_didIteratorError56) {
        throw _iteratorError56;
      }
    }
  }

  return val / country.regions.length;
}

function getGdpPerPopulation(country) {
  return parseInt(getEconomy(country, false) / getPopulation(country, false));
}

function haveSeaside(country) {
  var _iteratorNormalCompletion57 = true;
  var _didIteratorError57 = false;
  var _iteratorError57 = undefined;

  try {
    for (var _iterator57 = country.regions[Symbol.iterator](), _step57; !(_iteratorNormalCompletion57 = (_step57 = _iterator57.next()).done); _iteratorNormalCompletion57 = true) {
      var i = _step57.value;

      if (i.seaside) {
        return i.name;
      }
    }
  } catch (err) {
    _didIteratorError57 = true;
    _iteratorError57 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion57 && _iterator57["return"] != null) {
        _iterator57["return"]();
      }
    } finally {
      if (_didIteratorError57) {
        throw _iteratorError57;
      }
    }
  }

  return false;
}

function getPeacingCountries(store) {
  var arr = [];
  var _iteratorNormalCompletion58 = true;
  var _didIteratorError58 = false;
  var _iteratorError58 = undefined;

  try {
    for (var _iterator58 = store.contracts[Symbol.iterator](), _step58; !(_iteratorNormalCompletion58 = (_step58 = _iterator58.next()).done); _iteratorNormalCompletion58 = true) {
      var i = _step58.value;

      if (i.con_type === 'FW' && i.pair.length === 1) {
        arr.push(i.pair[0]);
      }

      if (i.con_type === 'CP' && i.pair.length === 1) {
        arr.push(i.pair[0]);
      }
    }
  } catch (err) {
    _didIteratorError58 = true;
    _iteratorError58 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion58 && _iterator58["return"] != null) {
        _iterator58["return"]();
      }
    } finally {
      if (_didIteratorError58) {
        throw _iteratorError58;
      }
    }
  }

  return arr;
}

function makeBattleEffects(store, props, obj) {
  var changerOwn = {
    pechot_quan: obj.own.pechot,
    archer_quan: obj.own.archer,
    cavallery_quan: obj.own.cavallery,
    catapult_quan: obj.own.catapult,
    country: store.createGame.country.identify,
    country_id: store.createGame.country.id,
    id: 1,
    place: obj.region.name,
    place_type: 'G',
    status: 'R'
  };
  var changerEnemy = {
    pechot_quan: obj.enemy.pechot,
    archer_quan: obj.enemy.archer,
    cavallery_quan: obj.enemy.cavallery,
    catapult_quan: obj.enemy.catapult,
    country: obj.enemyCountry.identify,
    country_id: obj.enemyCountry.id,
    id: 1,
    place: obj.region.name,
    place_type: 'G',
    status: 'R'
  };

  if (obj.result === 'own') {
    props.change_occuped({
      own: store.createGame.country.name,
      enemy: obj.enemyCountry.identify,
      region: obj.region.name
    });
    props.delete_squad(changerOwn);
    props.new_squad(changerOwn);

    if (obj.enemy.pechot + obj.enemy.archer + obj.enemy.cavallery + obj.enemy.catapult > 0) {
      var _iteratorNormalCompletion59 = true;
      var _didIteratorError59 = false;
      var _iteratorError59 = undefined;

      try {
        for (var _iterator59 = _movingSquad["default"][obj.region.name][Symbol.iterator](), _step59; !(_iteratorNormalCompletion59 = (_step59 = _iterator59.next()).done); _iteratorNormalCompletion59 = true) {
          var i = _step59.value;

          if (canBeTargetAI(store.createGame, i, obj.enemyCountry.identify)) {
            props.delete_ai_squad(changerEnemy);
            changerEnemy.place = i;
            props.new_ai_squad(changerEnemy);
            return null;
          }
        }
      } catch (err) {
        _didIteratorError59 = true;
        _iteratorError59 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion59 && _iterator59["return"] != null) {
            _iterator59["return"]();
          }
        } finally {
          if (_didIteratorError59) {
            throw _iteratorError59;
          }
        }
      }

      if (obj.region.seaside && haveSeaside(obj.enemy)) {
        props.delete_squad(changerEnemy);
        changerEnemy.place = haveSeaside(obj.enemy);
        props.new_squad(changerEnemy);
        return null;
      }

      props.delete_ai_squad(changerEnemy);
    } else {
      props.delete_ai_squad(changerEnemy);
    }
  } else {
    props.change_ai_squad(changerEnemy);

    if (obj.own.pechot + obj.own.archer + obj.own.cavallery + obj.own.catapult > 0) {
      var _iteratorNormalCompletion60 = true;
      var _didIteratorError60 = false;
      var _iteratorError60 = undefined;

      try {
        for (var _iterator60 = _movingSquad["default"][obj.region.name][Symbol.iterator](), _step60; !(_iteratorNormalCompletion60 = (_step60 = _iterator60.next()).done); _iteratorNormalCompletion60 = true) {
          var _i12 = _step60.value;

          if (canBeRetreat(store.createGame, _i12)) {
            props.delete_squad(changerOwn);
            changerOwn.place = _i12;
            props.new_squad(changerOwn);
            return null;
          }
        }
      } catch (err) {
        _didIteratorError60 = true;
        _iteratorError60 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion60 && _iterator60["return"] != null) {
            _iterator60["return"]();
          }
        } finally {
          if (_didIteratorError60) {
            throw _iteratorError60;
          }
        }
      }

      if (obj.region.seaside && haveSeaside(store.createGame.country)) {
        props.delete_squad(changerOwn);
        changerOwn.place = haveSeaside(store.createGame.country);
        props.new_squad(changerOwn);
        return null;
      }

      props.delete_squad(changerOwn);
    } else {
      props.delete_squad(changerOwn);
    }
  }
}

function getSouseren(store) {
  var _iteratorNormalCompletion61 = true;
  var _didIteratorError61 = false;
  var _iteratorError61 = undefined;

  try {
    for (var _iterator61 = store.contracts[Symbol.iterator](), _step61; !(_iteratorNormalCompletion61 = (_step61 = _iterator61.next()).done); _iteratorNormalCompletion61 = true) {
      var i = _step61.value;

      if (i.con_type === "VC" && i.pair.length === 1 && i.priority !== store.country.name) {
        return i.pair[0];
      }
    }
  } catch (err) {
    _didIteratorError61 = true;
    _iteratorError61 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion61 && _iterator61["return"] != null) {
        _iterator61["return"]();
      }
    } finally {
      if (_didIteratorError61) {
        throw _iteratorError61;
      }
    }
  }
}

function parseDate(date) {
  return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}