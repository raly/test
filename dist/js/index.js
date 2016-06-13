/*
 * Tween.js
 * t: current time（当前时间）
 * b: beginning value（初始值）
 * c: change in value（变化量）
 * d: duration（持续时间）
*/
var Tween = {
    Linear: function(t, b, c, d) { return c*t/d + b; },
    Quad: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOut: function(t, b, c, d) {
            return -c *(t /= d)*(t-2) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t-2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return c * ((t = t/d - 1) * t * t + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t*t + b;
            return c / 2*((t -= 2) * t * t + 2) + b;
        }
    },
    Quart: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t*t + b;
        },
        easeOut: function(t, b, c, d) {
            return -c * ((t = t/d - 1) * t * t*t - 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t*t - 2) + b;
        }
    },
    Quint: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return c * ((t = t/d - 1) * t * t * t * t + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2*((t -= 2) * t * t * t * t + 2) + b;
        }
    },
    Sine: {
        easeIn: function(t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOut: function(t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOut: function(t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t/d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function(t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOut: function(t, b, c, d) {
            return (t==d) ? b + c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function(t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function(t, b, c, d) {
            return c * Math.sqrt(1 - (t = t/d - 1) * t) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function(t, b, c, d, a, p) {
            var s;
            if (t==0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == "undefined") p = d * .3;
            if (!a || a < Math.abs(c)) {
                s = p / 4;
                a = c;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOut: function(t, b, c, d, a, p) {
            var s;
            if (t==0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == "undefined") p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c; 
                s = p / 4;
            } else {
                s = p/(2*Math.PI) * Math.asin(c/a);
            }
            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
        },
        easeInOut: function(t, b, c, d, a, p) {
            var s;
            if (t==0) return b;
            if ((t /= d / 2) == 2) return b+c;
            if (typeof p == "undefined") p = d * (.3 * 1.5);
            if (!a || a < Math.abs(c)) {
                a = c; 
                s = p / 4;
            } else {
                s = p / (2  *Math.PI) * Math.asin(c / a);
            }
            if (t < 1) return -.5 * (a * Math.pow(2, 10* (t -=1 )) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p ) * .5 + c + b;
        }
    },
    Back: {
        easeIn: function(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOut: function(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            return c * ((t = t/d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOut: function(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158; 
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2*((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn: function(t, b, c, d) {
            return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
        },
        easeOut: function(t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        easeInOut: function(t, b, c, d) {
            if (t < d / 2) {
                return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
            } else {
                return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        }
    }
}
Math.tween = Tween;
function indexAnima(){
    var cityImg,maskImg_out,maskImg_inner,canvasCity,canvasCity_ctx,canvasCity_ctx1,bodyWidth;
        canvasCity=document.getElementById("city");
        canvasCity1=document.getElementById("city1");
        bodyWidth = document.body.clientWidth;
        canvasCity.width=canvasCity1.width = bodyWidth;
        canvasCity.height=canvasCity1.height = bodyWidth;
    canvasCity_ctx=canvasCity.getContext("2d");
    canvasCity_ctx1=canvasCity1.getContext("2d");
    cityImg=new Image();
    cityImg.onload=function(){
        maskImg_out=new Image();
        maskImg_out.onload=function(){
          maskImg_inner=new Image();
          maskImg_inner.onload=function(){
              function getDegressMaskData(img,degress){
                  var maskCanvas=document.createElement("canvas");
                  maskCanvas.width=canvasCity.width;
                  maskCanvas.height=canvasCity.height;
                  var maskCanvas_ctx=maskCanvas.getContext("2d"); 
                  maskCanvas_ctx.translate(maskCanvas.width/2,maskCanvas.height/2)
                  maskCanvas_ctx.rotate(degress*Math.PI/180);
                  maskCanvas_ctx.translate(maskCanvas.width/-2,maskCanvas.height/-2)
                  maskCanvas_ctx.drawImage(img,0,0,img.width,img.height,0,0,maskCanvas.width,maskCanvas.height);
                  //rentrun base 64
                  var imgBase64=maskCanvas_ctx.getImageData(0,0,maskCanvas.width,maskCanvas.height);
                  maskCanvas_ctx.clearRect(0,0,maskCanvas.width,maskCanvas.height);
                  return imgBase64;
              }
              var i=-30;
              var z=30;
              var index=$(".index");

              var status1=true;
              var status2=true;
              var start = 0,start2 =0, during = 60;
              var top;
              var top2;
              function run(){
                  if(index.hasClass("current")){
                      //canvasCity_ctx
                      canvasCity_ctx.globalCompositeOperation="source-over";
                      start++;
                      
                      if(i==-30){status1=true;start = 0;}else if(i==30){status1=false;start = 0;};
                      // status1 ? (i++) : (i--);
                      if(status1){
                        ++i;
                        top = Tween.Quart.easeInOut(start, i,30-i, 100);
                      }else{
                        --i;
                         
                        top = Tween.Quart.easeInOut(start, i,i+30, 100);
                      }
                      
                      
                      console.log(status1+"^^^^^"+top)
                      var base64=getDegressMaskData(maskImg_out,top);
                      canvasCity_ctx.putImageData(base64,0,0);  
                      canvasCity_ctx.globalCompositeOperation="source-in";
                      canvasCity_ctx.drawImage(cityImg,0,0,cityImg.width,cityImg.height,0,0,canvasCity.width,canvasCity.height);
                      //canvasCity_ctx1
                       canvasCity_ctx1.globalCompositeOperation="source-over";
                      if(z==30){status1=true;start2 = 0;}else if(z==-30){status1=false;start2 = 0;};
                      start2++;
                      if(status1){
                        --z;
                        top2 = Tween.Quart.easeInOut(start, z,30+z, 100);
                      }else{
                        ++z;
                        top2 = Tween.Quart.easeInOut(start, z,30-z, 100);
                      } 
                      var base64=getDegressMaskData(maskImg_inner,top2);
                      canvasCity_ctx1.putImageData(base64,0,0);  
                      canvasCity_ctx1.globalCompositeOperation="source-in";
                      canvasCity_ctx1.drawImage(cityImg,0,0,cityImg.width,cityImg.height,0,0,canvasCity1.width,canvasCity1.height);
                      
                  }
                  requestAnimationFrame(run)

              }
              requestAnimationFrame(run);
            }
            //over
            maskImg_inner.src="../img/mask_inner.png";
        };
        maskImg_out.src="../img/mask_out.png";
    }
    cityImg.src="../img/city.jpg";
}





/*************loading***************/

//包装预加载的资源
var progress=$(".loading-line");
var g_loading=$("#g_loading");
var progress_num=g_loading.find(".num");
var loading_car=g_loading.find(".loading-car");
var page_resources =[
  "../img/mask.png",
  "../img/shadow.png",
  "../img/circleA.png",
  "../img/circleB.png",
  "../img/circleC.png",
  "../img/city.jpg",
  "../img/index-sbde0b052c5.png",
  "../img/1-car.png",
  "../img/car_list.png",
  "../img/2-car.png",
  "../img/3-car.png",
  "../img/4-car.png",
  "../img/1-man.png",
  "../img/2-man.png",
  "../img/3-man.png",
  "../img/4-man.png",
  "../img/1-sub.png",
  "../img/2-sub.png",
  "../img/3-sub.png",
  "../img/4-sub.png",
  "../img/1-wrap.png",
  "../img/2-wrap.png",
  "../img/3-wrap.png",
  "../img/4-wrap.png"
];
setTimeout(function(){
    new mo.Loader(page_resources,{
        onLoading : function(count,total){
          //加载的百分比
          var percent=Math.ceil(count*100/total)+"%";
          progress_num.text(percent);
          progress.css("width",percent);
          loading_car.css("left",percent);
        },
        onComplete : function(time){
          //加载完毕会回调，有失败资源，同样会执行此回调
            setTimeout(function(){g_loading.remove();initPage();},200)
        }
    });
},3000)





function  initPage(){
    //翻页
    var tab1 = new mo.PageSlide({
      target: $('#slide li')
    });
    tab1.on("change",function(){
        $('#slide li').eq(this.curPage).addClass("anima").siblings().removeClass("anima");
    })
    $(".view .btn").bind("touchstart",function(){
        tab1.next();
    })
    //index  交互
    $(".index").addClass("anima");
    //canvas 动画
    setTimeout(function(){
        indexAnima();
    },800)
    //model-show-page 交互
    var msp=$(".model-show-page");
    var car_arrow_left=msp.find(".car_arrow_left");
    var car_arrow_right=msp.find(".car_arrow_right");
    // var model1=msp.find(".model1");
    // var model2=msp.find(".model2");
    // var model3=msp.find(".model3");
    // var model4=msp.find(".model4");
    var curIndex=0;
    function refreshModel(){
        curIndex=curIndex==-1 ? 2 : curIndex;
        curIndex=curIndex==3 ? 0 : curIndex;
        msp.find(".model-wrap").eq(curIndex).addClass("show").siblings().removeClass("show");
        msp.find(".model-wrap").removeClass("show-con");
    }
    car_arrow_left.bind("touchstart",function(){curIndex--;refreshModel()})
    car_arrow_right.bind("touchstart",function(){curIndex++;refreshModel()})
    msp.find(".add-icon").bind("touchstart",function(){
        if(!$(this).parent().hasClass("show-con")){
            $(this).parent().addClass("show-con").siblings().removeClass("show-con");
        }else{
            $(this).parent().removeClass("show-con")
        }
    })

}




//查看汽车
var dataContainerOrientation = document.getElementById('dataContainerOrientation');
var view=$(".view");
var car_list=document.getElementById("car_list");
if(window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function(event) {
        var alpha = event.alpha;
        var beta = event.beta;
        var gamma = event.gamma;
        //if(alpha!=null || beta!=null || gamma!=null){}
        if(gamma!=null && view.hasClass("current")){
            var num=(gamma-0+50);
            num=num>100? 100 :num;
            num=num<0? 0 : num;
            car_list.style.backgroundPosition=Math.floor(num)+"% 50%"
        }
        //dataContainerOrientation.innerHTML = 'alpha: ' + alpha + '<br/>beta: ' + beta + '<br />gamma: ' + gamma;
        //dataContainerOrientation.innerHTML = 'alpha: ' + alpha + '<br/>beta: ' + beta + '<br />gamma: ' + gamma;
    }, false);
}


