"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cucumber_expressions_1 = require("@cucumber/cucumber-expressions");
var assert_1 = __importDefault(require("assert"));
var vscode_languageserver_types_1 = require("vscode-languageserver-types");
var getGherkinSemanticTokens_js_1 = require("../../src/service/getGherkinSemanticTokens.js");
describe('getGherkinSemanticTokens', function () {
    it('creates tokens for keywords', function () {
        var gherkinSource = "# some comment\n@foo @bar\nFeature: a\n  This is a description\n  and so is this\n\n  Background:\n    Given a repeating step\n\n  Scenario: b\n    Given I have 42 cukes in my belly\n      \"\"\"sometype\n     hello\n        world\n       \"\"\"\n    And a table\n      | a  | bbb |\n      | cc |  dd |\n    And I should be on the map\n\n  Scenario Outline: c\n    Given a <foo> and <bar>\n\n    Examples:\n      | foo | bar |\n      | a   | b   |\n";
        var parameterTypeRegistry = new cucumber_expressions_1.ParameterTypeRegistry();
        var cucumberExpression = new cucumber_expressions_1.CucumberExpression('I have {int} cukes in my {word}', parameterTypeRegistry);
        var regularExpression = new cucumber_expressions_1.RegularExpression(/^I should( not)? be on the map$/, parameterTypeRegistry);
        var semanticTokens = (0, getGherkinSemanticTokens_js_1.getGherkinSemanticTokens)(gherkinSource, [
            cucumberExpression,
            regularExpression,
        ]);
        var actual = tokenize(gherkinSource, semanticTokens.data);
        var expected = [
            ['# some comment', vscode_languageserver_types_1.SemanticTokenTypes.comment],
            ['@foo', vscode_languageserver_types_1.SemanticTokenTypes.type],
            ['@bar', vscode_languageserver_types_1.SemanticTokenTypes.type],
            ['Feature', vscode_languageserver_types_1.SemanticTokenTypes.keyword],
            ['Background', vscode_languageserver_types_1.SemanticTokenTypes.keyword],
            ['Given ', vscode_languageserver_types_1.SemanticTokenTypes.keyword],
            ['Scenario', vscode_languageserver_types_1.SemanticTokenTypes.keyword],
            ['Given ', vscode_languageserver_types_1.SemanticTokenTypes.keyword],
            ['42', vscode_languageserver_types_1.SemanticTokenTypes.parameter],
            ['belly', vscode_languageserver_types_1.SemanticTokenTypes.parameter],
            ['"""', vscode_languageserver_types_1.SemanticTokenTypes.string],
            ['sometype', vscode_languageserver_types_1.SemanticTokenTypes.type],
            ['hello', vscode_languageserver_types_1.SemanticTokenTypes.string],
            ['world', vscode_languageserver_types_1.SemanticTokenTypes.string],
            ['"""', vscode_languageserver_types_1.SemanticTokenTypes.string],
            ['And ', vscode_languageserver_types_1.SemanticTokenTypes.keyword],
            ['a', vscode_languageserver_types_1.SemanticTokenTypes.string],
            ['bbb', vscode_languageserver_types_1.SemanticTokenTypes.string],
            ['cc', vscode_languageserver_types_1.SemanticTokenTypes.string],
            ['dd', vscode_languageserver_types_1.SemanticTokenTypes.string],
            ['And ', vscode_languageserver_types_1.SemanticTokenTypes.keyword],
            ['Scenario Outline', vscode_languageserver_types_1.SemanticTokenTypes.keyword],
            ['Given ', vscode_languageserver_types_1.SemanticTokenTypes.keyword],
            ['<foo>', vscode_languageserver_types_1.SemanticTokenTypes.variable],
            ['<bar>', vscode_languageserver_types_1.SemanticTokenTypes.variable],
            ['Examples', vscode_languageserver_types_1.SemanticTokenTypes.keyword],
            ['foo', vscode_languageserver_types_1.SemanticTokenTypes.property],
            ['bar', vscode_languageserver_types_1.SemanticTokenTypes.property],
            ['a', vscode_languageserver_types_1.SemanticTokenTypes.string],
            ['b', vscode_languageserver_types_1.SemanticTokenTypes.string],
        ];
        assert_1.default.deepStrictEqual(actual, expected);
    });
    it('ignores whitespace for scenario outlines', function () {
        // Note that 'When' step uses two spaces, to align the text with 'Given'
        var gherkinSource = "\nFeature: making drinks\n  Scenario Outline:\n    Given a <ingredient>\n    When  I make <drink>\n    Examples:\n      | ingredient | drink       |\n      | apple      | apple juice |\n";
        var semanticTokens = (0, getGherkinSemanticTokens_js_1.getGherkinSemanticTokens)(gherkinSource, []);
        var actual = tokenize(gherkinSource, semanticTokens.data);
        var expected = [
            ['Feature', vscode_languageserver_types_1.SemanticTokenTypes.keyword],
            ['Scenario Outline', vscode_languageserver_types_1.SemanticTokenTypes.keyword],
            ['Given ', vscode_languageserver_types_1.SemanticTokenTypes.keyword],
            ['<ingredient>', vscode_languageserver_types_1.SemanticTokenTypes.variable],
            ['When ', vscode_languageserver_types_1.SemanticTokenTypes.keyword],
            ['<drink>', vscode_languageserver_types_1.SemanticTokenTypes.variable],
            ['Examples', vscode_languageserver_types_1.SemanticTokenTypes.keyword],
            ['ingredient', vscode_languageserver_types_1.SemanticTokenTypes.property],
            ['drink', vscode_languageserver_types_1.SemanticTokenTypes.property],
            ['apple', vscode_languageserver_types_1.SemanticTokenTypes.string],
            ['apple juice', vscode_languageserver_types_1.SemanticTokenTypes.string],
        ];
        assert_1.default.deepStrictEqual(actual, expected);
    });
    it('applies parameter token for scenario outline', function () {
        var gherkinSource = "\nFeature: a\n  Scenario: a\n    Given I have \"string\" parameter\n\n  Scenario Outline: a\n    Given I have \"string\" parameter\n    And I have \"<variable>\" parameter\n\n    Examples:\n      | variable |\n      | value    |\n";
        var parameterTypeRegistry = new cucumber_expressions_1.ParameterTypeRegistry();
        var cucumberExpression = new cucumber_expressions_1.CucumberExpression('I have {string} parameter', parameterTypeRegistry);
        var semanticTokens = (0, getGherkinSemanticTokens_js_1.getGherkinSemanticTokens)(gherkinSource, [cucumberExpression]);
        var actual = tokenize(gherkinSource, semanticTokens.data);
        var expected = [
            ['Feature', vscode_languageserver_types_1.SemanticTokenTypes.keyword],
            ['Scenario', vscode_languageserver_types_1.SemanticTokenTypes.keyword],
            ['Given ', vscode_languageserver_types_1.SemanticTokenTypes.keyword],
            ['"string"', vscode_languageserver_types_1.SemanticTokenTypes.parameter],
            ['Scenario Outline', vscode_languageserver_types_1.SemanticTokenTypes.keyword],
            ['Given ', vscode_languageserver_types_1.SemanticTokenTypes.keyword],
            ['"string"', vscode_languageserver_types_1.SemanticTokenTypes.parameter],
            ['And ', vscode_languageserver_types_1.SemanticTokenTypes.keyword],
            ['<variable>', vscode_languageserver_types_1.SemanticTokenTypes.variable],
            ['"<variable>"', vscode_languageserver_types_1.SemanticTokenTypes.parameter],
            ['Examples', vscode_languageserver_types_1.SemanticTokenTypes.keyword],
            ['variable', vscode_languageserver_types_1.SemanticTokenTypes.property],
            ['value', vscode_languageserver_types_1.SemanticTokenTypes.string],
        ];
        assert_1.default.deepStrictEqual(actual, expected);
    });
});
// See https://microsoft.github.io/language-server-protocol/specifications/specification-3-17/#textDocument_semanticTokens
// for details about how tokens are encoded
function tokenize(source, tokenData) {
    var result = [];
    var lines = source.split('\n');
    var lineIndex = 0;
    var start = 0;
    for (var i = 0; i < tokenData.length; i += 5) {
        var deltaLine = tokenData[i];
        if (deltaLine > 0) {
            start = 0;
        }
        lineIndex += deltaLine;
        start += tokenData[i + 1];
        var length_1 = tokenData[i + 2];
        var token = lines[lineIndex].substring(start, start + length_1);
        var tokenTypeIndex = tokenData[i + 3];
        var tokenType = getGherkinSemanticTokens_js_1.semanticTokenTypes[tokenTypeIndex];
        result.push([token, tokenType]);
    }
    return result;
}
//# sourceMappingURL=getGherkinSemanticTokens.test.js.map