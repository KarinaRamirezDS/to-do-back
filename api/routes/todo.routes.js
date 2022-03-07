const express = require('express');

// Controllers
const {
  getAllToDo,
  getTodoById,
  createNewTodo,
  updateTodoPut,
  updateTodoPatch,
  deleteTodo

} = require('../controllers/todo.controller');

const router = express.Router();

router.get('/', getAllToDo);

// GET http://localhost:4000/todos/:id
router.get('/:id', getTodoById);

router.post('/', createNewTodo);

// PUT http://localhost:4000/todos/:id
router.put('/:id', updateTodoPut);

// PATCH http://localhost:4000/todos/:id
router.patch('/:id', updateTodoPatch);

router.delete('/:id', deleteTodo);

module.exports = { todosRouter: router };
