"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var goLanguage_js_1 = require("../../src/language/goLanguage.js");
describe('goLanguage', function () {
    it('should remove enclosing string quotations and backticks', function () {
        var cases = ['`^I eat (d+)$`', '"^I eat (d+)$"'];
        cases.forEach(function (expression) {
            var node = {
                type: 'raw_string_literal',
                text: expression,
                startPosition: { row: 1, column: 19 },
                endPosition: { row: 1, column: 19 + expression.length },
                children: [],
            };
            var result = (0, goLanguage_js_1.stringLiteral)(node);
            assert_1.default.deepStrictEqual(result, '^I eat (d+)$');
        });
    });
});
//# sourceMappingURL=goLanguage.test.js.map