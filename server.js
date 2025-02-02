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

app.post("/user/:userName", async (req, res) => {
  try {
    const userName = req.params?.userName;
    let gitUrl = `https://api.github.com/users/${userName}`;

    const response = await fetch(gitUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const { name, login, avatar_url, followers, following, public_repos } =
      data;

    const existingUser = await User.findOne({ userName: login });

    if (existingUser) {
      existingUser.set({
        name,
        avatar: avatar_url,
        followers,
        following,
        repos: public_repos,
      });

      await existingUser.save();
      res.status(200).json(existingUser);
    } else {
      const user = new User({
        name,
        userName: login,
        avatar: avatar_url,
        followers,
        following,
        repos: public_repos,
      });

      await user.save(); // Save the new user to the database
      res.status(201).json(user); // Return the newly created user
    }
  } catch (err) {
    console.error("Error in POST /user/:userName:", err);
    res.status(400).send("Error while creating/fetching user: " + err.message);
  }
});

app.get("/user/:userName", async (req, res) => {
  try {
    const userName = req.params?.userName;
    const user = await User.findOne({ userName });
    if (!user) {
      res.status(404).send("No users found");
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(400).send("Error while fetching users");
  }
});

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
