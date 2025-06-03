async function uploadWithProgress(filePaths) {
  const total = filePaths.length;
  let completed = 0;
  
  const uploadPromises = filePaths.map(async (filePath, index) => {
    try {
      const fileBuffer = fs.readFileSync(filePath);
      const fileName = path.basename(filePath);

      console.log(`fileName: ${fileName}`)
      
      const blob = await put(fileName, fileBuffer, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
        pathname: `logos/${fileName}`
      });
      
      completed++;
      console.log(`Progress: ${completed}/${total} (${Math.round(completed/total*100)}%)`);
      console.log(`file: ${fileName} url: ${blob.url}`)
      
      return { success: true, file: fileName, url: blob.url };
    } catch (error) {
      completed++;
      return { success: false, file: path.basename(filePath), error: error.message };
    }
  });
  
  return await Promise.all(uploadPromises);
}

// #!/usr/bin/env node
import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import { readdir } from 'fs/promises';

// const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
const BLOB_TOKEN = `vercel_blob_rw_lp20b4KC07zZXDFw_V9xzg42FUcLjPQa7qbi9u1F5Ut30Hz`;

if (!BLOB_TOKEN) {
  console.error('Please set BLOB_READ_WRITE_TOKEN environment variable');
  process.exit(1);
}

async function main() {
  const targetDir = process.argv[2] || './public/media';
  
  if (!fs.existsSync(targetDir)) {
    console.error(`Directory ${targetDir} does not exist`);
    process.exit(1);
  }
  
  console.log(`📁 Scanning directory: ${targetDir}`);
  
  const files = await readdir(targetDir);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
  );
  
  console.log(`🖼️  Found ${imageFiles.length} image files`);
  
  const results = await uploadWithProgress(
    imageFiles.map(file => path.join(targetDir, file))
  );
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`\n✅ Successfully uploaded: ${successful.length}`);
  console.log(`❌ Failed uploads: ${failed.length}`);
  
  if (failed.length > 0) {
    console.log('\nFailed files:');
    failed.forEach(f => console.log(`  - ${f.file}: ${f.error}`));
  }
}

main().catch(console.error);