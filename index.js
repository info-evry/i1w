const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/home.html'));
});

app.get('/cours-profs', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/cours-profs.html'));
});

app.get('/outils', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/outils.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/contact.html'));
});

// Error page not found
app.use(function(req, res, next){
  res.status(404);

  res.format({
    html: function () {
      res.sendFile(path.join(__dirname + '/views/404.html'));
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});