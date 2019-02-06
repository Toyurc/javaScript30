//get our element
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.player__fullscreen');

// build our functions
function togglePlay() {
    //badass
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    // if(video.paused) {
    //     video.play();
    // } else {
    //     video.pause();
    // }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent= icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate () {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(event) {
    const scrubTime =  (event.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}


//buggy: the video doesnt show in full screen mode
function fullScreenMode() {
    if(this.requestFullscreen) {
        this.requestFullscreen();
    } else if (this.mozRequestFullScreen) {
        //for firefox
        this.mozRequestFullScreen();
    } else if (this.webkitRequestFullScreen) {
        this.webkitRequestFullScreen();
    } else if(this.msRequestFullScreen) {
        this.msRequestFullScreen();
    }
}

//hook up the vent listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mouseDown = false;
progress.addEventListener('click',scrub); 
progress.addEventListener('mousemove',(e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);

fullScreen.addEventListener('click', fullScreenMode)