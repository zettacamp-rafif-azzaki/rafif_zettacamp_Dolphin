/*
Title: Unique Characters

Description:
Write a function named hasUniqueCharacters that takes a string as
input and returns true if the string contains all unique characters, and false otherwise.
You can assume that the string contains only lowercase alphabets (a-z).

Example:
console.log(hasUniqueCharacters("abcdefg")); // Output: true
console.log(hasUniqueCharacters("hello")); // Output: false
*/

console.log(hasUniqueCharacters("abcdefg"));
console.log(hasUniqueCharacters("123"));
console.log(hasUniqueCharacters("abc123"));
console.log(hasUniqueCharacters("hello"));
console.log(hasUniqueCharacters("abca123"));


function hasUniqueCharacters(str) {
  // Your logic here
  str = str.toLowerCase();
  
  for(i=0;i<str.length;i++){
    // console.log(str[i]);
    if(str.includes(str.charAt(i), i+1)){
      return false;
    }
  }
  return true;
}
