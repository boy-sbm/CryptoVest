# Email & OTP System - Testing Guide

**Test Date**: February 7, 2026
**System**: CryptoVest Email Service v1.0

---

## 🧪 Quick Start Testing

### Test Account Credentials
- **Email**: demo@cryptovest.com
- **Password**: Demo123!@#

---

## ✅ Test Case 1: Complete User Registration with Welcome Email

### Steps
1. Open `register.html` in browser
2. Fill registration form:
   - First Name: John
   - Last Name: Crypto
   - Email: john.crypto@test.com
   - Password: SecurePass123!
   - Confirm Password: SecurePass123!
3. Click "Create Account"
4. Should see success toast: "Account created! Check your email"
5. Redirects to login.html

### Expected Results
✓ Welcome email in localStorage
✓ User saved to allUsers array
✓ Toast notification shows
✓ Redirects to login page

### Verify Email
1. Go to `email-history.html`
2. Filter by "Welcome"
3. Should see email to john.crypto@test.com
4. Click to view full email template

---

## ✅ Test Case 2: Login with OTP Verification

### Steps
1. Go to `login.html`
2. Enter credentials:
   - Email: john.crypto@test.com
   - Password: SecurePass123!
3. Check "Remember me"
4. Click "Sign In"
5. Should see toast: "OTP sent to your email!"
6. Redirects to `otp-verification.html`

### Expected Results
✓ OTP email sent
✓ Login notification email sent
✓ Redirects to OTP page
✓ Email & expiry stored in sessionStorage
✓ Toast shows countdown timer

### Verify OTP
1. Check Email History for "OTP" type emails
2. Click OTP email to view code
3. Copy 6-digit code from email template
4. Enter code in OTP input fields
5. Should auto-advance to next field
6. Can also paste entire code
7. Click "Verify OTP"

### Expected Results
✓ OTP verified successfully
✓ Success toast shows
✓ currentUser created from allUsers
✓ Redirects to account.html
✓ Should see dashboard with user name

---

## ✅ Test Case 3: OTP Expiry & Resend

### Steps
1. On OTP verification page, note the timer
2. Click "Resend OTP" button
3. Should show 30-second cooldown
4. Can view new OTP in Email History
5. Enter new OTP
6. If wait 10+ minutes, OTP expires

### Expected Results
✓ Timer shows countdown
✓ Timer turns yellow at 60s
✓ Timer turns red when expired
✓ "Resend OTP" button disabled during cooldown
✓ Can resend without restrictions after cooldown
✓ New OTP code generated

### Test Expiry
1. Start OTP verification
2. Open browser DevTools (F12)
3. Go to Application → sessionStorage
4. Find "otpExpiry" timestamp
5. Click to edit, subtract 1 minute
6. Refresh page or wait
7. Timer should show ~9 minutes

---

## ✅ Test Case 4: OTP Failed Attempts

### Steps
1. On OTP verification page
2. Enter wrong code (e.g., 000000)
3. Click "Verify OTP"
4. Should see error: "Invalid OTP. 4 attempts remaining."
5. Repeat 4 more times
6. On 5th attempt, should see: "Too many attempts. Request new OTP"
7. Try clicking Verify again
8. Should be blocked

### Expected Results
✓ Failed attempts counter increments
✓ Error message shows remaining attempts
✓ After 5 failures, OTP blocked
✓ Must resend OTP
✓ Old OTP data cleared from localStorage

---

## ✅ Test Case 5: Email History Filtering

### Steps
1. Login to account (skip OTP for testing)
2. Click "📧 Emails" in navigation
3. Go to Email History page
4. Should see statistics:
   - Total Emails
   - Welcome Emails
   - Login Alerts
   - OTP Codes
5. Filter buttons available:
   - All
   - Welcome
   - OTP
   - Login
   - Password Reset
   - Settings Change
   - Security
   - Transaction

### Test Filtering
1. Click "Welcome" filter
2. Should show only welcome emails
3. Click "OTP" filter
4. Should show only OTP emails
5. Click "All" to reset

### Expected Results
✓ Correct count in statistics
✓ Filtering works accurately
✓ Email types display correctly
✓ Icons match email types
✓ Timestamps are correct

---

## ✅ Test Case 6: View Email Details

### Steps
1. On Email History page
2. Click any email item
3. Modal popup should appear
4. Shows:
   - From: noreply@cryptovest.com
   - To: user@email.com
   - Date: Full timestamp
   - Type: email category
   - Full HTML template

### Expected Results
✓ Modal opens without errors
✓ All email details display
✓ HTML renders correctly
✓ Gold & black theme matches
✓ Professional formatting

### Test Modal Close
1. Click X button
2. Or click outside modal background
3. Modal should close
4. Should return to email list

---

## ✅ Test Case 7: Settings Email Notification

### Steps
1. Login to account (use OTP)
2. Click "Settings" button
3. Go to "Profile" tab
4. Edit fields:
   - Change First Name
   - Change Phone Number
5. Click "Save Changes"
6. Should see success toast

### Expected Results
✓ Settings updated in currentUser
✓ Settings change email sent
✓ Email appears in Email History
✓ Email shows list of changes
✓ Timestamp matches

### Verify Email
1. Go to Email History
2. Filter by "Settings Change"
3. Click email
4. Should show:
   - Changes Made: list of updated fields
   - Timestamp
   - Security notice

---

## ✅ Test Case 8: Login Notification Email

### Steps
1. Complete OTP login
2. Should receive login notification
3. Go to Email History

### Expected Results
✓ Login notification email in list
✓ Marked as "login" type
✓ Contains device info ("Web Browser")
✓ Shows timestamp
✓ Shows IP (simulated)
✓ Security instructions included

---

## ✅ Test Case 9: Password Reset Email

### Steps
1. Go to `login.html`
2. Click "Forgot Password?"
3. Redirects to `forgot-password.html`
4. Enter email address
5. Click "Send Reset Link"
6. Should see success message

### Expected Results
✓ Email sent to password-reset type
✓ Email appears in Email History
✓ Contains reset link
✓ 1-hour expiry mentioned
✓ Security warnings included

---

## ✅ Test Case 10: Mobile Responsiveness

### Steps
1. Open any email page in desktop
2. Open DevTools (F12)
3. Toggle Device Toolbar (Ctrl+Shift+M)
4. Test various screen sizes:
   - iPhone 12 (390px)
   - iPad (768px)
   - Desktop (1200px)

### Expected Results
✓ OTP inputs stack vertically on mobile
✓ Email history list responsive
✓ Modal responsive on small screens
✓ Buttons touch-friendly (44px+)
✓ Text readable on all sizes
✓ Navigation adapts

---

## 🔍 Debug Checklist

### localStorage Inspection
Open DevTools → Application → localStorage:
- [ ] `allUsers` - Contains registered users
- [ ] `currentUser` - Current logged-in user
- [ ] `emailHistory` - All emails sent
- [ ] `otpData` - Current OTP codes
- [ ] `rememberMe` - Email if remember checked

### sessionStorage Inspection
Open DevTools → Application → sessionStorage:
- [ ] `otpEmail` - Email awaiting OTP
- [ ] `otpExpiry` - Timestamp of expiry

### Console Checks
Open DevTools → Console:
- [ ] No JavaScript errors
- [ ] Email service initialization message
- [ ] OTP sent confirmation
- [ ] Email sent confirmation
- [ ] No undefined variable warnings

### Network Tab
1. Check email sending doesn't make actual requests
2. All operations should be client-side
3. No failed CORS requests

---

## 🧬 Data Structure Testing

### Email Object Format
```javascript
{
  id: 1707334800000,
  to: "user@example.com",
  subject: "Welcome to CryptoVest",
  body: "<html>...</html>",
  timestamp: "2026-02-07T15:30:00Z",
  status: "sent",
  type: "welcome"
}
```

### OTP Data Format
```javascript
{
  "user@example.com": {
    code: "123456",
    expiry: 1707334800000,
    attempts: 0,
    type: "login"
  }
}
```

### Verify Format
1. Open DevTools
2. Go to Application → localStorage
3. Click `emailHistory`
4. Copy value
5. Paste into JSON formatter to verify structure
6. Check all required fields present

---

## 📊 Performance Testing

### Page Load Times
- Email History: Should load < 500ms
- OTP Verification: Should load < 300ms
- Login page: Should load < 300ms

### Stress Testing
1. Create 20+ users
2. Generate 100+ emails
3. Check Email History loads without lag
4. Pagination not yet implemented (consider for future)

### Memory Usage
1. Open DevTools → Memory
2. Take heap snapshot
3. Create user and generate emails
4. Check for memory leaks
5. Close pages and verify memory released

---

## 🚀 Integration Testing

### Complete User Journey
1. ✓ Register new account
2. ✓ Receive welcome email
3. ✓ Login with email/password
4. ✓ Receive OTP
5. ✓ Verify OTP
6. ✓ Access dashboard
7. ✓ See login notification
8. ✓ Update settings
9. ✓ Receive settings confirmation
10. ✓ View all emails in history
11. ✓ Logout

### Expected Result
All 11 steps complete without errors.

---

## ⚠️ Error Cases to Test

### Invalid Inputs
- [ ] Empty email field → Error message
- [ ] Invalid email format → Error message
- [ ] Password mismatch → Error message
- [ ] Too few password characters → Validation

### OTP Errors
- [ ] Non-numeric input → Not allowed
- [ ] Less than 6 digits → Error message
- [ ] Wrong code → "Invalid OTP" message
- [ ] After 5 failures → Blocked

### Edge Cases
- [ ] Submit form multiple times → Prevent duplicate
- [ ] Refresh page during OTP → Should persist
- [ ] Go back/forward in browser → Handle gracefully
- [ ] Copy-paste OTP → Should auto-fill
- [ ] Close browser and reopen → Require new OTP

---

## 📋 Test Results Template

```
Test Case: [Name]
Date: [Date]
Tester: [Name]
Status: [PASS/FAIL]

Steps Taken:
1. 
2. 
3. 

Expected Result:

Actual Result:

Issues Found:

Notes:
```

---

## 🎯 Success Criteria

All tests pass when:
- ✅ Emails are created and stored
- ✅ OTP codes are generated correctly
- ✅ OTP verification works
- ✅ Email history displays properly
- ✅ All templates render correctly
- ✅ Navigation works between pages
- ✅ No JavaScript errors in console
- ✅ localStorage data persists
- ✅ Mobile design is responsive
- ✅ Toasts show notifications

---

## 📞 Reporting Issues

If you find a bug:
1. Note the exact steps to reproduce
2. Include browser name and version
3. Check console for errors
4. Check localStorage data
5. Take screenshot if possible
6. Report to: support@cryptovest.com

---

**Last Updated**: February 7, 2026
**Test Version**: 1.0
**System Status**: ✅ Ready for Testing
