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
	    		// var_dump($post);
	    		array_push($list,
	    			(object)array(
	    				'ID' => $post -> ID
	    				, 'post_title' => $post -> post_title
	    				, 'post_name' => $post -> post_name
	    				, 'post_content' => $post -> post_content
	    				, 'menu_item_id' => $item -> ID
	    				, 'menu_item_parent' => intval($item -> menu_item_parent)
	    				, 'menu_order' => $item -> menu_order
	    				// , 'template' => get_page_template_slug($post -> ID)
	    				
	    			)
	    		);
	    	}
	    	// var_dump($list);
	    	return $list;
	    }

	    public function getAttachments($list){
	    	$attachments = array();
	    	$my_wp_query = new WP_Query();
	    	// TODO put query in for loop and search for children with depth 1 and post ID
	    	$all_wp_pages = $my_wp_query->query(array('post_type' => 'page', 'depth' => 1));

	    	foreach($list as $post){
	    		$children = get_page_children( $post -> ID, $all_wp_pages );
	    		foreach($children as $child){
	    			$template = get_page_template_slug($child -> ID);
	    			if($template == 'page-gallery.php'){
	    				array_push($attachments,
	    					array(
	    						'ID' => $child -> ID
	    						, 'parentID' => $post -> ID
	    					)
	    				);
	    			}
	    		}
	    	}

	    		// var_dump($children);
	    	return $attachments;
	    }

	    public function echoJS(){
	    	wp_enqueue_script( 'classJS', plugins_url( 'js/class.js' , __FILE__ ) );
	        wp_enqueue_script( 'dynamicContent', plugins_url( 'js/dynamicContent.js' , __FILE__ ) );

	        $navigation = $this -> getMenu();
	        $attachments = $this -> getAttachments($navigation);

	    	echo '<script>
	    		var URLS = {};
	    		URLS.site = "'.get_option('siteurl').'/";
	    		var NAVIGATION = '.json_encode($navigation).';
	    		var ATTACHMENTS = '.json_encode($attachments).';
	    	</script>';
	    }
	}

?>
