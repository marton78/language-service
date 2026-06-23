"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cucumber_expressions_1 = require("@cucumber/cucumber-expressions");
var assert_1 = __importDefault(require("assert"));
var vscode_languageserver_types_1 = require("vscode-languageserver-types");
var getStepDefinitionLocationLinks_js_1 = require("../../src/service/getStepDefinitionLocationLinks.js");
describe('getStepDefinitionLocationLinks', function () {
    it('finds a matched step definition', function () {
        var expression = new cucumber_expressions_1.CucumberExpression('some cukes/apples', new cucumber_expressions_1.ParameterTypeRegistry());
        var gherkinSource = "Feature: Hello\n      Scenario: World\n        Given some cukes\n    ";
        var targetUri = 'file://path/to/some/file.ts';
        // The range of the Cucumber/Regular Expression
        var targetRange = vscode_languageserver_types_1.Range.create(10, 10, 10, 27);
        var expressionLinks = [
            {
                expression: expression,
                locationLink: {
                    targetUri: targetUri,
                    targetRange: targetRange,
                    targetSelectionRange: targetRange,
                },
            },
        ];
        // The cursor is between the c and the u
        var links = (0, getStepDefinitionLocationLinks_js_1.getStepDefinitionLocationLinks)(gherkinSource, { line: 2, character: 20 }, expressionLinks);
        // The range of the Gherkin step text
        var originSelectionRange = {
            start: {
                line: 2,
                character: 14,
            },
            end: {
                line: 2,
                character: 24,
            },
        };
        var expectedLinks = [
            {
                originSelectionRange: originSelectionRange,
                targetRange: targetRange,
                targetSelectionRange: targetRange,
                targetUri: targetUri,
            },
        ];
        assert_1.default.deepStrictEqual(links, expectedLinks);
    });
});
//# sourceMappingURL=getStepDefinitionLocationLinks.test.js.map