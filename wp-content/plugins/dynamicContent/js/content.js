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