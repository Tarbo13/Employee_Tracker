
# Employee Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
    
## Description
This project incorporates the use of a database to store and retrieve data assigned to individual employees.  Using mysql I created three tables to store the employee information:  “department,” “role,” and “employee.”  Unique rows and columns that are specific to each table are used to organize each employee by name, title, salary, and individual id’s.  Once the sql database was set up I created a connection to the database in a index.js file.  This allows the app to connect to my sql database on my local server at port 3306.  Once the app is connected to the database I installed and required the following npm packages into my index.js file to create a UI in the CLI: `mysql`, `inquirer`, `console.table`, and `figlet`.  This app runs in node and uses the inquire npm package to ask the user questions about how they would like to view or manipulate the employee data.  By using the mysql connection in my app I am able to send sql code to my database based on how the user responds to the questions displayed in the CLI, and manipulate the data. Departments can be added as well as roles and employees.  The user also may view all of the employees at the company or update their roles.  `Figlet` npm package is used to create the CLI graphics making the UI pop a little.  

## Installation
This application requires the following to be installed:  a `package.json` file, `mysql` npm package, `inquirer` npm package, `console.table`, and the `figlet` npm package.  It is also required that a connection is created to a mysql database.  

## Usage
Below is a short GIF demonstrating how this application works.  I've also included a link the the deployed web page below.

<img src = "README Generator GIF.gif" />

<br>

[Link to Video](https://drive.google.com/file/d/1YSvj5Nbm9iNqXlTfIEqUvyxDtzyH3yhD/view)

## Contributors
Ben Robinson

## Testing
Testing for this app was done by running the app in node on the CLI.

## License: 

For more information about the license click on the link below. 


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
    
### Questions: 

![GitHub Logo](GitHub-Mark-32px.png)
[GitHub Profile](https://github.com/Tarbo13)

If you have additional questions please email me **mailto:**<robinson.dri@gmail.com>

### Table of Contents:
- [Description](#Description)
- [Installation](#Installation) 
- [Usage](#Usage)
- [Contributors](#Contributors)
- [Testing](#Testing)
- [License](#License)
- [Questions](#Questions)