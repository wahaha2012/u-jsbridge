import JsBridge from '../../../src/bridge/';

describe('jsBridge.js', () => {
  it('should set debugger mode successfully', () => {
    spyOn(console, 'log');
    JsBridge.setDebuggerMode(true);
    expect(console.log).toHaveBeenCalledWith('debuggerMode on');
  });

  it('should get platform successfully', () => {
    spyOn(console, 'log');
    const platform = JsBridge.getSysPlatform();
    expect(console.log).toHaveBeenCalledWith(platform);
  });

  it('should call bridge successfully', () => {
    spyOn(console, 'log');

    JsBridge.call('unitTest', (data) => {
      console.log(data);
    });

    expect(console.log).toHaveBeenCalledWith('unitTest');
  });

  it('should emit event and run callback functions', () => {
    spyOn(console, 'log');

    JsBridge.emit('unitTest', {'log': true});

    expect(console.log).toHaveBeenCalledWith({'log': true});
  });

  it('should register bridge successfully', () => {
    spyOn(console, 'log');

    JsBridge.register('registerTest', (data) => {
      console.log(data);
    });

    expect(console.log).toHaveBeenCalledWith('function');
  });

  it('should call window.onNativeCallback and emit event', () => {
    spyOn(console, 'log');
    spyOn(JsBridge, 'emit');

    const message = {
      msgType: 'registerTest',
      data: {
        'name': 'tom'
      }
    };
    window.onNativeCallback(message);

    expect(JsBridge.emit).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(message);
  });
});
