$.fn.fadeInOutInfinete = function(interval) {
	$(this).fadeOut(interval, function() {
		$(this).fadeIn(interval, function() {
			$(this).fadeInOutInfinete(interval);
		});
	});
};

$.fn.backgroundOver = function(options) {
	var defaults = {
			intervalInit: 200, 
			intervalEnd: 200
		},
		self = $(this), 
		match = null;

	if (self.html() == null) return false;

	match = self.css('backgroundImage').match(/url\("?([^"]*)"?\)/)
	options = $.extend(defaults, options);

	if (match.length > 0) {
		var url_image = match[1], 
			div = $('<div style="position:absolute;top:0;left:0;z-index:1;" class="clone-background-over">ttt</div>'), 
			new_background_image = url_image.replace('.png', '-over.png');

		self.css('backgroundImage', 'url("'+new_background_image+'")');
		self.append(div);
		div.css({width:self.width(), height:self.height(), backgroundImage:'url('+url_image+')'});

		self.hover(function() {
			$(this).find('.clone-background-over').stop().fadeTo(options.intervalInit, 0);
		}, function() {
			$(this).find('.clone-background-over').stop().fadeTo(options.intervalEnd, 1);
		});
	}
};

var options_skitter = {
	animations: 			[], 
	loading: 				[], 
	navigation: 			[], 
	options: 				[], 
	more_options: 		{
		controls_position: 	[], 
		focus_position: 	[], 
		numbers_align: 		[]
	}
};

$(document).ready(function() {

	
	$('pre.code').highlight({source:1, zebra:1, indent:'space', list:'ol'});

	$('#bt-apply').backgroundOver();
	$('#bt-config').backgroundOver({intervalInit: 300, intervalEnd: 200});
	$('#bt-download-wp').backgroundOver({intervalInit: 300, intervalEnd: 200});
	$('#bt-download-helper').backgroundOver({intervalInit: 300, intervalEnd: 200});
	$('#bt-download-stable').backgroundOver({intervalInit: 300, intervalEnd: 200});
	$('#bt-view-live').backgroundOver({intervalInit: 300, intervalEnd: 200});

	var box_config_animate = false,
		_height_config = null,
		_easing_config = null;
	
	// Config button
	$('#bt-config').click(function() {
		if (box_config_animate) return false;
		box_config_animate = true;

		if ($('#bt-apply').css('display') == 'block') {
			$('#bt-apply').animate({opacity:'hide', right:'0px'}, 300);
		}
		else if ($('#box-all-config ul li a.active').length > 0) {
			$('#bt-apply').animate({opacity:'show', right:'32px'}, 300, 'easeOutBack');
		}

		if ($('#box-config').css('display') != 'block') {
			_height_config = 'show';
			_easing_config = 'easeInExpo';
		} 
		else {
			_height_config = 'hide';
			_easing_config = 'easeOutExpo';
		}

		$('#box-config').animate({height:_height_config}, 500, _easing_config, function() {
			box_config_animate = false;
			if ($('#box-all-config .item-config.active').css('display') != 'block') {
				setTimeout(function() {
					activeConfig('#box-animations');
				}, 100);

			}
		});

		return false;
	});

	// Logo click
	$('#header h1 a').click(function() {
		$('#header nav a[rel="page-home"]').trigger('click');
		return false;
	});

	// Header nav
	var _is_animating_page = false;
	$('#header nav a').click(function() {
		if ($(this).hasClass('active') || _is_animating_page) return false;

		if ($(this).hasClass('none')) {
			document.location = $(this).attr('href');
			return false;
		}

		_is_animating_page = true;

		if ($(this).attr('rel') == 'page-comments') disqus();
		
		var div 			= '<div class="back-nav"></div>',
			_width 			= $(this).outerWidth(), 
			_height 		= $(this).outerHeight(), 
			_top 			= $(this).offset().top, 
			_left 			= $(this).offset().left,
			_rel 			= $(this).attr('rel'),
			_width_page 	= $(window).width(),
			_final_width 	= ($(this).index() > $('#header nav a.active').index()) ? _width_page : -_width_page;

		$('#header nav a.active').removeClass('active');
		$(this).addClass('active');

		$('body').css({'overflow':'hidden'});

		$('.page.active').css({'position':'absolute', 'width':'100%'}).animate({left:'-='+_final_width}, 500, 'easeInExpo', function() {
			$('.page.active').css({'position':'relative', 'width': 'auto', 'left': 'auto'}).removeClass('active').hide();
			$('#'+_rel).addClass('active').show().css({'position':'relative', 'width':'100%', 'left': _final_width}).animate({left:0}, 500, 'easeOutExpo', function() {
				$('body').css({'overflow':'auto'});
				_is_animating_page = false;
			});
		});

		return false;
	});

	// Menu configurations
	$('#nav-config a').click(function() {
		$('#nav-config .active').removeClass('active');
		$(this).addClass('active');
		var id = $(this).attr('href');
		activeConfig(id);
		return false;
	});

	$('.item-config a').click(function() {
		if ($('#bt-apply').css('display') != 'block') {
			$('#bt-apply').animate({opacity:'show', right:'32px'}, 300, 'easeOutBack');
		}
		return false;
	});

	// Animations: many options
	$('#box-animations a').click(function() {
		if ($(this).attr('rel') == 'random' || $(this).attr('rel') == 'randomSmart') {
			$('#box-animations a').removeClass('active');
			options_skitter.animations = [];
			options_skitter.animations[0] = $(this).attr('rel');
		}
		else {
			if (options_skitter.animations.length >= 10 && !$(this).hasClass('active')) return false;
			options_skitter.animations = addOrRemoveItem(options_skitter.animations, $(this).attr('rel'));
			
			$('#box-animations a[rel="random"]').removeClass('active');
			$('#box-animations a[rel="randomSmart"]').removeClass('active');

			var key1 = $.inArray('random', options_skitter.animations), 
				key2 = $.inArray('randomSmart', options_skitter.animations);

			if (key1 >= 0) options_skitter.animations.splice(key1, 1);
			if (key2 >= 0) options_skitter.animations.splice(key2, 1);
		}

		$(this).toggleClass('active');
		return false;
	});

	// Loading: one option
	$('#box-loading a').click(function() {
		options_skitter.loading[0] = $(this).attr('rel');
		$('#box-loading .active').removeClass('active');
		$(this).addClass('active');
		return false;
	});

	// Navigations: one option
	$('#box-navigation a').click(function() {
		options_skitter.navigation[0] = $(this).attr('rel');
		$('#box-navigation .active').removeClass('active');
		$(this).addClass('active');
		return false;
	});

	// Options: many options
	$('#box-options a').click(function() {
		if (options_skitter.options.length >= 10 && !$(this).hasClass('active')) return false;
		options_skitter.options = addOrRemoveItem(options_skitter.options, $(this).attr('rel'));
		$(this).toggleClass('active');
		return false;
	});

	// Todos os clicks
	$('#box-all-config ul li a').click(function() {
		if ($('#box-all-config ul li a.active').length == 0) {
			$('#bt-apply').animate({opacity:'hide', right:'0'}, 300);
		}
		return false;
	});

	// Footer
	// $('#footer').hover(function() {
	// 	$('#back-footer').stop().fadeTo(300, 1);
	// }, function() {
	// 	$('#back-footer').stop().fadeTo(200, 0.7);
	// });

	// Future plugin? --------------------------------
	// Select item
	var timer_list_select = null;
	var list_click = false;

	$('.select-item').mouseover(function() {
		if (list_click) return false;
		$('.list-select').hide();
		var list = $(this).parent().find('.list-select');
		var _top = -(list.height() / 2 - ($(this).outerHeight() / 2));
		var _left =  -(list.width() / 2 - ($(this).outerWidth() / 2));
		list.css({'top': _top, 'left': _left}).show();
	});
	
	$('.list-select').mouseout(function(e) {
		var self = $(this);
		clearInterval(timer_list_select);
		timer_list_select = setTimeout(function() {
			list_click = false;
			self.hide();
		}, 200);
	});

	$('.list-select li').mouseover(function(e) { clearInterval(timer_list_select); });

	$('.list-select li a').click(function() {
		list_click = true;
		$(this).parent().parent().hide();

		if ($(this).parent().parent().find('a.active').length == 0) {
			$(this).removeClass('active');
			$(this).parent().parent().parent().find('.select-item').removeClass('active');

			var rel = $(this).attr('rel');
			options_skitter.more_options[rel][0] = '';
		}
		else {
			$(this).parent().parent().find('a.active').removeClass('active');
			$(this).addClass('active');
			$(this).parent().parent().parent().find('.select-item').addClass('active');

			var rel = $(this).attr('rel');
			var position = $(this).attr('position');
			options_skitter.more_options[rel][0] = position;

			if ($.inArray(rel, options_skitter.options) == -1) {
				options_skitter.options.push(rel);
			}
		}

		return false;
	});

	// Apply button
	$('#bt-apply').click(function() {
		var params = new Array();
		if (options_skitter.animations.length) params.push('animation='+options_skitter.animations.join(','));
		if (options_skitter.loading.length) params.push('type_loading='+options_skitter.loading.join(','));
		if (options_skitter.navigation.length) params.push('type_navigation='+options_skitter.navigation.join(','));
		
		$.each(options_skitter.more_options, function(e, i) {
			if (i != '') {
				params.push(e+'='+i);
				if ((key = $.inArray(e, options_skitter.options)) >= 0) {
				 	options_skitter.options.splice(key, 1);
				}
			}
		});

		if (options_skitter.options.length) params.push('other_options='+options_skitter.options.join(','));

		document.location = '?'+params.join('&');
		return false
	});

	// Click coomon 
	$('#box-views a').click(function() {
		document.location = $(this).attr('href');
		return false;
	});

	// Language
	var _timer_lang = null;
	$('#bt-lang').hover(function() {
		$('#box-languages').slideDown();
	}, function() {
		_timer_lang = setTimeout('hideBoxLanguages()', 500);
	});

	$('#box-languages').hover(function() {
		clearInterval(_timer_lang);
	}, function() {
		_timer_lang = setTimeout('hideBoxLanguages()', 500);
	});

	// Animate flag
	$('#box-languages a').click(function() {
		var _top = $(this).offset().top, 
			_left = $(this).offset().left,
			clone = $(this).find('img').clone();

		$('body').append(clone);

		clone
			.css({left: _left, top: _top, position: 'absolute', zIndex: '5000'})
			.animate({width:'+=500', height:'+=500', left:'-=500', top: '+=10', opacity:'hide'}, 700);
	});

	updateActiveConfig();

	checkHash();

	// Live test!
	$('#box-live-test .live-animation li a').click(function() {
		$('#box-live-test .live-animation li a').removeClass('active');
		$(this).addClass('active');
		var rel = $(this).attr('rel');
		box_skitter_large.settings.animation = $(this).attr('rel');
		box_skitter_large.box_skitter.find('.next_button').trigger('click');
		return false;
	});

	var _top_live_animation = 0,
		_height_box_live_anination = $('#box-live-test').height(), 
		_height_live_anination = $('#box-live-test .live-animation').height() + 76, 
		_increment_live_animation = 50, 
		_max_top = -(_height_live_anination - _height_box_live_anination);
		
	$('#box-live-test').mousewheel(function(event, delta) {
		if (delta < 0) {
			_top_live_animation -= _increment_live_animation * Math.abs(delta);
		} else {
			_top_live_animation += _increment_live_animation * Math.abs(delta);
		}
		if (_top_live_animation >= 10) {
			_top_live_animation = 10;
		}
		else if ( _top_live_animation <= _max_top ) {
			_top_live_animation = _max_top;
		}
		$('#box-live-test .live-animation').stop().animate({top: _top_live_animation}, 200);
		//$('#box-live-test .live-animation').css({top: _top_live_animation});
		return false;
	});

	$('#bt-view-live').click(function() {
		if (parseInt($('#box-live-test').css('left')) != 0) {
			$(this).stop().animate({left: 150}, 200, 'easeOutQuad');
			$('#box-live-test').stop().animate({left: 0}, 200, 'easeOutQuad');
		}
		else {
			$(this).stop().animate({left: 0}, 300, 'easeInQuad');
			$('#box-live-test').stop().animate({left: -150}, 300, 'easeInQuad');
		}
		return false;
	});

});

// Hide box languages
function hideBoxLanguages() {
	$('#box-languages').slideUp(300);
}

// Active config
function activeConfig (id) {
	var index_new = $(id).index(),
		index_old = $('#box-all-config .item-config.active').index(),
		_left = (index_new > index_old) ? parseInt($('.content-width').width()) : -(parseInt($('.content-width').width())),
		_interval = 300,
		_height_box_config = $(id).height();

	$('#box-all-config').animate({height:_height_box_config}, 500, 'easeOutExpo');

	if ($(id).hasClass('active')) return false;

	$(id).css({left: _left}).show();

	$('#box-all-config .item-config.active').animate({left: -_left, opacity:'hide'}, _interval, 'easeInQuad');
	$(id).animate({left: 0}, _interval, 'easeOutQuad', function() {
		$('#box-all-config .item-config.active').removeClass('active').hide();
		$(id).addClass('active');
	});
}

// Add or remove item of array
function addOrRemoveItem(array, item) {
	var key = $.inArray(item, array);
	if (key >= 0) {
		array.splice(key, 1);
	}
	else {
		array.push(item);
	}
	return array;
}

// Update active config
function updateActiveConfig() {
	$('#box-all-config .item-config ul li a.active').each(function() {
		if ($(this).parent().parent().parent().attr('id') != undefined) {
			var option_id = $(this).parent().parent().parent().attr('id').replace('box-', '');
			var rel = $(this).attr('rel');
			options_skitter[option_id].push(rel);
		}
	});
	$('#box-all-config .select-item').parent().find('ul li a.active').each(function() {
		var rel = $(this).attr('rel');
		var position = $(this).attr('position');
		options_skitter.more_options[rel].push(position);
	});
	return false;
}

// Check hash on url
function checkHash() {
	var hash = document.location.hash;
	if (hash != '') {
		var id = 'page-'+hash.replace('#', '');
		if ($('#'+id).html() != null) {
			$('#header nav a[rel="'+id+'"]').trigger('click');
		}
	}
}