/* INSTRUCTIONS*/
/* Complete the method/function so that it converts dash/underscore delimited words into camel casing. The first word within the output should be capitalized only if the original word was capitalized.

Examples
toCamelCase("the-stealth-warrior") // returns "theStealthWarrior"

toCamelCase("The_Stealth_Warrior") // returns "TheStealthWarrior" */


function toCamelCase(str){
  var arr = [];
    			for(var i=0;i<str.length;i++){
      				if(str[i].match(/\W|_/gmi)){
        				i++;
        				arr.push(str[i].toUpperCase());
      				} else {
        				arr.push(str[i]);
      				}
    	}
    		arr=arr.join('')
    		return arr;
}
