const express = require('express');
const router = express.Router();
const multer  = require('multer');

router.get('/upload-image', (req, res) => {
   res.render('index')

})
module.exports = router;