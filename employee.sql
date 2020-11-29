DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;



CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,    
    PRIMARY KEY (id)
);


CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT(20),
    PRIMARY KEY (id)
);



CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT(20) NOT NULL,
    manager_id INT(20) NULL,
    PRIMARY KEY (id)
);





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




INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ben", "Robinson", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Julia", "Gulia", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Fatts", "Domino", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Turd", "Furgeson", 4, null);
