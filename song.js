
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
OneHourPlaylist();
// GroupByGenre();
// GroupByArtist();



function OneHourPlaylist(){
    let totalDuration = 0;
    const filteredArray = [];
    let count = 0;

    // shuffleArray(songList);
    songList.sort(() => Math.random() - 0.5)

    for (const song of songList) {
        if (totalDuration + song.duration <= 3600) {
            filteredArray.push(song);
            totalDuration += song.duration;
        } else {
            break; // Stop adding songs once the total duration exceeds
        }
    }
    

    count = filteredArray.reduce((sum, currentSong) => {
        return sum + currentSong.duration;
    }, 0);
    console.log(filteredArray);
    console.log(count);
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


function GroupByGenre(){
    const genreData = {};

    for(const song of songList){
        const {title, artist, genre, duration } = song;
        if(!genreData[genre]){
            genreData[genre] = [];
        }
        genreData[genre].push({title, artist, duration});
    }

    console.log(genreData);
}