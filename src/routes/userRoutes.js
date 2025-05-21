const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  res.json(users);
});


router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    
    const { password: _, ...userData } = user.toJSON();
    res.status(201).json(userData);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar usuário', details: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const [updated] = await User.update(
      { name, email, password },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
      return res.json(updatedUser);
    }
    res.status(404).json({ error: 'Usuário não encontrado' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar usuário', details: error.message });
  }
});

// Deletar usuário (DELETE /users/:id)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (deleted) {
      return res.json({ message: 'Usuário deletado com sucesso' });
    }
    res.status(404).json({ error: 'Usuário não encontrado' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar usuário', details: error.message });
  }
});

module.exports = router;
