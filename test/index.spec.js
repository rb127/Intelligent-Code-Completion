const assert = require('assert');
const { expect } = require('chai');
const { helloWorld } = require('../src/index')

describe('helloWorld', () => {
    it('should return a parsed object of the program', () => {
        console.log("Running Test")
        const result = helloWorld();
        expect(result.body[0].declarations[0].init.value).to.equal("Hello World")
    });
});

describe('Acceptance tests', () => {
    it('should return empty list if file is empty', () => {
        console.log("Running Test")
        const result = returnSuggestions(` ^`);
        expect(result).to.equal([])
    });

    it('should return empty list if no cursor found', () => {
        console.log("Running Test")
        const result = returnSuggestions(`const foo = bar;`);
        expect(result).to.equal([])
    });

    it('should return empty list if no character before cursor', () => {
        console.log("Running Test")
        const result = returnSuggestions(
            `const foo = bar;
             const a = fo ^
        `);
        expect(result).to.equal([])
    });

    it('should return list of keywords after character', () => {
        console.log("Running Test")
        const result = returnSuggestions(
            `const foo = c^
        `);
        expect(result).to.equal(["case", "catch", "char", "class", "const",	"continue"])
    });

    it('should return list of keywords after character', () => {
        console.log("Running Test")
        const result = returnSuggestions(
            `const foo = c^
        `);
        expect(result).to.equal(["case", "catch", "char", "class", "const",	"continue"])
    });

    it('should return list that includes matched keywords', () => {
        console.log("Running Test")
        const result = returnSuggestions(
            `const foo = c^
        `);
        expect(result).to.include(["case", "catch", "char", "class", "const",	"continue"])
    });

    it('should return list that includes matched imported libraries', () => {
        console.log("Running Test")
        const result = returnSuggestions(
            `import parse from 'acorn-loose';
            import * as promises from 'node:fs/promises;
            
            p^
        `);
        expect(result).to.include(["parse", "promises"])
    });
});

describe('Unit tests', () => {
    it('should return empty list if no cursor found', () => {
        console.log("Running Test")
        const result = returnSuggestions(``);
        expect(result).to.equal([])
    });
});
