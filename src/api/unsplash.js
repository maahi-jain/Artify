import { createApi } from "unsplash-js";
import { ACCESS_KEY } from "../constants";

export const unsplash = createApi({
    accessKey: ACCESS_KEY,
  });
  