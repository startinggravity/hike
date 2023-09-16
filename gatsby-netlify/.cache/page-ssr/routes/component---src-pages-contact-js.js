"use strict";
exports.id = 501;
exports.ids = [501];
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

/***/ 5791:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(46);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3040);
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8364);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4439);
/* harmony import */ var _components_field_title__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5135);
/* harmony import */ var _components_field_subtitle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1803);
/* harmony import */ var _formspree_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3561);
function ContactForm(){const[state,handleSubmit]=(0,_formspree_react__WEBPACK_IMPORTED_MODULE_5__/* .useForm */ .cI)("mdobbzed");if(state.succeeded){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3",{className:"text-center mt-6"},"Thank you for contacting me!");}return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form",{onSubmit:handleSubmit},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input",{type:"hidden",name:"form-name",value:"contact"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"contact__name"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label",{htmlFor:"name"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"contact-form__label"},"Your Name:"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"contact-form__input"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input",{type:"text",name:"name",id:"name"})))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"contact__email"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label",{htmlFor:"email"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"contact-form__label"},"Your Email:"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"contact-form__input"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input",{type:"email",name:"email",id:"email"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_formspree_react__WEBPACK_IMPORTED_MODULE_5__/* .ValidationError */ .p8,{prefix:"Email",field:"email",errors:state.errors})))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"contact__subject"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label",{htmlFor:"subject"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"contact-form__label"},"Subject:"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"contact-form__input"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input",{type:"text",name:"subject"})))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"contact__message"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label",{htmlFor:"message"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"contact-form__label"},"Message:"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"contact-form__input"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("textarea",{rows:"12",columns:"60",id:"message",name:"message"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_formspree_react__WEBPACK_IMPORTED_MODULE_5__/* .ValidationError */ .p8,{prefix:"Message",field:"message",errors:state.errors})))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"contact__button"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button",{"aria-label":"Submit",type:"submit",disabled:state.submitting},"Send")));}function App(){const fullTitle="Contact";const subTitle="Gravity";const coverImage="../images/contact_header.jpeg";const socialImage="/contact_social.jpeg";const thisPath="/contact";return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_layout__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_seo__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z,{title:fullTitle+` `+subTitle,description:"Contact me using the form on this page.",keywords:[`Pacific Crest Trail`,`Appalachian Trail`,`Continental Divide Trail`,`Mojave Desert`,`Sierra Nevada`,`Great Smoky Mountains`,`White Mountains`,`Springer Mountain`,`Mount Katahdin`,"Benton MacKaye","Pinhoti",`AT`,`PCT`,`CDT`,`thru-hiking`,`thru-gear`,`Triple Crown`,`backpacking`,`hiking`,`trail`,`long distance hiking`,`blog`,`Gravity`,"Hike with Gravity"],nodePath:thisPath,nodeImage:socialImage}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"main__content about-list-page"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"h-screen relative max-h-96 list-page"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"heading-container absolute flex justify-center items-center bottom-20 w-full"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"mx-2 text-center w-9/12 cover-text"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_field_title__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z,null,fullTitle),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_field_subtitle__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z,null,subTitle))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"fixed -z-10 cover-image h-screen max-h-96"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"w-full"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_6__/* .StaticImage */ .Jv,{alt:"Cirue of the Towers, Wind River Range, Wyoming",src:coverImage,className:"cover-img h-screen max-h-96",loading:"eager",__imageData:__webpack_require__(6710)})))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"relative z-0 bg-white"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"mx-auto max-w-5xl"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"mt-6 text-2xl prose mx-auto max-w-3xl px-5 py-4 text-gravBlack"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Thanks for visiting my site. If you have a comment or question, or just want to say hello, please use this form."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"contact-disclaimer"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Please do not contact me to request a product review, mention or endorsement."))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"mx-auto max-w-5xl py-2.5"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"contact mt-6 text-2xl prose mx-auto max-w-3xl px-5 pb-4 text-gravBlack"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ContactForm,null)))))));}/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ 6710:
/***/ ((module) => {

module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#686838","images":{"fallback":{"src":"/static/ea5ddce66cae9599c9097e47f5371203/62706/contact_header.jpg","srcSet":"/static/ea5ddce66cae9599c9097e47f5371203/902f9/contact_header.jpg 864w,\\n/static/ea5ddce66cae9599c9097e47f5371203/a7a3e/contact_header.jpg 1728w,\\n/static/ea5ddce66cae9599c9097e47f5371203/62706/contact_header.jpg 3456w","sizes":"(min-width: 3456px) 3456px, 100vw"},"sources":[{"srcSet":"/static/ea5ddce66cae9599c9097e47f5371203/3966a/contact_header.webp 864w,\\n/static/ea5ddce66cae9599c9097e47f5371203/d0211/contact_header.webp 1728w,\\n/static/ea5ddce66cae9599c9097e47f5371203/0336a/contact_header.webp 3456w","type":"image/webp","sizes":"(min-width: 3456px) 3456px, 100vw"}]},"width":3456,"height":972}');

/***/ })

};
;
//# sourceMappingURL=component---src-pages-contact-js.js.map