import React, { useDispatch, useSelector } from "react-redux";
import classes from "./GroupEdit.module.css";
import groupicon from "./defaultgroup.jpg";
import { useEffect, useState } from "react";
import { UpdateGroupPic, UpdateGroup } from "../../actions/GroupActions";
import Spinner from "../Spinner/Spinner";
const GroupEdit = (props) => {
  const [formData, setFormData] = useState({
    group_Img: "",
    group_name: "",
    group_description: "",
  });
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(null);
  const [fileuploaded, setFileUploaded] = useState(false);
  const [loading, setloading] = useState(false);
  const groupdetailload = useSelector(
    (state) => state.groupReducer.currentgroupdata.group
  );
  const token = useSelector((state) => state.authReducer.authData.token);
  const theme = useSelector((state) => state.userSettingReducer.theme);

  useEffect(() => {
    setFormData({
      group_name: groupdetailload.group_name,
      group_description: groupdetailload.group_description,
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
      await dispatch(
        UpdateGroupPic(formDataToSend, token, groupdetailload._id)
      );
    }
    await dispatch(UpdateGroup(formData, token, groupdetailload._id));
    setloading(false);
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
              Group Update
            </h3>
            <form onSubmit={handleSubmit} className={classes["profile-form"]}>
              <center>
                <img
                  src={
                    previewImage
                      ? previewImage
                      : groupdetailload.group_Img
                      ? groupdetailload.group_Img
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
                  Group Picture:
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
                  name="group_name"
                  value={formData.group_name}
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
                  Address:
                </label>
                <textarea
                  name="group_description"
                  value={formData.group_description}
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
                type="submit"
                onClick={() => {
                  props.EditGroupHandler();
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

export default GroupEdit;
