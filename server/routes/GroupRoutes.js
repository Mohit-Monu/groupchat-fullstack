const express=require('express')
const GroupController=require('../controllers/GroupController')
const UserAuthenticate=require("../middleware/authorization")

const router=express.Router();

router.post('/creategroup',UserAuthenticate.authenticate,GroupController.createGroup);
router.post('/sendmessage',UserAuthenticate.authenticate,GroupController.sendmessage);
router.post('/sendmessage',UserAuthenticate.authenticate,GroupController.sendmessage);
router.post('/SendFile/:Gid',UserAuthenticate.authenticate,GroupController.SendFile);
router.delete('/leaveGroup/:Gid/:Uid',UserAuthenticate.authenticate,GroupController.leaveGroup);
router.get('/getmessage/:id',UserAuthenticate.authenticate,GroupController.getmessage);
router.get('/getallparticipent/:id',UserAuthenticate.authenticate,GroupController.getallparticipent);
router.get('/getallgroup',UserAuthenticate.authenticate,GroupController.getallgroup);


module.exports=router;