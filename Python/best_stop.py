# def some(heights, store):
#     r, c = map(int, input().split())
#     l, t, smallest_sum, point = [], [], None, None

#     for i in range(r):
#         l.append(list(map(int,input().split())))

def bestSpot(heights, store):
    #
    # Write your code here.
    divide = (len(heights)-len(store)+1)
    ar = [0] * pow(divide,2)
    for i in range(len(ar)):
        for x in range(len(store)**2):
            ar[i] += pow(heights[int(i / divide) + int(x / len(store))][i % divide + x % len(store)] - store[int(x / len(store))][x % len(store)], 2)
    print(min(ar))
    print(int(ar.index(min(ar)) / divide) + int((len(store)*2 -1) / len(store)),ar.index(min(ar)) % divide + (len(store)*2 -1) % len(store))
    #


def two():
    r, c = map(int, input().split())
    l, t, smallest_sum, point = [], [], None, None

    for i in range(r):
        l.append(list(map(int,input().split())))

    h, w = map(int, input().split())
    for i in range(h):
        t.append(list(map(int,input().split())))

    for i in range(r - h + 1):
        for j in range(c-w+1):
            temp_sum = 0
            for m in range(h):
                for n in range(w):
                    temp_sum += (l[i+m][j+n] - t[m][n])**2
            if smallest_sum == None or smallest_sum > temp_sum:
                    smallest_sum = temp_sum
                    point = i,j,
    print("{}\n{} {}".format(smallest_sum, point[0]+1, point[1]+1))