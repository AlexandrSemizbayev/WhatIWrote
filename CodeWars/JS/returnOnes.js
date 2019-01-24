var countBits = function(n) {
var binar = n.toString(2).match(/1/gmi);
binar==null?binar=0:binar=binar.length;
return binar;
}
