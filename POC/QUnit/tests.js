import {GenerateUnitTest} from './main.min.js'

function add(a, b) {
    return a + b;
}

const multiply = (a, b) => a * b;

GenerateUnitTest('multiply', 'multiply two numbers', multiply, [5, 5], 22);

GenerateUnitTest('add', 'should add two numbers', add, [1, 1], 2);