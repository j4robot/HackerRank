// function matchingStrings(strings, queries) {
//     let temp = {}, count = 0;
//     queries.forEach(que => {
//         strings.forEach(str => {
//             temp[que] = temp[que]
//             if (que == str) {
//                 temp[que] = temp[que] ? 0 : temp[que] + 1
//             }

//             console.log(count, temp)
//         });
//     });
// }

let str = ['aba', 'ops', 'aba', 'kj'];
let que = ['aba', 'kj'];

//matchingStrings (str, que)

function matchingStrings1(strings, queries) {
    let temp = [];
    queries.forEach(que => {
        let fil = strings.filter(str => str === que).length;
        temp.push(fil);
    });
    return temp;
}




function matchingStrings(strings, queries) {
   return queries.map( item => (strings.filter(value => value === item).length))
}

console.log(matchingStrings1(str, que));

console.log(matchingStrings(str, que))