import {
  checkContract,
  getAIArmy,
  getArmy,
  getAvgSalary,
  getBalance,
  getCountry,
  getEconomy,
  getMaxId,
  getOwnContracts,
  getPoverty,
  getRandomRange,
  getRelation,
  getReparation,
  getUnemployment,
  getVassals,
  isVassal,
  whoseReg,
} from "./otherFunctions";
import identCountries from "./identCountries";
import { getAnswerPeace } from "./neuroFunctions";

export default async function nextStep(store, func) {
  let newStore = Object.assign({}, store.createGame);
  let newCountry = Object.assign({}, store.createGame.country);
  let newBuff = Object.assign({}, store.createGame.buffs);

  const easyBuff = [
    "support",
    "stability",
    "inflation",
    "alchemy",
    "science",
    "magic",
    "technology",
    "education_quality",
  ];
  const easyRegionBuff = [
    "poverty",
    "unemployment",
    "infrastructure",
    "stone_road",
    "pave_road",
    "port",
  ];
  const countRegionBuff = ["aqueducs", "schools", "universities"];
  const hardRegionBuff = [
    "population",
    "avg_salary",
    "industry_blackmetall",
    "industry_colormetall",
    "industry_coal",
    "industry_hunting",
    "industry_fishing",
    "industry_forestry",
    "industry_blacksmith",
    "industry_animals",
    "industry_vegetable",
    "industry_wheat",
    "industry_typography",
    "industry_light",
    "industry_eating",
    "industry_jewelry",
    "industry_transport",
    "industry_alchemy",
    "industry_hiring",
    "industry_culture",
    "industry_other",
  ];

  function countryBuffs(hash) {
    for (let i of Object.keys(hash)) {
      if (i === "army_quality") {
        newBuff[i] = newBuff[i] + hash[i];
      } else {
        newCountry[i] = newCountry[i] + hash[i];
      }
    }
  }

  function regionBuffs(hash) {
    for (let i of Object.keys(hash)) {
      if (i === "industry") {
        for (let reg of newCountry.regions) {
          for (let ch of Object.keys(reg)) {
            if (ch.startsWith("industry")) {
              reg[ch] =
                reg[ch] +
                hash[i] *
                  reg[ch] *
                  (reg.name === newCountry.capital.name ? 1.1 : 1);
            }
          }
        }
        continue;
      }
      if (hardRegionBuff.includes(i)) {
        for (let reg of newCountry.regions) {
          reg[i] =
            reg[i] +
            hash[i] * reg[i] * (reg.name === newCountry.capital.name ? 1.1 : 1);
        }
        continue;
      }
      if (countRegionBuff.includes(i)) {
        for (let ind = 0; ind < hash[i]; ind++) {
          let koef = Math.floor(Math.random() * newCountry.regions.length);
          newCountry.regions[koef][i] = newCountry.regions[koef][i] + 1;
        }
        continue;
      }
      for (let reg of newCountry.regions) {
        reg[i] = reg[i] + hash[i];
      }
    }
  }

  let buffer = {
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
      technology: 0.005,
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

      population: 0.0005,
    },
  };

  class outBufferClass {
    constructor() {
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
          technology: 0.005,
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

          population: 0.0005,
        },
      };
    }

    add(hash) {
      for (let dir of Object.keys(hash)) {
        for (let type of Object.keys(hash[dir])) {
          let val = hash[dir][type];
          this.outBuffer[dir][type] =
            +this.outBuffer[dir][type].toFixed(5) +
            +(buffer[dir][type] * val).toFixed(5);
        }
      }
    }

    show() {
      return this.outBuffer;
    }

    commit() {
      countryBuffs(this.outBuffer.country);
      regionBuffs(this.outBuffer.regions);
    }
  }

  let outBuffer = new outBufferClass();

  // Применение основных баффов за данный ход

  newBuff.actions = 10;
  newBuff.step = newBuff.step + 1;

  newCountry["education_avail"] =
    newCountry["education_avail"] +
    newBuff["education_access"] * newCountry["education_avail"];
  newCountry["export_trash"] =
    newCountry["export_trash"] + newBuff["trash"] * newCountry["export_trash"];

  for (let reg of newCountry.regions) {
    reg["cargo_ship"] =
      reg["cargo_ship"] +
      newBuff["delivery_box"] *
        reg["cargo_ship"] *
        (reg.name === newCountry.capital.name ? 1.1 : 1);
  }
  for (let reg of newCountry.regions) {
    reg["people_ship"] =
      reg["people_ship"] +
      newBuff["delivery_people"] *
        reg["people_ship"] *
        (reg.name === newCountry.capital.name ? 1.1 : 1);
  }

  easyBuff.map((e) => {
    newCountry[e] = newCountry[e] + newBuff[e];
    newBuff[e] = 0;
    return null;
  });
  easyRegionBuff.map((e) => {
    for (let i of newCountry.regions) {
      i[e] = i[e] + newBuff[e];
      newBuff[e] = 0;
    }
    return null;
  });
  hardRegionBuff.map((e) => {
    for (let i of newCountry.regions) {
      i[e] =
        i[e] +
        newBuff[e] * i[e] * (i.name === newCountry.capital.name ? 1.1 : 1);
      newBuff[e] = 0;
    }
    return null;
  });
  countRegionBuff.map((e) => {
    let fullCycle = parseInt(newBuff[e] / newCountry.regions.length);
    let shortCycle = newBuff[e] % newCountry.regions.length;
    while (fullCycle > 0) {
      for (let i = 0; i < newCountry.regions.length; i++) {
        newCountry.regions[i][e] = newCountry.regions[i][e] + 1;
      }
      fullCycle--;
    }
    for (let i = 0; i < shortCycle; i++) {
      newCountry.regions[i][e] = newCountry.regions[i][e] + 1;
    }
    newBuff[e] = 0;
    return null;
  });

  // Баффы "Политика"

  const hashGovernmentBuffs = {
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
          technology: -0.3,
        },
        regions: {
          industry: -0.1,
          infrastructure: -0.15,
          avg_salary: -0.1,
          poverty: -0.15,
          unemployment: -0.15,
        },
      },
      additional: [
        {
          country: {
            stability: 0.2,
            support: -0.3,
          },
          regions: {
            industry: -0.05,
            infrastructure: -0.05,
            unemployment: -0.15,
          },
        },
        {
          country: {
            education_avail: -0.15,
            education_quality: 0.15,
            magic: -0.1,
            science: 0.1,
            stability: 0.2,
          },
          regions: {
            cargo_ship: -0.1,
            people_ship: -0.1,
          },
        },
      ],
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
          technology: -0.15,
        },
        regions: {
          industry: 0.1,
          infrastructure: -0.1,
          avg_salary: -0.1,
          poverty: -0.15,
          unemployment: -0.1,
        },
      },
      additional: [
        {
          country: {
            education_quality: 0.1,
            magic: -0.1,
            science: 0.1,
            stability: 0.15,
            support: -0.1,
            technology: -0.05,
          },
          regions: {
            poverty: 0.05,
            unemployment: -0.1,
          },
        },
        {
          country: {
            education_avail: -0.15,
            education_quality: 0.15,
            magic: -0.15,
            science: 0.15,
            stability: 0.2,
          },
          regions: {
            cargo_ship: -0.05,
            people_ship: -0.05,
          },
        },
      ],
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
          technology: 0.2,
        },
        regions: {
          industry: 0.3,
          infrastructure: 0.1,
          avg_salary: -0.1,
          poverty: -0.2,
          unemployment: 0.1,
        },
      },
      additional: [
        {
          country: {
            education_avail: 0.1,
            export_trash: 0.1,
            science: -0.05,
            stability: -0.2,
            support: 0.25,
          },
          regions: {
            industry: -0.05,
            avg_salary: 0.05,
            poverty: -0.1,
            unemployment: 0.15,
          },
        },
        {
          country: {
            education_quality: -0.15,
            magic: 0.1,
            stability: -0.2,
            support: 0.15,
            technology: -0.05,
          },
          regions: {
            poverty: -0.05,
            unemployment: -0.05,
          },
        },
      ],
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
          technology: 0.2,
        },
        regions: {
          industry: 0.2,
          infrastructure: 0.1,
          avg_salary: -0.1,
          poverty: 0.2,
          unemployment: -0.2,
        },
      },
      additional: [
        {
          country: {
            education_quality: -0.15,
            stability: 0.2,
            support: -0.2,
          },
          regions: {
            industry: -0.05,
            poverty: 0.05,
          },
        },
        {
          country: {
            education_avail: -0.1,
            science: -0.1,
            stability: 0.15,
            support: -0.15,
            technology: -0.05,
          },
          regions: {},
        },
      ],
    },
  };
  const hashAreaFormatBuffs = {
    budget: {
      country: {
        alchemy: -0.25,
        education_avail: -0.25,
        education_quality: 0.2,
        export_trash: -0.2,
        magic: -0.2,
        science: -0.2,
        support: 0.2,
        technology: 0.2,
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
        unemployment: 0.15,
      },
    },
    laws: {
      country: {
        education_avail: 0.25,
        education_quality: -0.25,
        science: 0.25,
        stability: -0.3,
        technology: 0.25,
      },
      regions: {
        industry: 0.15,
        avg_salary: 0.05,
        poverty: 0.1,
        unemployment: 0.1,
      },
    },
    police: {
      country: {
        stability: -0.35,
        support: 0.15,
      },
      regions: {
        cargo_ship: 0.15,
        people_ship: 0.15,
        port: -0.15,
        infrastructure: 0.15,
        pave_road: -0.05,
        stone_road: -0.03,
      },
    },
    localGovernment: {
      country: {
        education_quality: 0.15,
        export_trash: -0.2,
        stability: 0.2,
        support: -0.35,
      },
      regions: {
        port: 0.1,
      },
    },
  };

  let currentGovernment = Object.assign(
    {},
    hashGovernmentBuffs[newCountry.government.split(",")[0]]
  );
  let currentGovernmentOpts = newCountry.government.split(",").slice(1);
  outBuffer.add(currentGovernment.initial);
  for (let i of currentGovernmentOpts) {
    const hash = currentGovernment.additional[currentGovernmentOpts.indexOf(i)];
    if (+i === 1) {
      ["country", "regions"].map((e) => {
        for (let sec of Object.keys(hash[e])) {
          hash[e][sec] = -hash[e][sec];
        }
        return null;
      });
    }
    outBuffer.add(hash);
  }

  let currentAreaFormat = newCountry.area_format.split(",");
  for (let i of currentAreaFormat) {
    const hash =
      hashAreaFormatBuffs[
        Object.keys(hashAreaFormatBuffs)[currentAreaFormat.indexOf(i)]
      ];
    if (+i === 1) {
      ["country", "regions"].map((e) => {
        for (let sec of Object.keys(hash[e])) {
          hash[e][sec] = -hash[e][sec];
        }
        return null;
      });
    }
    outBuffer.add(hash);
  }

  // Баффы "Армия"

  const hashArmyBuffs = {
    army_salary: [
      {
        country: {
          army_quality: 0.25,
          support: 0.3,
        },
        regions: {},
      },
      {
        country: {
          army_quality: 0.25,
          stability: 0.3,
          support: 0.25,
        },
        regions: {
          poverty: 0.2,
          unemployment: 0.2,
        },
      },
      {
        country: {
          army_quality: 0.2,
          support: 0.3,
        },
        regions: {
          poverty: 0.2,
        },
      },
    ],
    army_maintain: [
      {
        country: {
          army_quality: 0.25,
          support: 0.1,
        },
        regions: {},
      },
      {
        country: {
          army_quality: 0.3,
          export_trash: 0.1,
          technology: 0.15,
        },
        regions: {
          port: 0.2,
          infrastructure: 0.3,
          pave_road: 0.1,
          stone_road: 0.05,
        },
      },
      {
        country: {
          army_quality: 0.3,
          alchemy: 0.1,
          export_trash: 0.1,
          support: 0.15,
        },
        regions: {},
      },
    ],
    army_equip: [
      {
        country: {
          army_quality: 0.5,
        },
        regions: {},
      },
      {
        country: {
          army_quality: 0.2,
        },
        regions: {},
      },
      {
        country: {
          army_quality: 0.3,
          support: 0.15,
        },
        regions: {},
      },
    ],
  };

  let currentArmySalaryOpts = newCountry.army_salary.split(",");

  const armySalaryKoef = {
    0: {
      1: 2,
      2: 1,
      3: -1,
      4: -2,
    },
    1: {
      0: -3,
      1: -2,
      2: 1,
      3: 2,
      4: 3,
    },
    2: {
      0: -3,
      1: -2,
      2: 1,
      3: 2,
      4: 3,
    },
  };

  let diffArmy = 0;
  let koef = "0";

  for (let i of Object.keys(hashArmyBuffs.army_salary[0])) {
    let typer = hashArmyBuffs.army_salary[0][i];
    for (let f of Object.keys(typer)) {
      typer[f] = typer[f] * armySalaryKoef[0][currentArmySalaryOpts[0]];
    }
  }
  outBuffer.add(hashArmyBuffs.army_salary[0]);

  diffArmy =
    parseInt(currentArmySalaryOpts[1]) - getAvgSalary(newCountry, false);
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
  for (let i of Object.keys(hashArmyBuffs.army_salary[1])) {
    let typer = hashArmyBuffs.army_salary[1][i];
    for (let f of Object.keys(typer)) {
      typer[f] = typer[f] * armySalaryKoef[1][currentArmySalaryOpts[koef]];
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
  for (let i of Object.keys(hashArmyBuffs.army_salary[2])) {
    let typer = hashArmyBuffs.army_salary[0][i];
    for (let f of Object.keys(typer)) {
      typer[f] = typer[f] * armySalaryKoef[2][currentArmySalaryOpts[koef]];
    }
  }
  outBuffer.add(hashArmyBuffs.army_salary[2]);

  let currentArmyMaintainOpts = newCountry.army_maintain.split(",");

  const armyMaintainKoef = {
    0: {
      1: -2,
      2: -1,
      3: 1,
      4: 2,
    },
    1: {
      1: -1,
      2: 1,
      3: 2,
    },
    2: {
      1: -1,
      2: 1,
      3: 2,
    },
  };

  for (let param of hashArmyBuffs.army_maintain) {
    let ind = hashArmyBuffs.army_maintain.indexOf(param);
    for (let type of Object.keys(param)) {
      for (let buff of Object.keys(param[type])) {
        param[type][buff] =
          param[type][buff] *
          armyMaintainKoef[ind][currentArmyMaintainOpts[ind]];
      }
    }
    outBuffer.add(param);
  }

  let currentArmyEquipOpts = newCountry.army_equip.split(",");

  const armyEquipKoef = {
    0: {
      1: -2,
      2: -1,
      3: 1,
      4: 2,
      5: 3,
    },
    1: {
      1: -1,
      2: 0,
      3: 1,
      4: 2,
    },
    2: {
      1: -1,
      2: 1,
      3: 2,
    },
  };

  for (let param of hashArmyBuffs.army_equip) {
    let ind = hashArmyBuffs.army_equip.indexOf(param);
    for (let type of Object.keys(param)) {
      for (let buff of Object.keys(param[type])) {
        param[type][buff] =
          param[type][buff] * armyEquipKoef[ind][currentArmyEquipOpts[ind]];
      }
    }
    outBuffer.add(param);
  }

  // Баффы "Экономика"

  let unemploy = getUnemployment(newCountry, false);
  let unemployHasher = {
    country: {
      alchemy: 0.15,
      magic: 0.15,
      science: 0.15,
      stability: 0.2,
      support: 0.2,
      technology: 0.15,
    },
    regions: {
      industry: 0.2,
      avg_salary: 0.15,
      poverty: 0.15,
    },
  };
  if (unemploy >= 0.2) {
    for (let i of Object.keys(unemployHasher)) {
      for (let type of Object.keys(unemployHasher[i])) {
        unemployHasher[i][type] = unemployHasher[i][type] * unemploy * -10;
      }
    }
  } else if (unemploy >= 0.15) {
    for (let i of Object.keys(unemployHasher)) {
      for (let type of Object.keys(unemployHasher[i])) {
        unemployHasher[i][type] = unemployHasher[i][type] * unemploy * -8;
      }
    }
  } else if (unemploy >= 0.1) {
    for (let i of Object.keys(unemployHasher)) {
      for (let type of Object.keys(unemployHasher[i])) {
        unemployHasher[i][type] =
          unemployHasher[i][type] * (0.2 - unemploy) * 30;
      }
    }
  } else if (unemploy >= 0.05) {
    for (let i of Object.keys(unemployHasher)) {
      for (let type of Object.keys(unemployHasher[i])) {
        unemployHasher[i][type] =
          unemployHasher[i][type] * (0.1 - unemploy) * 30;
      }
    }
  } else {
    for (let i of Object.keys(unemployHasher)) {
      for (let type of Object.keys(unemployHasher[i])) {
        unemployHasher[i][type] =
          unemployHasher[i][type] * (0.1 - unemploy) * 50;
      }
    }
  }
  outBuffer.add(unemployHasher);

  let poverty = getPoverty(newCountry, false);
  let povertyHasher = {
    country: {
      education_avail: 0.3,
      stability: 0.2,
      support: 0.2,
    },
    regions: {
      industry: 0.1,
      infrastructure: 0.2,
      pave_road: 0.1,
      stone_road: 0.05,
    },
  };
  if (poverty >= 0.5) {
    for (let i of Object.keys(povertyHasher)) {
      for (let type of Object.keys(povertyHasher[i])) {
        povertyHasher[i][type] = povertyHasher[i][type] * poverty * -15;
      }
    }
  } else if (poverty >= 0.35) {
    for (let i of Object.keys(povertyHasher)) {
      for (let type of Object.keys(povertyHasher[i])) {
        povertyHasher[i][type] = povertyHasher[i][type] * poverty * -10;
      }
    }
  } else if (poverty >= 0.2) {
    for (let i of Object.keys(povertyHasher)) {
      for (let type of Object.keys(povertyHasher[i])) {
        povertyHasher[i][type] = povertyHasher[i][type] * poverty * -7;
      }
    }
  } else if (poverty >= 0.1) {
    for (let i of Object.keys(povertyHasher)) {
      for (let type of Object.keys(povertyHasher[i])) {
        povertyHasher[i][type] = povertyHasher[i][type] * (0.1 - poverty) * 8;
      }
    }
  } else if (poverty >= 0.05) {
    for (let i of Object.keys(povertyHasher)) {
      for (let type of Object.keys(povertyHasher[i])) {
        povertyHasher[i][type] = povertyHasher[i][type] * (0.1 - poverty) * 30;
      }
    }
  } else {
    for (let i of Object.keys(povertyHasher)) {
      for (let type of Object.keys(povertyHasher[i])) {
        povertyHasher[i][type] = povertyHasher[i][type] * (0.1 - poverty) * 50;
      }
    }
  }
  outBuffer.add(povertyHasher);

  let inflation = newCountry.inflation;
  let inflationHasher = {
    country: {
      stability: 0.2,
    },
    regions: {
      industry: 0.4,
      infrastructure: 0.15,
      avg_salary: 0.2,
      poverty: 0.5,
    },
  };
  if (inflation >= 0.5) {
    for (let i of Object.keys(inflationHasher)) {
      for (let type of Object.keys(inflationHasher[i])) {
        if (type === "industry") {
          inflationHasher[i][type] = inflationHasher[i][type] * inflation * -5;
        } else {
          inflationHasher[i][type] = inflationHasher[i][type] * inflation * -15;
        }
      }
    }
  } else if (inflation >= 0.2) {
    for (let i of Object.keys(inflationHasher)) {
      for (let type of Object.keys(inflationHasher[i])) {
        if (type === "industry") {
          inflationHasher[i][type] = inflationHasher[i][type] * inflation * 7;
        } else {
          inflationHasher[i][type] = inflationHasher[i][type] * inflation * -8;
        }
      }
    }
  } else if (inflation >= 0.1) {
    for (let i of Object.keys(inflationHasher)) {
      for (let type of Object.keys(inflationHasher[i])) {
        if (type === "industry") {
          inflationHasher[i][type] = inflationHasher[i][type] * inflation * 15;
        } else {
          inflationHasher[i][type] = inflationHasher[i][type] * inflation * -3;
        }
      }
    }
  } else if (inflation >= 0.06) {
    for (let i of Object.keys(inflationHasher)) {
      for (let type of Object.keys(inflationHasher[i])) {
        if (type === "industry") {
          inflationHasher[i][type] = inflationHasher[i][type] * inflation * 15;
        } else {
          inflationHasher[i][type] = inflationHasher[i][type] * inflation * 8;
        }
      }
    }
  } else if (inflation >= 0.02) {
    for (let i of Object.keys(inflationHasher)) {
      for (let type of Object.keys(inflationHasher[i])) {
        if (type === "industry") {
          inflationHasher[i][type] = inflationHasher[i][type] * inflation * 10;
        } else {
          inflationHasher[i][type] = inflationHasher[i][type] * inflation * 30;
        }
      }
    }
  } else {
    for (let i of Object.keys(inflationHasher)) {
      for (let type of Object.keys(inflationHasher[i])) {
        if (type === "industry") {
          inflationHasher[i][type] =
            inflationHasher[i][type] * (0.3 - inflation) * -50;
        } else {
          inflationHasher[i][type] = inflationHasher[i][type] * inflation * -50;
        }
      }
    }
  }

  outBuffer.add(inflationHasher);

  const physTax = newCountry.tax_physic.split(" ");
  const jurTax = newCountry.tax_jurid.split(" ");

  let taxHasher = {
    phys: {
      country: {
        stability: -0.1,
        support: -0.15,
      },
      regions: {
        industry: -0.1,
        infrastructure: -0.1,
        avg_salary: -0.05,
        population: 0.15,
        poverty: 0.15,
      },
    },
    jur: {
      country: {
        inflation: 0.15,
        stability: -0.1,
        support: -0.15,
      },
      regions: {
        industry: -0.3,
        avg_salary: -0.15,
        unemployment: 0.2,
      },
    },
  };

  for (let type of Object.keys(taxHasher.phys)) {
    for (let ch of Object.keys(taxHasher.phys[type])) {
      if (ch === "population") {
        taxHasher.phys[type][ch] =
          taxHasher.phys[type][ch] * (1 - (+physTax[0] + +physTax[1]));
      } else {
        taxHasher.phys[type][ch] =
          taxHasher.phys[type][ch] * (+physTax[0] + +physTax[1]);
      }
    }
  }

  for (let type of Object.keys(taxHasher.jur)) {
    for (let ch of Object.keys(taxHasher.jur[type])) {
      taxHasher.jur[type][ch] =
        taxHasher.jur[type][ch] *
        (+jurTax[0] + +jurTax[1] + +jurTax[2] + +jurTax[3]);
    }
  }

  for (let i of Object.keys(taxHasher)) {
    outBuffer.add(taxHasher[i]);
  }

  // Баффы "Бюджет"

  const budget = {
    infras: newBuff.budget_infrastructure,
    educat: newBuff.budget_education,
    resear: newBuff.budget_research,
    propag: newBuff.budget_propaganda,
    govern: newBuff.budget_government,
  };

  let budgetHasher = {
    infras: {
      country: {
        export_trash: 1.25,
        support: 0.5,
      },
      regions: {
        aqueducs: 5,
        cargo_ship: 1.25,
        people_ship: 1.25,
        port: 1.25,
        infrastructure: 1.25,
        pave_road: 1,
        stone_road: 1,
      },
    },
    educat: {
      country: {
        education_avail: 1.5,
        education_quality: 1.5,
        support: 0.5,
      },
      regions: {
        schools: 5,
        universities: 2,
      },
    },
    resear: {
      country: {
        alchemy: 1.25,
        magic: 1.25,
        science: 1.5,
        support: 0.5,
        technology: 1.25,
      },
      regions: {},
    },
    propag: {
      country: {
        army_quality: 0.8,
        education_quality: 0.5,
        stability: 1.25,
        support: 1.75,
      },
      regions: {},
    },
    govern: {
      country: {
        education_avail: 0.6,
        education_quality: 0.6,
        export_trash: 0.5,
        science: 0.5,
        stability: 0.8,
        technology: 0.5,
      },
      regions: {
        port: 0.4,
        infrastructure: 0.25,
      },
    },
  };

  for (let item of Object.keys(budgetHasher)) {
    for (let type of Object.keys(budgetHasher[item])) {
      for (let i of Object.keys(budgetHasher[item][type])) {
        if (countRegionBuff.includes(i)) {
          budgetHasher[item][type][i] = Math.round(
            budgetHasher[item][type][i] * (budget[item] - 0.4)
          );
        } else {
          budgetHasher[item][type][i] =
            budgetHasher[item][type][i] * (budget[item] - 0.5);
        }
      }
    }
  }
  for (let i of Object.keys(budgetHasher)) {
    outBuffer.add(budgetHasher[i]);
  }
  newBuff.kazna = newBuff.kazna + getBalance(newStore);

  for (let i of newCountry.regions) {
    for (let prop of Object.keys(i)) {
      if (prop.startsWith("industry")) {
        let balance = i[prop] - i[`needs_${prop.split("_")[1]}`];
        let percent = i[prop] / i[`needs_${prop.split("_")[1]}`];
        i[prop] =
          i[prop] +
          i[prop] *
            (balance > 0 ? 0.002 : 0.005) *
            (i.name === newCountry.capital.name ? 1.1 : 1);
        let koef =
          percent > 1.1 || percent < 0.9
            ? -percent * (percent > 1.15 ? 1.25 : 2.5)
            : percent * 1.25;
        outBuffer.add({
          country: {
            alchemy: 0.05 * koef,
            education_avail: 0.05 * koef,
            export_trash: 0.05 * koef,
            inflation: 0.02 * koef,
            magic: 0.05 * koef,
            technology: 0.05 * koef,
          },
          regions: {
            cargo_ship: 0.05 * koef,
            people_ship: 0.05 * koef,
            port: 0.05 * koef,
            infrastructure: 0.05 * koef,
            avg_salary: -0.01 * koef,
            poverty: -0.15 * koef,
            unemployment: 0.15 * koef,
          },
        });
      }
    }
  }

  // Баффы "Дипломатия"

  let relations = [];
  for (let i of newStore.relations) {
    if (i.pair.length === 1) {
      relations.push({
        value: i.value,
        ident: i.pair[0],
        id: i.id,
      });
    }
  }

  function setRelation(country, increment) {
    for (let i of relations) {
      if (i.ident === country) {
        i.value = i.value + increment;
      }
    }
  }

  for (let i of relations) {
    let country = getCountry(newStore, i.ident);

    i.value =
      i.value +
      (getRandomRange(10) === 1 ? 1 : 0) *
        (country.government[0] === newCountry.government[0] ? 1 : -1);

    for (let law of Object.keys(country)) {
      if (law.startsWith("law_")) {
        i.value =
          i.value +
          (getRandomRange(75) === 1 ? 1 : 0) *
            (newCountry[law] === country[law] ? 1 : -1);
      }
    }
  }

  let contracts = getOwnContracts(newStore);
  let livedContracts = newStore.contracts.filter((e) => e.pair.length === 2);
  for (let i of contracts) {
    switch (i.con_type) {
      case "AL":
        outBuffer.add({
          country: {
            army_quality: 0.1,
            stability: 0.05,
          },
          regions: {},
        });
        break;
      case "CM":
        outBuffer.add({
          country: {
            alchemy: 0.05,
            technology: 0.05,
          },
          regions: {
            cargo_ship: 0.15,
            people_ship: 0.05,
            port: 0.05,
            industry: 0.1,
          },
        });
        break;
      case "CT":
        outBuffer.add({
          country: {
            education_quality: 0.1,
            export_trash: 0.05,
            magic: 0.05,
            alchemy: 0.05,
          },
          regions: {
            poverty: 0.05,
          },
        });
        setRelation(i.pair[0], getRandomRange(6) === 1 ? 1 : 0);
        break;
      case "SH":
        outBuffer.add({
          country: {
            education_avail: 0.05,
            education_quality: 0.05,
            stability: 0.05,
            support: 0.05,
          },
          regions: {
            cargo_ship: 0.05,
            people_ship: 0.15,
            infrastructure: 0.05,
            avg_salary: 0.05,
            poverty: 0.05,
          },
        });
        setRelation(i.pair[0], getRandomRange(10) === 1 ? 1 : 0);
        break;
      case "EH":
        outBuffer.add({
          country: {
            inflation: 0.05,
            stability: 0.05,
          },
          regions: {
            port: 0.05,
            infrastructure: 0.02,
            unemployment: -0.1,
          },
        });
        setRelation(i.pair[0], getRandomRange(7) === 1 ? 1 : 0);
        break;
      case "PA":
        outBuffer.add(
          i.priority !== newCountry.name
            ? {
                country: {
                  army_quality: -0.1,
                  export_trash: 0.05,
                  stability: -0.2,
                },
                regions: {
                  people_ship: 0.15,
                  port: 0.05,
                  pave_road: 0.1,
                  stone_road: 0.05,
                },
              }
            : {
                country: {
                  army_quality: 0.1,
                  export_trash: 0.1,
                  stability: 0.05,
                  technology: 0.05,
                },
                regions: {
                  cargo_ship: 0.05,
                },
              }
        );
        break;
      case "ES":
        outBuffer.add(
          i.priority !== newCountry.name
            ? {
                country: {
                  education_quality: -0.05,
                  export_trash: -0.05,
                  inflation: 0.05,
                  stability: -0.1,
                },
                regions: {
                  industry: -0.025,
                  unemployment: 0.1,
                },
              }
            : {
                country: {
                  inflation: 0.05,
                  stability: -0.05,
                },
                regions: {
                  unemployment: 0.05,
                },
              }
        );
        setRelation(i.pair[0], getRandomRange(6) === 1 ? -1 : 0);
        break;
      case "DW":
        outBuffer.add(
          i.priority !== newCountry.name
            ? {
                country: {
                  army_quality: 0.1,
                  education_avail: -0.1,
                  inflation: 0.15,
                  science: -0.05,
                  stability: -0.15,
                  support: -0.05,
                },
                regions: {
                  industry: -0.15,
                  infrastructure: -0.1,
                  avg_salary: -0.1,
                  poverty: 0.1,
                },
              }
            : {
                country: {
                  army_quality: 0.15,
                  education_avail: -0.1,
                  inflation: 0.15,
                  science: -0.05,
                  stability: -0.25,
                  support: -0.1,
                },
                regions: {
                  industry: -0.2,
                  infrastructure: -0.1,
                  avg_salary: -0.1,
                  poverty: 0.1,
                },
              }
        );
        break;
      case "CP":
        outBuffer.add({
          country: {
            army_quality: -0.05,
            stability: 0.15,
            support: 0.05,
          },
          regions: {
            infrastructure: 0.05,
          },
        });
        setRelation(i.pair[0], getRandomRange(10) === 1 ? 1 : 0);
        break;
      case "FW":
        outBuffer.add(
          i.priority !== newCountry.name
            ? {
                country: {
                  army_quality: 0.05,
                  alchemy: 0.05,
                  magic: 0.05,
                  science: 0.05,
                  stability: 0.05,
                  support: 0.15,
                  technology: 0.05,
                },
                regions: {
                  industry: 0.05,
                  infrastructure: 0.05,
                  poverty: 0.05,
                },
              }
            : {
                country: {
                  army_quality: -0.05,
                  stability: -0.05,
                },
                regions: {
                  poverty: 0.05,
                },
              }
        );
        newBuff.kazna =
          newBuff.kazna +
          getReparation(newStore.country) *
            (i.priority !== newCountry.name ? -1 : 1);
        break;
      case "VC":
        outBuffer.add(
          i.priority !== newCountry.name
            ? {
                country: {
                  army_quality: -0.1,
                  alchemy: -0.05,
                  magic: -0.05,
                  science: -0.05,
                  support: -0.05,
                  technology: -0.05,
                },
                regions: {
                  cargo_ship: -0.05,
                  people_ship: -0.05,
                  avg_salary: 0.05,
                  unemployment: -0.1,
                },
              }
            : {
                country: {
                  army_quality: 0.05,
                  stability: -0.15,
                  support: 0.05,
                  technology: 0.05,
                },
                regions: {
                  industry: 0.05,
                },
              }
        );
        setRelation(i.pair[0], getRandomRange(15) === 1 ? -1 : 0);
        break;
      default:
        break;
    }
    if (i.deadline !== newBuff.step) {
      livedContracts.push(i);
    }
  }
  newStore.contracts = livedContracts;

  // Баффы "Договора"

  let newsArr = [];

  class newsObj {
    constructor(label = "", country = "", status = false, action = false) {
      this.obj = {
        label: label,
        country: country,
        status: status,
        action: action,
      };
    }

    getObj() {
      return this.obj;
    }
  }
  const priorityContracts = ["FW", "DW", "ES", "PA", "VC"];
  const deadlineContracts = {
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
    DW: 9999,
  };
  const abbrContracts = {
    AL: "Альянс",
    CM: "Общий рынок",
    PA: "Проход войск",
    CT: "Культурный обмен",
    SH: "Социальная взаимопомощь",
    EH: "Экономическая помощь",
    CP: "Договор о ненападении",
  };
  const relationContracts = {
    AL: 2,
    FW: 10,
    DW: -100,
  }

  for (let i of store.changeGame) {
    if (i.startsWith("contract_")) {
      const conCountry = i.split("_")[1];
      const conContract = i.split("_")[2];

      const typeChange = checkContract(
        newStore,
        conContract,
        conCountry,
        newCountry.name
      );
      const relation = getRelation(newStore, conCountry);

      let approv = false;
      let newspaper = [];
      let redactStatus = true;
      let conBuff = {};
      let randomKoef = 1;

      if (conContract.startsWith('DW-invite')) {
        randomKoef = 
        [10, 9, 8].includes(relation)
            ? 9
            : [7, 6, 5].includes(relation)
            ? 8
            : [4, 3, 2].includes(relation)
            ? 6
            : [1, 0, -1].includes(relation)
            ? 4
            : [-2, -3, -4].includes(relation)
            ? 0
            : [-5, -6, -7].includes(relation)
            ? -10
            : [-8, -9, -10].includes(relation)
            ? -25
            : 10000;
        newspaper.push(
              new newsObj(
                `${identCountries[conCountry]} согласился вступить в войну против "${identCountries[conContract.split('-')[2]]}"`,
                conCountry,
                true
              ),
              new newsObj(
                `${identCountries[conCountry]} отказался вступать в войну против "${identCountries[conContract.split('-')[2]]}"`,
                conCountry,
                false,
                true
              )
            );
        redactStatus = true;
      }

      switch (conContract) {
        case "VC":
          let economyProp = 1;
          if (isVassal(newStore)) {
            economyProp =
              getEconomy(newCountry) /
              getEconomy(getCountry(newStore, conCountry));
            randomKoef =
              [10, 9, 8].includes(relation) && economyProp > 0.5
                ? 6
                : [7, 6, 5].includes(relation) && economyProp > 0.65
                ? 3
                : [4, 3, 2].includes(relation) && economyProp > 0.8
                ? 0
                : [1, 0, -1].includes(relation) && economyProp > 1
                ? -10
                : [-2, -3, -4].includes(relation) && economyProp > 1.25
                ? -25
                : [-5, -6, -7].includes(relation)
                ? -50
                : [-8, -9, -10].includes(relation)
                ? -100
                : 10000;
            newspaper.push(
              new newsObj(
                `${identCountries[conCountry]} согласился вас освободить`,
                conCountry,
                true
              ),
              new newsObj(
                `${identCountries[conCountry]} отказался вас освобождать`,
                conCountry,
                false,
                true
              )
            );
            redactStatus = false;
            conBuff = {
              country: {
                army_quality: 0.5,
                stability: 2,
                support: 2,
              },
              regions: {},
            };
          } else if (
            getVassals(newCountry.name)
              .map((e) => e.ident)
              .includes(conCountry)
          ) {
            randomKoef = 9;
            newspaper.push(
              new newsObj(
                `Вы освободили государство ${identCountries[conCountry]} от вассальной зависимости`,
                conCountry,
                true
              ),
              new newsObj()
            );
            redactStatus = false;
          } else {
            economyProp =
              getEconomy(newCountry) /
              getEconomy(getCountry(newStore, conCountry));
            randomKoef = [10, 9, 8].includes(relation)
              ? 4
              : [7, 6, 5].includes(relation)
              ? 0
              : [4, 3, 2].includes(relation)
              ? -5
              : [1, 0, -1].includes(relation)
              ? -10
              : [-2, -3, -4].includes(relation)
              ? -25
              : [-5, -6, -7].includes(relation)
              ? -50
              : [-8, -9, -10].includes(relation)
              ? -100
              : 10000;
            newspaper.push(
              new newsObj(
                `${identCountries[conCountry]} согласился быть вашим вассалом`,
                conCountry,
                true
              ),
              new newsObj(
                `${identCountries[conCountry]} отказался быть вашим вассалом`,
                conCountry,
                false,
                true
              )
            );
            redactStatus = true;
          }
          break;
        case "FW":
          let output = {
            peace: {
              own: 0,
              enemy: 0,
            },
            war: {
              own: 0,
              enemy: 0,
            },
            army: {
              own: 0,
              enemy: 0,
            },
          };

          let war;
          for (let i of newStore.contracts) {
            if (
              i.con_type === "DW" &&
              i.pair.length === 1 &&
              i.pair[0] === conCountry
            ) {
              war = i.occuped.split(',');
            }
          }
          let peace;
          for (let i of store.peaceList) {
            if (i.country === conCountry) {
              peace = i;
            }
          }

          let ownRegs = newCountry.regions.length;
          let newOwnRegs = ownRegs;
          let enemyRegs = getCountry(newStore, conCountry).regions.length;
          let newEnemyRegs = enemyRegs;

          for (let i of war) {
            let whose = whoseReg(newStore, i);
            if (whose === newCountry.identify) {
              newOwnRegs--;
              newEnemyRegs++;
            } else {
              newOwnRegs++;
              newEnemyRegs--;
            }
          }
          
          output.war.own = newOwnRegs / ownRegs;
          output.war.enemy = newEnemyRegs / enemyRegs;

          newOwnRegs = newEnemyRegs = 0;

          for (let i of newCountry.regions) {
            if (
              peace.own.includes(i.name) ||
              !(peace.own.includes(i.name) || peace.enemy.includes(i.name))
            ) {
              newOwnRegs++;
            } else {
              newEnemyRegs++;
            }
          }
          for (let i of getCountry(newStore, conCountry).regions) {
            if (
              peace.enemy.includes(i.name) ||
              !(peace.own.includes(i.name) || peace.enemy.includes(i.name))
            ) {
              newEnemyRegs++;
            } else {
              newOwnRegs++;
            }
          }
          output.peace.own = newOwnRegs / ownRegs;
          output.peace.enemy = newEnemyRegs / enemyRegs;

          output.army.own = getArmy(newStore.squad, false);
          output.army.enemy = getAIArmy(newStore.squad_ai, conCountry, false);

          randomKoef = getAnswerPeace(output);
          newspaper.push(
            new newsObj(
              `С государством ${identCountries[conCountry]} заключен мир`,
              conCountry,
              true
            ),
            new newsObj(
              `${identCountries[conCountry]} отвергли ваше предложение о мире`,
              conCountry,
              false
            )
          );
          redactStatus = true;
          break;
        case "AL":
        case "CM":
        case "PA":
        case "CT":
        case "SH":
        case "EH":
        case "CP":
        case "ES":
        case "DW":
          if (!typeChange) {
            if (["AL", "CM", "PA"].includes(conContract)) {
              randomKoef = [10, 9, 8].includes(relation)
                ? 9
                : [7, 6, 5].includes(relation)
                ? 7
                : [4, 3, 2].includes(relation)
                ? 5
                : [1, 0, -1].includes(relation)
                ? 0
                : [-2, -3, -4].includes(relation)
                ? -10
                : [-5, -6, -7].includes(relation)
                ? -25
                : [-8, -9, -10].includes(relation)
                ? -100
                : 10000;
            } else if (["CT", "SH", "EH", "CP"].includes(conContract)) {
              randomKoef = [10, 9, 8].includes(relation)
                ? 9
                : [7, 6, 5].includes(relation)
                ? 8
                : [4, 3, 2].includes(relation)
                ? 7
                : [1, 0, -1].includes(relation)
                ? 2
                : [-2, -3, -4].includes(relation)
                ? -5
                : [-5, -6, -7].includes(relation)
                ? -15
                : [-8, -9, -10].includes(relation)
                ? -100
                : 10000;
            } else if (["ES", "DW"].includes(conContract)) {
              randomKoef = 9;
            }

            if (conContract === "ES") {
              newspaper.push(
                new newsObj(
                  `Вы наложили экономические санкции на государство ${identCountries[conCountry]}`,
                  conCountry,
                  true
                ),
                new newsObj()
              );
            } else if (conContract === "DW") {
              newspaper.push(
                new newsObj(
                  `Государству ${identCountries[conCountry]} объявлена война`,
                  conCountry,
                  true
                ),
                new newsObj()
              );
            } else {
              newspaper.push(
                new newsObj(
                  `Государство ${identCountries[conCountry]} приняло ваше предложение о заключении договора "${abbrContracts[conContract]}"`,
                  conCountry,
                  true
                ),
                new newsObj(
                  `Государство ${identCountries[conCountry]} отклонило ваше предложение о заключении договора "${abbrContracts[conContract]}"`,
                  conCountry,
                  false
                )
              );
            }
            redactStatus = true;
          } else {
            if (["AL", "CM", "CT", "SH", "EH"].includes(conContract)) {
              randomKoef = 9;
              newspaper.push(
                new newsObj(
                  `Договор "${abbrContracts[conContract]}" с государством ${identCountries[conCountry]} разорван`,
                  conCountry,
                  true
                ),
                new newsObj()
              );
            } else if (i.split("_")[2] === "ES") {
              randomKoef = 9;
              newspaper.push(
                new newsObj(
                  `Экономические санкции с государства ${identCountries[conCountry]} были сняты`,
                  conCountry,
                  true
                ),
                new newsObj()
              );
            }
            redactStatus = false;
          }
          break;
        default:
          break;
      }

      approv = getRandomRange(10 - randomKoef) === 0;
      newsArr.push(approv ? newspaper[0].getObj() : newspaper[1].getObj());
      
      if (approv) {
        if (conContract === "DW") {
          let changerCont = []
          for (let i of newStore.contracts) {
              if (!(i.pair.length === 1 && i.pair[0] === conCountry)) {
                changerCont.push(i)
              }
          }
          newStore.contracts = changerCont  
          conBuff = {
            country: {
              army_quality: 0.25,
              stability: -2,
              support: -2.5,
            },
            regions: {},
          };
        }
        if (conContract === "FW") {
          conBuff = {
            country: {
              army_quality: -0.25,
              stability: 3,
              support: 2,
            },
            regions: {},
          };
        }
        if (redactStatus) {  
          if (Object.keys(relationContracts).includes(conContract)) {
            setRelation(conCountry, relationContracts[conContract])  
          }
          
          if (conContract.startsWith('DW-invite')) {
            newStore.contracts.push({
                id: getMaxId(newStore.contracts),
                con_type: 'DW',
                priority: identCountries[conCountry],
                occuped: "",
                spends: "0_0",
                deadline: newBuff.step + 9999,
                uniq_id: getCountry(newStore, conCountry).id,
                pair: [conCountry, conContract.split('-')[2]],
                uniq: conCountry,
            });
          } else {
            newStore.contracts.push({
                id: getMaxId(newStore.contracts),
                con_type: conContract,
                priority: priorityContracts.includes(conContract)
                ? newCountry.name
                : "0",
                occuped: "",
                spends: "0_0",
                deadline: newBuff.step + deadlineContracts[conContract],
                uniq_id: newCountry.id,
                pair: [conCountry],
                uniq: newCountry.identify,
            });
          }
        } else {
          let cont = {};
          for (let i of newStore.contracts) {
            if (
              i.con_type === conContract &&
              i.pair.length === 1 &&
              i.pair[0] === conCountry
            ) {
              cont = i;
              break;
            }
          }
          newStore.contracts.splice(newStore.contracts.indexOf(cont), 1);
        }
        if (conContract === "FW") {
            let peace = {};
            for (let i of store.peaceList) {
              if (i.country === conCountry) {
                peace = i;
                break;
              }
            }
            let war = {};
            let newContracts = [];
            for (let i of newStore.contracts) {
              if (
                i.con_type === "DW" &&
                i.pair.length === 1 &&
                i.pair[0] === conCountry
              ) {
                war = i;
              } else {
                newContracts.push(i);
              }
            }
            newStore.contracts = [];
            newStore.contracts = newContracts;
            let regs = newCountry.regions.slice(0);
            for (let i of newCountry.regions) {
              if (war.occuped.includes(i.name) && peace.enemy.includes(i.name)) {
                for (let c of newStore.country_ai) {
                  if (c.identify === conCountry) {
                    c.regions.push(i);
                    break;
                  }
                }
                newCountry.regions.splice(newCountry.regions.indexOf(i), 1);
                break;
              }
            }
    
            for (let c of newStore.country_ai) {
              if (c.identify === conCountry) {
                regs = c.regions.slice(0);
                for (let i of regs) {
                  if (war.occuped.includes(i.name) && peace.own.includes(i.name)) {
                    newCountry.regions.push(i);
                    c.regions.splice(c.regions.indexOf(i), 1);
                  }
                }
                break;
              }
            }
        }
      }

      outBuffer.add(conBuff);
    }
  }

  // Баффы "Юстиция"

  const lawBuffer = {
    law_equal_rights : {
			support: 0.05,
		  stability: -0.07,

		  inflation: 0.02,
		  poverty: -0.04,
		  unemployment: 0.04,
		  avg_salary: 0.05,

		  science: 0.04,
		  technology: 0.03,

		  education_quality: 0.03,
		  education_access: 0.04,
		},
	  law_torture : {
			support: -0.05,
		  stability: 0.1,

		  army_quality: 0.04,
		},
	  law_speech : {
			support: -0.05,
		  stability: -0.05,

		  inflation: -0.03,
		  avg_salary: 0.05,

		  alchemy: 0.03,
		  magic: 0.03,
		  science: 0.03,
		  technology: 0.03
		},
	  law_demonstration : {
			support: -0.03,
		  stability: -0.05,

		  unemployment: -0.04,
		  avg_salary: 0.05,
		},
	  law_property : {
			support: 0.03,
		  stability: -0.05,

		  poverty: 0.03,
		
		  industry: 0.05,
		},
	  law_creation : {
		  unemployment: -0.06,

		  alchemy: 0.03,
		  magic: 0.03,
		  science: 0.03,
		  technology: 0.03,

		  education_quality: 0.03,
		  education_access: 0.03,

		  industry_typography: 0.05,
		  industry_light: 0.05,
		  industry_jewelry: 0.05,
		  industry_alchemy: 0.05,
		  industry_culture: 0.05,
		  industry_other: 0.05,
		},
	  law_rasism : {
		  poverty: 0.04,
		  unemployment: 0.04,
		},
	  law_heritage : {
		  inflation: -0.04,
		  poverty: -0.05,
		},
	  law_slavery : {
			support: -0.05,
		  stability: 0.06,

		  inflation: 0.03,
		  poverty: 0.1,
		  avg_salary: -0.1,

		  technology: -0.05,

		  industry: 0.15,
		},
	  law_court : {
			support: 0.03,
		  stability: -0.05,

		  industry_typography: 0.04,
		  industry_jewelry: 0.04,
		  industry_transport: 0.04,
		  industry_alchemy: 0.04, 
		  industry_hiring: 0.04,
		  industry_culture: 0.04,
		},
	  law_child_labour : {
			support: -0.05,

		  inflation: 0.03,
		  poverty: -0.05,
		  unemployment: 0.04,

		  industry_hunting: 0.04,
		  industry_fishing: 0.04,
		  industry_forestry: 0.04,
		  industry_blacksmith: 0.04,
		  industry_animals: 0.04,
		  industry_vegetable: 0.04,
		  industry_wheat: 0.04,
		  industry_eating: 0.04,
		},
	  law_monopoly : {
			support: 0.04,
		  stability: 0.05,

		  inflation: 0.03,
		  poverty: 0.03,
		  unemployment: 0.03,
	    avg_salary: -0.04,
		},
	  law_free_enterspire : {
			support: 0.06,
		  stability: -0.05,

		  inflation: 0.02,
		  poverty: -0.02,
		  unemployment: -0.02,
		  industry: 0.03,
		},
	  law_work_day_limit : {
			support: 0.04,

		  poverty: -0.04,
		  unemployment: -0.05,
		  avg_salary: -0.04,

		  industry: 0.03,
		},
	  law_death_penalty : {
			support: -0.07,
		  stability: 0.1,

		  army_quality: 0.06,
		}
  }

  for (let i of Object.keys(newCountry)) {
    if (i.startsWith('law_')) {
      if (newCountry[i]) {
        outBuffer.add(lawBuffer[i])
      } else {
        let inverseBuff
        for (let t of Object.keys(lawBuffer[i])) {
          inverseBuff[t] = -lawBuffer[i][t]
        }
        outBuffer.add(inverseBuff)
      }
    }
  }

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
            poverty
            unemployment
        }
  */

  for (let i of relations) {
      for (let t of newStore.relations) {
          if (t.pair.length === 1 && t.pair[0] === i.ident) {
              t.value = i.value > 10 ? 10 : i.value < -10 ? -10 : i.value
          }
      }
  }     
  
  let newCountryAI = [];
  for (let i of newStore.country_ai) {
    if (i.regions.length) {
      newCountryAI.push(i);
    } else {
       newStore.relations = newStore.relations.filter(e => !e.pair.includes(i.identify))
       newStore.contracts = newStore.contracts.filter(e => !e.pair.includes(i.identify))
       newStore.squad_ai = newStore.squad_ai.filter(e => e.country !== i.identify)
    }
  }
  newStore.country_ai = newCountryAI;

  outBuffer.commit();
  newStore.country = newCountry;
  newStore.buffs = newBuff;

  store.changeGame = [];
  store.peaceList = [];
  func.create_game(newStore);
}
