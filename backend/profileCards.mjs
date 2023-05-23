import mongoose from 'mongoose'

const schema = mongoose.Schema({
    email: String,
    password: String, 
    organization: String
})

export default mongoose.model('Profile', schema)
