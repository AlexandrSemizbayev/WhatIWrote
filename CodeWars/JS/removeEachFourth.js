/* We got number in range from 1 til 999 ,
after reaching 999 it restarts to count ,
well our task is to remove each fourth number.
The question is : which three numbers will be available at least. */

var arr = [];
for(var i=1;i<1000;i++){
	arr.push(i);
}
while(arr.length>3){
	for(var j=0;j<arr.length;j++){
  	if(j%3==0){
    arr.splice(j,1);
    }
  }
  console.log(arr);
}
