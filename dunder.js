
// Dependencies
const inquirer = require("inquirer")
const mysql = require("mysql")
const cTable = require('console.table');

// My Database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "AzAq69SxSw",
    database: "employee_trackerDB"
});


// Connection
connection.connect((err) => {
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
    start();
});
// Starting Prompt
const start = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "View All Employees?",
                "View All Employee's By Roles?",
                "View all Emplyees By Deparments",
                "Update Employee",
                "Add Employee?",
                "Add Role?",
                "Add Department?",
                "Exit"
            ]
        }
    ]).then((val) => {
        switch (val.choice) {
            case "View All Employees?":
                viewAll();
                break;

            case "View All Employee's By Roles?":
                vBR();
                break;
            case "View all Emplyees By Deparments":
                vBD();
                break;


            case "Update Employee":
                update();
                break;

            case "Add Employee?":
                addE();
                break;

            case "Add Role?":
                addR();
                break;

            case "Add Department?":
                addD();
                break;
            case "Exit":
                connection.end();
                break;

        }
    })
}
//View All Employees
const viewAll = () => {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
        (err, res) => {
            if (err) throw err
            console.table(res)
            start()
        })
}
// View Employees by role
const vBR = () => {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
        (err, res) => {
            if (err) throw err
            console.table(res)
            start()
        })
}
// View Employees by department
const vBD = () => {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
        (err, res) => {
            if (err) throw err
            console.table(res)
            start()
        })
}

// Select Role
let roles = [];
const selectRole = () => {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roles.push(res[i].title);
        }

    })
    return roles;
}
// Selecting Manager 
let managers = [];
const selectManager = () => {
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", (err, res) => {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            managers.push(res[i].first_name);
        }

    })
    return managers;
}
let departments = [];
const selectDepartment = () => {
    connection.query("SELECT name, id FROM department", (err, res) => {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            departments.push(res[i].name)
        }

    })
    return departments;
}
// Add Employees
const addE = () => {
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "Enter their first name "
        },
        {
            name: "lastname",
            type: "input",
            message: "Enter their last name "
        },
        {
            name: "role",
            type: "list",
            message: "What is their role? ",
            choices: selectRole()
        },
        {
            name: "choice",
            type: "list",
            message: "Whats their managers name?",
            choices: selectManager()
        }
    ]).then((input) => {
        let roleId = selectRole().indexOf(input.role) + 1
        let managerId = selectManager().indexOf(input.choice) + 1
        connection.query("INSERT INTO employee SET ?",
            {
                first_name: input.firstname,
                last_name: input.lastname,
                manager_id: managerId,
                role_id: roleId

            }, (err) => {
                if (err) throw err
                console.table(input)
                start()
            })

    })
}
// Update Employees on Database
update = () => {
    connection.query("SELECT employee.last_name, employee.role_id, role.title FROM employee JOIN role ON employee.role_id = role.id;", (err, res) => {
        if (err) throw err
        console.table(res)
        inquirer.prompt([
            {
                name: "lastName",
                type: "list",
                choices: () => {
                    var lastName = [];
                    for (var i = 0; i < res.length; i++) {
                        lastName.push(res[i].last_name);
                    }
                    return lastName;
                },
                message: "What is the Employee's last name? ",
            },
            {
                name: "role",
                type: "list",
                message: "What is the Employees new title? ",
                choices: selectRole()
            },
        ]).then((val) => {
            console.log(val)
            let roleId = selectRole().indexOf(val.role) + 1
            console.log(roleId)
            connection.query("UPDATE employee SET ? WHERE ?",
                [

                    {
                        role_id: roleId
                    },
                    {
                        last_name: val.lastName,
                    }
                ],
                (err) => {
                    if (err) throw err
                    console.table(val)
                    start()
                })

        });
    });

}
// Add new role
const addR = () => {
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role", (err, res) => {
        inquirer.prompt([
            {
                name: "Title",
                type: "input",
                message: "What is the roles Title?"
            },
            {
                name: "Salary",
                type: "input",
                message: "What is the Salary?"

            },
            {
                name: "Department",
                type: "list",
                message: "Which Department?",
                choices: selectDepartment()
            }
        ]).then((res) => {
            console.log(res)
            let depId = selectDepartment().indexOf(res.Department) + 1;
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: res.Title,
                    salary: res.Salary,
                    department_id: depId
                },
                (err) => {
                    if (err) throw err
                    console.table(res);
                    start();
                }
            )

        });
    });
}
// Add new department
const addD = () => {

    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What Department would you like to add?"
        }
    ]).then((res) => {
        connection.query(
            "INSERT INTO department SET ? ",
            {
                name: res.name

            },
            (err) => {
                if (err) throw err
                console.table(res);
                start();
            }
        )
    })
}