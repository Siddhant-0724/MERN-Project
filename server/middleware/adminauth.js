const User = require('../models/Usermodel')
const authAdmin = async(req,res,next)=>{   
    try{    
        const user = await User.findOne({
            _id : req.user.id

        })
        if(user.role===0)
        return res.status(400).json({msg:"Admin acess denied"})
        
        next()
    }catch(err){
        res.status(500).json({msg:"Admin Recousces Acess Denied"})
    }
}

module.exports = authAdmin