<?php
/**
 * The template for displaying posts in the Quote post format
 *
 * @package WordPress
 * @since The Box 1.0
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<?php if ( is_single() ) : ?>
		
		<div class="entry-content">
			<?php the_content( __( 'Continue reading <span class="meta-nav">&rarr;</span>', 'thebox' ) ); ?>
			<?php wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'thebox' ), 'after' => '</div>' ) ); ?>
		</div><!-- .entry-content -->
		
	<?php else : ?>
	
		<div class="entry-summary">
			
			<?php the_content( __( 'Continue reading <span class="meta-nav">&rarr;</span>', 'thebox' ) ); ?>
			
		</div><!-- .entry-summary -->
		
	<?php endif; ?>
		
</article><!-- #post-<?php the_ID(); ?> -->