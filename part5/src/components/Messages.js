const AddedMessage = ({ blogTitle }) => {
  const addedMessageStyle = {
    color: "green",
    fontSize: 24,
    borderStyle: "solid",
    borderColor: "green",
    borderRadius: "5",
    width: "100%",
    padding: 30,
    margin: "5",
    backgroundColor: "grey",
  }
  return (
    <div style={addedMessageStyle}>
      <p>a new blog {blogTitle} added</p>
    </div>
  )
}

const ErrorMessage = ({ message }) => {
  const deletedMessageStyle = {
    color: "red",
    fontSize: 24,
    borderStyle: "solid",
    borderColor: "red",
    borderRadius: "5",
    width: "100%",
    margin: "5",
    backgroundColor: "grey",
  }
  return (
    <div style={deletedMessageStyle}>
      <p>{message}</p>
    </div>
  )
}

export { AddedMessage, ErrorMessage }
