(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_Home_tsx"],{

/***/ "./resources/js/components/layouts/Sidebar.tsx":
/*!*****************************************************!*\
  !*** ./resources/js/components/layouts/Sidebar.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react_minimal_side_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-minimal-side-navigation */ "./node_modules/react-minimal-side-navigation/lib/index.js");
/* harmony import */ var react_minimal_side_navigation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_minimal_side_navigation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_minimal_side_navigation_lib_ReactMinimalSideNavigation_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css */ "./node_modules/react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");





function Sidebar() {
  var history = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_3__.useHistory)();
  var location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_3__.useLocation)();
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({
      className: "col-2 bg-gray py-3"
    }, {
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_minimal_side_navigation__WEBPACK_IMPORTED_MODULE_1__.Navigation, {
        activeItemId: location.pathname,
        onSelect: function onSelect(_ref) {
          var itemId = _ref.itemId;
          history.push(itemId);
        },
        items: [{
          title: 'Dashboard',
          itemId: '/'
        }, {
          title: 'Manufacturer',
          itemId: '/manufacturer'
        }, {
          title: 'Market',
          itemId: '/market'
        }]
      })
    }))
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sidebar);

/***/ }),

/***/ "./resources/js/pages/Home.tsx":
/*!*************************************!*\
  !*** ./resources/js/pages/Home.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _components_layouts_Sidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/layouts/Sidebar */ "./resources/js/components/layouts/Sidebar.tsx");



var Home = function Home() {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({
    className: "row grow"
  }, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_layouts_Sidebar__WEBPACK_IMPORTED_MODULE_1__["default"], {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({
      className: "main col-10 h-100 py-3"
    }, {
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({
        className: "container"
      }, {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({
          className: "row"
        }, {
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
            children: "Welcome to dashboard!"
          })
        }))
      }))
    }))]
  }));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[2]!./node_modules/react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[2]!./node_modules/react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".side-navigation-panel *,.side-navigation-panel:after,.side-navigation-panel:before{border-color:#e2e8f0;border-style:solid;border-width:0;box-sizing:border-box}.side-navigation-panel ul{list-style-type:none;margin:0;padding:0}.side-navigation-panel .side-navigation-panel-select .side-navigation-panel-select-wrap .side-navigation-panel-select-option{--tw-text-opacity:1;align-items:center;border-left-width:2px;color:rgba(55,65,81,var(--tw-text-opacity));cursor:pointer;display:flex;justify-content:space-between;padding:.75rem 1.5rem;width:100%}.side-navigation-panel .side-navigation-panel-select .side-navigation-panel-select-wrap .side-navigation-panel-select-option:focus{outline:2px solid transparent;outline-offset:2px}.side-navigation-panel .side-navigation-panel-select .side-navigation-panel-select-wrap .side-navigation-panel-select-option:hover{--tw-border-opacity:1;--tw-bg-opacity:1;--tw-text-opacity:1;background-color:rgba(243,244,246,var(--tw-bg-opacity));border-color:rgba(236,72,153,var(--tw-border-opacity));color:rgba(31,41,55,var(--tw-text-opacity))}.side-navigation-panel .side-navigation-panel-select .side-navigation-panel-select-wrap .side-navigation-panel-select-option .side-navigation-panel-select-option-wrap{align-items:center;display:flex}.side-navigation-panel .side-navigation-panel-select .side-navigation-panel-select-wrap .side-navigation-panel-select-option .side-navigation-panel-select-option-wrap .side-navigation-panel-select-option-text{font-weight:500;margin-left:1rem;margin-right:1rem}.side-navigation-panel .side-navigation-panel-select .side-navigation-panel-select-wrap .side-navigation-panel-select-option .side-navigation-panel-select-option-icon,.side-navigation-panel .side-navigation-panel-select .side-navigation-panel-select-wrap .side-navigation-panel-select-option svg{display:block;vertical-align:middle}.side-navigation-panel .side-navigation-panel-select .side-navigation-panel-select-wrap .side-navigation-panel-select-option-selected{--tw-border-opacity:1;--tw-bg-opacity:1;--tw-text-opacity:1;background-color:rgba(243,244,246,var(--tw-bg-opacity));border-color:rgba(236,72,153,var(--tw-border-opacity));color:rgba(31,41,55,var(--tw-text-opacity))}.side-navigation-panel .side-navigation-panel-select .side-navigation-panel-select-inner .side-navigation-panel-select-inner-wrap .side-navigation-panel-select-inner-option{--tw-text-opacity:1;align-items:center;border-left-width:2px;color:rgba(55,65,81,var(--tw-text-opacity));cursor:pointer;display:flex;justify-content:space-between;padding:.5rem 4rem}.side-navigation-panel .side-navigation-panel-select .side-navigation-panel-select-inner .side-navigation-panel-select-inner-wrap .side-navigation-panel-select-inner-option:hover{--tw-border-opacity:1;--tw-bg-opacity:1;--tw-text-opacity:1;background-color:rgba(243,244,246,var(--tw-bg-opacity));border-color:rgba(236,72,153,var(--tw-border-opacity));color:rgba(31,41,55,var(--tw-text-opacity))}.side-navigation-panel .side-navigation-panel-select .side-navigation-panel-select-inner .side-navigation-panel-select-inner-wrap .side-navigation-panel-select-inner-option .side-navigation-panel-select-inner-option-wrap{align-items:center;display:flex}.side-navigation-panel .side-navigation-panel-select .side-navigation-panel-select-inner .side-navigation-panel-select-inner-wrap .side-navigation-panel-select-inner-option .side-navigation-panel-select-inner-option-wrap .side-navigation-panel-select-inner-option-text{font-size:.875rem;line-height:1.25rem;margin-left:.75rem;margin-right:.75rem}.side-navigation-panel .side-navigation-panel-select .side-navigation-panel-select-inner .side-navigation-panel-select-inner-wrap .side-navigation-panel-select-inner-option-selected{--tw-border-opacity:1;--tw-bg-opacity:1;--tw-text-opacity:1;background-color:rgba(243,244,246,var(--tw-bg-opacity));border-color:rgba(236,72,153,var(--tw-border-opacity));color:rgba(31,41,55,var(--tw-text-opacity))}.table{display:table}@-webkit-keyframes spin{to{transform:rotate(1turn)}}@keyframes spin{to{transform:rotate(1turn)}}@-webkit-keyframes ping{75%,to{opacity:0;transform:scale(2)}}@keyframes ping{75%,to{opacity:0;transform:scale(2)}}@-webkit-keyframes pulse{50%{opacity:.5}}@keyframes pulse{50%{opacity:.5}}@-webkit-keyframes bounce{0%,to{-webkit-animation-timing-function:cubic-bezier(.8,0,1,1);animation-timing-function:cubic-bezier(.8,0,1,1);transform:translateY(-25%)}50%{-webkit-animation-timing-function:cubic-bezier(0,0,.2,1);animation-timing-function:cubic-bezier(0,0,.2,1);transform:none}}@keyframes bounce{0%,to{-webkit-animation-timing-function:cubic-bezier(.8,0,1,1);animation-timing-function:cubic-bezier(.8,0,1,1);transform:translateY(-25%)}50%{-webkit-animation-timing-function:cubic-bezier(0,0,.2,1);animation-timing-function:cubic-bezier(0,0,.2,1);transform:none}}*,:after,:before{--tw-shadow:0 0 #0000;--tw-ring-inset:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/react-minimal-side-navigation/lib/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react-minimal-side-navigation/lib/index.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(/*! react */ "./node_modules/react/index.js")):0}(this,(function(e){return(()=>{"use strict";var t={966:function(e,t,n){var a=this&&this.__assign||function(){return(a=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},i=this&&this.__rest||function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(a=Object.getOwnPropertySymbols(e);i<a.length;i++)t.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(e,a[i])&&(n[a[i]]=e[a[i]])}return n},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.ChevronUpIcon=t.ChevronDownIcon=void 0;var r=o(n(297));t.ChevronDownIcon=r.default.memo((function(e){var t=e.size,n=void 0===t?20:t,o=e.stroke,l=void 0===o?"currentColor":o,s=i(e,["size","stroke"]);return r.default.createElement(r.default.Fragment,null,r.default.createElement("svg",a({width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:l,strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round",className:"side-navigation-panel-select-option-icon side-navigation-panel-select-option-icon-chevron-down"},s),r.default.createElement("path",{d:"M6 9l6 6 6-6"})))}));t.ChevronUpIcon=r.default.memo((function(e){var t=e.size,n=void 0===t?20:t,o=e.stroke,l=void 0===o?"currentColor":o,s=i(e,["size","stroke"]);return r.default.createElement(r.default.Fragment,null,r.default.createElement("svg",a({width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:l,strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round",className:"side-navigation-panel-select-option-icon side-navigation-panel-select-option-icon-chevron-up"},s),r.default.createElement("path",{d:"M18 15l-6-6-6 6"})))}))},851:function(e,t,n){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Navigation=void 0;var i=n(805);Object.defineProperty(t,"Navigation",{enumerable:!0,get:function(){return a(i).default}})},805:function(e,t,n){var a=this&&this.__assign||function(){return(a=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},i=this&&this.__createBinding||(Object.create?function(e,t,n,a){void 0===a&&(a=n),Object.defineProperty(e,a,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,a){void 0===a&&(a=n),e[a]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&i(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});var l=r(n(297)),s=n(966);n(645);t.default=function(e){var t=e.activeItemId,n=e.onSelect,i=e.items,o=l.useState({expanded:!0,selectedId:t}),r=o[0],c=o[1];function d(e){null==n||n({itemId:e})}return l.default.useEffect((function(){c((function(e){return{expanded:e.expanded,selectedId:t}}))}),[t]),l.default.createElement(l.default.Fragment,null,i.length>0&&l.default.createElement("nav",{role:"navigation","aria-label":"side-navigation",className:"side-navigation-panel"},i.map((function(e){var t=e.elemBefore,n=e.itemId===r.selectedId,i=r.expanded&&(n||e.subNav&&e.subNav.some((function(e){return e.itemId===r.selectedId}))||!1);return l.default.createElement("ul",{key:e.itemId,className:"side-navigation-panel-select"},l.default.createElement("li",{className:"side-navigation-panel-select-wrap"},l.default.createElement("div",{onClick:function(){!function(e){if(r.expanded){var t=e.itemId===r.selectedId||e.subNav&&e.subNav.some((function(e){return e.itemId===r.selectedId}))||!1;c({expanded:!!(e.subNav&&e.subNav.length>0)&&!t,selectedId:e.itemId})}else c({expanded:!!(e.subNav&&e.subNav.length>0),selectedId:e.itemId})}(e),d(e.itemId)},className:"side-navigation-panel-select-option "+(n?"side-navigation-panel-select-option-selected":"")},l.default.createElement("span",{className:"side-navigation-panel-select-option-wrap"},t&&l.default.createElement(t,null),l.default.createElement("span",{className:"side-navigation-panel-select-option-text"},e.title)),e.subNav&&e.subNav.length>0&&(i?l.default.createElement(s.ChevronUpIcon,null):l.default.createElement(s.ChevronDownIcon,null)))),e.subNav&&e.subNav.length>0&&i&&l.default.createElement("ul",{className:"side-navigation-panel-select-inner"},e.subNav.map((function(e){var t=e.elemBefore;return l.default.createElement("li",{key:e.itemId,className:"side-navigation-panel-select-inner-wrap"},l.default.createElement("div",{onClick:function(){c(a(a({},r),{selectedId:e.itemId})),d(e.itemId)},className:"side-navigation-panel-select-inner-option "+(r.selectedId===e.itemId?"side-navigation-panel-select-inner-option-selected":"")+" "},l.default.createElement("span",{className:"side-navigation-panel-select-inner-option-wrap"},t&&l.default.createElement(t,null),l.default.createElement("span",{className:"side-navigation-panel-select-inner-option-text"},e.title))))}))))}))))}},645:(e,t,n)=>{n.r(t)},297:t=>{t.exports=e}},n={};function a(e){var i=n[e];if(void 0!==i)return i.exports;var o=n[e]={exports:{}};return t[e].call(o.exports,o,o.exports,a),o.exports}return a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a(851)})()}));

/***/ }),

/***/ "./node_modules/react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css":
/*!***************************************************************************************!*\
  !*** ./node_modules/react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_cjs_js_ruleSet_1_rules_7_oneOf_1_use_1_postcss_loader_dist_cjs_js_ruleSet_1_rules_7_oneOf_1_use_2_ReactMinimalSideNavigation_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../css-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[1]!../../postcss-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[2]!./ReactMinimalSideNavigation.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[2]!./node_modules/react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_ruleSet_1_rules_7_oneOf_1_use_1_postcss_loader_dist_cjs_js_ruleSet_1_rules_7_oneOf_1_use_2_ReactMinimalSideNavigation_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_ruleSet_1_rules_7_oneOf_1_use_1_postcss_loader_dist_cjs_js_ruleSet_1_rules_7_oneOf_1_use_2_ReactMinimalSideNavigation_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ })

}]);