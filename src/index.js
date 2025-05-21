const app = require('./app');
const port = 3000;

const sequelize = require('./config/database');
const User = require('./models/User');
const Post = require('./models/Post');

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Banco de dados sincronizado com sucesso!');
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });

