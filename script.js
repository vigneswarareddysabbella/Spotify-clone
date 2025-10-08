console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    // Corrected Original 10 Songs (Indices 0-9)
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"}, // Corrected path
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"}, // Corrected path
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"}, // Corrected path
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"}, // Corrected path
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"}, // Corrected path
    
    // New 10 Songs (Indices 10-19)
    {songName: "Chuttamalle - Devara", filePath: "songs/11.mp3", coverPath: "covers/11.jpg"},
    {songName: "Fear Song - Devara", filePath: "songs/12.mp3", coverPath: "covers/12.jpg"},
    {songName: "Okey Oka Lokam - Sashi", filePath: "songs/13.mp3", coverPath: "covers/13.jpeg"},
    {songName: "Remo - Sirikalamandin", filePath: "songs/14.mp3", coverPath: "covers/14.jpg"},
    {songName: "Premalo Koru - Court", filePath: "songs/15.mp3", coverPath: "covers/15.jpg"},
    {songName: "Golden Sparrow - NEEK", filePath: "songs/16.mp3", coverPath: "covers/16.jpg"},
    {songName: "Viral Vayyari - Junior", filePath: "songs/17.mp3", coverPath: "covers/17.jpg"},
    {songName: "Monica - Coolie", filePath: "songs/18.mp3", coverPath: "covers/18.jpeg"},
    {songName: "Nuvvunte Chaley - Andhra King", filePath: "songs/19.mp3", coverPath: "covers/19.jpg"},
    {songName: "Vibe Undi - Mirai", filePath: "songs/20.mp3", coverPath: "covers/20.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;

        // Update the small icon next to the playing song
        makeAllPlays();
        document.getElementById(songIndex).classList.remove('fa-play-circle');
        document.getElementById(songIndex).classList.add('fa-pause-circle');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;

        // Update the small icon next to the paused song
        document.getElementById(songIndex).classList.remove('fa-pause-circle');
        document.getElementById(songIndex).classList.add('fa-play-circle');
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

// Auto-play next song when current song ends (New/Updated Logic)
audioElement.addEventListener('ended', ()=>{
    if(songIndex >= songs.length - 1){ // Check if it's the last song (index 19)
        songIndex = 0; // Loop to the first song
    }
    else{
        songIndex += 1; // Go to the next song
    }
    
    // Play the next song
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    
    // Update UI
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    
    makeAllPlays(); 
    let currentSongItemPlay = document.getElementById(songIndex);
    if(currentSongItemPlay){
        currentSongItemPlay.classList.remove('fa-play-circle');
        currentSongItemPlay.classList.add('fa-pause-circle');
    }
}); 

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= songs.length - 1){ // Logic updated for 20 songs (index 19)
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    // Update the small icon next to the playing song
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-play-circle');
    document.getElementById(songIndex).classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = songs.length - 1 // Logic updated to loop to the last song (index 19)
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    // Update the small icon next to the playing song
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-play-circle');
    document.getElementById(songIndex).classList.add('fa-pause-circle');
})