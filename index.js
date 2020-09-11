const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/views/home.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname+'/views/contact.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});