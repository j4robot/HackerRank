# name => sting, age => int, level => int, courses => list, school => string 
# Create a function in the class called 'student_date' which returns a dictionary of all the collected info
# Create another function called 'age_plus_ten' that adds ten to the students age and returns it

class Student:
    def __init__(self,name,age,level,courses,school):
        self.name = name
        self.age = age
        self.level = level
        self.courses = courses
        self.school = school
        
    def student_data (self):
        student_dict = {'name':self.name, 'age':self.age, 'level':self.level, 'courses':self.courses, 'school':self.school}
        return student_dict
    
    def age_plus_ten(self):
       new_age = self.age + 10
       return new_age
   
    def student_date_without_name(self):
        student_dict = {'age':self.age, 'level':self.level, 'courses':self.courses, 'school':self.school}
        return student_dict
     
     
ab = Student('susan', 21, 200, ['english','science','math','history'], 'university of ghana')
abc = Student('kofi', 18, 100, ['english','science','math','history'], 'university of congo')

print(ab.student_date_without_name())

print (ab.age_plus_ten())




    



       
       

        
        
        
        
        