const { Todo } = require('../models/todo.model');
const { filterObj } = require('../utils/filterObj');

exports.getAllToDo = async (req, res) => {
  try {
    const todos = await Todo.findAll({ where: { status: 'active' } });

    res.status(200).json({
      status: 'success',
      data: { todos }
    });
  } catch (error) {
    console.log(error);
  }
};

// Get post by id
exports.getTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({
      where: { id: id, status: 'active' }
    });

    if (!todo) {
      res.status(404).json({
        status: 'error',
        message: 'No todo found with the given ID'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: {
        todo
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createNewTodo = async (req, res) => {
  try {
    const { content } = req.body;

    const newTodo = await Todo.create({
      content: content
    });

    res.status(201).json({
      status: 'success',
      data: { newTodo }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateTodoPut = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content || content.length === 0) {
      res.status(400).json({
        status: 'error',
        message: 'Must provide a title, content and the author for this reuqest'
      });
      return;
    }

    // Find todo by id, and get the index
    const todo = await Todo.findOne({ where: { id: id } });

    if (!todo) {
      res.status(404).json({
        status: 'error',
        message: 'Cant update post, invalid ID'
      });
      return;
    }

    // Update todo and save it in the list
    await todo.update({
      content: content
    });

    // 204 - No content
    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

exports.updateTodoPatch = async (req, res) => {
  try {
    const { id } = req.params;
    const data = filterObj(req.body, 'content');

    const todo = await Todo.findOne({ where: { id: id } });

    if (!todo) {
      res.status(404).json({
        status: 'error',
        message: 'Cant update todo, invalid ID'
      });
      return;
    }

    await todo.update({ ...data });

    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({ where: { id: id } });

    if (!todo) {
      res.status(404).json({
        status: 'error',
        message: 'Cant delete post, invalid ID'
      });
      return;
    }

    //await todo.destroy()
    await todo.update({ status: 'deleted' });
    
    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};
