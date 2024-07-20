import axios from "axios";
import { UtilsJson } from "../utils/UtilsJson";
import toast from "react-hot-toast";
async function PostApi(url, data, props, sucessMessage, page) {
  let responcePostData = [];
  let loadingPost = true;
  let errorPost = null;
  try {
    await axios
      .post(UtilsJson.baseUrl + url, data)
      .then((response) => {
        responcePostData = response;
        if (page != 'login') {
          toast.success(sucessMessage, { position: "top-right" });
        }
      })
      .catch((err) => {
        errorPost = err;
       toast.error('Please try again !!', { position: "top-right" })
      })
      .finally(() => {
        loadingPost = false;
      });
  } catch (e) {
    errorPost = e;
  }

  return { responcePostData, loadingPost, errorPost };
}

export default PostApi;
