import {v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY,
  secure: true,
})

export default cloudinary


// const upload = await cloudinary.uploader.upload(filePath,{
//   resource_type: "video",
//   folder: 'voices'
// });


