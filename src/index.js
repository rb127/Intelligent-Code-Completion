import { parse } from 'acorn-loose';
import { readFileSync } from 'fs';
import { simple, full, ancestor } from 'acorn-walk';

const readInputFile = () => {
    try {
        return readFileSync('src/input.js', 'utf-8')
    } catch (err) {
        console.error(err)
    }
}

export const customParse = () => {
    const parsedResult = parse(readInputFile(), { ecmaVersion: 2020 });
    console.log(parsedResult);
    return parsedResult
}

const parsedData = customParse();

simple(parsedData, {
    Literal(node) {
        console.log(`Found a literal: ${node.value}`)
    }
})

ancestor(parsedData, {
    Literal(_, ancestors) {
        console.log("This literal's ancestors are:", ancestors.map(n => n.type))
    }
})
