const Admin = require("../model/Admin");
const Client = require("../model/Client");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Admin.findOne({ Admin_Email: email });

    let role = null;

    if (user) {
      // Use boolean field correctly
      role = user.IsSuperAdmin ? "superadmin" : "admin";
    } else {
      user = await Client.findOne({ Client_Email: email });

      if (user) {
        role = "customer";
      }
    }

    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    if (!user) return res.status(404).json({ message: "Invalid credentials" });

    // Correct password field for Admin/Client
    const hashedPassword = user.Admin_Password || user.Client_Password;

    console.log("PASSWORD FROM FRONTEND:", password);
    console.log("HASH IN DATABASE:", hashedPassword);

    // Validate hashed password
    const hash = crypto.createHash("sha256").update(password).digest("hex");

    if (hash !== hashedPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Correct name field for Admin/Client
    const userName = user.Admin_Name || user.Client_Name;
    const userEmail = user.Admin_Email || user.Client_Email;
    const userID = user.Admin_ID || user.Client_ID;

    // Create token
    const token = jwt.sign(
      {
        UserID: userID,
        role,
      },
      "MY_SECRET_KEY",
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: userID,
        role,
        email: userEmail,
        name: userName,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
