const GROUPS = require("../models/Group");
const MESSAGES = require("../models/Messages");
const USERS = require("../models/Auth");
const multer = require("multer");
const AWS = require("aws-sdk");
const upload = multer({ storage: multer.memoryStorage() });

async function addUser(req, res) {
  try {
    const { useremail, group_id } = req.body;
    const membertoadd = await USERS.findOne({ email: useremail });
    if (!membertoadd) {
      return res.status(404).json({ message: "User not found" });
    }
    const group = await GROUPS.findById(group_id);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    const invaliduser = group.members.find((member) => {
      if (member.user.equals(req.user._id)) {
        if (member.isAdmin != false) {
          return true;
        } else {
          return false;
        }
      }
    });
    if (!invaliduser) {
      return res.status(400).json({ message: "Not Autherized" });
    }
    const existingMember = group.members.find((member) =>
      member.user.equals(membertoadd._id)
    );
    if (existingMember) {
      return res
        .status(400)
        .json({ message: "User is already a member of the group" });
    }
    group.members.push({ user: membertoadd._id });
    await group.save();
    res.status(200).json({ message: "Member added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
async function deleteGroup(req, res) {
  const group_id = req.params.id;
  try {
    const group = await GROUPS.findById(group_id);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    const invaliduser = group.members.find((member) => {
      if (member.user.equals(req.user._id)) {
        if (member.isAdmin != false) {
          return true;
        } else {
          return false;
        }
      }
    });
    if (!invaliduser) {
      return res.status(400).json({ message: "Not Autherized" });
    }
    await GROUPS.deleteOne({ _id: group_id });
    res.status(200).json({ message: "Group Deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
async function removeuserGroup(req, res) {
  const group_id = req.params.Gid;
  const Uid = req.params.Uid;
  try {
    const group = await GROUPS.findById(group_id);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    const invaliduser = group.members.find((member) => {
      if (member.user.equals(req.user._id)) {
        if (member.isAdmin != false) {
          return true;
        } else {
          return false;
        }
      }
    });
    if (!invaliduser) {
      return res.status(400).json({ message: "Not Autherized" });
    }
    await GROUPS.updateOne(
      { _id: group_id },
      { $pull: { members: { _id: Uid } } }
    );
    res.status(200).json({ message: "Removed the User" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
async function promoteuserGroup(req, res) {
  const group_id = req.params.Gid;
  const Uid = req.params.Uid;
  try {
    const group = await GROUPS.findById(group_id);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    const invaliduser = group.members.find((member) => {
      if (member.user.equals(req.user._id)) {
        if (member.isAdmin != false) {
          return true;
        } else {
          return false;
        }
      }
    });
    if (!invaliduser) {
      return res.status(400).json({ message: "Not Autherized" });
    }
    await GROUPS.updateOne(
      { _id: group_id, "members._id": Uid },
      { $set: { "members.$.isAdmin": true } }
    );
    res.status(200).json({ message: "User Promoted Success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
async function UpdateGroupPic(req, res) {
  upload.single("file")(req, res, async (err) => {
    try {
      const group_id = req.params.Gid;
      const group = await GROUPS.findById(group_id);
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
      const invaliduser = group.members.find((member) => {
        if (member.user.equals(req.user._id)) {
          if (member.isAdmin != false) {
            return true;
          } else {
            return false;
          }
        }
      });
      if (!invaliduser) {
        return res.status(400).json({ message: "Not Autherized" });
      }
      const userId = req.user._id;
      const filename = "File" + userId + "/" + Date.now();
      const fileURl = await uploadToS3(req.file.buffer, filename);
      await GROUPS.updateOne(
        { _id: group_id},
        { group_Img:fileURl}
      );
      res.status(200).json({ fileURl, success: true });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Something went wrong " });
    }
  });
}
async function uploadToS3(data, filename) {
  try {
    const BUCKET_NAME = process.env.BUCKET_NAME;
    const IAM_USER_KEY = process.env.IAM_USER_KEY;
    const IAM_USER_SECRET = process.env.IAM_USER_SECRET;
    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
    });
    var params = {
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: data,
      ACL: "public-read",
    };
    const response = await s3bucket.upload(params).promise();
    return response.Location;
  } catch (err) {
    console.log(err);
    return err;
  }
}
async function UpdateGroup(req, res) {
  const group_id = req.params.Gid;
  try {
    const group = await GROUPS.findById(group_id);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    const invaliduser = group.members.find((member) => {
      if (member.user.equals(req.user._id)) {
        if (member.isAdmin != false) {
          return true;
        } else {
          return false;
        }
      }
    });
    if (!invaliduser) {
      return res.status(400).json({ message: "Not Autherized" });
    }
    await GROUPS.updateOne(
      { _id: group_id},
      { group_name:req.body.group_name,group_description:req.body.group_description }
    );
    res.status(200).json({ message: "Group Updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
module.exports = {
  addUser,
  deleteGroup,
  removeuserGroup,
  promoteuserGroup,
  UpdateGroupPic,
  UpdateGroup
};
