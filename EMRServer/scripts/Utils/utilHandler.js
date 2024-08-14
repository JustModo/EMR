const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const JWT_SECRET = "your_jwt_secret";

function generateToken(HID) {
  try {
    const token = jwt.sign({ HID: HID.toString() }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
}

function verifyToken(req, res, next) {
  const tokenb = req.headers.authorization;

  if (!tokenb) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  if (!tokenb.startsWith("Bearer"))
    return res
      .status(401)
      .json({ message: "Unauthorized: Bearer not included" });

  const token = tokenb.slice(7, tokenb.length);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.HID = decoded.HID;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Forbidden: Token has expired" });
    } else {
      console.error("Error verifying token:", error);
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
  }
}

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function compareHash(enteredPassword, hashedPassword) {
  try {
    const match = await bcrypt.compare(enteredPassword, hashedPassword);
    return match;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error;
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Data/uploads");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    cb(null, false);
    return;
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = {
  hashPassword,
  compareHash,
  generateToken,
  verifyToken,
  upload,
};
