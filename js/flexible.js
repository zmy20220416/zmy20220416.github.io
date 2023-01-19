(function flexible(window, document) {
  //获取html的根元素
  var root = document.documentElement;
  //dpr物理像素比(如果浏览器有devicePixelRatio像素比元素就输出devicePixelRatio，如果没有，就定义像素比为1)
  var dpr = window.devicePixelRatio || 1;
  //adjust body font size 设置我们body的字体大小
  function setBodyFontSize() {
    //如果页面中有body这个元素，就设置body的字体大小
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px';
    } else {
      //如果页面中没有body这个元素，则等我们页面主要的DOM元素加载完毕再去设置body的字体大小
      document.addEventListener('DOMContentLoaded', setBodyFontSize);
    }
  }
  setBodyFontSize();
  //set 1rem = viewWidth / 10   设置我们html元素的文字大小
  function setRemUnit() {
    //html宽度分为1/10，每一等份就是一个rem
    var rem = root.clientWidth / 10;
    root.style.fontSize = rem + 'px';
  }
  setRemUnit();
  //reset rem unit on page resize 当页面尺寸大小发生变化时，重新设置rem大小
  //当resize页面大小发生变化，重新执行setRemUnit获取rem大小
  window.addEventListener('resize', setRemUnit);
  //往返缓存：保存这页面的数据，DOM和JavaScript的状态，实际来说是将整个页面都保存在了内存里
  //pageshow是我们重新加载页面触发的事件,如果使用load的话，火狐浏览器的往返缓存是不会改变rem大小的
  window.addEventListener('pageshow', function(e) {
    //pageshow的persisted值返回true，就是说如果页面是从缓存取过来的页面，也需要重新计算一下rem大小
    if (e.persisted) {
      setRemUnit();
    }
  })
  //detect 0.5px supports 有些移动端的浏览器不支持0.5像素的写法
  if (dpr >= 2) {
    var fakeBody = document.createElement('body');
    var testElement = document.createElement('div');
    testElement.style.border = '5px solid transparent';
    fakeBody.appendChild(testElement);
    root.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      root.classList.add('hairlines');
    }
    root.removeChild(fakeBody);
  }
}(window, document));
