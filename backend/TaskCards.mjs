import mongoose from 'mongoose'

const schema = mongoose.Schema({
    email: String,
    tasks: Array,
    organization: String,
    team: String,
    role: String,
    name: String
})

export default mongoose.model('Taskcards', schema)
