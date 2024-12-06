const changeImage = (newIndex) => {
  const dots = Array.from(document.querySelectorAll(".dots-container .dot"));
  const cImages = Array.from(document.querySelectorAll("#current-image"));
  dots.forEach((dot, index) => {
    if (index == newIndex) {
      cImages[index].classList.remove("d-none");
      dot.classList.add("active");
    } else {
      cImages[index].classList.add("d-none");
      dot.classList.remove("active");
    }
  });
  // const image = document.querySelector("#current-image");
  // image.src = this.images[newIndex];
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

const renderCarousel = (urls) => {
  const container = document.createElement("div");
  const imageContainer = document.querySelector("#container  .image-container");
  const buttons = document.querySelector("#container #buttons");
  container.id = "carousel";
  urls.forEach((url, index) => {
    const image = document.createElement("img");
    image.id = "current-image";
    if (index != this.current) {
      image.classList.add("d-none");
    }
    image.src = url;
    container.appendChild(image);
  });
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
  renderCarousel(this.images);
  const prevButton = document.querySelector("#prev");
  const nextButton = document.querySelector("#next");
  addDots.call(this);
  prevButton.addEventListener("click", moveToPreviousImage.bind(this));
  nextButton.addEventListener("click", moveToNextImage.bind(this));
};

document.addEventListener("DOMContentLoaded", () => init());
