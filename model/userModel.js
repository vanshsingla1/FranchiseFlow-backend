var mongoose = require("mongoose");
function getUserModel()
{
    if(mongoose.models.userApplyDetails)
    {
        return mongoose.models.userApplyDetails;
    }
    var userScheema=mongoose.Schema;
    var userColSchema={
        email:{type:String,required:true,index:true,unique:true},
        name:String,
        contact:String,
        residential_address:String,
        experience:String,
        years:Number,
        siteLocation:String,
        city:String,
        district:String,
        pincode:Number,
        length:Number,
        breadth:Number,
        ownership:String,
        dos:{type:Date,default:Date.now},
        status:{ type: Number, default: 0 }
    }
    var ver={
        versionKey: false, // to avoid __v field in table come by default
      }
      var UserColShema=new userScheema(userColSchema,ver);
var UserColRef=mongoose.model("userApplyDetails",UserColShema);//create collection in mongodb database
return UserColRef;
}
module.exports ={getUserModel}



