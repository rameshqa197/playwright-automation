# DishTV Website Login and Platform Testing

## Application Overview

This test plan covers comprehensive testing of the DishTV website (https://www.dishtv.in/), focusing on login functionality, user authentication, recharge services, channel management, and overall user experience. The website provides DTH services including channel packages, recharges, customer support, and account management.

## Test Scenarios

### 1. User Authentication and Login

**Seed:** `tests/seed.spec.ts`

#### 1.1. Valid Mobile Number Login with OTP

**File:** `tests/user-auth/valid-mobile-login.spec.ts`

**Steps:**
  1. Navigate to https://www.dishtv.in/
  2. Dismiss any notification dialogs by clicking 'I'll do this later'
  3. Click on the login button (user account icon) in the header
  4. Enter valid registered mobile number '9711624678' in the input field
  5. Click 'GET OTP' button
  6. Verify OTP input screen appears with 6 digit input boxes
  7. Enter valid OTP in the 6 input fields
  8. Click 'LOGIN' button

**Expected Results:**
  - Page loads successfully with DishTV branding
  - Notification dialog appears and can be dismissed
  - Login modal opens with mobile input and GET OTP button
  - Mobile number is accepted and validated
  - OTP screen appears with message 'Enter the OTP we sent you on registered mobile no.'
  - Six separate input boxes for OTP digits are displayed
  - Valid OTP logs user into their account successfully
  - User is redirected to account dashboard/homepage

#### 1.2. Invalid Mobile Number Login Attempt

**File:** `tests/user-auth/invalid-mobile-login.spec.ts`

**Steps:**
  1. Navigate to https://www.dishtv.in/
  2. Click on the login button
  3. Enter invalid mobile number '1234567890'
  4. Click 'GET OTP' button
  5. Observe error message or system response

**Expected Results:**
  - Error message displays for unregistered mobile number
  - System prevents OTP generation for invalid numbers
  - User remains on login screen with appropriate error indication

#### 1.3. OTP Resend Functionality

**File:** `tests/user-auth/otp-resend.spec.ts`

**Steps:**
  1. Complete valid mobile number entry and reach OTP screen
  2. Wait for the countdown timer to expire (approximately 45 seconds)
  3. Click 'Resend OTP' button when it becomes enabled
  4. Verify new OTP is sent

**Expected Results:**
  - Countdown timer displays and counts down from 45 seconds
  - Resend OTP button is disabled during countdown
  - Button becomes enabled after countdown expires
  - New OTP is generated and sent when resend is clicked

#### 1.4. Google Login Integration

**File:** `tests/user-auth/google-login.spec.ts`

**Steps:**
  1. Navigate to login screen
  2. Click 'Login with Google' button
  3. Complete Google OAuth flow
  4. Verify user authentication

**Expected Results:**
  - Google login option is available
  - OAuth flow initiates correctly
  - User can authenticate via Google account
  - Successful login redirects to user dashboard

### 2. Instant Recharge Functionality

**Seed:** `tests/seed.spec.ts`

#### 2.1. Valid Recharge with Mobile Number

**File:** `tests/recharge/mobile-number-recharge.spec.ts`

**Steps:**
  1. Navigate to home page
  2. Locate 'Instant Recharge' section
  3. Enter valid registered mobile number in the recharge field
  4. Click 'PROCEED' button
  5. Select recharge amount/package
  6. Complete payment process

**Expected Results:**
  - Recharge section is visible and accessible
  - Mobile number validation works correctly
  - Payment options are displayed
  - Recharge process completes successfully

#### 2.2. Valid Recharge with VC Number

**File:** `tests/recharge/vc-number-recharge.spec.ts`

**Steps:**
  1. Navigate to instant recharge section
  2. Enter valid VC (Viewer Card) number
  3. Click 'PROCEED' button
  4. Select appropriate recharge package
  5. Complete payment transaction

**Expected Results:**
  - VC number is accepted and validated
  - Appropriate packages are displayed for VC
  - Payment processing works correctly

#### 2.3. Invalid Number Recharge Attempt

**File:** `tests/recharge/invalid-number-recharge.spec.ts`

**Steps:**
  1. Enter invalid/unregistered number in recharge field
  2. Click 'PROCEED' button
  3. Observe system response and error handling

**Expected Results:**
  - Error message displayed for invalid numbers
  - User cannot proceed with invalid numbers
  - Appropriate guidance provided for valid input

### 3. Navigation and Menu Functionality

**Seed:** `tests/seed.spec.ts`

#### 3.1. Main Navigation Menu Access

**File:** `tests/navigation/main-menu.spec.ts`

**Steps:**
  1. Navigate to home page
  2. Click on 'PRODUCTS' menu item
  3. Explore products and services listed
  4. Click on 'MODIFY MY PACK' menu option
  5. Click on 'GET HELP' menu option
  6. Click on 'SERVICES' menu option
  7. Click on 'GET A CONNECTION' menu option

**Expected Results:**
  - All main menu items are clickable and functional
  - Products section displays available DTH packages
  - Pack modification tools are accessible
  - Help section provides customer support options
  - Services section shows available offerings
  - New connection process is accessible

#### 3.2. Consumer Corner Access

**File:** `tests/navigation/consumer-corner.spec.ts`

**Steps:**
  1. Locate 'CONSUMER CORNER' link in header
  2. Click on the link
  3. Explore consumer-related information and resources

**Expected Results:**
  - Consumer corner page loads successfully
  - Relevant consumer information is displayed

#### 3.3. Language Selection

**File:** `tests/navigation/language-selection.spec.ts`

**Steps:**
  1. Locate language dropdown in header
  2. Click on language selector
  3. Select different languages (Hindi, Gujarati, Bengali, etc.)
  4. Verify page content changes to selected language

**Expected Results:**
  - Language dropdown displays all available options
  - Page content translates to selected language
  - UI elements adapt to selected region/language

### 4. Channel and Pack Management

**Seed:** `tests/seed.spec.ts`

#### 4.1. Value Saver Pack Exploration

**File:** `tests/channels/value-saver-packs.spec.ts`

**Steps:**
  1. Navigate to 'Value Saver Packs' section
  2. Click on 'VALUE SAVER PACKS' accordion
  3. Explore available channel packages
  4. Click 'EXPLORE VALUE SAVER PACK' link

**Expected Results:**
  - Value saver pack details are displayed
  - Package pricing and channel information is visible
  - Users can browse different pack options

#### 4.2. Add Delete Channels

**File:** `tests/channels/add-delete-channels.spec.ts`

**Steps:**
  1. Click on 'ADD/DELETE CHANNELS' section
  2. Explore channel addition/removal functionality
  3. Test channel selection interface

**Expected Results:**
  - Channel management interface is accessible
  - Users can see available channels for selection
  - Add/remove functionality works correctly

#### 4.3. Explore All Packs

**File:** `tests/channels/all-packs-exploration.spec.ts`

**Steps:**
  1. Click on 'EXPLORE ALL PACKS' section
  2. Browse through different package categories
  3. View package details and pricing

**Expected Results:**
  - Complete package catalog is accessible
  - Package details include pricing and channel list
  - Users can compare different packages

#### 4.4. Channel Guide Access

**File:** `tests/channels/channel-guide.spec.ts`

**Steps:**
  1. Locate 'CHANNEL GUIDE' button/link
  2. Click to access channel guide
  3. Browse through channel listings and program schedules

**Expected Results:**
  - Channel guide opens successfully
  - Program schedules are displayed for different channels
  - Guide is navigable and user-friendly

### 5. Promotional Content and Offers

**Seed:** `tests/seed.spec.ts`

#### 5.1. Banner Carousel Navigation

**File:** `tests/promotions/banner-carousel.spec.ts`

**Steps:**
  1. Navigate to homepage carousel section
  2. Click through different carousel slides (1-5)
  3. Click on promotional banners to access offers
  4. Test carousel navigation buttons

**Expected Results:**
  - All carousel slides are accessible
  - Promotional content loads correctly
  - Links to offers and products work as expected
  - Carousel navigation is smooth and functional

#### 5.2. Lifetime Free Service Promotion

**File:** `tests/promotions/lifetime-free-promo.spec.ts`

**Steps:**
  1. Locate 'LIFETIME FREE SERVICE PROMO' banner
  2. Click on the promotional link
  3. Verify PDF document opens or offer details are displayed

**Expected Results:**
  - Promotion is clearly visible and accessible
  - PDF document opens with offer details
  - Terms and conditions are clearly stated

#### 5.3. VZY Television Product Links

**File:** `tests/promotions/vzy-television.spec.ts`

**Steps:**
  1. Click on VZY Television promotional banners
  2. Explore VZY TV product information
  3. Test links to new customer offers

**Expected Results:**
  - VZY TV product page loads successfully
  - Product features and pricing are displayed
  - New customer offers are accessible

### 6. Live TV and Content Features

**Seed:** `tests/seed.spec.ts`

#### 6.1. Live TV Content Display

**File:** `tests/content/live-tv-display.spec.ts`

**Steps:**
  1. Navigate to 'LIVE TV' tab in content section
  2. Browse through live TV program listings
  3. View program details and schedules

**Expected Results:**
  - Live TV tab displays current programming
  - Program information includes show names and duration
  - Content is updated and relevant to current time

#### 6.2. Active Services Tab

**File:** `tests/content/active-services.spec.ts`

**Steps:**
  1. Click on 'ACTIVE SERVICES' tab
  2. Explore active service offerings
  3. Test service-related functionality

**Expected Results:**
  - Active services are displayed correctly
  - Service information is comprehensive and current

### 7. Mobile App Integration and Downloads

**Seed:** `tests/seed.spec.ts`

#### 7.1. Mobile App Download Links

**File:** `tests/mobile-app/app-download.spec.ts`

**Steps:**
  1. Locate mobile app download links
  2. Click on Play Store link for DishTV app
  3. Verify redirection to appropriate app store

**Expected Results:**
  - App download links are visible and functional
  - Links redirect to correct app store pages
  - App information and ratings are displayed

#### 7.2. Mobile App Features Showcase

**File:** `tests/mobile-app/app-features.spec.ts`

**Steps:**
  1. Navigate to mobile app section
  2. Browse through app feature tabs (Recharge, Channel management, etc.)
  3. View app screenshots and feature descriptions

**Expected Results:**
  - App features are clearly described
  - Screenshots demonstrate app functionality
  - Feature benefits are explained clearly
