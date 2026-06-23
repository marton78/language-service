"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var phpLanguage_js_1 = require("../../src/language/phpLanguage.js");
describe('phpLanguage', function () {
    it('should handle behat step definition', function () {
        var cases = [
            {
                input: '@Given Hello world',
                output: RegExp('Hello world'),
            },
            {
                input: '@When Hello :world',
                output: RegExp('Hello ([\\S]+|"[^"]+")'),
            },
            {
                input: '@Then there is a :arg1, which costs £:arg2',
                output: RegExp('there is a ([\\S]+|"[^"]+"), which costs £([\\S]+|"[^"]+")'),
            },
            {
                input: '@Given /^there (?:is|are) (\\d+) monsters?$/',
                output: RegExp('^there (?:is|are) (\\d+) monsters?$'),
            },
            {
                input: '@Given /^Something (.*)$/i',
                output: RegExp('^Something (.*)$', 'i'),
            },
        ];
        cases.forEach(function (c) {
            var result = (0, phpLanguage_js_1.behatifyStep)(c.input);
            (0, assert_1.default)(result instanceof RegExp);
            assert_1.default.equal(result.toString(), c.output.toString());
        });
    });
});
//# sourceMappingURL=phpLanguage.test.js.map