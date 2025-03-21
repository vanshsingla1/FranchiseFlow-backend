var {getUserModel} = require("../model/userModel");
var UserColRef=getUserModel();

var {getLoginModel} = require("../model/loginModel");
var userLogin = getLoginModel();

var {getSalesModel} = require("../model/salesModel");
var userSales = getSalesModel();

var jwt=require("jsonwebtoken");

function doSaveUserApplyDetails(req, resp) {
    console.log(req.body);
    
    // Check if email already exists
    UserColRef.findOne({ email: req.body.email })
      .then((existingUser) => {
        if (existingUser) {
          // Email already exists
          return resp.json({
            status: "error",
            message: "Email already exists"
          });
        }
        
        // Create new user if email doesn't exist
        var userObj = new UserColRef(req.body);
        
        return userObj.save()
          .then((document) => {
            resp.json({
              status: "success",
              message: "Application submitted successfully",
              data: document
            });
          });
      })
      .catch((err) => {
        console.log(err.message);
        resp.json({
          status: "error",
          message: err.message
        });
      });
  }
async function doCheckLoginDetails(req, resp) {
    
    try {
        // Use the userLogin model to find the user
        let result = await userLogin.findOne({
            email: req.body.email,
            pwd: req.body.pwd // Note: Storing passwords in plain text is not secure!
        });

        if (result) {
           // console.log('User  found:', result);
           let jtoken=jwt.sign({email:req.body.email},"JaiMataDi",{expiresIn:"10m"});

        resp.json({status:true,msg:"Login Successful",token:jtoken});
            // resp.status(200).json({ message: 'Login successful', status:true });
        } else {
            // console.log('User  not found');
            resp.status(200).json({ message: 'Invalid Login Cridentials' , status : false});
        }
    } catch (error) {
        console.error('Error checking login details:', error);
        resp.status(500).json({ message: 'Server error', error: error.message });
    }
}
function doSaveTodaysSale(req,resp)
{
    console.log(req.body);
    var userObj = new userSales(req.body);
    userObj.save().then((document)=>{
        resp.send(document)
    }).catch((err)=>{
        console.log(err.message);
        resp.send(err.message);
    })
}
async function dogetSalesHistory(req, resp) {
    try {
        const { startDate, endDate, email } = req.body;
        if (!startDate || !endDate || !email) {
            return resp.status(400).json({ message: "Start date, end date, and email are required" });
        }

        const sales = await userSales.find({
            email: email,  // Match the given email
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            },
        });

        resp.json(sales);
    } catch (error) {
        console.error("Error fetching sales data:", error);
        resp.status(500).json({ message: "Server error" });
    }
}
async function dogetCharts(req, res) {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const sales = await userSales.find({ email }); // Match the email in the database
        return res.json(sales);
    } catch (error) {
        console.error("Error fetching sales data:", error);
        res.status(500).json({ message: "Server error" });
    }
}
async function doUpdateUserPassword(req, resp) {
    try {
      const { pwd, newpwd, email } = req.body;
      
      // Find the user with matching email and password
      const user = await userLogin.findOne({ email, pwd });
      
      // If no matching user is found
      if (!user) {
        return resp.status(401).json({ 
          success: false, 
          message: "Invalid email or password" 
        });
      }
      
      // Update the password
      user.pwd = newpwd;
      await user.save();
      
      return resp.status(200).json({
        success: true,
        message: "Password updated successfully"
      });
    }
    catch (error) {
      console.error("Error updating password:", error);
      return resp.status(500).json({
        success: false,
        message: "Error updating password",
        error: error.message
      });
    }
  }
module.exports = {doSaveUserApplyDetails,doCheckLoginDetails,doSaveTodaysSale,dogetSalesHistory,dogetCharts,doUpdateUserPassword};