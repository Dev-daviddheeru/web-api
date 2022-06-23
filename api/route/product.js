const express = require("express");
const Product = require("../model/product")
const mongoose = require("mongoose")
const cloudinary = require("cloudinary").v2;
const checkauth = require('../middelware/check-auth')


const router = express.Router();


cloudinary.config({
    cloud_name:"david007",
    api_key:"771584627444952",
    api_secret:"jmxGLS--MS823YfYliWxrnA9mME"
})
router.get('/', checkauth, (req, res, next)=>{
  Product.find()
  .then((result)=>{
      console.log(result)
      res.status(200).json({
          productData:result
      })
  })
  .catch((err)=>{
      console.log(err)
      res.status(200).json({
          error:err
      })
  })
   })

router.get('/:id', (req, res, next)=>{
    console.log(req.params.id);
    Product.findById(req.params.id)
    .then((result)=>{
        console.log(result)
        res.status(200).json({
            data:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            data:err
        })
    })
})

router.post('/',  (req, res, next)=>{
    console.log(req.files.photo)
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath, (err, result)=>{
        console.log(result)
        const product = new Product({
            _id: new mongoose.Types.ObjectId,
            code:req.body.code,
            title:req.body.title,
            description:req.body.description,
            mrp:req.body.mrp,
            sp:req.body.sp,
            discountPercent:req.body.discountPercent,
            imagePath:result.url
        })      
        product.save().then(result=>{
            console.log(result);
            res.status(200).json({
               newProduct:result
            })
        }).catch((err)=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
    })

})

router.put('/:id',(req,res,next)=>{
   Product.findOneAndUpdate({_id:req.params.id},{
       $set:{
        code:req.body.code,
        title:req.body.title,
        description:req.body.description,
        mrp:req.body.mrp,
        sp:req.body.sp,
        discountPercent:req.body.discountPercent,
        imagePath:req.body.imagePath
       }
   })
   .then(result=>{
       res.status(200).json({
           
           newProduct:result
       })
   })
   .catch(err=>{
       res.status(500).json({
           data:err
       })
   })
   
    
})

router.delete('/:id',(req,res,next)=>{
    const id = req.params.id;
    Product.remove({_id: id})
    .then(result=>{
        res.status(200).json({
            massage:"Product deleted",
            result:result
        })
        .catch(err=>{
            res.status(500).json({
                massage:"Something is wrong",
                error:err
            })
        })
    })
})

module.exports = router;