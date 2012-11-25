jQuery.fn.floatdiv=function(location){
	if (self.innerHeight) {
		windowWidth=self.innerWidth;
		windowHeight=self.innerHeight;
	}else if (document.documentElement&&document.documentElement.clientHeight) {
		windowWidth=document.documentElement.clientWidth;
		windowHeight=document.documentElement.clientHeight;
	} else if (document.body) {
		windowWidth=document.body.clientWidth;
		windowHeight=document.body.clientHeight;
	}
	return this.each(function(){
		var loc;//层的绝对定位位置
		var wrap=$("<div></div>");
		var top=-1;
		if(location==undefined || location.constructor == String){
			switch(location){
				case("rightbottom")://右下角
					loc={right:"0px",bottom:"0px"};
					break;
				case("leftbottom")://左下角
					loc={left:"0px",bottom:"0px"};
					break;	
				case("lefttop")://左上角
					loc={left:"0px",top:"0px"};
					top=0;
					break;
				case("righttop")://右上角
					loc={right:"0px",top:"0px"};
					top=0;
					break;
				case("middletop")://居中置顶
					loc={left:windowWidth/2-$(this).width()/2+"px",top:"0px"};
					top=0;
					break;
				case("middlebottom")://居中置低
					loc={left:windowWidth/2-$(this).width()/2+"px",bottom:"0px"};
					break;
				case("leftmiddle")://左边居中
					loc={left:"0px",top:windowHeight/2-$(this).height()/2+"px"};
					top=windowHeight/2-$(this).height()/2;
					break;
				case("rightmiddle")://右边居中
					loc={right:"0px",top:windowHeight/2-$(this).height()/2+"px"};
					top=windowHeight/2-$(this).height()/2;
					break;
				case("middle")://居中
					var l=0;//居左
					var t=0;//居上
					l=windowWidth/2-$(this).width()/2;
					t=windowHeight/2-$(this).height()/2;
					top=t;
					loc={left:l+"px",top:t+"px"};
					break;
				default://默认为右下角
					location="rightbottom";
					loc={right:"0px",bottom:"0px"};
					break;
			}
		}
		$("body").append(wrap);
		wrap.css(loc).css({position:"fixed", z_index:"999"});
		$(this).appendTo(wrap);
	});
};