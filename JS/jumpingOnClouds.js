let data = [0, 0, 1, 0, 0, 1, 0];
let data2 = [0, 0, 0, 0, 1, 0];
let data3 = '0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 1 0 1 0 0 0 1 0 0 1 0 0 0 1 0 1 0 0 0 0 0 0 0 0 1 0 0 1 0 1 0 0'.split(' ').map(x => Number(x));

// [0] - [1] - [3] - [4] - [6]
console.log(jumpingOnClouds(data3));

function jumpingOnClouds(data) {
    let len = data.length, count = 0, state = 0;

    data.forEach((item, index) => {
        if (!(state >= len)) {
            if (data[state + 2] === 0) {
                state += 2, count++
            } else {
                if (data[state + 1] === 0) {
                    state += 1, count++
                }
            }
        }
    });

    return count;
}

let d = [1, 2, 3, 4, 10, 11].reduce((a, b) => a + b);

console.log(d)