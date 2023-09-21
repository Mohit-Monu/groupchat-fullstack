const GROUPS = require("../models/Group");
const MESSAGES = require("../models/Messages");
const multer = require("multer");
const AWS = require("aws-sdk");
const upload = multer({ storage: multer.memoryStorage() });
async function createGroup(req, res) {
  try {
    const group = await GROUPS.create({
      group_name: req.body.name,
      members: [{ user: req.user._id, isAdmin: true }],
    });
    res.status(200).json({ message: "group created", group });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
async function getmessage(req, res) {
  try {
    const group = await GROUPS.findById(req.params.id ).select("-members")
    const messages = await MESSAGES.find({ 'group': req.params.id }).populate('sender', 'name _id');
    res.status(200).json({ messages,group });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
async function getallparticipent(req, res) {
  try {
    const group = await GROUPS.findById(req.params.id ).populate("members.user","name profilePic")
    res.status(200).json({ members:group.members });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
async function getallgroup(req, res) {
  try {
    const groups = await GROUPS.find({ 'members.user': req.user._id });
    res.status(200).json({ groups });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
async function sendmessage(req, res) {
  try {
    const {message,group_id}=req.body
    const data=await MESSAGES.create({message,group:group_id,sender:req.user._id})
    res.status(200).json({data,sender:{_id:req.user.id,name:req.user.name}});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
async function SendFile(req, res) {
  upload.single("file")(req, res, async (err) => {
    try {
      const group_id = req.params.Gid;
      const group = await GROUPS.findById(group_id);
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
      const userId = req.user._id;
      const filename = "File" + userId + "/" + Date.now()+req.file.originalname
      const fileURl = await uploadToS3(req.file.buffer, filename);
      const data=await MESSAGES.create({message:fileURl,group:group_id,sender:req.user._id,type:req.file.mimetype.startsWith('image/')?"image":"file"})
      res.status(200).json({data,sender:{_id:req.user.id,name:req.user.name}});
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
async function leaveGroup(req, res) {
  try {
    const group_id=req.params.Gid
    const Uid=req.params.Uid
    const group = await GROUPS.findById(group_id);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    await GROUPS.updateOne(
      { _id: group_id },
      { $pull: { members: { _id: Uid } } }
    );
    res.status(200).json({message:"You Left"});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}

module.exports = { createGroup, getmessage,getallgroup,sendmessage,getallparticipent,leaveGroup,SendFile };
