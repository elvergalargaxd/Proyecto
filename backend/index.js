require("dotenv").config();
//import './config.js';
//const awsx=require('./config');
//import fileUpload=require('express-fileupload');
//const aws=require('./config')
//const fileUpload=require('express-fileupload')
const express = require('express');

const bodyParser = require('body-parser');



const cors = require('cors');
const multer = require('multer');
const morgan = require('morgan');
const path = require('path');

//const uploadImageFirebase=require('./firebase')
//const {dbfirebase}=require('./firebase')


const mysql = require('mysql2');
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const e = require('express');
const { config } = require('process');

const app = express();
const cloudinary = require('cloudinary');
const { s3Uploadv2, s3Deletev2 } = require("./s3");
const { Console } = require("console");
const { exists } = require("fs");



//ruta de imagenes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//middlewares
app.use(cors());
app.use(express.static('public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//cloudinary
cloudinary.config({
    cloud_name: 'hklqgljvj',
    api_key: '588296295312495',
    api_secret: '-kYlmLZD-wAF_L5IuwY7ogXzCvA'
});

  const storage =multer.diskStorage({
   destination:(req,file,cb)=>{
       cb(null,'../frontend/src/assets/');
   },

   filename:(req,file,cb)=>{
       
       cb(null,file.originalname);
   } 
});  

//const storage = multer.memoryStorage();

const upload = multer({ storage });


//firebase
/* const upload=multer({
    storage:multer.memoryStorage(),
}); */

//app.use(fileUpload());

//base de datos coneccion



const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bddOmega',
    port: 3306
});
// const db =mysql.createConnection({
//     host:'database-1.cacbagrleume.us-east-1.rds.amazonaws.com',
//     user:'admin',
//     password:'Bayer[3000]',
//     database:'bdinnovate123',
//     port:3306
// });

//check
db.connect(err => {
    if (err) { console.log(err, 'error'); }
    console.log('base de datos conectado...');
}) 
    


app.post('/files', (req, res) => {
    console.log(req.files)
    res.json({ message: 'uploaded file' })
})
app.get('/fire', async (req, res) => {

    const querySnapshot = await dbfirebase.collection('curso').get();
    console.log("asdfasdf" + querySnapshot.docs[0].data());
    res.send("hello");
})
app.get('/asdf', (req, res) => {
    res.send('hello');
})

app.post('/user/singin', (req, res) => {

    const { userName, pass } = req.body;
    console.log(req.body.pass + 'aaaaaaaaaa');
    db.query('select id, userName, roleId from user where userName=? and pass=?',
        [userName, pass],
        (err, rows,) => {
            if (!err) {
                if (rows.length > 0) {
                    let data = JSON.stringify(rows[0]);
                    const token = jwt.sign(data, 'still');
                    res.json({ token });
                    console.log(data);
                } else {
                    res.json('Usuario incorrecto');
                }
            } else {
                console.log(err);
            }
        }
    )
});
app.post('/user/singin2', (req, res) => {

    const { userName, pass } = req.body;

    db.query('select id, userName, roleId from user where userName=? and pass=?',
        [userName, pass],
        (err, rows,) => {
            if (!err) {
                if (rows.length > 0) {
                    res.send({
                        message: 'todo el dato del usuario',
                        data: rows
                    });

                } else {
                    res.json('Usuario incorrecto');
                }
            } else {
                console.log(err);
            }
        }
    )
});

app.post('/user/test', verifyToken, (req, res) => {
    console.log(req.data);

    res.json('Informacion secreta');

})
function verifyToken(req, res, next) {
    if (!req.headers.authorization) return res.status(401).json('No autorizado');

    const token = req.headers.authorization.substr(7);


    if (token !== '') {
        const content = jwt.verify(token, 'still');
        console.log(content);
        req.data = content;
        next();
    } else {
        res.status(401).json("token vacio")
    }
}

//get all data
app.get('/user', (req, res) => {
    console.log("holaaaaaaaaaaaaaaaaa");
    let qr = `select * from user where roleId ='user'    `;
    db.query(qr, (err, result) => {
        if (err) {

            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send({
                message: 'todo el dato del usuario',
                data: result
            });
        }
    });
});

// select de latabla
app.get('/user/:id', (req, res) => {

    let gID = req.params.id;

    let qr = `select * from user where id= ${gID}`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            res.send({ message: 'obteniendo simples datos', data: result });
        }
    })

});

//modificar foto 
//app.put ('/userImagen/:id',upload.single('file'),uploadImageFirebase,(req,res,next)=>{

app.delete('/userImagen/:id', async (req, res, next) => {
    const file = req.params.id;
    await s3Deletev2(file);

})
app.put('/userImagen/:id', upload.single('file'), async (req, res, next) => {

    const file = req.file;

    const result = await s3Uploadv2(file);
    //const {firebaseUrl}=req.file ? req.file:""; 
    console.log('subir imagen', result);



    let gID = req.params.id;
    let imagenes = file.path;
    //let imagenes=firebaseUrl;
    console.log(imagenes);


    let qr = `update user set imagenes='${result.Location}'
            where id='${gID}'`;

    res.send(file);
    console.log(qr);

    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        // return res.send({essage:'datos modificados'});
    })
})
//crear usuario


app.put('/user/:id', (req, res, next) => {

    const file = req.file;

    console.log(req.body, 'modificar');
    let gID = req.params.id;
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;

    let userName = req.body.userName;
    let correo = req.body.correo;
    let roleID = req.body.roleID;
    let contrasena = req.body.contrasena;
    let telefono = req.body.telefono;
    let domicilio = req.body.domicilio;
    let ciudad = req.body.ciudad;
    let pais = req.body.pais;



    let qr = `update user set nombre='${nombre}',apellido='${apellido}',userName='${userName}',correo='${correo}',pass='${contrasena}',roleID='${roleID}',telefono='${telefono}',domicilio='${domicilio}',ciudad='${ciudad}',pais='${pais}'
            where id='${gID}'`;


    console.log(qr);

    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        return res.send({ message: 'datos modificados' });
    })

})
app.put('/userEstado/:id', (req, res, next) => {


    console.log('baja');

    let gID = req.params.id;


    let qr = `update user set estado='Baja'
            where id='${gID}'`;


    console.log(qr);

    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        return res.send({ message: 'datos modificados' });
    })

})
app.put('/userEstadoAlta/:id', (req, res, next) => {


    console.log('Alta');

    let gID = req.params.id;


    let qr = `update user set estado='Activo'
            where id='${gID}'`;


    console.log(qr);

    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        return res.send({ message: 'datos modificados' });
    })

})

app.delete('/user/:id', (req, res) => {
    let qID = req.params.id;

    let qr = `delete from user where id= '${qID}'`;
    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        res.send({
            message: 'eliminado'
        })
    });
})
app.post('/user', (req, res, next) => {
    console.log(req.body, 'crear');


    let nombre = req.body.nombre;
    let apellido = req.body.apellido;

    let userName = req.body.userName;
    let correo = req.body.correo;
    let roleID = req.body.roleID;
    let contrasena = req.body.contrasena;
    let telefono = req.body.telefono;
    let domicilio = req.body.domicilio;
    let ciudad = req.body.ciudad;
    let pais = req.body.pais;


    let qr = `insert into user (nombre,apellido,correo,pass,userName,roleID,telefono,domicilio,ciudad,pais) 
              values('${nombre}','${apellido}','${correo}','${contrasena}','${userName}','${roleID}','${telefono}','${domicilio}','${ciudad}','${pais}')`;


    console.log(req.body);
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }
        return res.send({ message: 'datos insertados' });
    })
});


//Obter todo los datos de estudiante////////////////////////////////////////
app.get('/estudiante', (req, res) => {
    let qr = 'select * from estudiante';
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send({
                message: 'todo el dato del estudiante',
                data: result
            });
        }
    });
});

// select de latabla
app.get('/estudiante/:id', (req, res) => {

    let gID = req.params.id;

    let qr = `select * from estudiante where idEstudiante= ${gID}`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            res.send({
                message: 'obteniendo simples datos',
                data: result
            });
        }
    })

});


//crear usuario
app.post('/estudiante', (req, res) => {
    console.log(req.body, 'crear');

    let nombre = req.body.nombre;
    let apPaterno = req.body.apPaterno;
    let apMaterno = req.body.apMaterno;
    let correo = req.body.correo;
    let contrasena = req.body.contrasena;

    let qr = `insert into estudiante (nombre,apPaterno,apMaterno,correo,contrasena)
             values('${nombre}','${apPaterno}','${apMaterno}','${correo}','${contrasena}')`;

    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        res.send({ message: 'datos insertados' });

    })
});

app.put('/estudiante/:id', (req, res) => {
    console.log(req.body, 'modificar');


    let gID = req.params.id;
    let nombre = req.body.nombre;
    let apPaterno = req.body.apPaterno;
    let apMaterno = req.body.apMaterno;
    let correo = req.body.correo;
    let contrasena = req.body.contrasena;

    let qr = `update estudiante set nombre='${nombre}',apPaterno='${apPaterno}',apMaterno='${apMaterno}',correo='${correo}',contrasena='${contrasena}'
            where idEstudiante='${gID}'`;
    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        res.send({
            message: 'datos modificados'
        });
    })
})
app.get('/estudiante/curso', (req, res) => {
    let gID = req.params.id;

    let qr = `SELECT c.nombre as nombreCurso,c.idDocente,u.nombre,u.apellido,c.descripcion
    FROM inscripcion as i , user as u , curso as c WHERE i.idEstudiante=u.id AND i.idCurso=c.idCurso AND u.id=${gID}`

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            res.send({
                message: 'obteniendo simples datos',
                data: result
            });
        }
        else {
            res.send({
                message: 'datos no encontrados'
            });
        }
    })
});
app.get('/estudiante/buscar/:nombre', (req, res) => {
    let qID = req.params.nombre;
    console.log(qID + "jjjjjjjjjjjj");
    let qr = `SELECT * FROM user WHERE nombre LIKE '%${qID}%' AND roleId='user'`;


    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');

        }
        if (result.length >= 0) {
            res.send({
                message: 'todo el dato del estudiante',
                data: result
            });
        }
        else {
            res.send({
                message: 'datos no encontrados'
            });
        }
    });
})
app.get('/estudiante/buscar2/:nombre', (req, res) => {

    let qID = req.params.nombre;
    console.log(qID + "jjjjjjjjjjjj");
    let qr = `SELECT * FROM user WHERE nombre LIKE '%${qID}%' AND roleId='docente'`;


    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');

        }
        if (result.length >= 0) {
            res.send({
                message: 'todo el dato del estudiante',
                data: result
            });
        }
        else {
            res.send({
                message: 'datos no encontrados'
            });
        }
    });
})
app.delete('/estudiante/:id', (req, res) => {
    let qID = req.params.id;

    let qr = `delete from estudiante where idEstudiante= '${qID}'`;
    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        res.send({
            message: 'eliminado'
        })
    });
})

app.post('/estudiante', (req, res) => {
    console.log(req.body, 'crear');

    let nombre = req.body.nombre;
    let apPaterno = req.body.apPaterno;
    let apMaterno = req.body.apMaterno;
    let correo = req.body.correo;
    let contrasena = req.body.contrasena;

    let qr = `insert into estudiante (nombre,apPaterno,apMaterno,correo,contrasena)
             values('${nombre}','${apPaterno}','${apMaterno}','${correo}','${contrasena}')`;

    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        res.send({ message: 'datos insertados' });

    })
});
app.get('/estudiante/cursos/:id', (req,res)=>{
    let gID = req.params.id;
    let qr = `select * from inscripcioN INNER JOIN curso ON inscripcion.idCurso=curso.idCurso WHERE idEstudiante= ${gID}`;
//SELECT * FROM `inscripcion` INNER JOIN `curso` on inscripcion.idCurso=curso.idCurso WHERE idEstudiante="10"

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send({
                message: 'todo el dato de los cursos',
                data: result
            });
        }
    });

})
//Obter todo los datos de curso////////////////////////////////////////
app.get('/curso', (req, res) => {
    let qr = 'select * from curso';
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send({
                message: 'todo el dato del curso',
                data: result
            });
        }
    });
});

// select de latabla
app.get('/curso/:id', (req, res) => {
    let gID = req.params.id;

    let qr = `select * from curso where idCurso= ${gID}`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            res.send({
                message: 'obteniendo simples datos',
                data: result
            });
        }
        else {
            res.send({
                message: 'datos no encontrados'
            });
        }
    })
    
});



//crear usuario
app.post('/curso', (req, res) => {
    console.log(req.body, 'crear');

    let nombreLargo = req.body.nombreLargo;
    let nombreCorto = req.body.nombreCorto;
    let descripcion = req.body.descripcion;
    let categoria = req.body.categoria;
    let imagen = req.body.imagen;
    let idDocente = req.body.idDocente;
    let precio = req.body.precio;
    let fecha = req.body.fecha;



    let qr = `insert into curso (nombreLargo,nombreCorto,descripcion,categoria,imagen,idDocente,precio,fecha)
             values('${nombreLargo}','${nombreCorto}','${descripcion}','${categoria}','${imagen}','${idDocente}','${precio}','${fecha}')`;

    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        res.send({ message: 'datos insertados' });

    })
});

app.put('/curso/:id', (req, res) => {
    console.log(req.body, 'modificar');

    let gID = req.params.id;
    let nombreLargo = req.body.nombreLargo;

    let nombreCorto = req.body.nombreCorto;
    let descripcion = req.body.descripcion;
    let categoria = req.body.categoria;
    let imagen = req.body.imagen;
    let idDocente = req.body.idDocente;
    let precio = req.body.precio;

    let idVideo = req.body.idVideo;

    let qr = `update curso set nombreLargo='${nombreLargo}',nombreCorto='${nombreCorto}',descripcion='${descripcion}',categoria='${categoria}',
            imagen='${imagen}',idDocente='${idDocente}',precio='${precio}',idVideo='${idVideo}'
            where idCurso='${gID}'`;
    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        res.send({
            message: 'datos modificados'
        });
    })
})

app.delete('/curso/:id', (req, res) => {
    let qID = req.params.id;

    let qr = `delete from curso where idCurso= '${qID}'`;
    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        res.send({
            message: 'eliminado'
        })
    });
})

app.get('/curso/docente/:id', (req, res) => {
    let qID = req.params.id;

    let qr = `select * from curso where idDocente='${qID}'`;
    db.query(qr, (err, result) => {
        if (err) {

            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send({
                message: 'todo el dato del los cursos',
                data: result
            });
        }
    });
});

app.put('/cursoEstado/:id', (req, res, next) => {


    console.log('baja');

    let gID = req.params.id;


    let qr = `update curso set estado='Baja'
            where idCurso='${gID}'`;


    console.log(qr);

    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        return res.send({ message: 'datos modificados' });
    })

})
app.put('/cursoEstadoAlta/:id', (req, res, next) => {


    console.log('Alta');

    let gID = req.params.id;


    let qr = `update curso set estado='Activo'
            where idCurso='${gID}'`;


    console.log(qr);

    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        return res.send({ message: 'datos modificados' });
    })

})

app.put('/userImagenCurso/:id', upload.single('file'), async (req, res, next) => {

    ///////////////////////
    const file = req.file;
    //const result = await s3Uploadv2(file);
    //console.log(req.body, 'modificar');



    let gID = req.params.id;
    let imagenes = file.path;

    const str = imagenes.slice(22);

    console.log(str);

    let qr = `update clase set video='${str}'
            where posicion='${gID}'`;

    res.send(file);
    console.log(qr);

    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        // return res.send({essage:'datos modificados'});
    })
})


//Obter todo los datos de docente////////////////////////////////////////
app.get('/docente', (req, res) => {
    let qr = 'select * from user where roleId="docente"';
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send({
                message: 'todo el dato del docente',
                data: result
            });
        }
    });
});

// select de latabla
app.get('/docente/:id', (req, res) => {
    let gID = req.params.id;

    let qr = `select * from docente where idDocente= ${gID}`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            res.send({
                message: 'obteniendo simples datos',
                data: result
            });
        }
        else {
            res.send({
                message: 'datos no encontrados'
            });
        }
    })
});


//crear usuario
app.post('/docente', (req, res) => {
    console.log(req.body, 'crear');

    let nombre = req.body.nombre;
    let apPaterno = req.body.apPaterno;
    let apMaterno = req.body.apMaterno;
    let correo = req.body.correo;
    let contrasena = req.body.contrasena;
    let idCurso = req.body.idCurso;

    let qr = `insert into docente (nombre,apPaterno,apMaterno,correo,contrasena,idCurso)
             values('${nombre}','${apPaterno}','${apMaterno}','${correo}','${contrasena}','${idCurso}')`;

    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        res.send({ message: 'datos insertados' });

    })
});

app.put('/docente/:id', (req, res) => {
    console.log(req.body, 'modificar');


    let gID = req.params.id;
    let nombre = req.body.nombre;
    let apPaterno = req.body.apPaterno;
    let apMaterno = req.body.apMaterno;
    let correo = req.body.correo;
    let contrasena = req.body.contrasena;
    let idCurso = req.body.idCurso;

    let qr = `update docente set nombre='${nombre}',apPaterno='${apPaterno}',apMaterno='${apMaterno}',correo='${correo}',contrasena='${contrasena}',contrasena='${idCurso}'
            where idDocente='${gID}'`;
    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        res.send({
            message: 'datos modificados'
        });
    })
})

app.delete('/docente/:id', (req, res) => {
    let qID = req.params.id;

    let qr = `delete from docente where idDocente= '${qID}'`;
    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        res.send({
            message: 'eliminado'
        })
    });
})
//Categoria////////////////////////////////////////
app.get('/categoria', (req, res) => {
    let qr = 'select * from categoria';

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send({
                message: 'todo el dato del categoria',
                data: result
            });
        }
    });
});
app.get('/categoria/:id', (req, res) => {

    let gID = req.params.id;
    let qr = `select * from categoria where idCategoria=${gID}`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send({
                message: 'todo el dato del categoria',
                data: result
            });
        }
    });
});
app.post('/categoria', (req, res) => {
    console.log(req.body, 'crear');

    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;


    let qr = `insert into categoria (nombre,descripcion)
             values('${nombre}','${descripcion}')`;

    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        res.send({ message: 'datos insertados' });

    })
});
app.put('/categoria/:id', (req, res) => {
    console.log(req.body, 'modificar');


    let gID = req.params.id;
    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;


    let qr = `update categoria set nombre='${nombre}',descripcion='${descripcion}'
            where idCategoria='${gID}'`;

    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        res.send({
            message: 'datos modificados'
        });
    })
})
app.delete('/categoria/:id', (req, res) => {
    let qID = req.params.id;

    let qr = `delete from categoria where idCategoria= '${qID}'`;
    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        res.send({
            message: 'eliminado'
        })
    });
})
//Inscripciones////////////////////////////////////////

app.post('/inscripcion', (req, res) => {
    console.log(req.body, 'crear');

    let idCurso = req.body.idCurso;
    let idEstudiante = req.body.id;
    let costo = req.body.costo; 
    let fecha = req.body.fecha;

    db.query(`SELECT 1 FROM inscripcion WHERE idCurso = '${idCurso}' and idEstudiante = '${idEstudiante}' ORDER BY idEstudiante LIMIT 1`, function (error, results, fields) {
        if (error) {
            console.log(error); 
        }
        if (results.length  > 0) {
            console.log('fail');
            res.send({ message: 'datos no insertados' });
        
        } else {
        
        
                console.log('insert');
                var query = db.query (
                    `insert into inscripcion (idCurso,idEstudiante,costo,fecha)
             values('${idCurso}','${idEstudiante}','${costo}','${fecha}')`
                );
        
                res.send({ message: 'datos insertados' });
        }
        
        console.log(results);
        });
    // let qr = `insert into inscripcion (idCurso,idEstudiante,costo,fecha)
    //          values('${idCurso}','${idEstudiante}','${costo}','${fecha}')`;

    // db.query(qr, (err, result) => {
    //     if (err) { console.log(err); }
    //     res.send({ message: 'datos insertados' });

    // })
});

//crear clase
app.post('/clase/:id', (req, res, next) => {
    //app.post('/video/:id',upload.single('file'),async (req,res,next)=>{
    console.log(req.body, 'crear');

    // const file=req.file;
    // const result=await s3Uploadv2(file);
    // console.log("subir imagen", result)
    // let video=file.path;

    let nombre = req.body.nombreClase;
    let descripcion = req.body.descripcionClase;
    let idClase = req.params.id;
    let posicion=req.body.posicion;
    console.log(posicion+"asdfasdfasdfsd");

    // let qr=`insert into video (nombre,video,descripcion,idCurso)
    // values('${nombre}','${result.Location}','${descripcion}','${idCurso}')`;

    let qr = `insert into clase (nombre,video,descripcion,idCurso,posicion)
    values('${nombre}','','${descripcion}','${idClase}','${posicion}')`;
 
    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        res.send({ message: 'datos insertados' });

    });
});

app.put('/clase/:id', (req, res) => {
    console.log(req.body, 'modificar');


    let gID = req.params.id;
    let nombre = req.body.nombreClaseM;
    let descripcion = req.body.descripcionClaseM;


    let qr = `update clase set nombre='${nombre}',descripcion='${descripcion}'
            where idClase='${gID}'`;

    console.log(qr);

    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        res.send({
            message: 'datos modificados'
        });
    })
})

app.get('/clase', (req, res) => {
    let qr = 'select * from clase';
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send({
                message: 'todo el dato del docente',
                data: result
            });
        }
    });
});

// select de latabla
app.get('/clase/:id', (req, res) => {
    let gID = req.params.id;

    let qr = `select * from clase where idCurso= ${gID}`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            res.send({
                message: 'obteniendo simples datos',
                data: result
            });
        }
        else {
            res.send({
                message: 'datos no encontrados'
            });
        }
    })
});
app.get('/claseEditar/:id', (req, res) => {
    let gID = req.params.id;

    let qr = `select * from clase where idClase= ${gID}`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            res.send({
                message: 'obteniendo simples datos',
                data: result
            });
        }
        else {
            res.send({
                message: 'datos no encontrados'
            });
        }
    })
});
app.get('/buscarClase/:id', (req, res) => {
    
    
    
    let nombre = req.body.posicion;
    
    console.log(nombre+"buscar claseeee");
    let qr = `select * from clase where posicion='${posicion}'`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            res.send({
                message: 'obteniendo simples datos',
                data: result
            });
        }
        else {
            res.send({
                message: 'datos no encontrados'
            });
        }
    })
});
////RESPUESTAS///////////////////////////////////////////////////////////////
app.get('/respuesta/:id/:id2', (req, res) => {

    let idEstudiante = req.params.id;
    let idCurso = req.params.id2;

    console.log(req.body+"aaaaaaaaaa");
    
    // let qr = `select * from respuestas WHERE idEvaluacion=1 OR 
    //                                         idEvaluacion=2 OR  
    //                                         idEvaluacion=3 OR  
    //                                         idEvaluacion=4 OR 
    //                                         idEvaluacion=5 OR
    //                                         idEvaluacion=6 OR
    //                                         idEvaluacion=7 OR
    //                                         idEvaluacion=8 OR 
    //                                         idEvaluacion=9 OR
    //                                         idEvaluacion=10`;

    let qr = `select * from respuestas WHERE idEstudiante=${idEstudiante} And idCurso=${idCurso} `; 

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs'); 
        }
        if (result.length > 0) {
            res.send({
                message: 'todo el dato del respuestas',
                data: result
            });
        } 
    });
});
app.post('/respuesta/:id', (req, res, next) => {
    //app.post('/video/:id',upload.single('file'),a sync (req,res,next)=>{
    console.log(req.body, 'crear');

    // const file=req.file;
    // const result=await s3Uploadv2(file);
    // console.log("subir imagen", result)
    // let video=file.path;

    let respuesta1 = req.body.respuesta1;
    let respuesta2 = req.body.respuesta2;
    let respuesta3 = req.body.respuesta3;
    let respuesta4 = req.body.respuesta4;
    let respuesta5 = req.body.respuesta5;
    let respuesta6 = req.body.respuesta6;
    let respuesta7 = req.body.respuesta7;
    let respuesta8 = req.body.respuesta8;
    let respuesta9 = req.body.respuesta9;
    let respuesta10 = req.body.respuesta10;

    let respuesta1Id = req.body.respuesta1Id;
    let respuesta2Id = req.body.respuesta2Id;
    let respuesta3Id = req.body.respuesta3Id;
    let respuesta4Id = req.body.respuesta4Id;
    let respuesta5Id = req.body.respuesta5Id;
    let respuesta6Id = req.body.respuesta6Id;
    let respuesta7Id = req.body.respuesta7Id;
    let respuesta8Id = req.body.respuesta8Id;
    let respuesta9Id = req.body.respuesta9Id;
    let respuesta10Id = req.body.respuesta10Id;


    let idEstudiante = req.params.id;

    console.log(respuesta1)

    // let qr=`insert into video (nombre,video,descripcion,idCurso)
    // values('${nombre}','${result.Location}','${descripcion}','${idCurso}')`;

    let qr = `insert into respuestas (respuesta,idEvaluacion,IdEstudiante) values
        ('${respuesta1}','${respuesta1Id}','${idEstudiante}'),
        ('${respuesta2}','${respuesta2Id}','${idEstudiante}'),
        ('${respuesta3}','${respuesta3Id}','${idEstudiante}'),
        ('${respuesta4}','${respuesta4Id}','${idEstudiante}'),
        ('${respuesta5}','${respuesta5Id}','${idEstudiante}'),
        ('${respuesta6}','${respuesta6Id}','${idEstudiante}'),
        ('${respuesta7}','${respuesta7Id}','${idEstudiante}'),
        ('${respuesta8}','${respuesta8Id}','${idEstudiante}'),
        ('${respuesta9}','${respuesta9Id}','${idEstudiante}'),
        ('${respuesta10}','${respuesta10Id}','${idEstudiante}')`;

    console.log(qr);
    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        res.send({ message: 'datos insertados' });

    })
});
////EVALUACIONES///////////////////////////////////////////////////////////////

app.post('/evaluacion/:id', (req, res, next) => {
    //app.post('/video/:id',upload.single('file'),async (req,res,next)=>{
    console.log(req.body, 'crear');

    // const file=req.file;
    // const result=await s3Uploadv2(file);
    // console.log("subir imagen", result)
    // let video=file.path;

    let pregunta1 = req.body.pregunta1;
    let pregunta2 = req.body.pregunta2;
    let pregunta3 = req.body.pregunta3;
    let pregunta4 = req.body.pregunta4;
    let pregunta5 = req.body.pregunta5;
    let pregunta6 = req.body.pregunta6;
    let pregunta7 = req.body.pregunta7;
    let pregunta8 = req.body.pregunta8;
    let pregunta9 = req.body.pregunta9;
    let pregunta10 = req.body.pregunta10;


    let idCurso = req.params.id;


    // let qr=`insert into video (nombre,video,descripcion,idCurso)
    // values('${nombre}','${result.Location}','${descripcion}','${idCurso}')`;

    let qr = `insert into evaluacion (pregunta,idCurso)values('${pregunta1}','${idCurso}'),
        ('${pregunta2}','${idCurso}'),
        ('${pregunta3}','${idCurso}'),
        ('${pregunta4}','${idCurso}'),
        ('${pregunta5}','${idCurso}'),
        ('${pregunta6}','${idCurso}'),
        ('${pregunta7}','${idCurso}'),
        ('${pregunta8}','${idCurso}'),
        ('${pregunta9}','${idCurso}'),
        ('${pregunta10}','${idCurso}')`;

    console.log(qr);
    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        res.send({ message: 'datos insertados' });

    })
});

app.put('/evaluaciones/:id/:id2', (req, res) => {
    console.log(req.body, 'modificar');

    var pregunta1 = req.body.pregunta1;
    var pregunta2 = req.body.pregunta2;
    var pregunta3 = req.body.pregunta3;
    var pregunta4 = req.body.pregunta4;
    var pregunta5 = req.body.pregunta5;
    var pregunta6 = req.body.pregunta6;
    var pregunta7 = req.body.pregunta7;
    var pregunta8 = req.body.pregunta8;
    var pregunta9 = req.body.pregunta9;
    var pregunta10 = req.body.pregunta10;

    var preguntabd;

    if (pregunta1 != null) {
        console.log("pregunta111111111111111111111111111111111111");
        preguntabd = pregunta1;
    }
    if (pregunta2 != null) {
        console.log("pregunta22222222222222222222222222222");
        preguntabd = pregunta2;
    }
    if (pregunta3 != null) {
        console.log("pregunta33333333333333333333333333");
        preguntabd = pregunta3;
    }
    if (pregunta4 != null) {
        console.log("pregunta33333333333333333333333333");
        preguntabd = pregunta4;
    }
    if (pregunta5 != null) {
        console.log("pregunta33333333333333333333333333");
        preguntabd = pregunta5;
    }
    if (pregunta6 != null) {
        console.log("pregunta33333333333333333333333333");
        preguntabd = pregunta6;
    }
    if (pregunta7 != null) {
        console.log("pregunta33333333333333333333333333");
        preguntabd = pregunta7;
    }
    if (pregunta8 != null) {
        console.log("pregunta33333333333333333333333333");
        preguntabd = pregunta8;
    }
    if (pregunta9 != null) {
        console.log("pregunta33333333333333333333333333");
        preguntabd = pregunta9;
    }
    if (pregunta10 != null) {
        console.log("pregunta33333333333333333333333333");
        preguntabd = pregunta10;
    }

    let numPregunta = req.params.id2;
    let idCurso = req.params.id;

    console.log(preguntabd + "ssssssssssssssssssssssss ");

    let qr = `update evaluacion set pregunta='${preguntabd}'
                where idCurso='${idCurso}' and numPregunta='${numPregunta}'`;

    console.log(qr);

    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        res.send({
            message: 'datos modificados'
        });
    })
})

app.get('/evaluacion', (req, res) => {
    let qr = 'select * from evaluacion';
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send({
                message: 'todo el dato del docente',
                data: result
            });
        }
    });
});

// select de latabla
app.get('/evaluacion/:id', (req, res) => {
    let gID = req.params.id;

    let qr = `select * from evaluacion where idCurso= ${gID}`;

    console.log(qr);

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            res.send({
                message: 'obteniendo simples datos',
                data: result
            });
        }
        else {
            res.send({
                message: 'datos no encontrados'
            });
        }
    })
});
app.get('/evaluacionEditar/:id', (req, res) => {
    let gID = req.params.id;

    let qr = `select * from evaluacion where idEvaluacion= ${gID}`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            res.send({
                message: 'obteniendo simples datos',
                data: result
            });
        }
        else {
            res.send({
                message: 'datos no encontrados'
            });
        }
    })
});

///////////////////////////////////////////////////////////////////////////////

app.get('/inscripcion/:id', (req, res) => {
    let gID = req.params.id;

    let qr = `SELECT u.nombre as estudiante, u.apellido, u.correo, u.telefono,c.nombre,c.idDocente
             FROM inscripcion as i , user as u , curso as c WHERE i.idEstudiante=u.id 
             AND i.idCurso=c.idCurso and c.idDocente=${gID}`

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            res.send({
                message: 'obteniendo simples datos',
                data: result
            });
        }
        else {
            res.send({
                message: 'datos no encontrados'
            });
        }
    })
});


app.listen(3000, () => {
    console.log('servidor corriendooo');
});