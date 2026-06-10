const fs = require('fs');
const path = require('path');

function loadEnvFile() {
  const envPath = path.resolve(process.cwd(), '.env');

  if (!fs.existsSync(envPath)) return;

  const content = fs.readFileSync(envPath, 'utf8');

  content.split(/\r?\n/).forEach((line) => {
    const cleanLine = line.trim();

    if (!cleanLine || cleanLine.startsWith('#')) return;

    const separatorIndex = cleanLine.indexOf('=');
    if (separatorIndex === -1) return;

    const key = cleanLine.slice(0, separatorIndex).trim();
    const value = cleanLine.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');

    if (!process.env[key]) {
      process.env[key] = value;
    }
  });
}

loadEnvFile();
