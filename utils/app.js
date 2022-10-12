const inquirer = require("inquirer");
const generateSite = require('./utils/generate-site.js')
const generatePage = require("../src/page-template");

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("please enter your name");
          return false;
        }
      },
    },

    {
      type: "input",
      name: "github",
      message: "What is your Github Username?",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("please enter your name");
          return false;
        }
      },
    },
    {
      type: "confirm",
      name: "confirmAbout",
      message:
        "would you like to enter some information about yourself for an About section?",
      default: true,
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself:",
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      },
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
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("please enter your name");
            return false;
          }
        },
      },

      {
        type: "input",
        name: "description",
        message: "provide a description of the project (required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("please enter a description");
            return false;
          }
        },
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
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("please enter your link");
            return false;
          }
        },
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
    .then((projectData) => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};
//use promises to right the callback functions
promptUser()
.then(promptProject)
.then(portfolioData =>{
  return generatePage(portfolioData)
})

.then(pageHTML =>{
  return writeFile(pageHTML)
})

.then(writeFileResponse =>{
  console.log(writeFileResponse)
  return copyFile()
})

.then(copyFileResponse => {
  console.log(copyFileResponse)
})

.catch(err => {
  console.log(err)
})


// this is a callback function inside of a callback funtion inside of a callback function. (dont do this!)
// promptUser()
//   .then(promptProject)
//   .then(portfolioData => {

//     const pageHTML = generatePage(portfolioData);

//     fs.writeFile('./dist/index.html', pageHTML, err => {
//       if (err) {
//         console.log(err);
//         return;
//       }
//       console.log('Page created! Check out index.html in this directory to see it!');
    
//       fs.copyFile('./src/style.css', './dist/style.css', err => {
//         if (err) {
//           console.log(err);
//           return;
//         }
//         console.log('Style sheet copied successfully!');
//       });
//     })
//   });
