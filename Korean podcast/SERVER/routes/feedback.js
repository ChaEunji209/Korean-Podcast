import express from 'express';
import auth from '../middleware/auth.js';
import Feedback from '../models/Feedback.js';
const router = express.Router();

// submit
router.post('/',auth,async (req,res)=>{
  const {podcastId,rating,comment} = req.body;
  const f = new Feedback({user:req.user.id,podcast:podcastId,rating,comment});
  await f.save();
  res.json({msg:'Thanks'});
});

// public list for one podcast
router.get('/podcast/:id',async (req,res)=>{
  const list = await Feedback.find({podcast:req.params.id})
    .populate('user','username avatar').sort({createdAt:-1});
  res.json(list);
});

export default router;