const changeImage = (newIndex) => {
  const dots = Array.from(document.querySelectorAll(".dots-container .dot"));
  dots.forEach((dot, index) => {
    if (index == newIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
  const image = document.querySelector("#current-image");
  image.src = this.images[newIndex];
};

const preloadImages = (images) => {
  images.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

const appendImages = (images) => {
  console.log("Append images", this.images);
  const container = document.querySelector("#container");
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");
  //   imageContainer.id = ""
  images.forEach(function (link, index) {
    this.image = document.createElement("img");
    this.image.src = link;
    this.image.addEventListener("click", changeImage.bind(this, index));
    imageContainer.appendChild(this.image);
  });
  container.insertBefore(
    imageContainer,
    document.querySelector("#container #buttons")
  );
  //   renderCarousel();
};

const addDots = function () {
  const dotsContainer = document.createElement("div");
  dotsContainer.classList.add("dots-container");
  this.images.forEach((image, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index == this.current) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", changeImage.bind(this, index));
    dotsContainer.appendChild(dot);
  });
  document
    .querySelector("#carousel")
    .insertBefore(dotsContainer, document.querySelector("#current-image"));
};

const renderCarousel = (url) => {
  const container = document.createElement("div");
  const imageContainer = document.querySelector("#container  .image-container");
  const buttons = document.querySelector("#container #buttons");
  const image = document.createElement("img");
  image.id = "current-image";
  image.src = url;
  container.id = "carousel";
  container.appendChild(image);
  container.classList.add("carousel-image");
  imageContainer.appendChild(container);
  container.appendChild(buttons);
};

const fetchImages = async () => {
  const url = "https://picsum.photos/500/300";
  const res = await Promise.all([
    fetch(url),
    fetch(url),
    fetch(url),
    fetch(url),
    fetch(url),
    fetch(url),
  ]);
  const images = res.map((image) => image.url);
  appendImages(images);
  //preloadImages(images);
  return images;
};

const moveToPreviousImage = function (currIndex, images, totalImages) {
  //   hideImage(currIndex, images);
  this.current = this.current > 0 ? this.current - 1 : this.length - 1;
  changeImage.call(this, this.current);
};

// Navigate to the next image
const moveToNextImage = function (currIndex, images, totalImages) {
  //   console.log("Helll", this.images);
  this.current = this.current < this.length - 1 ? this.current + 1 : 0;
  changeImage.call(this, this.current);
};

const init = async function () {
  this.images = await fetchImages();
  this.length = this.images.length;
  this.current = 0;
  renderCarousel(this.images[this.current]);
  const prevButton = document.querySelector("#prev");
  const nextButton = document.querySelector("#next");
  addDots.call(this);
  prevButton.addEventListener("click", moveToPreviousImage.bind(this));
  nextButton.addEventListener("click", moveToNextImage.bind(this));
};

document.addEventListener("DOMContentLoaded", () => init());
