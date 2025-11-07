const express = require("express")
const cors = require("cors")
const static = require("./routes/static")
const path = require("path")
const dotenv = require("dotenv").config()

const mongodb = require('./utilities/connect')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(static)
app.use('/', require('./routes'))

// routers
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
});

const port = process.env.PORT

mongodb.initDb((err, db) => {
    if (err) {
        console.error("Failed to connect to MongoDB", err)
    } else {
        app.listen(port, () => {
            console.log(`App listening on http://localhost:${port}`)
            console.log("MongoDB connected!")
        })
    }
})