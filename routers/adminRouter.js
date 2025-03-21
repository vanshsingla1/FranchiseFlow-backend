var express=require("express");
var obj = require("../controllers/adminController");

var adminRouter=express.Router();

adminRouter.get("/getAllPendingApplicantsDetails",obj.getAllPendingApplicantDetails);
adminRouter.post("/approveApplications",obj.doApproveApplications);
adminRouter.post("/declineApplications",obj.doDeclineApplications);
adminRouter.post("/makeFranchise",obj.doMakeFranchise);
adminRouter.get("/getAllAcceptedApplicantsDetails",obj.getAllAcceptedApplicantDetails)
adminRouter.get("/getAllDeclinedApplicantsDetails",obj.getAllDeclinedApplicantDetails)
module.exports = adminRouter;