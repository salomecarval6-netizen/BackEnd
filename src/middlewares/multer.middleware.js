import multer from "multer";
//read express-multer docs

const storage = multer.diskStorage({// store the uploaded files directly onto your server's physical hard drive (disk) instead of keeping them temporarily in memory. It takes single JavaScript configuration object as its argument
  // specifies the folder path where files should be saved
  destination: function (req, file, cb) { //Multer requires functions as the values for its key because file uploading is a dynamic process.
    cb(null, "./public");  //destination folder
  },
  //It dictates what the final file should be named inside that folder
  filename: function (req, file, cb) {
    //console.log(file)
    //The first parameter accepts an error object (set to null here because there are no errors), and the second parameter handles the path or file name.
    cb(null, file.originalname);
  },
});

//multer() is a constructor function (a factory) provided by the Multer library that creates a customized Express middleware instance. When you call multer(), you are building a custom file-processing engine. The options you pass inside the function—like { storage: storage }—define exactly how that specific engine should behave when a file arrives at your server.
//Calling multer() returns an object equipped with specific methods (like .single(), .array(), and .fields())

//This initializes the configured Multer engine instance and exports it cleanly so your routes can leverage it.
const upload = multer({ storage: storage });
//The first storage (before the colon) is the predefined configuration option name that Multer requires to know where and how to save files.
//The second storage (after the colon) is the variable name you created higher up in your file (const storage = multer.diskStorage(...)).


// This does the exact same thing!
//const upload = multer({ storage }); 


//Export the instance cleanly as the default export
export default upload ;

   