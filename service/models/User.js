import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    displayName: String,
    email: String,
    joined: String,
    active: String,
  })

export const User = mongoose.model('User', UserSchema)