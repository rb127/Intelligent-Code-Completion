import Fuse from "fuse.js";

export function stringMatch(words, searchStr, threshold_score = 0.3, orderedByScope = false) {
    /*
    Perform fuzzy  string matching using the Fuse library
    Params:
        words - A list of words to be searched (our universe)
        searchStr - The Search phrase to search for
        theresholdScore - The error tolerance level (a lesser number is less error tolerant)
    */
    
    let options = {
        includeScore: true,
        minMatchCharLenth: 2,
        shouldSort: !orderedByScope,
        location: 0,
        threshold: threshold_score}
    
    const fuse = new Fuse(words, options)
    const result = fuse.search(searchStr)
    
    let suggestions = []
    result.forEach(element => {
        suggestions.push(element.item)
    });

    return suggestions
}