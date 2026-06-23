"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cucumber_expressions_1 = require("@cucumber/cucumber-expressions");
var assert_1 = __importDefault(require("assert"));
var buildSuggestions_js_1 = require("../../src/suggestions/buildSuggestions.js");
describe('buildSuggestions', function () {
    it('builds suggestions with choices', function () {
        var parameterTypeRegistry = new cucumber_expressions_1.ParameterTypeRegistry();
        var ef = new cucumber_expressions_1.ExpressionFactory(parameterTypeRegistry);
        var e1 = ef.createExpression('The {word} song');
        var e2 = ef.createExpression('The {word} boat');
        assertSuggestions(parameterTypeRegistry, ['The nice song', 'The big boat'], [e1, e2], [
            {
                label: 'The {word} boat',
                segments: ['The ', ['big', 'nice'], ' boat'],
                matched: true,
            },
            {
                label: 'The {word} song',
                segments: ['The ', ['big', 'nice'], ' song'],
                matched: true,
            },
        ]);
    });
    it('builds suggestions from CucumberExpression', function () {
        var parameterTypeRegistry = new cucumber_expressions_1.ParameterTypeRegistry();
        var ef = new cucumber_expressions_1.ExpressionFactory(parameterTypeRegistry);
        var expression = ef.createExpression('I have {int} cukes in/on my {word}');
        assertSuggestions(parameterTypeRegistry, [
            'I have 42 cukes in my belly',
            'I have 54 cukes on my table',
            'I have 54 cukes in my basket',
        ], [expression], [
            {
                label: 'I have {int} cukes in/on my {word}',
                segments: [
                    'I have ',
                    ['42', '54'],
                    ' cukes ',
                    ['in', 'on'],
                    ' my ',
                    ['basket', 'belly', 'table'],
                ],
                matched: true,
            },
        ]);
    });
    it('builds suggestions from RegularExpression', function () {
        var parameterTypeRegistry = new cucumber_expressions_1.ParameterTypeRegistry();
        var ef = new cucumber_expressions_1.ExpressionFactory(parameterTypeRegistry);
        var expression = ef.createExpression(/I have (\d\d) cukes in my "(belly|suitcase)"/);
        assertSuggestions(parameterTypeRegistry, ['I have 42 cukes in my "belly"', 'I have 54 cukes in my "suitcase"'], [expression], [
            {
                label: 'I have (\\d\\d) cukes in my "(belly|suitcase)"',
                segments: ['I have ', ['42', '54'], ' cukes in my "', ['belly', 'suitcase'], '"'],
                matched: true,
            },
        ]);
    });
    it('builds suggestions from another RegularExpression', function () {
        var parameterTypeRegistry = new cucumber_expressions_1.ParameterTypeRegistry();
        var ef = new cucumber_expressions_1.ExpressionFactory(parameterTypeRegistry);
        var expression = ef.createExpression(/^the price of a "(.*?)" is (\d+)c$/);
        assertSuggestions(parameterTypeRegistry, ['the price of a "lemon" is 34c', 'the price of a "pear" is 48c'], [expression], [
            {
                label: '^the price of a "(.*?)" is (\\d+)c$',
                segments: ['the price of a "', ['lemon', 'pear'], '" is ', ['...'], 'c'],
                matched: true,
            },
        ]);
    });
    it('builds suggestions with a max number of choices', function () {
        var parameterTypeRegistry = new cucumber_expressions_1.ParameterTypeRegistry();
        var ef = new cucumber_expressions_1.ExpressionFactory(parameterTypeRegistry);
        var expression = ef.createExpression('I have {int} cukes in/on my {word}');
        assertSuggestions(parameterTypeRegistry, [
            'I have 42 cukes in my belly',
            'I have 54 cukes on my table',
            'I have 67 cukes in my belly',
            'I have 54 cukes in my basket',
        ], [expression], [
            {
                label: 'I have {int} cukes in/on my {word}',
                segments: ['I have ', ['42', '54'], ' cukes ', ['in', 'on'], ' my ', ['basket', 'belly']],
                matched: true,
            },
        ], 2);
    });
    it('builds suggestions from unmatched step texts', function () {
        var parameterTypeRegistry = new cucumber_expressions_1.ParameterTypeRegistry();
        assertSuggestions(parameterTypeRegistry, [
            'I have 42 cukes in my belly',
            'I have 54 cukes on my table',
            'I have 54 cukes in my basket',
        ], [], [
            {
                label: 'I have 42 cukes in my belly',
                segments: ['I have 42 cukes in my belly'],
                matched: false,
            },
            {
                label: 'I have 54 cukes in my basket',
                segments: ['I have 54 cukes in my basket'],
                matched: false,
            },
            {
                label: 'I have 54 cukes on my table',
                segments: ['I have 54 cukes on my table'],
                matched: false,
            },
        ]);
    });
});
function assertSuggestions(parameterTypeRegistry, stepTexts, expressions, expectedSuggestions, maxChoices) {
    if (maxChoices === void 0) { maxChoices = 10; }
    var suggestions = (0, buildSuggestions_js_1.buildSuggestions)(parameterTypeRegistry, stepTexts, expressions, maxChoices);
    assert_1.default.deepStrictEqual(suggestions, expectedSuggestions);
}
//# sourceMappingURL=buildSuggestions.test.js.map