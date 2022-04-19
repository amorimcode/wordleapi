require("dotenv").config();

var fs = require("fs");

const routes = require("express").Router();

routes.post("/checkWord", (req, res) => {
  fs.readFile("gameWord.txt", "utf-8", (err, file) => {
    fileArray = Array.from(req.body.guessWord);
    answerArray = Array.from(file);

    let arr = [];

    for (let [idx, letter] of fileArray.entries()) {
      if (fileArray[idx] === answerArray[idx]) {
        arr.push("green");
      } else if (
        fileArray[idx] !== answerArray[idx] &&
        answerArray.includes(fileArray[idx])
      ) {
        arr.push("yellow");
      } else {
        arr.push("red");
      }
    }

    res.send(arr)
  });
});

routes.get("/setGameWord", (req, res) => {
  fs.readFile("words.txt", "utf-8", (err, file) => {
    const lines = file.split("\n");

    let words = [];

    for (let line of lines) {
      line = line
        .split("/")[0]
        .trim()
        .replace(".", "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      if (line.length === 5) {
        words.push(line);
      }
    }

    fs.writeFile(
      "gameWord.txt",
      words[Math.floor(Math.random() * words.length)],
      (err) => {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      }
    );
  });
});

module.exports = routes;
