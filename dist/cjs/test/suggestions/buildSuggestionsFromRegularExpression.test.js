"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cucumber_expressions_1 = require("@cucumber/cucumber-expressions");
var assert_1 = __importDefault(require("assert"));
var buildSuggestionsFromRegularExpression_js_1 = require("../../src/suggestions/buildSuggestionsFromRegularExpression.js");
describe('buildSuggestionsFromRegularExpression', function () {
    var registry;
    beforeEach(function () {
        registry = new cucumber_expressions_1.ParameterTypeRegistry();
    });
    it('builds suggestions from a plain expression', function () {
        var expression = new cucumber_expressions_1.RegularExpression(/I have 4 cukes/, registry);
        var expected = {
            segments: ['I have 4 cukes'],
            label: 'I have 4 cukes',
            matched: true,
        };
        var actual = (0, buildSuggestionsFromRegularExpression_js_1.buildSuggestionsFromRegularExpression)(expression, registry, ['I have 4 cukes'], {});
        assert_1.default.deepStrictEqual(actual, [expected]);
    });
    it('builds suggestions from an expression with a group', function () {
        var expression = new cucumber_expressions_1.RegularExpression(/I have (\d+) cukes/, registry);
        var expected = {
            segments: ['I have ', ['12'], ' cukes'],
            label: 'I have (\\d+) cukes',
            matched: true,
        };
        var actual = (0, buildSuggestionsFromRegularExpression_js_1.buildSuggestionsFromRegularExpression)(expression, registry, ['I have 4 cukes'], {
            '-?\\d+|\\d+': ['12'],
        });
        assert_1.default.deepStrictEqual(actual, [expected]);
    });
    it('builds suggestions for regexp without choices', function () {
        var expression = new cucumber_expressions_1.RegularExpression(/^the price of a "(.*?)" is (\d+)c$/, registry);
        var expected = {
            segments: ['the price of a "', ['...'], '" is ', ['...'], 'c'],
            label: '^the price of a "(.*?)" is (\\d+)c$',
            matched: true,
        };
        var actual = (0, buildSuggestionsFromRegularExpression_js_1.buildSuggestionsFromRegularExpression)(expression, registry, ['the price of a "lemon" is 34c'], {});
        assert_1.default.deepStrictEqual(actual, [expected]);
    });
});
//# sourceMappingURL=buildSuggestionsFromRegularExpression.test.js.map