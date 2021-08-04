const express = require('express');
const router = express.Router();
module.exports = router;


//use model
const Todo = require('../models/todoSchema');

// get all todos
router.get('/todos', async (req, res) => {
    try {
        const todo = await Todo.find({});
        res.json(todo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error!" })
    }
});

//get todo by id
router.get('/todos:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        res.json(todo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error!" })
    }
});

//creat all todo
router.post('/todos', async (req, res) => {
    try {
        const todo = await Todo.create(req.body);
        res.json(todo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error!" })
    }
});


//update todo
router.put('/todos:id', async (req, res) => {
    try {
        const todos = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(todo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error!" })
    }

});

//delete todo
router.delete('/todos:id', async (req, res) => {
    try {
        const todos = await Todo.findByIdAndRemove(req.params.id);
        res.json({ message: " todo has been deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error!" })
    }


});
