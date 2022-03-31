const { User } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement getUserById(id)
/**
 * Get User by id
 * - Fetch user object from Mongo using the "_id" field and return user object
 * @param {String} id
 * @returns {Promise<User>}
 */



 const getUserById = async (userId, isAddress) =>{

    try {

        //console.log('isAddress: ', isAddress);

    if (isAddress){
        const result = await getUserAddressById(userId);
        return {address: result.address};
    }
    //console.log('result inside user service getuserbyid', userId);
    const result = await User.findById(userId); 
    //console.log('result inside user service getuserbyid', result);
     return result;        
    } catch (error) {
        throw new ApiError(404,'DB connect failed');   }     
    
     };


const getUserAddressById = async (userId) => {
    const result = await User.findOne({_id: userId},{address: 1, email: 1});
    return result;    
}

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement getUserByEmail(email)
/**
 * Get user by email
 * - Fetch user object from Mongo using the "email" field and return user object
 * @param {string} email
 * @returns {Promise<User>}
 */

 const getUserByEmail = async (email) => {
    return User.findOne({email: email});
 };

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement createUser(user)
/**
 * Create a user
 *  - check if the user with the email already exists using `User.isEmailTaken()` method
 *  - If so throw an error using the `ApiError` class. Pass two arguments to the constructor,
 *    1. “200 OK status code using `http-status` library
 *    2. An error message, “Email already taken”
 *  - Otherwise, create and return a new User object
 *
 * @param {Object} userBody
 * @returns {Promise<User>}
 * @throws {ApiError}* 
 * 
 * userBody example:
 * {
 *  "name": "crio-users",
 *  "email": "crio-user@gmail.com",
 *  "password": "usersPasswordHashed"
 * }
 *
 * 200 status code on duplicate email - https://stackoverflow.com/a/53144807
 */
 const createUser = async (userBody) => {
    try {
        const userTaken = await User.isEmailTaken(userBody.email);
        //console.log("in user service", userTaken);
        if (userTaken){
            throw (new ApiError(200, 'Email already taken'));
        }
        else{
            const result = await User.create(userBody);
            return result;    
        }         
        
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);

    }  
 }

 const setAddress = async (userID, address) => {

     const result = await User.updateOne({_id: userID},{address: address});
     console.log("result:", result);
     return address;
        
 
     
 };

 module.exports = {getUserByEmail,getUserById,createUser, setAddress,getUserAddressById}


