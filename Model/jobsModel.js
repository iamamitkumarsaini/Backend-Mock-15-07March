const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
    company_name:String,
    position:String,
    contract:String,
    location:String,
    image_url:String
},{
    versionKey:false
});


const JobModel = mongoose.model("jobs", jobSchema);


module.exports = { JobModel };