var DynamicContent = Class.extend({
    init: function() {
        this.navigation = NAVIGATION;
        var item = this.getItemByUrl();
        this.activeMenuItem = item.menu_item_id;
    }

    ,
    set: function(item) {
        if (item) {
            this.activeMenuItem = item.menu_item_id;
            window.location.href = URLS.site + '#' + item.post_name;
        } else {
            console.log('NO ITEM!');
        }
    }

    ,
    getItem: function(id) {
        if (!id) {
            if (!this.activeMenuItem) return false;
            var id = this.activeMenuItem;
        }
        return this.getByMenuID(id);
    }

    ,
    getNext: function() {
        var item = this.getItem();
        var menu_order = item.menu_order + 1;
        return this.getItemByParam('menu_order', menu_order);
    }

    ,
    getPrev: function() {
        var item = this.getItem();
        var menu_order = item.menu_order - 1;
        return this.getItemByParam('menu_order', menu_order);
    }

    ,
    getParent: function(id) {
        var parentID = this.getParentID(id);
        return this.getByMenuID(parentID);
    }

    ,
    getParentID: function(id) {
        var item = this.getItem(id);
        if (item.menu_item_parent) {
            return item.menu_item_parent;
        } else {
            return false;
        }
    }

    ,
    hasChildren: function(item) {
        if (this.getItemByParam('menu_item_parent', item.menu_item_id)) {
            return true;
        } else {
            return false;
        }
    }

    ,
    getChildren: function(item) {
        return this.getItemsByParam('menu_item_parent', item.menu_item_id);
    }

    ,
    getByMenuID: function(id) {
        if (!id) return false;
        return this.getItemByParam('menu_item_id', id);
    }

    ,
    getByID: function(id) {
        if (!id) return false;
        return this.getItemByParam('ID', id);
    }

    ,
    getItemByUrl: function(url) {
        if (!url) {
            url = window.location.href.split('#')[1];
        }

        if (url) {
            var post_name = url.split('/')[0];
            return this.getItemByParam('post_name', post_name);
        } else {
            return this.navigation[0];
        }
    }

    ,
    getItemByParam: function(param, value) {
        for (var i = 0, l = this.navigation.length; i < l; i++) {
            if (this.navigation[i][param] === value) {
                return this.navigation[i];
            }
        }
        return false;
    }

    ,
    getItemsByParam: function(param, value) {
        var arr = [];
        for (var i = 0, l = this.navigation.length; i < l; i++) {
            if (this.navigation[i][param] === value) {
                arr.push(this.navigation[i]);
            }
        }
        return arr;
    }

    ,
    getAttacments: function(itemID) {
        var list = [];
        for (var i = 0, l = ATTACHMENTS.length; i < l; i++) {
            if (ATTACHMENTS[i].parentID === itemID) {
                list.push(ATTACHMENTS[i]);
            }
        }
        return list;
    }

    ,
    searchString: function(text) {
        text = text.toLowerCase();
        var items = [];
        for (var i = 0, l = this.navigation.length; i < l; i++) {
            if (this.navigation[i].template === 'templates/title.php' || this.navigation[i].template === 'templates/menu.php')
                continue;
            var content = this.navigation[i].post_content.toLowerCase();
            if (this.navigation[i].template !== 'templates/video.php') {
                var startIdx = content.indexOf("citation");
                startIdx = content.indexOf(">", startIdx) + 1;
                if (content.lastIndexOf("citation") !== startIdx) {
                    var endIdx = content.indexOf("<", content.lastIndexOf("citation"));
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
            if (content.search(text) > -1) {
                items.push(this.navigation[i]);
            }
            // console.log(i);
        }
        return items;
    }
})

var dynamicContent = new DynamicContent();
// dynamicContent.add(NAVIGATION);