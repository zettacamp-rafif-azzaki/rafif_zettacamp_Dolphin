const express = require('express')
const router = express.Router()
const Song = require('../models/song.model')
const { error } = require('console')
// =======================================================================================

// Requested Task
router.get('/task', async (req, res) => {
    const page = req.body.page || 1;
    const perPage = 3;

    var skip = (page-1) * perPage;
    try {
        const project = await Song.aggregate([
            {
                $facet: {
                    "Search":[{$match:{title:req.body.searchSong}}],
                    "All Songs":[
                        { $skip:skip },
                        { $limit : perPage },
                        {
                            $project:{
                                concatenated:{
                                    $concat:["$title", " (", "$artist", ")"]
                                },
                                bookPrice:1
                            }
                        }],
                    "CategorizeByArtist":[
                        
                        {$group: { _id: {artist:"$artist"}, totalSong:{$sum:1}}},
                        {$sort:{ artist:1, _id: 1 }},
                        { $skip:skip },
                        { $limit : perPage }
                    ],
                    "CategorizeByGenre":[
                        {$unwind:"$genre"},
                        {$group: { _id: {genre:"$genre"}, totalSong:{$sum:1}}},
                        {$sort:{ genre:1, _id: 1 }},
                        { $skip:skip },
                        { $limit : perPage }
                        ]
                }
            }
    ])
    res.send(project);
    } catch (error) {
    console.error(error);
    }
})




function CalculateDuration(duration){
    duration = duration.split(".");
    duration = duration[0]*60 + duration[1]*1;
    return duration;
}
// =======================================================================================
// put the code upside from here
// =======================================================================================
// Read (All)
router.get('/', async (req, res) => {
    try {
        const song = await Song.find()
        res.json(song)
    } catch (error) {
        res.status(500).json({ message: error.message }) //500 something wrong with the server
    }
})
// Create (many)
router.post('/create', async (req, res) => {
    
    const arrayObj = req.body
    try {
        const result = await Song.insertMany(arrayObj, { ordered: true });
        res.status(201).json(result)
    } catch {
        res.status(400).json({message: error.message})
    }
})
// Updating One
router.patch('/:id', getSong, async(req, res) => {
    if(req.body.title != null){
        res.song.title = req.body.title;
    }
    
    if(req.body.artist != null){
        res.song.artist = req.body.artist;
    }
    
    if(req.body.genre != null){
        res.song.genre = req.body.genre;
    }
    
    if(req.body.duration != null){
        res.song.duration = req.body.duration;
    }
    
    
    try {
        const updatedSong = await res.song.save()
        res.json(updatedSong)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
// Deleting One
router.delete('/:id', getSong, async (req, res) => {
try {
    await res.song.deleteOne()
    
    res.json({message:"deleted song"})
} catch (error) {
    res.status(500).json({message:error.message})
}
})
// middleware
async function getSong(req,res,next){
    let _getSong
    try {
        _getSong = await Song.findById(req.params.id)
        
        if(_getSong == null){
            return res.status(404).json({message:"cannot find song"})
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }

    res.song = _getSong
    console.log(res.song);
    next()
}
module.exports = router;
