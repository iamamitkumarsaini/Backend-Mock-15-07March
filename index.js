const express = require("express");
const cors = require("cors");
const { connect } = require("./config/db");
const { userRoutes } = require("./Routes/userRoutes");
const { authentication } = require("./Middlwares/auth.middleware");
const { jobRoutes } = require("./Routes/jobRoutes");
const { jobAppliedRoutes } = require("./Routes/jobAppliedRoutes");
require("dotenv").config();


const app = express();

app.use(cors({
    origin:"*"
}));

app.use(express.json());

app.get("/",(req,res) => {
    res.status(200).send({"Message":"Welcome to MasaiJobsApp"})
});

app.use("/profile", userRoutes);

app.use(authentication);
app.use("/jobs",jobRoutes)
app.use("/user", jobAppliedRoutes);




app.listen(process.env.port, async(req,res) => {
    try {
        await connect;
        console.log("Connection to DB Successful")
    } 
    
    catch (err) {
        console.log("Connection to DB Failed");
        console.log(err);
        
    }

    console.log(`Server running on port ${process.env.port}`)
});