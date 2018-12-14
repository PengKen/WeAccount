# AccountForeend
Tips：README.md 其实是一种markdown，换行要用两个空格来代替，缩进要用'>'来代替
babel-plugin-transform-remove-console 插件用来在生产模式下，将所有的console移除，提升性能，  
另外的解决方式是利用全局变量  _DEV_ ,如下：  
 ```JavaScript
    if (!__DEV__) {  
        global.console = {   
        info: () => {},    
        log: () => {},    
        warn: () => {},    
        debug: () => {},    
        error: () => {},    
  };  
}
```    
## BUG

*入货选择图片上传并预览*存在一个无法很好解决的bug，即需要进行图片预览的集合无法通过动态setState来修改，  
只能是完全的静态变量或者是通过redux来进行修改，具体原因尚不可知。