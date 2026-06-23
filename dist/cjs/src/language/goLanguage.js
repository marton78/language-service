"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goLanguage = void 0;
exports.stringLiteral = stringLiteral;
var helpers_js_1 = require("./helpers.js");
exports.goLanguage = {
    toParameterTypeName: helpers_js_1.unsupportedOperation,
    toParameterTypeRegExps: helpers_js_1.unsupportedOperation,
    toStepDefinitionExpression: function (node) {
        var text = stringLiteral(node);
        var hasRegExpAnchors = text[0] == '^' || text[text.length - 1] == '$';
        return hasRegExpAnchors ? new RegExp(text) : text;
    },
    // Empty array as Godog does not support Cucumber Expressions
    defineParameterTypeQueries: [],
    defineStepDefinitionQueries: [
        "(function_declaration\n      body: (block\n        (expression_statement\n          (call_expression\n            function: (selector_expression\n              field: (field_identifier) @annotation-name\n            )\n            arguments: (argument_list\n              [\n                (raw_string_literal) @expression\n              ]\n            )\n            (#match? @annotation-name \"Given|When|Then|Step\")))))@root\n    ",
        "(function_declaration\n      body: (block\n        (expression_statement\n          (call_expression\n            function: (selector_expression\n              field: (field_identifier) @annotation-name\n            )\n            arguments: (argument_list\n              [\n                (interpreted_string_literal) @expression\n              ]\n            )\n            (#match? @annotation-name \"Given|When|Then|Step\")))))@root\n    ",
        "(method_declaration\n      body: (block\n        (expression_statement\n          (call_expression\n            function: (selector_expression\n              field: (field_identifier) @annotation-name\n            )\n            arguments: (argument_list\n              [\n                (raw_string_literal) @expression\n              ]\n            )\n            (#match? @annotation-name \"Given|When|Then|Step\")))))@root\n    ",
        "(method_declaration\n      body: (block\n        (expression_statement\n          (call_expression\n            function: (selector_expression\n              field: (field_identifier) @annotation-name\n            )\n            arguments: (argument_list\n              [\n                (interpreted_string_literal) @expression\n              ]\n            )\n            (#match? @annotation-name \"Given|When|Then|Step\")))))@root\n    ",
    ],
    snippetParameters: {
        int: { type: 'int', name: 'i' },
        float: { type: 'float', name: 'f' },
        word: { type: 'string' },
        string: { type: 'string', name: 's' },
        double: { type: 'float', name: 'd' },
        bigdecimal: { type: 'float64', name: 'bigDecimal' },
        byte: { type: 'rune', name: 'b' },
        short: { type: 'int32', name: 's' },
        long: { type: 'int64', name: 'l' },
        biginteger: { type: 'int64', name: 'bigInteger' },
        '': { type: 'string', name: 'arg' },
    },
    defaultSnippetTemplate: "\n  // Generated with Cucumber Expressions syntax, which are not supported by Godog. Convert to Regular Expressions.\n  ctx.{{ keyword }}(`{{ expression }}`, <stepFunc>)\n",
};
function stringLiteral(node) {
    if (node === null)
        throw new Error('node cannot be null');
    return node.text.slice(1, -1);
}
//# sourceMappingURL=goLanguage.js.map