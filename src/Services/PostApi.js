import axios from "axios";
import { UtilsJson } from "../utils/UtilsJson";
async function PostApi(url,data,props,sucessMessage,page) {
  let responcePostData = [];
  let loadingPost = true;
  let errorPost = null;
try{
  await axios
    .post(UtilsJson.baseUrl + url,data)
    .then((response) => {
      responcePostData = response;
      if(page != 'login')
      props.setMessage({class:'bg-green-600',visable:true, title:'Success', body:sucessMessage});
    })
    .catch((err) => {
      errorPost = err;
      props.setMessage({class:'bg-red-600',visable:true, title:'Error', body:'Please try again !!'});
    })
    .finally(() => {
      loadingPost = false;
    });
  }catch(e){
    errorPost = e;
  }

  return { responcePostData, loadingPost, errorPost };
}

export default PostApi;
