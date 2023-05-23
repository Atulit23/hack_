import mongoose from 'mongoose'

const schema = mongoose.Schema({
    email: String,
    files: String,
    message: String,
    task: String
})

export default mongoose.model('SubmitCards', schema)
