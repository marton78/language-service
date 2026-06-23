"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var rubyLanguage_js_1 = require("../../src/language/rubyLanguage.js");
describe('rubyLanguage', function () {
    it('should preserve regexp flags in step definitions', function () {
        var node = {
            type: 'regex',
            text: '/^a regexp$/i',
            startPosition: { row: 0, column: 6 },
            endPosition: { row: 0, column: 19 },
            children: [
                {
                    type: 'string_content',
                    text: '^a regexp$',
                    startPosition: { row: 0, column: 7 },
                    endPosition: { row: 0, column: 17 },
                    children: [],
                },
            ],
        };
        var result = (0, rubyLanguage_js_1.toStringOrRegExp)(node);
        assert_1.default.deepStrictEqual(result, /^a regexp$/i);
    });
});
//# sourceMappingURL=rubyLanguage.test.js.map