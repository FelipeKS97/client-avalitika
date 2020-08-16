const express = require('express');
// const favicon = require('express-favicon');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
// app.use(favicon(__dirname + '/dist/public/images/favicon.ico'));
// app.use(favicon(path.join(__dirname, 'dist', 'public/images/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'dist')));
  // Handle React routing, return all requests to React app
  app.get('/*', function(req, res) {
    // res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    res.sendFile(path.join(__dirname, 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));