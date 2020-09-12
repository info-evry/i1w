const express = require('express');
const app = express();
const port = 3000;

// EJS
app.set("views", "./views");
app.set("view engine", "ejs");

// Static
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/cours-profs', (req, res) => {
  res.render('cours-profs');
});

app.get('/outils', (req, res) => {
  res.render('outils');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Search
app.get('/search/:query?', (req, res) => {
  const query = req.params.query;
  res.json({search: query});
});

// Error page not found
app.use((req, res, next) => {
  res.status(404);
  res.render('errors/404');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});