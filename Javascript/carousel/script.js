import { imageData } from "./imageData.js";
import { filteredDataBySearch } from "./filter.js";
import { filteredDataByPage } from "./filter.js";

// use let and const

const OFFSET = 10;
let allImagesData = [];
let imagesData = [];
let current = 0;
let tLength = 0;
let length = 0;
let currentPage = 1;

const searchInput = document.getElementById("search");
const searchInputFilter = document.getElementById("searchFilter");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
const container = document.querySelector("#container");
const paginationContainer = document.getElementById("pagination-container");
const sortButton = document.getElementById("sortResult");

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
};

const appendImages = function (images) {
  console.log("Append images", images);
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");
  //   imageContainer.id = ""
  // let image = document.createElement("img");
  images.forEach(function (data, index) {
    // const
    let image = document.createElement("img");
    image.src = data.image;
    image.title = data.name;
    image.addEventListener("click", () => {
      console.log("clicked", index);
      changeImage(index);
    });
    imageContainer.appendChild(image);
  });
  container.insertBefore(
    imageContainer,
    document.querySelector("#container #buttons")
  );
  //   renderCarousel();
};

const addDots = function (currentImagesData) {
  const dotsContainer = document.createElement("div");
  dotsContainer.classList.add("dots-container");
  currentImagesData.forEach((image, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index == current) {
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
    if (index != current) {
      image.classList.add("d-none");
    }
    image.src = url.image;

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
  this.current = this.current > 0 ? this.current - 1 : length - 1;
  changeImage.call(this, this.current);
};

// Navigate to the next image
const moveToNextImage = function (currIndex, images, totalImages) {
  //   console.log("Helll", imagesData);
  this.current = this.current < length - 1 ? this.current + 1 : 0;
  changeImage.call(this, this.current);
};

const showPage = (page) => {
  const buttons = document.querySelector("#container #buttons");
  container.appendChild(buttons);
  document.getElementsByClassName("image-container")[0]?.remove();
  currentPage = page - 1;
  current = 0;
  // showPages(tLength)
  tLength = imagesData.length;

  let currentImagesData = [...imagesData].slice(
    currentPage * OFFSET,
    Math.min(tLength, currentPage * OFFSET + OFFSET)
  );
  // console.log("Data",page, currentImagesData, imagesData, currentPage*OFFSET,Math.min(tLength,(currentPage*OFFSET)+OFFSET))
  length = currentImagesData.length;
  appendImages(currentImagesData);
  renderCarousel(currentImagesData);
  addDots(currentImagesData);
};

const showPages = (total) => {
  let count = Math.floor(total / OFFSET);
  console.log("Both are", total, length);
  const arr = Array.from(paginationContainer.childNodes);
  arr.forEach((page) => page.remove());

  for (let i = 0; i < count; i++) {
    let page = document.createElement("button");
    page.textContent = i + 1;

    page.addEventListener("click", () => {
      paginationContainer.childNodes[currentPage].classList.remove("active");
      currentPage = i;
      paginationContainer.childNodes[currentPage].classList.add("active");
      showPage(i + 1);
    });

    paginationContainer.appendChild(page);
  }
};

const init = async function () {
  allImagesData = await imageData();
  length = allImagesData.length;
  imagesData = [...allImagesData];
  showPages(length);
  showPage(1);

  searchInputFilter.addEventListener("click", (e) => {
    // imageNodes.forEach((node)=>{if(node.tagName=="IMG"){node.remove()}})
    const search = searchInput.value;
    if (!search) {
      searchInputFilter.classList.remove("active");
    } else {
      searchInputFilter.classList.add("active");
    }

    const filteredData = filteredDataBySearch(allImagesData, search);
    imagesData = filteredData;
    length = filteredData.length;
    current = 0;
    currentPage = 0;
    showPages(length);
    showPage(1);
    // appendImages(filteredData);
    // renderCarousel(filteredData);
  });

  sortButton.addEventListener("click", () => {
    if (sortButton.innerText == "ASC") {
      sortButton.innerText = "DESC";
      imagesData.sort((a, b) => (a.name > b.name ? -1 : 1));
    } else {
      sortButton.innerText = "ASC";
      imagesData.sort((a, b) => (a.name > b.name ? 1 : -1));
    }
    // showPages(length)
    showPage(1);
  });
  prevButton.addEventListener("click", moveToPreviousImage);
  nextButton.addEventListener("click", moveToNextImage);
};

document.addEventListener("DOMContentLoaded", () => init());
