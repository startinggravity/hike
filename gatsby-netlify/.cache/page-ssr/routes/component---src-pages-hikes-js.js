exports.id = "component---src-pages-hikes-js";
exports.ids = ["component---src-pages-hikes-js"];
exports.modules = {

/***/ "./node_modules/camelcase/index.js":
/*!*****************************************!*\
  !*** ./node_modules/camelcase/index.js ***!
  \*****************************************/
/***/ ((module) => {

"use strict";


const preserveCamelCase = string => {
	let isLastCharLower = false;
	let isLastCharUpper = false;
	let isLastLastCharUpper = false;

	for (let i = 0; i < string.length; i++) {
		const character = string[i];

		if (isLastCharLower && /[a-zA-Z]/.test(character) && character.toUpperCase() === character) {
			string = string.slice(0, i) + '-' + string.slice(i);
			isLastCharLower = false;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = true;
			i++;
		} else if (isLastCharUpper && isLastLastCharUpper && /[a-zA-Z]/.test(character) && character.toLowerCase() === character) {
			string = string.slice(0, i - 1) + '-' + string.slice(i - 1);
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = false;
			isLastCharLower = true;
		} else {
			isLastCharLower = character.toLowerCase() === character && character.toUpperCase() !== character;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = character.toUpperCase() === character && character.toLowerCase() !== character;
		}
	}

	return string;
};

const camelCase = (input, options) => {
	if (!(typeof input === 'string' || Array.isArray(input))) {
		throw new TypeError('Expected the input to be `string | string[]`');
	}

	options = Object.assign({
		pascalCase: false
	}, options);

	const postProcess = x => options.pascalCase ? x.charAt(0).toUpperCase() + x.slice(1) : x;

	if (Array.isArray(input)) {
		input = input.map(x => x.trim())
			.filter(x => x.length)
			.join('-');
	} else {
		input = input.trim();
	}

	if (input.length === 0) {
		return '';
	}

	if (input.length === 1) {
		return options.pascalCase ? input.toUpperCase() : input.toLowerCase();
	}

	const hasUpperCase = input !== input.toLowerCase();

	if (hasUpperCase) {
		input = preserveCamelCase(input);
	}

	input = input
		.replace(/^[_.\- ]+/, '')
		.toLowerCase()
		.replace(/[_.\- ]+(\w|$)/g, (_, p1) => p1.toUpperCase())
		.replace(/\d+(\w|$)/g, m => m.toUpperCase());

	return postProcess(input);
};

module.exports = camelCase;
// TODO: Remove this for the next major release
module.exports["default"] = camelCase;


/***/ }),

/***/ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js":
/*!**********************************************************************!*\
  !*** ./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GatsbyImage: () => (/* binding */ B),
/* harmony export */   MainImage: () => (/* binding */ z),
/* harmony export */   Placeholder: () => (/* binding */ T),
/* harmony export */   StaticImage: () => (/* binding */ V),
/* harmony export */   generateImageData: () => (/* binding */ f),
/* harmony export */   getImage: () => (/* binding */ M),
/* harmony export */   getImageData: () => (/* binding */ x),
/* harmony export */   getLowResolutionImageURL: () => (/* binding */ m),
/* harmony export */   getSrc: () => (/* binding */ S),
/* harmony export */   getSrcSet: () => (/* binding */ N),
/* harmony export */   withArtDirection: () => (/* binding */ I)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var camelcase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! camelcase */ "./node_modules/camelcase/index.js");
/* harmony import */ var camelcase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(camelcase__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);




function n() {
  return n = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var a = arguments[t];
      for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
  }, n.apply(this, arguments);
}
function o(e, t) {
  if (null == e) return {};
  var a,
    i,
    r = {},
    n = Object.keys(e);
  for (i = 0; i < n.length; i++) t.indexOf(a = n[i]) >= 0 || (r[a] = e[a]);
  return r;
}
var s = [.25, .5, 1, 2],
  l = [750, 1080, 1366, 1920],
  u = [320, 654, 768, 1024, 1366, 1600, 1920, 2048, 2560, 3440, 3840, 4096],
  d = function (e) {
    return console.warn(e);
  },
  c = function (e, t) {
    return e - t;
  },
  h = function (e) {
    return e.map(function (e) {
      return e.src + " " + e.width + "w";
    }).join(",\n");
  };
function g(e) {
  var t = e.lastIndexOf(".");
  if (-1 !== t) {
    var a = e.slice(t + 1);
    if ("jpeg" === a) return "jpg";
    if (3 === a.length || 4 === a.length) return a;
  }
}
function p(e) {
  var t = e.layout,
    i = void 0 === t ? "constrained" : t,
    r = e.width,
    o = e.height,
    s = e.sourceMetadata,
    l = e.breakpoints,
    u = e.aspectRatio,
    d = e.formats,
    c = void 0 === d ? ["auto", "webp"] : d;
  return c = c.map(function (e) {
    return e.toLowerCase();
  }), i = camelcase__WEBPACK_IMPORTED_MODULE_1___default()(i), r && o ? n({}, e, {
    formats: c,
    layout: i,
    aspectRatio: r / o
  }) : (s.width && s.height && !u && (u = s.width / s.height), "fullWidth" === i ? (r = r || s.width || l[l.length - 1], o = o || Math.round(r / (u || 1.3333333333333333))) : (r || (r = o && u ? o * u : s.width ? s.width : o ? Math.round(o / 1.3333333333333333) : 800), u && !o ? o = Math.round(r / u) : u || (u = r / o)), n({}, e, {
    width: r,
    height: o,
    aspectRatio: u,
    layout: i,
    formats: c
  }));
}
function m(e, t) {
  var a;
  return void 0 === t && (t = 20), null == (a = (0, (e = p(e)).generateImageSource)(e.filename, t, Math.round(t / e.aspectRatio), e.sourceMetadata.format || "jpg", e.fit, e.options)) ? void 0 : a.src;
}
function f(e) {
  var t,
    a = (e = p(e)).pluginName,
    i = e.sourceMetadata,
    r = e.generateImageSource,
    o = e.layout,
    u = e.fit,
    c = e.options,
    m = e.width,
    f = e.height,
    b = e.filename,
    k = e.reporter,
    E = void 0 === k ? {
      warn: d
    } : k,
    M = e.backgroundColor,
    S = e.placeholderURL;
  if (a || E.warn('[gatsby-plugin-image] "generateImageData" was not passed a plugin name'), "function" != typeof r) throw new Error("generateImageSource must be a function");
  i && (i.width || i.height) ? i.format || (i.format = g(b)) : i = {
    width: m,
    height: f,
    format: (null == (t = i) ? void 0 : t.format) || g(b) || "auto"
  };
  var N = new Set(e.formats);
  (0 === N.size || N.has("auto") || N.has("")) && (N.delete("auto"), N.delete(""), N.add(i.format)), N.has("jpg") && N.has("png") && (E.warn("[" + a + "] Specifying both 'jpg' and 'png' formats is not supported. Using 'auto' instead"), N.delete("jpg" === i.format ? "png" : "jpg"));
  var x = function (e) {
      var t = e.filename,
        a = e.layout,
        i = void 0 === a ? "constrained" : a,
        r = e.sourceMetadata,
        o = e.reporter,
        u = void 0 === o ? {
          warn: d
        } : o,
        c = e.breakpoints,
        h = void 0 === c ? l : c,
        g = Object.entries({
          width: e.width,
          height: e.height
        }).filter(function (e) {
          var t = e[1];
          return "number" == typeof t && t < 1;
        });
      if (g.length) throw new Error("Specified dimensions for images must be positive numbers (> 0). Problem dimensions you have are " + g.map(function (e) {
        return e.join(": ");
      }).join(", "));
      return "fixed" === i ? function (e) {
        var t = e.filename,
          a = e.sourceMetadata,
          i = e.width,
          r = e.height,
          n = e.fit,
          o = void 0 === n ? "cover" : n,
          l = e.outputPixelDensities,
          u = e.reporter,
          c = void 0 === u ? {
            warn: d
          } : u,
          h = a.width / a.height,
          g = v(void 0 === l ? s : l);
        if (i && r) {
          var p = y(a, {
            width: i,
            height: r,
            fit: o
          });
          i = p.width, r = p.height, h = p.aspectRatio;
        }
        i ? r || (r = Math.round(i / h)) : i = r ? Math.round(r * h) : 800;
        var m = i;
        if (a.width < i || a.height < r) {
          var f = a.width < i ? "width" : "height";
          c.warn("\nThe requested " + f + ' "' + ("width" === f ? i : r) + 'px" for the image ' + t + " was larger than the actual image " + f + " of " + a[f] + "px. If possible, replace the current image with a larger one."), "width" === f ? (i = a.width, r = Math.round(i / h)) : i = (r = a.height) * h;
        }
        return {
          sizes: g.filter(function (e) {
            return e >= 1;
          }).map(function (e) {
            return Math.round(e * i);
          }).filter(function (e) {
            return e <= a.width;
          }),
          aspectRatio: h,
          presentationWidth: m,
          presentationHeight: Math.round(m / h),
          unscaledWidth: i
        };
      }(e) : "constrained" === i ? w(e) : "fullWidth" === i ? w(n({
        breakpoints: h
      }, e)) : (u.warn("No valid layout was provided for the image at " + t + ". Valid image layouts are fixed, fullWidth, and constrained. Found " + i), {
        sizes: [r.width],
        presentationWidth: r.width,
        presentationHeight: r.height,
        aspectRatio: r.width / r.height,
        unscaledWidth: r.width
      });
    }(n({}, e, {
      sourceMetadata: i
    })),
    I = {
      sources: []
    },
    W = e.sizes;
  W || (W = function (e, t) {
    switch (t) {
      case "constrained":
        return "(min-width: " + e + "px) " + e + "px, 100vw";
      case "fixed":
        return e + "px";
      case "fullWidth":
        return "100vw";
      default:
        return;
    }
  }(x.presentationWidth, o)), N.forEach(function (e) {
    var t = x.sizes.map(function (t) {
      var i = r(b, t, Math.round(t / x.aspectRatio), e, u, c);
      if (null != i && i.width && i.height && i.src && i.format) return i;
      E.warn("[" + a + "] The resolver for image " + b + " returned an invalid value.");
    }).filter(Boolean);
    if ("jpg" === e || "png" === e || "auto" === e) {
      var i = t.find(function (e) {
        return e.width === x.unscaledWidth;
      }) || t[0];
      i && (I.fallback = {
        src: i.src,
        srcSet: h(t),
        sizes: W
      });
    } else {
      var n;
      null == (n = I.sources) || n.push({
        srcSet: h(t),
        sizes: W,
        type: "image/" + e
      });
    }
  });
  var j = {
    images: I,
    layout: o,
    backgroundColor: M
  };
  switch (S && (j.placeholder = {
    fallback: S
  }), o) {
    case "fixed":
      j.width = x.presentationWidth, j.height = x.presentationHeight;
      break;
    case "fullWidth":
      j.width = 1, j.height = 1 / x.aspectRatio;
      break;
    case "constrained":
      j.width = e.width || x.presentationWidth || 1, j.height = (j.width || 1) / x.aspectRatio;
  }
  return j;
}
var v = function (e) {
  return Array.from(new Set([1].concat(e))).sort(c);
};
function w(e) {
  var t,
    a = e.sourceMetadata,
    i = e.width,
    r = e.height,
    n = e.fit,
    o = void 0 === n ? "cover" : n,
    l = e.outputPixelDensities,
    u = e.breakpoints,
    d = e.layout,
    h = a.width / a.height,
    g = v(void 0 === l ? s : l);
  if (i && r) {
    var p = y(a, {
      width: i,
      height: r,
      fit: o
    });
    i = p.width, r = p.height, h = p.aspectRatio;
  }
  i = i && Math.min(i, a.width), r = r && Math.min(r, a.height), i || r || (r = (i = Math.min(800, a.width)) / h), i || (i = r * h);
  var m = i;
  return (a.width < i || a.height < r) && (i = a.width, r = a.height), i = Math.round(i), (null == u ? void 0 : u.length) > 0 ? (t = u.filter(function (e) {
    return e <= a.width;
  })).length < u.length && !t.includes(a.width) && t.push(a.width) : t = (t = g.map(function (e) {
    return Math.round(e * i);
  })).filter(function (e) {
    return e <= a.width;
  }), "constrained" !== d || t.includes(i) || t.push(i), {
    sizes: t = t.sort(c),
    aspectRatio: h,
    presentationWidth: m,
    presentationHeight: Math.round(m / h),
    unscaledWidth: i
  };
}
function y(e, t) {
  var a = e.width / e.height,
    i = t.width,
    r = t.height;
  switch (t.fit) {
    case "fill":
      i = t.width ? t.width : e.width, r = t.height ? t.height : e.height;
      break;
    case "inside":
      var n = t.width ? t.width : Number.MAX_SAFE_INTEGER,
        o = t.height ? t.height : Number.MAX_SAFE_INTEGER;
      i = Math.min(n, Math.round(o * a)), r = Math.min(o, Math.round(n / a));
      break;
    case "outside":
      var s = t.width ? t.width : 0,
        l = t.height ? t.height : 0;
      i = Math.max(s, Math.round(l * a)), r = Math.max(l, Math.round(s / a));
      break;
    default:
      t.width && !t.height && (i = t.width, r = Math.round(t.width / a)), t.height && !t.width && (i = Math.round(t.height * a), r = t.height);
  }
  return {
    width: i,
    height: r,
    aspectRatio: i / r
  };
}
var b = ["baseUrl", "urlBuilder", "sourceWidth", "sourceHeight", "pluginName", "formats", "breakpoints", "options"],
  k = ["images", "placeholder"];
function E() {
  return "undefined" != typeof GATSBY___IMAGE && GATSBY___IMAGE;
}
var M = function (e) {
    var t;
    return function (e) {
      var t, a;
      return Boolean(null == e || null == (t = e.images) || null == (a = t.fallback) ? void 0 : a.src);
    }(e) ? e : function (e) {
      return Boolean(null == e ? void 0 : e.gatsbyImageData);
    }(e) ? e.gatsbyImageData : function (e) {
      return Boolean(null == e ? void 0 : e.gatsbyImage);
    }(e) ? e.gatsbyImage : null == e || null == (t = e.childImageSharp) ? void 0 : t.gatsbyImageData;
  },
  S = function (e) {
    var t, a, i;
    return null == (t = M(e)) || null == (a = t.images) || null == (i = a.fallback) ? void 0 : i.src;
  },
  N = function (e) {
    var t, a, i;
    return null == (t = M(e)) || null == (a = t.images) || null == (i = a.fallback) ? void 0 : i.srcSet;
  };
function x(e) {
  var t,
    a = e.baseUrl,
    i = e.urlBuilder,
    r = e.sourceWidth,
    s = e.sourceHeight,
    l = e.pluginName,
    d = void 0 === l ? "getImageData" : l,
    c = e.formats,
    h = void 0 === c ? ["auto"] : c,
    g = e.breakpoints,
    p = e.options,
    m = o(e, b);
  return null != (t = g) && t.length || "fullWidth" !== m.layout && "FULL_WIDTH" !== m.layout || (g = u), f(n({}, m, {
    pluginName: d,
    generateImageSource: function (e, t, a, r) {
      return {
        width: t,
        height: a,
        format: r,
        src: i({
          baseUrl: e,
          width: t,
          height: a,
          options: p,
          format: r
        })
      };
    },
    filename: a,
    formats: h,
    breakpoints: g,
    sourceMetadata: {
      width: r,
      height: s,
      format: "auto"
    }
  }));
}
function I(e, t) {
  var a,
    i,
    r,
    s = e.images,
    l = e.placeholder,
    u = n({}, o(e, k), {
      images: n({}, s, {
        sources: []
      }),
      placeholder: l && n({}, l, {
        sources: []
      })
    });
  return t.forEach(function (t) {
    var a,
      i = t.media,
      r = t.image;
    i ? (r.layout !== e.layout && "development" === "development" && console.warn('[gatsby-plugin-image] Mismatched image layout: expected "' + e.layout + '" but received "' + r.layout + '". All art-directed images use the same layout as the default image'), (a = u.images.sources).push.apply(a, r.images.sources.map(function (e) {
      return n({}, e, {
        media: i
      });
    }).concat([{
      media: i,
      srcSet: r.images.fallback.srcSet
    }])), u.placeholder && u.placeholder.sources.push({
      media: i,
      srcSet: r.placeholder.fallback
    })) :  true && console.warn("[gatsby-plugin-image] All art-directed images passed to must have a value set for `media`. Skipping.");
  }), (a = u.images.sources).push.apply(a, s.sources), null != l && l.sources && (null == (i = u.placeholder) || (r = i.sources).push.apply(r, l.sources)), u;
}
var W,
  j = ["src", "srcSet", "loading", "alt", "shouldLoad"],
  R = ["fallback", "sources", "shouldLoad"],
  _ = function (t) {
    var a = t.src,
      i = t.srcSet,
      r = t.loading,
      s = t.alt,
      l = void 0 === s ? "" : s,
      u = t.shouldLoad,
      d = o(t, j);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", n({}, d, {
      decoding: "async",
      loading: r,
      src: u ? a : void 0,
      "data-src": u ? void 0 : a,
      srcSet: u ? i : void 0,
      "data-srcset": u ? void 0 : i,
      alt: l
    }));
  },
  A = function (t) {
    var a = t.fallback,
      i = t.sources,
      r = void 0 === i ? [] : i,
      s = t.shouldLoad,
      l = void 0 === s || s,
      u = o(t, R),
      d = u.sizes || (null == a ? void 0 : a.sizes),
      c = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_, n({}, u, a, {
        sizes: d,
        shouldLoad: l
      }));
    return r.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("picture", null, r.map(function (t) {
      var a = t.media,
        i = t.srcSet,
        r = t.type;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("source", {
        key: a + "-" + r + "-" + i,
        type: r,
        media: a,
        srcSet: l ? i : void 0,
        "data-srcset": l ? void 0 : i,
        sizes: d
      });
    }), c) : c;
  };
_.propTypes = {
  src: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
  alt: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
  sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
  srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
  shouldLoad: prop_types__WEBPACK_IMPORTED_MODULE_2__.bool
}, A.displayName = "Picture", A.propTypes = {
  alt: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
  shouldLoad: prop_types__WEBPACK_IMPORTED_MODULE_2__.bool,
  fallback: prop_types__WEBPACK_IMPORTED_MODULE_2__.exact({
    src: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
    srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string
  }),
  sources: prop_types__WEBPACK_IMPORTED_MODULE_2__.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2__.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2__.exact({
    media: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
    type: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired
  }), prop_types__WEBPACK_IMPORTED_MODULE_2__.exact({
    media: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    type: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
    sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired
  })]))
};
var O = ["fallback"],
  T = function (t) {
    var a = t.fallback,
      i = o(t, O);
    return a ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(A, n({}, i, {
      fallback: {
        src: a
      },
      "aria-hidden": !0,
      alt: ""
    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", n({}, i));
  };
T.displayName = "Placeholder", T.propTypes = {
  fallback: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
  sources: null == (W = A.propTypes) ? void 0 : W.sources,
  alt: function (e, t, a) {
    return e[t] ? new Error("Invalid prop `" + t + "` supplied to `" + a + "`. Validation failed.") : null;
  }
};
var z = function (t) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(A, n({}, t)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("noscript", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(A, n({}, t, {
    shouldLoad: !0
  }))));
};
z.displayName = "MainImage", z.propTypes = A.propTypes;
var L = ["children"],
  q = function () {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("script", {
      type: "module",
      dangerouslySetInnerHTML: {
        __html: 'const t="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;if(t){const t=document.querySelectorAll("img[data-main-image]");for(let e of t){e.dataset.src&&(e.setAttribute("src",e.dataset.src),e.removeAttribute("data-src")),e.dataset.srcset&&(e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset"));const t=e.parentNode.querySelectorAll("source[data-srcset]");for(let e of t)e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset");e.complete&&(e.style.opacity=1,e.parentNode.parentNode.querySelector("[data-placeholder-image]").style.opacity=0)}}'
      }
    });
  },
  C = function (t) {
    var a = t.layout,
      i = t.width,
      r = t.height;
    return "fullWidth" === a ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      "aria-hidden": !0,
      style: {
        paddingTop: r / i * 100 + "%"
      }
    }) : "constrained" === a ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        maxWidth: i,
        display: "block"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
      alt: "",
      role: "presentation",
      "aria-hidden": "true",
      src: "data:image/svg+xml;charset=utf-8,%3Csvg height='" + r + "' width='" + i + "' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E",
      style: {
        maxWidth: "100%",
        display: "block",
        position: "static"
      }
    })) : null;
  },
  D = function (a) {
    var i = a.children,
      r = o(a, L);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(C, n({}, r)), i, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(q, null));
  },
  P = ["as", "className", "class", "style", "image", "loading", "imgClassName", "imgStyle", "backgroundColor", "objectFit", "objectPosition"],
  H = ["style", "className"],
  F = function (e) {
    return e.replace(/\n/g, "");
  },
  B = function (t) {
    var a = t.as,
      i = void 0 === a ? "div" : a,
      r = t.className,
      s = t.class,
      l = t.style,
      u = t.image,
      d = t.loading,
      c = void 0 === d ? "lazy" : d,
      h = t.imgClassName,
      g = t.imgStyle,
      p = t.backgroundColor,
      m = t.objectFit,
      f = t.objectPosition,
      v = o(t, P);
    if (!u) return console.warn("[gatsby-plugin-image] Missing image prop"), null;
    s && (r = s), g = n({
      objectFit: m,
      objectPosition: f,
      backgroundColor: p
    }, g);
    var w = u.width,
      y = u.height,
      b = u.layout,
      k = u.images,
      M = u.placeholder,
      S = u.backgroundColor,
      N = function (e, t, a) {
        var i = {},
          r = "gatsby-image-wrapper";
        return E() || (i.position = "relative", i.overflow = "hidden"), "fixed" === a ? (i.width = e, i.height = t) : "constrained" === a && (E() || (i.display = "inline-block", i.verticalAlign = "top"), r = "gatsby-image-wrapper gatsby-image-wrapper-constrained"), {
          className: r,
          "data-gatsby-image-wrapper": "",
          style: i
        };
      }(w, y, b),
      x = N.style,
      I = N.className,
      W = o(N, H),
      j = {
        fallback: void 0,
        sources: []
      };
    return k.fallback && (j.fallback = n({}, k.fallback, {
      srcSet: k.fallback.srcSet ? F(k.fallback.srcSet) : void 0
    })), k.sources && (j.sources = k.sources.map(function (e) {
      return n({}, e, {
        srcSet: F(e.srcSet)
      });
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(i, n({}, W, {
      style: n({}, x, l, {
        backgroundColor: p
      }),
      className: I + (r ? " " + r : "")
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(D, {
      layout: b,
      width: w,
      height: y
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(T, n({}, function (e, t, a, i, r, o, s, l) {
      var u = {};
      o && (u.backgroundColor = o, "fixed" === a ? (u.width = i, u.height = r, u.backgroundColor = o, u.position = "relative") : ("constrained" === a || "fullWidth" === a) && (u.position = "absolute", u.top = 0, u.left = 0, u.bottom = 0, u.right = 0)), s && (u.objectFit = s), l && (u.objectPosition = l);
      var d = n({}, e, {
        "aria-hidden": !0,
        "data-placeholder-image": "",
        style: n({
          opacity: 1,
          transition: "opacity 500ms linear"
        }, u)
      });
      return E() || (d.style = {
        height: "100%",
        left: 0,
        position: "absolute",
        top: 0,
        width: "100%"
      }), d;
    }(M, 0, b, w, y, S, m, f))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(z, n({
      "data-gatsby-image-ssr": "",
      className: h
    }, v, function (e, t, a, i, r) {
      return void 0 === r && (r = {}), E() || (r = n({
        height: "100%",
        left: 0,
        position: "absolute",
        top: 0,
        transform: "translateZ(0)",
        transition: "opacity 250ms linear",
        width: "100%",
        willChange: "opacity"
      }, r)), n({}, a, {
        loading: i,
        shouldLoad: e,
        "data-main-image": "",
        style: n({}, r, {
          opacity: 0
        })
      });
    }("eager" === c, 0, j, c, g)))));
  },
  G = ["src", "__imageData", "__error", "width", "height", "aspectRatio", "tracedSVGOptions", "placeholder", "formats", "quality", "transformOptions", "jpgOptions", "pngOptions", "webpOptions", "avifOptions", "blurredOptions", "breakpoints", "outputPixelDensities"],
  V = function (t) {
    return function (a) {
      var i = a.src,
        r = a.__imageData,
        s = a.__error,
        l = o(a, G);
      return s && console.warn(s), r ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(t, n({
        image: r
      }, l)) : (console.warn("Image not loaded", i), s || "development" !== "development" || console.warn('Please ensure that "gatsby-plugin-image" is included in the plugins array in gatsby-config.js, and that your version of gatsby is at least 2.24.78'), null);
    };
  }(B),
  U = function (e, t) {
    return "fullWidth" !== e.layout || "width" !== t && "height" !== t || !e[t] ? prop_types__WEBPACK_IMPORTED_MODULE_2___default().number.apply((prop_types__WEBPACK_IMPORTED_MODULE_2___default()), [e, t].concat([].slice.call(arguments, 2))) : new Error('"' + t + '" ' + e[t] + " may not be passed when layout is fullWidth.");
  },
  X = new Set(["fixed", "fullWidth", "constrained"]),
  Y = {
    src: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired,
    alt: function (e, t, a) {
      return e.alt || "" === e.alt ? prop_types__WEBPACK_IMPORTED_MODULE_2___default().string.apply((prop_types__WEBPACK_IMPORTED_MODULE_2___default()), [e, t, a].concat([].slice.call(arguments, 3))) : new Error('The "alt" prop is required in ' + a + '. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html');
    },
    width: U,
    height: U,
    sizes: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
    layout: function (e) {
      if (void 0 !== e.layout && !X.has(e.layout)) return new Error("Invalid value " + e.layout + '" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".');
    }
  };
V.displayName = "StaticImage", V.propTypes = Y;


/***/ }),

/***/ "./src/components/Footer/index.js":
/*!****************************************!*\
  !*** ./src/components/Footer/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var _footer_logo_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./footer_logo.svg */ "./src/components/Footer/footer_logo.svg");
/* harmony import */ var _creative_commons_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./creative_commons.svg */ "./src/components/Footer/creative_commons.svg");


// import "./style.css"


function FooterLogo() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    src: _footer_logo_svg__WEBPACK_IMPORTED_MODULE_2__["default"],
    alt: "Hike with Gravity Logo",
    loading: "lazy"
  });
}
function CreativeCommonsLogo() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    src: _creative_commons_svg__WEBPACK_IMPORTED_MODULE_3__["default"],
    alt: "Creative Commons license Logo",
    loading: "lazy"
  });
}
const Footer = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("footer", {
  className: "footer"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("nav", {
  role: "navigation",
  "aria-labelledby": "footer-menu",
  id: "footer-menu"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", {
  className: "visually-hidden footer-menu__title"
}, "Menu"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
  className: "footer-menu"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
  className: "footer-menu__item"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
  to: "/",
  title: "Home page",
  className: "footer-menu__link"
}, "Home")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
  className: "footer-menu__item"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
  to: "/hikes",
  title: "Latest hike reports",
  className: "footer-menu__link"
}, "Hikes")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
  className: "footer-menu__item"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
  to: "/gear",
  title: "Gear I carry or have used",
  className: "footer-menu__link"
}, "Gear")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
  className: "footer-menu__item"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
  to: "/about",
  title: "About Gravity and this site",
  className: "footer-menu__link"
}, "About")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
  className: "footer-menu__item"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
  to: "/contact",
  title: "Send a message to Gravity",
  className: "footer-menu__link"
}, "Contact")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
  className: "footer-menu__item"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
  to: "/subscribe",
  title: "Sign up to receive email updates",
  className: "footer-menu__link"
}, "Subscribe")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
  className: "footer-credits"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
  className: "footer-credits__image"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
  href: "/",
  title: "Home page"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(FooterLogo, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
  className: "footer-credits__copyright"
}, "Copyright 2017 - ", new Date().getFullYear(), " by Jim \"Gravity\" Smith"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
  className: "footer-credits__links"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
  rel: "license",
  title: "Creative Commons license",
  href: "http://creativecommons.org/licenses/by-nc/4.0/"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(CreativeCommonsLogo, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "This work is licensed under a", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
  rel: "license",
  href: "http://creativecommons.org/licenses/by-nc/4.0/"
}, "\xA0Creative Commons Attribution-NonCommercial 4.0 International License.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "This site was built by", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
  href: "https://www.startinggravity.com"
}, " Starting Gravity"), " using the open-source projects ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
  href: "https://drupal.org"
}, "Drupal"), " and", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
  href: "https://gatsbyjs.org"
}, " GatsbyJS"), "."))));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Footer);

/***/ }),

/***/ "./src/components/HeaderMenu/index.js":
/*!********************************************!*\
  !*** ./src/components/HeaderMenu/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Logo */ "./src/components/Logo/index.js");
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");



class HeaderMenu extends (react__WEBPACK_IMPORTED_MODULE_0___default().Component) {
  constructor(...args) {
    super(...args);
    this.state = {
      showMenu: false,
      showSearch: false
    };
    this.toggleMenu = () => {
      this.setState({
        showMenu: !this.state.showMenu
      });
    };
  }
  render() {
    const menuActive = this.state.showMenu ? "show-menu" : "no-menu";
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: `off-canvas ${menuActive}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "search-menu"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("nav", {
      role: "navigation",
      className: "main-menu"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", {
      className: "visually-hidden"
    }, "Main navigation"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
      className: "main-menu__list"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "main-menu__item main-menu__item--expanded"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      to: "/hikes",
      title: "Hike Reports",
      className: "main-menu__link main-menu__link--hikes text-3xl"
    }, "Hikes"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
      className: "menu main-menu__submenu",
      style: {
        borderTop: "1px solid #999"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "main-menu__item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      to: "/hikes/at-2017",
      title: "Hike Reports: Aooalachian Trail 2017",
      className: "main-menu__link main-menu__link--appalachian-trail-2017"
    }, "Appalachian Trail 2017")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "main-menu__item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      to: "/hikes/pct-2019",
      title: "Hike Reports: Pacific Crest Trail 2019",
      className: "main-menu__link main-menu__link--pacific-crest-trail-2019"
    }, "Pacific Crest Trail 2019")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "main-menu__item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      to: "/hikes/bmt-2020",
      title: "Hike Reports: Benton MacKaye Trail 2020",
      className: "main-menu__link main-menu__link--benton-mackaye-trail-2020"
    }, "Benton MacKaye Trail 2020")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "main-menu__item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      to: "/hikes/cdt-2021",
      title: "Hike Reports: Continental Divide Trail 2021",
      className: "main-menu__link main-menu__link--continental-divide-trail-2021"
    }, "Continental Divide Trail 2021")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "main-menu__item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      to: "/hikes/pt-2022",
      title: "Hike Reports: Pinhoti Trail 2022",
      className: "main-menu__link main-menu__link--continental-divide-trail-2021"
    }, "Pinhoti Trail 2022")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "main-menu__item main-menu__item--active-trail"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      to: "/gear",
      title: "Gear",
      className: "main-menu__link main-menu__link--gear text-3xl"
    }, "Gear")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "main-menu__item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      to: "/about",
      title: "About Gravity and this site",
      className: "main-menu__link main-menu__link--about text-3xl"
    }, "About")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "main-menu__item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      to: "/contact",
      title: "Contact Gravity",
      className: "main-menu__link main-menu__link--contact text-3xl"
    }, "Contact")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "main-menu__item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      to: "/subscribe",
      title: "Sign up to receive email updates",
      className: "main-menu__link main-menu__link--subscribe text-xl"
    }, "Sign up to receive email updates"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "header__wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "header__inner flex flex-row justify-between items-start"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "site-header__menu-button"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      className: "menu-button__toggle js-toggle__menu",
      href: "#",
      onClick: this.toggleMenu,
      "aria-label": "Menu"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "menu-button__text"
    }, "Menu"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "site-logo"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Logo__WEBPACK_IMPORTED_MODULE_1__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "site-header__search-button"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      "aria-label": "Search",
      className: "search-button__toggle js-toggle__search",
      to: "/search"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "search-button__text"
    }, "Search")))))));
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeaderMenu);

/***/ }),

/***/ "./src/components/Logo/index.js":
/*!**************************************!*\
  !*** ./src/components/Logo/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _logo_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logo.svg */ "./src/components/Logo/logo.svg");


const Logo = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
  href: "/",
  rel: "Home",
  className: "site-header__logo-link"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
  className: "site-header__logo-img site-header__logo-img--sm md:site-header__logo-img--med lg:site-header__logo-img--lg"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
  src: _logo_svg__WEBPACK_IMPORTED_MODULE_1__["default"],
  alt: "Hike with Gtravity"
})));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Logo);

/***/ }),

/***/ "./src/components/SocialMedia/index.js":
/*!*********************************************!*\
  !*** ./src/components/SocialMedia/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const SocialMedia = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
  className: "social-media"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "Follow me and subscribe to my email newsletter"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
  className: "social-media__list"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
  className: "social-media__item"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
  href: "https://twitter.com/hikewithgravity",
  title: "Follow me on Twitter",
  className: "social-media__link social-media__link--twitter"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
  className: "visually-hidden"
}, "Twitter"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
  className: "social-media__item"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
  href: "https://www.instagram.com/hikewithgravity/",
  title: "Follow me on Instagram",
  className: "social-media__link social-media__link--instagram"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
  className: "visually-hidden"
}, "Instagram"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
  className: "social-media__item"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
  href: "https://www.facebook.com/jim.smith",
  title: "Follow me on Facebook",
  className: "social-media__link social-media__link--facebook"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
  className: "visually-hidden"
}, "Facebook"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
  className: "social-media__item"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
  href: "/subscribe",
  title: "Sign up to receive email updates",
  className: "social-media__link social-media__link--subscribe"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
  className: "visually-hidden"
}, "Subscribe"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
  className: "social-media__item"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
  href: "/hikes.xml",
  title: "RSS Feed",
  className: "social-media__link social-media__link--rss"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
  className: "visually-hidden"
}, "RSS")))));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SocialMedia);

/***/ }),

/***/ "./src/components/field/subtitle.js":
/*!******************************************!*\
  !*** ./src/components/field/subtitle.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostSubTitle)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function PostSubTitle({
  children
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", {
    className: "text-gray-100 font-extrabold text-4xl md:text-5xl lg:text-7xl leading-none"
  }, children);
}

/***/ }),

/***/ "./src/components/field/title.js":
/*!***************************************!*\
  !*** ./src/components/field/title.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostTitle)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function PostTitle({
  children
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", {
    className: "text-gray-100 font-bold text-1xl sm:text-2xl lg:text-3xl leading-none py-10"
  }, children);
}

/***/ }),

/***/ "./src/components/layout.js":
/*!**********************************!*\
  !*** ./src/components/layout.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _HeaderMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HeaderMenu */ "./src/components/HeaderMenu/index.js");
/* harmony import */ var _SocialMedia__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SocialMedia */ "./src/components/SocialMedia/index.js");
/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Footer */ "./src/components/Footer/index.js");
/* harmony import */ var _helpers_trigger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/trigger */ "./src/helpers/trigger.js");
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/globals.css */ "./src/styles/globals.css");
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_5__);


// import { useStaticQuery, graphql } from "gatsby"





const Layout = ({
  children
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_helpers_trigger__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_HeaderMenu__WEBPACK_IMPORTED_MODULE_1__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("main", {
    className: "main overflow-hidden"
  }, children, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "py-0 bg-white"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "main__social mt-6 mx-auto max-w-3xl px-5"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_SocialMedia__WEBPACK_IMPORTED_MODULE_2__["default"], null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Footer__WEBPACK_IMPORTED_MODULE_3__["default"], null));
};
Layout.propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().node).isRequired
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

/***/ }),

/***/ "./src/components/seo.js":
/*!*******************************!*\
  !*** ./src/components/seo.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _public_page_data_sq_d_764694655_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../public/page-data/sq/d/764694655.json */ "./public/page-data/sq/d/764694655.json");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-helmet */ "./node_modules/react-helmet/es/Helmet.js");
/* harmony import */ var _assets_images_hike_with_gravity_logo_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/images/hike-with-gravity-logo.jpg */ "./src/assets/images/hike-with-gravity-logo.jpg");

/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */





function SEO({
  description,
  keywords,
  lang,
  meta,
  title,
  category,
  nodePath,
  nodeImage
}) {
  const {
    site
  } = _public_page_data_sq_d_764694655_json__WEBPACK_IMPORTED_MODULE_0__.data;
  const metaDescription = description || site.siteMetadata.description;
  // const defaultTitle = site.siteMetadata.title
  // const metaKeywords = keywords || site.siteMetadata.keywords
  const defaultImage = `${site.siteMetadata.siteUrl}${_assets_images_hike_with_gravity_logo_jpg__WEBPACK_IMPORTED_MODULE_3__["default"]}`;
  const defaultUrl = site.siteMetadata.siteUrl;
  const blogPath = site.siteMetadata.siteUrl + nodePath;
  const imagePath = site.siteMetadata.siteUrl + nodeImage;
  const url = blogPath + `/` || 0;
  const metaImage = imagePath || defaultImage;
  const metaTitle = title || site.siteMetadata.title;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_helmet__WEBPACK_IMPORTED_MODULE_2__.Helmet, {
    htmlAttributes: {
      lang
    },
    title: metaTitle,
    titleTemplate: `%s | ${site.siteMetadata.title}`,
    meta: [{
      name: `HandheldFriendly`,
      content: `true`
    }, {
      name: `MobileOptimized`,
      content: `width`
    }, {
      name: `description`,
      content: metaDescription
    }, {
      name: `thumbnail`,
      content: metaImage
    }, {
      property: `image`,
      content: metaImage
    }, {
      property: `og:site_name`,
      content: `Hike with Gravity`
    }, {
      property: `og:title`,
      content: metaTitle
    }, {
      property: `og:url`,
      content: url
    }, {
      property: `og:description`,
      content: metaDescription
    }, {
      property: `og:type`,
      content: `website`
    }, {
      property: `og:locale`,
      content: `en-US`
    }, {
      property: `og:image`,
      content: metaImage
    }, {
      property: `og:image:type`,
      content: `image/jpeg`
    }, {
      name: `og:image:alt`,
      content: metaTitle
    }, {
      name: `og:image:width`,
      content: `1200`
    }, {
      name: `og:image:height`,
      content: `675`
    }, {
      property: `article:author`,
      content: `641895471`
    }, {
      property: `article:publisher`,
      content: `https://www.facebook.com/jim.smith`
    }, {
      name: `twitter:site`,
      content: `@hikewithgravity`
    }, {
      name: `twitter:card`,
      content: `summary_large_image`
    }, {
      property: `twitter:image`,
      content: metaImage
    }, {
      name: `twitter:site:id`,
      content: `2986914490`
    }, {
      name: `twitter:creator`,
      content: site.siteMetadata.author
    }, {
      name: `twitter:creator:id`,
      content: `2986914490`
    }, {
      name: `twitter:title`,
      content: metaTitle
    }, {
      name: `twitter:description`,
      content: metaDescription
    }, {
      name: `twitter:image:alt`,
      content: metaTitle
    }, {
      name: `twitter:image:width`,
      content: `600`
    }, {
      name: `twitter:image:height`,
      content: `338`
    }, {
      name: `news_keywords`,
      content: `backpacking, hiking, Appalachian Trail, Continental Divide Trail, Pacific Crest Trail, AT, PCT, CDT, long distance hiking, thru-hiking`
    }, {
      name: `keywords`,
      content: `backpacking, hiking, Appalachian Trail, Continental Divide Trail, Pacific Crest Trail, AT, PCT, CDT, long distance hiking, thru-hiking`
    }, {
      name: `google-site-verification`,
      content: `x_GeJdd3hdrVD476zhxG_VKS_kITt0_24ILpqhfkPhk`
    }, {
      property: `fb:app_id`,
      content: `1224500344298525`
    }, {
      property: `fb:admins`,
      content: `641895471`
    },
    // {
    //   name: `keywords`,
    //   content: metaKeywords.join(", "),
    // },
    {
      name: `robots`,
      content: `index, follow`
    }, {
      name: `referrer`,
      content: `no-referrer-when-downgrade`
    }, {
      name: `rights`,
      content: `This work is licensed under a Creative Commons Attribution-NonCommercial 4.0 International License.`
    }].concat(meta)
  });
}
SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``
};
SEO.propTypes = {
  description: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string),
  lang: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string),
  meta: prop_types__WEBPACK_IMPORTED_MODULE_4___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_4___default().object)),
  title: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string).isRequired
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SEO);

/***/ }),

/***/ "./src/helpers/trigger.js":
/*!********************************!*\
  !*** ./src/helpers/trigger.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

class Trigger extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(...args) {
    super(...args);
    this.toggleBodyClass = () => {
      if (window.scrollY < 100) {
        document.body.classList.remove("content--scroll");
      } else {
        document.body.classList.add("content--scroll");
      }
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.toggleBodyClass);
    this.toggleBodyClass();
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.toggleBodyClass);
  }
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Trigger);

/***/ }),

/***/ "./src/pages/hikes.js?export=default":
/*!*******************************************!*\
  !*** ./src/pages/hikes.js?export=default ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gatsby-plugin-image */ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js");
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/seo */ "./src/components/seo.js");
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/layout */ "./src/components/layout.js");
/* harmony import */ var _components_field_title__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/field/title */ "./src/components/field/title.js");
/* harmony import */ var _components_field_subtitle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/field/subtitle */ "./src/components/field/subtitle.js");







const Hikes = () => {
  const fullTitle = "Hike Reports:";
  const subTitle = "All Hikes";
  const coverImage = "../images/sun-trees-appalachian-trail.jpeg";
  const socialImage = "/all-hikes.jpeg";
  const thisPath = "/hikes";
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_layout__WEBPACK_IMPORTED_MODULE_3__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_seo__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: subTitle,
    description: "All of the daily reports about Gravity's long-distance hikes.",
    keywords: [`Pacific Crest Trail`, `Appalachian Trail`, `Continental Divide Trail`, `Mojave Desert`, `Sierra Nevada`, `Great Smoky Mountains`, `White Mountains`, `Springer Mountain`, `Mount Katahdin`, `Benton MacKaye`, `Pinhoti`, `Foothills Trail`, `Bartram Trail`, `AT`, `PCT`, `CDT`, `thru-hiking`, `thru-gear`, `Triple Crown`, `backpacking`, `hiking`, `trail`, `long distance hiking`, `blog`, `Gravity`, `Hike with Gravity`],
    nodePath: thisPath,
    nodeImage: socialImage
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "main__content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "h-screen relative max-h-96 list-page"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "heading-container absolute flex justify-center items-center bottom-20 w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mx-2 text-center w-9/12 cover-text"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_field_title__WEBPACK_IMPORTED_MODULE_4__["default"], null, fullTitle), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_field_subtitle__WEBPACK_IMPORTED_MODULE_5__["default"], null, subTitle))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "fixed -z-10 cover-image h-screen max-h-96"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_6__.StaticImage, {
    alt: `A photo from ` + subTitle,
    src: coverImage,
    className: "h-screen max-h-96",
    loading: "eager",
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/1096160784.json */ "./.cache/caches/gatsby-plugin-image/1096160784.json")
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "relative z-0 bg-white"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mx-auto max-w-5xl"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mt-6 text-2xl prose mx-auto max-w-3xl px-5 py-4 text-gravBlack"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "I kept detailed notes during my long-distance hikes. Then after returning home, I wrote reports about each day. You can find these by following the links below."))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mx-auto max-w-5xl py-2.5"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", {
    className: "gravBlack text-center font-bold text-2xl md:text-3xl lg:text-4xl my-4"
  }, "The Triple Crown of Long-distance Hiking"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "hike-list-triple"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("article", {
    className: "hike-list__item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/hikes/at-2017/"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "hike-list__text"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "Appalachian Trail 2017")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "hike-list__image"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_6__.StaticImage, {
    alt: "Appalachian Trail 2017",
    src: "../images/appalachian-trail_mcafee-knob.jpeg",
    width: "1024",
    aspectRatio: 6,
    className: "blog-thumb",
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/890521072.json */ "./.cache/caches/gatsby-plugin-image/890521072.json")
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("article", {
    className: "hike-list__item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/hikes/pct-2019/"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "hike-list__text"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "Pacific Crest Trail 2019")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "hike-list__image"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_6__.StaticImage, {
    alt: "Pacific Crest Trail 2019",
    src: "../images/pacific-crest-trail_goat-rocks.jpeg",
    width: "1024",
    aspectRatio: 6,
    className: "blog-thumb",
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/2941136215.json */ "./.cache/caches/gatsby-plugin-image/2941136215.json")
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("article", {
    className: "hike-list__item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/hikes/cdt-2021/"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "hike-list__text"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "Continental Divide Trail 2021")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "hike-list__image"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_6__.StaticImage, {
    alt: "Continental Divide Trail 2021",
    src: "../images/cdt_header.jpeg",
    width: "1024",
    aspectRatio: 6,
    className: "blog-thumb",
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/2974262053.json */ "./.cache/caches/gatsby-plugin-image/2974262053.json")
  })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mx-auto max-w-5xl pt-2.5 pb-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", {
    className: "gravBlack text-center font-bold text-2xl md:text-3xl lg:text-4xl my-4"
  }, "Other Hikes"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "hike-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("article", {
    className: "hike-list__item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/hikes/bmt-2020/"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "hike-list__text"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "Benton MacKaye Trail 2020")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "hike-list__image"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_6__.StaticImage, {
    alt: "Benton MacKaye Trail 2020",
    src: "../images/bmt_teaser.jpeg",
    width: "330",
    aspectRatio: 1,
    className: "blog-thumb",
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/2751838524.json */ "./.cache/caches/gatsby-plugin-image/2751838524.json")
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("article", {
    className: "hike-list__item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/hikes/alt-2021/"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "hike-list__text"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "Art Loeb Trail 2021", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "(reports coming soon)"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "hike-list__image"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_6__.StaticImage, {
    alt: "Art Loeb Trail 2021",
    src: "../images/alt_teaser.jpeg",
    width: "330",
    aspectRatio: 1,
    className: "blog-thumb",
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/3984001113.json */ "./.cache/caches/gatsby-plugin-image/3984001113.json")
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("article", {
    className: "hike-list__item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/hikes/pt-2022/"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "hike-list__text"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "Pinhoti Trail 2022", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "(reports coming soon)"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "hike-list__image"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_6__.StaticImage, {
    alt: "Pinhoti Trail 2022",
    src: "../images/pt_teaser.jpeg",
    width: "330",
    aspectRatio: 1,
    className: "blog-thumb",
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/2163915570.json */ "./.cache/caches/gatsby-plugin-image/2163915570.json")
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("article", {
    className: "hike-list__item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/hikes/fht-bt-2022/"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "hike-list__text"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "Foothills and Bartram trails 2022", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "(reports coming soon)"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "hike-list__image"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_6__.StaticImage, {
    alt: "Foothills and Bartram trails 2022",
    src: "../images/fht-bt_teaser.jpeg",
    width: "330",
    aspectRatio: 1,
    className: "blog-thumb",
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/3342056799.json */ "./.cache/caches/gatsby-plugin-image/3342056799.json")
  })))))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Hikes);

/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "./src/assets/images/hike-with-gravity-logo.jpg":
/*!******************************************************!*\
  !*** ./src/assets/images/hike-with-gravity-logo.jpg ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/static/hike-with-gravity-logo-c40985ecb808a33796150447dfea4a9f.jpg");

/***/ }),

/***/ "./src/components/Footer/creative_commons.svg":
/*!****************************************************!*\
  !*** ./src/components/Footer/creative_commons.svg ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgo8c3ZnCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgeG1sbnM6Y2M9Imh0dHA6Ly93ZWIucmVzb3VyY2Uub3JnL2NjLyIKICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHdpZHRoPSI4MCIKICAgaGVpZ2h0PSIxNSIKICAgaWQ9InN2ZzIyNzkiCiAgIHNvZGlwb2RpOnZlcnNpb249IjAuMzIiCiAgIGlua3NjYXBlOnZlcnNpb249IjAuNDUrZGV2ZWwiCiAgIHZlcnNpb249IjEuMCIKICAgc29kaXBvZGk6ZG9jbmFtZT0iYnktbmMuc3ZnIgogICBpbmtzY2FwZTpvdXRwdXRfZXh0ZW5zaW9uPSJvcmcuaW5rc2NhcGUub3V0cHV0LnN2Zy5pbmtzY2FwZSI+CiAgPGRlZnMKICAgICBpZD0iZGVmczIyODEiPgogICAgPGNsaXBQYXRoCiAgICAgICBjbGlwUGF0aFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIKICAgICAgIGlkPSJjbGlwUGF0aDM0NDIiPgogICAgICA8cmVjdAogICAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDowLjkyMjQzNTM0O3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICAgIGlkPSJyZWN0MzQ0NCIKICAgICAgICAgd2lkdGg9IjIwLjYxNDA1OCIKICAgICAgICAgaGVpZ2h0PSIxMi40ODM3MDMiCiAgICAgICAgIHg9IjE3MS45OTgzMiIKICAgICAgICAgeT0iMjM5LjEyMDMiIC8+CiAgICA8L2NsaXBQYXRoPgogIDwvZGVmcz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9ImJhc2UiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjOTk5OTk5IgogICAgIGJvcmRlcm9wYWNpdHk9IjEiCiAgICAgZ3JpZHRvbGVyYW5jZT0iMTAwMDAiCiAgICAgZ3VpZGV0b2xlcmFuY2U9IjEwIgogICAgIG9iamVjdHRvbGVyYW5jZT0iMTAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnpvb209IjEwLjUxMjUiCiAgICAgaW5rc2NhcGU6Y3g9IjQwIgogICAgIGlua3NjYXBlOmN5PSI3LjUiCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9InB4IgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImxheWVyMSIKICAgICB3aWR0aD0iODBweCIKICAgICBoZWlnaHQ9IjE1cHgiCiAgICAgc2hvd2JvcmRlcj0idHJ1ZSIKICAgICBpbmtzY2FwZTpzaG93cGFnZXNoYWRvdz0iZmFsc2UiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSI5MzUiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iNjI0IgogICAgIGlua3NjYXBlOndpbmRvdy14PSI1MCIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMTYwIiAvPgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTIyODQiPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxnCiAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiCiAgICAgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciIKICAgICBpZD0ibGF5ZXIxIj4KICAgIDxnCiAgICAgICBpZD0iQlktTkMiCiAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLjk4NzUwMTksMCwwLDAuOTMzMzUxOCwtMzIzLjkwMDY0LC0zMDIuNjc3NDkpIj4KICAgICAgPGcKICAgICAgICAgaWQ9ImczNzExIgogICAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNTgsODcpIj4KICAgICAgICA8cmVjdAogICAgICAgICAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuMDQxNjE3NjM7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgICBpZD0icmVjdDM3MTMiCiAgICAgICAgICAgd2lkdGg9IjgwIgogICAgICAgICAgIGhlaWdodD0iMTUiCiAgICAgICAgICAgeD0iMTcwLjUiCiAgICAgICAgICAgeT0iMjM3Ljg2MjE4IiAvPgogICAgICAgIDxyZWN0CiAgICAgICAgICAgeT0iMjM5LjM2MjE4IgogICAgICAgICAgIHg9IjE3MiIKICAgICAgICAgICBoZWlnaHQ9IjEyIgogICAgICAgICAgIHdpZHRoPSI3NyIKICAgICAgICAgICBpZD0icmVjdDM3MTUiCiAgICAgICAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MC45MjI0MzUzNDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIiAvPgogICAgICAgIDxwYXRoCiAgICAgICAgICAgc3R5bGU9ImZpbGw6I2FiYjFhYTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MTtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eTowLjQ2OTEzNTc4IgogICAgICAgICAgIGQ9Ik0gMTcxLjk5OTk2LDIzOS4zNzUwNSBMIDE3MS45OTk5NiwyNTEuMzc1MDUgTCAxOTIuMzM0NzQsMjUxLjM3NTA1IEMgMTkzLjY0MzM5LDI0OS42MjQ3NCAxOTQuNTI2NTIsMjQ3LjU5MDU3IDE5NC41MjY1MiwyNDUuMzc1MDUgQyAxOTQuNTI2NTIsMjQzLjE3NDMxIDE5My42NTg1OSwyNDEuMTE3OSAxOTIuMzY1OTksMjM5LjM3NTA1IEwgMTcxLjk5OTk2LDIzOS4zNzUwNSB6IgogICAgICAgICAgIGlkPSJwYXRoMzcxNyIKICAgICAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjY3NjYyIgLz4KICAgICAgICA8ZwogICAgICAgICAgIGlkPSJnMzcxOSIKICAgICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLjk2MTI1MzMsMCwwLDAuOTYxMjUzMyw2LjgzNDE1NjYsOS41MDY5OTk0KSIKICAgICAgICAgICBjbGlwLXBhdGg9InVybCgjY2xpcFBhdGgzNDQyKSI+CiAgICAgICAgICA8cGF0aAogICAgICAgICAgICAgaWQ9InBhdGgzNzIxIgogICAgICAgICAgICAgY3g9IjI5Ni4zNTQxNiIKICAgICAgICAgICAgIHJ5PSIyMi45Mzk1NDgiCiAgICAgICAgICAgICBjeT0iMjY0LjM1NzciCiAgICAgICAgICAgICB0eXBlPSJhcmMiCiAgICAgICAgICAgICByeD0iMjIuOTM5NTQ4IgogICAgICAgICAgICAgZD0iTSAxOTAuMDY0MTcsMjQ1LjM2MjA2IEMgMTkwLjA2NjY3LDI0OS4yNTQwNSAxODYuOTEzMjYsMjUyLjQxMDcyIDE4My4wMjE1MywyNTIuNDEzMjMgQyAxNzkuMTI5NzksMjUyLjQxNTcyIDE3NS45NzI2MiwyNDkuMjYyNTYgMTc1Ljk3MDM2LDI0NS4zNzA2IEMgMTc1Ljk3MDM2LDI0NS4zNjc4MyAxNzUuOTcwMzYsMjQ1LjM2NTA3IDE3NS45NzAzNiwyNDUuMzYyMDYgQyAxNzUuOTY4MSwyNDEuNDcwMDcgMTc5LjEyMTI2LDIzOC4zMTM0IDE4My4wMTMsMjM4LjMxMTEzIEMgMTg2LjkwNTI0LDIzOC4zMDg2NCAxOTAuMDYxOTEsMjQxLjQ2MTgxIDE5MC4wNjQxNywyNDUuMzUzOCBDIDE5MC4wNjQxNywyNDUuMzU2MjggMTkwLjA2NDE3LDI0NS4zNTkyOSAxOTAuMDY0MTcsMjQ1LjM2MjA2IHoiCiAgICAgICAgICAgICBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6I2ZmZmZmZiIgLz4KICAgICAgICAgIDxwYXRoCiAgICAgICAgICAgICBkPSJNIDE4OC43NDU3NiwyMzkuNjIyMjYgQyAxOTAuMzA4NDMsMjQxLjE4NDkyIDE5MS4wODk4OCwyNDMuMDk4NjkgMTkxLjA4OTg4LDI0NS4zNjIwNiBDIDE5MS4wODk4OCwyNDcuNjI1OTIgMTkwLjMyMTk3LDI0OS41MTkxMyAxODguNzg2MTUsMjUxLjA0MTY1IEMgMTg3LjE1NjI3LDI1Mi42NDUyMSAxODUuMjI5OTUsMjUzLjQ0NjcyIDE4My4wMDcyMiwyNTMuNDQ2NzIgQyAxODAuODExMzIsMjUzLjQ0NjcyIDE3OC45MTgzNywyNTIuNjUxNzIgMTc3LjMyODg3LDI1MS4wNjE3NCBDIDE3NS43MzkxMiwyNDkuNDcxOTggMTc0Ljk0NDM2LDI0Ny41NzIyNiAxNzQuOTQ0MzYsMjQ1LjM2MjA2IEMgMTc0Ljk0NDM2LDI0My4xNTIzNSAxNzUuNzM5MTIsMjQxLjIzOTA4IDE3Ny4zMjg4NywyMzkuNjIyMjYgQyAxNzguODc3OTksMjM4LjA1OTEgMTgwLjc3MDk0LDIzNy4yNzc2NCAxODMuMDA3MjIsMjM3LjI3NzY0IEMgMTg1LjI3MDYsMjM3LjI3NzY0IDE4Ny4xODMxMiwyMzguMDU5MDkgMTg4Ljc0NTc2LDIzOS42MjIyNiB6IE0gMTc4LjM4MDkzLDI0MC42NzM1NSBDIDE3Ny4wNTk3OCwyNDIuMDA4IDE3Ni4zOTk0NSwyNDMuNTcxMTYgMTc2LjM5OTQ1LDI0NS4zNjQyOSBDIDE3Ni4zOTk0NSwyNDcuMTU2OTQgMTc3LjA1MzI2LDI0OC43MDY4MiAxNzguMzYwNjIsMjUwLjAxMzkzIEMgMTc5LjY2ODIyLDI1MS4zMjE1MyAxODEuMjI0ODcsMjUxLjk3NTA5IDE4My4wMzEwNSwyNTEuOTc1MDkgQyAxODQuODM3MjQsMjUxLjk3NTA5IDE4Ni40MDcxNiwyNTEuMzE1MDIgMTg3Ljc0MTYxLDI0OS45OTQxMiBDIDE4OS4wMDg2LDI0OC43NjcyNSAxODkuNjQyMzQsMjQ3LjIyNDY3IDE4OS42NDIzNCwyNDUuMzY0MjkgQyAxODkuNjQyMzQsMjQzLjUxNzk5IDE4OC45OTgzMSwyNDEuOTUwODQgMTg3LjcxMTAxLDI0MC42NjM1NCBDIDE4Ni40MjM5NiwyMzkuMzc2NDkgMTg0Ljg2NDA2LDIzOC43MzI3IDE4My4wMzEwNSwyMzguNzMyNyBDIDE4MS4xOTgwNCwyMzguNzMyNzEgMTc5LjY0NzY3LDIzOS4zNzk3NSAxNzguMzgwOTMsMjQwLjY3MzU1IHogTSAxODEuODU3NjEsMjQ0LjU3NTU5IEMgMTgxLjY1NTczLDI0NC4xMzU0NSAxODEuMzUzNTQsMjQzLjkxNTI1IDE4MC45NTA1MSwyNDMuOTE1MjUgQyAxODAuMjM4MDIsMjQzLjkxNTI1IDE3OS44ODE5LDI0NC4zOTUwMSAxNzkuODgxOSwyNDUuMzU0MDQgQyAxNzkuODgxOSwyNDYuMzEzMjggMTgwLjIzODAyLDI0Ni43OTI1NSAxODAuOTUwNTEsMjQ2Ljc5MjU1IEMgMTgxLjQyMSwyNDYuNzkyNTUgMTgxLjc1NzA1LDI0Ni41NTkwOCAxODEuOTU4NjksMjQ2LjA5MTExIEwgMTgyLjk0NjI5LDI0Ni42MTcwMSBDIDE4Mi40NzU1NSwyNDcuNDUzMzkgMTgxLjc2OTM0LDI0Ny44NzE2OCAxODAuODI3NjMsMjQ3Ljg3MTY4IEMgMTgwLjEwMTM2LDI0Ny44NzE2OCAxNzkuNTE5NTMsMjQ3LjY0ODk5IDE3OS4wODI2NSwyNDcuMjA0MDkgQyAxNzguNjQ1MDIsMjQ2Ljc1ODcgMTc4LjQyNjg0LDI0Ni4xNDQ3NyAxNzguNDI2ODQsMjQ1LjM2MjA2IEMgMTc4LjQyNjg0LDI0NC41OTMxMyAxNzguNjUyMDQsMjQzLjk4MjcxIDE3OS4xMDI3MSwyNDMuNTMwNTYgQyAxNzkuNTUzMzgsMjQzLjA3ODM4IDE4MC4xMTQ2MywyNDIuODUyNCAxODAuNzg3NSwyNDIuODUyNCBDIDE4MS43ODI4OCwyNDIuODUyNCAxODIuNDk1NjEsMjQzLjI0NDY1IDE4Mi45MjY0NywyNDQuMDI4MzUgTCAxODEuODU3NjEsMjQ0LjU3NTU5IHogTSAxODYuNTAzOTgsMjQ0LjU3NTU5IEMgMTg2LjMwMTg0LDI0NC4xMzU0NSAxODYuMDA1NjcsMjQzLjkxNTI1IDE4NS42MTUxNywyNDMuOTE1MjUgQyAxODQuODg4MzksMjQzLjkxNTI1IDE4NC41MjQ3NCwyNDQuMzk1MDEgMTg0LjUyNDc0LDI0NS4zNTQwNCBDIDE4NC41MjQ3NCwyNDYuMzEzMjggMTg0Ljg4ODM5LDI0Ni43OTI1NSAxODUuNjE1MTcsMjQ2Ljc5MjU1IEMgMTg2LjA4NjQyLDI0Ni43OTI1NSAxODYuNDE2NDQsMjQ2LjU1OTA4IDE4Ni42MDQ4LDI0Ni4wOTExMSBMIDE4Ny42MTQ0NywyNDYuNjE3MDEgQyAxODcuMTQ0NDgsMjQ3LjQ1MzM5IDE4Ni40MzkyNiwyNDcuODcxNjggMTg1LjQ5OTMxLDI0Ny44NzE2OCBDIDE4NC43NzQwMywyNDcuODcxNjggMTg0LjE5MzQ2LDI0Ny42NDg5OSAxODMuNzU2ODMsMjQ3LjIwNDA5IEMgMTgzLjMyMDk2LDI0Ni43NTg3IDE4My4xMDI1NCwyNDYuMTQ0NzcgMTgzLjEwMjU0LDI0NS4zNjIwNiBDIDE4My4xMDI1NCwyNDQuNTkzMTMgMTgzLjMyNDIyLDI0My45ODI3MSAxODMuNzY3MzcsMjQzLjUzMDU2IEMgMTg0LjIxMDI2LDI0My4wNzgzOCAxODQuNzc0MDQsMjQyLjg1MjQgMTg1LjQ1OTIsMjQyLjg1MjQgQyAxODYuNDUyODIsMjQyLjg1MjQgMTg3LjE2NDU1LDI0My4yNDQ2NSAxODcuNTkzOSwyNDQuMDI4MzUgTCAxODYuNTAzOTgsMjQ0LjU3NTU5IHoiCiAgICAgICAgICAgICBpZD0icGF0aDM3MjMiCiAgICAgICAgICAgICBzdHlsZT0ib3BhY2l0eToxIiAvPgogICAgICAgIDwvZz4KICAgICAgPC9nPgogICAgICA8cGF0aAogICAgICAgICBpZD0idGV4dDM3MjUiCiAgICAgICAgIGQ9Ik0gMzU3LjQxOTcsMzMxLjY4NTAyIEMgMzU3LjY2NTE4LDMzMS42ODUwMiAzNTcuODUxMzEsMzMxLjYzMTQ0IDM1Ny45NzgxLDMzMS41MjQyNyBDIDM1OC4xMDQ4OCwzMzEuNDE3MSAzNTguMTY4MjcsMzMxLjI1OTA0IDM1OC4xNjgyOCwzMzEuMDUwMDUgQyAzNTguMTY4MjcsMzMwLjg0Mzc3IDM1OC4xMDQ4OCwzMzAuNjg3MDMgMzU3Ljk3ODEsMzMwLjU3OTg2IEMgMzU3Ljg1MTMxLDMzMC40NzAwMiAzNTcuNjY1MTgsMzMwLjQxNTA5IDM1Ny40MTk3LDMzMC40MTUwOSBMIDM1Ni41NTc4NCwzMzAuNDE1MDkgTCAzNTYuNTU3ODQsMzMxLjY4NTAyIEwgMzU3LjQxOTcsMzMxLjY4NTAyIE0gMzU3LjQ3MjMsMzM0LjMwOTI2IEMgMzU3Ljc4NTIyLDMzNC4zMDkyNiAzNTguMDE5OSwzMzQuMjQzNjMgMzU4LjE3NjM3LDMzNC4xMTIzNSBDIDM1OC4zMzU1MiwzMzMuOTgxMDcgMzU4LjQxNTEsMzMzLjc4MjggMzU4LjQxNTEsMzMzLjUxNzU3IEMgMzU4LjQxNTEsMzMzLjI1NzY5IDM1OC4zMzY4NiwzMzMuMDYzNDYgMzU4LjE4MDQxLDMzMi45MzQ4NSBDIDM1OC4wMjM5NiwzMzIuODAzNTggMzU3Ljc4NzkyLDMzMi43Mzc5MyAzNTcuNDcyMywzMzIuNzM3OTMgTCAzNTYuNTU3ODQsMzMyLjczNzkzIEwgMzU2LjU1Nzg0LDMzNC4zMDkyNiBMIDM1Ny40NzIzLDMzNC4zMDkyNiBNIDM1OC45MjA4OSwzMzIuMTUxMTkgQyAzNTkuMjU1MzgsMzMyLjI0NzY1IDM1OS41MTQzNCwzMzIuNDI1ODEgMzU5LjY5Nzc5LDMzMi42ODU2OSBDIDM1OS44ODEyMSwzMzIuOTQ1NTcgMzU5Ljk3MjkzLDMzMy4yNjQzOSAzNTkuOTcyOTQsMzMzLjY0MjE1IEMgMzU5Ljk3MjkzLDMzNC4yMjA4NSAzNTkuNzc2LDMzNC42NTIyIDM1OS4zODIxNywzMzQuOTM2MTkgQyAzNTguOTg4MzMsMzM1LjIyMDE4IDM1OC4zODk0NywzMzUuMzYyMTggMzU3LjU4NTYsMzM1LjM2MjE4IEwgMzU1LjAwMDAxLDMzNS4zNjIxOCBMIDM1NS4wMDAwMSwzMjkuMzYyMTggTCAzNTcuMzM4NzgsMzI5LjM2MjE4IEMgMzU4LjE3NzcxLDMyOS4zNjIxOCAzNTguNzg0NjYsMzI5LjQ4ODExIDM1OS4xNTk2MiwzMjkuNzM5OTQgQyAzNTkuNTM3MjcsMzI5Ljk5MTc4IDM1OS43MjYxLDMzMC4zOTUgMzU5LjcyNjEsMzMwLjk0OTU4IEMgMzU5LjcyNjEsMzMxLjI0MTYyIDM1OS42NTczMiwzMzEuNDkwNzggMzU5LjUxOTc1LDMzMS42OTcwOCBDIDM1OS4zODIxNywzMzEuOTAwNyAzNTkuMTgyNTUsMzMyLjA1MjA3IDM1OC45MjA4OSwzMzIuMTUxMTkgTSAzNTkuODM3NDYsMzI5LjM2MjE4IEwgMzYxLjU0MDk2LDMyOS4zNjIxOCBMIDM2Mi45MTY3MSwzMzEuNTAwMTUgTCAzNjQuMjkyNDUsMzI5LjM2MjE4IEwgMzY2LDMyOS4zNjIxOCBMIDM2My42OTc2NCwzMzIuODM0MzggTCAzNjMuNjk3NjQsMzM1LjM2MjE4IEwgMzYyLjEzOTgyLDMzNS4zNjIxOCBMIDM2Mi4xMzk4MiwzMzIuODM0MzggTCAzNTkuODM3NDYsMzI5LjM2MjE4IE0gMzY1LjE1ODM3LDMzMi40MDgzOSBMIDM2Ny42OTk0NiwzMzIuNDA4MzkgTCAzNjcuNjk5NDYsMzMzLjU3Nzg1IEwgMzY1LjE1ODM3LDMzMy41Nzc4NSBMIDM2NS4xNTgzNywzMzIuNDA4MzkgTSAzNjguOTE3NCwzMjkuMzYyMTggTCAzNzAuNjU3MzIsMzI5LjM2MjE4IEwgMzcyLjg1NDQ3LDMzMy40NzczOCBMIDM3Mi44NTQ0NywzMjkuMzYyMTggTCAzNzQuMzMxMzgsMzI5LjM2MjE4IEwgMzc0LjMzMTM4LDMzNS4zNjIxOCBMIDM3Mi41OTE0NiwzMzUuMzYyMTggTCAzNzAuMzk0MywzMzEuMjQ2OTggTCAzNzAuMzk0MywzMzUuMzYyMTggTCAzNjguOTE3NCwzMzUuMzYyMTggTCAzNjguOTE3NCwzMjkuMzYyMTggTSAzODAuNjUxNzMsMzM1LjAzMjY0IEMgMzgwLjM2NTc5LDMzNS4xNzk5OSAzODAuMDY3NywzMzUuMjkxMTggMzc5Ljc1NzQ5LDMzNS4zNjYxOSBDIDM3OS40NDcyNywzMzUuNDQxMjIgMzc5LjEyMzU3LDMzNS40Nzg3MiAzNzguNzg2MzgsMzM1LjQ3ODcyIEMgMzc3Ljc4MDE5LDMzNS40Nzg3MiAzNzYuOTgzMDcsMzM1LjIwMDA5IDM3Ni4zOTUsMzM0LjY0MjgyIEMgMzc1LjgwNjkzLDMzNC4wODI4OCAzNzUuNTEyOSwzMzMuMzI0NjcgMzc1LjUxMjksMzMyLjM2ODIxIEMgMzc1LjUxMjksMzMxLjQwOTA3IDM3NS44MDY5MywzMzAuNjUwODcgMzc2LjM5NSwzMzAuMDkzNiBDIDM3Ni45ODMwNywzMjkuNTMzNjUgMzc3Ljc4MDE5LDMyOS4yNTM2OCAzNzguNzg2MzgsMzI5LjI1MzY3IEMgMzc5LjEyMzU3LDMyOS4yNTM2OCAzNzkuNDQ3MjcsMzI5LjI5MTE4IDM3OS43NTc0OSwzMjkuMzY2MiBDIDM4MC4wNjc3LDMyOS40NDEyMiAzODAuMzY1NzksMzI5LjU1MjQxIDM4MC42NTE3MywzMjkuNjk5NzUgTCAzODAuNjUxNzMsMzMwLjk0MTU1IEMgMzgwLjM2MzA5LDMzMC43NDU5NyAzODAuMDc4NSwzMzAuNjAyNjMgMzc5Ljc5Nzk2LDMzMC41MTE1NCBDIDM3OS41MTc0LDMzMC40MjA0NiAzNzkuMjIyMDMsMzMwLjM3NDkxIDM3OC45MTE4MSwzMzAuMzc0OSBDIDM3OC4zNTYxMSwzMzAuMzc0OTEgMzc3LjkxOTExLDMzMC41NTE3NCAzNzcuNjAwOCwzMzAuOTA1MzggQyAzNzcuMjgyNDksMzMxLjI1OTA0IDM3Ny4xMjMzMywzMzEuNzQ2NjUgMzc3LjEyMzMzLDMzMi4zNjgyMSBDIDM3Ny4xMjMzMywzMzIuOTg3MSAzNzcuMjgyNDksMzMzLjQ3MzM2IDM3Ny42MDA4LDMzMy44MjcwMSBDIDM3Ny45MTkxMSwzMzQuMTgwNjYgMzc4LjM1NjExLDMzNC4zNTc0OSAzNzguOTExODEsMzM0LjM1NzQ5IEMgMzc5LjIyMjAzLDMzNC4zNTc0OSAzNzkuNTE3NCwzMzQuMzExOTQgMzc5Ljc5Nzk2LDMzNC4yMjA4NSBDIDM4MC4wNzg1LDMzNC4xMjk3NiAzODAuMzYzMDksMzMzLjk4NjQzIDM4MC42NTE3MywzMzMuNzkwODUgTCAzODAuNjUxNzMsMzM1LjAzMjY0IgogICAgICAgICBzdHlsZT0iZm9udC1zaXplOjguMjU4NTg3ODRweDtmb250LXN0eWxlOm5vcm1hbDtmb250LXdlaWdodDpib2xkO2ZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MXB4O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjE7Zm9udC1mYW1pbHk6J0JpdHN0cmVhbSBWZXJhIFNhbnMnIiAvPgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg==");

/***/ }),

/***/ "./src/components/Footer/footer_logo.svg":
/*!***********************************************!*\
  !*** ./src/components/Footer/footer_logo.svg ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/static/footer_logo-00929bd0b0316a8541903a168b5052cc.svg");

/***/ }),

/***/ "./src/components/Logo/logo.svg":
/*!**************************************!*\
  !*** ./src/components/Logo/logo.svg ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/static/logo-a395656398b6c7255c88b2a377dfe1fd.svg");

/***/ }),

/***/ "./.cache/caches/gatsby-plugin-image/1096160784.json":
/*!***********************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-image/1096160784.json ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#484848","images":{"fallback":{"src":"/static/850312009dd31c7f68d310663b3f8379/92e03/sun-trees-appalachian-trail.jpg","srcSet":"/static/850312009dd31c7f68d310663b3f8379/53445/sun-trees-appalachian-trail.jpg 813w,\\n/static/850312009dd31c7f68d310663b3f8379/db2d4/sun-trees-appalachian-trail.jpg 1627w,\\n/static/850312009dd31c7f68d310663b3f8379/92e03/sun-trees-appalachian-trail.jpg 3253w","sizes":"(min-width: 3253px) 3253px, 100vw"},"sources":[{"srcSet":"/static/850312009dd31c7f68d310663b3f8379/20760/sun-trees-appalachian-trail.webp 813w,\\n/static/850312009dd31c7f68d310663b3f8379/8789e/sun-trees-appalachian-trail.webp 1627w,\\n/static/850312009dd31c7f68d310663b3f8379/cd563/sun-trees-appalachian-trail.webp 3253w","type":"image/webp","sizes":"(min-width: 3253px) 3253px, 100vw"}]},"width":3253,"height":915}');

/***/ }),

/***/ "./.cache/caches/gatsby-plugin-image/2163915570.json":
/*!***********************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-image/2163915570.json ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#685848","images":{"fallback":{"src":"/static/a22c855131fd86f257298eaac1342088/f59ca/pt_teaser.jpg","srcSet":"/static/a22c855131fd86f257298eaac1342088/ef142/pt_teaser.jpg 83w,\\n/static/a22c855131fd86f257298eaac1342088/cfdb7/pt_teaser.jpg 165w,\\n/static/a22c855131fd86f257298eaac1342088/f59ca/pt_teaser.jpg 330w","sizes":"(min-width: 330px) 330px, 100vw"},"sources":[{"srcSet":"/static/a22c855131fd86f257298eaac1342088/cb886/pt_teaser.webp 83w,\\n/static/a22c855131fd86f257298eaac1342088/cf5bf/pt_teaser.webp 165w,\\n/static/a22c855131fd86f257298eaac1342088/a1534/pt_teaser.webp 330w","type":"image/webp","sizes":"(min-width: 330px) 330px, 100vw"}]},"width":"330","height":330}');

/***/ }),

/***/ "./.cache/caches/gatsby-plugin-image/2751838524.json":
/*!***********************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-image/2751838524.json ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#988888","images":{"fallback":{"src":"/static/1ef3640eb5224f36cf6c18eafe21319a/f59ca/bmt_teaser.jpg","srcSet":"/static/1ef3640eb5224f36cf6c18eafe21319a/ef142/bmt_teaser.jpg 83w,\\n/static/1ef3640eb5224f36cf6c18eafe21319a/cfdb7/bmt_teaser.jpg 165w,\\n/static/1ef3640eb5224f36cf6c18eafe21319a/f59ca/bmt_teaser.jpg 330w,\\n/static/1ef3640eb5224f36cf6c18eafe21319a/387a6/bmt_teaser.jpg 660w","sizes":"(min-width: 330px) 330px, 100vw"},"sources":[{"srcSet":"/static/1ef3640eb5224f36cf6c18eafe21319a/cb886/bmt_teaser.webp 83w,\\n/static/1ef3640eb5224f36cf6c18eafe21319a/cf5bf/bmt_teaser.webp 165w,\\n/static/1ef3640eb5224f36cf6c18eafe21319a/a1534/bmt_teaser.webp 330w,\\n/static/1ef3640eb5224f36cf6c18eafe21319a/ae884/bmt_teaser.webp 660w","type":"image/webp","sizes":"(min-width: 330px) 330px, 100vw"}]},"width":"330","height":330}');

/***/ }),

/***/ "./.cache/caches/gatsby-plugin-image/2941136215.json":
/*!***********************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-image/2941136215.json ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#78b8f8","images":{"fallback":{"src":"/static/b7f054f7ecdbff8ed0b10d1716cd50f1/510f8/pacific-crest-trail_goat-rocks.jpg","srcSet":"/static/b7f054f7ecdbff8ed0b10d1716cd50f1/3b3f5/pacific-crest-trail_goat-rocks.jpg 256w,\\n/static/b7f054f7ecdbff8ed0b10d1716cd50f1/2c6a9/pacific-crest-trail_goat-rocks.jpg 512w,\\n/static/b7f054f7ecdbff8ed0b10d1716cd50f1/510f8/pacific-crest-trail_goat-rocks.jpg 1024w,\\n/static/b7f054f7ecdbff8ed0b10d1716cd50f1/cf97d/pacific-crest-trail_goat-rocks.jpg 2048w","sizes":"(min-width: 1024px) 1024px, 100vw"},"sources":[{"srcSet":"/static/b7f054f7ecdbff8ed0b10d1716cd50f1/12c47/pacific-crest-trail_goat-rocks.webp 256w,\\n/static/b7f054f7ecdbff8ed0b10d1716cd50f1/8bb10/pacific-crest-trail_goat-rocks.webp 512w,\\n/static/b7f054f7ecdbff8ed0b10d1716cd50f1/3fdaa/pacific-crest-trail_goat-rocks.webp 1024w,\\n/static/b7f054f7ecdbff8ed0b10d1716cd50f1/59e52/pacific-crest-trail_goat-rocks.webp 2048w","type":"image/webp","sizes":"(min-width: 1024px) 1024px, 100vw"}]},"width":"1024","height":171}');

/***/ }),

/***/ "./.cache/caches/gatsby-plugin-image/2974262053.json":
/*!***********************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-image/2974262053.json ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#383848","images":{"fallback":{"src":"/static/1b5ce35f04c61e3d494a05cfda6167e0/510f8/cdt_header.jpg","srcSet":"/static/1b5ce35f04c61e3d494a05cfda6167e0/3b3f5/cdt_header.jpg 256w,\\n/static/1b5ce35f04c61e3d494a05cfda6167e0/2c6a9/cdt_header.jpg 512w,\\n/static/1b5ce35f04c61e3d494a05cfda6167e0/510f8/cdt_header.jpg 1024w,\\n/static/1b5ce35f04c61e3d494a05cfda6167e0/cf97d/cdt_header.jpg 2048w","sizes":"(min-width: 1024px) 1024px, 100vw"},"sources":[{"srcSet":"/static/1b5ce35f04c61e3d494a05cfda6167e0/12c47/cdt_header.webp 256w,\\n/static/1b5ce35f04c61e3d494a05cfda6167e0/8bb10/cdt_header.webp 512w,\\n/static/1b5ce35f04c61e3d494a05cfda6167e0/3fdaa/cdt_header.webp 1024w,\\n/static/1b5ce35f04c61e3d494a05cfda6167e0/59e52/cdt_header.webp 2048w","type":"image/webp","sizes":"(min-width: 1024px) 1024px, 100vw"}]},"width":"1024","height":171}');

/***/ }),

/***/ "./.cache/caches/gatsby-plugin-image/3342056799.json":
/*!***********************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-image/3342056799.json ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#181818","images":{"fallback":{"src":"/static/bc4d6a97a98bf95b6478ad84b563b6f2/f59ca/fht-bt_teaser.jpg","srcSet":"/static/bc4d6a97a98bf95b6478ad84b563b6f2/ef142/fht-bt_teaser.jpg 83w,\\n/static/bc4d6a97a98bf95b6478ad84b563b6f2/cfdb7/fht-bt_teaser.jpg 165w,\\n/static/bc4d6a97a98bf95b6478ad84b563b6f2/f59ca/fht-bt_teaser.jpg 330w,\\n/static/bc4d6a97a98bf95b6478ad84b563b6f2/387a6/fht-bt_teaser.jpg 660w","sizes":"(min-width: 330px) 330px, 100vw"},"sources":[{"srcSet":"/static/bc4d6a97a98bf95b6478ad84b563b6f2/cb886/fht-bt_teaser.webp 83w,\\n/static/bc4d6a97a98bf95b6478ad84b563b6f2/cf5bf/fht-bt_teaser.webp 165w,\\n/static/bc4d6a97a98bf95b6478ad84b563b6f2/a1534/fht-bt_teaser.webp 330w,\\n/static/bc4d6a97a98bf95b6478ad84b563b6f2/ae884/fht-bt_teaser.webp 660w","type":"image/webp","sizes":"(min-width: 330px) 330px, 100vw"}]},"width":"330","height":330}');

/***/ }),

/***/ "./.cache/caches/gatsby-plugin-image/3984001113.json":
/*!***********************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-image/3984001113.json ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#88b8d8","images":{"fallback":{"src":"/static/7962352f2cc286b95f094a3960dbf983/f59ca/alt_teaser.jpg","srcSet":"/static/7962352f2cc286b95f094a3960dbf983/ef142/alt_teaser.jpg 83w,\\n/static/7962352f2cc286b95f094a3960dbf983/cfdb7/alt_teaser.jpg 165w,\\n/static/7962352f2cc286b95f094a3960dbf983/f59ca/alt_teaser.jpg 330w,\\n/static/7962352f2cc286b95f094a3960dbf983/387a6/alt_teaser.jpg 660w","sizes":"(min-width: 330px) 330px, 100vw"},"sources":[{"srcSet":"/static/7962352f2cc286b95f094a3960dbf983/cb886/alt_teaser.webp 83w,\\n/static/7962352f2cc286b95f094a3960dbf983/cf5bf/alt_teaser.webp 165w,\\n/static/7962352f2cc286b95f094a3960dbf983/a1534/alt_teaser.webp 330w,\\n/static/7962352f2cc286b95f094a3960dbf983/ae884/alt_teaser.webp 660w","type":"image/webp","sizes":"(min-width: 330px) 330px, 100vw"}]},"width":"330","height":330}');

/***/ }),

/***/ "./.cache/caches/gatsby-plugin-image/890521072.json":
/*!**********************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-image/890521072.json ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#d8d8d8","images":{"fallback":{"src":"/static/68ba29a529a37aad0f10a335b39fb3ab/510f8/appalachian-trail_mcafee-knob.jpg","srcSet":"/static/68ba29a529a37aad0f10a335b39fb3ab/3b3f5/appalachian-trail_mcafee-knob.jpg 256w,\\n/static/68ba29a529a37aad0f10a335b39fb3ab/2c6a9/appalachian-trail_mcafee-knob.jpg 512w,\\n/static/68ba29a529a37aad0f10a335b39fb3ab/510f8/appalachian-trail_mcafee-knob.jpg 1024w,\\n/static/68ba29a529a37aad0f10a335b39fb3ab/cf97d/appalachian-trail_mcafee-knob.jpg 2048w","sizes":"(min-width: 1024px) 1024px, 100vw"},"sources":[{"srcSet":"/static/68ba29a529a37aad0f10a335b39fb3ab/12c47/appalachian-trail_mcafee-knob.webp 256w,\\n/static/68ba29a529a37aad0f10a335b39fb3ab/8bb10/appalachian-trail_mcafee-knob.webp 512w,\\n/static/68ba29a529a37aad0f10a335b39fb3ab/3fdaa/appalachian-trail_mcafee-knob.webp 1024w,\\n/static/68ba29a529a37aad0f10a335b39fb3ab/59e52/appalachian-trail_mcafee-knob.webp 2048w","type":"image/webp","sizes":"(min-width: 1024px) 1024px, 100vw"}]},"width":"1024","height":171}');

/***/ }),

/***/ "./public/page-data/sq/d/764694655.json":
/*!**********************************************!*\
  !*** ./public/page-data/sq/d/764694655.json ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"data":{"site":{"siteMetadata":{"title":"Hike with Gravity","description":"The hiking journal of Jim \'Gravity\' Smith, a Triple Crown thru-hikers (Appalachian Trail 2017, Pacific Crest Trail 2019, and Continental Divide Trail 2021).","author":"Jim \'Gravity\' Smith","siteUrl":"https://hikewithgravity.com"}}}}');

/***/ })

};
;
//# sourceMappingURL=component---src-pages-hikes-js.js.map