import { google } from "googleapis";
import formidable from "formidable";
import fs from "fs";

// Biar Vercel tidak auto-parse body
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = formidable({});
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Error parsing file" });
    }

    const file = files.file?.[0];
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    try {
      // ambil service account key dari environment
      const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);

      const auth = new google.auth.JWT(
        serviceAccount.client_email,
        null,
        serviceAccount.private_key,
        ["https://www.googleapis.com/auth/drive.file"]
      );

      const drive = google.drive({ version: "v3", auth });

      // upload file ke Google Drive
      const response = await drive.files.create({
        requestBody: {
          name: file.originalFilename,
          parents: ["<FOLDER_ID_GOOGLE_DRIVE>"], // optional: isi kalau mau simpan ke folder tertentu
        },
        media: {
          mimeType: file.mimetype,
          body: fs.createReadStream(file.filepath),
        },
        fields: "id, name, webViewLink, webContentLink",
      });

      res.status(200).json({ success: true, file: response.data });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Upload failed", detail: e.message });
    }
  });
}
