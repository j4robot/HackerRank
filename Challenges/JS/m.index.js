import {print} from './main.js';
/*
 * Complete the simpleArraySum function below.
 */
function simpleArraySum(ar) {
    let total = 0;
    for(let x = 0; x < ar.length; x++){
        total += ar[x];
    }
    return total;

}

let arrData = [1, 2, 3, 4, 10, 11];
console.log(simpleArraySum(arrData));
