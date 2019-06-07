var model=require('../myDB/photos')
var fs=require('fs')

module.exports=function(){

//delete photos from DB
    model.deleteMany({},function (err){
        if (err){
            throw err
        }
        else{
            console.log('deleted photos')
        }
    })
//delete everything from images folder


//create in images folder /resized/small..med..large
}()