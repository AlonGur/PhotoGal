var express = require('express');
var router = express.Router();


router.get('/', function(req,res,next){
  res.redirect('/photos')
})

module.exports = router;