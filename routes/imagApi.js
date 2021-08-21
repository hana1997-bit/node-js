const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')

// 1.0 create storage

const my_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/avatars')
  },

  filename: (req, file, cb) => {
    const file_extention = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + file_extention
    console.log(file_extention)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
 
  limits: {
    fileSize: 1024 * 1024
  }
});
 fileFilter=(req, file, cb) => {
  const file_extention = path.extname(file.originalname);
  if (file_extention != '.png' && file_extention != '.jpg' && file_extention != '.gif' && file_extention != '.jpeg') {
    return cb(new Error('Only images are allowed'))
  }
  cb(null, true)
};
// 2.0 create upload
const upload = multer({ storage: my_storage,fileFilter:fileFilter })

router.post('/upload-image', upload.single('file'), (req, res) => {
  res.json({ message: 'image uploaded successfully' });
});
router.post('/upload-image-multiple', upload.array('file', 3), (req, res) => {
  res.json({ message: 'images uploaded successfully' });
});


module.exports = router;