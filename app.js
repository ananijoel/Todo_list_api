const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/dataBase/sequelize')
const cors = require('cors')

const staticport = 3000
const app = express()
const port = process.env.PORT || staticport

app
    .use(bodyParser.json())// middleware qui sert a parser toutes les entres de la web app du format string au format json
    .use(cors())


app.get('/', (req, res) => res.json('hello Todo_list_api'))

if(process.env.PORT){
    app.listen(port,() => console.log('le projet Todo_list_api est demarée'))
} else{
    app.listen(port,() => console.log('le projet Todo_list_api est demarée sur : http://localhost:'+staticport))
}
