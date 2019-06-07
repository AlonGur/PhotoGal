//getting pic list that the server sent in 'pics' cookie

var myCookies=document.cookie;

var start=myCookies.indexOf('pics')
myPics=myCookies.slice(start)
myVal=readCookie('pics')
 myVal=decodeURIComponent(myVal)
myVal=myVal.slice(2)
 myPicArr=JSON.parse(myVal)
 
// push all files name from the cookie to picsArr array



//load first 3 pics
for(i=0;i<6 && myPicArr.length>0;i++){
    myDiv=document.createElement('div')
    myDiv.classList.add('picWrapper')
    myImg=new Image;
    myImg.src='images/'+myPicArr[0];
    myPicArr.shift()
    myDiv.append(myImg)
    target=document.querySelector('.picsWrapper')
    target.append(myDiv)
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}


$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 50) {
    console.log("near bottom!");
    if(myPicArr.length>0){
        for(i=0;i<3;i++){
            myDiv=document.createElement('div')
            myDiv.classList.add('picWrapper')
            myImg=new Image;
            myImg.src='images/'+myPicArr[0];
            myPicArr.shift()
            myDiv.append(myImg)
            target=document.querySelector('.picsWrapper')
            target.append(myDiv)
        }
    }
   

   
    }});