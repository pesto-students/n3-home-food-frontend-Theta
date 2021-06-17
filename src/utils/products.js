import axios from "./axios";

export const getPendingProducts = async (data) => {
      let response = await axios
        .get('/v1/products/get/pending')
        .then((response) => {
          if(response){
            return response.data;
          }
         return
        })
        .catch((error) => {
          return error.response;
        });
      return response;
}
