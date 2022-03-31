const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authService, userService, tokenService } = require("../services");

/**
 * Perform the following steps:
 * -  Call the userService to create a new user
 * -  Generate auth tokens for the user
 * -  Send back
 * --- "201 Created" status code
 * --- response in the given format
 *
 * Example response:
 *
 * {
 *  "user": {
 *      "_id": "5f71b31888ba6b128ba16205",
 *      "name": "crio-user",
 *      "email": "crio-user@gmail.com",
 *      "password": "$2a$08$bzJ999eS9JLJFLj/oB4he.0UdXxcwf0WS5lbgxFKgFYtA5vV9I3vC",
 *      "createdAt": "2020-09-28T09:55:36.358Z",
 *      "updatedAt": "2020-09-28T09:55:36.358Z",
 *      "__v": 0
 *  },
 *  "tokens": {
 *      "access": {
 *          "token": "eyJhbGciOiJIUz....",
 *          "expires": "2020-10-22T09:29:01.745Z"
 *      }
 *  }
 *}
 *
 */
const register = async (req, res,next) => {

  //console.log("inside register controller");

  try {    
  //if (err.statusCode) throw err; 
  const user = await userService.createUser(req.body);
  const token = await tokenService.generateAuthTokens(user);
  const result = {user: user, tokens: token};
  //console.log('result in auth contoller', result);

  res.status(201).json(result);
  } catch (error) {
    if (error.statusCode === 200) res.status(200).json({code: error.statusCode, message: error.message}); 
    else res.status(400).json({code: error.statusCode, message: error.message});
  }

  
  //return result;

};

/**
 * Perform the following steps:
 * -  Call the authservice to verify is password and email is valid
 * -  Generate auth tokens
 * -  Send back
 * --- "200 OK" status code
 * --- response in the given format
 *
 * Example response:
 *
 * {
 *  "user": {
 *      "_id": "5f71b31888ba6b128ba16205",
 *      "name": "crio-user",
 *      "email": "crio-user@gmail.com",
 *      "password": "$2a$08$bzJ999eS9JLJFLj/oB4he.0UdXxcwf0WS5lbgxFKgFYtA5vV9I3vC",
 *      "createdAt": "2020-09-28T09:55:36.358Z",
 *      "updatedAt": "2020-09-28T09:55:36.358Z",
 *      "__v": 0
 *  },
 *  "tokens": {
 *      "access": {
 *          "token": "eyJhbGciOiJIUz....",
 *          "expires": "2020-10-22T09:29:01.745Z"
 *      }
 *  }
 *}
 *
 */
const login = async (req, res,next) => {

  try {

  //if(error.statusCode) throw error;
  const user = await authService.loginUserWithEmailAndPassword(req.body.email, req.body.password);  
  const tokens = await tokenService.generateAuthTokens(user);
  
  res.cookie("Abhay's token",tokens,{maxAge: 60*60*1000});
  //console.log('responseObj: ',responseObj);

  res.json({user, tokens});
    
  } catch (error) {
    //onsole.log(error);
    res.status(error.statusCode).json({code: error.statusCode, message: error.message});
    
  }
  
};

module.exports = {
  register,
  login,
};
