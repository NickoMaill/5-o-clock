// --> SELECTOR - start region //////////////////////////////
const galleryContainerRoot = document.getElementById('galleryContainerRoot');
const teamContent = document.getElementsByClassName('team-container');
const modal = document.getElementById('myModal');
const modalContent = modal.childNodes[1];
const btn = [...document.getElementsByClassName('photo-gallery-element')];
const span = document.getElementsByClassName('close')[0];
const newImg = document.createElement('img');
const setList = document.getElementById('setList');
// --> SELECTOR - end region ////////////////////////////////

// --> SINGLETON - start region /////////////////////////////
let isResizeChanged = false;
const setListData = [
    { title: 'Walking On Sunshine', artist: 'Katrina & The Waves' },
    { title: 'Pretty Woman', artist: 'Roy Orbison' },
    { title: 'Venus', artist: 'Schocking Blue' },
    { title: 'Please Please Me', artist: 'The Beatles' },
    { title: 'You Can’t Hurry Love', artist: 'The Supremes' },
    { title: 'Ain’t No Mountain High Enough', artist: 'Marvin Gay ft Tammi Terrel' },
    { title: 'Rolling In The Deep', artist: 'Adele' },
    { title: 'The Great Pretender ', artist: 'The Platters' },
    { title: 'Shallow', artist: 'Bradley Cooper ft Lady Gaga' },
    { title: 'Happy', artist: 'Farrell Williams' },
    { title: 'Somebody That I Used To Know', artist: 'Gotye ft Kimbra' },
    { title: 'Hallelujah', artist: 'Leonard Cohen' },
    { title: "It's My Life", artist: 'Bon Jovi' },
];
// --> SINGLETON - end region ///////////////////////////////

// --> METHODS - start region ///////////////////////////////
/**
 * @name reorganizeTeamSection
 * @description reorganize team article prioritization on responsive
 * @param {'small'|'large'} option
 */
const reorganizeTeamSection = (option) => {
    if (option === 'small') {
        isResizeChanged = true;

        for (let i = 0; i <= teamContent.length; i++) {
            let element = teamContent.item(i);
            const img = element.childNodes[1];
            const div = element.childNodes[3];
            const before = div.childNodes[4];
            div.insertBefore(img, before);
        }
    } else if (option === 'large') {
        isResizeChanged = false;

        for (let i = 0; i <= teamContent.length; i++) {
            let element = teamContent.item(i);
            const img = element.childNodes[2].childNodes[4];
            const div = element.childNodes[2];
            element.insertBefore(img, div);
        }
    }
};

const renderSetList = () => {
    setListData.forEach((song) => {
        const li = document.createElement('li');
        const p = document.createElement('p');
        const p2 = document.createElement('p');

        p.innerText = song.title;
        p.style.fontWeight = 'bold'
        p.style.marginRight = '8px'
        p2.innerText = song.artist;

        li.classList.add("setList-item")
        li.appendChild(p);
        li.appendChild(p2);
        setList.appendChild(li);
    });
};
// --> METHODS - end region /////////////////////////////////

// --> EXECUTABLE - start region ////////////////////////////
renderSetList();
// --> EXECUTABLE - end region //////////////////////////////

// --> EVENT LISTENER - start region ////////////////////////
window.addEventListener('resize', (e) => {
    if (e.currentTarget.innerWidth < 901 && !isResizeChanged) {
        reorganizeTeamSection('small');
    } else if (e.currentTarget.innerWidth >= 901 && isResizeChanged) {
        reorganizeTeamSection('large');
    }
});
// --> EVENT LISTENER - end region //////////////////////////
