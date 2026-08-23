/*
const asynchandler=()=>{}

const asynchandler=(func)=> {()=> {}}
const asynchandler=(func)=> ()=> {}
*/

//A. try...catch Approach
//Higher-Order Functions (Functions returning Functions): It is a function that accepts another function as its input argument (func) and returns a brand new async middleware function.
const asynchandler=(func)=> async (req,res,next)=> {
  
    try{
      await func(req,res,next) 
    
    } catch(error){
     
      res.status(error.code || 400).json({
      
        success: false,
        message: error.message
      });
    }
  
  }
export default asynchandler;



/* B. The Promise .catch(next) Approach (Highly Standard)
const asynchandler= (reqHandler)=>{
  (req,res,next)=>{
    Promise.resolve(reqHandler(req,res,next))
    .catch((err)=>next(err))
    }
  }

export default asynchandler
*/





