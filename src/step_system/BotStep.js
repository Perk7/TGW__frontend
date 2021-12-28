import { getGdpPerPopulation } from "../otherFunctions"

export default async function botStep(store, func) {
    let newStore = Object.assign({}, store)
    
    let buffArr = ['army_quality', 'education_quality', 'stability', 'support']
    let buffArrRegion = {
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
    }
    for (let i of newStore.createGame.country_ai) {
        let koef = 1

        for (let k of buffArr) {
            i[k] = i[k] + i[k]*koef*(Math.random()/2 + 0.75)
        }

        for (let k of i.regions) {
            for (let z of Object.keys(k)) {
                if (z.startsWith('industry')) {
                    k[z] = k[z] + k[z]*buffArrRegion['industry']*koef*(Math.random()/2 + 0.75)
                } else if (z.startsWith('need')) {
                    k[z] = k[z] + k[z]*buffArrRegion['need']*koef*(Math.random()/2 + 0.75)
                } else {
                    k[z] = k[z] + k[z]*buffArrRegion[z]*koef*(Math.random()/2 + 0.75)
                }
            }
        }
    }

    const conTypes = {
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

        VC: 0.05,
    }

    for (let i of newStore.createGame.relations) {
        if (i.pair.length == 2) {
            let changer = -1
            i.value = i.value + changer

            for (let c of Object.keys(conTypes)) {
                if (conTypes[c]*i.value) {
                    /* Создаем контракт */
                }
            }
        }
    }
}