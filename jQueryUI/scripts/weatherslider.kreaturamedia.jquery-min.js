(function (a) {
    a.fn.weatherSlider = function (b) {
        if ((typeof b).match("object|undefined")) {
            return this.each(function (c) {
                new a.weatherSlider(this, b)
            })
        } else {
            return this.each(function (c) {
                var d = a(this).data("WeatherSlider");
                if (d && !d.g.isAnimating) {
                    if (typeof b == "number") {
                        d.change(b)
                    }
                }
            })
        }
    };
    a.weatherSlider = function (b, c) {
        var d = this;
        d.$el = a(b).addClass("ws-container");
        d.$el.data("WeatherSlider", d);
        d.init = function () {
            d.o = a.extend({}, a.weatherSlider.options, c);
            d.l = a.extend({}, a.weatherSlider.language);
            d.w = a.extend({}, a.weatherSlider.weatherTypes);
            d.g = a.extend({}, a.weatherSlider.global);
            if (a(b).width() > 1300) {
                a(b).css("width", 1300)
            }
            if (a(b).width() < 240) {
                a(b).css("width", 640)
            }
            if (a(b).height() > 600) {
                a(b).css("height", 600)
            }
            if (a(b).height() < 200) {
                a(b).css("height", 480)
            }
            if (a(b).css("position") == "static") {
                a(b).css("position", "relative")
            }
            d.g.sliderWidth = a(b).width();
            d.g.sliderHeight = a(b).height();
            d.g.bgPosY = (d.g.sliderHeight - 600) / 2;
            if (typeof d.o.reduction == "number") {
                d.o.reduction = d.o.reduction < 0 ? 0 : d.o.reduction;
                d.o.reduction = d.o.reduction > 1 ? 1 : d.o.reduction
            } else if (d.o.reduction == "auto") {
                d.o.reduction = d.g.sliderWidth / 900;
                d.o.reduction = d.o.reduction > 1 ? 1 : d.o.reduction
            } else {
                d.o.reduction = 1
            }
            if (d.o.locations) {
                d.g.locations = d.o.locations
            } else {
                d.g.locations = [];
                a(b).find(".ws-location").each(function () {
                    d.g.locations.push(a(this).html())
                })
            }
            if (d.g.locations.length > 1) {
                a('<a href="#"></a>').appendTo(a(b)).addClass("ws-nav ws-prev-arrow");
                a('<a href="#"></a>').appendTo(a(b)).addClass("ws-nav ws-next-arrow");
                a("<span></span>").appendTo(a(b).find(".ws-prev-arrow")).addClass("ws-prev-text");
                a("<span></span>").appendTo(a(b).find(".ws-next-arrow")).addClass("ws-next-text");
                a(b).find(".ws-prev-arrow, .ws-next-arrow").css({
                    backgroundImage: "url(" + d.o.imgPath + "sprite.png)"
                });
                a(b).find(".ws-prev-arrow").mousemove(function () {
                    a(this).find(".ws-prev-text").fadeIn(200)
                });
                a(b).find(".ws-prev-arrow").mouseleave(function () {
                    a(this).find(".ws-prev-text").fadeOut(200)
                });
                a(b).find(".ws-next-arrow").mousemove(function () {
                    a(this).find(".ws-next-text").fadeIn(200)
                });
                a(b).find(".ws-next-arrow").mouseleave(function () {
                    a(this).find(".ws-next-text").fadeOut(200)
                });
                a(b).find(".ws-prev-text, .ws-next-text").css({
                    width: a(b).width() * .6
                })
            }
            a("<div></div>").appendTo(a(b)).addClass("ws-inner");
            a("<div>" + d.l.get + ":<br><span></span></div>").appendTo(a(b)).addClass("ws-loading");
            var e = '<div class="ws-infobox">';
            e += '<div class="ws-bg"></div>';
            e += '<div class="ws-iinner"></div>';
            e += "</div>";
            a(e).appendTo(a(b).find(".ws-inner"));
            if ("ontouchstart" in window == false) {
                a(b).find(".ws-infobox").hover(function () {
                    if (d.g.locations.length > 1) {
                        if (!d.g.oldIE) {
                            a(b).find(".ws-nav").fadeOut(400)
                        } else {
                            a(b).find(".ws-nav").css("visibility", "hidden")
                        }
                    }
                    a(this).find(".ws-forecast").stop().animate({
                        height: a(this).find(".ws-finner").innerHeight()
                    }, 400, "easeInOutQuad")
                }, function () {
                    a(this).find(".ws-forecast").stop().animate({
                        height: 0
                    }, 200, "easeInOutQuad", function () {
                        if (d.g.locations.length > 1) {
                            if (!d.g.oldIE) {
                                a(b).find(".ws-nav").fadeIn(400)
                            } else {
                                a(b).find(".ws-nav").css("visibility", "visible")
                            }
                        }
                    })
                })
            } else {
                a(b).find(".ws-infobox").bind("touchstart", function (a) {
                    var b = a.touches ? a.touches : a.originalEvent.touches;
                    if (b.length == 1) {
                        d.g.touchStartInfoY = d.g.touchEndInfoY = b[0].clientY
                    }
                });
                a(b).find(".ws-infobox").bind("touchmove", function (c) {
                    c.preventDefault();
                    var e = c.touches ? c.touches : c.originalEvent.touches;
                    if (e.length == 1) {
                        d.g.touchEndInfoY = e[0].clientY;
                        if (d.g.touchStartInfoY - d.g.touchEndInfoY > 0 && a(b).find(".ws-infobox .ws-forecast").height() < a(b).find(".ws-infobox .ws-forecast .ws-finner").innerHeight()) {
                            a(b).find(".ws-infobox .ws-forecast").css({
                                height: d.g.touchStartInfoY - d.g.touchEndInfoY
                            })
                        }
                        if (d.g.touchStartInfoY - d.g.touchEndInfoY < 0 && a(b).find(".ws-infobox .ws-forecast").height() > 0) {
                            a(b).find(".ws-infobox .ws-forecast").css({
                                height: a(b).find(".ws-infobox .ws-forecast").height() + d.g.touchStartInfoY - d.g.touchEndInfoY
                            })
                        }
                    }
                });
                a(b).find(".ws-infobox").bind("touchend", function (c) {
                    if (d.g.touchStartInfoY - d.g.touchEndInfoY > 0) {
                        a(b).find(".ws-nav").fadeOut(400);
                        a(b).find(".ws-infobox .ws-forecast").stop().animate({
                            height: a(this).find(".ws-finner").innerHeight()
                        }, 400, "easeInOutQuad")
                    } else {
                        a(b).find(".ws-infobox .ws-forecast").stop().animate({
                            height: 0
                        }, 200, "easeInOutQuad", function () {
                            if (d.g.locations.length > 1) {
                                a(b).find(".ws-nav").fadeIn(400)
                            }
                        })
                    }
                })
            }
            if (d.o.keybNav) {
                a("body").bind("keydown", function (c) {
                    if (!d.g.isAnimating) {
                        if (c.which == 37) {
                            a(b).find(".ws-prev-arrow").click()
                        } else if (c.which == 39) {
                            a(b).find(".ws-next-arrow").click()
                        }
                    }
                })
            }
            if ("ontouchstart" in window) {
                a(b).bind("touchstart", function (a) {
                    var b = a.touches ? a.touches : a.originalEvent.touches;
                    if (b.length == 1) {
                        d.g.touchStartX = d.g.touchEndX = b[0].clientX
                    }
                });
                a(b).bind("touchmove", function (c) {
                    var e = c.touches ? c.touches : c.originalEvent.touches;
                    if (e.length == 1) {
                        d.g.touchEndX = e[0].clientX;
                        a(b).find(".ws-fullbg, .ws-bottombg, .ws-rain, .ws-snow, .ws-clouds, .ws-sunmoon, .ws-fog, .ws-icy").css({
                            opacity: a(b).width() / (a(b).width() + Math.abs(d.g.touchStartX - d.g.touchEndX) * 3)
                        });
                        if (Math.abs(d.g.touchStartX - d.g.touchEndX) > 45) {
                            c.preventDefault()
                        }
                    }
                });
                a(b).bind("touchend", function (c) {
                    if (Math.abs(d.g.touchStartX - d.g.touchEndX) > 45) {
                        if (d.g.touchStartX - d.g.touchEndX > 0) {
                            a(b).find(".ws-prev-arrow").click()
                        } else {
                            a(b).find(".ws-next-arrow").click()
                        }
                    } else {
                        a(b).find(".ws-fullbg, .ws-bottombg, .ws-rain, .ws-snow, .ws-clouds, .ws-sunmoon, .ws-fog, .ws-icy").css({
                            opacity: 1
                        })
                    }
                })
            }
            a.getScript("http://google.com/jsapi", function () {
                if (google.loader.ClientLocation) {
                    d.g.curLocation = google.loader.ClientLocation.address.city + ", " + google.loader.ClientLocation.address.country
                } else {
                    d.g.curLocation = d.l.una
                }
                d.change(0)
            })
        };
        d.change = function (c) {
            d.g.isAnimating = true;
            if (a(b).find(".ws-infobox h1").length) {
                a(b).find(".ws-lightnings").stop().remove();
                if (!d.g.oldIE) {
                    a(b).find(".ws-fullbg, .ws-bottombg, .ws-rain, .ws-snow, .ws-clouds, .ws-sunmoon, .ws-fog, .ws-icy").stop().each(function () {
                        a(this).fadeOut(400, function () {
                            a(this).remove()
                        })
                    })
                } else {
                    a(b).find(".ws-bottombg, .ws-rain, .ws-snow, .ws-clouds, .ws-sunmoon, .ws-fog, .ws-icy").stop().remove();
                    a(b).stop().find(".ws-fullbg").fadeOut(400, function () {
                        a(this).remove()
                    })
                }
                if (!d.g.oldIE) {
                    a(b).find(".ws-nav").fadeOut(500)
                } else {
                    a(b).find(".ws-nav").fadeOut(1)
                }
                a(b).find(".ws-infobox").animate({
                    marginBottom: -(a(b).find(".ws-infobox").outerHeight() - 20)
                }, d.o.infoDuration, d.o.infoEasingType[1], function () {
                    a(this).find(".ws-iinner *").remove();
                    d.getWeather(c)
                })
            } else {
                d.getWeather(c)
            }
        };
        d.getWeather = function (c) {
            function i(a, b, c, d, e, f) {
                var g = new Date(Date.UTC(a, b - 1, c, d, e, f));
                return g.getTime() / 1e3
            }
            var e = d.g.locations[c];
            if (e.indexOf("GEOLOCATION") != -1) {
                e = d.g.curLocation
            }
            a(b).find(".ws-loading span").html(e);
            a(b).find(".ws-loading").fadeIn(500);
            var f = "http://free.worldweatheronline.com/feed/weather.ashx";
            f += "?key=" + d.o.WWOAPIKey + "";
            f += "&format=json";
            f += "&q=" + encodeURIComponent(e) + "";
            f += "&num_of_days=5";
            f += "&callback=?";
            var g = function (a) {
                return Math.round(a / 1.609344)
            };
            var h = function (a) {
                return Math.round(a * .03937 * 1e4) / 1e4
            };
            a.getJSON(f, function (j) {
                var k = j["data"];
                if (k["current_condition"]) {
                    var m = k["current_condition"][0];
                    var n;
                    var o = {
                        location: e,
                        current_condition: {
                            weather: {
                                condition: d.l[m["weatherCode"]],
                                icon: m["weatherIconUrl"][0]["value"],
                                code: m["weatherCode"]
                            },
                            temperature: {
                                metric: m["temp_C"],
                                imperial: m["temp_F"]
                            },
                            humidity: m["humidity"],
                            precipitation: {
                                metric: m["precipMM"],
                                imperial: h(parseInt(m["precipMM"]))
                            },
                            wind: {
                                speed: {
                                    metric: m["windspeedKmph"],
                                    imperial: m["windspeedMiles"]
                                },
                                direction: m["winddir16Point"]
                            },
                            pressure: m["pressure"],
                            visibility: {
                                metric: m["visibility"],
                                imperial: g(parseInt(m["visibility"]))
                            }
                        }
                    };
                    o["forecast"] = [];
                    for (var p = 0; p < 5; p++) {
                        n = k["weather"][p];
                        o.forecast[p] = {
                            temperature: {
                                high: {
                                    metric: n["tempMaxC"],
                                    imperial: n["tempMaxF"]
                                },
                                low: {
                                    metric: n["tempMinC"],
                                    imperial: n["tempMinF"]
                                }
                            },
                            weather: {
                                code: n["weatherCode"],
                                condition: d.l[n["weatherCode"]]
                            }
                        }
                    }
                    f = "http://www.worldweatheronline.com/feed/tz.ashx";
                    f += "?key=" + d.o.WWOAPIKey + "";
                    f += "&format=json";
                    f += "&q=" + encodeURIComponent(e);
                    f += "&callback=?";
                    a.getJSON(f, function (a) {
                        o["time"] = a["data"].time_zone[0].localtime.split(" ")[1];
                        var b = a["data"].time_zone[0].localtime.split(" ")[0].split("-");
                        var e = a["data"].time_zone[0].localtime.split(" ")[1].split(":");
                        var f = i(b[0], b[1], b[2], e[0], e[1], 0);
                        var g = new Date;
                        g.setTime(f * 1e3);
                        o["day"] = g.getDay();
                        var h = m["weatherIconUrl"][0]["value"];
                        var j = m["weatherCode"];
                        if (h.indexOf("_night") != -1 || j != 122 && h.indexOf("_black") != -1) {
                            o["current_condition"]["daytime"] = "night"
                        } else {
                            if (parseFloat(e[0]) < d.o.daytime[0] || parseFloat(e[0]) > d.o.daytime[1] - 1) {
                                o["current_condition"]["daytime"] = "night"
                            } else {
                                o["current_condition"]["daytime"] = "day"
                            }
                        }
                        if (j == "113") {
                            switch (o["current_condition"]["daytime"]) {
                            case "day":
                                o["current_condition"]["weather"]["condition"] = d.l["114"];
                                break;
                            case "night":
                                o["current_condition"]["weather"]["condition"] = d.l["115"];
                                break
                            }
                        }
                        d.parseData(o, c)
                    })
                } else {
                    var q = a(b).find(".ws-loading span").html();
                    a(b).find(".ws-loading span").html(d.l.not + ":<br>" + q);
                    d.g.isAnimating = false;
                    d.prevNext(c)
                }
            })
        };
        d.parseData = function (c, e) {
            var f = c.location;
            var g = parseFloat(c.time.split(":")[0]);
            var h = c.time.split(":")[1];
            var i = d.g.m[d.o.measurement];
            var j = c.current_condition.temperature[d.o.measurement];
            var k = c.forecast[0].temperature.high[d.o.measurement];
            var l = c.forecast[0].temperature.low[d.o.measurement];
            var m = c.current_condition.wind.speed[d.o.measurement];
            var n = c.current_condition.visibility[d.o.measurement];
            var o = c.current_condition.precipitation[d.o.measurement];
            var p = c.current_condition.weather.condition;
            var q = "<h1>" + f + " <span>" + g + ":" + h + "</span></h1>";
            q += '<p class="ws-weather">' + p + " " + j + " °" + i.t + "</p>";
            q += '<p class="ws-line">' + d.l.ht + ": " + k + " °" + i.t + ", " + d.l.lt + ": " + l + " °" + i.t + ", " + d.l.hu + ": " + c.current_condition.humidity + "%</p>";
            q += '<p class="ws-line">' + d.l.pr + ": " + o + " " + i.pr + ", " + d.l.wi + ": " + c.current_condition.wind.direction + ", " + m + " " + i.s + "</p>";
            q += '<p class="ws-line">' + d.l.ps + ": " + c.current_condition.pressure + " " + i.p + ", " + d.l.vi + ": " + n + " " + i.l + "</p>";
            var r = (d.l.day + "," + d.l.day).split(",");
            q += '<div class="ws-forecast"><div class="ws-finner">';
            for (var s = 1; s < 4; s++) {
                k = c.forecast[s].temperature.high[d.o.measurement];
                l = c.forecast[s].temperature.low[d.o.measurement];
                q += '<p class="ws-line ws-fline">' + r[c.day + s] + "</p>";
                q += '<p class="ws-line">' + c.forecast[s].weather.condition + "</p>";
                q += '<p class="ws-line">' + d.l.ht + ": " + k + " °" + i.t + ", " + d.l.lt + ": " + l + " °" + i.t + "</p>"
            }
            q += "</div></div>";
            a(q).appendTo(a(b).find(".ws-iinner"));
            if (d.o.wind == true) {
                d.g.windy = parseInt(c.current_condition.wind.speed.metric) > d.o.windyWeather ? true : false
            } else {
                d.g.windy = false
            }
            if (d.o.forcewindy) {
                d.g.windy = d.o.forcewindy
            }
            if (d.o.windDirection == "left") {
                d.g.winDir = -1
            } else if (d.o.windDirection == "right") {
                d.g.winDir = 1
            } else if (d.o.windDirection == "auto") {
                if (c.current_condition.wind.direction.indexOf("W") != -1) {
                    d.g.winDir = -1
                } else {
                    d.g.winDir = 1
                }
            }
            a(b).find(".ws-loading").fadeOut(750);
            d.makeWeather(c["current_condition"]["weather"]["code"], c["current_condition"]["daytime"], c["current_condition"]["temperature"]["metric"]);
            d.prevNext(e)
        };
        d.prevNext = function (c) {
            if (d.g.locations.length > 1) {
                var e = c > 0 ? c - 1 : d.g.locations.length - 1;
                var f = c < d.g.locations.length - 1 ? c + 1 : 0;
                var g = d.g.locations[e].split(",")[0].indexOf("GEOLOCATION") != -1 ? d.g.curLocation.split(",")[0] + " (" + d.l.cl + ")" : d.g.locations[e].split(",")[0];
                var h = d.g.locations[f].split(",")[0].indexOf("GEOLOCATION") != -1 ? d.g.curLocation.split(",")[0] + " (" + d.l.cl + ")" : d.g.locations[f].split(",")[0];
                a(b).find(".ws-prev-text").html(g);
                a(b).find(".ws-next-text").html(h);
                a(b).find(".ws-prev-arrow, .ws-next-arrow").unbind("click");
                a(b).find(".ws-prev-arrow").click(function (c) {
                    c.preventDefault();
                    a(this).mouseleave();
                    a(b).weatherSlider(e)
                });
                a(b).find(".ws-next-arrow").click(function (c) {
                    c.preventDefault();
                    a(this).mouseleave();
                    a(b).weatherSlider(f)
                });
                if (!d.g.oldIE) {
                    a(b).find(".ws-nav").delay(1e3).fadeIn(500)
                } else {
                    a(b).find(".ws-nav").delay(1e3).fadeIn(1)
                }
            }
        };
        d.makeWeather = function (c, e, f) {
            if (d.o.forcewcode) {
                c = d.o.forcewcode
            }
            if (d.o.forcedaytime) {
                e = d.o.forcedaytime
            }
            if (d.o.forcecurtemp) {
                f = d.o.forcecurtemp
            }
            switch (parseInt(c)) {
            case 113:
                switch (e) {
                case "day":
                    d.create("clear_day");
                    d.create("sun");
                    break;
                case "night":
                    d.create("clear_night");
                    d.create("moon");
                    break
                }
                break;
            case 116:
                switch (e) {
                case "day":
                    d.create("white_cloudy_day");
                    d.create("white_cloud_day_1");
                    d.create("white_cloud_day_2");
                    d.create("white_cloud_day_3");
                    d.create("white_cloud_day_4");
                    d.create("sun");
                    break;
                case "night":
                    d.create("starry_sky");
                    d.create("cloudy_night");
                    d.create("dark_cloud_night_3");
                    d.create("dark_cloud_night_4");
                    d.create("moon");
                    break
                }
                break;
            case 119:
                switch (e) {
                case "day":
                    d.create("grey_cloudy_day");
                    d.create("grey_cloud_day_1");
                    d.create("grey_cloud_day_2");
                    d.create("grey_cloud_day_3");
                    d.create("grey_cloud_day_4");
                    d.create("sun");
                    break;
                case "night":
                    d.create("starry_sky");
                    d.create("cloudy_night");
                    d.create("dark_cloud_night_1");
                    d.create("dark_cloud_night_2");
                    d.create("dark_cloud_night_3");
                    d.create("dark_cloud_night_4");
                    d.create("moon");
                    break
                }
                break;
            case 122:
                switch (e) {
                case "day":
                    d.create("dark_cloudy_day");
                    d.create("dark_cloud_day_1");
                    d.create("dark_cloud_day_2");
                    d.create("dark_cloud_day_3");
                    d.create("dark_cloud_day_4");
                    break;
                case "night":
                    d.create("starry_sky");
                    d.create("cloudy_night");
                    d.create("dark_cloud_night_1");
                    d.create("dark_cloud_night_2");
                    d.create("dark_cloud_night_3");
                    d.create("dark_cloud_night_4");
                    break
                }
                break;
            case 260:
            case 248:
            case 143:
                switch (e) {
                case "day":
                    d.create("foggy_day");
                    d.create("fog_day");
                    break;
                case "night":
                    d.create("foggy_night");
                    d.create("fog_night");
                    break
                }
                break;
            case 386:
                d.create("lightning1");
                d.create("lightning2");
                d.create("lightning3");
                d.create("lightning4");
            case 266:
            case 263:
            case 296:
            case 176:
            case 293:
            case 353:
                switch (e) {
                case "day":
                    d.create("grey_cloudy_day");
                    d.create("grey_cloud_day_1");
                    d.create("grey_cloud_day_2");
                    d.create("grey_cloud_day_3");
                    d.create("grey_cloud_day_4");
                    d.create("rain_day");
                    break;
                case "night":
                    d.create("starry_sky");
                    d.create("cloudy_night");
                    d.create("dark_cloud_night_1");
                    d.create("dark_cloud_night_2");
                    d.create("dark_cloud_night_3");
                    d.create("dark_cloud_night_4");
                    d.create("rain_night");
                    break
                }
                d.create("raindrops");
                break;
            case 302:
            case 299:
            case 356:
                switch (e) {
                case "day":
                    d.create("grey_cloudy_day");
                    d.create("dark_cloud_day_1");
                    d.create("dark_cloud_day_2");
                    d.create("dark_cloud_day_3");
                    d.create("dark_cloud_day_4");
                    d.create("rain_day");
                    break;
                case "night":
                    d.create("starry_sky");
                    d.create("cloudy_night");
                    d.create("dark_cloud_night_1");
                    d.create("dark_cloud_night_2");
                    d.create("dark_cloud_night_3");
                    d.create("dark_cloud_night_4");
                    d.create("rain_night");
                    break
                }
                d.create("raindrops");
                break;
            case 389:
            case 200:
                switch (e) {
                case "day":
                    d.create("dark_cloudy_day");
                    d.create("dark_cloud_day_1");
                    d.create("dark_cloud_day_2");
                    d.create("dark_cloud_day_3");
                    d.create("dark_cloud_day_4");
                    d.create("rain_day");
                    break;
                case "night":
                    d.create("starry_sky");
                    d.create("cloudy_night");
                    d.create("dark_cloud_night_1");
                    d.create("dark_cloud_night_2");
                    d.create("dark_cloud_night_3");
                    d.create("dark_cloud_night_4");
                    d.create("rain_night");
                    break
                }
                d.create("lightning1");
                d.create("lightning2");
                d.create("lightning3");
                d.create("lightning4");
                d.create("raindrops");
                break;
            case 308:
            case 305:
            case 359:
                switch (e) {
                case "day":
                    d.create("dark_cloudy_day");
                    d.create("dark_cloud_day_1");
                    d.create("dark_cloud_day_2");
                    d.create("dark_cloud_day_3");
                    d.create("dark_cloud_day_4");
                    d.create("rain_day");
                    break;
                case "night":
                    d.create("starry_sky");
                    d.create("cloudy_night");
                    d.create("dark_cloud_night_1");
                    d.create("dark_cloud_night_2");
                    d.create("dark_cloud_night_3");
                    d.create("dark_cloud_night_4");
                    d.create("rain_night");
                    break
                }
                d.create("raindrops");
                break;
            case 392:
            case 317:
            case 182:
            case 311:
            case 362:
            case 281:
            case 374:
            case 350:
            case 185:
                switch (e) {
                case "day":
                    d.create("grey_cloudy_day");
                    d.create("grey_cloud_day_1");
                    d.create("grey_cloud_day_2");
                    d.create("grey_cloud_day_3");
                    d.create("grey_cloud_day_4");
                    d.create("rain_day");
                    d.create("snow_big_day");
                    d.create("snow_small_day");
                    break;
                case "night":
                    d.create("starry_sky");
                    d.create("cloudy_night");
                    d.create("dark_cloud_night_1");
                    d.create("dark_cloud_night_2");
                    d.create("dark_cloud_night_3");
                    d.create("dark_cloud_night_4");
                    d.create("rain_night");
                    d.create("snow_big_night");
                    d.create("snow_small_night");
                    break
                }
                d.create("raindrops");
                break;
            case 314:
            case 320:
            case 365:
            case 377:
            case 395:
            case 284:
                switch (e) {
                case "day":
                    d.create("dark_cloudy_day");
                    d.create("dark_cloud_day_1");
                    d.create("dark_cloud_day_2");
                    d.create("dark_cloud_day_3");
                    d.create("dark_cloud_day_4");
                    d.create("rain_day");
                    d.create("snow_big_day");
                    d.create("snow_small_day");
                    break;
                case "night":
                    d.create("starry_sky");
                    d.create("cloudy_night");
                    d.create("dark_cloud_night_1");
                    d.create("dark_cloud_night_2");
                    d.create("dark_cloud_night_3");
                    d.create("dark_cloud_night_4");
                    d.create("rain_night");
                    d.create("snow_big_night");
                    d.create("snow_small_night");
                    break
                }
                d.create("raindrops");
                break;
            case 323:
            case 326:
            case 368:
            case 179:
                switch (e) {
                case "day":
                    d.create("grey_cloudy_day");
                    d.create("grey_cloud_day_1");
                    d.create("grey_cloud_day_2");
                    d.create("grey_cloud_day_3");
                    d.create("grey_cloud_day_4");
                    d.create("snow_big_day");
                    d.create("snow_small_day");
                    break;
                case "night":
                    d.create("starry_sky");
                    d.create("cloudy_night");
                    d.create("dark_cloud_night_1");
                    d.create("dark_cloud_night_2");
                    d.create("dark_cloud_night_3");
                    d.create("dark_cloud_night_4");
                    d.create("snow_big_night");
                    d.create("snow_small_night");
                    break
                }
                break;
            case 329:
            case 332:
            case 335:
            case 338:
                switch (e) {
                case "day":
                    d.create("grey_cloudy_day");
                    d.create("dark_cloud_day_1");
                    d.create("dark_cloud_day_2");
                    d.create("dark_cloud_day_3");
                    d.create("dark_cloud_day_4");
                    d.create("snow_big_day");
                    d.create("snow_small_day");
                    break;
                case "night":
                    d.create("starry_sky");
                    d.create("cloudy_night");
                    d.create("dark_cloud_night_1");
                    d.create("dark_cloud_night_2");
                    d.create("dark_cloud_night_3");
                    d.create("dark_cloud_night_4");
                    d.create("snow_big_night");
                    d.create("snow_small_night");
                    break
                }
                break;
            case 371:
            case 227:
            case 230:
                switch (e) {
                case "day":
                    d.create("dark_cloudy_day");
                    d.create("dark_cloud_day_1");
                    d.create("dark_cloud_day_2");
                    d.create("dark_cloud_day_3");
                    d.create("dark_cloud_day_4");
                    d.create("snow_big_day");
                    d.create("snow_small_day");
                    break;
                case "night":
                    d.create("starry_sky");
                    d.create("cloudy_night");
                    d.create("dark_cloud_night_1");
                    d.create("dark_cloud_night_2");
                    d.create("dark_cloud_night_3");
                    d.create("dark_cloud_night_4");
                    d.create("snow_big_night");
                    d.create("snow_small_night");
                    break
                }
                break
            }
            if (f < d.o.icyTemp) {
                switch (e) {
                case "day":
                    d.create("icy_day_left");
                    d.create("icy_day_right");
                    break;
                case "night":
                    d.create("icy_night_left");
                    d.create("icy_night_right");
                    break
                }
            }
            d.animateIn(a(b).find(".ws-infobox"))
        };
        d.create = function (c) {
            if (d.w[c]) {
                if (d.w[c].where) {
                    var e = a(b).find(d.w[c].where)
                } else {
                    var e = a(b)
                }
                if (d.w[c].type == "bg") {
                    a("<img>").load(function () {
                        var b = a("<div>").appendTo(e).addClass(d.w[c].classNames).css({
                            backgroundImage: "url(" + d.o.imgPath + d.w[c].fileName + ")"
                        });
                        d.animateIn(b, c)
                    }).attr("src", d.o.imgPath + d.w[c].fileName)
                } else {
                    var f = a("<img>").css("visibility", "hidden").appendTo(e).unbind().bind("load", function () {
                        a(this).addClass(d.w[c].classNames).css({
                            height: a(this).height() * d.o.reduction,
                            marginLeft: (parseInt(a(this).css("margin-left")) - d.w[c].mL) * d.o.reduction,
                            marginTop: (parseInt(a(this).css("margin-top")) - d.w[c].mT) * d.o.reduction,
                            visibility: "visible"
                        });
                        if (!d.g.oldIE && !a(this).hasClass("ws-lightnings")) {
                            a(this).css({
                                opacity: 0
                            })
                        }
                        d.animateIn(f, c)
                    }).attr("src", d.o.imgPath + d.w[c]["fileName"] + "?" + Math.random() * 1e6)
                }
            }
        };
        d.animateIn = function (c, e) {
            if (c.hasClass("ws-fullbg")) {
                c.css({
                    backgroundPosition: "0px " + d.g.bgPosY + "px"
                }).fadeIn(1500, function () {
                    d.g.isAnimating = false
                });
                if (d.g.windy && !c.hasClass("ws-fixed")) {
                    if (d.o.CSSanimations && d.g.css3) {
                        c.addClass("ws-fullbg-animating")
                    } else if (d.o.JSanimations) {
                        d.animateJS(c, "ws-fullbg")
                    }
                }
            } else if (c.hasClass("ws-bottombg")) {
                c.animate({
                    marginBottom: 0
                }, 1e3, "easeOutQuad");
                if (d.g.windy) {
                    if (d.o.CSSanimations && d.g.css3) {
                        c.addClass("ws-bottombg-animating")
                    } else if (d.o.JSanimations) {
                        d.animateJS(c, "ws-bottombg")
                    }
                }
            } else if (c.hasClass("ws-rain")) {
                if (!d.g.oldIE) {
                    c.dequeue().delay(1e3).animate({
                        opacity: 1
                    }, 4e3, "easeOutQuad")
                }
                if (d.o.rain) {
                    if (d.o.CSSanimations && d.g.css3) {
                        c.addClass("ws-rain-animating")
                    } else if (d.o.JSanimations) {
                        d.animateJS(c, "ws-rain")
                    }
                }
            } else if (c.hasClass("ws-snow")) {
                if (!d.g.oldIE) {
                    c.dequeue().delay(1e3).animate({
                        opacity: 1
                    }, 4e3, "easeOutQuad")
                }
                if (d.o.snow) {
                    if (d.o.CSSanimations && d.g.css3) {
                        if (c.hasClass("ws-snow-big")) {
                            c.addClass("ws-snowbig-animating")
                        } else if (c.hasClass("ws-snow-small")) {
                            c.addClass("ws-snowsmall-animating")
                        }
                    } else if (d.o.JSanimations) {
                        if (c.hasClass("ws-snow-big")) {
                            d.animateJS(c, "ws-snow-big")
                        } else if (c.hasClass("ws-snow-small")) {
                            d.animateJS(c, "ws-snow-small")
                        }
                    }
                }
            } else if (c.hasClass("ws-clouds") || c.hasClass("ws-sunmoon") || c.hasClass("ws-fog") || c.hasClass("ws-icy")) {
                if (!d.g.oldIE) {
                    c.animate({
                        opacity: 1,
                        marginLeft: "+=" + d.w[e].mL * d.o.reduction,
                        marginTop: "+=" + d.w[e].mT * d.o.reduction
                    }, 2e3, "easeInOutQuint")
                } else {
                    c.animate({
                        marginLeft: "+=" + d.w[e].mL * d.o.reduction,
                        marginTop: "+=" + d.w[e].mT * d.o.reduction
                    }, 2e3, "easeOutQuint")
                }
            } else if (c.hasClass("ws-lightnings") && d.o.lightnings) {
                if (d.o.CSSanimations || d.o.JSanimations) {
                    if (c.hasClass("ws-lightning1")) {
                        d.animateJS(c, "ws-lightning1")
                    } else if (c.hasClass("ws-lightning2")) {
                        d.animateJS(c, "ws-lightning2")
                    } else if (c.hasClass("ws-lightning3")) {
                        d.animateJS(c, "ws-lightning3")
                    } else if (c.hasClass("ws-lightning4")) {
                        d.animateJS(c, "ws-lightning4")
                    }
                } else {
                    a(b).find(".ws-lightning2").css("display", "block")
                }
            } else if (c.hasClass("ws-infobox")) {
                if (d.g.sliderWidth < 500) {
                    c.find("h1, h1 span, .ws-weather, .ws-line").each(function () {
                        var b = parseInt(parseInt(a(this).css("font-size")) / 500 * d.g.sliderWidth);
                        b = b < 11 ? 11 : b;
                        a(this).css({
                            fontSize: b + "px"
                        })
                    });
                    var f = parseInt(parseInt(c.css("padding-left")) / 500 * d.g.sliderWidth);
                    f = f < 7 ? 7 : f;
                    var g = parseInt(parseInt(c.css("bottom")) / 500 * d.g.sliderWidth);
                    g = g < 5 ? 5 : g;
                    c.css({
                        padding: f,
                        bottom: g
                    });
                    f = parseInt(parseInt(c.find("h1").css("padding-bottom")) / 500 * d.g.sliderWidth);
                    f = f < 1 ? 1 : f;
                    c.find("h1").css("padding-bottom", f)
                }
                if (c.width() > d.g.sliderWidth - 20) {
                    c.find("p").css({
                        width: d.g.sliderWidth * .9,
                        whiteSpace: "normal"
                    })
                }
                c.css({
                    marginLeft: -c.outerWidth() / 2,
                    marginBottom: -c.outerHeight() - 20
                }).delay(500).animate({
                    marginBottom: 0
                }, d.o.infoDuration, d.o.infoEasingType[0])
            }
        };
        d.getRand = function () {
            return (Math.floor(Math.random() * 10) + 5) * 1e3
        };
        d.animateJS = function (b, c) {
            switch (c) {
            case "ws-fullbg":
                var e = function () {
                    b.dequeue().animate({
                        backgroundPosition: d.g.winDir * 1300 + "px " + d.g.bgPosY + "px"
                    }, 1e5, "linear", function () {
                        a(this).css({
                            backgroundPosition: "0 " + (d.g.sliderHeight - 600) / 2
                        });
                        e()
                    })
                };
                e();
                break;
            case "ws-bottombg":
                var f = function () {
                    b.dequeue().animate({
                        backgroundPosition: d.g.winDir * 1137 + "px 0px"
                    }, 2e5, "linear", function () {
                        a(this).css({
                            backgroundPosition: "0 0"
                        });
                        f()
                    })
                };
                f();
                break;
            case "ws-rain":
                var g = function () {
                    b.dequeue().animate({
                        backgroundPosition: "0 200"
                    }, 1e3, "linear", function () {
                        b.css({
                            backgroundPosition: "0 0"
                        });
                        g()
                    })
                };
                g();
                break;
            case "ws-snow-small":
                var h = function () {
                    b.dequeue().animate({
                        backgroundPosition: "0 200"
                    }, 3e3, "linear", function () {
                        b.css({
                            backgroundPosition: "0 0"
                        });
                        h()
                    })
                };
                h();
                break;
            case "ws-snow-big":
                var i = function () {
                    b.dequeue().animate({
                        backgroundPosition: "0 200"
                    }, 5e3, "linear", function () {
                        b.css({
                            backgroundPosition: "0 0"
                        });
                        i()
                    })
                };
                i();
                break;
            case "ws-lightning1":
                var j = function () {
                    if (!d.g.oldIE) {
                        b.delay(d.getRand()).fadeIn(1).fadeOut(250, function () {
                            j()
                        })
                    } else {
                        b.delay(d.getRand()).fadeIn(0).delay(100).fadeOut(0, function () {
                            j()
                        })
                    }
                };
                j();
                break;
            case "ws-lightning2":
                var k = function () {
                    if (!d.g.oldIE) {
                        b.delay(d.getRand()).fadeIn(1).fadeOut(250, function () {
                            k()
                        })
                    } else {
                        b.delay(d.getRand()).fadeIn(0).delay(100).fadeOut(0, function () {
                            k()
                        })
                    }
                };
                k();
                break;
            case "ws-lightning3":
                var l = function () {
                    if (!d.g.oldIE) {
                        b.delay(d.getRand()).fadeIn(30).fadeOut(30).fadeIn(30).fadeOut(30).fadeIn(30).fadeOut(250, function () {
                            l()
                        })
                    } else {
                        b.delay(d.getRand()).fadeIn(0).delay(30).fadeOut(0).delay(30).fadeIn(0).delay(30).fadeOut(0).delay(30).fadeIn(0).delay(100).fadeOut(0, function () {
                            l()
                        })
                    }
                };
                l();
                break;
            case "ws-lightning4":
                var m = function () {
                    if (!d.g.oldIE) {
                        b.delay(d.getRand()).fadeIn(30).fadeOut(30).fadeIn(30).fadeOut(30).fadeIn(30).fadeOut(250, function () {
                            m()
                        })
                    } else {
                        b.delay(d.getRand()).fadeIn(0).delay(30).fadeOut(0).delay(30).fadeIn(0).delay(30).fadeOut(0).delay(30).fadeIn(0).delay(100).fadeOut(0, function () {
                            m()
                        })
                    }
                };
                m();
                break
            }
        };
        d.init()
    };
    a.weatherSlider.weatherTypes = {
        clear_day: {
            type: "bg",
            fileName: "clear_day.jpg",
            classNames: "ws-fullbg"
        },
        foggy_day: {
            type: "bg",
            fileName: "foggy_day.jpg",
            classNames: "ws-fullbg ws-fixed"
        },
        white_cloudy_day: {
            type: "bg",
            fileName: "white_cloudy_day.jpg",
            classNames: "ws-fullbg"
        },
        grey_cloudy_day: {
            type: "bg",
            fileName: "grey_cloudy_day.jpg",
            classNames: "ws-fullbg"
        },
        dark_cloudy_day: {
            type: "bg",
            fileName: "dark_cloudy_day.jpg",
            classNames: "ws-fullbg"
        },
        clear_night: {
            type: "bg",
            fileName: "clear_night.jpg",
            classNames: "ws-fullbg ws-fixed"
        },
        foggy_night: {
            type: "bg",
            fileName: "foggy_night.jpg",
            classNames: "ws-fullbg ws-fixed"
        },
        cloudy_night: {
            type: "bg",
            fileName: "cloudy_night.png",
            classNames: "ws-fullbg"
        },
        starry_sky: {
            type: "bg",
            fileName: "starry_sky.jpg",
            classNames: "ws-fullbg ws-fixed"
        },
        sun: {
            fileName: "sun.png",
            classNames: "ws-sunmoon",
            mL: 0,
            mT: 50
        },
        moon: {
            fileName: "moon.png",
            classNames: "ws-sunmoon",
            mL: 0,
            mT: 50
        },
        white_cloud_day_1: {
            fileName: "white_cloud_day_1.png",
            classNames: "ws-cloud1 ws-clouds",
            mL: -50,
            mT: -50
        },
        white_cloud_day_2: {
            fileName: "white_cloud_day_2.png",
            classNames: "ws-cloud2 ws-clouds",
            mL: 150,
            mT: -75
        },
        white_cloud_day_3: {
            fileName: "white_cloud_day_3.png",
            classNames: "ws-cloud3 ws-clouds",
            mL: -150,
            mT: -75
        },
        white_cloud_day_4: {
            fileName: "white_cloud_day_4.png",
            classNames: "ws-cloud4 ws-clouds",
            mL: 50,
            mT: -50
        },
        grey_cloud_day_1: {
            fileName: "grey_cloud_day_1.png",
            classNames: "ws-cloud1 ws-clouds",
            mL: -50,
            mT: -50
        },
        grey_cloud_day_2: {
            fileName: "grey_cloud_day_2.png",
            classNames: "ws-cloud2 ws-clouds",
            mL: 150,
            mT: -75
        },
        grey_cloud_day_3: {
            fileName: "grey_cloud_day_3.png",
            classNames: "ws-cloud3 ws-clouds",
            mL: -150,
            mT: -75
        },
        grey_cloud_day_4: {
            fileName: "grey_cloud_day_4.png",
            classNames: "ws-cloud4 ws-clouds",
            mL: 50,
            mT: -50
        },
        dark_cloud_day_1: {
            fileName: "dark_cloud_day_1.png",
            classNames: "ws-cloud1 ws-clouds",
            mL: -50,
            mT: -50
        },
        dark_cloud_day_2: {
            fileName: "dark_cloud_day_2.png",
            classNames: "ws-cloud2 ws-clouds",
            mL: 150,
            mT: -75
        },
        dark_cloud_day_3: {
            fileName: "dark_cloud_day_3.png",
            classNames: "ws-cloud3 ws-clouds",
            mL: -150,
            mT: -75
        },
        dark_cloud_day_4: {
            fileName: "dark_cloud_day_4.png",
            classNames: "ws-cloud4 ws-clouds",
            mL: 50,
            mT: -50
        },
        dark_cloud_night_1: {
            fileName: "dark_cloud_night_1.png",
            classNames: "ws-cloud1 ws-clouds",
            mL: -50,
            mT: -50
        },
        dark_cloud_night_2: {
            fileName: "dark_cloud_night_2.png",
            classNames: "ws-cloud2 ws-clouds",
            mL: 150,
            mT: -75
        },
        dark_cloud_night_3: {
            fileName: "dark_cloud_night_3.png",
            classNames: "ws-cloud3 ws-clouds",
            mL: -150,
            mT: -75
        },
        dark_cloud_night_4: {
            fileName: "dark_cloud_night_4.png",
            classNames: "ws-cloud4 ws-clouds",
            mL: 50,
            mT: -50
        },
        fog_day: {
            fileName: "fog_day.png",
            classNames: "ws-fog",
            mL: 0,
            mT: 0
        },
        fog_night: {
            fileName: "fog_night.png",
            classNames: "ws-fog",
            mL: 0,
            mT: 0
        },
        rain_day: {
            type: "bg",
            fileName: "rain_day.png",
            classNames: "ws-rain"
        },
        rain_night: {
            type: "bg",
            fileName: "rain_night.png",
            classNames: "ws-rain"
        },
        raindrops: {
            type: "bg",
            where: ".ws-inner",
            fileName: "raindrops.png",
            classNames: "ws-bottombg"
        },
        snow_big_day: {
            type: "bg",
            fileName: "snow_big_day.png",
            classNames: "ws-snow ws-snow-big"
        },
        snow_small_day: {
            type: "bg",
            fileName: "snow_small_day.png",
            classNames: "ws-snow ws-snow-small"
        },
        snow_big_night: {
            type: "bg",
            fileName: "snow_big_night.png",
            classNames: "ws-snow ws-snow-big"
        },
        snow_small_night: {
            type: "bg",
            fileName: "snow_small_night.png",
            classNames: "ws-snow ws-snow-small"
        },
        icy_day_left: {
            fileName: "icy_day_left.png",
            classNames: "ws-icy ws-icy-left",
            mL: 0,
            mT: 0
        },
        icy_day_right: {
            fileName: "icy_day_right.png",
            classNames: "ws-icy ws-icy-right",
            mL: 0,
            mT: 0
        },
        icy_night_left: {
            fileName: "icy_night_left.png",
            classNames: "ws-icy ws-icy-left",
            mL: 0,
            mT: 0
        },
        icy_night_right: {
            fileName: "icy_night_right.png",
            classNames: "ws-icy ws-icy-right",
            mL: 0,
            mT: 0
        },
        lightning1: {
            fileName: "lightning1.png",
            classNames: "ws-lightning1 ws-lightnings",
            mL: 0,
            mT: 0
        },
        lightning2: {
            fileName: "lightning2.png",
            classNames: "ws-lightning2 ws-lightnings",
            mL: 0,
            mT: 0
        },
        lightning3: {
            fileName: "lightning3.png",
            classNames: "ws-lightning3 ws-lightnings",
            mL: 0,
            mT: 0
        },
        lightning4: {
            fileName: "lightning4.png",
            classNames: "ws-lightning4 ws-lightnings",
            mL: 0,
            mT: 0
        }
    };
    a.weatherSlider.global = {
        version: "1.1.20120106",
        oldIE: a.browser.msie && a.browser.version < 9 ? true : false,
        css3: a.browser.webkit || a.browser.safari || a.browser.mozilla ? true : false,
        m: {
            metric: {
                t: "C",
                s: "kmph",
                l: "km",
                pr: "mm",
                p: "hPa"
            },
            imperial: {
                t: "F",
                s: "mph",
                l: "mi",
                pr: "in",
                p: "mb"
            }
        }
    };
    a.weatherSlider.language = {
        cl: "Current Location",
        ht: "High",
        lt: "Low",
        hu: "Humidity",
        pr: "Precipitation",
        wi: "Wind",
        ps: "Pressure",
        vi: "Visibility",
        get: "getting weather",
        not: "Location not found",
        una: "Unable to determine your Current Location.",
        day: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday",
        113: "Sunny, Clear",
        114: "Sunny",
        115: "Clear",
        116: "Partly Cloudy",
        119: "Cloudy",
        122: "Overcast",
        143: "Mist",
        176: "Patchy rain nearby",
        179: "Patchy snow nearby",
        182: "Patchy sleet nearby",
        185: "Patchy freezing drizzle nearby",
        200: "Thundery outbreaks in nearby",
        227: "Blowing snow",
        230: "Blizzard",
        248: "Fog",
        260: "Freezing fog",
        263: "Patchy light drizzle",
        266: "Light drizzle",
        281: "Freezing drizzle",
        284: "Heavy freezing drizzle",
        293: "Patchy light rain",
        296: "Light rain",
        299: "Moderate rain at times",
        302: "Moderate rain",
        305: "Heavy rain at times",
        308: "Heavy rain",
        311: "Light freezing rain",
        314: "Moderate or Heavy freezing rain",
        317: "Light sleet",
        320: "Moderate or heavy sleet",
        323: "Patchy light snow",
        326: "Light snow",
        329: "Patchy moderate snow",
        332: "Moderate snow",
        335: "Patchy heavy snow",
        338: "Heavy snow",
        350: "Ice pellets",
        353: "Light rain shower",
        356: "Moderate or heavy rain shower",
        359: "Torrential rain shower",
        362: "Light sleet showers",
        365: "Moderate or heavy sleet showers",
        368: "Light snow showers",
        371: "Moderate or heavy snow showers",
        374: "Light showers of ice pellets",
        377: "Moderate or heavy showers of ice pellets",
        386: "Patchy light rain in area with thunder",
        389: "Moderate or heavy rain in area with thunder",
        392: "Patchy light snow in area with thunder",
        395: "Moderate or heavy snow in area with thunder"
    };
    a.weatherSlider.options = {
        imgPath: "../weatherslider/img/",
        CSSanimations: true,
        JSanimations: true,
        snow: true,
        rain: true,
        wind: true,
        lightnings: true,
        windyWeather: 18,
        windDirection: "auto",
        icyTemp: -2,
        measurement: "metric",
        daytime: [7, 19],
        infoDuration: 450,
        infoEasingType: ["easeOutBack", "easeInBack"],
        reduction: "auto",
        keybNav: true,
        WWOAPIKey: "7ab69fab1f233943111612"
    }
})(jQuery)