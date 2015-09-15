var ANIMATIONS = {
	/*
	 'post_name': {
	 	in: [	// animate on onpening page
		 	[pointer, animationClass, delay_ms] // anim1
		 	, ['#logo', 'fadeIn', 500] // anim2
		]
		, out [ ... ] // animate on closing page
	 }
	 */

	'titullapa': {
		in: [			
			  ['#mid1', 'growUp', 0]
			, ['#mid2', 'growDown', 500]
			, ['#fore1', 'fadeInUp', 200]
			, ['#foreLine', 'clipCenterV', 800]
			, ['#fore2', 'clipMoveDownLittle', 1100]
			, ['#fore3', 'fadeInDown', 1200]
			, ['#bigmore', 'fadeInUp2', 300]
			, ['#background', 'fadeIn', 0]
		]
		, out: [
			  ['#mid1', 'shrinkDown', 900]
			, ['#mid2', 'shrinkUp', 700]
			, ['#fore1', 'fadeOutDown', 300]
			, ['#foreLine', 'clipCenterVOut', 100]
			, ['#fore2', 'clipMoveUpLittleOut', 0]
			, ['#fore3', 'fadeOutUp', 300]
			, ['#bigmore', 'removeZoomIn', 0]
			, ['#background', 'fadeOut', 700]
		]
		, coolDown: 1700
	}

	, 'ievads-2': {
		in: [
			  ['article .cardboard', 'clipCenterV', 300]
			, ['article .cardboard img', 'animMushroom', 450]
			, ['article .cardboard p', 'cardbordTextfadeInDown', 600]
		]
		, out: [
			['article .cardboard', 'clipCenterV', 0]
		]
		, coolDown: 500
	}

	, 'mainmenu': {
		in: [
			['h1', 'titleBorder', 500]
		]
		, coolDown: 1500
	}

}