import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3001;
const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadedFiles = [];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // .jpg, .png
    const base = path.basename(file.originalname, ext);
    const timestamp = Date.now();
    cb(null, `${base}-${timestamp}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image uploads are allowed"));
    }
    cb(null, true);
  },
});

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  }),
);

app.use(express.static("public"));

app.get("/api/images", (req, res) => {
  return res.json(uploadedFiles);
});

app.get("/api/search", (req, res) => {
  const query = req.query.q?.toString().toLowerCase() || "";
  if (!query) {
    return res.json(uploadedFiles);
  }
  const results = uploadedFiles.filter((file) => {
    return file.originalName.toLowerCase().includes(query) ?? false;
  });
  res.json(results);
});

app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded" });
  }
  const file = req.file;

  const uploadedMetadata = {
    filename: file.filename,
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    url: `/uploads/${file.filename}`,
    uploadedAt: new Date(),
    id: uuidv4(),
  };

  uploadedFiles.push(uploadedMetadata);

  res.status(200).json({
    message: "Upload successful",
    file: uploadedMetadata,
  });
});

app.delete("/api/image/:id", (req, res) => {
  const fileId = req.params.id;

  const fileIndex = uploadedFiles.findIndex((file) => file.id === fileId);
  if (fileIndex === -1) {
    return res.status(404).json({ error: "File not found" });
  }

  const fileToDelete = uploadedFiles[fileIndex];
  const filePath = path.join(
    __dirname,
    "../public/uploads",
    fileToDelete.filename,
  );

  fs.unlink(filePath, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to delete file from server" });
    }

    // Remove metadata from array
    uploadedFiles.splice(fileIndex, 1);

    return res
      .status(200)
      .json({ message: "File deleted successfully", id: fileId });
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
