import mongoose from 'mongoose'

const CardSchema = new mongoose.Schema({
    frontImage: String,
    frontText: String,
    backImage: String,
    backText: String,
  })

const DeckSchema = new mongoose.Schema({
    name: String,
    cards: [CardSchema], // Allows us to create an array of card objects
    size: Number,
    userId: mongoose.Types.ObjectId
  })

const UserSchema = new mongoose.Schema({
    decks: [DeckSchema]
})

export const User = mongoose.model('User', UserSchema)