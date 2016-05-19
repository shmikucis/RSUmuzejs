<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the id=main div and all content after
 *
 * @package WordPress
 * @since The Box 1.0
 */
?>
		
	</div><!-- #main .site-main -->

	<footer id="colophon" class="site-footer clearfix" role="contentinfo">

		<?php if ( is_active_sidebar( 'sidebar-2' ) ) : ?>
			<div id="tertiary" class="clearfix">
				<?php dynamic_sidebar( 'sidebar-2' ); ?>
			</div>
		<?php endif; // end footer widget area ?>
		
		<div class="credits">
			<?php thebox_credits(); ?><br>
			<a href="<?php echo esc_url( __( 'http://wordpress.org/', 'thebox' ) ); ?>"><?php printf( __( 'Proudly powered by %s', 'thebox' ), 'WordPress' ); ?></a>
			<span class="sep"> / </span>
			<?php printf( __( 'Theme: %1$s by %2$s', 'thebox' ), 'The Box', '<a href="http://design.altervista.org" rel="designer">Design Lab</a>' ); ?>
		</div>
		
		<?php
		if ( has_nav_menu( 'secondary' ) ) { ?>
			<nav id="footer-navigation" class="footer-navigation">
				<?php wp_nav_menu( array( 'theme_location' => 'secondary', 'menu_id' => 'secondary-menu', 'container_class' => 'menu-container', 'depth' => 1 ) ); ?>
			</nav>
		<?php } ?>

	</footer><!-- #colophon .site-footer -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>