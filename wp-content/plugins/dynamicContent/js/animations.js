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
			  ['#masthead', 'moveDown', 300]
			, ['#footer', 'moveUp', 750]
			, ['#mid1', 'growUp', 0]
			, ['#mid2', 'growDown', 500]
			, ['#fore1', 'fadeInUp', 200]
			, ['#foreLine', 'clipCenterV', 1000]
			, ['#fore2', 'clipMoveDown', 1300]
			, ['#fore3', 'fadeInDown', 700]
			, ['#bigmore', 'fadeInUp2', 300]
		]
		, out: [
			  ['#mid1', 'shrinkDown', 700]
			, ['#mid2', 'shrinkUp', 500]
			, ['#fore1', 'fadeOutDown', 300]
			, ['#foreLine', 'clipCenterVOut', 100]
			, ['#fore2', 'clipMoveUpOut', 800]
			, ['#fore3', 'fadeOutUp', 300]
			, ['#bigmore', 'removeZoomIn', 0]
			// , ['#background', 'fadeOut', 500]
		]
	}

	, 'ievads-2': {
		in: [
			['article .stripes', 'jumpUp', 500]
			, ['article .cardboard', 'jumpUp', 700]
		]
		, out: [
			['article .stripes', 'jumpDownOut', 300]
			, ['article .cardboard', 'jumpDownOut', 0]
		]
	}

}