USE employee_db;

INSERT INTO department(name)
VALUE ("Sales"),("IT"),("Customer Service");

INSERT INTO role (title, salary, department_id)
VALUES ("HR", 20000, 1), ("teacher", 20000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Bill", "Snow", 1, 1 ), ("Steve", "Snow", 2, null);


