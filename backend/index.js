const express=require('express');
const bodyParser = require('body-parser');

const cors = require ('cors');
const mysql= require('mysql2');
const { Router } = require('express');

const jwt = require('jsonwebtoken');
const e = require('express');

const app= express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
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


 app.post ('/user/singin',(req,res)=>{
     
     const {userName,pass}=req.body;
     db.query('select id, userName, roleId from user where userName=? and pass=?',
     [userName,pass],
     (err,rows,)=>{
        if(!err){
            if(rows.length>0){
                let data =JSON.stringify(rows[0]);
                const token = jwt.sign(data,'still');
                res.json({token});
                console.log(data);
            }else{
                res.json('Usuario incorrecto');
            }
        }else{
            console.log(err);
        }
     }
     )
 }); 
 app.post ('/user/singin2',(req,res)=>{
     
    const {userName,pass}=req.body;
    db.query('select id, userName, roleId from user where userName=? and pass=?',
    [userName,pass],
    (err,rows,)=>{
       if(!err){
           if(rows.length>0){
            res.send({
                message:'todo el dato del usuario',
                data:rows
            });
            
           }else{
               res.json('Usuario incorrecto');
           }
       }else{
           console.log(err);
       }
    }
    )
});

 app.post('/user/test',verifyToken,(req,res)=>{
    console.log(req.data);
    
    res.json('Informacion secreta');

 })
function verifyToken(req,res,next){
    if(!req.headers.authorization) return res.status(401).json('No autorizado');

    const token = req.headers.authorization.substr(7);
    
    
    if(token!==''){
    const content=jwt.verify(token, 'still');
        console.log(content);
        req.data =content;
        next();
    }else{
        res.status(401).json("token vacio")
    }
}
  
//get all data
app.get('/user',(req,res)=>{
    let qr= `select * from user where roleId    ='user'    `;
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
        })
    
});


//crear usuario


app.put ('/user/:id',(req,res)=>{
    console.log(req.body,'modificar');
    let gID=req.params.id;  
    let nombre =req.body.nombre;
    let apellido=req.body.apellido;
    
    let userName=req.body.userName;
    let correo=req.body.correo;
    let roleID=req.body.roleID;
    let contrasena=req.body.contrasena;
    let telefono=req.body.telefono;
    

    let qr=`update user set nombre='${nombre}',apellido='${apellido}',userName='${userName}',correo='${correo}',pass='${contrasena}',roleID='${roleID}',telefono='${telefono}'
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
app.post('/user',(req,res)=>{
    console.log(req.body,'crear');

    let nombre =req.body.nombre;
    let apellido=req.body.apellido;
    
    let userName=req.body.userName;
    let correo=req.body.correo;
    let roleID=req.body.roleID;
    let contrasena=req.body.contrasena;
    let telefono=req.body.telefono;

    let qr=`insert into user (nombre,apellido,correo,pass,userName,roleID,telefono)
             values('${nombre}','${apellido}','${correo}','${contrasena}','${userName}','${roleID}','${telefono}')`;

    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        res.send({message:'datos insertados'});
         
    })
});

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
app.get('/estudiante/curso',(req,res)=>{
    let gID=req.params.id;  

    let qr=`SELECT c.nombre as nombreCurso,c.idDocente,u.nombre,u.apellido,c.descripcion
    FROM inscripcion as i , user as u , curso as c WHERE i.idEstudiante=u.id AND i.idCurso=c.idCurso AND u.id=${gID}`

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
app.get('/estudiante/buscar/:nombre',(req,res)=>{
    let qID=req.params.nombre;

    let qr =`SELECT * FROM user WHERE nombre LIKE '%${qID}%'`;

    
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

app.get('/curso/docente/:id',(req,res)=>{
    let qID=req.params.id;

    let qr= `select * from curso where idDocente='${qID}'`;
    db.query(qr,(err,result)=>{
        if(err)
        {
             
            console.log(err,'errs');
        }
        if(result.length>0)
        {
            res.send({
                message:'todo el dato del los cursos',
                data:result
            });
        }
    });
});


//Obter todo los datos de docente////////////////////////////////////////
app.get('/docente',(req,res)=>{
    let qr= 'select * from user where roleId="docente"';
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
    let idEstudiante=req.body.id;
    let costo=req.body.costo;
    let fecha=req.body.fecha;
    

    let qr=`insert into inscripcion (idCurso,idEstudiante,costo,fecha)
             values('${idCurso}','${idEstudiante}','${costo}','${fecha}')`;

    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        res.send({message:'datos insertados'});
         
    })
});

//crear usuario
app.post('/video',(req,res)=>{
    console.log(req.body,'crear');

    let nombre =req.body.nombre;
    let video=req.body.video;
    let descripcion=req.body.descripcion;
    let idCurso=req.body.idCurso;
    

    let qr=`insert into video (nombre,video,descripcion,idCurso)
             values('${nombre}','${video}','${descripcion}','${idCurso}')`;

    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        res.send({message:'datos insertados'});
         
    })
});

app.get('/video',(req,res)=>{
    let qr= 'select * from video';
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
app.get('/video/:id',(req,res)=>{
    let gID=req.params.id;  

    let qr=`select * from video where idCurso= ${gID}`;

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

app.get('/inscripcion/:id',(req,res)=>{
    let gID=req.params.id;  

    let qr=`SELECT u.nombre as estudiante, u.apellido, u.correo, u.telefono,c.nombre,c.idDocente
             FROM inscripcion as i , user as u , curso as c WHERE i.idEstudiante=u.id 
             AND i.idCurso=c.idCurso and c.idDocente=${gID}`

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


app.listen(3000,()=>{
    console.log('servidor corriendooo');
});