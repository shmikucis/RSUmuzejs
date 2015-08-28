<?php
/**
 *
 * @package WordPress
 * @since The Box 1.0
 */
?>
<?php remove_filter ('the_content', 'wpautop'); ?>
<article id="post-<?php the_ID(); ?>" class="section">
 
    
    <!--<div id="intro">-->
                                
                            
                
	<header class="entry-header main_title layer" data-depth="0.3">

	</header>
		
		<div id="intro" class="layer" data-depth="0.05">
                    
                    <div id ="background" class="layer" data-depth="0.2">
                    <div id="bg1"></div>
                    </div>
                    <div id="intro_content" class="layer" data-depth="0.02">
			<?php the_content( __( 'Continue reading <span class="meta-nav">&rarr;</span>', 'thebox' ) ); ?>
			<?php wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'thebox' ), 'after' => '</div>' ) ); ?>
                    </div>
                    <div id="bigmore"></div>
		</div>
                                <!--</div>-->
        
<!--        <div id="footer" class="stripes">
            <button id="continue">Turpin�t</button>
        </div>-->

		
	

    
</article>
