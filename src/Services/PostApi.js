import axios from "axios";
import { UtilsJson } from "../utils/UtilsJson";

function PostApi(url,data,props) {
  console.log(props);
  let responcePostData = [];
  let loadingPost = true;
  let errorPost = null;

  axios
    .post(UtilsJson.baseUrl + url,data)
    .then((response) => {
      responcePostData = response;
      props.setMessage({class:'bg-green-600',visable:true, title:'Success', body:'Record Added Successfully'});
    })
    .catch((err) => {
      errorPost = err;
      props.setMessage({class:'bg-red-600',visable:true, title:'Error', body:'Please try again !!'});
    })
    .finally(() => {
      loadingPost = false;
    });

  return { responcePostData, loadingPost, errorPost };
}

export default PostApi;
