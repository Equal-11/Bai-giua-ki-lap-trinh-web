
    (function initLoginExperience() {
      const emailInput = document.getElementById('login-email');
      const passwordInput = document.getElementById('login-password');
      const togglePasswordBtn = document.getElementById('toggle-password');
      const eyeIcon = document.getElementById('eye-icon');
      const roleBtns = document.querySelectorAll('.role-btn');
      const roleIndicator = document.getElementById('role-indicator');
      const quickEmailLabel = document.getElementById('quick-email-label');
      const fillDemoBtn = document.getElementById('fill-demo-btn');
      const clearEmailBtn = document.getElementById('clear-email');
      const validityBadge = document.getElementById('email-validity-badge');
      const loginForm = document.getElementById('login-form');
      const statusMessage = document.getElementById('status-message');
      const statusText = document.getElementById('status-text');
      const statusIcon = document.getElementById('status-icon');

      const roleDisplayMap = {
        'owner': 'Chủ nuôi (Pet Owner)',
        'provider': 'Dịch vụ Thú y & Spa (Provider)',
        'trainer': 'Huấn luyện viên (Trainer)',
        'admin': 'Quản trị viên (Admin)'
      };

      let currentRole = 'owner';

      if (togglePasswordBtn && passwordInput && eyeIcon) {
        togglePasswordBtn.addEventListener('click', () => {
          const isPassword = passwordInput.getAttribute('type') === 'password';
          passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
          eyeIcon.textContent = isPassword ? 'visibility_off' : 'visibility';
        });
      }

      function validateEmailField() {
        const val = emailInput.value.trim();
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        if (isValid) {
          validityBadge.classList.add('show');
        } else {
          validityBadge.classList.remove('show');
        }
        if (val.length > 0) {
          clearEmailBtn.style.display = 'flex';
        } else {
          clearEmailBtn.style.display = 'none';
        }
      }

      if (emailInput) {
        emailInput.addEventListener('input', validateEmailField);
        validateEmailField();
      }

      if (clearEmailBtn && emailInput) {
        clearEmailBtn.addEventListener('click', () => {
          emailInput.value = '';
          validateEmailField();
          emailInput.focus();
        });
      }

      roleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const role = btn.getAttribute('data-role');
          const email = btn.getAttribute('data-email');
          currentRole = role;

          roleBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          if (roleIndicator) roleIndicator.textContent = roleDisplayMap[role] || role;
          if (quickEmailLabel) quickEmailLabel.textContent = email;

          emailInput.value = email;
          validateEmailField();
        });
      });

      if (fillDemoBtn && emailInput && passwordInput) {
        fillDemoBtn.addEventListener('click', () => {
          const currentBtn = document.querySelector(`.role-btn[data-role="${currentRole}"]`);
          const targetEmail = currentBtn ? currentBtn.getAttribute('data-email') : 'owner@demo.com';
          emailInput.value = targetEmail;
          passwordInput.value = 'demo123';
          validateEmailField();

          emailInput.classList.add('flash-ring');
          setTimeout(() => {
            emailInput.classList.remove('flash-ring');
          }, 600);
        });
      }

      if (loginForm && statusMessage) {
        loginForm.addEventListener('submit', (e) => {
          e.preventDefault();
          statusMessage.classList.remove('success', 'error');

          if (!emailInput.value || !passwordInput.value) {
            statusMessage.classList.add('error');
            statusIcon.textContent = 'error';
            statusText.textContent = 'Vui lòng điền đầy đủ email và mật khẩu!';
            return;
          }

          statusMessage.classList.add('success');
          statusIcon.textContent = 'check_circle';
          statusText.textContent = `Đăng nhập thành công với vai trò ${roleDisplayMap[currentRole]}! Chuyển hướng...`;
        });
      }
    })();
