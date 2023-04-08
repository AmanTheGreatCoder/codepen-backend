const express = require('express')
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;
const { CreateUser, GetUser } = require('./db');
require('dotenv').config();

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.json('Hello world')
})

app.post(
    '/register', async (req, res) => {
        try {
            const { email, password } = req.body.data;
            console.log("req body", req.body)
            console.log("email password", email, password)
            if (email && password) {
                const response = await CreateUser(email, password)

                if (response === 200) {
                    res.sendStatus(200);
                }
                else if (response === 201) {
                    res.sendStatus(201)
                }
                else if (response === 502) {
                    res.sendStatus(500)
                }
                else {
                    res.sendStatus(400)
                }
            }
        }
        catch (err) {
            res.json(`Error ${err}`).status(500)
        }
    }
)

app.post(
    '/login', async (req, res) => {
        try {
            console.log("req body", req.body)
            const { email, password } = req.body.data;
            console.log("email password", email, password)
            if (email && password) {
                const response = await GetUser(email, password)
                console.log("response", response)
                if (response === 200) {
                    res.sendStatus(200)
                }
                else if (response === 500) {
                    res.sendStatus(404)
                }
                else {
                    res.sendStatus(500)
                }
            }
        }
        catch (err) {
            console.log("Error ", err)
            res.json(`Error ${err}`).status(500)
        }
    }
)


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})