const express=require('express')
const Sequelize=require('sequelize')
const app=express()
const bodyparser=require('body-parser')
app.use(bodyparser.json())


const connection=new Sequelize('mydb1','root','',{
  host:'localhost',
  port:'3308',
  dialect: 'mysql'
})

const User = connection.define('User', {
  firstName: Sequelize.STRING,
  lastName:Sequelize.STRING
});

//insert data into table
connection
.sync({
  force:false
})
.then(()=>{
  User.create({
    firstName:"arun",
    lastName:"mishra"
  })
})

// Delete data
User.destroy({
  where: {
    firstName: "akash"
  }
}).then(() => {
  console.log("Done");
});

// update data
User.update({ lastName: "kumar" }, {
  where: {
    lastName: 'mishra'
  }
}).then(() => {
  console.log("Done");
});

//get api
app.get('/book',function(req,res){
  User.findAll().then(users => {
    console.log("All users:", JSON.stringify(users, null, 4));
    res.send(JSON.stringify(users, null, 4))
  });
});


//creating server
app.listen(3000,function(){
  console.log('server is started  port 4545')
})
