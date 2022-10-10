const fs = require('fs')
const generatePage = require('./src/page-template')

const profileDataArgs = process.argv.slice(2);
//const name = profileDataArgs[0] lines 2 and 3 are a different way of writing line 4, but is the same thing
//const github = profileDataArgs[1]
const [name, github] = profileDataArgs

const pageHTML = generatePage(name, github)
// the first thing in the argument is going to be the file name, (index.html)
//the second argument is the data thats being written (generatePage)(everything that is in the generatepage function)
// the third argument is the callback funtion that handles any errors and success messages. 
fs.writeFile('index.html',pageHTML, err =>{
  if (err)throw err

console.log('portfolio complete! checkout index.html to see the output!');
})


