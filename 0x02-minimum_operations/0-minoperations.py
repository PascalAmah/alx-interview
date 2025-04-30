#!/usr/bin/python3
"""
0-minoperations
Calculates the fewest number of operations needed to result in
exactly n H characters using Copy All and Paste.
"""

def minOperations(n):
    if n <= 1:
        return 0

    ops = 0
    factor = 2

    while n > 1:
        while n % factor == 0:
            ops += factor
            n //= factor
        factor += 1

    return ops
