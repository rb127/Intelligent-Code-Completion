import { expect } from 'chai'
import { getCursorPosition, CURSOR_SYMBOL } from '../src/index.js'

describe('getCursorPosition', () => {
    it('should return cursor position given cursor signified by defined symbol', () => {
        const result = getCursorPosition(`const foo = c${CURSOR_SYMBOL}`);
        expect(result).to.equal(13)
    });

    it('should return -1 if defined symbol not found', () => {
        const result = getCursorPosition(`const foo = c`);
        expect(result).to.equal(-1)
    });
});