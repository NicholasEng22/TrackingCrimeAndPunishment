const express = require('express');
const ghp = require("gh-pages");

const app = express();
const port = 3000;

app.use(express.static('build')); //greenlights all requests for files in the static folder

app.listen(port, () => {
  console.log(`Data Journalism at http://localhost:${port}`)
});

//ghp.publish("build", function(err) {});
