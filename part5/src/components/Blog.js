import { useState } from "react"
import Togglable from "../components/Togglable"
import blogsServices from "../services/blogsService"

const Blog = ({ blog, blogPostRef }) => {
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const increaseLikes = async () => {
    await blogsServices.updateBlog(blog.id, {
      likes: likes + 1,
    })

    setLikes(likes + 1)
  }

  return (
    <div style={blogStyle}>
      <span>{blog.title}</span>
      <span>
        <Togglable buttonLabel="view" hideButtonLabel="hide" ref={blogPostRef}>
          <div>{blog.url}</div>
          <span>likes {likes}</span>
          <input type="button" onClick={() => increaseLikes()} value="like" />
          <div>{blog.author}</div>
        </Togglable>
      </span>
    </div>
  )
}

export default Blog
