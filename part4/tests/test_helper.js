const Blog = require("../models/blog")
const User = require("../models/user")

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

const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon" })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

const blogsInDb = async () => {
  const blog = await Blog.find({})
  return blog.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}
