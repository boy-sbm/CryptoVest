# 🔧 OTP Service Fix - Configuration Guide

## The Issue
The OTP service isn't sending because the EmailJS credentials in `script.js` were placeholder values. They need to be replaced with YOUR actual EmailJS account credentials.

---

## ✅ Step-by-Step Fix

### Step 1: Get Your EmailJS Credentials

1. Go to **https://dashboard.emailjs.com/**
2. Sign in (or create a free account if you don't have one)

### Step 2: Copy Your Public Key

1. In the left sidebar, click **"Account"**
2. Look for **"Public Key"** 
3. Click the copy button next to it
4. Save this value - you'll need it in Step 4

**Example format:** `abc123xyz789def456`

### Step 3: Get Your Service ID

1. In the left sidebar, click **"Email Services"**
2. Click on your email service (or create one if you don't have one)
3. Copy the **"Service ID"**
4. Save this value - you'll need it in Step 4

**Example format:** `service_xyz123abc456`

> **Note:** If you don't have an email service set up yet:
> - Click "Add Service" in the Email Services page
> - Select your email provider (Gmail, Outlook, etc.)
> - Follow the setup instructions

### Step 4: Update script.js

Open `script.js` in your editor and find these lines (around line 4-17):

```javascript
this.serviceId = 'service_YOUR_ACTUAL_SERVICE_ID';  // ← REPLACE THIS
this.publicKey = 'YOUR_ACTUAL_PUBLIC_KEY';  // ← REPLACE THIS
```

Replace with your actual values from Steps 2 & 3:

```javascript
this.serviceId = 'service_xyz123abc456';  // Your Service ID
this.publicKey = 'abc123xyz789def456';    // Your Public Key
```

### Step 5: Create Email Templates (if you don't have them)

You need to create these 7 templates in your EmailJS dashboard:

**Template IDs needed:**
- `template_otp` - OTP Verification Code
- `template_welcome` - Welcome Email
- `template_login` - Login Notification
- `template_reset` - Password Reset
- `template_settings` - Settings Change
- `template_security` - Security Alert
- `template_transaction` - Transaction Email

To create a template:
1. In EmailJS dashboard, go to **"Email Templates"**
2. Click **"Create New Template"**
3. Set the Template ID (e.g., `template_otp`)
4. Add your template content

> You can use the templates provided in `EMAILJS_SETUP.md` for reference

---

## ✅ Testing the Fix

After updating your credentials:

1. Go to **[login.html](login.html)** 
2. Try to log in with a valid email
3. You should see a message: **"OTP sent to your email!"**
4. Check your email inbox for the OTP code
5. If it doesn't arrive:
   - Check your spam folder
   - Verify your email service is properly connected in EmailJS dashboard
   - Check EmailJS status at https://status.emailjs.com/

---

## 🐛 Troubleshooting

### "OTP not sending" message still appears?

**Check 1:** Verify credentials are correct
- Copy/paste directly from EmailJS dashboard (no extra spaces!)
- Make sure you're using the Service ID, not the Service Name

**Check 2:** Verify EmailJS library is loaded
- Open browser console (F12)
- Type `emailjs` and press Enter
- Should see the EmailJS object. If undefined, library didn't load

**Check 3:** Verify templates exist
- Go to EmailJS dashboard > Email Templates
- Make sure `template_otp` template exists and has variables like `{{otp_code}}`

**Check 4:** Check console errors
- Open browser console (F12)
- Look for red error messages
- Share the exact error message

### Email goes to spam?

- Add your email to EmailJS verified senders
- Check EmailJS template subject line
- Verify email service is properly configured

---

## 📞 Need Help?

- **EmailJS Support:** support@emailjs.com
- **EmailJS Docs:** https://www.emailjs.com/docs/
- **Status Page:** https://status.emailjs.com/

