const mysql = require("mysql");
const express = require("express");
var app = express();
const body_parser = require("body-parser");

app.use(body_parser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodedemo'
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log("DB Connected!");
    else
        console.log("BD connection Failed! \n Error :" + JSON.stringify(err, undefined, 2));
})

app.listen(3000, () => console.log("Node Server Port : 3000"));

//Get All User 
app.get('/user', (req, res) => {
    mysqlConnection.query("select * from tbl_user", (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
})

//Get An User 
app.get('/user/:id', (req, res) => {
    mysqlConnection.query("select * from tbl_user where user_id = ?", [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
})

//Delete An User 
app.delete('/user/:id', (req, res) => {
    mysqlConnection.query("DELETE from tbl_user where user_id = ?", [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send("Record Successfully Deleted in Database");
        else
            console.log(err);
    });
})

//Insert User 
app.post('/user', (req, res) => {
    let user_data = req.body;
    var sql = "insert into tbl_user (user_name , user_email , user_password) value('" + user_data.name + "','" + user_data.email + "','" + user_data.password + "')";
    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err)
            res.send("Recode Successfully Inserted");
        else
            console.log(err);
    });
})


//Update User 
app.put('/user', (req, res) => {
    let user_data = req.body;
    var sql = "update tbl_user set user_name = '" + user_data.name + "' , user_email='" + user_data.email + "' , user_password='" + user_data.password + "' where user_id = '" + user_data.id + "'";
    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err)
            res.send("Recode Successfully Updated");
        else
            console.log(err);
    });
})