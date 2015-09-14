$(window).load(function() {
    // Animate loader off screen
    
    $(".page_load").fadeOut("slow", function(){

    });
});

$(window).resize(function() {
    setSocialMargin();
    galleryInnerResize();
    textPopupVcenter();
    setVideoSize();
});

$(document).ready(function() {
    content.draw();
    
    init();
    $('#sidemenu li.has-sub>a').on('click', function(event){
        event.stopPropagation();
		$(this).removeAttr('href');
		var element = $(this).parent('li');
		if (element.hasClass('open')) {
			element.removeClass('open');
			element.find('li').removeClass('open');
			element.find('ul').slideUp();
		}
		else {
			element.addClass('open');
			element.children('ul').slideDown();
			element.siblings('li').children('ul').slideUp();
			element.siblings('li').removeClass('open');
			element.siblings('li').find('li').removeClass('open');
			element.siblings('li').find('ul').slideUp();
		}
	});
});

//globālie mainīgie
window.parallax = null;
window.scrollEnabled = true;

function init() {
    setSocialMargin();
    
    var scene = document.getElementsByClassName("scene");
    parallax = new Parallax(scene,{        
        scalarX: 10,
        scalarY: 7
    });
    
    var headparallax = document.getElementsByClassName("headparallax");
    parallax = new Parallax(headparallax,{        
        scalarX: 6,
        scalarY: false
    });

    $(document).ready(function() { 
        var scene = document.getElementsByClassName("scene");
        parallax = new Parallax(scene,{        
        scalarX: 10,
        scalarY: 7
    });
        
        $('#fullpage').fullpage({
            scrollingSpeed: 0,
            keyboardScrolling: false,
//            anchors:[
//                'main', 'main-2',
//                'menu-main', 'menu-origin',
//                'family-intro', 'family-stradins', 'family-items', 'family-humour', 'family-video', 'family-generations', 'family-generations-2',
//                'study-intro', 'study-medicine', 'study-medicine-2', 'study-social'
//            ],
            afterLoad: function(anchorLink, index){
                checkContinue();
            }
        });

        $.fn.fullpage.setMouseWheelScrolling(false);
        setHeadFootSize();
        setVideoSize();
        //colorbox config
        $(document).bind('cbox_load', function(){
//            disablePageScroll();
            scrollEnabled = false;
        });
        
        $(document).bind('cbox_closed', function(){
//            enablePageScroll();
            scrollEnabled=true;
            resetPopupClass();
        });      
        updateListeners();
    });
    
    $(document).on('click', '#menu_toggle', function(event){
        event.stopPropagation();
        if($('#sidemenu').css('display')==='none'){
            $('#sidemenu').css('top',$('#masthead').height());        
            $('#sidemenu').slideDown();            
        }
        else{
             $('#sidemenu').slideUp();
        }
    });
    $(document).click(function(){
        var element=$('#sidemenu');
        if (element.css('display') !== 'none'){
            if (element.hasClass('open')) {
			element.removeClass('open');
			element.find('li').removeClass('open');
			element.find('ul').slideUp();
		}
        element.slideUp();}
    });
    
    $(document).on('click', '.readmore, .mejs-textform', function(){
        $("#colorbox").addClass("text_popup");
        $(document).bind('cbox_complete', function(){
                textPopupVcenter();
                $("#cboxLoadedContent").niceScroll({
                    cursoropacitymin: 1
                });
        });        
    });
    
     $(document).on('click', '.pic_single', function(){ 
         $("#colorbox").addClass("pic_popup");
         $('#cboxOverlay').css('top', $('#masthead').height()-2);
         
            $titleattr = $(this).attr('title');
            $mapattr = $(this).data('map');
            $(document).bind('cbox_complete', function(){

                 if (typeof $titleattr !== typeof undefined && $titleattr !== false) {
                            $('#cboxTitle').css('display', 'block');
                 }
                 else{
                     $('#cboxTitle').css('display', 'none');
                 }

                  if (typeof $mapattr !== typeof undefined && $mapattr !== false) {
                            $('#cboxLoadedContent img').attr('usemap', $mapattr);                    
                            $($mapattr).imageMapResize();
                            initTags($mapattr);                     
                 }
            }); 
            $(document).bind('cbox_cleanup', function(){
              $('.zoomImg').trigger('zoom.destroy');
            });
 
    });
    
    $(document).on('click', '.pic_gallery', function(){
        var id = $(this).attr('data-gallery');
        $(id).lightGallery({
            mode: 'lg-slide',
            thumbnail:true,
            closable: false,
            escKey: true,
            appendCounterTo: '.lg-inner',
            download: false,
            toogleThumb: false,
            enableDrag: false,
            mousewheel: false,
            enableThumbSwipe: false
        });
        $(id+' a').first().trigger('click');
        
        $(id).on('onBeforeClose.lg',function(){
            $('.zoomImg').trigger('zoom.destroy');
            scrollEnabled = true;
        });
        $(id).on('onSlideItemLoad.lg',function(){
            $('.lg-current.lg-complete .lg-img-wrap').zoom({ 
                on:'click' ,
                magnify: 0.8,
                onZoomIn: function(){$(this).css('cursor', 'crosshair');},
                onZoomOut: function(){$(this).css('cursor', 'zoom-in');}
            });  
        });
        $('.lg-thumb-outer').niceScroll({
            cursoropacitymin: 1
        });
        
        scrollEnabled = false;
        galleryInnerResize();
    });
    
    $(document).on('click', '.audio', function() {
        var audio = $('#footer audio');
        if (audio.length){
            $('#footer audio').get(0).player.remove();
            $('#footer audio').get(0).remove();
        }
        else {        
        $('audio').clone().appendTo('#footer');
        audio = $('#footer audio');
        audio.mediaelementplayer({
            audioWidth: window.innerWidth,
            audioHeight: footHeight*0.7
        });
        $('.mejs-container').append('<button id="close">close</button>');
        $('.mejs-container #close').click(function() {
             $('#footer audio').get(0).player.remove();
            $('#footer audio').get(0).remove();
        });
        $('.mejs-currenttime-container').appendTo('.mejs-time-rail');
        $('.mejs-duration-container').appendTo('.mejs-time-rail');
        $('.mejs-inner').prepend('<p>'+$('#footer audio').data('title')+'</p>');
        $('.mejs-inner').append('<a href="#audio-text" class="mejs-textform cboxElement">Teksta formā</a>');
        
        var pad = ($('.mejs-container').height() -10 - $('.mejs-textform').height())/2;
        $('.mejs-textform').css('padding', pad + 'px 0px');        
       
        updateListeners();
        
        audio.trigger("play");
        }
    });
    
    
    $(document).on('click', '#bigmore', function() {
        //        transition_out();
        $.fn.fullpage.moveSectionDown();
        checkContinue();
    });

    $(document).on('click', '#continue', function() {
        //        transition_out();
        $.fn.fullpage.moveSectionDown();
        checkContinue();
        $(".main_text_single:first").bind('oanimationend animationend webkitAnimationEnd', function() {

            //            transition_in();
        });
    });
    
}


function resetPopupClass(){
    $("#colorbox").removeAttr('class');
    $("#cboxWrapper").removeAttr('class');
    $("#cboxContent").removeAttr('class');
    $("#cboxLoadedContent").removeAttr('class');
}

//pielabo soctīklu pogu pozīcijas, lai tie būtu līnijas vidū
function setSocialMargin() {
    var ulOffset = $('.head_image_bot .social').height();
    var headbar = $('.head_image_bot div').height();
    if (headbar === 0) {
        headbar = window.innerHeight / 100 * 1.04;
    }
    ulOffset /= -2;
    ulOffset += headbar / 2;
    $('.head_image_bot .social').css('margin-top', ulOffset);
}

//pārbauda, vai vajag paslēpt "turpināt" pogu
function checkContinue(){
    var index =$('.active').prevAll().length;
    if(index===0 || index ===2 || index ===3 || index === 10){
        $('#continue').css('display', 'none');
    }
    else $('#continue').css('display', 'block');
    
    if(index!==0){
        $('#footer .social').css('display', 'none');
        // $('.head_image, .head_image_bot').css('display', 'block');
    }
    else {$('#footer .social').css('display', 'block');
        // $('.head_image, .head_image_bot').css('display', 'none');
    }
}

function textPopupVcenter(){
    var cbox = $('#colorbox');
    if (cbox){
        var cboxHgt = cbox.height();
        var wHgt = window.innerHeight;
        var headerOffset = $('#masthead').height();
        if(cboxHgt>wHgt*0.8){
            var cboxTop = headerOffset + 25;
        }
        else{
            var cboxTop = headerOffset + (wHgt - headerOffset - cboxHgt) / 2;
        }
        $('#cboxOverlay').css('top', headerOffset-2); 
        $('#colorbox').css('top', cboxTop);
        $('.popup').css('width', $('#cboxLoadedContent').width()/10*9);
    }
}

function galleryInnerResize(){
    $('.lg-outer').css('top', $('#masthead').height());
    $('.lg-backdrop').css('top', $('#masthead').height()-2);
    var min = Math.min(window.innerHeight, window.innerWidth);
//    var side = min/100 * 37;
    var side = min/100 * 3 + $('.lg-thumb-outer').width();
    var container = $('.lg').width();
    var inner = container - side;
    $('.lg-inner').css('width', inner);
}

function setHeadFootSize(){
    $('#masthead').css('height', $('#masthead').height());
    $('.top_bar a img').css('height', $('#masthead').height()/7*5);
    $('.top_bar a img').css('margin-top', $('#masthead').height()/7);
    
    window.footHeight = $('#footer').height();
    $('#footer').css('height', footHeight);
    
    $('.head_image').css('height', $('.head_image').height());
    $('.head_image_bot').css('height', $('.head_image_bot').height());
    
    $('.head_image').css('top', $('.site-header').height() - $('.head_image').height()/100*1);
    $('.head_image_bot').css('top', $('#masthead').height() - $('.head_image').height()/100*3);
    
    window.headTotal = $('#masthead').height() + $('.head_image').height() + $('.head_image_bot').height();
    $('.scene').css('top', $('#masthead').height());
}

function setVideoSize(){
    $('.video-content').css('top', $('.head_image_bot').position().top + $('.head_image_bot').height() - $('#masthead').height());
    
    $('.video-content').css('height', window.innerHeight - $('.head_image_bot').position().top - $('#footer').height() - $('.head_image_bot').height());
   
    
    $('.video').css('height', $('.video-content').height()-60);
//    $('.video-content div').css('height', $('.video-content').height()-40);
}

function initTags(mapname){
    if($('#pictag').length<=0)
    $('#cboxLoadedContent').append('<div id="pictag"></div>');
    
    $(mapname + ' area').each(
        function() {
                 $(this).mouseover(function() {                    
                    var name = $(this).data('name');
                    var coords = $(this).attr('coords').split(',');
                    var top = parseInt(coords[3]);
                    var left = parseInt(coords[0])+(parseInt(coords[2]) - parseInt(coords[0]))/2 + (window.innerWidth - $('#cboxLoadedContent img').width())/2;
                    
                    $('#pictag').text(name);
                    $('#pictag').css('top', top);
                    $('#pictag').css('left', left);
                    $('#pictag').show();
                });
                
                $(this).mouseout(function() {
                    $('#pictag').hide();
                });
            }
    );
        
}

function updateListeners(){
    $('a.readmore, a.mejs-textform').colorbox({inline:true, scrolling: false}); 
        $('a.pic_single').colorbox({photo:true});
}