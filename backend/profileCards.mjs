import mongoose from 'mongoose'

const schema = mongoose.Schema({
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    role: String
})

export default mongoose.model('Profile', schema)
