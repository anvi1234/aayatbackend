const mongoose = require('mongoose');
const passport = require('passport');
const _= require('lodash')
const Attendence = mongoose.model('Attendence')
const Site = mongoose.model('SiteRegistration')

module.exports.addAttendence = (req,res,next) =>{
    var attendecne = new Attendence()
    attendecne.employeeName = req.body.employeeName;
    attendecne.siteName = req.body.siteName;
    attendecne.location = req.body.location;
    attendecne.status = req.body.status;
    attendecne.color= req.body.color;
    attendecne.date = req.body.date;
    attendecne.startDate = req.body.startDate ;
    attendecne.endDate = req.body.endDate;
    attendecne.approvalStatus = req.body.approvalStatus;
    attendecne.uniqueSiteId = req.body.uniqueSiteId
    
    attendecne.save((err,doc)=>{
        if(!err)
        return res.status(200).json({
            "user": attendecne
        
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

module.exports.getAttendanceById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const attendance = await Attendence.find({ employeeName: id });

        if (!attendance || attendance.length === 0) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        const attendanceWithSites = [];

        for (const att of attendance) {
            const siteId = att.uniqueSiteId;
            const site = await Site.findOne({ uniqueSiteId: siteId });
            
            if (site) {
                att.siteName = site.siteName;
                att.location = site.location; // Assuming 'siteName' is a property of the Site model
            } else {
                att.siteName = "Unknown Site"; // Default value if site is not found
            }
            
            attendanceWithSites.push(att);
        }

        return res.status(200).json({
            status: true,
            attendance: attendanceWithSites
        });
    } catch (error) {
        console.log(error)
        // Handle any errors
        return res.status(500).json({
            status: false,
            message: "An error occurred"
        });
    }
};
    
      
        module.exports.deleteAttendecne = (req,res,next)=>{
    
            let id = req.params.id;
            Attendence.findByIdAndRemove({ _id: req.params.id }, function (err,expense) {
              if (err) res.json(err);
              else res.json('Attendence Deleted Successfully');
              });
            }


            module.exports.updateAttendence = (req,res,next)=>{
                Attendence.findById(req.params.id, function (err, attendecne) {
                  if (!attendecne)
                  return next(new Error('Unable To Find Expenses With This Id'));
                  else {
                  
                    attendecne.employeeName = req.body.employeeName;
                    attendecne.siteName = req.body.siteName;
                    attendecne.location = req.body.location;
                    attendecne.status = req.body.status;
                    attendecne.color= req.body.color;
                    attendecne.date = req.body.date;
                    attendecne.approvalStatus = req.body.approvalStatus;
                    attendecne.startDate = req.body.startDate ;
                    attendecne.endDate = req.body.endDate;
                    attendecne.uniqueSiteId = req.body.uniqueSiteId
                    attendecne.save().then(emp => {
                  res.json('Attendence Updated Successfully');
                  })
                  .catch(err => {
                  res.status(400).send("Unable To Update Expenses");
                  });
                  }
                  });
                }