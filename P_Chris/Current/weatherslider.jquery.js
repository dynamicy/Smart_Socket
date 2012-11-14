


// WeatherSlider



(function($) {

	$.fn.weatherSlider = function( options ){

		// initializing

		if( (typeof(options) ).match('object|undefined') ){
			return this.each(function(i){
				new $.weatherSlider(this, options);
			});
		}else{
			return this.each(function(i){

				// change function

				var wsData = $(this).data('WeatherSlider');
				if( wsData && !wsData.g.isAnimating ){
					if( typeof(options) == 'number' ){
						wsData.change(options);
					}
				}
			});
		}
	};

	$.weatherSlider = function(el, options) {

		var ws = this;
		ws.$el = $(el).addClass('ws-container');
		ws.$el.data('WeatherSlider', ws);

		ws.init = function(){

			// setting options (user settings) and global (not modificable) parameters

			ws.o = $.extend( {}, $.weatherSlider.options, options );
			ws.l = $.extend( {}, $.weatherSlider.language );
			ws.w = $.extend( {}, $.weatherSlider.weatherTypes );
			ws.g = $.extend( {}, $.weatherSlider.global );

			// setting maximum width and height

			if( $(el).width() > 1300 ){
				$(el).css( 'width', 1300 );
			}
			if( $(el).width() < 240 ){
				$(el).css( 'width', 240 );
			}
			if( $(el).height() > 600 ){
				$(el).css( 'height', 600 );
			}
			if( $(el).height() < 200 ){
				$(el).css( 'height', 200 );
			}

			// setting the container's position to realtive if required
			
			if( $(el).css( 'position' ) == 'static' ){
				$(el).css( 'position', 'relative' );
			}
			
			ws.g.sliderWidth = $(el).width();
			ws.g.sliderHeight = $(el).height();
			ws.g.bgPosY = ( ws.g.sliderHeight - 600 ) / 2;

			// setting reduction
			
			if( typeof(ws.o.reduction) == 'number' ){
				ws.o.reduction = ws.o.reduction < 0 ? 0 : ws.o.reduction;
				ws.o.reduction = ws.o.reduction > 1 ? 1 : ws.o.reduction;
			}else if( ws.o.reduction == 'auto' ){
				ws.o.reduction = ws.g.sliderWidth / 900;
				ws.o.reduction = ws.o.reduction > 1 ? 1 : ws.o.reduction;
			}else{
				ws.o.reduction = 1;
			}
			
			// getting locations

			if( ws.o.locations ){
				ws.g.locations = ws.o.locations;
			}else{
				ws.g.locations = [];
				$(el).find('.ws-location').each(function(){
					ws.g.locations.push( $(this).html() );
				});				
			}

			// creating navigation if multiple locations added
			
			if( ws.g.locations.length > 1 ){
	
				$('<a href="#"></a>').appendTo( $(el) ).addClass('ws-nav ws-prev-arrow');
				$('<a href="#"></a>').appendTo( $(el) ).addClass('ws-nav ws-next-arrow');
				$('<span></span>').appendTo( $(el).find('.ws-prev-arrow') ).addClass('ws-prev-text');
				$('<span></span>').appendTo( $(el).find('.ws-next-arrow') ).addClass('ws-next-text');

				$(el).find('.ws-prev-arrow, .ws-next-arrow').css({
					backgroundImage : 'url('+ws.o.imgPath+'sprite.png)'
				});

				$(el).find('.ws-prev-arrow').mousemove(function(){
					$(this).find('.ws-prev-text').fadeIn(200);
				});
				$(el).find('.ws-prev-arrow').mouseleave(function(){
					$(this).find('.ws-prev-text').fadeOut(200);
				});

				$(el).find('.ws-next-arrow').mousemove(function(){
					$(this).find('.ws-next-text').fadeIn(200);
				});
				$(el).find('.ws-next-arrow').mouseleave(function(){
					$(this).find('.ws-next-text').fadeOut(200);
				});

				$(el).find('.ws-prev-text, .ws-next-text').css({
					width : $(el).width() * .6
				});
			}

			// creating inner div and loading

			$('<div></div>').appendTo($(el)).addClass('ws-inner');
			$('<div>'+ws.l.get+':<br><span></span></div>').appendTo($(el)).addClass('ws-loading');
			
			// creating infobox
			
			var i = '<div class="ws-infobox">';
			i += '<div class="ws-bg"></div>';
			i += '<div class="ws-iinner"></div>';
			i += '</div>';

			$(i).appendTo($(el).find('.ws-inner'));				

			// binding hover function for infobox to show forecast

			if( 'ontouchstart' in window == false ){
				$(el).find('.ws-infobox').hover(
					function(){
						if( ws.g.locations.length > 1 ){					
							if(!ws.g.oldIE){
								$(el).find('.ws-nav').fadeOut(400);
							}else{
								$(el).find('.ws-nav').css('visibility','hidden');
							}
						}
						$(this).find('.ws-forecast').stop().animate({
							height: $(this).find('.ws-finner').innerHeight()
						}, 400, 'easeInOutQuad');
					},
					function(){
						$(this).find('.ws-forecast').stop().animate({
							height: 0
						}, 200, 'easeInOutQuad',function(){
							if( ws.g.locations.length > 1 ){					
								if(!ws.g.oldIE){
									$(el).find('.ws-nav').fadeIn(400);
								}else{
									$(el).find('.ws-nav').css('visibility','visible');						
								}
							}
						});
					}
				);
			}else{

				// infobox touch control

				$(el).find('.ws-infobox').bind('touchstart', function( e ) {
						var t = e.touches ? e.touches : e.originalEvent.touches;
						if( t.length == 1 ){
							ws.g.touchStartInfoY = ws.g.touchEndInfoY = t[0].clientY;
						}
				 });

				$(el).find('.ws-infobox').bind('touchmove',function( e ){
					e.preventDefault();
					var t = e.touches ? e.touches : e.originalEvent.touches;
					if( t.length == 1 ){
						ws.g.touchEndInfoY = t[0].clientY;

						if( ws.g.touchStartInfoY - ws.g.touchEndInfoY > 0 && $(el).find('.ws-infobox .ws-forecast').height() < $(el).find('.ws-infobox .ws-forecast .ws-finner').innerHeight() ){
								$(el).find('.ws-infobox .ws-forecast').css({
									height: ws.g.touchStartInfoY - ws.g.touchEndInfoY
								});
						}

						if( ws.g.touchStartInfoY - ws.g.touchEndInfoY < 0  && $(el).find('.ws-infobox .ws-forecast').height() > 0 ){							
							$(el).find('.ws-infobox .ws-forecast').css({
								height: $(el).find('.ws-infobox .ws-forecast').height() + ws.g.touchStartInfoY - ws.g.touchEndInfoY
							});							
						}
					}					
				});				

				$(el).find('.ws-infobox').bind('touchend',function( e ){
					if( ws.g.touchStartInfoY - ws.g.touchEndInfoY > 0 ){
						$(el).find('.ws-nav').fadeOut(400);
						$(el).find('.ws-infobox .ws-forecast').stop().animate({
							height: $(this).find('.ws-finner').innerHeight()
						}, 400, 'easeInOutQuad');						
					}else{
						$(el).find('.ws-infobox .ws-forecast').stop().animate({
							height: 0
						}, 200, 'easeInOutQuad',function(){
							if( ws.g.locations.length > 1 ){					
								$(el).find('.ws-nav').fadeIn(400);
							}
						});						
					}
				});
			}

			// adding keyboard navigation if turned on

			if( ws.o.keybNav ){
				
				$('body').bind('keydown',function(e){ 
					if( !ws.g.isAnimating ){
						if( e.which == 37 ){
							$(el).find('.ws-prev-arrow').click();
						}else if( e.which == 39 ){
							$(el).find('.ws-next-arrow').click();
						}
					}
				});
			}

			// adding touch-control if turned on
			
			if('ontouchstart' in window){
				
			   $(el).bind('touchstart', function( e ) {
					var t = e.touches ? e.touches : e.originalEvent.touches;
					if( t.length == 1 ){
						ws.g.touchStartX = ws.g.touchEndX = t[0].clientX;
					}
			    });
			
			   $(el).bind('touchmove', function( e ) {
					var t = e.touches ? e.touches : e.originalEvent.touches;
					if( t.length == 1 ){
						ws.g.touchEndX = t[0].clientX;

						$(el).find('.ws-fullbg, .ws-bottombg, .ws-rain, .ws-snow, .ws-clouds, .ws-sunmoon, .ws-fog, .ws-icy').css({
							opacity : $(el).width() / ( $(el).width() + Math.abs( ws.g.touchStartX - ws.g.touchEndX ) * 3 )
						});

						if( Math.abs( ws.g.touchStartX - ws.g.touchEndX ) > 45 ){
							e.preventDefault();							
						}
					}
			    });


				$(el).bind('touchend',function( e ){
					if( Math.abs( ws.g.touchStartX - ws.g.touchEndX ) > 45 ){
						if( ws.g.touchStartX - ws.g.touchEndX > 0 ){
							$(el).find('.ws-prev-arrow').click();							
						}else{
							$(el).find('.ws-next-arrow').click();
						}
					}else{

						$(el).find('.ws-fullbg, .ws-bottombg, .ws-rain, .ws-snow, .ws-clouds, .ws-sunmoon, .ws-fog, .ws-icy').css({
							opacity : 1
						});					
					}
				});
			}	

			// getting current location with Google JSAPI...
			
			$.getScript('http://google.com/jsapi', function(){

				if( google.loader.ClientLocation ){
					ws.g.curLocation = google.loader.ClientLocation.address.city + ', ' + google.loader.ClientLocation.address.country;
				}else{
					ws.g.curLocation = ws.l.una;
				}

				// starting with first location

				ws.change(0);
			});
		};

		// change function
		
		ws.change = function(id){
			
			ws.g.isAnimating = true;

			// if infobox is not empty, we have to stop animations and remove html code from slider

			if( $(el).find('.ws-infobox h1').length ){

				$(el).find('.ws-lightnings').stop().remove();

				if( !ws.g.oldIE ){
					$(el).find('.ws-fullbg, .ws-bottombg, .ws-rain, .ws-snow, .ws-clouds, .ws-sunmoon, .ws-fog, .ws-icy').stop().each(function(){
						$(this).fadeOut(400, function(){
							$(this).remove();
						});
					});					
				}else{
					$(el).find('.ws-bottombg, .ws-rain, .ws-snow, .ws-clouds, .ws-sunmoon, .ws-fog, .ws-icy').stop().remove();
					$(el).stop().find('.ws-fullbg').fadeOut(400, function(){
							$(this).remove();
					});
				}

				if( !ws.g.oldIE ){
					$(el).find('.ws-nav').fadeOut(500);
				}else{
					$(el).find('.ws-nav').fadeOut(1);					
				}

				$(el).find('.ws-infobox').animate({
					marginBottom : -($(el).find('.ws-infobox').outerHeight() - 20)
				}, ws.o.infoDuration, ws.o.infoEasingType[1], function(){
					$(this).find('.ws-iinner *').remove();
					ws.getWeather(id);
				});

				// if infobox is empty lets get weather

			}else{

				ws.getWeather(id);
			}
		};

		// getting weather with World Weather Online API

		ws.getWeather = function(id){

			var l = ws.g.locations[id];

			if( l.indexOf('GEOLOCATION') != -1 ){
				l = ws.g.curLocation;
			}

			// showing loading text
			
			$(el).find('.ws-loading span').html(l);
			$(el).find('.ws-loading').fadeIn(500);

			var url  = 'http://free.worldweatheronline.com/feed/weather.ashx';
			url += '?key='+ws.o.WWOAPIKey+'';
			url += '&format=json';
			url += '&q='+encodeURIComponent(l)+'';
			url += '&num_of_days=5';
			url += '&callback=?';

			// creating functions for converting between metric and imperial currency

			var KMtoMI = function(KM){
				
				return Math.round(KM / 1.609344);
			}
			
			var MMtoIN = function(MM){
				
				return Math.round(MM * .03937 * 10000 ) / 10000;
			}

			function dateToTimestamp(year,month,day,hour,minute,second){
				var timestamp = new Date(Date.UTC(year,month-1,day,hour,minute,second));
				return timestamp.getTime()/1000;
			}

			// getting weather data from World Weather Online

			$.getJSON(url, function(d){

				var data = d['data'];
				
				// if location found

				if( data['current_condition'] ){

					var cur = data['current_condition'][0];
					var fore;

					// creating Data object from data

					var wData = {

						// location

						location : l,

						// current conditions

						current_condition : {

							weather : {

								condition : ws.l[cur['weatherCode']],
								icon : cur['weatherIconUrl'][0]['value'],
								code : cur['weatherCode']
							},

							temperature : {

								metric : cur['temp_C'],
								imperial : cur['temp_F']
							},

							humidity : cur['humidity'],

							precipitation : {

								metric : cur['precipMM'],
								imperial : MMtoIN(parseInt(cur['precipMM']))
							},

							wind : {

								speed : {

									metric : cur['windspeedKmph'],
									imperial : cur['windspeedMiles']
								},

								direction : cur['winddir16Point']
							},

							pressure : cur['pressure'],

							visibility : {

								metric : cur['visibility'],
								imperial : KMtoMI(parseInt(cur['visibility']))
							}
						}
					}

					// 3 days forecast

					wData['forecast'] = [];

					for(var f=0;f<5;f++){

						fore = data['weather'][f];

						wData.forecast[f] = {

							temperature : {

								high : {

									metric : fore['tempMaxC'],
									imperial : fore['tempMaxF']
								},

								low : {

									metric : fore['tempMinC'],
									imperial : fore['tempMinF']
								}
							},

							weather : {

								code : fore['weatherCode'],
								condition : ws.l[fore['weatherCode']]
							}
						}
					}

					// getting local time of the location

					url  = 'http://www.worldweatheronline.com/feed/tz.ashx';
					url += '?key='+ws.o.WWOAPIKey+'';
					url += '&format=json';
					url += '&q='+encodeURIComponent(l);
					url += '&callback=?';

					$.getJSON(url, function(d) {

						wData['time'] = d['data'].time_zone[0].localtime.split(' ')[1];
						
						var curDate = d['data'].time_zone[0].localtime.split(' ')[0].split('-');
						var curTime = d['data'].time_zone[0].localtime.split(' ')[1].split(':');
						var timestamp = dateToTimestamp(curDate[0],curDate[1],curDate[2],curTime[0],curTime[1],0);

						var curDay = new Date();
						curDay.setTime(timestamp*1000);
						wData['day'] = curDay.getDay();

						// trying to set current daytime...
						// if the original weather icon name has 'night' in it, there is certainly night:

						var wIcon = cur['weatherIconUrl'][0]['value'];
						var wCode = cur['weatherCode'];

						if( wIcon.indexOf('_night') != -1 || ( wCode != 122 && wIcon.indexOf('_black') != -1 ) ){
							wData['current_condition']['daytime'] = 'night';
						}else{

							// if not, there is probably day, but in some cases (fog, mist, etc.)
							// there can be night because they don't have special icons for night
							// in these cases using local time and ws.o.daytime

							if( ( parseFloat(curTime[0]) < ws.o.daytime[0] || parseFloat(curTime[0]) > ws.o.daytime[1]-1 ) ){
								wData['current_condition']['daytime'] = 'night';								
							}else{
								wData['current_condition']['daytime'] = 'day';
							}
						}

						if( wCode == '113'){
							switch (wData['current_condition']['daytime']){
								case 'day':
									wData['current_condition']['weather']['condition'] = ws.l['114'];
								break;
								case 'night':
									wData['current_condition']['weather']['condition'] = ws.l['115'];
								break;
							}
						}
						
						ws.parseData(wData,id);
					});

				// if location not found

				}else{

					var lText = $(el).find('.ws-loading span').html();
					$(el).find('.ws-loading span').html(ws.l.not+':<br>'+lText);
					ws.g.isAnimating = false;					
					ws.prevNext(id);
				}
			});
		};

		// parsing weather data

		ws.parseData = function(wData,id){
			
			// getting location 

			var location = wData.location;

			// getting local time

			var hours = parseFloat(wData.time.split(':')[0]);
			var minutes = wData.time.split(':')[1];

			// setting current measurement

			var m = ws.g.m[ws.o.measurement];

			// calculating measurement units

			var curtemp = wData.current_condition.temperature[ws.o.measurement];
			var tempmax = wData.forecast[0].temperature.high[ws.o.measurement];
			var tempmin = wData.forecast[0].temperature.low[ws.o.measurement];

			var wspeed = wData.current_condition.wind.speed[ws.o.measurement];
			var vis = wData.current_condition.visibility[ws.o.measurement];
			var prec = wData.current_condition.precipitation[ws.o.measurement];

			var wCondition = wData.current_condition.weather.condition;

			// local weather data

			var iData = '<h1>'+location+' <span>'+hours+':'+minutes+'</span></h1>';
			iData += '<p class="ws-weather">'+wCondition+' '+curtemp+' °'+m.t+'</p>';
			iData += '<p class="ws-line">'+ws.l.ht+': '+tempmax+' °'+m.t+', '+ws.l.lt+': '+tempmin+' °'+m.t+', '+ws.l.hu+': '+wData.current_condition.humidity+'%</p>';
			iData += '<p class="ws-line">'+ws.l.pr+': '+prec+' '+m.pr+', '+ws.l.wi+': '+wData.current_condition.wind.direction+', '+wspeed+' '+m.s+'</p>';
			iData += '<p class="ws-line">'+ws.l.ps+': '+wData.current_condition.pressure+' '+m.p+', '+ws.l.vi+': '+vis+' '+m.l+'</p>';

			// 3 days forecast

			var daysOfWeek = (ws.l.day+','+ws.l.day).split(',');

			iData +='<div class="ws-forecast"><div class="ws-finner">';

			for(var ii=1;ii<4;ii++){
				tempmax = wData.forecast[ii].temperature.high[ws.o.measurement];
				tempmin = wData.forecast[ii].temperature.low[ws.o.measurement];
				iData += '<p class="ws-line ws-fline">'+daysOfWeek[wData.day+ii]+'</p>';
				iData += '<p class="ws-line">'+wData.forecast[ii].weather.condition+'</p>';
				iData += '<p class="ws-line">'+ws.l.ht+': '+tempmax+' °'+m.t+', '+ws.l.lt+': '+tempmin+' °'+m.t+'</p>';
			}

			iData +='</div></div>';

			$(iData).appendTo( $(el).find('.ws-iinner') );

			// setting up wind

			if( ws.o.wind == true ){
				ws.g.windy = parseInt( wData.current_condition.wind.speed.metric ) > ws.o.windyWeather ? true : false;				
			}else{
				ws.g.windy = false;
			}

			if( ws.o.forcewindy ){
				ws.g.windy = ws.o.forcewindy;
			}

			if( ws.o.windDirection == 'left' ){
				ws.g.winDir = -1;
			}else if( ws.o.windDirection == 'right' ){
				ws.g.winDir = 1;
			}else if( ws.o.windDirection == 'auto' ){
				if( wData.current_condition.wind.direction.indexOf('W') != -1 ){
					ws.g.winDir = -1;								
				}else{
					ws.g.winDir = 1;								
				}
			}

			// hiding loading text

			$(el).find('.ws-loading').fadeOut(750);

			// loading graphic elements

			ws.makeWeather( wData['current_condition']['weather']['code'], wData['current_condition']['daytime'], wData['current_condition']['temperature']['metric'] );

			// adding names of previous and next locations, if available

			ws.prevNext(id);
		};

		// calculating prev and next, changing navigation text

		ws.prevNext = function(id){

			if( ws.g.locations.length > 1 ){

				var prev = id > 0 ? id - 1 : ws.g.locations.length - 1;
				var next = id < ws.g.locations.length - 1 ? id + 1 : 0;
				
				var ptext = ws.g.locations[prev].split(',')[0].indexOf('GEOLOCATION') != -1 ? ws.g.curLocation.split(',')[0] +' (' + ws.l.cl + ')' : ws.g.locations[prev].split(',')[0];
				var ntext = ws.g.locations[next].split(',')[0].indexOf('GEOLOCATION') != -1 ? ws.g.curLocation.split(',')[0] +' (' + ws.l.cl + ')' : ws.g.locations[next].split(',')[0];

				$(el).find('.ws-prev-text').html(ptext);
				$(el).find('.ws-next-text').html(ntext);

				$(el).find('.ws-prev-arrow, .ws-next-arrow').unbind('click');
				$(el).find('.ws-prev-arrow').click(function(e){
					e.preventDefault();
					$(this).mouseleave();
					$(el).weatherSlider(prev);
				});
				$(el).find('.ws-next-arrow').click(function(e){
					e.preventDefault();
					$(this).mouseleave();
					$(el).weatherSlider(next);
				});

				if( !ws.g.oldIE ){
					$(el).find('.ws-nav').delay(1000).fadeIn(500);
				}else{
					$(el).find('.ws-nav').delay(1000).fadeIn(1);					
				}
			}
		};

		ws.makeWeather = function( weather_code, daytime, curtemp ){

			if( ws.o.forcewcode ){
				weather_code = ws.o.forcewcode;
			}
			if( ws.o.forcedaytime ){
				daytime = ws.o.forcedaytime;
			}
			if( ws.o.forcecurtemp ){
				curtemp = ws.o.forcecurtemp;
			}

			// switching weather by weather_code

			switch( parseInt(weather_code) ){

				// Sunny or Clear (at night)

				case 113:

					switch(daytime){
						case 'day':
							ws.create('clear_day');
							ws.create('sun');
						break;
						case 'night':
							ws.create('clear_night');
							ws.create('moon');
						break;
					}

				break;

				// Partly Cloudy

				case 116:

					switch(daytime){
						case 'day':
							ws.create('white_cloudy_day');
							ws.create('white_cloud_day_1');
							ws.create('white_cloud_day_2');
							ws.create('white_cloud_day_3');
							ws.create('white_cloud_day_4');
							ws.create('sun');
						break;
						case 'night':
							ws.create('starry_sky');
							ws.create('cloudy_night');
							ws.create('dark_cloud_night_3');
							ws.create('dark_cloud_night_4');
							ws.create('moon');
						break;
					}

				break;

				// Cloudy

				case 119:

					switch(daytime){
						case 'day':
							ws.create('grey_cloudy_day');
							ws.create('grey_cloud_day_1');
							ws.create('grey_cloud_day_2');
							ws.create('grey_cloud_day_3');
							ws.create('grey_cloud_day_4');
							ws.create('sun');
						break;
						case 'night':
							ws.create('starry_sky');
							ws.create('cloudy_night');
							ws.create('dark_cloud_night_1');
							ws.create('dark_cloud_night_2');
							ws.create('dark_cloud_night_3');
							ws.create('dark_cloud_night_4');
							ws.create('moon');
						break;
					}

				break;

				// Overcast

				case 122:

					switch(daytime){
						case 'day':
							ws.create('dark_cloudy_day');
							ws.create('dark_cloud_day_1');
							ws.create('dark_cloud_day_2');
							ws.create('dark_cloud_day_3');
							ws.create('dark_cloud_day_4');
						break;
						case 'night':
							ws.create('starry_sky');
							ws.create('cloudy_night');
							ws.create('dark_cloud_night_1');
							ws.create('dark_cloud_night_2');
							ws.create('dark_cloud_night_3');
							ws.create('dark_cloud_night_4');
						break;
					}

				break;

				// Freezing fog

				case 260:

				// Fog

				case 248:

				// Mist

				case 143:

					switch(daytime){
						case 'day':
							ws.create('foggy_day');
							ws.create('fog_day');
						break;
						case 'night':
							ws.create('foggy_night');
							ws.create('fog_night');
						break;
					}

				break;

				// Patchy light rain in area with thunder

				case 386:

					ws.create('lightning1');
					ws.create('lightning2');
					ws.create('lightning3');
					ws.create('lightning4');
					
				// Light drizzle

				case 266:

				// Patchy light drizzle

				case 263:

				// Light rain

				case 296:

				// Patchy rain nearby

				case 176:

				// Patchy light rain

				case 293:

				// Light rain shower

				case 353:

					switch(daytime){
						case 'day':
							ws.create('grey_cloudy_day');
							ws.create('grey_cloud_day_1');
							ws.create('grey_cloud_day_2');
							ws.create('grey_cloud_day_3');
							ws.create('grey_cloud_day_4');
							ws.create('rain_day');
						break;
						case 'night':
							ws.create('starry_sky');
							ws.create('cloudy_night');
							ws.create('dark_cloud_night_1');
							ws.create('dark_cloud_night_2');
							ws.create('dark_cloud_night_3');
							ws.create('dark_cloud_night_4');
							ws.create('rain_night');
						break;
					}

					ws.create('raindrops');

				break;

				// Moderate rain

				case 302:

				// Moderate rain at times

				case 299:

				// Moderate or heavy rain shower

				case 356:

					switch(daytime){

						case 'day':
							ws.create('grey_cloudy_day');
							ws.create('dark_cloud_day_1');
							ws.create('dark_cloud_day_2');
							ws.create('dark_cloud_day_3');
							ws.create('dark_cloud_day_4');
							ws.create('rain_day');
						break;
						case 'night':
							ws.create('starry_sky');
							ws.create('cloudy_night');
							ws.create('dark_cloud_night_1');
							ws.create('dark_cloud_night_2');
							ws.create('dark_cloud_night_3');
							ws.create('dark_cloud_night_4');
							ws.create('rain_night');
						break;
					}

					ws.create('raindrops');

				break;

				// Moderate or heavy rain in area with thunder

				case 389:

				// Thundery outbreaks in nearby

				case 200:

					switch(daytime){
						case 'day':
							ws.create('dark_cloudy_day');
							ws.create('dark_cloud_day_1');
							ws.create('dark_cloud_day_2');
							ws.create('dark_cloud_day_3');
							ws.create('dark_cloud_day_4');
							ws.create('rain_day');
						break;
						case 'night':
							ws.create('starry_sky');
							ws.create('cloudy_night');
							ws.create('dark_cloud_night_1');
							ws.create('dark_cloud_night_2');
							ws.create('dark_cloud_night_3');
							ws.create('dark_cloud_night_4');
							ws.create('rain_night');
						break;
					}

					ws.create('lightning1');
					ws.create('lightning2');
					ws.create('lightning3');
					ws.create('lightning4');

					ws.create('raindrops');

				break;

				// Heavy rain

				case 308:

				// Heavy rain at times

				case 305:
				
				// Torrential rain shower

				case 359:					

					switch(daytime){
						case 'day':
							ws.create('dark_cloudy_day');
							ws.create('dark_cloud_day_1');
							ws.create('dark_cloud_day_2');
							ws.create('dark_cloud_day_3');
							ws.create('dark_cloud_day_4');
							ws.create('rain_day');
						break;
						case 'night':
							ws.create('starry_sky');
							ws.create('cloudy_night');
							ws.create('dark_cloud_night_1');
							ws.create('dark_cloud_night_2');
							ws.create('dark_cloud_night_3');
							ws.create('dark_cloud_night_4');
							ws.create('rain_night');
						break;
					}

					ws.create('raindrops');

				break;

				// Patchy light snow in area with thunder

				case 392:

				// Light sleet

				case 317:

				// Patchy sleet nearby

				case 182:

				// Light freezing rain

				case 311:

				// Light sleet showers

				case 362:

				// Freezing drizzle

				case 281:

				// Light showers of ice pellets

				case 374:

				// Ice pellets

				case 350:

				// Patchy freezing drizzle nearby

				case 185:

					switch(daytime){
						case 'day':
							ws.create('grey_cloudy_day');
							ws.create('grey_cloud_day_1');
							ws.create('grey_cloud_day_2');
							ws.create('grey_cloud_day_3');
							ws.create('grey_cloud_day_4');
							ws.create('rain_day');
							ws.create('snow_big_day');
							ws.create('snow_small_day');
						break;
						case 'night':
							ws.create('starry_sky');
							ws.create('cloudy_night');
							ws.create('dark_cloud_night_1');
							ws.create('dark_cloud_night_2');
							ws.create('dark_cloud_night_3');
							ws.create('dark_cloud_night_4');
							ws.create('rain_night');
							ws.create('snow_big_night');
							ws.create('snow_small_night');
						break;
					}

					ws.create('raindrops');

				break;

				// Moderate or Heavy freezing rain

				case 314:

				// Moderate or heavy sleet

				case 320:

				// Moderate or heavy sleet showers

				case 365:

				// Moderate or heavy showers of ice pellets

				case 377:

				// Moderate or heavy snow in area with thunder

				case 395:

				// Heavy freezing drizzle

				case 284:

					switch(daytime){
						case 'day':
							ws.create('dark_cloudy_day');
							ws.create('dark_cloud_day_1');
							ws.create('dark_cloud_day_2');
							ws.create('dark_cloud_day_3');
							ws.create('dark_cloud_day_4');
							ws.create('rain_day');
							ws.create('snow_big_day');
							ws.create('snow_small_day');
						break;
						case 'night':
							ws.create('starry_sky');
							ws.create('cloudy_night');
							ws.create('dark_cloud_night_1');
							ws.create('dark_cloud_night_2');
							ws.create('dark_cloud_night_3');
							ws.create('dark_cloud_night_4');
							ws.create('rain_night');
							ws.create('snow_big_night');
							ws.create('snow_small_night');
						break;
					}

					ws.create('raindrops');

				break;
			
				// Patchy light snow

				case 323:

				// Light snow

				case 326:

				// Light snow showers

				case 368:

				// Patchy snow nearby

				case 179:

					switch(daytime){
						case 'day':
							ws.create('grey_cloudy_day');
							ws.create('grey_cloud_day_1');
							ws.create('grey_cloud_day_2');
							ws.create('grey_cloud_day_3');
							ws.create('grey_cloud_day_4');
							ws.create('snow_big_day');
							ws.create('snow_small_day');
						break;
						case 'night':
							ws.create('starry_sky');
							ws.create('cloudy_night');
							ws.create('dark_cloud_night_1');
							ws.create('dark_cloud_night_2');
							ws.create('dark_cloud_night_3');
							ws.create('dark_cloud_night_4');
							ws.create('snow_big_night');
							ws.create('snow_small_night');
						break;
					}

				break;
			
				// Patchy moderate snow

				case 329:

				// Moderate snow

				case 332:

				// Patchy heavy snow

				case 335:

				// Heavy snow

				case 338:

					switch(daytime){
						case 'day':
							ws.create('grey_cloudy_day');
							ws.create('dark_cloud_day_1');
							ws.create('dark_cloud_day_2');
							ws.create('dark_cloud_day_3');
							ws.create('dark_cloud_day_4');
							ws.create('snow_big_day');
							ws.create('snow_small_day');
						break;
						case 'night':
							ws.create('starry_sky');
							ws.create('cloudy_night');
							ws.create('dark_cloud_night_1');
							ws.create('dark_cloud_night_2');
							ws.create('dark_cloud_night_3');
							ws.create('dark_cloud_night_4');
							ws.create('snow_big_night');
							ws.create('snow_small_night');
						break;
					}

				break;

				// Moderate or heavy snow showers

				case 371:

				// Blowing snow

				case 227:

				// Blizzard

				case 230:

					switch(daytime){
						case 'day':
							ws.create('dark_cloudy_day');
							ws.create('dark_cloud_day_1');
							ws.create('dark_cloud_day_2');
							ws.create('dark_cloud_day_3');
							ws.create('dark_cloud_day_4');
							ws.create('snow_big_day');
							ws.create('snow_small_day');
						break;
						case 'night':
							ws.create('starry_sky');
							ws.create('cloudy_night');
							ws.create('dark_cloud_night_1');
							ws.create('dark_cloud_night_2');
							ws.create('dark_cloud_night_3');
							ws.create('dark_cloud_night_4');
							ws.create('snow_big_night');
							ws.create('snow_small_night');
						break;
					}

				break;
			}

			// creating icy, if need

			if( curtemp < ws.o.icyTemp ){
				switch(daytime){
					case 'day':
						ws.create('icy_day_left');
						ws.create('icy_day_right');
					break;
					case 'night':
						ws.create('icy_night_left');
						ws.create('icy_night_right');
					break;
				}				
			}

			// animating infobox

			ws.animateIn( $(el).find('.ws-infobox') );
		};

		// creating elements

		ws.create = function( what ){

			if( ws.w[what] ){

				if( ws.w[what].where ){
					var where = $(el).find(ws.w[what].where);
				}else{
					var where = $(el);
				}

				// if element is a background-layer

				if( ws.w[what].type == 'bg' ){

					$('<img>').load(function(){

						var ob = $('<div>').appendTo(where).addClass(ws.w[what].classNames).css({
							backgroundImage : 'url('+ws.o.imgPath+ws.w[what].fileName+')'
						});						

						// animating element

						ws.animateIn(ob,what);

					}).attr('src',ws.o.imgPath+ws.w[what].fileName);

				// if element is an image-layer

				}else{	
					
					var ob = $('<img>').css('visibility','hidden').appendTo(where).unbind().bind('load',function(){

						$(this).addClass(ws.w[what].classNames).css({
							height : $(this).height() * ws.o.reduction,
							marginLeft : (parseInt($(this).css('margin-left'))-ws.w[what].mL)  * ws.o.reduction,
							marginTop : (parseInt($(this).css('margin-top'))-ws.w[what].mT) * ws.o.reduction,
							visibility : 'visible'
						});

						if( !ws.g.oldIE && !$(this).hasClass('ws-lightnings') ){
							$(this).css({
								opacity : 0
							});
						}

						// animating element

						ws.animateIn(ob,what);
						
					}).attr('src',ws.o.imgPath+ws.w[what]['fileName']+'?'+(Math.random()*1000000));
				}					
			}
		};

		// animating in, choosing animation type (CSS or JS) for wind (background), rain, and snow

		ws.animateIn = function(ob,what){

			// animating background

			if( ob.hasClass('ws-fullbg') ){

				// fading in (independent from animation settings)

				ob.css({
					backgroundPosition : '0px ' + ws.g.bgPosY + 'px'
				}).fadeIn(1500,function(){
					ws.g.isAnimating = false;
				});

				// animate only if weather is windy

				if( ws.g.windy && !ob.hasClass('ws-fixed') ){

					if( ws.o.CSSanimations && ws.g.css3 ){

						ob.addClass('ws-fullbg-animating');							
					}else if( ws.o.JSanimations ){
						
						ws.animateJS(ob,'ws-fullbg');
					}
				}

			// animating special background at bottom

			}else if( ob.hasClass('ws-bottombg') ){

				ob.animate({
					marginBottom : 0
				}, 1000, 'easeOutQuad');					

				if( ws.g.windy ){

					if( ws.o.CSSanimations && ws.g.css3 ){

						ob.addClass('ws-bottombg-animating');

					}else if( ws.o.JSanimations ){

						ws.animateJS(ob,'ws-bottombg');
					}
				}

			// animating rain

			}else if( ob.hasClass('ws-rain') ){

				if( !ws.g.oldIE ){
					ob.dequeue().delay(1000).animate({
						opacity : 1
					}, 4000, 'easeOutQuad');
				}

				if( ws.o.rain ){

					if( ws.o.CSSanimations && ws.g.css3 ){

						ob.addClass('ws-rain-animating');

					}else if( ws.o.JSanimations ){

						ws.animateJS(ob,'ws-rain');
					}
				}

			// animating snow

			}else if( ob.hasClass('ws-snow') ){

				if( !ws.g.oldIE ){
					ob.dequeue().delay(1000).animate({
						opacity : 1
					}, 4000, 'easeOutQuad');
				}
				
				if( ws.o.snow ){
					
					if( ws.o.CSSanimations && ws.g.css3 ){

						if( ob.hasClass('ws-snow-big') ){
							ob.addClass('ws-snowbig-animating');
						}else if( ob.hasClass('ws-snow-small') ){
							ob.addClass('ws-snowsmall-animating');
						}

					}else if( ws.o.JSanimations ){

						if( ob.hasClass('ws-snow-big') ){
							ws.animateJS(ob,'ws-snow-big');
						}else if( ob.hasClass('ws-snow-small') ){
							ws.animateJS(ob,'ws-snow-small');
						}
					}
				}

			// animating clouds, fog, icy, the Sun and the Moon

			}else if( ob.hasClass('ws-clouds') || ob.hasClass('ws-sunmoon') || ob.hasClass('ws-fog') || ob.hasClass('ws-icy') ){

				if( !ws.g.oldIE ){
					ob.animate({
						opacity : 1,
						marginLeft : '+='+ws.w[what].mL * ws.o.reduction,
						marginTop : '+='+ws.w[what].mT * ws.o.reduction
					}, 2000, 'easeInOutQuint');
				}else{
					ob.animate({
						marginLeft : '+='+ws.w[what].mL * ws.o.reduction,
						marginTop : '+='+ws.w[what].mT * ws.o.reduction
					}, 2000, 'easeOutQuint');
				}

			// animating lightnings

			}else if( ob.hasClass('ws-lightnings') && ws.o.lightnings ){

				// lightnings are animated only with JS

				if( ws.o.CSSanimations || ws.o.JSanimations ){						

					if( ob.hasClass('ws-lightning1') ){							
						ws.animateJS(ob,'ws-lightning1');
					}else if( ob.hasClass('ws-lightning2') ){
						ws.animateJS(ob,'ws-lightning2');
					}else if( ob.hasClass('ws-lightning3') ){
						ws.animateJS(ob,'ws-lightning3');
					}else if( ob.hasClass('ws-lightning4') ){
						ws.animateJS(ob,'ws-lightning4');
					}

				}else{
					
					// if animations are both off, showing .ws-lightning2 constantly

					$(el).find('.ws-lightning2').css('display','block');
				}

			// animating weather information box

			}else if( ob.hasClass('ws-infobox') ){
				
				// automatically reducing font-sizes and paddings in .ws-infobox if required

				if( ws.g.sliderWidth < 500 ){

					ob.find('h1, h1 span, .ws-weather, .ws-line').each(function(){

						var fs = parseInt( parseInt( $(this).css('font-size') ) / 500 * ws.g.sliderWidth );
						fs = fs < 11 ? 11 : fs;

						$(this).css({
							fontSize : fs + 'px'
						});
					});

					var pd = parseInt( parseInt(ob.css('padding-left') ) / 500 * ws.g.sliderWidth );
					pd = pd < 7 ? 7 : pd;

					var bt = parseInt( parseInt(ob.css('bottom') ) / 500 * ws.g.sliderWidth );
					bt = bt < 5 ? 5 : bt;

					ob.css({
						padding : pd,
						bottom : bt
					});

					pd = parseInt( parseInt(ob.find('h1').css('padding-bottom') ) / 500 * ws.g.sliderWidth );
					pd = pd < 1 ? 1 : pd;

					ob.find('h1').css('padding-bottom',pd);
				}

				// If some texts in infobox are too wide...

				if( ob.width() > ws.g.sliderWidth - 20 ){
					ob.find('p').css({
						width : ws.g.sliderWidth * .9,
						whiteSpace : 'normal'
					});
				}

				// animating infobox

				ob.css({
					marginLeft : - ob.outerWidth() / 2,
					marginBottom : -ob.outerHeight() - 20
				}).delay(500).animate({
					marginBottom : 0
				}, ws.o.infoDuration, ws.o.infoEasingType[0] );
			}
		};

		ws.getRand = function(){

			return (Math.floor(Math.random() * 10) + 5) * 1000;
		};

		// animating with JS

		ws.animateJS = function(ob,className){

			switch(className){

				case 'ws-fullbg':

					var bg1 = function(){
						ob.dequeue().animate({
							backgroundPosition: (ws.g.winDir * 1300)+'px ' + ws.g.bgPosY + 'px'
						},100000,'linear',function(){
							$(this).css({
								backgroundPosition: '0 '+( ( ws.g.sliderHeight - 600 ) / 2 )
							});
							bg1();
						});	
					}
					bg1();

				break;
				
				case 'ws-bottombg':

					var bg2 = function(){
						ob.dequeue().animate({
							backgroundPosition: (ws.g.winDir * 1137)+'px 0px'
						},200000,'linear',function(){
							$(this).css({
								backgroundPosition: '0 0'
							});
							bg2();
						});	
					}
					bg2();

				break;

				case 'ws-rain':

					var r = function(){
						ob.dequeue().animate({
							backgroundPosition: '0 200'
						},1000,'linear',function(){
							ob.css({
								backgroundPosition: '0 0'
							});
							r();
						});	
					}

					r();

				break;

				case 'ws-snow-small':

					var s1 = function(){
						ob.dequeue().animate({
							backgroundPosition: '0 200'
						},3000,'linear',function(){
							ob.css({
								backgroundPosition: '0 0'
							});
							s1();
						});	
					}
					s1();

				break;

				case 'ws-snow-big':

					var s2 = function(){
						ob.dequeue().animate({
							backgroundPosition: '0 200'
						},5000,'linear',function(){
							ob.css({
								backgroundPosition: '0 0'
							});
							s2();
						});	
					}
					s2();

				break;

				case 'ws-lightning1':

					var l1 = function(){
						if( !ws.g.oldIE ){
							ob.delay( ws.getRand() ).fadeIn(1).fadeOut(250, function(){
								l1();
							});									
						}else{
							ob.delay( ws.getRand() ).fadeIn(0).delay(100).fadeOut(0, function(){
								l1();
							});																		
						}
					}
					l1();

				break;

				case 'ws-lightning2':

					var l2 = function(){
						if( !ws.g.oldIE ){
							ob.delay( ws.getRand() ).fadeIn(1).fadeOut(250, function(){
								l2();
							});									
						}else{
							ob.delay( ws.getRand() ).fadeIn(0).delay(100).fadeOut(0, function(){
								l2();
							});																		
						}
					}
					l2();

				break;

				case 'ws-lightning3':

					var l3 = function(){
						if( !ws.g.oldIE ){
							ob.delay( ws.getRand() ).fadeIn(30).fadeOut(30).fadeIn(30).fadeOut(30).fadeIn(30).fadeOut(250, function(){
								l3();
							});									
						}else{
							ob.delay( ws.getRand() ).fadeIn(0).delay(30).fadeOut(0).delay(30).fadeIn(0).delay(30).fadeOut(0).delay(30).fadeIn(0).delay(100).fadeOut(0, function(){
								l3();
							});																		
						}
					}
					l3();

				break;

				case 'ws-lightning4':

					var l4 = function(){
						if( !ws.g.oldIE ){
							ob.delay( ws.getRand() ).fadeIn(30).fadeOut(30).fadeIn(30).fadeOut(30).fadeIn(30).fadeOut(250, function(){
								l4();
							});									
						}else{
							ob.delay( ws.getRand() ).fadeIn(0).delay(30).fadeOut(0).delay(30).fadeIn(0).delay(30).fadeOut(0).delay(30).fadeIn(0).delay(100).fadeOut(0, function(){
								l4();
							});																		
						}
					}
					l4();

				break;
			}
			
		};

		// triggering initialization
		ws.init();
	};
	
	$.weatherSlider.weatherTypes = {

		// Backgrounds

		clear_day			: {
			type			: 'bg',
			fileName		: '../images/clear_day.jpg',
			classNames		: 'ws-fullbg'
		},
		foggy_day	: {
			type			: 'bg',
			fileName		: '../images/foggy_day.jpg',
			classNames		: 'ws-fullbg ws-fixed'
		},
		white_cloudy_day	: {
			type			: 'bg',
			fileName		: '../images/white_cloudy_day.jpg',
			classNames		: 'ws-fullbg'
		},
		grey_cloudy_day		: {
			type			: 'bg',
			fileName		: '../images/grey_cloudy_day.jpg',
			classNames		: 'ws-fullbg'
		},
		dark_cloudy_day		: {
			type			: 'bg',
			fileName		: '../images/dark_cloudy_day.jpg',
			classNames		: 'ws-fullbg'
		},

		clear_night			: {
			type			: 'bg',
			fileName		: '../images/clear_night.jpg',
			classNames		: 'ws-fullbg ws-fixed'
		},
		foggy_night	: {
			type			: 'bg',
			fileName		: '../images/foggy_night.jpg',
			classNames		: 'ws-fullbg ws-fixed'
		},
		cloudy_night		: {
			type			: 'bg',
			fileName		: '../images/cloudy_night.png',
			classNames		: 'ws-fullbg'
		},
		starry_sky			: {
			type			: 'bg',
			fileName		: '../images/starry_sky.jpg',
			classNames		: 'ws-fullbg ws-fixed'
		},

		// Sun and Moon

		sun					: {
			fileName		: '../images/sun.png',
			classNames		: 'ws-sunmoon',
			mL				: 0,
			mT				: 50
		},

		moon				: {
			fileName		: '../images/moon.png',
			classNames		: 'ws-sunmoon',
			mL				: 0,
			mT				: 50
		},

		// Clouds and Fog / Mist

		white_cloud_day_1	: {
			fileName		: '../images/white_cloud_day_1.png',
			classNames		: 'ws-cloud1 ws-clouds',
			mL				: -50,
			mT				: -50
		},
		white_cloud_day_2	: {
			fileName		: 'white_cloud_day_2.png',
			classNames		: 'ws-cloud2 ws-clouds',
			mL				: 150,
			mT				: -75
		},
		white_cloud_day_3	: {
			fileName		: 'white_cloud_day_3.png',
			classNames		: 'ws-cloud3 ws-clouds',
			mL				: -150,
			mT				: -75
		},
		white_cloud_day_4	: {
			fileName		: 'white_cloud_day_4.png',
			classNames		: 'ws-cloud4 ws-clouds',
			mL				: 50,
			mT				: -50
		},

		grey_cloud_day_1	: {
			fileName		: 'grey_cloud_day_1.png',
			classNames		: 'ws-cloud1 ws-clouds',
			mL				: -50,
			mT				: -50
		},
		grey_cloud_day_2	: {
			fileName		: 'grey_cloud_day_2.png',
			classNames		: 'ws-cloud2 ws-clouds',
			mL				: 150,
			mT				: -75
		},
		grey_cloud_day_3	: {
			fileName		: 'grey_cloud_day_3.png',
			classNames		: 'ws-cloud3 ws-clouds',
			mL				: -150,
			mT				: -75
		},
		grey_cloud_day_4	: {
			fileName		: 'grey_cloud_day_4.png',
			classNames		: 'ws-cloud4 ws-clouds',
			mL				: 50,
			mT				: -50
		},

		dark_cloud_day_1	: {
			fileName		: 'dark_cloud_day_1.png',
			classNames		: 'ws-cloud1 ws-clouds',
			mL				: -50,
			mT				: -50
		},
		dark_cloud_day_2	: {
			fileName		: 'dark_cloud_day_2.png',
			classNames		: 'ws-cloud2 ws-clouds',
			mL				: 150,
			mT				: -75
		},
		dark_cloud_day_3	: {
			fileName		: 'dark_cloud_day_3.png',
			classNames		: 'ws-cloud3 ws-clouds',
			mL				: -150,
			mT				: -75
		},
		dark_cloud_day_4	: {
			fileName		: 'dark_cloud_day_4.png',
			classNames		: 'ws-cloud4 ws-clouds',
			mL				: 50,
			mT				: -50
		},

		dark_cloud_night_1	: {
			fileName		: 'dark_cloud_night_1.png',
			classNames		: 'ws-cloud1 ws-clouds',
			mL				: -50,
			mT				: -50
		},
		dark_cloud_night_2	: {
			fileName		: 'dark_cloud_night_2.png',
			classNames		: 'ws-cloud2 ws-clouds',
			mL				: 150,
			mT				: -75
		},
		dark_cloud_night_3	: {
			fileName		: 'dark_cloud_night_3.png',
			classNames		: 'ws-cloud3 ws-clouds',
			mL				: -150,
			mT				: -75
		},
		dark_cloud_night_4	: {
			fileName		: 'dark_cloud_night_4.png',
			classNames		: 'ws-cloud4 ws-clouds',
			mL				: 50,
			mT				: -50
		},

		fog_day	: {
			fileName		: 'fog_day.png',
			classNames		: 'ws-fog',
			mL				: 0,
			mT				: 0
		},
		fog_night	: {
			fileName		: 'fog_night.png',
			classNames		: 'ws-fog',
			mL				: 0,
			mT				: 0
		},

		// Rain and raindrops

		rain_day			: {
			type			: 'bg',
			fileName		: 'rain_day.png',
			classNames		: 'ws-rain' 
		},

		rain_night			: {
			type			: 'bg',
			fileName		: 'rain_night.png',
			classNames		: 'ws-rain' 
		},

		raindrops			: {
			type			: 'bg',
			where			: '.ws-inner',
			fileName		: 'raindrops.png',
			classNames		: 'ws-bottombg' 
		},

		// Snow and icy

		snow_big_day		: {
			type			: 'bg',
			fileName		: 'snow_big_day.png',
			classNames		: 'ws-snow ws-snow-big' 
		},
		snow_small_day		: {
			type			: 'bg',
			fileName		: 'snow_small_day.png',
			classNames		: 'ws-snow ws-snow-small' 
		},
		
		snow_big_night		: {
			type			: 'bg',
			fileName		: 'snow_big_night.png',
			classNames		: 'ws-snow ws-snow-big' 
		},
		snow_small_night	: {
			type			: 'bg',
			fileName		: 'snow_small_night.png',
			classNames		: 'ws-snow ws-snow-small' 
		},

		icy_day_left		: {
			fileName		: 'icy_day_left.png',
			classNames		: 'ws-icy ws-icy-left',
			mL				: 0,
			mT				: 0
		},
		icy_day_right		: {
			fileName		: 'icy_day_right.png',
			classNames		: 'ws-icy ws-icy-right',
			mL				: 0,
			mT				: 0
		},

		icy_night_left		: {
			fileName		: 'icy_night_left.png',
			classNames		: 'ws-icy ws-icy-left',
			mL				: 0,
			mT				: 0
		},
		icy_night_right		: {
			fileName		: 'icy_night_right.png',
			classNames		: 'ws-icy ws-icy-right',
			mL				: 0,
			mT				: 0
		},

		// Lightnings

		lightning1			: {
			fileName		: 'lightning1.png',
			classNames		: 'ws-lightning1 ws-lightnings',
			mL				: 0,
			mT				: 0
		},
		lightning2			: {
			fileName		: 'lightning2.png',
			classNames		: 'ws-lightning2 ws-lightnings',
			mL				: 0,
			mT				: 0
		},
		lightning3			: {
			fileName		: 'lightning3.png',
			classNames		: 'ws-lightning3 ws-lightnings',
			mL				: 0,
			mT				: 0
		},
		lightning4			: {
			fileName		: 'lightning4.png',
			classNames		: 'ws-lightning4 ws-lightnings',
			mL				: 0,
			mT				: 0
		}
	};

	$.weatherSlider.global = {
		
		// global settings (Do not change these settings!)

		version			: '1.2',
		oldIE			: $.browser.msie && $.browser.version < 9 ? true : false,
		css3			: $.browser.webkit || $.browser.safari || $.browser.mozilla ? true : false,
		m				: {
			metric : {
				t 		: 'C',
				s 		: 'kmph',
				l		: 'km',
				pr		: 'mm',
				p		: 'hPa'
			},
			imperial : {
				t		: 'F',
				s		: 'mph',
				l		: 'mi',
				pr		: 'in',
				p		: 'mb'
			}
		}
	};

	$.weatherSlider.language = {
		
		cl					: 'Current Location',
		ht					: 'High',
		lt					: 'Low',
		hu					: 'Humidity',
		pr					: 'Precipitation',
		wi					: 'Wind',
		ps					: 'Pressure',
		vi					: 'Visibility',

		get					: 'getting weather',
		not					: 'Location not found',
		una					: 'Unable to determine your Current Location.',

		// days of week (beginning with Sunday)
		
		day					: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',

		// weather condition names
		
		'113'				: 'Sunny, Clear',
		'114'				: 'Sunny',
		'115'				: 'Clear',
		'116'				: 'Partly Cloudy',
		'119'				: 'Cloudy',
		'122'				: 'Overcast',
		'143'				: 'Mist',
		'176'				: 'Patchy rain nearby',
		'179'				: 'Patchy snow nearby',
		'182'				: 'Patchy sleet nearby',
		'185'				: 'Patchy freezing drizzle nearby',
		'200'				: 'Thundery outbreaks in nearby',
		'227'				: 'Blowing snow',
		'230'				: 'Blizzard',
		'248'				: 'Fog',
		'260'				: 'Freezing fog',
		'263'				: 'Patchy light drizzle',
		'266'				: 'Light drizzle',
		'281'				: 'Freezing drizzle',
		'284'				: 'Heavy freezing drizzle',
		'293'				: 'Patchy light rain',
		'296'				: 'Light rain',
		'299'				: 'Moderate rain at times',
		'302'				: 'Moderate rain',
		'305'				: 'Heavy rain at times',
		'308'				: 'Heavy rain',
		'311'				: 'Light freezing rain',
		'314'				: 'Moderate or Heavy freezing rain',
		'317'				: 'Light sleet',
		'320'				: 'Moderate or heavy sleet',
		'323'				: 'Patchy light snow',
		'326'				: 'Light snow',
		'329'				: 'Patchy moderate snow',
		'332'				: 'Moderate snow',
		'335'				: 'Patchy heavy snow',
		'338'				: 'Heavy snow',
		'350'				: 'Ice pellets',
		'353'				: 'Light rain shower',
		'356'				: 'Moderate or heavy rain shower',
		'359'				: 'Torrential rain shower',
		'362'				: 'Light sleet showers',
		'365'				: 'Moderate or heavy sleet showers',
		'368'				: 'Light snow showers',
		'371'				: 'Moderate or heavy snow showers',
		'374'				: 'Light showers of ice pellets',
		'377'				: 'Moderate or heavy showers of ice pellets',
		'386'				: 'Patchy light rain in area with thunder',
		'389'				: 'Moderate or heavy rain in area with thunder',
		'392'				: 'Patchy light snow in area with thunder',
		'395'				: 'Moderate or heavy snow in area with thunder'		
	};

	$.weatherSlider.options = {
		
		// User settings (can be modified)

		imgPath				: '/imagens/wheaterslider/',

		CSSanimations		: true,
		JSanimations		: true,
		snow				: true,
		rain				: true,
		wind				: true,
		lightnings			: true,

		windyWeather		: 18,
		windDirection		: 'auto',
		icyTemp				: -2,

		measurement			: 'metric',
		daytime				: [7,19],

		infoDuration		: 450,
		infoEasingType		: ['easeOutBack','easeInBack'],

		reduction			: 'auto',
		keybNav				: true,
		
		// Important! You must sign up to get your own WorlWeatherOnline API key!
		// Please do NOT use our API key, except for testing only!
		// The registraion for your API key is free:
		// http://www.worldweatheronline.com/register.aspx

		WWOAPIKey			: '10e43b062d182539121802'
	};

})(jQuery);