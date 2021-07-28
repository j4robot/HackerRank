'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the compareTriplets function below.
function compareTriplets(a, b) {

    let alice = 0, bob = 0, arr = [];

    for(let x = 0; x <= 3; x++){
        if(a[x] > b[x]){
            alice += 1;
        }
        else if(a[x] == b[x]){
            alice, bob += 0;
        }
        else if(a[x] < b[x]){
            bob += 1;
        }
    }
    arr.push(alice, bob)
    return arr;
}

console.log(compareTriplets([17, 28, 30], [99, 16, 8]))

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

const a = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));

    const b = readLine().replace(/\s+$/g, '').split(' ').map(bTemp => parseInt(bTemp, 10));

    const result = compareTriplets(a, b);

    ws.write(result.join(' ') + '\n');

    ws.end();
}

