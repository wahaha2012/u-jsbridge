# u-jsbridge
App js bridge

# Install
> use npm

```bash
npm install u-jsbridge --save
```

# Usage
```js
import jsBridge from 'u-jsbridge';
```

# Demo
> send a bridge call to native app

```js
jsBridge.call('testMessage', (response) => {
  // here process response data from native app
});

// call bridge with data
jsBridge.call('testMessage', { userName: 'tom' }, (response) => {
  // here process response data from native app
});
```


> register bridge response process handler

```js
jsBridge.register('sendMessage', (response) => {

});
```


> emit simulated bridge response event

```js
jsBridge.emit('testMessage', {
  msgType: 'testMessage',
  data: {
    info: 'hello world'
  }
});
```

> switch debugger mode status

```js
jsBridge.setDebuggerMode(true);
```

# API
```js
jsBridge
- setDebuggerMode(boolean[default: false]) 
- call(bridgeName, [data], [callBack])
- register(bridgeName, callback)
- emit(bridgeName, response)
```
