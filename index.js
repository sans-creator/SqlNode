const mysql = require("mysql2");
const { faker } = require("@faker-js/faker");



let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Shipra@123", 
  database: "sans",
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

let q = "INSERT INTO user(id, username, email, password) VALUES ?";

let data=[];
for(let i=1;i<=100;i++){
  data.push(getRandomUser()) //100 fake users using faker
}

connection.query(q, [data], (err, result) => {
  if (err) {
    console.error("Error inserting data:", err);
  } else {
    console.log("Insert successful:", result);
  }
  connection.end(); // Ensure connection closes after query
});


