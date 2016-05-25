<?php
/* Plugin Name: Dynamic Content */
	defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

	global $dynamicContent;
	$dynamicContent = new DynamicContent();
	class DynamicContent {
	    public function __construct(){
	        $this -> lang = "";
	    }

	    public function setLang($lang){
	    	$this -> lang = $lang;
	    }

	    public function getMenu(){
	    	$menuName = $this->lang === "" ? "Main" : "EN Menu";
	    	$menu = wp_get_nav_menu_items( $menuName, 
	    		array(
	    			'order' => 'ASC'
	    			, 'orderby' => 'menu_order'
	    		) 
	    	);
	    	$list = array();	    	
	    	foreach($menu as $item){
	    		// var_dump($item);
	    		// break;
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
	    				, 'template' => get_page_template_slug($post -> ID)
	    				, 'description' => $item -> description
	    				, 'featured_img' => $url = wp_get_attachment_url( get_post_thumbnail_id($post -> ID) )
	    			)
	    		);
	    	}
	    	// var_dump($list);
	    	return $list;
	    }

	    public function getAttachments($list){
            $menuName = $this->lang === "" ? "Main" : "EN Menu";
	    	$attachments = array();
	    	$my_wp_query = new WP_Query();
	    	foreach($list as $post){
	    		// TODO put query in for loop and search for children with depth 1 and post ID
	    		// $all_wp_pages = $my_wp_query->query(array('post_type' => 'page', 'depth' => 1, 'child_of' => $post -> ID));
	    		// $children = get_page_children( $post -> ID, $all_wp_pages );

	    		$children = get_posts(array('post_parent' => $post->ID, 'post_type' => 'page', 'posts_per_page'   => 10));
	    		foreach($children as $child){
	    			$template = get_page_template_slug($child -> ID);
	    			if($template == 'templates/popup-text.php'){
	    				$categories = wp_get_post_categories($child -> ID);
	    				$icon = count($categories) > 0 ? get_category($categories[0])->slug  : '';
    					array_push($attachments, array(
    						'ID' => $child -> ID
    						, 'parentID' => $post -> ID
    						, 'post_title' => $child -> post_title
    						, 'post_name' => $child -> post_name
    						, 'post_content' => $child -> post_content
    						, 'template' => $template
    						, 'icon' => $icon
    					));	
    				}
	    			if($template == 'templates/popup-gallery.php'){
	    				$gallery = get_post_gallery($child -> ID, false);
	    				$gallery['ids'] = explode(',', $gallery['ids']);
	    				$images = array();
	    				foreach($gallery['ids'] as $imageID){
	    					$image = get_post($imageID);	    					
                            if ($menuName === "Main")
                                array_push($images, array(
                                        'ID' => $image -> ID
                                        , 'url' => $image -> guid
                                        , 'description' => $image -> post_content
                                ));
                            else array_push($images, array(
                                        'ID' => $image -> ID
                                        , 'url' => $image -> guid
                                        , 'description' => $image -> post_excerpt
                                ));
	    				}

	    				$categories = wp_get_post_categories($child -> ID);
	    				$icon = count($categories) > 0 ? get_category($categories[0])->slug  : '';
	    				
	    				// var_dump($image);
	    				array_push($attachments, array(
    						'ID' => $child -> ID
    						, 'parentID' => $post -> ID
    						, 'post_title' => $child -> post_title
    						, 'post_name' => $child -> post_name
    						, 'template' => $template
    						, 'images' => $images
    						, 'icon' => $icon
    					));
	    			}
	    		}
	    	}
	    		// var_dump($children);
	    	return $attachments;
	    }

	    public function echoJS(){
	    	wp_enqueue_style( 'dynamicContent', plugins_url('animations.css', __FILE__) ); 
	    	wp_enqueue_script( 'classJS', plugins_url( 'js/class.js' , __FILE__ ) );
	    	wp_enqueue_script( 'animations', plugins_url( 'js/animations.js' , __FILE__ ) );
	        wp_enqueue_script( 'dynamicContent', plugins_url( 'js/dynamicContent.js' , __FILE__ ) );
	        wp_enqueue_script( 'content', plugins_url( 'js/content.js' , __FILE__ ) );
	        wp_enqueue_script( 'game', plugins_url( 'js/game.js' , __FILE__ ) );

	        $navigation = $this -> getMenu();
	        $attachments = $this -> getAttachments($navigation);

	   //      foreach($navigation as $key => $value){
	   //      	if($value -> template === "templates/1st_template.php"){
	   //      		$value -> post_content = "aaaaaaaaaaa " . $value -> post_content . " zzzzzzzz";
				// }
	   //      }

	    	echo '<script>
	    		var URLS = {};
	    		URLS.lang = "'.$this->lang.'";
	    		URLS.site = "'.get_option('siteurl').'/";
	    		URLS.stylesheet = "'.get_stylesheet_directory_uri().'";
	    		var NAVIGATION = '.json_encode($navigation).';
	    		var ATTACHMENTS = '.json_encode($attachments).';
	    	</script>';
	    }
	}

?>