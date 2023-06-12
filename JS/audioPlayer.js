// --> SELECTOR - start region //////////////////////////////
const audioControl1 = document.getElementById('audioControl1'); // player play button 1
const audioControl2 = document.getElementById('audioControl2'); // player play button 2
const audioControl3 = document.getElementById('audioControl3'); // player play button 3

const audio1Time = document.getElementById('audio1Time'); // audio time elapse 1
const audio2Time = document.getElementById('audio2Time'); // audio time elapse 2
const audio3Time = document.getElementById('audio3Time'); // audio time elapse 3

const audio1Duration = document.getElementById('duration1'); // audio total duration 1
const audio2Duration = document.getElementById('duration2'); // audio total duration 2
const audio3Duration = document.getElementById('duration3'); // audio total duration 3

const volume1 = document.getElementById('volume1'); // player volume slider 1
const volume2 = document.getElementById('volume2'); // player volume slider 2
const volume3 = document.getElementById('volume3'); // player volume slider 3

const muteControl1 = document.getElementById('muteControl1'); // player mute button 1
const muteControl2 = document.getElementById('muteControl2'); // player mute button 2
const muteControl3 = document.getElementById('muteControl3'); // player mute button 3

const volume1Container = document.getElementById('volume1Container'); // player volume container 1
const volume2Container = document.getElementById('volume2Container'); // player volume container 2
const volume3Container = document.getElementById('volume3Container'); // player volume container 3
// --> SELECTOR - end region ////////////////////////////////

// --> SINGLETON - start region /////////////////////////////
// --> SINGLETON - end region ///////////////////////////////

// --> METHODS - start region ///////////////////////////////

/**
 * @name AudioPlayer 
 * @description init custom audio web player on dom loaded
 * @param {HTMLElement} control 
 * @param {HTMLElement} time 
 * @param {HTMLElement} audioDuration 
 * @param {string} audioPath 
 * @param {number} whichAudio 
 * @param {HTMLElement} volume 
 * @param {HTMLElement} mute 
 */
const audioPlayer = (control, time, audioDuration, audioPath, whichAudio, volume, mute) => {
    // INIT waveSurferJs lib and set all styles option
    const wavesurfer = WaveSurfer.create({
        container: `#waveform${whichAudio}`,
        waveColor: '#FFFFFF',
        progressColor: '#ff6b46',
        barWidth: 2,
        barRadius: 3,
        cursorWidth: 0,
        barGap: 3,
        barHeight: 0.4,
        maxCanvasWidth: 1000,
    });
    
    // load the current audio
    wavesurfer.load(audioPath);

    // Basic listener

    // play or pause the current song
    control.addEventListener('click', () => {
        wavesurfer.playPause();
    });
    
    // mute or unmute the currents song
    mute.addEventListener('click', () => {
        if (!wavesurfer.getMute()) {
            wavesurfer.setMute(true);
            mute.childNodes[1].src = '../assets/svg/mute.svg';
        } else {
            if (Number(volume.value) === 0) {
                volume.value = 0.1; // set a "start volume" when volume was manually set to 0 and unmuted - @{more user friendly}
            }
            
            wavesurfer.setMute(false);
            mute.childNodes[1].src = '../assets/svg/volume.svg';
        }
    });

    // trigger volume when slider volume value change
    volume.addEventListener('change', (e) => {
        wavesurfer.setVolume(e.target.value);
        if (Number(e.target.value) === 0) {
            mute.childNodes[1].src = '../assets/svg/mute.svg';
        } else if (Number(e.target.value) > 0) {
            mute.childNodes[1].src = '../assets/svg/volume.svg';
        }
    });

    // lib Listeners

    // when song is loaded, we display the currentTime and duration
    wavesurfer.on('ready', () => {
        time.innerHTML = formatDuration(wavesurfer.getCurrentTime());
        audioDuration.innerHTML = formatDuration(wavesurfer.getDuration());
    });
    
    // when song is actually played, currentTime is update
    wavesurfer.on('audioprocess', () => {
        time.innerHTML = formatDuration(wavesurfer.getCurrentTime());
    });
    
    // when song on play mode, we display the correct svg symbol
    wavesurfer.on('play', () => {
        control.childNodes[1].src = '../assets/svg/pause.svg';
    });
    
    // when song is on pause mode, we display the correct svg symbol
    wavesurfer.on('pause', () => {
        control.childNodes[1].src = '../assets/svg/play.svg';
    });
};

/**
 * @name Duration
 * @description method that format song current time and duration
 * @param {number} time 
 * @returns {string}
 */
const formatDuration = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return `0${minutes} : ${seconds < 10 ? '0' + Math.floor(seconds) : Math.floor(seconds)}`;
};

/**
 * @name SetSliderVolumeVisibility
 * @description control volume slider visibility on mouse hover on mute button
 * @param {HTMLElement} container 
 * @param {HTMLElement} slider 
 */
const setSliderVolumeVisibility = (container, slider) => {
    container.addEventListener('mouseover', () => {
        slider.classList.remove('d-none');
    });
    container.addEventListener('mouseout', () => {
        slider.classList.add('d-none');
    });
};
// --> METHODS - end region /////////////////////////////////

// --> EXECUTABLE - start region ////////////////////////////
audioPlayer(audioControl1, audio1Time, audio1Duration, '../audio/Please-Please-Me.mp3', 1, volume1, muteControl1);
audioPlayer(audioControl2, audio2Time, audio2Duration, '../audio/Rolling-In-The-Deep.mp3', 2, volume2, muteControl2);
audioPlayer(audioControl3, audio3Time, audio3Duration, '../audio/Walking-On-Sunshine.mp3', 3, volume3, muteControl3);

setSliderVolumeVisibility(volume1Container, volume1);
setSliderVolumeVisibility(volume2Container, volume2);
setSliderVolumeVisibility(volume3Container, volume3);
// --> EXECUTABLE - end region //////////////////////////////

// --> EVENT LISTENER - start region ////////////////////////
// --> EVENT LISTENER - end region //////////////////////////