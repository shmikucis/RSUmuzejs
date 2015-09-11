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
			  ['#mid1', 'growUp', 0]
			, ['#mid2', 'growDown', 500]
			, ['#fore1', 'fadeInUp', 200]
			, ['#foreLine', 'clipCenterV', 600]
			, ['#fore2', 'growUp fadeInDown2', 800]
			, ['#fore3', 'fadeInDown', 700]
			, ['#bigmore', 'fadeInUp2', 300]
		]
	}

	, 'ievads-2': {
		in: [

		]
		, out: [

		]
	}

}