const eventMap = {};
let debuggerMode = false;

window.onNativeCallback = (message) => {
  if (typeof message === 'string') {
    try {
      message = JSON.parse(message);
    } catch (err) {
      // 
    }
  }
  // receive message from native
  if (typeof message === 'object') {
    debuggerMode && console.log(message);
    jsBridge.emit(message.msgType, message.data);
  }

};

const jsBridge = {
  setDebuggerMode(status) {
    debuggerMode = status;

    debuggerMode && console.log('debuggerMode on');
  },

  getSysPlatform() {
    const ua = window.navigator.userAgent;
    const uaL = ua.toLowerCase();
    let platform;

    if (~uaL.indexOf('iphone') || ~ua.indexOf('iOS')) {
      platform = 'ios';
    } else if(~uaL.indexOf('android') || ~ua.indexOf('Adr')) {
      platform = 'android';
    }

    debuggerMode && console.log(platform);
    return platform;
  },

  call(eventName, data, func) {
    const jsonObj = {
      'msgType': eventName
    };

    if (typeof data === 'function') {
      func = data;
    } else if (typeof data !== 'undefined') {
      jsonObj.data = data;
    }
    
    const platform = jsBridge.getSysPlatform();
    
    try {
      const message = JSON.stringify(jsonObj);
      // for webkit
      if (platform === 'ios') {
        window.webkit.messageHandlers.webViewApp.postMessage(message);
      }
      // for android
      if (platform === 'android') {
        window.webViewApp.jsCallNative(message);
      }
    } catch(err) {
      // throw new Error(err);
    }

    jsBridge.register(eventName, func);

    debuggerMode && console.log(eventName);
  },

  register(eventName, func) {
    eventMap[eventName] = func;
    debuggerMode && console.log(typeof eventMap[eventName]);
  },

  emit(eventName, data) {
    if (typeof eventMap[eventName] === 'function') {
      eventMap[eventName](data);
      // eventMap[eventName] = null;
      // delete eventMap[eventName];
    }
  }
};

export default jsBridge;