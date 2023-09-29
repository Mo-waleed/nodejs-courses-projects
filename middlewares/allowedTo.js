export const allowedTo = (...roles)=>{
    //  console.log("roles",roles);

    return (req,res,next)=>{
        if (!roles.includes(req.currentToken.role)) {
             res.status(401).json({message:"You are not authorized to perform this action"});
             return;
        }
      next()
    }

}