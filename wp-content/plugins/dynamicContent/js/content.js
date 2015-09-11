var Content = Class.extend({
	init: function(){
		this.article = $('article');
		var self = this;
		$(window).bind('mousewheel', function(e){
			var direction = e.originalEvent.wheelDelta /120 > 0 ? 'up' : 'down';
			// console.log(direction);
			if(direction == 'down'){
				self.drawNext();
			} else {
				self.drawPrev();
			}
		});
	}

	, draw: function(item){
		// console.log(item);
		if(!item){
			var item = dynamicContent.getItem();	
		}		
		this.article.empty();
		
		// this.article.append(item.post_content);
		this.drawTemplate(item);
		dynamicContent.set(item);
	}

	, drawNext: function(){
		this.draw(dynamicContent.getNext());
	}

	, drawPrev: function(){
		this.draw(dynamicContent.getPrev());
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
					+'<div class="bg stripes layer" data-depth="0.2">'
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
					'<header class="entry-header"></header>'
					+'<div class="bg stripes layer" data-depth="0.2">'
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
					+'<div class="bg stripes layer" data-depth="0.2">'
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
					+'<div class="bg stripes layer" data-depth="0.2">'
                        +'<div class="anim-right"></div>'
					+'</div>'
					+'<div class="entry-content layer" data-depth="0">'
                    	+'<div class="bg cardboard narrow anim-left">'
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
					+'<div class="bg stripes layer" data-depth="0.2">'
                        +'<div class="anim-right"></div>'
                    +'</div>'  
					+'<div class="entry-content layer" data-depth="0">'
                    	+'<ul class="menu">'
						+item.post_content
                    	+'</ul>'
					+'</div>'
				);
				break;
			default:
				this.article.append(content);
				break;
		}

	}

});

var content = new Content();