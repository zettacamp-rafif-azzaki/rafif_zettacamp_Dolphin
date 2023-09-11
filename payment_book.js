// Const dikeluarkan dari fungsi pada code ini
// console.log(`${lastDayDate} ${ months[(monthInt + i)%12]} ${year}`);
// var arrayObj = arrayObj.filter((obj) => {obj.test === 'initialPrice';})

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

// Purchase_Book("Everlost", 25, 3, 10, 5, 7);
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
        // if(books[book].bookStock > 0){
        //     console.log("book(s) in stock: "+books[book].bookStock);
        // }

        if(purchase != null && purchase > 1){
            price = price * purchase;
            discountValue = discountValue * purchase;
            priceAfterDiscount = price - discountValue;
            taxValue = taxValue * purchase;
            priceTax = price + +taxValue;
            priceTaxDiscount = priceTax - discountValue;
        }

        
        let return_object = []

        
        var priceData = {"price":price, 
                            "discountValue":discountValue, 
                            "priceAfterDiscount":priceAfterDiscount,
                            "taxValue":taxValue,
                            "priceTax":priceTax,
                            "priceTaxDiscount":priceTaxDiscount
                    };

        return_object.push(priceData);
        return_object.push(date(creditDuration, priceTaxDiscount));
        return(return_object);
        

    }else{
        console.log("Book name is not found")
    }
}

function date(creditDuration, priceTaxDiscount){
    
    //date area====================================================================
    let dateArray = [];

    const months = ["January", "February", "March", "April", "May", "June", "July",
     "August", "September", "October", "November", "December"];

    const date = new Date();
    
    let monthInt = date.getMonth();
    let year = date.getFullYear();
    
    date.setDate(30);
    var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 0);
    var lastDayDate = date.getDate();
    let string;
    //end of date area====================================================================

    let priceArray = [];
    let initialPrice = priceTaxDiscount;


    //push
    for(i=1;i<=creditDuration;i++){
        dateArray.push(i);
        priceArray.push(priceTaxDiscount);
    }


    //calculate price
    priceArray.forEach((value, index) => {
        priceTaxDiscount = priceTaxDiscount-(initialPrice/creditDuration);
        
        priceArray[index] = Math.floor(priceTaxDiscount);
        if(Math.floor(priceTaxDiscount) < 0){
            priceArray[index - 1] = priceArray[index - 1] + (-1 * Math.floor(priceTaxDiscount));
            priceArray[index] = 0;
        }
    });
    priceArray.unshift(initialPrice);

    //calculate index
    dateArray.map((i, index) => {
        if(date.getDate() > lastDayOfMonth.getDate()){
            //assign last day of the month of that year
            lastDayDate = lastDayOfMonth.getDate();
        }else{
            //assign our current date
            lastDayDate = date.getDate();
        }
        
        string = lastDayDate + " " + months[(monthInt + i)%12] + " " + year;
        
        dateArray[index] = {"dueDate" : string, "dueCredit" : priceArray[index]};
        
        if((monthInt + i + 1)%12 == 0){
            year = year + 1;
        }
        lastDayOfMonth = new Date(year, ((monthInt + i)%12)+2, 0);
    });

    return(dateArray);
    // console.log("==========================");
    // console.log("due date: ");
    // console.log("==========================");
    // console.log(dateArray);
    // console.log("==========================");
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


module.exports = { Purchase_Book };