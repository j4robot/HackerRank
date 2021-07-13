import {assertEqual, assertDeepEqual} from './main.min.js'

function add(a, b) {
    return a + b;
}

const multiply = (a, b) => a * b;

assertEqual('multiply', 'multiply two numbers', () => multiply(5, 5), 25);

assertEqual('add', 'should add two numbers', () => add(5, 5), 10);

assertDeepEqual('data', 'should show array', () => [1,2,3,4], [1,2,3,4]);