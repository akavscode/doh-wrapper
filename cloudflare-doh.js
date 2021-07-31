! function(e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) n.d(r, o, function(t) {
                return e[t]
            }.bind(null, o));
        return r
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 0)
}([function(e, t, n) {
    const r = n(1);
    addEventListener("fetch", e => {
        e.respondWith(async function(e) {
            const t = new r;
            return t.get("/dns-query", e => function(e) {
                const t = new URL(e.url).searchParams;
                let n = "https://cloudflare-dns.com/dns-query",
                    r = [];
                for (let [e, n] of t) r.push(`${e}=${encodeURIComponent(n)}`);
                return n += "?", n += r.join("&"), fetch(new Request(n, {
                    method: "GET",
                    redirect: "manual",
                    headers: e.headers
                }))
            }(e)), t.post("/dns-query", e => function(e) {
                e.body;
                return fetch(new Request("https://cloudflare-dns.com/dns-query", {
                    method: "POST",
                    redirect: "manual",
                    headers: e.headers,
                    body: e.body
                }))
            }(e)), t.head("/dns-query", e => new Response("Bad Request", {
                status: 400,
                statusText: "Bad Request",
                headers: {
                    "content-type": "text/plain"
                }
            })), t.get("/", () => new Response("Hello worker!")), await t.route(e)
        }(e.request))
    })
}, function(e, t) {
    const n = e => t => t.method.toLowerCase() === e.toLowerCase(),
        r = n("connect"),
        o = n("delete"),
        s = n("get"),
        u = n("head"),
        a = n("options"),
        d = n("patch"),
        i = n("post"),
        c = n("put"),
        l = n("trace"),
        h = e => t => {
            const n = new URL(t.url).pathname;
            return (n.match(e) || [])[0] === n
        };
    e.exports = class {
        constructor() {
            this.routes = []
        }
        handle(e, t) {
            return this.routes.push({
                conditions: e,
                handler: t
            }), this
        }
        connect(e, t) {
            return this.handle([r, h(e)], t)
        }
        delete(e, t) {
            return this.handle([o, h(e)], t)
        }
        get(e, t) {
            return this.handle([s, h(e)], t)
        }
        head(e, t) {
            return this.handle([u, h(e)], t)
        }
        options(e, t) {
            return this.handle([a, h(e)], t)
        }
        patch(e, t) {
            return this.handle([d, h(e)], t)
        }
        post(e, t) {
            return this.handle([i, h(e)], t)
        }
        put(e, t) {
            return this.handle([c, h(e)], t)
        }
        trace(e, t) {
            return this.handle([l, h(e)], t)
        }
        all(e) {
            return this.handle([], e)
        }
        route(e) {
            const t = this.resolve(e);
            return t ? t.handler(e) : new Response("resource not found", {
                status: 404,
                statusText: "not found",
                headers: {
                    "content-type": "text/plain"
                }
            })
        }
        resolve(e) {
            return this.routes.find(t => !(t.conditions && (!Array.isArray(t) || t.conditions.length)) || ("function" == typeof t.conditions ? t.conditions(e) : t.conditions.every(t => t(e))))
        }
    }
}]);
