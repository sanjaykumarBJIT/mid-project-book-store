const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path");
const { failure } = require("../util/common");

const logMessage = (message) => {
    console.log(message);
  const updatetime =
    message +
    " at: Date: " +
    new Date().getDate() +
    "/" +
    new Date().getMonth() +
    "/" +
    new Date().getDay() +
    " Time: " +
    new Date().getTime();
  fs.appendFile(
    path.join(__dirname, "..", "data", "logFile.txt"),
    updatetime + "\n",
    "utf8",
    (err) => {
      if (err) {
        console.error("Error writing Update file:", err);
      } else {
        console.log("Update File written successfully.");
      }
    }
  );
};

module.exports = logMessage;
