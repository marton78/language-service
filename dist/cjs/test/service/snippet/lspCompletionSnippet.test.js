"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var lspCompletionSnippet_js_1 = require("../../../src/service/snippet/lspCompletionSnippet.js");
describe('lspCompletionSnippet', function () {
    it('converts segments to an LSP snippet', function () {
        var segments = [
            'I have ',
            ['42', '54'],
            ' cukes in my ',
            ['basket', 'belly', 'table'],
        ];
        assert_1.default.strictEqual((0, lspCompletionSnippet_js_1.lspCompletionSnippet)(segments), 'I have ${1|42,54|} cukes in my ${2|basket,belly,table|}');
    });
    it('removes empty suggestions', function () {
        var segments = ['I have cuke', ['s', '']];
        assert_1.default.strictEqual((0, lspCompletionSnippet_js_1.lspCompletionSnippet)(segments), 'I have cuke${1|s|}');
    });
    it('escapes special characters', function () {
        var segments = ['the choices are ', ['', '$', '\\', '}', ',', '|']];
        assert_1.default.strictEqual((0, lspCompletionSnippet_js_1.lspCompletionSnippet)(segments), 'the choices are ${1|\\$,\\\\,\\},\\,,\\||}');
    });
});
//# sourceMappingURL=lspCompletionSnippet.test.js.map