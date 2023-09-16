"use strict";
exports.id = 220;
exports.ids = [220];
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

/***/ 922:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ templates_NodeBlogTemplate)
});

// EXTERNAL MODULE: external "/Users/startinggravity/Documents/Development/Sites/hike_blog/github/gatsby-netlify/node_modules/react/index.js"
var index_js_ = __webpack_require__(46);
var index_js_default = /*#__PURE__*/__webpack_require__.n(index_js_);
// EXTERNAL MODULE: ./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js
var gatsby_image_module = __webpack_require__(3040);
// EXTERNAL MODULE: ./node_modules/react-uuid/uuid.js
var uuid = __webpack_require__(8694);
var uuid_default = /*#__PURE__*/__webpack_require__.n(uuid);
;// CONCATENATED MODULE: ./src/components/paragraph/paragraph-quotation.js
function ParagraphQuotation({quote,linkUrl,linkTitle,type}){return/*#__PURE__*/index_js_default().createElement("div",{className:type===`text`?"quote-wrapper quote-wrapper--text":"quote-wrapper quote-wrapper--music"},/*#__PURE__*/index_js_default().createElement("div",{className:"mt-6 text-2xl prose mx-auto max-w-3xl text-gravBlack "},/*#__PURE__*/index_js_default().createElement("div",{className:"quote",dangerouslySetInnerHTML:{__html:quote}}),linkUrl&&/*#__PURE__*/index_js_default().createElement("div",null,/*#__PURE__*/index_js_default().createElement("a",{className:"text-gravRed link-underline hover:text-gravDkGray hover:bg-gravDkGrayFade hover:link-hover-underline",href:linkUrl,title:"More about this quote"},linkTitle))));}
;// CONCATENATED MODULE: ./src/components/paragraph/paragraph-vertical-image.js
function ParagraphVerticalImage({text,image,alt}){return/*#__PURE__*/index_js_default().createElement("div",{className:"py-0"},/*#__PURE__*/index_js_default().createElement("div",{className:"mx-auto max-w-3xl px-5"},/*#__PURE__*/index_js_default().createElement(gatsby_image_module/* GatsbyImage */.HN,{alt:alt,image:(0,gatsby_image_module/* getImage */.gJ)(image),className:"border-gray-200 border-2"})),/*#__PURE__*/index_js_default().createElement("div",{className:"mt-6 text-2xl prose mx-auto max-w-3xl px-5 text-gravBlack "},/*#__PURE__*/index_js_default().createElement("div",{dangerouslySetInnerHTML:{__html:text}})));}
;// CONCATENATED MODULE: ./src/components/paragraph/paragraph-horizontal-image.js
function ParagraphHorizontalImage({text,image,alt}){return/*#__PURE__*/index_js_default().createElement("div",{className:"py-0"},/*#__PURE__*/index_js_default().createElement(gatsby_image_module/* GatsbyImage */.HN,{alt:alt,image:(0,gatsby_image_module/* getImage */.gJ)(image),className:"border-gray-200 border-2"}),/*#__PURE__*/index_js_default().createElement("div",{className:"mt-6 text-2xl prose mx-auto max-w-3xl px-5 text-gravBlack"},/*#__PURE__*/index_js_default().createElement("div",{dangerouslySetInnerHTML:{__html:text}})));}
;// CONCATENATED MODULE: ./src/components/paragraph/paragraph-body.js
function ParagraphText({text}){return/*#__PURE__*/index_js_default().createElement("div",{className:"py-0"},/*#__PURE__*/index_js_default().createElement("div",{className:"mt-6 text-2xl prose mx-auto max-w-3xl px-5 text-gravBlack"},/*#__PURE__*/index_js_default().createElement("div",{dangerouslySetInnerHTML:{__html:text}})));}
;// CONCATENATED MODULE: ./src/components/paragraph/paragraph-hike-details.js
function ParagraphHikeDetails({weather,date,today,trip,conditions}){const months=["January","February","March","April","May","June","July","August","September","October","November","December"];const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];const d=new Date(date);const year=d.getFullYear();const hikeDate=d.getDate();const monthName=months[d.getMonth()];const dayName=days[d.getDay()];const formatted=`${dayName}, ${monthName} ${hikeDate}, ${year}`;return/*#__PURE__*/index_js_default().createElement("table",{className:"blog-details blog-details--hike",summary:"hike-details"},/*#__PURE__*/index_js_default().createElement("tbody",null,hikeDate&&/*#__PURE__*/index_js_default().createElement("tr",null,/*#__PURE__*/index_js_default().createElement("td",{className:"blog-details__label"},"Date"),/*#__PURE__*/index_js_default().createElement("td",{className:"blog-details__content"},formatted)),weather&&/*#__PURE__*/index_js_default().createElement("tr",null,/*#__PURE__*/index_js_default().createElement("td",{className:"blog-details__label"},"Weather"),/*#__PURE__*/index_js_default().createElement("td",{className:"blog-details__content"},weather)),conditions&&/*#__PURE__*/index_js_default().createElement("tr",null,/*#__PURE__*/index_js_default().createElement("td",{className:"blog-details__label"},"Trail Conditions"),/*#__PURE__*/index_js_default().createElement("td",{className:"blog-details__content"},conditions)),today&&/*#__PURE__*/index_js_default().createElement("tr",null,/*#__PURE__*/index_js_default().createElement("td",{className:"blog-details__label"},"Today's Miles"),/*#__PURE__*/index_js_default().createElement("td",{className:"blog-details__content"},today)),trip&&/*#__PURE__*/index_js_default().createElement("tr",null,/*#__PURE__*/index_js_default().createElement("td",{className:"blog-details__label"},"Trip Miles"),/*#__PURE__*/index_js_default().createElement("td",{className:"blog-details__content"},trip))));}
;// CONCATENATED MODULE: ./src/helpers/component-resolver.js
const resolve=component=>{if(component.__typename.includes(`paragraph__body_text`)){return/*#__PURE__*/index_js_default().createElement(ParagraphText,{text:component.field_text.processed});}if(component.__typename.includes(`paragraph__quotation`)){const linkTitle=component.link?component.link.title:"";const linkUri=component.link?component.link.uri:"";return/*#__PURE__*/index_js_default().createElement(ParagraphQuotation,{quote:component.text.processed,linkTitle:linkTitle,linkUrl:linkUri,type:component.type});}if(component.__typename.includes(`paragraph__body_image`)){return/*#__PURE__*/index_js_default().createElement(ParagraphHorizontalImage,{text:component.field_body_image_caption.processed,image:component.relationships.field_image.gatsbyImage,alt:component.field_image.alt});}if(component.__typename.includes(`paragraph__vertical_image`)){return/*#__PURE__*/index_js_default().createElement(ParagraphVerticalImage,{text:component.field_body_image_caption.processed,image:component.relationships.field_image.gatsbyImage,alt:component.field_image.alt});}if(component.__typename.includes(`paragraph__hike_details`)){return/*#__PURE__*/index_js_default().createElement(ParagraphHikeDetails,{date:component.field_hike_date,today:component.field_hike_miles_today,trip:component.field_hike_miles_trip,weather:component.field_hike_weather,conditions:component.field_hike_conditions});}return;};const componentResolver=(data=[])=>{const components=[];data.forEach(component=>{components.push(resolve(component));});return components;};/* harmony default export */ const component_resolver = ((/* unused pure expression or super */ null && (componentResolver)));
;// CONCATENATED MODULE: ./src/components/cover-image.js
function CoverImage({image,alt}){return/*#__PURE__*/index_js_default().createElement("div",{className:"w-full"},/*#__PURE__*/index_js_default().createElement(gatsby_image_module/* GatsbyImage */.HN,{alt:alt,image:(0,gatsby_image_module/* getImage */.gJ)(image),className:"cover-img w-full",loading:"eager"}));}
// EXTERNAL MODULE: ./src/components/field/title.js
var field_title = __webpack_require__(5135);
// EXTERNAL MODULE: ./src/components/field/subtitle.js
var field_subtitle = __webpack_require__(1803);
;// CONCATENATED MODULE: ./src/components/cover.js
function Cover({title,subtitle,alt,image,type}){let blogTypeClasses="";if(type===1||type===3){blogTypeClasses="h-screen blog-cover";}else{blogTypeClasses="h-screen max-h-96";}return/*#__PURE__*/index_js_default().createElement("div",{className:`relative ${blogTypeClasses}`},/*#__PURE__*/index_js_default().createElement("div",{className:"heading-container absolute flex justify-center items-center bottom-10 w-full"},/*#__PURE__*/index_js_default().createElement("div",{className:"mx-2 text-center w-9/12 cover-text"},/*#__PURE__*/index_js_default().createElement(field_title/* default */.Z,null,title),/*#__PURE__*/index_js_default().createElement(field_subtitle/* default */.Z,null,subtitle))),/*#__PURE__*/index_js_default().createElement("div",{className:`fixed -z-10 cover-image w-full ${blogTypeClasses}`},/*#__PURE__*/index_js_default().createElement(CoverImage,{alt:alt,image:image})));}
;// CONCATENATED MODULE: ./src/components/field/body.js
function Body({content}){return/*#__PURE__*/index_js_default().createElement("div",{className:"mt-6 text-2xl prose mx-auto max-w-3xl px-5 text-gravBlack "},/*#__PURE__*/index_js_default().createElement("div",{dangerouslySetInnerHTML:{__html:content}}));}
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(5697);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ./node_modules/hyvor-talk-react/dist/esm/index.js
var esm = __webpack_require__(8330);
// EXTERNAL MODULE: ./src/components/seo.js + 1 modules
var seo = __webpack_require__(8364);
// EXTERNAL MODULE: ./src/components/layout.js + 8 modules
var layout = __webpack_require__(4439);
// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js + 11 modules
var gatsby_browser_entry = __webpack_require__(7076);
;// CONCATENATED MODULE: ./src/components/gear-menu.js
const GearMenu=()=>/*#__PURE__*/index_js_default().createElement("div",{className:"secondary-menu"},/*#__PURE__*/index_js_default().createElement("ul",{className:"secondary-menu__list"},/*#__PURE__*/index_js_default().createElement("li",{className:"secondary-menu__item"},/*#__PURE__*/index_js_default().createElement(gatsby_browser_entry.Link,{to:"/gear/hiking"},"Hiking")),/*#__PURE__*/index_js_default().createElement("li",{className:"secondary-menu__item"},/*#__PURE__*/index_js_default().createElement(gatsby_browser_entry.Link,{to:"/gear/shelter-sleeping"},"Shelter and Sleep System")),/*#__PURE__*/index_js_default().createElement("li",{className:"secondary-menu__item"},/*#__PURE__*/index_js_default().createElement(gatsby_browser_entry.Link,{to:"/gear/clothing-shoes"},"Clothing and Shoes")),/*#__PURE__*/index_js_default().createElement("li",{className:"secondary-menu__item"},/*#__PURE__*/index_js_default().createElement(gatsby_browser_entry.Link,{to:"/gear/cooking-filtration"},"Cooking and Filtration")),/*#__PURE__*/index_js_default().createElement("li",{className:"secondary-menu__item"},/*#__PURE__*/index_js_default().createElement(gatsby_browser_entry.Link,{to:"/gear/first-aid-hygiene-miscellaneous"},"First Aid, Hygiene, and Miscellaneous")),/*#__PURE__*/index_js_default().createElement("li",{className:"secondary-menu__item"},/*#__PURE__*/index_js_default().createElement(gatsby_browser_entry.Link,{to:"/gear/electronics"},"Electronics"))));/* harmony default export */ const gear_menu = (GearMenu);
;// CONCATENATED MODULE: ./src/templates/NodeBlogTemplate/index.js
const NodeBlogTemplate=({data:{node},pageContext})=>{var _node$relationships,_node$intro;const{title,subtitle}=node;const components=componentResolver(node===null||node===void 0?void 0:(_node$relationships=node.relationships)===null||_node$relationships===void 0?void 0:_node$relationships.field_body_elements);let subTitle="";let fullTitle="";let pageDescription="";const socialImageSrc=(0,gatsby_image_module/* getSrc */.dk)(node.relationships.social.gatsbyImage);const blogType=node.type.tid;let contentType="";if(node.type.tid===1){contentType="main-content hike-blog-page";fullTitle=node.rel.cat.name+": "+title;subTitle=subtitle;pageDescription=subtitle;}else if(node.type.tid===2){contentType="main-content gear-blog-page";fullTitle=subtitle;subTitle=title;pageDescription="A gear list for "+title+" carried by Gravity on his hikes.";}else{contentType="main-content about-blog-page";fullTitle=node.rel.cat.name+": "+title;subTitle=subtitle;pageDescription="Information about "+title+".";}// For previous article.
const prev=pageContext.prev?{url:pageContext.prev.path.alias,title:pageContext.prev.title}:null;// For next article.
const next=pageContext.next?{url:pageContext.next.path.alias,title:pageContext.next.title}:null;const PrevNextLinks=()=>{return/*#__PURE__*/index_js_default().createElement("nav",{className:"prev-next mt-6"},/*#__PURE__*/index_js_default().createElement("div",{className:"prev-next__prev"},prev&&/*#__PURE__*/index_js_default().createElement("a",{href:prev.url,title:"Go to the Previous Post",className:"prev-next__prev--link"},/*#__PURE__*/index_js_default().createElement("div",{className:"prev-next__inner"},/*#__PURE__*/index_js_default().createElement("p",null,"Previous"),/*#__PURE__*/index_js_default().createElement("h3",null,prev.title)))),/*#__PURE__*/index_js_default().createElement("div",{className:"prev-next__next"},next&&/*#__PURE__*/index_js_default().createElement("a",{href:next.url,title:"Go to the Next Post",className:"prev-next__next--link"},/*#__PURE__*/index_js_default().createElement("div",{className:"prev-next__inner"},/*#__PURE__*/index_js_default().createElement("p",null,"Next"),/*#__PURE__*/index_js_default().createElement("h3",null,next.title)))));};return/*#__PURE__*/index_js_default().createElement((index_js_default()).Fragment,null,/*#__PURE__*/index_js_default().createElement(seo/* default */.Z,{title:fullTitle,description:pageDescription,nodePath:node.path.alias,nodeImage:socialImageSrc}),/*#__PURE__*/index_js_default().createElement(layout/* default */.Z,null,/*#__PURE__*/index_js_default().createElement("div",{className:contentType},/*#__PURE__*/index_js_default().createElement(Cover,{title:fullTitle,subtitle:subTitle,alt:node.alt.alt,image:node.relationships.cover.gatsbyImage,type:node.type.tid}),/*#__PURE__*/index_js_default().createElement("div",{className:"w-screen py-2.5 bg-white"},/*#__PURE__*/index_js_default().createElement("article",{className:"mx-auto max-w-5xl"},blogType===2?/*#__PURE__*/index_js_default().createElement(gear_menu,null):"",/*#__PURE__*/index_js_default().createElement(Body,{content:node===null||node===void 0?void 0:(_node$intro=node.intro)===null||_node$intro===void 0?void 0:_node$intro.processed}),components&&components.map(item=>{return/*#__PURE__*/index_js_default().createElement((index_js_default()).Fragment,{key:uuid_default()()},item);}),/*#__PURE__*/index_js_default().createElement("div",{className:"comments mt-6 text-2xl prose mx-auto max-w-3xl px-5 text-gravBlack"},/*#__PURE__*/index_js_default().createElement("h3",{className:"comments__header"},"Comments"),/*#__PURE__*/index_js_default().createElement("p",{className:"comments__quote"},"\"Nothing to tell now. Let the words be yours, I'm done with mine.\"",/*#__PURE__*/index_js_default().createElement("span",null,/*#__PURE__*/index_js_default().createElement("a",{href:"https://youtu.be/dBFwuXXOSPE"},"ref."))),/*#__PURE__*/index_js_default().createElement(esm/* Embed */.c,{websiteId:1614,id:node.path.alias,loadMode:"scroll"})),blogType===1?/*#__PURE__*/index_js_default().createElement(PrevNextLinks,null):"")))));};/* harmony default export */ const templates_NodeBlogTemplate = (NodeBlogTemplate);const query="2523166602";NodeBlogTemplate.propTypes={/** Content */text:prop_types_default().shape({processed:(prop_types_default()).string}),alt:prop_types_default().shape({alt:(prop_types_default()).string}),media:prop_types_default().shape({/** Image Tag */photo:(prop_types_default()).symbol}),/* Blog type */type:prop_types_default().shape({tid:(prop_types_default()).number}),/** Additional classes. */classes:(prop_types_default()).string};

/***/ })

};
;
//# sourceMappingURL=component---src-templates-node-blog-template-index-js.js.map