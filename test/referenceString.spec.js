import { expect } from 'chai'
import { getReferenceString, CURSOR_SYMBOL } from '../src/index.js'

describe('getReferenceString', () => {
    it('should return empty string if whitespace found before cursor pos', () => {
        const file = `const foo ${CURSOR_SYMBOL}`
        const referenceString = getReferenceString(file, 10);
        expect(referenceString).to.equal('')
    });


    it('should return correct string before cursor if no whitespace upto the nearest whitespace on the left', () => {
        const file = `const foo = bar${CURSOR_SYMBOL}`
        const referenceString = getReferenceString(file, 15);
        expect(referenceString).to.equal('bar')
    });
});
