(function (a, b) {
    function c(a) {
        if ("" === g) return a;
        a = a.charAt(0).toUpperCase() + a.substr(1);
        return g + a
    }
    var d = Math,
        e = b.createElement("div").style,
        g;
    a: {
        for (var h = ["t", "webkitT", "MozT", "msT", "OT"], l, i = 0, j = h.length; i < j; i++) if (l = h[i] + "ransform", l in e) {
            g = h[i].substr(0, h[i].length - 1);
            break a
        }
        g = !1
    }
    var k = g ? "-" + g.toLowerCase() + "-" : "",
        q = c("transform"),
        F = c("transitionProperty"),
        s = c("transitionDuration"),
        G = c("transformOrigin"),
        H = c("transitionTimingFunction"),
        x = c("transitionDelay"),
        y = /android/gi.test(navigator.appVersion),
        B = /iphone|ipad/gi.test(navigator.appVersion),
        h = /hp-tablet/gi.test(navigator.appVersion),
        C = c("perspective") in e,
        n = "ontouchstart" in a && !h,
        D = !1 !== g,
        I = c("transition") in e,
        z = "onorientationchange" in a ? "orientationchange" : "resize",
        A = n ? "touchstart" : "mousedown",
        u = n ? "touchmove" : "mousemove",
        v = n ? "touchend" : "mouseup",
        w = n ? "touchcancel" : "mouseup",
        t;t = !1 === g ? !1 : {
        "": "transitionend",
        webkit: "webkitTransitionEnd",
        Moz: "transitionend",
        O: "otransitionend",
        ms: "MSTransitionEnd"
    }[g];
    var J = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame ||
    function (a) {
        return setTimeout(a, 1)
    },
        E = a.cancelRequestAnimationFrame || a.webkitCancelAnimationFrame || a.webkitCancelRequestAnimationFrame || a.mozCancelRequestAnimationFrame || a.oCancelRequestAnimationFrame || a.msCancelRequestAnimationFrame || clearTimeout,
        r = C ? " translateZ(0)" : "",
        h = function (c, f) {
            var d = this,
                e;
            d.wrapper = "object" == typeof c ? c : b.getElementById(c);
            d.wrapper.style.overflow = "hidden";
            d.scroller = d.wrapper.children[0];
            d.options = {
                hScroll: !0,
                vScroll: !0,
                x: 0,
                y: 0,
                bounce: !0,
                bounceLock: !1,
                momentum: !0,
                lockDirection: !0,
                useTransform: !0,
                useTransition: !1,
                topOffset: 0,
                checkDOMChanges: !1,
                handleClick: !0,
                hScrollbar: !0,
                vScrollbar: !0,
                fixedScrollbar: y,
                hideScrollbar: B,
                fadeScrollbar: B && C,
                scrollbarClass: "",
                zoom: !1,
                zoomMin: 1,
                zoomMax: 4,
                doubleTapZoom: 2,
                wheelAction: "scroll",
                snap: !1,
                snapThreshold: 1,
                onRefresh: null,
                onBeforeScrollStart: function (a) {
                    a.preventDefault()
                },
                onScrollStart: null,
                onBeforeScrollMove: null,
                onScrollMove: null,
                onBeforeScrollEnd: null,
                onScrollEnd: null,
                onTouchEnd: null,
                onDestroy: null,
                onZoomStart: null,
                onZoom: null,
                onZoomEnd: null
            };
            for (e in f) d.options[e] = f[e];
            d.x = d.options.x;
            d.y = d.options.y;
            d.options.useTransform = D && d.options.useTransform;
            d.options.hScrollbar = d.options.hScroll && d.options.hScrollbar;
            d.options.vScrollbar = d.options.vScroll && d.options.vScrollbar;
            d.options.zoom = d.options.useTransform && d.options.zoom;
            d.options.useTransition = I && d.options.useTransition;
            d.options.zoom && y && (r = "");
            d.scroller.style[F] = d.options.useTransform ? k + "transform" : "top left";
            d.scroller.style[s] = "0";
            d.scroller.style[G] = "0 0";
            d.options.useTransition && (d.scroller.style[H] = "cubic-bezier(0.33,0.66,0.66,1)");
            d.options.useTransform ? d.scroller.style[q] = "translate(" + d.x + "px," + d.y + "px)" + r : d.scroller.style.cssText += ";position:absolute;top:" + d.y + "px;left:" + d.x + "px";
            d.options.useTransition && (d.options.fixedScrollbar = !0);
            d.refresh();
            d._bind(z, a);
            d._bind(A);
            !n && "none" != d.options.wheelAction && (d._bind("DOMMouseScroll"), d._bind("mousewheel"));
            d.options.checkDOMChanges && (d.checkDOMTime = setInterval(function () {
                d._checkDOMChanges()
            }, 500))
        };h.prototype = {
        enabled: !0,
        x: 0,
        y: 0,
        steps: [],
        scale: 1,
        currPageX: 0,
        currPageY: 0,
        pagesX: [],
        pagesY: [],
        aniTime: null,
        wheelZoomCount: 0,
        handleEvent: function (a) {
            switch (a.type) {
            case A:
                if (!n && 0 !== a.button) break;
                this._start(a);
                break;
            case u:
                this._move(a);
                break;
            case v:
            case w:
                this._end(a);
                break;
            case z:
                this._resize();
                break;
            case "DOMMouseScroll":
            case "mousewheel":
                this._wheel(a);
                break;
            case t:
                this._transitionEnd(a)
            }
        },
        _checkDOMChanges: function () {
            !this.moved && (!this.zoomed && !(this.animating || this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale)) && this.refresh()
        },
        _scrollbar: function (a) {
            var c;
            this[a + "Scrollbar"] ? (this[a + "ScrollbarWrapper"] || (c = b.createElement("div"), this.options.scrollbarClass ? c.className = this.options.scrollbarClass + a.toUpperCase() : c.style.cssText = "position:absolute;z-index:100;" + ("h" == a ? "height:7px;bottom:1px;left:2px;right:" + (this.vScrollbar ? "7" : "2") + "px" : "width:7px;bottom:" + (this.hScrollbar ? "7" : "2") + "px;top:2px;right:1px"), c.style.cssText += ";pointer-events:none;" + k + "transition-property:opacity;" + k + "transition-duration:" + (this.options.fadeScrollbar ? "350ms" : "0") + ";overflow:hidden;opacity:" + (this.options.hideScrollbar ? "0" : "1"), this.wrapper.appendChild(c), this[a + "ScrollbarWrapper"] = c, c = b.createElement("div"), this.options.scrollbarClass || (c.style.cssText = "position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);" + k + "background-clip:padding-box;" + k + "box-sizing:border-box;" + ("h" == a ? "height:100%" : "width:100%") + ";" + k + "border-radius:3px;border-radius:3px"), c.style.cssText += ";pointer-events:none;" + k + "transition-property:" + k + "transform;" + k + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);" + k + "transition-duration:0;" + k + "transform: translate(0,0)" + r, this.options.useTransition && (c.style.cssText += ";" + k + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)"), this[a + "ScrollbarWrapper"].appendChild(c), this[a + "ScrollbarIndicator"] = c), "h" == a ? (this.hScrollbarSize = this.hScrollbarWrapper.clientWidth, this.hScrollbarIndicatorSize = d.max(d.round(this.hScrollbarSize * this.hScrollbarSize / this.scrollerW), 8), this.hScrollbarIndicator.style.width = this.hScrollbarIndicatorSize + "px", this.hScrollbarMaxScroll = this.hScrollbarSize - this.hScrollbarIndicatorSize, this.hScrollbarProp = this.hScrollbarMaxScroll / this.maxScrollX) : (this.vScrollbarSize = this.vScrollbarWrapper.clientHeight, this.vScrollbarIndicatorSize = d.max(d.round(this.vScrollbarSize * this.vScrollbarSize / this.scrollerH), 8), this.vScrollbarIndicator.style.height =
            this.vScrollbarIndicatorSize + "px", this.vScrollbarMaxScroll = this.vScrollbarSize - this.vScrollbarIndicatorSize, this.vScrollbarProp = this.vScrollbarMaxScroll / this.maxScrollY), this._scrollbarPos(a, !0)) : this[a + "ScrollbarWrapper"] && (D && (this[a + "ScrollbarIndicator"].style[q] = ""), this[a + "ScrollbarWrapper"].parentNode.removeChild(this[a + "ScrollbarWrapper"]), this[a + "ScrollbarWrapper"] = null, this[a + "ScrollbarIndicator"] = null)
        },
        _resize: function () {
            var a = this;
            setTimeout(function () {
                a.refresh()
            }, y ? 200 : 0)
        },
        _pos: function (a, b) {
            this.zoomed || (a = this.hScroll ? a : 0, b = this.vScroll ? b : 0, this.options.useTransform ? this.scroller.style[q] = "translate(" + a + "px," + b + "px) scale(" + this.scale + ")" + r : (a = d.round(a), b = d.round(b), this.scroller.style.left = a + "px", this.scroller.style.top = b + "px"), this.x = a, this.y = b, this._scrollbarPos("h"), this._scrollbarPos("v"))
        },
        _scrollbarPos: function (a, b) {
            var c = "h" == a ? this.x : this.y;
            this[a + "Scrollbar"] && (c *= this[a + "ScrollbarProp"], 0 > c ? (this.options.fixedScrollbar || (c = this[a + "ScrollbarIndicatorSize"] + d.round(3 * c), 8 > c && (c = 8), this[a + "ScrollbarIndicator"].style["h" == a ? "width" : "height"] = c + "px"), c = 0) : c > this[a + "ScrollbarMaxScroll"] && (this.options.fixedScrollbar ? c = this[a + "ScrollbarMaxScroll"] : (c = this[a + "ScrollbarIndicatorSize"] - d.round(3 * (c - this[a + "ScrollbarMaxScroll"])), 8 > c && (c = 8), this[a + "ScrollbarIndicator"].style["h" == a ? "width" : "height"] = c + "px", c = this[a + "ScrollbarMaxScroll"] + (this[a + "ScrollbarIndicatorSize"] - c))), this[a + "ScrollbarWrapper"].style[x] = "0", this[a + "ScrollbarWrapper"].style.opacity = b && this.options.hideScrollbar ? "0" : "1", this[a + "ScrollbarIndicator"].style[q] = "translate(" + ("h" == a ? c + "px,0)" : "0," + c + "px)") + r)
        },
        _start: function (b) {
            var c = n ? b.touches[0] : b,
                e, m;
            if (this.enabled) {
                this.options.onBeforeScrollStart && this.options.onBeforeScrollStart.call(this, b);
                (this.options.useTransition || this.options.zoom) && this._transitionTime(0);
                this.zoomed = this.animating = this.moved = !1;
                this.dirY = this.dirX = this.absDistY = this.absDistX = this.distY = this.distX = 0;
                this.options.zoom && (n && 1 < b.touches.length) && (m = d.abs(b.touches[0].pageX - b.touches[1].pageX), e = d.abs(b.touches[0].pageY - b.touches[1].pageY), this.touchesDistStart = d.sqrt(m * m + e * e), this.originX = d.abs(b.touches[0].pageX + b.touches[1].pageX - 2 * this.wrapperOffsetLeft) / 2 - this.x, this.originY = d.abs(b.touches[0].pageY + b.touches[1].pageY - 2 * this.wrapperOffsetTop) / 2 - this.y, this.options.onZoomStart && this.options.onZoomStart.call(this, b));
                if (this.options.momentum && (this.options.useTransform ? (e = getComputedStyle(this.scroller, null)[q].replace(/[^0-9\-.,]/g, "").split(","), m = +e[4], e = +e[5]) : (m = +getComputedStyle(this.scroller, null).left.replace(/[^0-9-]/g, ""), e = +getComputedStyle(this.scroller, null).top.replace(/[^0-9-]/g, "")), m != this.x || e != this.y)) this.options.useTransition ? this._unbind(t) : E(this.aniTime), this.steps = [], this._pos(m, e), this.options.onScrollEnd && this.options.onScrollEnd.call(this);
                this.absStartX = this.x;
                this.absStartY = this.y;
                this.startX = this.x;
                this.startY = this.y;
                this.pointX = c.pageX;
                this.pointY = c.pageY;
                this.startTime = b.timeStamp || Date.now();
                this.options.onScrollStart && this.options.onScrollStart.call(this, b);
                this._bind(u, a);
                this._bind(v, a);
                this._bind(w, a)
            }
        },
        _move: function (a) {
            var b = n ? a.touches[0] : a,
                c = b.pageX - this.pointX,
                e = b.pageY - this.pointY,
                p = this.x + c,
                g = this.y + e,
                h = a.timeStamp || Date.now();
            this.options.onBeforeScrollMove && this.options.onBeforeScrollMove.call(this, a);
            if (this.options.zoom && n && 1 < a.touches.length) p = d.abs(a.touches[0].pageX - a.touches[1].pageX), g = d.abs(a.touches[0].pageY - a.touches[1].pageY), this.touchesDist = d.sqrt(p * p + g * g), this.zoomed = !0, b = 1 / this.touchesDistStart * this.touchesDist * this.scale, b < this.options.zoomMin ? b = 0.5 * this.options.zoomMin * Math.pow(2, b / this.options.zoomMin) : b > this.options.zoomMax && (b = 2 * this.options.zoomMax * Math.pow(0.5, this.options.zoomMax / b)), this.lastScale = b / this.scale, p = this.originX - this.originX * this.lastScale + this.x, g = this.originY - this.originY * this.lastScale + this.y, this.scroller.style[q] = "translate(" + p + "px," + g + "px) scale(" + b + ")" + r, this.options.onZoom && this.options.onZoom.call(this, a);
            else {
                this.pointX = b.pageX;
                this.pointY = b.pageY;
                if (0 < p || p < this.maxScrollX) p = this.options.bounce ? this.x + c / 2 : 0 <= p || 0 <= this.maxScrollX ? 0 : this.maxScrollX;
                if (g > this.minScrollY || g < this.maxScrollY) g = this.options.bounce ? this.y + e / 2 : g >= this.minScrollY || 0 <= this.maxScrollY ? this.minScrollY : this.maxScrollY;
                this.distX += c;
                this.distY += e;
                this.absDistX = d.abs(this.distX);
                this.absDistY = d.abs(this.distY);
                6 > this.absDistX && 6 > this.absDistY || (this.options.lockDirection && (this.absDistX > this.absDistY + 5 ? (g = this.y, e = 0) : this.absDistY > this.absDistX + 5 && (p = this.x, c = 0)), this.moved = !0, this._pos(p, g), this.dirX = 0 < c ? -1 : 0 > c ? 1 : 0, this.dirY =
                0 < e ? -1 : 0 > e ? 1 : 0, 300 < h - this.startTime && (this.startTime = h, this.startX = this.x, this.startY = this.y), this.options.onScrollMove && this.options.onScrollMove.call(this, a))
            }
        },
        _end: function (c) {
            if (!(n && 0 !== c.touches.length)) {
                var f = this,
                    e = n ? c.changedTouches[0] : c,
                    m, g, h = {
                        dist: 0,
                        time: 0
                    },
                    i = {
                        dist: 0,
                        time: 0
                    },
                    l = (c.timeStamp || Date.now()) - f.startTime,
                    j = f.x,
                    k = f.y;
                f._unbind(u, a);
                f._unbind(v, a);
                f._unbind(w, a);
                f.options.onBeforeScrollEnd && f.options.onBeforeScrollEnd.call(f, c);
                if (f.zoomed) j = f.scale * f.lastScale, j = Math.max(f.options.zoomMin, j), j = Math.min(f.options.zoomMax, j), f.lastScale = j / f.scale, f.scale = j, f.x = f.originX - f.originX * f.lastScale + f.x, f.y = f.originY - f.originY * f.lastScale + f.y, f.scroller.style[s] = "200ms", f.scroller.style[q] = "translate(" + f.x + "px," + f.y + "px) scale(" + f.scale + ")" + r, f.zoomed = !1, f.refresh(), f.options.onZoomEnd && f.options.onZoomEnd.call(f, c);
                else {
                    if (f.moved) {
                        if (300 > l && f.options.momentum) {
                            h = j ? f._momentum(j - f.startX, l, -f.x, f.scrollerW - f.wrapperW + f.x, f.options.bounce ? f.wrapperW : 0) : h;
                            i = k ? f._momentum(k - f.startY, l, -f.y, 0 > f.maxScrollY ? f.scrollerH - f.wrapperH + f.y - f.minScrollY : 0, f.options.bounce ? f.wrapperH : 0) : i;
                            j = f.x + h.dist;
                            k = f.y + i.dist;
                            if (0 < f.x && 0 < j || f.x < f.maxScrollX && j < f.maxScrollX) h = {
                                dist: 0,
                                time: 0
                            };
                            if (f.y > f.minScrollY && k > f.minScrollY || f.y < f.maxScrollY && k < f.maxScrollY) i = {
                                dist: 0,
                                time: 0
                            }
                        }
                        h.dist || i.dist ? (h = d.max(d.max(h.time, i.time), 10), f.options.snap && (i = j - f.absStartX, l = k - f.absStartY, d.abs(i) < f.options.snapThreshold && d.abs(l) < f.options.snapThreshold ? f.scrollTo(f.absStartX, f.absStartY, 200) : (i = f._snap(j, k), j = i.x, k = i.y, h = d.max(i.time, h))), f.scrollTo(d.round(j), d.round(k), h)) : f.options.snap ? (i = j - f.absStartX, l = k - f.absStartY, d.abs(i) < f.options.snapThreshold && d.abs(l) < f.options.snapThreshold ? f.scrollTo(f.absStartX, f.absStartY, 200) : (i = f._snap(f.x, f.y), (i.x != f.x || i.y != f.y) && f.scrollTo(i.x, i.y, i.time))) : f._resetPos(200)
                    } else n && (f.doubleTapTimer && f.options.zoom ? (clearTimeout(f.doubleTapTimer), f.doubleTapTimer = null, f.options.onZoomStart && f.options.onZoomStart.call(f, c), f.zoom(f.pointX, f.pointY, 1 == f.scale ? f.options.doubleTapZoom : 1), f.options.onZoomEnd && setTimeout(function () {
                        f.options.onZoomEnd.call(f, c)
                    }, 200)) : this.options.handleClick && (f.doubleTapTimer = setTimeout(function () {
                        f.doubleTapTimer = null;
                        for (m = e.target; 1 != m.nodeType;) m = m.parentNode;
                        "SELECT" != m.tagName && ("INPUT" != m.tagName && "TEXTAREA" != m.tagName) && (g = b.createEvent("MouseEvents"), g.initMouseEvent("click", !0, !0, c.view, 1, e.screenX, e.screenY, e.clientX, e.clientY, c.ctrlKey, c.altKey, c.shiftKey, c.metaKey, 0, null), g._fake = !0, m.dispatchEvent(g))
                    }, f.options.zoom ? 250 : 0))), f._resetPos(400);
                    f.options.onTouchEnd && f.options.onTouchEnd.call(f, c)
                }
            }
        },
        _resetPos: function (a) {
            var b = 0 <= this.x ? 0 : this.x < this.maxScrollX ? this.maxScrollX : this.x,
                c = this.y >= this.minScrollY || 0 < this.maxScrollY ? this.minScrollY : this.y < this.maxScrollY ? this.maxScrollY : this.y;
            b == this.x && c == this.y ? (this.moved && (this.moved = !1, this.options.onScrollEnd && this.options.onScrollEnd.call(this)), this.hScrollbar && this.options.hideScrollbar && ("webkit" == g && (this.hScrollbarWrapper.style[x] = "300ms"), this.hScrollbarWrapper.style.opacity = "0"), this.vScrollbar && this.options.hideScrollbar && ("webkit" == g && (this.vScrollbarWrapper.style[x] = "300ms"), this.vScrollbarWrapper.style.opacity = "0")) : this.scrollTo(b, c, a || 0)
        },
        _wheel: function (a) {
            var b = this,
                c, d;
            if ("wheelDeltaX" in a) c = a.wheelDeltaX / 12, d = a.wheelDeltaY / 12;
            else if ("wheelDelta" in a) c = d = a.wheelDelta / 12;
            else if ("detail" in a) c = d = 3 * -a.detail;
            else return;
            "zoom" == b.options.wheelAction ? (d = b.scale * Math.pow(2, 1 / 3 * (d ? d / Math.abs(d) : 0)), d < b.options.zoomMin && (d = b.options.zoomMin), d > b.options.zoomMax && (d = b.options.zoomMax), d != b.scale && (!b.wheelZoomCount && b.options.onZoomStart && b.options.onZoomStart.call(b, a), b.wheelZoomCount++, b.zoom(a.pageX, a.pageY, d, 400), setTimeout(function () {
                b.wheelZoomCount--;
                !b.wheelZoomCount && b.options.onZoomEnd && b.options.onZoomEnd.call(b, a)
            }, 400))) : (c = b.x + c, d = b.y + d, 0 < c ? c = 0 : c < b.maxScrollX && (c = b.maxScrollX), d > b.minScrollY ? d = b.minScrollY : d < b.maxScrollY && (d = b.maxScrollY), 0 > b.maxScrollY && b.scrollTo(c, d, 0))
        },
        _transitionEnd: function (a) {
            a.target == this.scroller && (this._unbind(t), this._startAni())
        },
        _startAni: function () {
            var a =
            this,
                b = a.x,
                c = a.y,
                e = Date.now(),
                g, h, i;
            a.animating || (a.steps.length ? (g = a.steps.shift(), g.x == b && g.y == c && (g.time = 0), a.animating = !0, a.moved = !0, a.options.useTransition ? (a._transitionTime(g.time), a._pos(g.x, g.y), a.animating = !1, g.time ? a._bind(t) : a._resetPos(0)) : (i = function () {
                var j = Date.now(),
                    l;
                j >= e + g.time ? (a._pos(g.x, g.y), a.animating = !1, a.options.onAnimationEnd && a.options.onAnimationEnd.call(a), a._startAni()) : (j = (j - e) / g.time - 1, h = d.sqrt(1 - j * j), j = (g.x - b) * h + b, l = (g.y - c) * h + c, a._pos(j, l), a.animating && (a.aniTime =
                J(i)))
            }, i())) : a._resetPos(400))
        },
        _transitionTime: function (a) {
            a += "ms";
            this.scroller.style[s] = a;
            this.hScrollbar && (this.hScrollbarIndicator.style[s] = a);
            this.vScrollbar && (this.vScrollbarIndicator.style[s] = a)
        },
        _momentum: function (a, b, c, e, g) {
            var b = d.abs(a) / b,
                h = b * b / 0.0012;
            0 < a && h > c ? (c += g / (6 / (6E-4 * (h / b))), b = b * c / h, h = c) : 0 > a && h > e && (e += g / (6 / (6E-4 * (h / b))), b = b * e / h, h = e);
            return {
                dist: h * (0 > a ? -1 : 1),
                time: d.round(b / 6E-4)
            }
        },
        _offset: function (a) {
            for (var b = -a.offsetLeft, c = -a.offsetTop; a = a.offsetParent;) b -= a.offsetLeft, c -= a.offsetTop;
            a != this.wrapper && (b *= this.scale, c *= this.scale);
            return {
                left: b,
                top: c
            }
        },
        _snap: function (a, b) {
            var c, e, g;
            g = this.pagesX.length - 1;
            c = 0;
            for (e = this.pagesX.length; c < e; c++) if (a >= this.pagesX[c]) {
                g = c;
                break
            }
            g == this.currPageX && (0 < g && 0 > this.dirX) && g--;
            a = this.pagesX[g];
            e = (e = d.abs(a - this.pagesX[this.currPageX])) ? 500 * (d.abs(this.x - a) / e) : 0;
            this.currPageX = g;
            g = this.pagesY.length - 1;
            for (c = 0; c < g; c++) if (b >= this.pagesY[c]) {
                g = c;
                break
            }
            g == this.currPageY && (0 < g && 0 > this.dirY) && g--;
            b = this.pagesY[g];
            c = (c = d.abs(b - this.pagesY[this.currPageY])) ? 500 * (d.abs(this.y - b) / c) : 0;
            this.currPageY = g;
            g = d.round(d.max(e, c)) || 200;
            return {
                x: a,
                y: b,
                time: g
            }
        },
        _bind: function (a, b, c) {
            (b || this.scroller).addEventListener(a, this, !! c)
        },
        _unbind: function (a, b, c) {
            (b || this.scroller).removeEventListener(a, this, !! c)
        },
        destroy: function () {
            this.scroller.style[q] = "";
            this.vScrollbar = this.hScrollbar = !1;
            this._scrollbar("h");
            this._scrollbar("v");
            this._unbind(z, a);
            this._unbind(A);
            this._unbind(u, a);
            this._unbind(v, a);
            this._unbind(w, a);
            this.options.hasTouch || (this._unbind("DOMMouseScroll"), this._unbind("mousewheel"));
            this.options.useTransition && this._unbind(t);
            this.options.checkDOMChanges && clearInterval(this.checkDOMTime);
            this.options.onDestroy && this.options.onDestroy.call(this)
        },
        refresh: function () {
            var a, b, c, e = 0;
            b = 0;
            this.scale < this.options.zoomMin && (this.scale = this.options.zoomMin);
            this.wrapperW = this.wrapper.clientWidth || 1;
            this.wrapperH = this.wrapper.clientHeight || 1;
            this.minScrollY = -this.options.topOffset || 0;
            this.scrollerW = d.round(this.scroller.offsetWidth * this.scale);
            this.scrollerH =
            d.round((this.scroller.offsetHeight + this.minScrollY) * this.scale);
            this.maxScrollX = this.wrapperW - this.scrollerW;
            this.maxScrollY = this.wrapperH - this.scrollerH + this.minScrollY;
            this.dirY = this.dirX = 0;
            this.options.onRefresh && this.options.onRefresh.call(this);
            this.hScroll = this.options.hScroll && 0 > this.maxScrollX;
            this.vScroll = this.options.vScroll && (!this.options.bounceLock && !this.hScroll || this.scrollerH > this.wrapperH);
            this.hScrollbar = this.hScroll && this.options.hScrollbar;
            this.vScrollbar = this.vScroll && this.options.vScrollbar && this.scrollerH > this.wrapperH;
            a = this._offset(this.wrapper);
            this.wrapperOffsetLeft = -a.left;
            this.wrapperOffsetTop = -a.top;
            if ("string" == typeof this.options.snap) {
                this.pagesX = [];
                this.pagesY = [];
                c = this.scroller.querySelectorAll(this.options.snap);
                a = 0;
                for (b = c.length; a < b; a++) e = this._offset(c[a]), e.left += this.wrapperOffsetLeft, e.top += this.wrapperOffsetTop, this.pagesX[a] = e.left < this.maxScrollX ? this.maxScrollX : e.left * this.scale, this.pagesY[a] = e.top < this.maxScrollY ? this.maxScrollY : e.top * this.scale
            } else if (this.options.snap) {
                for (this.pagesX = []; e >= this.maxScrollX;) this.pagesX[b] = e, e -= this.wrapperW, b++;
                this.maxScrollX % this.wrapperW && (this.pagesX[this.pagesX.length] = this.maxScrollX - this.pagesX[this.pagesX.length - 1] + this.pagesX[this.pagesX.length - 1]);
                b = e = 0;
                for (this.pagesY = []; e >= this.maxScrollY;) this.pagesY[b] = e, e -= this.wrapperH, b++;
                this.maxScrollY % this.wrapperH && (this.pagesY[this.pagesY.length] = this.maxScrollY - this.pagesY[this.pagesY.length - 1] + this.pagesY[this.pagesY.length - 1])
            }
            this._scrollbar("h");
            this._scrollbar("v");
            this.zoomed || (this.scroller.style[s] = "0", this._resetPos(400))
        },
        scrollTo: function (a, b, c, d) {
            var e = a;
            this.stop();
            e.length || (e = [{
                x: a,
                y: b,
                time: c,
                relative: d
            }]);
            a = 0;
            for (b = e.length; a < b; a++) e[a].relative && (e[a].x = this.x - e[a].x, e[a].y = this.y - e[a].y), this.steps.push({
                x: e[a].x,
                y: e[a].y,
                time: e[a].time || 0
            });
            this._startAni()
        },
        scrollToElement: function (a, b) {
            var c;
            if (a = a.nodeType ? a : this.scroller.querySelector(a)) c = this._offset(a), c.left += this.wrapperOffsetLeft, c.top += this.wrapperOffsetTop, c.left = 0 < c.left ? 0 : c.left < this.maxScrollX ? this.maxScrollX : c.left, c.top = c.top > this.minScrollY ? this.minScrollY : c.top < this.maxScrollY ? this.maxScrollY : c.top, b = void 0 === b ? d.max(2 * d.abs(c.left), 2 * d.abs(c.top)) : b, this.scrollTo(c.left, c.top, b)
        },
        scrollToPage: function (a, b, c) {
            c = void 0 === c ? 400 : c;
            this.options.onScrollStart && this.options.onScrollStart.call(this);
            this.options.snap ? (a = "next" == a ? this.currPageX + 1 : "prev" == a ? this.currPageX - 1 : a, b = "next" == b ? this.currPageY + 1 : "prev" == b ? this.currPageY - 1 : b, a = 0 > a ? 0 : a > this.pagesX.length - 1 ? this.pagesX.length - 1 : a, b = 0 > b ? 0 : b > this.pagesY.length - 1 ? this.pagesY.length - 1 : b, this.currPageX = a, this.currPageY = b, a = this.pagesX[a], b = this.pagesY[b]) : (a *= -this.wrapperW, b *= -this.wrapperH, a < this.maxScrollX && (a = this.maxScrollX), b < this.maxScrollY && (b = this.maxScrollY));
            this.scrollTo(a, b, c)
        },
        disable: function () {
            this.stop();
            this._resetPos(0);
            this.enabled = !1;
            this._unbind(u, a);
            this._unbind(v, a);
            this._unbind(w, a)
        },
        enable: function () {
            this.enabled = !0
        },
        stop: function () {
            this.options.useTransition ? this._unbind(t) : E(this.aniTime);
            this.steps = [];
            this.animating = this.moved = !1
        },
        zoom: function (a, b, c, d) {
            var e = c / this.scale;
            this.options.useTransform && (this.zoomed = !0, d = void 0 === d ? 200 : d, a = a - this.wrapperOffsetLeft - this.x, b = b - this.wrapperOffsetTop - this.y, this.x = a - a * e + this.x, this.y = b - b * e + this.y, this.scale = c, this.refresh(), this.x = 0 < this.x ? 0 : this.x < this.maxScrollX ? this.maxScrollX : this.x, this.y = this.y > this.minScrollY ? this.minScrollY : this.y < this.maxScrollY ? this.maxScrollY : this.y, this.scroller.style[s] = d + "ms", this.scroller.style[q] = "translate(" + this.x + "px," + this.y + "px) scale(" + c + ")" + r, this.zoomed = !1)
        },
        isReady: function () {
            return !this.moved && !this.zoomed && !this.animating
        }
    };e = null;
    "undefined" !== typeof exports ? exports.iScroll = h : a.iScroll = h
})(window, document);
var minplayer = minplayer || {};

function checkPlayType(a, b) {
    if ("function" === typeof a.canPlayType) {
        if ("object" === typeof b) {
            for (var c = b.length, d = ""; c-- && !(d = checkPlayType(a, b[c])););
            return d
        }
        c = a.canPlayType(b);
        if ("no" !== c && "" !== c) return b
    }
    return ""
}
minplayer.compatibility = function () {
    var a = null,
        a = document.createElement("video");
    this.videoOGG = checkPlayType(a, "video/ogg");
    this.videoH264 = checkPlayType(a, ["video/mp4", "video/h264"]);
    this.videoWEBM = checkPlayType(a, ["video/x-webm", "video/webm", "application/octet-stream"]);
    a = document.createElement("audio");
    this.audioOGG = checkPlayType(a, "audio/ogg");
    this.audioMP3 = checkPlayType(a, "audio/mpeg");
    this.audioMP4 = checkPlayType(a, "audio/mp4")
};
minplayer.playTypes || (minplayer.playTypes = new minplayer.compatibility, minplayer.isAndroid = /android/gi.test(navigator.appVersion), minplayer.isIDevice = /iphone|ipad/gi.test(navigator.appVersion), minplayer.isPlaybook = /playbook/gi.test(navigator.appVersion), minplayer.isTouchPad = /hp-tablet/gi.test(navigator.appVersion), minplayer.hasTouch = "ontouchstart" in window && !minplayer.isTouchPad);
if (!minplayer.urlVars) {
    minplayer.urlVars = {};
    var regEx = /[?&]+([^=&]+)=([^&]*)/gi;
    window.location.href.replace(regEx, function (a, b, c) {
        minplayer.urlVars[b] = c
    })
}
minplayer = minplayer || {};
minplayer.async = function () {
    this.value = null;
    this.queue = []
};
minplayer.async.prototype.get = function (a) {
    null !== this.value ? a(this.value) : this.queue.push(a)
};
minplayer.async.prototype.set = function (a) {
    this.value = a;
    var b = this.queue.length;
    if (b) {
        for (; b--;) this.queue[b](a);
        this.queue = []
    }
};
minplayer = minplayer || {};
minplayer.flags = function () {
    this.flag = 0;
    this.ids = {};
    this.numFlags = 0
};
minplayer.flags.prototype.setFlag = function (a, b) {
    this.ids.hasOwnProperty(a) || (this.ids[a] = this.numFlags, this.numFlags++);
    this.flag = b ? this.flag | 1 << this.ids[a] : this.flag & ~ (1 << this.ids[a])
};
minplayer = minplayer || {};
minplayer.plugins = minplayer.plugins || {};
minplayer.queue = minplayer.queue || [];
minplayer.lock = !1;
minplayer.plugin = function (a, b, c, d) {
    this.name = a;
    this.pluginReady = !1;
    this.options = c || {};
    this.queue = d || {};
    this.triggered = {};
    this.lock = !1;
    this.uuid = 0;
    b && (this.active = !0, this.context = jQuery(b), this.construct())
};
minplayer.plugin.prototype.construct = function () {
    this.addPlugin()
};
minplayer.plugin.prototype.destroy = function () {
    this.active = !1;
    this.unbind()
};
minplayer.plugin.prototype.create = function (a, b, c) {
    var d = null,
        b = b || "minplayer";
    window[b][a] || (b = "minplayer");
    c = c || this.display;
    return window[b][a] && (d = window[b][a], d[this.options.template] && (d = d[this.options.template]), "function" !== typeof d && (d = window.minplayer[a]), "function" === typeof d) ? new d(c, this.options) : null
};
minplayer.plugin.prototype.ready = function () {
    this.pluginReady || (this.pluginReady = !0, this.trigger("ready"), this.checkQueue())
};
minplayer.plugin.prototype.isValid = function () {
    return !!this.options.id && this.active
};
minplayer.plugin.prototype.addPlugin = function (a, b) {
    a = a || this.name;
    b = b || this;
    if (b.isValid()) {
        minplayer.plugins[this.options.id] || (minplayer.plugins[this.options.id] = {});
        minplayer.plugins[this.options.id][a] || (minplayer.plugins[this.options.id][a] = []);
        var c = minplayer.plugins[this.options.id][a].push(b);
        this.uuid = this.options.id + "__" + a + "__" + c;
        this.checkQueue(b)
    }
};
minplayer.timers = {};
minplayer.plugin.prototype.poll = function (a, b, c) {
    minplayer.timers.hasOwnProperty(a) && clearTimeout(minplayer.timers[a]);
    var d = this;
    minplayer.timers[a] = setTimeout(function g() {
        b.call(d) && (minplayer.timers[a] = setTimeout(g, c))
    }, c);
    return minplayer.timers[a]
};
minplayer.plugin.prototype.get = function (a, b) {
    "function" === typeof a && (b = a, a = null);
    return minplayer.get.call(this, this.options.id, a, b)
};
minplayer.plugin.prototype.checkQueue = function (a) {
    var b = null,
        c = 0,
        d = !1,
        e = [],
        a = a || this;
    minplayer.lock = !0;
    for (var g = minplayer.queue.length, c = 0; c < g; c++) minplayer.queue.hasOwnProperty(c) && (b = minplayer.queue[c], d = !b.id && !b.plugin, d |= b.plugin == a.name, (d &= !b.id || b.id == this.options.id) && (d = minplayer.bind.call(b.context, b.event, this.options.id, a.name, b.callback, !0)), d || e.push(b));
    minplayer.queue = e;
    minplayer.lock = !1
};
minplayer.eventTypes = {};
minplayer.plugin.prototype.isEvent = function (a, b) {
    var c = a + "__" + b;
    "undefined" === typeof minplayer.eventTypes[c] && (minplayer.eventTypes[c] = null !== a.match(b));
    return minplayer.eventTypes[c]
};
minplayer.plugin.prototype.trigger = function (a, b) {
    if (!this.active) return this;
    this.triggered[a] = b;
    var c = 0,
        d = {},
        e = null,
        g;
    for (g in this.queue) if (this.isEvent(g, a)) for (c in e = this.queue[g], e) e.hasOwnProperty(c) && (d = e[c], d.callback({
        target: this,
        data: d.data
    }, b));
    return this
};
minplayer.plugin.prototype.ubind = function (a, b, c) {
    this.unbind(a);
    return this.bind(a, b, c)
};
minplayer.plugin.prototype.bind = function (a, b, c) {
    if (!this.active) return this;
    "function" === typeof b && (c = b, b = null);
    if (a && c) {
        this.queue[a] = this.queue[a] || [];
        this.queue[a].push({
            callback: c,
            data: b
        });
        for (var d in this.triggered) this.triggered.hasOwnProperty(d) && this.isEvent(a, d) && c({
            target: this,
            data: b
        }, this.triggered[d]);
        return this
    }
};
minplayer.plugin.prototype.unbind = function (a) {
    if (this.lock) {
        var b = this;
        setTimeout(function () {
            b.unbind(a)
        }, 10)
    }
    this.lock = !0;
    a ? this.queue.hasOwnProperty(a) && 0 < this.queue[a].length && (this.queue[a].length = 0) : this.queue = {};
    this.lock = !1;
    return this
};
minplayer.addQueue = function (a, b, c, d, e) {
    minplayer.lock ? setTimeout(function () {
        minplayer.addQueue(a, c, b, d, e)
    }, 10) : minplayer.queue.push({
        context: a,
        id: c,
        event: b,
        plugin: d,
        callback: e
    })
};
minplayer.bind = function (a, b, c, d, e) {
    if (!d) return !1;
    var g = minplayer.plugins,
        h = [],
        l = function (a, b) {
            if (g.hasOwnProperty(a) && g[a].hasOwnProperty(b)) for (var c = g[a][b].length; c--;) h.push(g[a][b][c])
        };
    if (b && c) l(b, c);
    else if (!b && c) for (b in g) l(b, c);
    else if (b && !c && g[b]) for (c in g[b]) l(b, c);
    else if (!b && !c) for (b in g) for (c in g[b]) l(b, c);
    for (l = h.length; l--;) h[l].bind(a, function (a) {
        return function (b) {
            d.call(a, b.target)
        }
    }(this));
    0 == h.length && !e && minplayer.addQueue(this, a, b, c, d);
    return 0 < h.length
};
minplayer.get = function (a, b, c) {
    var d = typeof b,
        e = typeof c;
    "function" === typeof a ? (c = a, b = a = null) : "function" === d ? (c = b, b = a, a = null) : "undefined" === d && "undefined" === e && (b = a, c = a = null);
    if (c = "function" === typeof c ? c : null) minplayer.bind.call(this, "ready", a, b, c);
    else {
        d = minplayer.plugins;
        if (!a && !b && !c) return d;
        if (a && !b && !c) return d[a];
        if (a && b && !c) return d[a][b];
        if (!a && b && !c) {
            c = [];
            for (a in d) if (d.hasOwnProperty(a) && d[a].hasOwnProperty(b)) for (e = d[a][b].length; e--;) c.push(d[a][b][e]);
            return c
        }
    }
};
minplayer = minplayer || {};
minplayer.display = function (a, b, c, d) {
    minplayer.plugin.call(this, a, b, c, d)
};
minplayer.display.prototype = new minplayer.plugin;
minplayer.display.prototype.constructor = minplayer.display;
minplayer.display.prototype.getDisplay = function () {
    return this.context
};
minplayer.display.prototype.construct = function () {
    this.display = this.getDisplay(this.context, this.options);
    minplayer.plugin.prototype.construct.call(this);
    this.options.pluginName = "display";
    this.elements = this.getElements();
    this.autoHide = !1;
    if (this.onResize) {
        var a = 0;
        jQuery(window).resize(function (b) {
            return function () {
                clearTimeout(a);
                a = setTimeout(function () {
                    b.onResize()
                }, 200)
            }
        }(this))
    }
};
minplayer.display.prototype.onResize = !1;
minplayer.display.prototype.hide = function (a) {
    if (a = a || this.display) a.forceHide = !0, a.unbind().hide()
};
minplayer.display.prototype.fullScreenElement = function () {
    return this.display
};
minplayer.click = function (a, b) {
    var c = !1,
        a = jQuery(a);
    a.bind("touchstart click", function (a) {
        c || (c = !0, setTimeout(function () {
            c = !1
        }, 100), b.call(this, a))
    });
    return a
};
minplayer.display.prototype.onFocus = function (a) {
    this.hasFocus = this.focus = a;
    this.autoHide && this.showThenHide(this.autoHide.element, this.autoHide.timeout, this.autoHide.cb)
};
minplayer.display.prototype.showThenHide = function (a, b, c) {
    var d = typeof a;
    "undefined" === d ? (c = null, a = this.display) : "number" === d ? (c = b, b = a, a = this.display) : "function" === d && (c = a, a = this.display);
    b = b || 5E3;
    this.autoHide = {
        element: a,
        timeout: b,
        cb: c
    };
    a.forceHide || ("undefined" !== typeof a.showMe ? a.showMe && a.showMe(c) : (a.show(), c && c(!0)));
    a.hoverState || (jQuery(a).bind("mouseenter", function () {
        a.hoverState = !0
    }), jQuery(a).bind("mouseleave", function () {
        a.hoverState = !1
    }));
    clearTimeout(this.showTimer);
    var e = this;
    this.showTimer =
    setTimeout(function h() {
        a.hoverState ? e.showTimer = setTimeout(h, b) : "undefined" !== typeof a.hideMe ? a.hideMe && a.hideMe(c) : a.hide("slow", function () {
            c && c(!1)
        })
    }, b)
};
minplayer.display.prototype.fullscreen = function (a) {
    var b = this.isFullScreen(),
        c = this.fullScreenElement();
    if (b && !a) c.removeClass("fullscreen"), screenfull && screenfull.exit(), this.trigger("fullscreen", !1);
    else if (!b && a) {
        c.addClass("fullscreen");
        if (screenfull) {
            screenfull.request(c[0]);
            var d = this;
            screenfull.onchange = function () {
                screenfull.isFullscreen || d.fullscreen(!1)
            }
        }
        this.trigger("fullscreen", !0)
    }
};
minplayer.display.prototype.toggleFullScreen = function () {
    this.fullscreen(!this.isFullScreen())
};
minplayer.display.prototype.isFullScreen = function () {
    return this.fullScreenElement().hasClass("fullscreen")
};
minplayer.display.prototype.getScaledRect = function (a, b) {
    var c = {};
    c.x = b.x ? b.x : 0;
    c.y = b.y ? b.y : 0;
    c.width = b.width ? b.width : 0;
    c.height = b.height ? b.height : 0;
    a && (b.width / b.height > a ? (c.height = b.height, c.width = Math.floor(b.height * a)) : (c.height = Math.floor(b.width / a), c.width = b.width), c.x = Math.floor((b.width - c.width) / 2), c.y = Math.floor((b.height - c.height) / 2));
    return c
};
minplayer.display.prototype.getElements = function () {
    return {}
};
(function (a, b) {
    var c;
    a: {
        for (var d = [
            ["requestFullscreen", "exitFullscreen", "fullscreenchange", "fullscreen", "fullscreenElement"],
            ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitIsFullScreen", "webkitCurrentFullScreenElement"],
            ["mozRequestFullScreen", "mozCancelFullScreen", "mozfullscreenchange", "mozFullScreen", "mozFullScreenElement"]
        ], e = 0, g = d.length; e < g; e++) if (d.hasOwnProperty(e)) {
            var h = d[e];
            if (h[1] in b) {
                c = h;
                break a
            }
        }
        c = void 0
    }
    if (!c) return a.screenfull = !1;
    var l = "ALLOW_KEYBOARD_INPUT" in Element,
        i = {
            init: function () {
                b.addEventListener(c[2], function (a) {
                    i.isFullscreen = b[c[3]];
                    i.element = b[c[4]];
                    i.onchange(a)
                });
                return this
            },
            isFullscreen: b[c[3]],
            element: b[c[4]],
            request: function (a) {
                a = a || b.documentElement;
                a[c[0]](l && Element.ALLOW_KEYBOARD_INPUT);
                if (!b.isFullscreen) a[c[0]]()
            },
            exit: function () {
                b[c[1]]()
            },
            toggle: function (a) {
                this.isFullscreen ? this.exit() : this.request(a)
            },
            onchange: function () {}
        };a.screenfull = i.init()
})(window, document);
jQuery.fn.minplayer || (jQuery.fn.minplayer = function (a) {
    return jQuery(this).each(function () {
        a = a || {};
        a.id = a.id || jQuery(this).attr("id") || Math.random();
        minplayer.plugins[a.id] || (a.template = a.template || "default", minplayer[a.template] ? new minplayer[a.template](jQuery(this), a) : new minplayer(jQuery(this), a))
    })
});
minplayer = jQuery.extend(function (a, b) {
    minplayer.display.call(this, "player", a, b)
}, minplayer);
minplayer.prototype = new minplayer.display;
minplayer.prototype.constructor = minplayer;
minplayer.prototype.construct = function () {
    jQuery.each(this.context[0].attributes, function (a) {
        return function (b, e) {
            a.options[e.name] = a.options[e.name] || e.value
        }
    }(this));
    this.options = jQuery.extend({
        id: "player",
        build: !1,
        wmode: "transparent",
        preload: !0,
        autoplay: !1,
        autoload: !0,
        loop: !1,
        width: "100%",
        height: "350px",
        debug: !1,
        volume: 80,
        files: null,
        file: "",
        preview: "",
        attributes: {},
        plugins: {},
        logo: "",
        link: ""
    }, this.options);
    minplayer.display.prototype.construct.call(this);
    var a = null,
        b;
    for (b in this.options.plugins) a =
    this.options.plugins[b], minplayer[a] && (a = minplayer[a], a[this.options.template] && a[this.options.template].init ? a[this.options.template].init(this) : a.init && a.init(this));
    this.options.pluginName = "player";
    this.controller = this.create("controller");
    this.playLoader = this.create("playLoader");
    this.options.logo && this.elements.logo && (a = "", this.options.link && (a += '<a target="_blank" href="' + this.options.link + '">'), this.options.link && (a += "</a>"), this.logo = this.elements.logo.append(a));
    this.currentPlayer = "html5";
    this.addKeyEvents();
    this.addEvents();
    this.load(this.getFiles());
    this.ready()
};
minplayer.prototype.setFocus = function (a) {
    minplayer.get.call(this, this.options.id, null, function (b) {
        b.onFocus(a)
    });
    this.trigger("playerFocus", a)
};
minplayer.prototype.bindTo = function (a) {
    a.ubind(this.uuid + ":error", function (a) {
        return function (c, d) {
            "html5" == a.currentPlayer ? (minplayer.player = "minplayer", a.options.file.player = "minplayer", a.loadPlayer()) : a.showError(d)
        }
    }(this));
    a.ubind(this.uuid + ":fullscreen", function (a) {
        return function () {
            a.resize()
        }
    }(this))
};
minplayer.prototype.addEvents = function () {
    var a = !1;
    this.display.bind("mouseenter", function (b) {
        return function () {
            a = !0;
            b.setFocus(!0)
        }
    }(this));
    this.display.bind("mouseleave", function (b) {
        return function () {
            a = !1;
            b.setFocus(!1)
        }
    }(this));
    var b = !1;
    this.display.bind("mousemove", function (c) {
        return function () {
            b || (b = setTimeout(function () {
                b = !1;
                a && c.setFocus(!0)
            }, 300))
        }
    }(this));
    minplayer.get.call(this, this.options.id, null, function (a) {
        return function (b) {
            a.bindTo(b)
        }
    }(this))
};
minplayer.prototype.showError = function (a) {
    if ("object" !== typeof a && (a = a || "", this.elements.error)) if (this.elements.error.text(a), a) {
        this.elements.error.show();
        var b = this;
        setTimeout(function () {
            b.elements.error.hide("slow")
        }, 5E3)
    } else this.elements.error.hide()
};
minplayer.prototype.addKeyEvents = function () {
    jQuery(document).bind("keydown", function (a) {
        return function (b) {
            switch (b.keyCode) {
            case 113:
            case 27:
                a.isFullScreen() && a.fullscreen(!1)
                //TODO: add keycode event j/k here
            }
        }
    }(this))
};
minplayer.prototype.getFiles = function () {
    if (this.options.files) return this.options.files;
    if (this.options.file) return this.options.file;
    var a = [],
        b = null;
    this.elements.media && ((b = this.elements.media.attr("src")) && a.push({
        path: b
    }), jQuery("source", this.elements.media).each(function () {
        a.push({
            path: jQuery(this).attr("src"),
            mimetype: jQuery(this).attr("type"),
            codecs: jQuery(this).attr("codecs")
        })
    }));
    return a
};
minplayer.getMediaFile = function (a) {
    if (!a) return null;
    if ("string" === typeof a || a.path || a.id) return new minplayer.file(a);
    var b = null,
        c = null,
        d;
    for (d in a) a.hasOwnProperty(d) && (c = new minplayer.file(a[d]), c.player && 0 < c.priority && (b = c));
    return b
};
minplayer.prototype.loadPlayer = function () {
    if (!this.options.file || 0 == this.elements.display.length || !this.options.file.player) return !1;
    this.showError();
    var a = this.options.file.player.toString();
    if (!this.media || a !== this.currentPlayer) {
        this.currentPlayer = a;
        if (this.elements.display) return a = {}, this.media && (a = this.media.queue, this.media.destroy()), pClass = minplayer.players[this.options.file.player], this.options.mediaelement = this.elements.media, this.media = new pClass(this.elements.display, this.options, a), this.get("media", function (a) {
            return function (c) {
                c.load(a.options.file);
                a.display.addClass("minplayer-player-" + c.mediaFile.player)
            }
        }(this)), !0;
        this.showError("No media display found.")
    } else if (this.media) return this.media.options = this.options, this.display.removeClass("minplayer-player-" + this.media.mediaFile.player), this.media.load(this.options.file), this.display.addClass("minplayer-player-" + this.media.mediaFile.player), !1
};
minplayer.prototype.load = function (a) {
    this.options.files = a || this.options.files;
    this.options.file = minplayer.getMediaFile(this.options.files);
    this.loadPlayer() && (this.bindTo(this.media), this.options.file.mimetype && !this.options.file.player && this.showError("Cannot play media: " + this.options.file.mimetype))
};
minplayer.prototype.resize = function () {
    this.get(function (a) {
        if (a.onResize) a.onResize()
    })
};
minplayer = minplayer || {};
minplayer.image = function (a, b) {
    this.loaded = !1;
    this.loader = null;
    this.ratio = 0;
    this.img = null;
    minplayer.display.call(this, "image", a, b)
};
minplayer.image.prototype = new minplayer.display;
minplayer.image.prototype.constructor = minplayer.image;
minplayer.image.prototype.construct = function () {
    minplayer.display.prototype.construct.call(this);
    this.options.pluginName = "image";
    this.display.css("overflow", "hidden");
    this.loader = new Image;
    var a = this;
    this.loader.onload = function () {
        a.loaded = !0;
        a.ratio = a.loader.width / a.loader.height;
        a.resize();
        a.trigger("loaded")
    };
    this.ready()
};
minplayer.image.prototype.load = function (a) {
    this.clear(function () {
        this.display.empty();
        this.img = jQuery(document.createElement("img")).attr({
            src: ""
        }).hide();
        this.display.append(this.img);
        this.loader.src = a;
        this.img.attr("src", a)
    })
};
minplayer.image.prototype.clear = function (a) {
    this.loaded = !1;
    this.img ? this.img.fadeOut(function (b) {
        return function () {
            b.img.attr("src", "");
            b.loader.src = "";
            jQuery(this).remove();
            a.call(b)
        }
    }(this)) : a.call(this)
};
minplayer.image.prototype.resize = function (a, b) {
    a = a || this.display.parent().width();
    b = b || this.display.parent().height();
    if (a && b && this.loaded) {
        var c = this.getScaledRect(this.ratio, {
            width: a,
            height: b
        });
        this.img && this.img.attr("src", this.loader.src).css({
            marginLeft: c.x,
            marginTop: c.y,
            width: c.width,
            height: c.height
        });
        this.img.fadeIn()
    }
};
minplayer.image.prototype.onResize = function () {
    this.resize()
};
minplayer = minplayer || {};
minplayer.file = function (a) {
    if (!a) return null;
    a = "string" === typeof a ? {
        path: a
    } : a;
    if (a.hasOwnProperty("isMinPlayerFile")) return a;
    this.isMinPlayerFile = !0;
    this.duration = a.duration || 0;
    this.bytesTotal = a.bytesTotal || 0;
    this.quality = a.quality || 0;
    this.stream = a.stream || "";
    this.path = a.path || "";
    this.codecs = a.codecs || "";
    this.extension = a.extension || this.getFileExtension();
    this.mimetype = a.mimetype || a.filemime || this.getMimeType();
    this.type = a.type || this.getType();
    this.type || (this.mimetype = this.getMimeType(), this.type =
    this.getType());
    this.player = minplayer.player || a.player || this.getBestPlayer();
    this.priority = a.priority || this.getPriority();
    this.id = a.id || this.getId();
    this.path || (this.path = this.id)
};
minplayer.player = "";
minplayer.file.prototype.getBestPlayer = function () {
    var a = null,
        b = 0;
    jQuery.each(minplayer.players, function (c) {
        return function (d, e) {
            var g = e.getPriority(c);
            e.canPlay(c) && g > b && (a = d, b = g)
        }
    }(this));
    return a
};
minplayer.file.prototype.getPriority = function () {
    var a = 1;
    this.player && (a = minplayer.players[this.player].getPriority(this));
    switch (this.mimetype) {
    case "video/x-webm":
    case "video/webm":
    case "application/octet-stream":
        return 10 * a;
    case "video/mp4":
    case "audio/mp4":
    case "audio/mpeg":
        return 9 * a;
    case "video/ogg":
    case "audio/ogg":
    case "video/quicktime":
        return 8 * a;
    default:
        return 5 * a
    }
};
minplayer.file.prototype.getFileExtension = function () {
    return this.path.substring(this.path.lastIndexOf(".") + 1).toLowerCase()
};
minplayer.file.prototype.getMimeType = function () {
    switch (this.extension) {
    case "mp4":
    case "m4v":
    case "flv":
    case "f4v":
        return "video/mp4";
    case "webm":
        return "video/webm";
    case "ogg":
    case "ogv":
        return "video/ogg";
    case "3g2":
        return "video/3gpp2";
    case "3gpp":
    case "3gp":
        return "video/3gpp";
    case "mov":
        return "video/quicktime";
    case "swf":
        return "application/x-shockwave-flash";
    case "oga":
        return "audio/ogg";
    case "mp3":
        return "audio/mpeg";
    case "m4a":
    case "f4a":
        return "audio/mp4";
    case "aac":
        return "audio/aac";
    case "wav":
        return "audio/vnd.wave";
    case "wma":
        return "audio/x-ms-wma";
    default:
        return "unknown"
    }
};
minplayer.file.prototype.getType = function () {
    var a = this.mimetype.match(/([^\/]+)(\/)/),
        a = a && 1 < a.length ? a[1] : "";
    return "video" == a || "application/octet-stream" == this.mimetype ? "video" : "audio" == a ? "audio" : ""
};
minplayer.file.prototype.getId = function () {
    var a = minplayer.players[this.player];
    return a && a.getMediaId ? a.getMediaId(this) : ""
};
minplayer = minplayer || {};
minplayer.playLoader = function (a, b) {
    this.busy = new minplayer.flags;
    this.bigPlay = new minplayer.flags;
    this.previewFlag = new minplayer.flags;
    this.preview = null;
    this.enabled = !0;
    minplayer.display.call(this, "playLoader", a, b)
};
minplayer.playLoader.prototype = new minplayer.display;
minplayer.playLoader.prototype.constructor = minplayer.playLoader;
minplayer.playLoader.prototype.construct = function () {
    minplayer.display.prototype.construct.call(this);
    this.options.pluginName = "playLoader";
    this.initialize();
    this.ready()
};
minplayer.playLoader.prototype.initialize = function () {
    this.get("media", function (a) {
        a.hasPlayLoader(this.options.preview) ? (this.enabled = !1, this.hide(this.elements.busy), this.hide(this.elements.bigPlay), this.hide(this.elements.preview), this.hide()) : (this.enabled = !0, this.options.preview || (this.options.preview = a.elements.media.attr("poster")), a.elements.media.attr("poster", ""), this.loadPreview(), this.elements.bigPlay && minplayer.click(this.elements.bigPlay.unbind(), function (b) {
            b.preventDefault();
            jQuery(this).hide();
            a.play()
        }), a.ubind(this.uuid + ":loadstart", function (a) {
            return function () {
                a.busy.setFlag("media", !0);
                a.bigPlay.setFlag("media", !0);
                a.previewFlag.setFlag("media", !0);
                a.checkVisibility()
            }
        }(this)), a.ubind(this.uuid + ":waiting", function (a) {
            return function () {
                a.busy.setFlag("media", !0);
                a.checkVisibility()
            }
        }(this)), a.ubind(this.uuid + ":loadeddata", function (a) {
            return function () {
                a.busy.setFlag("media", !1);
                a.checkVisibility()
            }
        }(this)), a.ubind(this.uuid + ":playing", function (b) {
            return function () {
                b.busy.setFlag("media", !1);
                b.bigPlay.setFlag("media", !1);
                "audio" !== a.mediaFile.type && b.previewFlag.setFlag("media", !1);
                b.checkVisibility()
            }
        }(this)), a.ubind(this.uuid + ":pause", function (a) {
            return function () {
                a.bigPlay.setFlag("media", !0);
                a.checkVisibility()
            }
        }(this)))
    })
};
minplayer.playLoader.prototype.loadPreview = function () {
    if (this.enabled) {
        if (this.elements.preview) {
            if (this.options.preview) return this.elements.preview.addClass("has-preview").show(), this.preview = new minplayer.image(this.elements.preview, this.options), this.preview.load(this.options.preview), !0;
            this.elements.preview.hide()
        }
        return !1
    }
};
minplayer.playLoader.prototype.checkVisibility = function () {
    this.enabled && (this.busy.flag ? this.elements.busy.show() : this.elements.busy.hide(), this.bigPlay.flag ? this.elements.bigPlay.show() : this.elements.bigPlay.hide(), this.previewFlag.flag ? this.elements.preview.show() : this.elements.preview.hide(), (this.bigPlay.flag || this.busy.flag || this.previewFlag.flag) && this.display.show(), !this.bigPlay.flag && (!this.busy.flag && !this.previewFlag.flag) && this.display.hide())
};
minplayer = minplayer || {};
minplayer.players = minplayer.players || {};
minplayer.players.base = function (a, b, c) {
    minplayer.display.call(this, "media", a, b, c)
};
minplayer.players.base.prototype = new minplayer.display;
minplayer.players.base.prototype.constructor = minplayer.players.base;
minplayer.players.base.prototype.getElements = function () {
    var a = minplayer.display.prototype.getElements.call(this);
    return jQuery.extend(a, {
        media: this.options.mediaelement
    })
};
minplayer.players.base.getPriority = function () {
    return 0
};
minplayer.players.base.getMediaId = function () {
    return ""
};
minplayer.players.base.canPlay = function () {
    return !1
};
minplayer.players.base.prototype.construct = function () {
    minplayer.display.prototype.construct.call(this);
    this.options.pluginName = "basePlayer";
    this.mediaFile = this.options.file;
    this.options.autoplay = this.options.autoplay || !! this.mediaFile.stream;
    this.clear();
    this.playerFound() || this.addPlayer();
    this.player = this.getPlayer();
    minplayer.click(this.display, function (a) {
        return function () {
            a.playing ? a.pause() : a.play()
        }
    }(this));
    jQuery(document).bind("keydown", function (a) {
        return function (b) {
            if (a.hasFocus) switch (b.preventDefault(), b.keyCode) {
            case 32:
            case 179:
                a.playing ? a.pause() : a.play();
                break;
            case 38:
                a.setVolumeRelative(0.1);
                break;
            case 40:
                a.setVolumeRelative(-0.1);
                break;
            case 37:
            case 227:
                a.seekRelative(-0.05);
                break;
            case 39:
            case 228:
                a.seekRelative(0.05)
            }
        }
    }(this));
    if (!this.options.autoload) this.onReady()
};
minplayer.players.base.prototype.addPlayer = function () {
    this.elements.media && this.elements.media.remove();
    this.elements.media = jQuery(this.create());
    this.display.html(this.elements.media)
};
minplayer.players.base.prototype.destroy = function () {
    minplayer.plugin.prototype.destroy.call(this);
    this.clear()
};
minplayer.players.base.prototype.clear = function () {
    this.playerReady = !1;
    this.reset();
    this.player && jQuery(this.player).unbind()
};
minplayer.players.base.prototype.reset = function () {
    this.duration = new minplayer.async;
    this.currentTime = new minplayer.async;
    this.bytesLoaded = new minplayer.async;
    this.bytesTotal = new minplayer.async;
    this.bytesStart = new minplayer.async;
    this.volume = new minplayer.async;
    this.loading = this.playing = this.hasFocus = !1;
    this.trigger("pause");
    this.trigger("waiting");
    this.trigger("progress", {
        loaded: 0,
        total: 0,
        start: 0
    });
    this.trigger("timeupdate", {
        currentTime: 0,
        duration: 0
    })
};
minplayer.players.base.prototype.onReady = function () {
    this.playerReady || (this.playerReady = !0, this.setVolume(this.options.volume / 100), this.loading = !0, this.poll("progress", function (a) {
        return function () {
            a.loading && a.getBytesLoaded(function (b) {
                a.getBytesTotal(function (c) {
                    if (b || c) {
                        var d = 0;
                        a.getBytesStart(function (a) {
                            d = a
                        });
                        a.trigger("progress", {
                            loaded: b,
                            total: c,
                            start: d
                        });
                        b >= c && (a.loading = !1)
                    }
                })
            });
            return a.loading
        }
    }(this), 1E3), this.ready(), this.trigger("loadstart"))
};
minplayer.players.base.prototype.getSeek = function () {
    var a = 0,
        b = 0,
        b = 0;
    minplayer.urlVars && minplayer.urlVars.seek && ((a = minplayer.urlVars.seek.match(/([0-9])s/i)) && (a = parseInt(a[1], 10)), (b = minplayer.urlVars.seek.match(/([0-9])m/i)) && (a += 60 * parseInt(b[1], 10)), (b = minplayer.urlVars.seek.match(/([0-9])h/i)) && (a += 3600 * parseInt(b[1], 10)), a || (a = minplayer.urlVars.seek));
    return a
};
minplayer.players.base.prototype.onPlaying = function () {
    this.trigger("playing");
    this.playing = this.hasFocus = !0;
    this.poll("timeupdate", function (a) {
        return function () {
            a.playing && a.getCurrentTime(function (b) {
                a.getDuration(function (c) {
                    b = parseFloat(b);
                    c = parseFloat(c);
                    (b || c) && a.trigger("timeupdate", {
                        currentTime: b,
                        duration: c
                    })
                })
            });
            return a.playing
        }
    }(this), 500)
};
minplayer.players.base.prototype.onPaused = function () {
    this.trigger("pause");
    this.playing = this.hasFocus = !1
};
minplayer.players.base.prototype.onComplete = function () {
    if (this.playing) this.onPaused();
    this.hasFocus = this.loading = this.playing = !1;
    this.trigger("ended")
};
minplayer.players.base.prototype.onLoaded = function () {
    this.options.autoplay && this.play();
    this.trigger("loadeddata");
    var a = this.getSeek();
    a && this.getDuration(function (b) {
        return function (c) {
            a < c && (b.seek(a), b.play())
        }
    }(this))
};
minplayer.players.base.prototype.onWaiting = function () {
    this.trigger("waiting")
};
minplayer.players.base.prototype.onError = function (a) {
    this.hasFocus = !1;
    this.trigger("error", a)
};
minplayer.players.base.prototype.isReady = function () {
    return this.player && this.playerReady
};
minplayer.players.base.prototype.hasPlayLoader = function () {
    return !1
};
minplayer.players.base.prototype.hasController = function () {
    return !1
};
minplayer.players.base.prototype.playerFound = function () {
    return !1
};
minplayer.players.base.prototype.create = function () {
    this.reset();
    return null
};
minplayer.players.base.prototype.getPlayer = function () {
    return this.player
};
minplayer.players.base.prototype.load = function (a) {
    var b = "string" == typeof this.mediaFile ? this.mediaFile : this.mediaFile.path;
    return a && this.isReady() && a.path != b ? (this.reset(), this.mediaFile = a, !0) : !1
};
minplayer.players.base.prototype.play = function () {
    this.options.autoload = !0;
    this.options.autoplay = !0;
    return this.isReady()
};
minplayer.players.base.prototype.pause = function () {
    return this.isReady()
};
minplayer.players.base.prototype.stop = function () {
    this.hasFocus = this.loading = this.playing = !1;
    return this.isReady()
};
minplayer.players.base.prototype.seekRelative = function (a) {
    this.getCurrentTime(function (b) {
        return function (c) {
            b.getDuration(function (d) {
                if (d) {
                    var e = 0,
                        e = -1 < a && 1 > a ? (c / d + parseFloat(a)) * d : c + parseFloat(a);
                    b.seek(e)
                }
            })
        }
    }(this))
};
minplayer.players.base.prototype.seek = function () {
    return this.isReady()
};
minplayer.players.base.prototype.getValue = function (a, b) {
    if (this.isReady()) {
        var c = this.player[a]();
        void 0 !== c && null !== c && b(c)
    }
};
minplayer.players.base.prototype.setVolumeRelative = function (a) {
    this.getVolume(function (b) {
        return function (c) {
            c += parseFloat(a);
            c = 0 > c ? 0 : c;
            b.setVolume(1 < c ? 1 : c)
        }
    }(this))
};
minplayer.players.base.prototype.setVolume = function (a) {
    this.trigger("volumeupdate", a);
    return this.isReady()
};
minplayer.players.base.prototype.getVolume = function (a) {
    return this.volume.get(a)
};
minplayer.players.base.prototype.getCurrentTime = function (a) {
    return this.currentTime.get(a)
};
minplayer.players.base.prototype.getDuration = function (a) {
    return this.duration.get(a)
};
minplayer.players.base.prototype.getBytesStart = function (a) {
    return this.bytesStart.get(a)
};
minplayer.players.base.prototype.getBytesLoaded = function (a) {
    return this.bytesLoaded.get(a)
};
minplayer.players.base.prototype.getBytesTotal = function (a) {
    return this.bytesTotal.get(a)
};
minplayer = minplayer || {};
minplayer.players = minplayer.players || {};
minplayer.players.html5 = function (a, b, c) {
    minplayer.players.base.call(this, a, b, c)
};
minplayer.players.html5.prototype = new minplayer.players.base;
minplayer.players.html5.prototype.constructor = minplayer.players.html5;
minplayer.players.html5.getPriority = function () {
    return 10
};
minplayer.players.html5.canPlay = function (a) {
    switch (a.mimetype) {
    case "video/ogg":
        return !!minplayer.playTypes.videoOGG;
    case "video/mp4":
    case "video/x-mp4":
    case "video/m4v":
    case "video/x-m4v":
        return !!minplayer.playTypes.videoH264;
    case "video/x-webm":
    case "video/webm":
    case "application/octet-stream":
        return !!minplayer.playTypes.videoWEBM;
    case "audio/ogg":
        return !!minplayer.playTypes.audioOGG;
    case "audio/mpeg":
        return !!minplayer.playTypes.audioMP3;
    case "audio/mp4":
        return !!minplayer.playTypes.audioMP4;
    default:
        return !1
    }
};
minplayer.players.html5.prototype.construct = function () {
    minplayer.players.base.prototype.construct.call(this);
    this.options.pluginName = "html5";
    this.addPlayerEvents()
};
minplayer.players.html5.prototype.addPlayerEvent = function (a, b) {
    this.player && this.player.addEventListener(a, function (c) {
        var d = a + "Event";
        c[d] && c.player.removeEventListener(a, c[d], !1);
        c[d] = function (a) {
            b.call(c, a)
        };
        return c[d]
    }(this), !1)
};
minplayer.players.html5.prototype.addPlayerEvents = function () {
    if (this.player) {
        this.addPlayerEvent("abort", function () {
            this.trigger("abort")
        });
        this.addPlayerEvent("loadstart", function () {
            this.onReady();
            if (!this.options.autoload) this.onLoaded()
        });
        this.addPlayerEvent("loadeddata", function () {
            this.onLoaded()
        });
        this.addPlayerEvent("loadedmetadata", function () {
            this.onLoaded()
        });
        this.addPlayerEvent("canplaythrough", function () {
            this.onLoaded()
        });
        this.addPlayerEvent("ended", function () {
            this.onComplete()
        });
        this.addPlayerEvent("pause", function () {
            this.onPaused()
        });
        this.addPlayerEvent("play", function () {
            this.onPlaying()
        });
        this.addPlayerEvent("playing", function () {
            this.onPlaying()
        });
        var a = !1;
        this.addPlayerEvent("error", function () {
            a || (a = !0, this.trigger("error", "An error occured - " + this.player.error.code))
        });
        this.addPlayerEvent("waiting", function () {
            this.onWaiting()
        });
        this.addPlayerEvent("durationchange", function () {
            this.duration.set(this.player.duration);
            this.trigger("durationchange", {
                duration: this.player.duration
            })
        });
        this.addPlayerEvent("progress", function (a) {
            this.bytesTotal.set(a.total);
            this.bytesLoaded.set(a.loaded)
        });
        return !0
    }
    return !1
};
minplayer.players.html5.prototype.onReady = function () {
    minplayer.players.base.prototype.onReady.call(this);
    if (minplayer.isAndroid) this.onLoaded();
    if (minplayer.isIDevice) {
        var a = this;
        setTimeout(function () {
            a.pause();
            a.onLoaded()
        }, 1)
    }
};
minplayer.players.html5.prototype.playerFound = function () {
    return 0 < this.display.find(this.mediaFile.type).length
};
minplayer.players.html5.prototype.create = function () {
    minplayer.players.base.prototype.create.call(this);
    var a = jQuery(document.createElement(this.mediaFile.type)).attr(this.options.attributes).append(jQuery(document.createElement("source")).attr({
        src: this.mediaFile.path
    }));
    a.eq(0)[0].setAttribute("width", "100%");
    a.eq(0)[0].setAttribute("height", "100%");
    var b = this.options.autoload ? "metadata" : "none",
        b = minplayer.isIDevice ? "metadata" : b;
    a.eq(0)[0].setAttribute("preload", b);
    this.options.autoload || a.eq(0)[0].setAttribute("autobuffer", !1);
    return a
};
minplayer.players.html5.prototype.getPlayer = function () {
    return this.elements.media.eq(0)[0]
};
minplayer.players.html5.prototype.load = function (a) {
    if (minplayer.players.base.prototype.load.call(this, a)) {
        var b = this.elements.media.attr("src");
        b || (b = jQuery("source", this.elements.media).eq(0).attr("src"));
        if (b != a.path) return this.addPlayer(), this.player = this.getPlayer(), this.addPlayerEvents(), a = '<source src="' + a.path + '"></source>', this.elements.media.removeAttr("src").empty().html(a), !0
    }
    return !1
};
minplayer.players.html5.prototype.play = function () {
    return minplayer.players.base.prototype.play.call(this) ? (this.player.play(), !0) : !1
};
minplayer.players.html5.prototype.pause = function () {
    return minplayer.players.base.prototype.pause.call(this) ? (this.player.pause(), !0) : !1
};
minplayer.players.html5.prototype.stop = function () {
    return minplayer.players.base.prototype.stop.call(this) ? (this.player.pause(), this.player.src = "", !0) : !1
};
minplayer.players.html5.prototype.seek = function (a) {
    return minplayer.players.base.prototype.seek.call(this, a) ? (this.player.currentTime = a, !0) : !1
};
minplayer.players.html5.prototype.setVolume = function (a) {
    return minplayer.players.base.prototype.setVolume.call(this, a) ? (this.player.volume = a, !0) : !1
};
minplayer.players.html5.prototype.getVolume = function (a) {
    this.isReady() && a(this.player.volume)
};
minplayer.players.html5.prototype.getDuration = function (a) {
    this.isReady() && (this.duration.get(a), this.player.duration && this.duration.set(this.player.duration))
};
minplayer.players.html5.prototype.getCurrentTime = function (a) {
    this.isReady() && a(this.player.currentTime)
};
minplayer.players.html5.prototype.getBytesLoaded = function (a) {
    if (this.isReady()) {
        var b = 0;
        this.bytesLoaded.value ? b = this.bytesLoaded.value : this.player.buffered && 0 < this.player.buffered.length && this.player.buffered.end && this.player.duration ? b = this.player.buffered.end(0) : void 0 != this.player.bytesTotal && (0 < this.player.bytesTotal && void 0 != this.player.bufferedBytes) && (b = this.player.bufferedBytes);
        a(b)
    }
};
minplayer.players.html5.prototype.getBytesTotal = function (a) {
    if (this.isReady()) {
        var b = 0;
        this.bytesTotal.value ? b = this.bytesTotal.value : this.player.buffered && 0 < this.player.buffered.length && this.player.buffered.end && this.player.duration ? b = this.player.duration : void 0 != this.player.bytesTotal && (0 < this.player.bytesTotal && void 0 != this.player.bufferedBytes) && (b = this.player.bytesTotal);
        a(b)
    }
};
minplayer = minplayer || {};
minplayer.players = minplayer.players || {};
minplayer.players.flash = function (a, b, c) {
    minplayer.players.base.call(this, a, b, c)
};
minplayer.players.flash.prototype = new minplayer.players.base;
minplayer.players.flash.prototype.constructor = minplayer.players.flash;
minplayer.players.flash.prototype.construct = function () {
    minplayer.players.base.prototype.construct.call(this);
    this.options.pluginName = "flash"
};
minplayer.players.flash.getPriority = function () {
    return 0
};
minplayer.players.flash.canPlay = function () {
    return !1
};
minplayer.players.flash.prototype.getFlash = function (a) {
    var b = window.location.protocol;
    ":" == b.charAt(b.length - 1) && (b = b.substring(0, b.length - 1));
    var c = document.createElement("script"),
        b = b + "://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js";
    c.src = b;
    b = document.getElementsByTagName("script")[0];
    b.parentNode.insertBefore(c, b);
    var d = this;
    setTimeout(function g() {
        "undefined" !== typeof swfobject ? swfobject.embedSWF(a.swf, a.id, a.width, a.height, "9.0.0", !1, a.flashvars, {
            allowscriptaccess: "always",
            allowfullscreen: "true",
            wmode: a.wmode,
            quality: "high"
        }, {
            id: a.id,
            name: a.id,
            playerType: "flash"
        }, function (a) {
            d.player = a.ref
        }) : setTimeout(g, 200)
    }, 200);
    return '<div id="' + a.id + '"></div>'
};
minplayer.players.flash.prototype.playerFound = function () {
    return 0 < this.display.find('object[playerType="flash"]').length
};
minplayer = minplayer || {};
minplayer.players = minplayer.players || {};
minplayer.players.minplayer = function (a, b, c) {
    minplayer.players.flash.call(this, a, b, c)
};
minplayer.players.minplayer.prototype = new minplayer.players.flash;
minplayer.players.minplayer.prototype.constructor = minplayer.players.minplayer;
minplayer.players.minplayer.prototype.construct = function () {
    minplayer.players.flash.prototype.construct.call(this);
    this.options.pluginName = "minplayer"
};
window.onFlashPlayerReady = function (a) {
    for (var a = minplayer.get(a, "media"), b = a.length; b--;) a[b].onReady()
};
window.onFlashPlayerUpdate = function (a, b) {
    for (var c = minplayer.get(a, "media"), d = c.length; d--;) c[d].onMediaUpdate(b)
};
window.onFlashPlayerDebug = function (a) {
    console && console.log && console.log(a)
};
minplayer.players.minplayer.getPriority = function (a) {
    return a.stream ? 100 : 1
};
minplayer.players.minplayer.canPlay = function (a) {
    return a.stream ? !0 : !(0 <= jQuery.inArray(a.mimetype, ["video/x-webm", "video/webm", "application/octet-stream"])) && ("video" == a.type || "audio" == a.type)
};
minplayer.players.minplayer.prototype.create = function () {
    this.options = jQuery.extend({
        swfplayer: "flash/minplayer.swf"
    }, this.options);
    minplayer.players.flash.prototype.create.call(this);
    var a = {
        id: this.options.id,
        debug: this.options.debug,
        config: "nocontrols",
        file: this.mediaFile.path,
        autostart: this.options.autoplay,
        autoload: this.options.autoload
    };
    this.mediaFile.stream && (a.stream = this.mediaFile.stream);
    return this.getFlash({
        swf: this.options.swfplayer,
        id: this.options.id + "_player",
        width: "100%",
        height: "100%",
        flashvars: a,
        wmode: this.options.wmode
    })
};
minplayer.players.minplayer.prototype.onMediaUpdate = function (a) {
    switch (a) {
    case "mediaMeta":
        this.onLoaded();
        break;
    case "mediaConnected":
        this.onLoaded();
        break;
    case "mediaPlaying":
        if (this.minplayerloaded) this.onPlaying();
        break;
    case "mediaPaused":
        this.minplayerloaded = !0;
        this.onPaused();
        break;
    case "mediaComplete":
        this.onComplete()
    }
};
minplayer.players.minplayer.prototype.clear = function () {
    minplayer.players.flash.prototype.clear.call(this);
    this.minplayerloaded = this.options.autoplay || !this.options.autoload
};
minplayer.players.minplayer.prototype.load = function (a) {
    return minplayer.players.flash.prototype.load.call(this, a) ? (this.player.loadMedia(a.path, a.stream), !0) : !1
};
minplayer.players.minplayer.prototype.play = function () {
    return minplayer.players.flash.prototype.play.call(this) ? (this.player.playMedia(), !0) : !1
};
minplayer.players.minplayer.prototype.pause = function () {
    return minplayer.players.flash.prototype.pause.call(this) ? (this.player.pauseMedia(), !0) : !1
};
minplayer.players.minplayer.prototype.stop = function () {
    return minplayer.players.flash.prototype.stop.call(this) ? (this.player.stopMedia(), !0) : !1
};
minplayer.players.minplayer.prototype.seek = function (a) {
    return minplayer.players.flash.prototype.seek.call(this, a) ? (this.player.seekMedia(a), !0) : !1
};
minplayer.players.minplayer.prototype.setVolume = function (a) {
    return minplayer.players.flash.prototype.setVolume.call(this, a) ? (this.player.setVolume(a), !0) : !1
};
minplayer.players.minplayer.prototype.getVolume = function (a) {
    this.isReady() && a(this.player.getVolume())
};
minplayer.players.minplayer.prototype.getDuration = function (a) {
    if (this.isReady()) {
        var b = this.player.getDuration();
        b ? a(b) : this.poll("duration", function (c) {
            return function () {
                (b = c.player.getDuration()) && a(b);
                return !b
            }
        }(this), 1E3)
    }
};
minplayer.players.minplayer.prototype.getCurrentTime = function (a) {
    this.isReady() && a(this.player.getCurrentTime())
};
minplayer.players.minplayer.prototype.getBytesLoaded = function (a) {
    this.isReady() && a(this.player.getMediaBytesLoaded())
};
minplayer.players.minplayer.prototype.getBytesTotal = function (a) {
    this.isReady() && a(this.player.getMediaBytesTotal())
};
minplayer = minplayer || {};
minplayer.players = minplayer.players || {};
minplayer.players.youtube = function (a, b, c) {
    this.quality = "default";
    minplayer.players.base.call(this, a, b, c)
};
minplayer.players.youtube.prototype = new minplayer.players.base;
minplayer.players.youtube.prototype.constructor = minplayer.players.youtube;
minplayer.players.youtube.prototype.construct = function () {
    minplayer.players.base.prototype.construct.call(this);
    this.options.pluginName = "youtube"
};
minplayer.players.youtube.getPriority = function () {
    return 10
};
minplayer.players.youtube.canPlay = function (a) {
    return "video/youtube" === a.mimetype ? !0 : 0 === a.path.search(/^http(s)?\:\/\/(www\.)?youtube\.com/i)
};
minplayer.players.youtube.getMediaId = function (a) {
    var b = /^http[s]?\:\/\/(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_\-]+)/i;
    return 0 === a.path.search(b) ? a.path.match(b)[2] : a.path
};
minplayer.players.youtube.getImage = function (a, b, c) {
    c("http://img.youtube.com/vi/" + a.id + "/" + ("thumbnail" == b ? "1" : "0") + ".jpg")
};
minplayer.players.youtube.prototype.setPlayerState = function (a) {
    switch (a) {
    case YT.PlayerState.BUFFERING:
        this.onWaiting();
        break;
    case YT.PlayerState.PAUSED:
        this.onPaused();
        break;
    case YT.PlayerState.PLAYING:
        this.onPlaying();
        break;
    case YT.PlayerState.ENDED:
        this.onComplete()
    }
};
minplayer.players.youtube.prototype.onReady = function () {
    minplayer.players.base.prototype.onReady.call(this);
    this.options.autoplay || this.pause();
    this.onLoaded()
};
minplayer.players.youtube.prototype.playerFound = function () {
    return 0 < this.display.find("iframe#" + this.options.id + "-player.youtube-player").length
};
minplayer.players.youtube.prototype.onPlayerStateChange = function (a) {
    this.setPlayerState(a.data)
};
minplayer.players.youtube.prototype.onQualityChange = function (a) {
    this.quality = a.data
};
minplayer.players.youtube.prototype.hasPlayLoader = function (a) {
    return minplayer.hasTouch || !a
};
minplayer.players.youtube.prototype.hasController = function () {
    return minplayer.isIDevice
};
minplayer.players.youtube.prototype.create = function () {
    minplayer.players.base.prototype.create.call(this);
    var a = document.createElement("script");
    a.src = "https://www.youtube.com/player_api";
    var b = document.getElementsByTagName("script")[0];
    b.parentNode.insertBefore(a, b);
    this.playerId = this.options.id + "-player";
    this.poll("youtube", function (a) {
        return function () {
            var b = 0 < jQuery("#" + a.playerId).length;
            if (b = (b = b && "YT" in window) && "function" == typeof YT.Player) {
                jQuery("#" + a.playerId).addClass("youtube-player");
                var e = location.protocol,
                    e = e + ("//" + location.hostname),
                    e = e + (location.port && ":" + location.port),
                    g = {};
                minplayer.isIDevice ? g.origin = e : g = {
                    enablejsapi: minplayer.isIDevice ? 0 : 1,
                    origin: e,
                    wmode: "opaque",
                    controls: minplayer.isAndroid ? 1 : 0
                };
                a.player = new YT.Player(a.playerId, {
                    height: "100%",
                    width: "100%",
                    frameborder: 0,
                    videoId: a.mediaFile.id,
                    playerVars: g,
                    events: {
                        onReady: function (b) {
                            a.onReady(b)
                        },
                        onStateChange: function (b) {
                            a.onPlayerStateChange(b)
                        },
                        onPlaybackQualityChange: function (b) {
                            a.onQualityChange(b)
                        },
                        onError: function (b) {
                            a.onError(b)
                        }
                    }
                })
            }
            return !b
        }
    }(this), 200);
    return jQuery(document.createElement("div")).attr({
        id: this.playerId
    })
};
minplayer.players.youtube.prototype.load = function (a) {
    return minplayer.players.base.prototype.load.call(this, a) ? (this.player.loadVideoById(a.id, 0, this.quality), !0) : !1
};
minplayer.players.youtube.prototype.play = function () {
    return minplayer.players.base.prototype.play.call(this) ? (this.onWaiting(), this.player.playVideo(), !0) : !1
};
minplayer.players.youtube.prototype.pause = function () {
    return minplayer.players.base.prototype.pause.call(this) ? (this.player.pauseVideo(), !0) : !1
};
minplayer.players.youtube.prototype.stop = function () {
    return minplayer.players.base.prototype.stop.call(this) ? (this.player.stopVideo(), !0) : !1
};
minplayer.players.youtube.prototype.seek = function (a) {
    return minplayer.players.base.prototype.seek.call(this, a) ? (this.onWaiting(), this.player.seekTo(a, !0), !0) : !1
};
minplayer.players.youtube.prototype.setVolume = function (a) {
    return minplayer.players.base.prototype.setVolume.call(this, a) ? (this.player.setVolume(100 * a), !0) : !1
};
minplayer.players.youtube.prototype.getVolume = function (a) {
    this.getValue("getVolume", a)
};
minplayer.players.youtube.prototype.getDuration = function (a) {
    this.getValue("getDuration", a)
};
minplayer.players.youtube.prototype.getCurrentTime = function (a) {
    this.getValue("getCurrentTime", a)
};
minplayer.players.youtube.prototype.getBytesStart = function (a) {
    this.getValue("getVideoStartBytes", a)
};
minplayer.players.youtube.prototype.getBytesLoaded = function (a) {
    this.getValue("getVideoBytesLoaded", a)
};
minplayer.players.youtube.prototype.getBytesTotal = function (a) {
    this.getValue("getVideoBytesTotal", a)
};
minplayer = minplayer || {};
minplayer.players = minplayer.players || {};
minplayer.players.vimeo = function (a, b, c) {
    minplayer.players.base.call(this, a, b, c)
};
minplayer.players.vimeo.prototype = new minplayer.players.base;
minplayer.players.vimeo.prototype.constructor = minplayer.players.vimeo;
minplayer.players.vimeo.prototype.construct = function () {
    minplayer.players.base.prototype.construct.call(this);
    this.options.pluginName = "vimeo"
};
minplayer.players.vimeo.getPriority = function () {
    return 10
};
minplayer.players.vimeo.canPlay = function (a) {
    return "video/vimeo" === a.mimetype ? !0 : 0 === a.path.search(/^http(s)?\:\/\/(www\.)?vimeo\.com/i)
};
minplayer.players.vimeo.prototype.hasPlayLoader = function (a) {
    return minplayer.hasTouch || !a
};
minplayer.players.vimeo.prototype.hasController = function () {
    return minplayer.hasTouch
};
minplayer.players.vimeo.getMediaId = function (a) {
    var b = /^http[s]?\:\/\/(www\.)?vimeo\.com\/(\?v\=)?([0-9]+)/i;
    return 0 === a.path.search(b) ? a.path.match(b)[3] : a.path
};
minplayer.players.vimeo.getImage = function (a, b, c) {
    jQuery.ajax({
        url: "http://vimeo.com/api/v2/video/" + a.id + ".json",
        dataType: "jsonp",
        success: function (a) {
            c(a[0].thumbnail_large)
        }
    })
};
minplayer.players.vimeo.prototype.reset = function () {
    minplayer.players.base.prototype.reset.call(this)
};
minplayer.players.vimeo.prototype.create = function () {
    minplayer.players.base.prototype.create.call(this);
    var a = document.createElement("script");
    a.src = "http://a.vimeocdn.com/js/froogaloop2.min.js";
    var b = document.getElementsByTagName("script")[0];
    b.parentNode.insertBefore(a, b);
    var c = document.createElement("iframe");
    c.setAttribute("id", this.options.id + "-player");
    c.setAttribute("type", "text/html");
    c.setAttribute("width", "100%");
    c.setAttribute("height", "100%");
    c.setAttribute("frameborder", "0");
    jQuery(c).addClass("vimeo-player");
    a = "http://player.vimeo.com/video/" + (this.mediaFile.id + "?");
    a += jQuery.param({
        wmode: "opaque",
        api: 1,
        player_id: this.options.id + "-player",
        title: 0,
        byline: 0,
        portrait: 0,
        autoplay: this.options.autoplay,
        loop: this.options.loop
    });
    c.setAttribute("src", a);
    this.poll("vimeo", function (a) {
        return function () {
            if (window.Froogaloop) {
                a.player = window.Froogaloop(c);
                var b = 0;
                a.player.addEvent("ready", function () {
                    clearTimeout(b);
                    a.onReady();
                    a.onError("")
                });
                b = setTimeout(function () {
                    a.onReady();
                    a.onError("Unable to play video.")
                }, 2E3)
            }
            return !window.Froogaloop
        }
    }(this), 200);
    this.trigger("loadstart");
    return c
};
minplayer.players.vimeo.prototype.onReady = function () {
    this.player.addEvent("loadProgress", function (a) {
        return function (b) {
            a.duration.set(parseFloat(b.duration));
            a.bytesLoaded.set(b.bytesLoaded);
            a.bytesTotal.set(b.bytesTotal)
        }
    }(this));
    this.player.addEvent("playProgress", function (a) {
        return function (b) {
            a.duration.set(parseFloat(b.duration));
            a.currentTime.set(parseFloat(b.seconds))
        }
    }(this));
    this.player.addEvent("play", function (a) {
        return function () {
            a.onPlaying()
        }
    }(this));
    this.player.addEvent("pause", function (a) {
        return function () {
            a.onPaused()
        }
    }(this));
    this.player.addEvent("finish", function (a) {
        return function () {
            a.onComplete()
        }
    }(this));
    minplayer.players.base.prototype.onReady.call(this);
    this.onLoaded()
};
minplayer.players.vimeo.prototype.clear = function () {
    this.player && this.player.api("unload");
    minplayer.players.base.prototype.clear.call(this)
};
minplayer.players.vimeo.prototype.load = function (a) {
    return minplayer.players.base.prototype.load.call(this, a) ? (this.construct(), !0) : !1
};
minplayer.players.vimeo.prototype.play = function () {
    return minplayer.players.base.prototype.play.call(this) ? (this.player.api("play"), !0) : !1
};
minplayer.players.vimeo.prototype.pause = function () {
    return minplayer.players.base.prototype.pause.call(this) ? (this.player.api("pause"), !0) : !1
};
minplayer.players.vimeo.prototype.stop = function () {
    return minplayer.players.base.prototype.stop.call(this) ? (this.player.api("unload"), !0) : !1
};
minplayer.players.vimeo.prototype.seek = function (a) {
    return minplayer.players.base.prototype.seek.call(this, a) ? (this.player.api("seekTo", a), !0) : !1
};
minplayer.players.vimeo.prototype.setVolume = function (a) {
    return minplayer.players.base.prototype.setVolume.call(this, a) ? (this.volume.set(a), this.player.api("setVolume", a), !0) : !1
};
minplayer.players.vimeo.prototype.getVolume = function (a) {
    this.player.api("getVolume", function (b) {
        a(b)
    })
};
minplayer.players.vimeo.prototype.getDuration = function (a) {
    this.isReady() && (this.duration.value ? a(this.duration.value) : this.player.api("getDuration", function (b) {
        a(b)
    }))
};
minplayer = minplayer || {};
minplayer.controller = function (a, b) {
    minplayer.display.call(this, "controller", a, b)
};
minplayer.controller.prototype = new minplayer.display;
minplayer.controller.prototype.constructor = minplayer.controller;
minplayer.formatTime = function (a) {
    var a = a || 0,
        b = 0,
        c = 0,
        d = 0,
        e = "",
        d = Math.floor(a / 3600),
        a = a - 3600 * d,
        c = Math.floor(a / 60),
        b = Math.floor((a - 60 * c) % 60);
    d && (e += String(d), e += ":");
    e += 10 <= c ? String(c) : "0" + String(c);
    e = e + ":" + (10 <= b ? String(b) : "0" + String(b));
    return {
        time: e,
        units: ""
    }
};
minplayer.controller.prototype.getElements = function () {
    var a = minplayer.display.prototype.getElements.call(this);
    return jQuery.extend(a, {
        play: null,
        pause: null,
        fullscreen: null,
        seek: null,
        progress: null,
        volume: null,
        timer: null
    })
};
minplayer.controller.prototype.construct = function () {
    minplayer.display.prototype.construct.call(this);
    this.options.pluginName = "controller";
    this.dragging = !1;
    this.vol = 0;
    this.elements.seek && (this.seekBar = this.elements.seek.slider({
        range: "min",
        create: function (a) {
            jQuery(".ui-slider-range", a.target).addClass("ui-state-active")
        }
    }));
    this.elements.volume && (this.volumeBar = this.elements.volume.slider({
        animate: !0,
        range: "min",
        orientation: "vertical"
    }));
    this.get("player", function (a) {
        this.elements.fullscreen && minplayer.click(this.elements.fullscreen.unbind(), function () {
            a.toggleFullScreen()
        }).css({
            pointer: "hand"
        })
    });
    this.get("media", function (a) {
        a.hasController() ? this.hide() : (this.elements.pause && (minplayer.click(this.elements.pause.unbind(), function (b) {
            return function (c) {
                c.preventDefault();
                b.playPause(!1, a)
            }
        }(this)), a.ubind(this.uuid + ":pause", function (a) {
            return function () {
                a.setPlayPause(!0)
            }
        }(this))), this.elements.play && (minplayer.click(this.elements.play.unbind(), function (b) {
            return function (c) {
                c.preventDefault();
                b.playPause(!0, a)
            }
        }(this)), a.ubind(this.uuid + ":playing", function (a) {
            return function () {
                a.setPlayPause(!1)
            }
        }(this))), this.elements.duration && (a.ubind(this.uuid + ":durationchange", function (a) {
            return function (c, d) {
                a.setTimeString("duration", d.duration)
            }
        }(this)), a.getDuration(function (a) {
            return function (c) {
                a.setTimeString("duration", c)
            }
        }(this))), this.elements.progress && a.ubind(this.uuid + ":progress", function (a) {
            return function (c, d) {
                a.elements.progress.width((d.total ? 100 * (d.loaded / d.total) : 0) + "%")
            }
        }(this)), (this.seekBar || this.elements.timer) && a.ubind(this.uuid + ":timeupdate", function (a) {
            return function (c, d) {
                if (!a.dragging) {
                    var e = 0;
                    d.duration && (e = 100 * (d.currentTime / d.duration));
                    a.seekBar && a.seekBar.slider("value", e);
                    a.setTimeString("timer", d.currentTime)
                }
            }
        }(this)), this.seekBar && this.seekBar.slider({
            start: function (a) {
                return function () {
                    a.dragging = !0
                }
            }(this),
            stop: function (b) {
                return function (c, d) {
                    b.dragging = !1;
                    a.getDuration(function (b) {
                        a.seek(d.value / 100 * b)
                    })
                }
            }(this),
            slide: function (b) {
                return function (c, d) {
                    a.getDuration(function (c) {
                        c *= d.value / 100;
                        b.dragging || a.seek(c);
                        b.setTimeString("timer", c)
                    })
                }
            }(this)
        }), this.elements.mute && minplayer.click(this.elements.mute, function (b) {
            return function (c) {
                c.preventDefault();
                c = b.volumeBar.slider("option", "value");
                0 < c ? (b.vol = c, b.volumeBar.slider("value", 0), a.setVolume(0)) : (b.volumeBar.slider("value", b.vol), a.setVolume(b.vol / 100))
            }
        }(this)), this.volumeBar && (this.volumeBar.slider({
            slide: function (b, c) {
                a.setVolume(c.value / 100)
            }
        }), a.ubind(this.uuid + ":volumeupdate", function (a) {
            return function (c, d) {
                a.volumeBar.slider("value", 100 * d)
            }
        }(this)), a.getVolume(function (a) {
            return function (c) {
                a.volumeBar.slider("value", 100 * c)
            }
        }(this))))
    });
    this.ready()
};
minplayer.controller.prototype.setPlayPause = function (a) {
    this.elements.play && this.elements.play.css("display", a ? "inherit" : "none");
    this.elements.pause && this.elements.pause.css("display", a ? "none" : "inherit")
};
minplayer.controller.prototype.playPause = function (a, b) {
    var c = a ? "play" : "pause";
    this.display.trigger(c);
    this.setPlayPause(!a);
    if (b) b[c]()
};
minplayer.controller.prototype.setTimeString = function (a, b) {
    this.elements[a] && this.elements[a].text(minplayer.formatTime(b).time)
};
jQuery.fn.osmplayer || (jQuery.fn.osmplayer = function (a) {
    return jQuery(this).each(function () {
        a = a || {};
        a.id = a.id || jQuery(this).attr("id") || Math.random();
        minplayer.plugins[a.id] || (a.template = a.template || "default", osmplayer[a.template] ? new osmplayer[a.template](jQuery(this), a) : new osmplayer(jQuery(this), a))
    })
});
osmplayer = function (a, b) {
    minplayer.call(this, a, b)
};
osmplayer.prototype = new minplayer;
osmplayer.prototype.constructor = osmplayer;
osmplayer.prototype.create = function (a, b, c) {
    return minplayer.prototype.create.call(this, a, "osmplayer", c)
};
osmplayer.prototype.construct = function () {
    this.options = jQuery.extend({
        playlist: "",
        node: {},
        swfplayer: "minplayer/flash/minplayer.swf"
    }, this.options);
    minplayer.prototype.construct.call(this);
    this.playQueue = [];
    this.playIndex = 0;
    this.hasPlaylist = !1;
    this.create("playlist", "osmplayer");
    this.get("playlist", function (a) {
        this.hasPlaylist = !0;
        a.ubind(this.uuid + ":nodeLoad", function (a) {
            return function (c, d) {
                a.loadNode(d)
            }
        }(this))
    });
    this.get("media", function (a) {
        return function (b) {
            b.ubind(a.uuid + ":ended", function () {
                a.options.autoplay = !0;
                a.playNext()
            })
        }
    }(this));
    this.options.node && this.loadNode(this.options.node)
};
osmplayer.prototype.fullScreenElement = function () {
    return this.elements.minplayer
};
osmplayer.prototype.loadNode = function (a) {
    if (a && a.mediafiles) {
        var b = a.mediafiles.media;
        if (b) {
            this.playQueue.length = 0;
            this.playQueue = [];
            this.playIndex = 0;
            var c = null,
                d = [],
                d = minplayer.isAndroid || minplayer.isIDevice ? ["media"] : ["intro", "commercial", "prereel", "media", "postreel"];
            jQuery.each(d, function (a) {
                return function (d, h) {
                    if (c = a.addToQueue(b[h])) c.queueType = h
                }
            }(this))
        }
        osmplayer.getImage(a.mediafiles, "preview", function (a) {
            return function (b) {
                a.options.preview = b.path;
                a.playLoader && a.playLoader.initialize()
            }
        }(this));
        this.playNext()
    }
};
osmplayer.prototype.addToQueue = function (a) {
    (a = minplayer.getMediaFile(a)) && this.playQueue.push(a);
    return a
};
osmplayer.prototype.playNext = function () {
    this.playQueue.length > this.playIndex ? (this.load(this.playQueue[this.playIndex]), this.playIndex++) : this.options.repeat ? (this.playIndex = 0, this.playNext()) : 0 < this.playQueue.length ? this.hasPlaylist ? this.trigger("player_ended") : (this.options.autoplay = !1, this.playIndex = 0, this.playNext()) : this.media && this.media.stop()
};
osmplayer.getImage = function (a, b, c) {
    var d = "",
        e = a.image;
    if (e) if (e[b]) d = e[b];
    else if (e.image) d = e.image;
    else for (b in e) if (e.hasOwnProperty(b)) {
        d = e[b];
        break
    }
    if (d) c(new minplayer.file(d));
    else if (a = minplayer.getMediaFile(a.media.media))(d = minplayer.players[a.player]) && "function" === typeof d.getImage && d.getImage(a, b, function (a) {
        c(new minplayer.file(a))
    })
};
var osmplayer = osmplayer || {};
osmplayer.parser = osmplayer.parser || {};
osmplayer.parser["default"] = {
    priority: 1,
    valid: function () {
        return !0
    },
    getType: function () {
        return "json"
    },
    getFeed: function (a, b, c) {
        a = a.replace(/(.*)\??(.*)/i, "$1");
        return a = a + ("?start-index=" + b) + ("&max-results=" + c)
    },
    parse: function (a) {
        return a
    }
};
osmplayer = osmplayer || {};
osmplayer.parser = osmplayer.parser || {};
osmplayer.parser.youtube = {
    priority: 10,
    valid: function (a) {
        return 0 === a.search(/^http(s)?\:\/\/gdata\.youtube\.com/i)
    },
    getType: function () {
        return "jsonp"
    },
    getFeed: function (a, b, c) {
        a = a.replace(/(.*)\??(.*)/i, "$1");
        a = a + ("?start-index=" + (b + 1)) + ("&max-results=" + c);
        return a += "&v=2&alt=jsonc"
    },
    parse: function (a) {
        var a = a.data,
            b = {
                total_rows: a.totalItems,
                nodes: []
            },
            c;
        for (c in a.items) if (a.items.hasOwnProperty(c)) {
            var d = a.items[c];
            b.nodes.push({
                title: d.title,
                description: d.description,
                mediafiles: {
                    image: {
                        thumbnail: {
                            path: d.thumbnail.sqDefault
                        },
                        image: {
                            path: d.thumbnail.hqDefault
                        }
                    },
                    media: {
                        media: {
                            player: "youtube",
                            id: d.id
                        }
                    }
                }
            })
        }
        return b
    }
};
osmplayer = osmplayer || {};
osmplayer.parser = osmplayer.parser || {};
osmplayer.parser.rss = {
    priority: 8,
    valid: function (a) {
        a = a.replace(/(.*)\??(.*)/i, "$1");
        return null !== a.match(/\.rss$/i)
    },
    getType: function () {
        return "xml"
    },
    getFeed: function (a) {
        return a
    },
    parse: function (a) {
        var b = {
            total_rows: 0,
            nodes: []
        };
        jQuery("rss channel", a).find("item").each(function () {
            osmplayer.parser.rss.addRSSItem(b, jQuery(this))
        });
        return b
    },
    addRSSItem: function (a, b) {
        a.total_rows++;
        a.nodes.push({
            title: b.find("title").text(),
            description: b.find("annotation").text(),
            mediafiles: {
                image: {
                    image: {
                        path: b.find("image").text()
                    }
                },
                media: {
                    media: {
                        path: b.find("location").text()
                    }
                }
            }
        })
    }
};
osmplayer = osmplayer || {};
osmplayer.parser = osmplayer.parser || {};
osmplayer.parser.asx = {
    priority: 8,
    valid: function (a) {
        a = a.replace(/(.*)\??(.*)/i, "$1");
        return null !== a.match(/\.asx$/i)
    },
    getType: function () {
        return "xml"
    },
    getFeed: function (a) {
        return a
    },
    parse: function (a) {
        var b = {
            total_rows: 0,
            nodes: []
        };
        jQuery("asx entry", a).each(function () {
            osmplayer.parser.rss.addRSSItem(b, jQuery(this))
        });
        return b
    }
};
osmplayer = osmplayer || {};
osmplayer.parser = osmplayer.parser || {};
osmplayer.parser.xsfp = {
    priority: 8,
    valid: function (a) {
        a = a.replace(/(.*)\??(.*)/i, "$1");
        return null !== a.match(/\.xml$/i)
    },
    getType: function () {
        return "xml"
    },
    getFeed: function (a) {
        return a
    },
    parse: function (a) {
        var b = {
            total_rows: 0,
            nodes: []
        };
        jQuery("playlist trackList track", a).each(function () {
            osmplayer.parser.rss.addRSSItem(b, jQuery(this))
        });
        return b
    }
};
osmplayer = osmplayer || {};
osmplayer.playlist = function (a, b) {
    minplayer.display.call(this, "playlist", a, b)
};
osmplayer.playlist.prototype = new minplayer.display;
osmplayer.playlist.prototype.constructor = osmplayer.playlist;
osmplayer.playlist.prototype.construct = function () {
    this.options = jQuery.extend({
        vertical: !0,
        playlist: "",
        pageLimit: 10,
        autoNext: !0,
        shuffle: !1,
        loop: !1,
        hysteresis: 40,
        scrollSpeed: 20,
        scrollMode: "auto"
    }, this.options);
    minplayer.display.prototype.construct.call(this);
    this.nodes = [];
    this.page = -1;
    this.totalItems = 0;
    this.currentItem = -1;
    this.playqueue = [];
    this.playqueuepos = 0;
    this.playlist = this.options.playlist;
    this.scroll = null;
    this.orient = {
        pos: this.options.vertical ? "y" : "x",
        pagePos: this.options.vertical ? "pageY" : "pageX",
        offset: this.options.vertical ? "top" : "left",
        wrapperSize: this.options.vertical ? "wrapperH" : "wrapperW",
        minScroll: this.options.vertical ? "minScrollY" : "minScrollX",
        maxScroll: this.options.vertical ? "maxScrollY" : "maxScrollX",
        size: this.options.vertical ? "height" : "width"
    };
    this.pager = this.create("pager", "osmplayer");
    this.pager.ubind(this.uuid + ":nextPage", function (a) {
        return function () {
            a.nextPage()
        }
    }(this));
    this.pager.ubind(this.uuid + ":prevPage", function (a) {
        return function () {
            a.prevPage()
        }
    }(this));
    this.next() && this.options.autoNext && this.get("player", function (a) {
        a.ubind(this.uuid + ":player_ended", function (b) {
            return function () {
                a.options.autoplay = !0;
                b.next()
            }
        }(this))
    });
    this.ready()
};
osmplayer.playlist.prototype.scrollTo = function (a, b) {
    this.scroll && (this.scroll.options.hideScrollbar = !1, this.options.vertical ? this.scroll.scrollTo(0, a, 0, b) : this.scroll.scrollTo(a, 0, 0, b), this.scroll.options.hideScrollbar = !0)
};
osmplayer.playlist.prototype.refreshScroll = function () {
    if (window.addEventListener) {
        var a = this.elements.list,
            b = this.elements.scroll;
        this.scroll && (this.scroll.scrollTo(0, 0), this.scroll.destroy(), this.scroll = null, this.elements.list.unbind("mousemove").unbind("mouseenter").unbind("mouseleave"));
        if (!this.options.vertical) {
            var c = 0;
            jQuery.each(this.elements.list.children(), function () {
                c += jQuery(this).outerWidth()
            });
            this.elements.list.width(c)
        }
        0 < a.length && (0 < b.length && a[this.orient.size]() > b[this.orient.size]()) && (this.scroll = new iScroll(this.elements.scroll.eq(0)[0], {
            hScroll: !this.options.vertical,
            hScrollbar: !this.options.vertical,
            vScroll: this.options.vertical,
            vScrollbar: this.options.vertical,
            hideScrollbar: "none" !== this.options.scrollMode
        }), "auto" == this.options.scrollMode && !minplayer.hasTouch && this.elements.list.bind("mousemove", function (a) {
            return function (b) {
                b.preventDefault();
                var c = a.display.offset()[a.orient.offset];
                a.mousePos = b[a.orient.pagePos];
                a.mousePos -= c
            }
        }(this)).bind("mouseenter", function (a) {
            return function (b) {
                b.preventDefault();
                a.scrolling = !0;
                var c = function () {
                    if (a.scrolling) {
                        var b = a.scroll[a.orient.wrapperSize] / 2,
                            d = a.mousePos - b;
                        if (Math.abs(d) > a.options.hysteresis) {
                            var g = a.options.hysteresis,
                                d = a.options.scrollSpeed * (d + g * (0 < d ? -1 : 0)),
                                d = d / b,
                                b = a.scroll[a.orient.pos] - d,
                                g = a.scroll[a.orient.minScroll] || 0,
                                k = a.scroll[a.orient.maxScroll];
                            b >= g ? a.scrollTo(g) : b <= k ? a.scrollTo(k) : a.scrollTo(d, !0)
                        }
                        setTimeout(c, 30)
                    }
                };
                c()
            }
        }(this)).bind("mouseleave", function (a) {
            return function (b) {
                b.preventDefault();
                a.scrolling = !1
            }
        }(this)), this.scroll.refresh(), this.scroll.scrollTo(0, 0, 200))
    } else {
        var d = this;
        setTimeout(function () {
            d.refreshScroll.call(d)
        }, 200)
    }
};
osmplayer.playlist.prototype.set = function (a, b) {
    if ("object" !== typeof a) this.trigger("error", "Playlist must be an object to set");
    else if (a.hasOwnProperty("total_rows")) {
        if (a.total_rows && a.nodes.length) {
            this.totalItems = a.total_rows;
            this.currentItem = 0;
            (this.page + 1) * this.options.pageLimit >= this.totalItems ? this.pager.nextPage.hide() : this.pager.nextPage.show();
            var c = null,
                d = a.nodes.length;
            this.elements.list.empty();
            this.nodes = [];
            for (var e = 0; e < d; e++) c = this.create("teaser", "osmplayer", this.elements.list), c.setNode(a.nodes[e]), c.ubind(this.uuid + ":nodeLoad", function (a, b) {
                return function () {
                    a.loadItem(b)
                }
            }(this, e)), this.nodes.push(c), b === e && this.loadItem(e);
            this.refreshScroll();
            this.trigger("playlistLoad", a)
        }
        this.elements.playlist_busy && this.elements.playlist_busy.hide()
    } else this.trigger("error", "Unknown playlist format.")
};
osmplayer.playlist.prototype.setQueue = function () {
    this.playqueue.push({
        page: this.page,
        item: this.currentItem
    });
    this.playqueuepos = this.playqueue.length
};
osmplayer.playlist.prototype.next = function () {
    var a = 0,
        b = this.page;
    if (this.playqueuepos >= this.playqueue.length) {
        if (this.options.shuffle) return a = Math.floor(Math.random() * this.totalItems), b = Math.floor(a / this.options.pageLimit), a %= this.options.pageLimit, this.load(b, a);
        a = this.currentItem + 1;
        return a >= this.nodes.length ? this.load(b + 1, 0) : this.loadItem(a)
    }
    this.playqueuepos += 1;
    a = this.playqueue[this.playqueuepos];
    return this.load(a.page, a.item)
};
osmplayer.playlist.prototype.prev = function () {
    this.playqueuepos -= 1;
    this.playqueuepos = 0 > this.playqueuepos ? 0 : this.playqueuepos;
    var a = this.playqueue[this.playqueuepos];
    return a ? this.load(a.page, a.item) : !1
};
osmplayer.playlist.prototype.loadItem = function (a) {
    if (a < this.nodes.length) {
        this.setQueue();
        var b = this.nodes[this.currentItem];
        b.select(!1);
        this.currentItem = a;
        b = this.nodes[a];
        b.select(!0);
        this.trigger("nodeLoad", b.node);
        return !0
    }
    return !1
};
osmplayer.playlist.prototype.nextPage = function (a) {
    return this.load(this.page + 1, a)
};
osmplayer.playlist.prototype.prevPage = function (a) {
    return this.load(this.page - 1, a)
};
osmplayer.playlist.prototype.load = function (a, b) {
    if (this.playlist == this.options.playlist && a == this.page) return this.loadItem(b);
    this.playlist = this.options.playlist;
    if (!this.playlist) return !1;
    if (a > Math.floor(this.totalItems / this.options.pageLimit)) if (this.options.loop) b = a = 0;
    else return !1;
    this.elements.playlist_busy && this.elements.playlist_busy.show();
    a = a || 0;
    a = 0 > a ? 0 : a;
    this.setQueue();
    this.page = a;
    0 == this.page ? this.pager.prevPage.hide() : this.pager.prevPage.show();
    if ("object" == typeof this.playlist) return this.set(this.playlist, b), this.playlist.endpoint && (this.playlist = this.options.playlist = this.playlist.endpoint), !0;
    var c = osmplayer.parser["default"],
        d;
    for (d in osmplayer.parser) osmplayer.parser.hasOwnProperty(d) && osmplayer.parser[d].valid(this.playlist) && osmplayer.parser[d].priority > c.priority && (c = osmplayer.parser[d]);
    var e = this,
        g = this;
    d = {
        type: "GET",
        url: c.getFeed(this.playlist, this.page * this.options.pageLimit, this.options.pageLimit),
        success: function (a) {
            e.set(c.parse(a), b)
        },
        error: function (a, b) {
            g.elements.playlist_busy && g.elements.playlist_busy.hide();
            g.trigger("error", b)
        }
    };
    var h = "";
    if (h = c.getType()) d.dataType = h;
    jQuery.ajax(d);
    return !0
};
osmplayer = osmplayer || {};
osmplayer.pager = function (a, b) {
    minplayer.display.call(this, "pager", a, b)
};
osmplayer.pager.prototype = new minplayer.display;
osmplayer.pager.prototype.constructor = osmplayer.pager;
osmplayer.pager.prototype.construct = function () {
    minplayer.display.prototype.construct.call(this);
    this.elements.prevPage && (this.prevPage = this.elements.prevPage.click(function (a) {
        return function (b) {
            b.preventDefault();
            a.trigger("prevPage")
        }
    }(this)));
    this.elements.nextPage && (this.nextPage = this.elements.nextPage.click(function (a) {
        return function (b) {
            b.preventDefault();
            a.trigger("nextPage")
        }
    }(this)))
};
osmplayer = osmplayer || {};
osmplayer.teaser = function (a, b) {
    this.preview = null;
    minplayer.display.call(this, "teaser", a, b)
};
osmplayer.teaser.prototype = new minplayer.display;
osmplayer.teaser.prototype.constructor = osmplayer.teaser;
osmplayer.teaser.prototype.select = function () {};
osmplayer.teaser.prototype.setNode = function (a) {
    this.node = a;
    this.elements.title && this.elements.title.text(a.title);
    a.mediafiles && a.mediafiles.image && osmplayer.getImage(a.mediafiles, "thumbnail", function (a) {
        return function (c) {
            c && a.elements.image && (a.preview = new minplayer.image(a.elements.image), a.preview.load(c.path))
        }
    }(this));
    this.display.unbind("click").click(function (a) {
        return function (c) {
            c.preventDefault();
            a.trigger("nodeLoad", a.node)
        }
    }(this))
};