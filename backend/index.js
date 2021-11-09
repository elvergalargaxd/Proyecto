const express=require('express');
const bodyParser = require('body-parser');

const cors = require ('cors');
const mysql= require('mysql2');

const app= express();

app.use(cors());
app.use(bodyParser.json());


//base de datos coneccion

const db =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'bddOmega',
    port:3306
});

//check
db.connect(err=>{
    if(err){console.log(err,'error');}
    console.log('base de datos conectado...');
})


//get all data
app.get('/user',(req,res)=>{
    let qr= 'select *from user';
    db.query(qr,(err,result)=>{
        if(err)
        {
            console.log(err,'errs');
        }
        if(result.length>0)
        {
            res.send({
                message:'todo el dato del usuario',
                data:result
            });
        }
    });
});

// select de latabla
app.get('/user/:id',(req,res)=>{
    let gID=req.params.id;  

    let qr=`select * from user where id= ${gID}`;

    db.query(qr,(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        if(result.length>0)
        {
            res.send({
                message:'obteniendo simples datos',
                data:result
            });
        }
        else{
            res.send({
                message:'datos no encontrados'
            });
        }
    })
});


//crear usuario
app.post('/user',(req,res)=>{
    console.log(req.body,'crear');
    let nombre =req.body.nombre;
    let descripcion=req.body.descripcion;

    let qr=`insert into user (nombre,descripcion)
             values('${nombre}','${descripcion}')`;

    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        res.send({message:'datos insertados'});
         
    })
});

app.put ('/user/:id',(req,res)=>{
    console.log(req.body,'modificar');

    let gID=req.params.id;
    let nombre =req.body.nombre;
    let descripcion=req.body.descripcion;

    let qr=`update user set nombre='${nombre}',descripcion='${descripcion}'
            where id='${gID}'`;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        res.send({
            message:'datos modificados'
        });
    })
})

app.delete('/user/:id',(req,res)=>{
    let qID=req.params.id;

    let qr =`delete from user where id= '${qID}'`;
    db.query(qr,(err,result)=>{
        if(err){console.log(err); }
        res.send({
            message:'eliminado'
        })
    });
})

app.listen(3000,()=>{
    console.log('servidor corriendooo');
});