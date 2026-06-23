"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var parseGherkinDocument_js_1 = require("../../src/gherkin/parseGherkinDocument.js");
describe('parseGherkinDocument', function () {
    it('returns a GherkinDocument for unexpected EOF', function () {
        var source = "Feature: Hello\n@tag\n";
        var _a = (0, parseGherkinDocument_js_1.parseGherkinDocument)(source), gherkinDocument = _a.gherkinDocument, error = _a.error;
        assert_1.default.strictEqual(gherkinDocument.feature.name, 'Hello');
        assert_1.default.strictEqual(error.message, 'Parser errors:\n(3:0): unexpected end of file, expected: #TagLine, #RuleLine, #Comment, #Empty');
    });
});
//# sourceMappingURL=parseGherkinDocument.test.js.map