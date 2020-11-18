const express = require('express');
const app = express();
const port = 3000;
const directory = 'Doodles'

app.use(express.static(directory+'/public'));

app.listen(port);