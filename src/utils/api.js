import axios from "./axios";

export const getSeller = async (data) => {
      let response = await axios
        .get('/v1/admin')
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error.response;
        });
      return response;
}
