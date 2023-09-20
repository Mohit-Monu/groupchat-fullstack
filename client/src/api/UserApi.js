import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const createGroup = async (name, token) => {
  const config = {
    data: {
      name:name
    },
    method: "POST",
    url: "group/creategroup",
    headers: {
      Authorization: token,
    },
  };
  try {
    const res = await API(config);
    return res;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

