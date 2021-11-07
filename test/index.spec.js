const assert = require('assert');
const { expect } = require('chai');
const { helloWorld } = require('../src/index')

describe('helloWorld', () => {
    it('should return a parsed object of the program', () => {
        const result = helloWorld();
        expect(result.body[0].declarations[0].init.value).to.equal("Hello World")
    });
});

describe('Acceptance tests', () => {
    it('should return empty list if file is empty', () => {
        const result = returnSuggestions(` ^`);
        expect(result).to.equal([])
    });

    it('should return empty list if no cursor found', () => {
        const result = returnSuggestions(`const foo = bar;`);
        expect(result).to.equal([])
    });

    it('should return empty list if no character before cursor', () => {
        const result = returnSuggestions(
            `const foo = bar;
             const a = fo ^
        `);
        expect(result).to.equal([])
    });

    it('If all code is commented out then return empty list', () => {
        const result = returnSuggestions(
            `\\ import parse from 'acorn-loose';
        \\ import * as promises from 'node:fs/promises
        \\ const foo = "hello world"
        \\ fo^ 
        `);
        expect(result).to.include([])
    })

    it('should return list of keywords after character', () => {
        const result = returnSuggestions(
            `const foo = c^
        `);
        expect(result).to.equal(["case", "catch", "char", "class", "const", "continue"])
    });

    it('should return list of keywords after character', () => {
        const result = returnSuggestions(
            `const foo = c^
        `);
        expect(result).to.equal(["case", "catch", "char", "class", "const", "continue"])
    });

    it('should return list that includes matched keywords', () => {
        const result = returnSuggestions(
            `const foo = c^
        `);
        expect(result).to.include(["case", "catch", "char", "class", "const", "continue"])
    });

    it('should return list that includes matched imported libraries', () => {
        const result = returnSuggestions(
            `import parse from 'acorn-loose';
            import * as promises from 'node:fs/promises;
            
            p^
        `);
        expect(result).to.include(["parse", "promises"])
    });

    it('should return list that includes variables and keywords if applicable', () => {
        const result = returnSuggestions(
            `import parse from 'acorn-loose';
        import * as promises from 'node:fs/promises
        const foo = "hello world"
        fo^ 
        `);
        expect(result).to.include(["foo, for"])
    });

    it('should return list that includes class names', () => {
        const result = returnSuggestions(
            `import parse from 'acorn-loose';
        import * as promises from 'node:fs/promises
        const foo = "hello world"
        class User {

        constructor(name) {
            this.name = name;
        }

        sayHi() {
            alert(this.name);
        }

        }

        // Usage:
        let user = new Us^
        `);
        expect(result).to.include(["User"])
    });

});

describe('Unit tests', () => {
    it('should return empty list if no cursor found', () => {
        const result = returnSuggestions(``);
        expect(result).to.equal([])
    });
});

