var express = require('express');
var router = express.Router();
var model=require('../myDB/photos');


var app = express();

router.get('/', function(req,res,next){
  res.redirect('/photos/med/1')
})
// router.get('/:size/:page',function(req,res,next){
//  // res.send(`yessss, ${req.params.size},${req.params.page}`);

// })
router.get('/:size/:page', renderPage())
router.get('/:size/:page/:searchQuery',renderPage())



function renderPage(){
  return function (req,res,next){

 
    //find all picutres matching the search param
    var searchPhrase=req.params.searchQuery || ''
    var searchQ= new RegExp(searchPhrase)
    model.find({name:searchQ},
      null,
      {skip: (req.params.page-1)*req.app.locals.picsPerPage , limit: req.app.locals.picsPerPage},
      function (err, files){
      if (err){
        throw err
      }
      else{

        if(req.params.page==='1'){
          console.log(typeof req.params.page)
          res.locals.includePrev=false
        }
        else{
          res.locals.includePrev=true
        }
        console.log('gonna render pageeeee', req.app.locals.picsPerPage);
        res.render('newPaging',{files:files,searchPhrase:searchPhrase,
          pagenum: req.params.page, size: req.params.size, user: req.user })
      }
    })
  }
}

module.exports = router;

