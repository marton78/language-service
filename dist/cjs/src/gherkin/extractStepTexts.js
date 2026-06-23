"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractStepTexts = extractStepTexts;
var gherkin_utils_1 = require("@cucumber/gherkin-utils");
function extractStepTexts(gherkinDocument, stepTexts) {
    return (0, gherkin_utils_1.walkGherkinDocument)(gherkinDocument, stepTexts, {
        step: function (step, arr) {
            return arr.concat(step.text);
        },
    });
}
//# sourceMappingURL=extractStepTexts.js.map