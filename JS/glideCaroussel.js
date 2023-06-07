const pictureContainer = document.getElementById('pictureContainer');

const picturesArray = ['../assets/pictures/ElodieRoyPhotographe-4776.jpg', '../assets/pictures/ElodieRoyPhotographe-4825.jpg', '../assets/pictures/ElodieRoyPhotographe-4788.jpg', '../assets/pictures/fanny.webp', '../assets/pictures/leo5.webp', '../assets/pictures/sam.webp'];
let heightReference = 150;
let heightModalReference = 450;

const mountCarousel = () => {
    return picturesArray.forEach((pic, i) => {
        const newLi = document.createElement('li');
        const newImg = document.createElement('img');
        
        const imgData = new Image();
        imgData.src = pic;

        imgData.onload = () => {
            newImg.height = heightReference;
            newImg.width = getWidth(imgData.height, imgData.width, heightReference);
        };

        newImg.src = pic;
        newImg.alt = `photo n°${i + 1}`;
        newImg.title = `photo n°${i + 1}`;
        newImg.id = `photo${i}`;
        newImg.classList.add('photo-gallery-element');
        newLi.classList = 'picture';
        newLi.appendChild(newImg);
        pictureContainer.appendChild(newLi);
    });
};

/**
 *
 * @param {number} height : ;
 * @param {number} width
 * @param {number} newHeight
 * @returns number
 */
const getWidth = (height, width, newHeight) => {
    const newWidth = Math.floor((width / height) * newHeight);
    return newWidth;
};

const PictureInModal = (picUrl) => {
    const img = document.createElement("img")
    const imgData = new Image()
    
    imgData.src = picUrl;
    
    imgData.onload = () => {
        newImg.height = heightReference;
        newImg.width = getWidth(imgData.height, imgData.width, heightReference);
    };
}

mountCarousel();