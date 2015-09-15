var Content = Class.extend({
	init: function(){
		this.coolDownTime = 1000; // 1s
		this.lastTime = new Date().getTime() - this.coolDownTime;
		this.article = $('article');
		this.direction = 'down'; // up, down
		var self = this;

		$(window).bind('mousewheel DOMmousescroll wheel', function(e){
			var direction = e.originalEvent.wheelDelta /120 > 0 ? 'up' : 'down';
                if(scrollEnabled){
                    if(direction === 'down'){
                            self.drawNext();
                    } else {
                            self.drawPrev();
                    }
                }
		});
                
        $(document).keydown(function(e) {
            if(scrollEnabled){
                switch (e.which) {
                    case 38: // up
                        	self.drawPrev();
                        break;
                    case 40: // down
                        if(scrollEnabled){
                        	self.drawNext();
                    	}
                        break;

                    default:
                        return; // exit this handler for other keys
                }
            }
            checkContinue();
            e.preventDefault(); // prevent the default action (scroll / move caret)
        });
	}

	, draw: function(item){
		// console.log(item);
		if(!this.isTime()){
			return;
		}
		if(!item){
			var item = dynamicContent.getItem();	
		}
		if(this.article.html().trim().length === 0){ // calls first time after page is loaded
			this.drawIn(item);
                        setButtonMargin();
		} else {
			this.animateScene(dynamicContent.getItem(), 'out');
			var self = this;
			setTimeout(function(){
				self.drawIn(item);
				parallax.updateLayers();
                                updateListeners();
                                setButtonMargin();
			}, 1000);
		}	
		
	}

	, drawIn: function(item){
		this.article.empty();
		this.showHeaderImg(item);
		this.drawTemplate(item);
		this.animateScene(item, 'in');
		dynamicContent.set(item);
	}

	, isTime: function(){
		var newTime = new Date().getTime();
		if(newTime >= this.lastTime + this.coolDownTime){
			this.lastTime = newTime;
			return true;
		} else {
			return false;
		}
	}

	, drawNext: function(){
		var nextItem = dynamicContent.getNext();
		if(nextItem){
			this.direction = 'down';
			this.draw(nextItem);	
		}		
	}

	, drawPrev: function(){
		var prevItem = dynamicContent.getPrev();
		if(prevItem) {
			this.direction = 'up';
			this.draw(prevItem);
		}
	}

	, showHeaderImg: function(item){
		if(item.post_name == 'titullapa'){
			$('.head_image, .head_image_bot').css('display', 'none');
		} else {
			$('.head_image, .head_image_bot').css('display', 'block');
		}
	}

	, animateScene: function(item, direction){
		// animations from config
		if(ANIMATIONS[item.post_name] && ANIMATIONS[item.post_name][direction]){
			var anim = ANIMATIONS[item.post_name][direction];
			for(var i=0, l=anim.length; i<l; i++){
				this.animateObject(anim[i][0], anim[i][1], anim[i][2]);
			}
		}

		// default animations
		this.autoJumpAnimation(direction);
		this.autoClipAnimation(direction);
	}

	, autoJumpAnimation: function(direction){
		var pointers = [
			'h1'
			, '.cardboard'
			, '.obj_icon'
			, '.entry-content .menu li' 
			, '.entry-content div div img'
		];
		var list = [];
		for(var i=0, l=pointers.length; i<l; i++){
			var tmp = $(pointers[i]);
			tmp.each(function(){
				list.push($(this));
			})
		}

		if(this.direction == 'down') list.sort(function(a, b){ return a.offset().top - b.offset().top; });
		else list.sort(function(a, b){ return b.offset().top - a.offset().top; });

		var animationClass = this.direction == 'down' ? 'jumpUp' : 'jumpDown';
		if(direction == 'out') animationClass += 'Out';
		// console.log(animationClass);
		for(var i=0, l=list.length; i<l; i++){
			list[i].removeClass('jumpDown');
			list[i].removeClass('hidden');
			this.animateObject(list[i], animationClass, i*200, direction);
			// console.log(list[i].offset().top);
		}
	}

	, autoClipAnimation: function(){
		var pointers = [
			'.entry-content .citation' 
			, '.entry-content .readmore' 
		];
		var list = [];
		for(var i=0, l=pointers.length; i<l; i++){
			var tmp = $(pointers[i]);
			tmp.each(function(){
				list.push($(this));
			})
		}
	}

	, animateObject: function(pointer, animationClass, delay, direction){
		if(direction !== 'out') $(pointer).addClass('hidden');
		setTimeout(function(){ $(pointer).addClass(animationClass); }, delay);
	}

	, drawTemplate: function(item){
		switch(item.template){
			case 'templates/title.php':
				this.article.append(
					'<header class="entry-header main_title layer" data-depth="0.3">'
					+'</header>'
					+'<div id="intro" class="layer" data-depth="0.05">'            
			            +'<div id ="background" class="layer" data-depth="0.2">'
			            	+'<div id="bg1"></div>'
			            +'</div>'
			            +'<div id="intro_content" class="layer" data-depth="0.02">'
			            	+item.post_content
			                +'<div id="bigmore"></div>'
			            +'</div>'        
					+'</div>'
				);
				break;
			case 'templates/citation-full.php':
				this.article.append(
					'<header class="entry-header layer" data-depth="0">'
						+'<h1 class="entry-title anim-right">'+item.post_title+'</h1>'
					+'</header>'
					+'<div class="bg stripes">'
                        +'<div class="anim-right"></div>'
                    +'</div>'
					+'<div class="entry-content layer" data-depth="0">'
                    	+'<div class="bg cardboard anim-left">'
                        	+'<img src="'+URLS.stylesheet+'/images/ui/citation.png" align="middle" class="citation_logo"/>'
                    		+item.post_content
						+'</div>'
        			+'</div>'
        		);
				break;
			case 'templates/citation-min.php':
				this.article.append(
					'<header class="entry-header layer"  data-depth="0"></header>'
					+'<div class="bg stripes">'
                        +'<div class="anim-right"></div>'
                    +'</div>'
					+'<div class="entry-content layer" data-depth="0">'                    
						+item.post_content
					+'</div>'
				);
				break;
			case 'templates/citation-nobg.php':
				this.article.append(
					'<header class="entry-header layer" data-depth="0">'
						+'<h1 class="entry-title anim-right">'+item.post_title+'</h1>'
					+'</header>'
					+'<div class="bg stripes">'
                        +'<div class="anim-right"></div>'
                    +'</div>'	
					+'<div class="entry-content layer" data-depth="0">'                    
						+item.post_content
					+'</div>'
				);
				break;
			case 'templates/citation-notitle.php':
				this.article.append(
					'<header class="entry-header"></header>'
					+'<div class="bg stripes">'
                        +'<div class="anim-right"></div>'
					+'</div>'
					+'<div class="entry-content layer" data-depth="0">'
                    	+'<div class="bg cardboard narrow">'
                        	+'<img src="'+URLS.stylesheet+'/images/ui/citation.png" align="middle" class="citation_logo"/>'
                    		+item.post_content
						+'</div>'
        			+'</div>'
        		);
				break;
			case 'templates/menu.php':
				this.article.append(
					'<header class="entry-header layer" data-depth="0">'
						+'<h1 class="entry-title anim-right">'+item.post_title+'</h1>'
					+'</header>'
					+'<div class="bg stripes">'
                        +'<div class="anim-right"></div>'
                    +'</div>'  
					+'<div class="entry-content layer" data-depth="0">'
                    	+'<ul class="menu">'
						+item.post_content
                    	+'</ul>'
					+'</div>'
				);
				break;
                        case 'templates/video.php':
				this.article.append(
					'<header class="entry-header layer" data-depth="0">'
					+'</header>'					
					+'<div class="video-content">'
						+item.post_content
					+'</div>'
				);
                        setVideoSize();
				break;
			default:
				this.article.append(content);
				break;
		}            
	}
        
});

var content = new Content();