import express from 'express';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';
import {uploadAudio} from '../multer.js';
import Podcast from '../models/Podcast.js';
import Feedback from '../models/Feedback.js';
const router = express.Router();

// create
router.post('/podcasts',auth,admin,uploadAudio.single('audio'),async (req,res)=>{
  const {title,description,transcriptKr,transcriptMy} = req.body;
  const audioUrl = `/uploads/audio/${req.file.filename}`;
  const p = await Podcast.create({title,description,audioUrl,transcriptKr,transcriptMy});
  res.json(p);
});
// edit
router.patch('/podcasts/:id',auth,admin,async (req,res)=>{
  const p = await Podcast.findByIdAndUpdate(req.params.id,req.body,{new:true});
  res.json(p);
});
// delete
router.delete('/podcasts/:id',auth,admin,async (req,res)=>{
  await Podcast.findByIdAndDelete(req.params.id);
  res.json({msg:'Deleted'});
});
// all feedback
router.get('/feedback',auth,admin,async (req,res)=>{
  const list = await Feedback.find().populate('user podcast').sort({createdAt:-1});
  res.json(list);
});

export default router;