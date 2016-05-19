<?php
/**
 * Template Name: EN page
 *
 * @package WordPress
 * @since The Box 1.0
 */

get_header(); ?>

		<div id="primary" class="content-area">
			<div id="fullpage" class="site-content scene" role="main">
                <article class="section" id="post-157">            
 
                </article>
			</div><!-- #content .site-content -->
		</div><!-- #primary .content-area -->

<?php // get_sidebar(); ?>
<?php
    global $dynamicContent;
    $dynamicContent -> setLang("en/");
    $dynamicContent -> echoJS();
?>
<?php get_footer(); ?>