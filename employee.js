const connect = require('./connectmysql');
const inquirer = require('inquirer')
const cTable = require('console.table');
const figlet = require("figlet")

// connect to my sql
connect.connect((error)=>{
  if (error) throw error;
  // console.log ("yay it work"+ connect.threadId)
  // connect.end();
})

// figlet('Employee Management', function(err, data) {
//   if (errot) {
//       console.log('Something went wrong...');
//       console.dir(error);
//       return;
//   }
//   console.log(data)
// });

// connection to the table
function getAllDepartments() {
  connect.query("select * from department", function (err, res) {
    if (err) throw err;
    console.table(res);
    MainMenu ()
  });
}
function getAllRoles() {
  connect.query("select * from role", function (err, res) {
    if (err) throw err;
     console.table(res);
  });
  MainMenu ()
}
function getAllEmployee() {
  connect.query("select * from employee", function (err, res) {
    if (err) throw err;
     console.table(res);
     MainMenu ()
  });
}

// getAllRoles();
// getAllEmployee();
// getAllDepartments();

 const questions = function (){
   inquirer
   .prompt([

    { 
    type: "list",
    name: "yourchoice",
    message: "What would you like to do?",
    choices:["Add", "View", "Edit Employee","Add Department","Delete"]
    },
   ])

   .then((response)=>{

    switch  (response.yourchoice){
      case "Add":
        return Addstuff()

        case "View" :
          
        return Viewstuff()
         
        case "Delete" :

        return Deletestuff()

        case "Edit Employee" :

        return Employeestuff()

        case "Add Department" :

        return DepartmentStuff ()



    }
   })
  }   
  
 const Addstuff = () => {
  connect.query("SELECT *FROM department", function (err, res){
    if (err) throw err
    var deResult = res
     var deChoice = deResult.map((seeDEP)=>{
      return seeDEP.
     
    })  
  })
 
    
  inquirer
  .prompt([

      { 
      type: "input",
      name: "addname",
      message: "Who are you adding?",
      
     },
     { 
      type: "list",
      name: "adddepartment",
      message: "What department are they in?",
      choices: seeDEP
    },
     { 
      type: "input",
      name: "addrole",
      message: "What is their Role?",
      choices: ["Customer Service","Computer Tech"]
      },
    


  ]).then ((response)=>{
    const employee= new employee(
      response.addname,
      response.adddepartment,
      response.addrole
    ) 
    employee.push(employee)

 })
 }

 const Viewstuff = () => {

  inquirer.prompt([
    { 
      type: "list",
      name: "viewthings",
      message: "What would you like to View?",
      choices:["Department", "Role", "Employee","Main Menu" ]
     },
  ]).then ((response)=>{

    switch (response.viewthings) {

      case "Department":
        return getAllDepartments()

        case "Role" :
        return getAllRoles ()

        case "Employee" :
          return getAllEmployee ()
          

        default:
        return MainMenu ()
    }
  })
 }

 
const Employeestuff = () => {
  connect.query("SELECT *FROM employee", function (err, res){
    if (err) throw err
    var employResult = res
     var employChoice = employResult.map((seeEmploy)=>{
      return seeEmploy.first_name 
      
     }) 
  
    inquirer.prompt([
      { 
        type: "list",
        name: "employeethings",
        message: "Who would you like to edit?",
        choices: employChoice
      },
    ])
    .then ((response)=>{

      
    
      
      // inquirer.prompt([
      //   { 
      //     type: "list",
      //     name: "viewthings",
      //     message: "Which do you want edit?",
      //     choices:["Department","Roles"]
      //    },
      // ])
      
    })

    })
  } 

  // function confirmString(input) {
  //   if ((input.trim() != "") && (input.trim().length <= 30)) {
  //       return true;
  //   }
  //   return "Invalid input. Please limit your input to 30 characters or less."
  // };
   const DepartmentStuff = () => {

    inquirer.prompt([
      {
        type: "input",
          name: "departName",
          message: "Enter new department:",
        // validate: confirmString
      }
  ]).then(response => {
      connect.query("INSERT INTO department (name) VALUES (?)", [response.departName]);
      console.log(`${response.departName} was added to departments.`);
      // MainMenu(); // this is back to the main menu
  })
  };
      
     

//  const Deletestuff = () => {

//   inquirer.prompt([

//     { 
//       type: "input",
//       name: "deletethings",
//       message: "What would you like to delete?",
//       choices:["Department", "Role", "Employee","Nothing" ]
//      },
//   ])
//  }

//    getAllEmployee


MainMenu = () => {return questions()};
questions()


