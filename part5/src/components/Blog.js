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
    <div style={blogStyle}>
      <span>
        {blog.title} {blog.author}
      </span>
      <span>
        <Togglable buttonLabel="view" hideButtonLabel="hide" ref={blogPostRef}>
          <div>{blog.url}</div>
          <span>likes {likes}</span>
          <input type="button" onClick={() => increaseLikes()} value="like" />
          <div>name of user</div>
          <input
            type="button"
            onClick={() => deleteBlogHandler(blog)}
            value="remove"
          />
        </Togglable>
      </span>
    </div>
  )
}

export default Blog
