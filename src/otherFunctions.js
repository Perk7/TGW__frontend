import identCountries from "./identCountries";
import colorMap from "./colorMap";

export function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    // при необходимости добавьте другие значения по умолчанию
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
  document.cookie = name + "=; expires=Tue, 19 Jan 2000 03:14:07 GMT;";
}

export function onBoard() {
  let view = document.querySelector("html");
  view.classList.add("html-overflow");
}

export function offBoard() {
  let view = document.querySelector("html");
  view.classList.remove("html-overflow");
  window.scrollTo(0, 0);
}

export function getAllRegions(store) {
  let ret = [];
  for (let i of store.country.regions) {
    ret.push(i);
  }
  for (let f of store.country_ai) {
    for (let i of f.regions) {
      ret.push(i);
    }
  }
  return ret;
}

export function getPopulation(country, separated) {
  let sum = 0;
  for (let i of country.regions) {
    sum = sum + i.population;
  }
  if (separated) {
    return sum.toLocaleString();
  }
  return sum;
}

export function getArea(country, separated) {
  let sum = 0;
  for (let i of country.regions) {
    sum = sum + i.area;
  }
  if (separated) {
    return sum.toLocaleString();
  }
  return sum;
}

export function getEconomy(country, separated) {
  let sum = 0;
  for (let f of country.regions) {
    for (let z in f) {
      if (~z.indexOf("industry")) {
        sum = sum + f[z];
      }
    }
  }
  if (separated) {
    return sum.toLocaleString();
  }
  return sum;
}

export function getArmy(squads, separated) {
  let sum = 0;
  for (let i of squads) {
    sum =
      sum +
      i.archer_quan +
      i.cavallery_quan +
      i.catapult_quan * 20 +
      i.pechot_quan;
  }
  if (separated) {
    return sum.toLocaleString();
  }
  return sum;
}

export function getAIArmy(squads, country, separated) {
  let sum = 0;
  for (let i of squads) {
    if (i.country === country) {
      sum =
        sum +
        i.archer_quan +
        i.cavallery_quan +
        i.catapult_quan * 20 +
        i.pechot_quan;
    }
  }
  if (separated) {
    return sum.toLocaleString();
  }
  return sum;
}

export function getAvgSalary(country, separated) {
  let sum = 0;
  let coun = 0;
  for (let i of country.regions) {
    sum = sum + i.avg_salary;
    coun++;
  }
  sum = sum / coun;
  if (separated) {
    return sum.toFixed(0).toLocaleString();
  }
  return sum;
}

export function getPoverty(country, separated) {
  let sum = 0;
  let coun = 0;
  for (let i of country.regions) {
    sum = sum + i.poverty;
    coun++;
  }
  sum = sum / coun;
  if (separated) {
    sum = sum * 100;
    return sum.toFixed(2);
  }
  return sum;
}

export function getUnemployment(country, separated) {
  let sum = 0;
  let coun = 0;
  for (let i of country.regions) {
    sum = sum + i.unemployment;
    coun++;
  }
  sum = sum / coun;
  if (separated) {
    sum = sum * 100;
    return sum.toFixed(2);
  }
  return sum;
}

export function getColor(value) {
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

export function getGovernment(value) {
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

export function getAreaFormat(value) {
  value = value.split(",");
  let koef = 0;
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

export function getArmySalary(country, separated) {
  let salary = country.army_salary.split(",");
  if (separated) {
    let pension = {
      1: 40,
      2: 45,
      3: 50,
      4: 60,
    };
    return {
      pensionAge: pension[salary[0]],
      avgSalary: +salary[1].toLocaleString(),
      avgPension: +salary[2].toLocaleString(),
    };
  } else {
    return {
      pensionAge: salary[0],
      avgSalary: +salary[1],
      avgPension: +salary[2],
    };
  }
}

export function getArmyMaintain(country, separated) {
  let maintain = country.army_maintain.split(",");
  if (separated) {
    let desc = {
      food: {
        1: "Нет",
        2: "Минимальное",
        3: "Достаточное",
        4: "Расширенное",
      },
      infrastructure: {
        1: "Минимальная",
        2: "Средняя",
        3: "Отличная",
      },
      household: {
        1: "Минимальные",
        2: "Достаточные",
        3: "Расширенные",
      },
    };
    return {
      food: desc.food[+maintain[0]],
      infrastructure: desc.infrastructure[+maintain[1]],
      household: desc.household[+maintain[2]],
    };
  } else {
    return {
      food: +maintain[0],
      infrastructure: +maintain[1],
      household: +maintain[2],
    };
  }
}

export function getArmyEquip(country, separated) {
  let equip = country.army_equip.split(",");
  if (separated) {
    let desc = {
      equip: {
        1: "Кожанная",
        2: "Железная",
        3: "Ламелярная",
        4: "Орихалковая",
        5: "Эбонитовая",
      },
      complects: {
        1: 1,
        2: 1.5,
        3: 2,
        4: 3,
      },
      resources: {
        1: "Мало",
        2: "Средне",
        3: "Много",
      },
    };
    return {
      equip: desc.equip[equip[0]],
      complects: desc.equip[equip[1]],
      resources: desc.equip[equip[2]],
    };
  } else {
    return {
      equip: +equip[0],
      complects: +equip[1],
      resources: +equip[2],
    };
  }
}

export function getResource(country, type, separated) {
  let sum = 0;
  for (let f of country.regions) {
    for (let z in f) {
      if (~z.indexOf(`industry_${type}`)) {
        sum = sum + f[z];
      }
    }
  }
  if (separated) {
    return sum.toLocaleString();
  }
  return sum;
}

export function getNeed(country, type, separated) {
  let sum = 0;
  for (let f of country.regions) {
    for (let z in f) {
      if (~z.indexOf(`needs_${type}`)) {
        sum = sum + f[z];
      }
    }
  }
  if (separated) {
    return sum.toLocaleString();
  }
  return sum;
}

export function isVassal(store) {
  for (let i of store.contracts) {
    if (
      i.con_type === "VC" &&
      i.pair.length === 1 &&
      i.priority !== store.country.name
    ) {
      return true;
    }
  }
  return false;
}

export function getPaveRoads(store) {
  let sum = 0;
  for (let i of store.regions) {
    sum = sum + i.pave_road;
  }
  sum = sum / store.regions.length;

  return sum;
}

export function getStoneRoads(store) {
  let sum = 0;
  for (let i of store.regions) {
    sum = sum + i.stone_road;
  }
  sum = sum / store.regions.length;

  return sum;
}

export function getPort(store) {
  let sum = 0;
  for (let i of store.regions) {
    sum = sum + i.port;
  }
  sum = sum / store.regions.length;

  return sum;
}

export function getCargoDelivery(store) {
  let sum = 0;
  for (let i of store.regions) {
    sum = sum + i.cargo_ship;
  }
  sum = sum / store.regions.length;

  return sum;
}

export function getPeopleDelivery(store) {
  let sum = 0;
  for (let i of store.regions) {
    sum = sum + i.people_ship;
  }
  sum = sum / store.regions.length;

  return sum;
}

export function getAqueducs(store) {
  let sum = 0;
  for (let i of store.regions) {
    sum = sum + i.aqueducs;
  }

  return sum;
}

export function getSchools(store) {
  let sum = 0;
  for (let i of store.regions) {
    sum = sum + i.schools;
  }

  return sum;
}

export function getUniversities(store) {
  let sum = 0;
  for (let i of store.regions) {
    sum = sum + i.universities;
  }

  return sum;
}

export function getVassals(store, country) {
  let list = [];
  for (let i of store.contracts) {
    if (i.con_type === "VC" && i.pair.length === 1 && i.priority === country) {
      list.push({
        name: identCountries[i.pair[0]],
        ident: i.pair[0],
      });
    }
  }
  return list;
}

export function getWars(store, country) {
  let list = [];
  for (let i of store.contracts) {
    if (i.con_type === "DW") {
      if (i.pair.length === 1 && identCountries[i.uniq] === country) {
        list.push({
          name: identCountries[i.pair[0]],
          ident: i.pair[0],
        });
      } else {
        if (i.pair.indexOf(country) !== -1) {
          list.push({
            name: identCountries[i.pair[1 - i.pair.indexOf(country)]],
            ident: i.pair[1 - i.pair.indexOf(country)],
          });
        }
      }
    }
  }
  return list;
}

export function getAlliance(store, country) {
  let list = [];
  for (let i of store.contracts) {
    if (i.con_type === "AL") {
      if (i.pair.length === 1 && identCountries[i.uniq] === country) {
        list.push({
          name: identCountries[i.pair[0]],
          ident: i.pair[0],
        });
      } else {
        if (
          i.pair.indexOf(
            Object.keys(identCountries).find(
              (key) => identCountries[key] === country
            )
          ) !== -1
        ) {
          list.push({
            name: identCountries[i.pair[1 - i.pair.indexOf(country)]],
            ident: i.pair[1 - i.pair.indexOf(country)],
          });
        }
      }
    }
  }
  return list;
}

export function getSquads(store, country) {
  let list = [];
  for (let i of store.squad_ai) {
    if (i.country === country) {
      list.push(i);
    }
  }
  return list;
}

export function getRegion(store, ident) {
  for (let i of store.country.regions) {
    if (i.name === ident) {
      return i;
    }
  }
  for (let f of store.country_ai) {
    for (let i of f.regions) {
      if (i.name === ident) {
        return i;
      }
    }
  }
}

export function getRegsOfCountry(store, country) {
  let regs = [];
  if (country === store.country.identify) {
    for (let i of store.country.regions) {
      regs.push(i.name);
    }
  } else {
    for (let i of store.country_ai) {
      if (country === i.identify) {
        for (let r of i.regions) {
          regs.push(r.name);
        }
      }
    }
  }
  return regs;
}

export function getSeaRegs(store) {
  let arr = [];

  for (let i of store.country.regions) {
    if (i.seaside) {
      arr.push(i);
    }
  }
  for (let f of store.country_ai) {
    for (let i of f.regions) {
      if (i.seaside) {
        arr.push(i);
      }
    }
  }

  return arr;
}

export function whoseReg(store, reg) {
  if (store.country.regions.indexOf(getRegion(store, reg)) !== -1) {
    return store.country.identify;
  }
  for (let i of store.country_ai) {
    if (i.regions.indexOf(getRegion(store, reg)) !== -1) {
      return i.identify;
    }
  }
}

export function canBeTarget(store, reg) {
  let country = whoseReg(store, reg);

  for (let i of store.contracts) {
    if (
      i.con_type === "AL" ||
      i.con_type === "DW" ||
      i.con_type === "VC" ||
      i.con_type === "PA"
    ) {
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
  return false;
}

export function checkSeaside(store, reg) {
  return getRegion(store, reg).seaside;
}

export function getPhysTaxes(country) {
  let summ = 0;
  let str = country.tax_physic.split(" ").map((e) => +e.replace(/,/, "."));
  let taxes = {
    income: +str[0],
    land: +str[1],
  };
  summ =
    summ +
    getPopulation(country, false) *
      0.5 *
      getAvgSalary(country, false) *
      taxes.income;
  summ =
    summ +
    getPopulation(country, false) *
      0.2 *
      getAvgSalary(country, false) *
      taxes.land;
  return parseInt(summ.toFixed(0));
}

export function getJuridTaxes(country) {
  let summ = 0;
  let str = country.tax_jurid.split(" ").map((e) => +e.replace(/,/, "."));
  let taxes = {
    income: +str[0],
    useful: +str[1],
    govern: +str[2],
    export: +str[3],
  };
  summ = summ + getEconomy(country, false) * taxes.income * 0.5;
  summ =
    summ +
    (getResource(country, "blackmetall", false) +
      getResource(country, "colormetall", false) +
      getResource(country, "coal", false)) *
      taxes.useful *
      2;
  summ =
    summ +
    (getResource(country, "alchemy", false) +
      getResource(country, "light", false) +
      getResource(country, "blacksmith", false) +
      getResource(country, "other", false) +
      getResource(country, "typography", false)) *
      taxes.govern;
  let indus = [];
  for (let i of Object.keys(country.capital)) {
    if (i.indexOf("industry_") !== -1) {
      indus.push(i.split("_")[1]);
    }
  }
  for (let i of indus) {
    if (getResource(country, i, false) > getNeed(country, i, false)) {
      summ =
        summ +
        (getResource(country, i, false) - getNeed(country, i, false)) *
          taxes.export *
          4;
    }
  }
  return parseInt(summ.toFixed(0));
}

export function getSalaryPension(store) {
  let salar = getArmySalary(store.country, false);
  let summ = 0;
  for (let i of store.squad) {
    let quan =
      i.archer_quan + i.cavallery_quan + i.catapult_quan * 20 + i.pechot_quan;
    let incr = 0;
    incr = incr + quan * salar.avgSalary;
    incr = incr + salar.pensionAge * salar.avgPension * quan * 0.05;

    summ = summ + incr / (i.status === "r" ? 1 : 2);
  }

  return summ;
}

export function getMaintain(store) {
  let main = getArmyMaintain(store.country, false);
  let summ = 0;
  for (let i of store.squad) {
    let quan =
      i.archer_quan + i.cavallery_quan + i.catapult_quan * 20 + i.pechot_quan;
    let incr = 0;
    incr = incr + 300 * quan * main.food;
    incr = incr + 200 * quan * main.infrastructure;
    incr = incr + 100 * quan * main.household;

    summ = summ + incr / (i.status === "r" ? 1 : 2);
  }

  return summ;
}

export function getEquip(store) {
  let equ = getArmyEquip(store.country, false);
  let summ = 0;
  summ =
    summ +
    100 * equ.equip * equ.resources * getArmy(store.squad) * equ.complects;
  return summ;
}

export function getSpendBudget(store) {
  let spends = {
    infrastructure: parseInt(
      0.0004 *
        store.buffs.budget_infrastructure *
        getArea(store.country, false) *
        getPopulation(store.country, false)
    ),
    education: parseInt(
      0.0006 *
        store.buffs.budget_education *
        getArea(store.country, false) *
        getPopulation(store.country, false)
    ),
    research: parseInt(
      80 * store.buffs.budget_research * getPopulation(store.country, false)
    ),
    propaganda: parseInt(
      0.00015 *
        store.buffs.budget_propaganda *
        getArea(store.country, false) *
        getPopulation(store.country, false)
    ),
    government: parseInt(
      0.0002 *
        store.buffs.budget_government *
        getArea(store.country, false) *
        getPopulation(store.country, false)
    ),
  };

  return spends;
}

export function getSpends(store) {
  return (
    getDiplomatySpends(store).spend +
    getSocialSpends(store.country) +
    Object.values(getSpendBudget(store)).reduce((a, b) => a + b) +
    getSalaryPension(store) +
    getMaintain(store) +
    getEquip(store)
  );
}

export function getIncomes(store) {
  return (
    getJuridTaxes(store.country) +
    getPhysTaxes(store.country) +
    getDiplomatySpends(store).income
  );
}

export function getBalance(store) {
  return getIncomes(store) - getSpends(store);
}

export function getPersOfGdp(store, infrastructure) {
  let infras = 0;
  let gdp = getEconomy(store.country, false);
  for (let i of store.country.regions) {
    infras += i[infrastructure];
  }

  return infras / gdp;
}

export function getPersOfWorld(store, infrastructure) {
  let infras = 0;
  for (let i of store.country.regions) {
    infras += i[infrastructure];
  }
  let gdp = infras;
  for (let f of store.country_ai) {
    for (let i of f.regions) {
      gdp += i[infrastructure];
    }
  }

  return infras / gdp;
}

export function getBalanceRes(country, persentage) {
  let res = 0;
  let needs = 0;
  for (let i of Object.keys(country.regions[0])) {
    if (~i.indexOf(`industry_`)) {
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

export function getWarDetails(store, country) {
  let contract;
  for (let i of store.contracts) {
    if (
      i.con_type === "DW" &&
      i.pair.length === 1 &&
      i.pair.indexOf(country) !== -1
    ) {
      contract = i;
    }
  }
  let hash = { spends: {}, regions: [] };
  if (contract === undefined) {
    return hash;
  }
  if (identCountries[contract.priority] === store.country.identify) {
    hash.spends = {
      [store.country.identify]: contract.spends.split("_")[0],
      [country]: contract.spends.split("_")[1],
    };
  } else {
    hash.spends = {
      [store.country.identify]: contract.spends.split("_")[1],
      [country]: contract.spends.split("_")[0],
    };
  }
  if (contract.occuped) {
    contract.occuped.split(",").map((e) => hash.regions.push(e));
  }

  return hash;
}

export function getBalanceRegion(store, con) {
  let incr = 0;
  for (let i of con.regions) {
    if (store.country.regions.indexOf(getRegion(store, i)) !== -1) {
      incr++;
    }
  }
  return -2 * incr + con.regions.length;
}

export function getSocialSpends(country) {
  let sum = 0;

  sum = sum + country.maternal_capital * getPopulation(country, false) * 0.0025;
  sum =
    sum +
    country.allowance_unemploy *
      getPopulation(country, false) *
      0.6 *
      getUnemployment(country, false);
  sum =
    sum + country.allowance_disability * getPopulation(country, false) * 0.003;
  sum =
    sum +
    country.avg_pension *
      getPopulation(country, false) *
      0.25 *
      (0.23 - +country.pension_w * 0.04);
  sum =
    sum +
    country.avg_pension *
      getPopulation(country, false) *
      0.25 *
      (0.23 - +country.pension_m * 0.04);

  return parseInt(sum);
}

export function getDiplomatySpends(store) {
  let list = [];
  for (let i of store.contracts) {
    if (i.con_type === "FW") {
      if (i.pair.length === 1) {
        list.push({
          pair: [identCountries[i.uniq], identCountries[i.pair[0]]],
          ident: [i.uniq, i.pair[0]],
          priority: i.priority,
        });
      }
    }
  }
  let spends = list.filter((e) => {
    return e.priority !== store.country.name;
  });
  let incomes = list.filter((e) => {
    return e.priority === store.country.name;
  });

  return {
    spend: spends.length * getReparation(store.country),
    income: incomes.length * getReparation(store.country),
  };
}

export function getTransOfPlace(transition, place) {
  for (let i of Object.keys(transition)) {
    if (transition[i].place === place) {
      return transition[i];
    }
  }
  return false;
}

export function getOccupedRegions(store, type) {
  let arr = [];
  let detail = {};
  for (let i of store.contracts) {
    if (i.con_type === "DW") {
      i.occuped.split(",").map((e) => {
        arr.push(e);
        let reg = whoseReg(store, e);
        if (i.pair.length === 1) {
          if (i.uniq !== reg) {
            detail[e] = {
              agress: colorMap[i.uniq],
              looser: colorMap[i.pair[0]],
            };
          } else {
            detail[e] = {
              agress: colorMap[i.pair[0]],
              looser: colorMap[i.uniq],
            };
          }
        } else {
          if (i.pair[0] === reg) {
            detail[e] = {
              agress: colorMap[i.pair[1]],
              looser: colorMap[i.pair[0]],
            };
          } else {
            detail[e] = {
              agress: colorMap[i.pair[0]],
              looser: colorMap[i.pair[1]],
            };
          }
        }
        return null;
      });
    }
  }
  const ret = {
    arr: arr,
    detail: detail,
  };

  return ret[type];
}

export function checkWarRegion(store, reg) {
  let country = whoseReg(store, reg);
  const details = getOccupedRegions(store, "detail");
  const arr = getOccupedRegions(store, "arr");
  let obj = arr.filter(
    (e) => details[e].agress === colorMap[store.country.identify]
  );
  if (obj.includes(reg)) {
    return false;
  } else if (arr.includes(reg)) {
    return !details[reg].agress !== colorMap[store.country.identify];
  } else {
    for (let i of store.contracts) {
      if (
        i.con_type === "DW" &&
        i.pair.includes(country) &&
        i.pair.length === 1
      ) {
        return true;
      }
    }
  }
  return false;
}

export function getCountry(store, ident) {
  for (let i of store.country_ai) {
    if (ident === i.identify) {
      return i;
    }
  }
}

export function getDate(store) {
  const months = {
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
    12: "Вечерней звезды",
  };

  let step = store.buffs.step;

  let date = new Date(2201, 1, 28);
  date.setMonth(step - 1);

  let year = date.getFullYear() - 2000;
  let month = date.getMonth();

  return `4E ${year} ${months[month + 1]}`;
}

export function getOwnContracts(store) {
  let cont = [];
  for (let i of store.contracts) {
    if (i.pair.length === 1) {
      cont.push(i);
    }
  }

  return cont;
}

export function getRandomRange(num) {
  return Math.floor(Math.random() * num);
}

export function getReparation(country) {
  return getPopulation(country, false) * 50;
}

export function getRelation(store, country) {
  for (let i of store.relations) {
    if (i.pair.length === 1 && i.pair[0] === country) {
      return i.value;
    }
  }
}

export function checkContract(store, type, country, priority = false) {
  for (let i of store.contracts) {
    if (
      i.pair.includes(country) &&
      i.pair.length === 1 &&
      i.con_type === type &&
      (priority ? i.priority === priority || i.priority === "0" : true)
    ) {
      return true;
    }
  }
  return false;
}

export function getMaxId(arr) {
  let idArr = 0;
  arr.map((e) => (idArr = idArr < e.id ? e.id : idArr));
  return idArr;
}

export function getInfrastructure(country) {
  let val = 0
  for (let i of country.regions) {
    val = val + i.infrastructure
  }
  return val / country.regions.length
}