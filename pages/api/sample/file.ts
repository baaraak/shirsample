import formidable from "formidable";
import { uploadToAzureStorage } from "../../../lib/azure";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    try {
      const file = await uploadToAzureStorage(files.file);
      console.log(file);

      res.status(200).json({ file });
    } catch (e) {
      res.status(200).json({ e });
    }
  });
};
