var jwt = require("jsonwebtoken");
function validateToken(req,resp,next)
{

       const full_token = req.headers['authorization'];//keyword
        //console.log(full_token);
    
        var ary=full_token.split(" ");
        let actualToken=ary[1];
        let isTokenValid;
        
    
        try{
            isTokenValid= jwt.verify(actualToken,"JaiMataDi");
            console.log(isTokenValid);
            if(isTokenValid!=null)
            {
                const payload = jwt.decode(ary[1]);
                console.log(payload);
                next();
                //resp.json({status:true,msg:"**Aauthorized",item:payload});
            }
            else
            resp.json({status:false,msg:"Token is not Valid"});
            
            
        }
        catch(err)
        {
            resp.json({status:false,msg:err.message});
            return;
        }
            
}
module.exports={validateToken};