jQuery(function($){
  $("#content .supertabs").bind("active.supertab", function(e){
    $("#header ul li").removeClass("current");
    $("#header ul li a[href='" + location.hash + "']").parent().addClass("current");
  });
  $("#content .supertabs").supertabs();
});