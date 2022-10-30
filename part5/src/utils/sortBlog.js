const sortByLikes = (blog) => {
  blog.sort((curr, next) => next.likes - curr.likes)
  return blog
}

export { sortByLikes }
