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