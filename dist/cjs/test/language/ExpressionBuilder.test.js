"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cucumber_expressions_1 = require("@cucumber/cucumber-expressions");
var assert_1 = __importDefault(require("assert"));
var promises_1 = require("fs/promises");
var glob_1 = require("glob");
var path_1 = require("path");
var index_js_1 = require("../../src/index.js");
var NodeParserAdapter_js_1 = require("../../src/tree-sitter-node/NodeParserAdapter.js");
var WasmParserAdapter_js_1 = require("../../src/tree-sitter-wasm/WasmParserAdapter.js");
// List languages that support Cucumber Expressions here
var cucumberExpressionsSupport = new Set([
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
    var e_1, _a;
    var _this = this;
    var expressionBuilder;
    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
        var parserAdpater;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parserAdpater = makeParserAdapter();
                    return [4 /*yield*/, parserAdpater.init()];
                case 1:
                    _a.sent();
                    expressionBuilder = new index_js_1.ExpressionBuilder(parserAdpater);
                    return [2 /*return*/];
            }
        });
    }); });
    var _loop_1 = function (dir) {
        var languageName = (0, path_1.basename)(dir);
        if (languageName === 'c_sharp') {
            it("builds parameter type from [StepArgumentTransformation] without expression", function () { return __awaiter(_this, void 0, void 0, function () {
                var sources, result, regexpStrings;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, loadSources(dir, languageName)];
                        case 1:
                            sources = _c.sent();
                            result = expressionBuilder.build(sources, []);
                            regexpStrings = (_b = (_a = result.parameterTypeLinks.find(function (l) { return l.parameterType.name === 'WithoutExpression'; })) === null || _a === void 0 ? void 0 : _a.parameterType) === null || _b === void 0 ? void 0 : _b.regexpStrings;
                            assert_1.default.deepStrictEqual(regexpStrings, ['.*']);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("builds parameter type from multiple [StepArgumentTransformation] with the same return type", function () { return __awaiter(_this, void 0, void 0, function () {
                var sources, result, regexpStrings;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, loadSources(dir, languageName)];
                        case 1:
                            sources = _c.sent();
                            result = expressionBuilder.build(sources, []);
                            regexpStrings = (_b = (_a = result.parameterTypeLinks.find(function (l) { return l.parameterType.name === 'DateTime'; })) === null || _a === void 0 ? void 0 : _a.parameterType) === null || _b === void 0 ? void 0 : _b.regexpStrings;
                            assert_1.default.deepStrictEqual(regexpStrings, ['today', 'tomorrow', '(.*) days later']);
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        // if (languageName !== 'c_sharp') continue
        it("builds parameter types and expressions from ".concat(languageName, " source"), function () { return __awaiter(_this, void 0, void 0, function () {
            var sources, result, _a, _b, link, expressions, errors, matched, _c, _d, expressionLink, match;
            var e_2, _e, e_3, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, loadSources(dir, languageName)];
                    case 1:
                        sources = _g.sent();
                        result = expressionBuilder.build(sources, [
                            {
                                regexp: '.*',
                                name: 'int',
                            },
                        ]);
                        try {
                            // verify that the targetSelectionRange is inside the targetRange
                            for (_a = __values(result.expressionLinks.map(function (l) { return l.locationLink; })), _b = _a.next(); !_b.done; _b = _a.next()) {
                                link = _b.value;
                                (0, assert_1.default)(link.targetSelectionRange.start.line > link.targetRange.start.line ||
                                    link.targetSelectionRange.start.character >= link.targetRange.start.character);
                                (0, assert_1.default)(link.targetSelectionRange.end.line < link.targetRange.end.line ||
                                    link.targetSelectionRange.end.character <= link.targetRange.end.character);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        expressions = result.expressionLinks.map(function (_a) {
                            var expression = _a.expression;
                            return expression instanceof cucumber_expressions_1.CucumberExpression
                                ? expression.source
                                : expression.regexp;
                        });
                        errors = result.errors.map(function (e) { return e.message; });
                        if (cucumberExpressionsSupport.has(languageName)) {
                            assert_1.default.deepStrictEqual(expressions, __spreadArray([
                                'a {uuid}',
                                'a {date}',
                                'a {planet}',
                                /^a regexp$/,
                                "the bee's knees"
                            ], __read((languageName === 'javascript' ? ['a compiled format'] : [])), false));
                            assert_1.default.deepStrictEqual(errors, [
                                'There is already a parameter type with name int',
                                "This Cucumber Expression has a problem at column 4:\n\nan {undefined-parameter}\n   ^-------------------^\nUndefined parameter type 'undefined-parameter'.\nPlease register a ParameterType for 'undefined-parameter'",
                            ]);
                            matched = false;
                            try {
                                for (_c = __values(result.expressionLinks), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    expressionLink = _d.value;
                                    match = expressionLink.expression.match('a 2020-12-24');
                                    if (match) {
                                        assert_1.default.strictEqual(match[0].getValue(undefined), '2020-12-24');
                                        matched = true;
                                    }
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                            (0, assert_1.default)(matched, 'The generated expressions did not match parameter type {date}');
                        }
                        else {
                            assert_1.default.deepStrictEqual(expressions, [/^a regexp$/, /^I test this change$/]);
                            assert_1.default.deepStrictEqual(errors, ['There is already a parameter type with name int']);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    try {
        for (var _b = __values(glob_1.glob.sync("test/language/testdata/*")), _c = _b.next(); !_c.done; _c = _b.next()) {
            var dir = _c.value;
            _loop_1(dir);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
function loadSources(dir, languageName) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, Promise.all(glob_1.glob.sync("".concat(dir, "/**/*")).map(function (path) {
                    return (0, promises_1.readFile)(path, 'utf-8').then(function (content) { return ({
                        languageName: languageName,
                        content: content,
                        uri: "file://".concat((0, path_1.resolve)(path)),
                    }); });
                }))];
        });
    });
}
describe('ExpressionBuilder', function () {
    context('with NodeParserAdapter', function () {
        defineContract(function () { return new NodeParserAdapter_js_1.NodeParserAdapter(); });
    });
    context('with WasmParserAdapter', function () {
        defineContract(function () { return new WasmParserAdapter_js_1.WasmParserAdapter('dist'); });
    });
});
//# sourceMappingURL=ExpressionBuilder.test.js.map