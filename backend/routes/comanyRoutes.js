const express = require('express');
const routes = express.Router();
const company =  require('../models/company');
const multer = require("multer");
// const storage = multer.memoryStorage();
const upload = require('../middleware/multer');
const cloudinary = require("../config/cloudinary");
const auth = require("../middleware/auth");


routes.get('/home',(req,res) => {
    res.send("company page")
})

routes.post('/register',upload.single("logo"),async(req,res)=>{
    try{
          const data = req.body;
          //1
          let logoUrl = "";
          //2 now upload logo if file present
           if (req.file) {
      const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      const result = await cloudinary.uploader.upload(base64, {
        folder: "company-logos",
      });

      logoUrl = result.secure_url;
    }
    //3
      data.logo  = logoUrl;

      //create and save
      const newCompany = await company.create({
        userId : data.userId,
        name : data.name,
        industry: data.industry,
        description : data.description,
        services : data.services,
        // image : data.image,
        logo : data.logo
      })
    //  const newCompany = await response.save();
    res.status(200).json({
        message : "Company created Successfully",
        company : newCompany,
    });
 } catch(err){
     console.log(err);
     res.send(err);
    }
})

// Search companies by name, industry, or services (MUST be before /:id)
routes.get('/search', async (req, res) => {
  try {
    const { name, industry, services } = req.query;
    const query = {};
    if (name) query.name = { $regex: name, $options: 'i' };
    if (industry) query.industry = { $regex: industry, $options: 'i' };
    if (services) query.services = { $regex: services, $options: 'i' };
    const results = await company.find(query);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: 'Search failed', details: err.message });
  }
});

routes.get('/companies',async(req,res)=>{
    
    try{
        const data = await company.find();
        res.status(200).json(data);
    
    } 
    catch(err){
     console.log(err);
     res.send(err);
    }
})

// Only one /:id route, and it must be last
routes.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const foundCompany = await company.findById(id);
    if (!foundCompany) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.status(200).json(foundCompany);
    console.log('found !!!');
  } catch (err) {
    console.error('Get company by ID error:', err);
    res.status(500).json({ error: 'Failed to fetch company by ID' });
  }
});

module.exports = routes