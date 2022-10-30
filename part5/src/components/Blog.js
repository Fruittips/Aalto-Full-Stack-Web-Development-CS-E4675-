import {} from "react"
import Togglable from "../components/Togglable"

const Blog = ({ blog, useRef }) => (
  <>
    <span>{blog.title}</span>
    <span>
      <Togglable buttonLabel="view" ref={useRef}>
        <div>{blog.url}</div>
        <span>likes {blog.likes}</span>
        <input type="button" onClick={() => console.log("like")} value="like" />
        <div>{blog.author}</div>
      </Togglable>
    </span>
  </>
)

export default Blog
