import { ERROR_MESSAGE } from "../constants";
import { showError } from "../js/view";
import { unsplash } from "./unsplash";


export const fetchPhotosWithCategory = async (category,page=1) => {
  try {
    let result = await unsplash.search.getPhotos({
      query: category,
      page: page,
      perPage: 12,
      orientation: "portrait",
    });
    if (result.status === 200) {
      return {result: result.response.results, totalPages: result.response.total_pages};
    } else {
      showError();
    }
  } catch (err) {
    console.log(err.message);
    showError();
  }
};


