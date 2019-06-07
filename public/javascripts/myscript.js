console.log('aaaa')




    var allNavs=document.querySelectorAll('nav li')
    console.log('allnav is',allNavs)
    allNavs.forEach(addlis)
        
        function addlis (node){
       // node.addEventListener('click',navClickHandler)
       node.onclick=navClickHandler;
        console.log('added listner in:',node )
    }

    function navClickHandler(e){
        console.log(e);
        e.target.classList.add('selected'); 
}




function myfunction(e){
    var target=e.path[1];
    var myID=target.dataset.id
    console.log(myID)
   // console.log(e.target)
}

var searchBox=document.querySelector('.searchBox');
var submit=document.querySelector('.submit')
submit.addEventListener('click',function (e){
    console.log(searchBox.value)
})

