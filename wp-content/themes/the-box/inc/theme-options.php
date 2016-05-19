<?php
/**
 * The Box Theme Options
 *
 * @package thebox
 * @since thebox 1.0
 */


add_action( 'admin_init', 'thebox_options_init' );
add_action( 'admin_menu', 'thebox_options_add_page' );


/**
 * Init plugin options to white list our options
 *
 */
 
function thebox_options_init(){
	register_setting( 'thebox_options', 'thebox_theme_options', 'thebox_options_validate' );
}


/**
 * Load up the menu page
 *
 */
 
function thebox_options_add_page() {
	add_theme_page( __( 'Theme Options', 'thebox' ), __( 'Theme Options', 'thebox' ), 'edit_theme_options', 'theme_options', 'thebox_options_do_page' );
}


/**
 * Create the options page
 *
 */
 
function thebox_options_do_page() {

	if ( ! isset( $_REQUEST['settings-updated'] ) )
		$_REQUEST['settings-updated'] = false;
	?>
	<div class="wrap">
		<?php echo "<h2>" . wp_get_theme() . __( ' Theme Options', 'thebox' ) . "</h2>"; ?>
		
		<?php if ( false !== $_REQUEST['settings-updated'] ) : ?>
		<div class="updated fade"><p><strong><?php _e( 'Options saved', 'thebox' ); ?></strong></p></div>
		<?php endif; ?>
			
		<table class="form-table">
			<tr valign="top">
				<th scope="row"><strong><?php _e( 'Support', 'thebox' ); ?></strong></th>
				<td>
					<p>
						<a href="http://design.altervista.org/thebox-documentation"><?php _e( 'You find documentation here', 'thebox' ); ?></a>
					</p>
				</td>
			</tr>
			<tr valign="top">
				<th scope="row"><strong><?php _e( 'The Box Plus', 'thebox' ); ?></strong></th>
				<td>
					<p>
						<?php _e( 'Want more customizations and flexibility?', 'thebox' ); ?>
						<a href="http://design.altervista.org/thebox-plus"><strong><?php _e( 'Try The Box Plus.', 'thebox' ); ?></strong></a>
					</p>
				</td>
			</tr>
		</table>		
		
		<hr>
		<h3><?php _e( 'Social Links', 'thebox' ); ?></h3>
		<p><?php _e( 'These options will let you setup the social icons at the top of the theme. You can enter the URLs of your profiles to have the icons show up.', 'thebox' ); ?></p>
		<p><?php _e( 'Leave blank to hide the social icons.', 'thebox' ); ?></p>

		<form method="post" action="options.php">
		<?php settings_fields( 'thebox_options' ); ?>
		<?php $options = get_option( 'thebox_theme_options' ); ?>
			
			<table class="form-table">

				<?php
				/**
				 * RSS Icon
				 */
				?>
				<tr valign="top"><th scope="row"><?php _e( 'Hide RSS Icon?', 'thebox' ); ?></th>
					<td>
						<input id="thebox_theme_options[hiderss]" name="thebox_theme_options[hiderss]" type="checkbox" value="1" <?php checked( '1', $options['hiderss'] ); ?> />
						<label class="description" for="thebox_theme_options[hiderss]"><?php _e( 'Hide the RSS feed icon?', 'thebox' ); ?></label>
					</td>
				</tr>

				<?php
				/**
				 * Facebook Icon
				 */
				?>
				<tr valign="top"><th scope="row"><?php _e( 'Facebook URL', 'thebox' ); ?></th>
					<td>
						<input id="thebox_theme_options[facebookurl]" class="regular-text" type="text" name="thebox_theme_options[facebookurl]" value="<?php echo esc_attr( $options['facebookurl'] ); ?>" />
					</td>
				</tr>
				
				<?php
				/**
				 * Twitter URL
				 */
				?>
				<tr valign="top"><th scope="row"><?php _e( 'Twitter URL', 'thebox' ); ?></th>
					<td>
						<input id="thebox_theme_options[twitterurl]" class="regular-text" type="text" name="thebox_theme_options[twitterurl]" value="<?php echo esc_attr( $options['twitterurl'] ); ?>" />
					</td>
				</tr>
				
				<?php
				/**
				 * Google +
				 */
				?>
				<tr valign="top"><th scope="row"><?php _e( 'Google + URL', 'thebox' ); ?></th>
					<td>
						<input id="thebox_theme_options[googleplusurl]" class="regular-text" type="text" name="thebox_theme_options[googleplusurl]" value="<?php echo esc_attr( $options['googleplusurl'] ); ?>" />
					</td>
				</tr>
				
				<?php
				/**
				 * LinkedIn
				 */
				?>
				<tr valign="top"><th scope="row"><?php _e( 'LinkedIn URL', 'thebox' ); ?></th>
					<td>
						<input id="thebox_theme_options[linkedinurl]" class="regular-text" type="text" name="thebox_theme_options[linkedinurl]" value="<?php echo esc_attr( $options['linkedinurl'] ); ?>" />
					</td>
				</tr>
				
				<?php
				/**
				 * Instagram
				 */
				?>
				<tr valign="top"><th scope="row"><?php _e( 'Instagram URL', 'thebox' ); ?></th>
					<td>
						<input id="thebox_theme_options[instagramurl]" class="regular-text" type="text" name="thebox_theme_options[instagramurl]" value="<?php echo esc_attr( $options['instagramurl'] ); ?>" />
					</td>
				</tr>
				
				<?php
				/**
				 * YouTube
				 */
				?>
				<tr valign="top"><th scope="row"><?php _e( 'YouTube URL', 'thebox' ); ?></th>
					<td>
						<input id="thebox_theme_options[youtubeurl]" class="regular-text" type="text" name="thebox_theme_options[youtubeurl]" value="<?php echo esc_attr( $options['youtubeurl'] ); ?>" />
					</td>
				</tr>
				
				<?php
				/**
				 * Pinterest
				 */
				?>
				<tr valign="top"><th scope="row"><?php _e( 'Pinterest URL', 'thebox' ); ?></th>
					<td>
						<input id="thebox_theme_options[pinteresturl]" class="regular-text" type="text" name="thebox_theme_options[pinteresturl]" value="<?php echo esc_attr( $options['pinteresturl'] ); ?>" />
					</td>
				</tr>
				
				<?php
				/**
				 * StumbleUpon
				 */
				?>
				<tr valign="top"><th scope="row"><?php _e( 'StumbleUpon URL', 'thebox' ); ?></th>
					<td>
						<input id="thebox_theme_options[stumbleuponurl]" class="regular-text" type="text" name="thebox_theme_options[stumbleuponurl]" value="<?php echo esc_attr( $options['stumbleuponurl'] ); ?>" />
					</td>
				</tr>
				
				<?php
				/**
				 * Flickr
				 */
				?>
				<tr valign="top"><th scope="row"><?php _e( 'Flickr URL', 'thebox' ); ?></th>
					<td>
						<input id="thebox_theme_options[flickrurl]" class="regular-text" type="text" name="thebox_theme_options[flickrurl]" value="<?php echo esc_attr( $options['flickrurl'] ); ?>" />
					</td>
				</tr>
				
				<?php
				/**
				 * Tumblr
				 */
				?>
				<tr valign="top"><th scope="row"><?php _e( 'Tumblr URL', 'thebox' ); ?></th>
					<td>
						<input id="thebox_theme_options[tumblrurl]" class="regular-text" type="text" name="thebox_theme_options[tumblrurl]" value="<?php echo esc_attr( $options['tumblrurl'] ); ?>" />
					</td>
				</tr>
				
				<?php
				/**
				 * Medium
				 */
				?>
				<tr valign="top"><th scope="row"><?php _e( 'Medium URL', 'thebox' ); ?></th>
					<td>
						<input id="thebox_theme_options[mediumurl]" class="regular-text" type="text" name="thebox_theme_options[mediumurl]" value="<?php echo esc_attr( $options['mediumurl'] ); ?>" />
					</td>
				</tr>
				
				<?php
				/**
				 * Github
				 */
				?>
				<tr valign="top"><th scope="row"><?php _e( 'Github URL', 'thebox' ); ?></th>
					<td>
						<input id="thebox_theme_options[githuburl]" class="regular-text" type="text" name="thebox_theme_options[githuburl]" value="<?php echo esc_attr( $options['githuburl'] ); ?>" />
					</td>
				</tr>
			</table>

			<p class="submit">
				<input type="submit" class="button-primary" value="<?php _e( 'Save Options', 'thebox' ); ?>" />
			</p>
			
		</form>
	</div>
	<?php
}


/**
 * Sanitize and validate input. Accepts an array, return a sanitized array.
 *
 */
 
function thebox_options_validate( $input ) {
		
	// Our checkbox value is either 0 or 1
	if ( ! isset( $input['hiderss'] ) )
		$input['hiderss'] = null;
		$input['hiderss'] = ( $input['hiderss'] == 1 ? 1 : 0 );

	// Our text option must be safe text with no HTML tags
	$input['twitterurl'] = wp_filter_nohtml_kses( $input['twitterurl'] );
	$input['facebookurl'] = wp_filter_nohtml_kses( $input['facebookurl'] );
	$input['googleplusurl'] = wp_filter_nohtml_kses( $input['googleplusurl'] );
	$input['linkedinurl'] = wp_filter_nohtml_kses( $input['linkedinurl'] );
	$input['instagramurl'] = wp_filter_nohtml_kses( $input['instagramurl'] );
	$input['youtubeurl'] = wp_filter_nohtml_kses( $input['youtubeurl'] );
	$input['pinteresturl'] = wp_filter_nohtml_kses( $input['pinteresturl'] );
	$input['stumbleuponurl'] = wp_filter_nohtml_kses( $input['stumbleuponurl'] );
	$input['flickrurl'] = wp_filter_nohtml_kses( $input['flickrurl'] );
	$input['tumblrurl'] = wp_filter_nohtml_kses( $input['tumblrurl'] );
	$input['mediumurl'] = wp_filter_nohtml_kses( $input['mediumurl'] );
	$input['githuburl'] = wp_filter_nohtml_kses( $input['githuburl'] );
	
	// Encode URLs
	$input['twitterurl'] = esc_url_raw( $input['twitterurl'] );
	$input['facebookurl'] = esc_url_raw( $input['facebookurl'] );
	$input['googleplusurl'] = esc_url_raw( $input['googleplusurl'] );
	$input['linkedinurl'] = esc_url_raw( $input['linkedinurl'] );
	$input['instagramurl'] = esc_url_raw( $input['instagramurl'] );
	$input['youtubeurl'] = esc_url_raw( $input['youtubeurl'] );
	$input['pinteresturl'] = esc_url_raw( $input['pinteresturl'] );
	$input['stumbleuponurl'] = esc_url_raw( $input['stumbleuponurl'] );
	$input['flickrurl'] = esc_url_raw( $input['flickrurl'] );
	$input['tumblrurl'] = esc_url_raw( $input['tumblrurl'] );
	$input['mediumurl'] = esc_url_raw( $input['mediumurl'] );
	$input['githuburl'] = esc_url_raw( $input['githuburl'] );
	
	return $input;
}