// ============ EMAIL SERVICE SYSTEM WITH EMAILJS ============
class EmailService {
  constructor() {
    this.emails = JSON.parse(localStorage.getItem('emailHistory')) || [];
    
    // ⚠️ IMPORTANT: Replace these with YOUR actual EmailJS credentials
    // Get them from: https://dashboard.emailjs.com/
    this.serviceId = 'service_iiyoenq';  // From EmailJS Dashboard > Email Services
    this.templateIds = {
      welcome: 'template_welcome',
      login: 'template_login',
      passwordReset: 'template_reset',
      settingsChange: 'template_settings',
      security: 'template_security',
      transaction: 'template_transaction'
    };
    this.publicKey = 'LebSD2dEo2Adjs6oh'; // From EmailJS Dashboard > Account > Public Key
    
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
      emailjs.init(this.publicKey);
    }
  }

  // Send account creation email
  async sendAccountCreationEmail(user) {
    const templateParams = {
      to_email: user.email,
      user_name: user.firstName,
      user_email: user.email,
      created_date: new Date().toLocaleString()
    };
    
    return await this.sendRealEmail(user.email, 'Welcome to CryptoVest', this.templateIds.welcome, templateParams);
  }

  // Send login notification email
  async sendLoginNotificationEmail(email, userAgent = 'Web Browser') {
    const templateParams = {
      to_email: email,
      device: userAgent,
      login_time: new Date().toLocaleString()
    };
    
    return await this.sendRealEmail(email, 'New Login to Your CryptoVest Account', this.templateIds.login, templateParams);
  }

  // Send password reset email
  async sendPasswordResetEmail(email, resetToken) {
    const resetLink = `${window.location.origin}/pages/forgot-password.html?token=${resetToken}&email=${email}`;
    const templateParams = {
      to_email: email,
      reset_link: resetLink
    };
    
    return await this.sendRealEmail(email, 'Reset Your CryptoVest Password', this.templateIds.passwordReset, templateParams);
  }

  // Send settings change confirmation
  async sendSettingsChangeEmail(email, changes) {
    const changesList = Array.isArray(changes) ? changes.join(', ') : changes;
    const templateParams = {
      to_email: email,
      changes: changesList,
      change_time: new Date().toLocaleString()
    };
    
    return await this.sendRealEmail(email, 'Account Settings Changed', this.templateIds.settingsChange, templateParams);
  }

  // Send security alert email
  async sendSecurityAlertEmail(email, alertType, details) {
    const templateParams = {
      to_email: email,
      alert_type: alertType,
      alert_details: details,
      alert_time: new Date().toLocaleString()
    };
    
    return await this.sendRealEmail(email, 'Security Alert - CryptoVest', this.templateIds.security, templateParams);
  }

  // Send transaction email
  async sendTransactionEmail(email, transaction) {
    const templateParams = {
      to_email: email,
      transaction_type: transaction.type,
      transaction_amount: transaction.amount,
      transaction_value: transaction.value,
      transaction_date: new Date().toLocaleString()
    };
    
    return await this.sendRealEmail(email, 'Transaction Confirmation', this.templateIds.transaction, templateParams);
  }

  // Main email sender using EmailJS (real email)
  async sendRealEmail(to, subject, templateId, templateParams) {
    try {
      if (typeof emailjs === 'undefined') {
        console.warn('EmailJS not loaded. Using fallback storage.');
        return this.storeEmailLocally(to, subject, templateParams);
      }

      const response = await emailjs.send(
        this.serviceId,
        templateId,
        templateParams
      );

      console.log(`✓ Email sent successfully to ${to}: ${subject}`, response);
      this.storeEmailLocally(to, subject, templateParams);
      showToast(`Email sent to ${to}`, 'success');
      return { success: true, messageId: response.status };
    } catch (error) {
      console.error(`✗ Failed to send email to ${to}:`, error);
      showToast(`Failed to send email: ${error.text || error.message}`, 'error');
      // Still store locally for history
      this.storeEmailLocally(to, subject, templateParams);
      return { success: false, error: error.text };
    }
  }

  // Store email in local history (for viewing)
  storeEmailLocally(to, subject, params) {
    const emailRecord = {
      id: Date.now(),
      to: to,
      subject: subject,
      params: params,
      timestamp: new Date().toISOString(),
      status: 'sent',
      type: this.classifyEmailType(subject)
    };

    this.emails.push(emailRecord);
    localStorage.setItem('emailHistory', JSON.stringify(this.emails));
    return emailRecord;
  }

  // Classify email type
  classifyEmailType(subject) {
    if (subject.includes('Welcome') || subject.includes('Account Created')) return 'welcome';
    if (subject.includes('Login')) return 'login';
    if (subject.includes('Password') || subject.includes('Reset')) return 'password-reset';
    if (subject.includes('Settings')) return 'settings-change';
    if (subject.includes('Security')) return 'security';
    if (subject.includes('Transaction')) return 'transaction';
    return 'other';
  }

  // Email Templates

  generateWelcomeTemplate(user) {
    return `
      <div style="font-family: Arial, sans-serif; background: #0a0a0a; padding: 20px; color: #ddd;">
        <div style="max-width: 600px; margin: 0 auto; background: #111; border: 2px solid #FFD700; border-radius: 10px; padding: 30px;">
          <h2 style="color: #FFD700; text-align: center; margin: 0 0 20px 0;">CryptoVest</h2>
          <h3 style="color: #FFD700; text-align: center;">Welcome ${user.firstName}! 🎉</h3>
          
          <p style="color: #ccc; margin: 15px 0;">Your account has been successfully created!</p>
          
          <div style="background: #1a1a1a; border-left: 4px solid #FFD700; padding: 15px; margin: 20px 0;">
            <p style="color: #FFD700; margin: 5px 0;"><strong>Account Details:</strong></p>
            <p style="color: #ccc; margin: 5px 0;">📧 Email: ${user.email}</p>
            <p style="color: #ccc; margin: 5px 0;">👤 Name: ${user.firstName} ${user.lastName}</p>
            <p style="color: #ccc; margin: 5px 0;">📅 Created: ${new Date().toLocaleString()}</p>
          </div>
          
          <p style="color: #ccc; margin: 15px 0;"><strong>What's Next?</strong></p>
          <ul style="color: #ccc; margin: 15px 0;">
            <li>Complete your profile</li>
            <li>Enable two-factor authentication</li>
            <li>Make your first cryptocurrency investment</li>
          </ul>
          
          <p style="color: #ccc; margin: 15px 0;">If you have any questions, contact our support team at support@cryptovest.com</p>
          
          <hr style="border: 1px solid #333; margin: 20px 0;">
          <p style="color: #999; text-align: center; font-size: 12px;">© 2026 CryptoVest. All rights reserved.</p>
        </div>
      </div>
    `;
  }

  generateLoginNotificationTemplate(email, device) {
    return `
      <div style="font-family: Arial, sans-serif; background: #0a0a0a; padding: 20px; color: #ddd;">
        <div style="max-width: 600px; margin: 0 auto; background: #111; border: 2px solid #FFD700; border-radius: 10px; padding: 30px;">
          <h2 style="color: #FFD700; text-align: center; margin: 0 0 20px 0;">CryptoVest</h2>
          <h3 style="color: #FFD700; text-align: center;">New Login Detected</h3>
          
          <p style="color: #ccc; margin: 15px 0;">A new login to your account has been detected.</p>
          
          <div style="background: #1a1a1a; border-left: 4px solid #FFD700; padding: 15px; margin: 20px 0;">
            <p style="color: #FFD700; margin: 5px 0;"><strong>Login Details:</strong></p>
            <p style="color: #ccc; margin: 5px 0;">🕐 Time: ${new Date().toLocaleString()}</p>
            <p style="color: #ccc; margin: 5px 0;">📱 Device: ${device}</p>
            <p style="color: #ccc; margin: 5px 0;">📍 IP: 192.168.1.1 (Simulated)</p>
          </div>
          
          <p style="color: #ccc; margin: 15px 0;"><strong>If this wasn't you,</strong> please:</p>
          <ol style="color: #ccc; margin: 15px 0;">
            <li>Change your password immediately</li>
            <li>Enable two-factor authentication</li>
            <li>Contact our support team</li>
          </ol>
          
          <p style="color: #999; margin: 15px 0; font-size: 12px;">⚠️ We never ask for your password via email. Do not share your credentials.</p>
          
          <hr style="border: 1px solid #333; margin: 20px 0;">
          <p style="color: #999; text-align: center; font-size: 12px;">© 2026 CryptoVest. All rights reserved.</p>
        </div>
      </div>
    `;
  }

  generatePasswordResetTemplate(email, token) {
    const resetLink = `https://cryptovest.com/reset?token=${token}&email=${email}`;
    return `
      <div style="font-family: Arial, sans-serif; background: #0a0a0a; padding: 20px; color: #ddd;">
        <div style="max-width: 600px; margin: 0 auto; background: #111; border: 2px solid #FFD700; border-radius: 10px; padding: 30px;">
          <h2 style="color: #FFD700; text-align: center; margin: 0 0 20px 0;">CryptoVest</h2>
          <h3 style="color: #FFD700; text-align: center;">Password Reset Request</h3>
          
          <p style="color: #ccc; margin: 15px 0;">You've requested to reset your password. Click the button below to proceed:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background: linear-gradient(135deg, #FFD700, #FFC700); color: #000; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
          </div>
          
          <p style="color: #999; margin: 15px 0; font-size: 12px;">⏰ This link expires in 1 hour</p>
          
          <p style="color: #ccc; margin: 15px 0;">If you didn't request this, please ignore this email. Your account is safe.</p>
          
          <p style="color: #999; margin: 15px 0; font-size: 12px;">Don't click the link if you didn't request a password reset.</p>
          
          <hr style="border: 1px solid #333; margin: 20px 0;">
          <p style="color: #999; text-align: center; font-size: 12px;">© 2026 CryptoVest. All rights reserved.</p>
        </div>
      </div>
    `;
  }

  generateSettingsChangeTemplate(email, changes) {
    const changesList = changes.map(c => `<li style="color: #ccc; margin: 5px 0;">✓ ${c}</li>`).join('');
    return `
      <div style="font-family: Arial, sans-serif; background: #0a0a0a; padding: 20px; color: #ddd;">
        <div style="max-width: 600px; margin: 0 auto; background: #111; border: 2px solid #FFD700; border-radius: 10px; padding: 30px;">
          <h2 style="color: #FFD700; text-align: center; margin: 0 0 20px 0;">CryptoVest</h2>
          <h3 style="color: #FFD700; text-align: center;">Account Settings Changed</h3>
          
          <p style="color: #ccc; margin: 15px 0;">Your account settings have been updated.</p>
          
          <div style="background: #1a1a1a; border-left: 4px solid #FFD700; padding: 15px; margin: 20px 0;">
            <p style="color: #FFD700; margin: 5px 0;"><strong>Changes Made:</strong></p>
            <ul style="margin: 10px 0; padding-left: 20px;">${changesList}</ul>
            <p style="color: #ccc; margin: 5px 0;">📅 Time: ${new Date().toLocaleString()}</p>
          </div>
          
          <p style="color: #ccc; margin: 15px 0;">If this wasn't you, please reset your password immediately.</p>
          
          <hr style="border: 1px solid #333; margin: 20px 0;">
          <p style="color: #999; text-align: center; font-size: 12px;">© 2026 CryptoVest. All rights reserved.</p>
        </div>
      </div>
    `;
  }

  generateSecurityAlertTemplate(email, alertType, details) {
    return `
      <div style="font-family: Arial, sans-serif; background: #0a0a0a; padding: 20px; color: #ddd;">
        <div style="max-width: 600px; margin: 0 auto; background: #111; border: 2px solid #dc3545; border-radius: 10px; padding: 30px;">
          <h2 style="color: #FFD700; text-align: center; margin: 0 0 20px 0;">CryptoVest</h2>
          <h3 style="color: #dc3545; text-align: center;">⚠️ Security Alert</h3>
          
          <p style="color: #ccc; margin: 15px 0;">A security event has been detected on your account:</p>
          
          <div style="background: #1a1a1a; border-left: 4px solid #dc3545; padding: 15px; margin: 20px 0;">
            <p style="color: #dc3545; margin: 5px 0;"><strong>Alert Type:</strong> ${alertType}</p>
            <p style="color: #ccc; margin: 5px 0;"><strong>Details:</strong> ${details}</p>
            <p style="color: #ccc; margin: 5px 0;">📅 Time: ${new Date().toLocaleString()}</p>
          </div>
          
          <p style="color: #ccc; margin: 15px 0;"><strong>Recommended Actions:</strong></p>
          <ul style="color: #ccc; margin: 15px 0;">
            <li>Review your account activity</li>
            <li>Change your password if necessary</li>
            <li>Enable two-factor authentication</li>
            <li>Contact support if suspicious</li>
          </ul>
          
          <hr style="border: 1px solid #333; margin: 20px 0;">
          <p style="color: #999; text-align: center; font-size: 12px;">© 2026 CryptoVest. All rights reserved.</p>
        </div>
      </div>
    `;
  }

  generateTransactionTemplate(email, transaction) {
    return `
      <div style="font-family: Arial, sans-serif; background: #0a0a0a; padding: 20px; color: #ddd;">
        <div style="max-width: 600px; margin: 0 auto; background: #111; border: 2px solid #FFD700; border-radius: 10px; padding: 30px;">
          <h2 style="color: #FFD700; text-align: center; margin: 0 0 20px 0;">CryptoVest</h2>
          <h3 style="color: #FFD700; text-align: center;">Transaction Confirmation</h3>
          
          <div style="background: #1a1a1a; border-left: 4px solid #FFD700; padding: 15px; margin: 20px 0;">
            <p style="color: #FFD700; margin: 5px 0;"><strong>Transaction Details:</strong></p>
            <p style="color: #ccc; margin: 5px 0;">💱 Type: ${transaction.type}</p>
            <p style="color: #ccc; margin: 5px 0;">📊 Amount: ${transaction.amount}</p>
            <p style="color: #ccc; margin: 5px 0;">💰 Value: $${transaction.value}</p>
            <p style="color: #ccc; margin: 5px 0;">📅 Date: ${new Date().toLocaleString()}</p>
            <p style="color: #ccc; margin: 5px 0;">🔗 Status: Completed</p>
          </div>
          
          <p style="color: #ccc; margin: 15px 0;">Your transaction has been successfully processed.</p>
          
          <hr style="border: 1px solid #333; margin: 20px 0;">
          <p style="color: #999; text-align: center; font-size: 12px;">© 2026 CryptoVest. All rights reserved.</p>
        </div>
      </div>
    `;
  }

  // Get email history
  getEmailHistory(email = null) {
    if (email) {
      return this.emails.filter(e => e.to === email);
    }
    return this.emails;
  }

  // Get emails by type
  getEmailsByType(type) {
    return this.emails.filter(e => e.type === type);
  }
}

// Initialize email service
const emailService = new EmailService();

// ============ TOAST NOTIFICATION SYSTEM ============
function showToast(message, type = 'info', duration = 3000) {
  // Create toast container if it doesn't exist
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      font-family: Arial, sans-serif;
    `;
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  const colors = {
    success: '#0a7a33',
    error: '#dc3545',
    warning: '#ffc107',
    info: '#0d6efd'
  };

  toast.style.cssText = `
    background: ${colors[type] || colors.info};
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    margin-bottom: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    animation: slideIn 0.3s ease-in-out;
    font-weight: 500;
  `;
  toast.textContent = `${icons[type]} ${message}`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-in-out';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Add CSS animations for toast
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .loading {
    display: inline-block;
    animation: spin 1s linear infinite;
  }
`;
document.head.appendChild(style);

// ============ REGISTRATION FORM ============
const registerForm = document.getElementById('registerForm');
const registerMsg = document.getElementById('registerMsg');

if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const firstName = document.getElementById('firstName')?.value || document.getElementById('name')?.value;
    const lastName = document.getElementById('lastName')?.value || '';
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    // Check if email already registered
    const allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
    if (allUsers.some(u => u.email === email)) {
      showToast('Email already registered. Please sign in or use a different email.', 'error');
      return;
    }

    // Save user
    const newUser = {
      firstName,
      lastName,
      email,
      password,
      balance: 0,
      createdAt: new Date().toISOString()
    };

    allUsers.push(newUser);
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
    emailService.sendAccountCreationEmail(newUser);
    
      // Set current user and redirect to dashboard
      localStorage.setItem('currentUser', JSON.stringify(newUser));
    
      showToast(`Welcome ${firstName}! Your account has been created.`, 'success');
    
      // Redirect to dashboard
    setTimeout(() => {
        window.location.href = 'account.html';
    }, 1500);
  });
}



// Initialize account page variables (will be null if not on account page)
const userNameSpan = document.getElementById('userName');
const balanceSpan = document.getElementById('totalBalance');
const depositBtn = document.getElementById('depositBtn');
const withdrawBtn = document.getElementById('withdrawBtn');

// Only execute if on account page
if (userNameSpan || balanceSpan || depositBtn || withdrawBtn) {
  const currentUser = localStorage.getItem('currentUser');
  const user = currentUser ? JSON.parse(currentUser) : null;
  const loggedIn = !!currentUser;

  if (!loggedIn || !user) {
    // If not logged in, redirect to register page
    if (window.location.pathname.includes('account.html')) {
      window.location.href = 'register.html';
    }
  } else if (userNameSpan) {
    // Display user info
    userNameSpan.textContent = user.firstName || user.name;
    if (balanceSpan) {
      balanceSpan.textContent = `$${(user.balance || 0).toFixed(2)}`;
    }
  }

  // Deposit BTC - removed prompt, now redirects to deposit page
  if (depositBtn) {
    depositBtn.addEventListener('click', () => {
      window.location.href = 'pages/deposit.html';
    });
  }

  // Withdraw BTC - removed prompt, now redirects to withdrawal page
  if (withdrawBtn) {
    withdrawBtn.addEventListener('click', () => {
      window.location.href = 'pages/withdraw.html';
    });
  }
}

