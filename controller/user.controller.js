const mongoose = require('mongoose');
const passport = require('passport');
const _= require('lodash')
const User = mongoose.model('User')

module.exports.register = (req, res, next) => {
    const user = new User({
        siteName: req.body.siteName,
        location: req.body.location,
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        designation: req.body.designation,
        mobileNo: req.body.mobileNo,
        adharNo: req.body.adharNo,
        address: req.body.address,
        basicPay: req.body.basicPay,
        bankName: req.body.bankName,
        accNo: req.body.accNo,
        ifsccode: req.body.ifsccode,
        uniqueSiteId: req.body.uniqueSiteId,
    });

    user.save((err, doc) => {
        if (!err) {
            return res.status(200).send({
                message: "User registered successfully",
                data: doc,
                status:200
            });
        } else {
            if (err.code === 11000) {
                return res.status(400).send({
                    message: "Email already exists.",
                    status:400
                });
            } else {
                return res.status(500).send({
                    message: "Something went wrong.",
                    error: err.message,
                    status:500
                });
            }
        }
    });
};

module.exports.authenticate=(req,res,next)=>{
passport.authenticate('local',(err,user,info)=>{
if(err)
return res.status(400).json(err);
else if(user) 

return res.status(200).json({
    "token":user.generateJwt(),
    "user":user

})
else return res.status(404).json(info)
})(req,res)
}


module.exports.getUser = (req,res,next)=>{
    User.find(function (err, expenses) {
      if (err) {
      console.log(err);
      }
      else {
      res.json( expenses);
      }
      });
   }
  
   module.exports.getUserById = (req,res,next)=>{
    let id = req.params.id;
    User.findOne({_id:id},
      (err,user)=>{
          if(!user)
          return res.status(404).json({
              status:false,message:"User not found"
          })
        else
          return res.status(200).json({
              status:true,user: user
          })
      }
      )
  
   }
  
   module.exports.updateUser = (req,res,next)=>{
    User.findById(req.params.id, function (err,user) {
      if (! user)
      return next(new Error('Unable To Find Expenses With This Id'));
      else {
        user.siteName = req.body.siteName;
        user.location = req.body.location;
        user.fullName = req.body.fullName;
        user.email =  req.body.email;
        user.password = req.body.password;
        user.designation = req.body.designation;
        user.mobileNo = req.body.mobileNo;
        user.adharNo = req.body.adharNo;
        user.address = req.body.address;
        user. basicPay = req.body.basicPay;
        user.bankName = req.body.bankName;
        user.accNo = req.body.accNo;
        user.ifsccode = req.body.ifsccode;
        user.uniqueSiteId = req.body.uniqueSiteId;
        user.save().then(emp => {
      res.json('User Updated Successfully');
      })
      .catch(err => {
      res.status(400).send("Unable To Update Expenses");
      });
      }
      });
   } 
      module.exports.deleteUser = (req,res,next)=>{
         let id = req.params.id;
          User.findByIdAndRemove({ _id: req.params.id }, function (err,expense) {
          if (err) res.json(err);
          else res.json('User Deleted Successfully');
          });
        }

module.exports.cngSite = (req,res,next)=>{
   User.findOne({_id:req._id},
   (err,user)=>{
       if(!user)
       return res.status(404).json({
           status:false,message:"User not found"
       })
     else
       return res.status(200).json({
           status:true,user: _.pick(user,['fullName','email'])
       })
   }
   )
}

 module.exports.getUserByUniqueId = (req,res,next)=>{
        User.find({ uniqueSiteId : req.params.id},
      (err,trans)=>{
        return res.status(200).json({
          status:true,data: trans
      })
      })
      }
 