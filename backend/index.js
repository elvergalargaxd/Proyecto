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

//Obter todo los datos de estudiante////////////////////////////////////////
app.get('/estudiante',(req,res)=>{
    let qr= 'select * from estudiante';
    db.query(qr,(err,result)=>{
        if(err)
        {
            console.log(err,'errs');
        }
        if(result.length>0)
        {
            res.send({
                message:'todo el dato del estudiante',
                data:result
            });
        }
    });
});

// select de latabla
app.get('/estudiante/:id',(req,res)=>{
    
    let gID=req.params.id;  
    
    let qr=`select * from estudiante where idEstudiante= ${gID}`;

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
        })
    
});


//crear usuario
app.post('/estudiante',(req,res)=>{
    console.log(req.body,'crear');

    let nombre =req.body.nombre;
    let apPaterno=req.body.apPaterno;
    let apMaterno=req.body.apMaterno;
    let correo=req.body.correo;
    let contrasena=req.body.contrasena;

    let qr=`insert into estudiante (nombre,apPaterno,apMaterno,correo,contrasena)
             values('${nombre}','${apPaterno}','${apMaterno}','${correo}','${contrasena}')`;

    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        res.send({message:'datos insertados'});
         
    })
});

app.put ('/estudiante/:id',(req,res)=>{
    console.log(req.body,'modificar');
    
    
    let gID=req.params.id;
    let nombre =req.body.nombre;
    let apPaterno=req.body.apPaterno;
    let apMaterno=req.body.apMaterno;
    let correo=req.body.correo;
    let contrasena=req.body.contrasena;

    let qr=`update estudiante set nombre='${nombre}',apPaterno='${apPaterno}',apMaterno='${apMaterno}',correo='${correo}',contrasena='${contrasena}'
            where idEstudiante='${gID}'`;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        res.send({
            message:'datos modificados'
        });
    })
})

app.get('/estudiante/buscar/:nombre',(req,res)=>{
    let qID=req.params.nombre;

    let qr =`SELECT * FROM estudiante WHERE nombre LIKE '%${qID}%'`;

    
    db.query(qr,(err,result)=>{
                if(err)
        {
            console.log(err,'errs');
            
        }
        if(result.length>=0)
        {
            res.send({
                message:'todo el dato del estudiante',
                data:result
            });
        }
        else{
            res.send({
                message:'datos no encontrados'
            });
        }
    });
})

app.delete('/estudiante/:id',(req,res)=>{
    let qID=req.params.id;

    let qr =`delete from estudiante where idEstudiante= '${qID}'`;
    db.query(qr,(err,result)=>{
        if(err){console.log(err); }
        res.send({
            message:'eliminado'
        })
    });
})

app.post('/estudiante',(req,res)=>{
    console.log(req.body,'crear');

    let nombre =req.body.nombre;
    let apPaterno=req.body.apPaterno;
    let apMaterno=req.body.apMaterno;
    let correo=req.body.correo;
    let contrasena=req.body.contrasena;

    let qr=`insert into estudiante (nombre,apPaterno,apMaterno,correo,contrasena)
             values('${nombre}','${apPaterno}','${apMaterno}','${correo}','${contrasena}')`;

    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        res.send({message:'datos insertados'});
         
    })
});

//Obter todo los datos de curso////////////////////////////////////////
app.get('/curso',(req,res)=>{
    let qr= 'select * from curso';
    db.query(qr,(err,result)=>{
        if(err)
        {
            console.log(err,'errs');
        }
        if(result.length>0)
        {
            res.send({
                message:'todo el dato del curso',
                data:result
            });
        }
    });
});

// select de latabla
app.get('/curso/:id',(req,res)=>{
    let gID=req.params.id;  

    let qr=`select * from curso where idCurso= ${gID}`;

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
app.post('/curso',(req,res)=>{
    console.log(req.body,'crear');

    let nombre =req.body.nombre;
    let descripcion=req.body.descripcion;
    let imagen=req.body.imagen;
    let idDocente=req.body.idDocente;
    

    let qr=`insert into curso (nombre,descripcion,imagen,idDocente)
             values('${nombre}','${descripcion}','${imagen}','${idDocente}')`;

    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        res.send({message:'datos insertados'});
         
    })
});

app.put ('/curso/:id',(req,res)=>{
    console.log(req.body,'modificar');
    
    
    let gID=req.params.id;
    let nombre =req.body.nombre;
    let descripcion=req.body.descripcion;
    let imagen=req.body.imagen;
    let idDocente=req.body.idDocente;
    
    let qr=`update curso set nombre='${nombre}',descripcion='${descripcion}',imagen='${imagen}',idDocente='${idDocente}'
            where idCurso='${gID}'`;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        res.send({
            message:'datos modificados'
        });
    })
})

app.delete('/curso/:id',(req,res)=>{
    let qID=req.params.id;

    let qr =`delete from curso where idCurso= '${qID}'`;
    db.query(qr,(err,result)=>{
        if(err){console.log(err); }
        res.send({
            message:'eliminado'
        })
    });
})



//Obter todo los datos de docente////////////////////////////////////////
app.get('/docente',(req,res)=>{
    let qr= 'select * from docente';
    db.query(qr,(err,result)=>{
        if(err)
        {
            console.log(err,'errs');
        }
        if(result.length>0)
        {
            res.send({
                message:'todo el dato del docente',
                data:result
            });
        }
    });
});

// select de latabla
app.get('/docente/:id',(req,res)=>{
    let gID=req.params.id;  

    let qr=`select * from docente where idDocente= ${gID}`;

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
app.post('/docente',(req,res)=>{
    console.log(req.body,'crear');

    let nombre =req.body.nombre;
    let apPaterno=req.body.apPaterno;
    let apMaterno=req.body.apMaterno;
    let correo=req.body.correo;
    let contrasena=req.body.contrasena;
    let idCurso=req.body.idCurso;

    let qr=`insert into docente (nombre,apPaterno,apMaterno,correo,contrasena,idCurso)
             values('${nombre}','${apPaterno}','${apMaterno}','${correo}','${contrasena}','${idCurso}')`;

    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        res.send({message:'datos insertados'});
         
    })
});

app.put ('/docente/:id',(req,res)=>{
    console.log(req.body,'modificar');
    
    
    let gID=req.params.id;
    let nombre =req.body.nombre;
    let apPaterno=req.body.apPaterno;
    let apMaterno=req.body.apMaterno;
    let correo=req.body.correo;
    let contrasena=req.body.contrasena;
    let idCurso=req.body.idCurso;

    let qr=`update docente set nombre='${nombre}',apPaterno='${apPaterno}',apMaterno='${apMaterno}',correo='${correo}',contrasena='${contrasena}',contrasena='${idCurso}'
            where idDocente='${gID}'`;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        res.send({
            message:'datos modificados'
        });
    })
})

app.delete('/docente/:id',(req,res)=>{
    let qID=req.params.id;

    let qr =`delete from docente where idDocente= '${qID}'`;
    db.query(qr,(err,result)=>{
        if(err){console.log(err); }
        res.send({
            message:'eliminado'
        })
    });
})
//Inscripciones////////////////////////////////////////

app.post('/inscripcion',(req,res)=>{
    console.log(req.body,'crear');

    let idCurso =req.body.idCurso;
    let idEstudiante=req.body.idEstudiante;
    let costo=req.body.costo;
    let fecha=req.body.fecha;
    

    let qr=`insert into inscripcion (idCurso,idEstudiante,costo,fecha)
             values('${idCurso}','${idEstudiante}','${costo}','${fecha}')`;

    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        res.send({message:'datos insertados'});
         
    })
});




app.listen(3000,()=>{
    console.log('servidor corriendooo');
});