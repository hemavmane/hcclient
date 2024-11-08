import axios from "axios";
import { ApiUrl } from "./ApiUrl";

async function getData(url, params) {
    try {
      const response = await axios.get(ApiUrl.BASEURL + url, { params });
      if (response.status === 200) {
        return response;
      } else {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  export default getData