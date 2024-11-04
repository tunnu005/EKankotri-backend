import express from 'express'
import { SaveTemplates, loadtemplates, logOut, login, signup } from '../controllers/user.js'
import { isAdmin, isAuthenticated } from '../middleware/auth.js'
import upload from '../middleware/multer.js'
import { forget } from '../controllers/user.js'
import { uploadImage } from '../controllers/user.js'
import { getecard } from '../controllers/card.js'

import jwt from 'jsonwebtoken'

const router = express.Router()

router.post("/new",signup)
router.post("/login",login)
// router.get('/middleware',isAuthenticated,isAdmin)
router.post("/upload",uploadImage)
router.get("/forget",forget)
router.post('/post',isAuthenticated,isAdmin,upload.single('file'),SaveTemplates)
router.post('/logout',isAuthenticated,logOut)
router.get('/templates/:page/:pageSize/',loadtemplates)
router.get('/getecard/:id',getecard)
router.get('/verifyToken',(req,res)=>{

    console.log('hit')
    const {token} = req.cookies

    if(!token) return res.status(400).json({message:'User Not Login',success:false});
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    res.status(200).json({message:'User Login',success:true,user:decodedData.payload});

})
export default router


