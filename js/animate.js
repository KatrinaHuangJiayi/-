function animate(obj, destination, callback) {
    clearInterval(obj.timer);
    var objOffsetLeft = obj.offsetLeft;
    var finalLeft = objOffsetLeft + destination;
    obj.timer = setInterval(function() {
        objOffsetLeft = obj.offsetLeft;
        var step = (finalLeft - objOffsetLeft) / 10;
        if (objOffsetLeft == finalLeft) {
            if (callback) {
                callback();
            }
            clearInterval(obj.timer);
        } else if (step >= 0) {

            obj.style.left = objOffsetLeft + Math.ceil(step) + 'px';
        } else {
            obj.style.left = objOffsetLeft + Math.floor(step) + 'px';
        }
    }, 15);


}