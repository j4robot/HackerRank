koko = {'name': 'Susan Koko', 'age': 21, 'favoriteFoods': {"localFoods": ['Banku', 'Fufu'], "continentalFoods": ['Sushi', 'Fried Rice']}, 'currentLocation': 'Accra, Teshie'}

# You can access a value using the key.
# For example we can access the favorite foods using it's key 'favoriteFoods'

# print(koko['favoriteFoods'])

# Create a dictionary called 'animals' with two keys, 'wildAnimals' and 'domesticAnimals'.
# Both keys should have a value of an empty list.
# Use the key to access 'Wild animals' and append names of animals that fall in this group
#  Do the same for the 'domestic animal' too
# Print out the 'animals'

animals = {'wildAnimals': [], 'domesticAnimals': []}

animals['wildAnimals'].append('Snake')
animals.get('wildAnimals').append('Lion')
animals.get('wildAnimals').append('Cheetah')
animals.get('wildAnimals').append('Falcon')
animals.get('wildAnimals').append('Shark')

animals.get('domesticAnimals').append('Cat')
animals.get('domesticAnimals').append('Sheep')
animals.get('domesticAnimals').append('Cow')
animals.get('domesticAnimals').append('Chicken')
animals.get('domesticAnimals').append('Goat')

print(animals)


# Create an empty list called 'list_one'
# Create a dictionary called 'my_information' with the following keys:
# 'fullname' => string
# 'age' => int
# 'school' => string
# 'courses' => list of strings
# 'fovoriteMovies' => list of strings or bool if none

# Append 'my_information' to 'list_one'
# Append 'my_information' to 'list_one' again and print out 'list_one'
# Access  'fovoriteMovies' in the second index of 'list_one' and print it out 
