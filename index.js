let mysql = require("mysql");
let inquirer = require("inquirer");
let table = require("easy-table");
require("console.table");
let { printTable } = require("console-table-printer");
let figlet = require("figlet");
let employees;
let roles;

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
  getEmployees();
  getRoles();
  heading();

});

function heading() {
    figlet("Employee Tracker", function(err,data) {
        if (err) {
            console.log("something went wrong");
            console.dir(err);
            return;
        }
        console.log(data);
    })
}

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

            case "View a role":
                viewRoles();
                break;

            case "Update employee roles":
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
            console.log("role inserted");
            console.table(answer);           

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
        
            console.log("Role added")
            console.table(answer);
            

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
            {
                name: "roleId",
                type: "input",
                message: "what is the employee's role id#?"
            }
                       
        ]).then(function(answer){

            let query = "INSERT INTO employee SET ?";

            connection.query(query,{
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.roleId,

            }, function(err){
                if (err) throw err;
                
                console.log("Employee added")
                console.table(answer);
                start();

            })        
           })
        }

function departmentView() {    

    connection.query("SELECT * FROM department", function(err, res, fields) {
        if (err) throw err;

        figlet("Departments", function(err, result) {
            if (err) throw err;
            console.log(err || result)
        })
        printTable(res);
        start();
    });

    
}

function viewEmployees () {
    connection.query('SELECT e.id, e.first_name, e.last_name, d.name AS department, r.title, r.salary, CONCAT_WS(" ", m.first_name, m.last_name) AS manager FROM employee e LEFT JOIN employee m ON m.id = e.manager_id INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id ORDER BY e.id ASC', function (err, res) {
        if (err) throw err;
        figlet("All Employees", function(err,result) {
            console.log(err, result);
        });

        printTable(res);

        start();

    });
}

function getRoles() {
    connection.query("SELECT id, title FROM role", function(err,res) {
        if (err) throw err;
        roles = res;
    })
}

function getEmployees() {
    connection.query("SELECT id, CONCAT_WS(' ', first_name, last_name) AS Employee_Name FROM employee", function(err, res) {
        if (err) throw err;
        employees = res;
    });
}

employeeUpdate = () => {
    let employeeOptions = [];
  
    for (var i = 0; i < employees.length; i++) {
      employeeOptions.push(Object(employees[i]));
    }
    inquirer.prompt([
      {
        name: "updateRole",
        type: "list",
        message: "Which employee's role do you want to update?",
        choices: function () {
          var choiceArray = [];
          for (var i = 0; i < employeeOptions.length; i++) {
            choiceArray.push(employeeOptions[i].Employee_Name);
          }
          return choiceArray;
        }
      }
    ]).then(answer => {
      let roleOptions = [];
      for (i = 0; i < roles.length; i++) {
        roleOptions.push(Object(roles[i]));
      };
      for (i = 0; i < employeeOptions.length; i++) {
        if (employeeOptions[i].Employee_Name === answer.updateRole) {
          employeeSelected = employeeOptions[i].id
        }
      }
      inquirer.prompt([
        {
          name: "newRole",
          type: "list",
          message: "Select a new role:",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < roleOptions.length; i++) {
              choiceArray.push(roleOptions[i].title)
            }
            return choiceArray;
          }
        }
      ]).then(answer => {
  for (i = 0; i < roleOptions.length; i++) {
    if (answer.newRole === roleOptions[i].title) {
      newChoice = roleOptions[i].id
      connection.query(`UPDATE employee SET role_id = ${newChoice} WHERE id = ${employeeSelected}`), (err, res) => {
        if (err) throw err;
      };
    }
  }
  console.log("Role updated succesfully");
  getEmployees();
  getRoles();
  start();
      })
    })
  };

  function viewRoles() {
      connection.query("SELECT r.id, r.title, r.salary, d.name AS Department_Name FROM role AS r INNER JOIN department AS d ON r.department_id = d.id", function(err, res) {
          if (err) throw err;
          figlet("Roles", function(err,result) {
              console.log(err || result);
          });

          printTable(res);
          start();
      })
  }




