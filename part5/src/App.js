import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import blogService from "./services/blogsService"
import loginService from "./services/loginService"
import { AddedMessage, ErrorMessage } from "./components/Messages"
import Togglable from "./components/Togglable"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [statusMessage, setStatusMessage] = useState(null)

  const blogFormRef = useRef()
  const blogPostRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAllBlogs()
      setBlogs(blogs)
    }

    if (user === null) {
      const retrievedUser = JSON.parse(window.localStorage.getItem("user"))
      if (retrievedUser) {
        blogService.setToken(retrievedUser.token)
        setUser(retrievedUser)
      }
    }

    fetchBlogs()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: username,
        password: password,
      })

      window.localStorage.setItem("user", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    console.log("logging out")
    window.localStorage.removeItem("user")
    setUser(null)
  }

  const handleCreateBlog = async ({ event, title, author, url }) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.createBlog({
        title: title,
        author: author,
        url: url,
      })
      setBlogs(blogs.concat(newBlog))
      setStatusMessage(newBlog.title)
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      setErrorMessage("type in title and url!!")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <>
        <h2>log into application</h2>
        {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
        <form onSubmit={(event) => handleLogin(event)}>
          <label>username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <br />
          <label>password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <br />
          <input type="submit" value="login" />
        </form>
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      {statusMessage ? <AddedMessage blogTitle={statusMessage} /> : null}
      <div>
        <span>{user.name} logged in</span>
        <span>
          <input type="button" onClick={() => handleLogout()} value="logout" />
        </span>
      </div>
      <br />
      <div>
        <h2>create new</h2>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm onCreateHandler={handleCreateBlog} />
        </Togglable>
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} ref={blogPostRef} />
      ))}
    </div>
  )
}

export default App
