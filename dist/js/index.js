function indexAnima(){
    var cityImg,maskImg,canvasCity,canvasCity_ctx,bodyWidth;
        canvasCity=document.getElementById("city");
        bodyWidth = document.body.clientWidth;
        canvasCity.width = bodyWidth;
        canvasCity.height = bodyWidth;
    canvasCity_ctx=canvasCity.getContext("2d");
    cityImg=new Image();
    cityImg.onload=function(){
        maskImg=new Image();
        maskImg.onload=function(){
            function getDegressMaskData(degress){
                var maskCanvas=document.createElement("canvas");
                maskCanvas.width=canvasCity.width;
                maskCanvas.height=canvasCity.height;
                var maskCanvas_ctx=maskCanvas.getContext("2d"); 
                maskCanvas_ctx.translate(maskCanvas.width/2,maskCanvas.height/2)
                maskCanvas_ctx.rotate(degress*Math.PI/180);
                maskCanvas_ctx.translate(maskCanvas.width/-2,maskCanvas.height/-2)
                maskCanvas_ctx.drawImage(maskImg,0,0,maskImg.width,maskImg.height,0,0,maskCanvas.width,maskCanvas.height);
                //rentrun base 64
                var imgBase64=maskCanvas_ctx.getImageData(0,0,maskCanvas.width,maskCanvas.height);
                maskCanvas_ctx.clearRect(0,0,maskCanvas.width,maskCanvas.height);
                return imgBase64;
            }
            var i=0;
            var index=$(".index");
            function run(){
                if(index.hasClass("current")){
                    canvasCity_ctx.globalCompositeOperation="source-over";
                    var base64=getDegressMaskData(i++);
                    canvasCity_ctx.putImageData(base64,0,0);  
                    canvasCity_ctx.globalCompositeOperation="source-in";
                    canvasCity_ctx.drawImage(cityImg,0,0,cityImg.width,cityImg.height,0,0,canvasCity.width,canvasCity.height);
                }
                requestAnimationFrame(run)

            }
            requestAnimationFrame(run)
        };
        maskImg.src="../img/mask.png";
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
    $(".g_arrow,.view .btn").bind("touchstart",function(){
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
        curIndex=curIndex==-1 ? 3 : curIndex;
        curIndex=curIndex==4 ? 0 : curIndex;
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
            car_list.style.backgroundPosition=num+"% 50%"
        }
        //dataContainerOrientation.innerHTML = 'alpha: ' + alpha + '<br/>beta: ' + beta + '<br />gamma: ' + gamma;
        //dataContainerOrientation.innerHTML = 'alpha: ' + alpha + '<br/>beta: ' + beta + '<br />gamma: ' + gamma;
    }, false);
}


