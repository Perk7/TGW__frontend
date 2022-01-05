export function getAnswerPeace(prop) {
 let obj = prop
 for (let i of Object.keys(obj)) {
     for (let t of Object.keys(obj[i])) {
        if (obj[i][t] === 0) {
            obj[i][t] = 1
        }
     }
 }
 
 let army_neuron = obj.army.own / obj.army.enemy
 let own_neuron = obj.peace.own / obj.war.own
 let enemy_neuron = obj.peace.enemy / obj.war.enemy

 let compare_neuron = enemy_neuron / own_neuron

 let output_neuron = compare_neuron * (army_neuron*0.6)

 return output_neuron > 1 ? 9 : -1000000
}

export function getExodusBattle(own, enemy) {
    let ownHash = {
        sum: [own.pechot, own.archer, own.cavallery, own.catapult].reduce((sum, current) => sum + current, 0),
        buff: 0,
        value: 0,
    }
    let enemyHash = {
        sum: [enemy.pechot, enemy.archer, enemy.cavallery, enemy.catapult].reduce((sum, current) => sum + current, 0),
        buff: 0,
        value: 0,
    }

    ownHash.buff = ((0.4 < (own.pechot / ownHash.sum) && (own.pechot / ownHash.sum) < 0.6)
        ? 0.5
        : own.pechot > 0 
            ? -(0.5 - Math.abs((own.pechot / ownHash.sum)))
            : -0.5)
    ownHash.buff = ownHash.buff + ((0.15 < (own.archer / ownHash.sum) && (own.archer / ownHash.sum) < 0.25)
        ? 0.5 
        : own.archer > 0 
            ? -(0.2 - Math.abs((own.archer / ownHash.sum)))*2.5
            : -0.5)
    ownHash.buff = ownHash.buff + ((0.15 < (own.cavallery / ownHash.sum) && (own.cavallery / ownHash.sum) < 0.25) 
        ? 0.5 
        : own.cavallery > 0
            ? -(0.2 - Math.abs((own.cavallery / ownHash.sum)))*2.5
            : -0.5)
    ownHash.buff = ownHash.buff + ((0.05 < (own.catapult*100 / ownHash.sum) && (own.catapult*100 / ownHash.sum) < 0.15)
        ? 0.5 
        : own.catapult > 0
            ? -(0.1 - Math.abs((own.catapult*100 / ownHash.sum)))*5
            : -0.5)

    enemyHash.buff = ((0.4 < (enemy.pechot / enemyHash.sum) && (enemy.pechot / enemyHash.sum) < 0.6)
        ? 0.5 
        : enemy.pechot > 0
            ? -(0.5 - Math.abs((enemy.pechot / enemyHash.sum)))
            : -0.5)
    enemyHash.buff = enemyHash.buff + ((0.15 < (enemy.archer / enemyHash.sum) && (enemy.archer / enemyHash.sum) < 0.25) 
        ? 0.5 
        : enemy.archer > 0
            ? -(0.2 - Math.abs((enemy.archer / enemyHash.sum)))*2.5
            : -0.5)
    enemyHash.buff = enemyHash.buff + ((0.15 < (enemy.cavallery / enemyHash.sum) && (enemy.cavallery / enemyHash.sum) < 0.25)
        ? 0.5
        : enemy.cavallery > 0 
            ? -(0.2 - Math.abs((enemy.cavallery / enemyHash.sum)))*2.5
            : -0.5)
    enemyHash.buff = enemyHash.buff + ((0.05 < (enemy.catapult*100 / enemyHash.sum) && (enemy.catapult*100 / enemyHash.sum) < 0.15)
        ? 0.5 
        : enemy.catapult > 0
            ? -(0.1 - Math.abs((enemy.catapult*100 / enemyHash.sum)))*5
            : -0.5)

    ownHash.value = ownHash.sum*(ownHash.buff > 0.5 ? ownHash.buff : 0.5)
    enemyHash.value = enemyHash.sum*(enemyHash.buff > 0.5 ? enemyHash.buff : 0.5)
    let balanceQuality = (own.quality / enemy.quality) * (Math.random() / 2.5 + 0.8)
    let exodus = (ownHash.value / enemyHash.value)*balanceQuality
    let ret = {
        own: {
            pechot: 0,
            archer: 0,
            cavallery: 0,
            catapult: 0
        },
        enemy: {
            pechot: 0,
            archer: 0,
            cavallery: 0,
            catapult: 0
        },
        exodus: exodus >= 1 ? 'own' : 'enemy'
    }

    let spend = { own: 0.2/exodus, enemy: 0.2*exodus }

    for (let i of ['pechot', 'archer', 'cavallery', 'catapult']) {
        let curSpend = spend.own * (Math.random() / 2.5 + 0.8)
        
        if (i === 'catapult') {
            ret.own[i] = parseInt(own[i]*curSpend) 
        } else {
            ret.own[i] = parseInt(own[i]*curSpend / 50) * 50
        }
        
        if (ret.own[i] > own[i]) {
            ret.own[i] = own[i]
        }
    }
    for (let i of ['pechot', 'archer', 'cavallery', 'catapult']) {
        let curSpend = spend.enemy * (Math.random() / 2.5 + 0.8)
        
        if (i === 'catapult') {
            ret.enemy[i] = parseInt(enemy[i]*curSpend) 
        } else {
            ret.enemy[i] = parseInt(enemy[i]*curSpend / 50) * 50
        }

        if (ret.enemy[i] > enemy[i]) {
            ret.enemy[i] = enemy[i]
        }
    }
    console.log(ret)
    return ret
}