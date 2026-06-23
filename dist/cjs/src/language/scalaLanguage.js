"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scalaLanguage = void 0;
exports.stringLiteral = stringLiteral;
exports.scalaLanguage = {
    toParameterTypeName: function (node) {
        switch (node.type) {
            case 'string': {
                return stringLiteral(node);
            }
            case 'identifier': {
                return node.text;
            }
            default: {
                throw new Error("Unsupported node type ".concat(node.type));
            }
        }
    },
    toParameterTypeRegExps: function (node) {
        if (node === null) {
            return /.*/;
        }
        return stringLiteral(node);
    },
    toStepDefinitionExpression: function (node) {
        if (node.type === 'string') {
            var text = stringLiteral(node);
            var hasRegExpAnchors = text[0] == '^' || text[text.length - 1] == '$';
            return hasRegExpAnchors ? new RegExp(text) : text;
        }
        throw new Error("Unsupported node type ".concat(node.type));
    },
    defineParameterTypeQueries: [
        "\n(call_expression\n  function: (identifier) @function-name\n  arguments: (arguments\n   [\n      (string)+ @name\n   ]\n  )\n  (#match? @function-name \"ParameterType\")\n) @root\n",
    ],
    defineStepDefinitionQueries: [
        "\n(call_expression\n  function: (identifier) @function-name\n  arguments: (arguments\n    (\n      (string) @expression\n    )\n  )\n  (#match? @function-name \"Given|When|Then|And|But\")\n) @root\n",
    ],
    snippetParameters: {
        int: { type: 'Int', name: 'i' },
        float: { type: 'Float', name: 'f' },
        word: { type: 'String' },
        string: { type: 'String', name: 's' },
        double: { type: 'Double', name: 'd' },
        bigdecimal: { type: 'scala.math.BigDecimal', name: 'bigDecimal' },
        byte: { type: 'Byte', name: 'b' },
        short: { type: 'Short', name: 's' },
        long: { type: 'Long', name: 'l' },
        biginteger: { type: 'scala.math.BigInteger', name: 'bigInteger' },
        '': { type: 'Any', name: 'arg' },
    },
    defaultSnippetTemplate: "\n{{ keyword }}(\"\"\"{{ expression }}\"\"\") { ({{ #parameters }}{{ #seenParameter }}, {{ /seenParameter }}{{ name }}: {{ type }}{{ /parameters }}) =>\n  // {{ blurb }}\n}\n",
};
function stringLiteral(node) {
    if (node === null)
        throw new Error('node cannot be null');
    if (node.text.startsWith('"""')) {
        var x = node.text.slice(3, -3);
        console.log(x);
        return x;
    }
    return node.text.slice(1, -1);
}
//# sourceMappingURL=scalaLanguage.js.map