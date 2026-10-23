/**
 * SHAHID SMARANI HIGH SCHOOL
 * Main JavaScript - UI, interactions, localStorage-based data
 */

/* ==========================================
   PRELOADER
   ========================================== */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 800);
  }
});

/* ==========================================
   HEADER SCROLL EFFECT
   ========================================== */
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================
   MOBILE NAVIGATION
   ========================================== */
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');

if (hamburger && mainNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mainNav.classList.toggle('open');
    document.body.style.overflow = mainNav.classList.contains('open') ? 'hidden' : '';
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mainNav.contains(e.target)) {
      hamburger.classList.remove('active');
      mainNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Dropdown toggle on mobile
  const dropdowns = mainNav.querySelectorAll('.dropdown');
  dropdowns.forEach(dd => {
    const link = dd.querySelector('.nav-link');
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        dd.classList.toggle('open');
      }
    });
  });
}

/* ==========================================
   HERO SLIDER
   ========================================== */
let currentSlide = 0;
let slideInterval;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  if (!slides.length) return;
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

function changeSlide(dir) {
  showSlide(currentSlide + dir);
  resetSlideInterval();
}

function goToSlide(index) {
  showSlide(index);
  resetSlideInterval();
}

function resetSlideInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(() => changeSlide(1), 5000);
}

if (slides.length > 0) {
  slideInterval = setInterval(() => changeSlide(1), 5000);
}

/* ==========================================
   BACK TO TOP
   ========================================== */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (backToTop) {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================
   COUNTER ANIMATION
   ========================================== */
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target.toLocaleString('bn-BD');
      clearInterval(timer);
    } else {
      el.textContent = start.toLocaleString('bn-BD');
    }
  }, 16);
}

function initCounters() {
  const statCards = document.querySelectorAll('.stat-card[data-count]');
  statCards.forEach(card => {
    const counter = card.querySelector('.counter');
    if (counter) {
      animateCounter(counter, parseInt(card.dataset.count));
    }
  });
}

/* ==========================================
   SCROLL REVEAL
   ========================================== */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));

  // Stat counters
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        initCounters();
        statsObserver.disconnect();
      }
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }
}

/* ==========================================
   ACTIVE NAV LINK
   ========================================== */
function setActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkPage = href.split('/').pop();
    if (linkPage === currentPath) {
      link.classList.add('active');
    }
  });
}

/* ==========================================
   LOCAL STORAGE DATA (Simulated Database)
   ========================================== */
const DB = {
  // Initialize with seed data
  init() {
    if (!localStorage.getItem('sshs_initialized')) {
      this.seed();
      localStorage.setItem('sshs_initialized', '1');
    }
  },

  seed() {
    // Notices
    const notices = [
      { id: 1, title: '২০২৬ সালের ষষ্ঠ শ্রেণিতে ভর্তির বিজ্ঞপ্তি', category: 'ভর্তি', date: '2026-10-23', important: true, content: '২০২৬ শিক্ষাবর্ষে ষষ্ঠ শ্রেণিতে ভর্তির জন্য অনলাইনে আবেদন করা যাচ্ছে। আবেদনের শেষ তারিখ: ৩০ নভেম্বর ২০২৫।', published: true },
      { id: 2, title: 'বার্ষিক পরীক্ষার সময়সূচি প্রকাশ', category: 'পরীক্ষা', date: '2026-10-20', important: false, content: '২০২৫ সালের বার্ষিক পরীক্ষা আগামী ১৫ নভেম্বর থেকে শুরু হবে। বিস্তারিত সময়সূচি বিদ্যালয়ের নোটিশ বোর্ডে দেখুন।', published: true },
      { id: 3, title: 'অভিভাবক সমাবেশ - ২৫ অক্টোবর', category: 'সাধারণ', date: '2026-10-18', important: true, content: 'আগামী ২৫ অক্টোবর সকাল ১০টায় বিদ্যালয় মিলনায়তনে অভিভাবক সমাবেশ অনুষ্ঠিত হবে। সকল শিক্ষার্থীর অভিভাবকগণকে উপস্থিত থাকার অনুরোধ করা হচ্ছে।', published: true },
      { id: 4, title: 'মাসিক বেতন পরিশোধের বিজ্ঞপ্তি', category: 'বেতন', date: '2026-10-15', important: false, content: 'অক্টোবর ২০২৫ মাসের বেতন ৩০ তারিখের মধ্যে পরিশোধ করতে হবে। অন্যথায় জরিমানা আরোপ করা হবে।', published: true },
      { id: 5, title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৫', category: 'ক্রীড়া', date: '2026-10-10', important: false, content: 'আগামী ৫ নভেম্বর বার্ষিক ক্রীড়া প্রতিযোগিতা বিদ্যালয় মাঠে অনুষ্ঠিত হবে। আগ্রহী শিক্ষার্থীরা শ্রেণি শিক্ষকের কাছে নাম নিবন্ধন করুন।', published: true }
    ];
    localStorage.setItem('sshs_notices', JSON.stringify(notices));

    // Teachers
    const teachers = [
      { id: 1, name: 'মোহাম্মদ আবদুল করিম', designation: 'প্রধান শিক্ষক', subject: 'ইসলাম ধর্ম', qualification: 'M.A., B.Ed, M.Ed', experience: 30, joining: '1995-01-01', phone: '01700-000001', email: 'principal@sshs.edu.bd', status: 'active' },
      { id: 2, name: 'মো. রফিকুল ইসলাম', designation: 'সিনিয়র শিক্ষক', subject: 'গণিত', qualification: 'M.Sc (গণিত), B.Ed', experience: 20, joining: '2005-06-15', phone: '01700-000002', email: 'rafiq@sshs.edu.bd', status: 'active' },
      { id: 3, name: 'মোছাম্মদ সাবিনা আক্তার', designation: 'সহকারী শিক্ষক', subject: 'বাংলা', qualification: 'M.A (বাংলা), B.Ed', experience: 15, joining: '2010-01-10', phone: '01700-000003', email: 'sabina@sshs.edu.bd', status: 'active' },
      { id: 4, name: 'মো. শফিকুল আলম', designation: 'সহকারী শিক্ষক', subject: 'পদার্থবিজ্ঞান', qualification: 'M.Sc (পদার্থ)', experience: 18, joining: '2007-03-20', phone: '01700-000004', email: 'shafiq@sshs.edu.bd', status: 'active' },
      { id: 5, name: 'মোসাম্মত নাছরিন বেগম', designation: 'সহকারী শিক্ষক', subject: 'ইংরেজি', qualification: 'M.A (English), B.Ed', experience: 12, joining: '2013-07-01', phone: '01700-000005', email: 'nasrin@sshs.edu.bd', status: 'active' },
      { id: 6, name: 'মো. জাহাঙ্গীর আলম', designation: 'সহকারী শিক্ষক', subject: 'রসায়ন', qualification: 'M.Sc (রসায়ন)', experience: 10, joining: '2015-02-01', phone: '01700-000006', email: 'jahangir@sshs.edu.bd', status: 'active' },
      { id: 7, name: 'মোছাম্মদ রহিমা খাতুন', designation: 'সহকারী শিক্ষক', subject: 'জীববিজ্ঞান', qualification: 'M.Sc (জীববিজ্ঞান)', experience: 8, joining: '2017-09-01', phone: '01700-000007', email: 'rahima@sshs.edu.bd', status: 'active' },
      { id: 8, name: 'মো. আমির হোসেন', designation: 'সহকারী শিক্ষক', subject: 'ইতিহাস', qualification: 'M.A (ইতিহাস), B.Ed', experience: 14, joining: '2011-04-15', phone: '01700-000008', email: 'amir@sshs.edu.bd', status: 'active' }
    ];
    localStorage.setItem('sshs_teachers', JSON.stringify(teachers));

    // Students
    const students = [
      { id: 1, studentId: 'SSHS-2025-001', name: 'আহমেদ রাশেদ', roll: 1, class: '৯ম', section: 'ক', year: 2025, dob: '2010-05-15', gender: 'পুরুষ', guardian: 'মো. করিম', phone: '01711-111111', address: 'মিরপুর, ঢাকা', status: 'active' },
      { id: 2, studentId: 'SSHS-2025-002', name: 'ফাতেমা তুজ জোহরা', roll: 1, class: '১০ম', section: 'ক', year: 2025, dob: '2009-08-20', gender: 'মহিলা', guardian: 'মো. রহিম', phone: '01711-111112', address: 'মিরপুর, ঢাকা', status: 'active' },
      { id: 3, studentId: 'SSHS-2025-003', name: 'মো. সাইফুল ইসলাম', roll: 2, class: '৯ম', section: 'ক', year: 2025, dob: '2010-03-10', gender: 'পুরুষ', guardian: 'মো. আলম', phone: '01711-111113', address: 'পল্লবী, ঢাকা', status: 'active' },
      { id: 4, studentId: 'SSHS-2025-004', name: 'নাফিসা রহমান', roll: 2, class: '১০ম', section: 'ক', year: 2025, dob: '2009-11-25', gender: 'মহিলা', guardian: 'মো. হাসান', phone: '01711-111114', address: 'কাফরুল, ঢাকা', status: 'active' },
      { id: 5, studentId: 'SSHS-2025-005', name: 'তামিম ইকবাল', roll: 3, class: '৯ম', section: 'খ', year: 2025, dob: '2010-07-05', gender: 'পুরুষ', guardian: 'মো. ইকবাল', phone: '01711-111115', address: 'মিরপুর-১২, ঢাকা', status: 'active' }
    ];
    localStorage.setItem('sshs_students', JSON.stringify(students));

    // Admission Applications
    const admissions = [
      { id: 1, appNo: 'APP-2026-001', name: 'মো. রাফি আহমেদ', nameBn: 'মো. রাফি আহমেদ', class: '৬ষ্ঠ', dob: '2013-06-10', guardian: 'মো. সেলিম', phone: '01822-000001', address: 'মিরপুর', prevSchool: 'মিরপুর সরকারি প্রাথমিক বিদ্যালয়', status: 'pending', date: '2026-10-20' },
      { id: 2, appNo: 'APP-2026-002', name: 'সুমাইয়া আক্তার', nameBn: 'সুমাইয়া আক্তার', class: '৬ষ্ঠ', dob: '2013-04-22', guardian: 'মো. করিম', phone: '01822-000002', address: 'শ্যামলী', prevSchool: 'শ্যামলী সরকারি প্রাথমিক', status: 'approved', date: '2026-10-18' },
      { id: 3, appNo: 'APP-2026-003', name: 'আরিফুল ইসলাম', nameBn: 'আরিফুল ইসলাম', class: '৭ম', dob: '2012-09-15', guardian: 'মো. আরিফ', phone: '01822-000003', address: 'পল্লবী', prevSchool: 'পল্লবী উচ্চ বিদ্যালয়', status: 'rejected', date: '2026-10-15' }
    ];
    localStorage.setItem('sshs_admissions', JSON.stringify(admissions));

    // Results
    const results = [
      { exam: 'SSC', year: 2025, class: '১০ম', entries: [
        { roll: 1, name: 'ফাতেমা তুজ জোহরা', bangla: 88, english: 82, math: 95, science: 91, history: 85, religion: 92, ict: 90, total: 623, gpa: 5.00, grade: 'A+' },
        { roll: 2, name: 'নাফিসা রহমান', bangla: 85, english: 78, math: 88, science: 86, history: 80, religion: 89, ict: 85, total: 591, gpa: 4.78, grade: 'A' },
        { roll: 3, name: 'মো. সাকিব হাসান', bangla: 80, english: 72, math: 78, science: 80, history: 75, religion: 82, ict: 80, total: 547, gpa: 4.22, grade: 'A' }
      ]}
    ];
    localStorage.setItem('sshs_results', JSON.stringify(results));

    // School Settings
    const settings = {
      name: 'শহীদ স্মরণী উচ্চ বিদ্যালয়',
      nameEn: 'Shahid Smarani High School',
      eiin: '123456',
      established: '১৯৬৫',
      address: '১২৩, শহীদ সরণি, মিরপুর-১০, ঢাকা-১২১৬',
      phone: '+880 1700-000000',
      email: 'info@sshs.edu.bd',
      principal: 'মোহাম্মদ আবদুল করিম'
    };
    localStorage.setItem('sshs_settings', JSON.stringify(settings));

    // Users (hashed passwords would be server-side; here we use simple tokens for demo)
    const users = [
      { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'সিস্টেম অ্যাডমিন', active: true },
      { id: 2, username: 'principal', password: 'principal123', role: 'teacher', name: 'মোহাম্মদ আবদুল করিম', active: true },
      { id: 3, username: 'student01', password: 'student01', role: 'student', name: 'আহমেদ রাশেদ', studentId: 1, active: true }
    ];
    localStorage.setItem('sshs_users', JSON.stringify(users));
  },

  get(key) {
    try {
      return JSON.parse(localStorage.getItem('sshs_' + key)) || [];
    } catch { return []; }
  },

  getOne(key) {
    try {
      return JSON.parse(localStorage.getItem('sshs_' + key)) || {};
    } catch { return {}; }
  },

  set(key, data) {
    localStorage.setItem('sshs_' + key, JSON.stringify(data));
  },

  add(key, item) {
    const items = this.get(key);
    items.push(item);
    this.set(key, items);
  },

  update(key, id, updates) {
    const items = this.get(key);
    const idx = items.findIndex(i => i.id === id);
    if (idx !== -1) {
      items[idx] = { ...items[idx], ...updates };
      this.set(key, items);
    }
  },

  delete(key, id) {
    const items = this.get(key);
    this.set(key, items.filter(i => i.id !== id));
  },

  nextId(key) {
    const items = this.get(key);
    if (!items.length) return 1;
    return Math.max(...items.map(i => i.id || 0)) + 1;
  }
};

/* ==========================================
   AUTH MODULE
   ========================================== */
const Auth = {
  login(username, password) {
    const users = DB.get('users');
    const user = users.find(u => u.username === username && u.password === password && u.active);
    if (user) {
      const session = {
        userId: user.id,
        username: user.username,
        role: user.role,
        name: user.name,
        loginTime: new Date().toISOString()
      };
      sessionStorage.setItem('sshs_session', JSON.stringify(session));
      return { success: true, user: session };
    }
    return { success: false, message: 'ভুল ব্যবহারকারীর নাম বা পাসওয়ার্ড' };
  },

  logout() {
    sessionStorage.removeItem('sshs_session');
    window.location.href = '/pages/login.html';
  },

  getSession() {
    try {
      return JSON.parse(sessionStorage.getItem('sshs_session'));
    } catch { return null; }
  },

  isLoggedIn() {
    return !!this.getSession();
  },

  hasRole(role) {
    const session = this.getSession();
    return session && session.role === role;
  },

  requireAuth(role) {
    const session = this.getSession();
    if (!session) {
      window.location.href = '/pages/login.html?redirect=' + encodeURIComponent(window.location.pathname);
      return false;
    }
    if (role && session.role !== role && session.role !== 'admin') {
      window.location.href = '/pages/login.html?error=unauthorized';
      return false;
    }
    return true;
  }
};

/* ==========================================
   FORM VALIDATION
   ========================================== */
const Validate = {
  required(value, label) {
    if (!value || !value.toString().trim()) {
      return label + ' প্রয়োজন।';
    }
    return null;
  },

  phone(value) {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length < 11) return 'সঠিক ফোন নম্বর দিন।';
    return null;
  },

  email(value) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'সঠিক ইমেইল ঠিকানা দিন।';
    return null;
  },

  form(formEl, rules) {
    const errors = {};
    let valid = true;
    // Clear previous errors
    formEl.querySelectorAll('.form-error').forEach(el => el.textContent = '');
    formEl.querySelectorAll('.form-control').forEach(el => el.classList.remove('error'));

    Object.entries(rules).forEach(([field, validators]) => {
      const input = formEl.querySelector(`[name="${field}"]`);
      if (!input) return;
      for (const validator of validators) {
        const error = validator(input.value, input.dataset.label || field);
        if (error) {
          errors[field] = error;
          input.classList.add('error');
          const errorEl = formEl.querySelector(`.form-error[data-for="${field}"]`);
          if (errorEl) errorEl.textContent = error;
          valid = false;
          break;
        }
      }
    });

    return { valid, errors };
  }
};

/* ==========================================
   ADMISSION FORM
   ========================================== */
function initAdmissionForm() {
  const form = document.getElementById('admissionForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const { valid } = Validate.form(form, {
      applicantName: [v => Validate.required(v, 'আবেদনকারীর নাম')],
      class: [v => Validate.required(v, 'কাঙ্ক্ষিত শ্রেণি')],
      dob: [v => Validate.required(v, 'জন্ম তারিখ')],
      guardianName: [v => Validate.required(v, 'অভিভাবকের নাম')],
      phone: [v => Validate.required(v, 'ফোন নম্বর'), v => Validate.phone(v)]
    });

    if (!valid) return;

    const appNo = 'APP-' + new Date().getFullYear() + '-' + String(DB.nextId('admissions')).padStart(4, '0');
    const application = {
      id: DB.nextId('admissions'),
      appNo,
      name: form.applicantName.value,
      class: form.class.value,
      dob: form.dob.value,
      gender: form.gender?.value || '',
      guardian: form.guardianName.value,
      phone: form.phone.value,
      address: form.address?.value || '',
      prevSchool: form.prevSchool?.value || '',
      status: 'pending',
      date: new Date().toISOString().slice(0, 10)
    };

    DB.add('admissions', application);
    showConfirmation(appNo);
  });
}

function showConfirmation(appNo) {
  const container = document.getElementById('formContainer');
  const confirmation = document.getElementById('confirmationBox');
  if (container) container.style.display = 'none';
  if (confirmation) {
    confirmation.style.display = 'block';
    const appNoEl = document.getElementById('generatedAppNo');
    if (appNoEl) appNoEl.textContent = appNo;
  }
}

/* ==========================================
   RESULT LOOKUP
   ========================================== */
function initResultLookup() {
  const form = document.getElementById('resultForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const examYear = form.examYear?.value;
    const rollNo = parseInt(form.rollNo?.value);
    const className = form.class?.value;

    const allResults = DB.get('results');
    const examResult = allResults.find(r => r.year == examYear && r.class === className);

    const resultArea = document.getElementById('resultArea');
    if (!resultArea) return;

    if (!examResult) {
      resultArea.innerHTML = `<div class="alert alert-warning"><i class="fas fa-exclamation-triangle"></i> এই পরীক্ষার ফলাফল এখনও প্রকাশিত হয়নি।</div>`;
      return;
    }

    const student = examResult.entries.find(s => s.roll === rollNo);
    if (!student) {
      resultArea.innerHTML = `<div class="alert alert-danger"><i class="fas fa-times-circle"></i> এই রোল নম্বরে কোনো ফলাফল পাওয়া যায়নি।</div>`;
      return;
    }

    resultArea.innerHTML = buildResultCard(student, examResult);
  });
}

function buildResultCard(student, exam) {
  const subjects = ['bangla', 'english', 'math', 'science', 'history', 'religion', 'ict'];
  const subjectNames = { bangla: 'বাংলা', english: 'ইংরেজি', math: 'গণিত', science: 'বিজ্ঞান', history: 'বাংলাদেশ ও বিশ্ব পরিচয়', religion: 'ধর্ম শিক্ষা', ict: 'তথ্য ও যোগাযোগ প্রযুক্তি' };
  const gradeColor = student.gpa >= 5 ? 'var(--gold)' : student.gpa >= 4 ? 'var(--green)' : 'var(--navy)';

  const subjectRows = subjects.map(s => `
    <tr>
      <td>${subjectNames[s] || s}</td>
      <td>১০০</td>
      <td>${student[s]}</td>
      <td>${getGrade(student[s])}</td>
      <td>${getGradePoint(student[s])}</td>
    </tr>
  `).join('');

  return `
    <div class="result-card-print">
      <div class="result-header" style="background:var(--navy);color:white;padding:20px;border-radius:10px 10px 0 0;text-align:center;">
        <h2>শহীদ স্মরণী উচ্চ বিদ্যালয়</h2>
        <p>${exam.exam} পরীক্ষার ফলাফল - ${exam.year}</p>
      </div>
      <div class="result-body" style="background:white;padding:24px;border:1px solid var(--mid-gray);border-top:none;border-radius:0 0 10px 10px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
          <div><strong>শিক্ষার্থীর নাম:</strong> ${student.name}</div>
          <div><strong>রোল নম্বর:</strong> ${student.roll}</div>
          <div><strong>শ্রেণি:</strong> ${exam.class}</div>
        </div>
        <table class="data-table" style="margin-bottom:16px;">
          <thead><tr><th>বিষয়</th><th>পূর্ণ নম্বর</th><th>প্রাপ্ত নম্বর</th><th>গ্রেড</th><th>গ্রেড পয়েন্ট</th></tr></thead>
          <tbody>${subjectRows}</tbody>
          <tfoot><tr><td colspan="2"><strong>মোট</strong></td><td><strong>${student.total}</strong></td><td colspan="1"><strong style="color:${gradeColor};font-size:1.2rem;">${student.grade}</strong></td><td><strong style="color:${gradeColor};font-size:1.2rem;">GPA: ${student.gpa}</strong></td></tr></tfoot>
        </table>
        <div class="alert alert-success"><i class="fas fa-check-circle"></i> <strong>উত্তীর্ণ</strong> | GPA: <strong>${student.gpa}</strong> | গ্রেড: <strong>${student.grade}</strong></div>
        <button onclick="window.print()" class="btn btn-primary"><i class="fas fa-print"></i> প্রিন্ট করুন</button>
      </div>
    </div>
  `;
}

function getGrade(marks) {
  if (marks >= 80) return 'A+';
  if (marks >= 70) return 'A';
  if (marks >= 60) return 'A-';
  if (marks >= 50) return 'B';
  if (marks >= 40) return 'C';
  if (marks >= 33) return 'D';
  return 'F';
}

function getGradePoint(marks) {
  if (marks >= 80) return '5.00';
  if (marks >= 70) return '4.00';
  if (marks >= 60) return '3.50';
  if (marks >= 50) return '3.00';
  if (marks >= 40) return '2.00';
  if (marks >= 33) return '1.00';
  return '0.00';
}

/* ==========================================
   APPLICATION STATUS TRACKER
   ========================================== */
function initStatusTracker() {
  const form = document.getElementById('statusForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const appNo = form.appNo.value.trim().toUpperCase();
    const admissions = DB.get('admissions');
    const app = admissions.find(a => a.appNo.toUpperCase() === appNo);
    const resultArea = document.getElementById('statusResult');
    if (!resultArea) return;

    if (!app) {
      resultArea.innerHTML = `<div class="alert alert-danger"><i class="fas fa-times-circle"></i> এই আবেদন নম্বরে কোনো তথ্য পাওয়া যায়নি।</div>`;
      return;
    }

    const statusColors = { pending: '#f5a623', approved: '#0f5232', rejected: '#8b1a1a' };
    const statusNames = { pending: 'প্রক্রিয়াধীন', approved: 'অনুমোদিত', rejected: 'বাতিল' };
    const statusIcons = { pending: 'fa-clock', approved: 'fa-check-circle', rejected: 'fa-times-circle' };

    resultArea.innerHTML = `
      <div class="card" style="border-top:4px solid ${statusColors[app.status]}">
        <div class="card-body">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:20px;">
            <div>
              <h3 style="color:var(--navy);margin-bottom:4px;">${app.name}</h3>
              <p style="color:var(--text-light);font-size:0.85rem;">আবেদন নম্বর: ${app.appNo}</p>
            </div>
            <div class="badge" style="background:${statusColors[app.status]}20;color:${statusColors[app.status]};font-size:0.9rem;padding:8px 16px;">
              <i class="fas ${statusIcons[app.status]}"></i>&nbsp;${statusNames[app.status]}
            </div>
          </div>
          <div class="form-grid-2">
            <div><strong>কাঙ্ক্ষিত শ্রেণি:</strong> ${app.class}</div>
            <div><strong>আবেদনের তারিখ:</strong> ${app.date}</div>
            <div><strong>অভিভাবক:</strong> ${app.guardian}</div>
            <div><strong>ফোন:</strong> ${app.phone}</div>
          </div>
          ${app.status === 'approved' ? '<div class="alert alert-success" style="margin-top:16px;"><i class="fas fa-check-circle"></i> আপনার ভর্তির আবেদন অনুমোদিত হয়েছে। ভর্তির জন্য বিদ্যালয়ে যোগাযোগ করুন।</div>' : ''}
          ${app.status === 'pending' ? '<div class="alert alert-warning" style="margin-top:16px;"><i class="fas fa-clock"></i> আপনার আবেদন প্রক্রিয়াধীন রয়েছে। ফলাফলের জন্য অপেক্ষা করুন।</div>' : ''}
          ${app.status === 'rejected' ? '<div class="alert alert-danger" style="margin-top:16px;"><i class="fas fa-times-circle"></i> দুঃখিত, আপনার আবেদন বাতিল করা হয়েছে।</div>' : ''}
        </div>
      </div>
    `;
  });
}

/* ==========================================
   NOTICE TICKER
   ========================================== */
function initNoticeTicker() {
  const ticker = document.querySelector('.ticker-content');
  if (!ticker) return;
  const notices = DB.get('notices').filter(n => n.published);
  if (notices.length > 0) {
    const items = notices.map(n => `<span class="ticker-item">${n.title}</span>`).join('');
    ticker.innerHTML = items + items; // Duplicate for seamless loop
  }
}

/* ==========================================
   TOAST NOTIFICATIONS
   ========================================== */
function showToast(message, type = 'info', duration = 3500) {
  const colors = { info: '#0a2463', success: '#0f5232', error: '#8b1a1a', warning: '#c67c00' };
  const icons = { info: 'fa-info-circle', success: 'fa-check-circle', error: 'fa-times-circle', warning: 'fa-exclamation-triangle' };

  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed;bottom:80px;right:24px;
    background:${colors[type]};color:white;
    padding:14px 20px;border-radius:10px;
    display:flex;align-items:center;gap:10px;
    box-shadow:0 8px 24px rgba(0,0,0,0.25);
    z-index:9000;font-family:var(--font-bn);
    font-size:0.9rem;max-width:360px;
    animation:slideLeft 0.4s ease;
    transition:opacity 0.3s ease;
  `;
  toast.innerHTML = `<i class="fas ${icons[type]}"></i> ${message}`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* ==========================================
   ADMIN PANEL FUNCTIONS
   ========================================== */
const Admin = {
  renderNotices() {
    const tbody = document.getElementById('noticesBody');
    if (!tbody) return;
    const notices = DB.get('notices');
    if (!notices.length) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:30px;color:var(--text-light);">কোনো নোটিশ নেই</td></tr>`;
      return;
    }
    tbody.innerHTML = notices.map(n => `
      <tr>
        <td>${n.date}</td>
        <td><strong>${n.title}</strong> ${n.important ? '<span class="badge badge-danger">জরুরি</span>' : ''}</td>
        <td><span class="badge badge-info">${n.category}</span></td>
        <td>${n.published ? '<span class="badge badge-success">প্রকাশিত</span>' : '<span class="badge badge-gray">খসড়া</span>'}</td>
        <td class="actions-cell">
          <button class="action-btn edit" onclick="Admin.editNotice(${n.id})" title="সম্পাদনা"><i class="fas fa-edit"></i></button>
          <button class="action-btn delete" onclick="Admin.deleteNotice(${n.id})" title="মুছুন"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `).join('');
  },

  deleteNotice(id) {
    if (confirm('এই নোটিশটি মুছে দিতে চান?')) {
      DB.delete('notices', id);
      this.renderNotices();
      showToast('নোটিশ মুছে দেওয়া হয়েছে।', 'success');
    }
  },

  editNotice(id) {
    // Would open an edit modal
    showToast('সম্পাদনা ফিচার সক্রিয় করা হচ্ছে...', 'info');
  },

  renderStudents() {
    const tbody = document.getElementById('studentsBody');
    if (!tbody) return;
    const students = DB.get('students');
    if (!students.length) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:30px;color:var(--text-light);">কোনো শিক্ষার্থী নেই</td></tr>`;
      return;
    }
    tbody.innerHTML = students.map(s => `
      <tr>
        <td>${s.studentId}</td>
        <td><div class="cell-avatar"><div class="cell-avatar-img">${s.name.charAt(0)}</div><div><div class="cell-name">${s.name}</div></div></div></td>
        <td>${s.class}</td>
        <td>${s.section}</td>
        <td>${s.roll}</td>
        <td><span class="badge badge-success">${s.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}</span></td>
        <td class="actions-cell">
          <button class="action-btn view" title="দেখুন"><i class="fas fa-eye"></i></button>
          <button class="action-btn edit" title="সম্পাদনা"><i class="fas fa-edit"></i></button>
          <button class="action-btn delete" onclick="Admin.deleteStudent(${s.id})" title="মুছুন"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `).join('');
  },

  deleteStudent(id) {
    if (confirm('এই শিক্ষার্থীকে মুছে দিতে চান?')) {
      DB.delete('students', id);
      this.renderStudents();
      showToast('শিক্ষার্থী মুছে দেওয়া হয়েছে।', 'success');
    }
  },

  renderAdmissions() {
    const tbody = document.getElementById('admissionsBody');
    if (!tbody) return;
    const admissions = DB.get('admissions');
    tbody.innerHTML = admissions.map(a => `
      <tr>
        <td>${a.appNo}</td>
        <td>${a.name}</td>
        <td>${a.class}</td>
        <td>${a.phone}</td>
        <td>${a.date}</td>
        <td>
          ${a.status === 'pending' ? '<span class="badge badge-warning">প্রক্রিয়াধীন</span>' : ''}
          ${a.status === 'approved' ? '<span class="badge badge-success">অনুমোদিত</span>' : ''}
          ${a.status === 'rejected' ? '<span class="badge badge-danger">বাতিল</span>' : ''}
        </td>
        <td class="actions-cell">
          ${a.status === 'pending' ? `
            <button class="action-btn" style="background:rgba(15,82,50,0.1);color:var(--green);" onclick="Admin.updateAdmission(${a.id},'approved')" title="অনুমোদন"><i class="fas fa-check"></i></button>
            <button class="action-btn delete" onclick="Admin.updateAdmission(${a.id},'rejected')" title="বাতিল"><i class="fas fa-times"></i></button>
          ` : ''}
          <button class="action-btn view" title="দেখুন"><i class="fas fa-eye"></i></button>
        </td>
      </tr>
    `).join('');
  },

  updateAdmission(id, status) {
    DB.update('admissions', id, { status });
    this.renderAdmissions();
    showToast(status === 'approved' ? 'আবেদন অনুমোদন করা হয়েছে।' : 'আবেদন বাতিল করা হয়েছে।', status === 'approved' ? 'success' : 'error');
  },

  renderTeachers() {
    const tbody = document.getElementById('teachersBody');
    if (!tbody) return;
    const teachers = DB.get('teachers');
    tbody.innerHTML = teachers.map(t => `
      <tr>
        <td>${t.id}</td>
        <td><div class="cell-avatar"><div class="cell-avatar-img">${t.name.charAt(0)}</div><div><div class="cell-name">${t.name}</div><div class="cell-sub">${t.qualification}</div></div></div></td>
        <td>${t.designation}</td>
        <td>${t.subject}</td>
        <td>${t.experience} বছর</td>
        <td><span class="badge badge-success">সক্রিয়</span></td>
        <td class="actions-cell">
          <button class="action-btn edit" title="সম্পাদনা"><i class="fas fa-edit"></i></button>
          <button class="action-btn delete" onclick="Admin.deleteTeacher(${t.id})" title="মুছুন"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `).join('');
  },

  deleteTeacher(id) {
    if (confirm('এই শিক্ষককে মুছে দিতে চান?')) {
      DB.delete('teachers', id);
      this.renderTeachers();
      showToast('শিক্ষক মুছে দেওয়া হয়েছে।', 'success');
    }
  },

  getDashboardStats() {
    return {
      students: DB.get('students').length,
      teachers: DB.get('teachers').length,
      admissions: DB.get('admissions').filter(a => a.status === 'pending').length,
      notices: DB.get('notices').filter(n => n.published).length
    };
  }
};

/* ==========================================
   BAR CHART (CSS)
   ========================================== */
function renderBarChart(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const maxVal = Math.max(...data.map(d => d.value));
  container.innerHTML = `
    <div class="css-bar-chart">
      ${data.map(d => `
        <div class="bar-group">
          <div class="bar" style="height:${(d.value / maxVal) * 180}px;">
            <span class="bar-value">${d.value}</span>
          </div>
          <div class="bar-label">${d.label}</div>
        </div>
      `).join('')}
    </div>
  `;
}

/* ==========================================
   NOTICE FILTER
   ========================================== */
function initNoticeFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const category = this.dataset.category;
      const noticeItems = document.querySelectorAll('.notice-item-full');
      noticeItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================
   SEARCH
   ========================================== */
function initSearch(inputId, itemsSelector, textSelector) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    document.querySelectorAll(itemsSelector).forEach(item => {
      const text = item.querySelector(textSelector)?.textContent.toLowerCase() || '';
      item.style.display = text.includes(query) || !query ? '' : 'none';
    });
  });
}

/* ==========================================
   CONTACT FORM
   ========================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const { valid } = Validate.form(form, {
      name: [v => Validate.required(v, 'নাম')],
      email: [v => Validate.required(v, 'ইমেইল'), v => Validate.email(v)],
      message: [v => Validate.required(v, 'বার্তা')]
    });

    if (!valid) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> পাঠানো হচ্ছে...';
    }

    setTimeout(() => {
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'পাঠান';
      }
      showToast('আপনার বার্তা সফলভাবে পাঠানো হয়েছে!', 'success');
    }, 1500);
  });
}

/* ==========================================
   LOGIN FORM
   ========================================== */
function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  // Show/hide password
  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('password');
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      togglePassword.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = form.username.value.trim();
    const password = form.password.value;

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> যাচাই করা হচ্ছে...';
    }

    setTimeout(() => {
      const result = Auth.login(username, password);
      if (result.success) {
        showToast('লগইন সফল হয়েছে!', 'success');
        setTimeout(() => {
          const role = result.user.role;
          if (role === 'admin' || role === 'teacher') {
            window.location.href = '/pages/admin-dashboard.html';
          } else if (role === 'student') {
            window.location.href = '/pages/student-dashboard.html';
          } else {
            window.location.href = '/index.html';
          }
        }, 800);
      } else {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> লগইন করুন';
        }
        const errorEl = document.getElementById('loginError');
        if (errorEl) errorEl.textContent = result.message;
        showToast(result.message, 'error');
      }
    }, 1000);
  });
}

/* ==========================================
   ADMIN DASHBOARD INIT
   ========================================== */
function initAdminDashboard() {
  if (!document.querySelector('.admin-wrapper')) return;
  if (!Auth.requireAuth('admin') && !Auth.requireAuth('teacher')) return;

  // Sidebar toggle
  const sidebarToggle = document.getElementById('sidebarToggle');
  const adminSidebar = document.getElementById('adminSidebar');
  if (sidebarToggle && adminSidebar) {
    sidebarToggle.addEventListener('click', () => {
      adminSidebar.classList.toggle('collapsed');
    });
  }

  // Set user info in topbar
  const session = Auth.getSession();
  if (session) {
    const topbarName = document.getElementById('topbarName');
    if (topbarName) topbarName.textContent = session.name;
  }

  // Update dashboard stats
  const stats = Admin.getDashboardStats();
  const statEls = {
    totalStudents: stats.students,
    totalTeachers: stats.teachers,
    pendingAdmissions: stats.admissions,
    publishedNotices: stats.notices
  };
  Object.entries(statEls).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  });

  // Render appropriate tables
  Admin.renderNotices();
  Admin.renderStudents();
  Admin.renderAdmissions();
  Admin.renderTeachers();

  // Charts
  renderBarChart('attendanceChart', [
    { label: 'শ্রে-৬', value: 95 },
    { label: 'শ্রে-৭', value: 88 },
    { label: 'শ্রে-৮', value: 91 },
    { label: 'শ্রে-৯', value: 87 },
    { label: 'শ্রে-১০', value: 93 }
  ]);
  renderBarChart('feeChart', [
    { label: 'জুন', value: 45000 },
    { label: 'জুলাই', value: 52000 },
    { label: 'আগস্ট', value: 48000 },
    { label: 'সেপ্টে', value: 61000 },
    { label: 'অক্টো', value: 55000 }
  ]);

  // Sidebar link active state
  const sidebarLinks = document.querySelectorAll('.admin-nav-link[data-section]');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function() {
      sidebarLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      const section = this.dataset.section;
      document.querySelectorAll('.admin-section').forEach(s => s.style.display = 'none');
      const target = document.getElementById('section-' + section);
      if (target) target.style.display = 'block';
    });
  });
}

/* ==========================================
   NOTICE ADD FORM (ADMIN)
   ========================================== */
function initNoticeAddForm() {
  const form = document.getElementById('addNoticeForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const notice = {
      id: DB.nextId('notices'),
      title: form.title.value,
      category: form.category.value,
      date: form.date.value || new Date().toISOString().slice(0, 10),
      content: form.content.value,
      important: form.important?.checked || false,
      published: form.published?.checked || false
    };
    DB.add('notices', notice);
    form.reset();
    Admin.renderNotices();
    showToast('নোটিশ সফলভাবে যোগ করা হয়েছে।', 'success');
    const modal = document.getElementById('addNoticeModal');
    if (modal) modal.classList.remove('active');
  });
}

/* ==========================================
   STUDENT ADD FORM (ADMIN)
   ========================================== */
function initStudentAddForm() {
  const form = document.getElementById('addStudentForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const year = new Date().getFullYear();
    const student = {
      id: DB.nextId('students'),
      studentId: 'SSHS-' + year + '-' + String(DB.nextId('students')).padStart(4, '0'),
      name: form.name.value,
      roll: parseInt(form.roll?.value) || 1,
      class: form.class.value,
      section: form.section.value,
      year,
      dob: form.dob?.value || '',
      gender: form.gender?.value || '',
      guardian: form.guardian?.value || '',
      phone: form.phone?.value || '',
      address: form.address?.value || '',
      status: 'active'
    };
    DB.add('students', student);
    form.reset();
    Admin.renderStudents();
    showToast('শিক্ষার্থী সফলভাবে যোগ করা হয়েছে।', 'success');
    const modal = document.getElementById('addStudentModal');
    if (modal) modal.classList.remove('active');
  });
}

/* ==========================================
   MODAL HANDLERS
   ========================================== */
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}

// Close on overlay click
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

/* ==========================================
   PRINT FUNCTIONS
   ========================================== */
function printSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const original = document.body.innerHTML;
  document.body.innerHTML = el.outerHTML;
  window.print();
  document.body.innerHTML = original;
  window.location.reload();
}

/* ==========================================
   INIT
   ========================================== */
document.addEventListener('DOMContentLoaded', function() {
  // Initialize database
  DB.init();

  // Common UI
  initScrollReveal();
  setActiveNavLink();
  initNoticeTicker();
  initNoticeFilter();

  // Forms
  initAdmissionForm();
  initResultLookup();
  initStatusTracker();
  initContactForm();
  initLoginForm();

  // Admin
  initAdminDashboard();
  initNoticeAddForm();
  initStudentAddForm();

  // Search init for teachers/notices pages
  initSearch('teacherSearch', '.teacher-card-full', 'h3');
  initSearch('noticeSearch', '.notice-item-full', 'h4');
});

/* ==========================================
   UTILITIES
   ========================================== */
function formatBanglaDate(dateStr) {
  const date = new Date(dateStr);
  const months = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function formatBDT(amount) {
  return '৳ ' + amount.toLocaleString('bn-BD');
}

function debounce(fn, delay = 300) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Expose to global
window.DB = DB;
window.Auth = Auth;
window.Admin = Admin;
window.showToast = showToast;
window.openModal = openModal;
window.closeModal = closeModal;
window.changeSlide = changeSlide;
window.goToSlide = goToSlide;
window.scrollToTop = scrollToTop;
window.printSection = printSection;
