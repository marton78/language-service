import { Language, TreeSitterSyntaxNode } from './types.js'

export const swiftLanguage: Language = {
  toParameterTypeName(node) {
    switch (node.type) {
      case 'line_string_literal': {
        return stringLiteral(node)
      }
      case 'simple_identifier': {
        return node.text
      }
      default: {
        throw new Error(`Unsupported node type ${node.type}`)
      }
    }
  },
  toParameterTypeRegExps(node) {
    return stringLiteral(node)
  },
  toStepDefinitionExpression(node) {
    if (node.type === 'line_string_literal') {
      const text = stringLiteral(node)
      const hasRegExpAnchors = text[0] == '^' || text[text.length - 1] == '$'
      return hasRegExpAnchors ? new RegExp(text) : text
    }
    throw new Error(`Unsupported node type ${node.type}`)
  },

  // CucumberSwift has no ParameterType declaration convention analogous to
  // Java/Kotlin annotations, so there is nothing to query for here.
  defineParameterTypeQueries: [],
  defineStepDefinitionQueries: [
    `
(call_expression
  (simple_identifier) @function-name
  (call_suffix
    (value_arguments
      (value_argument
        (line_string_literal) @expression
      )
    )
  )
  (#match? @function-name "Given|When|Then|And|But")
) @root
`,
  ],
  snippetParameters: {
    int: { type: 'Int', name: 'i' },
    float: { type: 'Float', name: 'f' },
    word: { type: 'String' },
    string: { type: 'String', name: 's' },
    double: { type: 'Double', name: 'd' },
    bigdecimal: { type: 'Decimal', name: 'decimal' },
    byte: { type: 'UInt8', name: 'b' },
    short: { type: 'Int16', name: 's' },
    long: { type: 'Int64', name: 'l' },
    biginteger: { type: 'Int64', name: 'bigInteger' },
    '': { type: 'Any', name: 'arg' },
  },
  defaultSnippetTemplate: `
{{ keyword }}("{{ expression }}") { matches, _ in
    // {{ blurb }}
}
`,
}

function stringLiteral(node: TreeSitterSyntaxNode | null): string {
  if (node === null) throw new Error('node cannot be null')
  const text = node.text
  if (text.startsWith('"') && text.endsWith('"')) {
    return text.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\')
  }
  return text
}
