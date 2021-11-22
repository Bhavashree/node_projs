const Pool = require('pg').Pool
const pool = new Pool({
user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getByIdUSers = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM USERS WHERE id = $1',[id], (error, results)=> {
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { name, email } = request.body
  
    pool.query('INSERT INTO users (username, email) VALUES ($1, $2)', [name, email], (error, result) => {
      if (error) {
        throw error
      }
      console.log(result)
      response.status(201).send(`User added with ID: ${result}`)
    })
  }

  const updateUser = (request,response)=> {
      const id = parseInt(request.params.id);
    const {username} = request.body;
      pool.query('update users set username = $1 where id=$2', [username, id], (error, result) => {
          if(error){
              throw error
          }
          response.status(201).send(`user updated: ${result}`)
      })
  }

  const deleteUser = (request, response) => {
      const id=request.params.id;
      pool.query('Delete from users where id=$1', [id], (error, result)=> {
          if(error){
              throw error;
          }
          response.status(201).send(`user deleted ${result.oi}`);
      })
  }

  module.exports = {
    getUsers,
    getByIdUSers,
    createUser,
    updateUser,
    deleteUser
  }