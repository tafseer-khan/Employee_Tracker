const inquirer = require("inquirer")
const mysql = require("mysql")
const cTable = require('console.table')

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

const start = () => {
    inquirer.prompt(
        {
            type: "list",
            message: "What action would you like to run?",
            name: 'action',
            choices: [
            "View All Employees",
            "View Employees by Role",
            "View Employees by Department",
            "Update Employee",
            "Add Employee",
            "Add Role",
            "Add Department",
            "Exit"
        ]
        }
    ).then((data) => {
        switch (data.choice){
            case "View All Employees":
                viewAll();
            break;
            case "View Employees by Role":
                vBR();
            break;
            case "View Employees by Department":
                vBD();
            break;
            case "Update Employee":
                update();
            break;
            case "Add Employee":
                addE();
            break;
            case "Add Role":
                addR();
            break;
            case "Add Department":
                addD();
            break;
            case "Exit":
                connection.end();
            break;


        }
    })
}
const viewAll = () => {
    connection.query("SELECT * FROM employee",
    (err,res) => {
        if (err) throw err;
        console.log(res);
        start();
    }
    
    )}


const vBR = () => {
    
}

const vBD = () => {
    
}

const update = () => {
    
}

const addE = () => {
    
}

const addR = () => {
    
}

const addD = () => {
    
}