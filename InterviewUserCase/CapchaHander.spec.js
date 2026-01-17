import { test, expect } from '@playwright/test';

test('should bypass hCaptcha for testing', async ({ page }) => {
  
  
    // Intercept the hCaptcha verification request and mock a successful response
  await page.route('https://hcaptcha.com/siteverify', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, challenge_ts: new Date().toISOString(), hostname: 'accounts.hcaptcha.com' }),
    });
  });

  await page.goto('https://accounts.hcaptcha.com/demo');
  await page.locator('#hcaptcha-demo-submit').click();

  await page.pause();
  // Interact with the form as usual, the CAPTCHA will be considered solved
  // ... your test steps here ...
});