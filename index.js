const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

let server;

console.log(config.mongoose.url);

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Create Mongo connection and get the express app to listen on config.port

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {console.log('db connnected')});


app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)});
