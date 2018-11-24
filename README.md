# AccountForeend

babel-plugin-transform-remove-console 插件用来在生产模式下，将所有的console移除，提升性能，
另外的解决方式是利用全局变量  _DEV_ ,如下：
if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {},
  };
}