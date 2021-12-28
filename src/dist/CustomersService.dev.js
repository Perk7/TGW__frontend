"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var API_URL = 'http://192.168.1.159:8000';

var UserService =
/*#__PURE__*/
function () {
  function UserService() {
    _classCallCheck(this, UserService);
  }
  /* Main Menu */


  _createClass(UserService, [{
    key: "allCountries",
    value: function allCountries() {
      var url = "".concat(API_URL, "/api/country/");
      return _axios["default"].get(url);
    }
  }, {
    key: "savedGames",
    value: function savedGames(user) {
      var url = "".concat(API_URL, "/api/saved_games/");
      return _axios["default"].post(url, user);
    }
  }, {
    key: "deleteSave",
    value: function deleteSave(data) {
      var url = "".concat(API_URL, "/api/delete_save/");
      return _axios["default"].post(url, data);
    }
    /* Auth and Login */

  }, {
    key: "registration",
    value: function registration(user) {
      var url = "".concat(API_URL, "/auth/registration/");
      return _axios["default"].post(url, user);
    }
  }, {
    key: "check_mail",
    value: function check_mail(mail) {
      var url = "".concat(API_URL, "/auth/check_mail/");
      return _axios["default"].post(url, mail);
    }
  }, {
    key: "login",
    value: function login(user) {
      var url = "".concat(API_URL, "/auth/login/");
      return _axios["default"].post(url, user);
    }
  }, {
    key: "logout",
    value: function logout() {
      var url = "".concat(API_URL, "/auth/logout/");
      return _axios["default"].get(url);
    }
  }, {
    key: "recoveryPasswordCode",
    value: function recoveryPasswordCode(mail) {
      var url = "".concat(API_URL, "/auth/recovery_password_code/");
      return _axios["default"].post(url, mail);
    }
  }, {
    key: "recoveryPassword",
    value: function recoveryPassword(password) {
      var url = "".concat(API_URL, "/auth/password_change/");
      return _axios["default"].post(url, password);
    }
    /* Start Game */

  }, {
    key: "createGame",
    value: function createGame(data) {
      var url = "".concat(API_URL, "/game/start_game/");
      return _axios["default"].post(url, data);
    }
  }, {
    key: "loadGame",
    value: function loadGame(data) {
      var url = "".concat(API_URL, "/game/load_game/");
      return _axios["default"].post(url, data);
    }
  }, {
    key: "saveGame",
    value: function saveGame(data) {
      var url = "".concat(API_URL, "/game/save_game/");
      return _axios["default"].post(url, data);
    }
  }]);

  return UserService;
}();

exports["default"] = UserService;