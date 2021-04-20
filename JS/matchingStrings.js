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