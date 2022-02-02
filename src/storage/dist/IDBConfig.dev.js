"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DBConfig = void 0;
var DBConfig = {
  name: 'Database',
  version: 1,
  objectStoresMeta: [{
    store: 'saves',
    storeConfig: {
      keyPath: 'id',
      autoIncrement: true
    },
    storeSchema: [{
      name: 'data',
      keypath: 'data',
      options: {
        unique: false
      }
    }]
  }]
};
exports.DBConfig = DBConfig;