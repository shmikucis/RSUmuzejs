<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package WordPress
 * @since The Box 1.0
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<h1 class="entry-title"><?php the_title(); ?></h1>
	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php the_content(); ?>
		<?php wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'thebox' ), 'after' => '</div>' ) ); ?>
	</div><!-- .entry-content -->
	<footer class="entry-footer">
		<p>
			<?php if ( ! post_password_required() && ( comments_open() || '0' != get_comments_number() ) ) : ?>
			<span class="comments-link">
				<?php comments_popup_link( __( '<span class="icon-font icon-comment-alt"></span> Leave a comment', 'thebox' ), __( '<span class="icon-font icon-comment"></span> 1 Comment', 'thebox' ), __( '<span class="icon-font icon-comments-alt"></span> % Comments', 'thebox' ) ); ?>
			</span>
			<?php endif; ?>
			<?php edit_post_link( __( 'Edit', 'thebox' ), '<span class="sep"></span><span class="edit-link">', '</span>' ); ?>
		</p>
	</footer>
</article><!-- #post-<?php the_ID(); ?> -->
