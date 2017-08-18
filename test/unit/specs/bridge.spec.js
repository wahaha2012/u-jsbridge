import jsBridge from '../../../src/bridge/';

describe('jsBridge.js', () => {
  it('should get platform successfully', () => {
    spyOn(console, 'log');
    const platform = jsBridge.getSysPlatform();
    expect(console.log).toHaveBeenCalledWith(platform);
  });

  it('should call bridge successfully', () => {
    spyOn(console, 'log');

    jsBridge.call('unitTest', (data) => {
      console.log(data);
    });

    expect(console.log).toHaveBeenCalledWith('unitTest');
  });

  it('should emit event and run callback functions', () => {
    spyOn(console, 'log');

    jsBridge.emit('unitTest', {'log': true});

    expect(console.log).toHaveBeenCalledWith({'log': true});
  });

  it('should register bridge successfully', () => {
    spyOn(console, 'log');

    jsBridge.register('registerTest', (data) => {
      console.log(data);
    });

    expect(console.log).toHaveBeenCalledWith('function');
  });

  it('should call window.onNativeCallback and emit event', () => {
    spyOn(console, 'log');
    spyOn(jsBridge, 'emit');

    const message = {
      msgType: 'registerTest',
      data: {
        'name': 'tom'
      }
    };
    window.onNativeCallback(message);

    expect(jsBridge.emit).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(message);
  });
});
