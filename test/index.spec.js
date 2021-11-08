import { expect } from 'chai'
import { returnSuggestions, getCursorPosition } from '../src/index.js'

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

    it('should return empty list if cursor is in commented code', () => {
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

    it('should return matched suggestions as case insensitive', () => {
        const result = returnSuggestions(
            `const PIZZa = "Thin crust" 
             const pico = "pizza store"
             pi^
        `);
        expect(result).to.include(["PIZZa, pico"])
    });

    it('should return matched suggestions even if code is broken/incomplete before cursor',
        () => {
            const result = returnSuggestions(
                `const Pizza = "Thin crust"; 
             const pico = ;
             pi^
        `);
            expect(result).to.include(["Pizza, pico"])
        });

    it('should return matched suggestions even if code is broken/incomplete after cursor',
        () => {
            const result = returnSuggestions(
                `const Pizza = "Thin crust" 
             pi^
             const pico = ;
        `);
            expect(result).to.include(["Pizza, pico"])
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
