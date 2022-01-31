require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const middlewares = require('./controllers/middlewares');
const { productsRouter, salesRouter } = require('./controllers');

const app = express();
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

app.use(middlewares.domainError);
app.use(middlewares.error);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
