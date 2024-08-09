function generateRandomNumber(num) {
    // Gets # from 0 -> num - 1
    return Math.floor(Math.random() * num)
  }
  
  const randomAnimals = {
    animal: ['monkey', 'piranha', 'parrot', 'gecko', 'bear'],
    habitat: ['jungle', 'arctic', 'sea', 'desert', 'mountains'],
    diet: ['insects', 'fruit', 'fish', 'humans']
  }
  
  // Store the animal in an array
  let yourAnimal = []
  
  // Iterate over the object
  for(let prop in randomAnimals) {
    let optionIdx = generateRandomNumber(randomAnimals[prop].length)
  
    // use the object's properties to customize the animal being added to yourAnimal  
    switch(prop) {
      case 'animal':
        yourAnimal.push(`Your animal is a "${randomAnimals[prop][optionIdx]}".`)
        break
      case 'habitat':
        yourAnimal.push(`It lives in the: "${randomAnimals[prop][optionIdx]}".`)
        break
      case 'diet':
        yourAnimal.push(`It eats: "${randomAnimals[prop][optionIdx]}".`)
        break
      default:
        yourAnimal.push('There are no animals.')
    }
  }
  
  function formatAnimals(animal) {
    const formatted = yourAnimal.join('\n')
    console.log(formatted)
  }
  
  formatAnimals(yourAnimal);