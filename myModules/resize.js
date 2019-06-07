var sharp=require('sharp')
var path=require('path')
var appRoot=process.env.PWD
const mySizes={
    small: 100,
    med: 200,
    large: 300,
    
}

module.exports=function(fileName){
  //console.log('AAAAAAA',mySizes.small.name)
  
     
        for(size in mySizes){
            console.log('xxxxxxxxxx', size, mySizes[size])
            sharp( path.join(appRoot,'public','images',fileName))
            .resize(mySizes[size],mySizes[size])
            .toFile( path.join(appRoot,'public','images','resized',`${size}`,fileName), 
            function(err, info){
                if (err){
                    console.log(err)
                }
                else{
                    console.log(info)
                }
            } )
        }
       
}
