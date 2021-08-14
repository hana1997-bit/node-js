const express = require('express');
const router = express.Router();
const multer  = require('multer');
const path = require('path')
// 1.0 create storage

const my_storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, './public/avatars')
   },
   filename: function (req, file, cb) {
   const file_extention=path.extname(file.originalname);
     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+file_extention
     console.log(file_extention)
     cb(null, file.fieldname + '-' + uniqueSuffix)
   }
 })
// 2.0 create upload
const upload = multer({ storage: my_storage })
router.post('/upload-image', upload.single('file') ,(req, res) => {
   res.json({message:'image uploaded successfully'});
});
router.post('/upload-image-multiple', upload.array('file',3) ,(req, res) => {
   res.json({message:'images uploaded successfully'});
});
module.exports = router;