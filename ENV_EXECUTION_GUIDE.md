# 🚀 Playwright Environment Test Execution Guide

## Quick Start - Environment Variable Commands

### Most Common Usage:

```bash
# Run tests with development environment
npm run test:dev

# Run tests with staging environment
npm run test:staging

# Run tests with production environment
npm run test:prod

# Run API tests only in staging
npm run test:staging -- --grep @API
```

## 📂 Environment Files Setup

### Available Environment Files:
- `.env` - Default/local environment
- `.env.dev` - Development environment  
- `.env.staging` - Staging environment
- `.env.prod` - Production environment

### Environment Variables Structure:
```bash
# Base URL for the application
BASE_URL=https://rahulshettyacademy.com/client

# API configuration
API_URL=https://rahulshettyacademy.com/api/ecom
API_TIMEOUT=30000

# Database configuration (if needed)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=testdb
DB_USER=testuser
DB_PASSWORD=testpassword

# Test configuration
TEST_ENV=development
HEADLESS=false
SLOW_MO=0
TIMEOUT=30000

# Credentials (for testing only - never commit real credentials)
TEST_USERNAME=chand7272@gmail.com
TEST_PASSWORD=Chand@7272
```

## 🎯 Execution Methods

### Method 1: NPM Scripts (Recommended ⭐)

```bash
# Run with default environment (.env)
npm run test:env

# Run with specific environment files
npm run test:dev        # Uses .env.dev
npm run test:staging    # Uses .env.staging
npm run test:prod       # Uses .env.prod

# Add Playwright arguments
npm run test:dev -- --headed
npm run test:staging -- --grep @API
npm run test:prod -- --project=firefox
```

### Method 2: Direct dotenv-cli

```bash
# Basic environment file usage
npx dotenv -e .env.dev -- npx playwright test

# With additional arguments
npx dotenv -e .env.staging -- npx playwright test --grep @Web
npx dotenv -e .env.prod -- npx playwright test --project=chromium
```

### Method 3: Custom Script

```bash
# Run with development environment
node scripts/run-tests.js dev

# Run with parameters
node scripts/run-tests.js staging --grep @API
node scripts/run-tests.js prod --project=firefox --headed
```

## 🔧 Advanced Usage Examples

### Test Suite Filtering

```bash
# API tests only
npm run test:staging -- --grep @API

# Web tests only  
npm run test:dev -- --grep @Web

# Specific test file
npm run test:prod -- tests/ClientAppTest.spec.js

# Multiple patterns
npm run test:dev -- --grep "login|authentication"
```

### Browser Configuration

```bash
# Run in Chrome (Chromium)
npm run test:dev -- --project=chromium

# Run in Firefox
npm run test:staging -- --project=firefox

# Run in Safari (WebKit) - macOS only
npm run test:prod -- --project=webkit

# Run in all browsers
npm run test:staging -- --project=chromium --project=firefox
```

### Debug and Development

```bash
# Debug mode (step through tests)
npx dotenv -e .env.dev -- npx playwright test --debug

# UI mode (interactive test runner)
npx dotenv -e .env.dev -- npx playwright test --ui

# Headed mode (visible browser)
npm run test:dev -- --headed

# Slow motion for debugging
SLOW_MO=1000 npm run test:dev -- --headed

# Generate and serve reports
npm run test:staging && npm run AllureServe
```

### Specific Test Scenarios

```bash
# Login tests in development
npm run test:dev -- --grep "login"

# E-commerce flow in staging
npm run test:staging -- tests/ClientAppTest.spec.js

# API verification in production
npm run test:prod -- tests/ApiverificationE2E.spec.js

# Dynamic table tests
npm run test:dev -- tests/dynamicwebtable.spec.js
```

## 📊 Report Generation

```bash
# Run tests and generate Allure report
npm run test:staging && npm run AllureGenerate

# Run tests and serve Allure report
npm run test:prod && npm run AllureServe

# Complete Allure workflow (test + generate + serve)
npm run AllureReport

# Open existing Allure report
npm run AllureOpen
```

## 💡 Environment-Specific Test Code

Use environment variables in your tests:

```javascript
// In your test files
import { test, expect } from '@playwright/test';

const baseUrl = process.env.BASE_URL || 'https://rahulshettyacademy.com/client';
const apiUrl = process.env.API_URL || 'https://rahulshettyacademy.com/api/ecom';
const testEnv = process.env.TEST_ENV || 'development';

test('Environment-aware login test', async ({ page }) => {
  console.log(`🌍 Running in ${testEnv} environment`);
  console.log(`🔗 Base URL: ${baseUrl}`);
  
  await page.goto(baseUrl);
  // Your test logic here...
});

test('API test with environment URL', async ({ request }) => {
  const response = await request.get(`${apiUrl}/auth/login`);
  expect(response.status()).toBe(200);
});
```

## 🖥️ PowerShell Commands (Windows)

```powershell
# Check if environment files exist
Test-Path .env.dev
Test-Path .env.staging

# Set environment variables manually
$env:BASE_URL="https://staging.example.com"
$env:HEADLESS="true"
npm run test

# Run with environment variables
$env:TEST_ENV="staging"; npm run test:env

# Multiple environment variables
$env:BASE_URL="https://prod.example.com"; $env:API_TIMEOUT="60000"; npm run test:prod
```

## 🔍 Troubleshooting Guide

### 1. Environment File Not Found
```bash
Error: ENOENT: no such file or directory, open '.env.staging'
```
**Solution**: Create the missing environment file:
```bash
# Create environment file
touch .env.staging    # macOS/Linux
New-Item .env.staging # PowerShell

# Or copy from template
cp .env .env.staging
```

### 2. dotenv-cli Not Found
```bash
'dotenv' is not recognized as an internal or external command
```
**Solution**: Ensure dotenv-cli is installed:
```bash
# Check if installed
npm list dotenv-cli

# Install if missing
npm install --save-dev dotenv-cli
```

### 3. Environment Variables Not Loading
**Common issues**:
- ❌ Spaces around equals: `BASE_URL = https://example.com`
- ✅ Correct format: `BASE_URL=https://example.com`
- ❌ Comments with #: `BASE_URL=https://example.com # my URL`
- ✅ Comments on new line:
  ```bash
  # My base URL
  BASE_URL=https://example.com
  ```

### 4. Tests Failing in Different Environments
**Debug steps**:
```bash
# Add debugging to your tests
console.log('Environment variables:', {
  BASE_URL: process.env.BASE_URL,
  API_URL: process.env.API_URL,
  TEST_ENV: process.env.TEST_ENV
});

# Run with verbose output
npm run test:dev -- --reporter=line
```

## 🏁 Quick Reference Commands

| Command | Purpose | Environment File |
|---------|---------|------------------|
| `npm run test:env` | Default tests | `.env` |
| `npm run test:dev` | Development tests | `.env.dev` |
| `npm run test:staging` | Staging tests | `.env.staging` |
| `npm run test:prod` | Production tests | `.env.prod` |
| `npm run test:dev -- --grep @API` | API tests only | `.env.dev` |
| `npm run test:staging -- --headed` | Visible browser | `.env.staging` |
| `node scripts/run-tests.js dev --debug` | Debug mode | `.env.dev` |

## 📋 Sample Environment Files

### `.env.dev` (Development)
```bash
BASE_URL=http://localhost:3000
API_URL=http://localhost:8080/api
TEST_ENV=development
HEADLESS=false
SLOW_MO=500
TIMEOUT=30000
TEST_USERNAME=test@example.com
TEST_PASSWORD=testpass123
```

### `.env.staging` (Staging)  
```bash
BASE_URL=https://staging.rahulshettyacademy.com/client
API_URL=https://staging.rahulshettyacademy.com/api/ecom
TEST_ENV=staging
HEADLESS=true
SLOW_MO=0
TIMEOUT=60000
TEST_USERNAME=staging@example.com
TEST_PASSWORD=stagingpass123
```

### `.env.prod` (Production)
```bash
BASE_URL=https://rahulshettyacademy.com/client
API_URL=https://rahulshettyacademy.com/api/ecom
TEST_ENV=production
HEADLESS=true
SLOW_MO=0
TIMEOUT=45000
TEST_USERNAME=chand7272@gmail.com
TEST_PASSWORD=Chand@7272
```

## 🛡️ Security Best Practices

1. **Never commit sensitive data**: Add `.env*` to `.gitignore`
2. **Use environment templates**: Create `.env.example` with dummy values
3. **Rotate credentials**: Use different credentials for each environment
4. **Validate inputs**: Check environment variables in test setup
5. **Document variables**: Keep this guide updated

---

### 💬 Need Help?

- Check existing environment files: `ls -la .env*`
- Verify npm scripts: `npm run` (shows available scripts)  
- Test environment loading: `node -e "console.log(process.env)"`
- Debug Playwright config: `npx playwright show-trace`