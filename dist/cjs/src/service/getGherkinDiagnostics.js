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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGherkinDiagnostics = getGherkinDiagnostics;
exports.makeUndefinedStepDiagnostic = makeUndefinedStepDiagnostic;
var gherkin_1 = require("@cucumber/gherkin");
var gherkin_utils_1 = require("@cucumber/gherkin-utils");
var vscode_languageserver_types_1 = require("vscode-languageserver-types");
var parseGherkinDocument_js_1 = require("../gherkin/parseGherkinDocument.js");
var constants_js_1 = require("./constants.js");
// https://microsoft.github.io/language-server-protocol/specifications/specification-3-17/#diagnostic
function getGherkinDiagnostics(gherkinSource, expressions) {
    var e_1, _a;
    var lines = gherkinSource.split(/\r?\n/);
    var _b = (0, parseGherkinDocument_js_1.parseGherkinDocument)(gherkinSource), gherkinDocument = _b.gherkinDocument, error = _b.error;
    var diagnostics = [];
    var errors = error instanceof gherkin_1.Errors.CompositeParserException ? error.errors : error ? [error] : [];
    try {
        for (var errors_1 = __values(errors), errors_1_1 = errors_1.next(); !errors_1_1.done; errors_1_1 = errors_1.next()) {
            var error_1 = errors_1_1.value;
            if (error_1 instanceof gherkin_1.Errors.GherkinException) {
                var line = error_1.location.line - 1;
                var character = error_1.location.column !== undefined ? error_1.location.column - 1 : 0;
                if (line >= lines.length) {
                    // EOF issue, e.g. something is not properly terminated
                    line = lines.length - 1;
                    character = lines[line].length;
                }
                var diagnostic = {
                    severity: vscode_languageserver_types_1.DiagnosticSeverity.Error,
                    range: {
                        start: {
                            line: line,
                            character: character,
                        },
                        end: {
                            line: line,
                            character: lines[line].length,
                        },
                    },
                    message: error_1.message,
                    source: 'Cucumber',
                };
                diagnostics.push(diagnostic);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (errors_1_1 && !errors_1_1.done && (_a = errors_1.return)) _a.call(errors_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (!(gherkinDocument === null || gherkinDocument === void 0 ? void 0 : gherkinDocument.feature)) {
        return diagnostics;
    }
    var inScenarioOutline = false;
    var dialect = gherkin_1.dialects[gherkinDocument.feature.language];
    var noStars = function (keyword) { return keyword !== '* '; };
    var codeKeywords = __spreadArray(__spreadArray(__spreadArray([], __read(dialect.given), false), __read(dialect.when), false), __read(dialect.then), false).filter(noStars);
    var snippetKeyword = dialect.given.filter(noStars)[0];
    var examples;
    return (0, gherkin_utils_1.walkGherkinDocument)(gherkinDocument, diagnostics, {
        scenario: function (scenario, diagnostics) {
            inScenarioOutline = (scenario.examples || []).length > 0;
            examples = inScenarioOutline ? scenario.examples : [];
            return diagnostics;
        },
        step: function (step, diagnostics) {
            if (codeKeywords.includes(step.keyword)) {
                snippetKeyword = step.keyword;
            }
            return inScenarioOutline
                ? getOutlineStepDiagnostics(step, diagnostics, expressions, snippetKeyword, examples)
                : getStepDiagnostics(step, diagnostics, expressions, snippetKeyword);
        },
    });
}
function getOutlineStepDiagnostics(step, diagnostics, expressions, snippetKeyword, examples) {
    var e_2, _a, e_3, _b;
    // Interpolate steps containing parameters
    if (constants_js_1.CONTAINS_PARAMETERS.test(step.text)) {
        try {
            for (var examples_1 = __values(examples), examples_1_1 = examples_1.next(); !examples_1_1.done; examples_1_1 = examples_1.next()) {
                var example = examples_1_1.value;
                try {
                    for (var _c = (e_3 = void 0, __values(example.tableBody)), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var row = _d.value;
                        var stepText = interpolate(step.text, 
                        // @ts-ignore Can not be undefined with non-empty table body
                        example.tableHeader.cells, row.cells);
                        if (!isUndefined(stepText, expressions)) {
                            return diagnostics;
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (examples_1_1 && !examples_1_1.done && (_a = examples_1.return)) _a.call(examples_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    return getStepDiagnostics(step, diagnostics, expressions, snippetKeyword);
}
function getStepDiagnostics(step, diagnostics, expressions, snippetKeyword) {
    if (isUndefined(step.text, expressions) && step.location.column !== undefined) {
        var line = step.location.line - 1;
        var character = step.location.column - 1 + step.keyword.length;
        var diagnostic = makeUndefinedStepDiagnostic(line, character, step.keyword, step.text, snippetKeyword);
        return diagnostics.concat(diagnostic);
    }
    return diagnostics;
}
function makeUndefinedStepDiagnostic(line, character, stepKeyword, stepText, snippetKeyword) {
    return {
        severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
        range: {
            start: {
                line: line,
                character: character,
            },
            end: {
                line: line,
                character: character + stepText.length,
            },
        },
        message: "Undefined step: ".concat(stepText),
        source: 'Cucumber',
        code: constants_js_1.diagnosticCodeUndefinedStep,
        codeDescription: {
            href: 'https://cucumber.io/docs/cucumber/step-definitions/',
        },
        data: {
            snippetKeyword: snippetKeyword,
            stepText: stepText,
        },
    };
}
function isUndefined(stepText, expressions) {
    var e_4, _a;
    try {
        for (var expressions_1 = __values(expressions), expressions_1_1 = expressions_1.next(); !expressions_1_1.done; expressions_1_1 = expressions_1.next()) {
            var expression = expressions_1_1.value;
            if (expression.match(stepText))
                return false;
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (expressions_1_1 && !expressions_1_1.done && (_a = expressions_1.return)) _a.call(expressions_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return true;
}
function interpolate(name, variableCells, valueCells) {
    variableCells.forEach(function (variableCell, n) {
        var valueCell = valueCells[n];
        var valuePattern = '<' + variableCell.value + '>';
        var escapedPattern = valuePattern.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        var regexp = new RegExp(escapedPattern, 'g');
        // JS Specific - dollar sign needs to be escaped with another dollar sign
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_string_as_a_parameter
        var replacement = valueCell.value.replace(new RegExp('\\$', 'g'), '$$$$');
        name = name.replace(regexp, replacement);
    });
    return name;
}
//# sourceMappingURL=getGherkinDiagnostics.js.map