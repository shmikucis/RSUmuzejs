<?php
/**
 *
 * @package WordPress
 * @since The Box 1.0
 */
?>

<article id="post-<?php the_ID(); ?>" class="section">
 
        <div id="head_image" class="layer anim-left" data-depth="0.1"></div>
        <div id="head_image_bot" class="anim-left"><div></div></div>
	<header class="entry-header layer" data-depth="0.4">
		<?php
			
				the_title( '<h1 class="entry-title anim-right">', '</h1>' );
		?>

	</header>
	
	
		
		<div class="entry-content layer" data-depth="0.3">
                    <div class="bg cardboard layer anim-left" data-depth="0.04"></div>
                    <div class="bg stripes layer anim-right" data-depth="0.07"></div>
			<?php the_content( __( 'Continue reading <span class="meta-nav">&rarr;</span>', 'thebox' ) ); ?>
			<?php wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'thebox' ), 'after' => '</div>' ) ); ?>
		</div>
        
<!--        <div id="footer" class="stripes">
            <button id="continue">Turpinât</button>
        </div>-->

		
	

    
</article>
