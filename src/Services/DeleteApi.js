import { useEffect, useState } from "react";
import axios from "axios";
import { UtilsJson } from "../utils/UtilsJson";

function DeleteApi(url) {
  console.log(url);
  const [responceDeleteData, setData] = useState(null);
  const [loadingDeleteData, setLoading] = useState(false);
  const [errorDeleteData, setError] = useState(null);

  useEffect(() => { 
   console.log('Start');
    setLoading(true);
    axios
      .delete(UtilsJson.baseUrl+url)
      .then((response) => {
        setData(response);
       console.log(response);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { responceDeleteData, loadingDeleteData, errorDeleteData };
}

export default DeleteApi;