// spec: specs/recaptcha.test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('reCAPTCHA demo - checkbox form', () => {
  test('Submit without completing reCAPTCHA shows validation', async ({ page }) => {
    // 1. Open the reCAPTCHA demo URL in a fresh state.
    await page.goto('https://recaptcha-demo.appspot.com/recaptcha-v2-checkbox.php?utm_source=chatgpt.com');

    // 2. Without clicking the reCAPTCHA checkbox, click Submit.
    await page.getByRole('button', { name: 'Submit ↦' }).click();

    // 3. Observe the page response or validation message.
    await expect(page.getByText('Something went wrong')).toBeVisible();

    // 4. Verify that form submission is blocked.
    await expect(page.getByText('missing-input-response')).toBeVisible();
    await expect(page.getByText('Error code missing-input-response may mean the user just didn\'t complete the reCAPTCHA.')).toBeVisible();
  });
});