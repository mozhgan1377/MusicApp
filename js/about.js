musicArray = [
  {name : "Barf",artist: "Babak Jahanbakhsh" ,imageSrc:"./pictures/125.jpg",audioSrc:"./audio/barf.mp3"} ,
  {name : "Zendegi Edame Dare",artist: "Babak Jahanbakhsh" ,imageSrc:"./pictures/126.jpg",audioSrc:"./audio/zendegi.mp3"} ,
  {name : "hale mano khoob kon",artist: "Babak Jahanbakhsh" ,imageSrc:"./pictures/127.jpg",audioSrc:"./audio/hale khub.mp3"} ,
  {name : "shahre shirin",artist: "Babak Jahanbakhsh" ,imageSrc:"./pictures/128.jpg",audioSrc:"./audio/shirin.mp3"}
]


let playBtn = document.getElementById("play-icon") ;
let nextMusicBtn = document.getElementById("next-icon") ;
let previousMusicBtn = document.getElementById("previous-icon") ;
let music = document.querySelector(".player__audio") ;
let musicImgElem = document.querySelector(".player__img") ;
let bgimg = document.querySelector(".bg-wrapper__img") ;
let musicArtistElem = document.querySelector(".player__artist") ;
let musicNameElem = document.querySelector(".player__title") ;
let musicTimeElem = document.querySelector(".music__time") ;
let musicCurrentElem = document.querySelector(".music__current") ;
let progressElem = document.querySelector(".player__progress") ;
let progressParentElem = document.querySelector(".player__progress-container") ;





window.addEventListener("load",function(){
  musicImgElem.classList.add("active") ;
})



///////// Play & Pause & timing-fuction/////////////////////////


let isMusicPlaying = false ;




function play(){
  playBtn.classList.replace("fa-play","fa-pause")
    music.play()
    isMusicPlaying = true ;
    setInterval(function(){
    
            let c = Math.floor(music.currentTime) ;
            let h = Math.floor(music.duration) ;
            let t = Math.floor(music.duration) - Math.floor(music.currentTime) ;
          
            progressElem.style.width = Math.floor((music.currentTime / music.duration) * 100) + "%"
      
            if( c < 60){
              if(c < 10){
                c = "00 : " + "0" + c
              }else{
                c = "00 : "  + c
              }
              
            }else{
              let cM = Math.floor(c / 60) ;
              let cS = Math.floor(c % 60) ;
              
               if(cM < 10){
                cM = "0" + cM ;
               }
               if( cS < 10){
                cS = "0" + cS ;
               }
               c = cM + " : " + cS
                
      
            }
      
            if( t < 60){
              if(t < 10){
                t = "00 : " + "0" + t
              }else{
                t = "00 : "  + t
              }
              
            }else{
              let tM = Math.floor(t / 60) ;
              let tS = Math.floor(t % 60) ;
              
               if(tM < 10){
                tM = "0" + tM ;
               }
               if( tS < 10){
                tS = "0" + tS ;
               }
               t = tM + " : " + tS 
            }  
            musicCurrentElem.innerHTML = c ;
            musicTimeElem.innerHTML = t ;
          }, 1000);
        

}

function pause(){
  playBtn.classList.replace("fa-pause","fa-play")
    music.pause()
    isMusicPlaying = false ;
}


playBtn.addEventListener("click",function(){
  if(isMusicPlaying){
    pause()
  }else{
    play()
  }
}) ;


//////////////////////////////// click and go ////////////////////


progressParentElem.addEventListener("click",function(event){
    let x = event.offsetX ;
    progressElem.style.width = x + "px" ;
    let y = Math.floor(x / 324 * 100) ;
    music.currentTime = (y * music.duration) / 100 ;
    play() ;
})


//////////////////////////////// body keyup /////////////////


document.body.addEventListener("keyup",function(event){

  if(event.keyCode === 32){
    if(isMusicPlaying){
      pause()
    }else{
      play()
    }
  }else if(event.keyCode === 39){
    goToNextMusic()
  }else if(event.keyCode === 37){
    goToPreMusic()
  }
})


//////////////////////////////// next btn /////////////////

let i = 0

function goToNextMusic(){
  i++ ;
  
  if( i > musicArray.length -1){
    console.log(5)
    i = 0 ;
  }
  musicCurrentElem.innerHTML = ""
  musicTimeElem.innerHTML = ""
  music.setAttribute("src",musicArray[i].audioSrc) ;
  musicImgElem.setAttribute("src",musicArray[i].imageSrc) ;
  bgimg.setAttribute("src",musicArray[i].imageSrc) ;
  musicArtistElem.innerHTML = musicArray[i].artist;
  musicNameElem.innerHTML = musicArray[i].name ;
  play() ;
}


nextMusicBtn.addEventListener("click",goToNextMusic) ;


//////////////////////////////// pre btn /////////////////



function goToPreMusic(){
  i-- ;
  
  if( i < 0){
    i = 3 ;
  }
  musicCurrentElem.innerHTML = ""
  musicTimeElem.innerHTML = ""
  music.setAttribute("src",musicArray[i].audioSrc) ;
  musicImgElem.setAttribute("src",musicArray[i].imageSrc) ;
  bgimg.setAttribute("src",musicArray[i].imageSrc) ;
  musicArtistElem.innerHTML = musicArray[i].artist;
  musicNameElem.innerHTML = musicArray[i].name ;
  play() ;
}


previousMusicBtn.addEventListener("click",goToPreMusic) ;