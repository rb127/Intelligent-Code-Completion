import { expect } from 'chai'
import { getCursorPosition } from '../src/index.js'

describe('getCursorPosition', () => {
    it('should return cursor position given cursor signified by caret symbol', () => {
        const result = getCursorPosition(`const foo = cɅ`);
        expect(result).to.equal(13)
    });

    it('should return -1 if caret symbol not found', () => {
        const result = getCursorPosition(`const foo = c`);
        expect(result).to.equal(-1)
    });
});