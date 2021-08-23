const icons = {

}
const arr = [
    'region',
    'population',
    'area',
    'economy',
    'inflation',
    'army',
    'support',
    'balance',
    'kazna',
    'salary',
    'poverty',
    'unemployment'
]
arr.map(e => icons[e] = {backgroundPosition: `0 ${arr.indexOf(e)*9.1}%`})

export default icons