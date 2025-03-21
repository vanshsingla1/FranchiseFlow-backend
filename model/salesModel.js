var mongoose = require("mongoose");
function getSalesModel()
{
    if(mongoose.models.userSalesDetails)
    {
        return mongoose.models.userSalesDetails;
    }
    var userScheema=mongoose.Schema;
        var userColSchema={
            email: String, // Removed unique: true
            date: Date,
            sales: Number,
            customers: Number
        }
    var ver={
        versionKey: false, // to avoid __v field in table come by default
      }
      var UserColShema=new userScheema(userColSchema,ver);
var UserColRef=mongoose.model("userSalesDetails",UserColShema);//create collection in mongodb database
return UserColRef;
}
module.exports ={getSalesModel}



