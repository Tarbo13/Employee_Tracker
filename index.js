let mysql = require("mysql");
let inquirer = require("inquirer");
let table = require("easy-table");
require("console.table")

let connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "bearsky01",
  database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start(){
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "Add a department.",
            "Add a role.",
            "Add an employee",
            "View all employees",
            "View a department",
            "View a role",
            "View an employee",
            "Update employee roles",
            "Exit"
        ]
    }).then(function(answer){
        switch (answer.action) {
            case "Add a department.":
                departmentAdd();
                break;

            case "Add a role.":
                roleAdd();
                break;

            case "Add an employee":
                employeeAdd();
                break;
            
            case "View all employees":
                viewEmployees();
                break;

            case "View a department":
                departmentView();
                break;

            case "update employee roles":
                employeeUpdate();
                break;
            
            case "Exit":
                connection.end();
                break;
        }
    });
}

function departmentAdd() {
    inquirer
    .prompt({
        name: "department",
        type: "list",
        message: "Department to add?",
        choices: [
            "Warehouseing",
            "Domestic Trans",
            "International Trans",
            "Sales"
        ]

    }).then(function(answer){
        
        
        let query = "INSERT INTO department SET ?";
        

        connection.query(query, {name: answer.department}, function (err, res) {
            if (err) throw err;
        });
            console.table(answer);
            console.log("role inserted");

        start();
    });
}

function roleAdd() {
    inquirer
    .prompt([
        {
        name: "role",
        type: "list",
        message: "Which role would you like to add?",
        choices: [
            "Manager",
            "Temp",
            "Dispatcher",
            "Shipper"
        ]
    },
        {
         name: "salary",
         type: "input",
         message: "What is their salary?"   
        }   
        
    ]).then(function(answer){

        let query = "INSERT INTO role SET ?";

        connection.query(query,{
            title: answer.role,
            salary: answer.salary,
        }, function(err) {
            if (err) throw err;
        
       
            console.table(answer);
            console.log(answer.role, answer.salary)

            start();
        });
    });
};

function employeeAdd() {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the employee's first name"
            },
            {
                name: "lastName",
                type: "input",
                message: "what is the employee's last name"
            },
                       
        ]).then(function(answer){

            let query = "INSERT INTO employee SET ?";

            connection.query(query,{
                first_name: answer.firstName,
                last_name: answer.lastName,
                
            }, function(err){
                if (err) throw err;
                
                console.table(answer);
                start();

            })        
           })
        }

function departmentView() {    

    connection.query("SELECT * FROM department", function(err, res, fields) {
        if (err) throw err;

        console.table(res);
    });

    // inquirer
    //     .prompt([
    //         {
    //             name: "department",
    //             type: "list",
    //             message: "which department would you like to view?",
    //             choices: [
    //                 "Warehouseing",
    //                 "Domestic Trans",
    //                 "International Trans",
    //                 "Sales"
    //             ]
    //         }
    //     ]).then(function(answer){

    //         if (err) throw err;
    //         connection.query("")
    //     })

    start();
}

function viewEmployees() {
    
    let query = "SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.role_id LEFT JOIN department on role.department_id = department.department_id LEFT JOIN employee manager on manager.manager_id = employee.manager_id;";

    connection.query(query, function(err, res) {
        if (err) throw err;

        console.table(res);

        start();
    })
}



