/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var eventMap = {};
var debuggerMode = false;

window.onNativeCallback = function (message) {
  if (typeof message === 'string') {
    try {
      message = JSON.parse(message);
    } catch (err) {
      // 
    }
  }
  // receive message from native
  if ((typeof message === 'undefined' ? 'undefined' : _typeof(message)) === 'object') {
    debuggerMode && console.log(message);
    jsBridge.emit(message.msgType, message.data);
  }
};

var jsBridge = {
  setDebuggerMode: function setDebuggerMode(status) {
    debuggerMode = status;

    debuggerMode && console.log('debuggerMode on');
  },
  getSysPlatform: function getSysPlatform() {
    var ua = window.navigator.userAgent;
    var uaL = ua.toLowerCase();
    var platform = void 0;

    if (~uaL.indexOf('iphone') || ~ua.indexOf('iOS')) {
      platform = 'ios';
    } else if (~uaL.indexOf('android') || ~ua.indexOf('Adr')) {
      platform = 'android';
    }

    debuggerMode && console.log(platform);
    return platform;
  },
  call: function call(eventName, data, func) {
    var jsonObj = {
      'msgType': eventName
    };

    if (typeof data === 'function') {
      func = data;
    } else if (typeof data !== 'undefined') {
      jsonObj.data = data;
    }

    var platform = jsBridge.getSysPlatform();

    try {
      var message = JSON.stringify(jsonObj);
      // for webkit
      if (platform === 'ios') {
        window.webkit.messageHandlers.webViewApp.postMessage(message);
      }
      // for android
      if (platform === 'android') {
        window.webViewApp.jsCallNative(message);
      }
    } catch (err) {
      // throw new Error(err);
    }

    jsBridge.register(eventName, func);

    debuggerMode && console.log(eventName);
  },
  register: function register(eventName, func) {
    eventMap[eventName] = func;
    debuggerMode && console.log(_typeof(eventMap[eventName]));
  },
  emit: function emit(eventName, data) {
    if (typeof eventMap[eventName] === 'function') {
      eventMap[eventName](data);
      // eventMap[eventName] = null;
      // delete eventMap[eventName];
    }
  }
};

exports.default = jsBridge;
module.exports = exports['default'];

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map