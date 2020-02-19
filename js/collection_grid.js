$(document).ready(function(){
    var $container = $('#isotope_content');
    var $window = $(window);
    var $images = $('.item_grid img');
		    	
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
		  }
		});
	});
	
	
	  
	  /*Filter*/
      var $optionSets = $('.filter .option-set'),
          $optionLinks = $optionSets.find('li > a');

      $optionLinks.click(function(){
        var $this = $(this);
        // don't proceed if already selected
        var $optionSet = $('.filter .option-set');
            $optionLinks = $optionSets.find('li > a');
			
		$optionLinks.removeClass('active');
        $this.addClass('active');
		
		
        // make option object dynamically, i.e. { filter: '.my-filter-class' }
        var options = {},
            key = $optionSet.attr('data-option-key'),
            value = $this.attr('data-option-value');
        // parse 'false' as false boolean
        value = value === 'false' ? false : value;
        options[ key ] = value;
        if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
          // changes in layout modes need extra logic
          changeLayoutMode( $this, options )
        } else {
          // otherwise, apply new options
          $container.isotope( options );
        }
        
        return false;
      });
      
	  
	  $images.lazyload({
		  event : 'scroll',
		  effect: "fadeIn",
		  /*
		  appear: function(){
			alert('loaded image');
		  }
		  */
   	  });
	  
  });