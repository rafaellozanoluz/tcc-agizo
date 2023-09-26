let count = 1;
document.getElementById("radio1").checked = true;
  

    
  setInterval(function(){
    nextComponent();
  },2000)
 



function  nextComponent () {
  count++;
  if(count>4){
    count=1;
  }
  document.getElementById("radio"+count).checked = true;
}