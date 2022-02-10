import data from './Database';
import { get, set, del, entries, } from 'idb-keyval';
import { deepCopy } from '../otherFunctions';
import { parseDate } from '../otherFunctions';

export async function startGame(country) {
    let newSave = {}
    newSave.country = deepCopy(data.countries[country])
    newSave.relations = deepCopy(data.relations)

    newSave.contracts = deepCopy(data.contracts)
    newSave.vassals = deepCopy(data.vassals)
    newSave.wars = deepCopy(data.wars)

    let squads = []
    let squadsAi = []
    for (let i of data.squads) {
        if (i.country === country) {
            squads.push(i)
        }
        else {
            squadsAi.push(i)
        }
    }

    newSave.squads = deepCopy(squads)
    newSave.squadsAi = deepCopy(squadsAi)
    newSave.countryAi = {}
    for (let i of Object.values(data.countries)) {
        if (i.name !== country) {
            i = deepCopy(i)
            newSave.countryAi[i.name] = {
                name: i.name,
                regions: i.regions,
                capital: i.capital,
                identify: i.identify,

                education: i.education,

                support: i.support,
                stability: i.stability,

                government: i.government,
                area_format: i.area_format,

                army_quality: 0.5,

                tax_income: i.tax_income,
                tax_profit: i.tax_profit,
                tax_minerals: i.tax_minerals,
            }
        }
    }

    newSave.buffs = {
        step: 1,
        actions: 10,

        support: 0,
        stability: 0,

        population: 0,

        inflation: 0,
        poverty: 0,
        unemployment: 0,
        avg_salary: 0,

        infrastructure: 0,
        stone_road: 0,
        trash: 0,
        port: 0,
        delivery_box: 0,
        delivery_people: 0,

        alchemy: 0,
        magic: 0,
        science: 0,
        technology: 0,

        education_quality: 0,
        education_access: 0,

        army_quality: 0.4,

        industry_blackmetall: 0,
        industry_colormetall: 0,
        industry_coal: 0,
        industry_hunting: 0,
        industry_fishing: 0,
        industry_forestry: 0,
        industry_blacksmith: 0,
        industry_animals: 0,
        industry_vegetable: 0,
        industry_wheat: 0,
        industry_typography: 0,
        industry_light: 0,
        industry_eating: 0,
        industry_jewelry: 0,
        industry_transport: 0,
        industry_alchemy: 0,
        industry_hiring: 0,
        industry_culture: 0,
        industry_other: 0,

        budget_infrastructure: 0.5,
        budget_education: 0.5,
        budget_research: 0.5,
        budget_propaganda: 0.5,
        budget_government: 0.5,

        kazna: 10_000_000,
    }

    newSave.date = new Date()

    let parsedDate = parseDate(newSave.date)

    let key = `${newSave.country.name}_${parsedDate}`
    await set(key, newSave)

    return get(key)
}

export async function loadGame(country, time) {
    let key = `${country}_${time}`

    return get(key)
}

export async function deleteGame(country, time) {
    let key = `${country}_${time}`
    
    return del(key)
}

export async function getAllSaves(onlyKey=false) {
    let saves = {};

    let items = await entries()
    items.forEach(e => saves[e[0]] = e[1])

    return onlyKey ? Object.keys(saves) : saves
}