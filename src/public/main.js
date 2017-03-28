/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var NavBar = (function (_super) {
    __extends(NavBar, _super);
    function NavBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.goHome = function () {
            _this.props.root.renderProducts();
        };
        return _this;
    }
    NavBar.prototype.render = function () {
        return (React.createElement("nav", { className: "navbar navbar-default" },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "navbar-header" },
                        React.createElement("a", { className: "navbar-brand", onClick: this.goHome }, "STORE"))))));
    };
    return NavBar;
}(React.Component));
exports.NavBar = NavBar;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Products = (function (_super) {
    __extends(Products, _super);
    function Products() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // get Thumbnail element
        _this.getThumbnail = function (product) {
            var variant = product.variants[0];
            return React.createElement("div", { className: "col-sm-6 col-md-4" },
                React.createElement("div", { className: "thumbnail" },
                    React.createElement("img", { src: product.image.src }),
                    React.createElement("div", { className: "caption" },
                        React.createElement("h3", { className: "title" },
                            product.title,
                            React.createElement("br", null),
                            React.createElement("span", { className: "compare_at_price" },
                                "$",
                                variant.price,
                                "  "),
                            React.createElement("span", { className: "price" },
                                " $",
                                variant.price * Products.DISCOUNT,
                                " Sale")),
                        React.createElement("p", null, product.body_html),
                        React.createElement("p", null,
                            React.createElement("a", { href: "#", className: "btn btn-primary btn-block", role: "button", onClick: function () { return _this.onClickBuyButton(product); } }, "BUY")))));
        };
        _this.onClickBuyButton = function (product) {
            var post_data = JSON.stringify({
                variantId: product.variants[0].id,
                qty: 1,
                price: product.variants[0].price,
                percentage: 100 - 100 * Products.DISCOUNT
            });
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("load", function (res) {
                if (res.target.status == 200) {
                    console.log(JSON.parse(res.target.response));
                }
            });
            xhr.open("POST", window.location.origin + "/draft_orders.json");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(post_data);
        };
        return _this;
    }
    Products.prototype.render = function () {
        var _this = this;
        var thumbnails = Array();
        this.props.products.forEach(function (product) {
            thumbnails.push(_this.getThumbnail(product));
        });
        return React.createElement("div", { className: "row" }, thumbnails);
    };
    return Products;
}(React.Component));
Products.DISCOUNT = 0.75;
exports.Products = Products;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(3);
var products_component_1 = __webpack_require__(2);
var navBar_component_1 = __webpack_require__(1);
var Root = (function (_super) {
    __extends(Root, _super);
    function Root(props) {
        var _this = _super.call(this, props) || this;
        _this.getProducts = function (callback) {
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("load", function (ev) {
                if (ev.target.status == 200) {
                    Root.products = JSON.parse(ev.target.response);
                    if (callback)
                        callback();
                }
            });
            xhr.open("GET", window.location.origin + "/products.json");
            xhr.send();
        };
        _this.renderProducts = function () {
            console.log(Root.products);
            ReactDOM.render(React.createElement(products_component_1.Products, { products: Root.products }), document.querySelector(".main"));
        };
        _this.renderNavBar = function () {
            ReactDOM.render(React.createElement(navBar_component_1.NavBar, { root: _this }), document.querySelector(".nav"));
        };
        return _this;
    }
    // when component mounted
    Root.prototype.componentDidMount = function () {
        this.renderNavBar();
        this.getProducts(this.renderProducts); // callback: renderProduct
    };
    Root.prototype.render = function () {
        return React.createElement("div", null,
            React.createElement("div", { className: "nav" }),
            React.createElement("div", { className: "main container" }));
    };
    return Root;
}(React.Component));
exports.Root = Root;
var init = function () {
    ReactDOM.render(React.createElement(Root, null), document.querySelector(".root"));
};
init();


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map