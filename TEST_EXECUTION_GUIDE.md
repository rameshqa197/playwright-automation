# Test Execution Commands Guide

## 🚀 Basic Test Execution Commands

### Run all tests with default environment
```bash
npm test
```

### Run tests with environment variables
```bash
# Set environment variables inline
HEADLESS=true BROWSER=chromium npm test

# Load from .env file
npx dotenv -e .env -- npx playwright test

# Windows PowerShell
$env:HEADLESS="true"; $env:BROWSER="chromium"; npm test

# Windows CMD
set HEADLESS=true && set BROWSER=chromium && npm test
```

## 🎯 Specific Test Execution

### Browser-specific tests
```bash
# Run on specific browser
BROWSER=chromium npm test
BROWSER=firefox npm run test:firefox
BROWSER=webkit npm run test:webkit

# Headed vs Headless
HEADLESS=false npm test                    # Run with browser UI
PLAYWRIGHT_HEADLESS=true npm test          # Force headless mode
```

### Test filtering with tags
```bash
# Run Web tests only
TEST_TAG="@Web" npm run webTests

# Run API tests only
TEST_TAG="@API" npm run APITests

# Run specific test file
npx playwright test tests/loginwithxls.spec.js

# Run tests matching pattern
npx playwright test --grep "login"
```

### Environment-specific execution
```bash
# Development environment
TEST_ENV=dev BASE_URL=https://dev.example.com npm test

# Staging environment  
TEST_ENV=staging BASE_URL=https://staging.example.com npm test

# Production environment
TEST_ENV=prod BASE_URL=https://prod.example.com npm test
```

## 📊 Reporting Options

### Generate different reports
```bash
# HTML report only
GENERATE_HTML=true npm test

# Allure report only
GENERATE_ALLURE=true npm run AllureReport

# Both reports
GENERATE_HTML=true GENERATE_ALLURE=true npm test
```

### Recording and Screenshots
```bash
# Always take screenshots
TAKE_SCREENSHOTS=on npm test

# Record video for all tests
RECORD_VIDEO=on npm test

# Enable tracing
ENABLE_TRACING=on npm test
```

## 🔧 Debugging and Development

### Debug mode
```bash
# Debug specific test
DEBUG_MODE=true npx playwright test tests/loginwithxls.spec.js --debug

# UI mode for interactive debugging
UI_MODE=true npm run test:ui

# Slow motion for visual debugging
SLOW_MO=1000 HEADLESS=false npm test
```

### Parallel execution control
```bash
# Run tests in parallel (multiple workers)
PARALLEL_WORKERS=3 npm test

# Run tests sequentially
PARALLEL_WORKERS=1 npm test

# With retries for flaky tests
RETRIES=2 npm test
```

## 🏗️ CI/CD Execution

### GitHub Actions / CI environment
```bash
# CI environment setup
CI=true PLAYWRIGHT_HEADLESS=true npm test

# With Allure reporting for CI
CI=true GENERATE_ALLURE=true npm run AllureReport
```

## 📝 Examples for Common Scenarios

### Smoke tests in staging
```bash
TEST_ENV=staging HEADLESS=true TEST_TAG="@smoke" PARALLEL_WORKERS=2 npm test
```

### Full regression with all reports
```bash
GENERATE_HTML=true GENERATE_ALLURE=true RECORD_VIDEO=on TAKE_SCREENSHOTS=on npm run regression
```

### Quick debug run
```bash
HEADLESS=false SLOW_MO=500 DEBUG_MODE=true npx playwright test tests/specific-test.spec.js
```

### Load test with multiple workers
```bash
PARALLEL_WORKERS=5 RETRIES=1 TIMEOUT=120000 npm test
```

## 🔄 .env File Usage

Create a `.env` file with your preferred settings:
```env
BROWSER=chromium
HEADLESS=false
TEST_ENV=dev
BASE_URL=https://dev.example.com
PARALLEL_WORKERS=2
```

Then run:
```bash
npx dotenv -e .env -- npx playwright test
```

## 💡 Pro Tips

1. **Windows Users**: Use PowerShell for better environment variable support
2. **Multiple Environments**: Create separate .env files (.env.dev, .env.staging, .env.prod)
3. **CI Integration**: Set environment variables in your CI/CD pipeline
4. **Local Development**: Use .env.local for personal settings (add to .gitignore)