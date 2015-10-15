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
		
	<div id="footer">
            <div id="continue"></div>
            <ul class="social">
                    <li><a href="#" id="twitter"></a></li>
                    <li><a href="#" id="facebook"></a></li>
                    <li><a href="#" id="draugiem"></a></li>
                    <li><a href="#" id="gplus"></a></li>
            </ul>
        </div>

<?php wp_footer(); ?>

</body>

<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/parallax.js"></script>
</html>