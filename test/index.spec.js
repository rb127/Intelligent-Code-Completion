const assert = require('assert');
const { expect } = require('chai');
const { returnSuggestions, getCursorPosition } = require('../src/index')

describe('returnSugestions (Acceptance Tests)', () => {
    it('should return empty list if file is empty', () => {
        const result = returnSuggestions(` ^`);
        expect(result).to.equal([])
    });

    it('should return empty list if no cursor found', () => {
        const result = returnSuggestions(`const foo = bar;`);
        expect(result).to.equal([])
    });

    it('should return empty list if no matches found', () => {
        const result = returnSuggestions(
            `const abc = "foo";
             foobarbaz^
        `);
        expect(result).to.equal([])
    });

    it('should return empty list if no character before cursor', () => {
        expect(result).to.equal([])
        const result = returnSuggestions(
            `const foo = "bar";
             const a = fo ^
        `);
    });

    it('If all code is commented out then return empty list', () => {
        const result = returnSuggestions(
            `\\ import parse from 'acorn-loose';
        \\ import * as promises from 'node:fs/promises
        \\ const foo = "hello world"
        \\ fo^ 
        `);
        expect(result).to.equal([])
    })

    it('should return list of keywords after character', () => {
        const result = returnSuggestions(
            `const foo = c^
        `);
        expect(result).to.equal(["case", "catch", "char", "class", "const", "continue"])
    });

    it('should return list that includes matched imported libraries', () => {
        const result = returnSuggestions(
            `import parse from 'acorn-loose';
            import * as promises from 'node:fs/promises;
            
            p^
        `);
        expect(result).to.include(["parse", "promises"])
    });

    it('should return list in order of most local, accessible scope', () => {
        const result = returnSuggestions(
            `{
                const foobarbaz;
                {
                    const foobar;
                    {
                        foo^
                    }
                }
            }
        `);
        expect(result).to.equal(["foobar", "foobarbaz"])
    });

    it('return list should not include variables from scopes that are not referencable', () => {
        const result = returnSuggestions(
            `{
                const foobar;
                {   
                    const foo^;
                }

                {
                    const foobarbaz;
                }
            }
        `);
        expect(result).to.include(["foobar"])
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

describe('getCursorPosition', () => {
    it('should return cursor position given cursor signified by caret symbol', () => {
        const result = getCursorPosition(`const foo = c^`);
        expect(result).to.equal(13)
    });

    it('should return -1 if caret symbol not found', () => {
        const result = getCursorPosition(`const foo = c`);
        expect(result).to.equal(-1)
    });
});
