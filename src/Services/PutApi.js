import axios from "axios";
import { UtilsJson } from "../utils/UtilsJson";
import toast from "react-hot-toast";
function PutApi(url,data,props, successMessage) {
  let responcePostData = [];
  let loadingPost = false;
  let errorPost = null;

  loadingPost = true;
  try{
  axios
    .put(UtilsJson.baseUrl + url,data)
    .then((response) => {
      responcePostData = response;
      toast.success(successMessage, { position: "top-right" });
    })
    .catch((err) => {
      errorPost = err;
      toast.error('Please try again !!', { position: "top-right" })
    })
    .finally(() => {
      loadingPost = false;
    });
  }catch(e){
    errorPost = e;
  }

  return { responcePostData, loadingPost, errorPost };
}

export default PutApi;
