DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;


-- CREATE TABLE department( 
-- department_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
-- name VARCHAR (30) NOT NULL
-- );
CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,    
    PRIMARY KEY (id)
);

-- CREATE TABLE role (
-- role_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
-- title VARCHAR (30) NOT NULL,
-- salary DECIMAL(10, 2) NOT NULL,
-- department_id INT,
-- CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE CASCADE
-- );
CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT(20),
    PRIMARY KEY (id)
);

-- CREATE TABLE employee(
-- employee_id INT AUTO_INCREMENT PRIMARY KEY,
-- first_name VARCHAR (30) NOT NULL,
-- last_name VARCHAR (30) NOT NULL,
-- role_id INT,
-- manager_id INT NULL,
-- CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(role_id) ON DELETE SET NULL,
-- CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(employee_id) ON DELETE CASCADE
-- );

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT(20) NOT NULL,
    manager_id INT(20) NULL,
    PRIMARY KEY (id)
);

-- INSERT INTO department (name)
-- VALUES ("Warehouseing");

-- INSERT INTO role (title, salary, department_id)
-- VALUES ("Manager", 68000.00, 4);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ("Ben", "Robinson", 5, 4);

-- DROP DATABASE IF EXISTS employees;
-- CREATE DATABASE employees;
-- USE employees;



INSERT INTO department (name)
VALUES ("Warehouseing"), ("Domestic Trans"), ("International Trans"), ("Sales");


INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 68000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Temp", 25000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Dispatcher", 45000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Shipper", 50000, 2);
-- INSERT INTO role (title, salary, department_id)
-- VALUES ("Account Manager", 160000,3);
-- INSERT INTO role (title, salary, department_id)
-- VALUES ("Accountant", 120000, 3);
-- INSERT INTO role (title, salary, department_id)
-- VALUES ("Legal Team Lead", 250000, 4);
-- INSERT INTO role (title, salary, department_id)
-- VALUES ("Lawyer", 190000, 4);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ben", "Robinson", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Julia", "Gulia", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Fatts", "Domino", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Turd", "Furgeson", 4, null);
-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ("Ashley", "Everett", 5, null);
-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ("Jan", "Finn", 6, null);
-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES  ("Austin", "Bickford", 7, null);
-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES  ("Ian", "Rubin", 8, null);
-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ("Jane", "Rubin", 5, null);
-- INSERT INTO employee  (first_name, last_name, role_id, manager_id)
-- VALUES ("Amanda", "Hugankiss", 6, null);