import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { Deck } from './models/Deck.js'
import { User } from './models/User.js'

const app = express()
const port = 8000

// Connect to MongoDB

const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0y9om.mongodb.net`
try {
  await mongoose.connect(connectionString)
} catch (err) {
  console.log('error ', err)
}

// Middleware

const exampleMiddleware = (req, res, next) => {
  console.log('example middleware')
  next()
}

app.use(cors())
app.use(express.json())
app.use(exampleMiddleware)

// Routes

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

// Get an individual card by id

app.get('/cards/:id', async (req, res) => {
  const card = await Deck.findById(req.params.id)
  if (card){
    res.send(card)
  } else {
    res.sendStatus(404)
  }
})

// Get all cards for a deck, with the option to paginate results

app.get('/decks/:id/cards', async (req, res) => {
  //const limit = req.query.limit
  const deck = await Deck.findById(req.params.id)
  if (deck) {
    res.send(deck.cards.slice(0, 5))
  } else {
    res.sendStatus(404)
  }
})

// Get a deck by id

app.get('decks/:id', async (req, res) => {
  const deck = await Deck.findById(req.params.id)
  if (deck) {
    res.send(deck)
  } else {
    res.sendStatus(404)
  }
})

// Get a deck by user

app.get('users/:id', async (req, res) => {
  const user = await User.decks.findById(req.params.id)
  if (user) {
    res.send(user)
  } else {
    res.sendStatus(404)
  }
})

// Create a deck

app.post('decks/:id', async (req, res) => {
  const deck = await Deck.findById(req.params.id)
  if (deck) {
    res.send(deck)
  } else {
    res.sendStatus(404)
  }
})

// Create a card

app.post('cards/:id', async (req, res) => {
  const card = await Deck.findById(req.params.id)
  if (card) {
    res.send(card)
  } else {
    res.sendStatus(404)
  }
})

// Create a user

app.post('users/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    res.send(user)
  } else {
    res.sendStatus(404)
  }
})

// Update a card

app.put('cards/:id', async (req, res) => {
  const card = await Deck.findById(req.params.id)
  if (card) {
    res.send(card)
  } else {
    res.sendStatus(404)
  }
})

// Update a deck

app.put('decks/:id', async (req, res) => {
  const deck = await Deck.findById(req.params.id)
  if (deck) {
    res.send(deck)
  } else {
    res.sendStatus(404)
  }
})

// Update a user

app.put('users/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    res.send(user)
  } else {
    res.sendStatus(404)
  }
})

// Delete a card

app.delete('cards/:id', async (req, res) => {
  const card = await Deck.findById(req.params.id)
  if (card) {
    res.send(card)
  } else {
    res.sendStatus(404)
  }
})

// Delete a deck and all associated cards

app.delete('decks/:id', async (req, res) => {
  const deck = await Deck.findById(req.params.id)
  if (deck) {
    res.send(deck)
  } else {
    res.sendStatus(404)
  }
})

// Delete a user

app.delete('users/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    res.send(user)
  } else {
    res.sendStatus(404)
  }
})

const cardsById = async (req, res) => {
  const card = await Deck.findOne()({
    'cards._id': req.params.id
  })
  res.status(200).send(card)
}

//app.get('/cards/:id', cardsById)

const isUrl = (value) => {
  const re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
  return re.test(value)
}

app.post('/cards', async (req, res) => {
  const cardRequest = req.body
  
  if ((!cardRequest.frontImage && !cardRequest.frontText) || 
    (!cardRequest.backImage && !cardRequest.backText)) {
    res.status(400).send('Card data incomplete')
  }

  if ((frontImage && !isUrl(frontImage)) || (backImage && !isUrl(backImage))) {
    res.status(400).send('Image fields must be valid URLs')
  }

  if (!cardRequest.deckId) {
    res.status(400).send('Deck ID is required')
  }

  try {
    const deck = await Deck.findById(cardRequest.deckId)
    if (deck) {
      deck.cards.push({
        frontImage: cardRequest.frontImage,
        frontText: cardRequest.frontText,
        backImage: cardRequest.backImage,
        backText: cardRequest.backText
      })
      await deck.save()
      res.sendStatus(204)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    console.log(`error in creating card ${err}`)
    res.sendStatus(502)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})