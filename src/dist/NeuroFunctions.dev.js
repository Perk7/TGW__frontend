"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAnswerPeace = getAnswerPeace;
exports.getExodusBattle = getExodusBattle;

var _reactDomTestUtilsProduction = require("react-dom/cjs/react-dom-test-utils.production.min");

var _otherFunctions = require("./otherFunctions");

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

function getExodusBattle(own, enemy) {
  var ownHash = {
    sum: [own.pechot, own.archer, own.cavallery, own.catapult].reduce(function (sum, current) {
      return sum + current;
    }, 0),
    buff: 0,
    value: 0
  };
  var enemyHash = {
    sum: [enemy.pechot, enemy.archer, enemy.cavallery, enemy.catapult].reduce(function (sum, current) {
      return sum + current;
    }, 0),
    buff: 0,
    value: 0
  };
  ownHash.buff = 0.4 < own.pechot / ownHash.sum && own.pechot / ownHash.sum < 0.6 ? 0.5 : own.pechot > 0 ? -(0.5 - Math.abs(own.pechot / ownHash.sum)) : -0.5;
  ownHash.buff = ownHash.buff + (0.15 < own.archer / ownHash.sum && own.archer / ownHash.sum < 0.25 ? 0.5 : own.archer > 0 ? -(0.2 - Math.abs(own.archer / ownHash.sum)) * 2.5 : -0.5);
  ownHash.buff = ownHash.buff + (0.15 < own.cavallery / ownHash.sum && own.cavallery / ownHash.sum < 0.25 ? 0.5 : own.cavallery > 0 ? -(0.2 - Math.abs(own.cavallery / ownHash.sum)) * 2.5 : -0.5);
  ownHash.buff = ownHash.buff + (0.05 < own.catapult * 100 / ownHash.sum && own.catapult * 100 / ownHash.sum < 0.15 ? 0.5 : own.catapult > 0 ? -(0.1 - Math.abs(own.catapult * 100 / ownHash.sum)) * 5 : -0.5);
  enemyHash.buff = 0.4 < enemy.pechot / enemyHash.sum && enemy.pechot / enemyHash.sum < 0.6 ? 0.5 : enemy.pechot > 0 ? -(0.5 - Math.abs(enemy.pechot / enemyHash.sum)) : -0.5;
  enemyHash.buff = enemyHash.buff + (0.15 < enemy.archer / enemyHash.sum && enemy.archer / enemyHash.sum < 0.25 ? 0.5 : enemy.archer > 0 ? -(0.2 - Math.abs(enemy.archer / enemyHash.sum)) * 2.5 : -0.5);
  enemyHash.buff = enemyHash.buff + (0.15 < enemy.cavallery / enemyHash.sum && enemy.cavallery / enemyHash.sum < 0.25 ? 0.5 : enemy.cavallery > 0 ? -(0.2 - Math.abs(enemy.cavallery / enemyHash.sum)) * 2.5 : -0.5);
  enemyHash.buff = enemyHash.buff + (0.05 < enemy.catapult * 100 / enemyHash.sum && enemy.catapult * 100 / enemyHash.sum < 0.15 ? 0.5 : enemy.catapult > 0 ? -(0.1 - Math.abs(enemy.catapult * 100 / enemyHash.sum)) * 5 : -0.5);
  ownHash.value = ownHash.sum * (ownHash.buff > 0.5 ? ownHash.buff : 0.5);
  enemyHash.value = enemyHash.sum * (enemyHash.buff > 0.5 ? enemyHash.buff : 0.5);
  var balanceQuality = own.quality / enemy.quality * (Math.random() / 2.5 + 0.8);
  var exodus = ownHash.value / enemyHash.value * balanceQuality;
  var ret = {
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
  };
  var spend = {
    own: 0.2 / exodus,
    enemy: 0.2 * exodus
  };

  for (var _i3 = 0, _arr = ['pechot', 'archer', 'cavallery', 'catapult']; _i3 < _arr.length; _i3++) {
    var i = _arr[_i3];
    var curSpend = spend.own * (Math.random() / 2.5 + 0.8);

    if (i === 'catapult') {
      ret.own[i] = parseInt(own[i] * curSpend);
    } else {
      ret.own[i] = parseInt(own[i] * curSpend / 50) * 50;
    }

    if (ret.own[i] > own[i]) {
      ret.own[i] = own[i];
    }
  }

  for (var _i4 = 0, _arr2 = ['pechot', 'archer', 'cavallery', 'catapult']; _i4 < _arr2.length; _i4++) {
    var _i5 = _arr2[_i4];

    var _curSpend = spend.enemy * (Math.random() / 2.5 + 0.8);

    if (_i5 === 'catapult') {
      ret.enemy[_i5] = parseInt(enemy[_i5] * _curSpend);
    } else {
      ret.enemy[_i5] = parseInt(enemy[_i5] * _curSpend / 50) * 50;
    }

    if (ret.enemy[_i5] > enemy[_i5]) {
      ret.enemy[_i5] = enemy[_i5];
    }
  }

  return ret;
}