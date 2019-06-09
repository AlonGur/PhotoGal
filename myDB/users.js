var mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/myDB', {useNewUrlParser: true},
    function (err){
        if (err){
            console.log (err)
        }
        else{
          //  console.log('connected...')
        }
    }
    );

    
    var User= new mongoose.Schema({
        name: String,
        email: String,
        password: String
    })
    var User=mongoose.model('Users',User);

    module.exports=User;
  