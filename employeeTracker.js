var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
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
        console.log(answer);
        let departmentVal = answer.department;
        var query = "INSERT INTO department (name) VALUES ?";
        
        connection.query(query, (departmentVal), function (err, res) {
            if (err) throw err;
            
            console.log(res.departmentVal);
        })
        
    });
}