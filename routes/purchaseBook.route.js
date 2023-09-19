const express = require('express')
const router = express.Router()
const Book = require('../models/book.model')
const { error } = require('console')


// Getting All
router.get('/', async (req, res) => {
    try {
        const book = await Book.find()
        res.json(book)
    } catch (error) {
        res.status(500).json({ message: error.message }) //500 something wrong with the server
    }
})
// Getting One
router.get('/:id', getBook, (req,res) => {
    res.send(res.book)
})
// Creating One
router.post('/', async (req, res) => {
    const Addbook = new Book({
        bookName:req.body.bookName,
        author:req.body.author,
        bookPrice:req.body.bookPrice,
        bookStock:req.body.bookStock
    })

    try {
        const newBook = await Addbook.save()
        res.status(201).json(newBook)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
// Updating One
router.patch('/:id', getBook, async(req, res) => {
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
// Deleting One
router.delete('/:id', getBook, async (req, res) => {
try {
    await res.book.deleteOne()
    
    res.json({message:"deleted book"})
} catch (error) {
    res.status(500).json({message:error.message})
}
})
// Creating many
router.post('/many', async (req, res) => {
    
    const arrayObj = req.body

    try {
        const result = await Book.insertMany(arrayObj, { ordered: true });
        res.status(201).json(result)
    } catch {
        res.status(400).json({message: error.message})
    }
})

async function getBook(req,res,next){
    let _getBook
    try {
        _getBook = await Book.findById(req.params.id)
        
        if(_getBook == null){
            return res.status(404).json({message:"cannot find book"})
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }

    res.book = _getBook
    console.log(res.book);
    next()
}

module.exports = router;
