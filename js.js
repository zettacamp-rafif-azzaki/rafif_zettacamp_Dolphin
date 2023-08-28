// Amount of discount
// Price after discount
// Amount of tax
// Price after tax


// Note:
// The function must have at least:
// Constant variable
// Boolean, number, string variable
// Assignment, addition, addition, subtraction, multiplication, division operator
Purchase_Book("Everlost", 25, 3);




function Purchase_Book(book, discount, tax){
const books ={
    Everlost:{
        author : "Neal Shusterman",
        bookPrice : 70000
        
    },
    Sherlock_Holmes:{
        author : "Arthur Conan Doyle",
        bookPrice : 150000
    
    },
    Keep_Going:{
        author : "Austin Kleon",
        bookPrice : 100000
    }
};
let isOnLibrary = books.hasOwnProperty(book);

if(isOnLibrary){
    price = books[book].bookPrice;
    discountValue = price * (discount/100);
    priceAfterDiscount = price - discountValue;
    taxValue = price * (tax/100);

    BookMessage(books, book, price, discountValue, priceAfterDiscount, taxValue);

}else{
    console.log("Book name is not found")
}
}

function BookMessage(bookLibrary, book, price, discountValue, priceAfterDiscount, taxValue){
    console.log("General Information")
    console.log("==========================");
    console.log("Book name: " + book);
    console.log("Author: " + bookLibrary[book].author);
    console.log("price: " + price);
    console.log("==========================");
    console.log("amount of discount: " + discountValue);
    console.log("price after discount: " + priceAfterDiscount);
    console.log("amount of tax: " + taxValue);
    console.log("price with tax, without discount: " + (+price + +taxValue));
    console.log("price with tax & discount:" + (+price - +discountValue + +taxValue));
}

