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
  });
}
function getAllRoles() {
  connect.query("select * from role", function (err, res) {
    if (err) throw err;
     console.table(res);
  });
}
function getAllEmployee() {
  connect.query("select * from employee", function (err, res) {
    if (err) throw err;
     console.table(res);
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
    choices:["Add", "View", "Edit Employee","Delete"]
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


    }
   })
  }   
  
 const Addstuff = () => {
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
      choices: ["HR","Sales","IT"]
      
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
      choices:["Department", "Role", "Employee","Nothing" ]
     },
  ]).then ((response)=>{

    switch (response.viewthings) {

      case "Department":
        return getAllDepartments()

        case "Role" :
        return getAllRoles ()

        case "Employee" :
          return getAllEmployee ()

        case "Nothing" :
        return Exit ()
    }
  })
 }

// const Employeestuff = () => {
//   connect.query("SELECT *FROM employee", function (err, res){
//     if (err) throw err
//     return res
    
//   })

//     inquirer.prompt([
//       { 
//         type: "list",
//         name: "viewthings",
//         message: "Who would you like to edit?",
//         choices: res
//       },
//     ])
//     .then ((response)=>({
      
//       inquirer.prompt([
//         { 
//           type: "list",
//           name: "viewthings",
//           message: "Which do you want edit?",
//           choices:["Department","Roles"]
//          },
//       ])


//     })
    
//    }
  




// //  const Deletestuff = () => {

// //   inquirer.prompt([

// //     { 
// //       type: "input",
// //       name: "deletethings",
// //       message: "What would you like to delete?",
// //       choices:["Department", "Role", "Employee","Nothing" ]
// //      },
// //   ])
// //  }

//    getAllEmployee


//   // const exit =() => {return questions}
questions()


