import sql from "mssql"
// const sql = require('mssql')

import dotenv from 'dotenv'

import path from 'path'

dotenv.config({path:path.resolve(__dirname, '../../.env')})

export const sqlConfig = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  server: process.env.DB_SERVER as string,

  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

sql.connect(sqlConfig).then(pool=>{
  if(pool.connected){
    console.log("I am connected to the database")
  }
})

console.log(process.env.DB_USER)