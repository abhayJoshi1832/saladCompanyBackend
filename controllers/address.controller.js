const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const { all } = require("../app");
const addressService = require("../services/address.service");
const { crossOriginResourcePolicy } = require("helmet");

const createAddressDb = catchAsync(async (req,res) => {
  const response = await addressService.createAddressDB(req.user.email, req.body.address);
  res.status(201).json({response});
});

const getAddresses = catchAsync(async (req,res) => {
  const response = await addressService.getAddressesByUser(req.user.email);
  res.status(200).json({response});
});

const add = catchAsync(async (req,res) => {
  const response = await addressService.addAddress(req.user.email, req.body.address, req.body.makeDefault);
  res.status(201).json({response});
});

const deleteUserAddress = catchAsync(async (req,res) => {
  const response = await addressService.deleteAddress(req.user.email, req.body.index);
  res.status(200).json({response})
});

const changeUserAddress = catchAsync(async (req,res) => {
  const response = await addressService.editAddress(req.user.email,req.body.index, req.body.address);
  res.status(200).json({response})
});


module.exports = {
  createAddressDb,
  getAddresses,
  add,
  deleteUserAddress,
  changeUserAddress,


  
  
};
