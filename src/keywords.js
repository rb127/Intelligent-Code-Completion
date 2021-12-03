let keywords = ["abstract", "arguments", "await",
"boolean", "break", "byte", "case", "catch",
"char", "class", "const", "continue", "debugger", "default", "delete", "do",
"double", "else", "enum", "eval", "export", "extends", "false", "final",
"finally", "float", "for", "function", "goto", "if", "implements", "import",
"in", "instanceof", "int", "interface", "let", "long", "native", "new",
"null", "package", "private", "protected", "public", "return", "short", "static", 
"super", "switch", "synchronized", "this", "throw", "throws", "transient", "true",
"try", "typeof", "var", "void", "volatile", "while", "with", "yield"]


export function addKeywords(words, keywordsToAdd=keywords) {
    /*
    Append Javascript Keywords and Reserved Words to the suggesstions list
    Params:
        words - A list of words to be searched (our universe)
        keywords - A list of keywords to include (default ECMA6 Javascript Reserve Words)
    */
    
    words = words.concat(keywordsToAdd)
    return words

}