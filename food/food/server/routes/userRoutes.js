import express from 'express';
const router = express.Router();
import UserController from '../controllers/userController.js';
import { add_user, getUser, getUserById, update_user, delete_user } from '../controllers/Usercrud.js';
import protect from '../middlewares/protected_route.js';
import { isAdmin, verifyToken } from '../middlewares/verifyUser.js';

//public Routes



router.get("/", getUser);
router.post("/add", add_user);
router.get("/:_id", getUserById);
router.delete("/:_id", delete_user);
router.put("/edit/:_id", update_user);


router.get('/test',verifyToken,isAdmin,UserController.testController)
router.post('/register', UserController.userRegistration)
router.post('/login' ,UserController.userLogin)





//protected Routes
router.get('/user-auth',verifyToken,(req,res)=>{
    res.status(200).send({ok:true});
})
router.get('/admin-auth',verifyToken,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})
router.get("/",protect,(req,res)=>{res.send("homepage")})



export default router
