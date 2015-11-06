$(window).load(function() {
    // Animate loader off screen

    $(".page_load").fadeOut("slow", function() {

    });
});

$(window).resize(function() {
    $('.head_image').css('clip', 'rect(0px,' + $('.head_image').width() + 'px,' + $('.head_image').height() + 'px, 0px)');
    
    //parallax izmēģinājums
    $('.innerImg img').css('width', 30 + 'vw');
    $('.innerImg .layer div').width($('.innerImg img').innerWidth());
    $('.innerImg .layer div').height($('.innerImg img').innerHeight());
    $('.innerImg').css('clip', 'rect(0px,' + $('.innerImg img').innerWidth() + 'px,' + $('.innerImg img').innerHeight() + 'px, 0px)');
    $('.innerImg img').css('width', 40 + 'vw');
    
    setSocialMargin();
    galleryInnerResize();
    picPopupResize();
    textPopupVcenter();
    setVideoSize();
    setButtonMargin();
});

$(document).ready(function() {
    content.draw();

    init();
    $('#sidemenu li.has-sub>a').on('click', function(event) {
        event.stopPropagation();
        $(this).removeAttr('href');
        var element = $(this).parent('li');
        if (element.hasClass('open')) {
            element.removeClass('open');
            element.find('li').removeClass('open');
            element.find('ul').slideUp();
        } else {
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

    var headparallax = document.getElementsByClassName("headparallax");
    var headmotion = new Parallax(headparallax, {
//        scalarX: 6,
        scalarY: 50
    });

    $(document).ready(function() {
        var scene = document.getElementsByClassName("scene");
        parallax = new Parallax(scene, {
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
            afterLoad: function(anchorLink, index) {
                // checkContinue();
            }
        });

        $.fn.fullpage.setMouseWheelScrolling(false);
        setHeadFootSize();
        setVideoSize();
        //colorbox config
        $(document).bind('cbox_load', function() {
            //            disablePageScroll();
            scrollEnabled = false;
        });

        $(document).bind('cbox_closed', function() {
            //            enablePageScroll();
            scrollEnabled = true;
            resetPopupClass();
        });
        updateListeners();
    });

    $(document).on('click', '#menu_toggle', function(event) {
        event.stopPropagation();
        if ($('#sidemenu').css('display') === 'none') {
            $('#sidemenu').css('top', $('#masthead').height());
            $('#sidemenu').slideDown();
        } else {
            $('#sidemenu').slideUp();
        }
    });
    $(document).click(function() {
        var element = $('#sidemenu');
        if (element.css('display') !== 'none') {
            if (element.hasClass('open')) {
                element.removeClass('open');
                element.find('li').removeClass('open');
                element.find('ul').slideUp();
            }
            element.slideUp();
        }
    });

    // click on read more button
    $(document).on('click', '.readmore, .mejs-textform, .humor', function() {
        $("#colorbox").addClass("text_popup");
        $(document).bind('cbox_complete', function() {
            textPopupVcenter();
            $('.citation_logo').show();
            $("#cboxLoadedContent").niceScroll({
                cursoropacitymin: 1
            });
            content.animateObject('#colorbox .popup', 'cardbordTextfadeInDown', 100, 'in'); 
            content.animateObject('#colorbox .citation_logo', 'animMushroom', 300, 'in');             
        });
        $(document).bind('cbox_closed', function() {           
           $('.citation_logo').remove();
        });        
        
    });

    // click on single image icon
    $(document).on('click', '.pic_single', function() {
        $("#colorbox").addClass("pic_popup");
        $('#cboxOverlay').css('top', $('#masthead').height() - 2);

        $titleattr = $(this).attr('title');
        $mapattr = $(this).data('map');
        $(document).bind('cbox_complete', function() {

            if (typeof $titleattr !== typeof undefined && $titleattr !== false) {
                $('#cboxTitle').css('display', 'block');
            } else {
                $('#cboxTitle').css('display', 'none');
            }
            var imgWdt = $('#cboxLoadedContent img').width();
            var imgHgt = $('#cboxLoadedContent img').height();
            console.log(imgWdt);
            $('#cboxLoadedContent img').uberZoom({
                            width: imgWdt,
                            height: imgHgt,
                            navigator : true,
                            navigatorImagePreview : true
                        });  
            
//            $('#cboxLoadedContent .ndd-uberzoom-container').css({'width': imgWdt, 'left': (window.innerWidth-imgWdt)});
            if (typeof $mapattr !== typeof undefined && $mapattr !== false) {
                $('#cboxLoadedContent img').attr('usemap', $mapattr);
                initTags($mapattr);
                if ($.inArray($mapattr, $visitedMaps)===-1){
                
//                window.resizevar = $($mapattr).imageMapResize();
                imageMapResize($mapattr);
                
                $visitedMaps.push($mapattr);
                }
            }

        });

    });

    // click on gallery icon
    $(document).on('click', '.pic_gallery', function() {
        var id = $(this).attr('data-gallery');
        $(id).lightGallery({
            mode: 'lg-slide',
            thumbnail: true,
            closable: false,
            escKey: true,
            appendCounterTo: '.lg-inner',
            download: false,
            toogleThumb: false,
            enableDrag: false,
            mousewheel: false,
            enableThumbSwipe: false
        });
        $(id + ' a').first().trigger('click');
        $(id).on('onBeforeClose.lg', function() {
            scrollEnabled = true;
        });
        
        $(id).on('onSlideItemLoad.lg', function() {
            setTimeout(function(){        
                var imgWdt = $('.lg-current.lg-complete .lg-img-wrap img').width();
                var imgHgt = $('.lg-current.lg-complete .lg-img-wrap img').height();
                $('.lg-current.lg-complete .lg-img-wrap img').uberZoom({
                    width: imgWdt,
                    height: imgHgt,
                    navigator : true,
                    navigatorImagePreview : true,
//                    fullscreen: true,
                    rubberband: false
                });
                //e = jQuery.Event( "DOMMouseScroll",{delta: -650} );
                //$('.lg-current.lg-complete .lg-img-wrap img').on('click', function(){$('.lg-current.lg-complete .lg-img-wrap img').trigger(e);});
                
                if ($('.lg-img-wrap').width() > $('.lg-current.lg-complete .lg-img-wrap img').width())
                    $('.lg-current.lg-complete .ndd-uberzoom-container').css('left', ($('.lg-img-wrap').width()-$('.lg-current.lg-complete .lg-img-wrap img').width())/2);
            }, 500);
        });
         $(id).on('onAfterSlide.lg', function() {
             if ($('.lg-img-wrap').width() > $('.lg-current.lg-complete .lg-img-wrap img').width())
                $('.lg-current.lg-complete .ndd-uberzoom-container').css('left', ($('.lg-img-wrap').width()-$('.lg-current.lg-complete .lg-img-wrap img').width())/2);            
        });
        
        $('.lg-thumb-outer').niceScroll({
            cursoropacitymin: 1
        });

        scrollEnabled = false;
        galleryInnerResize();
    });
    
    //noņem ctx menu
//    document.addEventListener("contextmenu", function(e){
//    e.preventDefault();
//    }, false);
    
    $(document).on('click', '.audio', function() {
        var audio = $('#footer audio');
        if (audio.length) {
            $('#footer audio').get(0).player.remove();
            $('#footer audio').get(0).remove();
        } else {
            $('audio').clone().appendTo('#footer');
            audio = $('#footer audio');
            audio.mediaelementplayer({
                audioWidth: window.innerWidth,
                audioHeight: footHeight * 0.7
            });
            $('.mejs-container').append('<button id="close">close</button>');
            $('.mejs-container #close').click(function() {
                $('#footer audio').get(0).player.remove();
                $('#footer audio').get(0).remove();
            });
            $('.mejs-currenttime-container').appendTo('.mejs-time-rail');
            $('.mejs-duration-container').appendTo('.mejs-time-rail');
            $('.mejs-inner').prepend('<p>' + $('#footer audio').data('title') + '</p>');
            $('.mejs-inner').append('<a href="#audio-text" class="mejs-textform cboxElement">Teksta formā</a>');
            $('.mejs-textform').css('margin-top', ($('.mejs-container').height() - $('.mejs-textform').height())/2);

//            var pad = ($('.mejs-container').height() - 10 - $('.mejs-textform').height()) / 2;
//            $('.mejs-textform').css('padding', pad + 'px 0px');

            updateListeners();

            audio.trigger("play");
        }
    });


    $(document).on('click', '#bigmore', function() {
        //        transition_out();
        $.fn.fullpage.moveSectionDown();
        // checkContinue();
    });

}


function resetPopupClass() {
    $("#colorbox").removeAttr('class');
    $("#cboxWrapper").removeAttr('class');
    $("#cboxContent").removeAttr('class');
    $("#cboxLoadedContent").removeAttr('class');
}

//pielabo soctīklu pogu pozīcijas, lai tās būtu līnijas vidū
function setSocialMargin() {
    var ulOffset = $('.head_image_bot .social li').height() - $('.head_image_bot').height();
    ulOffset /= -2;
    $('.head_image_bot .social').css('margin-top', ulOffset);
}

function textPopupVcenter() {
    var cbox = $('#colorbox');
    if (cbox) {
        var cboxHgt = cbox.height();
        var wHgt = window.innerHeight;
        var headerOffset = $('#masthead').height();
        if (cboxHgt > wHgt * 0.8) {
            var cboxTop = headerOffset + 25;
        } else {
            var cboxTop = headerOffset + (wHgt - headerOffset - cboxHgt) / 2;
        }
        $('#cboxOverlay').css('top', headerOffset - 2);
        $('#colorbox').css('top', cboxTop);
        $('.popup').css('width', $('#cboxLoadedContent').width() / 10 * 9);
    }
}

function galleryInnerResize() {
    $('.lg-outer').css('top', $('#masthead').height());
    $('.lg-backdrop').css('top', $('#masthead').height() - 5);
    var min = Math.min(window.innerHeight, window.innerWidth);
    //    var side = min/100 * 37;
    var side = min / 100 * 3 + $('.lg-thumb-outer').width();
    var container = $('.lg').width();
    var inner = container - side;
    $('.lg-inner').css('width', inner);
    
    $('#lg-counter').css('line-height', $('#lg-counter').height() + "px");
    
    //attēla zooma lietas
    var imgElem = $('.lg-current.lg-complete .lg-img-wrap');
    if ($(imgElem).find('img').width() >= $(imgElem).find('img').height()){
        var imgWdt = imgElem.width();
        $('.lg-current .ndd-uberzoom-container').width(imgWdt);
        $('.lg-current .ndd-uberzoom-content').width(imgWdt);
        var imgHgt = $(imgElem).find('img').height();
        $('.lg-current .ndd-uberzoom-container').height(imgHgt);
        $('.lg-current .ndd-uberzoom-content').height(imgHgt);
    }
    else {
        var imgHgt = imgElem.height();
        $('.lg-current .ndd-uberzoom-container').height(imgHgt);
        $('.lg-current .ndd-uberzoom-content').height(imgHgt);
        var imgWdt = $(imgElem).find('img').width();
        $('.lg-current .ndd-uberzoom-container').width(imgWdt);
        $('.lg-current .ndd-uberzoom-content').width(imgWdt);
    }
    
    
    if ($('.lg-img-wrap').width() > $('.lg-current.lg-complete .lg-img-wrap img').width())
        $('.lg-current .ndd-uberzoom-container').css('left', ($('.lg-img-wrap').width()-$('.lg-current.lg-complete .lg-img-wrap img').width())/2);
}

function picPopupResize(){
    var imgElem = $('#cboxLoadedContent');
            var imgHgt = imgElem.height();
            $('.lg-current .ndd-uberzoom-container').height(imgHgt);
            $('.lg-current .ndd-uberzoom-content').height(imgHgt);
    
}

function setHeadFootSize(divide) {
    $('#masthead').css('height', $('#masthead').height());
    $('.top_bar a img').css('height', $('#masthead').height() / 7 * 5);
    $('.top_bar a img').css('margin-top', $('#masthead').height() / 7);
    $('#menu_toggle').css('margin-top', ($('#masthead').height()-$('#menu_toggle').height())/2);

    window.footHeight = $('#footer').height();
    $('#footer').css('height', footHeight);

    if(divide) $('.head_image').css('height', $('#masthead').height());
    else $('.head_image').css('height', $('#masthead').height()*2);
    $('.head_image_bot').css('height', $('.head_image_bot').height());

    $('.head_image').css('top', $('.site-header').height() - $('.head_image').height() / 100 * 1);
    $('.head_image_bot').css('top', $('#masthead').height() + $('.head_image').height() - $('.head_image').height() / 100 * 3);
    
    $('.head_image').css('clip', 'rect(0px,' + $('.head_image').width() + 'px,' + $('.head_image').height() + 'px, 0px)');

    window.headTotal = $('#masthead').height() + $('.head_image').height() + $('.head_image_bot').height();
    $('.scene').css('top', $('#masthead').height());
}

function setVideoSize() {
    $('.video-content').css('top', $('.head_image_bot').position().top + $('.head_image_bot').height() - $('#masthead').height());

    $('.video-content').css('height', window.innerHeight - $('.head_image_bot').position().top - $('#footer').height() - $('.head_image_bot').height());

    $('.video-content').css('top', $('.head_image').height());

//    $('.video-content').css('height', window.innerHeight - $('#footer').height() - $('#masthead').height());


    $('.video').css('height', $('.video-content').height() - $('.video-content div').height()*1.5);
    //    $('.video-content div').css('height', $('.video-content').height()-40);
}

function initTags(mapname) {
    if ($('#pictag').length <= 0)
        $('#cboxLoadedContent').append('<div id="pictag"></div>');
    $('#pictag').hide();

    $(mapname + ' area').each(
        function() {
            $(this).mouseover(function() {
                if($('.ndd-uberzoom-main-image').width() === $('.ndd-uberzoom-container').width()){
                var name = $(this).data('name');
                var coords = $(this).attr('coords').split(',');
                var top = parseInt(coords[3]);
                var left = parseInt(coords[0]) + (parseInt(coords[2]) - parseInt(coords[0])) / 2 + (window.innerWidth - $('#cboxLoadedContent img').width()) / 2;

                $('#pictag').text(name);
                $('#pictag').css('top', top);
                $('#pictag').css('left', left);
                $('#pictag').show();
                }
            });

            $(this).mouseout(function() {
                $('#pictag').hide();
            });
        }
    );

}

function updateListeners() {
    $('a.readmore, a.mejs-textform, a.humor').colorbox({
        inline: true,
        scrolling: false
    });
    $('a.pic_single').colorbox({
        photo: true
    });
}

function setButtonMargin() {
    //objektu ikonas
    $('.icon_midleft, .icon_midright, .icon_topmid, .icon_botleft, .icon_botmid, .icon_belowtopright').css({
        'margin-left': -$('.obj_icon').width() / 2,
        'margin-top': -$('.obj_icon').height() / 2
    });
    
    //footera socpogas un "Turpināt"
    $('#footer .social').css('margin-top', -$('#footer .social li').height()/2);
    $('#continue').css('margin-top', -$('#continue').height()/2);
    
    //"Lasīt vairāk"
    var readmore = $('.readmore.right');
    var readparent = readmore.parent();
    
    readmore.css('margin-left', readparent.width()-readmore.width());
    
    //citāta pēdiņas
//    $('.citation_logo').css({
//        'margin-top': -$('.citation_logo').height()/2,
//        'margin-left': $('.citation_logo').parent().width()/2-$('.citation_logo').width()/2
//    });
}