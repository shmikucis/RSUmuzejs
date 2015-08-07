window.onload = init;

var contents = [
    {   "type": "div",
        "id": "bg1",
        "class": "",
        "parent": "background",
        "style": "position: absolute; width: 110%; height: 100%; left: -5%; top: -5%; background: url(wp-content/themes/the-box/images/MF_1933.jpg) no-repeat center center; background-size: cover",
        "text": ""},
    {   "type": "div",
        "id": "mid1",
        "class": "anim-left",
        "parent": "middle",
        "style": "position: absolute; top: 30%; width: 110%; margin-left: -5%; height: 25%; background-color: #F3F0F5; opacity: 0.7;",
        "text": ""},
    {   "type": "div",
        "id": "mid2",
        "class": "anim-right",
        "parent": "middle",
        "style": "position: absolute; top: 55%; width: 110%; margin-left: -5%; height: 15%; background-color: #E3364D; opacity: 0.7;",
        "text": ""},
    {   "type": "h1",
        "id": "fore1",
        "class": "anim-left",
        "parent": "foreground",
        "style": "width: 100%; top: 35%; text-align: center; font-size: 8vmin; color: #E3364D;",
        "text": "RĪGAS STRADIŅA UNIVERSITĀTES"},
    {   "type": "p",
        "id": "fore2",
        "class": "anim-left",
        "parent": "foreground",
        "style": "width: 100%; top: 47%; text-align: center; font-size: 3vmin; color: #403924;",
        "text": "VĒSTURES VIRTUĀLĀ EKSPOZĪCIJA"},
    {   "type": "p",
        "id": "fore3",
        "class": "anim-right",
        "parent": "foreground",
        "style": "width: 100%; margin-top: 6%; text-align: center; font-size: 2.7vmin; color: #F3F0F5;",
        "text": "Virtu�?lais muzejs, izmantojot RSU muzej�? sakopotos materi�?lus,"+String.fromCharCode(13)+" palīdzēs jums iepazīties ar to, k�? noritējusi mūsu augstskolas"+String.fromCharCode(13)+" attīstība daž�?dos vēsturiskajos laikposmos."}
];


function init(){
//    $.keyframe.define([{
//            name: 'right',
//            'from': {'transform': 'translate(115%)'},
//            'to': {'transform': 'translate(-5%)'}
//    }]);
 
    
    for (var i=0; i<contents.length; i++){
        var elem = document.createElement(contents[i].type);
        elem.id = contents[i].id;
        elem.className = contents[i].class;
        document.getElementById(contents[i].parent).appendChild(elem);
        elem.textContent = contents[i].text;
        elem.style.cssText = contents[i].style;
    }
    
    $(document).ready(function() {
        $('#fullpage').fullpage();
    });
    
    $(document).on('click', '#continue', function(){
        $.fn.fullpage.moveSectionDown();
    });
    
    var scene = document.getElementsByClassName("scene");
    var parallax = new Parallax (scene);
//    var bg = document.createElement("div");
//    bg.id = "bg1";
//    document.getElementById("background").appendChild(bg);
//    bg.style.cssText = "position: absolute; width: 110%; height: 110%; top: -5%; left: -5%; background: url(MF_1933.jpg) no-repeat center center; background-size: cover";
//    
//    var mid = document.createElement("div");
//    mid.id = "mid1";
//    document.getElementById("middle").appendChild(mid);
//    mid.style.cssText = "position: absolute; top: 30%; width: 110%; left: -5%; height: 25%; background-color: #F3F0F5; opacity: 0.7;";
//    
//    var mid = document.createElement("div");
//    mid.id = "mid2";
//    document.getElementById("middle").appendChild(mid);
//    mid.style.cssText = "position: absolute; top: 55%; width: 110%; left: -5%; height: 15%; background-color: #E3364D; opacity: 0.7;";
//    
//    var fore = document.createElement("h1");
//    fore.id = "for1";
//    document.getElementById("foreground").appendChild(fore);
//    fore.innerText = "RĪGAS STRADIŅA UNIVERSITĀTES";
//    fore.style.cssText = "width: 100%; top: 35%; left: -5%; text-align: center; font-size: 8vmin; color: #E3364D;";
//    
//    var fore = document.createElement("p");
//    fore.id = "for2";
//    document.getElementById("foreground").appendChild(fore);
//    fore.innerText = "VĒSTURES VIRTUĀLĀ EKSPOZĪCIJA";
//    fore.style.cssText = "width: 100%; top: 47%; left: -5%; text-align: center; font-size: 3vmin; color: #403924;";
//    
//    var fore = document.createElement("p");
//    fore.id = "for3";
//    document.getElementById("foreground").appendChild(fore);
//    fore.innerText = "Virtu�?lais muzejs, izmantojot RSU muzej�? sakopotos materi�?lus,"+String.fromCharCode(13)+" palīdzēs jums iepazīties ar to, k�? noritējusi mūsu augstskolas"+String.fromCharCode(13)+" attīstība daž�?dos vēsturiskajos laikposmos.";
//    fore.style.cssText = "width: 100%; top: 58%; left: -5%; text-align: center; font-size: 2.7vmin; color: #F3F0F5;";
    
}

function removeElems(){
    for (var i = 0; i<contents.length; i++){
        var elem = document.getElementById(contents[i].id);
//        elem.parentNode.removeChild(elem);
        var newone  =  elem.cloneNode(true);
        if (elem.className !== ""){
            newone.className = elem.className + "-rev";
            elem.parentNode.replaceChild(newone, elem);
        }
            //elem.style.webkitAnimationPlayState = "running";
    }
}