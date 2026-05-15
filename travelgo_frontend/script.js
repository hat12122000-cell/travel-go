js tôi bây h /* =========================================================
   TRAVEL GO – script.js FULL
   ========================================================= */

/* =========================================================
   1. EXPLORE BUTTON
   ========================================================= */

const exploreBtn = document.getElementById('exploreBtn');

if (exploreBtn) {

  exploreBtn.addEventListener('click', function (e) {

    e.preventDefault();

    const target = document.getElementById('destinations');

    if (target) {

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

    }

  });

}

/* =========================================================
   2. HEADER SHADOW + BACK TO TOP
   ========================================================= */

const header = document.getElementById('header');

window.addEventListener('scroll', function () {

  if (header) {

    if (window.scrollY > 60) {

      header.style.boxShadow =
        '0 4px 24px rgba(0,119,182,0.18)';

    } else {

      header.style.boxShadow =
        '0 2px 18px rgba(0,119,182,0.10)';

    }

  }

  const backToTop =
    document.getElementById('backToTop');

  if (backToTop) {

    if (window.scrollY > 400) {

      backToTop.classList.add('visible');

    } else {

      backToTop.classList.remove('visible');

    }

  }

});

/* =========================================================
   3. BACK TO TOP
   ========================================================= */

const backToTop =
  document.getElementById('backToTop');

if (backToTop) {

  backToTop.addEventListener('click', function (e) {

    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  });

}

/* =========================================================
   4. CONTACT FORM VALIDATION
   ========================================================= */

const contactForm =
  document.getElementById('contactForm');

if (contactForm) {

  contactForm.addEventListener('submit', function (e) {

    e.preventDefault();

    let isValid = true;

    const nameInput =
      document.getElementById('name');

    const emailInput =
      document.getElementById('email');

    const messageInput =
      document.getElementById('message');

    const nameError =
      document.getElementById('nameError');

    const emailError =
      document.getElementById('emailError');

    const messageError =
      document.getElementById('messageError');

    clearError(nameInput, nameError);
    clearError(emailInput, emailError);
    clearError(messageInput, messageError);

    /* NAME */

    const nameVal =
      nameInput.value.trim();

    if (nameVal === '') {

      showError(
        nameInput,
        nameError,
        'Vui lòng nhập họ và tên.'
      );

      isValid = false;

    } else if (nameVal.length < 2) {

      showError(
        nameInput,
        nameError,
        'Tên phải có ít nhất 2 ký tự.'
      );

      isValid = false;

    }

    /* EMAIL */

    const emailVal =
      emailInput.value.trim();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailVal === '') {

      showError(
        emailInput,
        emailError,
        'Vui lòng nhập email.'
      );

      isValid = false;

    } else if (!emailRegex.test(emailVal)) {

      showError(
        emailInput,
        emailError,
        'Email không hợp lệ.'
      );

      isValid = false;

    }

    /* MESSAGE */

    const messageVal =
      messageInput.value.trim();

    if (messageVal === '') {

      showError(
        messageInput,
        messageError,
        'Vui lòng nhập nội dung.'
      );

      isValid = false;

    } else if (messageVal.length < 10) {

      showError(
        messageInput,
        messageError,
        'Nội dung tối thiểu 10 ký tự.'
      );

      isValid = false;

    }

    /* SUCCESS */

    if (isValid) {

      const formSuccess =
        document.getElementById('formSuccess');

      if (formSuccess) {

        formSuccess.style.display = 'block';

        contactForm.reset();

        setTimeout(function () {

          formSuccess.style.display = 'none';

        }, 5000);

      }

    }

  });

}

/* =========================================================
   5. SHOW / CLEAR ERROR
   ========================================================= */

function showError(input, errorEl, message) {

  if (!input || !errorEl) return;

  input.classList.add('error-field');

  errorEl.textContent = message;

}

function clearError(input, errorEl) {

  if (!input || !errorEl) return;

  input.classList.remove('error-field');

  errorEl.textContent = '';

}

['name', 'email', 'message'].forEach(function (id) {

  const input =
    document.getElementById(id);

  const errEl =
    document.getElementById(id + 'Error');

  if (input && errEl) {

    input.addEventListener('input', function () {

      clearError(input, errEl);

    });

  }

});

/* =========================================================
   6. FADE IN EFFECT
   ========================================================= */

const animItems =
  document.querySelectorAll(
    '.card, .drink-card, .about-wrap, .contact-wrap, .food-card, .place-card, .timeline-item'
  );

animItems.forEach(function (el) {

  el.style.opacity = '0';

  el.style.transform = 'translateY(28px)';

  el.style.transition =
    'opacity 0.55s ease, transform 0.55s ease';

});

const observer =
  new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

      if (entry.isIntersecting) {

        entry.target.style.opacity = '1';

        entry.target.style.transform =
          'translateY(0)';

        observer.unobserve(entry.target);

      }

    });

  }, {
    threshold: 0.12
  });

animItems.forEach(function (el) {

  observer.observe(el);

});

/* =========================================================
   7. ACTIVE NAV LINK
   ========================================================= */

const sections =
  document.querySelectorAll('section[id]');

const navLinks =
  document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function () {

  let current = '';

  sections.forEach(function (sec) {

    const top = sec.offsetTop - 90;

    if (window.scrollY >= top) {

      current = sec.getAttribute('id');

    }

  });

  navLinks.forEach(function (link) {

    link.style.color = '';
    link.style.background = '';

    if (
      link.getAttribute('href') === '#' + current
    ) {

      link.style.color = 'var(--primary)';
      link.style.background = 'var(--light)';

    }

  });

});

/* =========================================================
   8. PLAN COUNT
   ========================================================= */

function updatePlanCount() {

  const plans =
    JSON.parse(localStorage.getItem('plans')) || [];

  const planCount =
    document.getElementById('planCount');

  if (planCount) {

    planCount.innerText = plans.length;

  }

}

updatePlanCount();

/* =========================================================
   9. ADD PLAN BUTTON
   ========================================================= */

const addButtons =
  document.querySelectorAll('.add-plan');

addButtons.forEach(function (btn) {

  btn.addEventListener('click', function () {

    let plans =
      JSON.parse(localStorage.getItem('plans')) || [];

    const item = {

      name:
        btn.dataset.name || 'Không tên',

      address:
        btn.dataset.address || 'Chưa có địa chỉ',

      location:
        btn.dataset.location || 'Việt Nam',

      price:
        Number(btn.dataset.price) || 0,

      distance:
        Number(btn.dataset.distance) || 0,

      start: '',
      end: ''

    };

    plans.push(item);

    localStorage.setItem(
      'plans',
      JSON.stringify(plans)
    );

    updatePlanCount();

    alert('Đã thêm vào kế hoạch!');

  });

});

/* =========================================================
   10. KẾ HOẠCH
   ========================================================= */

let plans =
  JSON.parse(localStorage.getItem('plans')) || [];

let budget =
  Number(localStorage.getItem('budget')) || 0;

const timeline =
  document.getElementById('timeline');

/* FORMAT MONEY */

function formatMoney(number) {

  return Number(number)
    .toLocaleString('vi-VN') + 'đ';

}

/* SAVE BUDGET */

function saveBudget() {

  const budgetInput =
    document.getElementById('budgetInput');

  if (!budgetInput) return;

  budget = Number(budgetInput.value);

  localStorage.setItem('budget', budget);

  renderSummary();

}

/* RENDER SUMMARY */

function renderSummary() {

  const spentMoney =
    document.getElementById('spentMoney');

  const remainMoney =
    document.getElementById('remainMoney');

  if (!spentMoney || !remainMoney) return;

  let spent = 0;

  plans.forEach(function (item) {

    spent += Number(item.price);

  });

  spentMoney.innerText =
    formatMoney(spent);

  remainMoney.innerText =
    formatMoney(budget - spent);

}

/* CHECK TIME CONFLICT */

function checkConflict() {

  const warningBox =
    document.getElementById('warningBox');

  if (!warningBox) return;

  warningBox.style.display = 'none';
  warningBox.innerHTML = '';

  for (let i = 0; i < plans.length; i++) {

    for (let j = i + 1; j < plans.length; j++) {

      if (
        !plans[i].start ||
        !plans[i].end ||
        !plans[j].start ||
        !plans[j].end
      ) continue;

      const aStart =
        new Date(plans[i].start).getTime();

      const aEnd =
        new Date(plans[i].end).getTime();

      const bStart =
        new Date(plans[j].start).getTime();

      const bEnd =
        new Date(plans[j].end).getTime();

      if (
        aStart < bEnd &&
        bStart < aEnd
      ) {

        warningBox.style.display = 'block';

        warningBox.innerHTML += `

          <div class="warning-item">

            <b>⚠ Trùng thời gian</b><br>

            "${plans[i].name}"
            trùng với
            "${plans[j].name}"

          </div>

        `;

      }

    }

  }

}

/* RENDER PLANS */

function renderPlans() {

  if (!timeline) return;

  timeline.innerHTML = '';

  plans.sort(function (a, b) {

    return new Date(a.start) -
      new Date(b.start);

  });

  plans.forEach(function (item, index) {

    let distanceHTML = '';

    if (index < plans.length - 1) {

      distanceHTML = `

        <div class="timeline-distance">

          📍 Khoảng cách đến điểm tiếp theo:
          ${item.distance || 0} km

        </div>

      `;

    }

    timeline.innerHTML += `

      <div class="timeline-item">

        <div class="timeline-top">

          <div class="timeline-title">
            ${item.name}
          </div>

          <div class="timeline-price">
            ${formatMoney(item.price)}
          </div>

        </div>

        <div class="timeline-address">
          📌 ${item.address}
        </div>

        <div class="timeline-time">

          <span>
            ⏰ ${item.start || 'Chưa chọn'}
          </span>

          <span>
            🕒 ${item.end || 'Chưa chọn'}
          </span>

        </div>

        ${distanceHTML}

        <div class="timeline-actions">

          <button
            class="btn-delete"
            onclick="deletePlan(${index})"
          >
            Xóa
          </button>

        </div>

      </div>

    `;

  });

  renderSummary();

  checkConflict();

  updatePlanCount();

}

/* DELETE PLAN */

function deletePlan(index) {

  plans.splice(index, 1);

  localStorage.setItem(
    'plans',
    JSON.stringify(plans)
  );

  renderPlans();

}

/* MANUAL ADD PLAN */

function addManualPlan() {

  const name =
    document.getElementById('manualName').value;

  const address =
    document.getElementById('manualAddress').value;

  const price =
    document.getElementById('manualPrice').value;

  const distance =
    document.getElementById('manualDistance').value;

  const start =
    document.getElementById('manualStart').value;

  const end =
    document.getElementById('manualEnd').value;

  if (
    !name ||
    !address ||
    !price ||
    !start ||
    !end
  ) {

    alert('Vui lòng nhập đầy đủ thông tin');

    return;

  }

  plans.push({

    name,
    address,
    price,
    distance,
    start,
    end

  });

  localStorage.setItem(
    'plans',
    JSON.stringify(plans)
  );

  renderPlans();

  document.getElementById('manualName').value = '';
  document.getElementById('manualAddress').value = '';
  document.getElementById('manualPrice').value = '';
  document.getElementById('manualDistance').value = '';
  document.getElementById('manualStart').value = '';
  document.getElementById('manualEnd').value = '';

}

/* =========================================================
   11. INIT
   ========================================================= */

const budgetInput =
  document.getElementById('budgetInput');

if (budgetInput) {

  budgetInput.value = budget;

}

renderPlans();











<script>

function updatePlanCount(){

  const plans =
    JSON.parse(localStorage.getItem("plans")) || [];

  const count = document.getElementById("planCount")

  if(count){

    count.innerText = plans.length

  }

}

