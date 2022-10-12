let count=0;


window.addEventListener("DOMContentLoaded",function(){
    const value=document.getElementById('value');
    const btns=document.querySelectorAll('.btn');
  btns.forEach(function(btn){
    btn.addEventListener("click",function(e){
        const counter=(e.currentTarget.id);
        if(counter==='increase')
        {
            count++;
            
        }
        else if(counter==="decrease")
        {
            count--;
        }
        else{
            count=0;
        }
        if(count>0)
        {
            value.style.color="green";
        }
        if(count<0)
        {
            value.style.color="red";
        }
        if(count===0)
        {
            value.style.color="black"
        }
        value.innerHTML=count;
    });
  });
  
   
})

