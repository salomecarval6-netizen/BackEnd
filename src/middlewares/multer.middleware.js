import multer from "multer";
//read express-multer docs

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");  //destination folder
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload = multer({
  storage,
})