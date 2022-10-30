import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  return
}

const getAllBlogs = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (blog) => {
  const config = { headers: { Authorization: token } }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const updateBlog = async (id, blog) => {
  const config = { headers: { Authorization: token } }

  const response = await axios.put(`${baseUrl}/${id}`, blog, config)
  return response.data
}

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}
export default { getAllBlogs, createBlog, updateBlog, deleteBlog, setToken }
