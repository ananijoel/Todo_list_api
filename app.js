const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/dataBase/sequelize')
const cors = require('cors')

const {Todo} = require('./src/dataBase/sequelize')

const staticport = 3743
const app = express()
const port = process.env.PORT || staticport

sequelize.init_dataBase()

app
    .use(bodyParser.json())// middleware qui sert a parser toutes les entres de la web app du format string au format json
    .use(cors())

app.get('/', (req, res) => res.json('hello Todo_list_api'))
app.get('/api/get-todo', async (req, res) => {
    Todo.findAll()
    .then(Todo =>{
        const message = 'todo find'
        res.json(Todo)
    })
    .catch(error => {
        const message = `Le todo n'a pas pu être ajouté. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
})

require('./src/routes/add-todo')(app)
//require('./src/routes/get-todo')(app)
require('./src/routes/remove-todo')(app)
require('./src/routes/check-todo')(app)

if(process.env.PORT){
    app.listen(port,() => console.log('le projet Todo_list_api est demarée'))
} else{
    app.listen(port,() => console.log('le projet Todo_list_api est demarée sur : http://localhost:'+staticport))
}
