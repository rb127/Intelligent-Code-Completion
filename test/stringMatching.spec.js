import { expect } from 'chai'
import { stringMatch } from '../src/string_matching.js'

describe('stringMatching', () => {
    it('should return empty list if the universe array is empty', () => {
        const words = []
        const searchStr = 'abc';
        const suggestions = stringMatch(words, searchStr)
        expect(suggestions).to.have.lengthOf(0)
    });

    it('should return empty list if the search string is empty', () => {
        const words = ['abc', 'foo', 'bar', 'foobarbuzz', 'zas']
        const searchStr = '';
        const suggestions = stringMatch(words, searchStr)
        expect(suggestions).to.have.lengthOf(0)
    });

    it('should return exact matches when threshold is set to 0', () => {
        const words = ['abc', 'foo', 'bar', 'foobarbuzz', 'zas']
        const searchStr = 'foo';
        const suggestions = stringMatch(words, searchStr, 0)
        expect(suggestions).to.deep.equal(['foo', 'foobarbuzz'])
    });

    it('should return reasonable matches when threshold is set to 0.5', () => {
        const words = ['foibarbuzz', 'abc', 'foo', 'bar', 'foobarbuzz', 'zas']
        const searchStr = 'foo';
        const suggestions = stringMatch(words, searchStr, 0.5)
        expect(suggestions).to.deep.equal(['foo', 'foobarbuzz', 'foibarbuzz'])
    });

    it('should return reasonable matches ordered by scope when threshold is set to 0.5 and orderedByScope is True', () => {
        const words = ['foibarbuzz', 'abc', 'foo', 'bar', 'foobarbuzz', 'zas']
        const searchStr = 'foo';
        const suggestions = stringMatch(words, searchStr, 0.5, true)
        expect(suggestions).to.deep.equal(['foibarbuzz', 'foo', 'foobarbuzz'])
    });
});