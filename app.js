const profileDataArgs = process.argv.slice(2, process.argv.length);
//const name = profileDataArgs[0] lines 2 and 3 are a different way of writing line 4, but is the same thing
//const github = profileDataArgs[1]
const [name, github] = profileDataArgs

// this function will recieve the command line argument and inserst them in a html termplate literal
const generatePage = (userName, githubName) => {
  return `
  <!DOCTYPE html> 
  <html lang="en"> 
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Portfolio Demo</title>
  </head>

  <body>
  <h1>${name}</h1>
  <h2><a href="https://github.com/${github}">Github</a></h2>
</body>
</html>
`
};
 console.log(name, github)
console.log(generatePage(name,github));


// console.log(profileDataArgs)
// const printProfileData = (profileDataArr)=>{
//     for (let i = 0; i < profileDataArr.length; i+=1){
//        console.log(profileDataArr[i])
//     }
//    console.log('============')
// //is the same as this...
// profileDataArr.forEach(profileItem => console.log(profileItem))
// }
//printProfileData(profileDataArgs)
