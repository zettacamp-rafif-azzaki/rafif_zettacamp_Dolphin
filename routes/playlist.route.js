// HATI-HATI URUTAN PENTING, TARUH /:id DIPALING BAWAH
const express = require('express')
const router = express.Router()
const Song = require('../models/song.model')
const Playlist = require('../models/playlist.model')
const { error } = require('console')

// =======================================================================================

// Requested Task
router.get('/task', async (req, res) => {
    const page = req.body.page || 1;
    const perPage = 3;

    var skip = (page-1) * perPage;
    try {
        const project = await Song.aggregate([ //supposed to be Playlist
            {$lookup:
                {
                  from: "song",
                  localField: "songid",
                  foreignField: "_id",
                  as: "_song"
                }},
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




// =======================================================================================
// put the code upside from here
// =======================================================================================

// Read (All)
router.get('/', async (req, res) => {
    try {
        const playlist = await Playlist.find()
        res.json(playlist)
    } catch (error) {
        res.status(500).json({ message: error.message }) //500 something wrong with the server
    }
})
// Creating many
router.post('/', async (req, res) => {
    
    var ids = await Song.find({}, {'_id':1})
    // console.log(ids);

    var arrayObj = {songid:ids}

    try {
        //check if there is no playlist
        var _playlist =  await Playlist.find() //ngambil playlist
        console.log(_playlist);
        if(_playlist.length == null || _playlist.length < 1){
            console.log("arrayObj");
            const AddOneID = new Playlist({
                songid:ids[0],
                playlistName:"All Song"
            })
            const newPlaylist = await AddOneID.save()
            console.log(newPlaylist + " was added");
        }

        //add or edit if there is new
        const result = await Playlist.updateOne(
            { _id: await Playlist.find({},{'_id':1}) },
            { $addToSet: arrayObj }
        )
        
        // {'_id':new mongoose.Types.ObjectId(req.params.id)}
        
        // update on Song
        GetThisPlaylistID = await Playlist.find({},{'_id':1})
        thisID = GetThisPlaylistID[0]._id.valueOf()
        
        // console.log("asdasdasd");
        console.log(GetThisPlaylistID);
        
        const a = Song.updateMany(
            {},{playlistID:await Playlist.find({},{'_id':1})}
        )
// console.log(a);
        res.status(201).json(result)
    } catch {
        res.status(400).json({message: error.message})
    }
})

// create manual
router.post('/manual', async (req, res) => {
    const AddOneID = new Playlist({
        songid:req.body.songid,
        playlistName:req.body.playlistName
    })
    console.log(AddOneID);

    try {
        const newPlaylist = await AddOneID.save()
        res.status(201).json(newPlaylist)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Update
router.patch('/:id', getPlaylist, async(req, res) => {
    if(req.body.playlistName != null){
        res.playlist.playlistName = req.body.playlistName;
    }
    
    try {
        const updatedPlaylist = await res.playlist.save()
        res.json(updatedPlaylist)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
// delete
router.delete('/:id', getPlaylist, async (req, res) => {
    try {
        await res.playlist.deleteOne()
        
        res.json({message:"deleted playlist"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
// middleware
async function getPlaylist(req,res,next){
    let _getPlaylist
    try {
        _getPlaylist = await Playlist.findById(req.params.id)
        
        if(_getPlaylist == null){
            return res.status(404).json({message:"cannot find playlist"})
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }

    res.playlist = _getPlaylist
    console.log(res.playlist);
    next()
}
module.exports = router;
