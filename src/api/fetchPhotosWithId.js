import { unsplash } from "./unsplash";
import { ERROR_MESSAGE } from "../constants";
import { showError } from "../js/view";

export const fetchPhotosWithId = async (id) => {
  try {
    const result = await unsplash.photos.get({ photoId: id });
    if (result.status === 200) {
      return result.response;
    } else {
      showError();
      
    }
  } catch (err) {
    console.log(ERROR_MESSAGE);
    showError();
  }
};
