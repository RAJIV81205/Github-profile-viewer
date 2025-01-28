import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  userName: {
    type: String,
    unique: true,
  },
  avatar: {
    type: String,
  },
  followers: {
    type: Number,
  },
  following: {
    type: Number,
  },
  repos: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema, "GithubPastViewers");

export default User