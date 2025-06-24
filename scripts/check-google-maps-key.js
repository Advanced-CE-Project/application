#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🗺️  Google Maps API 키 설정 확인 중...\n');

const envFiles = [
  '.env.development',
  '.env.production'
];

let hasValidKey = false;

for (const envFile of envFiles) {
  const envPath = path.join(__dirname, '..', envFile);
  
  if (fs.existsSync(envPath)) {
    console.log(`✅ ${envFile} 파일이 존재합니다.`);
    
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    
    for (const line of lines) {
      if (line.startsWith('GOOGLE_MAPS_API_KEY=')) {
        const key = line.split('=')[1]?.trim();
        
        if (key && key !== 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
          console.log(`✅ ${envFile}에 Google Maps API 키가 설정되어 있습니다.`);
          hasValidKey = true;
        } else {
          console.log(`⚠️  ${envFile}에 Google Maps API 키가 설정되지 않았습니다.`);
        }
      }
    }
  } else {
    console.log(`❌ ${envFile} 파일이 존재하지 않습니다.`);
  }
}

console.log('\n' + '='.repeat(50));

if (hasValidKey) {
  console.log('🎉 Google Maps API 키가 올바르게 설정되었습니다!');
  console.log('\n다음 단계:');
  console.log('1. yarn prebuild:android (Android 빌드)');
  console.log('2. yarn android:dev (Android 테스트)');
} else {
  console.log('❌ Google Maps API 키 설정이 필요합니다.');
  console.log('\n해결 방법:');
  console.log('1. Google Cloud Console에서 API 키를 발급받으세요.');
  console.log('2. .env.development와 .env.production 파일에 GOOGLE_MAPS_API_KEY를 설정하세요.');
  console.log('3. 자세한 가이드는 README.md를 참고하세요.');
  
  process.exit(1);
}

console.log('\n📖 자세한 설정 가이드는 README.md를 확인하세요.'); 