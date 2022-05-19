window.addEventListener('DOMContentLoaded', function() {
    var preImg = document.querySelector('.preview_img');
    var zoomBox = document.querySelector('.zoomBox');
    var magnifyBox = document.querySelector('.magnify_box');
    var magnify_img = document.querySelector('.magnify_box').querySelector('img');

    // make mask and magnifyBox visible when mouseover
    preImg.addEventListener('mouseover', function(e) {
        zoomBox.style.display = 'block';
        magnifyBox.style.display = 'block';
    });
    // make mask and magnifyBox invisible when mouseout
    preImg.addEventListener('mouseout', function() {
        zoomBox.style.display = 'none';
        magnifyBox.style.display = 'none';
    });
    // make the mask follow the mouse while mouse moving
    preImg.addEventListener('mousemove', move);
    // get the top and left of the mask while mouse moving
    function move(e) {
        var mouseX = e.pageX - preImg.offsetLeft - zoomBox.offsetWidth / 2;
        var mouseY = e.pageY - preImg.offsetTop - zoomBox.offsetHeight / 2;
        // the max X and Y of the magnify img
        var bigX_max = magnify_img.offsetWidth - magnifyBox.offsetWidth;
        var bigY_max = magnify_img.offsetHeight - magnifyBox.offsetHeight;
        // let the mask move in the preview box
        if (mouseX < 0) {
            mouseX = 0;
        } else if (mouseX > preImg.offsetWidth - zoomBox.offsetWidth) {
            mouseX = preImg.offsetWidth - zoomBox.offsetWidth;
        } else {
            mouseX = mouseX;
        }
        if (mouseY < 0) {
            mouseY = 0;
        } else if (mouseY > preImg.offsetHeight - zoomBox.offsetHeight) {
            mouseY = preImg.offsetHeight - zoomBox.offsetHeight;
        } else {
            mouseY = mouseY;
        }
        // set the X and Y of the zoomBox following the mouse
        zoomBox.style.top = mouseY + 'px';
        zoomBox.style.left = mouseX + 'px';
        // the mask in the preview image and the enlarged image should move in the same scale in the image.
        // so the fomula is mouseX/mouseX_max=bigImgX/bigImgX_max
        var bigX = mouseX * bigX_max / (preImg.offsetWidth - zoomBox.offsetWidth);
        var bigY = mouseY * bigY_max / (preImg.offsetHeight - zoomBox.offsetHeight);
        // set the x and y of the magnify img following the preImg moving
        magnify_img.style.left = -bigX + 'px';
        magnify_img.style.top = -bigY + 'px';
    }

});
$(function() {
    $(".info_tab_bh li").click(function() {
        $(this).addClass("info_tab_bh_current");
        var index = $(this).index();
        $(this).siblings("li").removeClass("info_tab_bh_current");
        $(".info_tab_wrap ul").eq(index).show().siblings("ul").hide();

    });
})