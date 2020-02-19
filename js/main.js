function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function wrapper_height() {
    var winHeight = $(window).height();
    var bodyHeight = winHeight - 50;
    $(".full_wrapper").css('height', parseInt(bodyHeight) + 'px');
	if(window.innerHeight > window.innerWidth) {
		$(".banner_wrapper").css('height', parseInt(bodyHeight*0.5) + 'px');
		$('ul#about_us').each(function() {
			$(this).css({
				'top': parseInt(winHeight/2) + 'px',
				'margin-top':'-'+$(this).height()/2+'px',
			})
		});
	} else {
		$(".banner_wrapper").css('height', parseInt(bodyHeight) + 'px');
		$('#about_us').css({'top':'','margin-top':''})
	}

}

//Preloader 

function preloaderInit() {
    var bgImg = [], 
    img = [], 
    count=0, 
    percentage = 0;
    if (!Array.prototype.indexOf){
      Array.prototype.indexOf = function(elt /*, from*/){
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0)
             ? Math.ceil(from)
             : Math.floor(from);
        if (from < 0)
          from += len;
        for (; from < len; from++){
          if (from in this &&
              this[from] === elt)
            return from;
        }
        return -1;
      };
    }
    //Searching all elemnts in the page for image
    $('*').filter(function() {
        var val = $(this).css('background-image').replace(/url\(/g,'').replace(/\)/,'').replace(/"/g,'');
        var imgVal = $(this).not('script').attr('src');
        if(val !== 'none' && !/linear-gradient/g.test(val) && bgImg.indexOf(val) === -1){
            bgImg.push(val)
        }
        if(imgVal !== undefined && img.indexOf(imgVal) === -1){
            img.push(imgVal)
        }
    });

    var imgArray = bgImg.concat(img); 

    $.each(imgArray, function(i,val){ //Adding load and error event
        $("<img />").attr("src", val).bind("load", function () {
            loadcomplete();
        });
        $("<img />").attr("src", val).bind("error", function () {
            loaderror(this);
        });
    });

    loaderror = function(arg) {
        $('#loaderMask').html("Image failed to load.. Loader quitting..").delay(3000).fadeOut(1000, function(){
            $('#loaderMask').remove();
        })
    }  

    loadcomplete = function() {
        count++;
        percentage = Math.floor(count / imgArray.length * 100);
        // console.log(percentage);
        renderProgress(percentage);
        if (percentage > 0 ) {
        	$('.loader').fadeIn(1000).addClass('active');
        }
        if (percentage == 100 ) {
        	$('.loader').removeClass('active');
        	setTimeout(function() {
            	$('#preloader_container').fadeOut();
            }, 1000);
        }
    }
}

function renderProgress(progress) {
    progress = Math.floor(progress);
    
    if(progress<25){
        var angle = -90 + (progress/100)*360;
        $(".animate-0-25-b").css("transform","rotate("+angle+"deg)");
    }
    else if(progress>=25 && progress<50){
        var angle = -90 + ((progress-25)/100)*360;
        $(".animate-0-25-b").css("transform","rotate(0deg)");
        $(".animate-25-50-b").css("transform","rotate("+angle+"deg)");
    }
    else if(progress>=50 && progress<75){
        var angle = -90 + ((progress-50)/100)*360;
        $(".animate-25-50-b, .animate-0-25-b").css("transform","rotate(0deg)");
        $(".animate-50-75-b").css("transform","rotate("+angle+"deg)");
    }
    else if(progress>=75 && progress<=100){
        var angle = -90 + ((progress-75)/100)*360;
        $(".animate-50-75-b, .animate-25-50-b, .animate-0-25-b").css("transform","rotate(0deg)");
        $(".animate-75-100-b").css("transform","rotate("+angle+"deg)");
    }
    if(progress==100){
    }
    $(".text").html(progress+"%");
}
  
function clearProgress() {
    $(".animate-75-100-b, .animate-50-75-b, .animate-25-50-b, .animate-0-25-b").css("transform","rotate(90deg)");
}


$(document).ready(function() {

	window.scrollTo(0, 0);

	function submenuHoverInit() {
		var $menuli = $('ul.main_menu > li');
		init = function() {
			$menuli.hoverIntent (
			function() {
				$(this).children('ul.sub_menu').slideDown(400);
			}, function() {
				$(this).children('ul.sub_menu').slideUp(400);
			});
		},
		destroy = function() {
			$menuli.unbind();
		},
		setup = function() {
			if (window.innerHeight > window.innerWidth) {
				destroy();
			} else {
				init();
				$('.submenu_section').show();
			}
			console.log('submenu hover setup!!')
		}
		setup();
		$(window).resize(function(){
			setup();
		})
	}
	submenuHoverInit();	

	$('header .logo').fadeIn(1500);
	if ($('.reference_wrapper_m').length == 0) {
		preloaderInit(); 
		$(document).ajaxStart(function() { $('#preloader_container').show(); })
    	.ajaxStop(function() { $('#preloader_container').fadeOut(); wrapper_height() });
	} else {
		$('#preloader_container').hide();
	}
	
    wrapper_height();
    $(window).bind('resize', wrapper_height);

     $.fn.clickToggle = function(func1, func2) {
        var funcs = [func1, func2];
        this.data('toggleclicked', 0);
        this.click(function(e) {
        	e.preventDefault();
            var data = $(this).data();
            var tc = data.toggleclicked;
            $.proxy(funcs[tc], this)();
            data.toggleclicked = (tc + 1) % 2;
        });
        return this;
    };
	
	if (Modernizr.touch && window.innerHeight > window.innerWidth) {
		$('ul.main_menu > li.has_submenu > a').click(function(e){
			e.preventDefault();
		})
		$('ul.main_menu > li').click(function(){
			var sub = $('ul.sub_menu'),
				self = $(this).children('ul.sub_menu');
			if(sub.is(':visible')){
			   $('ul.sub_menu').slideUp(400)
			   if (self.is(':hidden')) {
			   	 self.slideDown(400);
			   }
			}
			else {
				self.slideDown(400);
			}
		})
		$('.content_wrapper').click(function(){
			if($('ul.sub_menu').is(':visible')){
				$('ul.sub_menu').slideUp(400);
			}
		});
	}

	$('body > header').addClass('active');
	
	/*Menu on Mobile Devices*/
	var menuClose = function() {
		$('.menu_container_m > ul').slideUp(400);
	}
	$('#menu_toggler').click (function() {
		$(this).next('ul').slideToggle(400);
		$('ul#products').add('ul#about_us').fadeOut().find('.submenu_section').fadeOut();
		$('#submenu_overlay').fadeOut(400);
	});
	
	$('.menu_container_m > ul').mouseleave (function() {
		menuClose();
	});
	
	
	// Toggle submenu on mobile
	$('.menu_container_m').on( 'click', '.product', function(){
		$('ul#products').fadeIn().find('.cat_type').fadeIn();
		$('#submenu_overlay').fadeIn(400);
		menuClose();
	}).on( 'click', '.collection', function(){
		$('ul#products').fadeIn().find('.cat_mat').fadeIn();
		$('#submenu_overlay').fadeIn(400);
		menuClose();
	}).on( 'click', '.about-us', function(){
		$('ul#about_us').fadeIn();
		$('#submenu_overlay').fadeIn(400);
		menuClose();
	})
	
    var largeImg={width: "800px",height: "auto"};
    var smallImg={width: "400px",height: "auto"};
    var count=1; 
	
	$('#enlarge').live('click', function(e) {
		if ($(this).width() == 400) {
        	$(this).animate(largeImg);
		return false;
		} else {
        	$(this).animate(smallImg);
		}
	});
	
	$('.onethird_hor_container .branch').on('click', function(e) {
		$('.contact').not(this).stop(true, false).slideUp(1000, function(){
			$(this).hide().css('height','');
		});
		$(this).parent().children('.contact').delay(1000).stop(true, false).slideToggle(1000);
		$('.map img').animate(smallImg);
	});
	
	$('#video').css({ width: $(window).innerWidth() + 'px', height: $(window).innerHeight() + 'px' });

	$('.arrow_ajax').live('click', function(e) {
		e.preventDefault(); 
		var $url = $(this).data('url');
		$.ajax({
			url: $url,
			success: 
			function(data){
				//Load the href
				// if(window.innerHeight > window.innerWidth) {
				// 	$('.presentation_container_m').html('').html( $(data).find('#mobile_content').html() ).fadeIn(400);
				// } else {
					$('.content_wrapper').html('').html( $(data).find('#ajax_content').html() ).fadeIn(400);
					$('.maximage').maximage({
						cycleOptions: {
							fx: 'scrollHorz',
							speed: 1000, // Has to match the speed for CSS transitions in jQuery.maximage.css (lines 30 - 33)
							timeout: 8000,
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
						}
					});
					$('#html5video').maximage('maxcover');
					$('.in-slide-content').delay(1200).fadeIn();
				// }
			},
			complete: function() {
			}
		}); 
	});	
  
	// Resizing
	$(window).resize(function(){
		$('#submenu_overlay').fadeOut();
		$('ul.sub_menu').slideUp(400);
		$('#video').css({ width: $(window).innerWidth() + 'px', height: $(window).innerHeight() + 'px' });
		if (window.innerHeight > window.innerWidth) { // Portrait orientation
			console.log('port')
		} else { // Landscape orientation
			console.log('land')
		}
	});
});

$(window).load(function() {

	$('#preloader_container, .loader').fadeOut();

	function updateParam(param, val) {
		var url = document.URL;
		var newParam = url.replace(url.split('?')[1], param+'='+val);
		history.pushState({}, "", newParam);
	}

	function filterTrigger(cat) {
		$('ul#filters').find('a[data-option-value=".'+cat+'"]').trigger('click');
	}

	if (!Modernizr.touch && $('body').hasClass('grid_view')) {
		var type = getUrlParameter('type');
		var mat = getUrlParameter('mat');
		var t = 0;
		// $('body.grid_view')
		if (typeof type != 'undefined' && typeof mat == 'undefined') {
			filterTrigger(type)
			// setTimeout(function(){ filterTrigger(type) }, t);
			console.log(type);
		}
		if (typeof type == 'undefined' && typeof mat != 'undefined') {
			filterTrigger(mat)
			// setTimeout(function(){ filterTrigger(mat) }, t);;
			console.log(mat);
		}	        	
		$('ul.sub_menu').on('click', 'a[data-filter]', function(e){
			if ($('body').hasClass('product_grid')) {
				e.preventDefault();
				$(this).each( function(){
					var cat = $(this).attr('data-filter'),
						href = $(this).attr('href');
						getparam = function() {
							if (href.indexOf("type") >= 0) {
								return 'type';
							}
							if (href.indexOf("mat") >= 0) {
								return 'mat';
							}
						}
					updateParam(getparam(), cat)
					filterTrigger(cat);
					$('ul.sub_menu').slideUp(400);
				})
			}
		})
	}

	if (Modernizr.touch) {
		$('a[data-filter="chair"]').attr('href', 'product.php?cid=&id=16');
		$('a[data-filter="sofa"]').attr('href', 'product.php?cid=&id=19');
		$('a[data-filter="tabl"]').attr('href', 'product.php?cid=&id=15');
		$('a[data-filter="gazebo"]').attr('href', 'product.php?cid=&id=68');
		$('a[data-filter="accessories"]').attr('href', 'product.php?cid=&id=134');

		$('a[data-filter="teak_stainless"]').attr('href', 'collection.php?cid=1');
		$('a[data-filter="pure_teak"]').attr('href', 'collection.php?cid=2');
		$('a[data-filter="mesh_teak"]').attr('href', 'collection.php?cid=3');
		$('a[data-filter="glass_stainless"]').attr('href', 'collection.php?cid=4');
	}

	$('.item_grid').hoverIntent (
		function() {
			$(this).find('.grid_title').fadeIn();
		}, function () {
			$(this).find('.grid_title').fadeOut();
		}
	);
});