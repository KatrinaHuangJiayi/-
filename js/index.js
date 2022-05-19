window.addEventListener('load', function() {
    // js for the focus images looping 
    var mainAdBox = document.querySelector('.main_ad');
    var focusList = document.querySelector('.focusList');
    var buttonListBox = document.querySelector('.main_ad_button');
    var buttonList = document.querySelector('.main_ad_button').querySelector('ul');
    var arrowLeft = document.querySelector('.arrow_L');
    var arrowRight = document.querySelector('.arrow_R');
    var focusImgWidth = mainAdBox.clientWidth;
    var flag = true; //to disable continuous click
    //功能1： show the two arrows and the list buttons on the focus images and hide them when the mouse leave
    mainAdBox.addEventListener('mouseenter', function() {
        // 功能7：focus图片轮播时，鼠标移入，轮播结束
        clearInterval(arrowRight.imgLoop);
        buttonListBox.style.display = 'block';
        arrowLeft.style.display = 'block';
        arrowRight.style.display = 'block';
    });
    // hide the two arrows and the list buttons on the focus images when the mouse leave
    mainAdBox.addEventListener('mouseleave', function() {
        // 功能7：focus图片轮播时,鼠标移出，轮播自动开始
        arrowRight.imgLoop = window.setInterval(function() {
            arrowRight.click();
        }, 3500);
        buttonListBox.style.display = 'none';
        arrowLeft.style.display = 'none';
        arrowRight.style.display = 'none';
    });
    // 初始化小圆点现在的位置index;
    var circle = 0;
    // 初始化现在图片的位置index
    var num = 0;
    // 功能2：随着focus的多少来生成对应数量的小圆点
    for (i = 0; i < focusList.children.length; i++) {
        var li = document.createElement('li');
        buttonList.appendChild(li);
        buttonList.children[0].className = 'main_ad_current';
        // set the index of each circl button
        buttonList.children[i].setAttribute('data-index', i);
        // 功能3：点击小圆点，切换到对应图片
        buttonList.children[i].addEventListener('click', function() {
            var buttonIndex = this.getAttribute('data-index');
            animate(focusList, -(buttonIndex - num) * focusImgWidth);
            for (j = 0; j < buttonList.children.length; j++) {
                buttonList.children[j].className = '';
            }
            this.className = 'main_ad_current';
            // 点击小圆点后，把图片现在的index位置给num和circle
            circle = num = this.getAttribute('data-index');
        });
    }
    var firstFocusImg = focusList.children[0].cloneNode(true);
    focusList.appendChild(firstFocusImg);


    // 功能4：点击右箭头，实现切换下一张
    arrowRight.addEventListener('click', function() {
        if (flag) {
            flag = false;
            // 图片位置向前+1
            num++;
            // 小圆点位置向前+1
            circle++
            for (j = 0; j < buttonList.children.length; j++) {
                buttonList.children[j].className = '';
            }
            // 如果小圆点的位置点击后是图片最后一张了，则定位到最开头的0
            if (circle == focusList.children.length - 1) {
                circle = 0;
            }
            // 如果点击的是最后一张图片，则将下一张显示的图片位置定在第2张图片，并且将整个图片列表的左偏移变成0.
            if (num == focusList.children.length) {
                num = 1;
                focusList.style.left = '0';
            }
            // 设置当前位置小圆点
            buttonList.children[circle].className = 'main_ad_current';
            // 图片列表ul往前偏移一个图片宽度
            animate(focusList, -focusImgWidth, function() {
                flag = true;
            });
        }
    });
    // 功能5：点击左箭头，实现切换上一张
    arrowLeft.addEventListener('click', function() {
        if (flag) {
            flag = false;
            // 如果小圆点的位置是第一个，则往后定位到最后一个
            // 将图片位置num设置为图片的数量-1
            // 将图片列表ul拉到最后一个图片，注意，最后一张图片和第一张图片是同一个
            if (circle == 0) {
                circle = parseInt(buttonList.children.length);
                num = focusList.children.length - 1;
                focusList.style.left = -(focusList.children.length - 1) * focusImgWidth + 'px';
            }
            // 清除所有小圆圈的当前颜色
            for (j = 0; j < buttonList.children.length; j++) {
                buttonList.children[j].className = '';
            }
            // 图片位置向后-1
            num--;
            // 小圆点位置向后-1
            circle--;
            // 设置当前位置小圆点
            buttonList.children[circle].className = 'main_ad_current';
            // 图片列表ul往后偏移一个图片宽度
            animate(focusList, focusImgWidth, function() {
                flag = true;
            });
        }
    });
    // 功能6：实现focus图片自动轮播,设置定时器，间隔3秒，就调动一次右箭头的点击事件，实现自动轮播；
    arrowRight.imgLoop = window.setInterval(function() {
        arrowRight.click();
    }, 3500);

})