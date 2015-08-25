var DynamicContent = Class.extend({
	init: function(){
		this.navigation = {};
	}

	, add: function(nav){
		this.navigation = nav;
	}

	, getNext: function(){

	}

	, getByID: function(id){

	}
})

var dynamicContent = new DynamicContent();
dynamicContent.add(NAVIGATION);