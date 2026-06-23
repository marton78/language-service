"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var javaLanguage_js_1 = require("../../src/language/javaLanguage.js");
describe('javaLanguage', function () {
    it('should remove (?i) from regexp strings', function () {
        var node = {
            type: 'string_literal',
            text: '"(?i)(day|hour)s?"',
            startPosition: { row: 1, column: 19 },
            endPosition: { row: 1, column: 37 },
            children: [],
        };
        var result = (0, javaLanguage_js_1.stringLiteral)(node);
        assert_1.default.deepStrictEqual(result, '(day|hour)s?');
    });
});
//# sourceMappingURL=javaLanguage.test.js.map