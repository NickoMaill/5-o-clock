const audioControl1 = document.querySelector('#audioControl1');
const audioControl2 = document.querySelector('#audioControl2');
const audioControl3 = document.querySelector('#audioControl3');

const audio1Time = document.querySelector('#audio1Time');
const audio2Time = document.querySelector('#audio2Time');
const audio3Time = document.querySelector('#audio3Time');

const audio1Duration = document.querySelector('#duration1');
const audio2Duration = document.querySelector('#duration2');
const audio3Duration = document.querySelector('#duration3');

const volume1 = document.querySelector('#volume1');
const volume2 = document.querySelector('#volume2');
const volume3 = document.querySelector('#volume3');

const muteControl1 = document.querySelector('#muteControl1');
const muteControl2 = document.querySelector('#muteControl2');
const muteControl3 = document.querySelector('#muteControl3');

const audioPlayer = (control, time, audioDuration, audioPath, whichAudio, volume, mute) => {
    const wavesurfer = WaveSurfer.create({
        container: `#waveform${whichAudio}`,
        waveColor: '#4D4D4D',
        progressColor: '#ff6b46',
    });

    wavesurfer.load(audioPath);

    wavesurfer.on('ready', () => {
        time.innerHTML = duration(wavesurfer.getCurrentTime());
        audioDuration.innerHTML = duration(wavesurfer.getDuration());
    });

    control.addEventListener('click', () => {
        wavesurfer.playPause();
    });

    mute.addEventListener('click', () => {
        if (!wavesurfer.getMute()) {
            wavesurfer.setMute(true);
            mute.childNodes[1].src = '../assets/svg/mute.svg';
        } else {
            wavesurfer.setMute(false);
            mute.childNodes[1].src = '../assets/svg/volume.svg';
        }
    });

    wavesurfer.on('audioprocess', () => {
        time.innerHTML = duration(wavesurfer.getCurrentTime());
    });

    wavesurfer.on('play', () => {
        control.childNodes[1].src = '../assets/svg/pause.svg';
    });

    wavesurfer.on('pause', () => {
        control.childNodes[1].src = '../assets/svg/play.svg';
    });

    volume.addEventListener('change', (e) => {
        wavesurfer.setVolume(e.target.value);
        if (Number(e.target.value) === 0) {
            mute.childNodes[1].src = '../assets/svg/mute.svg';
        } else if (Number(e.target.value) > 0) {
            mute.childNodes[1].src = '../assets/svg/volume.svg';
        }
    });
};

const duration = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return `0${minutes} : ${seconds < 10 ? '0' + Math.floor(seconds) : Math.floor(seconds)}`;
};

audioPlayer(audioControl1, audio1Time, audio1Duration, '../audio/Please-Please-Me.mp3', 1, volume1, muteControl1);
audioPlayer(audioControl2, audio2Time, audio2Duration, '../audio/Rolling-In-The-Deep.mp3', 2, volume2, muteControl2);
audioPlayer(audioControl3, audio3Time, audio3Duration, '../audio/Walking-On-Sunshine.mp3', 3, volume3, muteControl3);
