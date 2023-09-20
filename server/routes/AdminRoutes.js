const express=require('express')
const AdminController=require('../controllers/AdminController')
const UserAuthenticate=require("../middleware/authorization")

const router=express.Router();

router.post('/addUser',UserAuthenticate.authenticate,AdminController.addUser);
router.post('/UpdateGroupPic/:Gid',UserAuthenticate.authenticate,AdminController.UpdateGroupPic);
router.post('/UpdateGroup/:Gid',UserAuthenticate.authenticate,AdminController.UpdateGroup);

router.delete('/deleteGroup/:id',UserAuthenticate.authenticate,AdminController.deleteGroup);
router.delete('/removeuserGroup/:Gid/:Uid',UserAuthenticate.authenticate,AdminController.removeuserGroup);
router.delete('/promoteuserGroup/:Gid/:Uid',UserAuthenticate.authenticate,AdminController.promoteuserGroup);

module.exports=router;