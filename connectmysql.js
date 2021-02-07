const mysql = require('mysql');
require("dotenv").config()
// console.log = process.env.SECPASSWORD

const connect = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.SECPASSWORD,
  database: 'employee_db',
})

module.exports = connect