const fs = require('fs');
const express = require('express');
const { random } = require('lodash');
const bodyParser = require('body-parser');
const { v4 } = require('uuid');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// обработка запроса по адресу http://localhost:3000/
app.get('/goods-list', (reqest, res) => {
  const data = JSON.parse(fs.readFileSync('./goods.json'));

  res.json(data);
});

app.post('/goods-list', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./goods.json'));
  data.push({ productName: req.body.title, price: req.body.price, id: v4() });

  fs.writeFileSync('goods.json', JSON.stringify(data));

  res.json({
    success: true,
  });
});

app.listen(3000, () => {
  console.log('App is running on port 3000');
});
