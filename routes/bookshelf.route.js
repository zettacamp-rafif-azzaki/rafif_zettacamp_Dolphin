const express = require('express')
const router = express.Router()
const Book = require('../models/book.model')
const BookShelf = require('../models/bookshelf.model')
const { error } = require('console')

const mongoose = require('mongoose');
const bookshelfModel = require('../models/bookshelf.model')
const { param } = require('./purchaseBook.route')


router.get('/', async (req, res) => {
    try {
        const bookShelf = await BookShelf.find()
        res.json(bookShelf)
    } catch (error) {
        res.status(500).json({ message: error.message }) //500 something wrong with the server
    }
})
// Read All
router.get('/ReadAll', async (req, res) => {
    try {
        const bookShelf = await BookShelf.find().populate('bookid')
        res.json(bookShelf)
    } catch (error) {
        res.status(500).json({ message: error.message }) //500 something wrong with the server
    }
})

//Read One
router.get('/:id', getBook, (req,res) => {
    res.send(res.bookshelf)
})

// Create One
router.post('/manual', async (req, res) => {
    const AddOneID = new BookShelf({
        bookid:req.body.bookid,
        bookshelfName:req.body.bookshelfName
    })
    console.log(AddOneID);

    try {
        const newBookshelf = await AddOneID.save()
        res.status(201).json(newBookshelf)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Creating many
router.post('/', async (req, res) => {
    
    var ids = await Book.find({}, {'_id':1})
    console.log(ids);

    var arrayObj = {bookid:ids}

    // var allbooks = await Book.find({})

    try {
        //check if there is no 
        var bookshelf =  await BookShelf.find()
        if(bookshelf.length == null || bookshelf.length < 1){
            console.log(arrayObj);
            const AddOneID = new BookShelf({
                bookid:ids[0],
                bookshelfName:"All Book",
                bookEmbedded:await Book.find({})
            })
            const newBookshelf = await AddOneID.save()
            console.log(newBookshelf + " was added");
        }

        // console.log(await BookShelf.find({},{'_id':1}));
        
        const result = await BookShelf.updateOne(
            { _id: await BookShelf.find({},{'_id':1}) },
            { $addToSet: arrayObj }
        )
        res.status(201).json(result)
    } catch {
        res.status(400).json({message: error.message})
    }
})

router.patch('/', async (req, res) => {
    if(req.body.bookName != null){
        res.book.bookName = req.body.bookName;
    }
    
    if(req.body.author != null){
        res.book.author = req.body.author;
    }
    
    if(req.body.bookPrice != null){
        res.book.bookPrice = req.body.bookPrice;
    }
    
    if(req.body.bookStock != null){
        res.book.bookStock = req.body.bookStock;
    }
    
    
    try {
        const updatedBook = await res.book.save()
        res.json(updatedBook)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

//delete bookshelf
router.delete('/:id', async (req, res) => {
    try {
        await BookShelf.find({'_id':new mongoose.Types.ObjectId(req.params.id)}).deleteOne()

        res.json({message:"deleted bookshelf"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

// ElemMatch
router.post('/ElemMatch', async (req, res) => {
    // res.send('asd')
    try {
        const bookshelf = await BookShelf.findOne({ bookshelfName: "All Book" })
          .populate({
            path: 'bookid',
            match: {
              'publishedDate': {
                $elemMatch: {
                  publisher: req.body.publisher,
                  year: req.body.year
                }
              }
            }
          })
          
    
        if (!bookshelf) {
          console.log("Bookshelf not found.");
          return;
        }
    
        // Filtered books will be in the `bookid` property of the bookshelf document
        console.log(bookshelf.bookid);
        res.send(bookshelf.bookid)
      } catch (error) {
        console.error(error);
      }
})


router.patch('/filterArray', async (req, res) => {
    // res.send('asd')
    try {
        
        // Update the specific comment using arrayFilter
        // BookShelf.updateOne(
        //     {
        //         "bookshelfName": "All Book",
        //         "bookEmbedded.bookName": "Sherlock Holmes" // Filter by bookName
        //     },
        //     {
        //         $set: {
        //             "bookEmbedded.$[elem].genre": ["New Genre"] // Update the genre array
        //         }
        //     },
        //     {
        //         arrayFilters: [{"elem.bookName": "Sherlock Holmes"}]
        //     }
        // )

        BookShelf.updateOne({'bookName':req.body.bookName},
            {$set:{'genre.$[elem]':req.body.GenreToBeChange}},
            {arrayFilters:[{elem:{$eq:req.body.ChangeGenreTo}}]}
        )
        res.send("success")

      } catch (error) {
        console.error(error);
      }
})

router.post('/distinct', async (req, res) => {
    // res.send('asd')
    try {
        const distinctGenres = await BookShelf.distinct("genre", {
            "bookshelfName": "All Book",
            "bookEmbedded.bookName": "Sherlock Holmes" // Filter by bookName
        });

        // const x = await Book.distinct("genre");

        res.send(distinctGenres)
        console.log(distinctGenres);
      } catch (error) {
        console.error(error);
      }
})


// router.delete('deleteFromFirst/:id', async (req, res) => {
//     try {
//         // await res.bookshelf.deleteOne()

//         var id = await BookShelf.find({},{'_id':1})

//         console.log(id);
//         await BookShelf.updateMany(
//             { '_id': await BookShelf.find({},{'_id':1})},
//             { $pull: { bookid: { $in: [req.params.id] }} }
//         )
//         res.json({message:"deleted book"})
//     } catch (error) {
//         res.status(500).json({message:error.message})
//     }
// })




async function getBook(req,res,next){
    let selected_bookShelf
    try {
        selected_bookid = new mongoose.Types.ObjectId(req.params.id)
        selected_bookShelf = await BookShelf.find({'_id':await BookShelf.findOne({},{'_id':1})}, {'bookid':selected_bookid}).populate('bookid')
        if(selected_bookShelf == null){
            return res.status(404).json({message:"cannot find book on bookshelf"})
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }

    

    res.bookshelf = selected_bookShelf
    console.log(res.bookshelf);
    next()
}

module.exports = router;
