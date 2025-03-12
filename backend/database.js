const mongoose = require('mongoose');
const config =require("./config");
async function main() {
    try{
        await mongoose.connect(`${config.DB_URL}`);
        console.log("Connected to DB");
    }catch(err){
        console.log(err);
    }

}

module.exports = main;