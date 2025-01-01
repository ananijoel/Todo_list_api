const {Sequelize,DataTypes} = require('sequelize')
let sequelize = null
let demo = false
todo_model = require('../models/todo')

if(process.env.NODE_ENV === 'production'){
    sequelize = new Sequelize('ulrihrpy_anatide', 'ulrihrpy_anatide', '775SGnvmdesEKk9RAKN9mk3Y', {
       host: 'localhost',
       port: 3306,
       dialect: 'mariadb',
       dialectOptions: {
         timezone: 'Etc/GMT',
       },
       logging: false
     })
} else {
    sequelize = new Sequelize('todolist', 'root', '', {
       host: 'localhost',
       dialect: 'mariadb',
       dialectOptions: {
         timezone: 'Etc/GMT',
       },
       logging: false
     })
}

const Todo = todo_model(sequelize,DataTypes)
let init_dataBase
if(demo){
    init_dataBase = async () => {
        await sequelize.sync({force:true})
        await Todo.bulkCreate([
            {
                userId:1,
                title:'faire les courses',
                completed:'active'
            },
            {
                userId:1,}
        ])
    }
} else {
    init_dataBase = () => {
        return sequelize.sync(
         {force:false}
        ).then(() => {
          console.log('La base de données a bien été initialisée !');
        });
      }
}

module.exports = { init_dataBase, Todo }