# CryptoVest - Cryptocurrency Investment Platform

A professional, modern, and secure cryptocurrency investment platform built with HTML5, CSS3, and Vanilla JavaScript.

## 🚀 Features

### User Management
- **User Registration** - Secure registration with email validation and password strength checking
- **User Login** - Secure login system with remember me functionality
- **Password Recovery** - Forgot password page with reset flow
- **Profile Settings** - Comprehensive settings modal with multiple tabs

### Dashboard Features
- **Portfolio Overview** - Real-time portfolio summary with balance, gains/losses, and ROI
- **Portfolio Chart** - Interactive Chart.js visualization of 30-day performance
- **Holdings Tracker** - Display of cryptocurrency holdings (BTC, ETH, etc.)
- **Quick Actions** - Deposit, Withdraw, Buy Crypto buttons
- **Account Statistics** - Display of account metrics and performance
- **Recent Transactions** - Transaction history table
- **Security Settings** - 2FA, password management, email verification

### Additional Pages
- **Homepage** - Professional landing page with hero section, features, testimonials
- **Customer Service** - FAQ section, contact form, support options
- **Privacy Policy** - Comprehensive privacy protection information
- **Terms of Service** - Legal terms and conditions
- **404 Error Page** - Friendly error handling for missing pages

### Technical Features
- **Authentication** - Client-side localStorage-based authentication
- **Toast Notifications** - Real-time user feedback system
- **Form Validation** - Email, password strength, and field validation
- **Responsive Design** - Mobile-friendly layout for all devices
- **Dark Theme** - Professional black and gold color scheme
- **Animations** - Loading spinners, fade-ins, and transitions
- **Local Storage** - Data persistence across browser sessions

## 📁 File Structure

```
CryptoVest/
├── index.html              # Entry point (redirects to pages/index.html)
├── pages/                  # HTML pages
│   ├── index.html          # Homepage with features and testimonials
│   ├── register.html       # User registration page
│   ├── login.html          # User login page
│   ├── account.html        # Dashboard and main user interface
│   ├── customer-service.html # Support and FAQ page
│   ├── privacy-policy.html   # Privacy policy page
│   ├── terms-of-service.html # Terms and conditions page
│   ├── forgot-password.html  # Password recovery page
│   ├── email-history.html    # Email tracking page
│   └── 404.html             # Error page
├── assets/                 # Static assets
│   ├── css/
│   │   └── style.css      # Global styles and animations
│   ├── js/
│   │   └── script.js      # JavaScript functionality
│   └── images/
│       └── logo.png       # Logo asset
├── docs/                   # Documentation files
│   ├── README.md          # Project overview
│   ├── START_HERE.md      # Quick start guide
│   ├── SYSTEM_STATUS.md   # Current system status
│   └── *.md               # Additional documentation
└── .gitignore             # Git ignore file
```

## 🎨 Design System

### Colors
- **Primary Gold**: #FFD700 (Accent, buttons, headers)
- **Secondary Gold**: #FFC700 (Gradients, highlights)
- **Dark Background**: #000 (Primary background)
- **Light Dark**: #111, #1a1a1a (Sections, cards)
- **Text**: #ddd, #ccc, #999 (Primary to secondary text)

### Typography
- **Font Family**: Arial, sans-serif
- **Button Text**: Bold, 16px
- **Headings**: 28-120px depending on level
- **Body Text**: 14-18px

### Spacing & Layout
- **Padding**: 20px - 60px
- **Margins**: 15px - 40px
- **Border Radius**: 5px - 10px
- **Grid Layout**: Auto-fit columns for responsive design

## 🔐 Security Features

### Authentication
- Email validation on registration
- Password strength requirements (8+ chars, uppercase, lowercase, numbers, special chars)
- Password confirmation matching
- Secure localStorage management
- Automatic redirect for unauthenticated users

### User Data Protection
- No transmission of sensitive data to external servers (demo purposes)
- Client-side password hashing ready (not implemented in demo)
- 2FA toggle option
- Session management with "Remember Me"

## 📱 Responsive Breakpoints

- **Desktop**: Full layout with 2-column designs
- **Tablet**: 1000px and below - Adjusted grid layouts
- **Mobile**: 768px and below - Stack layout, smaller fonts

## 🎯 User Flow

1. **New User**: Register → Login → Dashboard
2. **Returning User**: Login → Dashboard
3. **Forgotten Password**: Forgot Password → Reset Email → New Password → Login
4. **Settings**: Dashboard → Settings Button → Settings Modal → Profile/Security/Notifications/Payment/Privacy Tabs
5. **Support**: Any Page → Support Link → Customer Service Page

## 🚀 Getting Started

### Prerequisites
- Web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime, etc.)
- No server required (client-side only)

### Installation

1. Clone or download the project files
2. Open `index.html` in your web browser
3. Create an account to access the dashboard
4. Explore all features!

### Demo Credentials

The application uses localStorage, so any credentials you create are stored locally:
- Create a new account in the registration page
- Use the credentials to log in

## 💾 Data Storage

All user data is stored in browser localStorage:
- `currentUser` - Currently logged-in user
- `allUsers` - Array of all registered users
- `resetRequests` - Password reset requests

**Note**: Data persists only in the current browser. Clearing browser data will delete all stored information.

## 📊 Portfolio Data

Sample portfolio data includes:
- **Bitcoin (BTC)**: 0.5 BTC (~$25,000)
- **Ethereum (ETH)**: 5 ETH (~$10,000)
- **Portfolio Value**: ~$35,000
- **30-Day Gain**: ~$2,500 (7.2%)

## 🎨 Customization

### Change Color Scheme
Edit the color variables in `style.css`:
```css
/* Primary: #FFD700 (Gold) */
/* Dark: #000, #111, #1a1a1a */
```

### Modify Dashboard Data
Edit the sample data in `account.html` JavaScript section:
```javascript
// Edit portfolio values and holdings
const sampleHoldings = [
  { symbol: 'BTC', amount: 0.5, value: 25000 },
  { symbol: 'ETH', amount: 5, value: 10000 }
];
```

### Update Company Information
Replace "CryptoVest" with your platform name throughout all files.

## 📈 Future Enhancements

- [ ] Backend API integration
- [ ] Real cryptocurrency data (CoinGecko API)
- [ ] Real-time price charts
- [ ] Automated trading
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Mobile app version
- [ ] WebSocket for real-time updates
- [ ] User referral program
- [ ] Advanced portfolio analytics

## ⚠️ Disclaimer

This is a **demonstration/prototype** of a cryptocurrency investment platform. It is **NOT** a real investment platform and should **NOT** be used for actual cryptocurrency transactions. 

**Features are for demonstration only:**
- No real cryptocurrency transactions
- Client-side data storage only
- No real payment processing
- No actual blockchain integration

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest improvements
- Submit pull requests
- Share feedback

## 📞 Support

For support, contact: support@cryptovest.com or visit the Customer Service page in the platform.

## 👨‍💻 Created By

CryptoVest Development Team
Built with ❤️ using HTML5, CSS3, and Vanilla JavaScript

---

**Last Updated**: February 7, 2026
**Version**: 2.0
