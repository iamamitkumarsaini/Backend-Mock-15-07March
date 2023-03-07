const express = require("express");
const { JobModel } = require("../Model/jobsModel");

const jobRoutes = express.Router();


jobRoutes.post("/add", async (req,res) => {

    const payload = req.body;

    try {
        
        const job = new JobModel(payload);
        await job.save();
        res.status(200).send({"Message":"Post Added Successfully", job})
    } 
    
    catch (err) {
        console.log(err);
        res.status(500).send({"Message":"Something Went Wrong, try again later"});
    }
})


jobRoutes.get("/",async(req,res) => {

    try {
        const jobs = await JobModel.find();
        res.status(200).send(jobs)
    } 
    
    catch (err) {
        console.log(err);
        res.status(500).send({"Message":"Something Went Wrong, try again later"});
    }
})

jobRoutes.patch("/modify/:id",async(req,res) => {

   const payload = req.body;
   const jobId = req.params.id;

   try {
        await JobModel.findByIdAndUpdate(jobId,payload);
        res.status(201).send({"Message":"Post Modified Successfully", payload})
   } 
   
   catch (err) {
    console.log(err);
    res.status(500).send({"Message":"Something Went Wrong, try again later"});
   }
})


jobRoutes.delete("/remove/:id",async(req,res) => {

    const jobId = req.params.id;

    try {
        await JobModel.deleteOne({_id:jobId})
        res.status(200).send({"Message":"job Removed Successfully"})
    } 
    
    catch (err) {
        console.log(err);
        res.status(500).send({"Message":"Something Went Wrong, try again later"});
    }
})


module.exports = { jobRoutes };