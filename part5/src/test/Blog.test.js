import React from "react"
import axios from "axios"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "../components/Blog"
import BlogForm from "../components/BlogForm"

jest.mock("axios")

describe("Checking blog contents", () => {
  const blog = {
    id: "635efb49893a37d81e35a9ed",
    user: {
      name: "testing user",
      username: "root",
      id: "635e42814ca3e0cc763eab58",
    },
    title: "title",
    author: "author",
    url: "url.com",
    likes: 4,
  }
  const user = userEvent.setup()
  let container

  beforeEach(() => {
    container = render(<Blog key={blog.id} blog={blog} />).container
  })

  test("Displaying a blog renders the blog's title and author, but does not render its url or number of likes by default.", async () => {
    const blogTitle = container.querySelector(".blog-title")
    const blogAuthor = container.querySelector(".blog-author")
    const toggleContentContainer = container.querySelector(
      ".toggle-content-container"
    )

    expect(blogTitle.textContent).toEqual("title")
    expect(blogAuthor.textContent).toEqual("author")
    expect(toggleContentContainer).toHaveStyle("display: none")
  })

  test("Blog's url and number of likes are shown when the button controlling the shown details has been clicked", async () => {
    const viewButton = screen.getByText("view")

    await user.click(viewButton)

    const blogLikes = container.querySelector(".blog-likes")
    const blogUrl = container.querySelector(".blog-url")

    expect(blogLikes.textContent).toEqual("likes 4")
    expect(blogUrl.textContent).toEqual("url.com")
  })

  test("The like button is clicked twice", async () => {
    axios.put.mockResolvedValue({})

    const viewButton = screen.getByText("view")
    await user.click(viewButton)

    const likeButton = container.querySelector(".like-btn")
    await user.click(likeButton)
    await user.click(likeButton)

    expect(axios.put.mock.calls).toHaveLength(2)
  })

  test("Form calls the event handler it received as props with the right details when a new blog is created.", async () => {
    const mockCreateBlogHandler = jest.fn(({ event }) => {
      event.preventDefault()
    })

    let containerBlogForm = render(
      <BlogForm onCreateHandler={mockCreateBlogHandler} />
    ).container

    const titleField = containerBlogForm.querySelector(".input-title")
    const authorField = containerBlogForm.querySelector(".input-author")
    const urlField = containerBlogForm.querySelector(".input-url")
    const submitButton = screen.getByText("create")

    await user.type(titleField, "test title")
    await user.type(authorField, "test author")
    await user.type(urlField, "test url")
    await user.click(submitButton)

    const mockHandlerDetails = mockCreateBlogHandler.mock.calls[0][0]

    expect(mockHandlerDetails.title).toEqual("test title")
    expect(mockHandlerDetails.author).toEqual("test author")
    expect(mockHandlerDetails.url).toEqual("test url")
  })
})
