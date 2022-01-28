import axios from "axios";
import { UtilsJson } from "../utils/UtilsJson";

function PostApi(url,data) {
  let responcePostData = [];
  let loadingPost = true;
  let errorPost = null;

  axios
    .post(UtilsJson.baseUrl + url,data)
    .then((response) => {
      responcePostData = response;
    })
    .catch((err) => {
      errorPost = err;
    })
    .finally(() => {
      loadingPost = false;
    });

  return { responcePostData, loadingPost, errorPost };
}

export default PostApi;
