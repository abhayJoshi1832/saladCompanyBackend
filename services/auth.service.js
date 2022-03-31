const httpStatus = require("http-status");
const userService = require("./user.service");
const ApiError = require("../utils/ApiError");
const {User} = require("../models/user.model");
const jwt = require("jsonwebtoken");
const tokenService = require("./token.service");


/**
 * Login with username and password
 * - Utilize userService method to fetch user object corresponding to the email provided
 * - Use the User schema's "isPasswordMatch" method to check if input password matches the one user registered with (i.e, hash stored in MongoDB)
 * - If user doesn't exist or incorrect password,
 * throw an ApiError with "401 Unauthorized" status code and message, "Incorrect email or password"
 * - Else, return the user object
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {

  // try {

    

  // const user = await User.loginInDB(email,password);

  // //console.log('user inside service: ', user);

  //   const jwt = await tokenService.generateAuthTokens(user);
  // //console.log('token',jwt)

  // const response = {user: user, tokens: jwt}
  // return response;
    
  // } catch (error) {
  //   throw error;
    
  // }
  const user = await userService.getUserByEmail(email);
  //console.log('user in Auth service', user);

  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }

  // const tokens = await tokenService.generateAuthTokens(user);
  //console.log('token',jwt)

  
  // const response = {user, tokens}
  // console.log("response in auth service- response.user = ", response.user);
  // return response;
  return user;

};

module.exports = {
  loginUserWithEmailAndPassword,
};
