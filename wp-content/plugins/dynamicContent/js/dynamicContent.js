var DynamicContent = Class.extend({
	init: function(){
		this.navigation = NAVIGATION;
		var item = this.getItemByUrl();
		this.activeMenuItem = item.menu_item_id;
	}

	// , add: function(nav){
	// 	this.navigation = nav;
	// }

	, getItem: function(id){
		if(!id){
			if(!this.activeMenuItem) return false;
			var id = this.activeMenuItem;
		}
		return this.getByMenuID(id);
	}

	, getNext: function(){
		var item = this.getItem();
		var menu_order = item.menu_order+1;
		return this.getItemByParam('menu_order', menu_order);
	}

	, getParent: function(id){
		var parentID = this.getParentID(id);
		return this.getByMenuID(parentID);
	}

	, getParentID: function(id){
		var item = this.getItem(id);
		if(item.menu_item_parent){
			return item.menu_item_parent;
		} else {
			return false;
		}
	}

	, getByMenuID: function(id){
		if(!id) return false;
		return this.getItemByParam('menu_item_id', id);
	}

	, getByID: function(id){
		if(!id) return false;
		return this.getItemByParam('ID', id);
	}

	, getItemByUrl: function(){
		var url = window.location.href.split('#')[1];
        if(url){
            var post_name = url.split('/')[0];
			return this.getItemByParam('post_name', post_name);
        } else {
        	return this.navigation[0];
        }
	}

	, getItemByParam: function(param, value){
		for(var i=0, l=this.navigation.length; i<l; i++){
			if(this.navigation[i][param] === value){
				return this.navigation[i];
			}
		}
		return false;
	}
})

var dynamicContent = new DynamicContent();
// dynamicContent.add(NAVIGATION);