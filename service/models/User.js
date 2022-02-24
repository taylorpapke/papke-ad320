import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    displayName: String,
    email: String,
    joined: String,
    active: String,
    //userId: mongoose.Types.ObjectId
    

  })

export const User = mongoose.model('User', UserSchema)