"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var SourceAnalyzer_js_1 = require("../../src/language/SourceAnalyzer.js");
var tsxLanguage_js_1 = require("../../src/language/tsxLanguage.js");
describe('tsxLanguage', function () {
    it('should preserve regexp flags in step definitions', function () {
        var node = {
            type: 'regex',
            text: '/^a regexp$/im',
            startPosition: { row: 0, column: 6 },
            endPosition: { row: 0, column: 21 },
            children: [
                {
                    type: 'regex_pattern',
                    text: '^a regexp$',
                    startPosition: { row: 0, column: 7 },
                    endPosition: { row: 0, column: 17 },
                    children: [],
                },
                {
                    type: 'regex_flags',
                    text: 'imu',
                    startPosition: { row: 0, column: 18 },
                    endPosition: { row: 0, column: 21 },
                    children: [],
                },
            ],
        };
        var result = (0, tsxLanguage_js_1.toStringOrRegExp)(node);
        assert_1.default.deepStrictEqual(result, /^a regexp$/im);
    });
    it('should generate cucumber expression strings from template literals without substitution', function () {
        var node = {
            type: 'template_string',
            text: '`hello there`',
            startPosition: { row: 0, column: 5 },
            endPosition: { row: 0, column: 18 },
            children: [],
        };
        var result = (0, tsxLanguage_js_1.toStringOrRegExp)(node);
        assert_1.default.deepStrictEqual(result, 'hello there');
    });
    it('should generate a regexp that matches nothing from template literals with substitution', function () {
        var node = {
            type: 'template_string',
            text: '`hello there`',
            startPosition: { row: 0, column: 5 },
            endPosition: { row: 0, column: 21 },
            children: [
                {
                    type: 'template_substitution',
                    text: '${there}',
                    startPosition: { row: 0, column: 12 },
                    endPosition: { row: 0, column: 20 },
                    children: [
                        {
                            type: 'identifier',
                            text: 'there',
                            startPosition: { row: 0, column: 14 },
                            endPosition: { row: 0, column: 19 },
                            children: [],
                        },
                    ],
                },
            ],
        };
        var result = (0, tsxLanguage_js_1.toStringOrRegExp)(node);
        assert_1.default.deepStrictEqual(result, SourceAnalyzer_js_1.NO_EXPRESSION);
    });
});
//# sourceMappingURL=tsxLanguage.test.js.map