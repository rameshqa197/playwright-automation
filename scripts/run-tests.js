#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

/**
 * Test Execution Script for Environment Variables
 * Usage: 
 *   node scripts/run-tests.js [environment] [additional-playwright-args]
 *   
 * Examples:
 *   node scripts/run-tests.js dev                    # Run with .env.dev
 *   node scripts/run-tests.js staging --grep @API   # Run API tests in staging
 *   node scripts/run-tests.js prod --project=firefox # Run production tests in Firefox
 */

const args = process.argv.slice(2);
const environment = args[0] || 'default';
const playwrightArgs = args.slice(1);

// Environment file mapping
const envFiles = {
  'default': '.env',
  'dev': '.env.dev',
  'staging': '.env.staging',
  'prod': '.env.prod'
};

// Get the environment file
const envFile = envFiles[environment];

if (!envFile) {
  console.error(`❌ Unknown environment: ${environment}`);
  console.error(`Available environments: ${Object.keys(envFiles).join(', ')}`);
  process.exit(1);
}

console.log(`🚀 Running tests with ${envFile} environment...`);

// Build the command
const command = 'npx';
const commandArgs = ['dotenv', '-e', envFile, '--', 'npx', 'playwright', 'test', ...playwrightArgs];

console.log(`📝 Command: ${command} ${commandArgs.join(' ')}`);

// Execute the command
const child = spawn(command, commandArgs, {
  stdio: 'inherit',
  shell: true,
  cwd: path.resolve(__dirname, '..')
});

child.on('close', (code) => {
  if (code === 0) {
    console.log(`✅ Tests completed successfully using ${envFile}`);
  } else {
    console.error(`❌ Tests failed with exit code ${code}`);
  }
  process.exit(code);
});

child.on('error', (error) => {
  console.error(`❌ Error running tests:`, error);
  process.exit(1);
});