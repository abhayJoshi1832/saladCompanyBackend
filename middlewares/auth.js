const passport = require("passport");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const {getUserById} = require("../services/user.service")

/**
 * Custom callback function implementation to verify callback from passport
 * - If authentication failed, reject the promise and send back an ApiError object with
 * --- Response status code - "401 Unauthorized"
 * --- Message - "Please authenticate"
 *
 * - If authentication succeeded,
 * --- set the `req.user` property as the user object corresponding to the authenticated token
 * --- resolve the promise
 */

 // req resolve reject returns an  async function
const verifyCallback = (req, resolve, reject) => async (err, user, info) => {

 // console.log('inside verify call back',req.params);
  //console.log('user', user);

  if(err || info || !user){
    reject(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate" ));
  }  
  req.user = user;
  //console.log('inside middleware auth',req.body);
  resolve();

};

/**
 * Auth middleware to authenticate using Passport "jwt" strategy with sessions disabled and a custom callback function
 * 
 */
const auth = async (req, res, next) => {

  return new Promise((resolve,reject) => {
    passport.authenticate('jwt', {session: false}, verifyCallback(req,resolve,reject))(req,res,next)
  }).then(() => next()).catch((err) => next(err));

// try {
    
//     // extract JWT token

//     let token = req.headers.authorization.split(" ");
//     //console.log('token',token);
//     if (token[0] !== "Bearer") throw new ApiError(401, "Bearer token missing");  
//     const result = jwt.verify(token[1], config.jwt.secret, {session: false, failWithError: true });
//     if (result.type !== "access") throw new ApiError(401, "Token not of access type");

    
//     console.log('middle ware : ', new Date(result.exp*1000), "exp: ", result.exp, "sub: ", result.sub); 

//     //check if token expired:  
//     if (result.exp <= (Date.now()/1000) ) throw new ApiError(401, "Bearer Token expired");

    
//     //fetch user  
//     const user = await getUserById(result.sub);
//     if (!user._id){throw new ApiError(401, "User not found") }    
//     req.user = user;
//     next()



// } catch (error) {

//   if(error instanceof ApiError){
//     next(error);  
//     return;
//   } 

//   next(new ApiError(401, "token verification failed"));  
// }
};

module.exports = auth;

//  const auth = async (req, res, next) => {
//   let token = req.headers.authorization.split(" ");
//   if (token[0] !== "Bearer") throw new ApiError(401, "Bearer token missing");  
//   const result = jwt.verify(token[1], config.jwt.secret, {session: false, failWithError: true });

//   if (result.exp*1000 < (new Date()).getTime()) throw new ApiError(401, "Bearer Token expired");

//   const user = getUserById(result.sub);
//   console.log("user in auth middleware app:", result );
//   res.body.user = user;
//   next()
    
  
  
  
  // return new Promise(
  //   (resolve, reject) => 
    
  //   {
  //   passport.authenticate(
  //     "jwt",
  //     { session: false, failWithError: true },
  //     verifyCallback(req, resolve, reject)
  //   )(req, res, next);
  //   })
  //   .then(() => next())
  //   .catch((err) => {      
  //     console.log('error after passport: ', err);
  //     throw err
  //     next(err);
  //     /* res.status(err.statusCode).json({code:err.statusCode,
  //     message: err.message}) */ });





