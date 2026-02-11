# EmailJS Setup Guide - Real Email Integration

## Overview

This guide walks you through setting up **EmailJS** to send real emails from your CryptoVest platform. EmailJS allows frontend applications to send emails directly without a backend server.

---

## What is EmailJS?

EmailJS is a free service that enables sending emails from your frontend (HTML/JavaScript) without needing a backend. It connects your application to your email provider.

**Official Website:** https://www.emailjs.com/

---

## Step 1: Create an EmailJS Account

1. Go to **https://www.emailjs.com/**
2. Click **"Sign Up"** in the top right
3. Create a free account using your email
4. Verify your email address

---

## Step 2: Get Your Public Key

1. After signing in, go to **Dashboard** (top menu)
2. In the left sidebar, click **"Account"**
3. Copy your **Public Key** (you'll need this)
4. Store it securely - you'll add it to your code

**Your Public Key looks like:** `abc123xyz789`

---

## Step 3: Set Up an Email Service

EmailJS supports multiple email providers. Here are the easiest options:

### Option A: Using Gmail (Recommended)

1. In the dashboard, go to **"Email Services"** (left sidebar)
2. Click **"Add Service"**
3. Select **"Gmail"**
4. Follow the setup:
   - Connect your Gmail account
   - Allow EmailJS to access your Gmail
   - You'll get a **Service ID** (save this)

### Option B: Using Outlook/Hotmail

1. In **"Email Services"**, click **"Add Service"**
2. Select **"Microsoft Office 365"** or **"Outlook"**
3. Connect your account and allow access
4. Save your **Service ID**

### Option C: Using Your Own Email Server

1. If you have SMTP credentials, select **"Custom SMTP"**
2. Enter your email provider's SMTP settings
3. Save your **Service ID**

---

## Step 4: Create Email Templates

Templates define what your emails look like. You need 7 templates:

### Template 1: OTP Verification
1. In dashboard, go to **"Email Templates"**
2. Click **"Create New Template"**
3. Fill in:
   - **Template Name:** `otp_verification`
   - **Template ID:** `template_otp`
   - **Subject:** OTP Verification Code
   - **Content:**

```html
<p>Hello,</p>
<p>Your verification code is: <strong>{{otp_code}}</strong></p>
<p>This code expires in 10 minutes.</p>
<p>Use this code to {{otp_type}}</p>
<p>If you didn't request this, ignore this email.</p>
```

### Template 2: Welcome Email
1. Create another template
2. Fill in:
   - **Template Name:** `welcome_email`
   - **Template ID:** `template_welcome`
   - **Subject:** Welcome to CryptoVest - Account Created
   - **Content:**

```html
<p>Welcome {{user_name}}!</p>
<p>Your account has been successfully created.</p>
<p>Email: {{user_email}}</p>
<p>Created on: {{created_date}}</p>
<p>Next steps:</p>
<ul>
  <li>Complete your profile</li>
  <li>Enable two-factor authentication</li>
  <li>Make your first investment</li>
</ul>
```

### Template 3: Login Notification
1. Create template
2. Fill in:
   - **Template Name:** `login_notification`
   - **Template ID:** `template_login`
   - **Subject:** New Login to Your CryptoVest Account
   - **Content:**

```html
<p>A new login to your account has been detected.</p>
<p>Device: {{device}}</p>
<p>Time: {{login_time}}</p>
<p>If this wasn't you, please reset your password immediately.</p>
```

### Template 4: Password Reset
1. Create template
2. Fill in:
   - **Template Name:** `password_reset`
   - **Template ID:** `template_reset`
   - **Subject:** Reset Your CryptoVest Password
   - **Content:**

```html
<p>You've requested to reset your password.</p>
<p>Click here to reset: {{reset_link}}</p>
<p>This link expires in 1 hour.</p>
<p>If you didn't request this, ignore this email.</p>
```

### Template 5: Settings Change
1. Create template
2. Fill in:
   - **Template Name:** `settings_change`
   - **Template ID:** `template_settings`
   - **Subject:** Account Settings Changed
   - **Content:**

```html
<p>Your account settings have been updated.</p>
<p>Changes: {{changes}}</p>
<p>Time: {{change_time}}</p>
<p>If you didn't make these changes, contact support immediately.</p>
```

### Template 6: Security Alert
1. Create template
2. Fill in:
   - **Template Name:** `security_alert`
   - **Template ID:** `template_security`
   - **Subject:** Security Alert - CryptoVest
   - **Content:**

```html
<p>⚠️ Security Alert</p>
<p>Alert Type: {{alert_type}}</p>
<p>Details: {{alert_details}}</p>
<p>Time: {{alert_time}}</p>
<p>Take action immediately if suspicious.</p>
```

### Template 7: Transaction Confirmation
1. Create template
2. Fill in:
   - **Template Name:** `transaction_confirmation`
   - **Template ID:** `template_transaction`
   - **Subject:** Transaction Confirmation
   - **Content:**

```html
<p>Transaction Confirmed!</p>
<p>Type: {{transaction_type}}</p>
<p>Amount: {{transaction_amount}}</p>
<p>Value: ${{transaction_value}}</p>
<p>Date: {{transaction_date}}</p>
```

---

## Step 5: Update Your Code

Now update the `script.js` file with your credentials.

### Find this in script.js (around line 2-9):

```javascript
class EmailService {
  constructor() {
    this.serviceId = 'service_cryptovest';
    this.templateIds = {
      otp: 'template_otp',
      welcome: 'template_welcome',
      login: 'template_login',
      passwordReset: 'template_reset',
      settingsChange: 'template_settings',
      security: 'template_security',
      transaction: 'template_transaction'
    };
    this.publicKey = 'YOUR_PUBLIC_KEY';
```

### Replace with your actual values:

```javascript
class EmailService {
  constructor() {
    this.serviceId = 'service_XXXXXXXXX';        // Your Gmail Service ID
    this.templateIds = {
      otp: 'template_otp',
      welcome: 'template_welcome',
      login: 'template_login',
      passwordReset: 'template_reset',
      settingsChange: 'template_settings',
      security: 'template_security',
      transaction: 'template_transaction'
    };
    this.publicKey = 'YOUR_EMAILJS_PUBLIC_KEY'; // Your public key from step 2
```

**How to find your Service ID:**
1. In EmailJS dashboard, go to **"Email Services"**
2. Click the service you created (e.g., "Gmail")
3. Copy the **Service ID**

---

## Step 6: Test It

### Test OTP Sending:

1. Go to your login page
2. Click "Forgot Password" or try to login
3. Enter your real email
4. Check your inbox for the OTP email

### If you don't receive an email:

1. Check spam/junk folder
2. Check browser console for errors (F12 > Console)
3. Verify your email service is connected in EmailJS dashboard
4. Make sure your template variables match (`{{variable_name}}`)

---

## Troubleshooting

### Problem: "EmailJS not loaded" error

**Solution:** Check that this line is in your HTML file:
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"></script>
```

### Problem: Emails not sending

**Solution:**
1. Verify your **Service ID** is correct in script.js
2. Verify your **Public Key** is correct
3. Check your email service is connected in EmailJS dashboard
4. Check browser console (F12) for error messages
5. Verify template IDs match exactly in script.js

### Problem: Emails sent to wrong address

**Solution:**
1. Check the email address being passed to the function
2. Verify email format is correct
3. Test with your personal email address

### Problem: Email content looks wrong

**Solution:**
1. Check your template variables use `{{variable_name}}` format
2. Compare variable names in EmailJS with what's in script.js
3. Re-create the template if something looks off

---

## Environment Variables (Optional - For Security)

For production, store your keys in environment variables instead of in code:

1. Create a file called `.env` in your project folder
2. Add:
```
EMAILJS_SERVICE_ID=service_XXXXXXXXX
EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY
EMAILJS_TEMPLATE_OTP=template_otp
```

3. Load it in your code (requires a build tool like Webpack)

For now, keeping it in `script.js` is fine for demo purposes.

---

## Free Tier Limits

**EmailJS Free Plan includes:**
- ✅ 200 emails per month
- ✅ Unlimited templates
- ✅ All major email providers
- ✅ Basic analytics

If you exceed limits, upgrade to paid plan or set up your own SMTP server.

---

## Next Steps

1. ✅ Create EmailJS account
2. ✅ Set up email service (Gmail, Outlook, etc.)
3. ✅ Create 7 email templates
4. ✅ Update script.js with your credentials
5. ✅ Test email sending
6. ✅ Monitor email usage in EmailJS dashboard

---

## Files Updated

The following files now include EmailJS support:
- ✅ script.js - Updated EmailService class
- ✅ login.html - Added EmailJS library
- ✅ register.html - Added EmailJS library
- ✅ account.html - Added EmailJS library
- ✅ otp-verification.html - Added EmailJS library
- ✅ email-history.html - Added EmailJS library

All files are ready to send real emails once you configure your EmailJS account!

---

## Support

**EmailJS Documentation:** https://www.emailjs.com/docs/

**Questions?** Check their FAQ: https://www.emailjs.com/docs/faq/

**Still need help?** Create an issue on their GitHub: https://github.com/emailjs-com/emailjs-sdk

---

## Security Notes

1. Never commit your Public Key to public repositories
2. Your Service ID is less sensitive but still keep it private
3. For production, use environment variables
4. Consider using backend server for maximum security
5. Validate all email inputs before sending

---

## Production Checklist

Before going live:
- ✅ Test all 7 email types
- ✅ Verify emails arrive in 5 test accounts
- ✅ Check email formatting on mobile devices
- ✅ Set up rate limiting (prevent email spam)
- ✅ Monitor email delivery rates
- ✅ Add unsubscribe links to emails (legal requirement)
- ✅ Set up backup email service in case primary fails

