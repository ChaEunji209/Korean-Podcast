import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import podcastRoutes from './routes/podcasts.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import feedbackRoutes from './routes/feedback.js';
import adminRoutes from './routes/admin.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// create uploads if missing
['uploads/audio','uploads/avatar'].forEach(d=>fs.mkdirSync(d,{recursive:true}));

app.use(cors({ origin:['http://localhost:5173','http://localhost:5174'] }));
app.use(express.json());
app.use('/uploads',express.static('uploads')); // public files

// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/podcasts', podcastRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes);

// global error
app.use((err,req,res,next)=>{
  console.error(err);
  res.status(err.status||500).json({msg:err.message||'Server error'});
});

mongoose.connect(process.env.MONGO_URI)
  .then(()=>app.listen(PORT,()=>console.log(`Server ${PORT}`)))
  .catch(err=>console.error(err));