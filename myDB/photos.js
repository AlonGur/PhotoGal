var mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/myDB', {useNewUrlParser: true},
    function (err){
        if (err){
            console.log (err)
        }
        else{
            console.log('connected...')
        }
    }
    );

    var photos= new mongoose.Schema({
        name: String,
        path: String,
    })

    var model=mongoose.model('Photos',photos);
   
    module.exports=model;
  