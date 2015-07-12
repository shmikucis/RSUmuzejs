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
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
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
		<img src="<?php echo get_template_directory_uri(); ?>/images/header_img.jpg" class="header_img" />		
	</header><!-- #masthead .site-header -->

	<div id="main" class="site-main clearfix">

		<nav id="site-navigation" class="main-navigation" role="navigation">
			<button class="menu-toggle"><span class="icon-font icon-menu"></span></button>
			<?php wp_nav_menu( array( 'theme_location' => 'primary' ) ); ?>
		</nav>
		
		<?php $header_image = get_header_image();
			if ( ! empty( $header_image ) ) { ?>
				<a class="header-image" href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home">
					<img src="<?php header_image(); ?>" width="<?php echo get_custom_header()->width; ?>" height="<?php echo get_custom_header()->height; ?>" alt="" />
				</a>
		<?php } // if ( ! empty( $header_image ) ) ?>
		