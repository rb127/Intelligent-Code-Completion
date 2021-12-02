import { parse } from 'acorn-loose';
import { readFileSync, writeFileSync } from 'fs';
import { simple, full, ancestor, fullAncestor, findNodeAt, findNodeAround, findNodeAfter } from 'acorn-walk';
import { stringMatch } from '../src/stringMatching.js'

const CURSOR_SYMBOL = 'Ʌ'
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

export const parseInputFile = (fileContents) => {
    const parsedResult = parse(fileContents, { ecmaVersion: 2021 });
    return parsedResult
}


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

// How to find cursor node given a cursor position
const getCursorNode = (parsedData,cursorPos) => {
    let cursorNode = findNodeAround(parsedData, cursorPos - 1)
    writeFileSync("currentCursorNode.json", JSON.stringify(cursorNode, 0, 2))
    return cursorNode
}

export const returnSuggestions = (file) => {
    //TODO
    // check validity of input
    let masterList = []
    // const file = readInputFile()
    const cursorPosition = getCursorPosition(file)
    // no caret symbol found 
    if (cursorPosition === -1) {
        console.log("No cursor position (caret symbol) found \nSuggestions: []")
        return []
    }

    console.log("Cursor position is at", cursorPosition)
    const referenceString = getReferenceString(file, cursorPosition)
    console.log("Reference string is", referenceString)
    if (referenceString == ""){
        console.log("whitespace found before cursor \nSuggestions: []")
        return []
    }

    const parsedData = parseInputFile(file);
    // console.log(parsedData)
    const cursorNode = getCursorNode(parsedData, cursorPosition)

    const nodeTypeFn = new Function(cursorNode.node.type)
    console.log(nodeTypeFn)
    console.log(cursorNode.node.start)

    writeFileSync("parsedData.json", JSON.stringify(parsedData, 0, 2))
    
    fullAncestor(parsedData, (node, err, ancestors) => {
        // console.log(`There's a ${node.type} node at ${node.ch}`)

        if (node.type == cursorNode.node.type && node.start == cursorNode.node.start && node.end == cursorNode.node.end) {
            console.log("Found Cursor node")
            // console.log(ancestors)
            for (let i = ancestors.length - 1; i >= 0; i--) {
                const ancestor = ancestors[i]
            // }            
            // for (const ancestor of ancestors) {
                if ("body" in ancestor && ancestor.type !== 'FunctionDeclaration'){                
                    for (const subNode of ancestor.body){
                        if (subNode.type === 'VariableDeclaration') {
                            masterList.push(subNode.declarations[0].id.name)
                        }
                        else if (subNode.type === 'ClassDeclaration') {
                            masterList.push(subNode.id.name)
                        }
                        else if (subNode.type === 'FunctionDeclaration') {
                            masterList.push(subNode.id.name)
                        }
                        else if (subNode.type === 'ImportDeclaration') {
                            masterList.push(subNode.specifiers[0].local.name)
                        }
                    }
                }
            }
            console.log("MASTER", masterList)
            writeFileSync("fullAncestor.json", JSON.stringify(node))
        }
    })
    return stringMatch(masterList, referenceString)

}

const result = returnSuggestions(readInputFile())

console.log(result)