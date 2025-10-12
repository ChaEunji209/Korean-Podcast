import multer from 'multer';
import path from 'path';

const audioStorage = multer.diskStorage({
  destination:(req,file,cb)=>cb(null,'uploads/audio'),
  filename:(req,file,cb)=>cb(null,Date.now()+path.extname(file.originalname))
});
const avatarStorage = multer.diskStorage({
  destination:(req,file,cb)=>cb(null,'uploads/avatar'),
  filename:(req,file,cb)=>cb(null,Date.now()+path.extname(file.originalname))
});

export const uploadAudio = multer({storage:audioStorage,limits:{fileSize:20e6}});
export const uploadAvatar = multer({storage:avatarStorage,limits:{fileSize:2e6}});