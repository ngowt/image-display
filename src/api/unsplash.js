import axios from "axios";

const accessKey =
  "e594021dd7a83d7f511cc737081a7c71f305fc3494e7368c401047898a422a77";

export const unsplash = axios.create({
  baseURL: `https://api.unsplash.com`,
  headers: {
    Authorization: `Client-ID ${accessKey}`
  }
});
