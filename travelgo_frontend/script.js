/* ================================================
   TRAVEL GO – script.js
   JavaScript cơ bản:
   1. Nút cuộn xuống (Explore Now)
   2. Header đổi nền khi cuộn
   3. Back-to-top button
   4. Kiểm tra và xác thực form liên hệ
   5. Hiệu ứng fade-in khi card xuất hiện (IntersectionObserver)
   ================================================ */

// ── 1. NÚT "EXPLORE NOW" – cuộn mượt xuống phần Destinations ──────────────
const exploreBtn = document.getElementById('exploreBtn');
if (exploreBtn) {
  exploreBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.getElementById('destinations');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

// ── 2. HEADER – thêm class shadow khi cuộn xuống ─────────────────────────
const header = document.getElementById('header');

window.addEventListener('scroll', function () {
  if (window.scrollY > 60) {
    header.style.boxShadow = '0 4px 24px rgba(0,119,182,0.18)';
  } else {
    header.style.boxShadow = '0 2px 18px rgba(0,119,182,0.10)';
  }

  // Back-to-top visibility
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
});

// ── 3. BACK-TO-TOP ────────────────────────────────────────────────────────
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  backToTop.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── 4. FORM VALIDATION ───────────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;

    // Lấy các phần tử
    const nameInput    = document.getElementById('name');
    const emailInput   = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError    = document.getElementById('nameError');
    const emailError   = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    // Reset lỗi cũ
    clearError(nameInput,    nameError);
    clearError(emailInput,   emailError);
    clearError(messageInput, messageError);

    // Kiểm tra họ tên
    const nameVal = nameInput.value.trim();
    if (nameVal === '') {
      showError(nameInput, nameError, 'Vui lòng nhập họ và tên của bạn.');
      isValid = false;
    } else if (nameVal.length < 2) {
      showError(nameInput, nameError, 'Họ tên phải có ít nhất 2 ký tự.');
      isValid = false;
    }

    // Kiểm tra email
    const emailVal = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailVal === '') {
      showError(emailInput, emailError, 'Vui lòng nhập địa chỉ email.');
      isValid = false;
    } else if (!emailRegex.test(emailVal)) {
      showError(emailInput, emailError, 'Địa chỉ email không hợp lệ.');
      isValid = false;
    }

    // Kiểm tra nội dung
    const messageVal = messageInput.value.trim();
    if (messageVal === '') {
      showError(messageInput, messageError, 'Vui lòng nhập nội dung phản hồi.');
      isValid = false;
    } else if (messageVal.length < 10) {
      showError(messageInput, messageError, 'Nội dung phải có ít nhất 10 ký tự.');
      isValid = false;
    }

    // Nếu hợp lệ → hiển thị thông báo thành công
    if (isValid) {
      const formSuccess = document.getElementById('formSuccess');
      if (formSuccess) {
        formSuccess.style.display = 'block';
        contactForm.reset();

        // Ẩn thông báo sau 5 giây
        setTimeout(function () {
          formSuccess.style.display = 'none';
        }, 5000);
      }
    }
  });
}

// Hàm hiển thị lỗi
function showError(input, errorEl, message) {
  input.classList.add('error-field');
  errorEl.textContent = message;
}

// Hàm xóa lỗi
function clearError(input, errorEl) {
  input.classList.remove('error-field');
  errorEl.textContent = '';
}

// Xóa lỗi khi người dùng bắt đầu nhập lại
['name', 'email', 'message'].forEach(function (id) {
  const input   = document.getElementById(id);
  const errEl   = document.getElementById(id + 'Error');
  if (input && errEl) {
    input.addEventListener('input', function () {
      clearError(input, errEl);
    });
  }
});

// ── 5. HIỆU ỨNG FADE-IN KHI CARD XUẤT HIỆN (IntersectionObserver) ────────
const animItems = document.querySelectorAll('.card, .drink-card, .about-wrap, .contact-wrap');

// Thêm class ẩn ban đầu
animItems.forEach(function (el) {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(28px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
});

// Dùng IntersectionObserver để kích hoạt hiệu ứng
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

animItems.forEach(function (el) {
  observer.observe(el);
});

// ── 6. ACTIVE NAV LINK khi cuộn đến từng section ─────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-list a');

window.addEventListener('scroll', function () {
  let current = '';
  sections.forEach(function (sec) {
    const top = sec.offsetTop - 90;
    if (window.scrollY >= top) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(function (link) {
    link.style.color      = '';
    link.style.background = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color      = 'var(--primary)';
      link.style.background = 'var(--light)';
    }
  });
});

let tripStops = [];

const form = document.getElementById('addStopForm');
if(form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('stopName').value;
    const price = document.getElementById('stopPrice').value || 0;
    
    tripStops.push({ name, price: parseInt(price).toLocaleString('vi-VN') + 'đ' });
    updateUI();
    form.reset();
  });
}

function updateUI() {
  const list = document.getElementById('tripList');
  const totalDisplay = document.getElementById('tripTotal');
  let total = 0;
  
  list.innerHTML = '';
  tripStops.forEach((stop, index) => {
    total += parseInt(stop.price.replace(/\D/g,''));
    list.innerHTML += `
      <div class="trip-item" style="display: flex; justify-content: space-between; padding: 10px; background: var(--gray); margin-bottom: 8px; border-radius: 8px;">
        <span><strong>${index + 1}. ${stop.name}</strong></span>
        <span style="color: var(--primary); font-weight: 600;">${stop.price}</span>
      </div>
    `;
  });
  totalDisplay.textContent = total.toLocaleString('vi-VN') + 'đ';
}
