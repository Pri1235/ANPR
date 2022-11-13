const express = require('express')
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database:  'vehicledb',
});
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());
app.use(express.json());

app.get('/api/get',(req,res)=>{
    const sqlSelect = "SELECT * FROM vehicleinfo;"
    db.query(sqlSelect,(err,result)=>{
        res.send(result)
    })
})

app.post('/api/insert',(req,res)=>{
    
    const name = req.body.Name
    const division = req.body.division
    const mobileno = req.body.mobileno
    const image = req.body.image
    const sqlInsert = "INSERT INTO vehicleinfo (Name,division,mobileno,image) VALUES (?,?,?,?);"
    db.query(sqlInsert,[name,division,mobileno,image],(err,result)=>{
        console.log(err)
        console.log(result)
    })
});
app.delete('/api/delete/:name',(req,res)=>{
    const name = req.params.name
    const sqDelete = "DELETE FROM vehicleinfo WHERE Name = ?;";
    db.query(sqDelete,name,(err,result)=>{
        if(err) console.log(err)
        console.log(result)
    })
})

// app.get('/',(req,res)=>{
//     const sqlInsert = "INSERT INTO vehicleinfo (Name,division,mobileno,image) VALUES ('C:\Users\priyal\OneDrive\Pictures\2019-04\IMG_20190406_190713.jpg','prl','Se 06','9923440929');"
//     db.query(sqlInsert,(err,result)=>{
//         res.send('hola')
//         console.log(err)
//     })
// })
app.listen(3002,()=>{
    console.log('on port 3002!')
})