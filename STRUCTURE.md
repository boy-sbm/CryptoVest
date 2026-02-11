# 📂 Quick Folder Structure Reference

## Current Organization (✅ Final)

```
CryproVest/
│
├── 📄 index.html              ← Entry point (redirects to pages/)
├── 📄 .gitignore              ← Git configuration
├── 📄 .htaccess               ← Web server config (Apache)
│
├── 📁 pages/                  ← All HTML pages
│   ├── index.html             (Homepage)
│   ├── register.html          (Sign up)
│   ├── login.html             (Sign in)
│   ├── account.html           (Dashboard)
│   ├── forgot-password.html   (Password reset)
│   ├── email-history.html     (Email logs)
│   ├── customer-service.html  (Support)
│   ├── privacy-policy.html    (Legal)
│   ├── terms-of-service.html  (Legal)
│   └── 404.html               (Error page)
│
├── 📁 assets/                 ← Static files
│   ├── 📁 css/
│   │   └── style.css          (Main styles)
│   ├── 📁 js/
│   │   └── script.js          (Main script)
│   └── 📁 images/
│       └── logo.png           (Logo)
│
└── 📁 docs/                   ← Documentation
    ├── README.md
    ├── START_HERE.md
    ├── SYSTEM_STATUS.md
    ├── GET_STARTED.md
    ├── FOLDER_REORGANIZATION.md
    ├── EMAILJS_SETUP.md
    ├── EMAILJS_CONFIG.md
    ├── REAL_EMAIL_INTEGRATION.md
    ├── IMPLEMENTATION_CHECKLIST.md
    ├── TESTING_GUIDE.md
    ├── FEATURES.md
    ├── EMAIL_SYSTEM.md
    ├── EMAIL_OTP_SUMMARY.md
    ├── WHAT_CHANGED.md
    ├── OTP_FIX_GUIDE.md
    ├── INDEX.md
    └── QUICK_REFERENCE.md
```

---

## 🔗 File References

### From HTML Pages (in pages/)
```
To CSS:    href="../assets/css/style.css"
To JS:     src="../assets/js/script.js"
To Pages:  href="login.html" (relative to same folder)
```

### From Root (index.html)
```
Redirects to: /pages/index.html
```

### From Script (assets/js/script.js)
```
Current document location: pages/*.html (when running)
Password reset link: /pages/forgot-password.html
Navigation: using relative paths (account.html, register.html)
```

---

## 📊 File Count Summary

| Category | Count | Location |
|----------|-------|----------|
| HTML Pages | 10 | pages/ |
| Stylesheets | 1 | assets/css/ |
| Scripts | 1 | assets/js/ |
| Images | 1 | assets/images/ |
| Documentation | 16 | docs/ |
| Config Files | 3 | root |
| **Total** | **32** | |

---

## 🎯 Key Entry Points

1. **For Users**: http://yourdomain.com/ → pages/index.html
2. **For Development**: Open pages/index.html in browser
3. **For Admin**: Check docs/ for all documentation
4. **For Email**: Configure assets/js/script.js (lines 3-4)

---

## ✅ Status: Production Ready

All files organized, paths updated, and configurations set up.
Ready for deployment! 🚀
