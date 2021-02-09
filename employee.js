const connect = require("./connectmysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const figlet = require("figlet");

// connect to my sql
connect.connect((error) => {
  if (error) throw error;
  // console.log ("yay it work"+ connect.threadId)
  // connect.end();
});

// figlet('Welcome Employee', function(err, data) {
//   if (error) {
//       console.log('Something went wrong...');
//       console.dir(error);
//       return;
//   }
//   console.log(data)
// });
//add function for global connect

//start npm with table

// connection to the table

//init function

const questions = function () {
  inquirer
    .prompt([
      {
        type: "list",
        name: "yourchoice",
        message: "What would you like to do?",
        choices: [
          "Add",
          "View",
          "Edit Employee department",
          "Edit Employee role",
          "Delete",
          "Exit",
        ],
      },
    ])

    .then((response) => {
      switch (response.yourchoice) {
        case "Add":
          return Addstuff();

        case "View":
          return Viewstuff();

        case "Delete":
          return Deletestuff();

        case "Edit Employee department":
          return editDepartment();

        case "Edit Employee role":
          return editRole();

        default:
          return exit();
      }
    });
};

const Addstuff = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "addstuff",
        message: "What do you like to add?",
        choices: [
          "Add a employee",
          "Add a department",
          "Add a role",
          "Main Menu",
        ],
      },
    ])
    .then((response) => {
      switch (response.addstuff) {
        case "Add a employee":
          return addEmployee();

        case "Add a department":
          return departmentStuff();

        case "Add a role":
          return roleStuff();

        default:
          MainMenu();
      }
    });
};

const Viewstuff = () => {
  inquirer
    .prompt([
      //add salary and manager id
      {
        type: "list",
        name: "viewthings",
        message: "What would you like to View?",
        choices: ["Department", "Role", "Employee", "Main Menu"],
      },
    ])
    .then((response) => {
      switch (response.viewthings) {
        case "Department":
          return getAllDepartments();

        case "Role":
          return getAllRoles();

        case "Employee":
          return getAllEmployee();

        default:
          return MainMenu();
      }
    });
};

const editDepartment = () => {
  connect.query("SELECT *FROM employee", function (err, res) {
    if (err) throw err;
    var employroResult = res;
    var employChoice = employroResult.map((seeEmploy) => {
      return seeEmploy.first_name + " " + seeEmploy.last_name;
    });

    connect.query("SELECT * FROM department", function (err, res) {
      if (err) throw err;
      var departResult = res;

      departments = departResult.map((seeDEP) => {
        return seeDEP.title;
      });
    });
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeethings",
          message: "Who would you like to edit?",
          choices: employChoice,
        },
      ])

      .then((response) => {
        switch (response.employeethings) {
          case seeDEP.title:
            inquirer.prompt([
              {
                type: "list",
                name: "employeethings",
                message:
                  "Which department you want to assign to this employee?",
                choices: departments,
              },
            ]);

          default:
            break;
        }
      });
  });
};

const editRole = () => {
  connect.query("SELECT *FROM employee", function (err, res) {
    if (err) throw err;
    var employroResult = res;
    var employChoice = employroResult.map((seeEmploy) => {
      return seeEmploy.first_name + " " + seeEmploy.last_name;
    });

    connect.query("SELECT * FROM role", function (err, res) {
      if (err) throw err;
      var roleResult = res;

      var roleChoice = roleResult.map((seeDEP) => {
        return seeDEP.title;
      });

      inquirer
        .prompt([
          {
            type: "list",
            name: "employeethings",
            message: "Who would you like to edit?",
            choices: employChoice,
          },
          {
            type: "list",
            name: "employeethings",
            message: "What role you want to change?",
            choices: roleChoice,
          },
        ])
        .then((response) => {});
    });
  });
};

const departmentStuff = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departName",
        message: "Enter new department:",
        validate: confirmString,
      },
    ])
    .then((response) => {
      connect.query("INSERT INTO department (name) VALUES (?)", [
        response.departName,
      ]);
      console.log(`${response.departName} was added to departments.`);
      MainMenu();
    });
};

const roleStuff = () => {
  connect.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.log(" ");
    console.table("List of departments", res);
    const departmentResults = res;
    const departmentChoices = departmentResults.map((departmentResult) => {
      return departmentResult.name;
    });

    inquirer
      .prompt([
        {
          type: "input",
          name: "roleName",
          message: "Enter new role:",
        },
        {
          type: "input",
          name: "salary",
          message: "Enter the salary:",
        },
        {
          type: "list",
          name: "departName",
          message: "What department is this role in?",
          choices: departmentChoices,
        },
      ])
      .then((response) => {
        connect.query(
          `INSERT INTO role(title, salary, department_id) VALUES ("${response.roleName}", "${response.salary}", (SELECT id FROM department WHERE name = "${response.departName}"))`
        );
        console.log(`${response.roleName} was added to roles.`);
        MainMenu();
      });
  });
};

const Deletestuff = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "deletethings",
      message: "What would you like to delete?",
      choices: ["Department", "Role", "Employee", "Nothing"],
    },
  ]);
};

function getAllDepartments() {
  connect.query("select * from department", function (err, res) {
    if (err) throw err;
    console.table(res);
    // var deResult = res
    //  var departChoice = deResult.map((seeDEP)=>{
    //   return seeDEP.name
    //  })
    MainMenu();
  });
}

function getAllRoles() {
  connect.query(
    `SELECT role.id, title, salary, department.name AS department
    FROM role INNER JOIN department ON role.department_id = department.id;`,
    function (err, res) {
      if (err) throw err;
      console.table(res);
      MainMenu();
    }
  );
}
function getAllEmployee() {
  connect.query(
    `SELECT e.id, CONCAT(e.first_name, " ", e.last_name) AS employee, role.title, department.name AS department, salary, CONCAT(m.first_name, " ", m.last_name) AS manager
  FROM employee e INNER JOIN role ON e.role_id=role.id INNER JOIN department on role.department_id=department.id LEFT JOIN employee m ON m.id=e.manager_id`,
    function (err, res) {
      if (err) throw err;
      console.table(res);
      MainMenu();
    }
  );
}

// function confirmString(input) {
//   if (input.trim() != "" && input.trim().length <= 30) {
//     return true;
//   }
//   return "Invalid input. Please limit your input to 30 characters or less.";
// }

MainMenu = () => {
  return questions();
};

exit = () => {
  figlet("Goodbye", function (e, data) {
    if (e) {
      console.log("Something went wrong...");
      console.dir(error);
      return;
    }
    console.log(data);
  });
  connect.end();
};

// add function for global questions

// departmentlist = () => {departChoice()};

// })
questions();

const addEmployee = () => {
  var departChoice;
  var roleChoice;
  connect.query("SELECT *FROM department", function (err, res) {
    if (err) throw err;
    var deResult = res;
    departChoice = deResult.map((seeDEP) => {
      return seeDEP.name;
    });

    connect.query(
      `SELECT role.id, title, salary, department.name AS department
  FROM role INNER JOIN department ON role.department_id = department.id;`,
      function (err, res) {
        if (err) throw err;
        var roleResult = res;
        roleChoice = roleResult.map((seerol) => {
          return seerol.title;
        });

        inquirer
          .prompt([
            {
              type: "input",
              name: "addfirst",
              message: "What is their first name?",
            },
            {
              type: "input",
              name: "addlast",
              message: "What is their last name?",
            },
            {
              type: "list",
              name: "addepartment",
              message: "What department are they in?",
              choices: departChoice,
            },
            {
              type: "list",
              name: "addrole",
              message: "What is their Role?",
              choices: roleChoice,
            },
          ])
          .then((response)=>{

            
          }
      }
    );
  });
};
