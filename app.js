const inquirer = require("inquirer");
// const fs = require('fs')
// const generatePage = require('./src/page-template')

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
    },

    {
      type: "input",
      name: "github",
      message: "What is your Github Username?",
    },

    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself:",
    },
  ]);
};

const promptProject = (portfolioData) => {
  console.log(`
  ===================
   Add a new Project
  ===================
  `);

  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
  portfolioData.projects = [];
  }

  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "what is the name of your project?",
    },

    {
      type: "input",
      name: "description",
      message: "provide a description of the project (required)",
    },

    {
      type: "checkbox",
      name: "languages",
      message: "What did you build this project with? (check all that apply)",
      choices: [
        "JavaScript",
        "HTML",
        "CSS",
        "ES6",
        "jQuery",
        "Bootstrap",
        "Node",
      ],
    },

    {
      type: "input",
      name: "link",
      message: "enter the Github link to your project. (Required)",
    },

    {
      type: "confirm",
      name: "feature",
      message: "would you like to feature this project?",
      default: false,
    },

    {
      type: "confirm",
      name: "confirmAddProject",
      message: "would you like to enter another project?",
      default: false,
    },
  ])
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  });
};
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData)
  })

// // const profileDataArgs = process.argv.slice(2);
// // //const name = profileDataArgs[0] lines 2 and 3 are a different way of writing line 4, but is the same thing
// // //const github = profileDataArgs[1]
// // const [name, github] = profileDataArgs

// const pageHTML = generatePage(name, github)
// // the first thing in the argument is going to be the file name, (index.html)
// //the second argument is the data thats being written (generatePage)(everything that is in the generatepage function)
// // the third argument is the callback funtion that handles any errors and success messages.
// fs.writeFile('index.html',pageHTML, err =>{
//   if (err)throw err

// console.log('portfolio complete! checkout index.html to see the output!');
// })
