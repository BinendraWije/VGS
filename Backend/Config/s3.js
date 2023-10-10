// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand, ListObjectsV2Command, ListBucketsCommand, DeleteObjectsCommand} from "@aws-sdk/client-s3";
import {getSignedUrl}  from "@aws-sdk/s3-request-presigner";


require('dotenv').config();



const bucketName = process.env.BUCKET_NAME
const region = process.env.BUCKET_REGION
const accessKeyId = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
})


export function uploadFile(fileBuffer, fileName, mimetype) {
  const uploadParams = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype
  }

  return s3Client.send(new PutObjectCommand(uploadParams));
}

export function deleteFile(fileName) {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileName,
  }

  return s3Client.send(new DeleteObjectCommand(deleteParams));
}

export async function getObjectSignedUrl(key) {
  const params = {
    Bucket: bucketName,
    Key: key
  }

  // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
  const command = new GetObjectCommand(params);
  const seconds = 60
  const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

  return url
}

export async function emptyBucketByPrefix(prefix) {

    let listResponse
    do {
        listResponse = await s3Client.send(new ListObjectsV2Command({Bucket: bucketName, Prefix: prefix}));
        console.log(listResponse);
        if (!listResponse.Contents?.length) {
            break;
        }
        const objects = listResponse.Contents.map(({Key}) => ({Key}));
        const command = new DeleteObjectsCommand({
            Bucket: bucketName,
            Delete: {
                Objects: objects,
            },
        });
        await s3Client.send(command);
    } while (listResponse.IsTruncated);
}


  
