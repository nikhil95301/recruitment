const express = require('express')
const User = require('../models/model.js')
const bcrypt = require('bcryptjs')
const router = new express.Router()
router.post('/user', async (req,res) =>{
    const user = new User(req.body)
    try{
       await user.save()
    //    const hashedpassword = await bcrpyt.hash(req.body.password,8)
    //    console.log(hashedpassword)
       if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
      }
      var secretKey = "6LdhWusUAAAAAKtjj3FQ-P03xyzXD6TCdmXCJlFi"
      var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
      request(verificationUrl,function(error,response,body) {
        body = JSON.parse(body);
        if(body.success !== undefined && !body.success) {
          return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
        }
        res.json({"responseCode" : 0,"responseDesc" : "Success"});
      });
       res.status(201).send(user)
    }catch(e) {
         res.status(400).send(e)
    }
})
module.exports = router