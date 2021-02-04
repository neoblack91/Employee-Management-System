const connect = require('./connectmysql');
const inquirer = require('inquirer')
const cTable = require('console.table');
const figlet = require("figlet")

// connect to my sql
connect.connect((error)=>{
  if (error) throw error;
  // console.log ("yay it work"+ connect.threadId)
  connect.end();
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
    // console.table(res);
  });
}
function getAllRoles() {
  connect.query("select * from role", function (err, res) {
    if (err) throw err;
    // console.table(res);
  });
}
function getAllEmployee() {
  connect.query("select * from employee", function (err, res) {
    if (err) throw err;
    // console.table(res);
  });
}

getAllRoles();
getAllEmployee();
getAllDepartments();

 const questions = function (){
   inquirer
   .prompt([

    { 
    type: "list",
    name: "yourchoice",
    message: "What would you like to do?",
    choices:["Add", "View", "Update","Delete"]
    },
   ])

   .then((response)=>{

    switch  (response.yourchoice){
      case "Add":
        
        return Addstuff()

        case "View" :
          
        return Viewstuff()
          
        case "Update" :

          return Updatestuff()

        case "Delete" :

          return Deletestuff()
    }
   })
  }   
  
 const Addstuff = () => {
  inquirer
  .prompt([

    { 
      type: "list",
      name: "addthings",
      message: "What would you like to add?",
      choices:["Department", "Role", "Employee","Nothing" ]
     },
  ]).then ((response)=>{
    switch (response.yourchoice) {
      case Department:
        return
       
      case Role:
      return

      case Employee:
      return

    }
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

      case Department :
        return getAllDepartments

        case Role :
        return getAllRoles 

        case Employee :
          return getAllEmployee

        case Nothing :
        return Exit
    }
  })
 }

 const Updatestuff = () => {

  inquirer.prompt([
    { 
      type: "list",
      name: "updatethings",
      message: "What would you like to update?",
      choices:["Department", "Role", "Employee","Nothing" ]
     },
  ])
 }
 const Deletestuff = () => {

  inquirer.prompt([

    { 
      type: "input",
      name: "deletethings",
      message: "What would you like to delete?",
      choices:["Department", "Role", "Employee","Nothing" ]
     },
  ])
 }
  
questions()


