import { parse } from 'acorn-loose';
import { readFileSync } from 'fs';

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
customParse();
