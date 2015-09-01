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
    <header class="entry-header layer" data-depth="0.4">
	</header>
	<div class="bg stripes layer" data-depth="0.2">
                        <div class="anim-right"></div>
	</div>
		
		<div class="entry-content layer" data-depth="0.4">
                    
                    
                    <div class="bg cardboard narrow anim-left">
                        <img src="<?php echo get_stylesheet_directory_uri();?>/images/ui/citation.png" align="middle" class="citation_logo"/>
                    
			<?php the_content( __( 'Continue reading <span class="meta-nav">&rarr;</span>', 'thebox' ) ); ?>
			<?php wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'thebox' ), 'after' => '</div>' ) ); ?>
		</div>
        </div>
<!--        <div id="footer" class="stripes">
            <button id="continue">Turpin�t</button>
        </div>-->

		
	

    
</article>