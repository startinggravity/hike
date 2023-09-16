"use strict";
exports.id = 890;
exports.ids = [890];
exports.modules = {

/***/ 1803:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ PostSubTitle)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(46);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function PostSubTitle({children}){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2",{className:"text-gray-100 font-extrabold text-4xl md:text-5xl lg:text-7xl leading-none"},children);}

/***/ }),

/***/ 5135:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ PostTitle)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(46);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function PostTitle({children}){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1",{className:"text-gray-100 font-bold text-1xl sm:text-2xl lg:text-3xl leading-none py-10"},children);}

/***/ }),

/***/ 8706:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Subscribe)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(46);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3040);
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8364);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4439);
/* harmony import */ var _components_field_title__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5135);
/* harmony import */ var _components_field_subtitle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1803);
/* harmony import */ var gatsby_plugin_mailchimp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(316);
const fullTitle="Subscribe";const subTitle="to Follow Gravity";const coverImage="../images/wind-river-range_cirque-of-towers.jpeg";const socialImage="/subscribe_page.jpeg";const thisPath="/subscribe";class Subscribe extends (react__WEBPACK_IMPORTED_MODULE_0___default().Component){constructor(...args){super(...args);this.state={fname:null,lname:null,email:null};this._handleChange=e=>{this.setState({[`${e.target.name}`]:e.target.value});};this._handleSubmit=e=>{e.preventDefault();(0,gatsby_plugin_mailchimp__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)(this.state.email,this.state).then(({msg,result})=>{console.log("msg",`${result}: ${msg}`);if(result!=="success"){throw msg;}alert(msg);}).catch(err=>{console.log("err",err);alert(err);});};}render(){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_layout__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_seo__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z,{title:fullTitle+` `+subTitle,description:"Share your email address and I'll let you know when I have made new hiking plans.",keywords:[`Pacific Crest Trail`,`Appalachian Trail`,`Continental Divide Trail`,`Mojave Desert`,`Sierra Nevada`,`Great Smoky Mountains`,`White Mountains`,`Springer Mountain`,`Mount Katahdin`,"Benton MacKaye","Pinhoti",`AT`,`PCT`,`CDT`,`thru-hiking`,`thru-gear`,`Triple Crown`,`backpacking`,`hiking`,`trail`,`long distance hiking`,`blog`,`Gravity`,"Hike with Gravity"],nodePath:thisPath,nodeImage:socialImage}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"main__content about-list-page"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"h-screen relative max-h-96 list-page"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"heading-container absolute flex justify-center items-center bottom-20 w-full"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"mx-2 text-center w-9/12 cover-text"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_field_title__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z,null,fullTitle),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_field_subtitle__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z,null,subTitle))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"fixed -z-10 cover-image h-screen max-h-96"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"w-full"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_6__/* .StaticImage */ .Jv,{alt:"Cirue of the Towers, Wind River Range, Wyoming",src:coverImage,className:"cover-img h-screen max-h-96",loading:"eager",__imageData:__webpack_require__(7794)})))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"relative z-0 bg-white"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"mx-auto max-w-5xl"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"mt-6 text-2xl prose mx-auto max-w-3xl px-5 py-4 text-gravBlack"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Following me on the trail is easy! Just leave your email address here. I'll let you know when I have made new hiking plans. Emails are sent infrequently, so you don't have to worry about being spammed."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"contact"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form",{onSubmit:this._handleSubmit,className:"mailchimp-signup-subscribe-form"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"js-form-item form-item"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label",{className:"js-form-required form-required form-item__label contact-form__label",htmlFor:"fname"},"First Name"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input",{type:"text",onChange:this._handleChange,name:"fname",className:"form-text form-item__textfield contact-form__input",id:"fname"})),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"js-form-item form-item"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label",{className:"js-form-required form-required form-item__label contact-form__label",htmlFor:"lname"},"Last Name"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input",{type:"text",onChange:this._handleChange,name:"lname",className:"form-text form-item__textfield contact-form__input",id:"lname"})),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"js-form-item form-item"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label",{className:"js-form-required form-required form-item__label contact-form__label",htmlFor:"email"},"Email Address"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input",{type:"email",onChange:this._handleChange,name:"email",className:"form-text form-item__textfield contact-form__input",id:"email"})),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"form-actions js-form-wrapper form-wrapper",id:"edit-actions"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input",{type:"submit",value:"Subscribe",className:"button js-form-submit form-submit form-item__textfield contact__button"})))))))));}}

/***/ }),

/***/ 7794:
/***/ ((module) => {

module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#5898d8","images":{"fallback":{"src":"/static/eb8d8ebbc54d879f34f93dc4bb3e1634/d9344/wind-river-range_cirque-of-towers.jpg","srcSet":"/static/eb8d8ebbc54d879f34f93dc4bb3e1634/b467a/wind-river-range_cirque-of-towers.jpg 803w,\\n/static/eb8d8ebbc54d879f34f93dc4bb3e1634/196cf/wind-river-range_cirque-of-towers.jpg 1606w,\\n/static/eb8d8ebbc54d879f34f93dc4bb3e1634/d9344/wind-river-range_cirque-of-towers.jpg 3211w","sizes":"(min-width: 3211px) 3211px, 100vw"},"sources":[{"srcSet":"/static/eb8d8ebbc54d879f34f93dc4bb3e1634/f4a86/wind-river-range_cirque-of-towers.webp 803w,\\n/static/eb8d8ebbc54d879f34f93dc4bb3e1634/fc427/wind-river-range_cirque-of-towers.webp 1606w,\\n/static/eb8d8ebbc54d879f34f93dc4bb3e1634/da45e/wind-river-range_cirque-of-towers.webp 3211w","type":"image/webp","sizes":"(min-width: 3211px) 3211px, 100vw"}]},"width":3211,"height":903}');

/***/ })

};
;
//# sourceMappingURL=component---src-pages-subscribe-js.js.map