"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_layouts_Header_tsx"],{

/***/ "./resources/js/auth/logout/logout.actions.ts":
/*!****************************************************!*\
  !*** ./resources/js/auth/logout/logout.actions.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "logoutAction": () => (/* binding */ logoutAction)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _logout_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logout.types */ "./resources/js/auth/logout/logout.types.ts");


var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};


var logoutAction = function logoutAction() {
  return function (dispatch) {
    return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch({
                type: _logout_types__WEBPACK_IMPORTED_MODULE_1__["default"].LOG_OUT
              });

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
  };
};

/***/ }),

/***/ "./resources/js/auth/logout/logout.types.ts":
/*!**************************************************!*\
  !*** ./resources/js/auth/logout/logout.types.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var LogoutTypes;

(function (LogoutTypes) {
  LogoutTypes["LOG_OUT"] = "LOG_OUT";
})(LogoutTypes || (LogoutTypes = {}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LogoutTypes);

/***/ }),

/***/ "./resources/js/components/layouts/Header.tsx":
/*!****************************************************!*\
  !*** ./resources/js/components/layouts/Header.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _auth_logout_logout_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../auth/logout/logout.actions */ "./resources/js/auth/logout/logout.actions.ts");
/* harmony import */ var _config_redux_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/redux/store */ "./resources/js/config/redux/store.ts");






var Header = function Header() {
  var loginStateData = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(function (state) {
    return state.loginState;
  });
  var history = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_4__.useHistory)();

  var logout = function logout() {
    _config_redux_store__WEBPACK_IMPORTED_MODULE_3__.store.dispatch((0,_auth_logout_logout_actions__WEBPACK_IMPORTED_MODULE_2__.logoutAction)());
    history.push("/login");
  };

  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("nav", Object.assign({
      className: "navbar navbar-expand-lg navbar-dark bg-dark sticky-top col-12 bg-primary py-3"
    }, {
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({
        className: "container"
      }, {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.NavLink, Object.assign({
          to: "/",
          className: "navbar-brand"
        }, {
          children: "Health Care"
        })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", Object.assign({
          className: "navbar-toggler",
          type: "button",
          "data-bs-toggle": "collapse",
          "data-bs-target": "#navbarNavAltMarkup",
          "aria-controls": "navbarNavAltMarkup",
          "aria-expanded": "false",
          "aria-label": "Toggle navigation"
        }, {
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "navbar-toggler-icon"
          })
        })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({
          className: "collapse navbar-collapse",
          id: "navbarNavAltMarkup"
        }, {
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("ul", Object.assign({
            className: "navbar-nav ms-auto"
          }, {
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", Object.assign({
              className: "navbar-item"
            }, {
              children: loginStateData.data.isSuccess == true ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.NavLink, Object.assign({
                to: "/",
                className: "nav-link",
                onClick: logout
              }, {
                children: "Logout"
              })) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.NavLink, Object.assign({
                to: "/login",
                className: "nav-link"
              }, {
                children: "Login"
              }))
            }))
          }))
        }))]
      }))
    }))
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);

/***/ })

}]);