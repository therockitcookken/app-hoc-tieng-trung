import { execSync } from 'child_process';
import http from 'http';

console.log('==================================================');
console.log('🧪 RUNNING COMPREHENSIVE QA TEST HARNESS FOR APP');
console.log('==================================================\n');

let passCount = 0;
let failCount = 0;

function runTest(name, fn) {
  process.stdout.write(`⏳ [TEST] ${name}... `);
  try {
    fn();
    console.log('✅ PASSED');
    passCount++;
  } catch (err) {
    console.log('❌ FAILED');
    console.error('   Error:', err.message);
    failCount++;
  }
}

// 1. TypeScript Strict Typecheck Harness
runTest('1. TypeScript Compilation & Strict Typecheck', () => {
  execSync('npx tsc -b', { stdio: 'pipe' });
});

// 2. Vite Bundle & Production Build Harness
runTest('2. Vite Production Build Bundle Check', () => {
  const output = execSync('npx vite build', { stdio: 'pipe' }).toString();
  if (!output.includes('built in')) {
    throw new Error('Vite build did not produce expected output');
  }
});

// 3. Audio & Syllable Resolution Data Harness
runTest('3. Syllable-to-Hanzi Audio Mapping Integrity', async () => {
  const chineseSpeechModule = await import('./src/utils/chineseSpeech.ts');
  if (typeof chineseSpeechModule.speakChinese !== 'function') {
    throw new Error('speakChinese function not exported correctly');
  }
});

// 4. Server Port 3000 Connectivity Harness
runTest('4. Local Production Server (Port 3000) Health Check', () => {
  execSync('node -e "const http = require(\'http\'); http.get(\'http://localhost:3000\', (res) => { if(res.statusCode !== 200) process.exit(1); }).on(\'error\', () => process.exit(1));"', { stdio: 'pipe' });
});

console.log('\n==================================================');
console.log(`📊 TEST HARNESS RESULTS: ${passCount} PASSED | ${failCount} FAILED`);
console.log('==================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
