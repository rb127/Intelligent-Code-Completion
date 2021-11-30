import { parse } from 'acorn-loose';
import { readFileSync, writeFileSync } from 'fs';
import { simple, full, ancestor, fullAncestor, findNodeAt, findNodeAround, findNodeAfter } from 'acorn-walk';

const CURSOR_SYMBOL = '^'

/* 
fileContents: Input file read as String
Returns cursor position as denoted by CURSOR_SYMBOL if present
Returns -1 if no cursor symbol present
*/
export const getCursorPosition = (fileContents) => {
    return fileContents.indexOf(CURSOR_SYMBOL)
}

const readInputFile = () => {
    try {
        return readFileSync('src/input.js', 'utf-8')
    } catch (err) {
        console.error(err)
    }
}

export const customParse = () => {
    const parsedResult = parse(readInputFile(), { ecmaVersion: 2020 });
    return parsedResult
}

const parsedData = customParse();
writeFileSync("parsedData.json", JSON.stringify(parsedData, 0, 2))

let parsedNode = findNodeAt(parsedData, 64, 65, 'VariableDeclarator')
// console.log(parsedNode)

/*
Returns the word just before the cursor.
Returns '' if there is a space just before cursor instead of a word.
*/
export const getReferenceString = (fileContents, cursorPos) => {
    var preCursorContent = fileContents.substring(0, cursorPos);
    if (preCursorContent.indexOf(" ") > 0) {
        const content = preCursorContent.split(" ");
        return content[content.length - 1];
    }
    else {
        return preCursorContent;
    }
}

full(parsedData, node => {
    // console.log(`There's a ${node.type} node at ${node.ch}`)

    if (node.type == 'Program') {
        writeFileSync("fullWalk.json", JSON.stringify(node, 0, 2))
        parsedNode = node
    }
})

fullAncestor(parsedData, node => {
    // console.log(`There's a ${node.type} node at ${node.ch}`)

    if (node.type == 'Program') {
        writeFileSync("fullAncestor.json", JSON.stringify(node, 0, 2))
        parsedNode = node
    }
})

// Template code for future use
// let nodeToPrint = ''
//   fullAncestor(parsedData, (node, state, ancestors) => {
//     // console.log(`There's a ${node.type} node at ${node.ch}`)
//     // if(node.type == 'Program'){

//     // }
//     // const nodeToPrint = node.type == 'Program'? JSON.stringify(node, 0, 2) : ''
//     // if(node.type == 'Program'){
//     //     writeFileSync("data.json", JSON.stringify(node, 0, 2))
//     //     parsedNode = node
//     // }
//     // fullAncestor(node)
//     if(node.start > 63 && node.end < 66)
//     {
//         console.log('saved')
//         console.log(ancestors)
//     }
//   })

ancestor(parsedData, {
    Literal(_, ancestors) {
        // console.log("This literal's ancestors are:", ancestors.map(n => n.type))
        writeFileSync("ancestors.json", JSON.stringify(ancestors.map(n => n.type), 0, 2))
    }
})

// How to find cursor node given a cursor position
const cursorPos = 69;
let node = findNodeAround(parsedData, cursorPos - 1)
writeFileSync("currentCursorNode.json", JSON.stringify(node, 0, 2))

export const returnSuggestions = () => {
    //TODO
    // check validity of input
    const file = readInputFile()
    const cursorPosition = getCursorPosition(file)
    // no caret symbol found 
    if (cursorPosition === -1) {
        console.log("No cursor position (caret symbol) found \nSuggestions: []")
        return []
    }

    console.log("Cursor position is at", cursorPosition)
    console.log("Reference string is", getReferenceString(file, cursorPosition))
}

returnSuggestions()