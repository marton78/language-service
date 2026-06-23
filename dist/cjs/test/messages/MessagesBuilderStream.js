"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesBuilderStream = void 0;
var stream_1 = require("stream");
var MessagesBuilder_js_1 = require("../../src/messages/MessagesBuilder.js");
var MessagesBuilderStream = /** @class */ (function (_super) {
    __extends(MessagesBuilderStream, _super);
    function MessagesBuilderStream(errorHandler) {
        if (errorHandler === void 0) { errorHandler = function () { return undefined; }; }
        var _this = _super.call(this, { objectMode: true }) || this;
        _this.errorHandler = errorHandler;
        _this.builder = new MessagesBuilder_js_1.MessagesBuilder();
        return _this;
    }
    MessagesBuilderStream.prototype._transform = function (envelope, _, callback) {
        this.builder.processEnvelope(envelope, this.errorHandler);
        callback();
    };
    MessagesBuilderStream.prototype._flush = function (callback) {
        callback(null, this.builder.build());
    };
    return MessagesBuilderStream;
}(stream_1.Transform));
exports.MessagesBuilderStream = MessagesBuilderStream;
//# sourceMappingURL=MessagesBuilderStream.js.map