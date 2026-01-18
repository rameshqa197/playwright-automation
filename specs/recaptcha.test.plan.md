# reCAPTCHA demo test plan

## Application Overview

Test plan for reCAPTCHA v2 checkbox demo form. Covers page load, form fields, reCAPTCHA behavior, submit flow, and outbound links. Assumes manual human interaction for CAPTCHA completion when required.

## Test Scenarios

### 1. reCAPTCHA demo - checkbox form

**Seed:** `tests/seed.spec.ts`

#### 1.1. Page loads with form and reCAPTCHA widget

**File:** `tests/plan/recaptcha/page-load.spec.ts`

**Steps:**
  1. Open the reCAPTCHA demo URL.
  2. Verify the page title shows reCAPTCHA demo and "I'm not a robot" checkbox.
  3. Verify the form section "An example form" is visible.
  4. Verify Example input A and Example input B fields are visible with default values.
  5. Verify the reCAPTCHA checkbox widget is visible.
  6. Verify the Submit button is visible and enabled.

**Expected Results:**
  - Page loads without errors and correct title appears.
  - Form section and both inputs render with default values.
  - reCAPTCHA checkbox widget is present.
  - Submit button is visible and enabled.

#### 1.2. Submit without completing reCAPTCHA shows validation

**File:** `tests/plan/recaptcha/submit-without-captcha.spec.ts`

**Steps:**
  1. Open the reCAPTCHA demo URL in a fresh state.
  2. Without clicking the reCAPTCHA checkbox, click Submit.
  3. Observe the page response or validation message.
  4. Verify that form submission is blocked.

**Expected Results:**
  - An error/validation message is shown indicating reCAPTCHA is required, or submission is blocked.
  - User remains on the same page and no success confirmation is shown.

#### 1.3. Complete reCAPTCHA and submit succeeds (manual)

**File:** `tests/plan/recaptcha/submit-with-captcha.spec.ts`

**Steps:**
  1. Open the reCAPTCHA demo URL in a fresh state.
  2. Manually complete the reCAPTCHA checkbox challenge (if presented).
  3. Click Submit.
  4. Observe the resulting page response.

**Expected Results:**
  - reCAPTCHA checkbox shows completion state.
  - Form submission succeeds and a success/confirmation message appears.

#### 1.4. Edit input fields and submit with reCAPTCHA

**File:** `tests/plan/recaptcha/edit-inputs-and-submit.spec.ts`

**Steps:**
  1. Open the reCAPTCHA demo URL in a fresh state.
  2. Replace Example input A with a new value.
  3. Replace Example input B with a new value.
  4. Manually complete the reCAPTCHA checkbox challenge (if presented).
  5. Click Submit.
  6. Observe the resulting page response.
  7. Verify the submitted values appear in the response, if the page echoes them.

**Expected Results:**
  - Input fields accept new values.
  - Submission succeeds after reCAPTCHA completion.
  - If the response echoes inputs, the new values are shown; otherwise submission is successful without error.

#### 1.5. Outbound links open correctly

**File:** `tests/plan/recaptcha/outbound-links.spec.ts`

**Steps:**
  1. Open the reCAPTCHA demo URL in a fresh state.
  2. Click the "Home" link and verify navigation.
  3. Return to the demo page.
  4. Click the reCAPTCHA "Privacy" link inside the widget and verify navigation in a new tab/window.
  5. Return to the demo page.
  6. Click the reCAPTCHA "Terms" link inside the widget and verify navigation in a new tab/window.

**Expected Results:**
  - Home link navigates to the site root.
  - Privacy link opens Google privacy policy.
  - Terms link opens Google terms page.

#### 1.6. Keyboard accessibility basic checks

**File:** `tests/plan/recaptcha/keyboard-accessibility.spec.ts`

**Steps:**
  1. Open the reCAPTCHA demo URL in a fresh state.
  2. Use Tab to move focus through the form inputs and Submit button.
  3. Verify focus order is logical (Input A, Input B, reCAPTCHA widget, Submit).
  4. Use keyboard to activate the Submit button without completing reCAPTCHA.

**Expected Results:**
  - All controls are reachable via keyboard in a logical order.
  - Submit activation via keyboard behaves the same as mouse click and is blocked without reCAPTCHA.
