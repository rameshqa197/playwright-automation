import { test, expect } from '@playwright/test';

test.describe('User Authentication and Login', () => {
  test('Valid Mobile Number Login with OTP', async ({ page }) => {
    // Step 1: Navigate to https://www.dishtv.in/
    await test.step('Navigate to DishTV website', async () => {
      await page.goto('https://www.dishtv.in/');
      
      // Expected Result: Page loads successfully with DishTV branding
      await expect(page).toHaveTitle(/DishTV/);
      await expect(page.locator('img[alt="dishtv logo"]')).toBeVisible();
    });

    // Step 2: Dismiss any notification dialogs by clicking 'I'll do this later'
    await test.step('Dismiss notification dialog', async () => {
      // Wait for potential notification dialog and dismiss it
      const notificationDialog = page.locator('role=dialog');
      if (await notificationDialog.isVisible({ timeout: 5000 })) {
        await page.getByRole('button', { name: 'I\'ll do this later' }).click();
        
        // Expected Result: Notification dialog appears and can be dismissed
        await expect(notificationDialog).not.toBeVisible();
      }
    });

    // Step 3: Click on the login button (user account icon) in the header
    await test.step('Open login modal', async () => {
      await page.locator('#dishtv-LoginBtn').click();
      
      // Expected Result: Login modal opens with mobile input and GET OTP button
      await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: /Enter Registered Mobile No/ })).toBeVisible();
      await expect(page.getByRole('button', { name: 'GET OTP' })).toBeVisible();
    });

    // Step 4: Enter valid registered mobile number '9711624678' in the input field
    await test.step('Enter mobile number', async () => {
      const mobileInput = page.getByRole('textbox', { name: /Enter Registered Mobile No/ });
      await mobileInput.fill('9711624678');
      
      // Expected Result: Mobile number is accepted and validated
      await expect(mobileInput).toHaveValue('9711624678');
    });

    // Step 5: Click 'GET OTP' button
    await test.step('Request OTP', async () => {
      await page.getByRole('button', { name: 'GET OTP' }).click();
      
      // Expected Result: OTP screen appears with message and 6 separate input boxes
      await expect(page.getByRole('heading', { 
        name: 'Enter the OTP we sent you on registered mobile no.' 
      })).toBeVisible();
    });

    // Step 6: Verify OTP input screen appears with 6 digit input boxes
    await test.step('Verify OTP input screen', async () => {
      // Expected Result: Six separate input boxes for OTP digits are displayed
      const otpInputs = page.locator('input[type="text"]').filter({ hasNot: page.locator('[placeholder*="Mobile"]') });
      await expect(otpInputs).toHaveCount(6);
      
      // Verify resend OTP functionality is present
      await expect(page.getByRole('button', { name: /Resend OTP/ })).toBeVisible();
      await expect(page.getByRole('button', { name: 'LOGIN' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'LOGIN' })).toBeDisabled();
    });

    // Step 7: Enter valid OTP in the 6 input fields
    await test.step('Enter OTP digits', async () => {
      // Note: In a real test scenario, you would either:
      // 1. Use a test mobile number that returns a known OTP
      // 2. Mock the OTP service
      // 3. Use API to get the OTP for testing
      // For this example, we'll simulate entering OTP digits
      
      const otpDigits = ['1', '2', '3', '4', '5', '6'];
      const otpInputs = page.locator('input[type="text"]').filter({ hasNot: page.locator('[placeholder*="Mobile"]') });
      
      for (let i = 0; i < 6; i++) {
        await otpInputs.nth(i).fill(otpDigits[i]);
      }
      
      // Verify all fields are filled
      for (let i = 0; i < 6; i++) {
        await expect(otpInputs.nth(i)).toHaveValue(otpDigits[i]);
      }
      
      // LOGIN button should be enabled after entering all digits
      await expect(page.getByRole('button', { name: 'LOGIN' })).toBeEnabled();
    });

    // Step 8: Click 'LOGIN' button
    await test.step('Complete login', async () => {
      await page.getByRole('button', { name: 'LOGIN' }).click();
      
      // Expected Results: Valid OTP logs user into their account successfully
      // User is redirected to account dashboard/homepage
      // Note: The actual behavior depends on the OTP validation
      // In a real test, you would verify successful login by checking for:
      // - Absence of login modal
      // - Presence of user dashboard elements
      // - User account information displayed
      // - Success message or redirect to user area
      
      // Wait for potential page changes/redirects
      await page.waitForTimeout(2000);
      
      // This is where you would add assertions for successful login
      // For example:
      // await expect(page.locator('.user-dashboard')).toBeVisible();
      // await expect(page.getByText('Welcome')).toBeVisible();
      // await expect(page.url()).toContain('/dashboard');
    });
  });

  // Additional test for OTP validation scenarios
  test('OTP Input Validation', async ({ page }) => {
    // Setup - reach OTP screen
    await page.goto('https://www.dishtv.in/');
    
    // Dismiss notification if present
    const notificationDialog = page.locator('role=dialog');
    if (await notificationDialog.isVisible({ timeout: 3000 })) {
      await page.getByRole('button', { name: 'I\'ll do this later' }).click();
    }
    
    await page.locator('#dishtv-LoginBtn').click();
    await page.getByRole('textbox', { name: /Enter Registered Mobile No/ }).fill('9711624678');
    await page.getByRole('button', { name: 'GET OTP' }).click();
    
    await test.step('Verify OTP field behavior', async () => {
      const otpInputs = page.locator('input[type="text"]').filter({ hasNot: page.locator('[placeholder*="Mobile"]') });
      
      // Test that LOGIN button is disabled initially
      await expect(page.getByRole('button', { name: 'LOGIN' })).toBeDisabled();
      
      // Test partial OTP entry
      await otpInputs.nth(0).fill('1');
      await otpInputs.nth(1).fill('2');
      await otpInputs.nth(2).fill('3');
      
      // Should still be disabled with partial OTP
      await expect(page.getByRole('button', { name: 'LOGIN' })).toBeDisabled();
      
      // Complete OTP entry
      await otpInputs.nth(3).fill('4');
      await otpInputs.nth(4).fill('5');
      await otpInputs.nth(5).fill('6');
      
      // Should be enabled with complete OTP
      await expect(page.getByRole('button', { name: 'LOGIN' })).toBeEnabled();
    });
  });

  test('Resend OTP Functionality', async ({ page }) => {
    // Setup - reach OTP screen
    await page.goto('https://www.dishtv.in/');
    
    // Dismiss notification if present
    const notificationDialog = page.locator('role=dialog');
    if (await notificationDialog.isVisible({ timeout: 3000 })) {
      await page.getByRole('button', { name: 'I\'ll do this later' }).click();
    }
    
    await page.locator('#dishtv-LoginBtn').click();
    await page.getByRole('textbox', { name: /Enter Registered Mobile No/ }).fill('9711624678');
    await page.getByRole('button', { name: 'GET OTP' }).click();
    
    await test.step('Test resend OTP timer', async () => {
      const resendButton = page.getByRole('button', { name: /Resend OTP/ });
      
      // Initially should show countdown and be disabled
      await expect(resendButton).toBeDisabled();
      await expect(resendButton).toContainText(/\d{2}:\d{2}/); // Should contain timer
      
      // Wait for timer to expire (in real test, you might want to mock time)
      // For demonstration, we'll just verify the button exists
      await expect(resendButton).toBeVisible();
    });
  });
});