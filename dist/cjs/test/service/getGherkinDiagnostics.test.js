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
var vscode_languageserver_types_1 = require("vscode-languageserver-types");
var getGherkinDiagnostics_js_1 = require("../../src/service/getGherkinDiagnostics.js");
describe('getGherkinDiagnostics', function () {
    it('returns no diagnostics for valid document', function () {
        var diagnostics = (0, getGherkinDiagnostics_js_1.getGherkinDiagnostics)("Feature: Hello", []);
        assert_1.default.deepStrictEqual(diagnostics, []);
    });
    it('returns error diagnostic for unexpected end of file', function () {
        var diagnostics = (0, getGherkinDiagnostics_js_1.getGherkinDiagnostics)("Feature: Hello\n@tag\n", []);
        assert_1.default.deepStrictEqual(diagnostics, [
            {
                message: '(3:0): unexpected end of file, expected: #TagLine, #RuleLine, #Comment, #Empty',
                range: {
                    start: {
                        line: 2,
                        character: 0,
                    },
                    end: {
                        line: 2,
                        character: 0,
                    },
                },
                severity: vscode_languageserver_types_1.DiagnosticSeverity.Error,
                source: 'Cucumber',
            },
        ]);
    });
    it('returns error diagnostic for missing table separator', function () {
        var expression = new cucumber_expressions_1.CucumberExpression('a table:', new cucumber_expressions_1.ParameterTypeRegistry());
        var diagnostics = (0, getGherkinDiagnostics_js_1.getGherkinDiagnostics)("Feature: Hello\n  Scenario: Hi\n    Given a table:\n      | a |\n      | b\n", [expression]);
        var expectedDiagnostics = [
            {
                message: '(5:7): inconsistent cell count within the table',
                range: {
                    start: {
                        line: 4,
                        character: 6,
                    },
                    end: {
                        line: 4,
                        character: 9,
                    },
                },
                severity: vscode_languageserver_types_1.DiagnosticSeverity.Error,
                source: 'Cucumber',
            },
        ];
        assert_1.default.deepStrictEqual(diagnostics, expectedDiagnostics);
    });
    it('returns warning diagnostic for undefined Given->And step', function () {
        var diagnostics = (0, getGherkinDiagnostics_js_1.getGherkinDiagnostics)("Feature: Hello\n  Scenario: Hi\n    Given a defined step\n    And an undefined step\n", [new cucumber_expressions_1.CucumberExpression('a defined step', new cucumber_expressions_1.ParameterTypeRegistry())]);
        var expectedDiagnostics = [
            {
                code: 'cucumber.undefined-step',
                codeDescription: {
                    href: 'https://cucumber.io/docs/cucumber/step-definitions/',
                },
                data: {
                    snippetKeyword: 'Given ',
                    stepText: 'an undefined step',
                },
                message: 'Undefined step: an undefined step',
                range: {
                    start: {
                        line: 3,
                        character: 8,
                    },
                    end: {
                        line: 3,
                        character: 25,
                    },
                },
                severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
                source: 'Cucumber',
            },
        ];
        assert_1.default.deepStrictEqual(diagnostics, expectedDiagnostics);
    });
    it('returns warning diagnostic for undefined When->And->But step', function () {
        var diagnostics = (0, getGherkinDiagnostics_js_1.getGherkinDiagnostics)("Feature: Hello\n  Scenario: Hi\n    Given a defined step\n    When a defined step\n    And a defined step\n    But an undefined step\n", [new cucumber_expressions_1.CucumberExpression('a defined step', new cucumber_expressions_1.ParameterTypeRegistry())]);
        var expectedDiagnostics = [
            {
                code: 'cucumber.undefined-step',
                codeDescription: {
                    href: 'https://cucumber.io/docs/cucumber/step-definitions/',
                },
                data: {
                    snippetKeyword: 'When ',
                    stepText: 'an undefined step',
                },
                message: 'Undefined step: an undefined step',
                range: {
                    start: {
                        line: 5,
                        character: 8,
                    },
                    end: {
                        line: 5,
                        character: 25,
                    },
                },
                severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
                source: 'Cucumber',
            },
        ];
        assert_1.default.deepStrictEqual(diagnostics, expectedDiagnostics);
    });
    it('returns diagnostic for undefined step with unreferenced parameter in Scenario Outline', function () {
        var e_1, _a;
        var noExamples = "Feature:\n      Scenario Outline:\n        Given a <parameter>";
        var noTableHeader = "Feature:\n      Scenario Outline:\n        Given a <parameter>\n        Examples:";
        var noTableBody = "Feature:\n      Scenario Outline:\n        Given a <parameter>\n        Examples:\n          | parameter |";
        try {
            for (var _b = __values([noExamples, noTableHeader, noTableBody]), _c = _b.next(); !_c.done; _c = _b.next()) {
                var document_1 = _c.value;
                var diagnostics = (0, getGherkinDiagnostics_js_1.getGherkinDiagnostics)(document_1, []);
                var expectedDiagnostics = [
                    {
                        code: 'cucumber.undefined-step',
                        codeDescription: {
                            href: 'https://cucumber.io/docs/cucumber/step-definitions/',
                        },
                        data: {
                            snippetKeyword: 'Given ',
                            stepText: 'a <parameter>',
                        },
                        message: 'Undefined step: a <parameter>',
                        range: {
                            end: {
                                character: 27,
                                line: 2,
                            },
                            start: {
                                character: 14,
                                line: 2,
                            },
                        },
                        severity: 2,
                        source: 'Cucumber',
                    },
                ];
                assert_1.default.deepStrictEqual(diagnostics, expectedDiagnostics);
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
    it('returns no diagnostics with valid parameter match in Scenario Outline', function () {
        var diagnostics = (0, getGherkinDiagnostics_js_1.getGherkinDiagnostics)("Feature:\n        Scenario Outline:\n          Given a <state> <entity>\n  \n          Examples:\n            | parameter | state   | entity | other  |\n            | unused    | defined | step   | unused |\n      ", [new cucumber_expressions_1.CucumberExpression('a defined step', new cucumber_expressions_1.ParameterTypeRegistry())]);
        var expectedDiagnostics = [];
        assert_1.default.deepStrictEqual(diagnostics, expectedDiagnostics);
    });
    it('returns diagnostic for incomplete docstring', function () {
        var diagnostics = (0, getGherkinDiagnostics_js_1.getGherkinDiagnostics)("Feature: Hello\n  Scenario: Hi\n    Given a defined step\n      \"\"\"", [new cucumber_expressions_1.CucumberExpression('a defined step', new cucumber_expressions_1.ParameterTypeRegistry())]);
        var expectedDiagnostics = [
            {
                message: '(5:0): unexpected end of file, expected: #DocStringSeparator, #Other',
                range: {
                    start: {
                        line: 3,
                        character: 9,
                    },
                    end: {
                        line: 3,
                        character: 9,
                    },
                },
                severity: vscode_languageserver_types_1.DiagnosticSeverity.Error,
                source: 'Cucumber',
            },
        ];
        assert_1.default.deepStrictEqual(diagnostics, expectedDiagnostics);
    });
});
//# sourceMappingURL=getGherkinDiagnostics.test.js.map