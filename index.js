var acornLoose = require("acorn-loose");

const test_al = acornLoose.parse('Hello World', {ecmaVersion: 2020});

console.log(test_al);