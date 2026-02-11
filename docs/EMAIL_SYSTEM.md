# CryptoVest Email & OTP System Documentation

**Last Updated**: February 7, 2026
**Version**: 1.0

---

## 📧 Email System Overview

CryptoVest now includes a comprehensive email notification system with OTP (One-Time Password) verification for secure authentication.

### Key Features

✅ **OTP Generation & Verification**
- 6-digit codes with 10-minute expiry
- 5 failed attempt limit
- Auto-resend functionality
- Real-time countdown timer

✅ **Email Templates**
- Welcome emails for new accounts
- Login notifications with device info
- OTP verification codes
- Password reset links
- Settings change confirmations
- Security alerts
- Transaction confirmations

✅ **Email History**
- View all emails sent to your account
- Filter by type (welcome, login, OTP, etc.)
- Search and view email details
- Email statistics dashboard

✅ **Automatic Notifications**
- Account creation confirmations
- Login attempt alerts
- Settings modification notices
- Security event notifications

---

## 🔐 OTP Verification Flow

### Registration → OTP Verification → Account Access

```
1. User fills registration form
   ↓
2. Email sent with welcome message
   ↓
3. User is redirected to login page
   ↓
4. User enters email/password
   ↓
5. OTP generated & sent to email
   ↓
6. User enters OTP on verification page
   ↓
7. Account created in currentUser
   ↓
8. Redirect to dashboard
```

### Login Flow with OTP

```
1. User enters credentials on login page
   ↓
2. Email & password validated
   ↓
3. OTP generated & sent
   ↓
4. User redirected to OTP verification page
   ↓
5. User enters 6-digit code
   ↓
6. Code verified within 10 minutes
   ↓
7. currentUser created from allUsers array
   ↓
8. Login notification email sent
   ↓
9. Redirect to dashboard
```

---

## 📧 Email Templates & Types

### 1. **Welcome Email** (`welcome`)
**Sent When**: New account is created
**Content**: 
- Welcome message with user name
- Account details (email, name, creation date)
- Next steps (complete profile, enable 2FA, make investment)
- Support contact information
- Professional black & gold design

### 2. **OTP Email** (`otp`)
**Sent When**: User requests OTP for login or signup
**Content**:
- 6-digit OTP code (big, centered, gold)
- Purpose (sign in or verify identity)
- 10-minute expiry timer
- Security warning about not sharing code
- Support information

### 3. **Login Notification** (`login`)
**Sent When**: User successfully logs in
**Content**:
- Login confirmation
- Device info (currently shows "Web Browser")
- Timestamp of login
- IP address (simulated)
- Security instructions if unusual activity
- Warning about password security

### 4. **Password Reset** (`password-reset`)
**Sent When**: User requests password reset
**Content**:
- Password reset button with secure link
- 1-hour expiry
- Security notice
- Warning not to click if unsolicited

### 5. **Settings Change** (`settings-change`)
**Sent When**: User modifies account settings
**Content**:
- List of changes made
- Timestamp
- Security instructions
- Password reset notice

### 6. **Security Alert** (`security`)
**Sent When**: Suspicious activity detected
**Content**:
- Alert type and details
- Recommended actions
- Password change instructions
- 2FA enablement guide

### 7. **Transaction Email** (`transaction`)
**Sent When**: User completes crypto transaction
**Content**:
- Transaction type (buy/sell/transfer)
- Amount and crypto type
- Transaction value in USD
- Completion status

---

## 🛠️ Using the Email Service

### EmailService Class

The `EmailService` class in `script.js` provides all email functionality:

```javascript
// Initialize email service (automatic)
const emailService = new EmailService();

// Send OTP
const otpResult = emailService.sendOTP('user@example.com', 'login');
// Returns: { success: true, message: '...', expiryTime: timestamp }

// Verify OTP
const verifyResult = emailService.verifyOTP('user@example.com', '123456');
// Returns: { success: true/false, message: '...' }

// Send welcome email
emailService.sendAccountCreationEmail(userObject);

// Send login notification
emailService.sendLoginNotificationEmail('user@example.com', 'Device Name');

// Send password reset
emailService.sendPasswordResetEmail('user@example.com', 'resetToken123');

// Send settings change
emailService.sendSettingsChangeEmail('user@example.com', ['Profile updated', 'Email changed']);

// Send security alert
emailService.sendSecurityAlertEmail('user@example.com', 'Suspicious Login', 'Login from new device');

// Send transaction email
emailService.sendTransactionEmail('user@example.com', {
  type: 'Buy',
  amount: '0.5 BTC',
  value: 25000
});
```

### Storage Details

**localStorage Keys**:
- `emailHistory` - Array of all sent emails
- `otpData` - Current OTP codes and attempts
- `currentUser` - Logged-in user object

**sessionStorage Keys**:
- `otpEmail` - Email address awaiting OTP verification
- `otpExpiry` - Timestamp when OTP expires

---

## 📊 Email History Page

**URL**: `email-history.html`
**Access**: Dashboard → 📧 Emails link

### Features

- **View All Emails**: See complete list of all emails sent to your address
- **Filter by Type**: 
  - All
  - Welcome
  - OTP
  - Login
  - Password Reset
  - Settings Change
  - Security
  - Transaction
- **Statistics**: Show counts for each email type
- **Email Details**: Click any email to view full HTML content
- **Clear History**: Delete all emails (with confirmation)
- **Responsive Design**: Mobile-friendly layout

### Email Statistics

The page displays:
- Total Emails sent
- Welcome emails count
- Login alerts count
- OTP codes sent count

---

## 🔑 OTP Verification Page

**URL**: `otp-verification.html`
**Accessed**: After login attempt with email/password

### Features

- **6 Input Fields**: Auto-advance to next field
- **Paste Support**: Paste entire code and auto-fill
- **Timer**: Countdown to OTP expiry
- **Resend**: Resend OTP with 30-second cooldown
- **Error Handling**: Shows attempt counter (5 max)
- **Keyboard Navigation**: Arrow keys for navigation
- **Email Display**: Shows which email OTP was sent to
- **Auto-focus**: Focus on first field

### OTP Timeout Behavior

- **Expires After**: 10 minutes
- **Timer Colors**:
  - Gold (normal) - 10+ minutes remaining
  - Yellow (warning) - 60 seconds remaining
  - Red (danger) - Expired
- **On Expiry**: Cannot verify, must resend

---

## 📋 Integration Points

### Registration Form (`register.html`)
```javascript
// Sends welcome email on successful registration
emailService.sendAccountCreationEmail(newUser);
```

### Login Form (`login.html`)
```javascript
// Sends OTP and redirects to verification
const otpResult = emailService.sendOTP(email, 'login');
emailService.sendLoginNotificationEmail(email, 'Web Browser');
```

### Password Reset (`forgot-password.html`)
```javascript
// Sends password reset email
emailService.sendPasswordResetEmail(email, resetToken);
```

### Settings Modal (`account.html`)
```javascript
// Sends confirmation when settings are changed
emailService.sendSettingsChangeEmail(email, changesList);
```

---

## 🔒 Security Features

### OTP Security
- ✅ 6-digit random codes
- ✅ 10-minute expiry (no extension)
- ✅ 5 maximum failed attempts
- ✅ Rate limiting (30s resend cooldown)
- ✅ Client-side validation

### Email Security
- ✅ HTTPS ready (for production)
- ✅ No sensitive data in email links
- ✅ Professional security warnings
- ✅ Never ask for passwords in emails
- ✅ Clear "Do Not Share" messages

### Data Protection
- ✅ localStorage encryption ready
- ✅ sessionStorage for temporary data
- ✅ OTP not visible in URLs
- ✅ Email addresses masked where appropriate

---

## 📱 Testing the System

### Test Flow 1: New User Registration
1. Go to `register.html`
2. Fill in: FirstName, LastName, Email, Password
3. Click "Register"
4. View email in Email History
5. Go to Login page
6. Enter same email/password
7. Should redirect to OTP verification
8. View OTP in Email History
9. Copy code and enter in OTP page
10. Login notification should appear in Email History

### Test Flow 2: View Email History
1. Login to account
2. Click "📧 Emails" in navigation
3. Filter emails by type
4. Click any email to view full content
5. Check statistics
6. Try resending OTP from email page

### Test Flow 3: OTP Expiry
1. Request OTP (from login)
2. Wait 10+ minutes (or manually edit otpExpiry in sessionStorage)
3. Timer should turn red
4. Cannot verify expired OTP
5. Must click "Resend OTP"

---

## 🚀 Production Deployment

### Before Going Live

- [ ] Integrate real email service (SendGrid, AWS SES, Mailgun, etc.)
- [ ] Update email templates with real company branding
- [ ] Implement backend OTP verification
- [ ] Add email bounce handling
- [ ] Setup SMTP credentials
- [ ] Test with real email addresses
- [ ] Implement email rate limiting on server
- [ ] Add unsubscribe links to marketing emails
- [ ] Setup bounce and complaint handling
- [ ] Implement email authentication (SPF, DKIM, DMARC)

### Example: SendGrid Integration

```javascript
// Would replace sendEmail method
async sendEmail(to, subject, htmlBody) {
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: 'noreply@cryptovest.com' },
      subject: subject,
      content: [{ type: 'text/html', value: htmlBody }]
    })
  });
  
  return await response.json();
}
```

---

## 📊 Email Statistics

### Current Implementation
- **Total Email Types**: 7
- **Email Templates**: 7 (with responsive HTML)
- **OTP Length**: 6 digits
- **OTP Expiry**: 10 minutes
- **Failed Attempts Limit**: 5
- **Resend Cooldown**: 30 seconds
- **Max Emails per User**: Unlimited (for demo)

### Future Enhancements
- [ ] Email unsubscribe management
- [ ] Email preferences per user
- [ ] Batch email sending
- [ ] Email template customization
- [ ] Multi-language email templates
- [ ] SMS OTP option
- [ ] Biometric authentication
- [ ] Device fingerprinting
- [ ] Email activity logs
- [ ] Email scheduling

---

## 🐛 Troubleshooting

### OTP Not Appearing
- Check Email History page
- Verify email is correct
- Check localStorage for emailHistory
- Ensure emailService.js is loaded

### OTP Verification Failing
- Count: Only 5 attempts allowed
- Expiry: OTP expires after 10 minutes
- Code: Must be exactly 6 digits
- Type: Cannot paste special characters

### Email History Empty
- User must be logged in
- Check if currentUser exists in localStorage
- Emails filtered by logged-in user's email
- Clear history doesn't delete, just clears view

### Not Redirecting to OTP Page
- Check if sessionStorage has otpEmail
- Verify emailService is initialized
- Check browser console for errors
- Ensure otp-verification.html exists

---

## 📚 Code Examples

### Send Welcome Email on Registration

```javascript
const newUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'hashedPassword',
  createdAt: new Date().toISOString()
};

// Save user
allUsers.push(newUser);
localStorage.setItem('allUsers', JSON.stringify(allUsers));

// Send welcome email
emailService.sendAccountCreationEmail(newUser);
showToast('Account created! Check your email.', 'success');
```

### Handle Login with OTP

```javascript
// Step 1: Verify credentials
const user = allUsers.find(u => u.email === email && u.password === password);

if (user) {
  // Step 2: Send OTP
  const otpResult = emailService.sendOTP(email, 'login');
  sessionStorage.setItem('otpEmail', email);
  sessionStorage.setItem('otpExpiry', otpResult.expiryTime);
  
  // Step 3: Send login notification
  emailService.sendLoginNotificationEmail(email, 'Web Browser');
  
  // Step 4: Redirect to OTP verification
  window.location.href = 'otp-verification.html';
}
```

### Verify OTP and Create Session

```javascript
function verifyOTP(e) {
  e.preventDefault();
  const code = getOTPCode();
  
  // Verify with email service
  const result = emailService.verifyOTP(otpEmail, code);
  
  if (result.success) {
    // Find or create user
    const user = allUsers.find(u => u.email === otpEmail) || {
      firstName: 'User',
      email: otpEmail,
      createdAt: new Date().toISOString()
    };
    
    // Set as current user
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Redirect
    window.location.href = 'account.html';
  }
}
```

---

## 📞 Support & Contact

For issues with the email system:
- Email: support@cryptovest.com
- Support Page: [customer-service.html](customer-service.html)
- Email History: [email-history.html](email-history.html)

---

## 📋 Summary

The CryptoVest Email & OTP System provides:
- ✅ Secure OTP-based authentication
- ✅ Professional email templates
- ✅ Email history tracking
- ✅ Automatic notifications
- ✅ Account creation confirmations
- ✅ Login alerts
- ✅ Password reset flows
- ✅ Settings change notifications
- ✅ Security event alerts
- ✅ Transaction confirmations

**All data is stored locally in localStorage/sessionStorage for demo purposes. Production deployment requires a real email service provider.**
