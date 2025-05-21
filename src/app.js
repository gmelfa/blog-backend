const express = require('express');
const app = express();

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

app.use('/users', userRoutes);
app.use('/posts', postRoutes);


app.get('/', (req, res) => {
  res.send('API do blog Pessoal Está funcionando!');
});

module.exports = app;