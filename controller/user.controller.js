const mongoose = require('mongoose');
const passport = require('passport');
const _= require('lodash')
const User = mongoose.model('User')

module.exports.register = async (req, res, next) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            // Email already exists — send 200 with a message
            return res.status(200).json({
                message: "Email already exists.",
                alreadyExists: true,
                status: 200
            });
        }

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

        const savedUser = await user.save();

        return res.status(200).json({
            message: "User registered successfully",
            data: savedUser,
            status: 200
        });
    } catch (err) {
        console.error("Register Error:", err);
        return res.status(500).json({
            message: "Something went wrong.",
            error: err.message,
            status: 500
        });
    }
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
  
  module.exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if another user already has the same email
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser && existingUser._id.toString() !== req.params.id) {
            return res.status(200).json({
                message: "Email already exists.",
                alreadyExists: true,
                status: 200
            });
        }

        // Proceed with update
        user.siteName = req.body.siteName;
        user.location = req.body.location;
        user.fullName = req.body.fullName;
        user.email = req.body.email;
        user.password = req.body.password;
        user.designation = req.body.designation;
        user.mobileNo = req.body.mobileNo;
        user.adharNo = req.body.adharNo;
        user.address = req.body.address;
        user.basicPay = req.body.basicPay;
        user.bankName = req.body.bankName;
        user.accNo = req.body.accNo;
        user.ifsccode = req.body.ifsccode;
        user.uniqueSiteId = req.body.uniqueSiteId;

        const updatedUser = await user.save();

        return res.status(200).json({
            message: "User updated successfully.",
            data: updatedUser,
            status: 200
        });

    } catch (err) {
        console.error("Update Error:", err);
        return res.status(500).json({
            message: "Something went wrong during update.",
            error: err.message,
            status: 500
        });
    }
};

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
 