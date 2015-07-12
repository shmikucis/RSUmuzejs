<?php
/**
 * The Box functions and definitions
 *
 * @package WordPress
 * @since The Box 1.0
 */


/**
 * Set the content width based on the theme's design and stylesheet.
 *
 */
if ( ! isset( $content_width ) )
	$content_width = 600; /* pixels */


/**
 * The Box Theme setup
 *
 */
if ( ! function_exists( 'thebox_setup' ) ) :

function thebox_setup() {
	
	// Make theme available for translation. Translations can be filed in the /languages/ directory
	load_theme_textdomain( 'thebox', get_template_directory() . '/languages' );	
	
	// Supporting title tag via add_theme_support (since WordPress 4.1)
	add_theme_support( 'title-tag' );
   
	// This theme styles the visual editor to resemble the theme style.
	add_editor_style( array( 'inc/editor-style.css', thebox_fonts_url() ) );
	
	// Add default posts and comments RSS feed links to head
	add_theme_support( 'automatic-feed-links' );
	
	// Enable support for Post Thumbnail
	add_theme_support( 'post-thumbnails' );
	set_post_thumbnail_size( 600, 9999 ); //600 pixels wide (and unlimited height)
	
	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'thebox' ),
		'secondary' => __( 'Footer Menu', 'thebox' )
	) );

	// Enable support for Post Formats
	add_theme_support( 'post-formats', array( 'aside', 'image', 'video', 'quote', 'link' ) );
}
endif;
add_action( 'after_setup_theme', 'thebox_setup' );


/**
 * Enqueue scripts and styles for the front end.
 *
 */
function thebox_scripts() {
	
	// Add Google Fonts, used in the main stylesheet.
	wp_enqueue_style( 'thebox-fonts', thebox_fonts_url(), array(), null );
	
	// Add Icons Font, used in the main stylesheet.
	wp_enqueue_style( 'thebox-icons', get_template_directory_uri() . '/fonts/icons-font.css', array(), '1.6' );
		
	// Loads main stylesheet.
	wp_enqueue_style( 'thebox-style', get_stylesheet_uri(), array(), '1.4.0' );
	
	wp_enqueue_script( 'thebox-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20120206', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	if ( is_singular() && wp_attachment_is_image() ) {
		wp_enqueue_script( 'keyboard-image-navigation', get_template_directory_uri() . '/js/keyboard-image-navigation.js', array( 'jquery' ), '20120202' );
	}
	
}
add_action( 'wp_enqueue_scripts', 'thebox_scripts' );


/**
 * Return the Google font stylesheet URL, if available.
 *
 * @return string Font stylesheet or empty string if disabled.
 *
 */
function thebox_fonts_url() {
	$fonts_url = '';
	
	/* Translators: If there are characters in your language that are not
	 * supported by the font, translate this to 'off'. Do not translate
	 * into your own language.
	 */
	$heading_font = _x( 'on', 'Source Sans Pro font: on or off', 'thebox' );
	
	/* Translators: If there are characters in your language that are not
	 * supported by the font, translate this to 'off'. Do not translate
	 * into your own language.
	 */
	$text_font = _x( 'on', 'Oxygen font: on or off', 'thebox' );


	if ( 'off' !== $heading_font || 'off' !== $text_font ) {
		$font_families = array();

		if ( 'off' !== $heading_font )
			$font_families[] = 'Source Sans Pro:400,700,400italic,700italic';

		if ( 'off' !== $text_font )
			$font_families[] = 'Oxygen:300,400,700';

		$query_args = array(
			'family' => urlencode( implode( '|', $font_families ) ),
			'subset' => urlencode( 'latin,latin-ext' ),
		);
		$fonts_url = add_query_arg( $query_args, "//fonts.googleapis.com/css" );
	}

	return $fonts_url;
}


/**
 * Enqueue Google fonts style to admin screen for custom header display.
 *
 */
function thebox_admin_fonts() {
	wp_enqueue_style( 'thebox-admin-fonts', thebox_fonts_url(), array(), null );
}
add_action( 'admin_print_scripts-appearance_page_custom-header', 'thebox_admin_fonts' );


/**
 * Register widgetized area and update sidebar with default widgets
 *
 */
function thebox_widgets_init() {
	register_sidebar( array(
		'name' => __( 'Sidebar Primary', 'thebox' ),
		'id' => 'sidebar-1',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget' => '</aside>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',	
	) );
	register_sidebar( array(
		'name' => __( 'Footer', 'thebox' ),
		'id' => 'sidebar-2',
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );
	
}
add_action( 'widgets_init', 'thebox_widgets_init' );


/**
 * Title Tag backwards compatibility for older versions
 *
 */
if ( ! function_exists( '_wp_render_title_tag' ) ) {
	function theme_slug_render_title() {
?>
<title><?php wp_title( '|', true, 'right' ); ?></title>
<?php
	}
	add_action( 'wp_head', 'theme_slug_render_title' );
}


/**
 * Implement the Custom Header feature
 *
 */
require( get_template_directory() . '/inc/custom-header.php' );


/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';


/**
 * Customizer additions
 */
require get_template_directory() . '/inc/customizer.php';


/**
 * Theme Options additions
 */
require get_template_directory() . '/inc/theme-options.php';


/**
 * Load Jetpack compatibility file
 *
 */
require( get_template_directory() . '/inc/jetpack.php' );


/**
 * Setup the WordPress core custom background feature.
 *
 */
function thebox_register_custom_background() {
	$args = array(
		'default-color' => 'f0f3f5',
		'default-image' => '',
	);

	$args = apply_filters( 'thebox_custom_background_args', $args );
	
	add_theme_support( 'custom-background', $args );
	
}
add_action( 'after_setup_theme', 'thebox_register_custom_background' );


/*
 * Change excerpt text
 *
 */
function thebox_excerpt($num) {
	global $post;
	$limit = $num+1;
	$excerpt = explode(' ', get_the_excerpt(), $limit);
	array_pop($excerpt);
	$excerpt = implode(" ",$excerpt)."... <br><a class=\"more-link\" href='" .get_permalink($post->ID) ." '>".__('Read more', 'thebox')." &raquo;</a>";
	echo $excerpt;
}


/*
 * Prints Credits in the Footer
 *
 */
function thebox_credits() {
	$website_credits = '';
	$website_author = get_bloginfo('name');
	$website_date =  date ('Y');
	$website_credits = esc_attr( '&copy; ' . $website_date . ' ' . $website_author );	
	echo $website_credits;
}


/**
 * Custom Pagination
 *
 */
if ( ! function_exists('thebox_pagination') ) {
	function thebox_pagination() {
		global $wp_query;
		$total = $wp_query->max_num_pages;
		$big = 999999999; // need an unlikely integer
		if( $total > 1 )  {
			 if( !$current_page = get_query_var('paged') )
				 $current_page = 1;
			 if( get_option('permalink_structure') ) {
				 $format = 'page/%#%/';
			 } else {
				 $format = '&paged=%#%';
			 }
			echo paginate_links(array(
				'base' => str_replace( $big, '%#%', get_pagenum_link( $big, false ) ),
				'format' => $format,
				'current' => max( 1, get_query_var('paged') ),
				'total' => $total,
				'mid_size' => 3,
				'type' => 'list',
				'prev_text' => '&laquo;',
				'next_text' => '&raquo;',
			 ));
		}
	}
}


/**
 * Update to Plus Version
 *
 */
 
if(is_admin()){

  if(!get_option('thebox_basic_notice')){

    add_action('admin_notices', 'thebox_basic_notice');
    add_action('wp_ajax_thebox_hide_notice', 'thebox_hide_notice');

    function thebox_basic_notice(){
       ?>
      <div class="basic-notice updated" style="position:relative;">
        <p>
          <?php
            printf(__('<strong>Upgrade to The Box Plus</strong> version to get extended functionality and advanced customization options: %1$s', 'thebox'),
            sprintf('<a class="button button-primary" style="text-decoration:none" href="http://design.altervista.org/thebox-plus">%s</a>', '<strong>Try The Box Plus</strong>')
            );
          ?>
        </p>
         <a class="hide-me" style="position:absolute;top:10px;right:12px;text-decoration:none;cursor:pointer" title="<?php _e('Close and don\'t show this message again', 'thebox'); ?>">
	         <img src="<?php echo get_template_directory_uri(); ?>/inc/images/icon-dismiss.png" alt="" />
         </a>
      </div>

      <script type="text/javascript">
       jQuery(document).ready(function($){
         $('#wpbody').delegate('.basic-notice a.hide-me', 'click', function(){
           $.ajax({
             url: ajaxurl,
             type: 'GET',
             context: this,
             data: ({
               action: 'thebox_hide_notice',
               _ajax_nonce: '<?php echo wp_create_nonce('thebox_hide_notice'); ?>'
             }),
             success: function(data){
               $(this).parents('.basic-notice').remove();
             }
           });
         });
       });

      </script>
      <?php
    }

    function thebox_hide_notice(){
      check_ajax_referer('thebox_hide_notice');
      update_option('thebox_basic_notice', true);
      die();
    }

  }

  // removes the notice status from the db
  add_action('switch_theme', 'thebox_remove_notice_record');

  function thebox_remove_notice_record(){
    delete_option('thebox_basic_notice');
  }

}