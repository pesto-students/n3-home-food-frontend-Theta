import axios from "../../../utils/axios";
import { setUser } from "../../../utils/helpers";

export const loginUser = async (info) => {
      let response = await axios
        .post('/login',info)
        .then((response) => {
          setUser(response.data)
          if(response.data.user_type === 'Admin')
          {
            window.location.href = '/admin/dashboard'
          }
          if(response.data.user_type === 'Seller')
          {
            window.location.href = '/seller/dashboard'
          }         
          return response;
        })
        .catch((error) => {
          return error.response;
        });
      return response;
}
