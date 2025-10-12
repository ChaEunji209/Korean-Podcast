import mongoose from 'mongoose';

const PodcastSchema = new mongoose.Schema({
  title:{type:String,required:true},
  description:String,
  audioUrl:{type:String,required:true},
  transcriptKr:String,
  transcriptMy:String
},{timestamps:true});

export default mongoose.model('Podcast',PodcastSchema);