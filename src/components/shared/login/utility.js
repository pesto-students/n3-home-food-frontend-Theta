import axios from "../../../utils/axios";
import { setUser } from "../../../utils/helpers";

export const adminLogin = async (admin) => {
      let response = await axios
        .post('/login',admin)
        .then((response) => {
          setUser(response.data)
          window.location.href = '/admin/dashboard'
          return response;
        })
        .catch((error) => {
          return error.response;
        });
      return response;
}
