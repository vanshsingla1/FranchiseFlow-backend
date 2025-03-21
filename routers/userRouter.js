var express=require("express");
const {validateToken} = require("../config/valid");
var obj = require("../controllers/userController");
var userRouter=express.Router();

userRouter.post("/SaveUserApplyDetails",obj.doSaveUserApplyDetails);
userRouter.post("/checklogin",obj.doCheckLoginDetails);
userRouter.post("/save-todays-sale",validateToken,obj.doSaveTodaysSale);
userRouter.post("/fetch-sales-data",validateToken,obj.dogetSalesHistory);
userRouter.post("/sales-charts",validateToken,obj.dogetCharts);
userRouter.post("/updatePwd",validateToken,obj.doUpdateUserPassword);
module.exports = userRouter;