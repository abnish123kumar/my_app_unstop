const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
const mysql = require('mysql');

const db = mysql.createConnection({
    host :"localhost",
    user : 'root',
    password : '',
    database : "abnish_db"
});
db.connect((err)=>{
    if(err) throw err;
    console.log("connected");
})

app.get('/data',(req,res)=>{
    db.query("Select * from train",(err,result)=>{
        if(err){
            throw err;
        }else{
            res.send(result);
        }
    })
});
app.put('/data',(req,res)=>{
    let obj = req.body;
    console.log(obj)
    db.query("UPDATE train SET ? WHERE seat="+obj.seat,[obj],(err,result)=>{
        if(err){

        }else{
            res.send(result);
        }
    })
})


const Port = process.env.PORT || 4500;
app.listen(Port,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("server is running");
    }
})