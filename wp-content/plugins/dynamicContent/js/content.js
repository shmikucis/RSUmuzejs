var Content = Class.extend({
    init: function() {
        this.coolDownTime = 1000; // 1s
        this.lastTime = new Date().getTime() - this.coolDownTime;
        this.article = $('article');
        this.direction = 'down'; // up, down
        this.history = [];
        var self = this;

        $(window).bind('mousewheel DOMmousescroll wheel', function(e) {
            var direction = e.originalEvent.wheelDelta / 120 > 0 ? 'up' : 'down';
            if (scrollEnabled) {
                if (direction === 'down') {
                    self.drawNext();
                } else {
                    self.drawPrev();
                }
            }
        });

        $(document).keyup(function(e) {
            if (scrollEnabled) {
                switch (e.which) {
                    case 38: // up
                        // self.drawPrev('left');
                        self.drawPrev();
                        break;
                    case 40: // down
                        if (scrollEnabled) {
                            // self.drawNext('right');
                            self.drawNext();
                        }
                        break;

                    default:
                        return; // exit this handler for other keys
                }
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)
        });

        //        $('body').on('click', '.slideNav.prev', function(){self.drawPrev();});
        //        $('body').on('click', '.slideNav.next', function(){self.drawNext();});

        // track backspace button
        $('html').keyup(function(e) {
            if (e.keyCode === 8 && !$("#searchfield").is(":focus")) {
                self.back();
            }
            if (e.keyCode === 13 && $("#searchfield").is(":focus")) {
                $('#searchbutton').trigger('click');
                if (isMobile) m_toggleSearch();
            }
            //    		if(self.history.length > 1)
            //    			self.history.pop();
            //    			var backUrl = self.history.pop();
            //    			self.drawFromUrl(backUrl);        	
        });


        $("#continue, #mcontinue").bind("click", function() {
            if (!singleSlide) self.drawNext();
        });

        $("#sidemenu, #msidemenu ul").bind("click", function(e) {
            var pointer;
            var href;
            if ($(e.target).is('span')) {
                pointer = $(e.target).parent();
                href = $(pointer).attr('href').slice(1);
            } else if ($(e.target).is('a')) {
                pointer = $(e.target);
                href = $(pointer).attr('href').slice(1);
            }

            if (href && href !== '') {
                self.drawFromUrl(href);
            }
            if (isMobile) m_closeMenu();
        });

        $("#navCircle").bind("click", function(event) {
            // var i = $("#navCircle").children().index(event.target);
            var url = $(event.target).attr('data-url');
            self.drawFromUrl(url);
        });

        $("#searchbutton").bind("click", function() {
            var item = dynamicContent.getItemByUrl("meklesanas-rezultati");
            item.post_content = "";
            var searchText = $("#searchfield").val();
            if (searchText.trim() == "") return;
            var resultItems = dynamicContent.searchString(searchText);
            for (var i = 0, l = resultItems.length; i < l; i++) {
                var content = resultItems[i].post_content;
                if (resultItems[i].template !== 'templates/video.php') {
                    var startIdx = content.indexOf("citation");
                    startIdx = content.indexOf(">", startIdx) + 1;
                    if (content.lastIndexOf("citation") !== startIdx) {
                        var endIdx = content.indexOf("<", content.lastIndexOf("citation"));
                        content.substring(content.lastIndexOf("<", startIdx));
                    } else {
                        var endIdx = content.indexOf("<", startIdx);
                    }
                } else {
                    var startIdx = content.indexOf("<div>");
                    startIdx = content.indexOf(">", startIdx) + 1;
                    var endIdx = content.indexOf("<", startIdx);
                }
                content = content.substring(startIdx, endIdx);
                if (content.indexOf("citation") > 0) {
                    content = content.slice(0, content.indexOf("</p>")) + " " + content.slice(content.lastIndexOf(">") + 1, content.length);
                }

                content = content.replace(/<\/?[^>]+(>|$)/g, "");
                content = content.split(searchText);
                var liContent = "";
                if (isMobile) {
                    var highlight = "<span style='color: #ba252f;'>" + searchText + "</span>";
                    var strlen = 20;
                } else {
                    var highlight = "<span style='background-color: yellow;'>" + searchText + "</span>";
                    var strlen = 100;
                }
                if (content.length >= 2) {
                    var startLength = content[0].length > strlen ? strlen : content[0].length;
                    liContent = content[0].slice(-startLength);
                    liContent += highlight;
                    var endLength = content[1].length > strlen ? strlen : content[1].length;
                    liContent += content[1].substring(0, endLength);
                } else {
                    liContent += highlight; // hack! Most probably the word is at start of string.  
                    var endLength = content[0].length > strlen ? strlen : content[0].length;
                    liContent += content[0].substring(0, endLength);
                }
                item.post_content += '<li><a href="#' + resultItems[i].post_name + '" onclick="content.drawFromUrl(\'' + resultItems[i].post_name + '\')">' + liContent + '<a></li>';
            }
            self.draw(item);
        });
    }

    ,
    draw: function(item) {
        var self = this;
        if (!this.isTime()) {
            return;
        }
        if (!item) {
            var item = dynamicContent.getItem();
        }
        this.add2History(item.post_name);
        if (this.article.html().trim().length === 0) { // calls first time after page is loaded
            this.drawIn(item);
            this.animateObject('#masthead', 'moveDown', 300, 'in');
            this.animateObject('#footer', 'moveUp', 500, 'in');
            setButtonMargin();
            if (isMobile) {
                mContinue();
                m_updateListeners();
                if ($('.aboutvid').length === 0) $('.readmore').detach().appendTo($('.entry-content'));
                $('<br>').insertBefore($('.aboutvid'));
            }
        } else {
            var prevItem = dynamicContent.getItem();
            this.animateScene(prevItem, 'out');
            this.drawExceptionsOut(prevItem, item);
            if (ANIMATIONS[prevItem.post_name] && ANIMATIONS[prevItem.post_name].coolDown) {
                var coolDownTime = ANIMATIONS[prevItem.post_name].coolDown;
            } else {
                var coolDownTime = this.coolDownTime;
            }
            setTimeout(function() {
                self.drawIn(item);
                if (!isMobile) {
                    parallax.updateLayers();
                    updateListeners();
                    setButtonMargin();
                } else {
                    mContinue();
                    m_updateListeners();
                    if ($('.aboutvid').length === 0) $('.readmore').detach().appendTo($('.entry-content'));
                    $('<br>').insertBefore($('.aboutvid'));
                }
            }, coolDownTime);
        }
        this.drawBreadCrumbs(item);
        setTimeout(function() {
            self.drawNavCircle(item);
        }, 1000);
        this.activeMenuItem(item);
        $visitedMaps = [];

        if (item.description === 'singleSlide') {
            this.setSingleSlide(item);
        }
    }

    ,
    drawIn: function(item) {
        this.article.empty();
        this.drawTemplate(item);
        this.drawAttachments(item);    
        this.animateScene(item, 'in');
        if (isMobile){ 
            this.setBackground(item);
            
        }        
        this.drawExceptionsIn(dynamicContent.getItem(), item);
        dynamicContent.set(item);
    }

    ,
    isTime: function() {
        var newTime = new Date().getTime();
        if (newTime >= this.lastTime + this.coolDownTime) {
            this.lastTime = newTime;
            return true;
        } else {
            return false;
        }
    }

    ,
    add2History: function(url) {
        this.history.push(url);
        if (this.history.length > 50) {
            this.history.shift();
        }
    }

    ,
    back: function() {
        if (this.history.length > 1) {
            this.history.pop();
            var backUrl = this.history.pop();
            if (isMobile && backUrl === dynamicContent.getNext().post_name)
                backUrl = dynamicContent.getPrev().post_name;
            this.drawFromUrl(backUrl);
        } else {
            var item = dynamicContent.getItem();
            if (item.menu_order > 1) {
                item = dynamicContent.getPrev();
                this.draw(item);
            }
        }
    }

    ,
    upOneLevel: function() {
        var levels = $('#breadcrumbs div').length;
        if (levels >= 2) {
            $("#breadcrumbs div a")[levels - 2].click();
        }
    }

    ,
    drawNext: function(direction) {
        var thisItem = dynamicContent.getItem();
        var nextItem = dynamicContent.getNext();
        if (nextItem) {
            if (thisItem.template === 'templates/menu2.php' && nextItem.template !== 'templates/menu2.php')
                return;
            else {
                this.direction = direction ? direction : 'down';
                this.draw(nextItem);
            }
        }
    }

    ,
    drawPrev: function(direction) {
        var thisItem = dynamicContent.getItem();
        var prevItem = dynamicContent.getPrev();
        if (prevItem) {
            if (thisItem.template === 'templates/menu2.php' && prevItem.template !== 'templates/menu2.php')
                return;
            else {
                this.direction = direction ? direction : 'up';
                this.draw(prevItem);
            }
        }
    }

    ,
    drawFromUrl: function(url) {
        var item = dynamicContent.getItemByUrl(url);
        if (item) {
            this.direction = 'down';
            this.draw(item);
        }
    }

    ,
    drawBreadCrumbs: function(item) {
        $("#breadcrumbs").empty();
        var list = [];
        var parent;

        while (item) {
            parent = item.menu_item_parent;
            // hack for Klinta. Hide last level of breadcrumbs
            if (item.description !== "noBreadCrumb") {
                list.push({
                    'post_title': item.post_title,
                    'url': item.post_name
                });
            } else if (item.template === "templates/menu2.php" && parent.template === "templates/menu2.php") {
                list.pop();
                list.push({
                    'post_title': item.post_title,
                    'url': item.post_name
                });
            }
            item = dynamicContent.getByMenuID(parent);
        }
        list.reverse();
        // console.log(list);

        for (var i = 0, l = list.length; i < l; i++) {
            $("#breadcrumbs").append(
                '<div><a href="#' + list[i].url + '" onclick="content.drawFromUrl(\'' + list[i].url + '\')">' + list[i].post_title + '</a></div>'
            );
            if (i < l - 1) {
                $('#breadcrumbs').append('<img src="' + URLS.stylesheet + '/images/ui/navtree_end.png"/>');
            }
        }
    }

    ,
    drawNavCircle: function(item) {
        var pointer = $("#navCircle");
        var parent;
        if (dynamicContent.hasChildren(item)) {
            parent = item;
            if (dynamicContent.getParent(item.menu_item_id).template === 'templates/menu2.php') {
                parent = dynamicContent.getParent(item.menu_item_id);
            }
        } else {
            parent = dynamicContent.getParent(item.menu_item_id);
        }
        var isVisible = pointer.is(":visible");
        if (parent.description === "navCircle") {
            pointer.show();
            var children = dynamicContent.getChildren(parent);
            children.unshift(parent);
            var circles = '';
            for (var i = 0, l = children.length; i < l; i++) {
                var currentClass = item === children[i] ? 'current' : '';
                circles += '<span class="' + currentClass + '" data-url="' + children[i].post_name + '" style="top: -11px;">' + (i + 1) + '</span>';
            }
            pointer.html(circles);
            if (!isVisible) {
                var self = this;
                pointer.children().each(function(i) {
                    self.animateObject(this, 'fadeInUp3', i * 200, 'in');
                });
            }
        } else {
            pointer.hide();
        }

    }

    ,
    activeMenuItem: function(item) {
        $('#sidemenu li.active').each(function(i) {
            $(this).removeClass('active');
        });

        $('a[href="#' + item.post_name + '"]').parent().addClass('active');
    }

    ,
    setSingleSlide: function(item) {
        scrollEnabled = false;
        singleSlide = true;
        var self = this;
        var parent = dynamicContent.getParent(item.menu_item_id);
        var grandParent = dynamicContent.getParent(parent.menu_item_id);
        var siblings = dynamicContent.getChildren(parent);

        if (!isMobile) {
            var handler = function(e) {
                if (e.which === 38 || e.which === 40 || e.which === 1) {
                    if (siblings.indexOf(item) < 14) {
                        if (grandParent.template === parent.template)
                            self.draw(grandParent);
                        else self.draw(parent);
                    } else self.draw(parent);
                    setTimeout(function() {
                        scrollEnabled = true;
                        $(window).unbind('mousewheel Dommousescroll wheel keyup', handler)
                    }, self.coolDownTime);
                }
                singleSlide = false;
            };

            $(window).one('mousewheel Dommousescroll wheel keyup', handler);
        } else {
            var mhandler = function(e) {
                if (grandParent.template === parent.template)
                    self.draw(grandParent);
                else self.draw(parent);
                singleSlide = false;
            };
            $('#mcontinue').one('click', mhandler);
        }

    }

    ,
    animateScene: function(item, inOut) {
        // animations from config
        if (ANIMATIONS[item.post_name] && ANIMATIONS[item.post_name][inOut]) {
            if (inOut == 'out' && ANIMATIONS[item.post_name]['in']) { // remove in classes
                var anim = ANIMATIONS[item.post_name]['in'];
                for (var i = 0, l = anim.length; i < l; i++) {
                    this.removeAnimation(anim[i][0], anim[i][1]);
                }
            }
            var anim = ANIMATIONS[item.post_name][inOut];
            for (var i = 0, l = anim.length; i < l; i++) { // add animation classes
                this.animateObject(anim[i][0], anim[i][1], anim[i][2], inOut);
            }
        }

        // default animations
        this.autoJumpAnimation(inOut);
        this.autoClipAnimation(inOut);
    }

    ,
    autoJumpAnimation: function(inOut) {
        var pointers = [
            'h1', '.cardboard', '.obj_icon', '.entry-content .menu li', '.entry-content .menu2 li', '.entry-content div div img'
            // , '.entry-content .innerImg .layer'
        ];
        var list = [];
        for (var i = 0, l = pointers.length; i < l; i++) {
            var tmp = $(pointers[i]);
            tmp.each(function() {
                list.push($(this));
            })
        }

        if (this.direction == 'down') list.sort(function(a, b) {
            return a.offset().top - b.offset().top;
        });
        else if (this.direction == 'up') list.sort(function(a, b) {
            return b.offset().top - a.offset().top;
        });
        else if (this.direction == 'left') list.sort(function(a, b) {
            return a.offset().left - b.offset().left;
        });
        else if (this.direction == 'right') list.sort(function(a, b) {
            return b.offset().left - a.offset().left;
        });

        // var animationClass = this.direction == 'down' ? 'jumpUp' : 'jumpDown';
        var animationClass = 'jump';
        switch (this.direction) {
            case 'down':
                animationClass += 'Up';
                break;
            case 'up':
            default:
                animationClass += 'Down';
                break;
            case 'left':
                animationClass += 'Right';
                break;
            case 'right':
                animationClass += 'Left';
                break;
        }
        // animationClass += this.direction.capitalizeFirstLetter();
        // animationClass += inOut.capitalizeFirstLetter();
        if (inOut == 'out') animationClass += 'Out';
        // console.log(animationClass);
        // console.log(list);
        var delay = list.length < 5 ? 200 : Math.round(this.coolDownTime / list.length);
        for (var i = 0, l = list.length; i < l; i++) {
            // list[i].removeClass('jumpDown');
            // list[i].removeClass('hidden');
            // console.log(list[i].is('img'));
            this.animateObject(list[i], animationClass, i * delay, inOut);
            // console.log(list[i].offset().top);
        }
    }

    ,
    autoClipAnimation: function(inOut) {
        var pointers = [
            '.entry-content .text_right', '.entry-content .text_left', '.entry-content .readmore'
        ];
        var list = [];
        for (var i = 0, l = pointers.length; i < l; i++) {
            var tmp = $(pointers[i]);
            tmp.each(function() {
                list.push($(this));
            })
        }
        for (var i = 0, l = list.length; i < l; i++) {
            if (inOut == 'in') {
                var animationClass = list[i].hasClass('citation') ? 'clipMoveUp' : 'clipMoveDown';
            } else {
                var animationClass = list[i].hasClass('citation') ? 'clipMoveDownOut' : 'clipMoveUpOut';
            }
            this.animateObject(list[i], animationClass, i * 200, inOut);
        }

    }

    ,
    setBackground: function(item) {
        var bgElem = $('#fullpage');
        if (item.post_name === "ievads-2") {
            bgElem.css('background-image', 'url(' + URLS.stylesheet + '/images/background/' + item.post_name + '.jpg)');
        } else if (item.template === "templates/menu.php" || item.template === "templates/menu2.php") {
            bgElem.css('background-image', 'url(' + URLS.stylesheet + '/images/background/mcardboard.jpg)');
        } else if (~item.post_name.indexOf('dzimta')) {
            bgElem.css('background-image', 'url(' + URLS.stylesheet + '/images/background/dzimta.jpg)');
        } else if (item.template === 'templates/video.php') {
            var iframe = $('iframe:first');
            var iframe_src = iframe.attr('src');
            var youtube_video_id = iframe_src.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();

            if (youtube_video_id.length == 11) {
                bgElem.css('background-image', 'url(//img.youtube.com/vi/' + youtube_video_id + '/hqdefault.jpg');
            }
        } else if (item.template === 'templates/searchResults.php') {
            $('.bg.stripes').css({
                'height': '100%',
                'top': 0
            });
        } else bgElem.css('background-image', 'none');
    },
    setMobilePopups: function(){
        if($('.obj_icon').length){
            var icons = $('.obj_icon');
//            $('.mcit img').parent().append('<ul id="popupbar"></ul>');
            $('.mcit').prepend('<ul id="popupbar"></ul>');
            
            for(var i = 0; i < icons.length; i++){
                if($('.mcit .alignleft:has(img)').length){
                    $('#popupbar').append('<li></li>');                
                    icons.eq(i).detach().appendTo($('#popupbar li:last'));
                }
                else{
                    $('#popupbar').prepend('<li></li>');                
                    icons.eq(i).detach().appendTo($('#popupbar li:first'));
                }
            }
            icons.css('display', 'block');
            if($('.mcit .alignleft:has(img)').length)
                $('#popupbar').css({
                    'margin-left': $('.mcit img').width() - $(window).width()*0.07 - $('#popupbar li').outerWidth(true)/2
                });
            else $('#popupbar').css({
                'margin-left': $('.mcit .text_left').width() + $('#popupbar li').outerWidth(true)/2 - $('#popupbar').width()
            });
        }
    }

    ,
    drawExceptionsIn: function(prevItem, nextItem) {
        if (prevItem === nextItem) { // calls once right after page is laoded
            if (prevItem.post_name == 'titullapa') {
                $('.head_image, .head_image_bot').addClass('hidden');
                //$('#continue').addClass('hidden none');
                var self = this;
                $("#bigmore, #mfooter #bigmore").bind("click", function() {
                    self.drawNext();
                });
                if (isMobile) {
                    $('#mback').addClass('hidden');
                }
            } else {
                $('#footer .social').addClass('hidden');
                if (isMobile) {
                    $("#bigmore").attr('id', "mcontinue");
                }
            }

            if (nextItem.template === 'templates/video.php') {
                if (!isMobile) setTimeout(function() {
                    setHeadFootSize(true);
                    setVideoSize();
                }, this.coolDownTime);
                else m_setVideo();
            }
            if (nextItem.template === 'templates/menu.php') {
                scrollEnabled = false;
                if (isMobile) {
                    m_menuElemHide(nextItem);
                }
            }
            if (nextItem.template === 'templates/menu2.php') {
                if (isMobile) {
                    m_menuElemHide(nextItem);
                }
            }
            if (nextItem.template === 'templates/searchResults.php') {
                setTimeout(function() {
                    resizeSrcRes();
                    if (!isMobile)
                        $("ol.searchresults").niceScroll({
                            cursoropacitymin: 1
                        });
                }, this.coolDownTime);
                scrollEnabled = false;
            }

            if (nextItem.post_name !== 'ievads-2') {
                $('#continue').addClass('hidden none');
            }


            return;
        }
        if (nextItem.post_name === 'ievads-2') {
            this.removeAnimation('#continue', 'none moveDownOut');
            this.animateObject('#continue', 'moveUp', 100, 'in');
        }
        if (nextItem.post_name == 'titullapa') {
            if (isMobile) {
                $('#mback').addClass('hidden');
                $("#mcontinue").attr('id', "bigmore");
                this.animateObject('#mfooter #bigmore', 'fadeInUp2', 100, 'in');
            }
            this.removeAnimation('#footer .social', 'moveDownOut');
            this.animateObject('#footer .social', 'moveUp', 100, 'in');
            var self = this;
            $("#bigmore, #mfooter #bigmore").bind("click", function() {
                self.drawNext();
            });

        }

        if (prevItem.post_name == 'titullapa') {
            this.removeAnimation('.head_image', 'moveUpOut');
            this.removeAnimation('.head_image_bot', 'moveUpOut');
            //this.removeAnimation('#continue', 'none moveDownOut');
            this.animateObject('.head_image', 'moveDown', 100, 'in');
            this.animateObject('.head_image_bot', 'moveDown', 100, 'in');
            //this.animateObject('#continue', 'moveUp', 100, 'in');
            if (isMobile) {
                //                            $('#mback').removeClass('hidden');
                //$('#bigmore').removeClass('moveDownOut');                            
                this.animateObject('#mcontinue', 'moveUp', 100, 'in');
                //$("#bigmore").attr('id',"mcontinue");                                   

            }
        }

        if (prevItem.template === 'templates/menu.php' && nextItem.template !== 'templates/menu.php') {
            scrollEnabled = true;
        }
        if (prevItem.template === 'templates/searchResults.php' && nextItem.template !== 'templates/searchResults.php') {
            scrollEnabled = true;
        }

        if (isMobile && (prevItem.template === 'templates/menu.php' || prevItem.template === 'templates/menu2.php')) {
            m_menuElemShow();
        }
        if (nextItem.template === 'templates/menu.php' || nextItem.template === 'templates/menu2.php') {
            scrollEnabled = false;
            if (isMobile) {
                m_menuElemHide(nextItem);
            }
        }
        if (nextItem.template === 'templates/searchResults.php') {
            setTimeout(function() {
                setTimeout(function() {
                    resizeSrcRes();
                    if (!isMobile)
                        $("ol.searchresults").niceScroll({
                            cursoropacitymin: 1
                        });
                }, this.coolDownTime);
            });
            scrollEnabled = false;
        }
        if (prevItem.template === 'templates/video.php' && nextItem.template !== 'templates/video.php') {
            if (!isMobile) setHeadFootSize(false);
        }
        if (nextItem.template === 'templates/video.php' && isMobile) {
            m_setVideo();
        }

    }

    ,
    drawExceptionsOut: function(prevItem, nextItem) {
        if (prevItem === nextItem) return;
        if (prevItem.post_name == 'ievads-2') {
            this.removeAnimation('#continue', 'moveUp');
            this.animateObject('#continue', 'moveDownOut', 100, 'out');
        }
        if (nextItem.post_name == 'titullapa') {
            this.removeAnimation('.head_image', 'moveDown');
            this.removeAnimation('.head_image_bot', 'moveDown');
            //this.removeAnimation('#continue', 'moveUp');
            this.animateObject('.head_image', 'moveUpOut', 100, 'out');
            this.animateObject('.head_image_bot', 'moveUpOut', 100, 'out');
            //this.animateObject('#continue', 'moveDownOut', 100, 'out');
            if (isMobile) {
                //                            $('#mback').show();
                $('#mcontinue').removeClass('moveUp');
                this.animateObject('#mcontinue', 'moveDownOut', 100, 'out');
            }
        }
        if (prevItem.post_name == 'titullapa') {
            this.removeAnimation('#footer .social', 'moveUp');
            this.animateObject('#footer .social', 'moveDownOut', 100, 'out');
            if (isMobile) {
                $('#mback').removeClass('hidden');
                $('#bigmore').removeClass('removeZoomIn');
                $('#bigmore').attr('id', 'mcontinue');
            }
        }
        if (nextItem.template == 'templates/menu.php' || nextItem.template == 'templates/searchResults.php') {
            //this.removeAnimation('#continue', 'moveUp');
            //this.animateObject('#continue', 'moveDownOut', 100, 'out');

            scrollEnabled = false;
        }
        if (nextItem.template === 'templates/video.php') {
            if (!isMobile) setHeadFootSize(true);
        }
    }

    ,
    animateObject: function(pointer, animationClass, delay, inOut) {
        if (inOut !== 'out') $(pointer).addClass('hidden');
        var self = this;
        //attēlus animē tikai pēc to ielādes
        if ($(pointer).is('img') && inOut == 'in') $(pointer).one("load", function() {
            setTimeout(function() {
                if (isMobile) {
                    if($('div.text_container_right').length>0) $('div.text_container_right').css('left', $('.mcit img').width());
                    else $('p.text_right').css('left', $('.mcit img').width());
                    $('.readmore.right').css('left', $('.mcit img').width() + $(window).width()*0.2);
                    if($('div.text_container_left').length>0)  $('.alignright').css('margin-left', $('div.text_container_left').width());
                    else $('.alignright').css('margin-left', $('p.text_left').width());
//                    $('p.text_right')[0].scrollIntoView();
                    if ($('p.text_right').length > 0) $('.mcit').animate({
                        scrollLeft: $('p.text_right').offset().left
                    }, 1000);
                    self.setMobilePopups();
                }
                if (!isMobile) setInnerImg();
                $(pointer).addClass(animationClass);
            }, delay);
        });
        else setTimeout(function() {
            $(pointer).addClass(animationClass);
        }, delay);
    }

    ,
    removeAnimation: function(pointer, animationClass) {
        $(pointer).removeClass(animationClass);
        $(pointer).removeClass('hidden');
    }

    ,
    drawTemplate: function(item) {
        switch (item.template) {
            case 'templates/title.php':
                if (isMobile) this.article.append(
                    '<header class="entry-header main_title layer" data-depth="0.3">' + '</header>' + '<div id="intro" class="layer" data-depth="0">' + '<div id ="background" class="layer" data-depth="0.2">' + '<div id="bg1"></div>' + '</div>' + '<div id="intro_content" class="layer" data-depth="0">' + item.post_content + '</div>' + '</div>'
                );
                else this.article.append(
                    '<header class="entry-header main_title layer" data-depth="0.3">' + '</header>' + '<div id="intro" class="layer" data-depth="0">' + '<div id ="background" class="layer" data-depth="0.2">' + '<div id="bg1"></div>' + '</div>' + '<div id="intro_content" class="layer" data-depth="0">' + item.post_content + '<div id="bigmore"></div>' + '</div>' + '</div>'
                );
                break;
            case 'templates/citation-full.php':
                this.article.append(
                    '<header class="entry-header layer" data-depth="0">' + '<h1 class="entry-title anim-right">' + item.post_title + '</h1>' + '</header>' + '<div class="slideNav prev"></div>' + '<div class="bg stripes">' + '<div class="anim-right"></div>' + '</div>' + '<div class="entry-content layer" data-depth="0">' + '<div class="bg cardboard anim-left">' + '<div class="citation_logo"/>' + item.post_content + '</div>' + '</div><div class="slideNav next"></div>'
                );
                break;
            case 'templates/citation-min.php':
                this.article.append(
                    '<header class="entry-header layer"  data-depth="0"></header>' + '<div class="slideNav prev"></div>' + '<div class="bg stripes">' + '<div class="anim-right"></div>' + '</div>' + '<div class="entry-content mcit layer" data-depth="0">' + item.post_content + '</div><div class="slideNav next"></div>'
                );
                break;
            case 'templates/citation-nobg.php':
                this.article.append(
                    '<header class="entry-header layer" data-depth="0">' + '<h1 class="entry-title anim-right">' + item.post_title + '</h1>' + '</header>' + '<div class="slideNav prev"></div>' + '<div class="bg stripes">' + '<div class="anim-right"></div>' + '</div>' + '<div class="entry-content mcit layer" data-depth="0">' + item.post_content + '</div><div class="slideNav next"></div>'
                );
                break;
            case 'templates/citation-notitle.php':
                this.article.append(
                    '<header class="entry-header"></header>' + '<div class="slideNav prev"></div>' + '<div class="bg stripes">' + '<div class="anim-right"></div>' + '</div>' + '<div class="entry-content layer" data-depth="0">' + '<div class="bg cardboard narrow">' + '<div class="citation_logo"/>' + item.post_content + '</div>' + '</div><div class="slideNav next"></div>'
                );
                break;
            case 'templates/menu.php':
                this.article.append(
                    '<header class="entry-header layer" data-depth="0">' + '<h1 class="entry-title anim-right">' + item.post_title + '</h1>' + '</header>' + '<div class="bg stripes">' + '<div class="anim-right"></div>' + '</div>' + '<div class="entry-content layer" data-depth="0">' + '<ul class="menu">' + item.post_content + '</ul>' + '</div>'
                );
                break;
            case 'templates/menu2.php':
                this.article.append(
                    '<header class="entry-header layer" data-depth="0">' + '<h1 class="entry-title anim-right">' + item.post_title + '</h1>' + '</header>' + '<div class="bg stripes">' + '<div class="anim-right"></div>' + '</div>' + '<div class="entry-content layer" data-depth="0">' + '<ul class="menu2">' + item.post_content + '</ul>' + '</div>'
                );
                break;
            case 'templates/video.php':
                this.article.append(
                    '<header class="entry-header layer" data-depth="0">' + '</header>' + '<div class="slideNav prev"></div>' + '<div class="video-content">' + item.post_content + '</div>' + '</div><div class="slideNav next"></div>'
                );
                if (!isMobile) setVideoSize();
                break;
            case 'templates/searchResults.php':
                this.article.append(
                    '<header class="entry-header layer" data-depth="0">' + '<h1 class="entry-title anim-right">' + item.post_title + '</h1>' + '</header>' + '<div class="slideNav prev"></div>' + '<div class="bg stripes">' + '<div class="anim-right"></div>' + '</div>' + '<div class="entry-content layer searchresults" data-depth="0">' + '<ol class="searchresults">' + item.post_content + '</ol>' + '</div><div class="slideNav next"></div>'
                );
                break;
            default:
                this.article.append(content);
                break;

        }

        // add eventlistener to menu items in content
        var self = this;
        if ($('.entry-content .menu').length > 0) {
            $('.entry-content .menu').bind('click', function(e) {
                var pointer = $(e.target);
                if (pointer.is('a')) {

                } else if (pointer.is('li')) {
                    pointer = pointer.find('a');
                } else if (pointer.is('img')) {
                    pointer = pointer.parent();
                } else if (pointer.is('p')) {
                    pointer = pointer.parent();
                }

                var href = $(pointer).attr('href').slice(1);
                if (href && href !== '') {
                    self.drawFromUrl(href);
                }
            })
        }
        if ($('.entry-content .menu2').length > 0) {
            $('.entry-content .menu2').bind('click', function(e) {
                var pointer = $(e.target);
                if (pointer.is('a')) {

                } else if (pointer.is('li')) {
                    pointer = pointer.find('a');
                } else if (pointer.is('img')) {
                    pointer = pointer.parent().parent();
                } else if (pointer.is('p')) {
                    pointer = pointer.parent();
                }

                var href = $(pointer).attr('href').slice(1);
                if (href && href !== '') {
                    self.drawFromUrl(href);
                }
            })
        }
    }

    ,
    drawAttachments: function(item) {
        var attachments = dynamicContent.getAttacments(item.ID);
        if (!attachments) return;
        // console.log(item, attachments);
        for (var i = 0, l = attachments.length; i < l; i++) {
            var attachment = attachments[i];
            switch (attachment.template) {
                case 'templates/popup-text.php':
                    this.article.append(
                        '<div style="display:none">' + '<div id="' + attachment.post_name + '" class="popup">' + attachment.post_content + '</div>' + '</div>'
                    );
                    break;
                case 'templates/popup-gallery.php':
                    var html = '<div id="' + attachment.post_name + '" class="gallery_div" style="display:none">';
                    for (var j = 0, l2 = attachment.images.length; j < l2; j++) {
                        var image = attachment.images[j];
                        html += '<a href="' + image.url + '">' + '<img src="' + image.url.substring(0, image.url.length - 4) + '-150x150.jpg"' + 'alt="' + image.description + '" />' + '</a>';
                    }
                    html += '</div>';
                    this.article.append(html);
                    break;
            }
        }
    }

});

var content = new Content();


String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}