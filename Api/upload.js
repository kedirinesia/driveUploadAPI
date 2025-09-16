import { google } from "googleapis";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "File parse error" });

    try {
      const auth = new google.auth.JWT(
        process.env.CLIENT_EMAIL,
        null,
        process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
        ["https://www.googleapis.com/auth/drive.file"]
      );

      const drive = google.drive({ version: "v3", auth });

      const fileMeta = { name: files.file.originalFilename };
      const media = {
        mimeType: files.file.mimetype,
        body: fs.createReadStream(files.file.filepath),
      };

      const response = await drive.files.create({
        requestBody: fileMeta,
        media,
        fields: "id",
      });

      res.status(200).json({ fileId: response.data.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Upload failed" });
    }
  });
}
