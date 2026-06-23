"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var pythonLanguage_js_1 = require("../../src/language/pythonLanguage.js");
describe('pythonLanguage', function () {
    it('should identify and return regexes correctly', function () {
        // NOTE these are strings that would look like from tree-sitter
        var regexes = ['"Something (.*)"', '"Catch them digits \\d+"'];
        regexes.forEach(function (regex) {
            (0, assert_1.default)((0, pythonLanguage_js_1.toStringOrRegExp)(regex) instanceof RegExp);
        });
    });
    it('should identify normal strings and just return a string', function () {
        var nonregexes = ['"test"'];
        nonregexes.forEach(function (nonregex) {
            assert_1.default.strictEqual((0, pythonLanguage_js_1.toStringOrRegExp)(nonregex), 'test');
        });
    });
    it('should properly handle concatenated string', function () {
        var concatenatedStrings = [
            '"Airnet Address|Superheat|Gas Pipe Temperature|Liquid Pipe Temperature|EEV Opening|"\\\n        "Return Air Temperature|Room Temperature|Setpoint|Filter|On-Off|Reset Filter Indicator|"\\\n        "Thermostat - LockMode|Thermostat - Lock All|Thermostat - Lock Temperature|Thermostat - Lock On-Off|"\\\n        "Fan Speed|Louver Position|Mode|Group Address|Malfunction Code|Indoor Unit Model Code|"\\\n        "Operation-Stop|Thermostat ON|Capacity Increase|Malfunction Cause|Point_1|Point_2"',
        ];
        var expectedStrings = [
            'Airnet Address|Superheat|Gas Pipe Temperature|Liquid Pipe Temperature|EEV Opening|Return Air Temperature|Room Temperature|Setpoint|Filter|On-Off|Reset Filter Indicator|Thermostat - LockMode|Thermostat - Lock All|Thermostat - Lock Temperature|Thermostat - Lock On-Off|Fan Speed|Louver Position|Mode|Group Address|Malfunction Code|Indoor Unit Model Code|Operation-Stop|Thermostat ON|Capacity Increase|Malfunction Cause|Point_1|Point_2',
        ];
        var z = concatenatedStrings.map(function (x, i) { return [x, expectedStrings[i]]; }); //use map to zip the concat with expected for assertion
        console.log((0, pythonLanguage_js_1.concatStringLiteral)(expectedStrings[0]));
        z.forEach(function (x) { return assert_1.default.strictEqual((0, pythonLanguage_js_1.concatStringLiteral)(x[0]), x[1]); });
    });
    it('should strip explicit unicode string prefix', function () {
        var cases = [
            {
                input: 'u"Explicit unicode string"',
                expected: 'Explicit unicode string',
            },
            {
                input: 'u"^Explicit regex unicode string$"',
                expected: '^Explicit regex unicode string$',
            },
        ];
        cases.forEach(function (_a) {
            var input = _a.input, expected = _a.expected;
            assert_1.default.strictEqual((0, pythonLanguage_js_1.toStringOrRegExp)(input), expected);
        });
    });
});
//# sourceMappingURL=pythonLanguage.test.js.map