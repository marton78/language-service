"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.javascriptLanguage = void 0;
var tsxLanguage_js_1 = require("./tsxLanguage.js");
exports.javascriptLanguage = __assign(__assign({}, tsxLanguage_js_1.tsxLanguage), { defineStepDefinitionQueries: __spreadArray(__spreadArray([], __read(tsxLanguage_js_1.tsxLanguage.defineStepDefinitionQueries), false), [
        // Compiled cjs step definitions of the format:
        // (0, some_cucumber_import.Given)("step pattern here", function...)
        "(call_expression\n      function: (parenthesized_expression\n        (sequence_expression\n          (member_expression\n            property: (property_identifier) @function-name\n          )\n        )\n      )\n      arguments: (arguments\n        [\n          (string) @expression\n          (regex) @expression\n          (template_string) @expression\n        ]\n      )\n      (#match? @function-name \"Given|When|Then\")\n    ) @root",
        // Compiled cjs step definitions of the format:
        // (0, Given)("step pattern here", function...)
        "(call_expression\n      function: (parenthesized_expression\n        (sequence_expression\n          (identifier) @function-name\n        )\n      )\n      arguments: (arguments\n        [\n          (string) @expression\n          (regex) @expression\n          (template_string) @expression\n        ]\n      )\n      (#match? @function-name \"Given|When|Then\")\n    ) @root",
    ], false), defaultSnippetTemplate: "\n{{ keyword }}('{{ expression }}', ({{ #parameters }}{{ #seenParameter }}, {{ /seenParameter }}{{ name }}{{ /parameters }}) => {\n  // {{ blurb }}\n})\n" });
//# sourceMappingURL=javascriptLanguage.js.map