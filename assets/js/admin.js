// Simple client-side admin protection. Change ADMIN_PASS before publishing.
const ADMIN_PASS = "admin123";

const dataPaths = {
  users: '../data/users.json',
  complaints: '../data/complaints.json'
};

// In-memory state so the admin can interact without persisting to server
const adminState = {
  users: [],
  complaints: [],
  selectedComplaintId: null
};

document.addEventListener('DOMContentLoaded', () => {
  const loginBox = document.getElementById('login-box');
  const dashboard = document.getElementById('dashboard');
  const loginBtn = document.getElementById('login-btn');
  const signoutBtn = document.getElementById('signout-btn');
  const status = document.getElementById('admin-status');

  function showDashboard() {
    loginBox.classList.add('hidden');
    dashboard.classList.remove('hidden');
    status.textContent = 'Signed in as admin';
    document.getElementById('signout-btn').classList.remove('hidden');
    loadData();
  }

  function hideDashboard() {
    loginBox.classList.remove('hidden');
    dashboard.classList.add('hidden');
    status.textContent = 'Not signed in';
  }

  loginBtn.addEventListener('click', () => {
    const pass = document.getElementById('admin-pass').value;
    if (pass === ADMIN_PASS) {
      showDashboard();
    } else {
      alert('Incorrect password. Update assets/js/admin.js to change the admin password.');
    }
  });

  signoutBtn.addEventListener('click', () => {
    hideDashboard();
    document.getElementById('admin-pass').value = '';
  });

  async function fetchJSON(path) {
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error('Fetch failed');
      return await res.json();
    } catch (e) {
      return null;
    }
  }

  function tableFromArray(arr, keys) {
    if (!Array.isArray(arr)) return '<p>No data</p>';
    let html = '<table><thead><tr>' + keys.map(k => `<th>${k}</th>`).join('') + '</tr></thead><tbody>';
    for (const row of arr) {
      html += '<tr>' + keys.map(k => `<td>${(row[k] !== undefined) ? String(row[k]) : ''}</td>`).join('') + '</tr>';
    }
    html += '</tbody></table>';
    return html;
  }

  async function loadData() {
    const users = await fetchJSON(dataPaths.users) || [];
    const complaints = await fetchJSON(dataPaths.complaints) || [];

    // Load users from static file and merge with any localStorage users
    const localUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    // Prefer local storage records when available
    const mergedUsers = users.map(u => {
      const lu = localUsers.find(x => x.email === u.email || x.username === u.username);
      return lu ? Object.assign({}, u, lu) : u;
    });
    // Append any local users not in static file
    localUsers.forEach(lu => {
      if (!mergedUsers.find(m => m.email === lu.email || m.username === lu.username)) mergedUsers.push(lu);
    });

    adminState.users = mergedUsers;
    adminState.complaints = complaints;
    adminState.deposits = JSON.parse(localStorage.getItem('deposits') || '[]');
    adminState.withdrawals = JSON.parse(localStorage.getItem('withdrawals') || '[]');

    renderUsers();
    renderComplaints();

    const searchInput = document.getElementById('user-search');
    searchInput.addEventListener('input', (e) => filterUsers(e.target.value));

    document.getElementById('download-users').onclick = () => downloadJSON(adminState.users, 'users.json');
    document.getElementById('download-complaints').onclick = () => downloadJSON(adminState.complaints, 'complaints.json');
    document.getElementById('copy-users').onclick = () => copyJSON(adminState.users);
    document.getElementById('copy-complaints').onclick = () => copyJSON(adminState.complaints);
    document.getElementById('mark-resolved').onclick = () => {
      if (adminState.selectedComplaintId !== null) toggleResolve(adminState.selectedComplaintId);
    };
    document.getElementById('reload-data').onclick = () => loadData();
    renderPendingTransactions();


  function renderPendingTransactions() {
    const container = document.getElementById('pending-transactions');
    const deps = adminState.deposits || [];
    const withs = adminState.withdrawals || [];
    let html = '<table><thead><tr><th>Type</th><th>ID</th><th>User</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead><tbody>';
    deps.filter(d => d.status === 'pending').forEach(d => {
      html += `<tr><td>Deposit</td><td>${d.id}</td><td>${escapeHtml(d.email||'')}</td><td>${d.amount} BTC ($${d.usdValue})</td><td>${d.status}</td><td><button class="btn-small" data-action="confirm-deposit" data-id="${d.id}">Confirm</button> <button class="btn-small" data-action="reject-deposit" data-id="${d.id}">Reject</button></td></tr>`;
    });
    withs.filter(w => w.status === 'pending').forEach(w => {
      html += `<tr><td>Withdrawal</td><td>${w.id}</td><td>${escapeHtml(w.email||'')}</td><td>${w.amount} BTC</td><td>${w.status}</td><td><button class="btn-small" data-action="complete-withdrawal" data-id="${w.id}">Complete</button> <button class="btn-small" data-action="reject-withdrawal" data-id="${w.id}">Reject</button></td></tr>`;
    });
    html += '</tbody></table>';
    container.innerHTML = html;

    container.querySelectorAll('button[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const action = btn.getAttribute('data-action');
        if (action === 'confirm-deposit') confirmDeposit(id);
        if (action === 'reject-deposit') rejectTransaction('deposit', id);
        if (action === 'complete-withdrawal') completeWithdrawal(id);
        if (action === 'reject-withdrawal') rejectTransaction('withdrawal', id);
      });
    });
  }

  function confirmDeposit(id) {
    const deposits = JSON.parse(localStorage.getItem('deposits') || '[]');
    const idx = deposits.findIndex(d => String(d.id) === String(id));
    if (idx === -1) return alert('Deposit not found');
    deposits[idx].status = 'confirmed';
    deposits[idx].confirmedAt = new Date().toISOString();
    localStorage.setItem('deposits', JSON.stringify(deposits));
    // update local admin state
    adminState.deposits = deposits;

    // credit user's USD balance if present in localStorage allUsers
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const depos = deposits[idx];
    const user = allUsers.find(u => (u.email && u.email === depos.email) || (u.username && u.username === depos.username));
    const usd = parseFloat(depos.usdValue || 0);
    if (user) {
      user.balance = (parseFloat(user.balance) || 0) + usd;
      localStorage.setItem('allUsers', JSON.stringify(allUsers));
      // update currentUser if matches
      const current = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (current.email && current.email === user.email) {
        current.balance = user.balance;
        localStorage.setItem('currentUser', JSON.stringify(current));
      }
    }

    // optional: notify user via email
    if (typeof emailService !== 'undefined' && depos.email) {
      emailService.sendRealEmail(depos.email, 'Deposit Confirmed', 'template_deposit_confirmed', {to_email: depos.email, amount: depos.amount, usd_value: depos.usdValue}).catch(()=>{});
    }

    renderPendingTransactions();
    renderUsers();
    alert('Deposit confirmed');
  }

  function completeWithdrawal(id) {
    const withdrawals = JSON.parse(localStorage.getItem('withdrawals') || '[]');
    const idx = withdrawals.findIndex(w => String(w.id) === String(id));
    if (idx === -1) return alert('Withdrawal not found');
    withdrawals[idx].status = 'completed';
    withdrawals[idx].completedAt = new Date().toISOString();
    localStorage.setItem('withdrawals', JSON.stringify(withdrawals));
    adminState.withdrawals = withdrawals;

    // deduct user's USD balance using BTC-to-USD approximation
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const w = withdrawals[idx];
    const user = allUsers.find(u => (u.email && u.email === w.email) || (u.username && u.username === w.username));
    const btcAmount = parseFloat(w.totalDeduction || w.amount || 0);
    const usd = btcAmount * 42500; // same BTC_TO_USD constant used elsewhere
    if (user) {
      user.balance = (parseFloat(user.balance) || 0) - usd;
      localStorage.setItem('allUsers', JSON.stringify(allUsers));
      const current = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (current.email && current.email === user.email) {
        current.balance = user.balance;
        localStorage.setItem('currentUser', JSON.stringify(current));
      }
    }

    if (typeof emailService !== 'undefined' && w.email) {
      emailService.sendRealEmail(w.email, 'Withdrawal Completed', 'template_withdrawal_completed', {to_email: w.email, amount: w.amount}).catch(()=>{});
    }

    renderPendingTransactions();
    renderUsers();
    alert('Withdrawal completed');
  }

  function rejectTransaction(type, id) {
    if (type === 'deposit') {
      const deposits = JSON.parse(localStorage.getItem('deposits') || '[]');
      const idx = deposits.findIndex(d => String(d.id) === String(id));
      if (idx === -1) return alert('Not found');
      const rec = deposits[idx];
      rec.status = 'rejected';
      rec.rejectedAt = new Date().toISOString();
      localStorage.setItem('deposits', JSON.stringify(deposits));
      adminState.deposits = deposits;
      if (typeof emailService !== 'undefined' && rec.email) emailService.sendRealEmail(rec.email, 'Deposit Rejected', 'template_deposit_rejected', {to_email: rec.email}).catch(()=>{});
      renderPendingTransactions();
      alert('Deposit rejected');
    } else {
      const withdrawals = JSON.parse(localStorage.getItem('withdrawals') || '[]');
      const idx = withdrawals.findIndex(w => String(w.id) === String(id));
      if (idx === -1) return alert('Not found');
      const rec = withdrawals[idx];
      rec.status = 'rejected';
      rec.rejectedAt = new Date().toISOString();
      localStorage.setItem('withdrawals', JSON.stringify(withdrawals));
      adminState.withdrawals = withdrawals;
      if (typeof emailService !== 'undefined' && rec.email) emailService.sendRealEmail(rec.email, 'Withdrawal Rejected', 'template_withdrawal_rejected', {to_email: rec.email}).catch(()=>{});
      renderPendingTransactions();
      alert('Withdrawal rejected');
    }
  }
    document.getElementById('user-lookup-btn').onclick = () => {
      const query = document.getElementById('user-lookup-input').value.trim();
      lookupUser(query);
    };

    document.getElementById('user-lookup-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = document.getElementById('user-lookup-input').value.trim();
        lookupUser(query);
      }
    });
  }

  function lookupUser(query) {
    const result = document.getElementById('user-lookup-result');
    if (!query) {
      result.innerHTML = '<p style="color:#ccc">Enter a username or email to search.</p>';
      return;
    }
    const q = query.toLowerCase();
    const user = adminState.users.find(u => 
      (u.username && u.username.toLowerCase() === q) || 
      (u.email && u.email.toLowerCase() === q)
    );
    if (!user) {
      result.innerHTML = '<p style="color:#FF6B6B">User not found.</p>';
      return;
    }
    result.innerHTML = `
      <div style="background:#0a0a0a;padding:10px;border-radius:6px;border:1px solid #333">
        <p style="margin:0 0 8px 0"><strong>Username:</strong> ${escapeHtml(user.username || 'N/A')}</p>
        <p style="margin:0 0 8px 0"><strong>Name:</strong> ${escapeHtml(user.name || 'N/A')}</p>
        <p style="margin:0 0 8px 0"><strong>Email:</strong> ${escapeHtml(user.email || 'N/A')}</p>
        <p style="margin:0 0 8px 0"><strong>Status:</strong> ${user.status || 'N/A'}</p>
        <p style="margin:0 0 8px 0"><strong>Wallet Balance:</strong> $${(user.balance || 0).toFixed(2)}</p>
        <p style="margin:0"><strong>Created:</strong> ${new Date(user.createdAt || '').toLocaleDateString() || 'N/A'}</p>
      </div>
    `;
  }

  function renderUsers(filtered = null) {
    const usersTable = document.getElementById('users-table');
    const users = filtered || adminState.users;
    if (!Array.isArray(users) || users.length === 0) {
      usersTable.innerHTML = '<p style="color:#ccc">No users available.</p>';
      return;
    }
    const keys = ['username', 'name', 'email', 'status'].filter(k => Object.keys(users[0]).includes(k));
    usersTable.innerHTML = tableFromArray(users, keys);
  }

  function filterUsers(query) {
    if (!query) {
      renderUsers();
      return;
    }
    const q = query.toLowerCase();
    const filtered = adminState.users.filter(u => 
      (u.username && u.username.toLowerCase().includes(q)) || 
      (u.email && u.email.toLowerCase().includes(q))
    );
    renderUsers(filtered);
  }

  function renderComplaints() {
    const complaintsTable = document.getElementById('complaints-table');
    const arr = adminState.complaints;
    if (!Array.isArray(arr) || arr.length === 0) {
      complaintsTable.innerHTML = '<p style="color:#ccc">No complaints.</p>';
      return;
    }
    let html = '<table class="fade-in"><thead><tr><th>ID</th><th>User</th><th>Subject</th><th>Status</th><th>Actions</th></tr></thead><tbody>';
    for (const c of arr) {
      html += `<tr data-id="${c.id}"><td>${c.id}</td><td>${c.userId || ''}</td><td>${escapeHtml(c.subject || '')}</td><td>${c.status || ''}</td><td><button class="btn-small" data-action="view" data-id="${c.id}">View</button> <button class="btn-small" data-action="resolve" data-id="${c.id}">${c.status==='resolved' ? 'Unresolve' : 'Resolve'}</button></td></tr>`;
    }
    html += '</tbody></table>';
    complaintsTable.innerHTML = html;

    // Wire action buttons
    complaintsTable.querySelectorAll('button[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(btn.getAttribute('data-id'));
        const action = btn.getAttribute('data-action');
        if (action === 'view') showComplaintDetail(id);
        if (action === 'resolve') toggleResolve(id);
      });
    });
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[s]);
  }

  function showComplaintDetail(id) {
    const c = adminState.complaints.find(x => x.id === id);
    adminState.selectedComplaintId = id;
    const out = document.getElementById('complaint-detail');
    if (!c) { out.innerHTML = '<p>Complaint not found</p>'; return; }
    const user = adminState.users.find(u => u.id === c.userId);
    out.innerHTML = `
      <p><strong>ID:</strong> ${c.id}</p>
      <p><strong>User ID:</strong> ${c.userId || 'N/A'}</p>
      ${user ? `<p><strong>Username:</strong> ${escapeHtml(user.username || 'N/A')}</p><p><strong>Email:</strong> ${escapeHtml(user.email || 'N/A')}</p>` : ''}
      <p><strong>Subject:</strong> ${escapeHtml(c.subject || '')}</p>
      <p><strong>Status:</strong> ${c.status || ''}</p>
      <p><strong>Message:</strong></p>
      <div style="background:#0a0a0a;padding:10px;border-radius:6px;border:1px solid #222;color:#ddd">${escapeHtml(c.message || '')}</div>
      <p style="margin-top:10px"><strong>Notes</strong></p>
      <textarea id="complaint-notes" style="width:100%;height:80px;padding:8px;border-radius:6px;background:#070707;color:#fff;border:1px solid #222">${escapeHtml(c.notes || '')}</textarea>
      <div style="margin-top:8px;display:flex;gap:8px"><button id="save-complaint-notes" class="btn-small">Save Notes</button> <button id="assign-to-me" class="btn-small">Assign to me</button></div>
    `;
    document.getElementById('save-complaint-notes').onclick = () => {
      const notes = document.getElementById('complaint-notes').value;
      c.notes = notes;
      alert('Notes saved in-memory. Download to persist.');
      renderComplaints();
    };
    document.getElementById('assign-to-me').onclick = () => {
      c.assigned = 'admin';
      alert('Assigned to admin (in-memory).');
      renderComplaints();
    };
  }

  function toggleResolve(id) {
    const c = adminState.complaints.find(x => x.id === id);
    if (!c) return;
    c.status = (c.status === 'resolved') ? 'open' : 'resolved';
    renderComplaints();
    if (adminState.selectedComplaintId === id) showComplaintDetail(id);
  }

  function downloadJSON(obj, filename) {
    const blob = new Blob([JSON.stringify(obj, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  }

  function copyJSON(obj) {
    const txt = JSON.stringify(obj, null, 2);
    navigator.clipboard.writeText(txt).then(() => alert('Copied to clipboard'), () => alert('Copy failed'));
  }
});
