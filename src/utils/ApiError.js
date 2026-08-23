class ApiError extends Error{

  constructor(
    statusCode,
    message= "Something went wrong",
    error=[],
    stack=""
  ){

    // This passes your custom error message directly up to JavaScript’s internal core engine so it can register it properly.
    super(message);   // Calls the native Error constructor to set the message

    // Every single error across your entire backend will now look exactly like this object.
    this.statusCode=statusCode;
    this.data= null;
    this.message=message;
    this.success= false;
    this.errors= this.error;


    //A "stack trace" is the long history of file names and line numbers that tells you exactly where a crash originated.This block automatically generates that hidden roadmap for you. It ensures that when you look at your terminal during development, you can pinpoint the exact line of code that triggered the failure.
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }

  }
}