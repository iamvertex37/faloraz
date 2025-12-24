// فالوراز - اسکریپت پایه (نسخه اولیه برای تست)

// دارک مود
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  themeToggle.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// بارگذاری تم ذخیره‌شده
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
  themeToggle.textContent = '☀️';
}

// فال روزانه (تست ساده)
async function dailyHoroscope() {
  const sign = document.getElementById('daily-sign').value;
  const result = document.getElementById('daily-result');
  result.innerHTML = '<span class="loading">در حال دریافت فال روزانه...</span>';

  // تعبیر تست (بعداً با Gemini جایگزین می‌شه)
  setTimeout(() => {
    result.innerHTML = `
      <strong>فال امروز برج ${sign}:</strong><br>
      امروز انرژی مثبتی داری! ستاره‌ها برات چشمک می‌زنن و خبرهای خوب در راهه. 
      رنگ شانس: بنفش 💜<br>
      عدد شانس: ۷<br>
      پیام: تو لایق بهترین‌ها هستی! ✨
    `;
  }, 1500);
}

// فال قهوه (تست ساده)
function submitCoffee() {
  const description = document.getElementById('coffee-description').value.trim();
  const result = document.getElementById('coffee-result');
  if (!description) {
    result.innerHTML = 'لطفاً شکل‌ها رو توصیف کن!';
    return;
  }

  result.innerHTML = '<span class="loading">در حال تعبیر فال قهوه...</span>';

  setTimeout(() => {
    result.innerHTML = `
      <strong>تعبیر فال قهوه:</strong><br>
      شکل‌های "${description}" نشون می‌دن که خبر خوش، عشق یا رزق در راهه. 
      آینده‌ات پر از نور و موفقیت است! ☕✨
    `;
  }, 2000);
}

// اعلان تست
document.getElementById('notify-btn').addEventListener('click', () => {
  if (Notification.permission === 'granted') {
    new Notification('فالوراز', {
      body: 'اعلان‌ها فعال شد! هر روز فالت رو دریافت کن ✨',
      icon: 'assets/icons/icon-192.png'
    });
  } else {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        showToast('اعلان‌ها فعال شد!');
      }
    });
  }
});

// تابع toast ساده
function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.background = '#bb86fc';
  toast.style.color = 'white';
  toast.style.padding = '15px 30px';
  toast.style.borderRadius = '30px';
  toast.style.zIndex = '1000';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Swipe ساده (برای تست)
let currentIndex = 0;
const sections = document.querySelectorAll('.swipe-section');
const wrapper = document.querySelector('.swipe-wrapper');

function updateSwipe() {
  wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// سوایپ با لمس (موبایل)
let startX = 0;
wrapper.parentElement.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

wrapper.parentElement.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    currentIndex = Math.min(currentIndex + 1, sections.length - 1);
  } else if (endX - startX > 50) {
    currentIndex = Math.max(currentIndex - 1, 0);
  }
  updateSwipe();
});

// راه‌اندازی اولیه
updateSwipe();