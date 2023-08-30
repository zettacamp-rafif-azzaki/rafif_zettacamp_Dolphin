// {TheFatRat: [{"title":title, "genre":genre, "duration":duration}]}
let songList = new Array;

function AddSong(title, artist, genre, duration){
    songList.push({
        "title": title,
        "artist": artist, 
        "genre":genre, 
        "duration": CalculateDuration(duration)});
}

function CalculateDuration(duration){
    duration = duration.split(".");
    duration = duration[0]*60 + duration[1]*1;
    return duration;
}

AddSong("Monody", "TheFatRat", "EDM", "4.12");
AddSong("Wellerman", "The Longest Johns", "Folk", "2.35");
AddSong("Warbringer", "TheFatRat", "EDM", "3.40");
AddSong("Santiana", "The Longest Johns", "Folk", "2.58");

AddSong('Love It If We Made it', 'The 1975', 'Indie', '4.13');
AddSong('Best Friend', 'Rex Orange County', 'Indie', '4.22');
AddSong('fukumean', 'Gunna', 'HipHop', '2.05');
AddSong('MELTDOWN (feat. Drake)', 'Traviss Scot, Drake', 'HipHop', '4.13');
AddSong('On The Radar Freestyle', 'Drake, Central Cee', 'HipHop', '4.35');
AddSong('Domenico Scarlatti - Sonata in E Major - K 162', 'Domenico Scarlatti', 'Classical', '6.28');
AddSong('Chopin - Nocturne Op. 9 No. 2 in E Flat Major', 'Frédéric Chopin', 'Classical', '6.08');
AddSong('Balade No. 1 in G Minor, Op. 23', 'Frédéric Chopi', 'Classical', '9.35');
AddSong('8 Variations on "Come un agnello", K 460', 'Wolfgang Amadeus Mozart', 'Classical', '10.42');
AddSong('Liebesleid(Love\'s Sorrow)', 'Fritz Kreizler', 'Classical', '4.14');
AddSong('People Watching', 'Conan Gray', 'Pop', '2.48');
AddSong('Juliet', 'Cavetown', 'Indie', '4.39');
AddSong('Disaster', 'Conan Gray', 'Pop', '2.33');

// console.log(songList);
// GroupByArtist();
// GroupByGenre();


function GroupByArtistFilter(songArray, CheckArtist){
    console.log(songArray.filter((x) => {
        return x.artist === CheckArtist
    })); //get the artist value    songArray.values(songArray[index])[1]
}
function GroupByGenreFilter(songArray, CheckGenre){
    console.log(songArray.filter((x) => {
        return x.artist === CheckGenre
    })); //get the artist value    songArray.values(songArray[index])[1]
}


function GroupByArtist(){
    const artistData = {};

    for (const song of songList) {
    const { title, artist, genre, duration } = song; //
    // var test = song.title; 
        if (!artistData[artist]) {
            artistData[artist] = []; //artisData.artist = [] 
            // artistData.artist = [title, genre, duration]
        }

        artistData[artist].push({ title, genre, duration });
    }

    console.log(artistData);
}

GroupByArtistFor();

function GroupByArtistFor(){
    const artistData = {};
    for(i=0;i<songList.length;i++){
        const title = songList[i].title;
        const artist = songList[i].artist;
        const genre = songList[i].genre;
        const duration = songList[i].duration;
        
        if(artistData[i])

        artistData[i] = songList[i].artist;
    }
    console.log(artistData);
}

// function shuffleArray(songList) {
//     for (let i = songList.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [songList[i], songList[j]] = [songList[j], songList[i]];
//     }
//   }

// songList.reduce()