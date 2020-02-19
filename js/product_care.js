$(document).ready(function(e) {
			$('.mc-image').mouseenter(function() {
				if(window.innerHeight > window.innerWidth) {
					$(this).find('.presentation_container_ms').fadeIn();
					$('#click_to_read').fadeOut();
				}
			});
						
			$('.presentation_container_ms').mouseleave(function() {
				if(window.innerHeight > window.innerWidth) {
					$(this).fadeOut(); 
					$('#click_to_read').fadeIn();
				}
			});
		});
	
		$('.maximage').maximage({
			cycleOptions: {
				fx: 'scrollHorz',
				// Speed has to match the speed for CSS transitions
				speed: 1000, 
				timeout: 0,
				prev: '.arrow.left',
				next: '.arrow.right',
				pager: '.cycle-nav_index ul',
				pagerAnchorBuilder: function(idx, slide) {
					return '<li><a href="#"></a></li>';
				},
				pause: 1
			},
			onFirstImageLoaded: function(){
				jQuery('#cycle-loader').hide();
				jQuery('.maximage').fadeIn('fast');
			},
			verticalCenter: true,
			horizontalCenter: true,
			cssBackgroundSize: true,
			cssTransitions:false,
			fillElement: '.content_wrapper',
		});