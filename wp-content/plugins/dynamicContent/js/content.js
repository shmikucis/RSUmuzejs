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
		this.article.append('<header class="entry-header main_title layer" data-depth="0.3">'
		+'</header>'
		+'<div id="intro" class="layer" data-depth="0.05">'            
                    +'<div id ="background" class="layer" data-depth="0.2">'
                    +'<div id="bg1"></div>'
                    +'</div>'
                    +'<div id="intro_content" class="layer" data-depth="0.02">'+item.post_content
			
			
                        +'<div id="bigmore"></div>'
                    +'</div>'
                    
		+'</div>');
		this.article.append(item.post_content);
		dynamicContent.set(item);
	}

	, drawNext: function(){
		this.draw(dynamicContent.getNext());
	}

	, drawPrev: function(){
		this.draw(dynamicContent.getPrev());
	}

});

var content = new Content();