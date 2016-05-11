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
            <span id="backToMenu"></span>
            <span id="navCircle">
                <span class="visited">1</span>
                <span class="current">2</span>
                <span class="">3</span>
            </span>
            <div id="continue"></div>
            
            <ul class="social">
                    <li><a href="https://twitter.com/intent/tweet" class="twitter"></a></li>
                    <li><a class="facebook"></a></li>
                    <li><a class="draugiem"></a></li>
                    <li><a data-contenturl="https://plus.google.com/pages/"
  data-contentdeeplinkid="/pages"
  data-clientid="573097370645-8rubdrtbr59q01e2gdva8pfvrrjtfrv3.apps.googleusercontent.com"
  data-cookiepolicy="single_host_origin"
  data-prefilltext="Testing is great with G+"
  data-calltoactionlabel="RECOMMEND"
  data-calltoactionurl="http://plus.google.com/pages/create"
  data-calltoactiondeeplinkid="/pages/create" class="gplus g-interactivepost"></a></li>
            </ul>
        </div>
        <div id="mfooter">
            <span id="m_menubtn"></span>
            <span id="bigmore"></span>
            <span id="m_social">
                <ul>
                    <li><a id="m_twitter" href="https://twitter.com/intent/tweet"></a></li><li><a id="m_fb"></a></li><li><a id="m_draugiem"></a></li><li><a data-contenturl="https://plus.google.com/pages/"
  data-contentdeeplinkid="/pages"
  data-clientid="573097370645-8rubdrtbr59q01e2gdva8pfvrrjtfrv3.apps.googleusercontent.com"
  data-cookiepolicy="single_host_origin"
  data-prefilltext="Testing is great with G+"
  data-calltoactionlabel="RECOMMEND"
  data-calltoactionurl="http://plus.google.com/pages/create"
  data-calltoactiondeeplinkid="/pages/create" class="g-interactivepost" id="m_gplus"></a></li>
                </ul>
            </span>
            <span id="m_socbtn"></span>
            
        </div>

<?php wp_footer(); ?>

</body>

<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/parallax.js"></script>
</html>