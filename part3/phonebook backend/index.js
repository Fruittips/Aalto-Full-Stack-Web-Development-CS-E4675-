require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
const errorHandler = (error, req, res, next) => {
  if (error.name === 'CaseError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    console.log(error)
    return res.status(400).json({ error: error.message })
  }
  next(error)
}
morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

//middlewares
app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :body',
    {
      skip: (req) => {
        return req.method !== 'POST'
      },
    }
  )
)
app.use(
  morgan('tiny', {
    skip: (req) => req.method === 'POST',
  })
)
// end of middleware section

app.get('/', (req, res) => {
  res.send('<h1>Phonebook up and running</h1>')
})

app.get('/info', (req, res) => {
  const date = new Date()
  Person.count({}, (error, count) => {
    res.send(`<p>Phonebook has info for ${count} people</p><br><p>${date}</p>`)
  })
})

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((entries) => {
      res.json(entries)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  console.log(req.params.id)
  Person.findById(req.params.id)
    .then((entry) => {
      if (entry) {
        res.json(entry)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  if ('number' in body) {
    Person.findByIdAndUpdate(
      req.params.id,
      { number: body.number },
      {
        new: true,
        runValidators: true,
        upsert: true,
      }
    )
      .then((updatedEntry) => {
        res.json(updatedEntry)
      })
      .catch((error) => next(error))
  }
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'content missing' })
  } else {
    const person = new Person({
      name: body.name,
      number: body.number,
    })

    person
      .save()
      .then((savedPerson) => {
        res.json(savedPerson)
      })
      .catch((error) => next(error))
  }
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.statusMessage = 'entry succesfully deleted'
      res.status(204).end()
    })
    .catch((error) => next(error))
})

//error handling middleware + binding to port
app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`server up and running on port ${PORT}`)
})
