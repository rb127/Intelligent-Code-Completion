const acornLoose = require("acorn-loose");

const helloWorld = () => acornLoose.parse("const a = 'Hello World'", {ecmaVersion: 2020});

console.log(helloWorld());

module.exports = {
    helloWorld,
};
