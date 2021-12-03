import { parse } from 'acorn-loose';
import { readFileSync, writeFileSync } from 'fs';
import { fullAncestor, findNodeAround, } from 'acorn-walk';
import { stringMatch } from './stringMatching.js'
import { addKeywords } from './keywords.js';

export const CURSOR_SYMBOL = '@'
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
export const getCursorNode = (parsedData, cursorPos) => {
    let cursorNode = findNodeAround(parsedData, cursorPos - 1)
    writeFileSync("currentCursorNode.json", JSON.stringify(cursorNode, 0, 2))
    return cursorNode
}

export const returnSuggestions = (file) => {
    // check validity of input
    let masterList = []
    const cursorPosition = getCursorPosition(file)
    // no cursor symbol found 
    if (cursorPosition === -1) {
        console.log(`No cursor symbol (${CURSOR_SYMBOL}) found \nSuggestions: []`)
        return []
    }
    const referenceString = getReferenceString(file, cursorPosition)

    if (referenceString == "") {
        console.log("whitespace found before cursor \nSuggestions: []")
        return []
    }

    const parsedData = parseInputFile(file);

    const cursorNode = getCursorNode(parsedData, cursorPosition)

    writeFileSync("parsedData.json", JSON.stringify(parsedData, 0, 2))

    const addNamesToMasterList = (paramsList) => {
        if(paramsList.length){
            paramsList.forEach(parameter => {
                if(parameter.type === "Identifier"){
                    masterList.push(parameter.name)
                }
                else if (parameter.type === "AssignmentPattern"){
                    masterList.push(parameter.left.name)
                }
            })
        }
    }

    fullAncestor(parsedData, (node, err, ancestors) => {
        // Looking for cursor node 
        if (node.type == cursorNode.node.type && node.start == cursorNode.node.start && node.end == cursorNode.node.end) {
            for (let i = ancestors.length - 1; i >= 0; i--) {
                const ancestor = ancestors[i]
                if (ancestor.type === 'ForStatement') {
                    if (ancestor.init.type === 'VariableDeclaration') {
                        ancestor.init.declarations.forEach((variable => {
                            masterList.push(variable.id.name) 
                        }))          
                    }
                }
                else if (ancestor.type === "ArrowFunctionExpression"){
                   addNamesToMasterList(ancestor.params)
                }
                else if (ancestor.type === "FunctionExpression"){
                    addNamesToMasterList(ancestor.params)
                }
                else {
                    if ("body" in ancestor && (ancestor.type === 'BlockStatement' || ancestor.type === 'Program')) {
                        try{
                        for (const subNode of ancestor.body) {
                            if (subNode.type === 'VariableDeclaration') {
                                subNode.declarations.forEach((variable => {
                                    masterList.push(variable.id.name) 
                                }))
                            }
                            else if (subNode.type === 'ClassDeclaration') {
                                masterList.push(subNode.id.name)
                            }
                            else if (subNode.type === 'FunctionDeclaration') {
                                masterList.push(subNode.id.name)
                                addNamesToMasterList(subNode.params)
                            }
                            else if (subNode.type === 'ImportDeclaration') {
                                masterList.push(subNode.specifiers[0].local.name)
                            }
                        }
                    }
                    catch(err){
                        console.log("error", err)
                        console.log("ancestor", ancestor)
                    }
                    }
                }

            }
            console.log("Reference string:",referenceString)
            console.log("Master list of all possible suggestions:", masterList)
            writeFileSync("fullAncestor.json", JSON.stringify(ancestors, 0, 2))
        }
    })
    masterList = addKeywords(masterList)
    return stringMatch(masterList, referenceString)

}

const result = returnSuggestions(readInputFile())

console.log("Relevant Suggestions with keywords:",result)