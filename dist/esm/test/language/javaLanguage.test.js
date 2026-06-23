import assert from 'assert';
import { stringLiteral } from '../../src/language/javaLanguage.js';
describe('javaLanguage', () => {
    it('should remove (?i) from regexp strings', () => {
        const node = {
            type: 'string_literal',
            text: '"(?i)(day|hour)s?"',
            startPosition: { row: 1, column: 19 },
            endPosition: { row: 1, column: 37 },
            children: [],
        };
        const result = stringLiteral(node);
        assert.deepStrictEqual(result, '(day|hour)s?');
    });
});
//# sourceMappingURL=javaLanguage.test.js.map