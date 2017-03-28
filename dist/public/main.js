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
var React = require("react");
var ReactDOM = require("react-dom");
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
            ReactDOM.render(data, { Root: .products } /  > , document.querySelector(".products"));
        };
        return _this;
    }
    return Root;
}(React.Component));
exports.Root = Root;
//# sourceMappingURL=main.js.map