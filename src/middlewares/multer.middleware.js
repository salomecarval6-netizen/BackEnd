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

//Initialize the upload middleware instance
const upload = multer({ storage: storage });

//Export the instance cleanly as the default export
export default upload ;

   