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
    <title><?php if(is_home() || is_front_page()) { echo bloginfo("name"); }
else
{ echo bloginfo("description");}?></title>
    <?php
 if (is_home() || is_front_page()) {
 echo '<meta property="og:title" content="RSU vēstures virtuālā ekspozīcija"/>';
 echo '<meta property="og:description" content="Virtuālais muzejs, izmantojot RSU muzejā sakopotos materiālus, palīdzēs Jums iepazīties ar to, kā noritējusi mūsu augstskolas attīstība dažādos vēsturiskajos laikposmos."/>';
}
else {
 echo '<meta property="og:title" content="RSU historical virtual exhibition"/>';
 echo '<meta property="og:description" content="Virtual Museum contains materials compiled by RSU Museum and will lead you through the stages of development of our university throughout various historical periods."/>';
 }
 ?>   
    <meta property="og:image" content="<?php echo get_stylesheet_directory_uri(); ?>/images/appImg.png"/>
<link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon.ico" />
<!--<meta charset="<?php // bloginfo( 'charset' ); ?>">-->
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, user-scalable=no, user-scalable=0"/>
<meta name="apple-mobile-web-app-capable" content="yes" />
<!--<meta charset="windows-1257"/>-->
<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/main.js" charset="utf-8"></script>
<!--<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/jquery.fullPage.js"></script>-->
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
<link id="styleswitch" rel="stylesheet" type="text/css" href="" media="screen" />
</head>
<body <?php body_class(); ?>>
     <script>
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '478546399016584',
          xfbml      : true,
          version    : 'v2.0'
        });
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    </script>
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <script type="text/javascript" async src="https://platform.twitter.com/widgets.js"></script>
    <script type="text/javascript" src="//www.draugiem.lv/api/api.js"></script>
    

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
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" id="logo_link">
				<object type="image/svg+xml" data="<?php echo get_stylesheet_directory_uri(); ?>/images/logo.svg" id="header_logo_lv"></object>
                                <object type="image/svg+xml" data="<?php echo get_stylesheet_directory_uri(); ?>/images/logo_en.svg" id="header_logo_en"></object>
			</a>
		</div>
            <span id="menu_toggle"></span>
            <span id="lang_toggle">
                <a href="<?php echo esc_url( home_url( '/en/' ) ); ?>" class="eng"></a>
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="lat"></a>
            </span>
            <span id="game_toggle"><a class="eng" onclick="game.startPopup();">GAME</a>  <a class="lat" onclick="game.startPopup();">SPĒLE</a></span>
            <span id="search"><input id="searchfield" type="text"><button id="searchbutton"></button></span>
            <div id="mback"></div><div id="m_srchbtn"></div><div id="menuclose" class="mclose" style="display: none"></div>
            <div id='sidemenu'>
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
                         <li><a href='#latvijas-medicinas-akademija'><span>Latvijas Medicīnas akadēmija</span></a></li>
                         <li><a href='#rigas-stradina-universitate'><span>Rīgas Stradiņa universitāte</span></a></li>
                         <li><a href='#rektori-menu'><span>Rektori</span></a></li>
                      </ul>
                   </li>
                   <li><a href="#augstskolas-struktura"><span>Struktūra</span></a>
                   </li>
                   <li class='has-sub'><a><span>Zinātne un pedagoģija</span></a>
                       <ul>
                         <li><a href='#zinatne'><span>Zinātne</span></a></li>
                         <li><a href='#pedagogija'><span>Pedagoģija</span></a></li>
                       </ul>
                   </li>
                   <li class='has-sub'><a><span>Personības</span></a>
                      <ul>
                         <li><a href='#veselibas-aprupe'><span>Veselības aprūpe</span></a></li>
                         <li><a href='#socialas-zinatnes2'><span>Sociālās zinātnes</span></a></li>
                         <li><a href='#atpazistamas-personibas'><span>Atpazīstamas personības</span></a></li>
                      </ul>
                   </li>
                   <li class='has-sub'><a><span>Ārpus studijām</span></a>
                      <ul>
                         <li><a href='#polakt'><span>Okupācijas laikā</span></a></li>
                         <li><a href='#sabakt'><span>Sabiedriskās aktivitātes</span></a></li>
                         <li><a href='#kolektivi'><span>Mākslinieciskie kolektīvi</span></a></li>                         
                         <li><a href='#sports'><span>Sports</span></a></li>
                         <li><a href='#svetki'><span>Tradīcijas</span></a></li>
                      </ul>
                   </li>
                   <li><a href="#kontakti"><span>Kontakti</span></a>
                </ul>
            </div>
            
            <div id='sidemenu_en'>
                <ul>
                   <li class='has-sub'><a><span>Beginnings</span></a>
                       <ul>
                         <li><a href='#medicine'><span>Medicine</span></a></li>
                         <li><a href='#social-sciences'><span>Social sciences</span></a></li>
                       </ul>
                   </li>
                   <li class='has-sub'><a><span>Development</span></a>
                      <ul>
                         <li><a href='#riga-medical-institute'><span>Rīga Medical Institute</span></a></li>
                         <li><a href='#medical-academy-of-latvia'><span>Medical Academy of Latvia</span></a></li>
                         <li><a href='#riga-stradins-university'><span>Rīga Stradiņš University</span></a></li>
                         <li><a href='#rectors'><span>Rectors</span></a></li>
                      </ul>
                   </li>
                   <li><a href="#institution-structure"><span>Structure</span></a>
                   </li>
                   <li class='has-sub'><a><span>Research and paedagogy</span></a>
                       <ul>
                         <li><a href='#research'><span>Research</span></a></li>
                         <li><a href='#paedagogy'><span>Paedagogy</span></a></li>
                       </ul>
                   </li>
                   <li class='has-sub'><a><span>Personalities</span></a>
                      <ul>
                         <li><a href='#healthcare'><span>Health care</span></a></li>
                         <li><a href='#social-sciences-2'><span>Social sciences</span></a></li>
                         <li><a href='#famous-personalities'><span>Famous personalities</span></a></li>
                      </ul>
                   </li>
                   <li class='has-sub'><a><span>Activities</span></a>
                      <ul>
                         <li><a href='#polact'><span>Occupation period</span></a></li>
                         <li><a href='#socact'><span>Social activities</span></a></li>
                         <li><a href='#collectives'><span>Art collectives</span></a></li>                         
                         <li><a href='#sports'><span>Sports</span></a></li>
                         <li><a href='#festivities'><span>Festivities</span></a></li>
                      </ul>
                   </li>
                   <li><a href="#contacts"><span>Contacts</span></a>
                </ul>
            </div>
            
            <div id='msidemenu'>
                <ul>
                   <li class='has-sub'><div></div><a href='#pirmsakumi'><span>Studiju virzienu pirmsākumi</span></a>
                       <ul>
                         <li><a href='#medicina'><span>Medicīna</span></a></li>
                         <li><a href='#socialas-zinatnes'><span>Sociālās zinātnes</span></a></li>
                       </ul>
                   </li>
                   <li class='has-sub'><div></div><a href="#attistiba-menu"><span>Augstskolas attīstība</span></a>
                      <ul>
                         <li><a href='#rigas-medicinas-instituts'><span>Rīgas Medicīnas institūts</span></a></li>
                         <li><a href='#latvijas-medicinas-akademija'><span>Latvijas Medicīnas akadēmija</span></a></li>
                         <li><a href='#rigas-stradina-universitate'><span>Rīgas Stradiņa universitāte</span></a></li>
                         <li><a href='#rektori-menu'><span>Rektori</span></a></li>
                      </ul>
                   </li>
                   <li><a href="#augstskolas-struktura"><span>Augstskolas struktūra</span></a>
                   </li>
                   <li class='has-sub'><div></div><a href="#zinatne-un-pedagogija"><span>Zinātne un pedagoģija</span></a>
                       <ul>
                         <li><a href='#zinatne'><span>Zinātne</span></a></li>
                         <li><a href='#pedagogija'><span>Pedagoģija</span></a></li>
                       </ul>
                   </li>
                   <li class='has-sub'><div></div><a href="#izcilas-personibas"><span>Izcilas personības</span></a>
                      <ul>
                         <li><a href='#veselibas-aprupe'><span>Veselības aprūpe</span></a></li>
                         <li><a href='#socialas-zinatnes2'><span>Sociālās zinātnes</span></a></li>
                         <li><a href='#atpazistamas-personibas'><span>Atpazīstamas personības</span></a></li>
                      </ul>
                   </li>
                   <li class='has-sub'><div></div><a href="#arpus-menu"><span>Ārpus studijām</span></a>
                      <ul>
                         <li><a href='#polakt'><span>Okupācijas laikā</span></a></li>
                         <li><a href='#sabakt'><span>Sabiedriskās aktivitātes</span></a></li>
                         <li><a href='#kolektivi'><span>Mākslinieciskie kolektīvi</span></a></li>                         
                         <li><a href='#sports'><span>Sports</span></a></li>
                         <li><a href='#svetki'><span>Tradīcijas</span></a></li>
                      </ul>
                   </li>
                   <li class='has-sub' id='mcontacts'><div></div><a href="#" id='contlink'><span>Kontakti</span></a>
                       <ul>
                           <li>
                               <p>Tālrunis: <a href="tel:22003426">22003426</a></p>
                               <p>E-pasts: <a href="mailto:muzejs@rsu.lv">muzejs@rsu.lv</a></p>
                               <p><a href="http://www.rsu.lv/par-rsu/rsu-muzejs" id='mcont_link'>http://www.rsu.lv/par-rsu/rsu-muzejs</a></p>
                           </li>
                       </ul>
                   </li>
                   <li><a class="game-activate" onclick="game.startPopup();"><span>Spēle</span></a>
                </ul>
            </div>
            
            <div id='msidemenu_en'>
                <ul>
                   <li class='has-sub'><div></div><a href='#beginnings'><span>Beginnings</span></a>
                       <ul>
                         <li><a href='#medicine'><span>Medicine</span></a></li>
                         <li><a href='#social-sciences'><span>Social sciences</span></a></li>
                       </ul>
                   </li>
                   <li class='has-sub'><div></div><a href="#development-menu"><span>University development</span></a>
                      <ul>
                         <li><a href='#riga-medical-institute'><span>Rīga Medical Institute</span></a></li>
                         <li><a href='#medical-academy-of-latvia'><span>Medical Academy of Latvia</span></a></li>
                         <li><a href='#riga-stradins-university'><span>Rīga Stradiņš University</span></a></li>
                         <li><a href='#rectors'><span>Rectors</span></a></li>
                      </ul>
                   </li>
                   <li><a href="#institution-structure"><span>Structure of the institution</span></a>
                   </li>
                   <li class='has-sub'><div></div><a href="#research-paedagogy"><span>Research and paedagogy</span></a>
                       <ul>
                         <li><a href='#research'><span>Research</span></a></li>
                         <li><a href='#paedagogy'><span>Paedagogy</span></a></li>
                       </ul>
                   </li>
                   <li class='has-sub'><div></div><a href="#outstanding-personalities"><span>Outstanding personalities</span></a>
                      <ul>
                         <li><a href='#healthcare'><span>Health care</span></a></li>
                         <li><a href='#social-sciences-2'><span>Social sciences</span></a></li>
                         <li><a href='#famous-personalities'><span>Famous personalities</span></a></li>
                      </ul>
                   </li>
                   <li class='has-sub'><div></div><a href="#extracurricular-menu"><span>Extracurricular activities</span></a>
                      <ul>
                         <li><a href='#polact'><span>Occupation period</span></a></li>
                         <li><a href='#socact'><span>Social activities</span></a></li>
                         <li><a href='#collectives'><span>Art collectives</span></a></li>                         
                         <li><a href='#sports'><span>Sports</span></a></li>
                         <li><a href='#festivities'><span>Festivities</span></a></li>
                      </ul>
                   </li>
                   <li class='has-sub' id='mcontacts'><div></div><a href="#" id='contlink'><span>Contacts</span></a>
                       <ul>
                           <li>
                               <p>Phone: <a href="tel:22003426">22003426</a></p>
                               <p>E-mail: <a href="mailto:muzejs@rsu.lv">muzejs@rsu.lv</a></p>
                           </li>
                       </ul>
                   </li>
                   <li><a class="game-activate" onclick="game.startPopup();"><span>Game</span></a>
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

            <div class="layer active" data-depth="0.3"></div>
            <div class="layer inactive" data-depth="0.3"></div>
        </div>
        <div class="head_image_bot">
            <ul class="social">
                    <li><a href="https://twitter.com/intent/tweet" class="twitter"></a></li>
                    <li><a class="facebook"></a></li>
                    <li><a class="draugiem"></a></li>
                    <li><a
  data-contenturl="http://vesture.rsu.lv"
  data-contentdeeplinkid="/pages"
  data-clientid="573097370645-8rubdrtbr59q01e2gdva8pfvrrjtfrv3.apps.googleusercontent.com"
  data-cookiepolicy="single_host_origin"
  data-prefilltext="Uzzini visu par RSU vēstures attīstību un gaitu RSU vēstures virtuālajā ekspozīcijā."
  data-calltoactionlabel="RECOMMEND"
  data-calltoactionurl="http://vesture.rsu.lv"
  data-calltoactiondeeplinkid="/pages/create" class="gplus g-interactivepost"></a></li>
            </ul>            
        </div>
</header>
		<div id="game-container"></div>
            <div id="game-inner">
                <div class="game-content">    
                    <div id="game-close" class="mclose"></div>
                    <div id="game-intro">
                        <p class="game-title">Esi sveicināts RSU vēstures virtuālās ekspozīcijas spēlē!</p>
                        <div class="foreLine"></div>
                        <p class="game-subtitle">Vai vēlies pieņemt izaicinājumu un noskaidrot, cik labi pārzini RSU vēsturi?</p>
                        <div class="button-wrap">
                            <div class="game-button red decline">Nē</div>
                            <div class="game-button green confirm">Jā</div>
                        </div>
                    </div>
                    <div id="game-confirm-basic">
                        <p class="game-title">Ja tomēr pārdomā un vēlies spēlēt spēli, <em>meklē to blakus izvēlnei.</em></p>
                        <div class="game-button green confirm">OK</div>
                    </div>
                    <div id="game-cheers">
                        <p class="game-title">Tu nu gan esi gudrinieks! Veiksmi arī nākamajos jautājumos!</p>
                        <div class="game-button green confirm">Turpināt spēli</div>
                    </div>
                    <div id="game-confirm-advanced">
                        <p class="game-title">Lieliski – varam sākt spēli!</p>
                        <div class="foreLine"></div>
                        <p class="game-subtitle">Spēles gaitā Tev jāatbild uz 12 jautājumiem, kuri periodiski parādīsies ekrānā. Turpini izzināt Rīgas Stradiņa universitātes vēstures virtuālo ekspozīciju, atbildi uz jautājumiem un noskaidro, kādas ir Tavas zināšanas par universitāti un tās vēsturi!</p>
                        <div class="game-button green confirm">ok</div>
                    </div>
                    <div id="game-over">
                         <p class="game-title">RSU studenti Tavā priekšā noņemtu cepuri,jo Tu esi īsts </br><em>RSU vēstures eksperts! </em></p>
                        <div class="foreLine"></div>
                        <p class="game-subtitle">Pastāsti par to saviem draugiem</p>
                        <ul class="social">
                            <li><a href="https://twitter.com/intent/tweet" class="twitter"></a></li>
                            <li><a class="facebook"></a></li>
                            <li><a class="draugiem"></a></li>
                            <li><a data-contenturl="http://vesture.rsu.lv"
  data-contentdeeplinkid="/pages"
  data-clientid="573097370645-8rubdrtbr59q01e2gdva8pfvrrjtfrv3.apps.googleusercontent.com"
  data-cookiepolicy="single_host_origin"
  data-prefilltext="Uzzini visu par RSU vēstures attīstību un gaitu RSU vēstures virtuālajā ekspozīcijā."
  data-calltoactionlabel="RECOMMEND"
  data-calltoactionurl="http://vesture.rsu.lv"
  data-calltoactiondeeplinkid="/pages/create" class="gplus g-interactivepost"></a></li>
                        </ul>    
                        <div class="game-button green confirm">Spēlēt vēlreiz</div>
                    </div>
                   <div id="game-question" class="">
                        <div id="lg-counter">
                            <span id="lg-counter-current">4</span> / <span id="lg-counter-all">12</span>
                        </div>
                        <img src="">
                        <p class="game-title"><em>Par ko vīriešiem bija jāmācās Rīgas Medicīnas institūtā</em>, lai institūts tiktu pabeigts ar virsnieka pakāpi bez obligātās karaklausības pildīšanas?</p>
                        <div class="button-wrap">
                            <div class="game-button gray">medmāsām</div>
                            <div class="game-button gray">ārstiem</div>
                            <div class="game-button gray">ārsta palīgiem</div>
                            <div class="game-button gray">kara ārstiem</div>
                        </div>                    
                    </div>
                    
                </div>
                
            </div>
