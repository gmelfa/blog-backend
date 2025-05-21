const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await Post.findAll({
    include: [{ model: User, attributes: ['id', 'name', 'email'] }]
  });
  res.json(posts);
});

router.post('/', async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const post = await Post.create({ title, content, userId });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar post', details: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    user.name = name;
    user.email = email;
    if (password) user.password = password;

    await user.save(); // Aqui os hooks do Sequelize funcionam corretamente

    const { password: _, ...userData } = user.toJSON();
    res.json(userData);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar usuário', details: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Post.destroy({ where: { id: req.params.id } });
    if (deleted) {
      return res.json({ message: 'Post deletado com sucesso' });
    }
    res.status(404).json({ error: 'Post não encontrado' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar post', details: error.message });
  }
});


module.exports = router;
