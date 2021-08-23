import {
    CHANGE_USER,
    AUTH,
    CREATE_GAME,
    SET_COLORMAP,
    SET_CAPITALS,
    CHANGE_GAME,
    CHANGE_BUFFS,
    CHANGE_CAPITAL,
    CHANGE_GOVERNMENT,
    CHANGE_AREA_FORMAT,
    CHANGE_ARMY_SALARY,
    CHANGE_ARMY_EQUIP,
    CHANGE_ARMY_MAINTAIN,
    CHANGE_SQUAD, NEW_SQUAD, DELETE_SQUAD, SET_JUR_TAXES, SET_PHY_TAXES, CHANGE_BUDGET,
    CHANGE_RESOURCE,
    CHANGE_KAZNA,
    CHANGE_LAWS, SET_PEACE, SET_SOCIAL, TRANSITION_SQUAD, TRANSITION_CLEAR, CLEAR_PEACE
} from "./types";

export function change_user() {
    return {
        type: CHANGE_USER
    }
}

export function auth(data) {
    return {
        type: AUTH,
        payload: data
    }
}

export function create_game(data) {
    return {
        type: CREATE_GAME,
        payload: data
    }
}

export function set_capitals(data) {
    return {
        type: SET_CAPITALS,
        payload: data
    }
}

export function set_colormap(data) {
    return {
        type: SET_COLORMAP,
        payload: data
    }
}

export function change_capital(data) {
    return {
        type: CHANGE_CAPITAL,
        payload: data
    }
}

export function change_government(data) {
    return {
        type: CHANGE_GOVERNMENT,
        payload: data
    }
}

export function change_area_format(data) {
    return {
        type: CHANGE_AREA_FORMAT,
        payload: data
    }
}

export function change_buffs(data) {
    return {
        type: CHANGE_BUFFS,
        payload: data
    }
}

export function change_game(data) {
    return {
        type: CHANGE_GAME,
        payload: data
    }
}

export function change_army_salary(data) {
    return {
        type: CHANGE_ARMY_SALARY,
        payload: data
    }
}

export function change_army_equip(data) {
    return {
        type: CHANGE_ARMY_EQUIP,
        payload: data
    }
}

export function change_army_maintain(data) {
    return {
        type: CHANGE_ARMY_MAINTAIN,
        payload: data
    }
}

export function change_squad(data) {
    return {
        type: CHANGE_SQUAD,
        payload: data
    }
}

export function new_squad(data) {
    return {
        type: NEW_SQUAD,
        payload: data
    }
}

export function delete_squad(data) {
    return {
        type: DELETE_SQUAD,
        payload: data
    }
}

export function set_jur_taxes(data) {
    return {
        type: SET_JUR_TAXES,
        payload: data
    }
}

export function set_phy_taxes(data) {
    return {
        type: SET_PHY_TAXES,
        payload: data
    }
}

export function change_budget(data) {
    return {
        type: CHANGE_BUDGET,
        payload: data
    }
}

export function change_resource(data) {
    return {
        type: CHANGE_RESOURCE,
        payload: data
    }
}

export function change_kazna(data) {
    return {
        type: CHANGE_KAZNA,
        payload: data
    }
}

export function change_laws(data) {
    return {
        type: CHANGE_LAWS,
        payload: data
    }
}

export function set_peace(data) {
    return {
        type: SET_PEACE,
        payload: data
    }
}

export function clear_peace(data) {
    return {
        type: CLEAR_PEACE,
        payload: data
    }
}

export function set_social(data) {
    return {
        type: SET_SOCIAL,
        payload: data
    }
}

export function transition_squad(data) {
    return {
        type: TRANSITION_SQUAD,
        payload: data
    }
}

export function transition_clear(data) {
    return {
        type: TRANSITION_CLEAR,
        payload: data
    }
}