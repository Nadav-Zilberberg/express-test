
const express = require('express');
const app = express();
const TEST = true;

const TestRoutes = express.Router();

TestRoutes.get('/drop/table/:table', (req, res) => { 
  // drop table
  res.send(`Dropped table '${req.params.table}'`);
})

TestRoutes.get('/', (req, res) => {res.send('List of test routes');});

if (TEST) app.use('/', TestRoutes);

app.get('/', (req, res) => {res.send('Main app');});

app.listen(3000, () => console.log('Example app listening on port 3000!'));