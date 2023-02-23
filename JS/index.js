// --> SELECTOR - start region //////////////////////////////
const galleryContainerRoot = document.getElementById('galleryContainerRoot');
const teamContent = document.getElementsByClassName('team-container');
const modal = document.getElementById('myModal');
const modalContent = modal.childNodes[1];
const btn = [...document.getElementsByClassName('photo-gallery-element')];
const span = document.getElementsByClassName('close')[0];
const newImg = document.createElement('img');
// --> SELECTOR - end region ////////////////////////////////

// --> SINGLETON - start region /////////////////////////////
// const picturesArray = ['../assets/pictures/ElodieRoyPhotographe-4776.jpg', '../assets/pictures/ElodieRoyPhotographe-4825.jpg', '../assets/pictures/ElodieRoyPhotographe-4788.jpg', '../assets/pictures/fanny.webp', '../assets/pictures/leo5.webp', '../assets/pictures/sam.webp'];
let isResizeChanged = false;
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
// --> METHODS - end region /////////////////////////////////

// --> EXECUTABLE - start region ////////////////////////////
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

// Get the modal

// When the user clicks on the button, open the modal
btn.forEach((pic) => {
    pic.onclick = (e) => {
        const image = new Image();
        let imgPath = e.srcElement.currentSrc;
        image.src = imgPath;
        image.onload = () => {
            if (image.width < image.height) {
                if (newImg.classList.contains('horizontaleImgModal')) {
                    newImg.classList.remove('horizontaleImgModal');
                }
                newImg.classList.add('verticalImgModal');
            } else {
                if (newImg.classList.contains('verticalImgModal')) {
                    newImg.classList.remove('verticalImgModal');
                }
                newImg.classList.add('horizontaleImgModal');
            }
        };
        newImg.src = imgPath;

        modalContent.appendChild(newImg);
        modal.style.display = 'block';
    };
});
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = 'none';
    modalContent.removeChild(modalContent.childNodes[3]);
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};
