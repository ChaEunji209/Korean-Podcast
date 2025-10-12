import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';
import Podcast from '../models/Podcast.js';
import {uploadAvatar} from '../multer.js';
const router = express.Router();

// get me
router.get('/me',auth,async (req,res)=>{
  const user = await User.findById(req.user.id).select('-password').populate('favourites');
  res.json(user);
});

// update profile
router.patch('/me',auth,uploadAvatar.single('avatar'),async (req,res)=>{
  const {username} = req.body;
  const user = await User.findById(req.user.id);
  if(username) user.username=username;
  if(req.file) user.avatar = `/uploads/avatar/${req.file.filename}`;
  await user.save();
  res.json(user);
});

// favourites
router.get('/me/favourites',auth,async (req,res)=>{
  const user = await User.findById(req.user.id).populate('favourites');
  res.json(user.favourites);
});
router.post('/me/favourites',auth,async (req,res)=>{
  const user = await User.findById(req.user.id);
  if(!user.favourites.includes(req.body.podcastId)){
    user.favourites.push(req.body.podcastId);
    await user.save();
  }
  res.json({msg:'Added'});
});
router.delete('/me/favourites/:id',auth,async (req,res)=>{
  await User.findByIdAndUpdate(req.user.id,{$pull:{favourites:req.params.id}});
  res.json({msg:'Removed'});
});

export default router;