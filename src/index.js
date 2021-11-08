import { parse } from 'acorn-loose';
import { readFileSync, writeFileSync } from 'fs';
import { simple, full, ancestor, fullAncestor, findNodeAt, findNodeAround, findNodeAfter } from 'acorn-walk';

export const returnSuggestions = () => {
    //TODO
}

export const getCursorPosition = () => {
    //TODO
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
    console.log(parsedResult);
    return parsedResult
}

const parsedData = customParse();
console.log(JSON.stringify(parsedData, 0, 2))
writeFileSync("parsedData.json", JSON.stringify(parsedData, 0, 2))


let parsedNode = findNodeAt(parsedData, 64, 65, 'VariableDeclarator')
console.log(parsedNode)

full(parsedData, node => {
    // console.log(`There's a ${node.type} node at ${node.ch}`)

    if(node.type == 'Program'){
        writeFileSync("fullWalk.json", JSON.stringify(node, 0, 2))
        parsedNode = node
    }
    // fullAncestor(node)
  })

let nodeToPrint = ''
  fullAncestor(parsedData, (node, state, ancestors) => {
    // console.log(`There's a ${node.type} node at ${node.ch}`)
    // if(node.type == 'Program'){

    // }
    // const nodeToPrint = node.type == 'Program'? JSON.stringify(node, 0, 2) : ''
    // if(node.type == 'Program'){
    //     writeFileSync("data.json", JSON.stringify(node, 0, 2))
    //     parsedNode = node
    // }
    // fullAncestor(node)
    if(node.start > 63 && node.end < 66)
    {
        console.log('saved')
        console.log(ancestors)
    }
  })
//   console.log(nodeToPrint)

// ancestor(parsedData, {
//     'VariableDeclaration': function (node, parents) {
//       var parent = null;
//       for (var i = parents.length - 1; i >= 0 && parent === null; i--) {
//         if (node.kind === 'var' ? isScope(parents[i]) : isBlockScope(parents[i])) {
//           parent = parents[i];
//         }
//       }
//       parent.locals = parent.locals || {};
//       node.declarations.forEach(function (declaration) {
//         declarePattern(declaration.id, parent);
//       });
//     },
// })

ancestor(parsedData, {
    Literal(_, ancestors) {
        // console.log("This literal's ancestors are:", ancestors.map(n => n.type))
        writeFileSync("ancestors.json", JSON.stringify(ancestors.map(n => n.type), 0, 2))
    }
})

// console.log(JSON.stringify(findNodeAround(parsedData, 61), 0 ,2))
// writeFileSync("fullWalk.json", JSON.stringify(node, 0, 2))


const cursorPos = 69;
let node = findNodeAround(parsedData, cursorPos - 1)
writeFileSync("currentCursorNode.json", JSON.stringify(node, 0, 2))