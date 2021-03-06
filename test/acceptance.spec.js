import { expect } from 'chai'
import { returnSuggestions, CURSOR_SYMBOL } from '../src/index.js'
/* 
Our client (Greg) has seen these tests and verified them. 
We have kept the acceptance criteria the same as these tests.
Please refer to A2.md for further information on how we decided to pursue test 
driven development with input from our client.
*/

describe('returnSugestions (Acceptance Tests)', () => {
    it('should return empty list if file is empty', () => {
        const result = returnSuggestions(`${CURSOR_SYMBOL}`);
        expect(result).to.have.lengthOf(0)
    });

    it('should return empty list if no cursor found', () => {
        const result = returnSuggestions(`const foo = bar;`);
        expect(result).to.have.lengthOf(0)
    });

    it('should return empty list if no matches found', () => {
        const result = returnSuggestions(
            `const abc = "foo";
             foobarbaz${CURSOR_SYMBOL}
        `);
        expect(result).to.have.lengthOf(0)
    });

    it('should return empty list if no character before cursor', () => {
        const result = returnSuggestions(
            `const foo = "bar";
             const a = fo ${CURSOR_SYMBOL}
        `);
        expect(result).to.have.lengthOf(0)
    });

    it('should return empty list if cursor is in commented code', () => {
        const result = returnSuggestions(
        `   // import parse from 'acorn-loose';
            // import * as promises from 'node:fs/promises
            // const foo = "hello world"
            // fo${CURSOR_SYMBOL} 
        `);
        expect(result).to.have.lengthOf(0)
    })

    it('should return list of keywords after character', () => {
        const result = returnSuggestions(
            `const foo = c${CURSOR_SYMBOL}
        `);
        expect(result).to.include("case", "catch", "char", "class", "const", "continue")
    });

    it('should return matched suggestions as case insensitive', () => {
        const result = returnSuggestions(
            `const PIZZa = "Thin crust" 
             const pico = "pizza store"
             pi${CURSOR_SYMBOL}
        `);
        expect(result).to.include("PIZZa", "pico")
    });

    it('should return matched suggestions even if code is broken/incomplete before cursor',
        () => {
            const result = returnSuggestions(
                `const Pizza = "Thin crust"; 
             const pico = ;
             pi${CURSOR_SYMBOL}
        `);
            expect(result).to.include("Pizza", "pico")
        });

    it('should return matched suggestions even if code is broken/incomplete after cursor',
        () => {
            const result = returnSuggestions(
                `const Pizza = "Thin crust" 
             pi${CURSOR_SYMBOL}
             const pico = ;
        `);
            expect(result).to.contain("Pizza", "pico")
        });

    it('should return list that includes matched imported libraries', () => {
        const result = returnSuggestions(
            `import parse from 'acorn-loose';
            import * as promises from 'node:fs/promises;
            
            p${CURSOR_SYMBOL}
        `);
        expect(result).to.include("parse", "promises")
    });

    it('should return list in order of most local, accessible scope', () => {
        const result = returnSuggestions(
            `{
                const foobarbaz;
                {
                    const foobar;
                    {
                        foo${CURSOR_SYMBOL}
                    }
                }
            }
        `);
        expect(result).to.have.members(["foobar", "foobarbaz"])
    });

    it('return list should not include variables from scopes that are not referencable', () => {
        const result = returnSuggestions(
            `{
                const foobar;
                {   
                    const foo${CURSOR_SYMBOL};
                }

                {
                    const foobarbaz;
                }
            }
        `);
        expect(result).to.include("foobar")
    });

    it('should return list that includes variables and keywords if applicable', () => {
        const result = returnSuggestions(
            `import parse from 'acorn-loose';
        import * as promises from 'node:fs/promises
        const foo = "hello world"
        fo${CURSOR_SYMBOL}
        `);
        expect(result).to.include("foo", "for")
    });

    it('should return list that includes function names', () => {
        const result = returnSuggestions(
            `function hello() {
                return 1
            }

            async function hi() {
                return 2
            }

            const hey = () => {return 100}

            h${CURSOR_SYMBOL}
        `);
        expect(result).to.include("hello", "hey", "hi")
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

        let user = new Us${CURSOR_SYMBOL}
        `);
        expect(result).to.include("User")
    });

    it('should include function parameters if cursor in function body', () => {
        const result = returnSuggestions(
            `
            function foo(one, two, three) {
                thr${CURSOR_SYMBOL}
            }
        `);
        expect(result).to.include("three")
    });

    it('should include arrow function parameters if cursor in function body', () => {
        const result = returnSuggestions(
            `
            const foo = (one, two, three) => {
                thr${CURSOR_SYMBOL}
            }
        `);
        expect(result).to.include("three")
    });

    it('should include variables defined in for loop if cursor in loop body', () => {
        const result = returnSuggestions(
            `
            for (let foo = 0; foo < 10; foo++) {
                fo${CURSOR_SYMBOL}
            }
        `);
        expect(result).to.include("foo")
    });
});