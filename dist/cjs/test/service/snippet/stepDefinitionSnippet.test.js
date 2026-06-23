"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cucumber_expressions_1 = require("@cucumber/cucumber-expressions");
var assert_1 = __importDefault(require("assert"));
var ExpressionBuilder_js_1 = require("../../../src/language/ExpressionBuilder.js");
var languages_js_1 = require("../../../src/language/languages.js");
var types_js_1 = require("../../../src/language/types.js");
var stepDefinitionSnippet_js_1 = require("../../../src/service/snippet/stepDefinitionSnippet.js");
var NodeParserAdapter_js_1 = require("../../../src/tree-sitter-node/NodeParserAdapter.js");
describe('stepDefinitionSnippet', function () {
    var e_1, _a;
    var _loop_1 = function (languageName) {
        // if (languageName !== 'c_sharp') continue
        it("generates a snippet for ".concat(languageName), function () {
            var registry = new cucumber_expressions_1.ParameterTypeRegistry();
            var generator = new cucumber_expressions_1.CucumberExpressionGenerator(function () { return registry.parameterTypes; });
            var generatedExpressions = generator.generateExpressions('11 is not 22');
            var language = (0, languages_js_1.getLanguage)(languageName);
            var snippet = (0, stepDefinitionSnippet_js_1.stepDefinitionSnippet)('When ', generatedExpressions, language.defaultSnippetTemplate, language.snippetParameters);
            var expressionBuilder = new ExpressionBuilder_js_1.ExpressionBuilder(new NodeParserAdapter_js_1.NodeParserAdapter());
            var source = {
                uri: 'file:///tmp/test.x',
                languageName: languageName,
                content: snippet,
            };
            var result = expressionBuilder.build([source], []);
            if (result.expressionLinks.length === 1) {
                assert_1.default.strictEqual(result.expressionLinks[0].expression.source, '{int} is not {int}');
            }
            console.log("### Manually verify that this is valid ".concat(languageName, ":"));
            console.log(snippet);
        });
    };
    try {
        for (var _b = __values(Object.values(types_js_1.LanguageNames)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var languageName = _c.value;
            _loop_1(languageName);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
});
//# sourceMappingURL=stepDefinitionSnippet.test.js.map