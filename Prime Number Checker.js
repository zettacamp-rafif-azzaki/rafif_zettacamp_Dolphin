/**
 *
 * Write a Node.js function isPrime(n) that takes an integer n as an argument and returns true if n is a prime number and false otherwise.
 *
 */
let start;
let end;
function isPrime(n) {
  // if(n===2 || n===3 || n===5 || n=== 7){
  //   return true;
  // }else if(n<2){
  //   return false;
  // }else if((n%2===0 || n%3===0 || n%5===0 || n%7===0) && n>1){
  //   return false;
  // }
  // else{
  //   return true;
  // }
  if(n%1!==0){
    return false
  }

  if (n < 2) {
    return false;
  }
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
    return true;

}
console.log(isPrime(2.5));
console.log(isPrime(43));

start=performance.now();
isPrime(43);
end=performance.now();
console.log(end-start);

array=[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]


for(i=0;i<array.length;i++){
  console.log( array[i] + "-" + isPrime(array[i]));
}

for(i=0;i<200;i++){
  console.log(i + "-" + isPrime(i));
}


