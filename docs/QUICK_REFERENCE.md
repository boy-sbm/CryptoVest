# 📧 Email & OTP System - Quick Reference

**Last Updated**: February 7, 2026

---

## 🚀 Quick Start (Choose Your Path)

### 👤 I'm a User
1. Go to `index.html`
2. Click "Create Your Account"
3. Fill registration form
4. Check your email (simulated in Email History)
5. Go to Login
6. Enter credentials → Get OTP → Verify → Access Dashboard
7. Click "📧 Emails" to see all your emails

### 👨‍💻 I'm a Developer
1. Read [EMAIL_SYSTEM.md](EMAIL_SYSTEM.md) - Complete API docs
2. Check [script.js](script.js) - EmailService class (~800 lines)
3. Review email templates in the class
4. Follow [TESTING_GUIDE.md](TESTING_GUIDE.md) to test
5. Use code examples for integration

### 🧪 I'm a Tester
1. Read [TESTING_GUIDE.md](TESTING_GUIDE.md)
2. Follow 10 test cases with step-by-step instructions
3. Check localStorage for verification
4. Report any issues found

---

## 📍 Where Everything Is

### Pages
| Page | Purpose | URL |
|------|---------|-----|
| Register | Create account | `register.html` |
| Login | Sign in with OTP | `login.html` |
| OTP Verify | Enter 6-digit code | `otp-verification.html` |
| Dashboard | Main account page | `account.html` |
| Email History | View all emails | `email-history.html` |
| Password Reset | Reset forgotten password | `forgot-password.html` |

### Documentation
| File | What It Contains |
|------|-----------------|
| [EMAIL_SYSTEM.md](EMAIL_SYSTEM.md) | Complete email system documentation |
| [TESTING_GUIDE.md](TESTING_GUIDE.md) | 10 detailed test cases |
| [EMAIL_OTP_SUMMARY.md](EMAIL_OTP_SUMMARY.md) | Implementation overview |
| [README.md](README.md) | Project overview |

### Code
| File | Contains |
|------|----------|
| [script.js](script.js) | EmailService class + form handlers |
| [style.css](style.css) | All styling (updated for email pages) |
| HTML files | Each page's structure |

---

## 🔐 OTP Flow

```
User Registration
    ↓
Welcome Email Sent
    ↓
User Logs In
    ↓
OTP Generated (6 digits)
    ↓
OTP Email Sent
    ↓
User Enters Code
    ↓
Code Verified ✓
    ↓
Login Notification Email Sent
    ↓
Access Dashboard
```

---

## 📧 Email Types & When They're Sent

| Type | When | Icon |
|------|------|------|
| Welcome | User registers | 🎉 |
| OTP | User logs in | 🔐 |
| Login | User successfully verifies OTP | 🔑 |
| Password Reset | User clicks forgot password | 🔄 |
| Settings Change | User updates settings | ⚙️ |
| Security | Suspicious activity detected | ⚠️ |
| Transaction | User completes crypto trade | 💰 |

---

## 💾 Storage Locations

### localStorage
```javascript
localStorage.getItem('emailHistory')    // All emails sent
localStorage.getItem('otpData')         // Current OTP codes
localStorage.getItem('currentUser')     // Logged-in user
localStorage.getItem('allUsers')        // All registered users
```

### sessionStorage (Temporary - Cleared on Tab Close)
```javascript
sessionStorage.getItem('otpEmail')      // Email awaiting OTP
sessionStorage.getItem('otpExpiry')     // When OTP expires
```

### How to Check
1. Open DevTools (F12)
2. Go to Application tab
3. Click localStorage or sessionStorage
4. Look for CryptoVest entries

---

## 🔑 Important Numbers

| Item | Value |
|------|-------|
| OTP Length | 6 digits |
| OTP Expiry | 10 minutes |
| Max Failed Attempts | 5 |
| Resend Cooldown | 30 seconds |
| Email History Limit | Unlimited (demo) |

---

## 🎯 Common Tasks

### How to Register
1. Click "Register" on homepage
2. Fill: First Name, Last Name, Email, Password
3. Click "Create Account"
4. Check Email History for welcome email
5. Go to Login

### How to Login
1. Go to `login.html`
2. Enter email and password
3. Click "Sign In"
4. Check email for OTP code
5. Enter 6-digit code
6. Click "Verify OTP"
7. Access dashboard

### How to View Emails
1. Login to account
2. Click "📧 Emails" link
3. See all emails in list
4. Filter by type (Welcome, OTP, etc.)
5. Click email to view full content

### How to Resend OTP
1. On OTP verification page
2. Click "Resend OTP" button
3. Wait 30 seconds for cooldown
4. Click again to resend
5. New OTP sent to email

### How to Test on Mobile
1. Open DevTools (F12)
2. Click Device Toolbar icon (top left)
3. Select device (iPhone 12, etc.)
4. Test all pages at different sizes

---

## 🐛 Troubleshooting

### OTP Not Found?
- ✓ Check Email History page (click 📧 Emails)
- ✓ Filter by "OTP" type
- ✓ Check if you're logged in (might be in different user)
- ✓ Ensure emailService initialized in console

### Code Won't Verify?
- ✓ Check you entered correct code
- ✓ Code expires after 10 minutes (resend if expired)
- ✓ Only 5 attempts allowed (then must resend)
- ✓ Must be exactly 6 digits

### Registration Not Working?
- ✓ Check all fields are filled
- ✓ Email must be valid format (user@example.com)
- ✓ Passwords must match
- ✓ Check console for JavaScript errors

### Emails Not Appearing?
- ✓ Open DevTools → Application → localStorage
- ✓ Check `emailHistory` array
- ✓ User must be the right email
- ✓ Emails are filtered by currentUser.email

### Mobile Button Issues?
- ✓ Buttons are 44px minimum (mobile standard)
- ✓ Try zooming in if having trouble tapping
- ✓ Use keyboard navigation on mobile if needed

---

## 📊 Email Statistics

### Your Email Summary
On Email History page:
- **Total Emails**: Count of all emails sent to you
- **Welcome Emails**: Accounts you created
- **Login Alerts**: Times you logged in
- **OTP Codes**: OTPs sent to you

### Example
```
Total Emails:    15
Welcome Emails:  2
Login Alerts:    8
OTP Codes:       5
```

---

## 🎨 Customization Tips

### Change OTP Length
In `script.js`, find `generateOTP()`:
```javascript
// Change from 6 to 8 digits
return Math.floor(10000000 + Math.random() * 90000000).toString();
```

### Change OTP Expiry
In `script.js`, find `sendOTP()`:
```javascript
// Change from 10 minutes to 5 minutes
const expiryTime = Date.now() + (5 * 60 * 1000);
```

### Change Colors
In `style.css` or inline styles:
```css
/* Gold: #FFD700 */
/* Dark: #000, #111 */
```

### Add More Email Types
In `EmailService` class:
```javascript
sendCustomEmail(email, subject, template) {
  this.sendEmail(email, subject, template);
}
```

---

## 🔒 Security Notes

### What's Secure
- ✅ OTP codes random and unguessable
- ✅ 10-minute expiry prevents old codes
- ✅ 5-attempt limit prevents brute force
- ✅ Rate limiting on resend
- ✅ Passwords not sent in emails
- ✅ No credentials in URLs

### What Needs Work (Production)
- ⚠️ Real email service integration
- ⚠️ Backend OTP verification
- ⚠️ HTTPS enforcement
- ⚠️ Database encryption
- ⚠️ Rate limiting on server
- ⚠️ Audit logging

---

## 📞 Support & Docs

### Quick Links
- **Email System**: [EMAIL_SYSTEM.md](EMAIL_SYSTEM.md)
- **Testing Guide**: [TESTING_GUIDE.md](TESTING_GUIDE.md)
- **Summary**: [EMAIL_OTP_SUMMARY.md](EMAIL_OTP_SUMMARY.md)
- **Project**: [README.md](README.md)

### Questions?
1. Check [TESTING_GUIDE.md](TESTING_GUIDE.md) troubleshooting section
2. Review [EMAIL_SYSTEM.md](EMAIL_SYSTEM.md) for detailed info
3. Check browser console for errors (F12)
4. Inspect localStorage data

---

## ✨ Key Features at a Glance

- 🔐 **Secure OTP**: 6-digit codes, 10-minute expiry
- 📧 **7 Email Types**: Welcome, OTP, Login, Reset, Settings, Security, Transaction
- 📱 **Mobile Ready**: Responsive design, touch-friendly
- 🎨 **Professional Design**: Black & gold theme
- 📋 **Email History**: Filter, search, view details
- 🔔 **Notifications**: Toast messages, email alerts
- 💾 **Local Storage**: All data stored locally (demo)
- 📚 **Documented**: Complete guides and examples

---

## 🎯 Next Steps

### For Users
1. ✓ Register an account
2. ✓ Login with OTP
3. ✓ Explore dashboard
4. ✓ View email history
5. ✓ Update settings

### For Developers
1. ✓ Read EMAIL_SYSTEM.md
2. ✓ Review EmailService class
3. ✓ Follow testing guide
4. ✓ Integrate into your project
5. ✓ Deploy to production

### For Deployers
1. ✓ Choose email service (SendGrid, AWS SES, etc.)
2. ✓ Setup SMTP credentials
3. ✓ Update email domain/branding
4. ✓ Configure rate limiting
5. ✓ Setup monitoring & logging

---

## 🎊 That's It!

You now have everything needed to:
- ✅ Use the email system
- ✅ Understand how it works
- ✅ Test all features
- ✅ Integrate into your app
- ✅ Deploy to production

**Happy emailing! 🚀**

---

**System Status**: ✅ READY
**Last Updated**: February 7, 2026
**Version**: 2.1
