
// [0] - [1] - [3] - [4] - [6]
console.log(jumpingOnClouds(data3));

export function jumpingOnClouds(data) {
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