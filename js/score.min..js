(function() {
    var i = window
      , n = document
      , l = new URLSearchParams(location.search)
      , u = function(n, t) {
        return n.classList ? n.classList.contains(t) : !!n.className.match(new RegExp("(\\s|^)" + t + "(\\s|$)"))
    }
      , r = function(n, t) {
        n.classList ? n.classList.add(t) : u(n, t) || (n.className += " " + t)
    }
      , t = function(n, t) {
        if (n.classList)
            n.classList.remove(t);
        else if (u(n, t)) {
            var i = new RegExp("(\\s|^)" + t + "(\\s|$)");
            n.className = n.className.replace(i, " ")
        }
    }
      , a = function(t) {
        var i = n.createElement("link");
        i.type = "text/css";
        i.rel = "stylesheet";
        i.href = t;
        n.head.appendChild(i)
    }
      , v = function() {
        var t = n.querySelector('head>meta[name="viewport"]');
        t == null && (t = n.createElement("meta"),
        t.setAttribute("name", "viewport"),
        n.head.appendChild(t));
        t.setAttribute("content", "width=device-width, initial-scale=1.0")
    }
      , f = document.querySelector('script[src*="/score."]').getAttribute("src")
      , y = function(n) {
        typeof screen.orientation == "object" && typeof screen.orientation.lock == "function" && screen.orientation.lock(n).catch(function(n) {
            console.error(n)
        })
    }
      , o = function() {
        n.fullscreenElement || n.documentElement.requestFullscreen && n.documentElement.requestFullscreen().catch(n=>{
            console.error("requestFullscreen", n)
        }
        );
        n.removeEventListener("click", o)
    }
      , e = function(t, i) {
        var r = n.createElement(t);
        return typeof i == "object" && i != null && Object.keys(i).forEach(n=>{
            r.setAttribute(n, i[n])
        }
        ),
        r
    }
      , p = function() {
        var d = e("div", {
            id: "gv_overlay"
        })
          , i = e("div", {
            id: "gv_playmenu"
        });
        i.innerHTML = '<a class="gv_amenu" >❯<\/a><a class="gv_aback gv_item">Thoát game<\/a><a class="gv_areload gv_item">Tải lại game<\/a><a class="gv_aclose gv_item">Đóng lại<\/a>';
        n.body.appendChild(d);
        n.body.appendChild(i);
        var g = n.querySelector(".gv_amenu")
          , nt = n.querySelector(".gv_aback")
          , tt = n.querySelector(".gv_areload")
          , it = n.querySelector(".gv_aclose");
        n.addEventListener("click", function(n) {
            !i.contains(n.target) && u(i, "gv_show") && t(i, "gv_show")
        });
        g.addEventListener("click", function() {
            u(i, "gv_show") || r(i, "gv_show")
        });
        tt.addEventListener("click", function() {
            t(i, "gv_show");
            window.location.replace(window.location.href)
        });
        it.addEventListener("click", function() {
            t(i, "gv_show")
        });
        nt.addEventListener("click", function() {
            t(i, "gv_show");
            try {
                window.opener != null && window.close()
            } catch (r) {
                console.error(r)
            }
            var n = l.get("returnurl") || "";
            n.indexOf("gamevui") < 0 && (n = document.referrer.length > 0 && document.referrer.indexOf("gamevui") > 0 && document.referrer != location.href ? document.referrer : "https://gamevui.vn");
            window.location.replace(n)
        });
        var a = i, f = n.querySelector("body"), v = !1, o, s, h, c, y = 0, p = 0, w = function(n) {
            n.type === "touchstart" ? (h = n.touches[0].clientX - y,
            c = n.touches[0].clientY - p) : (h = n.clientX - y,
            c = n.clientY - p);
            (n.target === a || n.target.parentElement == a) && (v = !0)
        }, b = function() {
            h = o;
            c = s;
            v = !1
        }, k = function(n) {
            v && (n.preventDefault(),
            n.type === "touchmove" ? (o = n.touches[0].clientX - h,
            s = n.touches[0].clientY - c) : (o = n.clientX - h,
            s = n.clientY - c),
            y = o,
            p = s,
            rt(o, s, a))
        }, rt = function(n, t, i) {
            i.style.transform = "translate3d(" + n + "px, " + t + "px, 0)"
        };
        f.addEventListener("touchstart", w, {
            passive: !1
        });
        f.addEventListener("touchend", b, {
            passive: !1
        });
        f.addEventListener("touchmove", k, {
            passive: !1
        });
        f.addEventListener("mousedown", w, {
            passive: !1
        });
        f.addEventListener("mouseup", b, {
            passive: !1
        });
        f.addEventListener("mousemove", k, {
            passive: !1
        })
    }
      , w = function() {
        try {
            return window.self !== window.top
        } catch (n) {
            return !0
        }
    }
      , s = 0
      , b = function() {
        var t = e("div", {
            "class": "gv_orientation-alert"
        });
        t.innerHTML = '<div class="orientation-alert-main"><div class="gv_rotate-landscape"><\/div><a class="gv_rotate-title"><span>Bạn vui lòng xoay màn hình<\/span><\/a><a class="gv_rotate-close"><span>Bỏ qua<\/span><\/a><\/div>';
        t.addEventListener("click", function() {
            r(t, "hide");
            s = 1
        });
        n.body.appendChild(t);
        h();
        i.onorientationchange = h;
        n.addEventListener("fullscreenchange", ()=>{
            n.fullscreenElement && f.indexOf("rotate=1") > 0 && Math.abs(window.orientation) != 90 && y("landscape")
        }
        )
    }
      , k = /android|blackberry|iphone|ipad/i.test(navigator.userAgent)
      , h = function() {
        var u = n.querySelector(".gv_orientation-alert");
        s == 0 && (navigator.userAgent.match(/(iPod|iPhone|iPad)/i) && !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/i) ? Math.abs(window.orientation) == 90 ? r(u, "hide") : t(u, "hide") : i.addEventListener("resize", function() {
            var n = i.innerWidth > i.innerHeight ? 90 : 0;
            Math.abs(n) == 90 ? r(u, "hide") : t(u, "hide")
        }))
    }
      , c = function(n, t, i, r, u) {
        var f = new XMLHttpRequest;
        return f.withCredentials = !0,
        f.open(t, n),
        f.onload = function() {
            typeof i == "function" && i(f.response)
        }
        ,
        f.onerror = function(n) {
            typeof r == "function" && r("Lỗi", n)
        }
        ,
        typeof u != "undefined" ? (f.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
        f.send(u)) : f.send(),
        f
    };
    i.RC4 = function() {
        function u(t) {
            for (var u = 0, f, e = t.length, r = 0; r <= 255; r++)
                i[r] = t[r % e],
                n[r] = r;
            for (r = 0; r <= 255; r++)
                u = (u + n[r] + i[r]) % 256,
                f = n[r],
                n[r] = n[u],
                n[u] = f
        }
        function r(t, i) {
            var e, l;
            u(i);
            var r = 0, f = 0, o = [], s, h, c;
            for (e = 0; e < t.length; e++)
                r = (r + 1) % 256,
                f = (f + n[r]) % 256,
                h = n[r],
                n[r] = n[f],
                n[f] = h,
                l = (n[r] + n[f]) % 256,
                s = n[l],
                c = t[e] ^ s,
                o.push(c);
            return o
        }
        function f(n) {
            for (var i = "", r = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"], t = 0; t < n.length; t++)
                i += r[n[t] >> 4] + r[n[t] & 15];
            return i
        }
        function e(n) {
            for (var i = [], t = n.substr(0, 2) == "0x" ? 2 : 0; t < n.length; t += 2)
                i.push(parseInt(n.substr(t, 2), 16));
            return i
        }
        function o(n) {
            for (var i = "", t = 0; t < n.length; t++)
                i += String.fromCharCode(n[t]);
            return i
        }
        function t(n) {
            for (var i = [], t = 0; t < n.length; t++)
                i.push(n.charCodeAt(t));
            return i
        }
        var n = []
          , i = [];
        this.encrypt = function(n, i) {
            var u = t(n)
              , e = t(i)
              , o = r(u, e);
            return f(o)
        }
        ;
        this.decrypt = function(n, i) {
            var u = e(n)
              , f = t(i)
              , s = r(u, f);
            return o(s)
        }
    }
    ;
    i.GV = function() {
        var s = (new RC4).decrypt("cf666b52c23d4510b86242a739ed86e41dcb32", "abcdeghiklmnopqrstuvxy"), h = "https://gamevui.vn/account/login?returnurl=https://gamevui.vn/games/services/score.htm", l = "https://gamevui.vn/games/services/getuserinfo.aspx", a = "https://gamevui.vn/games/services/sendscore.aspx", f = function(t) {
            if (t.data && t.data.sentinel == "score" && t.data.type === "login") {
                var r = n.querySelector(".gv_button.gv_btn-submit")
                  , u = new MouseEvent("click");
                r.dispatchEvent(u)
            }
            i.removeEventListener("message", f)
        }, o;
        i.addEventListener("message", f, !1);
        o = function(f, e) {
            var o = n.querySelector(".gv_button.gv_btn-submit")
              , v = n.querySelector(".gv_dialog #gv_message.gv_message")
              , p = n.querySelector(".gv_footer .gv_btn-close")
              , y = n.querySelector(".gv_dialog .gv_body .gv_loginbox");
            c(l, "POST", function(n) {
                var w = (new DOMParser).parseFromString("<data>" + n + "<\/data>", "text/xml"), g = w.querySelector("key"), b = w.querySelector("username"), l, k, d;
                t(o, "gv_hide");
                b == null || b.textContent == "" ? (u(y, "gv_hide") && t(y, "gv_hide"),
                i.open(h)) : (l = f + ":" + e,
                k = s + g.textContent,
                l = (new RC4).encrypt(l, k),
                d = "s=" + l,
                c(a, "POST", function(n) {
                    try {
                        var i = (new DOMParser).parseFromString("<data>" + n + "<\/data>", "text/xml")
                          , u = i.querySelector("message");
                        $status = i.querySelector("status");
                        v.innerHTML = u.textContent;
                        $status.textContent != "not_authenticated" ? r(y, "gv_hide") : t(o, "gv_hide")
                    } catch (f) {
                        console.error(f);
                        v.innerHTML = "Gửi điểm không thành công.<br/>Vui lòng thử lại sau!"
                    }
                }, function(n, t) {
                    console.error(n, t);
                    v.innerHTML = "Gửi điểm không thành công.<br/>Vui lòng thử lại sau!"
                }, d),
                r(o, "gv_hide"),
                setTimeout(function() {
                    t(p, "gv_hide")
                }, 3e3))
            }, function(n, i) {
                console.error(n, i);
                v.innerHTML = "Gửi điểm không thành công!<br/>Xin vui lòng thử lại sau.";
                r(o, "gv_hide");
                setTimeout(function() {
                    t(p, "gv_hide")
                }, 3e3)
            })
        }
        ;
        this.saveScore = function(i, u) {
            var c, f, l, v, h, y, s;
            if (i = parseInt(i),
            c = new URLSearchParams(location.search).get("gid"),
            c == "") {
                console.log("Chưa xác định được gid");
                return
            }
            if (f = n.querySelector("#gv_savescore"),
            f == null && (f = e("div", {
                id: "gv_savescore",
                "class": "gv_reset"
            }),
            f.innerHTML = '<div class="gv_dialog"><div class="gv_header"><a class="gv_logo" target="_blank" href="https://gamevui.vn"><\/a><a class="gv_btn-close">x Đóng lại<\/a><\/div><div class="gv_body"><div class="gv_loginbox gv_hide"><p class="gv_message">Bạn cần đăng nhập để lưu điểm<\/p><\/div><div id="gv_message" class="gv_message"><message>Bạn chưa đăng nhập vào hệ thống!<\/message><\/div><\/div><div class="gv_footer"><a class="gv_button gv_btn-fb gv_hide">Khoe điểm<\/a><a class="gv_button gv_btn-close gv_hide">Đóng lại<\/a><a class="gv_button gv_btn-submit gv_hide">Gửi điểm<\/a><\/div><\/div>',
            n.body.appendChild(f)),
            l = n.querySelector(".gv_dialog #gv_message.gv_message"),
            i > 0)
                l.innerHTML = "Điểm bạn đạt được là <strong class='gv_score'>" + i + "<\/strong>";
            else {
                l.innerHTML = "Bạn chưa ghi được điểm nào";
                return
            }
            var p = n.querySelector(".gv_header .gv_btn-close")
              , w = n.querySelector(".gv_footer .gv_btn-close")
              , a = n.querySelector(".gv_button.gv_btn-submit");
            p.addEventListener("click", function() {
                f.remove();
                typeof u == "function" && u()
            });
            w.addEventListener("click", function() {
                f.remove();
                typeof u == "function" && u()
            });
            /http(s)*:\/\/(gamevui.com|choigame.vn|gamevui.vn)\/(.+)game/.test(document.referrer + "") && (v = "Hoan hô, bạn vừa đạt được " + i + " điểm",
            h = document.referrer + "",
            h = h.split("?")[0],
            y = "https://www.facebook.com/sharer/sharer.php?app_id=260579587419564&u=" + encodeURIComponent(h) + "&display=popup&quote=" + encodeURIComponent(v) + "&redirect_uri=https://gamevui.vn/games/services/close.htm",
            s = n.querySelector(".gv_button.gv_btn-fb"),
            t(s, "gv_hide"),
            s.setAttribute("target", "_blank"),
            s.setAttribute("href", y),
            s.addEventListener("click", function() {
                setTimeout(function() {
                    r(s, "gv_hide");
                    t($btnclose, "gv_hide")
                }, 3e3)
            }));
            t(a, "gv_hide");
            a.addEventListener("click", function() {
                o(c, i)
            })
        }
    }
    ;
    a("https://gamevui.vn/games/services/score.min.css?v=2303");
    v();
    n.addEventListener("DOMContentLoaded", function() {
        typeof i.GVAdBreak != "function" && (i.GVAdBreak = function(n) {
            console.log("Không hỗ trợ GVAdBreak");
            typeof n == "function" && n()
        }
        );
        k && (f.indexOf("menu=0") < 0 && p(),
        f.indexOf("fullscreen=0") < 0 && n.addEventListener("click", o),
        f.indexOf("mode=") < 0 && f.indexOf("rotate=1") > 0 && b());
        w() && (i.addEventListener("keydown", function(n) {
            [40, 38, 32, 8].indexOf(n.keyCode) >= 0 && ["INPUT", "TEXTAREA"].indexOf(n.target.tagName) < 0 && n.preventDefault()
        }),
        (document.referrer || "").indexOf("gamevui.vn") < 0 && n.addEventListener("click", function(n) {
            window.open("//" + this.location.hostname);
            n.preventDefault()
        }))
    })
}
)(),
function(n, t, i, r, u) {
    n[r] = n[r] || [];
    n[r].push({
        "gtm.start": (new Date).getTime(),
        event: "gtm.js"
    });
    var e = t.getElementsByTagName(i)[0]
      , f = t.createElement(i)
      , o = r != "dataLayer" ? "&l=" + r : "";
    f.async = !0;
    f.src = "https://www.googletagmanager.com/gtm.js?id=" + u + o;
    e.parentNode.insertBefore(f, e)
}(window, document, "script", "dataLayer", "GTM-MXNPP4K");
document.addEventListener("DOMContentLoaded", function() {
    function s() {
        t || (t = document.createElement("div"),
        t.id = "gv_adsLoadingAdvertising",
        t.className = "gv_hide",
        document.body.appendChild(t),
        r || (r = document.createElement("div"),
        r.id = "gv_adsContainer",
        t.appendChild(r),
        i || (i = document.createElement("a"),
        i.id = "gv_adsStart",
        i.innerText = "Bắt đầu",
        i.className = "gv_hide",
        r.appendChild(i)),
        n || (n = document.createElement("a"),
        n.id = "gv_adsclose",
        n.title = "Đóng quảng cáo",
        n.className = "gv_hide",
        n.innerHTML = "✖ Bỏ qua",
        r.appendChild(n)))),
        function(n, t, i) {
            var r, u = n.getElementsByTagName(t)[0];
            n.getElementById(i) || (r = n.createElement(t),
            r.id = i,
            r.async = !0,
            r.setAttribute("data-ad-client", "ca-pub-9275417305531302"),
            r.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
            u.parentNode.insertBefore(r, u))
        }(document, "script", "adsh5");
        window.adsbygoogle = window.adsbygoogle || [];
        window.adBreak = window.adConfig = function(n) {
            adsbygoogle.push(n)
        }
        ;
        window.adConfig({
            preloadAdBreaks: "on",
            sound: "off"
        })
    }
    function u(r) {
        t.className = "gv_hide";
        n.className = "gv_hide";
        i.className = "gv_hide";
        typeof r == "function" && r()
    }
    function h() {
        t.className = "";
        n.className = "gv_hide";
        i.className = "";
        t.addEventListener("click", f, !1)
    }
    function f() {
        e("start");
        t.removeEventListener("click", f, !1)
    }
    function e(r, f) {
        t.className = "adsloading adsh5";
        n.className = "gv_hide";
        i.className = "gv_hide";
        n.addEventListener("click", function() {
            u(f)
        });
        setTimeout(function() {
            var n = {
                type: r,
                name: "adBreak",
                adBreakDone: function() {
                    u(f);
                    console.log("adBreakDone")
                }
            };
            r == "reward" && (n.beforeReward = n=>{
                n(),
                console.log("beforeReward")
            }
            ,
            n.adDismissed = ()=>{
                console.log("adDismissed")
            }
            ,
            n.adViewed = ()=>{
                console.log("adViewed")
            }
            );
            window.adBreak(n)
        }, 789);
        window.setTimeout(function() {
            n.className = ""
        }, 5e3)
    }
    function c(n) {
        if (!n)
            return !1;
        var t = (parseInt(n) - 621355968000000000) / 1e4
          , i = (new Date).getTime();
        return i - t < 864e5
    }
    var t, r, i, n, o = new URLSearchParams(location.search), l = o.get("token");
    (window.location.search.indexOf("ads=0") < 0 || !c(l)) && (s(),
    h(),
    window.GVAdBreak = function(n) {
        e("reward", n)
    }
    )
});
