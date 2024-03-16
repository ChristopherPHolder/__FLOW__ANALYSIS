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
    ContentType: 'text/html'
  };
  const command = new PutObjectCommand(params);
  await client.send(command);
}

// export class S3Store {
//   private readonly client: S3Client;
//
//   private readonly defaultConfig: S3ClientConfig = {
//     region: 'eu-central-1'
//   };
//
//   private readonly bucketName = BUCKET_NAME;
//   private readonly bucketUrl = 'https://deepblue-userflow-records.s3.eu-central-1.amazonaws.com/';
//
//   constructor() {
//     this.client = new S3Client(this.defaultConfig);
//   }
//
//   public async store(auditResults: ResultReports, location?: string): Promise<string> {
//     const urlLocation = location || this.bucketUrl;
//     return  await this.uploadResultsToBucket(auditResults, urlLocation);
//   }
//
//   async uploadResultsToBucket(auditResults: ResultReports, location: string): Promise<string> {
//     const recordBody = auditResults.htmlReport;
//     const recordKey = this.getRecordKey(location);
//     await this.uploadRecord(recordKey, recordBody);
//     return `${this.bucketUrl}${recordKey}`;
//   }
//
//   async uploadRecord(recordKey: string, recordBody: string): Promise<void> {
//     const cacheControl = 'public, max-age=0, must-revalidate';
//     const params = {
//       Bucket: this.bucketName,
//       Key: recordKey,
//       Body: recordBody,
//       CacheControl: cacheControl,
//       ContentType: 'text/html'
//     };
//     const command = new PutObjectCommand(params);
//     await this.client.send(command);
//   }
//
//   getRecordKey(urlString: string): string {
//     const url = new URL(urlString);
//     const timestamp = new Date().toISOString().slice(0, 16).replace(':', '_');
//     const hash = this.generateSimpleHash(20);
//     return `${timestamp}${url.hostname}${hash}.uf.html`;
//   }
//
//   generateSimpleHash(length: number): string {
//     let result = '';
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     const charactersLength = characters.length;
//     for (let i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
//   }
// }
