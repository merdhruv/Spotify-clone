console.log("Welcome to Spotify");
//variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("progressBar");
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName : "Rumbling", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName : "Payphone", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName : "Smells like Teen Spirit", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName : "Creep", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName : "High And Dry", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName : "Just", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName : "No Surprises", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName : "How to Disappear Completly", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName : "Paranoid Android", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"}
]

songItems.forEach((element,i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName; 
});


//play pause
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})
//events
audioElement.addEventListener('timeupdate', ()=> {
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressBar.value = progress; 
})
progressBar.addEventListener('change', ()=>{
    audioElement.currentTime = progressBar.value*audioElement.duration/ 100;
})

//previous next
const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        masterSongName.innerText = songs[songIndex-1].songName;
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src ='songs/'+(songIndex)+'.mp3';
        audioElement.currentTime =0;
        audioElement.play()
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>9){
        songIndex =0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src ='songs/'+(songIndex)+'.mp3';
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime =0;
    audioElement.play()
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 9;
    }
    else{
        songIndex-=1;
    }
    audioElement.src ='songs/'+(songIndex)+'.mp3';
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime =0;
    audioElement.play()
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})