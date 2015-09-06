$(window).load(function() {
    // Animate loader off screen
    $(".page_load").fadeOut("slow");
});

$(window).resize(function() {
    setSocialMargin();
    galleryInnerResize();
    textPopupVcenter();
});

$(document).ready(function() {
    init();
    $('#sidemenu li.has-sub>a').on('click', function(){
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
window.scrollEnabled = false;

function init() {
    setSocialMargin();
    
    var scene = document.getElementsByClassName("scene");
    parallax = new Parallax(scene,{        
        scalarX: 10,
        scalarY: 7
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
            anchors:[
                'main', 'main-2',
                'menu-main', 'menu-origin',
                'family-intro', 'family-stradins', 'family-items', 'family-humour', 'family-video', 'family-generations', 'family-generations-2'
            ],
            afterLoad: function(anchorLink, index){
            checkContinue();
            }

        });
        $.fn.fullpage.setMouseWheelScrolling(false);
        setHeadFootSize();
        //colorbox config
        $(document).bind('cbox_load', function(){
            disablePageScroll();
        });
        
        $(document).bind('cbox_closed', function(){
            enablePageScroll();
            resetPopupClass();
        });
        
        $('a.readmore').colorbox({inline:true, scrolling: false}); 
        $('a.pic_single').colorbox({photo:true});
    });
    
    $(document).on('click', '#menu_toggle', function(){
        if($('#sidemenu').css('display')==='none'){
            $('#sidemenu').css('top',$('#masthead').height());        
            $('#sidemenu').slideDown();            
        }
        else{
             $('#sidemenu').slideUp();
        }
    });
    
    $(document).on('click', '.readmore', function(){
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
         $(document).bind('cbox_complete', function(){
                $('#cboxLoadedContent img').attr('zoom','');
                initZoom();
        }); 
        $(document).bind('cbox_cleanup', function(){
                $('#cboxLoadedContent img').removeAttr('zoom');
        }); 
    });
    
    $(document).on('click', '.pic_gallery', function(){
        var id = $(this).attr('data-gallery');
        $(id).lightGallery({
            mode: 'lg-fade',
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
            enablePageScroll();
        });
        $('.lg-thumb-outer').niceScroll({
            cursoropacitymin: 1
        });
        $('.lg-sub-html').niceScroll({
            cursoropacitymin: 1
        });
        disablePageScroll();
        galleryInnerResize();
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
    
    $(document).keydown(function(e) {
        switch (e.which) {
            case 38: // up
                //            transition_out();
                if(scrollEnabled){
                $.fn.fullpage.moveSectionUp();
                $(".main_text_single:first").bind('oanimationend animationend webkitAnimationEnd', function() {

                    //                transition_in();
                });}
                break;
            case 40: // down
                //            transition_out();
                if(scrollEnabled){
                $.fn.fullpage.moveSectionDown();
                $(".main_text_single:first").bind('oanimationend animationend webkitAnimationEnd', function() {

                    //                transition_in();
                });}
                break;

            default:
                return; // exit this handler for other keys
        }
        checkContinue();
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });
    
    
    enablePageScroll();  
}

window.enablePageScroll = function(){    
    $(window).bind('mousewheel DOMMouseScroll', function(event) {
        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
            //            transition_out();
            $.fn.fullpage.moveSectionUp();
            $(".main_text_single:first").bind('oanimationend animationend webkitAnimationEnd', function() {

                //                transition_in();
            });
        } else {
            //            transition_out();
            $.fn.fullpage.moveSectionDown();
            $(".main_text_single:first").bind('oanimationend animationend webkitAnimationEnd', function() {

                //                transition_in();
            });
        }
        checkContinue();
        event.preventDefault();
        event.stopPropagation();
    });

    scrollEnabled = true;
};

function disablePageScroll(){
    $(window).unbind('mousewheel DOMMouseScroll');
    scrollEnabled = false;
}

function resetPopupClass(){
    $("#colorbox").removeAttr('class');
    $("#cboxWrapper").removeAttr('class');
    $("#cboxContent").removeAttr('class');
    $("#cboxLoadedContent").removeAttr('class');
}

function transition_out() {
    var outroR = document.getElementsByClassName("anim-right");
    var outroL = document.getElementsByClassName("anim-left");
    var outroU = document.getElementsByClassName("anim-up");
    for (var j = 0; j < 4; j++) {
        for (var i = 0; i < outroR.length; i++) {
            var newone = outroR[i].cloneNode(true);
            newone.className = outroR[i].className + "-rev";
            outroR[i].parentNode.replaceChild(newone, outroR[i]);
        }
        for (var k = 0; k < outroL.length; k++) {
            var newone = outroL[k].cloneNode(true);
            newone.className = outroL[k].className + "-rev";
            outroL[k].parentNode.replaceChild(newone, outroL[k]);
        }
        for (var l = 0; l < outroU.length; l++) {
            var newone = outroU[l].cloneNode(true);
            newone.className = outroU[l].className + "-rev";
            outroU[l].parentNode.replaceChild(newone, outroU[l]);
        }
    }

}

function transition_in() {
    var introR = document.getElementsByClassName("anim-right-rev");
    var introL = document.getElementsByClassName("anim-left-rev");
    var introU = document.getElementsByClassName("anim-up-rev");
    for (var j = 0; j < 5; j++) {
        for (var i = 0; i < introR.length; i++) {
            var newone = introR[i].cloneNode(true);
            newone.className = introR[i].className.slice(0, -4);
            introR[i].parentNode.replaceChild(newone, introR[i]);
        }
        for (var k = 0; k < introL.length; i++) {
            var newone = introL[k].cloneNode(true);
            newone.className = introL[k].className.slice(0, -4);
            introL[k].parentNode.replaceChild(newone, introL[k]);
        }
        for (var l = 0; l < introU.length; l++) {
            var newone = introU[l].cloneNode(true);
            newone.className = introU[l].className.slice(0, -4);
            introU[l].parentNode.replaceChild(newone, introU[l]);
        }
    }
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
    }
    else $('#footer .social').css('display', 'block');
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
        console.log(cboxTop);
        $('#cboxOverlay').css('top', headerOffset); 
        $('#colorbox').css('top', cboxTop);
        $('.popup').css('width', $('#cboxLoadedContent').width()/10*9);
    }
}

function galleryInnerResize(){
    $('.lg-outer').css('top', $('#masthead').height());
    $('.lg-backdrop').css('top', $('#masthead').height());
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
    $('.top_bar a img').css('margin', $('#masthead').height()/7);
    $('#footer').css('height', $('#footer').height());
    $('.head_image').css('height', $('.head_image').height());
    $('.head_image_bot').css('height', $('.head_image_bot').height());
}