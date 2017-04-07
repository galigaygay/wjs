/**
 * ITCAST WEB
 * Created by zhousg on 2016/12/25.
 */

/*ҳ��������Դ*/
/*window.onload = function(){}*/
/*ҳ���ĵ�������*/
$(function(){
    /*�ֲ�ͼ*/
    banner();
});


/*�ֲ�ͼ*/
var banner = function(){
    /*
    * 1.�Ӻ�̨��ȡ  ģ������  ����ͼƬ�ĵ�ַ  [{pc:'',m:''},{},{},{}]
    * 2.�жϵ�ǰ�豸 �ƶ���  ���� ���ƶ���   ��ǰ�豸�Ŀ�� 768px
    * 3.���ݵ�ǰ�豸ȥ��Ⱦҳ��  ��������ת����html��ʽ���ַ�����ӵ�ҳ�浱�У�
    * 3.1 ��̬����Ԫ��
    * 3.2 jsƴ���ַ���
    * 3.3 ģ��������Ⱦ  �µķ�ʽ  underscore.template();
    *
    * 4.���� �ı�ҳ��ߴ��ʱ��Ҫ��̬��Ⱦҳ��  resize
    *
    * 5.�ƶ��˴�������  touch touchstart touchmove touchend touchcancel
    * */

    /*1.�Ӻ�̨��ȡ*/
    var data = [
        {pcImage:'images/slide_01_2000x410.jpg',mImage:'images/slide_01_640x340.jpg'},
        {pcImage:'images/slide_02_2000x410.jpg',mImage:'images/slide_02_640x340.jpg'},
        {pcImage:'images/slide_03_2000x410.jpg',mImage:'images/slide_03_640x340.jpg'},
        {pcImage:'images/slide_04_2000x410.jpg',mImage:'images/slide_04_640x340.jpg'},
    ];

    /*����һ����Ⱦ����*/
    var renderHtml = function(){
        /*2.�жϵ�ǰ�豸*/
        var width = $(window).width();
        var isMobile = width < 768 ? true : false;

        /*3.���ݵ�ǰ�豸ȥ��Ⱦҳ��*/
        /*3.3 ģ��������Ⱦ*/

        /*templateʹ�ò���*/
        /*1.����*/
        /*2.׼��ģ��*/
        /*3.ģ����ַ��� ͨ��template ת����ģ�溯��*/
        var templatePointFuc = _.template($('#template_point').html());
        var templateImageFuc = _.template($('#template_image').html());

        /*4.���������������׼����json����  ����html��ʽ���ַ���*/
        var htmlPoint = templatePointFuc({model:data});
        //console.log(htmlPoint);
        var htmlImage = templateImageFuc({model:data,isM:isMobile});
        //console.log(htmlImage);
        /*5.��Ⱦ*/
        $('.carousel-indicators').html(htmlPoint);
        $('.carousel-inner').html(htmlImage);

    }

    /*4.����*/
    $(window).on('resize',function(){
        renderHtml();
    }).trigger('resize');

    /*5.�ƶ��� �����л�*/
    /*originalEvent �������touchEvent*/

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
            /*���Ƶ�����*/
            /*���뻬����*/
            /*�����ľ���50px*/
            if(isMove && Math.abs(distanceX) > 50){
                if(distanceX > 0){
                    /*�һ�*/
                    /*��һ��*/
                    $('#carousel-example-generic').carousel('prev');
                }else{
                    /*��*/
                    /*��һ��*/
                    $('#carousel-example-generic').carousel('next');
                }
            }

            /*���ò���*/
            startX = 0;
            moveX = 0;
            distanceX = 0;
            isMove = false;

        });

};