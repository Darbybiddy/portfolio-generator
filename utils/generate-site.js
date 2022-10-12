const fs = require("fs");
// inside the () for the new promise we provide it with a function that accepts two functions as parameters
//resolve and reject, from there we can write whatever asynchronous functionallity we need to execute and run resolve()
//function when the code executes successfully or reject( when it fails).
const writeFile = (fileContent) => {
  return new promises((resolve, reject) => {
    fs.writeFile("./dist/index.html", fileContent, (err) => {
      // if theres a error, reject the promise and send the error to the promises .catch() method
      if (err) {
        reject(err);
        // return out of the function here to make sure the promsie doesnt accidently execute the resolve() fucntion as well
        return;
      }
      // if everything went well, resolve the promise and send the successful data to the .then() method
      resolve({
        ok: true,
        message: "file created",
      });
    });
  });
};

const copyFile = (copyContent) => {
  return new promises((resolve, reject) => {
    fs.copyFile("./utils/app.js", copyContent, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({
        ok: true,
        message: "file copied",
      });
    });
  });
};

module.exports = {writeFile, copyFile}