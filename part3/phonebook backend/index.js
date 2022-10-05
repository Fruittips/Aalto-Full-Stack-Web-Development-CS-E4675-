const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3001;
morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.static("build"));
app.use(express.json());
app.use(cors());

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :body",
    {
      skip: (req, res) => {
        return req.method != "POST";
      },
    }
  )
);

app.use(
  morgan("tiny", {
    skip: (req, res) => req.method == "POST",
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Phonebook up and running</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(phonebook);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const phoneEntry = phonebook.find((entry) => entry.id === id);

  if (phoneEntry) {
    res.json(phoneEntry);
  } else {
    res.statusMessage = "phonebook entry not found";
    res.status(404).end();
  }
});

app.get("/info", (req, res) => {
  const entries = phonebook.length;
  const date = new Date();

  res.send(`<p>Phonebook has info for ${entries} people</p><br><p>${date}</p>`);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  phonebook = phonebook.filter((entry) => entry.id !== id);

  res.statusMessage = "entry succesfully deleted";
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  generateId = () => {
    return Math.floor(Math.random() * (1000 - 1) + 1);
  };
  checkNameExists = (body) => {
    const existingEntries = phonebook.find((entry) => entry.name === body.name);
    if (existingEntries !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "content missing" });
  } else if (checkNameExists(body)) {
    return res.status(501).json({ error: "name must be unique" });
  } else {
    const entry = {
      id: generateId(),
      name: body.name,
      number: body.number,
    };

    phonebook = phonebook.concat(entry);
    res.json(phonebook);
  }
});

app.listen(PORT, () => {
  console.log(`server up and running on port ${PORT}`);
});
