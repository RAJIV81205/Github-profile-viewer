import express from "express";
import connectDB from "./database.js";
import User from "./model.js";

const app = express();
app.use(express.json());

app.post("/user/:userName", async (req, res) => {
  try {
    const userName = req.params?.userName;
    let gitUrl = `https://api.github.com/users/${userName}`;

    const response = await fetch(gitUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    
    const { name, login, avatar_url, followers, following, public_repos } =
      data;
      
    var user = new User({
      name,
      userName: login,
      avatar: avatar_url,
      followers,
      following,
      repos: public_repos,
    });
    console.log(user);
    
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("Error while creating user : " + err.message);
  }
});

app.get("/user",async (req, res) => {
    try{
        const users =await User.find({});
        if(users.length === 0){
            res.status(404).send("No users found")
        } else{
            res.send(users);
        }
    }catch(err){
        res.status(400).send("Error while fetching users");
    }
})

connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(7777, () => {
      console.log("Server runnin on port 7777");
    });
  })
  .catch((err) => {
    console.log("Error connecting to db : ", err);
  });
