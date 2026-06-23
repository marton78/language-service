"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kotlinLanguage = void 0;
exports.kotlinLanguage = {
    toParameterTypeName: function (node) {
        switch (node.type) {
            case 'string_literal': {
                return stringLiteral(node);
            }
            case 'simple_identifier': {
                return node.text;
            }
            default: {
                throw new Error("Unsupported node type ".concat(node.type));
            }
        }
    },
    toParameterTypeRegExps: function (node) {
        return stringLiteral(node);
    },
    toStepDefinitionExpression: function (node) {
        if (node.type === 'string_literal') {
            var text = stringLiteral(node);
            var hasRegExpAnchors = text[0] == '^' || text[text.length - 1] == '$';
            return hasRegExpAnchors ? new RegExp(text) : text;
        }
        throw new Error("Unsupported node type ".concat(node.type));
    },
    defineParameterTypeQueries: [
        "\n(function_declaration\n  (modifiers\n    (annotation\n      (constructor_invocation\n        (user_type\n          (type_identifier) @annotation-name\n        )\n        (value_arguments\n          (value_argument\n            (string_literal) @expression\n          )\n        )\n      )\n    )\n  )\n  (simple_identifier) @name\n  (#eq? @annotation-name \"ParameterType\")\n) @root\n",
    ],
    defineStepDefinitionQueries: [
        "\n(function_declaration\n  (modifiers\n    (annotation\n      (constructor_invocation\n        (user_type\n          (type_identifier) @annotation-name\n        )\n        (value_arguments\n          (value_argument\n            (string_literal) @expression\n          )\n        )\n      )\n    )\n  )\n  (#match? @annotation-name \"Given|When|Then|And|But\")\n) @root\n",
    ],
    snippetParameters: {
        int: { type: 'Int', name: 'i' },
        float: { type: 'Float', name: 'f' },
        word: { type: 'String' },
        string: { type: 'String', name: 's' },
        double: { type: 'Double', name: 'd' },
        bigdecimal: { type: 'java.math.BigDecimal', name: 'bigDecimal' },
        byte: { type: 'Byte', name: 'b' },
        short: { type: 'Short', name: 's' },
        long: { type: 'Long', name: 'l' },
        biginteger: { type: 'java.math.BigInteger', name: 'bigInteger' },
        '': { type: 'Any', name: 'arg' },
    },
    defaultSnippetTemplate: "\n    @{{ keyword }}(\"{{ expression }}\")\n    fun {{ #underscore }}{{ expression }}{{ /underscore }}({{ #parameters }}{{ #seenParameter }}, {{ /seenParameter }}{{ name }}: {{ type }}{{ /parameters }}) {\n        // {{ blurb }}\n    }\n",
};
function stringLiteral(node) {
    if (node === null)
        throw new Error('node cannot be null');
    // Kotlin string_literal text includes surrounding quotes: "foo" → foo
    // string_content child holds the raw content, but we receive string_literal here
    var text = node.text;
    if (text.startsWith('"') && text.endsWith('"')) {
        return text.slice(1, -1).replace(/\\\\/g, '\\');
    }
    return text;
}
//# sourceMappingURL=kotlinLanguage.js.map