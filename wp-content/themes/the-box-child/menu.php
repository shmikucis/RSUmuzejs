<?php
/**
 *
 * @package WordPress
 * @since The Box 1.0
 */
?>

<article id="post-<?php the_ID(); ?>" class="section">
 
        
	<header class="entry-header layer" data-depth="0">
		<?php
			
				the_title( '<h1 class="entry-title anim-right">', '</h1>' );
		?>

	</header>
	<div class="bg stripes layer" data-depth="0.2">
                        <div class="anim-right"></div>
                    </div>  
	
		
		<div class="entry-content layer" data-depth="0">
                    <ul class="menu">
			<?php the_content( __( 'Continue reading <span class="meta-nav">&rarr;</span>', 'thebox' ) ); ?>
			<?php wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'thebox' ), 'after' => '</div>' ) ); ?>
                    </ul>
		</div>
        
<!--        <div id="footer" class="stripes">
            <button id="continue">Turpin�t</button>
        </div>-->

		
	

    
</article>
