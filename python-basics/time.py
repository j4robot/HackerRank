import time

months = []

ticks = time.time()

localtime = time.localtime(ticks)

print(localtime.tm_mon)


readable_time = time.asctime(localtime)

# print(ticks)
# print(localtime)
# print(readable_time)



