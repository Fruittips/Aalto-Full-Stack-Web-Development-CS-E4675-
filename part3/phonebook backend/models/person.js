const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI || '0.0.0.0'

console.log('connecting to ', url)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected')
  })
  .catch((error) => {
    'error connecting : ', error.message
  })

const phoneBookSchema = new mongoose.Schema({
  name: { type: String, minLength: 3 },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (value) => {
        return /^\d{1,2}(-\d+)?$/.test(value)
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
})

phoneBookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Phone Book', phoneBookSchema)
