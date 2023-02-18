const audioControl1 = document.querySelector('#audioControl1');
const audioControl2 = document.querySelector('#audioControl2');
const audioControl3 = document.querySelector('#audioControl3');

const audio1TimeMonitoring = document.querySelector('#audio1Time');
const audio2TimeMonitoring = document.querySelector('#audio2Time');
const audio3TimeMonitoring = document.querySelector('#audio3Time');

const audioPlayer = (control, time, audioPath) => {
    const wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'white',
        progressColor: 'grey',
    });

    wavesurfer.load(audioPath);
    const duration = (second) => `00 : 0${Math.round(second)}`
    time.innerHTML = duration(wavesurfer.getCurrentTime())
    
    control.addEventListener('click', () => {
        wavesurfer.playPause();
    });
    
    wavesurfer.on ('audioprocess', () => {
        console.log(typeof wavesurfer.getCurrentTime())
        time.innerHTML = duration(wavesurfer.getCurrentTime())
    })

    wavesurfer.on('play', () => {
        control.childNodes[1].src = '../assets/svg/pause.svg';
    });

    wavesurfer.on('pause', () => {
        control.childNodes[1].src = '../assets/svg/play.svg';
    });
};

audioPlayer(audioControl1, audio1TimeMonitoring, '../audio/Please-Please-Me.mp3');
audioPlayer(audioControl2, audio2TimeMonitoring, '../audio/Rolling-In-The-Deep.mp3');
audioPlayer(audioControl3, audio3TimeMonitoring, '../audio/Walking-On-Sunshine.mp3');
