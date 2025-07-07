
const express = require('express');

const app = express();
const route = express.Router({ strict: true });

route.get('/', (req, res, next) => {
  if (req.originalUrl.slice(-1) != '/') return next();
  res.send('hi');
route.get('/', (req, res) => {
  res.send('no trailing slash');
});
});

app.use('/strict/', route);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});