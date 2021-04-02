require('dotenv').config()

const { Pool } = require('pg')
const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: {
        rejectUnauthorized: false
    }
})

function getUsers() {
    pool.query("SELECT * FROM account", (error, results) => {
        if (error) {
            throw error;
        }
    });
}


module.exports = { getUsers }