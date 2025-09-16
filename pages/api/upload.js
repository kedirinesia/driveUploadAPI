const { google } = require("googleapis");
const formidable = require("formidable");
const fs = require("fs");

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
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ error: "File parse error" });
    }

    // Validate required environment variables
    if (!process.env.CLIENT_EMAIL || !process.env.PRIVATE_KEY) {
      console.error("Missing Google Drive credentials");
      return res.status(500).json({ error: "Server configuration error" });
    }

    // Validate file upload
    if (!files.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

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

      // Clean up temporary file
      if (files.file.filepath) {
        fs.unlink(files.file.filepath, (unlinkErr) => {
          if (unlinkErr) console.error("Error deleting temp file:", unlinkErr);
        });
      }

      res.status(200).json({ 
        success: true,
        fileId: response.data.id,
        fileName: files.file.originalFilename
      });
    } catch (error) {
      console.error("Upload error:", error);
      
      // Clean up temporary file on error
      if (files.file && files.file.filepath) {
        fs.unlink(files.file.filepath, (unlinkErr) => {
          if (unlinkErr) console.error("Error deleting temp file:", unlinkErr);
        });
      }
      
      res.status(500).json({ error: "Upload failed" });
    }
  });
}
