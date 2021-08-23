const flags = {

}
const arr = [
    'anequina',
    'argonia',
    'crowns',
    'daggerfall',
    'dominion',
    'dres',
    'elteric',
    'empire',
    'evermore',
    'forebears',
    'indoril',
    'none',
    'orsinium',
    'peletine',
    'redoran',
    'sadras',
    'shornhelm',
    'skyrim',
    'stormcloacks',
    'sultanat',
    'telvanni',
    'wayrest'
]
arr.map(e => flags[e] = {backgroundPosition: `0 ${arr.indexOf(e)*4.762}%`})

export default flags