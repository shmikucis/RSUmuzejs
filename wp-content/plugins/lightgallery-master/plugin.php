<?php
/**
 * Plugin Name: lightgallery Lightbox
 * Plugin URI: http://github.com/sugar/lightgallery
 * Description: Use this plugin to implement the lightgallery lightbox
 * Version: 1.0
 * Author: Chris McCoy
 * Author URI: http://github.com/chrismccoy

 * @copyright 2015
 * @author Chris McCoy
 * @license http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *
 * @package Lightgallery_Lightbox
 */


if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * Initiate Lightgallery Lightbox Class on plugins_loaded
 *
 * @since 1.0
 */

if ( !function_exists( 'lightgallery_lightbox' ) ) {

	function lightgallery_lightbox() {
		$lightgallery_lightbox = new Lightgallery_Lightbox();
	}

	add_action( 'plugins_loaded', 'lightgallery_lightbox' );
}

/**
 * Lightgallery Lightbox Class for scripts, styles, and shortcode
 *
 * @since 1.0
 */

if( !class_exists( 'Lightgallery_Lightbox' ) ) {

	class Lightgallery_Lightbox {

		/**
 		* Hook into hooks for Register styles, scripts, and shortcode
 		*
 		* @since 1.0
 		*/

		function __construct() {
			add_action( 'wp_enqueue_scripts', array( $this, 'scripts' ) );
			add_action( 'wp_enqueue_scripts', array( $this, 'styles' ) );
			add_filter( 'post_gallery', array( $this, 'gallery'), 10, 2 );
		}

		/**
		 * enqueue lightgallery lightbox javascript
		 *
		 * @since 1.0
		 */

		function scripts() {
			wp_enqueue_script( 'lightgallery_js', plugins_url( 'js/lightGallery.min.js', __FILE__ ), array( 'jquery' ), '1.0', false );

        	}

		/**
		 * enqueue lightgallery lightbox styles
		 *
		 * @since 1.0
		 */

		function styles() {
			wp_enqueue_style( 'lightgallery_css', plugins_url( 'css/lightGallery.css', __FILE__ ), false, '1.0', 'screen' );

			if ( @file_exists( get_stylesheet_directory() . '/lightgallery_custom.css' ) )
				$css_file = get_stylesheet_directory_uri() . '/lightgallery_custom.css';
			elseif ( @file_exists( get_template_directory() . '/lightgallery_custom.css' ) )
				$css_file = get_template_directory_uri() . '/lightgallery_custom.css';
			else
				$css_file = plugins_url( 'css/custom.css', __FILE__ );

			wp_enqueue_style( 'lightgallery_custom_css', $css_file, false, '1.0', 'screen' );

		}

        	/**
         	* modified gallery output for lightgallery lightbox
         	*
         	* @since 1.0
         	*/

		function gallery( $content, $attr ) {
    			global $instance, $post;

    			$instance++;

    			if ( isset( $attr['orderby'] ) ) {
        			$attr['orderby'] = sanitize_sql_orderby( $attr['orderby'] );
        			if ( ! $attr['orderby'] )
            				unset( $attr['orderby'] );
    			}

    			extract( shortcode_atts( array(
        			'order'      =>  'ASC',
        			'orderby'    =>  'menu_order ID',
        			'id'         =>  $post->ID,
        			'itemtag'    =>  'figure',
        			'icontag'    =>  'div',
        			'captiontag' =>  'figcaption',
        			'columns'    =>   3,
        			'size'       =>   'thumbnail',
        			'include'    =>   '',
        			'exclude'    =>   ''
    			), $attr ) );

    			$id = intval( $id );

    			if ( 'RAND' == $order ) {
        			$orderby = 'none';
    			}

    			if ( $include ) {
        
        			$include = preg_replace( '/[^0-9,]+/', '', $include );
        
        			$_attachments = get_posts( array(
            				'include'        => $include,
            				'post_status'    => 'inherit',
            				'post_type'      => 'attachment',
            				'post_mime_type' => 'image',
            				'order'          => $order,
            				'orderby'        => $orderby
        			) );

        			$attachments = array();
        
        			foreach ( $_attachments as $key => $val ) {
            				$attachments[$val->ID] = $_attachments[$key];
        			}

    				} elseif ( $exclude ) {
        
        				$exclude = preg_replace( '/[^0-9,]+/', '', $exclude );
        
        				$attachments = get_children( array(
            					'post_parent'    => $id,
            					'exclude'        => $exclude,
            					'post_status'    => 'inherit',
            					'post_type'      => 'attachment',
            					'post_mime_type' => 'image',
            					'order'          => $order,
            					'orderby'        => $orderby
        				) );

    				} else {

        				$attachments = get_children( array(
            					'post_parent'    => $id,
            					'post_status'    => 'inherit',
            					'post_type'      => 'attachment',
            					'post_mime_type' => 'image',
            					'order'          => $order,
            					'orderby'        => $orderby
        				) );

    				}

    				if ( empty( $attachments ) ) {
        				return;
    				}

    				if ( is_feed() ) {
        				$output = "\n";
        				foreach ( $attachments as $att_id => $attachment )
            					$output .= wp_get_attachment_link( $att_id, $size, true ) . "\n";
        				return $output;
    				}

				$output = '<ul class="lightGallery">';

    				foreach ( $attachments as $id => $attachment ) {
        				$output .= '<li class="thumbnail list-unstyled" data-src="'. wp_get_attachment_url($id) .'"> <a href="#"> <img src="'. wp_get_attachment_thumb_url($id) .'"> </a> </li>' . "\n";
    				}
				$output .= '</ul>';
    			return $output;
		}
   	}
}

