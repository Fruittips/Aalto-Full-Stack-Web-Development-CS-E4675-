const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../app");
const Blog = require("../models/Blog");
const User = require("../models/User");
const api = supertest(app);

//blogs
let initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blog = new Blog(initialBlogs[0]);
  await blog.save();
  blog = new Blog(initialBlogs[1]);
  await blog.save();

  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash: passwordHash });
  await user.save();
});

test("default like value 0 if like is missing", async () => {
  const postBlogData = {
    title: "Missing likes number",
    author: "Author Chan",
    url: "https://TESTTT.lol/",
  };

  let response = await api
    .post("/api/blogs")
    .send(postBlogData)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(response.body["likes"]).toBe(0);
});

test("missing url or title response error 400 Bad Request", async () => {
  const missingUrlData = {
    title: "Missing url",
    author: "Author Chan",
  };

  const missingTitleData = {
    author: "Author Chan",
    url: "bababab.com",
  };

  await api.post("/api/blogs").send(missingUrlData).expect(400);
  await api.post("/api/blogs").send(missingTitleData).expect(400);
});

test("deleting blog post", async () => {
  let response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const latestPost = response.body[response.body.length - 1];

  await api.delete(`/api/blogs/${latestPost.id}`).expect(204);
});

test("updating blog post", async () => {
  const changes = { likes: 21 };

  let response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const latestPost = response.body[response.body.length - 1];

  response = await api
    .patch(`/api/blogs/${latestPost.id}`)
    .send(changes)
    .expect(200);

  expect(response.body["likes"]).toBe(21);
});

//Users
describe("when there is initially one user in db", () => {
  test("creation succeeds with a fresh username", async () => {
    let response = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtStart = response.body;

    const newUser = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    response = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = response.body;
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("addition of same username give error response", async () => {
    const invalidUser = { username: "root", password: "secret" };

    let response = await api.post("/api/users").send(invalidUser).expect(400);

    expect(response.body.error).toBe("username must be unique");
  });

  test("invalid username and password", async () => {
    const invalidUser = { username: "a", password: "l" };

    let response = await api.post("/api/users").send(invalidUser).expect(400);

    expect(response.body.error).toBe(
      "username and password must be at least 3 characters long"
    );
  });
});

afterAll(() => {
  mongoose.connection.close();
});
