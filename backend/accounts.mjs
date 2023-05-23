import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import Signupcards from './Signupcards.mjs'
import Profile from './profileCards.mjs'
import TaskCards from './TaskCards.mjs'
import SubmitCards from './SubmitCards.mjs'

const app = express()
const port = process.env.PORT || 8001

const url1 = 'mongodb+srv://atulitgaur:sanjayashaS28@cluster0.zbmbdhh.mongodb.net/?retryWrites=true&w=majority'
const url = 'mongodb+srv://atulitgaur:sanjayashaS28@cluster0.zbmbdhh.mongodb.net/hackdb'

app.get('/', (req, res) => {
    res.status(200).send('Heyo')
})

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors())
app.use(express.json())

app.post('/signup', (req, res) => {
    const { email, password} = req.body
    Profile.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: 'User already exists' })
        } else {
            const user = new Signupcards({ email: email, password: password})
            user.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "successful" })
                }
            })
        }
    })
})

app.put('/signup', (req, res) => {
    const { email, password, organization } = req.body
    Profile.findOne({ email: email }, (err, user) => {
        if (user) {
            if (password === user.password && organization === user.organization) {
                res.send({ message: "login success", user })
            } else {
                res.send({ message: "wrong credentials" })
            }
        } else if (user == null) {
            res.send({ message: "wrong credentials" })
        }
    })
})

app.get('/signup', (req, res) => {
    Profile.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/tasks', (req, res) => {
    const { email, tasks, organization, team, role, name } = req.body
    TaskCards.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: 'Task already exists' })
        } else {
            const user = new TaskCards({ email: email, tasks: tasks, organization: organization, team: team, role: role, name: name})
            user.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "successful" })
                }
            })
        }
    })
})

app.put('/tasks', (req, res) => {
    const { email, tasks } = req.body
    TaskCards.updateOne({email: email}, {$set: {tasks: tasks}}, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.get('/tasks', (req, res) => {
    TaskCards.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/submit', (req, res) => {
    const { email, files, message, task } = req.body
    SubmitCards.findOne({ email: email, task: task }, (err, user) => {
        if (user) {
            res.send({ message: 'Submission already exists' })
        } else {
            const user = new SubmitCards({ email: email, files: files, message: message, task: task})
            user.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "successful" })
                }
            })
        }
    })
})

app.put('/submit', (req, res) => {
    const { email, files, message, task } = req.body
    SubmitCards.updateOne({email: email, task: task}, {$set: {files: files, message: message}}, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.get('/submit', (req, res) => {
    SubmitCards.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.listen(port, () => console.log(`listening on port ${port}`))