"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAnswerPeace = getAnswerPeace;

function getAnswerPeace(prop) {
  var obj = prop;

  for (var _i = 0, _Object$keys = Object.keys(obj); _i < _Object$keys.length; _i++) {
    var i = _Object$keys[_i];

    for (var _i2 = 0, _Object$keys2 = Object.keys(obj[i]); _i2 < _Object$keys2.length; _i2++) {
      var t = _Object$keys2[_i2];

      if (obj[i][t] === 0) {
        obj[i][t] = 1;
      }
    }
  }

  var army_neuron = obj.army.own / obj.army.enemy;
  var own_neuron = obj.peace.own / obj.war.own;
  var enemy_neuron = obj.peace.enemy / obj.war.enemy;
  var compare_neuron = enemy_neuron / own_neuron;
  var output_neuron = compare_neuron * (army_neuron * 0.6);
  return output_neuron > 1 ? 9 : -1000000;
}