export default class BuffsProps {
    governmentType(buff, type) {
        if (type === 'M') {
            return {
                actions: buff.actions - 1,

                }
        }
        if (type === 'O') {
            return {
                actions: buff.actions - 1,

            }
        }
        if (type === 'R') {
            return {
                actions: buff.actions - 1,

            }
        }
        if (type === 'D') {
            return {
                actions: buff.actions - 1,

            }
        }
    }

    areaType(buff, type) {
        let opts = type.split(',')
        let buffs = {

        }
        switch (opts[1]) {

        }
    }
}