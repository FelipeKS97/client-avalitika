<<<<<<< HEAD
// const express = require('express');
// const favicon = require('express-favicon');
// const path = require('path');
// const port = process.env.PORT || 8080;
// const app = express();
// app.use(favicon(__dirname + '/build/favicon.ico'));
// // the __dirname is the current directory from where the script is running
// app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, 'build')));
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'public/index.html'));
// });
// app.listen(port);


const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
=======
const express = require('express');
const favicon = require('express-favicon');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
// app.use(favicon(__dirname + '/dist/public/images/favicon.ico'));
app.use(favicon(path.join(__dirname, 'dist', 'public/images/favicon.ico')));
>>>>>>> 270d3c947afddd051a0ba21ec3bf8435f7fb6ddb
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'dist')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'public/index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));