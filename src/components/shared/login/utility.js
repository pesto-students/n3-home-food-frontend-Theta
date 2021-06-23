import axios from "../../../utils/axios";
import { setUser } from "../../../utils/helpers";

export const loginUser = async (info) => {
      
      let url = ''
      if(info.customerType === 'Admin')
      {
        url = '/admin/login'
      }
      else if(info.customerType === 'Seller')
      {
        url = '/sellers/login'
      }

      let response = await axios
        .post(url,info)
        .then((response) => {
          setUser(response.data)
          if(response.data.userType === 'Admin')
          {
            window.location.href = '/admin/dashboard'
          }
          if(response.data.userType === 'Seller')
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
