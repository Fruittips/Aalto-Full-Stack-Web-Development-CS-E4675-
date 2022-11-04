import { useState } from "react"
import Togglable from "../components/Togglable"
import blogsServices from "../services/blogsService"

const Blog = ({ blog, blogPostRef, deleteBlogHandler }) => {
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const increaseLikes = async () => {
    const updatedBlogRequest = {
      user: blog.user.id,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    await blogsServices.updateBlog(blog.id, updatedBlogRequest)

    setLikes(likes + 1)
  }

  return (
    <div className="blog-ctn" style={blogStyle}>
      <span>
        <span className="blog-title">{blog.title}</span>
        <span> </span>
        <span className="blog-author">{blog.author}</span>
      </span>
      <span className="toggle-blog">
        <Togglable buttonLabel="view" hideButtonLabel="hide" ref={blogPostRef}>
          <div className="blog-url">{blog.url}</div>
          <span className="blog-likes">likes {likes}</span>
          <button
            className="like-btn"
            onClick={() => increaseLikes()}
            value="like"
          >
            like
          </button>
          <div>{blog.user?.name}</div>
          <button
            className="remove-btn"
            type="button"
            onClick={() => deleteBlogHandler(blog)}
          >
            remove
          </button>
        </Togglable>
      </span>
    </div>
  )
}

export default Blog
