import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/assets/uploads/profilepic');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('profile_pic'), (req, res) => {
    const uploadedFilename = req.file.filename;
    res.json({ filename: uploadedFilename });
  });

export default router;