const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const osobljePath = path.join(__dirname, "imagelist.json");

router.delete("/person/:id", (req, res) => {
  const idToRemove = req.params.id;
  console.log(`DELETE request received for ID: ${req.params.id}`);

  fs.readFile(osobljePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading data" });

    let osoblje = JSON.parse(data);
    const updatedOsoblje = osoblje.filter((person) => person.id !== idToRemove);

    fs.writeFile(
      osobljePath,
      JSON.stringify(updatedOsoblje, null, 2),
      (err) => {
        if (err) return res.status(500).json({ message: "Error writing data" });
        res.status(200).json({ message: "Osoblje removed successfully" });
      }
    );
  });
});

module.exports = router;
