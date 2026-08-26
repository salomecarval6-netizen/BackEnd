/*CUSTOM UTILITY CLASS:

. Its sole purpose is to enforce a standardised, uniform structure for every successful response your backend server sends back to the frontend.

When you instantiate this class using new ApiResponse(statusCode, data, message), the constructor maps your inputs to four clean properties:

*/

class ApiResponse {
  constructor(statusCode, data, message="Success"){
    this.statusCode= statusCode
    this.data= data
    this.message= message
    this.success= statusCode<400
    //If you pass a status code of 200 or 201, the expression evaluates to true.
    //If you or another developer accidentally use this class for an error code like 404, the expression evaluates to false.
  }
}

export { ApiResponse };