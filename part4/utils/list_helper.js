const test = require("node:test")

const dummy = (blogs) => {
  let count = blogs.length > 1 ? 1 : 0
  return count
}
const totalLikes = (blogs) => {
  let likes = []
  blogs.forEach((x) => likes.push(x.likes))
  return likes.reduce((a, b) => a + b)
}

const favoriteBlog = (blogs) => {
  blogs.sort((a, b) => b.likes - a.likes)
  let favorite = []
  let ob = {}
  ob.title = blogs[0].title
  ob.author = blogs[0].author
  ob.likes = blogs[0].likes
  favorite.push(ob)

  return favorite[0]
}

const mostBlogs = (blogs) => {
  let names = []
  let ranked = []

  blogs.forEach((x) => names.push(x.author))
  names.sort()
  for (let y = 0; y < names.length; y++) {
    let count = 1
    let o = {}
    if (names[y] !== names[y + 1]) {
      count = count + (y - names.indexOf(names[y]))
      o.author = names[y]
      o.blogs = count
      ranked.push(o)
    }
  }
  ranked.sort((a, b) => b.blogs - a.blogs)
  return ranked[0]
}

const mostLikes = (blogs) => {
  let totals = []
  blogs.sort((a, b) => a.author.localeCompare(b.author))

  for (let a = 0; a < blogs.length; a++) {
    let tempArr = []
    let justLikes = []
    let ob = {}
    if (blogs[a].author !== blogs[a + 1]?.author) {
      tempArr = blogs.filter((x) => x.author === blogs[a].author)
      tempArr.forEach((x) => justLikes.push(x.likes))
      ob.author = tempArr[0].author
      ob.likes = justLikes.reduce((acc, curr) => acc + curr, 0)
      totals.push(ob)
    }
  }
  totals.sort((a, b) => b.likes - a.likes)
  return totals[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
