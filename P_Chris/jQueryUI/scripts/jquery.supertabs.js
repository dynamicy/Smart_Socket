(function($){
  $.easing.easeInOutExpo = function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	};
    
  var defaults = {
    ease: 'easeInOutExpo',
    heightEase: 'easeInOutExpo',
    duration: 1000
  };
  
  $.fn.supertabs = function(options){
    var options = $.extend({}, defaults, options);
    var element = this;
    element.addClass("supertabs");
    
    var overflow = $("<div />");
    overflow.addClass("supertabs-overflow");
    overflow.css({overflowX: "hidden"});
    element.wrap(overflow);
    
    var tabs      = element.find("> [data-tab]");
    tabs.addClass("supertab");

    var tabWidth  = tabs.outerWidth(true);
    var tabsWidth = tabWidth * tabs.length;

    element.width(tabsWidth);
    tabs.width(tabWidth);
        
    $(window).bind("hashchange", function(){
      var hash   = location.hash.replace("#", "");
      var active = element.find("> [data-tab='" + hash + "']:first");
      if (!active[0]) return;

      active.trigger("active.supertab", hash);
      active.addClass("supertab-active");
      var index = tabs.index(active);
      
      var offset = index * tabWidth * -1;
            
      element.animate({
        marginLeft: offset, 
        height: active.height()
      },{
        duration: options.duration,
        specialEasing: {
          marginLeft: options.ease, 
          height: options.heightEase
        }
      });      
    });
    
    if (window.location.hash != "")
      $(function(){ $(window).trigger("hashchange") });
  };
})(jQuery);