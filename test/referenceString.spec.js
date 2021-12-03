import { expect } from 'chai'
import { getReferenceString } from '../src/index.js'

describe('getReferenceString', () => {
    it('should return empty string if whitespace found before cursor pos', () => {
        const file = "const foo Ʌ"
        const referenceString = getReferenceString(file, 10);
        expect(referenceString).to.equal('')
    });

    it('should return correct string before cursor if no whitespace', () => {
        const file = "const foo = barɅ"
        const referenceString = getReferenceString(file, 15);
        expect(referenceString).to.equal('bar')
    });
});
