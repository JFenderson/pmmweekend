// index.js

const express = require('express')
const path = require('path')

const app = express()
const CLIENT_PATH = path.join(__dirname, '../html')
app.use(express.static(CLIENT_PATH));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (_, res) => { 
    res.sendFile(path.join(__dirname, 'index.html')) 
  });

app.listen(3000, () => {
    console.log('Server is up on 3000')
})