# EmailJS Configuration Quick Reference

## Step 1: Get Your Credentials

### From EmailJS Dashboard:

**Public Key:**
- URL: https://dashboard.emailjs.com/admin/account
- Location: Under "Account" → "Public Key"
- Format: `abc123xyz789`

**Service ID:**
- URL: https://dashboard.emailjs.com/admin/email-services
- Location: Click your email service → "Service ID"
- Format: `service_abc123xyz789`

---

## Step 2: Update script.js

Find this section (around line 3 in script.js):

```javascript
this.serviceId = 'service_cryptovest';
this.publicKey = 'YOUR_PUBLIC_KEY';
```

Replace with your actual values:

```javascript
this.serviceId = 'service_YOUR_ACTUAL_ID';    // From EmailJS
this.publicKey = 'YOUR_ACTUAL_PUBLIC_KEY';    // From EmailJS
```

---

## Step 3: Verify Template IDs

Your template IDs should match in script.js. Create these templates in EmailJS:

| Email Type | Template ID | Email Type | Template ID |
|-----------|------------|-----------|------------|
| OTP | `template_otp` | Settings Change | `template_settings` |
| Welcome | `template_welcome` | Security Alert | `template_security` |
| Login | `template_login` | Transaction | `template_transaction` |
| Password Reset | `template_reset` | | |

---

## Step 4: Test Email Sending

### Via Browser Console:

```javascript
// Test OTP sending
emailService.sendOTP('your-email@gmail.com', 'login');

// Test welcome email
emailService.sendAccountCreationEmail({
  firstName: 'John',
  lastName: 'Doe',
  email: 'your-email@gmail.com'
});
```

### Expected Result:
- Email arrives in your inbox within 1-2 minutes
- Check spam folder if not found
- Console shows success message

---

## Troubleshooting Checklist

- [ ] EmailJS account created and verified
- [ ] Email service connected (Gmail, Outlook, etc.)
- [ ] All 7 templates created with correct IDs
- [ ] script.js updated with Service ID
- [ ] script.js updated with Public Key
- [ ] HTML files include EmailJS library
- [ ] Browser console shows no errors
- [ ] Test email sent successfully

---

## Common Issues

| Issue | Solution |
|-------|----------|
| Emails not sending | Verify Public Key is correct |
| Template variables empty | Check `{{variable}}` format in template |
| Service not found | Verify Service ID is correct |
| Getting 404 error | Clear browser cache and reload |
| Emails in spam | Add to contacts, create SPF/DKIM records |

---

## Files Needing Updates

1. **script.js** - Lines 1-12 in EmailService constructor
2. **All HTML files** - Already have EmailJS library included ✅

---

## Reset Instructions

If you make a mistake:

1. Delete all templates in EmailJS
2. Delete email service from EmailJS
3. Create new service and templates
4. Update script.js with new IDs
5. Reload browser (Ctrl+Shift+Delete to clear cache)

---

## Need Help?

- **EmailJS Docs:** https://www.emailjs.com/docs/
- **Status Page:** https://status.emailjs.com/
- **Contact Support:** support@emailjs.com

