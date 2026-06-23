"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var vscode_languageserver_types_1 = require("vscode-languageserver-types");
var index_js_1 = require("../../src/index/index.js");
var getGherkinCompletionItems_js_1 = require("../../src/service/getGherkinCompletionItems.js");
describe('getGherkinCompletionItems', function () {
    it('completes matched step', function () {
        var s1 = {
            label: 'I have {int} cukes in my belly',
            segments: ['I have ', ['42', '98'], ' cukes in my belly'],
            matched: true,
        };
        var s2 = {
            label: 'I am a teapot',
            segments: ['I am a teapot'],
            matched: true,
        };
        var index = (0, index_js_1.bruteForceIndex)([s1, s2]);
        var gherkinSource = "Feature: Hello\n  Scenario: World\n    Given cukes\n";
        var completions = (0, getGherkinCompletionItems_js_1.getGherkinCompletionItems)(gherkinSource, { line: 2, character: 15 }, index);
        var expectedCompletions = [
            {
                label: 'I have {int} cukes in my belly',
                insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.Snippet,
                kind: vscode_languageserver_types_1.CompletionItemKind.Text,
                labelDetails: {},
                filterText: 'cukes',
                sortText: '1000',
                textEdit: {
                    newText: 'I have ${1|42,98|} cukes in my belly',
                    range: {
                        start: {
                            line: 2,
                            character: 10,
                        },
                        end: {
                            line: 2,
                            character: 15,
                        },
                    },
                },
            },
        ];
        assert_1.default.deepStrictEqual(completions, expectedCompletions);
    });
    it('completes unmatched step', function () {
        var s1 = {
            label: 'I have {int} cukes in my belly',
            segments: ['I have ', ['42', '98'], ' cukes in my belly'],
            matched: true,
        };
        var s2 = {
            label: 'I am a teapot',
            segments: ['I am a teapot'],
            matched: false,
        };
        var index = (0, index_js_1.bruteForceIndex)([s1, s2]);
        var gherkinSource = "Feature: Hello\n  Scenario: World\n    Given teapot\n";
        var completions = (0, getGherkinCompletionItems_js_1.getGherkinCompletionItems)(gherkinSource, { line: 2, character: 16 }, index);
        var expectedCompletions = [
            {
                label: 'I am a teapot',
                insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.Snippet,
                kind: vscode_languageserver_types_1.CompletionItemKind.Text,
                labelDetails: {
                    detail: ' (undefined step)',
                },
                filterText: 'teapot',
                sortText: '2000',
                textEdit: {
                    newText: 'I am a teapot',
                    range: {
                        start: {
                            line: 2,
                            character: 10,
                        },
                        end: {
                            line: 2,
                            character: 16,
                        },
                    },
                },
            },
        ];
        assert_1.default.deepStrictEqual(completions, expectedCompletions);
    });
});
//# sourceMappingURL=getGherkinCompletionItems.test.js.map