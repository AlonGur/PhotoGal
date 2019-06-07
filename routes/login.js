var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/',function (req,res,next){
  //res.send('hereeeee')
   res.render('login')

})

router.post('/',  passport.authenticate('local',  { successRedirect: '/photos',
failureRedirect: '/logins' }))

module.exports=router;