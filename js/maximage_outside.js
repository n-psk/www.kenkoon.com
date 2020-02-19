$(document).ready(function(e) {

function isAuto() {
	if ($('.content_slide .slide').length <= 1) {
		return 8000; //auto play slideshow
	} else {
		return 0;
	}
}
function chageContentSlide(index) {
	if ($('.content_slide .slide').length == $('.maximage > *').length) {
		$('.content_slide').find('.slide').removeClass('active').eq(index).addClass('active');
	}
}

$('.maximage').maximage({
	cycleOptions: {
		fx: 'scrollHorz',
		// Speed has to match the speed for CSS transitions
		speed: 1000, 
		timeout: isAuto(),
		prev: '.arrow.left',
		next: '.arrow.right',
		containerResize: 1,
		pager: '.cycle-nav_index ul',
		pagerAnchorBuilder: function(idx, slide) {
			return '<li><a href="#"></a></li>';
		},
		pause: 1,
		onPagerEvent: function(zeroBasedSlideIndex, slideElement) {
			chageContentSlide(zeroBasedSlideIndex)
		},
		onPrevNextEvent: function(isNext, zeroBasedSlideIndex, slideElement) {
			chageContentSlide(zeroBasedSlideIndex)
		},
		before: function(currSlideElement, nextSlideElement, options, forwardFlag) {
			// nextid = nextSlideElement.index();
			// console.log(nextSlideElement)
		}
	},
	onFirstImageLoaded: function(){
		jQuery('#cycle-loader').hide();
		jQuery('.maximage').fadeIn('fast');
	},
	verticalCenter: true,
	horizontalCenter: true,
	cssBackgroundSize: true,
	cssTransitions:false,
	fillElement: '.banner_wrapper',
});

$('.video_icon').live('click', function(e) {
	if ($('#video').is(':hidden')) {
		$('#video').fadeIn(600).attr('src', $('#video').attr('src').replace('autoplay=0', 'autoplay=1'));
		$('.maximage').cycle('pause');
		$(this).addClass('actived');
		$("#clearvideo").attr('src'); 
	} else {
		$('#video').fadeOut(600).attr('src', $('#video').attr('src').replace('autoplay=1', 'autoplay=0'));
		$('.maximage').cycle('resume');
		$(this).removeClass('actived'); 
		$("#clearvideo").attr('src','');  
	}
});

});