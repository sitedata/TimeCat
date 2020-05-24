export function disableScrolling(target) {
    var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
    function preventDefault(e) {
        e.preventDefault();
    }
    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }
    var supportsPassive = false;
    try {
        target.addEventListener('test', () => { }, Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassive = true;
            }
        }));
    }
    catch (e) { }
    var wheelOpt = supportsPassive ? { passive: false } : false;
    var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
    function disableScroll() {
        target.addEventListener('DOMMouseScroll', preventDefault, false);
        target.addEventListener(wheelEvent, preventDefault, wheelOpt);
        target.addEventListener('touchmove', preventDefault, wheelOpt);
        target.addEventListener('keydown', preventDefaultForScrollKeys, false);
    }
    function enableScroll() {
        target.removeEventListener('DOMMouseScroll', preventDefault, false);
        target.removeEventListener(wheelEvent, preventDefault, wheelOpt);
        target.removeEventListener('touchmove', preventDefault, wheelOpt);
        target.removeEventListener('keydown', preventDefaultForScrollKeys, false);
    }
    disableScroll();
}
