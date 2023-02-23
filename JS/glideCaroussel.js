const carouselSlides = document.getElementById('carouselSlides');
const carouselBullet = document.getElementById('carouselBullet');

const picturesArray = ['../assets/pictures/ElodieRoyPhotographe-4776.jpg', '../assets/pictures/ElodieRoyPhotographe-4825.jpg', '../assets/pictures/ElodieRoyPhotographe-4788.jpg', '../assets/pictures/fanny.webp', '../assets/pictures/leo5.webp', '../assets/pictures/sam.webp'];
let heightReference = 384;

const mountCarousel = () => {
    return picturesArray.forEach((pic, i) => {
        const newLi = document.createElement('li');
        const newImg = document.createElement('img');
        const newBullet = document.createElement('button');
        const imgData = new Image();
        imgData.src = pic
        imgData.onload = () => {
            newImg.height = heightReference;
            newImg.width = getWidth(imgData.height, imgData.width, heightReference)
        }

        newImg.src = pic;
        newImg.alt = `photo n°${i + 1}`;
        newImg.title = `photo n°${i + 1}`;
        newImg.id = `photo${i}`;
        newImg.classList.add('photo-gallery-element');
        newLi.classList = "glide__slide";
        newLi.appendChild(newImg);

        newBullet.setAttribute('data-glide-dir', "=" + i)
        newBullet.classList = "glide__bullet";

        carouselSlides.appendChild(newLi);
        carouselBullet.appendChild(newBullet);
    })

}

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
}

    try {
        mountCarousel()
    } catch (error) {
    } finally {
        new Glide('.glide', {
            type: 'carousel',
            perView: 5,
            focusAt: 'center',
            breakpoints: {
              800: {
                perView: 2
              },
              480: {
                perView: 1
              }
            }
        }).mount();
    }