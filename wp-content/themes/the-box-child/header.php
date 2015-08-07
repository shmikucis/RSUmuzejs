<?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package WordPress
 * @since The Box 1.0
 */
?>
<!DOCTYPE html>
<html lang="lv" <?php // language_attributes(); ?>>
<head>
<!--<meta charset="<?php // bloginfo( 'charset' ); ?>">-->
<meta charset="utf-8" />
<!--<meta charset="windows-1257"/>-->
<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/main.js"></script>
<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/parallax.js"></script>
<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/jquery.fullPage.js"></script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">	

        

<!--[if lt IE 9]>
<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js" type="text/javascript"></script>
<![endif]-->
	
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<div id="page">

	<?php do_action( 'before' ); ?>
	<header id="masthead" class="site-header clearfix" role="banner">
		<div class="top_bar">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>">
				<img src="<?php echo get_template_directory_uri(); ?>/images/logo.jpg" alt="RSU muzejs" />
			</a>
		</div>
</header>
		
		