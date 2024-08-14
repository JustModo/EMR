const { PrismaClient } = require("@prisma/client");
const { compareHash, generateToken } = require("../Utils/utilHandler");

const prisma = new PrismaClient();

async function checkExists(modelName, fieldName, value) {
  try {
    const model = prisma[modelName];
    const user = await model.findUnique({
      where: {
        [fieldName]: value,
      },
    });
    return !user;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

async function generateID(modelName, fieldName) {
  const min = 100000000000;
  const max = 999999999999;

  async function isUnique(num) {
    try {
      const model = prisma[modelName];
      const user = await model.findUnique({
        where: {
          [fieldName]: num,
        },
      });
      return !user;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  do {
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (!isUnique(randomNum));

  return randomNum;
}

async function registerUser(username, password, aadhar, HID) {
  try {
    const newUser = await prisma.userData.create({
      data: {
        username: username,
        password: password,
        HID: HID,
        aadhar: aadhar,
      },
    });
    return { status: 200, message: "User created successfully" };
  } catch (error) {
    console.error(error);
    return { status: 400, message: "Failed to create user" };
  }
}

async function loginUser(username, password) {
  try {
    const user = await prisma.userData.findUnique({
      where: {
        username: username,
      },
      select: {
        password: true,
        HID: true,
      },
    });

    if (!user || !(await compareHash(password, user.password)))
      return { status: 400, message: "Incorrect Details!" };

    const token = generateToken(user.HID);

    const HID = String(user.HID);
    console.log(HID);

    return { status: 200, message: { token, HID } };
  } catch (error) {
    console.error("Error:", error);
  }
}

async function addContent(path, text, HID) {
  const CID = await generateID("content", "CID");
  const obj = {
    text: JSON.stringify(text),
    image: path,
  };
  console.log(HID);
  try {
    const newUser = await prisma.content.create({
      data: {
        CID: CID,
        HID: HID,
        data: JSON.stringify(obj),
      },
    });
    console.log("Uploaded Content!");
    return CID;
  } catch (error) {
    console.error(error);
  }
}

async function addRecord(data, CID, HID) {
  const RID = await generateID("record", "RID");
  const author = data.author;
  const RT = data.recordtype;
  const title = data.title;
  try {
    const newUser = await prisma.record.create({
      data: {
        CID: CID,
        HID: HID,
        RID: RID,
        author: author,
        recordtype: RT,
        title: title,
      },
    });
    console.log("Uploaded Record!");
    return CID;
  } catch (error) {
    console.error(error);
  }
}

async function queryUI(HID) {
  try {
    const user = await prisma.record.findMany({
      where: {
        HID: HID,
      },
      select: {
        RID: true,
        CID: true,
        date: true,
        author: true,
        recordtype: true,
        title: true,
      },
    });
    const serializedUser = user.map((entry) => ({
      ...entry,
      RID: String(entry.RID),
      CID: String(entry.CID),
    }));

    console.log(serializedUser);
    return { status: 200, message: serializedUser };
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getData(CID) {
  try {
    const user = await prisma.content.findUnique({
      where: {
        CID: CID,
      },
      select: {
        data: true,
      },
    });
    console.log(user); //rework image
    return { status: 200, message: { user } };
  } catch (error) {
    console.error("Error:", error);
  }
}

// async function logUserData() {
//   try {
//     const userData = await prisma.content.findMany();
//     // const userDat = await prisma.record.findMany();
//     console.log("Content:", userData);
//     // console.log("Record:", userDat);
//     return userData;
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     throw error;
//   }
// }

// logUserData()
//   .then((userData) => {})
//   .catch((error) => {});

// async function deleteAll() {
//   try {
//     // Assuming 'prisma' is your Prisma Client instance
//     await prisma.content.deleteMany({});
//     console.log("All data deleted successfully");
//   } catch (error) {
//     console.error("Error deleting data:", error);
//   }
// }

// deleteAll()
//   .then((userData) => {
//     // Do something with the user data if needed
//   })
//   .catch((error) => {
//     // Handle error
//   });

module.exports = {
  checkExists,
  generateID,
  registerUser,
  loginUser,
  addContent,
  addRecord,
  queryUI,
  getData,
};
