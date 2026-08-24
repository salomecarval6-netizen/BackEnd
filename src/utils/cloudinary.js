//

import { v2 as cloudinary } from 'cloudinary';

//The Node.js File System (fs) module allows you to interact with the physical file system on your computer to perform standard CRUD operations like reading, writing, updating, and deleting files and directories. 
//It is a core built-in module, meaning it requires no external installation.The fs module provides three different execution patterns: 
//Asynchronous/Promise-based (highly recommended for modern, non-blocking applications), Callback-based (legacy asynchronous style), and Synchronous (blocks code execution until finished).

import fs from "fs";

/*
fsPromises.unlink(path): path <string> | <Buffer> | <URL>
                        Returns: <Promise> Fulfills with undefined upon success.

If path refers to a symbolic link, then the link is removed without affecting the file or directory to which that link refers. If the path refers to a file path that is not a symbolic link, the file is deleted.

*/


cloudinary.config({ 
  cloud_name: process.env.my_cloud_name, 
  api_key: process.env.my_key, 
  api_secret: process.env.my_secret
});

const uploadOnCloudinary= async (localFilePath)=>{
        try{

          if(!localFilePath) return null;

          //upload the file on cloudinary
          const response= await cloudinary.uploader.upload(localFilePath, {
              resource_type: "auto"
          })

          console.log(response);
        //file has been uploaded successfully
        console.log("file has been uploaded on cloudinary",
        response.url);
        return response;
        } catch(error){
            fs.unlinkSync(localFilePath) //remove the local saved temporaray file as the upload operation got failed
            return null;
        }
}

cloudinary.v2.uploader
.upload("dog.mp4", {
  resource_type: "video", 
  public_id: "my_dog",
  overwrite: true, 
  notification_url: "https://mysite.example.com/notify_endpoint"})
.then(result=>console.log(result));



export {uploadOnCloudinary};