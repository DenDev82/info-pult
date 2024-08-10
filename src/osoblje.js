const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
// import { v4 as uuid } from "uuid";

const imageDir = path.join(__dirname, "../public", "Profesori");
const outputfilepath = path.join(__dirname, "imagelist.json");

const generateImageList = () => {
  fs.readdir(imageDir, (err, files) => {
    if (err) {
      console.error("Error reading directory", err);
      return;
    }
    const imageFiles = files.filter((file) => /\.(png|jpe?g)$/.test(file));
    const imageList = imageFiles.map((file) => ({
      id: uuidv4(),
      filename: file,
      name: file.replace(/_/g, " ").replace(/\.[^/.]+$/, ""),
    }));
    fs.writeFileSync(outputfilepath, JSON.stringify(imageList, null, 2));
    console.log("Image list generated successfuly");
  });
};
generateImageList();
