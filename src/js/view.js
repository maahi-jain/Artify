import { FAV_IMAGES, LIKED_CLASS } from "../constants";
import { findImage } from "./favourites";
import { image } from "./models";
const errorPopup = document.getElementById("error-popup"); 
import { saveToLocalStorage } from "./localStorage";
import { removeSpinner } from "./spinner";

const imageGallery = document.getElementById("image-gallery");
const imageContainer = document.getElementById("image-container");
const imageDetails = document.getElementById("image-details");
const onPageElement = document.getElementById("on-page");

let favImages = [];

// To render images
export const renderImages = async (data) => {
  imageContainer.innerHTML = null;
  data?.map((img) => {
    let fav = null;
    if (findImage(img.id) >= 0) {
      fav = LIKED_CLASS;
    }
    let imageElement = `<div>
        <img src=${img.urls.small} alt=${img.alt_description} class="image" id=${img.id} />
        <i class="fas fa-heart like-icon ${fav}" id="fav-${img.id}"></i>
      </div>`;
    imageContainer.innerHTML += imageElement;
  });
};

export const updatePagnitor = async (onPage) => {
  onPageElement.innerText = onPage;
};

// Update selected category
export const updateSelectedCategory = (selectedCategoryElement) => {
  const selectedCategory = document.querySelector(
    "#category-list>div[selected=true]"
  );
  selectedCategory?.setAttribute("selected", false);
  selectedCategoryElement?.setAttribute("selected", true);
};

// To update Fav
export const updateFavImages = (element) => {
  let imageId = element.id.substring(4);
  let index = findImage(imageId);
  if (index >= 0) {
    element.classList.remove(LIKED_CLASS);
    favImages.splice(index, 1);
  } else {
    element.classList.add(LIKED_CLASS);
    const imageDetails = document.getElementById(imageId);
    favImages.push(image(imageId, imageDetails.src, imageDetails.alt));
  }
  saveToLocalStorage(FAV_IMAGES, favImages);
};

// ShowImageDetails
export const showImageDetails = async (data) => {
  imageGallery.style.display = "none";
  const details = `<img src=${data.urls.small} alt=${data.alt_description}/>
  <div class="details-section">
  <h2 class="description">${
    data.description ? data.description : data.alt_description
  }</h2>
  <div class="details"><b>Location: </b><span>${
    data.location.name ? data.location.name : ""
  }</span></div>
  <div class="details"><b>Views: </b><span>${data.views}</span></div>
  <div class="details"><b>Likes: </b><span>${data.likes}</span></div>
  <div class="details"><b>Uploaded By: </b><span>${data.user.name}</span></div>
  <div class="details"><b>Created at: </b><span>${data.created_at}</span></div>
  </div>`;
  imageDetails.innerHTML = details;
};

export const showError=()=>{
  removeSpinner();
  errorPopup.style.display="block";
}

export const removeError=()=>{
  errorPopup.style.display="none";
}