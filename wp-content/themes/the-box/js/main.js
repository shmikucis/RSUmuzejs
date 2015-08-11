window.onload = init;

var contents = [
    {   "type": "div",
        "id": "bg1",
        "class": "",
        "parent": "background",
        "style": "position: absolute; width: 110%; height: 100%; left: -5%; top: -5%; background-size: cover",
        "text": ""},
    {   "type": "div",
        "id": "mid1",
        "class": "anim-left",
        "parent": "middle",
        "style": "position: absolute; top: 30%; width: 110%; margin-left: -5%; height: 25%;",
        "text": ""},
    {   "type": "div",
        "id": "mid2",
        "class": "anim-right",
        "parent": "middle",
        "style": "position: absolute; top: 55%; width: 110%; margin-left: -5%; height: 15%; background-color: #B92432; opacity: 0.9;",
        "text": ""},
    {   "type": "h1",
        "id": "fore1",
        "class": "anim-left",
        "parent": "foretext",
        "style": "width: 100%; margin: auto; top: 35%; text-align: center; font-family: palatino; font-size: 5vw; color: #E3364D;",
        "text": "RĪGAS STRADIŅA UNIVERSITĀTES"},
    {   "type": "p",
        "id": "fore2",
        "class": "anim-left",
        "parent": "foretext",
        "style": "width: 100%; margin: auto; top: 47%; text-align: center; font-family: palatino; font-size: 3vmin; color: #403924;",
        "text": "VĒSTURES VIRTUĀLĀ EKSPOZĪCIJA"},
    {   "type": "p",
        "id": "fore3",
        "class": "layer anim-right",
        "parent": "mid2",
        "style": "position: relative; margin-left: 20%; text-align: center; width: 50%; font-size: 2.7vmin; color: #F3F0F5;",
        "text": "Virtuālais muzejs, izmantojot RSU muzejā sakopotos materiālus,"+String.fromCharCode(13)+" palīdzēs jums iepazīties ar to, kā noritējusi mūsu augstskolas"+String.fromCharCode(13)+" attīstība dažādos vēsturiskajos laikposmos."}
];


function init(){
    
    for (var i=0; i<contents.length; i++){
        var elem = document.createElement(contents[i].type);
        elem.id = contents[i].id;
        elem.className = contents[i].class;
        document.getElementById(contents[i].parent).appendChild(elem);
        elem.textContent = contents[i].text;
        elem.style.cssText = contents[i].style;
    }
    
    $(document).ready(function() {
        $('#fullpage').fullpage({
            scrollingSpeed: 0
        });
    });
    
    $(document).on('click', '#continue', function(){
        var up = document.getElementById("background");
        up.className += " anim-up";
        
        var outroR = document.getElementsByClassName("anim-right");
        var outroL = document.getElementsByClassName("anim-left");
        for (var j=0; j<4; j++){
        for (var i=0; i<outroR.length; i++){
            var newone  =  outroR[i].cloneNode(true);
            if (outroR[i].className !== ""){
                newone.className = outroR[i].className + "-rev";
                outroR[i].parentNode.replaceChild(newone, outroR[i]);
            }
        }
        }
        for (var j = 0; j<4; j++){
        for (var i=0; i<outroL.length; i++){
            var newone  =  outroL[i].cloneNode(true);
            if (outroL[i].className !== ""){
                newone.className = outroL[i].className + "-rev";
                outroL[i].parentNode.replaceChild(newone, outroL[i]);
            }
        }
        }
       
        $(".main_text_single:first").bind('oanimationend animationend webkitAnimationEnd', function() { 
             $.fn.fullpage.moveSectionDown();
            transition_in();
});
//        $.fn.fullpage.moveSectionDown();
    });
    
    var scene = document.getElementsByClassName("scene");
    var parallax = new Parallax (scene);
}

function transition_in(){
    var introR = document.getElementsByClassName("anim-right-rev");
    var introL = document.getElementsByClassName("anim-left-rev");
    for (var j=0; j<5; j++){
    for (var i=0; i<introR.length; i++){
        var newone  =  introR[i].cloneNode(true);
        if (introR[i].className !== ""){
            newone.className = introR[i].className.slice(0, -4);
            introR[i].parentNode.replaceChild(newone, introR[i]);
//            introR[i].className = "anim-right";
            
        }
    }
    }
    for (var j = 0; j<5; j++){
    for (var i=0; i<introL.length; i++){
        var newone  =  introL[i].cloneNode(true);
        if (introL[i].className !== ""){
            newone.className = introL[i].className.slice(0, -4);
            introL[i].parentNode.replaceChild(newone, introL[i]);
        }
    }
    }
    var up = document.getElementById("background");
    up.className = "layer";
}

function removeElems(){
    for (var i = 0; i<contents.length; i++){
        var elem = document.getElementById(contents[i].id);
        var newone  =  elem.cloneNode(true);
        if (elem.className !== ""){
            newone.className = elem.className + "-rev";
            elem.parentNode.replaceChild(newone, elem);
        }
    }
}