const { nanoid } = require('nanoid');
const uniqueId = nanoid(4);
var nodemailer = require('nodemailer');
var { getUserModel } = require('../model/userModel');
var {getLoginModel} = require('../model/loginModel');
var UserApplyDetails = getUserModel();
var userLogin = getLoginModel();

async function getAllPendingApplicantDetails(req, resp) {
    try {
        let jsonApplicants = await UserApplyDetails.find({ status: 0 }); // Fetch only pending applicants
        resp.status(200).json(jsonApplicants); // Send response with status 200
    } catch (err) {
        resp.status(500).json({ error: err.message }); // Handle errors properly
    }
}

async function doApproveApplications(req,resp)
{
    try {
        let response = await UserApplyDetails.updateOne({email : req.body.email},{$set : {status : 1}});
        if(response.modifiedCount > 0)
        {
            resp.send("Status Updated Successfully");
            console.log(response);
        }
        else
            resp.send("Application not found");
    }
    catch(err)
    {
        resp.send(err.message);
    }
}
async function doDeclineApplications(req,resp)
{
    try {
        let response = await UserApplyDetails.updateOne({email : req.body.email},{$set : {status : -1}});
        if(response.modifiedCount > 0)
            resp.send("Status Updated Successfully");
        else
            resp.send("Application not found");
    }
    catch(err)
    {
        resp.send(err.message);
    }
}
async function getAllAcceptedApplicantDetails(req,resp)
{
    try {
        let jsonApplicants = await UserApplyDetails.find({ status: 1 }); // Fetch only pending applicants
        resp.status(200).json(jsonApplicants); // Send response with status 200
    } catch (err) {
        resp.status(500).json({ error: err.message }); // Handle errors properly
    }
}
async function getAllDeclinedApplicantDetails(req,resp)
{
    try {
        let jsonApplicants = await UserApplyDetails.find({ status: -1 }); // Fetch only pending applicants
        resp.status(200).json(jsonApplicants); // Send response with status 200
    } catch (err) {
        resp.status(500).json({ error: err.message }); // Handle errors properly
    }
}
async function doMakeFranchise(req,resp)
{
    try {
        let response = await UserApplyDetails.updateOne({email : req.body.email},{$set : {status : 2}});
        let obj = { email : req.body.email,
                pwd : uniqueId
            }
            console.log(obj);
        if(response.modifiedCount > 0)
        {
            
            var userObj = new userLogin(obj);
            userObj.save().then((document)=>{
                console.log("Details Saved Successfully");
            }).catch((err)=>{
                console.log(err.message);
                resp.send(err.message);
            })
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                secure : true,
                port : 465,
                auth: {
                  user: 'singlavanshpc@gmail.com',
                  pass: 'hsnu pexg ddaa puds',
                },
              });
              var mailOptions = {
                from: 'singlavanshpc@gmail.com',
                to: req.body.email, // Assuming req.body.email contains the recipient's email
                subject: 'Franchise Approved !!',
                text: `Hey User,
            
            We are excited to inform you that your franchise has been approved! 🎉
            
            Congratulations!
            
            Please log in now using the credentials provided to you.
            
            If you have any questions or need assistance, feel free to reach out to our support team.
            Login Cridentals : 
            Email : ${req.body.email}
            PassWord : ${uniqueId}
            
            Best regards`
            };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            resp.send("Franchise Approved");
            
        }
        else
            resp.send("Franchise is Not Approved");  
    }
    catch(err)
    {
        resp.send(err.message);
    }
}
module.exports = {getAllPendingApplicantDetails,doDeclineApplications,doApproveApplications,getAllAcceptedApplicantDetails,getAllDeclinedApplicantDetails,doMakeFranchise};