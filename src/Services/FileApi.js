import axios from "axios";
import { UtilsJson } from "../utils/UtilsJson";

async function FileApi(data) {
  let responceFileData = [];
  let loadingFile = true;
  let errorFile = null;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const formData = new FormData();
  formData.append("files", data);

  await axios
    .post(UtilsJson.baseUrl + "upload", formData, config)
    .then((response) => {
      responceFileData = response;
    })
    .catch((err) => {
      errorFile = err;
    })
    .finally(() => {
      loadingFile = false;
    });
  return { responceFileData, loadingFile, errorFile };
}

export default FileApi;
