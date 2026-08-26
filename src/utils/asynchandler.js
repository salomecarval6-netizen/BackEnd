/*
const asynchandler=()=>{}

const asynchandler=(func)=> {()=> {}}
const asynchandler=(func)=> ()=> {}
*/

/*
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
*/

/*
The variable reqHandler inside your definition becomes a direct reference to your inner async (req, res) => { ... } arrow function.
asyncHandler wraps that arrow function inside its internal Promise.resolve().catch() safety structure.
It returns that newly fortified function and saves it directly into the registerUser variable.



*/
// B. The Promise .catch(next) Approach (Highly Standard)
const asynchandler= (reqHandler)=>{
  return (req,res,next)=>{//asynchandler returns a brand-new, standard Express middleware function
    Promise.resolve(reqHandler(req,res,next))
    .catch((err)=>next(err)) //In Express, passing any argument into next() forces Express to instantly abort the standard route chain and jump straight to your global error-handling middleware. This ensures that the client receives a structured error response instead of their browser loading indefinitely.
    }
  }
//due to this global asynchandler the try catch block need not to be written inside any of the function since error are handled here
export {asynchandler} ;






