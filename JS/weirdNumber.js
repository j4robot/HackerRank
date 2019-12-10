'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function numberWeird(num){
    if(num % 2 == 0 && (num >= 2 && num <= 5)){
      return "Not Weird";
    }
    else if(num % 2 == 0 && (num >= 6 && num <= 20)){
      return "Weird";
    }
    else if(num % 2 == 0 && num > 20){
      return "Not Weird";
    }
    return "Weird";
}

function main() {
    const N = parseInt(readLine(), 10);
    console.log(numberWeird(N))
}
