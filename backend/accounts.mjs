import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import Signupcards from './Signupcards.mjs'
import Profile from './profileCards.mjs'

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

app.post('/login', (req, res) => {
    const { email, password} = req.body
    Signupcards.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: 'User already exist' })
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

app.put('/login', (req, res) => {
    const { email, password } = req.body
    Signupcards.findOne({ email: email }, (err, user) => {
        console.log(user)
        if (user) {
            if (password === user.password) {
                res.send({ message: "login sucess" })
            } else {
                res.send({ message: "wrong credentials" })
            }
        } else if (user == null) {
            res.send({ message: "not register" })
        }
    })
})

app.get('/login', (req, res) => {
    Signupcards.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})


app.post('/signup', (req, res) => {
    const profileCard = req.body
    Profile.create(profileCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.put('/signup', (req, res) => {
    const { email, password, role, firstname, lastname } = req.body
    Profile.findOne({ email: email }, (err, user) => {
        // console.log(user)
        if (user) {
            res.status(200).send(user)
        } else {
            res.status(500).send(err)
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


app.listen(port, () => console.log(`listening on port ${port}`))