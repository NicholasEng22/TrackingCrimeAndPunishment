const fs = require('fs');
const ejs = require('ejs');

let state_info = fs.readFileSync('../../resources/IncarcerationData.json' "utf8");
let index_template = fs.readFileSync('index.ejs', 'utf8');

let index_html = ejs.render(index_template, {
  filename: __dirname + 'index.ejs',
  data: JSON.parse(state_info)
});

fs.writeFileSync('index.html', index_html, 'utf8');
