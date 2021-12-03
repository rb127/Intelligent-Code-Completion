import { expect } from 'chai'
import { returnSuggestions } from '../src/index.js'

describe('returnSugestions (Acceptance Tests)', () => {
    it('should return empty list if file is empty', () => {
        const result = returnSuggestions(` Ʌ`);
        expect(result).to.have.lengthOf(0)
    });

    it('should return empty list if no cursor found', () => {
        const result = returnSuggestions(`const foo = bar;`);
        expect(result).to.have.lengthOf(0)
    });

    it('should return empty list if no matches found', () => {
        const result = returnSuggestions(
            `const abc = "foo";
             foobarbazɅ
        `);
        expect(result).to.have.lengthOf(0)
    });

    it('should return empty list if no character before cursor', () => {
        const result = returnSuggestions(
            `const foo = "bar";
             const a = fo Ʌ
        `);
        expect(result).to.have.lengthOf(0)
    });

    it('should return empty list if cursor is in commented code', () => {
        const result = returnSuggestions(
            `\\ import parse from 'acorn-loose';
        \\ import * as promises from 'node:fs/promises
        \\ const foo = "hello world"
        \\ foɅ 
        `);
        expect(result).to.have.lengthOf(0)
    })

    it('should return list of keywords after character', () => {
        const result = returnSuggestions(
            `const foo = cɅ
        `);
        expect(result).to.have.members(["case", "catch", "char", "class", "const", "continue"])
    });

    it('should return matched suggestions as case insensitive', () => {
        const result = returnSuggestions(
            `const PIZZa = "Thin crust" 
             const pico = "pizza store"
             piɅ
        `);
        expect(result).to.include("PIZZa", "pico")
    });

    it('should return matched suggestions even if code is broken/incomplete before cursor',
        () => {
            const result = returnSuggestions(
                `const Pizza = "Thin crust"; 
             const pico = ;
             piɅ
        `);
            expect(result).to.include("Pizza", "pico")
        });

    it('should return matched suggestions even if code is broken/incomplete after cursor',
        () => {
            const result = returnSuggestions(
                `const Pizza = "Thin crust" 
             piɅ
             const pico = ;
        `);
            expect(result).to.contain("Pizza", "pico")
        });

    it('should return list that includes matched imported libraries', () => {
        const result = returnSuggestions(
            `import parse from 'acorn-loose';
            import * as promises from 'node:fs/promises;
            
            pɅ
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
                        fooɅ
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
                    const fooɅ;
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
        foɅ 
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

            hɅ
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

        let user = new UsɅ
        `);
        expect(result).to.include("User")
    });
});