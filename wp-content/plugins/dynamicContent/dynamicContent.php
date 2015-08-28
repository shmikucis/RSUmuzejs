<?php
/* Plugin Name: Dynamic Content */
	defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

	global $dynamicContent;
	$dynamicContent = new DynamicContent();
	class DynamicContent {
	    public function __construct(){
	        
	    }

	    public function getMenu(){
	    	$menu = wp_get_nav_menu_items( 'Main', 
	    		array(
	    			'order' => 'ASC'
	    			, 'orderby' => 'menu_order'
	    		) 
	    	);
	    	$list = array();
	    	foreach($menu as $item){
	    		$post = get_post($item -> object_id);
	    		array_push($list,
	    			array(
	    				'ID' => $post -> ID
	    				, 'post_title' => $post -> post_title
	    				, 'post_name' => $post -> post_name
	    				, 'post_content' => $post -> post_content
	    				, 'menu_item_id' => $item -> ID
	    				, 'menu_item_parent' => intval($item -> menu_item_parent)
	    				, 'menu_order' => $item -> menu_order
	    				
	    			)
	    		);
	    	}
	    	// var_dump($list);
	    	return $list;
	    }

	    public function echoJS(){
	    	wp_enqueue_script( 'classJS', plugins_url( 'js/class.js' , __FILE__ ) );
	        wp_enqueue_script( 'dynamicContent', plugins_url( 'js/dynamicContent.js' , __FILE__ ) );


	    	echo '<script>
	    		var URLS = {};
	    		URLS.site = "'.get_option('siteurl').'/";
	    		var NAVIGATION = '.json_encode($this -> getMenu()).';
	    	</script>';
	    }
	}

?>
