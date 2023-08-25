// Const dikeluarkan dari fungsi pada code ini
const books ={
    Everlost:{
        author : "Neal Shusterman",
        bookPrice : 10000,
        bookStock : 4
    },
    Sherlock_Holmes:{
        author : "Arthur Conan Doyle",
        bookPrice : 150000,
        bookStock : 12
    },
    Keep_Going:{
        author : "Austin Kleon",
        bookPrice : 100000,
        bookStock : 9
    }
};

Purchase_Book("Everlost", 25, 3, 10, 5);
// Purchase_Book("Everlost", 25, 3, 20, 20);
// Purchase_Book("Everlost", 25, 3, 10, 25);
function Purchase_Book(book, discount, tax, stock, purchase){

    let isOnLibrary = books.hasOwnProperty(book);
    // console.log(isOnLibrary);
    if(isOnLibrary){
        price = books[book].bookPrice;
        discountValue = price * (discount/100);
        priceAfterDiscount = price - discountValue;
        taxValue = price * (tax/100);
        priceTax = +price + +taxValue;
        priceTaxDiscount = +price - +discountValue + +taxValue;

        
        if(stock != null){
            books[book].bookStock = stock;
        }
        for(i=0; i<purchase; i++){
            if(purchase != null && books[book].bookStock > 0){
                books[book].bookStock = books[book].bookStock - 1;
            }else{
                console.log("no purchase has been made, or purchase > book stock");
                break;
            }
        }
        if(books[book].bookStock > 0){
            console.log("book(s) in stock: "+books[book].bookStock);
        }

        if(purchase != null && purchase > 1){
            price = price * purchase;
            discountValue = discountValue * purchase;
            priceAfterDiscount = price - discountValue;
            taxValue = taxValue * purchase;
            priceTax = price + +taxValue;
            priceTaxDiscount = priceTax - discountValue;
            
        }
        BookMessage(book, price, discountValue, priceAfterDiscount, taxValue, priceTax, priceTaxDiscount, purchase);


    }else{
        console.log("Book name is not found")
    }
}



function BookMessage(book, price, discountValue, priceAfterDiscount, taxValue, priceTax, priceTaxDiscount, purchase){
    console.log("General Information")
    console.log("==========================");
    console.log("Book name: " + book);
    console.log("Author: " + books[book].author);
    console.log("price: " + price + " x" + purchase);
    console.log("==========================");
    console.log("amount of discount: " + discountValue);
    console.log("price after discount: " + priceAfterDiscount);
    console.log("amount of tax: " + taxValue);
    console.log("price with tax, without discount: " + priceTax);
    console.log("price with tax & discount:" + priceTaxDiscount);
}
