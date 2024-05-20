const { S3Client} = require('@aws-sdk/client-s3')
require('dotenv').config()

const bucketname = process.env.AWS_BUCKET_NAME,
region = process.env.AWS_BUCKET_REGION,
accessKeyId = process.env.AWS_ACCESS_KEY,
secretAccessKey = process.env.AWS_SECRET_KEY


const s3 = new S3Client({
    region: region,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    }
    
})



//const command = new GetObjectCommand({Bucket: bucketname, Key: '1715857835480.jpg'})

module.exports = {s3}