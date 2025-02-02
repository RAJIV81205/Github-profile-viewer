import express from "express";
import connectDB from "./database.js";
import User from "./model.js";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.PORT || 7777;
app.use(express.json());
app.use(express.static(path.join("./frontend")));
app.use(cors());


app.get("/user", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("No users found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Error while fetching users");
  }
});

app.post("/save-data", async (req, res) => {
  try {
    const { userdata } = req.body; 

    if (!userdata) {
      return res.status(400).json({ error: "Invalid request, missing userdata" });
    }

    const { avatar, name, userName, followers, following, repos } = userdata;

    
    const user = await User.findOneAndUpdate(
      { userName }, 
      { name, avatar, followers, following, repos }, 
      { new: true, upsert: true } 
    );

    return res.status(200).json({
      message: "User data saved successfully",
      user,
    });
  } catch (error) {
    console.error("Error saving user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log("Server running on port 7777");
    });
  })
  .catch((err) => {
    console.log("Error connecting to db : ", err);
  });
