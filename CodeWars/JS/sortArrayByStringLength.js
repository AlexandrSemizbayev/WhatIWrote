function sortByLength (array) {
  return array.sort((a,b)=>{
    	return a.length - b.length;
    })
}
sortByLength(['Beg','Life','I','To']);
