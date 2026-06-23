"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cucumber_expressions_1 = require("@cucumber/cucumber-expressions");
var assert_1 = __importDefault(require("assert"));
var buildSuggestionFromCucumberExpression_js_1 = require("../../src/suggestions/buildSuggestionFromCucumberExpression.js");
describe('buildSuggestionFromCucumberExpression', function () {
    var registry;
    beforeEach(function () {
        registry = new cucumber_expressions_1.ParameterTypeRegistry();
    });
    it('builds a suggestion from plain expression', function () {
        var expression = new cucumber_expressions_1.CucumberExpression('I have 4 cukes', registry);
        var expected = {
            segments: ['I have 4 cukes'],
            label: 'I have 4 cukes',
            matched: true,
        };
        var actual = (0, buildSuggestionFromCucumberExpression_js_1.buildSuggestionFromCucumberExpression)(expression, registry, {});
        assert_1.default.deepStrictEqual(actual, expected);
    });
    it('builds a suggestion from alternation expression', function () {
        var expression = new cucumber_expressions_1.CucumberExpression('I have 4/5 cukes', registry);
        var expected = {
            segments: ['I have ', ['4', '5'], ' cukes'],
            label: 'I have 4/5 cukes',
            matched: true,
        };
        var actual = (0, buildSuggestionFromCucumberExpression_js_1.buildSuggestionFromCucumberExpression)(expression, registry, {});
        assert_1.default.deepStrictEqual(actual, expected);
    });
    it('builds a suggestion from optional expression', function () {
        var expression = new cucumber_expressions_1.CucumberExpression('I have 1 cuke(s)', registry);
        var expected = {
            segments: ['I have 1 ', ['cuke', 'cukes']],
            label: 'I have 1 cuke(s)',
            matched: true,
        };
        var actual = (0, buildSuggestionFromCucumberExpression_js_1.buildSuggestionFromCucumberExpression)(expression, registry, {});
        assert_1.default.deepStrictEqual(actual, expected);
    });
    it('does not make options for optionals preceded by space', function () {
        var expression = new cucumber_expressions_1.CucumberExpression('he went to  (the )hospital', registry);
        var expected = {
            segments: ['he went to  the hospital'],
            label: 'he went to  (the )hospital',
            matched: true,
        };
        var actual = (0, buildSuggestionFromCucumberExpression_js_1.buildSuggestionFromCucumberExpression)(expression, registry, {});
        assert_1.default.deepStrictEqual(actual, expected);
    });
    it('builds a suggestion from parameter expression with explicit options', function () {
        var expression = new cucumber_expressions_1.CucumberExpression('I have {int} cukes', registry);
        var expected = {
            segments: ['I have ', ['12', '17'], ' cukes'],
            label: 'I have {int} cukes',
            matched: true,
        };
        var actual = (0, buildSuggestionFromCucumberExpression_js_1.buildSuggestionFromCucumberExpression)(expression, registry, {
            int: ['12', '17'],
        });
        assert_1.default.deepStrictEqual(actual, expected);
    });
    it('builds a suggestion from int parameter expression without explicit options', function () {
        var expression = new cucumber_expressions_1.CucumberExpression('I have {int} cukes', registry);
        var expected = {
            segments: ['I have ', ['0'], ' cukes'],
            label: 'I have {int} cukes',
            matched: true,
        };
        var actual = (0, buildSuggestionFromCucumberExpression_js_1.buildSuggestionFromCucumberExpression)(expression, registry, {});
        assert_1.default.deepStrictEqual(actual, expected);
    });
    it('builds a suggestion from only alternation expression', function () {
        var expression = new cucumber_expressions_1.CucumberExpression('me/you', registry);
        var expected = {
            segments: [['me', 'you']],
            label: 'me/you',
            matched: true,
        };
        var actual = (0, buildSuggestionFromCucumberExpression_js_1.buildSuggestionFromCucumberExpression)(expression, registry, {});
        assert_1.default.deepStrictEqual(actual, expected);
    });
    it('builds a suggestion from a custom parameter type', function () {
        var AssetType;
        (function (AssetType) {
            AssetType["atlas"] = "atlases";
            AssetType["audio"] = "audio";
            AssetType["image"] = "images";
            AssetType["prefab"] = "prefabs";
            AssetType["spine"] = "spine";
        })(AssetType || (AssetType = {}));
        registry.defineParameterType(new cucumber_expressions_1.ParameterType('assetType', /prefab|audio|image|spine|atlas/, null, function (s) { return AssetType[s]; }, true, false));
        var expression = new cucumber_expressions_1.CucumberExpression('I have some {assetType}(s)', registry);
        var actual = (0, buildSuggestionFromCucumberExpression_js_1.buildSuggestionFromCucumberExpression)(expression, registry, {
            assetType: ['prefab', 'audio', 'image', 'spine', 'atlas'],
        });
        var expected = {
            segments: ['I have some ', ['prefab', 'audio', 'image', 'spine', 'atlas'], 's'],
            label: 'I have some {assetType}(s)',
            matched: true,
        };
        assert_1.default.deepStrictEqual(actual, expected);
    });
    it('builds a suggestion from complex expression', function () {
        var expression = new cucumber_expressions_1.CucumberExpression('I have {int} cuke(s) in my bag/belly', registry);
        var expected = {
            segments: ['I have ', ['12'], ' ', ['cuke', 'cukes'], ' in my ', ['bag', 'belly']],
            label: 'I have {int} cuke(s) in my bag/belly',
            matched: true,
        };
        var actual = (0, buildSuggestionFromCucumberExpression_js_1.buildSuggestionFromCucumberExpression)(expression, registry, {
            int: ['12'],
        });
        assert_1.default.deepStrictEqual(actual, expected);
    });
});
//# sourceMappingURL=buildSuggestionFromCucumberExpression.test.js.map