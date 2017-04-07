/**
 * ITCAST WEB
 * Created by zhousg on 2016/12/25.
 */

/*页面所有资源*/
/*window.onload = function(){}*/
/*页面文档加载完*/
$(function(){
    /*轮播图*/
    banner();
});


/*轮播图*/
var banner = function(){
    /*
    * 1.从后台获取  模拟数据  两种图片的地址  [{pc:'',m:''},{},{},{}]
    * 2.判断当前设备 移动端  还是 非移动端   当前设备的宽度 768px
    * 3.根据当前设备去渲染页面  （把数据转换成html格式的字符串添加到页面当中）
    * 3.1 动态创建元素
    * 3.2 js拼接字符串
    * 3.3 模版引擎渲染  新的方式  underscore.template();
    *
    * 4.测试 改变页面尺寸的时候要求动态渲染页面  resize
    *
    * 5.移动端触摸滑动  touch touchstart touchmove touchend touchcancel
    * */

    /*1.从后台获取*/
    var data = [
        {pcImage:'images/slide_01_2000x410.jpg',mImage:'images/slide_01_640x340.jpg'},
        {pcImage:'images/slide_02_2000x410.jpg',mImage:'images/slide_02_640x340.jpg'},
        {pcImage:'images/slide_03_2000x410.jpg',mImage:'images/slide_03_640x340.jpg'},
        {pcImage:'images/slide_04_2000x410.jpg',mImage:'images/slide_04_640x340.jpg'},
    ];

    /*定义一个渲染方法*/
    var renderHtml = function(){
        /*2.判断当前设备*/
        var width = $(window).width();
        var isMobile = width < 768 ? true : false;

        /*3.根据当前设备去渲染页面*/
        /*3.3 模版引擎渲染*/

        /*template使用步骤*/
        /*1.数据*/
        /*2.准备模版*/
        /*3.模版的字符串 通过template 转换成模版函数*/
        var templatePointFuc = _.template($('#template_point').html());
        var templateImageFuc = _.template($('#template_image').html());

        /*4.调用这个函数传入准备额json数据  返回html格式的字符串*/
        var htmlPoint = templatePointFuc({model:data});
        //console.log(htmlPoint);
        var htmlImage = templateImageFuc({model:data,isM:isMobile});
        //console.log(htmlImage);
        /*5.渲染*/
        $('.carousel-indicators').html(htmlPoint);
        $('.carousel-inner').html(htmlImage);

    }

    /*4.测试*/
    $(window).on('resize',function(){
        renderHtml();
    }).trigger('resize');

    /*5.移动端 手势切换*/
    /*originalEvent 代表的是touchEvent*/

    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    var isMove = false;

    $('.wjs_banner')
        .on('touchstart',function(e){
            startX = e.originalEvent.touches[0].clientX;
        })
        .on('touchmove',function(e){
            moveX = e.originalEvent.touches[0].clientX;
            distanceX = moveX - startX;
            isMove = true;
        })
        .on('touchend',function(e){
            /*手势的条件*/
            /*必须滑动过*/
            /*滑动的距离50px*/
            if(isMove && Math.abs(distanceX) > 50){
                if(distanceX > 0){
                    /*右滑*/
                    /*上一张*/
                    $('#carousel-example-generic').carousel('prev');
                }else{
                    /*左滑*/
                    /*下一张*/
                    $('#carousel-example-generic').carousel('next');
                }
            }

            /*重置参数*/
            startX = 0;
            moveX = 0;
            distanceX = 0;
            isMove = false;

        });

};