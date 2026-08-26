class ApiError extends Error{
// a subclass inheriting from JavaScript's core built-in Error objec
  constructor(
    statusCode,
    message= "Something went wrong", //defaults to "Something went wrong".
    errors=[], //An optional array used to store multiple small detail objects (extremely useful for collecting a list of multiple missing fields during form validation).
    stack=""  //An optional manual stack trace string.
  ){

    // This passes your custom error message directly up to JavaScript’s internal core engine so it can register it properly.
    super(message);   // Calls the native Error constructor to set the message

    // Every single error across your entire backend will now look exactly like this object.
    this.statusCode=statusCode;
    this.data= null;  //Explicitly set to null because an error response should never carry successful operational data payload blocks.
    this.message=message;
    this.success= false;  //Hardcoded to false
    this.errors= this.errors;


    //A "stack trace" is the long history of file names and line numbers that tells you exactly where a crash originated.This block automatically generates that hidden roadmap for you. It ensures that when you look at your terminal during development, you can pinpoint the exact line of code that triggered the failure.
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }

  }
}

export {ApiError};