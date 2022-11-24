
var admin = require("firebase-admin");
var serviceAccount = require("./firebase-key.json");

const BUCKET="innovate-befb0.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
});
const bucket=admin.storage().bucket();
const dbfirebase=admin.firestore();

const uploadImage=(req,res,next)=>{
    if(!req.file)return next();

    const imagem=req.file;

    const nomArchivo=Date.now()+"."+ imagem.originalname.split(".").pop();

    const file=bucket.file(nomArchivo);

    const stream= file.createWriteStream({
        metadata:{
            contentType:imagem.mimetype,
        },
    });
    console.log(stream)

    stream.on("error",(e)=>{
        console.error(e);
    });
    
    stream.on("finish",async ()=>{
        await file.makePublic();

        
        req.file.firebaseUrl=`https://storage.googleapis.com/${BUCKET}/${nomArchivo}`;
        next();
    });

    //console.log(imagem.buffer);
    stream.end(imagem.buffer);
}

module.exports=uploadImage,{dbfirebase};