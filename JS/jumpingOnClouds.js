//let data = '0 0 1 0 0 1 0'.split(' ').map(x => Number(x));

let data = [1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0];

let data2 = [0, 0, 0, 0, 1, 0];

let data3 = '0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 1 0 1 0 0 0 1 0 0 1 0 0 0 1 0 1 0 0 0 0 0 0 0 0 1 0 0 1 0 1 0 0'.split(' ').map(x => Number(x));
// 28 

console.log('****************************');
console.log(jumpingOnClouds(data3));
console.log('****************************');
console.log(jumpingOnClouds1(data3));

function jumpingOnClouds(data) {
    let len = data.length, count = 0, first = data[0], state = 0;
    for (let i = 0; i < len; i++) {

        if(!(state == len)){
            if (data[state + 2] === 0) {
                state += 2;
                count++;
            } else {
                state += 1;
                if (data[state + 1] === 0) {
                    count++;
                }
            }
        }
    }

    if (first === 0) {
        count++
    }

    return count;
}

/*
function jumpingOnClouds(data) {
    let len = data.length, count = 0, state = 0;

    data.forEach((item, index) => {
        if (!(state >= len)) {
            if (data[state + 2] === 0) {
                state += (index + 2)
                count++
            } else {
                if (data[state + 1] === 0) {
                    state += (index + 1)
                    count++
                }
            }
        }
    });

    return count;
}
*/