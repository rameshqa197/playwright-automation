// spec: specs/recaptcha.test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('reCAPTCHA demo - checkbox form', () => {
  test('Page loads with form and reCAPTCHA widget', async ({ page }) => {
    // 1. Open the reCAPTCHA demo URL.
    await page.goto('https://recaptcha-demo.appspot.com/recaptcha-v2-checkbox.php?utm_source=chatgpt.com');

    // 2. Verify the page title shows reCAPTCHA demo and "I'm not a robot" checkbox.
    await expect(page.getByText('reCAPTCHA demo')).toBeVisible();
    await expect(page.getByText('"I\'m not a robot" checkbox')).toBeVisible();

    // 3. Verify the form section "An example form" is visible.
    await expect(page.getByRole('group', { name: 'An example form' })).toBeVisible();

    // 4. Verify Example input A and Example input B fields are visible with default values.
    const inputA = page.getByRole('textbox', { name: 'Example input A:' });
    const inputB = page.getByRole('textbox', { name: 'Example input B:' });
    
    await expect(inputA).toBeVisible();
    await expect(inputA).toHaveValue('foo');
    await expect(inputB).toBeVisible();
    await expect(inputB).toHaveValue('bar');

    // 5. Verify the reCAPTCHA checkbox widget is visible.
    const recaptchaFrame = page.frameLocator('iframe[src*="recaptcha"]').first();
    await expect(recaptchaFrame.locator('[role="checkbox"]')).toBeVisible();

    // 6. Verify the Submit button is visible and enabled.
    const submitButton = page.getByRole('button', { name: 'Submit ↦' });
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
  });
});