import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const targetPath = path.resolve(path.join(__dirname, '..', '..', 'upload'));
    fs.mkdir(targetPath, { recursive: true }, err => {
      cb(null, targetPath);
    });
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
export const upload = multer({ storage });

export const uploadImages = (req, res, next) => {
  console.log(req.files);
  if (!req.files) return res.status(422).json('no files detected');
  res.status(200).json(req.files.map(f => f.filename));
};
