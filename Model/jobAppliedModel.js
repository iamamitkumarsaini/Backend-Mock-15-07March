const mongoose = require("mongoose");

const jobAppliedSchema = mongoose.Schema({
    company_name:String,
    position:String,
    contract:String,
    location:String,
    userID:String
},{
    versionKey:false
});


const JobAppliedModel = mongoose.model("appliedjobs", jobAppliedSchema);


module.exports = { JobAppliedModel };