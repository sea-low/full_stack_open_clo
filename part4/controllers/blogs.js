const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const JsonWebTokenError = require("jsonwebtoken").JsonWebTokenError

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({ user: request.user }).populate("user", {
    username: 1,
    name: 1,
  })
  return response.status(200).json(blogs)
})

blogsRouter.get("/:id", async (request, response) => {
  const user = request.user
  try {
    const blog = await Blog.findById(request.params.id)
    blog ? response.json(blog) : response.status(400).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post("/", async (request, response, next) => {
  if (!request.user) {
    throw JsonWebTokenError
  }
  const user = request.user
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ?? 0,
    user: request.user,
  })
  if (!blog.title || !blog.url) {
    return response.status(400).send()
  }
  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ?? 0,
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id)
    response.json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete("/:id", async (request, response, next) => {
  const user = request.user
  try {
    const blog = await Blog.findById(request.params.id)

    if (blog && request.user.id == blog.user._id) {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } else if (!blog) {
      response.status(404).json({ error: "Blog not found" })
    } else {
      response.status(401).json({ error: "Permission denied" })
    }
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
