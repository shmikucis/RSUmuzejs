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
            e.preventDefault(); // prevent the default action (scroll / move caret)
        });

        
        $( "#continue" ).bind( "click", function() {
		  	self.drawNext();
		});

        $( "#sidemenu" ).bind( "click", function(e) {
   			var pointer;
        	if($(e.target).is('span')){
        		pointer = $(e.target).parent();
        	}
        	else if($(e.target).is('a')){
        		pointer = $(e.target);
        	}

        	var href = $(pointer).attr('href').slice(1);
        	if(href && href !== ''){
        		self.drawFromUrl(href);
        	}
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
			this.animateObject('#masthead', 'moveDown', 300, 'in');
			this.animateObject('#footer', 'moveUp', 500, 'in');
            setButtonMargin();
		} else {
			var prevItem = dynamicContent.getItem();
			this.animateScene(prevItem, 'out');
			this.drawExceptionsOut(prevItem, item);
			if(ANIMATIONS[prevItem.post_name] && ANIMATIONS[prevItem.post_name].coolDown){
				var coolDownTime = ANIMATIONS[prevItem.post_name].coolDown;
			} else {
				var coolDownTime = this.coolDownTime;
			}
			var self = this;
			setTimeout(function(){
				self.drawIn(item);
				parallax.updateLayers();
                updateListeners();
                setButtonMargin();
			}, coolDownTime);
		}	
		$visitedMaps = [];
	}

	, drawIn: function(item){
		this.article.empty();
		this.drawTemplate(item);
		this.drawAttachments(item);
		this.animateScene(item, 'in');
		this.drawExceptionsIn(dynamicContent.getItem(), item);
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

	, drawFromUrl: function(url){
		var item = dynamicContent.getItemByUrl(url);
		if(item) {
			this.direction = 'up';
			this.draw(item);
		}
	}

	, animateScene: function(item, inOut){
		// animations from config
		if(ANIMATIONS[item.post_name] && ANIMATIONS[item.post_name][inOut]){
			if(inOut == 'out' && ANIMATIONS[item.post_name]['in']){ // remove in classes
				var anim = ANIMATIONS[item.post_name]['in'];
				for(var i=0, l=anim.length; i<l; i++){
					this.removeAnimation(anim[i][0], anim[i][1]);
				}
			}
			var anim = ANIMATIONS[item.post_name][inOut];
			for(var i=0, l=anim.length; i<l; i++){ // add animation classes
				this.animateObject(anim[i][0], anim[i][1], anim[i][2], inOut);
			}
		}

		// default animations
		this.autoJumpAnimation(inOut);
		this.autoClipAnimation(inOut);
	}

	, autoJumpAnimation: function(inOut){
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
		if(inOut == 'out') animationClass += 'Out';
		// console.log(animationClass);
		for(var i=0, l=list.length; i<l; i++){
			list[i].removeClass('jumpDown');
			list[i].removeClass('hidden');
			this.animateObject(list[i], animationClass, i*200, inOut);
			// console.log(list[i].offset().top);
		}
	}

	, autoClipAnimation: function(inOut){
		var pointers = [
			  '.entry-content .text_right' 
			, '.entry-content .text_left' 
			, '.entry-content .readmore' 
		];
		var list = [];
		for(var i=0, l=pointers.length; i<l; i++){
			var tmp = $(pointers[i]);
			tmp.each(function(){
				list.push($(this));
			})
		}
		for(var i=0, l=list.length; i<l; i++){
			if(inOut == 'in') {
				var animationClass = list[i].hasClass('citation') ? 'clipMoveUp' : 'clipMoveDown';
			} else {
				var animationClass = list[i].hasClass('citation') ? 'clipMoveDownOut' : 'clipMoveUpOut';
			}
			this.animateObject(list[i], animationClass, i*200, inOut);
		}

	}

	, drawExceptionsIn: function(prevItem, nextItem){
		if(prevItem === nextItem) { // calls once right after page is laoded
			if(prevItem.post_name == 'titullapa'){
				$('.head_image, .head_image_bot').addClass('hidden');
				$('#continue').addClass('hidden none');
				var self = this;
				$( "#bigmore" ).bind( "click", function() {
				  	self.drawNext();
				});
			} else {
				$('#footer .social').addClass('hidden');
			}
//                        if(nextItem.template === 'templates/video.php'){
//                            $('ul.social').addClass('hidden');
//                            $('.head_image, .head_image_bot').addClass('hidden');
//                        }
			return;
		}
		if(nextItem.post_name == 'titullapa'){
			this.removeAnimation('#footer .social', 'moveDownOut');
			this.animateObject('#footer .social', 'moveUp', 100, 'in');
			var self = this;
			$( "#bigmore" ).bind( "click", function() {
			  	self.drawNext();
			});
		}
		if(prevItem.post_name == 'titullapa'){
			this.removeAnimation('.head_image', 'moveUpOut');
			this.removeAnimation('.head_image_bot', 'moveUpOut');
			this.removeAnimation('#continue', 'none moveDownOut');
			this.animateObject('.head_image', 'moveDown', 100, 'in');			
			this.animateObject('.head_image_bot', 'moveDown', 100, 'in');
			this.animateObject('#continue', 'moveUp', 100, 'in');
		}
//                if(prevItem.template === 'templates/video.php'){
//                    this.removeAnimation('.head_image', 'moveUpOut');
//                    this.removeAnimation('.head_image_bot', 'moveUpOut');
//                    this.animateObject('.head_image', 'moveDown', 100, 'in');			
//                    this.animateObject('.head_image_bot', 'moveDown', 100, 'in');
//                    $('ul.social').removeClass('hidden');
//                }
	}

	, drawExceptionsOut: function(prevItem, nextItem){
		if(prevItem === nextItem) return;
		if(nextItem.post_name == 'titullapa'){
			this.removeAnimation('.head_image', 'moveDown');
			this.removeAnimation('.head_image_bot', 'moveDown');
			this.removeAnimation('#continue', 'moveUp');
			this.animateObject('.head_image', 'moveUpOut', 100, 'out');
			this.animateObject('.head_image_bot', 'moveUpOut', 100, 'out');
			this.animateObject('#continue', 'moveDownOut', 100, 'out');
		}
		if(prevItem.post_name == 'titullapa'){
			this.removeAnimation('#footer .social', 'moveUp');
			this.animateObject('#footer .social', 'moveDownOut', 100, 'out');
		}
//                if(nextItem.template === 'templates/video.php'){
//                    this.removeAnimation('.head_image', 'moveDown');
//                    this.removeAnimation('.head_image_bot', 'moveDown');
//                    this.animateObject('.head_image', 'moveUpOut', 100, 'out');
//                    this.animateObject('.head_image_bot', 'moveUpOut', 100, 'out');
//                    
//                    $('ul.social').addClass('hidden');
//                }
	}

	, animateObject: function(pointer, animationClass, delay, inOut){
		if(inOut !== 'out') $(pointer).addClass('hidden');
		setTimeout(function(){ $(pointer).addClass(animationClass); }, delay);
	}

	, removeAnimation: function(pointer, animationClass){		
		$(pointer).removeClass(animationClass);
		$(pointer).removeClass('hidden');
	}	

	, drawTemplate: function(item){
		switch(item.template){
			case 'templates/title.php':
				this.article.append(
					'<header class="entry-header main_title layer" data-depth="0.3">'
					+'</header>'
					+'<div id="intro" class="layer" data-depth="0">'            
			            +'<div id ="background" class="layer" data-depth="0.2">'
			            	+'<div id="bg1"></div>'
			            +'</div>'
			            +'<div id="intro_content" class="layer" data-depth="0">'
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
                        	+'<div class="citation_logo"/>'
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
                        	+'<div class="citation_logo"/>'
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

		var self = this;
		if($('.entry-content .menu').length > 0) {
			$('.entry-content .menu').bind('click', function(e){
				var pointer = $(e.target);
				if(pointer.is('a')){

				} 
				else if(pointer.is('li')){
					pointer = pointer.find('a');
				}
				else if(pointer.is('img')){
					pointer = pointer.parent();
				}
				else if(pointer.is('p')){
					pointer = pointer.parent();
				}

				var href = $(pointer).attr('href').slice(1);
	        	if(href && href !== ''){
	        		self.drawFromUrl(href);
	        	}
			})
		}      
	}

	, drawAttachments: function(item){
		var attachments = dynamicContent.getAttacments(item.ID);
		if(!attachments) return;
		// console.log(item, attachments);
		for(var i=0, l=attachments.length; i<l; i++){
			var attachment = attachments[i];
			switch(attachment.template){
				case 'templates/popup-text.php':
					this.article.append(
						'<div style="display:none">'
						+ '<div id="'+attachment.post_name+'" class="popup">'
						+ attachment.post_content
						+ '</div>'
						+ '</div>'
					);
					break;
				case 'templates/popup-gallery.php':
					var html = '<div id="'+attachment.post_name+'" class="gallery_div" style="display:none">';
					for(var j=0, l2=attachment.images.length; j<l2; j++){
						var image = attachment.images[j];
						html += '<a href="'+image.url+'">'
							+'<img src="'+image.url.substring(0, image.url.length-4)+'-150x150.jpg"' 
							+'alt="'+image.description+'" />'
							+'</a>';
					}
					html += '</div>';
					this.article.append(html);
					break;
			}
		}
	}
        
});

var content = new Content();