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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var message_streams_1 = require("@cucumber/message-streams");
var assert_1 = __importDefault(require("assert"));
var fs_1 = __importDefault(require("fs"));
var stream_1 = require("stream");
var util_1 = require("util");
var MessagesBuilderStream_js_1 = require("./MessagesBuilderStream.js");
var pipeline = (0, util_1.promisify)(stream_1.pipeline);
describe('MessagesBuilder', function () {
    it('does not fail on duplicate parameter types', function () { return __awaiter(void 0, void 0, void 0, function () {
        var readStream, receivedError;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    readStream = fs_1.default.createReadStream("test/messages/dupe-parameter-types.ndjson", 'utf-8');
                    return [4 /*yield*/, pipeline(readStream, new message_streams_1.NdjsonToMessageStream(), new MessagesBuilderStream_js_1.MessagesBuilderStream(function (err) { return (receivedError = err); }), new stream_1.Writable({
                            objectMode: true,
                            write: function (_result, encoding, callback) {
                                callback();
                            },
                        }))];
                case 1:
                    _a.sent();
                    (0, assert_1.default)(receivedError);
                    return [2 /*return*/];
            }
        });
    }); });
    it('does not fail on cucumber expression syntax errors', function () { return __awaiter(void 0, void 0, void 0, function () {
        var readStream, receivedError;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    readStream = fs_1.default.createReadStream("test/messages/syntax-error-cucumber-expression.ndjson", 'utf-8');
                    return [4 /*yield*/, pipeline(readStream, new message_streams_1.NdjsonToMessageStream(), new MessagesBuilderStream_js_1.MessagesBuilderStream(function (err) { return (receivedError = err); }), new stream_1.Writable({
                            objectMode: true,
                            write: function (_result, encoding, callback) {
                                callback();
                            },
                        }))];
                case 1:
                    _a.sent();
                    (0, assert_1.default)(receivedError);
                    return [2 /*return*/];
            }
        });
    }); });
    it('builds MessagesBuilder from a message stream with parameter types', function () { return __awaiter(void 0, void 0, void 0, function () {
        var readStream, result, expectedSuggestions, expectedExpressionSources;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    readStream = fs_1.default.createReadStream("test/messages/messages.ndjson", 'utf-8');
                    return [4 /*yield*/, pipeline(readStream, new message_streams_1.NdjsonToMessageStream(), new MessagesBuilderStream_js_1.MessagesBuilderStream(), new stream_1.Writable({
                            objectMode: true,
                            write: function (_result, encoding, callback) {
                                result = _result;
                                callback();
                            },
                        }))];
                case 1:
                    _a.sent();
                    expectedSuggestions = [
                        {
                            segments: ['I select the ', ['2nd'], ' snippet'],
                            label: 'I select the {ordinal} snippet',
                            matched: true,
                        },
                        {
                            segments: [
                                'I type ',
                                ['"I have ${1|11,17,23|} cukes on my ${2|belly,table,tree|}"', '"cukes"'],
                            ],
                            label: 'I type {string}',
                            matched: true,
                        },
                        {
                            segments: ['the following Gherkin step texts exist:'],
                            label: 'the following Gherkin step texts exist:',
                            matched: true,
                        },
                        {
                            segments: ['the following Step Definitions exist:'],
                            label: 'the following Step Definitions exist:',
                            matched: true,
                        },
                        {
                            segments: [
                                'the LSP snippet should be ',
                                ['"I have ${1|11,17,23|} cukes on my ${2|belly,table,tree|}"', '"cukes"'],
                            ],
                            label: 'the LSP snippet should be {string}',
                            matched: true,
                        },
                        {
                            segments: ['the suggestions should be empty'],
                            label: 'the suggestions should be empty',
                            matched: true,
                        },
                        {
                            segments: ['the suggestions should be:'],
                            label: 'the suggestions should be:',
                            matched: true,
                        },
                    ];
                    assert_1.default.deepStrictEqual(result.suggestions, expectedSuggestions);
                    expectedExpressionSources = [
                        'the following Gherkin step texts exist:',
                        'the following Step Definitions exist:',
                        'I type {string}',
                        'I select the {ordinal} snippet',
                        'the suggestions should be:',
                        'the suggestions should be empty',
                        'the LSP snippet should be {string}',
                    ];
                    assert_1.default.deepStrictEqual(result.expressions.map(function (e) { return e.source; }), expectedExpressionSources);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=MessagesBuilder.test.js.map