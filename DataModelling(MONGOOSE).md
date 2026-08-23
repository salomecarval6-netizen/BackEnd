mongoose-aggregate-paginate website.

npm i mongoose-paginate-v2




**1.WHAT I/P WILL BE TAKEN FROM USER AND TO BE STORED IN DB?**



MOON MODELER: a data modelling tool



eraser.io:  a data modelling tool

Here, we can see flowcharts / diagrams with src code inside entity relationship.



TO make own flowcharts:

Login is just validation of existing entries/data with DataBase.



Register form: whats fields/data is to be stored.

|                             Register<br /><br />username<br />email<br />password<br /><br /><br />                           Register<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />|
|-|







Login



email

password





GALLERY: BACKEND (PHOTO)





Now a helper to store all this data:
MONGOOSE: thus helps in data/object modelling



To read mongoose.doc.



codesandbox: gives required environment for node.js

GitHub codespaces: cloud based to run program

stackblitz: select your required environment












**STRCUTURE/DATA MODELLING/DATA POINTS:**



**A. login**

name of file: user.models.js i.e **charName.models.js**



1. import mongoose from "mongoose"





2\.  const userSchema= new mongoose.Schema(

{

&#x09;username: String  OR  username:{type:String, required: true,unique:true,lowercase: true},

&#x09;email:{type:String,required: true,unique:true,lowercase: true},

&#x09;isActive: {type: Boolean, default: false},

&#x09;password:{

&#x09;	  type:String, 

&#x09;	  required: \[true,"password is requied"]  //we can pass array with value then any custom msg

&#x09;	},

&#x09;createdBy:{

//this is considered as toDo Schema which uses "User" schema \& "SubTodo" Schema

&#x09;	  type: mongoose.Schema.Types.ObjectId, //means that reference of some other model will be given

&#x09;	  ref: "Whatever name u have given inside model. Eg User in this case",

//note here user is same model but its some other model that we use in current model

&#x09;	   },

&#x20;        subTodos:\[//array of subtodos

&#x09;           {

&#x09;		//dusre model ka reference

&#x09;		type: mongoose.Schema.Types.ObjectId,

&#x09;		ref: "SubTodo",

&#x09;	    }

&#x09;          ]

&#x09;		

&#x09;

}, {timestamps: true} )

//schema is method that takes object representing ({data fields}, {secondary object})





3\.  export const User= mongoose.model("User",userSchema) \[2para: kya name she model banau? kis ke basis peh banau?]





**IMP: Here despite name is 'User' in mongoose DB its stored in lowercase-plural form i.e 'users'**







TimeStamps: this will enabale below 2 fields

1. createdAt
2. updatedAt: 







**B. ecommerce folder:**

FILES:



3\. category.models.js



import mongoose from "mongoose"



const categorySchema= new mongoose.Schema({

&#x09;

&#x09;name: {

&#x09;	type: String,

&#x09;	equired: true

&#x09;       }



},{timestamps:true})



export const Category= mongoose.model("Category", categorySchema)









1. user.models.js :



import mongoose from "mongoose"



const userSchema= mongoose.Schema({



&#x09;username:{

&#x09;	type:String,

&#x09;	required: true

&#x09;	},

&#x09;email: {

&#x09;	type:String,

&#x09;	required: true		

&#x09;       },

&#x09;password: {

&#x09;	type:String,

&#x09;	required: true

&#x09;       }



}, {timestamps:true})



export const user=mongoose.model("User",userSchema)







THERE WILL BE CATEGORIES AND PROUDUCT INSIDE EACH CATEGORY.

EACH PDT WILL REFER TO A SPECIFIC RESPECTIVE CATEGORY SO:



2\. product.models.js :

while defining schema for product write:


const productSchema= new mongoose.Schema({



&#x09;category:{

&#x09;	  type: mongoose.Schema.types.ObjectId,

&#x09;	  ref: "Category"

&#x09;	 },

&#x09;owner:{

&#x09;	type: mongoose.Schema.types.ObjectId,

&#x09;	ref: "User"  //this name is what u write in RHS of export statement in that specific model

&#x09;      }

})



You can store images directly inside a MongoDB database, but it is generally considered a bad practice for performance and scalability reasons.



**Cloudinary** is a cloud-based service for storing, managing, optimizing, and delivering images and videos for websites and apps. Developers use it to handle media uploads, automatically compress and resize files, apply AI edits (like background removal), and stream content quickly via global content delivery networks (CDNs).





1. Your Backend fetches the MongoDB document, which contains the stored Cloudinary URL string.

2\. Your Backend sends this URL string back to your frontend application.

3\. Your Frontend drops the URL into an image tag. The user's browser downloads the image directly from Cloudinary's fast global servers, completely bypassing your database.







4\. order.models.js :



import mongoose from "mongoose"



//create an individual orderItemSchema so that all items inside array of orderItems follow this indi. item Schema

//this schema could be written in separate file and then exported to use here but this schema isn't used by any other schema so its written within this file only.



const orderItemSchema= new mongoose.Schema({



&#x09;productId:{

&#x09;	type: mongoose.Schema.Types.ObjectId,

&#x09;	ref: "Product"

&#x09;	},



&#x09;quantity: {

&#x09;	type: Number,

&#x09;	required: true

&#x09;	 }

}) //no timestamp over here since its already there inside orderSchema





const orderSchema = new mongoose.Schema({

&#x09;

&#x09;price:{

&#x09;	type:number,

&#x09;	required: true,

&#x09;      },

&#x09;customer:{

&#x09;	type: mongoose.Schema.Types.ObjectId,

&#x09;	ref: "User"

&#x09;       },

&#x09;orderItems:{

&#x09;	type: \[orderItemSchema] 

&#x09;		OR

&#x09;	type: \[

&#x09;	       {

&#x09;		product:{

&#x09;		}

&#x09;		price:{

&#x09;		}

&#x09;	       } 

&#x09;	      ]

&#x09;	   },



&#x09;address:{ //separate Schema of address can also be created with data fields like(pin-code,state)

&#x09;	type: String,

&#x09;	required: true

&#x09;	},



&#x09;status:{

&#x09;	type: String,

&#x09;	enum: \["Pending", "Cancelled", "Delivered"]  //options available,

&#x09;	default: "Pending"

&#x09;	}

//now while placing the order only out of 3 options given will only be validated including spelling case-sensitive else that input value wont be set inside status





},{timestamps: true})













C. Hospital management:



1. doctor.models.js



* name
* salary
* qualification
* experience
* worksInHospitals: \[
* {

  * type: mongoose.Schema.Types.ObjectId,
  * ref: "Hospital"

&#x20;  }

&#x20; ]

//if want to know which doctor stays for how long in that specific hospital?

* Then make a schema of hospital with no of hours, doctor, and his working hrs then give this schema to this worksInHospitals







2\. patient.models.js



* name
* diagnosedWith
* address
* age
* bloodGroup
* gender  : {

  * &#x20;type: String,
  * enum: \["M", "F" ,"OTHERS"]
  * }
* admiitedBy:{

  * type: mongoose.schema.Types.ObjectId,
  * ref: "Hospital"
  * }







3\. hospital.models.js



* name
* address
* city
* pinCode
* specilizedIn :\[

  * {

    * type: String

&#x20;      }

&#x20;   ]







4\. medicalRecords.models.js



const medicalRecords= new mongoose.Schema({





&#x09;



},{timestamps:true})

