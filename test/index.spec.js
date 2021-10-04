const assert = require('assert');
const { expect } = require('chai');
const { helloWorld } = require('../src/index')

describe('helloWorld', () => {
    it('should return a parsed object of the program', () => {
        console.log("Running Test")
        const result = helloWorld();
        expect(result.body[0].declarations[0].init.value).to.equal("Hello World")
    });
});
