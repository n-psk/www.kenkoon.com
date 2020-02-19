$(document).ready(function(e) {

	function chageContentSlide(index) {
		$('.content_slide').find('.slide').removeClass('active').eq(index).addClass('active');
	}

	// $('.maximage').maximage({
	// 	cycleOptions: {
	// 		fx: 'scrollHorz',
	// 		// Speed has to match the speed for CSS transitions
	// 		speed: 1000, 
	// 		timeout: 0,
	// 		prev: '.arrow.left',
	// 		next: '.arrow.right',
	// 		pager: '.cycle-nav_index ul',
	// 		pagerAnchorBuilder: function(idx, slide) {
	// 			return '<li><a href="#"></a></li>';
	// 		},
	// 		pause: 1,
	// 		onPagerEvent: function(zeroBasedSlideIndex, slideElement) {
	// 			chageContentSlide(zeroBasedSlideIndex)
	// 		},
	// 		onPrevNextEvent: function(isNext, zeroBasedSlideIndex, slideElement) {
	// 			chageContentSlide(zeroBasedSlideIndex)
	// 		}
	// 	},
	// 	onFirstImageLoaded: function(){
	// 		jQuery('#cycle-loader').hide();
	// 		jQuery('.maximage').fadeIn('fast');
	// 	},
	// 	verticalCenter: true,
	// 	horizontalCenter: true,
	// 	cssBackgroundSize: true,
	// 	cssTransitions:false,
	// 	fillElement: '.content_wrapper',
	// });
	
});