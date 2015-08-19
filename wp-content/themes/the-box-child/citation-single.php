<?php
/**
 *
 * @package WordPress
 * @since The Box 1.0
 */
?>

<article id="post-<?php the_ID(); ?>" class="section">
 
        <div id="head_image" class="layer" data-depth="0.1">
            <div class="anim-up"></div>
        </div>
        <div id="head_image_bot" class="">
            <div>
                <ul class="social">
                    <li><a href="#" id="twitter"></a></li>
                    <li><a href="#" id="facebook"></a></li>
                    <li><a href="#" id="draugiem"></a></li>
                </ul>
            </div>
            
        </div>
	<header class="entry-header layer" data-depth="0.5">
		<?php
			
				the_title( '<h1 class="entry-title anim-right">', '</h1>' );
		?>

	</header>
	
	
		
		<div class="entry-content layer" data-depth="0.4">
                    <div class="bg stripes layer" data-depth="0.1">
                        <div class="anim-right"></div>
                    </div>
                    <div class="bg cardboard anim-left"></div>
			<?php the_content( __( 'Continue reading <span class="meta-nav">&rarr;</span>', 'thebox' ) ); ?>
			<?php wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'thebox' ), 'after' => '</div>' ) ); ?>
		</div>
        
<!--        <div id="footer" class="stripes">
            <button id="continue">Turpin�t</button>
        </div>-->

		
	

    
</article>
