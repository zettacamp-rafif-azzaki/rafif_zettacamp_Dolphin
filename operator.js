let favourite_book = "Sherlock Holmes";
const fav_book = "Keep Going";

favourite_book="Everlost"
var hasil;

// #1. if-else
if(favourite_book==fav_book){
    hasil=true;
}else{
    hasil=false;
}

// #1. if-else
if(favourite_book === "Everlost"){
    hasil="strict equal";
}else if(favourite_book == "Everlost"){
    hasil="equal operator";
}else{
    hasil="undefined";
}
console.log(hasil);

// #1. if-else one line
let operator = (favourite_book==='Everlost') ? "===" : (favourite_book == "Everlost" ? "==" : "undefined");

console.log(operator);




// #2. operator
let bookPrice1 = 50000;
let bookPrice2 = 100000;
var comparison;

// #2. a.
if(bookPrice1 > bookPrice2){
    comparison = bookPrice1 + " lebih besar dari " + bookPrice2;
}else{
    comparison = bookPrice1 + " kurang dari " + bookPrice2;
}
console.log(comparison);

// #2. b.
let average = (bookPrice1+bookPrice2)/2;
let ternary = average <= 500000 ? "Cheap" : "Expensive";
console.log(ternary);


//additional explore
var obj = {
    key1:"value1",
    key2:"value2"
  };
  

console.log(obj);

obj["key1"] = obj["key3"];
delete obj.key1;

obj.key3 = "value3";
obj['key4']='value4';

console.log(obj);

const a= new Object
for(i=5;i>0;i--){
    eval("a['key" + i + "']='value"+ i +"'");
}
console.log(a);


const fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits);


fruits.push(obj.key3);
console.log(fruits);


for(i=0;i<3;i++){   
    console.log(++i);
}

