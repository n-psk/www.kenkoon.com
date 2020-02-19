$(document).ready(function(){
  var $container = $('#isotope_content');
  var $window = $(window);
  var isotopeItem = '.item_grid';
  var $images = $('img.lazy');
  
  $images.lazyload({
	  effect: "fadeIn",
	  failure_limit: Math.max($images.length - 1, 0),
  });  
			  
  $container.imagesLoaded( function(){
	  $container.isotope({
		itemSelector : '.item_grid',
		layoutMode: 'perfectMasonry',
		perfectMasonry : {
			columnWidth: 300,
			rowHeight: 260
		},
		sortBy : 'random',
		getSortData : {
		  symbol : function( $elem ) {
			return $elem.attr('data-symbol');
		  },
		  category : function( $elem ) {
			return $elem.attr('data-category');
		  },
		  number : function( $elem ) {
			return parseInt( $elem.find('.number').text(), 10 );
		  },
		  weight : function( $elem ) {
			return parseFloat( $elem.find('.weight').text().replace( /[\(\)]/g, '') );
		  },
		  name : function ( $elem ) {
			return $elem.find('.name').text();
		  }
		},
		onLayout: function() {
		  $window.trigger("scroll");
		}
	  });
  });
  
  // change size of clicked element
  $container.delegate(isotopeItem, 'click', function(){
	  $('.item_grid').not(this).removeClass('large');
	  $(this).toggleClass('large');
	  $(this).find('.grid_title').fadeOut();
	  $container.isotope('reLayout');
  });
  
	/*Filter*/
	var $optionSets = $('.filter .option-set'),
		$optionLinks = $optionSets.find('li a');
		$optionMenu = $optionSets.find('li');
		
	$optionMenu.hoverIntent(
	  function() {
		  $(this).find('ul').slideToggle(400);
	  }, function() {
		  $(this).find('ul').slideToggle(400);
	  }
	);

	$optionLinks.click(function(){
	  var $this = $(this);
	  var $optionSet = $('.filter .option-set');
		  $optionLinks = $optionSets.find('li a');
		  
	  $optionLinks.removeClass('active');
	  $this.addClass('active');		
	  
	  onAnimationFinished = function(){
		  $window.trigger("scroll");
	  };
	  
	  // make option object dynamically, i.e. { filter: '.my-filter-class' }
	  var options = {},
		  key = $optionSet.attr('data-option-key'),
		  value = $this.attr('data-option-value');
		  
	  // parse 'false' as false boolean
	  value = value === 'false' ? false : value;
	  options[ key ] = value;
	  $container.isotope( options );
	  
	  setTimeout(function() {
		  onAnimationFinished();
	  }, 800);
	  
	  return false;
	});
	$('.reference_wrapper_m').addClass('loading');

	$('.reference_wrapper_m img.lazy:first').load(function(){
		if($(this).data('original') == $(this).attr('src')){
			$('.reference_wrapper_m .loading').fadeOut();
		  	console.log($(this).data('original')+' is show')
		}
	})
	$('.reference_m a').on('click', function(e){
		e.preventDefault(); 
		window.scrollTo(0, 0);
		var url = $(this).data('url'),
			filter = $(this).data('filter'),
			t = 400;
		$.ajax({
			url: url,
			beforeSend: function() {
				$('.reference_wrapper_m .loading').fadeIn();
			},
			success: function(data){
				if (filter == 'all') {
					$('#ajax_content').html('').html( $(data).find('#ajax_content').html() );
				} else {
					$('#ajax_content').html('').html( $(data).find('#ajax_'+filter).html() );
				}
				$(".reference_wrapper_m img.lazy").lazyload({
				    effect : "fadeIn",
				    // container: $('.content_wrapper'),
				});
			},
			complete: function() {
				$('.reference_wrapper_m img.lazy:first').load(function(){
					if($(this).data('original') == $(this).attr('src')){
						$('.reference_wrapper_m .loading').fadeOut();
					  	console.log($(this).data('original')+' is show')
					}
				})
			}
		}); 
	});
});
