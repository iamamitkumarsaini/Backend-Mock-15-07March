const express = require("express");
const { JobAppliedModel } = require("../Model/jobAppliedModel");

const jobAppliedRoutes = express.Router();

jobAppliedRoutes.post("/jobapplying",async(req,res) => {

    const payload = req.body;

    try {
        const jobApplied = new JobAppliedModel(payload)
        await jobApplied.save();
        res.status(200).send({"Message":"Job APplied Successfully",payload});
    } 
    
    catch (err) {
        console.log(err);
        res.status(500).send({"Message":"Something Went Wrong, try again later"});
    }
})


jobAppliedRoutes.get("/appliedjobs", async(req,res) => {

    const userID = req.body.userID;

    try {
        const appliedJobs = await JobAppliedModel.find({userID})
        res.status(200).send(appliedJobs);
    } 
    
    catch (err) {
        console.log(err);
        res.status(500).send({"Message":"Something Went Wrong, try again later"});
    }
});


module.exports = { jobAppliedRoutes };