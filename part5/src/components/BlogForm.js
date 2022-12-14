import { useState } from "react"

const BlogForm = ({ onCreateHandler }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  return (
    <form
      onSubmit={(event) =>
        onCreateHandler({
          event: event,
          title: title,
          author: author,
          url: url,
        })
      }
    >
      <label>title:</label>
      <input
        className="input-title"
        type="text"
        placeholder="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <br />
      <label>author:</label>
      <input
        className="input-author"
        type="text"
        placeholder="author"
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
      />
      <br />
      <label>url:</label>
      <input
        className="input-url"
        type="text"
        placeholder="url"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
      />
      <br />
      <input className="btn-submit" type="submit" value="create" />
    </form>
  )
}

export default BlogForm
