import express from 'express';
import Podcast from '../models/Podcast.js';
import Feedback from '../models/Feedback.js';
const router = express.Router();

// list + search
router.get('/',async (req,res)=>{
  const {q,page=1,limit=12} = req.query;
  const filter = q ? {$or:[{title:RegExp(q,'i')},{description:RegExp(q,'i')}]} : {};
  const podcasts = await Podcast.find(filter)
    .limit(limit*1).skip((page-1)*limit).sort({createdAt:-1});
  const total = await Podcast.countDocuments(filter);
  res.json({podcasts,total});
});

// single + avg rating
router.get('/:id',async (req,res)=>{
  const p = await Podcast.findById(req.params.id);
  if(!p) return res.status(404).json({msg:'Not found'});
  const agg = await Feedback.aggregate([
    {$match:{podcast:p._id}},
    {$group:{_id:null,avg:{$avg:'$rating'},count:{$sum:1}}}
  ]);
  res.json({podcast:p,stats:agg[0]||{avg:0,count:0}});
});

export default router;