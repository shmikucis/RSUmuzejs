var Content = Class.extend({
	init: function(){
		this.coolDownTime = 1000; // 1s
		this.lastTime = new Date().getTime() - this.coolDownTime;
		this.article = $('article');
		var self = this;
                console.log(self);
		$(window).bind('mousewheel', function(e){
			var direction = e.originalEvent.wheelDelta /120 > 0 ? 'up' : 'down';
			// console.log(direction);
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
                                //            transition_out();

                                self.drawPrev();
                                break;
                            case 40: // down
                                //            transition_out();
                                if(scrollEnabled){
                                self.drawNext();}
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
		} else {
			this.animateScene(dynamicContent.getItem(), 'out');
			var self = this;
			setTimeout(function(){
				self.drawIn(item);
				parallax.updateLayers();
                                updateListeners();
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
			this.draw(nextItem);	
		}		
	}

	, drawPrev: function(){
		var prevItem = dynamicContent.getPrev();
		if(prevItem) {
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
		if(!ANIMATIONS[item.post_name]) return;
		if(!ANIMATIONS[item.post_name][direction]) return;
		var anim = ANIMATIONS[item.post_name][direction];
		for(var i=0, l=anim.length; i<l; i++){
			this.animateObject(anim[i][0], anim[i][1], anim[i][2]);
		}
	}

	, animateObject: function(pointer, animationClass, delay){
		$(pointer).addClass('hidden');
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