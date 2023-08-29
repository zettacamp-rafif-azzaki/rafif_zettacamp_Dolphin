// Const dikeluarkan dari fungsi pada code ini
// console.log(`${lastDayDate} ${ months[(monthInt + i)%12]} ${year}`);
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

Purchase_Book("Everlost", 25, 3, 10, 5, 25);
function Purchase_Book(book, discount, tax, stock, purchase, creditDuration){

    let isOnLibrary = books.hasOwnProperty(book);
    
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
        date(creditDuration, priceTaxDiscount);

    }else{
        console.log("Book name is not found")
    }
}

function date(creditDuration, priceTaxDiscount){
    let dateArray = [];
    let dateArray2 = [];
    let dateObj = {};


    const months = ["January", "February", "March", "April", "May", "June", "July",
     "August", "September", "October", "November", "December"];

    const date = new Date();
    
    let monthInt = date.getMonth();
    let year = date.getFullYear();
    
    date.setDate(31);
    var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 0);
    var lastDayDate = date.getDate();
    priceTaxDiscount = priceTaxDiscount/creditDuration;

    let string;

    // for(i=1;i<=creditDuration;i++){
    //     if(date.getDate() > lastDayOfMonth.getDate()){
    //         //assign last day of the month of that year
    //         lastDayDate = lastDayOfMonth.getDate();
    //     }else{
    //         //assign our current date
    //         lastDayDate = date.getDate();
    //     }
        
    //     string = lastDayDate + " " + months[(monthInt + i)%12] + " " + year;
    //     // string =toString(`${lastDayDate} ${ months[(monthInt + i)%12]} ${year}`);
        

    //     dateArray.push({"dueDate" : string, priceTaxDiscount});
    //     if((monthInt + i + 1)%12 == 0){
    //         year = year + 1;
    //     }
    //     lastDayOfMonth = new Date(year, ((monthInt + i)%12)+2, 0);
    // }

    for(i=1;i<=creditDuration;i++){
        dateArray.push(i);
    }

    dateArray.map((i) => {
        if(date.getDate() > lastDayOfMonth.getDate()){
            //assign last day of the month of that year
            lastDayDate = lastDayOfMonth.getDate();
        }else{
            //assign our current date
            lastDayDate = date.getDate();
        }
        
        string = lastDayDate + " " + months[(monthInt + i)%12] + " " + year;
        // string =toString(`${lastDayDate} ${ months[(monthInt + i)%12]} ${year}`);
        

        dateArray.push({"dueDate" : string, "finalPrice" : priceTaxDiscount});
        if((monthInt + i + 1)%12 == 0){
            year = year + 1;
        }
        lastDayOfMonth = new Date(year, ((monthInt + i)%12)+2, 0);
    });

    console.log("==========================");
    console.log("due date: ");
    console.log("==========================");
    console.log(dateArray);
    console.log("==========================");
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
