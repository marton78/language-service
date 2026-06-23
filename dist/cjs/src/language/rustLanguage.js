"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rustLanguage = void 0;
exports.stringLiteral = stringLiteral;
exports.stripLineContinuation = stripLineContinuation;
exports.rustLanguage = {
    toParameterTypeName: function (node) {
        switch (node.type) {
            case 'raw_string_literal': {
                return stringLiteral(node);
            }
            case 'string_literal': {
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
        return stringLiteral(node);
    },
    toStepDefinitionExpression: function (node) {
        var text = stringLiteral(node);
        var hasRegExpAnchors = text[0] == '^' || text[text.length - 1] == '$';
        return hasRegExpAnchors ? new RegExp(text) : text;
    },
    defineParameterTypeQueries: [
        "(attribute_item \n      (attribute\n        (identifier) @meta-name\n        arguments: (token_tree\n          [\n            (\n              (identifier) @name-key\n              (string_literal) @name\n              (identifier) @value-key\n              (string_literal) @expression\n            )\n            (\n              (identifier) @value-key\n              (string_literal) @expression\n              (identifier) @name-key\n              (string_literal) @name\n            )\n          ]\n        )\n      )\n      (#eq? @meta-name \"param\")\n      (#eq? @name-key \"name\")\n      (#eq? @value-key \"regex\")\n    ) @root\n    ",
    ],
    defineStepDefinitionQueries: [
        "(source_file \n      (attribute_item \n        (attribute \n          (\n            (identifier) @meta-name \n            arguments: (token_tree\n              [\n                (string_literal) @expression\n                (identifier)\n                (string_literal) @expression\n                (raw_string_literal) @expression\n              ]\n            )\n          )\n        )  \n        (#match? @meta-name \"given|when|then\")\n      )\n      (function_item) ) @root\n    ",
    ],
    snippetParameters: {
        int: { type: 'i32', name: 'i' },
        float: { type: 'f32', name: 'f' },
        word: { type: 'String' },
        string: { type: 'String', name: 's' },
        double: { type: 'f64', name: 'd' },
        bigdecimal: { type: 'String', name: 'bigDecimal' },
        byte: { type: 'u8', name: 'b' },
        short: { type: 'i16', name: 's' },
        long: { type: 'i64', name: 'l' },
        biginteger: { type: 'String', name: 'bigInteger' },
        '': { type: 'String', name: 'arg' },
    },
    defaultSnippetTemplate: "\n#[{{ #lowercase }}{{ keyword }}{{ /lowercase }}(expr = \"{{ expression }}\")]\nfn {{ #lowercase }}{{ #underscore }}{{ expression }}{{ /underscore }}{{ /lowercase }}(world: &mut TheWorld, {{ #parameters }}{{ #seenParameter }}, {{ /seenParameter }}{{ name }}: {{ type }}{{ /parameters }}) {\n    // {{ blurb }}\n}\n",
};
function stringLiteral(node) {
    if (node === null)
        throw new Error('node cannot be null');
    var result;
    if (node.text.startsWith('r#'))
        result = unescapeString(node.text.slice(3, -2));
    else if (node.text.startsWith('r'))
        result = unescapeString(node.text.slice(2, -1));
    else
        result = unescapeString(node.text.slice(1, -1));
    return stripLineContinuation(result);
}
function stripLineContinuation(s) {
    return s.replace(/\\\n\s*/g, '');
}
function unescapeString(s) {
    return s.replace(/\\\\/g, '\\');
}
//# sourceMappingURL=rustLanguage.js.map