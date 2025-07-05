const mysql = require("mysql2");
const { faker } = require("@faker-js/faker");

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// console.log(getRandomUser());

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Shipra@123", 
  database: "sans",
});
try{
  connection.query("SHOW TABLES", (err, result) => {
  if (err) throw err;
  console.log(result);
});


} catch(err){
  console.log(err)
}
connection.end()