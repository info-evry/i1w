const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// Static
app.use(express.static('public'));

// Routes
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

// Search
app.get('/search/:query?', (req, res) => {
  const query = req.params.query;
  res.json({search: query});
});

// Error page not found
app.use((req, res, next) => {
  res.status(404);
  res.sendFile(path.join(__dirname + '/views/404.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});