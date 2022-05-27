const multer = require("multer");
const path = require("path");

const IMAGEFOLDER = {
  attachment: path.join(__dirname, "../public/images/attachments"),
  avatar: path.join(__dirname, "../public/images/avatars"),
};

const MIME_TYPES = {
  attachment: {
    "audio/mpeg": "mp3",
    "audio/mp3": "mp3",
    "audio/wav": "wav",

    "video/mp4": "mp4",
    "video/avi": "avi",
    "video/mpeg": "mpeg",
    "video/quicktime": "mov",
  },

  avatar: {
    "image/gif": "gif",
    "image/bmp": "bmp",
  },

  classic: {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    
  },
};

const attachmentStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, IMAGEFOLDER.attachment);
  },
  filename: (req, file, callback) => {
    const extension = MIME_TYPES.attachment[file.mimetype] || MIME_TYPES.classic[file.mimetype];
    callback(null, `${file.originalname.split(".")[0]}_${Date.now()}.${extension}`);
  },
});

const avatarStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, IMAGEFOLDER.avatar);
  },
  filename: (req, file, callback) => {
    const userId = req.url.split("/")[1];
    const extension = MIME_TYPES.avatar[file.mimetype] || MIME_TYPES.classic[file.mimetype];
    callback(null, `${userId}-${Date.now()}.${extension}`);
  },
});

exports.attachmentStockage = multer({ storage: attachmentStorage }).single("attachment");
exports.avatarStockage = multer({ storage: avatarStorage }).single("avatar");
