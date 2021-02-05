const inquirer = require("inquirer")
const mysql = require("mysql")

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "AzAq69SxSw",
    database: "employee_trackerDB"
  });

  connection.connect(function(err) {
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
    start();
});

start = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What action would you like to run?",
            name: 'action',
            choices: [
            "View All Employees",
            "View Employees by Role",
            "View Employees by Department",
            "Add Employee",
            "Update Employee",
            "Add Role",
            "Add Department"
        ]
        }
    ])
}