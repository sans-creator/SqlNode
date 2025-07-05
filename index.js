const mysql = require("mysql2");
const { faker } = require("@faker-js/faker");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
// const { v4: uuidv4 } = require("uuid");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

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

// let q = "INSERT INTO user(id, username, email, password) VALUES ?";

// let data=[];
// for(let i=1;i<=100;i++){
//   data.push(getRandomUser()) //100 fake users using faker
// }

//to get total  number of users
app.get("/",(req,res)=>{

  //jab / par get request aaye tabhi hme number of user dikhe. isiliye / k andar query run karneg
  let q= `SELECT count(*) FROM user`;
  try{
    connection.query(q,(err,result)=>{
      if (err) throw err;
      let userCount=result[0]["count(*)"]
      res.render("home",{userCount})


    })

  } catch(err){
    console.log(err)
    res.send("some error in database")
  }

});

// /user-->get request
//showing the users
app.get("/user", (req, res) => {
  let q = `SELECT * FROM user`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let data = result;
      res.render("users.ejs", { data });
    });
  } catch (err) {
    res.send("some error occurred");
  }
});

//Edit Route

app.get("/user/:id/edit",(req,res)=>{
  let {id}=req.params
  let q=`SELECT * FROM user WHERE id= '${id}'`
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    res.send("some error occurred");
  }
  




})

//update route
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { username, password } = req.body; //yeh sab form se arha hai. isliye req.body
  console.log(username);
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];

      if (user.password != password) {
        res.send("WRONG Password entered!");
      } else {
        let q2 = `UPDATE user SET username='${username}' WHERE id='${id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          else {
            console.log(result);
            console.log("updated!");
            res.redirect("/user");
          }
        });
      }
    });
  } catch (err) {
    res.send("some error with DB");
  }
});




app.listen("8080", () => {
  console.log("server running on port 8080");
});


// connection.query(q, [data], (err, result) => {
//   if (err) {
//     console.error("Error inserting data:", err);
//   } else {
//     console.log("Insert successful:", result);
//   }
//   connection.end(); // Ensure connection closes after query
// });

