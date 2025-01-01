const {Todo} = require('../dataBase/sequelize')

module.exports = (app) => {
    app.get('/get-todo', async (req, res) => {
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
}