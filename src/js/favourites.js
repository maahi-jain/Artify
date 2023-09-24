import { FAV_IMAGES } from "../constants";
import { getFromLocalStorage } from "./localStorage";

export const findImage = (id) => {
  let favImages = getFromLocalStorage(FAV_IMAGES);
  let imageIndex = favImages?.findIndex((image) => image.id === id);
  return imageIndex;
};
