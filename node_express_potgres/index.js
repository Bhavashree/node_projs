const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request,response)=> {
    response.json({info: 'nodes,express postgres api'})
})

app.delete('/users/:id', db.deleteUser)

app.put('/users/:id', db.updateUser)

app.post('/users', db.createUser)
app.get('/users/:id',db.getByIdUSers)

app.get('/users', db.getUsers)

app.listen(port, ()=> {
    console.log('listening')
})