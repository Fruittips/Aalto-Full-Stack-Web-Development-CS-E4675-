const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  let blogs = await Blog.find({}).populate("user", "-blogs -passwordHash");
  return response.status(200).json(blogs).end();
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const userId = request.user;

  if (!request.body["title"] || !request.body["url"]) {
    response.sendStatus(400);
    return;
  }

  const user = await User.findById(userId);
  const blog = new Blog({ ...request.body, user: user._id });

  const savedBlog = await blog.save();

  user["blogs"] = user["blogs"].concat(savedBlog);
  await user.save();

  return response.status(201).json(blog).end();
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const userId = request.user;

    await Blog.deleteOne({ _id: userId });
    return response.sendStatus(204);
  }
);

blogsRouter.patch("/:id", async (request, response) => {
  const changes = request.body;
  const updatedPost = await Blog.findByIdAndUpdate(request.params.id, changes, {
    returnDocument: "after",
  });

  return response.status(200).json(updatedPost).end();
});

module.exports = blogsRouter;
