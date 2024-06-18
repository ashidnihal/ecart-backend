const users=require('../Models/userSchema')
const jwt=require('jsonwebtoken')

// register

exports.register=async(req,res)=>{
    const {username,email,password}=req.body

    try{
        const existingUser=await users.findOne({email})
            if(existingUser){
                res.status(406).json('Already Registered')
            }else{
                const newUser = new users({
                    username,
                    email,
                    password
                })
               await newUser.save()
               res.status(200).json(newUser)
            }
        }catch(err){
            res.status(501).json('Registration failed')
        }
    }

    // login

    exports.login=async(req,res)=>{
        const{email,password}=req.body
        try{
            const existingUser=await users.findOne({email,password})
            if(existingUser){
                const token=jwt.sign({userid:existingUser._id},process.env.JWTKEY)
                console.log(token);
                res.status(200).json({token,existingUser})
            }else{
                res.status(404).json("invalid email or password")
            }
        }catch(err){
            res.status(501).json("login failed"+err)
        }
    }
    