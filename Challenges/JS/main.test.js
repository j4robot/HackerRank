function minOperation(arr, threshold, d){
    let temp = [];
    for(let x = 0; x < arr.length; x++){
        if(arr[x] > threshold){
            let ans =  Math.floor(arr[x] / d);
            temp.push(ans);
        }
        else{
            temp.push(arr[x])
        }
    }

    return temp;//temp.includes(Math.max(...temp) > threshold) ? minOperation(temp, threshold, d) : temp;
}

let arr = [4, 64, 30, 25, 33]

let ans = minOperation(arr, 3, 2)

//Math.ceil
console.log(ans)