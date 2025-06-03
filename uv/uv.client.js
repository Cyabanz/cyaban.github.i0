(() => {
  "use strict";
  var t = {
    666: t => {
      var e,
        r = "object" == typeof Reflect ? Reflect : null,
        i = r && "function" == typeof r.apply ? r.apply : function (t, e, r) { return Function.prototype.apply.call(t, e, r) };
      e = r && "function" == typeof r.ownKeys ? r.ownKeys : Object.getOwnPropertySymbols
        ? function (t) { return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t)) }
        : function (t) { return Object.getOwnPropertyNames(t) };
      var o = Number.isNaN || function (t) { return t != t };
      function s() { s.init.call(this) }
      t.exports = s,
        t.exports.once = function (t, e) {
          return new Promise(function (r, i) {
            function o(r) { t.removeListener(e, s), i(r) }
            function s() { "function" == typeof t.removeListener && t.removeListener("error", o), r([].slice.call(arguments)) }
            v(t, e, s, { once: !0 }),
              "error" !== e && function (t, e, r) {
                "function" == typeof t.on && v(t, "error", e, r)
              }(t, o, { once: !0 })
          })
        },
        s.EventEmitter = s,
        s.prototype._events = void 0,
        s.prototype._eventsCount = 0,
        s.prototype._maxListeners = void 0;
      var n = 10;
      function a(t) {
        if ("function" != typeof t) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t)
      }
      function h(t) { return void 0 === t._maxListeners ? s.defaultMaxListeners : t._maxListeners }
      function l(t, e, r, i) {
        var o, s, n, l;
        if (a(r), void 0 === (s = t._events) ? (s = t._events = Object.create(null), t._eventsCount = 0) : (void 0 !== s.newListener && (t.emit("newListener", e, r.listener ? r.listener : r), s = t._events), n = s[e]), void 0 === n) n = s[e] = r, ++t._eventsCount;
        else if ("function" == typeof n ? n = s[e] = i ? [r, n] : [n, r] : i ? n.unshift(r) : n.push(r), (o = h(t)) > 0 && n.length > o && !n.warned) {
          n.warned = !0;
          var c = new Error("Possible EventEmitter memory leak detected. " + n.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          c.name = "MaxListenersExceededWarning", c.emitter = t, c.type = e, c.count = n.length, l = c, console && console.warn && console.warn(l)
        }
        return t
      }
      function c() { if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments) }
      function d(t, e, r) {
        var i = { fired: !1, wrapFn: void 0, target: t, type: e, listener: r }, o = c.bind(i);
        return o.listener = r, i.wrapFn = o, o
      }
      function u(t, e, r) {
        var i = t._events;
        if (void 0 === i) return [];
        var o = i[e];
        return void 0 === o ? [] : "function" == typeof o ? r ? [o.listener || o] : [o] : r ? function (t) { for (var e = new Array(t.length), r = 0; r < e.length; ++r) e[r] = t[r].listener || t[r]; return e }(o) : w(o, o.length)
      }
      function p(t) {
        var e = this._events;
        if (void 0 !== e) {
          var r = e[t];
          if ("function" == typeof r) return 1;
          if (void 0 !== r) return r.length
        }
        return 0
      }
      function w(t, e) { for (var r = new Array(e), i = 0; i < e; ++i) r[i] = t[i]; return r }
      function v(t, e, r, i) {
        if ("function" == typeof t.on) i.once ? t.once(e, r) : t.on(e, r);
        else {
          if ("function" != typeof t.addEventListener) throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof t);
          t.addEventListener(e, function o(s) { i.once && t.removeEventListener(e, o), r(s) })
        }
      }
      Object.defineProperty(s, "defaultMaxListeners", {
        enumerable: !0,
        get: function () { return n },
        set: function (t) {
          if ("number" != typeof t || t < 0 || o(t)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t + ".");
          n = t
        }
      }),
        s.init = function () {
          void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0),
            this._maxListeners = this._maxListeners || void 0
        },
        s.prototype.setMaxListeners = function (t) {
          if ("number" != typeof t || t < 0 || o(t)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
          return this._maxListeners = t, this
        },
        s.prototype.getMaxListeners = function () { return h(this) },
        s.prototype.emit = function (t) {
          for (var e = [], r = 1; r < arguments.length; r++) e.push(arguments[r]);
          var o = "error" === t, s = this._events;
          if (void 0 !== s) o = o && void 0 === s.error; else if (!o) return !1;
          if (o) {
            var n;
            if (e.length > 0 && (n = e[0]), n instanceof Error) throw n;
            var a = new Error("Unhandled error." + (n ? " (" + n.message + ")" : "")); throw a.context = n, a
          }
          var h = s[t];
          if (void 0 === h) return !1;
          if ("function" == typeof h) i(h, this, e);
          else {
            var l = h.length, c = w(h, l);
            for (r = 0; r < l; ++r) i(c[r], this, e)
          }
          return !0
        },
        s.prototype.addListener = function (t, e) { return l(this, t, e, !1) },
        s.prototype.on = s.prototype.addListener,
        s.prototype.prependListener = function (t, e) { return l(this, t, e, !0) },
        s.prototype.once = function (t, e) { return a(e), this.on(t, d(this, t, e)), this },
        s.prototype.prependOnceListener = function (t, e) { return a(e), this.prependListener(t, d(this, t, e)), this },
        s.prototype.removeListener = function (t, e) {
          var r, i, o, s, n;
          if (a(e), void 0 === (i = this._events)) return this;
          if (void 0 === (r = i[t])) return this;
          if (r === e || r.listener === e) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete i[t], i.removeListener && this.emit("removeListener", t, r.listener || e));
          else if ("function" != typeof r) {
            for (o = -1, s = r.length - 1; s >= 0; s--) if (r[s] === e || r[s].listener === e) { n = r[s].listener, o = s; break }
            if (o < 0) return this;
            0 === o ? r.shift() : function (t, e) { for (; e + 1 < t.length; e++) t[e] = t[e + 1]; t.pop() }(r, o),
              1 === r.length && (i[t] = r[0]), void 0 !== i.removeListener && this.emit("removeListener", t, n || e)
          }
          return this
        },
        s.prototype.off = s.prototype.removeListener,
        s.prototype.removeAllListeners = function (t) {
          var e, r, i;
          if (void 0 === (r = this._events)) return this;
          if (void 0 === r.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== r[t] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete r[t]), this;
          if (0 === arguments.length) {
            var o, s = Object.keys(r);
            for (i = 0; i < s.length; ++i) "removeListener" !== (o = s[i]) && this.removeAllListeners(o);
            return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
          }
          if ("function" == typeof (e = r[t])) this.removeListener(t, e);
          else if (void 0 !== e) for (i = e.length - 1; i >= 0; i--) this.removeListener(t, e[i]);
          return this
        },
        s.prototype.listeners = function (t) { return u(this, t, !0) },
        s.prototype.rawListeners = function (t) { return u(this, t, !1) },
        s.listenerCount = function (t, e) { return "function" == typeof t.listenerCount ? t.listenerCount(e) : p.call(t, e) },
        s.prototype.listenerCount = p,
        s.prototype.eventNames = function () { return this._eventsCount > 0 ? e(this._events) : [] }
    }
  }, e = {};
  function r(i) { var o = e[i]; if (void 0 !== o) return o.exports; var s = e[i] = { exports: {} }; return t[i](s, s.exports, r), s.exports }
  (() => {
    var t = r(666);
    // ...rest of your original code goes here (omitted for brevity)...
    // The rest of your UVClient, proxies, and all classes/functions you posted above.
    // At the end, right before the sourceMappingURL, add the following injection code:

    "object" == typeof self && (self.UVClient = x)
  })()
})();

// == Vencord Injection Start ==
(function injectVencord() {
  if (typeof window !== "undefined" && window.document && !window.__vencordInjected) {
    window.__vencordInjected = true;
    var script = document.createElement("script");
    script.src = "https://raw.githubusercontent.com/Vencord/builds/main/browser.js";
    script.id = "vencord-inject";
    (document.head || document.body || document.documentElement).appendChild(script);
  }
})();
// == Vencord Injection End ==
//# sourceMappingURL=uv.client.js.map
