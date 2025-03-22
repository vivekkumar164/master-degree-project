const express = require('express');
const user = require('../models/userModel');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');    
const  authMiddleware  = require('../middlewares/authMiddlewares');



const router = express.Router();

router.post('/register',async (req,res)=>{
    try {
        const userExists = await user.findOne({email:req.body.email})
        if(userExists){
            res.send({
                success : false,
                message: 'user already exists:'
            })

        }

        const salt = await bcrypt.genSalt(10)

        const hashPwd = bcrypt.hashSync(req.body.password , salt);
        req.body.password = hashPwd;

        const newUser = await user(req.body);
        await newUser.save();

        res.send({
            success : true,
            message: 'user Registered:'
        })
    } catch (error) {
        console.log(error);
    }
})

router.post('/login', async(req,res)=>{
    try {
        const userExists = await user.findOne({email : req.body.email});
        if(!userExists){
            res.send({
                success:false,
                message:"user already exists please register"
            })
        }
       
        const validPassword = await bcrypt.compare(req.body.password , userExists.password);

        if(!validPassword){
            res.send({
                success:false,
                message:"wrong password"
            })
        }

        const token = jwt.sign({ userId: userExists._id }, process.env.secret_key_jwt, {
            expiresIn: "1d",
          });

        res.send({
            success:true,
            message:"you have successfully logged in",
            token:token
        })

    } catch (error) {
        console.log(error);
    }
})

//router-level-middleware
router.get("/get-current-user", authMiddleware, async (req, res) => {
    const user1 = await user.findById(req.body.userId).select("-password");
  
    res.send({
      success: true,
      message: 'You are authorized to go to the protected route!',
      data: user1
     })
  });

module.exports=router;