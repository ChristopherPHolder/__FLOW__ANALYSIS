import { writeFileSync } from 'node:fs';
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export function persistReport(name: string, report: string) {
  writeFileSync('./measures/' + name + '.json', report);
}

const BUCKET_NAME = 'entain-competitor-analysis';

export async function storeInS3(report: string, name: string) {
  const client = new S3Client({region: 'eu-central-1'});
  const cacheControl = 'public, max-age=0, must-revalidate';
  const params = {
    Bucket: BUCKET_NAME,
    Key: name,
    Body: report,
    CacheControl: cacheControl,
    ContentType: 'application/json'
  };
  const command = new PutObjectCommand(params);
  await client.send(command);
}
