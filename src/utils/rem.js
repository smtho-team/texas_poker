(function(doc, win, designSize) { //designSize为设计稿的尺寸(宽)
    var docEl = document.documentElement,
    devWidth = docEl.clientWidth > 1080 ? 1080 : docEl.clientWidth,
    dpr = devicePixelRatio || 1,
    scale = 1 / dpr,
    width = dpr * devWidth,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'onresize', //判断横屏和窗口重置
    recalc = function() {
              var clientWidth = docEl.clientWidth;
              if (!clientWidth) return;
              document.querySelector('meta[name="viewport"]') .setAttribute('content','width=' + width + ',initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
              docEl.style.fontSize = devWidth / (designSize / 100) * dpr + 'px';
    };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window, 375)