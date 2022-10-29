const _updateAuthorByParams = (blogs, params) => {
  let authors = [];
  blogs.forEach((blog) => {
    const x = authors.filter((author) => author.author === blog.author);

    switch (params) {
      case "blogs":
        if (x.length > 0) {
          authors.forEach((author) =>
            author.author === blog.author ? (author[params] += 1) : author
          );
        } else {
          authors.push({
            author: blog.author,
            [params]: 1,
          });
        }
        break;

      case "likes":
        if (x.length > 0) {
          authors.forEach((author) =>
            author.author === blog.author
              ? (author[params] += blog[params])
              : author
          );
        } else {
          authors.push({
            author: blog.author,
            [params]: blog[params],
          });
        }
        break;

      default:
        return;
    }
  });

  return authors;
};

const _findAuthorByMostParams = (authors, params) => {
  return authors.reduce(
    (maxAuthor, currAuthor) =>
      !maxAuthor || currAuthor[params] >= maxAuthor[params]
        ? currAuthor
        : maxAuthor,
    null
  );
};

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const sumTotalLikes = blogs.reduce(
    (totalLikes, currBlog) => totalLikes + currBlog.likes,
    0
  );
  return sumTotalLikes;
};

const favoriteBlog = (blogs) => {
  const x = blogs.reduce((favBlog, currBlog) => {
    if (favBlog == null) {
      return currBlog;
    } else if (currBlog.likes >= favBlog.likes) {
      return currBlog;
    } else {
      return favBlog;
    }
  }, null);

  return {
    title: x.title,
    author: x.author,
    likes: x.likes,
  };
};

const mostBlogs = (blogs) => {
  const authors = _updateAuthorByParams(blogs, "blogs");
  const maxBlogsAuthor = _findAuthorByMostParams(authors, "blogs");

  return maxBlogsAuthor;
};

const mostLikes = (blogs) => {
  const authors = _updateAuthorByParams(blogs, "likes");
  const maxLikesAuthor = _findAuthorByMostParams(authors, "likes");

  return maxLikesAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
