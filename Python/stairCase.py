#!/bin/python3

import math
import os
import random
import re
import sys

# Complete the staircase function below.
def staircase(n):
    for z in range(n -1, -1, -1):
        hl = "#" * int(math.fabs(z - n))
        print(hl.rjust(n))

if __name__ == '__main__':
    n = int(input())

    staircase(n)
