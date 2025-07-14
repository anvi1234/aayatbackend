const mongoose = require('mongoose');
const _= require('lodash')
const SOR = mongoose.model('Sor')
const SAMPLESOR = mongoose.model('SampleSor')
const SORREgSITE = mongoose.model('SORRegardingSite')
const SORBill = mongoose.model('SORBillSite')
const SORData = mongoose.model('SORData')
//SOR//

module.exports.addSor = async (req, res, next) => {
  try {
    const { sampleName, state, data } = req.body;

    // 1. Save base SOR info (without large data array)
    const sor = new SOR({ sampleName, state });
    const savedSor = await sor.save();

    // 2. Map and save each data item individually with reference to SOR
    const sorDataArray = data.map(item => ({
      sorId: savedSor._id,
      ...item
    }));

    await SORData.insertMany(sorDataArray);

    return res.status(200).json({
      message: "SOR and related data inserted successfully",
      sor: savedSor,
      dataCount: sorDataArray.length,
    });

  } catch (err) {
    if (err.code == 11000) {
      console.log("Duplicate key error");
      return res.status(400).json({ message: "Duplicate entry" });
    } else {
      console.error(err);
      return next(err);
    }
  }
};
// module.exports.addSor = (req,res,next) =>{
//     var sor = new SOR()
//      sor.sampleName = req.body.sampleName
//      sor.state = req.body.state
//      sor.data = req.body.data
//    sor.save((err,doc)=>{
//         if(!err)
//         return res.status(200).json({
//             "sor": sor
        
//         })
//         else{
//             if(err.code==11000){
//                 console.log("Duplicate Email Found");
//             }
//             else{
//                 return next(err);
//             }
//         }
//     })
// }

module.exports.getSor = (req,res,next)=>{
    SOR .find(function (err, expenses) {
      if (err) {
      console.log(err);
      }
      else {
      res.json( expenses);
      }
      });
   }

   module.exports.getSORById = async (req,res,next)=>{
   try {
    const sorId = req.params.id;

    const sor = await SOR.findById(sorId);
    if (!sor) return res.status(404).json({ message: "SOR not found" });

    const data = await SORData.find({ sorId: sor._id });

    return res.status(200).json({
      sor,
      data,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
   }
  

   module.exports.updateSor = (req, res, next) => {
  const sorId = req.body.sorId;              // Main SOR document ID
  const dataItemId = req.body.dataItemId;    // ID of item inside data array
  const updatedFields = req.body.updatedFields; // Object with updated fields
  SOR.updateOne(
    { _id: sorId, "data._id": dataItemId },
    {
      $set: {
        "data.$.FinalRate": updatedFields.FinalRate,
        "data.$.Description": updatedFields.Description,
        "data.$Sn":updatedFields.Sn,
        "data.$ServiceNo":updatedFields.ServiceNo,
        "data.$UOM":updatedFields.UOM,
      }
    },
    (err, result) => {
      if (!err) {
        res.status(200).json({ message: 'Data item updated successfully', result });
      } else {
        next(err);
      }
    }
  );
};

 
      module.exports.deleteSOR = async (req,res,next)=>{
         try {
    const sorId = req.params.id;

    // 1. Delete the main SOR document
    const deletedSOR = await SOR.findByIdAndDelete(sorId);

    if (!deletedSOR) {
      return res.status(404).json({ message: "SOR not found" });
    }

    // 2. Delete all data associated with this SOR
    const deleteResult = await SORData.deleteMany({ sorId });

    return res.status(200).json({
      message: "SOR and its associated data deleted successfully",
      deletedSOR,
      deletedDataCount: deleteResult.deletedCount,
    });

  } catch (err) {
    console.error("Delete error:", err);
    return next(err);
  }
        }


        //Sample SOR //
        module.exports.addSampleSor = (req,res,next) =>{
          var sor = new SAMPLESOR()
           sor.sampleName = req.body.sampleName
           sor.data = req.body.data
           sor.state = req.body.state
           sor.save((err,doc)=>{
              if(!err)
              return res.status(200).json({
                  "sor": sor
              
              })
              else{
                  if(err.code==11000){
                      console.log("Duplicate Email Found");
                  }
                  else{
                      return next(err);
                  }
              }
          })

         
      }
      module.exports.getSampleSor = (req,res,next)=>{
        SAMPLESOR.find(function (err, sor) {
          if (err) {
          console.log(err);
          }
          else {
          res.json( sor);
          }
          });
       }


       //SOR RegardingSite//
       module.exports.addSorRegardingSite = (req,res,next) =>{
        var sor = new SORREgSITE()
         sor.siteName = req.body.siteName
         sor.locationName = req.body.locationName
         sor.data = req.body.data
         sor.nameOfConstruction = req.body.nameOfConstruction
         sor.nameOfWork = req.body.nameOfWork
         sor.totalAmount = req.body.totalAmount,
         sor.gstAmount = req.body.gstAmount,
         sor.sgstAmount = req.body.sgstAmount,
         sor.combineAmount = req.body.combineAmount,
         sor.cgst =  req.body.cgst 
         sor.sgst =  req.body.sgst
         sor.sampleName =  req.body.sampleName
         sor.save((err,doc)=>{
            if(!err)
            return res.status(200).json({
                "sor": sor,
                "message":"success"
            
            })
            else{
                if(err.code==11000){
                    console.log("Duplicate Email Found");
                }
                else{
                    return next(err);
                }
            }
        })

       
    }
    module.exports.getSorRegSite = (req,res,next)=>{
        SORREgSITE.find(function (err, sor) {
        if (err) {
        console.log(err);
        }
        else {
        res.json( sor);
        }
        });
     }

     module.exports.deleteSorRegSite = (req,res,next)=>{ 
        let id = req.params.id;
        SORREgSITE.findByIdAndRemove({ _id: req.params.id }, function (err,expense) {
          if (err) res.json(err);
          else res.json('MB Deleted Successfully');
          });
        }

        module.exports.getSORREgardingById = (req,res,next)=>{
            let id = req.params.id
            SORREgSITE.findOne({_id:id},
      (err,SOR)=>{
        if(SOR){
             return res.status(200).json({
              status:true,data: SOR
          })
        }

        else{
            return [];
        }
    })
      
        }
        module.exports.updateSorRegBySite = (req,res,next)=>{
        SORREgSITE.findById(req.params.id, function (err, sor) {
         
          if (!sor)
          
          return next(new Error('Unable To Find Site With This Id'));
          else {
            sor.siteName = req.body.siteName
            sor.data = req.body.data
            sor.nameOfConstruction = req.body.nameOfConstruction
            sor.nameOfWork = req.body.nameOfWork
            sor.totalAmount = req.body.totalAmount,
            sor.gstAmount = req.body.gstAmount,
            sor.sgstAmount = req.body.sgstAmount,
            sor.combineAmount = req.body.combineAmount,
            sor.cgst =  req.body.cgst 
            sor.sgst =  req.body.sgst
           sor.save().then(emp => {
    
              
          res.json('Site Updated Successfully');
          })
          .catch(err => {
          res.status(400).send("Unable To Update Site");
          });
          }
          });
       } 

        //SOR BILL //
     module.exports.addBillSor = (req,res,next) =>{
        var sor = new SORBill()
         sor.billDeatilsObj = req.body.billDeatilsObj
         sor.locationName = req.body.locationName
         sor.data = req.body.data
         sor.sgst = req.body.sgst
         sor.billName = req.body.billName
         sor.cgst = req.body.cgst
         sor.gstAmount = req.body.gstAmount
         sor.sgstAmount = req.body.sgstAmount
         sor.totalAmount = req.body.totalAmount 
         sor.combinedAmount = req.body.combinedAmount
         sor.sampleName =  req.body.sampleName
         sor.save((err,doc)=>{
            if(!err)
            return res.status(200).json({
                "sor": sor
            
            })
            else{
                if(err.code==11000){
                    console.log("Duplicate Email Found");
                }
                else{
                    return next(err);
                }
            }
        })

       
    }
    module.exports.deleteSorBill = (req,res,next)=>{
    
        let id = req.params.id;
        SORBill.findByIdAndRemove({ _id: req.params.id }, function (err,expense) {
          if (err) res.json(err);
          else res.json('Bill Deleted Successfully');
          });
        }
    
        module.exports.getSorBill = (req,res,next)=>{
        SORBill.find(function (err, sor) {
        if (err) {
        console.log(err);
        }
        else {
        res.json( sor);
        }
        });
     }

      module.exports.getSORBillById = (req,res,next)=>{
            let id = req.params.id
            SORBill.findOne({_id:id},
      (err,SOR)=>{
        if(SOR){
             return res.status(200).json({
              status:true,data: SOR
          })
        }

        else{
            return [];
        }
    })
      
        }

     
