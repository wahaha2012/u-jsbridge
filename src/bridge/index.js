const eventMap = {};

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
    console.log(message);
    jsBridge.emit(message.msgType, message.data);
  }

};

const jsBridge = {
  getSysPlatform() {
    const ua = window.navigator.userAgent;
    const uaL = ua.toLowerCase();
    let platform;

    if (~uaL.indexOf('iphone') || ~ua.indexOf('iOS')) {
      platform = 'ios';
    } else if(~uaL.indexOf('android') || ~ua.indexOf('Adr')) {
      platform = 'android';
    }

    console.log(platform);
    return platform;
  },

  call(eventName, func) {
    const jsonObj = {
      'msgType': eventName
    };
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

    console.log(eventName);
  },

  register(eventName, func) {
    eventMap[eventName] = func;
    console.log(typeof eventMap[eventName]);
  },

  emit(eventName, data) {
    if (typeof eventMap[eventName] === 'function') {
      eventMap[eventName](data);
      // eventMap[eventName] = null;
      delete eventMap[eventName];
    }
  }
};

export default jsBridge;