# Playwright Automation Testing Framework

## 🎭 Overview
This repository contains a comprehensive Playwright automation testing framework for web application testing, API testing, and end-to-end test automation.

## 📊 Test Reports
Test reports are automatically published to GitHub Pages after each workflow run:
- **Live Reports**: https://rameshqa197.github.io/playwright-automation/

If you don’t see the reports:
- Open the latest GitHub Actions run → **Artifacts** and download `playwright-report` or `allure-report`, then open `index.html` inside.
- Or ensure GitHub Pages is enabled for the repo with **Source: GitHub Actions** (Settings → Pages → Build and deployment).

### GitHub Pages enablement note
If the workflow log shows:
`Get Pages site failed ... Not Found ... /repos/{owner}/{repo}/pages`

That means GitHub Pages is not enabled for the repository.

Fix options:
1) **Recommended (manual, one time):** Settings → Pages → Build and deployment → **Source: GitHub Actions**.
2) **CI auto-enable (optional):** Create a fine-grained PAT with **Pages: write** and **Administration: write**, save it as repo secret **`PAGES_TOKEN`**.

## 🚀 Features
- **Cross-browser Testing**: Chrome, Firefox, WebKit support
- **API Testing**: REST API validation and testing
- **Excel Data Integration**: Data-driven testing with Excel files
- **Allure Reporting**: Beautiful test reports with history
- **CI/CD Integration**: GitHub Actions workflow
- **Database Testing**: MySQL integration utilities

## 📁 Project Structure
```
├── tests/                 # Test specification files
├── pageobjects/           # Page Object Model classes
├── utils/                 # Utility functions and helpers
├── Testdata/             # Test data files (Excel, JSON)
├── .github/workflows/    # CI/CD pipeline configuration
└── playwright.config.js  # Playwright configuration
```

## 🔧 Getting Started
```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests in headed mode
npm run test:headed

# Generate Allure report
npm run AllureReport
```

## 📈 Reporting
- **HTML Reports**: Generated in `playwright-report/`
- **Allure Reports**: Generated in `allure-report/`
- **GitHub Pages**: Automated deployment of reports

### View reports locally
- Playwright HTML report:
	- Run tests, then run: `npm run show-report`
- Allure HTML report:
	- Generate: `npm run AllureGenerate`
	- Open: `npm run AllureOpen`

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License
This project is licensed under the ISC License.