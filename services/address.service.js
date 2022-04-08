const AddressModel = require("../models/address.model");
// const {} = require("../models/ingredient.model");
const ApiError = require("../utils/ApiError");


class AddressMethodsClass {

    getAddressesByUser = async function (userEmail) {
        try {
            const addresses = await AddressModel.findOne({
                userEmail
            });
            return addresses;

        } catch (error) {
            console.log("error");
            throw new ApiError(500, "Error in getting address service, getAddressesByUser");
        }
    };

    createAddressDB = async function (userEmail, addressBody) {
        try {
            const userAddressDb = await AddressModel.create({
                userEmail,
                addressArr: [addressBody]
            });
            return userAddressDb;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Error in getting address service, createAddressDB");

        }
    };

    addAddress = async function (userEmail, addressBody, makeDefaultBool) {
        try {
            const userAddressDb = await this.getAddressesByUser(userEmail);
            userAddressDb.addressArr.push(addressBody);
            if (makeDefaultBool) userAddressDb.primaryAddressIndex = userAddressDb.addressArr.length - 1;
            const res = await userAddressDb.save();
            return res;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Error in getting address service, addAddress");

        }
    };

    deleteAddress = async function (userEmail, addressId) {
        try {
            const userAddressDb = await this.getAddressesByUser(userEmail);
            const index = userAddressDb.addressArr.findIndex((elem) => elem["_id"].toString() === addressId.toString());

            if (!(index + 1)) throw new ApiError(400, "Address not present with user");
            if (index === userAddressDb.primaryAddressIndex) userAddressDb.primaryAddressIndex = 0;

            userAddressDb.addressArr.splice(index, 1);
            const res = await userAddressDb.save();

            return res;
        } catch (error) {
            console.log(error);
            if (error instanceof ApiError) throw error;
            throw new ApiError(500, "Error in getting address service, deleteAddress method");

        }
    };

    //EDIT ADDRESS NOT IMPLEMENTED

    editAddress = async function (userEmail, index, addressBody) {
        try {
            const userAddressDb = await this.getAddressesByUser(userEmail);
            const index = userAddressDb.addressArr.findIndex((elem) => elem["_id"].toString() === addressId.toString());
            if (!(index + 1)) throw new ApiError(400, "Address not present with user");


            userAddressDb.addAddress[index] = addressBody;
            const res = await userAddressDb.save();

            return res;
        } catch (error) {
            console.log(error);
            if (error instanceof ApiError) throw error;
            throw new ApiError(500, "Error in getting address service, editAddress method");

        }
    };

    changeDefault = async function (userEmail, addressId) {
        try {

            const userAddressDb = await this.getAddressesByUser(userEmail);
            //console.log("userAddressDb ======", userAddressDb);
            const index = userAddressDb.addressArr.findIndex((elem) => elem["_id"].toString() === addressId.toString());

            if (!(index + 1)) throw new ApiError(400, "Address not present with user");
            userAddressDb.primaryAddressIndex = index;

            const res = await userAddressDb.save();
            return res;



        } catch (error) {

            console.log(error);
            if (error instanceof ApiError) throw error;
            throw new ApiError(500, "Error in getting address service, change default method");

        }
    }

}


module.exports = new AddressMethodsClass();