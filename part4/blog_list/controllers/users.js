const bcrypt = require("bcrypt");

const usersRouter = require("express").Router();
const User = require("../models/User");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", "-user");
  response.status(200).json(users);
});

usersRouter.post("/", async (request, response) => {
  const { name, username, password } = request.body;

  const existingUser = await User.findOne({ username });

  if (!username || !password) {
    return response.status(400).json({
      error: "Username and Password must be entered",
    });
  }

  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: "username and password must be at least 3 characters long",
    });
  }

  if (existingUser) {
    return response.status(400).json({ error: "username must be unique" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    name: name,
    username: username,
    passwordHash: passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
