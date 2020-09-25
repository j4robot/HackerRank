import sys

def get_min_opration(arr, threshold, d): 
      
    vals = [[] for _ in range(200001)] 
    for i in range(threshold): 
        x = arr[i] 
        cur = 0
        while (x > 0): 
            vals[x].append(cur) 
            x //= 2
            cur += 1
    ans = sys.maxsize 
    for i in range(200001): 
        vals[i] = sorted(vals[i]) 
    for i in range(200001): 
        if (int(len(vals[i])) < d): 
            continue
        sum = 0
        for j in range(d): 
            sum += vals[i][j] 
        
        ans = min(ans, sum)
    if ans > threshold:
        ans = (threshold + 1)
    elif ans < threshold:
        ans = (ans + 1)

    return ans 

# arr = [4, 64, 30, 25, 33]
arr = [1, 2, 3, 4, 5 ]

print(get_min_opration(arr, 3, 2))


