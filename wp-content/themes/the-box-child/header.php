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
    <title><?php if(is_home() || is_front_page()) { echo bloginfo("name"); echo "  "; echo bloginfo("description"); }
else
{ echo wp_title('', true, 'right'); }?></title>
<link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon.ico" />
<!--<meta charset="<?php // bloginfo( 'charset' ); ?>">-->
<meta charset="utf-8" />
<!--<meta charset="windows-1257"/>-->
<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/main.js" charset="utf-8"></script>
<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/jquery.fullPage.js"></script>
<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/jquery.colorbox.js"></script>
<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/jquery.nicescroll.js"></script>
<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/lightgallery.js"></script>
<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/lg-thumbnail.js"></script>
<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/uber-zoom.js"></script>
<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/imageMapResizer.js"></script>
<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/mediaelement-and-player.min.js"></script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">	

        

<!--[if lt IE 9]>
<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js" type="text/javascript"></script>
<![endif]-->
	
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<div class="page_load"><div class="loading">
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
</div></div>

<div id="page">

	<?php do_action( 'before' ); ?>
	<header id="masthead" class="site-header clearfix" role="banner">
		<div class="top_bar">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>">
				<img src="<?php echo get_stylesheet_directory_uri(); ?>/images/logo.png" alt="RSU muzejs" id="header_logo"/>
			</a>
		</div>
            <span id="menu_toggle"></span>
            <div id='sidemenu' style="display: none">
                <ul>
                   <li class='has-sub'><a><span>Pirmsākumi</span></a>
                       <ul>
                         <li><a href='#medicina'><span>Medicīna</span></a></li>
                         <li><a href='#socialas-zinatnes'><span>Sociālās zinātnes</span></a></li>
                       </ul>
                   </li>
                   <li class='has-sub'><a><span>Attīstība</span></a>
                      <ul>
                         <li><a href='#rigas-medicinas-instituts'><span>Rīgas Medicīnas institūts</span></a></li>
                         <li><a href='#'><span>Latvijas Medicīnas akadēmija</span></a></li>
                         <li><a href='#rigas-stradina-universitate'><span>Rīgas Stradiņa universitāte</span></a></li>
                         <li><a href='#'><span>Rektori</span></a></li>
                      </ul>
                   </li>
                   <li class='has-sub'><a><span>Struktūra</span></a>
                      <ul>
                         <li><a href='#'><span>Fakultātes</span></a></li>
                         <li><a href='#'><span>Institūti un laboratorijas</span></a></li>
                         <li><a href='#'><span>Administrācija</span></a></li>
                      </ul>
                   </li>
                   <li class='has-sub'><a><span>Zinātne un pedagoģija</span></a>
                       <ul>
                         <li><a href='#'><span>Zinātne</span></a></li>
                         <li><a href='#'><span>Pedagoģija</span></a></li>
                       </ul>
                   </li>
                   <li class='has-sub'><a><span>Personības</span></a>
                      <ul>
                         <li><a href='#'><span>Veselības aprūpe</span></a></li>
                         <li><a href='#'><span>Sociālās zinātnes</span></a></li>
                         <li><a href='#'><span>Atpazīstamas personības</span></a></li>
                      </ul>
                   </li>
                   <li class='has-sub'><a><span>Ārpus studijām</span></a>
                      <ul>
                         <li><a href='#'><span>Okupācijas laikā</span></a></li>
                         <li><a href='#'><span>Mākslinieciskie kolektīvi</span></a></li>
                         <li><a href='#'><span>Sabiedriskās aktivitātes</span></a></li>
                         <li><a href='#'><span>Sports</span></a></li>
                         <li><a href='#'><span>Tradīcijas</span></a></li>
                      </ul>
                   </li>
                   <li><a href="#"><span>Kontakti</span></a>
                </ul>
            </div>
            <div class="head_image headparallax">
                <!--<div class="breadcrumbs" xmlns:v="http://rdf.data-vocabulary.org/#">
                    <?php // if(function_exists('bcn_display'))
                    {
//                        bcn_display();
                    }?>
                </div>-->

               
                <span id="breadcrumbs">
                    <!-- <div>
                        <a href="#">
                            Galvenā izvēlne
                        </a>
                    </div><img src="<?php echo get_stylesheet_directory_uri(); ?>/images/ui/navtree_end.png"/>
                    
                    <div><a href="#">
                        Stradiņa dzimta
                    </a></div><img src="<?php echo get_stylesheet_directory_uri(); ?>/images/ui/navtree_end.png"/>
                    
                    <div>
                        <a href="#">
                            Random Breadcrumb #3
                        </a>
                    </div> -->
                </span>

            <div class="layer" data-depth="0.3"></div>
        </div>
        <div class="head_image_bot">
            <ul class="social">
                    <li><a href="#" id="twitter"></a></li>
                    <li><a href="#" id="facebook"></a></li>
                    <li><a href="#" id="draugiem"></a></li>
                    <li><a href="#" id="gplus"></a></li>
            </ul>            
        </div>
</header>
		
