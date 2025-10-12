import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
  podcast:{type:mongoose.Schema.Types.ObjectId,ref:'Podcast',required:true},
  rating:{type:Number,min:1,max:5,required:true},
  comment:{type:String,maxlength:500}
},{timestamps:true});

FeedbackSchema.index({podcast:1});
export default mongoose.model('Feedback',FeedbackSchema);