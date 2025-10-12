import express from 'express';
import jwt from 'jsonwebtoken';
import {body,validationResult} from 'express-validator';
import User from '../models/User.js';
const router = express.Router();

// register
router.post('/register',
  [body('username').isLength({min:3}),body('email').isEmail(),body('password').isLength({min:5})],
  async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});
    const {username,email,password} = req.body;
    try{
      let user = await User.findOne({$or:[{email},{username}]});
      if(user) return res.status(400).json({msg:'User exists'});
      user = new User({username,email,password});
      await user.save();
      const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET,{expiresIn:'7d'});
      res.json({token,user:{id:user._id,username,useravatar}});
    }catch(err){ res.status(500).send('Server err'); }
  });

// login
router.post('/login',
  [body('email').isEmail(),body('password').exists()],
  async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});
    const {email,password} = req.body;
    try{
      const user = await User.findOne({email});
      if(!user) return res.status(400).json({msg:'Invalid creds'});
      const ok = await user.comparePassword(password);
      if(!ok) return res.status(400).json({msg:'Invalid creds'});
      const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET,{expiresIn:'7d'});
      res.json({token,user:{id:user._id,username:user.username,avatar:user.avatar,isAdmin:user.isAdmin}});
    }catch(err){ res.status(500).send('Server err'); }
  });

export default router;