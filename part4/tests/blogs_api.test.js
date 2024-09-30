const { test, after, describe, beforeEach } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const bcrypt = require("bcrypt")
const helper = require("./test_helper")
const app = require("../app")

const Blog = require("../models/blog")
const User = require("../models/user")
const login = require("../controllers/login")

const api = supertest(app)

let defaultUserId
let defaultUserToken

const defaultUser = {
  username: "Lorem",
  name: "Ipsum",
  password: "1234",
}
const initialBlogs = [
  {
    title: "Sucking at Backend Testing",
    author: "Clo",
    url: "clo.com",
    likes: "3",
  },
  {
    title: "Helping my wife not suck at backend testing",
    author: "Coco",
    url: "coco.com",
    likes: "420",
  },
]

beforeEach(async () => {
  await User.deleteMany({})
  const starterUser = await api.post("/api/users").send(defaultUser)
  defaultUserId = starterUser.id
  const loginRequest = {
    username: defaultUser.username,
    password: defaultUser.password,
  }
  const loginResponse = await api.post("/api/login").send(loginRequest)
  defaultUserToken = loginResponse.body.token
  await Blog.deleteMany({})
  let blogObject = new Blog({ ...initialBlogs[0], user: defaultUserId })
  await blogObject.save()
  blogObject = new Blog({ ...initialBlogs[1], user: defaultUserId })
  await blogObject.save()
})

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})

test("unique identifier is named 'id'", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
  const body = response.body
  body.forEach((x) => assert(x.id))
})

test("creating a new blog post", async () => {
  const letsAdd = {
    title: "50 reasons Baker is the best cat",
    author: "Baker",
    url: "bakeristhebest.com",
    likes: 1,
  }
  const currPoster = {
    username: "Stinky",
    name: "Baker",
    password: "1234",
  }
  const logStuff = {
    username: currPoster.username,
    password: currPoster.password,
  }

  const postRes = await api.post("/api/users").send(currPoster)
  const loggingOn = await api.post("/api/login").send(logStuff)

  const stinkyToken = loggingOn.body.token

  const postingBlog = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${stinkyToken}`)
    .send(letsAdd)
    .expect(201)
})

test("if 'likes' prop is missing, make it zero", async () => {
  const missingLikes = {
    title: "Pics of your mom",
    author: "Me",
    url: "yourmom.com",
  }
  const postRes = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${defaultUserToken}`)
    .send(missingLikes)
    .expect(201)
    .expect("Content-Type", /application\/json/)
  const body = postRes.body
  assert(body.likes == 0)
})

test("if 'title' is prop is missing, backend gets mad", async () => {
  const missingTitle = {
    author: "This guy",
    url: "this-guy-fucks.com",
    likes: 600000000000,
  }
  const postRes = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${defaultUserToken}`)
    .send(missingTitle)
    .expect(400)
})

test("if 'url' prop is missing, backend gets mad", async () => {
  const missingUrl = {
    title: "Making the best pork soup",
    author: "Cody B",
    likes: 12034913409,
  }
  const postRes = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${defaultUserToken}`)
    .send(missingUrl)
    .expect(400)
})

test("if test AND url props are missing, backend gets mad", async () => {
  const missingBoth = {
    author: "Bob the outside orange cat",
    likes: 3,
  }
  const postRes = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${defaultUserToken}`)
    .send(missingBoth)
    .expect(400)
})

test("ensuring resources can be individually deleted", async () => {
  const deleteThis = {
    title: "The truest answer to why things are and how things will be",
    author: "Anonymous",
    url: "yourmom.edu",
    likes: 0,
  }
  const intPostRes = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${defaultUserToken}`)
    .send(deleteThis)
    .expect(201)
    .expect("Content-Type", /application\/json/)
  const deleteThisID = intPostRes.body.id
  const deleteRes = await api
    .delete(`/api/blogs/${deleteThisID}`)
    .set("Authorization", `Bearer ${defaultUserToken}`)
    .expect(204)
})

test("ensuring likes of individual posts can be updated", async () => {
  const addedResource = {
    title: "10 Reasons Coco is the Best",
    author: "Clo",
    url: "truths.org",
    likes: 100,
  }

  const intPost = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${defaultUserToken}`)
    .send(addedResource)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const postID = intPost.body.id
  const updatedResource = {
    title: "10 Reasons Coco is the Best",
    author: "Clo",
    url: "truths.org",
    likes: 1000,
  }

  const putRes = await api.put(`/api/blogs/${postID}`).expect(200)
})

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({ username: "root", passwordHash })

    await user.save()
  })

  test.only("user creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    }

    await api
      .post("/api/users")
      .send(newUser)
      .set("Authorization", `Bearer ${defaultUserToken}`)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    assert(usernames.includes(newUser.username))
  })
})

test("creation fails with proper statuscode and message if username already taken", async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: "Lorem",
    name: "Ipsum",
    password: "1234",
  }

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  assert(result.body.error.includes("expected `username` to be unique"))

  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})

test("uploading a blog 401 fails if there is no token", async () => {
  const newBlog = {
    title: "Harambe deserved to die",
    author: "Anon",
    url: "nonsense.com",
    likes: 0,
  }
  const oopsDidntPost = await api.post("/api/blogs").send(newBlog).expect(401)
})
