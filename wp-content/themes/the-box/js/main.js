$(window).load(function() {
    // Animate loader off screen
    $(".page_load").fadeOut("slow");
});

$(window).resize(function() {
    setButtonMargin();
    setSocialMargin();
});

$(document).ready(function() {
    init();
});

window.parallax = null;

var contents = [{
    "type": "div",
    "id": "bg1",
    "class": "anim-up",
    "parent": "background",
    "style": "position: absolute; width: 110%; height: 100%; left: -5%; top: -5%; background-size: cover",
    "text": ""
}, {
    "type": "div",
    "id": "mid1",
    "class": "anim-left",
    "parent": "middle",
    "style": "position: absolute; top: 25%; width: 110%; margin-left: -5%; height: 30%;",
    "text": ""
}, {
    "type": "div",
    "id": "mid2",
    "class": "anim-right",
    "parent": "middle",
    "style": "position: absolute; top: 55%; width: 110%; margin-left: -5%; height: 15%; background-color: #B92432; opacity: 0.9;",
    "text": ""
}, {
    "type": "h1",
    "id": "fore1",
    "class": "anim-left",
    "parent": "foretext",
    "style": "width: 100%; margin: auto; top: 35vmin; text-align: center; font-family: palatino; font-size: 7vmin; color: #AB182B; font-weight: normal;",
    "text": "RĪGAS STRADIŅA UNIVERSITĀTES"
}, {
    "type": "p",
    "id": "fore2",
    "class": "anim-left",
    "parent": "foretext",
    "style": "width: 100%; margin: auto; top: 47%; text-align: center; font-family: palatino; font-size: 3vmin; color: #575756;",
    "text": "VĒSTURES VIRTUĀLĀ EKSPOZĪCIJA"
}, {
    "type": "p",
    "id": "fore3",
    "class": "layer anim-right",
    "parent": "mid2",
    "style": "position: relative; margin-left: 20%; text-align: center; width: 50%; font-family: baskerville; font-size: 2vmin; color: #F3F0F5; line-height: 150%; font-weight: normal;",
    "text": "Virtuālais muzejs, izmantojot RSU muzejā sakopotos materiālus," + String.fromCharCode(13) + " palīdzēs jums iepazīties ar to, kā noritējusi mūsu augstskolas" + String.fromCharCode(13) + " attīstība dažādos vēsturiskajos laikposmos."
}];


function init() {
    setButtonMargin();
    setSocialMargin();
    checkContinue();

    for (var i = 0; i < contents.length; i++) {
        var elem = document.createElement(contents[i].type);
        elem.id = contents[i].id;
        elem.className = contents[i].class;
        document.getElementById(contents[i].parent).appendChild(elem);
        elem.textContent = contents[i].text;
        elem.style.cssText = contents[i].style;
    }


    var scene = document.getElementsByClassName("scene");
    parallax = new Parallax(scene);

    $(document).ready(function() {
        $('#fullpage').fullpage({
            scrollingSpeed: 0,
            keyboardScrolling: false
        });
        $.fn.fullpage.setMouseWheelScrolling(false);
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

    $(document).keydown(function(e) {
        switch (e.which) {
            case 38: // up
                //            transition_out();
                $.fn.fullpage.moveSectionUp();
                $(".main_text_single:first").bind('oanimationend animationend webkitAnimationEnd', function() {

                    //                transition_in();
                });
                break;
            case 40: // down
                //            transition_out();
                $.fn.fullpage.moveSectionDown();
                $(".main_text_single:first").bind('oanimationend animationend webkitAnimationEnd', function() {

                    //                transition_in();
                });
                break;

            default:
                return; // exit this handler for other keys
        }
        checkContinue();
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });

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

//pielabo "Turpināt" pogas pozīciju, lai vertikāli būtu līnijas vidū
function setButtonMargin() {
    var btnOffset = $('#continue').height();
    btnOffset /= -2;
    $('#continue').css('top', btnOffset);
}

//pielabo soctīklu pogu pozīcijas, lai tie būtu līnijas vidū
function setSocialMargin() {
    var ulOffset = $('.social').height();
    var headbar = $('#head_image_bot div').height();
    if (headbar === 0) {
        headbar = window.innerHeight / 100 * 1.04;
    }
    ulOffset /= -2;
    ulOffset += headbar / 2;
    $('.social').css('margin-top', ulOffset);
}

//pārbauda, vai vajag paslēpt "turpināt" pogu
function checkContinue(){
    if($('.active').prevAll().length===0){
        $('#continue').css('display', 'none');
    }
    else $('#continue').css('display', 'block');
}