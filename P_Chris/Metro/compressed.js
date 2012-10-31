(function (a, b) 
{
    function e(d) 
    {
        var f = d || window.event,
            g = [].slice.call(arguments, 1),
            h = 0,
            i = 0,
            j = 0;
        return d = a.event.fix(f), d.type = "mousewheel", f.wheelDelta && (h = f.wheelDelta / 120), 
        f.detail && (f.type == c[2] ? (this.removeEventListener(c[0], e, !1), 
        h = -f.detail / 42) : h = -f.detail / 3), j = h, f.axis !== b && f.axis === f.HORIZONTAL_AXIS && (j = 0, i = -1 * h), 
        f.wheelDeltaY !== b && (j = f.wheelDeltaY / 120), f.wheelDeltaX !== b && (i = -1 * f.wheelDeltaX / 120), 
        g.unshift(d, h, i, j), (a.event.dispatch || a.event.handle).apply(this, g)
    };
    var c = ["DOMMouseScroll", "mousewheel", "MozMousePixelScroll"];
    if (a.event.fixHooks) for (var d = c.length; d;) a.event.fixHooks[c[--d]] = a.event.mouseHooks;
    a.event.special.mousewheel = 
    {
        setup: function () 
        {
            if (this.addEventListener) 
            {
                for (var a = c.length; a;) this.addEventListener(c[--a], e, !1)
            } 
            else 
            	this.onmousewheel = e
        },
        teardown: function () 
        {
            if (this.removeEventListener) 
            {
                for (var a = c.length; a;) this.removeEventListener(c[--a], e, !1)
            } 
            else 
            	this.onmousewheel = null
        }
    }
})(jQuery);
(function ($, e, b) 
{
    var c = "hashchange",
        h = document,
        f, g = $.event.special,
        i = h.documentMode,
        d = "on" + c in e && (i === b || i > 7)

        function a(j) 
        {
            j = j || location.href;
            return "#" + j.replace(/^[^#]*#?(.*)$/, "$1")
        };
    $.fn[c] = function (j) 
    {
        return j ? this.bind(c, j) : this.trigger(c)
    };
    $.fn[c].delay = 50;
    g[c] = $.extend(g[c], 
    {
        setup: function () 
        {
            if (d) return false;
            $(f.start)
        },
        teardown: function () 
        {
            if (d) return false;
            $(f.stop)
        }
    });
    f = (function () 
    {
        var j = {},
            p, m = a(),
            k = function (q) 
            {
                return q
            },
            l = k,
            o = k;
        j.start = function () 
        {
            p || n()
        };
        j.stop = function () 
        {
            p && clearTimeout(p);
            p = b
        }

        function n() 
        {
            var r = a(),
                q = o(m);
            if (r !== m) 
            {
                l(m = r, q);
                $(e).trigger(c)
            } 
            else if (q !== m) 
            	location.href = location.href.replace(/#.*/, "") + q;
            p = setTimeout(n, $.fn[c].delay)
        };
        $.browser.msie && !d && (function () 
        {
            var q, r;
            j.start = function () 
            {
                if (!q) 
                {
                    r = $.fn[c].src;
                    r = r && r + a();
                    q = $('<iframe tabindex="-1" title="empty"/>').hide().one("load", function () 
                    {
                        r || l(a());
                        n()
                    }).attr("src", r || "javascript:0").insertAfter("body")[0].contentWindow;
                    h.onpropertychange = function () 
                    {
                        try {
                            if (event.propertyName === "title") q.document.title = h.title
                        } catch (s) {}
                    }
                }
            };
            j.stop = k;
            o = function () 
            {
                return a(q.location.href)
            };
            l = function (v, s) 
            {
                var u = q.document,
                    t = $.fn[c].domain;
                if (v !== s) 
                {
                    u.title = h.title;
                    u.open();
                    t && u.write('<script>document.domain="' + t + '"<\/script>');
                    u.close();
                    q.location.hash = v
                }
            }
        })();
        return j
    })()
})(jQuery, this);
browser = 999;
if (navigator.appVersion.indexOf("MSIE") != -1) 
	browser = parseFloat(navigator.appVersion.split("MSIE")[1]);
timers = [];
$tile = {};
$group = 
{
    inactive: []
};
$content = {};
$arrows = {};
$page = {};
$hashed = {};
$subNav = {};
$mainNav = {};
$.extend(
{
    plugin: function (events, newfunction) 
    {
        for (i in events) if (newfunction.hasOwnProperty(i)) 
        {
            newfunction[i + "2"] = newfunction[i];
            delete newfunction[i]
        };
        $.extend(true, events, newfunction)
    }
});
$events = 
{
    run: function (w) 
    {
        for (i in w) w[i]()
    },
    beforeSiteLoad: function () 
    {
        $events.run($beforeSiteLoad)
    },
    afterTilesAppend: function () 
    {
        $events.run($afterTilesAppend)
    },
    afterTilesShow: function () 
    {
        $events.run($afterTilesShow)
    },
    onSubPageLoad: function () 
    {
        $events.run($afterSubPageLoad)
    },
    afterSubPageLoad: function () {
        $events.run($afterSubPageLoad)
    },
    onHashChange: function () {
        $events.run($onHashChange)
    },
    onWindowResize: function () {
        $events.run($onWindowResize)
    },
    onSiteLoad: function () {
        $events.run($onSiteLoad)
    }
};
$init = {};
$beforeSiteLoad = {};
$afterTilesAppend = {};
$afterTilesShow = {};
$onSubPageLoad = {};
$afterSubPageLoad = {};
$onHashChange = {};
$onWindowResize = {};
$onSiteLoad = {};
newLiveTile = function (id, group, texts, speed, slide) {
    if ($page.current == "home" && scrolling == false && (group == $group.current || group == $group.current + 1)) {
        var $id = $("#" + id);
        $id.stop().animate({
            opacity: 0,
            'margin-top': '+=15'
        }, 250, function () {
            $id.css("margin-top", -15).css("opacity", 0).html(texts[slide]).animate({
                opacity: 1,
                'margin-top': '+=15'
            }, 250, function () {
                $id.css("margin-top", 0).css("opacity", 1)
            })
        });
        if (slide + 2 > texts.length) {
            slide = 0
        } else slide++
    };
    setTimeout(function () {
        newLiveTile(id, group, texts, speed, slide)
    }, speed)
};
$.plugin($afterSubPageLoad, {
    googleanalytics: function () {
        if (typeof _gaq !== "undefined" && _gaq !== null) _gaq.push(['_trackPageview', "/#!/" + $hashed.current])
    }
});
(function ($) {
    $.fn.wipetouch = function (settings) {
        var config = {
            moveX: 40,
            moveY: 40,
            tapToClick: false,
            preventDefault: true,
            allowDiagonal: false,
            wipeLeft: false,
            wipeRight: false,
            wipeUp: false,
            wipeDown: false,
            wipeUpLeft: false,
            wipeDownLeft: false,
            wipeUpRight: false,
            wipeDownRight: false,
            wipeMove: false,
            wipeTopLeft: false,
            wipeBottomLeft: false,
            wipeTopRight: false,
            wipeBottomRight: false
        };
        if (settings) $.extend(config, settings);
        this.each(function () {
            var startX, startY, startDate = false,
                curX, curY, isMoving = false,
                touchedElement = false,
                useMouseEvents = false,
                clickEvent = false

                function onTouchStart(e) {
                    var start = useMouseEvents || (e.originalEvent.touches && e.originalEvent.touches.length > 0);
                    if (!isMoving && start) {
                        if (config.preventDefault) e.preventDefault();
                        if (config.allowDiagonal) {
                            if (!config.wipeDownLeft) config.wipeDownLeft = config.wipeBottomLeft;
                            if (!config.wipeDownRight) config.wipeDownRight = config.wipeBottomRight;
                            if (!config.wipeUpLeft) config.wipeUpLeft = config.wipeTopLeft;
                            if (!config.wipeUpRight) config.wipeUpRight = config.wipeTopRight
                        };
                        if (useMouseEvents) {
                            startX = e.pageX;
                            startY = e.pageY;
                            $(this).bind("mousemove", onTouchMove);
                            $(this).one("mouseup", onTouchEnd)
                        } else {
                            startX = e.originalEvent.touches[0].pageX;
                            startY = e.originalEvent.touches[0].pageY;
                            $(this).bind("touchmove", onTouchMove)
                        };
                        startDate = new Date().getTime();
                        curX = startX;
                        curY = startY;
                        isMoving = true;
                        touchedElement = $(e.target)
                    }
                }

                function onTouchEnd(e) {
                    if (config.preventDefault) e.preventDefault();
                    if (useMouseEvents) {
                        $(this).unbind("mousemove", onTouchMove)
                    } else $(this).unbind("touchmove", onTouchMove);
                    if (isMoving) {
                        touchCalculate(e)
                    } else resetTouch()
                }

                function onTouchMove(e) {
                    if (config.preventDefault) e.preventDefault();
                    if (useMouseEvents && !isMoving) onTouchStart(e);
                    if (isMoving) {
                        if (useMouseEvents) {
                            curX = e.pageX;
                            curY = e.pageY
                        } else {
                            curX = e.originalEvent.touches[0].pageX;
                            curY = e.originalEvent.touches[0].pageY
                        };
                        if (config.wipeMove) triggerEvent(config.wipeMove, {
                            curX: curX,
                            curY: curY
                        })
                    }
                }

                function touchCalculate(e) {
                    var endDate = new Date().getTime(),
                        ms = startDate - endDate,
                        x = curX,
                        y = curY,
                        dx = x - startX,
                        dy = y - startY,
                        ax = Math.abs(dx),
                        ay = Math.abs(dy);
                    if (ax < 15 && ay < 15 && ms < 100) {
                        clickEvent = false;
                        if (config.preventDefault) {
                            resetTouch();
                            touchedElement.trigger("click");
                            return
                        }
                    } else if (useMouseEvents) {
                        var evts = touchedElement.data("events");
                        if (evts) {
                            var clicks = evts.click;
                            if (clicks && clicks.length > 0) {
                                $.each(clicks, function (i, f) {
                                    clickEvent = f;
                                    return
                                });
                                touchedElement.unbind("click")
                            }
                        }
                    };
                    var toright = dx > 0,
                        tobottom = dy > 0,
                        s = ((ax + ay) * 60) / (ms / 6 * ms);
                    if (s < 1) s = 1;
                    if (s > 5) s = 5;
                    var result = {
                        speed: parseInt(s),
                        x: ax,
                        y: ay,
                        source: touchedElement
                    };
                    if (ax >= config.moveX) {
                        if (config.allowDiagonal && ay >= config.moveY) {
                            if (toright && tobottom) {
                                triggerEvent(config.wipeDownRight, result)
                            } else if (toright && !tobottom) {
                                triggerEvent(config.wipeUpRight, result)
                            } else if (!toright && tobottom) {
                                triggerEvent(config.wipeDownLeft, result)
                            } else triggerEvent(config.wipeUpLeft, result)
                        } else if (ax >= ay) if (toright) {
                            triggerEvent(config.wipeRight, result)
                        } else triggerEvent(config.wipeLeft, result)
                    } else if (ay >= config.moveY && ay > ax) if (tobottom) {
                        triggerEvent(config.wipeDown, result)
                    } else triggerEvent(config.wipeUp, result);
                    resetTouch()
                }

                function resetTouch() {
                    startX = false;
                    startY = false;
                    startDate = false;
                    isMoving = false;
                    if (clickEvent) window.setTimeout(function () {
                        touchedElement.bind("click", clickEvent);
                        clickEvent = false
                    }, 50)
                }

                function triggerEvent(wipeEvent, result) {
                    if (wipeEvent) wipeEvent(result)
                };
            if ("ontouchstart" in document.documentElement) {
                $(this).bind("touchstart", onTouchStart);
                $(this).bind("touchend", onTouchEnd)
            } else {
                useMouseEvents = true;
                $(this).bind("mousedown", onTouchStart);
                $(this).bind("mouseout", onTouchEnd)
            }
        });
        return this
    }
})(jQuery);
$.plugin($afterTilesAppend, {
    swipe: function () {
        $(document).wipetouch({
            tapToClick: true,
            wipeLeft: function (result) {
                $group.goRight();
                $('html', 'body').scrolLLeft(0)
            },
            wipeRight: function (result) {
                $group.goLeft();
                $('html', 'body').scrolLLeft(0)
            }
        })
    }
});
if (browser < 11 || $.browser.opera) {
    $(document).on("mouseenter", ".tileFlip", function () {
        $(this).removeClass("support3D").find(".flipFront, .tileLabelWrapper").stop().fadeOut(500)
    }).on("mouseleave", ".tileFlip", function () {
        $(this).find(".flipFront, .tileLabelWrapper").fadeIn(500)
    })
} else $(document).on("mouseenter", ".tileFlip", function () {
    clearTimeout(timers.tileFlipTimer);
    $(this).addClass("tileFlipped")
}).on("mouseleave", ".tileFlip", function () {
    timers.tileFlipTimer = setTimeout(function () {
        $(".tileFlipped").removeClass("tileFlipped")
    }, 600)
});
tileFlip = function (group, x, y, width, height, bg, linkPage, img, content, labelSettings, optClass) {
    if (labelSettings != '' && labelSettings[0] != '') {
        var label = labelSettings[0],
            labelcolor = labelSettings[1],
            desc = labelSettings[2],
            labelText = (label != '') ? "<div class='tileLabel bottom' style='border-bottom-color:" + labelcolor + ";'>" + label + "</div>" : '',
            labelDescText = (desc != '') ? "<div class='tileLabelDesc'>" + desc + "</div>" : '',
            labelTotal = "<div class='tileLabelWrapper bottom'>" + labelText + " " + labelDescText + "</div>"
    } else var labelTotal = '';
    $page.content += ("<a " + makeLink(linkPage) + " class='tileFlip support3D tile group" + group + " " + optClass + "' style=' \
	margin-top:" + ((y * $tile.scalespacing) + 45) + "px;margin-left:" + (x * $tile.scalespacing + group * $group.spacing) + "px; \
	width: " + (width * $tile.scalespacing - $tile.spacing) + "px; height:" + (height * $tile.scalespacing - $tile.spacing) + "px;'>\
	<div class='flipContainer' style='border:1px solid " + bg + ";'>\
		<div class='flipFront'><img src='" + img + "' style='width: " + (width * $tile.scalespacing - $tile.spacing) + "px; height:" + (height * $tile.scalespacing - $tile.spacing) + "px;'></div>\
		<div class='flipBack' style='background:" + bg + ";'>" + content + "</div>\
	" + labelTotal + "\
	</div>\
	</a>")
};
$.plugin($afterTilesAppend, {
    tileHoverEffectFold: function () {
        if (browser > 10 && !$.browser.opera && !mobile) {
            $(".tileHoverEffectFold").each(function () {
                var $item = $(this),
                    img = $item.children('img').attr('src'),
                    struct = '<div class="slice s1">';
                struct += '<div class="slice s2">';
                struct += '<div class="slice s3">';
                struct += '<div class="slice s4">';
                struct += '</div>';
                struct += '</div>';
                struct += '</div>';
                struct += '</div>';
                var $struct = $(struct);
                $item.children('img').remove().end().append($struct).find('div.slice').css('background-image', 'url(' + img + ')').prepend($('<span class="overlay" ></span>'))
            })
        } else $(".tileHoverEffectFold").css("overflow", "hidden")
    }
});
$.plugin($onSiteLoad, {
    tileHoverEffectFold: function () {
        if (browser > 10 && !$.browser.opera && !mobile) {
            $(document).on("mouseenter", ".tileHoverEffectFold", function () {
                $item = $(this);
                $item.addClass("tileHoverEffectFoldHover");
                for (i = 2; i < 5; i++) $item.find(".s" + i).addClass("s" + i + "n")
            }).on("mouseleave", ".tileHoverEffectFold", function () {
                $item = $(this);
                for (i = 2; i < 5; i++) $item.find(".s" + i).removeClass("s" + i + "n");
                setTimeout(function () {
                    $(".tileHoverEffectFoldHover").removeClass("tileHoverEffectFoldHover")
                }, 201)
            })
        } else $(document).on("mouseenter", ".tileHoverEffectFold", function () {
            $(this).children('img').stop().animate({
                "margin-left": -$(this).width() * 0.4
            }, 500)
        }).on("mouseleave", ".tileHoverEffectFold", function () {
            $(this).children('img').stop().animate({
                "margin-left": 0
            }, 500)
        })
    }
});
tileHoverEffectFold = function (group, x, y, width, height, bg, linkPage, image, content, labelSettings, optClass) {
    if (labelSettings != '' && labelSettings[0] != '') {
        var label = labelSettings[0],
            labelcolor = labelSettings[1],
            labelposition = labelSettings[2];
        if (labelposition == 'top') {
            var labelText = "<div class='tileLabelWrapper top' style='border-top-color:" + labelcolor + ";'><div class='tileLabel top' >" + label + "</div></div>"
        } else var labelText = "<div class='tileLabelWrapper bottom'><div class='tileLabel bottom' style='border-bottom-color:" + labelcolor + ";'>" + label + "</div></div>"
    } else labelText = '';
    $page.content += ("<a " + makeLink(linkPage) + " class='tileHoverEffectFold tile group" + group + " " + optClass + "' style=' \
	margin-top:" + ((y * $tile.scalespacing) + 45) + "px;margin-left:" + (x * $tile.scalespacing + group * $group.spacing) + "px; \
	width: " + (width * $tile.scalespacing - $tile.spacing) + "px; height:" + (height * $tile.scalespacing - $tile.spacing) + "px; \
	background:" + bg + ";'>\
	<div class='view-back'>\
	" + content + "\
	</div>\
	<img src='" + image + "' />\
	" + labelText + "\
	</a>")
};
$(document).on("mouseenter", ".tileHoverEffectLeft", function () {
    $(this).children('img').stop().animate({
        "margin-left": $(this).width() * 0.4
    }, 400)
}).on("mouseleave", ".tileHoverEffectLeft", function () {
    $(this).children('img').stop().animate({
        "margin-left": 0
    }, 400)
});
tileHoverEffectLeft = function (group, x, y, width, height, bg, linkPage, image, content, labelSettings, optClass) {
    if (labelSettings != '' && labelSettings[0] != '') {
        var label = labelSettings[0],
            labelcolor = labelSettings[1],
            labelposition = labelSettings[2];
        if (labelposition == 'top') {
            var labelText = "<div class='tileLabelWrapper top' style='border-top-color:" + labelcolor + ";'><div class='tileLabel top' >" + label + "</div></div>"
        } else var labelText = "<div class='tileLabelWrapper bottom'><div class='tileLabel bottom' style='border-bottom-color:" + labelcolor + ";'>" + label + "</div></div>"
    } else labelText = '';
    $page.content += ("<a " + makeLink(linkPage) + " class='tileHoverEffectLeft tile group" + group + " " + optClass + "' style=' \
	margin-top:" + ((y * $tile.scalespacing) + 45) + "px;margin-left:" + (x * $tile.scalespacing + group * $group.spacing) + "px; \
	width: " + (width * $tile.scalespacing - $tile.spacing) + "px; height:" + (height * $tile.scalespacing - $tile.spacing) + "px; \
	background:" + bg + ";'>\
	<div class='view-back'>\
	" + content + "\
	</div>\
	<img src='" + image + "' />\
	" + labelText + "\
	</a>")
};
$(document).on("mouseenter", ".tileHoverEffectRight", function () {
    $(this).children('img').stop().animate({
        "margin-left": -$(this).width() * 0.4
    }, 400)
}).on("mouseleave", ".tileHoverEffectRight", function () {
    $(this).children('img').stop().animate({
        "margin-left": 0
    }, 400)
});
tileHoverEffectRight = function (group, x, y, width, height, bg, linkPage, image, content, labelSettings, optClass) {
    if (labelSettings != '' && labelSettings[0] != '') {
        var label = labelSettings[0],
            labelcolor = labelSettings[1],
            labelposition = labelSettings[2];
        if (labelposition == 'top') {
            var labelText = "<div class='tileLabelWrapper top' style='border-top-color:" + labelcolor + ";'><div class='tileLabel top' >" + label + "</div></div>"
        }
        else var labelText = "<div class='tileLabelWrapper bottom'><div class='tileLabel bottom' style='border-bottom-color:" + labelcolor + ";'>" + label + "</div></div>"
    } else labelText = '';
    $page.content += ("<a " + makeLink(linkPage) + " class='tileHoverEffectRight tile group" + group + " " + optClass + "' style=' \
	margin-top:" + ((y * $tile.scalespacing) + 45) + "px;margin-left:" + (x * $tile.scalespacing + group * $group.spacing) + "px; \
	width: " + (width * $tile.scalespacing - $tile.spacing) + "px; height:" + (height * $tile.scalespacing - $tile.spacing) + "px; \
	background:" + bg + ";'>\
	<div class='view-back'>\
	" + content + "\
	</div>\
	<img src='" + image + "'/>\
	" + labelText + "\
	</a>")
};
$.plugin($init, {
    nextSlideshow: function (id, dir) {
        clearTimeout(timers[id]);
        var $id = $("#" + id),
            group = $id.data("group"),
            speed = $id.data("speed");
        if ($page.current == "home" && scrolling == false && ((group == $group.current || group == $group.current + 1) || mobile)) {
            if (!dir) dir = 1;
            var lastClick = $id.data("lastClick"),
                slide = $id.data("slide"),
                speed = $id.data("speed"),
                images = $id.data("images");
            slide = ((slide + 2) > images.length) ? 0 : slide + 1;
            switch ($id.data("effect")) {
            case "fade":
                $("#" + id + "_back").attr("src", $id.attr("src")).stop(true, true).show().fadeOut(500);
                $id.stop(true, true).hide().attr("src", images[slide]).fadeIn(500);
                break;
            case "slide":
                $("#" + id + "_back").attr("src", $("#" + id).attr("src")).css("left", 0).stop(true, true).animate({
                    left: dir * $("#" + id).width()
                }, 500);
                $($id).attr("src", images[slide]).stop(true, true).css("left", -dir * $("#" + id).width()).animate({
                    left: 0
                }, 500);
                break;
            case "fadeslide":
                $("#" + id + "_back").attr("src", $("#" + id).attr("src")).css("left", 0).stop(true, true).animate({
                    left: dir * $("#" + id).width()
                }, 500);
                $($id).hide().attr("src", images[slide]).stop(true, true).fadeIn(600);
                break;
            case "flipvertical":
                $id_back = $("#" + id + "_back");
                var margin = $id.parent().height() / 2,
                    height = $id.parent().height(),
                    width = $id.parent().width();
                $id_back.css({
                    height: '0px',
                    width: '' + width + 'px',
                    marginTop: '' + margin + 'px',
                    opacity: '0.5'
                });
                $id.stop(true, false).animate({
                    height: '0px',
                    width: '' + width + 'px',
                    marginTop: '' + margin + 'px',
                    opacity: '0.5'
                }, 400, function () {
                    $id_back.attr("src", $("#" + id).attr("src")).animate({
                        height: '' + height + 'px',
                        width: '' + width + 'px',
                        marginTop: '0px',
                        opacity: '1'
                    }, 400)
                });
                $id_back.stop(true, false).animate({
                    height: '0px'
                }, 400, function () {
                    $id.attr("src", images[slide]).animate({
                        height: '' + height + 'px',
                        width: '' + width + 'px',
                        marginTop: '0px',
                        opacity: '1'
                    }, 400)
                });
                break;
            case "fliphorizontal":
                $id_back = $("#" + id + "_back");
                var margin = $id.parent().width() / 2,
                    width = $id.parent().width(),
                    height = $id.parent().height();
                $id_back.css({
                    width: '0px',
                    height: '' + height + 'px',
                    marginLeft: '' + margin + 'px',
                    opacity: '0.5'
                });
                $id.stop(true, false).animate({
                    width: '0px',
                    height: '' + height + 'px',
                    marginLeft: '' + margin + 'px',
                    opacity: '0.5'
                }, 400, function () {
                    $($id_back).attr("src", $("#" + id).attr("src")).animate({
                        width: '' + width + 'px',
                        height: '' + height + 'px',
                        marginLeft: '0px',
                        opacity: '1'
                    }, 400)
                });
                $id_back.stop(true, false).animate({
                    width: '0px',
                    height: '' + height + 'px',
                    marginLeft: '' + margin + 'px',
                    opacity: '0.5'
                }, 400, function () {
                    $($id).attr("src", images[slide]).animate({
                        width: '' + width + 'px',
                        height: '' + height + 'px',
                        marginLeft: '0px',
                        opacity: '1'
                    }, 400)
                });
                break
            };
            $id.data("slide", slide)
        };
        if (speed != 0) timers[id] = window.setTimeout(function () {
            $init.nextSlideshow(id)
        }, speed)
    }
});
$.plugin($onSiteLoad, {
    slideShowArrowInit: function () {
        $(document).on("hover", "#sl_arrowLeft, #sl_arrowRight", function () {
            $(this).stop().fadeTo(200, 1)
        }).on("mouseout", "#sl_arrowLeft, #sl_arrowRight", function () {
            $(this).stop().fadeTo(200, 0.4)
        }).on("click", "#sl_arrowLeft", function () {
            $img = $(this).parent("a").find(".tileSlideshowImage");
            var slide = $img.data("slide");
            if ((slide - 1) < 0) {
                slide = $img.data("images").length - 2
            } else slide -= 2;
            $img.data("slide", slide).data("lastClick", new Date().getTime());
            $init.nextSlideshow($img.attr("id"), -1)
        }).on("click", "#sl_arrowRight", function () {
            $img = $(this).parent("a").find(".tileSlideshowImage");
            var slide = $img.data("slide");
            if ((slide + 1) > $img.data("images").length) slide = 0;
            $img.data("slide", slide).data("lastClick", new Date().getTime());
            $init.nextSlideshow($img.attr("id"), 1)
        })
    }
});
tileSlideshow = function (group, x, y, width, height, bg, linkPage, speed, arrows, effect, images, labelSettings, optClass) {
    if (labelSettings != '' && labelSettings[0] != '') {
        var label = labelSettings[0],
            labelcolor = labelSettings[1],
            labelposition = labelSettings[2];
        if (labelposition == 'top') {
            var labelText = "<div class='tileLabelWrapper top' style='border-top-color:" + labelcolor + ";'><div class='tileLabel top' >" + label + "</div></div>"
        } else var labelText = "<div class='tileLabelWrapper bottom'><div class='tileLabel bottom' style='border-bottom-color:" + labelcolor + ";'>" + label + "</div></div>"
    } else labelText = '';
    var sid = "slideshow_" + (group + '' + x + '' + y).replace(/\./g, '_');
    if (arrows) {
        var arrow = '<img id="sl_arrowRight" src="simpleArrowRight.png"><img id="sl_arrowLeft" src="simpleArrowLeft.png">'
    } else var arrow = '';
    $page.content += ("<a " + makeLink(linkPage) + " class='tileSlideshow tile group" + group + " " + optClass + "' style=' \
	margin-top:" + ((y * $tile.scalespacing) + 45) + "px; margin-left:" + (x * $tile.scalespacing + group * $group.spacing) + "px; \
	width: " + (width * ($tile.scalespacing) - $tile.spacing) + "px; height:" + (height * ($tile.scalespacing) - $tile.spacing) + "px; \
	background:" + bg + ";'>\
	<img class='tileSlideshowImageBack' id='" + sid + "_back' src='" + images[0] + "'>\
	<img class='tileSlideshowImage' id='" + sid + "' src='" + images[0] + "' >\
	" + arrow + "\
	" + labelText + "\
	</a>");
    $.plugin($afterTilesAppend, {
        run: function () {
            $("#" + sid).data("slide", 0).data("images", images).data("group", group).data("speed", speed).data("effect", effect);
            $.each(images, function (i, val) {
                $('<img/>').attr('src', val)
            })
        }
    });
    timers[sid] = setTimeout(function () {
        $init.nextSlideshow(sid)
    }, speed)
};
$tile.scale = 145;
$tile.spacing = 10;
$group.spacing = 700;
$group.titles = new Array("Home", "Download", "Support");
$group.inactive.opacity = 1;
$group.inactive.clickable = true;
$group.showEffect = 0;
$page.showSpeed = 400;
$page.hideSpeed = 300;
jQuery.fx.interval = 25;
pageLink = new Array();
pageLink.Typography = 'typography.php';
pageLink['Terms of use'] = 'tou.php';
pageLink.About = 'about.php';
pageLink.Contact = 'contact.php';
pageLink.Download = 'download.php';
pageLink.Tutorials = 'tutorials.php';
pageLink['Version 2'] = 'version2.php';
pageLink.Demos = 'demos.php';
pageLink['Buy Template'] = 'buynow.php';
menuLink = new Array();
tiles = function () 
{
    tileTitleTextImage(0, 0, 0, 2, 1, '#3B659C', 'About', "About", 'This is a templating framework .', "box_info.png", 45, 2, 5, ['', '', ''], '');
    tileLive(0, 2, 0, 1, 1, "#C33", "", "Live tile", "", "", "", "", 2e3, ["Many types of tiles", "Using jQuery, CSS and PHP", "SEO Optimized", "Compressing system for better performance", "No-Javascript Version"], ['', '', ''], "noClick");
    tileTitleText(0, 1, 1, 2, 1, "#668000", "Features", "Features", "Many tiles, slideshows, livetiles, many animations, works in all major browsers, SEO optimized, JS & CSS compressing system, Mobile version ", [], "");
    tileFlip(0, 0, 1, 1, 1, "#C33", "Typography", "img1.png", "<h5 class='white'>Click here</h5>to view the typography of this template", ['Typography', '#C33', ''], '');
    tileHoverEffectFold(0, 0, 2, 2, 1, "#C33", "demos", "metro_300x145ccccc.png", "Click here to go to the demo</span>", ['Demo', 'transparent', 'bottom'], '');
    tileTitleTextImage(1, 0, 0, 2, 1, "#668000", "Download", "Download", "<span style='font-weight:normal'>v3.0.3</strong> - 6/10/2012<p>", "box_download.png", 70, 0, 5, ["", "#3B659C", "bottom"], "");
    tileImg(1, 2, 0, 1, 1, '#3B659C', 'Version 2', 'v2b.png', 1, 1, ['Version 2', '#668000', 'bottom', '<strong>The old version</strong>'], '');
    tileImageSlider(1, 0, 1, 1, 1, "#C33", "Bugs", "bug.png", 0.5, "<h2 style='background-color:#E34242;height:50px;margin-top:2px;' class='white'>Bugs</h2>", 0.35, ["Bugs", "#E34242", "top"], "");
    tileLive(2, 0, 0, 2, 1, "#C33", "Tutorials", "Tutorials", "", "", "", "", 2500, ["Add-ons", "Plugins", "Tips"], "");
    tileCustom(2, 1, 1, 1, 1, "#668000", 'forum/', "<img src='textbubble.png' height='59' width='72' style='margin-left:35px;margin-top:20px;'/><h2 class='white' style='margin-left:25px;margin-top:10px;'>Forum</h2>", [''], '');
    tileImageSlider(2, 2, 0, 1, 1, "#3B659C", "Contact", "contact.png", 0.45, "<span style='font-size:30px; padding-left:5px;'>Contact</span>", 0.5, [''], "");
    tileCustom(2, 0, 1, 1, 1, "#3B659C", 'Terms of use', "<div id='title' style='font-size:30px;font-weight:lighter;margin:10px;'>Terms of Use</div>", [''], '')
};
tileTitleText = function (group, x, y, width, height, bg, linkPage, title, text, labelSettings, optClass) {
    if (labelSettings != '' && labelSettings[0] != '') {
        var label = labelSettings[0],
            labelcolor = labelSettings[1],
            labelposition = labelSettings[2];
        if (labelposition == 'top') {
            var labelText = "<div class='tileLabelWrapper top' style='border-top-color:" + labelcolor + ";'><div class='tileLabel top' >" + label + "</div></div>"
        } else var labelText = "<div class='tileLabelWrapper bottom'><div class='tileLabel bottom' style='border-bottom-color:" + labelcolor + ";'>" + label + "</div></div>"
    } else labelText = '';
    $page.content += ("<a " + makeLink(linkPage) + " class='tile group" + group + " " + optClass + "' style=' \
	margin-top:" + ((y * $tile.scalespacing) + 45) + "px; margin-left:" + (x * $tile.scalespacing + group * $group.spacing) + "px; \
	width: " + (width * $tile.scalespacing - $tile.spacing) + "px; height:" + (height * $tile.scalespacing - $tile.spacing) + "px; \
	background:" + bg + ";'>\
	<div class='tileTitle'>" + title + "</div>\
	<div class='tileDesc'>" + text + "</div>\
	" + labelText + "\
	</a>")
};
tileImg = function (group, x, y, width, height, bg, linkPage, img, imgSizeWidth, imgSizeHeight, labelSettings, optClass) {
    if (labelSettings != '' && labelSettings[0] != '') {
        var id = "tileimg_" + (group + '' + x + '' + y).replace(/\./g, '_'),
            label = labelSettings[0],
            labelcolor = labelSettings[1],
            labelposition = labelSettings[2],
            desc = labelSettings[3],
            showDescOnHover = labelSettings[4],
            displayLabel = showDescOnHover ? " showOnHover" : "",
            labelDescText = (desc != '') ? "<div class='tileLabelDesc " + displayLabel + "'>" + desc + "</div>" : '';
        if (labelposition == 'top') {
            var totalLabel = "<div class='tileLabelWrapper top' style='border-top-color:" + labelcolor + ";'><div class='tileLabel top' >" + label + "</div>" + labelDescText + "</div>"
        } else var totalLabel = "<div class='tileLabelWrapper bottom'><div class='tileLabel bottom' style='border-bottom-color:" + labelcolor + ";'>" + label + "</div>" + labelDescText + "</div>";
        $(function () {
            $.plugin($afterTilesAppend, {
                tileImg: function () {
                    var id2 = id;
                    if (labelposition == 'top') {
                        $("." + id2).bind("mouseenter", function () {
                            $(this).find("div.showOnHover").show(200)
                        });
                        $("." + id2).bind("mouseleave", function () {
                            $(this).find("div.showOnHover").stop().hide(200)
                        })
                    } else {
                        $("." + id2).bind("mouseenter", function () {
                            $(this).find("div.showOnHover").css("bottom", 0).slideDown(200)
                        });
                        $("." + id2).bind("mouseleave", function () {
                            $(this).find("div.showOnHover").css("top", 0).stop().slideUp(200)
                        })
                    }
                }
            })
        })
    } else {
        var id = "",
            totalLabel = ""
    };
    var drawHeight = (imgSizeWidth * $tile.scalespacing - $tile.spacing),
        drawWidth = (imgSizeHeight * $tile.scalespacing - $tile.spacing),
        tileHeight = (height * $tile.scalespacing - $tile.spacing),
        tileWidth = (width * $tile.scalespacing - $tile.spacing);
    $page.content += ("<a " + makeLink(linkPage) + " class='tile tileImg group" + group + " " + id + " " + optClass + "' style=' \
	margin-top:" + ((y * $tile.scalespacing) + 45) + "px ;margin-left:" + (x * $tile.scalespacing + group * $group.spacing) + "px; \
	width: " + tileWidth + "px; height:" + tileHeight + "px; \
	background:" + bg + ";'>\
	<img src='" + img + "' width=" + drawWidth + " height=" + drawHeight + " \
	style='margin-left: " + ((tileWidth - drawWidth) * 0.5) + "px; \
	margin-top: " + ((tileHeight - drawHeight) * 0.5) + "px'/>\
	" + totalLabel + "\
	</a>")
};
tileTitleTextImage = function (group, x, y, width, height, bg, linkPage, title, text, img, imgSize, imgToTop, imgToLeft, labelSettings, optClass) {
    if (labelSettings != '' && labelSettings[0] != '') {
        var label = labelSettings[0],
            labelcolor = labelSettings[1],
            labelposition = labelSettings[2];
        if (labelposition == 'top') {
            var labelText = "<div class='tileLabelWrapper top' style='border-top-color:" + labelcolor + ";'><div class='tileLabel top' >" + label + "</div></div>"
        } else var labelText = "<div class='tileLabelWrapper bottom'><div class='tileLabel bottom' style='border-bottom-color:" + labelcolor + ";'>" + label + "</div></div>"
    } else labelText = '';
    $page.content += ("<a " + makeLink(linkPage) + " class='tile group" + group + " " + optClass + "' style=' \
	margin-top:" + ((y * $tile.scalespacing) + 45) + "px;margin-left:" + (x * $tile.scalespacing + group * $group.spacing) + "px; \
	width: " + (width * $tile.scalespacing - $tile.spacing) + "px; height:" + (height * $tile.scalespacing - $tile.spacing) + "px; \
	background:" + bg + ";'>\
	<img style='float:left; margin-top:" + imgToTop + "px;margin-left:" + imgToLeft + "px;' src='" + img + "' height=" + imgSize + " width=" + imgSize + "/> \
	<div class='tileTitle' style='margin-left:" + (imgSize + 5 + imgToLeft) + "px;'>" + title + "</div>\
	<div class='tileDesc' style='margin-left:" + (imgSize + 6 + imgToLeft) + "px;'>" + text + "</div>\
	" + labelText + "\
	</a>")
};
tileLive = function (group, x, y, width, height, bg, linkPage, title, img, imgSize, imgToTop, imgToLeft, speed, textArray, labelSettings, optClass) {
    if (labelSettings != '' && labelSettings[0] != '') {
        var label = labelSettings[0],
            labelcolor = labelSettings[1],
            labelposition = labelSettings[2];
        if (labelposition == 'top') {
            var labelText = "<div class='tileLabelWrapper top' style='border-top-color:" + labelcolor + ";'><div class='tileLabel top' >" + label + "</div></div>"
        } else var labelText = "<div class='tileLabelWrapper bottom'><div class='tileLabel bottom' style='border-bottom-color:" + labelcolor + ";'>" + label + "</div></div>"
    } else labelText = '';
    var id = "livetile_" + (group + '' + x + '' + y).replace(/\./g, '_');
    if (img != '') {
        imgInsert = "<img style='float:left; margin-top:" + imgToTop + "px;margin-left:" + imgToLeft + "px;' src='" + img + "' height=" + imgSize + " width=" + imgSize + "/>"
    } else {
        imgInsert = '';
        imgSize = 0;
        imgToLeft = 0
    };
    $page.content += ("<a " + makeLink(linkPage) + " class='tile group" + group + " " + optClass + "' style=' \
	margin-top:" + ((y * $tile.scalespacing) + 45) + "px; margin-left:" + (x * $tile.scalespacing + group * $group.spacing) + "px; \
	width: " + (width * $tile.scalespacing - $tile.spacing) + "px; height:" + (height * $tile.scalespacing - $tile.spacing) + "px; \
	background:" + bg + ";'>\
	" + imgInsert + "\
	<div class='tileTitle' style='margin-left:" + (imgSize + 5 + imgToLeft) + "px;'>" + title + "</div>\
	<div class='livetile' style='margin-left:" + (imgSize + 10 + imgToLeft) + "px;' id='" + id + "' >" + textArray[0] + "</div>\
	" + labelText + "\
	</a>");
    setTimeout(function () {
        newLiveTile(id, group, textArray, speed, 0)
    }, speed)
};
tileImageSlider = function (group, x, y, width, height, bg, linkPage, img, imgsize, text, slideDistance, labelSettings, optClass) {
    if (labelSettings != '' && labelSettings[0] != '') {
        var label = labelSettings[0],
            labelcolor = labelSettings[1],
            labelposition = labelSettings[2];
        if (labelposition == 'top') {
            var labelText = "<div class='tileLabelWrapper top' style='border-top-color:" + labelcolor + ";'><div class='tileLabel top' >" + label + "</div></div>"
        } else var labelText = "<div class='tileLabelWrapper bottom'><div class='tileLabel bottom' style='border-bottom-color:" + labelcolor + ";'>" + label + "</div></div>"
    } else labelText = '';
    tileWidth = width * $tile.scalespacing - $tile.spacing;
    tileHeight = height * $tile.scalespacing - $tile.spacing;
    $page.content += ("<a " + makeLink(linkPage) + " class='tile group" + group + " " + optClass + " tileImageSlider' id='" + slideDistance + " ' style=' \
	margin-top:" + ((y * $tile.scalespacing) + 45) + "px;margin-left:" + (x * $tile.scalespacing + group * $group.spacing) + "px; \
	width: " + tileWidth + "px; height:" + tileHeight + "px; \
	background:" + bg + "; text-align:center;'>\
	<div class='tileImageSliderWrapper' style='position:absolute;'>\
	<div style='width: " + tileWidth + "px; height:" + tileHeight + "px;'>\
	<img src='" + img + "' height=" + tileHeight * imgsize + " style='margin-top: " + ((tileHeight - tileHeight * imgsize) * 0.5) + "px'/>\
	</div>\
	<div text='tileImageSliderText'>" + text + "</div>\
	" + labelText + "\
	</div>\
	</a>");
    $(document).on("mouseover", '.tileImageSlider', function () {
        $(this).find(".tileImageSliderWrapper").stop(true, false).animate({
            "margin-top": -$(this).height() * $(this).attr("id")
        }, 250, "linear")
    }).on("mouseleave", '.tileImageSlider', function () {
        $(this).find(".tileImageSliderWrapper").stop(true, false).animate({
            'margin-top': 0
        }, 300, "linear")
    })
};
tileCustom = function (group, x, y, width, height, bg, linkPage, content, labelSettings, optClass) {
    if (labelSettings != '' && labelSettings[0] != '') {
        var label = labelSettings[0],
            labelcolor = labelSettings[1],
            labelposition = labelSettings[2];
        if (labelposition == 'top') {
            var labelText = "<div class='tileLabelWrapper top' style='border-top-color:" + labelcolor + ";'><div class='tileLabel top' >" + label + "</div></div>"
        } else var labelText = "<div class='tileLabelWrapper bottom'><div class='tileLabel bottom' style='border-bottom-color:" + labelcolor + ";'>" + label + "</div></div>"
    } else labelText = '';
    $page.content += ("<a " + makeLink(linkPage) + " class='tile group" + group + " " + optClass + "' style=' \
	margin-top:" + ((y * $tile.scalespacing) + 45) + "px;margin-left:" + (x * $tile.scalespacing + group * $group.spacing) + "px; \
	width: " + (width * $tile.scalespacing - $tile.spacing) + "px; height:" + (height * $tile.scalespacing - $tile.spacing) + "px; \
	background:" + bg + ";'>\
	" + content + "\
	" + labelText + "\
	</a>")
};
$group.count = $group.titles.length;
$tile.scalespacing = $tile.scale + $tile.spacing;
$group.current = -1;
$group.widestpx = 300;
mostDown = 0;
$page.current = '';
$hashed.current = '';
$hashed.part = '';
$arrows.rightArray = new Array();
prevScroll = 0;
scrolling = false;
mobile = false;
String.prototype.stripSpaces = function () {
    return this.replace(/\s/g, "_")
};
String.prototype.addSpaces = function () {
    return this.replace(/_/g, " ")
};
inArray = function (array, index) {
    var i = array.length;
    while (i--) if (array[i].toLowerCase() == index.toLowerCase()) return i;
    return -1
};
realArrayIndex = function (array, index) {
    for (var i in array) if (i.toLowerCase() == index.toLowerCase()) return i;
    return -1
};
$(document).on("mouseover", "#arrowLeft,#arrowRight", function () {
    $(this).stop(false, true).fadeTo(300, 1)
}).on("mouseleave", "#arrowLeft,#arrowRight", function () {
    $(this).stop(false, true).fadeTo(300, 0.5)
}).on("click", "#arrowLeft", function () {
    $group.goLeft()
}).on("click", "#arrowRight", function () {
    $group.goRight()
});
$.extend($arrows, {
    place: function (speed) {
        $("#arrowLeft,#arrowRight", "#content").hide();
        if ($group.current != 0) $("#arrowLeft", "#content").css('margin-left', $group.current * $group.spacing - 40).fadeTo(speed, 0.5);
        if ($group.current != ($group.count - 1)) $("#arrowRight", "#content").css('margin-left', $arrows.rightArray[$group.current] + 12).fadeTo(speed, 0.5)
    }
});
$.extend($group, {
    scrollFinished: function () {
        document.title = siteTitle + " | " + $group.titles[$group.current];
        scrolling = false;
        $arrows.place(300)
    },
    goTo: function (n) {
        scrolling = true;
        if (n < 0) n = 0;
        $("#arrowLeft,#arrowRight", "#content").hide();
        $group.current = n;
        if (browser < 10) {
            $('#content').stop().animate({
                "margin-left": -$group.spacing * n
            }, 500, function () {
                $group.scrollFinished()
            })
        } else {
            setTimeout(function () {
                $group.scrollFinished()
            }, 500);
            $('#content').css("margin-left", -$group.spacing * n)
        };
        if ($group.inactive.opacity == 1) {
            $(".group" + n + ",.titleGroup" + n, "#content").stop(true, true).fadeIn(500)
        } else {
            $(".tile,.groupTitle", "#content").stop(true, true).fadeTo(500, $group.inactive.opacity);
            $(".group" + n + ",.titleGroup" + n, "#content").stop(true, true).fadeTo(500, 1);
            if (!$group.inactive.clickable) {
                $(".tile", "#content").unbind("click.inactiveTile");
                for (i = 0; i < $group.count; i++) if (i != n) $(function () {
                    var name = $group.titles[i];
                    $(".group" + i, "#content").bind("click.inactiveTile", function () {
                        window.location.href = "#&" + name;
                        return false
                    })
                });
                $(".tile", "#content").addClass("inactiveTile");
                $(".group" + n, "#content").removeClass("inactiveTile")
            }
        };
        $mainNav.setCurrent()
    },
    goLeft: function () {
        if ($group.current > 0) {
            window.location.hash = "&" + $group.titles[$group.current - 1].toLowerCase().stripSpaces()
        } else $group.bounce(-1)
    },
    goRight: function () {
        if ($group.current + 1 < $group.count) {
            window.location.hash = "&" + $group.titles[$group.current + 1].toLowerCase().stripSpaces()
        } else $group.bounce(1)
    },
    bounce: function (s) {
        if (scrolling == false) {
            scrolling = true;
            $('#wrapper').stop().animate({
                'margin-left': "-=" + 40 * s
            }, 150).animate({
                'margin-left': 0
            }, 150, function () {
                scrolling = false
            })
        }
    }
});
$(window).resize(function () {
    if ($(window).width() < $group.spacing) {
        $("html").css("overflow-x", "auto");
        $(".tile", "#content").not(".group" + $group.current).stop().hide();
        $(".groupTitle", "#content").not(".titleGroup" + $group.current).stop().hide();
        prevScroll = 1
    } else {
        if (prevScroll == 1) {
            prevScroll = 0;
            $("html").css("overflow-x", "hidden");
            $(".tile", "#content").not(".group" + $group.current).stop().fadeTo(0, $group.inactive.opacity);
            $(".groupTitle", "#content").show()
        };
        $("#subNav").find("a").removeClass("smallSubNav")
    };
    if (parseInt($("#subNav").height()) > 50) $("#subNav").find("a").addClass("smallSubNav");
    if (parseInt($("#header").height()) > 100) {
        $("#nav").css("float", "left")
    } else $("#nav").css("float", "right");
    if ($(window).height() < Math.max(($(document).height() - 4), document.documentElement.clientHeight) || $page.current != 'home') {
        $(document).unbind("mousewheel")
    } else $(document).bind("mousewheel", function (event, delta) {
        if (!scrolling) if (delta > 0) {
            $group.goLeft()
        } else $group.goRight();
        event.preventDefault()
    });
    $events.onWindowResize()
});
$subNav = {
    make: function () {
        var items = '';
        for (var i in menuLink) {
            var l = makeLink(menuLink[i]);
            items += "<a style='background-color:" + menuColor[i] + ";' id='subNavI" + menuLink[i].toLowerCase().replace("&", "A9M8").stripSpaces() + "' " + l + ">" + i + "</a>"
        };
        $("#subNav").html(items);
        $subNav.setCurrent()
    },
    setCurrent: function () {
        $("#subNavI" + $hashed.current.toLowerCase().replace("&", "A9M8").stripSpaces()).addClass("subNavItemActive")
    }
};
$mainNav = {
    setCurrent: function () {
        $(".navItem", "#nav").removeClass("navActive");
        if ($hashed.part == "") $('a[href="#&home"]').addClass("navActive");
        $(".navItem", "#nav").each(function () {
            $this = $(this);
            if ($this.attr("href").toLowerCase().replace(" ", "_") == "#&" + $hashed.part.toLowerCase()) $this.addClass("navActive")
        })
    },
    set: function (w) {
        $(".navItem", "#nav").removeClass("navActive");
        $("#" + w, "#nav").addClass("navActive")
    }
};
makeLink = function (lp) {
    var t = '';
    if (lp.substr(0, 9) == 'external:') {
        t = "target='_blank' ";
        lp = lp.substr(9)
    };
    if (lp.substr(0, 9) == 'gotolink:') return t + "href='" + lp.substr(9) + "'";
    if (lp == "") return '';
    if (lp.substr(0, 7) == "http://" || lp.substr(0, 8) == "https://" || lp.substr(0, 1) == "/" || lp.substr(0, 1) == "#" || lp[lp.length - 1] == "/") return t + "href='" + lp + "'";
    return t + "href='#!/" + lp.stripSpaces() + "'"
};
$(document).on("click", "a", function () {
    if (this.href == window.location.href) $(window).hashchange()
});
if (browser < 10) $(document).on("mouseenter", "#subNav a", function () {
    $(this).stop(true, false).animate({
        height: 28
    }, 150)
}).on("mouseout", "#subNav a", function () {
    $(this).animate({
        height: 20
    }, 150)
});
$show = {
    homePagePrepare: function () {
        $("#contentWrapper").fadeOut($page.hideSpeed, function () {
            $page.current = "home";
            $show.homePage()
        })
    },
    homePage: function () {
        $("#subNav").hide();
        $("html").css("overflow-x", "hidden");
        $(document).mousedown(function (e) {
            if (e.button == 1) return false
        });
        if (($group.current = inArray($group.titles, $hashed.part.addSpaces())) == -1) $group.current = 0;
        document.title = siteTitle + ' | ' + siteTitleHome;
        $("#content").css('margin-left', -$group.spacing * $group.current).html($page.content);
        $("#contentWrapper").removeClass("pageContent").fadeIn(300);
        if ($group.inactive.opacity == 1) {
            if ($group.showEffect == 0) {
                $(".tile", "#content").each(function (index) {
                    var $this = $(this);
                    if ($this.hasClass("group0")) {
                        $this.delay(50 * index).show(300)
                    } else $this.delay(50 * index).fadeIn(300)
                })
            } else if (showEffect == 1) {
                $(".tile", "#content").fadeIn(700)
            } else if (showEffect == 2) $(".tile", "#content").show(700)
        } else {
            $(".tile", "#content").not(".group" + $group.current).stop().fadeTo(700, $group.inactive.opacity);
            $(".group" + $group.current, "#content").stop().fadeTo(700, 1);
            $(".groupTitle", "#content").stop().fadeTo(500, $group.inactive.opacity);
            $(".titleGroup" + $group.current, "#content").stop().fadeTo(500, 1);
            if (!$group.inactive.clickable) {
                $(".tile", "div#content").unbind("click.inactiveTile");
                for (i = 0; i < $group.count; i++) if (i != $group.current) $(function () {
                    var name = $group.titles[i];
                    $(".group" + i, "#content").bind("click.inactiveTile", function () {
                        window.location.href = "#&" + name;
                        return false
                    })
                });
                $(".tile", "#content").not(".group" + $group.current, "#content").addClass("inactiveTile")
            }
        };
        $events.afterTilesAppend();
        $(window).resize();
        setTimeout(function () {
            if (mostDown == 0) {
                for (i = 0; i < $group.count; i++) {
                    var mostRight = -999;
                    $(".group" + i, "#content").each(function () {
                        var $tile = $(this);
                        thisRight = parseInt($tile.css('margin-left')) + $tile.width();
                        if (thisRight > mostRight) mostRight = thisRight;
                        var margint = parseInt($tile.css("margin-top")) + $tile.height();
                        if (margint > mostDown) mostDown = margint
                    });
                    $arrows.rightArray[i] = mostRight;
                    if (mostRight - i * $group.spacing + 100 > $group.widestpx) $group.widestpx = mostRight - i * $group.spacing + 100
                };
                $("html, div#contentWrapper").css("min-width", $group.widestpx);
                $("div#contentWrapper").css("height", mostDown - 30)
            };
            $arrows.place(400);
            $(window).resize();
            $events.afterTilesShow()
        }, 701);
        $mainNav.setCurrent();
        $(document).keyup(function (e) {
            switch (e.keyCode) {
            case 37:
                $group.goLeft();
                e.preventDefault();
                break;
            case 39:
                $group.goRight();
                e.preventDefault();
                break
            }
        }).keydown(function (e) {
            switch (e.keyCode) {
            case 37:
            case 39:
                e.preventDefault();
                break
            }
        })
    },
    page: function () {
        $("html").css("overflow-x", "auto");
        $("#contentWrapper").addClass("pageContent").fadeIn(500);
        $content = $("#content").css('margin-left', 0).html("<img src='themes/" + theme + "/img/loader.gif' height='24' width='24'/>").fadeIn(700);
        var page, hashReq = $hashed.current.addSpaces();
        if ((page = realArrayIndex(pageLink, hashReq)) != -1) {
            url = pageLink[page]
        } else {
            page = hashReq;
            url = hashReq.toLowerCase() + ".php"
        };
        menuLink = new Array();
        menuColor = new Array();
        $.ajax("pages/" + url).success(function (newContent, textStatus) {
            $content.stop().fadeOut(50, function () {
                $content.html(newContent);
                if (window.location.hash.indexOf("&show_all") == -1) {
                    $("div.sliderContent").hide()
                } else {
                    $("div.sliderContent").show();
                    $("img.sliderImage").attr("src", "arrowRight.png").css("transform", "rotate(90deg)").css("-moz-transform", "rotate(90deg)").css("-webkit-transform", "rotate(90deg)").css("-o-transform", "rotate(90deg)").css("-ms-transform", "rotate(90deg)")
                };
                $content.show($page.showSpeed, function () {
                    $events.afterSubPageLoad()
                });
                $subNav.make();
                $("#subNav").stop().fadeIn($page.showSpeed);
                document.title = page + " | " + siteTitle;
                $(window).resize();
                $events.onSubPageLoad()
            })
        }).error(function () {
            page = "Page not Found";
            document.title = page + " | " + siteTitle;
            $content.html("<h2 style='margin-top:0px;'>We're sorry :(</h2>the page you're looking for is not found.").show(400);
            $subNav.make()
        });
        document.title = page + " | " + siteTitle;
        $(window).resize();
        $(document).unbind("keydown").unbind("keyup").unbind("mousedown")
    }
};
$(window).hashchange(function () {
    $hashed.current = window.location.hash.replace("!", "").replace("#", "").replace("/", "");
    var hashedParts = $hashed.current.split("&");
    $hashed.current = hashedParts[0];
    if (hashedParts.length > 1) {
        $hashed.part = hashedParts[1]
    } else $hashed.part = '';
    if ($hashed.current == '' && typeof hashedParts[1] != 'undefined' && $page.current != '' && $page.current == 'home') {
        requestedGroup = inArray($group.titles, hashedParts[1].addSpaces());
        if (requestedGroup != $group.current) {
            $group.goTo(requestedGroup)
        } else $show.homePagePrepare()
    } else if ($hashed.current == "home" || $hashed.current == "") {
        $show.homePagePrepare()
    } else $("#content").fadeOut($page.hideSpeed, function () {
        $show.page($page.current = $hashed.current)
    });
    $events.onHashChange()
});
$(document).ready(function () {
    $events.beforeSiteLoad();
    if (mobileDevice) $("body").append("<a href='mobile.php' id='goToMobile'>Mobile Version</a>");
    $page.content = "<img id='arrowLeft' src='arrowLeft.png'/><img id='arrowRight' src='arrowRight.png'/>";
    tiles();
    for (i = 0; i < $group.count; i++) {
        var name = $group.titles[i];
        $page.content += "<a class='titleGroup" + i + " groupTitle' style='margin-left:" + (i * $group.spacing) + "px;' href='#&" + name + "'><h3>" + name + "</h3></a>"
    };
    $(window).hashchange();
    $events.onSiteLoad()
})