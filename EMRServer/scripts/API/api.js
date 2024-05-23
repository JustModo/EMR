const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const {
  checkExists,
  generateID,
  registerUser,
  loginUser,
  addContent,
  addRecord,
  queryUI,
  getData,
} = require("../Database/dbHandler");
const { hashPassword, verifyToken, upload } = require("../Utils/utilHandler");

const PORT = 3000;
const app = express();
const fs = require("fs");
const { log } = require("console");

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/register", async (req, res) => {
  const { username, password, aadhar } = req.body;
  if (!username || !password || !aadhar)
    return res.status(400).send("Details can't be Blank!");

  const usernameExists = await checkExists("userData", "username", username);
  const aadharExists = await checkExists("userData", "aadhar", aadhar);

  if (!usernameExists) {
    return res.status(400).send("Username Exists!");
  }

  if (!aadharExists) {
    return res.status(400).send("Aadhar Already Registered!");
  }

  const hashedPassword = await hashPassword(password);
  const HID = await generateID("userData", "HID");

  registerUser(username, hashedPassword, aadhar, HID)
    .then((response) => {
      res.status(response.status).send(response.message);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).send("Username or Password can't be Blank!");
  loginUser(username, password)
    .then((response) => {
      res.status(response.status).send(response.message);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    });
});

app.post("/addrecord", upload.single("image"), async (req, res) => {
  const response = req.body;
  let imagepath;
  if (req.file && req.file.path) {
    imagepath = req.file.path;
  } else {
    imagepath = null;
  }
  // const HID = req.HID;

  const data = JSON.parse(response.data);
  const text = data.text;
  const HID = data.HID;

  const HIDExists = await checkExists("userData", "HID", HID);

  if (HIDExists) {
    return res.status(400).send("Invalid HID");
  }

  const CID = await addContent(imagepath, text, HID);
  const fieldData = {
    author: data.author,
    recordtype: data.recordtype,
    title: data.title,
  };

  addRecord(fieldData, CID, HID)
    .then(() => {
      console.log("Added Record!");
      res.status(200).send("Added Record!");
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    });
});

app.post("/query", verifyToken, (req, res) => {
  queryUI(req.HID)
    .then((response) => {
      res.status(response.status).send(response.message);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    });
});

app.post("/datareq", verifyToken, (req, res) => {
  const { CID } = req.body;
  console.log(CID);
  getData(CID)
    .then((response) => {
      res.status(response.status).json(response.message.user.data); //send back img
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    });
});

app.post("/getimage", verifyToken, (req, res) => {
  const { filePath } = req.body;
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file");
    }
    console.log("Sending File!");
    res.writeHead(200, { "Content-Type": "image/jpeg" });
    res.end(data);
  });
});

app.post("/download", verifyToken, (req, res) => {
  const { filePath } = req.body;

  if (!filePath) {
    return res.status(400).send("File path is required.");
  }
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found.");
  }

  const imageStream = fs.createReadStream(filePath);

  res.setHeader("Content-Type", "image/jpeg");

  imageStream.pipe(res);

  imageStream.on("error", (error) => {
    console.error("Error streaming file:", error);
    res.status(500).send("Error streaming file.");
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
