import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const getmessage = async (group_id,token) => {
  const config = {
    method: "get",
    url: "/group/getmessage/"+group_id,
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
export const getallparticipent = async (token,group_id) => {
  const config = {
    method: "get",
    url: "/group/getallparticipent/"+group_id,
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
export const getallgroup = async (token) => {
  const config = {
    method: "get",
    url: "/group/getallgroup",
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

export const sendMessage = async (conf,token) => {
  const config = {
    data:conf,
    method: "post",
    url: "/group/sendmessage",
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
}

export const SendFile = async (conf,token,group_id) => {
  const config = {
    data:conf,
    method: "post",
    url: "/group/SendFile/"+group_id,
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
}
export const leaveGroup = async (group_id,token,userId) => {
  const config = {
    method: "delete",
    url: "/group/leaveGroup/"+group_id+"/"+userId,
    headers: {
      Authorization: token,
    },
  };
  try {
    const res = await API(config);
    return res;
  } catch (err) {
    console.log(err);
    throw (err);
  }
}

export const addUser = async (conf,token) => {
  const config = {
    data:conf,
    method: "post",
    url: "/admin/addUser",
    headers: {
      Authorization: token,
    },
  };
  try {
    const res = await API(config);
    return res;
  } catch (err) {
    console.log(err);
    throw (err);
  }
}
export const deleteGroup = async (group_id,token) => {
  const config = {
    method: "delete",
    url: "/admin/deleteGroup/"+group_id,
    headers: {
      Authorization: token,
    },
  };
  try {
    const res = await API(config);
    return res;
  } catch (err) {
    console.log(err);
    throw (err);
  }
}
export const removeuserGroup = async (group_id,token,userId) => {
  const config = {
    method: "delete",
    url: "/admin/removeuserGroup/"+group_id+"/"+userId,
    headers: {
      Authorization: token,
    },
  };
  try {
    const res = await API(config);
    return res;
  } catch (err) {
    console.log(err);
    throw (err);
  }
}
export const promoteuserGroup = async (group_id,token,userId) => {
  const config = {
    method: "delete",
    url: "/admin/promoteuserGroup/"+group_id+"/"+userId,
    headers: {
      Authorization: token,
    },
  };
  try {
    const res = await API(config);
    return res;
  } catch (err) {
    console.log(err);
    throw (err);
  }
}
export const UpdateGroupPic = async (picdata,token,groupid) => {
  const config = {
    method: "post",
    data: picdata,
    url: "/admin/UpdateGroupPic/"+groupid,
    headers: {
      Authorization: token,
    },
  };
  try {
    const res = await API(config);
    return res;
  } catch (err) {
    console.log(err);
    throw (err);
  }
}
export const UpdateGroup = async (formdata,token,groupid) => {
  const config = {
    method: "post",
    data: formdata,
    url: "/admin/UpdateGroup/"+groupid,
    headers: {
      Authorization: token,
    },
  };
  try {
    const res = await API(config);
    return res;
  } catch (err) {
    console.log(err);
    throw (err);
  }
}