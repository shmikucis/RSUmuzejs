<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @since The Box 1.0
 */
get_header(); ?>

		<div id="primary" class="content-area">
			<div id="fullpage" class="site-content scene" role="main">
                            <div id="intro" class="section">
                                <div id ="background" class="layer" data-depth="0.2"></div>
                                <div id="middle" class="layer" data-depth="0.4"></div>
                                <div id="foreground" class="layer" data-depth="0.5"><div id="foretext"></div></div>
                                <div id="bigmore"></div>
                            </div>
                                    <?php while ( have_posts() ) : the_post(); ?>
                                        <?php 
                                        $post_id = get_the_ID(); 
                                        $post_categories = wp_get_post_categories( $post_id );
                                        $cat = get_category( $post_categories[0] );
                                        $parent = get_category ($cat->parent);                                        
                                        ?> 
					<?php get_template_part( $parent->slug, $cat->slug ); ?>
                                    <?php endwhile; // end of the loop. ?>
                           

			</div><!-- #content .site-content -->
		</div><!-- #primary .content-area -->

<?php // get_sidebar(); ?>
<?php get_footer(); ?>