
const express=require('express')
const AuthController=require('../controllers/AuthController')
const UserAuthenticate=require("../middleware/authorization")

const router=express.Router();

router.post('/signup',AuthController.adduser);
router.post('/login',AuthController.login);
router.get('/activateaccount/:id',AuthController.activateAccount);
router.post('/UpdateUserPic',UserAuthenticate.authenticate,AuthController.uploadPic);
router.patch('/updateProfile',UserAuthenticate.authenticate,AuthController.updateProfile);
module.exports=router;