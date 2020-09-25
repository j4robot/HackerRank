def fizzBuzz(n):
    for i in range(1, n + 1):
        if i % 3 == 0 and i % 5 == 0:
            print("FizzBuzz")
        elif i % 3 == 0 and not i % 5 == 0:
            print('Fizz')
        elif not i % 3 == 0 and i % 5 == 0:
            print('Buzz')
        elif not i % 3 == 0 and not i % 5 == 0:
            print(i)   

# fizzBuzz(15)
    


def reverse_words_order_and_swap_cases(sentence):
    sentences = sentence.split()
    sentences = sentence.split()
    sentences.reverse()
    sentences = ' '.join(sentences)
    swapped = []
    for char in sentences:
        if char.islower():
            swapped.append(char.upper())
        elif char.isupper():
            swapped.append(char.lower())
        else:
            swapped.append(char)

    return ''.join(swapped)

# print(reverse_words_order_and_swap_cases("aWESOME is cODING"))


# class MyClass:
#  Greeting = "
#  def __init__(self, Name="there"):
#   self.Greeting = Name + "!"
#  def SayHello(self):
#   print("Hello {0}".format(self.Greeting))

#   class Rectangle:
#     pass

import math
class Rectangle():
    def __init__(self, width, length):
        self.length = length
        self.width = width

    def area(self):
        return self.length * self.width


class Circle():
    
    def __init__(self, radius):
        self.radius = float(radius)

    def area(self):
        return round(self.radius ** 2 * math.pi, 2)

rect = Rectangle(5, 7)
print(rect.area())

circle = Circle(1000)
print(circle.area())

