import React, { useDispatch, useSelector } from "react-redux";
import classes from "./UserUpdate.module.css";
import groupicon from "./usericon.png";
import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import { UpdateUserPic, updateProfile } from "../../actions/UserActions";
const UserUpdate = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    profilePic: "",
    Country: "",
    pincode: "",
    Address: "",
    Phone: "",
  });
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(null);
  const [fileuploaded, setFileUploaded] = useState(false);
  const [loading, setloading] = useState(false);
  const groupdetailload = useSelector(
    (state) => state.authReducer.authData.user
  );
  const token = useSelector((state) => state.authReducer.authData.token);
  const theme = useSelector((state) => state.userSettingReducer.theme);

  useEffect(() => {
    setFormData({
      name: groupdetailload.name,
      profilePic: groupdetailload.profilePic,
      Country: groupdetailload.Country,
      pincode: groupdetailload.pincode,
      Address: groupdetailload.Address,
      Phone: groupdetailload.Phone,
    });
  }, [groupdetailload]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      group_Img: file,
    });
    setFileUploaded(true);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    if (fileuploaded) {
      const formDataToSend = new FormData();
      formDataToSend.append("file", formData.group_Img);
      await dispatch(UpdateUserPic(formDataToSend, token));
    }
    await dispatch(updateProfile(formData, token));
    setloading(false);
    props.UserUpdate();
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className={classes["container"]}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className={`${classes["profile-form-container"]} bg-${theme}`}>
            <h3
              className={`text-center mb-3 text-${
                theme === "dark" ? "light" : "dark"
              }`}
            >
              User Update
            </h3>
            <form onSubmit={handleSubmit} className={classes["profile-form"]}>
              <center>
                <img
                  src={
                    previewImage
                      ? previewImage
                      : groupdetailload.profilePic
                      ? groupdetailload.profilePic
                      : groupicon
                  }
                  alt="Profile Preview"
                  className={`${classes["profile-picture-preview"]} `}
                />
              </center>
              <div className={classes["form-group"]}>
                <label
                  className={`${classes["group-createdAt"]} text-${
                    theme === "dark" ? "light" : "dark"
                  }`}
                >
                  User Picture:
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="form-control"
                />
              </div>
              <div className={classes["form-group"]}>
                <label
                  className={`${classes["group-createdAt"]} text-${
                    theme === "dark" ? "light" : "dark"
                  }`}
                >
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className={classes["form-group"]}>
                <label
                  className={`${classes["group-createdAt"]} text-${
                    theme === "dark" ? "light" : "dark"
                  }`}
                >
                  Country:
                </label>
                <input
                  type="text"
                  name="Country"
                  value={formData.Country}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className={classes["form-group"]}>
                <label
                  className={`${classes["group-createdAt"]} text-${
                    theme === "dark" ? "light" : "dark"
                  }`}
                >
                  Pincode:
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className={classes["form-group"]}>
                <label
                  className={`${classes["group-createdAt"]} text-${
                    theme === "dark" ? "light" : "dark"
                  }`}
                >
                  Phone:
                </label>
                <input
                  type="text"
                  name="Phone"
                  value={formData.Phone}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className={classes["form-group"]}>
                <label
                  className={`${classes["group-createdAt"]} text-${
                    theme === "dark" ? "light" : "dark"
                  }`}
                >
                  Address:
                </label>
                <textarea
                  name="Address"
                  value={formData.Address}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <button
                type="submit"
                className={`${classes["updatebtn"]} btn btn-primary`}
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => {
                  props.UserUpdate();
                }}
                className={`${classes["cancelbtn"]} btn btn-danger`}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserUpdate;
