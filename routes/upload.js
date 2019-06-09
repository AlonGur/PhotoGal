var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
var model = require('../myDB/photos')
var resize = require('../myModules/resize')


router.get('/', function (req, res, next) {
    res.render('upload', { title: 'upload form' })
})


router.post('/', upload.array('pic'), function (req, res, next) {
    var appRoot = process.env.PWD;
    req.files.forEach(function (pic) {
        model.create({
            name: pic.originalname,
            path: pic.originalname
        });
        fs.rename(path.join(appRoot, pic.path),
            path.join(appRoot, 'public', 'images', pic.originalname),
            function (err) {
                if (err) {
                    next(err)
                }
                else {                    
                    resize(pic.originalname)
                }
            })
    })

    res.redirect('/')
})



module.exports = router;