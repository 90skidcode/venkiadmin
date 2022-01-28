import axios from "axios";
import { UtilsJson } from "../utils/UtilsJson";

function PutApi(url,data) {
  let responcePostData = [];
  let loadingPost = false;
  let errorPost = null;

  // console.log('Start');
  loadingPost = true;
  axios
    .put(UtilsJson.baseUrl + url,data)
    .then((response) => {
      responcePostData = response;
      console.log(response);
    })
    .catch((err) => {
      errorPost = err;
    })
    .finally(() => {
      loadingPost = false;
    });

  return { responcePostData, loadingPost, errorPost };
}

export default PutApi;
