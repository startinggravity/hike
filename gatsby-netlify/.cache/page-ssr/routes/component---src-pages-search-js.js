"use strict";
exports.id = 996;
exports.ids = [996];
exports.modules = {

/***/ 5135:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ PostTitle)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(46);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function PostTitle({children}){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1",{className:"text-gray-100 font-bold text-1xl sm:text-2xl lg:text-3xl leading-none py-10"},children);}

/***/ }),

/***/ 6668:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ search)
});

// EXTERNAL MODULE: external "/Users/startinggravity/Documents/Development/Sites/hike_blog/github/gatsby-netlify/node_modules/react/index.js"
var index_js_ = __webpack_require__(46);
var index_js_default = /*#__PURE__*/__webpack_require__.n(index_js_);
// EXTERNAL MODULE: ./node_modules/algoliasearch/index.js
var algoliasearch = __webpack_require__(4293);
var algoliasearch_default = /*#__PURE__*/__webpack_require__.n(algoliasearch);
// EXTERNAL MODULE: ./node_modules/react-instantsearch-core/dist/es/connectors/connectStateResults.js
var connectStateResults = __webpack_require__(8617);
// EXTERNAL MODULE: ./node_modules/react-instantsearch-core/dist/es/widgets/InstantSearch.js + 5 modules
var InstantSearch = __webpack_require__(2168);
// EXTERNAL MODULE: ./node_modules/react-instantsearch-dom/dist/es/widgets/SearchBox.js + 2 modules
var SearchBox = __webpack_require__(7400);
// EXTERNAL MODULE: ./node_modules/react-instantsearch-dom/dist/es/widgets/Hits.js + 2 modules
var Hits = __webpack_require__(5473);
// EXTERNAL MODULE: ./node_modules/react-instantsearch-dom/dist/es/widgets/Pagination.js + 6 modules
var Pagination = __webpack_require__(5506);
// EXTERNAL MODULE: ./node_modules/react-instantsearch-dom/dist/es/widgets/PoweredBy.js + 2 modules
var PoweredBy = __webpack_require__(3614);
// EXTERNAL MODULE: ./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js
var gatsby_image_module = __webpack_require__(3040);
// EXTERNAL MODULE: ./src/components/layout.js + 8 modules
var layout = __webpack_require__(4439);
// EXTERNAL MODULE: ./src/components/seo.js + 1 modules
var seo = __webpack_require__(8364);
// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js + 11 modules
var gatsby_browser_entry = __webpack_require__(7076);
// EXTERNAL MODULE: ./node_modules/react-instantsearch-dom/dist/es/widgets/Highlight.js + 1 modules
var Highlight = __webpack_require__(5915);
// EXTERNAL MODULE: ./node_modules/react-instantsearch-dom/dist/es/widgets/Snippet.js + 1 modules
var Snippet = __webpack_require__(1294);
;// CONCATENATED MODULE: ./src/components/post-preview.js
const PostPreview=({hit})=>{return/*#__PURE__*/index_js_default().createElement("div",null,/*#__PURE__*/index_js_default().createElement("h3",null,/*#__PURE__*/index_js_default().createElement(gatsby_browser_entry.Link,{to:hit.url},/*#__PURE__*/index_js_default().createElement(Highlight/* default */.Z,{hit:hit,attribute:"title",tagName:"mark"}))),/*#__PURE__*/index_js_default().createElement("p",null,/*#__PURE__*/index_js_default().createElement(Snippet/* default */.Z,{hit:hit,attribute:"elements",tagName:"mark"})));};/* harmony default export */ const post_preview = (PostPreview);
// EXTERNAL MODULE: ./src/components/field/title.js
var title = __webpack_require__(5135);
;// CONCATENATED MODULE: ./src/pages/search.js
const searchClient=algoliasearch_default()("GRBKEZ1C17","108fc3ecd716a4c434ea81b52e149727");class BlogIndex extends (index_js_default()).Component{render(){const fullTitle="Search";const coverImage="../images/weminunche-wilderness_chicago-basin.jpeg";const socialImage="/search_page.jpeg";const thisPath="/search";const HitCount=(0,connectStateResults/* default */.Z)(({searchResults})=>{const hitCount=searchResults&&searchResults.nbHits;return hitCount>0?/*#__PURE__*/index_js_default().createElement("div",{className:"HitCount"},/*#__PURE__*/index_js_default().createElement("h2",null,hitCount," result",hitCount!==1?`s`:``," were found")):/*#__PURE__*/index_js_default().createElement("div",{className:"HitCount"},/*#__PURE__*/index_js_default().createElement("h2",null,"No results were found for your search."),/*#__PURE__*/index_js_default().createElement("p",null,"Check your spelling and try again."));});return/*#__PURE__*/index_js_default().createElement(layout/* default */.Z,null,/*#__PURE__*/index_js_default().createElement(seo/* default */.Z,{title:"Search",description:"Search for trip reports from any of my hikes.",keywords:[`Pacific Crest Trail`,`Appalachian Trail`,`Continental Divide Trail`,`Mojave Desert`,`Sierra Nevada`,`Great Smoky Mountains`,`White Mountains`,`Springer Mountain`,`Mount Katahdin`,"Benton MacKaye","Pinhoti",`AT`,`PCT`,`CDT`,`thru-hiking`,`thru-gear`,`Triple Crown`,`backpacking`,`hiking`,`trail`,`long distance hiking`,`blog`,`Gravity`,"Hike with Gravity"],nodePath:thisPath,nodeImage:socialImage}),/*#__PURE__*/index_js_default().createElement("div",{className:"main__content search-results-page"},/*#__PURE__*/index_js_default().createElement("div",{className:"h-screen relative max-h-96 list-page"},/*#__PURE__*/index_js_default().createElement("div",{className:"heading-container absolute flex justify-center items-center bottom-20 w-full"},/*#__PURE__*/index_js_default().createElement("div",{className:"mx-2 text-center w-9/12 cover-text"},/*#__PURE__*/index_js_default().createElement(title/* default */.Z,null,fullTitle))),/*#__PURE__*/index_js_default().createElement("div",{className:"fixed -z-10 cover-image h-screen max-h-96"},/*#__PURE__*/index_js_default().createElement("div",{className:"w-full"},/*#__PURE__*/index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{alt:"Cirue of the Towers, Wind River Range, Wyoming",src:coverImage,className:"h-screen max-h-96 cover-img",loading:"eager",__imageData:__webpack_require__(717)})))),/*#__PURE__*/index_js_default().createElement("div",{className:"relative z-0 bg-white"},/*#__PURE__*/index_js_default().createElement("div",{className:"mx-auto max-w-5xl"},/*#__PURE__*/index_js_default().createElement("div",{className:"mt-6 text-2xl prose mx-auto max-w-3xl px-5 py-4 text-gravBlack"},/*#__PURE__*/index_js_default().createElement(InstantSearch/* default */.Z,{searchClient:searchClient,indexName:"hike_BLOG"},/*#__PURE__*/index_js_default().createElement(SearchBox/* default */.Z,{placeholder:"Find it here..."}),/*#__PURE__*/index_js_default().createElement(HitCount,null),/*#__PURE__*/index_js_default().createElement(Hits/* default */.Z,{hitComponent:post_preview}),/*#__PURE__*/index_js_default().createElement(Pagination/* default */.Z,null),/*#__PURE__*/index_js_default().createElement(PoweredBy/* default */.Z,null)))))));}}/* harmony default export */ const search = (BlogIndex);const pageQuery="2324703104";

/***/ }),

/***/ 717:
/***/ ((module) => {

module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#a8e8f8","images":{"fallback":{"src":"/static/6e6d3fab459aa63a426fdd14d71d76c2/a2a89/weminunche-wilderness_chicago-basin.jpg","srcSet":"/static/6e6d3fab459aa63a426fdd14d71d76c2/0c1e2/weminunche-wilderness_chicago-basin.jpg 925w,\\n/static/6e6d3fab459aa63a426fdd14d71d76c2/05efa/weminunche-wilderness_chicago-basin.jpg 1851w,\\n/static/6e6d3fab459aa63a426fdd14d71d76c2/a2a89/weminunche-wilderness_chicago-basin.jpg 3701w","sizes":"(min-width: 3701px) 3701px, 100vw"},"sources":[{"srcSet":"/static/6e6d3fab459aa63a426fdd14d71d76c2/08d1d/weminunche-wilderness_chicago-basin.webp 925w,\\n/static/6e6d3fab459aa63a426fdd14d71d76c2/d8359/weminunche-wilderness_chicago-basin.webp 1851w,\\n/static/6e6d3fab459aa63a426fdd14d71d76c2/e5a7b/weminunche-wilderness_chicago-basin.webp 3701w","type":"image/webp","sizes":"(min-width: 3701px) 3701px, 100vw"}]},"width":3701,"height":1041}');

/***/ })

};
;
//# sourceMappingURL=component---src-pages-search-js.js.map