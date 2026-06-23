var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CucumberExpression } from '@cucumber/cucumber-expressions';
import assert from 'assert';
import { readFile } from 'fs/promises';
import { glob } from 'glob';
import { basename, resolve } from 'path';
import { ExpressionBuilder } from '../../src/index.js';
import { NodeParserAdapter } from '../../src/tree-sitter-node/NodeParserAdapter.js';
import { WasmParserAdapter } from '../../src/tree-sitter-wasm/WasmParserAdapter.js';
// List languages that support Cucumber Expressions here
const cucumberExpressionsSupport = new Set([
    'c_sharp',
    'java',
    'javascript',
    'python',
    'ruby',
    'rust',
    'tsx',
    'scala',
]);
function defineContract(makeParserAdapter) {
    let expressionBuilder;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        const parserAdpater = makeParserAdapter();
        yield parserAdpater.init();
        expressionBuilder = new ExpressionBuilder(parserAdpater);
    }));
    for (const dir of glob.sync(`test/language/testdata/*`)) {
        const languageName = basename(dir);
        if (languageName === 'c_sharp') {
            it(`builds parameter type from [StepArgumentTransformation] without expression`, () => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const sources = yield loadSources(dir, languageName);
                const result = expressionBuilder.build(sources, []);
                const regexpStrings = (_b = (_a = result.parameterTypeLinks.find((l) => l.parameterType.name === 'WithoutExpression')) === null || _a === void 0 ? void 0 : _a.parameterType) === null || _b === void 0 ? void 0 : _b.regexpStrings;
                assert.deepStrictEqual(regexpStrings, ['.*']);
            }));
            it(`builds parameter type from multiple [StepArgumentTransformation] with the same return type`, () => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const sources = yield loadSources(dir, languageName);
                const result = expressionBuilder.build(sources, []);
                const regexpStrings = (_b = (_a = result.parameterTypeLinks.find((l) => l.parameterType.name === 'DateTime')) === null || _a === void 0 ? void 0 : _a.parameterType) === null || _b === void 0 ? void 0 : _b.regexpStrings;
                assert.deepStrictEqual(regexpStrings, ['today', 'tomorrow', '(.*) days later']);
            }));
        }
        // if (languageName !== 'c_sharp') continue
        it(`builds parameter types and expressions from ${languageName} source`, () => __awaiter(this, void 0, void 0, function* () {
            const sources = yield loadSources(dir, languageName);
            const result = expressionBuilder.build(sources, [
                {
                    regexp: '.*',
                    name: 'int',
                },
            ]);
            // verify that the targetSelectionRange is inside the targetRange
            for (const link of result.expressionLinks.map((l) => l.locationLink)) {
                assert(link.targetSelectionRange.start.line > link.targetRange.start.line ||
                    link.targetSelectionRange.start.character >= link.targetRange.start.character);
                assert(link.targetSelectionRange.end.line < link.targetRange.end.line ||
                    link.targetSelectionRange.end.character <= link.targetRange.end.character);
            }
            const expressions = result.expressionLinks.map(({ expression }) => expression instanceof CucumberExpression
                ? expression.source
                : expression.regexp);
            const errors = result.errors.map((e) => e.message);
            if (cucumberExpressionsSupport.has(languageName)) {
                assert.deepStrictEqual(expressions, [
                    'a {uuid}',
                    'a {date}',
                    'a {planet}',
                    /^a regexp$/,
                    "the bee's knees",
                    ...(languageName === 'javascript' ? ['a compiled format'] : []),
                ]);
                assert.deepStrictEqual(errors, [
                    'There is already a parameter type with name int',
                    `This Cucumber Expression has a problem at column 4:

an {undefined-parameter}
   ^-------------------^
Undefined parameter type 'undefined-parameter'.
Please register a ParameterType for 'undefined-parameter'`,
                ]);
                // Verify that the extracted expressions actually work
                let matched = false;
                for (const expressionLink of result.expressionLinks) {
                    const match = expressionLink.expression.match('a 2020-12-24');
                    if (match) {
                        assert.strictEqual(match[0].getValue(undefined), '2020-12-24');
                        matched = true;
                    }
                }
                assert(matched, 'The generated expressions did not match parameter type {date}');
            }
            else {
                assert.deepStrictEqual(expressions, [/^a regexp$/, /^I test this change$/]);
                assert.deepStrictEqual(errors, ['There is already a parameter type with name int']);
            }
        }));
    }
}
function loadSources(dir, languageName) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.all(glob.sync(`${dir}/**/*`).map((path) => {
            return readFile(path, 'utf-8').then((content) => ({
                languageName,
                content,
                uri: `file://${resolve(path)}`,
            }));
        }));
    });
}
describe('ExpressionBuilder', () => {
    context('with NodeParserAdapter', () => {
        defineContract(() => new NodeParserAdapter());
    });
    context('with WasmParserAdapter', () => {
        defineContract(() => new WasmParserAdapter('dist'));
    });
});
//# sourceMappingURL=ExpressionBuilder.test.js.map