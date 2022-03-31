const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");

// TODO: CRIO_TASK_MODULE_CART - Update function to process url with query params
/**
 * Get user details
 *  - Use service layer to get User data
 * 
 *  - If query param, "q" equals "address", return only the address field of the user
 *  - Else,
 *  - Return the whole user object fetched from Mongo

 *  - If data exists for the provided "userId", return 200 status code and the object
 *  - If data doesn't exist, throw an error using `ApiError` class
 *    - Status code should be "404 NOT FOUND"
 *    - Error message, "User not found"
 *  - If the user whose token is provided and user whose data to be fetched don't match, throw `ApiError`
 *    - Status code should be "403 FORBIDDEN"
 *    - Error message, "User not found"
 *
 * 
 * Request url - <workspace-ip>:8082/v1/users/6010008e6c3477697e8eaba3
 * Response - 
 * {
 *     "walletMoney": 500,
 *     "address": "ADDRESS_NOT_SET",
 *     "_id": "6010008e6c3477697e8eaba3",
 *     "name": "crio-users",
 *     "email": "crio-user@gmail.com",
 *     "password": "criouser123",
 *     "createdAt": "2021-01-26T11:44:14.544Z",
 *     "updatedAt": "2021-01-26T11:44:14.544Z",
 *     "__v": 0
 * }
 * 
 * Request url - <workspace-ip>:8082/v1/users/6010008e6c3477697e8eaba3?q=address
 * Response - 
 * {
 *   "address": "ADDRESS_NOT_SET"
 * }
 * 
 *
 * Example response status codes:
 * HTTP 200 - If request successfully completes
 * HTTP 403 - If request data doesn't match that of authenticated user
 * HTTP 404 - If user entity not found in DB
 * 
 * @returns {User | {address: String}}
 *
 */
const getUser = async (req, res,next) => {  
  //console.log('got first user request', req.url, req.params);
  
  try {   
    
    // if (error.statusCode) throw error;

    if (req.user._id.toString() !== req.params.userId) {      
      throw (new ApiError(403, 'No access to this user'));
    }

    
    const result = await userService.getUserById(req.params.userId, req.query.q);
    //console.log('result from controller: ',result);
    res.json(result);
  } 
  catch (error) {
    //console.log('error in controller: ',error);
    //console.log('error executed', error);
    if(error.statusCode)res.status(error.statusCode).json({code: error.statusCode, message: error.message});
    else res.status(404).json({message: 'Not found in DB, error in user controller'});
    //throw (new ApiError(404,{message: 'Not found in DB, error in user controller'}));
    
  }
};


const setAddress = async (req, res,next) => {

  try {

    //console.log("set address controller: ", req.body.address, req.params.userId);

    const result = await userService.setAddress(req.params.userId,
      req.body.address);

      //console.log("line 89 user controller", result)
    return res.json({address: result});
    
  } catch (error) {
   // console.log(error);
    if(error instanceof ApiError)res.status(error.statusCode).json({code: error.statusCode, message: error.message});
    else res.status(404).json({message: 'Not found in DB, error in user controller'});
    
  }

}

module.exports = {
  getUser,setAddress
};
