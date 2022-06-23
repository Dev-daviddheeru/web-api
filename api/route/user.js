const express = require('express');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../model/user')
const checkauth = require('../middelware/check-auth')
const router = express.Router();

router.get('/', checkauth, (req, res, next)=>{
  User.find()
  .then(result=>{
      res.status(200).json({
          userData:result
      })
  })
  .catch(err=>{
      res.status(500).json({
          error:"Something went wrong"
      })
  })
})

router.get('/:id', (req, res, next)=>{
    User.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            User:result
        })
    })
    .catch(err=>{
        res.status(200).json({
            err:err
        })
    })
})

router.post('/signup', (req, res, next)=>{
    bcrypt.hash(req.body.password, 10, (err, hash)=>{
        if(err){
            return res.status(500).json({
                msg:err
            })
        }else{
            const user = new User({
                _id: new mongoose.Types.ObjectId,
                userName:req.body.userName,
                password:hash,
                phone:req.body.phone,
                email:req.body.email,
                userType:req.body.userType
            })
            user.save()
            .then(result=>{
                res.status(200).json({
                    NewUser:result
                })
            })
            .catch(err=>{
                res.status(500).json({
                    error:err
                })
            })
        }
       
    })
    
   
})

router.post('/login', (req, res, next)=>{
   User.find({userName:req.body.userName})
   .exec()
   .then(user=>{
    console.log(user.length)
       if(user.lenght<1){
           console.log(user)
           return res.status(401).json({
               msg:"User not exist"
           })
       }
       bcrypt.compare(req.body.password, user[0].password,(err, result)=>{
           if(!result){
               res.status(401).json({
                   msg:"Password did not match"
               })
           }
           if(result){
                const token = jwt.sign({
                    userName: user[0].userName,
                    userType: user[0].userType,
                    email: user[0].email,
                    phone: user[0].phone
                },
                    "I am developer",
                {
                    expiresIn:"24h"    
                }
                )
                res.status(200).json({
                    userName: user[0].userName,
                    userType: user[0].userType,
                    email: user[0].email,
                    phone: user[0].phone,
                    token:token
                })
           }
       })
   })
   .catch(err=>{
       res.status(500).json({
           msg:"something went wrongh"
       })
   })
})

router.put('/:id',checkauth, (req, res, next)=>{
    User.findOneAndUpdate({_id:req.params.id},{
        $set:{
        userName:req.body.userName,
        password:req.body.password,
        phone:req.body.phone,
        email:req.body.email,
        userType:req.body.userType
        }
    } )
    .then(result=>{
        res.status(200).json({
            UserUpdated:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            err:err
        })
    })
})

router.delete('/:id',checkauth, (req, res, next)=>{
    User.remove({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            data:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            data:err
        })
    })
})

module.exports = router;