'use strict';

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
