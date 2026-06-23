"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.semanticTokenTypes = void 0;
exports.getGherkinSemanticTokens = getGherkinSemanticTokens;
var gherkin_utils_1 = require("@cucumber/gherkin-utils");
var vscode_languageserver_types_1 = require("vscode-languageserver-types");
var parseGherkinDocument_js_1 = require("../gherkin/parseGherkinDocument.js");
// The default vs theme can only highlight certain tokens. See the list of those tokens in
// https://microsoft.github.io/monaco-editor/monarch.html
exports.semanticTokenTypes = [
    vscode_languageserver_types_1.SemanticTokenTypes.keyword, // Feature, Scenario, Given etc
    vscode_languageserver_types_1.SemanticTokenTypes.parameter, // step parameters
    vscode_languageserver_types_1.SemanticTokenTypes.string, // DocString content and ``` delimiter, table cells (except example table header rows)
    vscode_languageserver_types_1.SemanticTokenTypes.type, // @tags and DocString ```type
    vscode_languageserver_types_1.SemanticTokenTypes.variable, // step <placeholder>
    vscode_languageserver_types_1.SemanticTokenTypes.property, // examples table header row
    vscode_languageserver_types_1.SemanticTokenTypes.comment, // # comments
];
var indexByType = Object.fromEntries(exports.semanticTokenTypes.map(function (type, index) { return [type, index]; }));
// https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#textDocument_semanticTokens
function getGherkinSemanticTokens(gherkinSource, expressions) {
    var gherkinDocument = (0, parseGherkinDocument_js_1.parseGherkinDocument)(gherkinSource).gherkinDocument;
    if (!gherkinDocument) {
        return {
            data: [],
        };
    }
    var lines = gherkinSource.split(/\r?\n/);
    function makeLocationToken(location, token, type, data) {
        var lineNumber = location.line - 1;
        if (location.column === undefined)
            throw new Error("Incomplete location: ".concat(JSON.stringify(location)));
        var character = location.column - 1;
        return makeToken(lineNumber, character, token, type, data);
    }
    function makeToken(lineNumber, character, token, type, data) {
        var _a;
        var copy = __spreadArray([], __read(data), false);
        copy[lineNumber] = ((_a = copy[lineNumber]) !== null && _a !== void 0 ? _a : []).concat({
            typeIndex: indexByType[type],
            length: token.length,
            character: character,
        });
        return copy;
    }
    var inScenarioOutline = false;
    var inExamples = false;
    var tokenLines = (0, gherkin_utils_1.walkGherkinDocument)(gherkinDocument, [], {
        tag: function (tag, arr) {
            return makeLocationToken(tag.location, tag.name, vscode_languageserver_types_1.SemanticTokenTypes.type, arr);
        },
        feature: function (feature, arr) {
            return makeLocationToken(feature.location, feature.keyword, vscode_languageserver_types_1.SemanticTokenTypes.keyword, arr);
        },
        rule: function (rule, arr) {
            return makeLocationToken(rule.location, rule.keyword, vscode_languageserver_types_1.SemanticTokenTypes.keyword, arr);
        },
        background: function (background, arr) {
            return makeLocationToken(background.location, background.keyword, vscode_languageserver_types_1.SemanticTokenTypes.keyword, arr);
        },
        scenario: function (scenario, arr) {
            inScenarioOutline = (scenario.examples || []).length > 0;
            return makeLocationToken(scenario.location, scenario.keyword, vscode_languageserver_types_1.SemanticTokenTypes.keyword, arr);
        },
        examples: function (examples, arr) {
            inExamples = true;
            return makeLocationToken(examples.location, examples.keyword, vscode_languageserver_types_1.SemanticTokenTypes.keyword, arr);
        },
        step: function (step, arr) {
            var e_1, _a, e_2, _b;
            if (step.location.column === undefined)
                throw new Error("Incomplete location: ".concat(JSON.stringify(step.location)));
            inExamples = false;
            arr = makeLocationToken(step.location, step.keyword, vscode_languageserver_types_1.SemanticTokenTypes.keyword, arr);
            if (inScenarioOutline) {
                var regexp = /(<[^>]+>)/g;
                var line = step.location.line - 1;
                var startOfText = lines[line].indexOf(step.text);
                var match = void 0;
                while ((match = regexp.exec(step.text)) !== null) {
                    var character = startOfText + match.index;
                    arr = makeToken(line, character, match[0], vscode_languageserver_types_1.SemanticTokenTypes.variable, arr);
                }
            }
            try {
                for (var expressions_1 = __values(expressions), expressions_1_1 = expressions_1.next(); !expressions_1_1.done; expressions_1_1 = expressions_1.next()) {
                    var expression = expressions_1_1.value;
                    var args = expression.match(step.text);
                    if (args) {
                        try {
                            for (var args_1 = (e_2 = void 0, __values(args)), args_1_1 = args_1.next(); !args_1_1.done; args_1_1 = args_1.next()) {
                                var arg = args_1_1.value;
                                if (arg.group.start) {
                                    var character = step.location.column - 1 + step.keyword.length + arg.group.start;
                                    arr = makeToken(step.location.line - 1, character, arg.group.value, vscode_languageserver_types_1.SemanticTokenTypes.parameter, arr);
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (args_1_1 && !args_1_1.done && (_b = args_1.return)) _b.call(args_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (expressions_1_1 && !expressions_1_1.done && (_a = expressions_1.return)) _a.call(expressions_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return arr;
        },
        docString: function (docString, arr) {
            arr = makeLocationToken(docString.location, docString.delimiter, vscode_languageserver_types_1.SemanticTokenTypes.string, arr);
            if (docString.mediaType) {
                if (docString.location.column === undefined)
                    throw new Error("Incomplete location: ".concat(JSON.stringify(docString.location)));
                var character = docString.location.column - 1 + docString.delimiter.length;
                arr = makeToken(docString.location.line - 1, character, docString.mediaType, vscode_languageserver_types_1.SemanticTokenTypes.type, arr);
            }
            var maxLineNumber = docString.location.line + docString.content.split(/\r?\n/).length;
            for (var lineNumber = docString.location.line; lineNumber <= maxLineNumber; lineNumber++) {
                var spaceContent = /^(\s*)(.*)$/.exec(lines[lineNumber]);
                if (spaceContent === null)
                    throw new Error("No match for ".concat(lines[lineNumber]));
                var startChar = spaceContent[1].length;
                var token = spaceContent[2];
                arr = makeToken(lineNumber, startChar, token, vscode_languageserver_types_1.SemanticTokenTypes.string, arr);
            }
            return arr;
        },
        tableRow: function (tableRow, arr) {
            var e_3, _a;
            var type = inExamples ? vscode_languageserver_types_1.SemanticTokenTypes.property : vscode_languageserver_types_1.SemanticTokenTypes.string;
            try {
                for (var _b = __values(tableRow.cells), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var cell = _c.value;
                    arr = makeLocationToken(cell.location, cell.value, type, arr);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            inExamples = false;
            return arr;
        },
        comment: function (comment, arr) {
            return makeLocationToken(comment.location, comment.text, vscode_languageserver_types_1.SemanticTokenTypes.comment, arr);
        },
    });
    var data = makeData(tokenLines);
    return {
        data: data,
    };
}
function makeData(lines) {
    var e_4, _a;
    var lastLineNumber = 0;
    var lastCharacter = 0;
    var data = [];
    for (var lineNumber = 0; lineNumber < lines.length; lineNumber++) {
        var line = lines[lineNumber];
        if (!line)
            continue;
        try {
            for (var line_1 = (e_4 = void 0, __values(line)), line_1_1 = line_1.next(); !line_1_1.done; line_1_1 = line_1.next()) {
                var token = line_1_1.value;
                var charDelta = lineNumber === lastLineNumber ? token.character - lastCharacter : token.character;
                lastCharacter = token.character;
                var lineOffset = lineNumber - lastLineNumber;
                lastLineNumber = lineNumber;
                data.push(lineOffset);
                data.push(charDelta);
                data.push(token.length);
                data.push(token.typeIndex);
                data.push(0);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (line_1_1 && !line_1_1.done && (_a = line_1.return)) _a.call(line_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
    }
    return data;
}
//# sourceMappingURL=getGherkinSemanticTokens.js.map