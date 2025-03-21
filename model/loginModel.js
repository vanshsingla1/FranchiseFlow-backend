var mongoose = require("mongoose");
function getLoginModel()
{
    if(mongoose.models.userLoginDetails)
    {
        return mongoose.models.userLoginDetails;
    }
    var userScheema=mongoose.Schema;
    var userColSchema={
        email:{type:String,required:true,index:true,unique:true},
        pwd:String
    }
    var ver={
        versionKey: false, // to avoid __v field in table come by default
      }
      var UserColShema=new userScheema(userColSchema,ver);
var UserColRef=mongoose.model("userLoginDetails",UserColShema);//create collection in mongodb database
return UserColRef;
}
module.exports ={getLoginModel}



