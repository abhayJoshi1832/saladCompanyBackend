const httpStatus = require("http-status");
const { Cart, Product } = require("../models");
const ApiError = require("../utils/ApiError");
const config = require("../config/config");
const productService = require("./product.service")

// TODO: CRIO_TASK_MODULE_CART - Implement the Cart service methods

/**
 * Fetches cart for a user
 * - Fetch user's cart from Mongo
 * - If cart doesn't exist, throw ApiError
 * --- status code  - 404 NOT FOUND
 * --- message - "User does not have a cart"
 *
 * @param {User} user
 * @returns {Promise<Cart>}
 * @throws {ApiError}
 */
const getCartByUser = async (user) => {

  const userCart = await Cart.findOne({email: user.email});

  if (!userCart){
    throw new ApiError(404,"User does not have a cart" );
  }

  return userCart;  
};

/**
 * Adds a new product to cart
 * - Get user's cart object using "Cart" model's findOne() method
 * --- If it doesn't exist, create one
 * --- If cart creation fails, throw ApiError with "500 Internal Server Error" status code
 *
 * - If product to add already in user's cart, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "Product already in cart. Use the cart sidebar to update or remove product from cart"
 *
 * - If product to add not in "products" collection in MongoDB, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "Product doesn't exist in database"
 *
 * - Otherwise, add product to user's cart
 *
 *
 *
 * @param {User} user
 * @param {string} productId
 * @param {number} quantity
 * @returns {Promise<Cart>}
 * @throws {ApiError}
 */
const addProductToCart = async (user, productId, quantity) => {

  try {
    let userCart = await Cart.findOne({email: user.email});
    const userProduct = await productService.getProductById(productId);

    //console.log("userProduct: ", userProduct);

    //console.log('userCart: - ', userCart);

    if (!userProduct) throw new ApiError(400,"Product doesn't exist in database");

    if (!userCart){
      userCart = await Cart.create({email: user.email, cartItems: [{product: userProduct, quantity: quantity}]});
      return userCart;
    }


    else{
      const isProduct = userCart.cartItems.find((elem) => {return elem.product._id.toString() === userProduct._id.toString()});
      // console.log("usercart items: ",userCart.cartItems[1]);
      // console.log(`elemproductid- ${userCart.cartItems[1].product._id} user productid: ${userProduct._id}`, ", isProduct", isProduct, 
      // userCart.cartItems[1].product._id.toString() === userProduct._id.toString());
      if(isProduct) throw new ApiError(400,"Product already in cart. Use the cart sidebar to update or remove product from cart");

      userCart.cartItems.push({product: userProduct, quantity: quantity});
      await userCart.save()

      return userCart
      }
    
  } catch (error) {

    //console.log(error);

    if(error instanceof ApiError) throw error;    
    throw new ApiError(500,"Internal database error")
  }

  


};

/**
 * Updates the quantity of an already existing product in cart
 * - Get user's cart object using "Cart" model's findOne() method
 * - If cart doesn't exist, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "User does not have a cart. Use POST to create cart and add a product"
 *
 * - If product to add not in "products" collection in MongoDB, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "Product doesn't exist in database"
 *
 * - If product to update not in user's cart, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "Product not in cart"
 *
 * - Otherwise, update the product's quantity in user's cart to the new quantity provided and return the cart object
 *
 *
 * @param {User} user
 * @param {string} productId
 * @param {number} quantity
 * @returns {Promise<Cart>
 * @throws {ApiError}
 */
const updateProductInCart = async (user, productId, quantity) => {

  //console.log("user, productId, quantity: ", user, productId, quantity);

  try {
    const userCart = await Cart.findOne({email: user.email});
    const userProduct = await productService.getProductById(productId);

    if (!userProduct) throw new ApiError(400,"Product doesn't exist in database");

    if (!userCart) throw new ApiError(400,"User does not have a cart. Use POST to create cart and add a product");
    
    

    const cartArr = userCart.cartItems;
    //console.log('usercart: ', cartArr );
    console.log('......................................................................................... ');

    //const isProduct = userCart.cartItems.find(elem => elem.product._id.toString() === userProduct._id.toString());
    const isProduct =  cartArr.find((elem) =>  {return elem.product._id.toString() === userProduct._id.toString()});

    //console.log("isProduct- ",isProduct);
    
    if(!isProduct) throw new ApiError(400,"Product not in cart");

    // if (quantity > 0){
    // }
    // // working-
    // await Cart.updateOne({'cartItems.product': userProduct},
    // {$set: {'cartItems.$.quantity': quantity}});
    //console.log("user cart 158: ",userCart.cartItems, userProduct);

    const ind = userCart.cartItems.findIndex(obj => obj.product._id.toString() === userProduct._id.toString());

    if (quantity > 0) userCart.cartItems[ind].quantity = quantity;
    else userCart.cartItems.splice(ind,1);

    await userCart.save()
    return userCart;     
  
  }  
  catch (error) {
    //console.log(error);
    if(error instanceof ApiError) throw error;    
    throw new ApiError(500,"Internal error in the database" );
    
    
  }
};

/**
 * Deletes an already existing product in cart
 * - If cart doesn't exist for user, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "User does not have a cart"
 *
 * - If product to update not in user's cart, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "Product not in cart"
 *
 * Otherwise, remove the product from user's cart
 *
 *
 * @param {User} user
 * @param {string} productId
 * @throws {ApiError}
 */
const deleteProductFromCart = async (user, productId) => {
};

// TODO: CRIO_TASK_MODULE_TEST - Implement checkout function
/**
 * Checkout a users cart.
 * On success, users cart must have no products.
 *
 * @param {User} user
 * @returns {Promise}
 * @throws {ApiError} when cart is invalid
 */
const checkout = async (user) => {

  try {
    
  //test1
  const userCart = await Cart.findOne({email: user.email});
  if(!userCart) throw new ApiError(404, "User does not have a cart");

  //test2  
  if(!userCart.cartItems.length) throw new ApiError(400, "user cart empty");

  //test3  
  const addressSet = await user.hasSetNonDefaultAddress();
  if(!addressSet) throw new ApiError(400, "address not set etc..");

 // test4

  const reduceFn = (total, current) =>{
    return total + current.product.cost * current.quantity
  };
  const totalPrice = userCart.cartItems.reduce(reduceFn,0);
  if (totalPrice > user.walletMoney){
    throw new ApiError(400, "insufficient balance");
  }

  //test5

  user.walletMoney -= totalPrice;
  userCart.cartItems = [];

  await user.save();
  await userCart.save();
  ;
  //make cartitems 0
  //
    
  } catch (error) {

    if (error instanceof ApiError){
      //console.log("Instance of API error failed with Status: ", error.statusCode, " with message: ", error.message);
      throw error;
    }
    //console.log("Instance of other error", error)
    throw new ApiError(500, "Internal failure inside cartService");    
  }





};


module.exports = {
  getCartByUser,
  addProductToCart,
  updateProductInCart,
  deleteProductFromCart,
  checkout,
};
