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
Object.defineProperty(exports, "__esModule", { value: true });
exports.phpLanguage = void 0;
exports.behatifyStep = behatifyStep;
var helpers_js_1 = require("./helpers.js");
exports.phpLanguage = {
    toParameterTypeName: helpers_js_1.unsupportedOperation,
    toParameterTypeRegExps: helpers_js_1.unsupportedOperation,
    toStepDefinitionExpression: function (node) {
        // match multiline comment
        var text = node.text;
        var match = text.match(/^(\/\*\*[\s*]*)([\s\S]*)(\n[\s]*\*\/)/);
        if (!match)
            throw new Error("Could not match ".concat(text));
        return behatifyStep(match[2]);
    },
    // Empty array because Behat does not support Cucumber Expressions
    defineParameterTypeQueries: [],
    defineStepDefinitionQueries: [
        "\n(\n  (comment)+ @expression\n  (#match? @expression \"@(Given|When|Then)\")\n) @root\n",
    ],
    snippetParameters: {
        int: { type: 'int', name: 'i' },
        float: { type: 'float', name: 'f' },
        word: { type: 'string' },
        string: { type: 'string', name: 's' },
        double: { type: 'float', name: 'd' },
        bigdecimal: { type: 'string', name: 'bigDecimal' },
        byte: { type: 'int', name: 'b' },
        short: { type: 'int', name: 's' },
        long: { type: 'int', name: 'l' },
        biginteger: { type: 'int', name: 'bigInteger' },
        '': { type: 'Object', name: 'arg' },
    },
    defaultSnippetTemplate: "\n    /**\n     * {{ keyword }} {{ expression }}\n     */\n    public function {{ #camelize }}{{ expression }}{{ /camelize }}({{ #parameters }}{{ #seenParameter }}, {{ /seenParameter }}{{ name }}{{ /parameters }})\n    {\n        // {{ blurb }}\n    }\n",
};
function behatifyStep(step) {
    var stepText = stripIdentifier(step);
    if (stepText.startsWith('/')) {
        return cleanRegExp(stepText);
    }
    else if (/:[A-Za-z_][\w_]+/.test(stepText)) {
        return argToRegex(stepText);
    }
    return RegExp(stepText);
}
function stripIdentifier(text) {
    return text.replace(/@(Given |When |Then )/, '').trim();
}
function cleanRegExp(re) {
    var _a = __read(re.slice(1).split('/'), 2), body = _a[0], modifier = _a[1];
    return RegExp(body, modifier);
}
function argToRegex(text) {
    // arg must be a valid php variable name, see https://www.php.net/manual/en/language.variables.basics.php
    return RegExp(text.replace(/:[A-Za-z_][\w_]+/g, '([\\S]+|"[^"]+")'));
}
//# sourceMappingURL=phpLanguage.js.map