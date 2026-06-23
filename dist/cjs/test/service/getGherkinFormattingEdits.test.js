"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var getGherkinFormattingEdits_js_1 = require("../../src/service/getGherkinFormattingEdits.js");
describe('getGherkinFormattingEdits', function () {
    it('returns text edits that prettifies a Gherkin document', function () {
        var gherkinSource = "Feature: Hello\nScenario: World\nGiven something";
        var textEdits = (0, getGherkinFormattingEdits_js_1.getGherkinFormattingEdits)(gherkinSource);
        var expectedTextEdit = {
            newText: "Feature: Hello\n\n  Scenario: World\n    Given something\n",
            range: {
                start: {
                    line: 0,
                    character: 0,
                },
                end: {
                    line: 2,
                    character: 15,
                },
            },
        };
        assert_1.default.deepStrictEqual([expectedTextEdit], textEdits);
    });
});
//# sourceMappingURL=getGherkinFormattingEdits.test.js.map