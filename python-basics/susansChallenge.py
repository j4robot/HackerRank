'''
Write an object-oriented Python program to register how long an accu of your notebook works.
 
1. At the start write the actual date and time to the screen.
 
2. Write this date and time in this file too:  C:\Temp \ accu_check.txt
The earlier content should be deleted.
 
3. The program should wait one minute.
 
4. Write the actual date and date to the screen, and append it to the end of the file again.
 
5. Repeat the steps 2 and 3 until Ctrl-C or until power off.
 
6. Expand the program. Ask the user at the beginning, how long (how many seconds) should be waited in the point 2.
Accept only numbers between 10 and 120. By input other numbers or letters ask it again until the correct input.
'''

import datetime
import time

class Accu :
    def __init__(self):
        self.dateTime = str(datetime.datetime.now())
        
    def accu_check(self):
        while True:
            timer = int(input('how many seconds do you want to wait? '))
            if timer>10 and timer<120:
                while timer != 0:
                    timer -= 1
                    time.sleep(1)
                    
                if(timer == 0):
                    print(self.dateTime)
                    write_time = open("accu_check.txt", 'w')
                    write_time.write(self.dateTime)
                    write_time.close()
                    
            else :
                print('input a number between 10 and 120')
            
                
Accu().accu_check() 


    
        

        
        
'''

kk = open("accu_check.txt", 'w')

userInput = input('Please type anything: ')

kk.write(userInput)
kk.close()

'''
        
        
        