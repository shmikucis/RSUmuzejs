$(window).load(function() {
    // Animate loader off screen
    setTimeout(function(){

        $(".page_load").fadeOut("slow", function(){
            $('#mid1').addClass('growUp'); 
            setTimeout( function(){ $('#mid2').addClass('growDown'); }, 500); 
            $('#fore1').addClass('fadeInUp'); 
            $('#fore2').addClass('fadeInUp2');  
            $('#fore3').addClass('fadeInDown');  
            $('#bigmore').addClass('fadeInUp2');   

            setTimeout( function(){ $($('#footer .social').children()[0]).addClass('animMushroom'); }, 500);
            setTimeout( function(){ $($('#footer .social').children()[1]).addClass('animMushroom'); }, 700);
            setTimeout( function(){ $($('#footer .social').children()[2]).addClass('animMushroom'); }, 900);
        });    


        $('#bigmore').bind('click', function(){
            $('#mid1').addClass('shrinkDown'); 
            $('#mid2').addClass('shrinkUp'); 
            $('#fore1').addClass('fadeOutDown'); 
            $('#fore2').addClass('fadeOutDown');  
            $('#fore3').addClass('fadeOutUp');  
            $('#bigmore').addClass('removeZoomIn'); 
            $('#background').addClass('fadeOut'); 

            setTimeout( function(){ $($('#footer .social').children()[0]).addClass('animMushroomOut'); }, 100);
            setTimeout( function(){ $($('#footer .social').children()[1]).addClass('animMushroomOut'); }, 300);
            setTimeout( function(){ $($('#footer .social').children()[2]).addClass('animMushroomOut'); }, 500);

            setTimeout(secondPage, 1000);
        });

    // }, 1000);
    }, 1000);


    function secondPage(){
        $.fn.fullpage.moveSectionDown();
        checkContinue(); // loads next page

        $('#stripes').addClass('growDown');
        $('#cardboard').addClass('jumpIn');
        setTimeout( function(){ $('#cardboard img').addClass('animMushroom'); }, 450);
        $('#cardboard p').addClass('cardbordTextfadeInDown');
        $('#head_image_bot').addClass('headerLineDrop');
        $('.anim-up').addClass('headImgFadeIn');
        $('#continue').addClass('fadeInUp2');
        setTimeout( function(){ $($('#head_image_bot ul li').children()[0]).addClass('animMushroom'); }, 800);
        setTimeout( function(){ $($('#head_image_bot ul li').children()[1]).addClass('animMushroom'); }, 1000);
        setTimeout( function(){ $($('#head_image_bot ul li').children()[2]).addClass('animMushroom'); }, 1200);
    }

});

$(window).resize(function() {
    setSocialMargin();
    $.colorbox.resize();
});

$(document).ready(function() {
    init();
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

    // checkContinue();

        $.fn.fullpage.setMouseWheelScrolling(false);
        
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
    
    $(document).on('click', '.readmore', function(){
        $("#colorbox").addClass("text_popup");
        $(document).bind('cbox_complete', function(){
                $("#cboxLoadedContent").niceScroll({
                    cursoropacitymin: 1
                });
        });        
    });
    
     $(document).on('click', '.pic_single', function(){ 
         $("#colorbox").addClass("pic_popup");    
    });
    
    $(document).on('click', '.pic_gallery', function(){
        var id = $(this).attr('data-gallery');
        $(id).lightGallery({
            thumbnail:true,
            closable: false
        });
        $(id+' a').first().trigger('click');
    });
    
    
    // $(document).on('click', '#bigmore', function() {
    //     //        transition_out();
    //     $.fn.fullpage.moveSectionDown();
    //     checkContinue();
    // });

    // $(document).on('click', '#continue', function() {
    //     //        transition_out();
    //     $.fn.fullpage.moveSectionDown();
    //     checkContinue();
    //     $(".main_text_single:first").bind('oanimationend animationend webkitAnimationEnd', function() {

    //         //            transition_in();
    //     });
    // });
    
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

function enablePageScroll(){    
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
}

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
    var ulOffset = $('#head_image_bot .social').height();
    var headbar = $('#head_image_bot div').height();
    if (headbar === 0) {
        headbar = window.innerHeight / 100 * 1.04;
    }
    ulOffset /= -2;
    ulOffset += headbar / 2;
    $('#head_image_bot .social').css('margin-top', ulOffset);
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

