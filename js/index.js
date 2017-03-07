/**
 * Created by Acer on 2017/3/4.
 */
window.onload = function(){
  downTime();
  banner();
};
$(".m-hanburger").click(function(){
  $(this).toggleClass("m-tick");
  $(".menu").toggleClass("menu-hide");
});

/*****轮播图*********/
/*轮播图*/
function banner(){
  /*
   * 1.自动的滚动起来    （定时器，过渡）
   * 2.点随之滚动起来     （改变当前点元素的样式）
   * 3.图片滑动           （touch事件）
   * 4.当不超过一定的滑动距离的时候  吸附回去  定位回去     （一定的距离  1/3  屏幕宽度  过渡）
   * 5.当超过了一定的距离的时候    滚动  到上一张 或 下一张  （一定的距离  1/3  屏幕宽度  过渡）
   * */

  /*获取到dom对象*/
  /*banner*/
  var banner = document.querySelector('.m-banner');
  /*屏幕的宽度*/
  var w = banner.offsetWidth;
  /*图片盒子*/
  var imageBox = banner.querySelector('ul:first-child');/*querySelector只支持有效的css选择器*/
  /*点盒子*/
  var pointBox = banner.querySelector('ul:last-child');
  /*所有的点*/
  var points = pointBox.querySelectorAll('li');


  /*添加过渡*/
  var addTransition = function () {
    imageBox.style.webkitTransition = "all 1s";/*兼容*/
    imageBox.style.transition = "all 1s";
  };
  /*删除过渡*/
  var removeTransition = function () {
    imageBox.style.webkitTransition = "none";/*兼容*/
    imageBox.style.transition = "none";
  };
  /*改变位子*/
  var setTranslateX = function(translateX){
    imageBox.style.webkitTransform = "translateX("+translateX+"px)";
    imageBox.style.transform = "translateX("+translateX+"px)";
  };


  /*1.自动的滚动起来    （定时器，过渡）*/
  var index = 1;
  var timer = setInterval(function(){
    /*箱子滚动*/
    index  ++ ;
    /*定位  过渡来做定位的  这样才有动画*/
    /*加过渡*/
    addTransition();
    /*改变位子*/
    setTranslateX(-index*w);

  },4000);

  /*绑定一个过渡结束事件*/
  itcast.transitionEnd(imageBox,function(){
    console.log('transitionEnd');
    if(index >=4){
      index = 1;
      /*做定位*/
      /*加过渡*/
      removeTransition();
      /*改变位子*/
      setTranslateX(-index*w);
    }else if(index <= 0){
      index = 4;
      /*加过渡*/
      removeTransition();
      /*改变位子*/
      setTranslateX(-index*w);
    }
    /*index 1-8  索引范围*/
    /*point 0-7 */
    setPoint();
  });

  /*2.点随之滚动起来     （改变当前点元素的样式）*/
  var setPoint = function(){
    /*把所有点的样式清除*/
    for(var i = 0 ; i < points.length ; i ++){
      points[i].className = " ";
      /* points[i].classList.remove('now');*/
    }
        points[index-1].className ="current";
  };

  /*3.图片滑动 touch事件）*/
  var startX = 0;
  var moveX = 0;
  var distanceX = 0;
  var isMove = false;

  imageBox.addEventListener('touchstart',function(e){
    /*清除定时器*/
    clearInterval(timer);
    startX = e.touches[0].clientX;
  });
  imageBox.addEventListener('touchmove',function(e){
    isMove = true;
    moveX = e.touches[0].clientX;
    distanceX = moveX - startX;/*distanceX  值  正负*/

    /*算出当前图片盒子需要定位的位子*/
   /* console.log(distanceX);*/

    /*将要去做定位*/
    var currX = -index*w + distanceX;
    /*删除过渡*/
    removeTransition();
    /*改变位子*/
    setTranslateX(currX);
  });

  imageBox.addEventListener('touchend',function(e){

    /*当超过了一定的距离的时候 */
    if(isMove && (Math.abs(distanceX) > w/3)){
      /*5.当超过了一定的距离的时候    滚动  到上一张 或 下一张  （一定的距离  1/3  屏幕宽度  过渡）*/
      if(distanceX > 0){
        index --;/*向右滑  上一张*/
      }else{
        index ++;/*向左滑 下一张*/
      }
      addTransition();
      setTranslateX(-index * w);
    }
    /*当不超过一定的滑动距离的时候*/
    else {
      /*4.当不超过一定的滑动距离的时候  吸附回去  定位回去     （一定的距离  1/3  屏幕宽度  过渡）*/
      addTransition();
      setTranslateX(-index * w);
    }

    /*重置*/
    startX = 0;
    moveX = 0;
    distanceX = 0;
    isMove = false;

    /*添加定时器*/
    clearInterval(timer);
    timer = setInterval(function(){
      /*箱子滚动*/
      index  ++ ;
      /*定位  过渡来做定位的  这样才有动画*/
      /*加过渡*/
      addTransition();
      /*改变位子*/
      setTranslateX(-index*w);
    },4000);
  });
}


/*



$(function(){
  //自动轮播
  //第一步获取一些必要的值比如索引，屏幕宽度，移动的ul
  //和下面的小圆点
  var index = 1;
  var width = $('body').width();
  var moveUl = $(".banner_imgs");
  var index_li = $(".banner_index li");
  var timeId=setInterval(function(){
    //对index进行累加
    index++;
    //调用移动Ul的方法
    animateMoveUl();
  },2000);
  //封装ul的移动的方法
  var animateMoveUl = function(){
    moveUl.animate({
      "transform":"translate("+index*width*-1+"px)"
    },500,"ease",function(){
      if(index>=4){
        index=1;
        moveUl.css({"transition":"none","transform":"translate("+index*width*-1+"px)"});
      }else if(index<=0){
        index=3;
        moveUl.css({"transition":"none","transform":"translate("+index*width*-1+"px)"});
      }
      index_li.removeClass('current').eq(index-1).addClass('current');
      if(timeId==undefined){
        timeId = setInterval(function(){
          index++;
          animateMoveUl();
        },1000);
      }
    });
  };

  moveUl.swipeRight(function(){
    clearInterval(timeId);
    //这里要记住尽管计时器清楚了但是timeId一直都在
    timeId=undefined;
    index--;
    //调用移动ul的方法
    animateMoveUl();
  });
  moveUl.swipeLeft(function(){
    clearInterval(timeId);
    //这里要记住尽管计时器清楚了但是timeId一直都在
    timeId=undefined;
    index++;
    //调用移动ul的方法
    animateMoveUl();
  });

});
*/


function downTime(){
  /*需要倒计时的时间*/

  var time = 5 * 60 * 60 ;
  var timer = null;

  /*操作dom*/
  var skTime = document.querySelector('.m-countdown');
  /*所有的SPAN*/
  var spans = skTime.querySelectorAll('span');

  timer = setInterval(function(){
    if(time <= 0){
      clearInterval(timer);
      return false;
    }
    time -- ;
    /*格式化*/
    var h = Math.floor(time/3600);
    var m = Math.floor(time%3600/60);
    var s = time%60;


    spans[0].innerHTML = Math.floor(h/10);
    spans[1].innerHTML = h%10;

    spans[2].innerHTML = Math.floor(m/10);
    spans[3].innerHTML = m%10;

    spans[4].innerHTML = Math.floor(s/10);
    spans[5].innerHTML = s%10;

  },1000);

}
