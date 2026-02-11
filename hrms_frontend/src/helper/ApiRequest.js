import axios from "axios";
import { BaseUrl } from "../helper/BaseUrl";
import { accessToken } from "../helper/BaseUrl";

const ApiRequest = async (method, endpoint, payload = {}) => {
  const headers = {
    headers: {
      "x-access-token": accessToken,
    },
  };
  try {
    let response = null;
    switch (method) {
      case "POST":
        response = await axios.post(BaseUrl + endpoint, payload, headers);
        break;

      case "GET":
        response = await axios.get(BaseUrl + endpoint, headers);
        break;

      // case "PUT":
      //   response = await axios.put(BaseUrl + endpoint, payload, headers);
      //   break;

      case "DELETE":
        response = await axios.delete(BaseUrl + endpoint, payload, headers);
        break;

      default:
        throw new Error(`Invalid method: ${method}`);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default ApiRequest;
