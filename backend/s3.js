const {S3}=require("aws-sdk");

exports.s3Uploadv2 = async(file)=>{
    const s3 =new S3()
    console.log(file.originalname);
    const param={
        Bucket:process.env.AWS_BUCKET_NAME,
        Key:"avatars/"+Date.now()+"+"+file.originalname,
        Body:file.buffer,
    }
    return await s3.upload(param).promise();

}
exports.s3Deletev2=async(file)=>{
    const s3=new S3()
    return await s3.deleteObject({
        Bucket:process.env.AWS_BUCKET_NAME,
        Key:file
    })
}