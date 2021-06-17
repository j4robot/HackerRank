function numberPlayers(k, scores) {
    scores.sort((a, b) => a - b).reverse();
    const getKey = (object, value) => Object.keys(object).find(key => object[key] === value), newScores = [...new Set(scores)].map((x, i) => { return { [i + 1]: x } })
    let levels = [];
    for (let score of scores)
        for (let newScore of newScores)
            levels.push(getKey(newScore, score))
    levels = levels.filter(x => x != undefined).map(x => Number(x));

    levels.forEach((x, index) => {
        if(levels[index + 1 == undefined ? index - 1 : index + 1] == levels[index]){
            levels[index + 2] = index + 3
        }
    })

    levels.sort((a, b) => a - b);
    console.log(levels);

    let count = 0
    for (let level of levels)
        if (level <= k)
            count++
    return count;
}

let score1 = [20, 40, 60, 80, 100];
let score2 = [100, 50, 50, 25];
let score3 = [4,5,2,2,2,4,5]

// console.log(numberPlayers(4, score1));
// console.log(numberPlayers(3, score2));

let p = numberPlayers(3, score3)
console.log(p);


