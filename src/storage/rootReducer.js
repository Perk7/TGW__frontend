import {
    CHANGE_USER,
    AUTH,
    CREATE_GAME,
    SET_COLORMAP,
    SET_CAPITALS,
    CHANGE_GAME,
    CHANGE_CAPITAL,
    CHANGE_BUFFS,
    CHANGE_GOVERNMENT,
    CHANGE_AREA_FORMAT,
    CHANGE_ARMY_SALARY,
    CHANGE_ARMY_EQUIP,
    CHANGE_ARMY_MAINTAIN,
    CHANGE_SQUAD, NEW_SQUAD, DELETE_SQUAD, SET_PHY_TAXES, SET_JUR_TAXES, CHANGE_BUDGET,
    CHANGE_RESOURCE,
    CHANGE_KAZNA,
    CHANGE_LAWS, SET_PEACE, SET_SOCIAL, TRANSITION_SQUAD, TRANSITION_CLEAR, CLEAR_PEACE, SWAP_REGION, CHANGE_OCCUPED, DELETE_AI_SQUAD, NEW_AI_SQUAD, CHANGE_AI_SQUAD
} from "./types";
import {combineReducers} from "redux";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom/cjs/react-dom.development";
import Squad from "../elements/maps/Squad";

function userReducer(state = false, action) {
    switch (action.type) {
        case CHANGE_USER:
            const newState = state ? false : true
            return newState
            

        default:
            return state
            
    }
}

function authReducer(state = {}, action) {
    switch (action.type) {
        case AUTH:
            const newState = { login: action.payload.login,
                               password: action.payload.password,
                                }
            return newState
            

        default:
            return state
            
    }
}

function createGame(state = {}, action) {
    let newState = null
    let squad = null
    switch (action.type) {
        case CREATE_GAME:
            newState = action.payload
            return newState
            
        case CHANGE_BUFFS:
            newState = state
            for (let i of Object.keys(action.payload)) {
                newState['buffs'][i] = action.payload[i]
            }
            return newState
            

        case CHANGE_CAPITAL:
            newState = state
            newState['country']['capital'] = action.payload
            return newState
            
        case CHANGE_GOVERNMENT:
            newState = state
            newState['country']['government'] = action.payload
            return newState
            
        case CHANGE_AREA_FORMAT:
            newState = state
            newState['country']['area_format'] = action.payload
            return newState
            

        case CHANGE_ARMY_SALARY:
            newState = state
            newState['country']['army_salary'] = action.payload
            return newState
            
        case CHANGE_ARMY_EQUIP:
            newState = state
            newState['country']['army_equip'] = action.payload
            return newState
            
        case CHANGE_ARMY_MAINTAIN:
            newState = state
            newState['country']['army_maintain'] = action.payload
            return newState
            

        case CHANGE_SQUAD:
            newState = state
            squad = action.payload
            for (let i of newState.squad) {
                if (i.place === squad.place) {
                    squad.id = i.id
                    newState.squad[newState.squad.indexOf(i)] = squad
                }
            }
            return newState
            
        case NEW_SQUAD:
            newState = state
            squad = action.payload
            for (let i of newState.squad) {
                if (i.place === squad.place) {
                    i.pechot_quan = i.pechot_quan + squad.pechot_quan
                    i.archer_quan = i.archer_quan + squad.archer_quan
                    i.cavallery_quan = i.cavallery_quan + squad.cavallery_quan
                    i.catapult_quan = i.catapult_quan + squad.catapult_quan

                    return newState
                }
            }
            for (let i of newState.squad) {
                if (i.id >= squad.id) {
                    squad.id = i.id+1
                }
            }
            newState.squad.push(squad)
            return newState
            
        case DELETE_SQUAD:
            newState = state
            let newSquads = []
            for (let i of newState.squad) {
                if (i.place !== action.payload.place) {
                    newSquads.push(i)
                }
            }
            newState.squad = newSquads
            return newState
        
        
        case CHANGE_AI_SQUAD:
            newState = state
            squad = action.payload
            for (let i of newState.squad_ai) {
                if (i.place === squad.place && i.country === squad.country) {
                    squad.id = i.id
                    newState.squad_ai[newState.squad_ai.indexOf(i)] = squad
                }
            }
            return newState
            
        case NEW_AI_SQUAD:
            newState = state
            squad = action.payload
            for (let i of newState.squad_ai) {
                if (i.place === squad.place && i.country === squad.country) {
                    i.pechot_quan = i.pechot_quan + squad.pechot_quan
                    i.archer_quan = i.archer_quan + squad.archer_quan
                    i.cavallery_quan = i.cavallery_quan + squad.cavallery_quan
                    i.catapult_quan = i.catapult_quan + squad.catapult_quan
                    return newState
                }
            }
            for (let i of newState.squad_ai) {
                if (i.id >= squad.id) {
                    squad.id = i.id+1
                }
            }
            newState.squad_ai.push(squad)
            return newState
            
        case DELETE_AI_SQUAD:
            newState = state
            let newAISquads = []
            for (let i of newState.squad_ai) {
                if (i.place !== action.payload.place) {
                    newAISquads.push(i)
                }
            }
            newState.squad_ai = newAISquads
            return newState  
            
        case SET_PHY_TAXES:
            newState = state
            newState['country']['tax_physic'] = action.payload
            return newState
            
        case SET_JUR_TAXES:
            newState = state
            newState['country']['tax_jurid'] = action.payload
            return newState
            

        case CHANGE_BUDGET:
            newState = state
            newState['buffs'][`budget_${action.payload.target}`] = action.payload.value
            return newState
            
        case CHANGE_RESOURCE:
            newState = state
            let len = newState.country.regions.length
            const value = action.payload.value/len
            for (let i of newState.country.regions) {
                i[`industry_${action.payload.target}`] = i[`industry_${action.payload.target}`] + value
            }
            return newState
            

        case CHANGE_KAZNA:
            newState = state
            newState['buffs']['kazna'] = newState['buffs']['kazna'] + action.payload
            return newState
              

        case CHANGE_LAWS:
            newState = state
            newState['country'][action.payload] = !newState['country'][action.payload]
            return newState
            

        case SET_SOCIAL:
            newState = state
            newState['country'][action.payload.target] = action.payload.value
            return newState
            
        case SWAP_REGION:
            newState = state
            let obj = action.payload

            let newDecRegions = []
            let newIncRegions = []
            for (let i of obj.dec.regions) {
                if (i.name !== obj.region) {
                    newDecRegions.push(i)
                } else {
                    newIncRegions.push(i)
                }
            } 
            for (let i of obj.inc.regions) {
                newIncRegions.push(i)
            }

            if (obj.inc.name === newState.country.name) {
                newState.country.region = newIncRegions
            } else {
                for (let i of newState.country_ai) {
                    if (i.name === obj.inc.name) {
                        i.regions = newIncRegions
                    }
                }
            }

            if (obj.dec.name === newState.country.name) {
                newState.country.region = newDecRegions
            } else {
                for (let i of newState.country_ai) {
                    if (i.name === obj.dec.name) {
                        i.regions = newDecRegions
                    }
                }
            }
 
            return newState

        case CHANGE_OCCUPED:
            newState = state
            let newObj = action.payload 

            for (let i of newState.contracts) {
                if (i.con_type === 'DW' && i.pair.includes(newObj.enemy) && (i.pair.length === 1 || i.pair.includes(newObj.own))) {
                    let occuped = i.occuped.split(',')
                    if (occuped[0] === '' && occuped.length === 1) {
                        occuped = []
                    }
                    
                    if (!occuped.includes(newObj.region)) {
                        occuped.push(newObj.region)
                    } else {
                        occuped = occuped.filter(e => e !== newObj.region)
                    }
                    i.occuped = occuped.join(',')
                }
            }

            return newState

        default:
            return state
            
    }
}

function colormapReducer(state = {}, action) {
    switch (action.type) {
        case SET_COLORMAP:
            const newState = action.payload
            return newState
            

        default:
            return state
            
    }
}

function capitalsReducer(state = {}, action) {
    switch (action.type) {
        case SET_CAPITALS:
            const newState = action.payload
            return newState
            

        default:
            return state
            
    }
}

function changerReducer(state = [], action) {
    switch (action.type) {
        case CHANGE_GAME:
            let newState = state
            if (newState.indexOf(action.payload) !== -1) {
                let changer = []
                newState.map(el => {
                    if (el !== action.payload) {
                        changer.push(el)
                    }
                    return null
                })
                newState = changer
            } else {
                newState.push(action.payload)
            }
            return newState
            
        default:
            return state
            
    }
}

function peaceReducer(state = [], action) {
    switch (action.type) {
        case SET_PEACE:
            let newState = state.length ? state : []
            newState.push(action.payload)

            return newState
            
        case CLEAR_PEACE:
            return {}
            
        default:
            return state
            
    }
}

function squadReducer(state = {}, action) {
    switch (action.type) {
        case TRANSITION_SQUAD:
            let newState = state
            newState[action.payload.key] = action.payload.data
            return newState
            
        case TRANSITION_CLEAR:
            return {}
            
        default:
            return state
            
    }
}

export const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    createGame: createGame,
    colorMap: colormapReducer,
    capitals: capitalsReducer,
    changeGame: changerReducer,
    peaceList: peaceReducer,
    squadTrans: squadReducer,
})