const inquirer = require("inquirer");
const fs = require("fs");
const generatePage = require("./src/page-template");

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
promptUser()
  .then(promptProject)
  .then((portfolioData) => {

    const pageHTML = generatePage(portfolioData);

    fs.writeFile("./index.html", pageHTML, (err) => {
      if (err) throw new Error(err);

      console.log(
        "Page created! Check out index.html in this directory to see it!"
      );
    });
  });
