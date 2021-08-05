const express = require('express');
const router = express.Router();
module.exports = router;

//use model
const User = require('../models/userSchema');
// get all user
router.get('/users', async (req, res) => {
    try {
        const user = await User.find({});
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error!" })
    }
});

//get user by id
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error!" })
    }
});

//creat all user
router.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error!" })
    }
});


//update user
router.put('/users/:id', async (req, res) => {
    try {
        const users = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error!" })
    }

});

//delete user
router.delete('/users/:id', async (req, res) => {
    try {
        const users = await User.findByIdAndRemove(req.params.id);
        res.json({ message: " user has been deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error!" })
    }


});

