//globālie mainīgie
window.parallax = null;
window.scrollEnabled = true;
window.singleSlide = false;
window.isMobile = null;
$(window).load(function() {
    // Animate loader off screen
    function preload(arrayOfImages) {
        $(arrayOfImages).each(function() {
            $('<img />').attr('src', this).appendTo('body').hide();
        });
    }

    preload([
        URLS.stylesheet + '/images/ui/readmore_big.png', URLS.stylesheet + '/images/ui/aboutvid.png', URLS.stylesheet + '/images/ui/archive.png', URLS.stylesheet + '/images/ui/audio.png', URLS.stylesheet + '/images/ui/citation.png', URLS.stylesheet + '/images/ui/closer.png', URLS.stylesheet + '/images/ui/continue.png', URLS.stylesheet + '/images/ui/draugiem.png', URLS.stylesheet + '/images/ui/fb.png', URLS.stylesheet + '/images/ui/gallery.png', URLS.stylesheet + '/images/ui/gallery_control.png', URLS.stylesheet + '/images/ui/gallery_counter.png', URLS.stylesheet + '/images/ui/gallery_loading.gif', URLS.stylesheet + '/images/ui/gplus.png', URLS.stylesheet + '/images/ui/header_pattern.png', URLS.stylesheet + '/images/ui/humor.png', URLS.stylesheet + '/images/ui/line_pattern.png', URLS.stylesheet + '/images/ui/menu_toggle.png', URLS.stylesheet + '/images/ui/navtree_bg.png', URLS.stylesheet + '/images/ui/navtree_bg1.png', URLS.stylesheet + '/images/ui/navtree_end.png', URLS.stylesheet + '/images/ui/objects.png', URLS.stylesheet + '/images/ui/popup_close.png', URLS.stylesheet + '/images/ui/readmore.png', URLS.stylesheet + '/images/ui/readmore_big.png', URLS.stylesheet + '/images/ui/slideout_bg.png', URLS.stylesheet + '/images/ui/slideout_bg_flip.png', URLS.stylesheet + '/images/ui/twitter.png'
    ]);

    // console.log(URLS.stylesheet);

    $(".page_load").fadeOut("slow", function() {

    });
});

$(window).resize(function() {

    isMobile = mobilecheck();
    //parallax izmēģinājums
    if (!isMobile) {
        $('.head_image').css('clip', 'rect(0px,' + $('.head_image').width() + 'px,' + $('.head_image').height() + 'px, 0px)');
        setInnerImg();
        setSocialMargin();
        galleryInnerResize();
        picPopupResize();
        textPopupVcenter();
        setVideoSize();
        setButtonMargin();
        if (dynamicContent.getItem().template === "templates/video.php") setHeadFootSize(true);
        else setHeadFootSize(false);
        if (dynamicContent.getItem().template === "templates/searchResults.php") resizeSrcRes();
    } else {
        mContinue();
        if($('div.text_container_right').length>0) $('div.text_container_right').css('left', $('.mcit img').width());
        else $('p.text_right').css('left', $('.mcit img').width());
        
        $('.readmore.right').css('left', $('.mcit img').width() + $(window).width()*0.2);
        if($('div.text_container_left').length>0)  $('.alignright').css('margin-left', $('div.text_container_left').width());
        else $('.alignright').css('margin-left', $('p.text_left').width());
        $("#m_srchbtn, .mclose, #mback").css("margin", ($('#masthead').height() - $('#m_srchbtn').height()) / 2);
        $("#menutext").css('width', $(window).width() - $('#m_srchbtn').outerWidth(true) * 2);
    }
});

$(document).ready(function() {
    isMobile = mobilecheck();
    content.draw();

    if (!isMobile) {
        $('#mfooter').hide();
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
    } else {
        setTimeout(function() {
            mInit();
        }, 500);
        $('#msidemenu div').on('click', function(event) {
            event.stopPropagation();
            //$(this).removeAttr('href');
            var element = $(this).parent('li');
            if (element.hasClass('open')) {
                element.removeClass('open');
                element.find('li').removeClass('open');
                element.find('ul').slideUp();
                $(this).blur();
            } else {
                element.addClass('open');
                element.children('ul').slideDown();
                element.siblings('li').children('ul').slideUp();
                element.siblings('li').removeClass('open');
                element.siblings('li').find('li').removeClass('open');
                element.siblings('li').find('ul').slideUp();
            }
        });
    }


});

function init() {
    setSocialMargin();
    var headparallax = document.getElementsByClassName("headparallax");
    var headmotion = new Parallax(headparallax, {
        scalarY: 50
    });

    $(document).ready(function() {

        var scene = document.getElementsByClassName("scene");
        parallax = new Parallax(scene, {
            scalarX: 10,
            scalarY: 7
        });

        setHeadFootSize();
        setVideoSize();
        $(document).bind('cbox_load', function() {
            scrollEnabled = false;
        });

        $(document).bind('cbox_closed', function() {
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
    $(document).on('click', '.readmore, .mejs-textform, .humortext.cboxElement', function() {
        $("#colorbox").addClass("text_popup");
        //$('#cboxOverlay').css('opacity', 0.8);
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
        //        $('#cboxOverlay').css('top', $('#masthead').height() - 2);
        //$('#cboxOverlay').css('opacity', 1);

        $titleattr = $(this).attr('title');
        $mapattr = $(this).data('map');
        $(document).bind('cbox_complete', function() {
            $('#colorbox.pic_popup .citation_logo').remove();
            if (typeof $titleattr !== typeof undefined && $titleattr !== false) {
                $('#cboxTitle').css('display', 'block');
            } else {
                $('#cboxTitle').css('display', 'none');
            }
            var imgWdt = $('#cboxLoadedContent img').width();
            var imgHgt = $('#cboxLoadedContent img').height();
            $('#cboxLoadedContent img').uberZoom({
                width: imgWdt,
                height: imgHgt,
                navigator: true,
                navigatorImagePreview: true,
                rubberband: false
            });
            if (typeof $mapattr !== typeof undefined && $mapattr !== false) {
                $('#cboxLoadedContent img').attr('usemap', $mapattr);
                initTags($mapattr);
                if ($.inArray($mapattr, $visitedMaps) === -1) {

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
            setTimeout(function() {
                var imgWdt = $('.lg-current.lg-complete .lg-img-wrap img').width();
                var imgHgt = $('.lg-current.lg-complete .lg-img-wrap img').height();
                $('.lg-current.lg-complete .lg-img-wrap img').uberZoom({
                    width: imgWdt,
                    height: imgHgt,
                    navigator: true,
                    navigatorImagePreview: true,
                    rubberband: false
                });
                //e = jQuery.Event( "DOMMouseScroll",{delta: -650} );
                //$('.lg-current.lg-complete .lg-img-wrap img').on('click', function(){$('.lg-current.lg-complete .lg-img-wrap img').trigger(e);});

                //                if ($('.lg-img-wrap').width() > $('.lg-current.lg-complete .lg-img-wrap img').width())
                //                    $('.lg-current.lg-complete .ndd-uberzoom-container').css('left', ($('.lg-img-wrap').width()-$('.lg-current.lg-complete .lg-img-wrap img').width())/2);
                $('.lg-current .ndd-uberzoom-container').css("max-width", $('.lg-img-wrap').width());
                $('.lg-current .ndd-uberzoom-container').css("max-height", $('.lg-img-wrap').height());
            }, 500);
        });
        $(id).on('onAfterSlide.lg', function() {
            //             if ($('.lg-img-wrap').width() > $('.lg-current.lg-complete .lg-img-wrap img').width())
            //                $('.lg-current.lg-complete .ndd-uberzoom-container').css('left', ($('.lg-img-wrap').width()-$('.lg-current.lg-complete .lg-img-wrap img').width())/2);    
            $('.lg-current .ndd-uberzoom-container').css("max-width", $('.lg-img-wrap').width());
            $('.lg-current .ndd-uberzoom-container').css("max-height", $('.lg-img-wrap').height());
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
        var id = $(this).attr('data-gallery');
        if (audio.length && '#' + audio.attr('id') === id) {
            $('#footer audio').get(0).player.remove();
            $('#footer audio').get(0).remove();
        } else {
            if (audio.length) {
                $('#footer audio').get(0).player.remove();
                $('#footer audio').get(0).remove();
            }
            $(id).clone().appendTo('#footer');
            audio = $('#footer audio');
            audio.mediaelementplayer({
                audioWidth: window.innerWidth,
                audioHeight: footHeight * 0.7,
                success: function (mediaElement, domObject) {
                    // call the play method
                    mediaElement.play();

                }
            });
            $('.mejs-container').append('<button id="close">close</button>');
            $('.mejs-container #close').click(function() {
                $('#footer audio').get(0).player.remove();
                $('#footer audio').get(0).remove();
            });
            $('.mejs-currenttime-container').appendTo('.mejs-time-rail');
            $('.mejs-duration-container').appendTo('.mejs-time-rail');
            $('.mejs-inner').prepend('<p>' + $('#footer audio').data('title') + '</p>');
            if (id !== "#kolektivi-audio2") {
                $('.mejs-inner').append('<a href="' + id + '-text" class="mejs-textform cboxElement">Teksta formā</a>');
            } else {
                $(".mejs-controls").css("width", 80 + "%");
                $(".mejs-inner p").css({
                    "left": "15%",
                    "width": "70%",
                    "font-size": "8pt",
                    "margin-top": "2px"
                });
            }
            $('.mejs-textform').css('margin-top', ($('.mejs-container').height() - $('.mejs-textform').height()) / 2);

            //            var pad = ($('.mejs-container').height() - 10 - $('.mejs-textform').height()) / 2;
            //            $('.mejs-textform').css('padding', pad + 'px 0px');

            updateListeners();

//            audio.trigger("play");
        }
    });
}

function mInit() {
    mContinue();

    $("#menu_toggle").remove();
    //    $("#masthead").append('<div id="mback"></div><div id="m_srchbtn"></div><div id="menuclose" style="display: none"></div>');
    $("#m_srchbtn, .mclose, #mback, #search").css("margin", ($('#masthead').height() - $('#m_srchbtn').height()) / 2);
    $('#search').css('margin-right', $('#m_srchbtn').width() + parseInt($('#m_srchbtn').css('margin-right')));
    $('#searchfield').height($('#m_srchbtn').height());
    $("#masthead").append('<div id="menutext" style="display: none">MENU</div>');
    $('#mback').on('click', function() {
        if (content.history.length > 1) {
            content.history.pop();
            var backUrl = content.history.pop();
            if (isMobile && backUrl === dynamicContent.getNext().post_name)
                backUrl = dynamicContent.getPrev().post_name;
            content.drawFromUrl(backUrl);
        } else {
            var item = dynamicContent.getItem();
            if (item.menu_order > 1) {
                item = dynamicContent.getPrev();
                content.draw(item);
            }
        }
    });
    $('#m_socbtn').on('click', m_showSocial);
    $('#m_menubtn').on('click', m_showMenu);
    $('#menuclose').on('click', m_closeMenu);
    $('#m_srchbtn').on('click', m_toggleSearch);

    $(document).bind('cbox_closed', function() {
            resetPopupClass();
        });
    $(document).on('click', '.readmore, .mejs-textform, .humortext.cboxElement, .pic_single', function() {        
        
        var popupBtn = $(this);        
            
        if(popupBtn.hasClass('pic_single')){
            $("#colorbox").addClass("pic_popup");
            $titleattr = $(this).attr('title');
        }
        else $("#colorbox").addClass("text_popup");
        
        $(document).bind('cbox_complete', function() {
            if($('.pictoolbar').length>0){
                //$('#pictoolbar').remove();
                var div = $('.pictoolbar')[0];
                div.parentNode.removeChild(div);
                $('#cboxTitle').html("");
            }
            $('.citation_logo').show();
            if (popupBtn.hasClass('gallery')){
                $('.citation_logo').attr('id', 'galicon');
            }
            else if (popupBtn.hasClass('archive')){
                $('.citation_logo').attr('id', 'archicon');
            }
            else if (popupBtn.hasClass('objects')){
                $('.citation_logo').attr('id', 'objicon');
            }
            else if (popupBtn.hasClass('humor')){
                $('.citation_logo').attr('id', 'humicon');
            }
            else if (popupBtn.hasClass('closer')){
                $('.citation_logo').attr('id', 'cloicon');
            }
            if(popupBtn.hasClass('pic_single')){
                $('#cboxWrapper').append('<div class="pictoolbar"><div class="zoom zoomin"></div><div class="showtext"></div></div>');
                var text = $('#cboxTitle').html();
                $('#cboxTitle').html("");
                $('#cboxTitle').append('<div>'+$titleattr+'</div><div class="mclose"></div>');
                
                $('#cboxTitle').css('display', 'none');
            if (typeof $titleattr === typeof undefined && $titleattr === false) {
                $('#showtext').css('display', 'none');
                }    
            $('.showtext').on('click', function(){
                $('#cboxTitle').css('display', 'block');
                $('.pictoolbar').css('display', 'none');
                $('.pic_popup#colorbox #cboxTitle .mclose').one('click', function(){
                    $('#cboxTitle').css('display', 'none');
                    $('.pictoolbar').css('display', 'block');
                });
            });     
            var imgWdt = $('#cboxLoadedContent img').width();
            var imgHgt = $('#cboxLoadedContent img').height();
            $('#cboxLoadedContent img').uberZoom({
                width: imgWdt,
                height: imgHgt,
                navigator: false,
                navigatorImagePreview: false,
                rubberband: false
            });
            }
            
            else{           
                if(popupBtn.hasClass('aboutvid')){
                     $('.citation_logo').attr('id', 'vidicon');
//                     $('#cboxLoadedContent #vidicon').remove();
                    var div = $('#cboxLoadedContent #vidicon')[0];
                    div.parentNode.removeChild(div);
                }
                if(popupBtn.hasClass('mejs-textform')){
                     $('.citation_logo').attr('id', 'audicon');
                     $('#cboxLoadedContent').css('max-height','70vh');
                }
            
            //            content.animateObject('#colorbox .popup', 'cardbordTextfadeInDown', 100, 'in'); 
            //            content.animateObject('#colorbox .citation_logo', 'animMushroom', 300, 'in');      
            }
        });
        $(document).bind('cbox_closed', function() {
//            $('.citation_logo').remove();
            var div = document.getElementsByClassName('citation_logo')[0];
                if(div) div.parentNode.removeChild(div);
            $('.citation_logo').removeAttr('id');
            if($('#cboxContent audio').length>0){
                $('#cboxContent audio').get(0).player.remove();
//                $('#cboxContent audio').get(0).remove();
                var div = $('#cboxContent audio')[0];
                div.parentNode.removeChild(div);
                $('#cboxLoadedContent').css('max-height','75vh');
            }            
        });
    });
    
    $(document).on('click', '.audio', function() {
        var audio;
        var id = $(this).attr('data-gallery');
            $(id).clone().prependTo('#cboxContent');
            audio = $('#cboxContent audio');
            audio.mediaelementplayer({
                audioWidth: window.innerWidth,
                audioHeight: $('#masthead').height(),
                features: ['playpause','progress','current','duration'],
                 success: function (mediaElement, domObject) {
                    // call the play method
                    mediaElement.play();

                }
            });
            $('.mejs-currenttime-container').appendTo('.mejs-time-rail');
            $('.mejs-duration-container').appendTo('.mejs-time-rail');
                $('.mejs-inner').append('<a href="' + id + '-text" class="mejs-textform cboxElement" style="display: none;">Teksta formā</a>');
                $(".mejs-controls").css({
                    "width": $(window).width()-parseInt($('#m_srchbtn').css('margin-left'))*2,
                    "height": $('#m_srchbtn').height(),
                    "margin": parseInt($('#m_srchbtn').css('margin-left'))
                });
                $(".mejs-controls .mejs-button button, .mejs-container .mejs-controls div").css({
                    "height": $('#m_srchbtn').height(),
                    "width": $('#m_srchbtn').height(),
                    "background-size": $('#m_srchbtn').height() + "px " + $('#m_srchbtn').height()*2 + "px",
                });
                $('.mejs-time-rail').css({
                    'margin': $('#m_srchbtn').css('margin-left'),
                    'height': $('#m_srchbtn').height()/2
                });
                $('.mejs-time').css({
                    'width': $('.mejs-controls').width()-$('#m_srchbtn').outerWidth(true),
                    'right': $('#m_srchbtn').css('margin-left')
                });
                 $('.mejs-time > :nth-child(2)').remove();
                //$('.mejs-time-total.mejs-time-slider').width($('.mejs-controls').width()-$('#m_srchbtn').width()-$('#m_srchbtn').css('margin'));
            $('.mejs-textform').css('margin-top', ($('.mejs-container').height() - $('.mejs-textform').height()) / 2);
            m_updateListeners();

            //audio.play();
            $('.mejs-inner a').trigger('click');
//        }
    });
    
    $(document).on('click', '.pic_gallery', function() {
        var id = $(this).attr('data-gallery');
        var popupBtn = $(this);
        $(id).lightGallery({
            mode: 'lg-fade',
            thumbnail: false,
            closable: false,
            escKey: false,
            appendCounterTo: '.lg-inner',
            download: false,
            enableTouch: true,
            controls: false
        });
        $(id + ' a').first().trigger('click');
        $(id).on('onBeforeClose.lg', function() {
            scrollEnabled = true;
        });

        $('.lg-outer').prepend('<div class="citation_logo"></div>');
        if (popupBtn.hasClass('gallery')){
                $('.citation_logo').attr('id', 'galicon');
            }
            else if (popupBtn.hasClass('archive')){
                $('.citation_logo').attr('id', 'archicon');
            }
            else if (popupBtn.hasClass('objects')){
                $('.citation_logo').attr('id', 'objicon');
            }
            else if (popupBtn.hasClass('humor')){
                $('.citation_logo').attr('id', 'humicon');
            }
            else if (popupBtn.hasClass('closer')){
                $('.citation_logo').attr('id', 'cloicon');
            }
        $('.lg-close').detach().appendTo($('.lg-backdrop.in'));
        var div = $('.pictoolbar')[0];
        if(div) div.parentNode.removeChild(div);
        $('.lg').append('<div class="pictoolbar"><div class="zoom zoomin"></div><div class="showtext"></div></div>');
        $('#lg-counter').insertAfter('div.pictoolbar .zoom');
        $('#lg-counter').css('margin-left', $('.pictoolbar').width()/3 + ($('.pictoolbar').width() - $('.pictoolbar div').width()*3)/4);        
        $('.showtext').on('click', function(){
                $('.lg-sub-html').css('display', 'block');
                $('.pictoolbar').css('display', 'none');
                $('.lg-sub-html .mclose').one('click', function(){
                    $('.lg-sub-html').css('display', 'none');
                    $('.pictoolbar').css('display', 'block');
                });
            });    
            
        $(id).on('onSlideItemLoad.lg', function() {
            setTimeout(function() {
                var imgWdt = $('.lg-current.lg-complete .lg-img-wrap img').width();
                var imgHgt = $('.lg-current.lg-complete .lg-img-wrap img').height();
                $('.lg-current.lg-complete .lg-img-wrap img').uberZoom({
                    width: imgWdt,
                    height: imgHgt,
                    navigator: false,
                    navigatorImagePreview: false,
                    rubberband: false
                });
                $('.lg-current .ndd-uberzoom-container').css("max-width", $('.lg-img-wrap').width());
                $('.lg-current .ndd-uberzoom-container').css("max-height", $('.lg-img-wrap').height());
            }, 500);
        });
        $(id).on('onAfterSlide.lg', function() {
            $('.lg-current .ndd-uberzoom-container').css("max-width", $('.lg-img-wrap').width());
            $('.lg-current .ndd-uberzoom-container').css("max-height", $('.lg-img-wrap').height());
                     
        });
        $(id).on('onAfterAppendSubHtml.lg', function(){
            if($('lg-sub-html div').length<=0) $('.lg-sub-html').append('<div></div><div class="mclose"></div>');
            var text = $(".lg-sub-html").contents().filter(function(){ 
              return this.nodeType == 3; 
            });
            $('.lg-sub-html div:first').text(text[0].nodeValue);
            text[0].nodeValue = "";   
        })

        //galleryInnerResize();
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
}

function picPopupResize() {
    var imgElem = $('#cboxLoadedContent');
    var imgHgt = imgElem.height();
    $('.lg-current .ndd-uberzoom-container').height(imgHgt);
    $('.lg-current .ndd-uberzoom-content').height(imgHgt);

}

function setHeadFootSize(divide) {
    //    $('#masthead').css('height', $('#masthead').height());
    $('.top_bar a object').css('height', $('#masthead').height() / 7 * 5);
    $('.top_bar a object').css('margin-top', $('#masthead').height() / 7);
    $('#menu_toggle').css('margin-top', ($('#masthead').height() - $('#menu_toggle').height()) / 2);
    $('#search').css('margin-top', ($('#masthead').height() - $('#search').height()) / 2);
    //$('#searchfield').css('margin-top', ($('#search').height()-$('#searchfield').height())/2);
    $('#searchbutton').height($('#searchfield').height());
    $('#searchbutton').css('margin-top', ($('#search').height() - $('#searchbutton').height()) / 2);


    window.footHeight = $('#footer').height();
    $('#footer').css('height', footHeight);

    if (divide) $('.head_image').css('height', $('#masthead').height());
    else $('.head_image').css('height', $('#masthead').height() * 2);
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


    $('.video').css('height', $('.video-content').height() - $('.video-content div').height() * 1.5);
    //    $('.video-content div').css('height', $('.video-content').height()-40);
}

function initTags(mapname) {
    if ($('#pictag').length <= 0)
        $('#cboxLoadedContent').append('<div id="pictag"></div>');
    $('#pictag').hide();

    $(mapname + ' area').each(
        function() {
            $(this).mouseover(function() {
                if ($('.ndd-uberzoom-main-image').width() === $('.ndd-uberzoom-container').width()) {
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
    $('a.readmore, a.mejs-textform, a.humortext.cboxElement').colorbox({
        inline: true,
        scrolling: false
    });
    $('a.pic_single').colorbox({
        photo: true
    });
}

function m_updateListeners() {
    $("#mfooter #bigmore, #mcontinue").bind("click", function() {
        if (!singleSlide) content.drawNext();
    });

    $('a.readmore, a.mejs-textform, a.humortext.cboxElement').colorbox({
        transition: 'none',
        inline: true,
        scrolling: false,
        returnFocus: false,
        ovarlayClose: false
    });
    $('a.pic_single').colorbox({
        transition: 'none',
        scrolling: false,
        returnFocus: false,
        ovarlayClose: false,
        width: $('#fullpage').width(),
        height: $('#fullpage').height(),
        initialWidth: $('#fullpage').width(),
        initialHeight: $('#fullpage').height(),
        maxWidth: 1,
        maxHeight: 1
//        photo: true
//        reposition: false
    });
}

function setButtonMargin() {
    //objektu ikonas
    $('.icon_midleft, .icon_midright, .icon_topmid, .icon_botleft, .icon_botmid, .icon_belowtopright, .icon_botright, .icon_topleft, .icon_topright, .icon_belowtopleft').css({
        'margin-left': -$('.obj_icon').width() / 2,
        'margin-top': -$('.obj_icon').height() / 2
    });

    //footera socpogas un "Turpināt"
    $('#footer .social').css('margin-top', -$('#footer .social li').height() / 2);
    $('#continue').css('margin-top', -$('#continue').height() / 2);
    $('#backToMenu').css('margin-top', -$('#backToMenu').height() / 2);
    $('#navCircle span').css('top', -$('#navCircle span').height() / 2);

    //"Lasīt vairāk"
    if (!isMobile) {
        var readmore = $('.readmore.right');
        var readparent = readmore.parent();

        readmore.css('margin-left', readparent.width() - readmore.width());
    }

    //citāta pēdiņas
    //    $('.citation_logo').css({
    //        'margin-top': -$('.citation_logo').height()/2,
    //        'margin-left': $('.citation_logo').parent().width()/2-$('.citation_logo').width()/2
    //    });
}

function setInnerImg() {
    if ($('.innerImg img').hasClass('wide')) {
        $('.innerImg img').css('width', 30 + 'vw');
        $('.innerImg .layer div').width($('.innerImg img').innerWidth());
        $('.innerImg .layer div').height($('.innerImg img').innerHeight());
        $('.innerImg').css('clip', 'rect(0px,' + $('.innerImg img').innerWidth() + 'px,' + $('.innerImg img').innerHeight() + 'px, 0px)');
        $('.innerImg img').css('width', 40 + 'vw');
    } else if ($('.innerImg img').hasClass('narrow')) {
        $('.innerImg img').css('width', 20 + 'vw');
        $('.innerImg .layer div').width($('.innerImg img').innerWidth());
        $('.innerImg .layer div').height($('.innerImg img').innerHeight());
        $('.innerImg').css('clip', 'rect(0px,' + $('.innerImg img').innerWidth() + 'px,' + $('.innerImg img').innerHeight() + 'px, 0px)');
        $('.innerImg img').css('width', 30 + 'vw');
    } else if ($('.innerImg img').hasClass('vwide')) {
        $('.innerImg img').css('width', 37 + 'vw');
        $('.innerImg .layer div').width($('.innerImg img').innerWidth());
        $('.innerImg .layer div').height($('.innerImg img').innerHeight());
        $('.innerImg').css('clip', 'rect(0px,' + $('.innerImg img').innerWidth() + 'px,' + $('.innerImg img').innerHeight() + 'px, 0px)');
        $('.innerImg img').css('width', 47 + 'vw');
    }
    $('.innerImg').parent().width($('.innerImg .layer div').width());
    $('.innerImg').parent().height($('.innerImg .layer div').height());

}

function resizeSrcRes() {
    var yPos = $('.searchresults')[0].getBoundingClientRect().top;
    var footHgt = $(footer).height();
    var bodyHgt = $('body').height();
    $('.searchresults').css('max-height', bodyHgt - yPos - footHgt);
}

window.mobilecheck = function() {
    if (window.orientation) return true;
    var check = false;
    (function(a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
    })(navigator.userAgent || navigator.vendor || window.opera);

    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        check = true;
    }
    if (check) $("#styleswitch").attr("href", URLS.stylesheet + "/mobile.css");
    else $("#styleswitch").attr("href", "");
    return check;
};

function mContinue() {
    $("#mfooter #bigmore, #m_social, #mcontinue").css("margin-left", ($(window).width() - $("#mfooter #bigmore, #m_social, #mcontinue").width()) / 2);
    $('#m_social ul').css({
        'margin-left': ($('#m_social').width() - $('#m_social ul li').width() * 4) / 2,
        "margin-top": ($('#m_social').height() - $('#m_social ul').height()) / 2
    });
    $("div.top_bar").css("left", ($(window).width() - $("#header_logo").width()) / 2);
}

function m_showSocial() {
    if ($('#mfooter #bigmore, #mcontinue').css('display') === 'inline-block') {
        $('#mfooter #bigmore, #mcontinue').hide();
        $('#m_social').css('display', 'inline-block');
    } else {
        $('#m_social').hide();
        $('#mfooter #bigmore, #mcontinue').css('display', 'inline-block');
        $('#m_socbtn').blur();
    }
}

function m_showMenu() {
    event.stopPropagation();
    $('#msidemenu').css("left", "0vw");
    //$('#msidemenu').css("transform", "translate(0vw, 0)");
    //        $('#msidemenu').css({            
    //            '-webkit-transform': 'translate(0vw, 0)',
    //            '-moz-transform': 'translate(0vw, 0)',
    //            '-o-transform': 'translate(0vw, 0)',
    //            'transform': 'translate(0vw, 0)'
    //        });

    $('#m_srchbtn').hide();
    $('#menuclose').show();
    $('#logo_link').hide();
    $('#menutext').show();
    $("#menutext").css('width', $(window).width() - $('#m_srchbtn').outerWidth(true) * 2);
    //$("#menutext").css('height', $('#m_srchbtn').height());
}

function m_closeMenu() {
    event.stopPropagation();
    $('#msidemenu').css("left", "-100vw");
    //$('#msidemenu').css("transform", "translate(-100vw, 0)");
    //        $('#msidemenu').css({            
    //            '-webkit-transform': 'translate(-100vw, 0)',
    //            '-moz-transform': 'translate(-100vw, 0)',
    //            '-o-transform': 'translate(-100vw, 0)',
    //            'transform': 'translate(-100vw, 0)'
    //        });
    $('#menuclose').hide();
    $('#m_srchbtn').show();
    $('#logo_link').show();
    $('#menutext').hide();
}

function m_toggleSearch() {
    var searchArea = $('#search');
    var searchButton = $('#m_srchbtn');
    if (searchArea.width() > 1) {
        searchArea.width(1);
        setTimeout(function() {
            searchArea.css('visibility', 'hidden');
            searchButton.removeClass('mclose');
        }, 1000);
        searchArea.find('input').val("");

    } else {
        searchArea.css('visibility', 'visible');
        searchArea.width($(window).width() - $('#m_srchbtn').outerWidth(true));
        searchButton.addClass('mclose');
        searchArea.find('input').focus();
    }
}

function m_menuElemHide(menu) {
    $('#mfooter').hide();
    $('.bg.stripes').hide();
    //    $('.entry-content')[0].setAttribute('style', 'top: 0 !important');

    //    var menu = dynamicContent.getItem();
    if (menu.template === 'templates/menu2.php') {
        var child = dynamicContent.getChildren(menu)[0];
        if (child.template === 'templates/menu2.php')
            $('ul.menu2').append(child.post_content);
    }
    //    else{
    //        menu = dynamicContent.getParent(menu.menu_item_parent);
    //        if (menu.template === 'templates/menu2.php'){
    //            $('ul.menu2').append(dynamicContent.getChildren(menu)[0].post_content);
    //        }
    //    }

    var linkImages = $('ul.menu img, ul.menu2 img');
    var links = $('ul.menu a, ul.menu2 a');
    linkImages.hide();
    for (var i = 0; i < linkImages.length; i++) {
        var fullpath = linkImages[i].getAttribute('src');
        var filename = fullpath.replace(/^.*[\\\/]/, '');
        links[i].setAttribute('style', 'background-image: url(' + URLS.stylesheet + '/images/menu/mobile/' + filename + ')');
    }
    $('br').remove();
}

function m_menuElemShow() {
    $('#mfooter').show();
    $('.bg.stripes').show();
    //    $('.entry-content')[0].removeAttribute('style');    
}

function m_setVideo() {
    $('article.section').append('<div id="videopopup"><div id="vidclose" class="mclose" onclick="m_closevideo()"></div></div>');
    $('.video-content iframe.video').detach().appendTo($('#videopopup'));
    $('.video-content div').prepend('<div id="vidicon"></div>');
    $('.video-content').prepend('<div id="m_playvid" onclick="m_playvideo()"></div>');
}

function m_playvideo() {
    //     $('#videopopup').css('left', 0);
    $('#videopopup').show();
    $('#videopopup iframe')[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
}

function m_closevideo() {
    //     $('#videopopup').css('left', '-100vw');
    $('#videopopup').hide();
    $('#videopopup iframe')[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
}