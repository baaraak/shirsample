import cloudinary from 'cloudinary';
import formidable from 'formidable-serverless';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    console.log({ files });

    cloudinary.v2.uploader.upload(
      files?.file,
      {
        resource_type: 'video',
        public_id: 'myfolder/mysubfolder/my_dog',
      },
      function (error, result) {
        console.log(result, error);
        res.status(200).json(result);
      }
    );
  });
}

// const post = async (req, res) => {
//   const form = new formidable.IncomingForm();
//   form.parse(req, async function (err, fields, files) {
//     await saveFile(files.file);
//     return res.status(201).send("");
//   });
// };
