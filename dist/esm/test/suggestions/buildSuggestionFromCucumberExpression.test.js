import { CucumberExpression, ParameterType, ParameterTypeRegistry, } from '@cucumber/cucumber-expressions';
import assert from 'assert';
import { buildSuggestionFromCucumberExpression } from '../../src/suggestions/buildSuggestionFromCucumberExpression.js';
describe('buildSuggestionFromCucumberExpression', () => {
    let registry;
    beforeEach(() => {
        registry = new ParameterTypeRegistry();
    });
    it('builds a suggestion from plain expression', () => {
        const expression = new CucumberExpression('I have 4 cukes', registry);
        const expected = {
            segments: ['I have 4 cukes'],
            label: 'I have 4 cukes',
            matched: true,
        };
        const actual = buildSuggestionFromCucumberExpression(expression, registry, {});
        assert.deepStrictEqual(actual, expected);
    });
    it('builds a suggestion from alternation expression', () => {
        const expression = new CucumberExpression('I have 4/5 cukes', registry);
        const expected = {
            segments: ['I have ', ['4', '5'], ' cukes'],
            label: 'I have 4/5 cukes',
            matched: true,
        };
        const actual = buildSuggestionFromCucumberExpression(expression, registry, {});
        assert.deepStrictEqual(actual, expected);
    });
    it('builds a suggestion from optional expression', () => {
        const expression = new CucumberExpression('I have 1 cuke(s)', registry);
        const expected = {
            segments: ['I have 1 ', ['cuke', 'cukes']],
            label: 'I have 1 cuke(s)',
            matched: true,
        };
        const actual = buildSuggestionFromCucumberExpression(expression, registry, {});
        assert.deepStrictEqual(actual, expected);
    });
    it('does not make options for optionals preceded by space', () => {
        const expression = new CucumberExpression('he went to  (the )hospital', registry);
        const expected = {
            segments: ['he went to  the hospital'],
            label: 'he went to  (the )hospital',
            matched: true,
        };
        const actual = buildSuggestionFromCucumberExpression(expression, registry, {});
        assert.deepStrictEqual(actual, expected);
    });
    it('builds a suggestion from parameter expression with explicit options', () => {
        const expression = new CucumberExpression('I have {int} cukes', registry);
        const expected = {
            segments: ['I have ', ['12', '17'], ' cukes'],
            label: 'I have {int} cukes',
            matched: true,
        };
        const actual = buildSuggestionFromCucumberExpression(expression, registry, {
            int: ['12', '17'],
        });
        assert.deepStrictEqual(actual, expected);
    });
    it('builds a suggestion from int parameter expression without explicit options', () => {
        const expression = new CucumberExpression('I have {int} cukes', registry);
        const expected = {
            segments: ['I have ', ['0'], ' cukes'],
            label: 'I have {int} cukes',
            matched: true,
        };
        const actual = buildSuggestionFromCucumberExpression(expression, registry, {});
        assert.deepStrictEqual(actual, expected);
    });
    it('builds a suggestion from only alternation expression', () => {
        const expression = new CucumberExpression('me/you', registry);
        const expected = {
            segments: [['me', 'you']],
            label: 'me/you',
            matched: true,
        };
        const actual = buildSuggestionFromCucumberExpression(expression, registry, {});
        assert.deepStrictEqual(actual, expected);
    });
    it('builds a suggestion from a custom parameter type', () => {
        let AssetType;
        (function (AssetType) {
            AssetType["atlas"] = "atlases";
            AssetType["audio"] = "audio";
            AssetType["image"] = "images";
            AssetType["prefab"] = "prefabs";
            AssetType["spine"] = "spine";
        })(AssetType || (AssetType = {}));
        registry.defineParameterType(new ParameterType('assetType', /prefab|audio|image|spine|atlas/, null, (s) => AssetType[s], true, false));
        const expression = new CucumberExpression('I have some {assetType}(s)', registry);
        const actual = buildSuggestionFromCucumberExpression(expression, registry, {
            assetType: ['prefab', 'audio', 'image', 'spine', 'atlas'],
        });
        const expected = {
            segments: ['I have some ', ['prefab', 'audio', 'image', 'spine', 'atlas'], 's'],
            label: 'I have some {assetType}(s)',
            matched: true,
        };
        assert.deepStrictEqual(actual, expected);
    });
    it('builds a suggestion from complex expression', () => {
        const expression = new CucumberExpression('I have {int} cuke(s) in my bag/belly', registry);
        const expected = {
            segments: ['I have ', ['12'], ' ', ['cuke', 'cukes'], ' in my ', ['bag', 'belly']],
            label: 'I have {int} cuke(s) in my bag/belly',
            matched: true,
        };
        const actual = buildSuggestionFromCucumberExpression(expression, registry, {
            int: ['12'],
        });
        assert.deepStrictEqual(actual, expected);
    });
});
//# sourceMappingURL=buildSuggestionFromCucumberExpression.test.js.map