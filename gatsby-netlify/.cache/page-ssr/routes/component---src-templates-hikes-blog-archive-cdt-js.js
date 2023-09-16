"use strict";
exports.id = 70;
exports.ids = [70];
exports.modules = {

/***/ 774:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(46);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7076);
/* harmony import */ var gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3040);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4439);
/* harmony import */ var _components_pager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(570);
/* harmony import */ var _components_field_title__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5135);
/* harmony import */ var _components_field_subtitle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1803);
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8364);
const pageQuery="3534915104";const BlogArchive=({data,pageContext})=>{const posts=data.allNodeBlog.edges;const totalPosts=data.allNodeBlog.totalCount;const fullTitle="Hike Reports:";const subTitle="Continental Divide Trail 2021";const coverImage="../../images/cdt_header.jpeg";const socialImage="/cdt_social.jpeg";const thisPath="/hikes/cdt-2021";return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment),null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_seo__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z,{title:fullTitle+` `+subTitle,description:`A collection of blog posts from Gravity's `+subTitle+` thru-hike.`,nodePath:thisPath,nodeImage:socialImage}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_layout__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"h-screen relative max-h-96 list-page"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"heading-container absolute flex justify-center items-center bottom-20 w-full"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"mx-2 text-center w-9/12 cover-text"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_field_title__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z,null,fullTitle),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_field_subtitle__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z,null,subTitle))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"fixed -z-10 cover-image h-screen max-h-96"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_7__/* .StaticImage */ .Jv,{alt:`A photo from `+subTitle,src:coverImage,className:"h-screen max-h-96",loading:"eager",__imageData:__webpack_require__(3196)}))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"relative z-0 bg-white"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"mx-auto max-w-5xl"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"mt-6 text-2xl prose mx-auto max-w-3xl px-5 py-4 text-gravBlack"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"I thru-hiked the Continental Divide Trail in 2021. Day-by-day reports of my hike are found below. Read more about the CDT"," ",/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link,{to:"/about/the-continental-divide-trail",title:"The Continental Divide Trail"},"here"),"."))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"mx-auto max-w-5xl py-2.5"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"hike-list"},posts.map(({node})=>{const postTitle=node.title;const thumb=node.relationships.field_main_image.gatsbyImage;const alt=node.field_main_image.alt;return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("article",{key:node.fields.slug,className:"hike-list__item"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link,{to:node.path.alias},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"hike-list__text"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3",null,postTitle)),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"hike-list__image"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_7__/* .GatsbyImage */ .HN,{alt:alt,image:(0,gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_7__/* .getImage */ .gJ)(thumb),className:"blog-thumb"}))));}))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"mx-auto max-w-5xl py-2.5"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_pager__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z,{pageContext:pageContext,totalPosts:totalPosts})))));};/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlogArchive);

/***/ }),

/***/ 3196:
/***/ ((module) => {

module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#383848","images":{"fallback":{"src":"/static/1b5ce35f04c61e3d494a05cfda6167e0/62706/cdt_header.jpg","srcSet":"/static/1b5ce35f04c61e3d494a05cfda6167e0/902f9/cdt_header.jpg 864w,\\n/static/1b5ce35f04c61e3d494a05cfda6167e0/a7a3e/cdt_header.jpg 1728w,\\n/static/1b5ce35f04c61e3d494a05cfda6167e0/62706/cdt_header.jpg 3456w","sizes":"(min-width: 3456px) 3456px, 100vw"},"sources":[{"srcSet":"/static/1b5ce35f04c61e3d494a05cfda6167e0/3966a/cdt_header.webp 864w,\\n/static/1b5ce35f04c61e3d494a05cfda6167e0/d0211/cdt_header.webp 1728w,\\n/static/1b5ce35f04c61e3d494a05cfda6167e0/0336a/cdt_header.webp 3456w","type":"image/webp","sizes":"(min-width: 3456px) 3456px, 100vw"}]},"width":3456,"height":972}');

/***/ })

};
;
//# sourceMappingURL=component---src-templates-hikes-blog-archive-cdt-js.js.map