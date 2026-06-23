"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cucumber_expressions_1 = require("@cucumber/cucumber-expressions");
var assert_1 = __importDefault(require("assert"));
var vscode_languageserver_types_1 = require("vscode-languageserver-types");
var getGenerateSnippetCodeAction_js_1 = require("../../src/service/getGenerateSnippetCodeAction.js");
var getGherkinDiagnostics_js_1 = require("../../src/service/getGherkinDiagnostics.js");
describe('getGenerateSnippetCodeAction', function () {
    it('generates code in a new file', function () {
        var diagnostic = (0, getGherkinDiagnostics_js_1.makeUndefinedStepDiagnostic)(10, 4, 'And ', 'I have 43 cukes', 'Given ');
        var targetRange = vscode_languageserver_types_1.Range.create(10, 0, 10, 0);
        var link = {
            targetUri: 'file://home/features/step_definitions/steps.ts',
            targetRange: targetRange,
            targetSelectionRange: targetRange,
        };
        var action = (0, getGenerateSnippetCodeAction_js_1.getGenerateSnippetCodeAction)([diagnostic], link, 'step_definitions/steps.ts', true, undefined, 'tsx', new cucumber_expressions_1.ParameterTypeRegistry());
        var expectedAction = {
            title: 'Define in step_definitions/steps.ts',
            diagnostics: [
                {
                    severity: 2,
                    range: {
                        start: {
                            line: 10,
                            character: 4,
                        },
                        end: {
                            line: 10,
                            character: 19,
                        },
                    },
                    message: 'Undefined step: I have 43 cukes',
                    source: 'Cucumber',
                    code: 'cucumber.undefined-step',
                    codeDescription: {
                        href: 'https://cucumber.io/docs/cucumber/step-definitions/',
                    },
                    data: {
                        snippetKeyword: 'Given ',
                        stepText: 'I have 43 cukes',
                    },
                },
            ],
            kind: 'quickfix',
            edit: {
                documentChanges: [
                    {
                        kind: 'create',
                        uri: 'file://home/features/step_definitions/steps.ts',
                        options: {
                            ignoreIfExists: true,
                            overwrite: true,
                        },
                    },
                    {
                        textDocument: {
                            uri: 'file://home/features/step_definitions/steps.ts',
                            version: 0,
                        },
                        edits: [
                            {
                                range: {
                                    start: {
                                        line: 10,
                                        character: 0,
                                    },
                                    end: {
                                        line: 10,
                                        character: 0,
                                    },
                                },
                                newText: "\nGiven('I have {int} cukes', (int: number) => {\n  // Write code here that turns the phrase above into concrete actions\n})\n",
                            },
                        ],
                    },
                ],
            },
            isPreferred: true,
        };
        assert_1.default.deepStrictEqual(action, expectedAction);
    });
    it('generates code in an existing file', function () {
        var diagnostic = (0, getGherkinDiagnostics_js_1.makeUndefinedStepDiagnostic)(10, 4, 'But ', 'I have 43 cukes', 'Given ');
        var targetRange = vscode_languageserver_types_1.Range.create(10, 0, 10, 0);
        var link = {
            targetUri: 'file://home/features/step_definitions/steps.ts',
            targetRange: targetRange,
            targetSelectionRange: targetRange,
        };
        var action = (0, getGenerateSnippetCodeAction_js_1.getGenerateSnippetCodeAction)([diagnostic], link, 'step_definitions/steps.ts', false, undefined, 'tsx', new cucumber_expressions_1.ParameterTypeRegistry());
        var expectedAction = {
            title: 'Define in step_definitions/steps.ts',
            diagnostics: [
                {
                    severity: 2,
                    range: {
                        start: {
                            line: 10,
                            character: 4,
                        },
                        end: {
                            line: 10,
                            character: 19,
                        },
                    },
                    message: 'Undefined step: I have 43 cukes',
                    source: 'Cucumber',
                    code: 'cucumber.undefined-step',
                    codeDescription: {
                        href: 'https://cucumber.io/docs/cucumber/step-definitions/',
                    },
                    data: {
                        snippetKeyword: 'Given ',
                        stepText: 'I have 43 cukes',
                    },
                },
            ],
            kind: 'quickfix',
            edit: {
                documentChanges: [
                    {
                        textDocument: {
                            uri: 'file://home/features/step_definitions/steps.ts',
                            version: 0,
                        },
                        edits: [
                            {
                                range: {
                                    start: {
                                        line: 10,
                                        character: 0,
                                    },
                                    end: {
                                        line: 10,
                                        character: 0,
                                    },
                                },
                                newText: "\nGiven('I have {int} cukes', (int: number) => {\n  // Write code here that turns the phrase above into concrete actions\n})\n",
                            },
                        ],
                    },
                ],
            },
            isPreferred: true,
        };
        assert_1.default.deepStrictEqual(action, expectedAction);
    });
});
//# sourceMappingURL=getGenerateSnippetCodeAction.test.js.map