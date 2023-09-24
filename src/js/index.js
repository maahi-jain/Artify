import { fetchPhotosWithCategory } from "../api/fetchPhotosWithCategory";
import { fetchPhotosWithId } from "../api/fetchPhotosWithId";
import { FAV_IMAGES } from "../constants";
import { getFromLocalStorage } from "./localStorage";
import { loadSpinner, removeSpinner } from "./spinner";
import {
  removeError,
  renderImages,
  showImageDetails,
  updateFavImages,
  updatePagnitor,
  updateSelectedCategory,
} from "./view";

const categoryList = document.getElementById("category-list");
const imageContainer = document.getElementById("image-container");
const favourites = document.getElementById("fav");
const backBtn = document.getElementById("back-btn");
const imageGallery = document.getElementById("image-gallery");
const imageDetails = document.getElementById("image-details");
const homeButton = document.getElementById("home-btn");
const paginator = document.getElementById("paginator");
const onPageElement = document.getElementById("on-page");
const totalPages = document.getElementById("total-page");
const prevPageButton = document.getElementById("prev-page");
const nextpageButton = document.getElementById("next-page");
const errorButton = document.getElementById("error-button");
let onFav = false;
let selectedCategory;

// On Category Selection
categoryList.addEventListener("click", async function (e) {
  loadSpinner();
  let parsedOnPage;
  if (selectedCategory === e.target.innerText) {
    parsedOnPage = onPageElement.innerText
      ? parseInt(onPageElement.innerText)
      : 1;
  } else {
    parsedOnPage = 1;
  }
  updateSelectedCategory(e.target);
  selectedCategory = e.target.innerText;
  let data = await fetchPhotosWithCategory(e.target.innerText, parsedOnPage);
  await updatePagnitor(parsedOnPage);
  totalPages.innerText = data.totalPages;
  await renderImages(data.result);
  mapListenerToLikeIcon();
  removeSpinner();
});

// On image click
imageContainer.addEventListener("click", async function (e) {
  loadSpinner();
  e.stopPropagation();
  imageDetails.innerHTML = null;
  backBtn.style.display = "block";
  imageGallery.style.display = "none";
  imageDetails.style.display = "grid";
  let data = await fetchPhotosWithId(e.target.id);
  await showImageDetails(data);
  removeSpinner();
});

// Show Favourites
favourites.addEventListener("click", async function (e) {
  loadSpinner();
  onFav = true;
  categoryList.style.display = "none";
  imageDetails.style.display="none";
  paginator.style.display = "none";
  imageGallery.style.display="block";
  let data = await getFromLocalStorage(FAV_IMAGES);
  await renderImages(data);
  mapListenerToLikeIcon();
  removeSpinner();
});

// Add to fav
const mapListenerToLikeIcon = () => {
  const elements = document.getElementsByClassName("like-icon");
  Array.from(elements).forEach((image) => {
    image.addEventListener("click", function (e) {
      e.stopPropagation();
      updateFavImages(e.target);
    });
  });
};

// on Back Button
backBtn.addEventListener("click", () => {
  backBtn.style.display = "none";
  categoryList.style.display = "flex";
  paginator.style.display = "block";
  imageGallery.style.display = "block";
  imageDetails.style.display = "none";
  loadHomePage();
});

// on Home button
homeButton.addEventListener("click", function (e) {
  onFav = false;
  backBtn.style.display = "none";
  categoryList.style.display = "flex";
  paginator.style.display = "block";
  imageGallery.style.display = "block";
  imageDetails.style.display = "none";
  onPageElement.innerText = 1;
  updateSelectedCategory(categoryList.firstElementChild);
  selectedCategory = categoryList.firstElementChild.innerText;
  loadHomePage();
});

// Go to Home
const loadHomePage = () => {
  const selectedCategoryElement = document.querySelector(
    "#category-list>div[selected=true]"
  );
  if (onFav) {
    favourites.click();
  } else if (selectedCategoryElement) {
    selectedCategoryElement.click();
    onFav = false;
  } else {
    categoryList.firstElementChild.click();
    selectedCategory = categoryList.firstElementChild.innerText;
    onFav = false;
  }
};

// onPrevPage
prevPageButton.addEventListener("click", async function () {
  let parsedOnPage = parseInt(onPageElement.innerText);
  if (parsedOnPage > 1) {
    loadSpinner();
    let data = await fetchPhotosWithCategory(
      selectedCategory,
      parsedOnPage - 1
    );
    updatePagnitor(parsedOnPage - 1);
    await renderImages(data.result);
    mapListenerToLikeIcon();
    removeSpinner();
  }
});

// on next page
nextpageButton.addEventListener("click", async function () {
  let parsedOnPage = parseInt(onPageElement.innerText);
  let parsesdTotalPage = parseInt(totalPages.innerText);
  if (parsedOnPage < parsesdTotalPage) {
    loadSpinner();
    let data = await fetchPhotosWithCategory(
      selectedCategory,
      parsedOnPage + 1
    );
    updatePagnitor(parsedOnPage + 1);
    await renderImages(data.result);
    mapListenerToLikeIcon();
    removeSpinner();
  }
});

errorButton.addEventListener("click",()=>{
  removeError();
})

// on Load
window.onload = loadHomePage();
