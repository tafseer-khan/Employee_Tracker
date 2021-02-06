-- CREATING OUR DATABASE --
DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

-- DEPARTMENT TABLE ----
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
 
);
-- DEPARTMENT TABLE ----
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);
-- EMPLOYEE ROLE TABLE ----
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INT,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)

);

-- DEPARTMENT SEEDS -----
INSERT INTO department (name)
VALUE ("Reception");
INSERT INTO department (name)
VALUE ("Warehouse");
INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Accounting");
INSERT INTO department (name)
VALUE ("Management");


-- EMPLOYEE ROLE SEEDS -------
INSERT INTO role (title, salary, department_id)
VALUE ("Regional Manager", 75000, 5);
INSERT INTO role (title, salary, department_id)
VALUE ("Assistant to the Manager", 60000, 5);
INSERT INTO role (title, salary, department_id)
VALUE ("Senior Accountant", 65000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Head of Accounting", 70000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 55000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Representative ", 60000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Warehouse Foreman", 45000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Warehosue Staff", 35000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Receptionist", 30000, 1);


-- EMPLOYEE SEEDS -------
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Michael", "Scott", 1, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Dwight", "Schrute", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Oscar","Martinez",null,3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Angela", "Martin",null, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Kevin", "Malone",null, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jim", "Halpert",null, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Stanley", "Hudson",null, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Phyllis", "Vance",null, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Darryl", "Philbin",null, 7);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Hide", "Hasagawa",null, 8);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Pam", "Halpert",null, 9);


